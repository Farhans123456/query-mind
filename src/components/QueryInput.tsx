import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EXAMPLE_QUERIES = [
  "Show sales of last 3 months grouped by city where revenue > 10k",
  "Find top 10 customers by total order value",
  "Count users registered each month in 2025",
  "List products that have never been ordered",
];

interface QueryInputProps {
  onGenerate: (query: string) => void;
  isLoading: boolean;
}

const QueryInput = ({ onGenerate, isLoading }: QueryInputProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (query.trim()) onGenerate(query.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="rounded-xl border border-border bg-card overflow-hidden glow-primary/0 hover:glow-primary transition-shadow duration-500 focus-within:glow-primary">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Describe your query</span>
        </div>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
          }}
          placeholder="e.g., Show total revenue by product category for Q1 2025..."
          className="w-full min-h-[120px] p-4 bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none text-base leading-relaxed"
        />

        <div className="flex items-center justify-between px-4 py-3 bg-muted/20 border-t border-border">
          <div className="flex gap-2 flex-wrap">
            {EXAMPLE_QUERIES.slice(0, 2).map((ex) => (
              <button
                key={ex}
                onClick={() => setQuery(ex)}
                className="text-xs px-2.5 py-1 rounded-md border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors truncate max-w-[220px]"
              >
                {ex}
              </button>
            ))}
          </div>
          <Button
            variant="glow"
            size="sm"
            onClick={handleSubmit}
            disabled={!query.trim() || isLoading}
            className="gap-1.5"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary-foreground animate-pulse" />
                Generating...
              </span>
            ) : (
              <>
                Generate <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QueryInput;
