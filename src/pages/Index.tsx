import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SchemaEditor from "@/components/SchemaEditor";
import QueryInput from "@/components/QueryInput";
import SqlOutput from "@/components/SqlOutput";
import FeatureCards from "@/components/FeatureCards";

// Demo SQL generation (will be replaced with AI backend)
const DEMO_RESPONSES: Record<string, { sql: string; explanation: string }> = {
  default: {
    sql: `SELECT city, SUM(revenue) AS total_revenue
FROM sales
WHERE sale_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
GROUP BY city
HAVING SUM(revenue) > 10000
ORDER BY total_revenue DESC;`,
    explanation:
      "This query selects each city and their total revenue from the sales table. It filters for records from the last 3 months, groups results by city, and only includes cities where total revenue exceeds 10,000. Results are sorted by revenue in descending order.",
  },
  "top 10": {
    sql: `SELECT u.name, SUM(o.amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC
LIMIT 10;`,
    explanation:
      "This query joins the users and orders tables, calculates total spending per user, and returns the top 10 customers sorted by their total order value.",
  },
  count: {
    sql: `SELECT 
  DATE_FORMAT(created_at, '%Y-%m') AS month,
  COUNT(*) AS user_count
FROM users
WHERE created_at >= '2025-01-01'
  AND created_at < '2026-01-01'
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month;`,
    explanation:
      "This query counts new user registrations per month throughout 2025 by formatting the creation date and grouping by month.",
  },
  never: {
    sql: `SELECT p.id, p.name, p.price, p.category
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL
ORDER BY p.name;`,
    explanation:
      "This query uses a LEFT JOIN to find products with no matching order items, effectively listing all products that have never been ordered.",
  },
};

function matchDemo(query: string) {
  const lower = query.toLowerCase();
  for (const key of Object.keys(DEMO_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return DEMO_RESPONSES[key];
  }
  return DEMO_RESPONSES.default;
}

const Index = () => {
  const [schema, setSchema] = useState("");
  const [result, setResult] = useState<{ sql: string; explanation: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (query: string) => {
    setIsLoading(true);
    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 1200));
    setResult(matchDemo(query));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 max-w-4xl">
        <HeroSection />

        <div className="space-y-4 pb-8">
          <SchemaEditor schema={schema} onSchemaChange={setSchema} />
          <QueryInput onGenerate={handleGenerate} isLoading={isLoading} />
          {result && <SqlOutput sql={result.sql} explanation={result.explanation} />}
        </div>

        <FeatureCards />

        <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border">
          <p className="font-mono">QueryMind — AI SQL Query Generator</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
