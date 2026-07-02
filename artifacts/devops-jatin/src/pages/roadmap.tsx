import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Circle, ArrowRight, Play, Terminal, HelpCircle, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface RoadmapItem {
  name: string;
  detailTitle: string;
  explanation: string;
  commands: string[];
  relatedLabId?: string;
  relatedTopicId?: string;
}

interface RoadmapStage {
  title: string;
  difficulty: string;
  items: RoadmapItem[];
}

function CommandRow({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = cmd.split("#")[0].trim();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-background/50 border border-border/50 font-mono text-xs hover:bg-background/80 transition-colors group">
      <span className="text-blue-300 break-all select-all">{cmd}</span>
      <button
        onClick={handleCopy}
        className="p-1.5 rounded bg-muted/80 border border-border text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
        title="Copy Command"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-400" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}

export default function Roadmap() {
  const [stages, setStages] = useState<RoadmapStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<RoadmapItem | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    fetch("/api/roadmap")
      .then(res => res.json())
      .then(data => {
        setStages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching roadmap:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-lg font-mono text-muted-foreground">Loading roadmap...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">The <span className="text-primary">DevOps</span> Roadmap</h1>
        <p className="text-xl text-muted-foreground">Step-by-step guide to becoming a complete DevOps Engineer.</p>
      </div>

      <div className="relative border-l-2 border-border ml-4 md:ml-0 md:pl-0 space-y-12 pb-12">
        {stages.map((stage, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
          >
            <div className="md:flex items-start justify-between">
              {/* Timeline dot */}
              <div className="absolute left-[-9px] md:left-1/2 md:-ml-[9px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
              
              <div className="md:w-[45%] mb-4 md:mb-0 md:text-right md:pr-12">
                <h3 className="text-2xl font-bold text-foreground font-mono">{stage.title}</h3>
                <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                  {stage.difficulty}
                </div>
              </div>
              
              <div className="md:w-[45%] md:pl-12">
                <div className="bg-card border border-border p-4 rounded-xl shadow-sm glow-card">
                  <ul className="space-y-2">
                    {stage.items.map((item, i) => (
                      <li key={i}>
                        <button
                          onClick={() => setActiveItem(item)}
                          className="w-full text-left flex items-start gap-3 p-3 rounded-lg border border-transparent hover:border-primary/20 hover:bg-muted/30 transition-all duration-200 group/item"
                        >
                          <Circle className="w-5 h-5 text-muted-foreground group-hover/item:text-primary mt-0.5 shrink-0 transition-colors" />
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors font-sans text-sm md:text-base leading-relaxed">
                            {item.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={activeItem !== null} onOpenChange={(open) => !open && setActiveItem(null)}>
        <DialogContent className="max-w-2xl bg-card border-border/60 shadow-xl overflow-hidden font-sans">
          {activeItem && (
            <>
              <DialogHeader className="border-b border-border/20 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono text-xs text-primary border-primary/30 uppercase">
                    Stage Detail
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-bold font-mono text-foreground flex items-center gap-2.5">
                  <Terminal className="w-6 h-6 text-primary" />
                  {activeItem.detailTitle}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Conceptual Explanation
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans bg-muted/20 p-4 rounded-xl border border-border/40">
                    {activeItem.explanation}
                  </p>
                </div>

                {activeItem.commands && activeItem.commands.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Practical Commands & Cheatsheet
                    </h4>
                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                      {activeItem.commands.map((cmd, idx) => (
                        <CommandRow key={idx} cmd={cmd} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/20 justify-end">
                  {activeItem.relatedTopicId && (
                    <button
                      onClick={() => {
                        setActiveItem(null);
                        setLocation("/topics");
                      }}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-mono font-medium transition-all gap-1.5"
                    >
                      Study Core Topic
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {activeItem.relatedLabId && (
                    <button
                      onClick={() => {
                        setActiveItem(null);
                        setLocation("/labs");
                      }}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-mono font-medium transition-all gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Try Hands-on Lab
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
