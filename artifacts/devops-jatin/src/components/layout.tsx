import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Terminal, Moon, Sun, Github, Linkedin, Twitter, Youtube, Menu, Search } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SearchModal from "./search-modal";
import ScrollToTop from "./scroll-to-top";

const navItems = [
  { name: "Roadmap", href: "/roadmap" },
  { name: "Topics", href: "/topics" },
  { name: "Projects", href: "/projects" },
  { name: "Labs", href: "/labs" },
  { name: "Best Practices", href: "/best-practices" },
  { name: "Interview", href: "/interview" },
  { name: "Resources", href: "/resources" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ScrollToTop />

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold font-mono text-primary hover:text-primary/80 transition-colors">
              <Terminal className="h-6 w-6" />
              <span>DevOps With Jatin</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href ? "text-primary border-b-2 border-primary pb-5 mt-5" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Search button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="rounded-full text-muted-foreground hover:text-primary"
              data-testid="button-open-search"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <div className="hidden sm:flex items-center">
              <Link href="/roadmap">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono"
                  data-testid="button-start-learning"
                >
                  Start Learning
                </Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
              data-testid="button-toggle-theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l-border/40">
                <div className="flex flex-col gap-6 py-6">
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold font-mono text-primary">
                    <Terminal className="h-6 w-6" />
                    <span>DevOps With Jatin</span>
                  </Link>
                  {/* Mobile search */}
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-muted-foreground text-sm font-mono hover:border-primary/50 transition-colors"
                    data-testid="button-mobile-search"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search...</span>
                  </button>
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-lg font-medium transition-colors hover:text-primary ${
                          location === item.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto">
                    <Link href="/roadmap">
                      <Button className="w-full bg-primary text-primary-foreground font-mono">
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {children}
      </main>

      <footer className="border-t border-border/40 bg-card/50 py-12 mt-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold font-mono text-primary mb-4">
              <Terminal className="h-6 w-6" />
              <span>DevOps With Jatin</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              The definitive learning hub for aspiring and practicing DevOps engineers. Master the culture, practices, and tools.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full hover:text-primary" data-testid="link-github"><Github className="h-5 w-5" /></Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full hover:text-primary" data-testid="link-linkedin"><Linkedin className="h-5 w-5" /></Button>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full hover:text-primary" data-testid="link-twitter"><Twitter className="h-5 w-5" /></Button>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full hover:text-primary" data-testid="link-youtube"><Youtube className="h-5 w-5" /></Button>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.slice(0, 4).map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Get weekly DevOps tips and interview prep.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="dev@ops.com"
                className="bg-background border border-border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                data-testid="input-newsletter-email"
              />
              <Button variant="default" data-testid="button-newsletter-subscribe">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DevOps With Jatin. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
