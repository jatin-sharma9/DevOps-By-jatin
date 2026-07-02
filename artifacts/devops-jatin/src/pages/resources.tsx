import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Book, Video, FileText, Wrench } from "lucide-react";

interface ResourceLink {
  name: string;
  url: string;
}

interface ResourceCategory {
  title: string;
  links: ResourceLink[];
}

export default function Resources() {
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resources")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching resources:", err);
        setLoading(false);
      });
  }, []);

  function getCategoryIcon(title: string) {
    const t = title.toLowerCase();
    if (t.includes("documentation") || t.includes("docs")) return <FileText className="w-6 h-6 text-primary" />;
    if (t.includes("book")) return <Book className="w-6 h-6 text-secondary" />;
    if (t.includes("youtube") || t.includes("video")) return <Video className="w-6 h-6 text-[hsl(var(--chart-1))]" />;
    return <Wrench className="w-6 h-6 text-[hsl(var(--chart-4))]" />;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-lg font-mono text-muted-foreground">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">Curated <span className="text-primary">Resources</span></h1>
        <p className="text-xl text-muted-foreground">The best tools, books, and references to accelerate your learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-8 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-muted rounded-lg">
                {getCategoryIcon(category.title)}
              </div>
              <h2 className="text-2xl font-bold font-mono">{category.title}</h2>
            </div>
            <ul className="space-y-4">
              {category.links.map((link, j) => (
                <li key={j}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary hover:underline transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
