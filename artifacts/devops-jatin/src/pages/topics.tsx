import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Cloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SiLinux, SiGit, SiDocker, SiKubernetes, SiJenkins, SiTerraform, SiAnsible, SiPrometheus } from "react-icons/si";

interface Topic {
  id: string;
  name: string;
  difficulty: string;
  desc: string;
  subtopics: string[];
}

export default function Topics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/topics")
      .then(res => res.json())
      .then(data => {
        setTopics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching topics:", err);
        setLoading(false);
      });
  }, []);

  function getTopicIcon(id: string) {
    switch (id) {
      case "linux": return <SiLinux className="w-8 h-8" />;
      case "git": return <SiGit className="w-8 h-8" />;
      case "docker": return <SiDocker className="w-8 h-8" />;
      case "kubernetes": return <SiKubernetes className="w-8 h-8" />;
      case "cicd": return <SiJenkins className="w-8 h-8" />;
      case "iac": return <SiTerraform className="w-8 h-8" />;
      case "monitoring": return <SiPrometheus className="w-8 h-8" />;
      case "cloud": return <Cloud className="w-8 h-8" />;
      default: return <Terminal className="w-8 h-8" />;
    }
  }

  function getTopicStyles(id: string) {
    switch (id) {
      case "linux": return { color: "text-blue-400", bg: "bg-blue-400/10", borderColor: "border-blue-400/20" };
      case "git": return { color: "text-orange-400", bg: "bg-orange-400/10", borderColor: "border-orange-400/20" };
      case "docker": return { color: "text-blue-500", bg: "bg-blue-500/10", borderColor: "border-blue-500/20" };
      case "kubernetes": return { color: "text-blue-600", bg: "bg-blue-600/10", borderColor: "border-blue-600/20" };
      case "cicd": return { color: "text-red-400", bg: "bg-red-400/10", borderColor: "border-red-400/20" };
      case "iac": return { color: "text-purple-500", bg: "bg-purple-500/10", borderColor: "border-purple-500/20" };
      case "monitoring": return { color: "text-orange-500", bg: "bg-orange-500/10", borderColor: "border-orange-500/20" };
      case "cloud": return { color: "text-yellow-400", bg: "bg-yellow-400/10", borderColor: "border-yellow-400/20" };
      default: return { color: "text-primary", bg: "bg-primary/10", borderColor: "border-primary/20" };
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-lg font-mono text-muted-foreground">Loading topics...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">Core <span className="text-primary">Topics</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Deep dive into the specific technologies and practices that power modern infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topics.map((topic, i) => {
          const styles = getTopicStyles(topic.id);
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col p-6 rounded-xl border bg-card hover:shadow-xl transition-all duration-300 ${styles.borderColor} glow-card`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${styles.bg} ${styles.color}`}>
                  {getTopicIcon(topic.id)}
                </div>
                <Badge variant="outline" className="font-mono text-xs border-muted-foreground/30">
                  {topic.difficulty}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-foreground font-mono">{topic.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">{topic.desc}</p>
              
              <div className="space-y-2 mt-auto pt-4 border-t border-border">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Key Concepts</p>
                <div className="flex flex-wrap gap-2">
                  {topic.subtopics.map(sub => (
                    <span key={sub} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
