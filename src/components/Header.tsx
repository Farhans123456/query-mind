import { motion } from "framer-motion";
import { Database, Zap } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Database className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Query<span className="text-primary">Mind</span>
          </span>
          <span className="font-mono text-xs text-muted-foreground ml-2">(~Made by Farhan)</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono text-xs">AI-Powered SQL</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
