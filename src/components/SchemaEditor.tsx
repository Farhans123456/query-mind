import { useState } from "react";
import { motion } from "framer-motion";
import { Table2, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_SCHEMA = `-- Define your database schema here
-- The AI will use this to generate accurate queries

CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255),
  created_at TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount DECIMAL(10,2),
  status VARCHAR(20),
  created_at TIMESTAMP
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(200),
  price DECIMAL(10,2),
  category VARCHAR(50)
);`;

interface SchemaEditorProps {
  schema: string;
  onSchemaChange: (schema: string) => void;
}

const SchemaEditor = ({ schema, onSchemaChange }: SchemaEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Table2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Database Schema</span>
          <span className="text-xs text-muted-foreground font-mono px-1.5 py-0.5 bg-muted rounded">optional</span>
        </div>
        {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </button>

      {isExpanded && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
            <span className="text-xs text-muted-foreground font-mono">schema.sql</span>
            <Button
              variant="terminal"
              size="sm"
              onClick={() => onSchemaChange(DEFAULT_SCHEMA)}
              className="h-6 text-xs gap-1"
            >
              <Plus className="w-3 h-3" /> Sample
            </Button>
          </div>
          <textarea
            value={schema}
            onChange={(e) => onSchemaChange(e.target.value)}
            placeholder="Paste your CREATE TABLE statements here..."
            className="w-full min-h-[200px] p-4 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/50 resize-y focus:outline-none leading-relaxed"
          />
        </div>
      )}
    </motion.div>
  );
};

export default SchemaEditor;
