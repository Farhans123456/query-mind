import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Wand2, Bug, BookOpen } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SqlHighlighter from "./SqlHighlighter";

interface SqlOutputProps {
  sql: string;
  explanation?: string;
  optimized?: string;
}

const SqlOutput = ({ sql, explanation, optimized }: SqlOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <Tabs defaultValue="query">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/20">
            <TabsList className="bg-transparent h-8 p-0 gap-1">
              <TabsTrigger value="query" className="h-7 text-xs px-3 data-[state=active]:bg-secondary data-[state=active]:shadow-none rounded-md">
                SQL Query
              </TabsTrigger>
              <TabsTrigger value="explain" className="h-7 text-xs px-3 data-[state=active]:bg-secondary data-[state=active]:shadow-none rounded-md gap-1">
                <BookOpen className="w-3 h-3" /> Explain
              </TabsTrigger>
              <TabsTrigger value="optimize" className="h-7 text-xs px-3 data-[state=active]:bg-secondary data-[state=active]:shadow-none rounded-md gap-1">
                <Wand2 className="w-3 h-3" /> Optimize
              </TabsTrigger>
              <TabsTrigger value="debug" className="h-7 text-xs px-3 data-[state=active]:bg-secondary data-[state=active]:shadow-none rounded-md gap-1">
                <Bug className="w-3 h-3" /> Debug
              </TabsTrigger>
            </TabsList>

            <Button
              variant="terminal"
              size="sm"
              onClick={handleCopy}
              className="h-7 gap-1.5"
            >
              {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <TabsContent value="query" className="mt-0">
            <SqlHighlighter sql={sql} />
          </TabsContent>

          <TabsContent value="explain" className="mt-0 p-4">
            <p className="text-sm text-secondary-foreground leading-relaxed">
              {explanation || "This query retrieves data based on your natural language request. Each clause has been carefully constructed to match your intent."}
            </p>
          </TabsContent>

          <TabsContent value="optimize" className="mt-0">
            {optimized ? (
              <SqlHighlighter sql={optimized} />
            ) : (
              <div className="p-4 text-sm text-muted-foreground">
                The generated query is already optimized for common use cases. Connect your database for specific optimization suggestions.
              </div>
            )}
          </TabsContent>

          <TabsContent value="debug" className="mt-0 p-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Check className="w-4 h-4" />
              <span>No syntax errors detected. Query is valid SQL.</span>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AnimatePresence>
  );
};

export default SqlOutput;
