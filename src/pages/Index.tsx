import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SchemaEditor from "@/components/SchemaEditor";
import QueryInput from "@/components/QueryInput";
import SqlOutput from "@/components/SqlOutput";
import FeatureCards from "@/components/FeatureCards";
import { Github, Linkedin, Mail } from "lucide-react";

interface SqlResult {
  sql: string;
  explanation: string;
  optimized?: string | null;
}

const Index = () => {
  const [schema, setSchema] = useState("");
  const [result, setResult] = useState<SqlResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (query: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-sql", {
        body: { query, schema: schema.trim() || undefined },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResult({
        sql: data.sql,
        explanation: data.explanation,
        optimized: data.optimized,
      });
    } catch (e: any) {
      console.error("Generation error:", e);
      toast.error(e.message || "Failed to generate SQL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 max-w-4xl">
        <HeroSection />

        <div className="space-y-4 pb-8">
          <SchemaEditor schema={schema} onSchemaChange={setSchema} />
          <QueryInput onGenerate={handleGenerate} isLoading={isLoading} />
          {result && <SqlOutput sql={result.sql} explanation={result.explanation} optimized={result.optimized || undefined} />}
        </div>

        <FeatureCards />

        <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border flex flex-col items-center gap-4">
          <p className="font-mono">QueryMind — AI SQL Query Generator</p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:f98561965@gmail.com"
              className="hover:text-primary transition-colors hover:glow-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/farhan-shaikh-753551358/"
              className="hover:text-primary transition-colors hover:glow-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Farhans123456/"
              className="hover:text-primary transition-colors hover:glow-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
