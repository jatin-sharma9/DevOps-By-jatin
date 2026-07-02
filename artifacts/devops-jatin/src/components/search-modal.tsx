import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Search, X, Terminal, Layers, FlaskConical, MessageSquareQuote, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const searchIndex = [
  // Topics
  { type: "Topic", title: "Linux & OS", desc: "Shell scripting, file permissions, process management, networking", href: "/topics", tags: ["linux", "bash", "shell", "cron", "systemd"] },
  { type: "Topic", title: "Git & Version Control", desc: "Branching strategies, git flow, rebasing, hooks, GitHub Actions", href: "/topics", tags: ["git", "github", "branching", "merge", "rebase"] },
  { type: "Topic", title: "Docker", desc: "Images, containers, Dockerfile, Docker Compose, networking, volumes", href: "/topics", tags: ["docker", "container", "dockerfile", "compose", "image"] },
  { type: "Topic", title: "Kubernetes", desc: "Pods, Deployments, Services, Ingress, Helm, RBAC, HPA", href: "/topics", tags: ["kubernetes", "k8s", "pod", "helm", "ingress", "rbac"] },
  { type: "Topic", title: "Jenkins", desc: "Pipelines, Jenkinsfile, Blue Ocean, integration with Git/Docker/K8s", href: "/topics", tags: ["jenkins", "pipeline", "ci", "automation"] },
  { type: "Topic", title: "Terraform", desc: "Providers, resources, modules, state management, HCL syntax", href: "/topics", tags: ["terraform", "iac", "hcl", "state", "aws", "modules"] },
  { type: "Topic", title: "Ansible", desc: "Playbooks, roles, inventory, variables, templates, vault", href: "/topics", tags: ["ansible", "playbook", "inventory", "roles", "automation"] },
  { type: "Topic", title: "CI/CD", desc: "Pipeline design, GitOps, ArgoCD, GitHub Actions, GitLab CI", href: "/topics", tags: ["cicd", "gitops", "argocd", "github actions", "gitlab"] },
  { type: "Topic", title: "Monitoring & Observability", desc: "Prometheus, Grafana, ELK Stack, alerting, log aggregation", href: "/topics", tags: ["prometheus", "grafana", "elk", "monitoring", "logging", "alerting"] },
  { type: "Topic", title: "Cloud Architecture", desc: "AWS, Azure, GCP, IAM, EC2, S3, EKS, cloud-native patterns", href: "/topics", tags: ["aws", "azure", "gcp", "cloud", "ec2", "s3", "iam", "eks"] },
  // Labs
  { type: "Lab", title: "Deploy Nginx with Docker", desc: "Run an Nginx web server inside a Docker container", href: "/labs", tags: ["docker", "nginx", "beginner"] },
  { type: "Lab", title: "Setup a Jenkins Pipeline", desc: "Create a CI pipeline that builds and tests code on every commit", href: "/labs", tags: ["jenkins", "ci", "pipeline"] },
  { type: "Lab", title: "Terraform AWS EC2 Instance", desc: "Provision an EC2 instance on AWS using Terraform", href: "/labs", tags: ["terraform", "aws", "ec2"] },
  { type: "Lab", title: "Kubernetes Rolling Deployment", desc: "Deploy an app to Kubernetes and perform a zero-downtime update", href: "/labs", tags: ["kubernetes", "deployment", "rolling"] },
  { type: "Lab", title: "Ansible Server Configuration", desc: "Use Ansible to configure a group of remote servers automatically", href: "/labs", tags: ["ansible", "automation", "configuration"] },
  { type: "Lab", title: "Prometheus & Grafana Setup", desc: "Install and connect Prometheus with Grafana dashboards", href: "/labs", tags: ["prometheus", "grafana", "monitoring"] },
  // Interview Q&As
  { type: "Interview", title: "Container vs Virtual Machine?", desc: "Containers share the host OS kernel; VMs include a full OS", href: "/interview", tags: ["docker", "vm", "container", "hypervisor"] },
  { type: "Interview", title: "Kubernetes Pod lifecycle?", desc: "Pending → Running → Succeeded / Failed → Unknown", href: "/interview", tags: ["kubernetes", "pod", "lifecycle"] },
  { type: "Interview", title: "What is Blue-Green deployment?", desc: "Two identical environments; switch traffic to new with zero downtime", href: "/interview", tags: ["cicd", "deployment", "blue-green"] },
  { type: "Interview", title: "Infrastructure as Code?", desc: "Managing infrastructure through machine-readable definition files", href: "/interview", tags: ["terraform", "ansible", "iac"] },
  { type: "Interview", title: "How to handle secrets in pipelines?", desc: "Use Vault, AWS Secrets Manager, or masked CI/CD variables", href: "/interview", tags: ["security", "secrets", "vault"] },
  { type: "Interview", title: "What is a Kubernetes Ingress?", desc: "An API object that manages external access to services via HTTP/S", href: "/interview", tags: ["kubernetes", "ingress", "networking"] },
  // Pages
  { type: "Page", title: "Learning Roadmap", desc: "Visual path from beginner to advanced DevOps engineer", href: "/roadmap", tags: ["roadmap", "learning", "beginner", "advanced"] },
  { type: "Page", title: "Projects", desc: "Real-world DevOps projects with architecture walkthroughs", href: "/projects", tags: ["projects", "portfolio"] },
  { type: "Page", title: "Resources", desc: "Books, cheatsheets, docs, and YouTube channels", href: "/resources", tags: ["books", "cheatsheet", "resources"] },
  { type: "Page", title: "Best Practices", desc: "Curated industry best practices for Docker, Kubernetes, Terraform, CI/CD, and Linux", href: "/best-practices", tags: ["best practices", "standards", "security", "docker", "kubernetes", "terraform", "ci/cd", "linux"] },
];

const typeIcon: Record<string, React.ReactNode> = {
  Topic: <Layers className="w-4 h-4" />,
  Lab: <FlaskConical className="w-4 h-4" />,
  Interview: <MessageSquareQuote className="w-4 h-4" />,
  Page: <BookOpen className="w-4 h-4" />,
};

const typeBadgeClass: Record<string, string> = {
  Topic: "bg-primary/20 text-primary",
  Lab: "bg-green-500/20 text-green-400",
  Interview: "bg-orange-500/20 text-orange-400",
  Page: "bg-purple-500/20 text-purple-400",
};

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  const results = query.trim().length > 1
    ? searchIndex.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.tags.some(t => t.includes(q))
        );
      }).slice(0, 8)
    : searchIndex.slice(0, 6);

  const handleSelect = useCallback((href: string) => {
    setLocation(href);
    onClose();
    setQuery("");
  }, [setLocation, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            style={{ boxShadow: "0 0 40px hsl(var(--primary)/0.2)" }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search topics, labs, interview Q&As..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none font-mono"
                data-testid="input-search"
              />
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="overflow-y-auto max-h-[60vh]">
              {results.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-muted-foreground">
                  <Terminal className="w-8 h-8 mb-3 opacity-40" />
                  <p className="font-mono text-sm">No results for "{query}"</p>
                </div>
              ) : (
                <ul className="py-2">
                  {!query.trim() && (
                    <li className="px-5 py-2 text-xs text-muted-foreground uppercase tracking-wider font-mono">
                      Quick navigation
                    </li>
                  )}
                  {results.map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-start gap-4 px-5 py-3 hover:bg-muted/50 transition-colors text-left group"
                        data-testid={`search-result-${i}`}
                      >
                        <div className={`mt-0.5 p-1.5 rounded-md flex-shrink-0 ${typeBadgeClass[item.type]}`}>
                          {typeIcon[item.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                              {item.title}
                            </span>
                            <span className={`text-xs px-1.5 py-0.5 rounded font-mono flex-shrink-0 ${typeBadgeClass[item.type]}`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border text-xs text-muted-foreground font-mono">
              <span>ESC to close</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
