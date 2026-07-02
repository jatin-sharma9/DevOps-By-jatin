import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, ExternalLink, Github, Cloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiDocker, SiKubernetes, SiTerraform, SiAnsible, SiJenkins, SiGnubash, SiNginx, SiPrometheus, SiGrafana, SiGithubactions, SiLinux, SiPython } from "react-icons/si";

interface Project {
  title: string;
  description: string;
  tags: string[];
  level: string;
  link: string;
  github: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  function getProjectIcons(tags: string[]) {
    const icons: React.ReactNode[] = [];
    tags.forEach(tag => {
      const t = tag.toLowerCase();
      if (t.includes("kubernetes") || t.includes("k8s")) icons.push(<SiKubernetes className="w-4 h-4" key="k8s" />);
      else if (t.includes("github actions")) icons.push(<SiGithubactions className="w-4 h-4" key="gha" />);
      else if (t.includes("docker")) icons.push(<SiDocker className="w-4 h-4" key="docker" />);
      else if (t.includes("terraform")) icons.push(<SiTerraform className="w-4 h-4" key="tf" />);
      else if (t.includes("ansible")) icons.push(<SiAnsible className="w-4 h-4" key="ansible" />);
      else if (t.includes("prometheus")) icons.push(<SiPrometheus className="w-4 h-4" key="prom" />);
      else if (t.includes("grafana")) icons.push(<SiGrafana className="w-4 h-4" key="grafana" />);
      else if (t.includes("jenkins")) icons.push(<SiJenkins className="w-4 h-4" key="jenkins" />);
      else if (t.includes("linux")) icons.push(<SiLinux className="w-4 h-4" key="linux" />);
      else if (t.includes("python")) icons.push(<SiPython className="w-4 h-4" key="python" />);
      else if (t.includes("nginx")) icons.push(<SiNginx className="w-4 h-4" key="nginx" />);
      else if (t.includes("bash")) icons.push(<SiGnubash className="w-4 h-4" key="bash" />);
    });
    if (icons.length === 0) icons.push(<Cloud className="w-4 h-4" key="cloud" />);
    return icons.slice(0, 3);
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-lg font-mono text-muted-foreground">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">Real-World <span className="text-primary">Projects</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Theory is good. Practice is better. Production is best. Here are hands-on projects you can build and showcase.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-colors"
          >
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 p-2 bg-primary/10 rounded-lg text-primary">
                  {getProjectIcons(project.tags).map((icon, idx) => (
                    <span key={idx}>{icon}</span>
                  ))}
                </div>
                <Badge variant={project.level === "Advanced" ? "destructive" : project.level === "Intermediate" ? "default" : "secondary"}>
                  {project.level}
                </Badge>
              </div>
              <h3 className="text-xl font-bold font-mono mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 line-clamp-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-border bg-muted/20 flex justify-between items-center">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Github className="w-4 h-4 mr-2" /> Repo
                </Button>
              </a>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                  <ExternalLink className="w-4 h-4 mr-2" /> Demo
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
