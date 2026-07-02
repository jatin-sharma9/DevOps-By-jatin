import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/components/layout";

import Home from "@/pages/home";
import Topics from "@/pages/topics";
import Projects from "@/pages/projects";
import Labs from "@/pages/labs";
import Interview from "@/pages/interview";
import Roadmap from "@/pages/roadmap";
import Resources from "@/pages/resources";
import BestPractices from "@/pages/best-practices";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/roadmap" component={Roadmap} />
        <Route path="/topics" component={Topics} />
        <Route path="/projects" component={Projects} />
        <Route path="/labs" component={Labs} />
        <Route path="/best-practices" component={BestPractices} />
        <Route path="/interview" component={Interview} />
        <Route path="/resources" component={Resources} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
