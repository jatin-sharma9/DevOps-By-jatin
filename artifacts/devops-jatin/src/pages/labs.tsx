import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, FileCode, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiDocker, SiJenkins, SiTerraform, SiKubernetes } from "react-icons/si";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface Lab {
  id: string;
  title: string;
  duration: string;
  tool: string;
  description: string;
  completed: boolean;
  steps: string[];
}

export default function Labs() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  useEffect(() => {
    fetch("/api/labs")
      .then(res => res.json())
      .then(data => {
        setLabs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching labs:", err);
        setLoading(false);
      });
  }, []);

  function getToolIcon(tool: string) {
    const t = tool.toLowerCase();
    if (t.includes("docker")) return <SiDocker className="w-4 h-4" />;
    if (t.includes("jenkins")) return <SiJenkins className="w-4 h-4" />;
    if (t.includes("terraform")) return <SiTerraform className="w-4 h-4" />;
    if (t.includes("kubernetes") || t.includes("k8s")) return <SiKubernetes className="w-4 h-4" />;
    return <Terminal className="w-4 h-4" />;
  }

  function formatStepContent(step: string) {
    const parts = step.split("```");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const lines = part.split("\n");
        const lang = lines[0].trim();
        const code = ["dockerfile", "groovy", "yaml", "hcl", "bash"].includes(lang)
          ? lines.slice(1).join("\n")
          : part;
        return (
          <pre key={index} className="bg-background text-blue-300 p-3 rounded border border-border/80 my-2 overflow-x-auto font-mono text-xs">
            <code>{code.trim()}</code>
          </pre>
        );
      }

      const subparts = part.split("`");
      return (
        <span key={index}>
          {subparts.map((subpart, subindex) => {
            if (subindex % 2 === 1) {
              return (
                <code key={subindex} className="bg-muted px-1.5 py-0.5 rounded text-secondary font-mono text-xs border border-border/50">
                  {subpart}
                </code>
              );
            }
            return subpart;
          })}
        </span>
      );
    });
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-lg font-mono text-muted-foreground">Loading labs...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">Interactive <span className="text-secondary">Labs</span></h1>
        <p className="text-xl text-muted-foreground">Follow step-by-step instructions to build real infrastructure in your own environment.</p>
      </div>

      <div className="space-y-6">
        {labs.map((lab, i) => (
          <motion.div 
            key={lab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between transition-all ${
              lab.completed ? 'bg-card border-border' : 'bg-card border-secondary/30 glow-card'
            }`}
          >
            <div className="flex-grow space-y-3">
              <div className="flex items-center gap-3">
                {lab.completed ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <Terminal className="text-secondary w-6 h-6" />
                )}
                <h2 className="text-2xl font-bold font-mono">{lab.title}</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl">{lab.description}</p>
              <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                <span className="flex items-center gap-2">{getToolIcon(lab.tool)} {lab.tool}</span>
                <span>•</span>
                <span>⏱ {lab.duration}</span>
              </div>
            </div>
            
            <div className="shrink-0">
              <Button 
                variant={lab.completed ? "outline" : "default"} 
                className={!lab.completed ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : ""}
                size="lg"
                onClick={() => setSelectedLab(lab)}
              >
                {lab.completed ? "Review Lab" : "Start Lab"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedLab} onOpenChange={(open) => !open && setSelectedLab(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedLab && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold font-mono text-primary flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-secondary" /> {selectedLab.title}
                </DialogTitle>
                <DialogDescription className="font-mono text-sm text-muted-foreground mt-1">
                  Tool: {selectedLab.tool} | Duration: {selectedLab.duration}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto pr-2">
                <p className="text-foreground text-sm">{selectedLab.description}</p>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-mono">Lab Steps:</h4>
                  <ol className="space-y-4">
                    {selectedLab.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 items-start bg-muted/40 p-3 rounded-lg border border-border/50">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary font-mono text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="text-sm text-foreground leading-relaxed flex-grow">
                          {formatStepContent(step)}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setSelectedLab(null)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-mono">
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
