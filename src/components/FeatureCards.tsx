import { motion } from "framer-motion";
import { Zap, Shield, BookOpen, GitBranch } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Convert plain English to complex SQL in milliseconds",
  },
  {
    icon: Shield,
    title: "Schema-Aware",
    description: "Upload your schema for accurate table and column references",
  },
  {
    icon: BookOpen,
    title: "Query Explanation",
    description: "Understand every clause with plain English breakdowns",
  },
  {
    icon: GitBranch,
    title: "Optimization",
    description: "Get performance-tuned alternatives for slow queries",
  },
];

const FeatureCards = () => {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
              <feature.icon className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
