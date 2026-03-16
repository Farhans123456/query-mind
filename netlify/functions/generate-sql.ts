import { Context } from "@netlify/functions";


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

export default async (req: Request, context: Context) => {
    if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
        const { query, schema } = await req.json();

        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
        if (!OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY is not configured");

        const systemPrompt = `You are an expert SQL query generator. Your job is to convert natural language questions into precise, optimized SQL queries.

Rules:
- Generate valid, production-ready SQL
- IMPORTANT: Format the SQL with proper line breaks and indentation (use newline characters \\n in the JSON string). Each major clause (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, HAVING, LIMIT) should be on its own line.
- Use proper JOINs, GROUP BY, HAVING, subqueries as needed
- Prefer explicit column names over SELECT *
- Use standard SQL syntax (MySQL/PostgreSQL compatible)
- Always respond with valid JSON in this exact format:
{
  "sql": "SELECT col1, col2\\nFROM table\\nWHERE condition;",
  "explanation": "A clear, beginner-friendly explanation of what the query does and why each clause is used.",
  "optimized": "An optimized version with proper line breaks, or null if already optimal"
}

${schema ? `The user's database schema:\n${schema}` : "No schema provided. Generate a reasonable query based on common table/column naming conventions."}`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": "https://query-buddy.netlify.app",
                "X-Title": "QueryBuddy",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "nousresearch/hermes-3-llama-3.1-405b",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: query },
                ],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenRouter error:", response.status, errorText);
            throw new Error(`OpenRouter API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) throw new Error("No response from AI");

        // Parse the JSON response from the AI
        let parsed;
        try {
            // Extract JSON from potential markdown code blocks
            const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
            parsed = JSON.parse(jsonMatch[1].trim());
        } catch {
            // Fallback: treat entire response as SQL
            parsed = { sql: content, explanation: "Query generated from your natural language request.", optimized: null };
        }

        return new Response(JSON.stringify(parsed), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (e: any) {
        console.error("generate-sql error:", e);
        return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
};

export const config = {
    path: "/functions/generate-sql"
};
