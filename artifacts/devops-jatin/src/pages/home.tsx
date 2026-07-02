import React from "react";
import { motion } from "framer-motion";
import { Terminal, Server, GitBranch, Layers, ShieldCheck, ArrowRight, BookOpen, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import AnimatedCounter from "@/components/animated-counter";
import { SiDocker, SiKubernetes, SiTerraform, SiAnsible, SiJenkins, SiGit, SiLinux, SiPrometheus, SiGrafana, SiGithubactions } from "react-icons/si";

const tools = [
  { icon: <SiLinux />, name: "Linux" },
  { icon: <SiGit />, name: "Git" },
  { icon: <SiDocker />, name: "Docker" },
  { icon: <SiKubernetes />, name: "Kubernetes" },
  { icon: <SiJenkins />, name: "Jenkins" },
  { icon: <SiTerraform />, name: "Terraform" },
  { icon: <SiAnsible />, name: "Ansible" },
  { icon: <SiGithubactions />, name: "GitHub Actions" },
  { icon: <SiPrometheus />, name: "Prometheus" },
  { icon: <SiGrafana />, name: "Grafana" },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 terminal-bg opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>

        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-mono font-medium">
              <Terminal className="h-4 w-4" />
              <span>Jatin // Senior DevOps Engineer</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Master the Art of <br />
              <span className="gradient-text">Continuous Delivery</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              From zero to production-ready. Learn the tools, practices, and mindset required to build scalable, resilient infrastructure.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/roadmap"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2 font-mono transition-colors"
                data-testid="link-view-roadmap"
              >
                View Learning Roadmap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 py-2 font-mono transition-colors"
                data-testid="link-explore-projects"
              >
                Explore Projects
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur shadow-2xl overflow-hidden glow-card">
              <div className="flex items-center px-4 py-3 border-b border-border/50 bg-muted/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                </div>
                <div className="mx-auto flex items-center text-xs text-muted-foreground font-mono">
                  <Terminal className="w-3 h-3 mr-2" /> jatin@production: ~
                </div>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed text-blue-300 bg-background/90 min-h-[300px]">
                <p><span className="text-secondary">jatin@production:~$</span> curl -sL https://devops.jatinsharma.com/skills</p>
                <p className="mt-2 text-foreground">Loading expert profile...</p>
                <div className="mt-4 pl-4 border-l-2 border-primary/30">
                  <p><span className="text-primary">"cloud"</span>: ["AWS", "Azure", "GCP"],</p>
                  <p><span className="text-primary">"containers"</span>: ["Docker", "Kubernetes", "Helm"],</p>
                  <p><span className="text-primary">"iac"</span>: ["Terraform", "Ansible", "Pulumi"],</p>
                  <p><span className="text-primary">"ci_cd"</span>: ["Jenkins", "GitHub Actions", "GitLab CI"],</p>
                  <p><span className="text-primary">"observability"</span>: ["Prometheus", "Grafana", "ELK"]</p>
                </div>
                <p className="mt-4"><span className="text-secondary">jatin@production:~$</span> kubectl apply -f infrastructure.yaml</p>
                <p className="mt-2 text-secondary">deployment.apps/frontend created</p>
                <p className="text-secondary">service/frontend created</p>
                <p className="text-secondary">horizontalpodautoscaler.autoscaling/frontend created</p>
                <p className="animate-pulse">_</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section — animated counters */}
      <section className="border-y border-border bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
            {[
              { label: "Hours of Content", target: 100, suffix: "+" },
              { label: "Hands-on Labs", target: 45, suffix: "" },
              { label: "Real-world Projects", target: 12, suffix: "" },
              { label: "Interview Q&As", target: 200, suffix: "+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-4"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="text-4xl md:text-5xl font-bold font-mono text-primary mb-2">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools you'll master */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-10">
          <p className="text-muted-foreground uppercase tracking-widest text-xs font-mono">Tools you will master</p>
        </div>
        <div className="flex gap-8 items-center justify-center flex-wrap px-4">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="text-4xl text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {tool.icon}
              </div>
              <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Your Path to <span className="text-primary">Production</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to master modern infrastructure and deployment pipelines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <GitBranch className="w-8 h-8 text-primary" />, title: "Version Control & CI/CD", desc: "Master Git workflows, branch strategies, and automated pipelines with Jenkins and GitHub Actions." },
            { icon: <Layers className="w-8 h-8 text-secondary" />, title: "Containerization", desc: "Build, ship, and run distributed applications with Docker and scale them with Kubernetes." },
            { icon: <Server className="w-8 h-8 text-orange-400" />, title: "Infrastructure as Code", desc: "Automate infrastructure provisioning with Terraform and configuration management with Ansible." },
            { icon: <ShieldCheck className="w-8 h-8 text-destructive" />, title: "Monitoring & Security", desc: "Implement robust observability with Prometheus/Grafana and secure your deployments." },
            { icon: <BookOpen className="w-8 h-8 text-primary" />, title: "Interview Prep", desc: "Tackle real-world scenarios and system design questions asked by top tech companies." },
            { icon: <Code className="w-8 h-8 text-secondary" />, title: "Hands-on Projects", desc: "Build end-to-end projects that you can proudly showcase on your resume." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group hover:shadow-lg hover:shadow-primary/5"
              data-testid={`feature-card-${i}`}
            >
              <div className="p-3 bg-muted rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10"></div>
        <div className="absolute inset-0 terminal-bg opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-mono mb-6">
              Ready to become a <span className="gradient-text">DevOps Engineer?</span>
            </h2>
            <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">
              Start with the roadmap, work through the labs, build the projects, and ace the interviews.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/roadmap">
                <Button size="lg" className="font-mono text-base px-8" data-testid="cta-start-roadmap">
                  Start the Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/interview">
                <Button size="lg" variant="outline" className="font-mono text-base px-8 border-primary text-primary hover:bg-primary/10" data-testid="cta-interview-prep">
                  Interview Prep
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
