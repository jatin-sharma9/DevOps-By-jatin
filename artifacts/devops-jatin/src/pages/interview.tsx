import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface QuestionItem {
  q: string;
  a: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

const levelColor: Record<string, string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Interview() {
  const [qaData, setQaData] = useState<Record<string, QuestionItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/interview")
      .then(res => res.json())
      .then(data => {
        setQaData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching interview questions:", err);
        setLoading(false);
      });
  }, []);

  const filteredData = Object.fromEntries(
    Object.entries(qaData).map(([cat, qs]) => [
      cat,
      qs.filter(
        q =>
          !search ||
          q.q.toLowerCase().includes(search.toLowerCase()) ||
          q.a.toLowerCase().includes(search.toLowerCase())
      ),
    ]).filter(([, qs]) => qs.length > 0)
  );

  const totalQuestions = Object.values(qaData).flat().length;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-lg font-mono text-muted-foreground">Loading interview questions...</div>
      </div>
    );
  }

  const categoryKeys = Object.keys(filteredData);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            Interview <span className="gradient-text">Prep</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {totalQuestions} real questions asked in DevOps engineering interviews, with detailed answers.
          </p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              data-testid="input-interview-search"
            />
          </div>
        </motion.div>
      </div>

      {categoryKeys.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground font-mono">
          No questions matching "{search}"
        </div>
      ) : (
        <Tabs defaultValue={categoryKeys[0]} className="w-full">
          <TabsList className={`grid mb-8 gap-1`} style={{ gridTemplateColumns: `repeat(${categoryKeys.length}, 1fr)` }}>
            {categoryKeys.map(cat => (
              <TabsTrigger key={cat} value={cat} className="font-mono text-xs md:text-sm">{cat}</TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(filteredData).map(([category, questions]) => (
            <TabsContent key={category} value={category}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {questions.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border border-border rounded-xl px-6 bg-card hover:border-primary/40 transition-colors"
                      data-testid={`interview-question-${i}`}
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-5 gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Badge className={`text-xs border flex-shrink-0 mt-0.5 ${levelColor[item.level]}`}>
                            {item.level}
                          </Badge>
                          <span className="font-medium text-base">{item.q}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pb-5 pt-1 pl-0">
                          <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                            <p className="text-muted-foreground leading-relaxed text-sm">{item.a}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
