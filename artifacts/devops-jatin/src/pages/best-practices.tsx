import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldAlert, CheckCircle2, Copy, Check, Terminal, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BestPracticeItem {
  title: string;
  rationale: string;
  recommendation: string;
  example: string;
  category: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded bg-muted/80 border border-border text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200 flex items-center gap-1.5 text-xs font-mono"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-400" />
          <span className="text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default function BestPractices() {
  const [practices, setPractices] = useState<BestPracticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetch("/api/best-practices")
      .then((res) => res.json())
      .then((data) => {
        setPractices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching best practices:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["all", ...Array.from(new Set(practices.map((p) => p.category)))];

  const filteredPractices = practices.filter((item) => {
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.rationale.toLowerCase().includes(search.toLowerCase()) ||
      item.recommendation.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesTab = activeTab === "all" || item.category === activeTab;

    return matchesSearch && matchesTab;
  });

  // Helper to extract clean content of the code block for copying
  const getCleanCode = (markdownCode: string) => {
    return markdownCode.replace(/```[a-zA-Z]*\n([\s\S]*?)\n```/g, "$1").trim();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-lg font-mono text-muted-foreground">Loading best practices...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            DevOps <span className="text-primary">Best Practices</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Industrial standards, security hardening setups, and config patterns for production-ready infrastructure.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search best practices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-inner"
              data-testid="input-practices-search"
            />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-8 p-1.5 bg-muted/40 border border-border/50 rounded-xl justify-center max-w-2xl mx-auto">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="font-mono text-xs md:text-sm capitalize px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="popLayout">
          {filteredPractices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-muted-foreground font-mono border border-dashed border-border rounded-2xl"
            >
              No best practices matching "{search}"
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-8"
            >
              {filteredPractices.map((item, index) => (
                <motion.div
                  key={`${item.category}-${item.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 shadow-md glow-card overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/20">
                      <div className="space-y-1">
                        <Badge className="font-mono text-xs mb-2" variant="secondary">
                          {item.category}
                        </Badge>
                        <CardTitle className="text-xl md:text-2xl font-bold font-mono text-foreground flex items-center gap-2">
                          <Terminal className="w-5 h-5 text-primary" />
                          {item.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-destructive flex items-center gap-2 font-mono">
                            <ShieldAlert className="w-4 h-4" /> The Problem / Rationale
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.rationale}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 flex items-center gap-2 font-mono">
                            <CheckCircle2 className="w-4 h-4" /> Recommendation
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.recommendation}
                          </p>
                        </div>
                      </div>

                      {item.example && (
                        <div className="relative rounded-xl border border-border bg-background/80 overflow-hidden font-mono text-xs max-h-[350px] flex flex-col">
                          <div className="px-4 py-2.5 border-b border-border bg-muted/40 flex items-center gap-2 text-muted-foreground select-none">
                            <Code className="w-3.5 h-3.5 text-primary" />
                            <span>Example Configuration</span>
                          </div>
                          <div className="p-4 overflow-auto flex-1 min-h-[150px] relative">
                            <CopyButton text={getCleanCode(item.example)} />
                            <pre className="text-blue-300 leading-relaxed">
                              <code>{getCleanCode(item.example)}</code>
                            </pre>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
