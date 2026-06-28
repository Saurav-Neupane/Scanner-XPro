import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { BottomNav } from "@/components/layout/BottomNav";
import { Home } from "@/pages/Home";
import { Scanner } from "@/pages/Scanner";
import { Create } from "@/pages/Create";
import { History } from "@/pages/History";
import { Settings } from "@/pages/Settings";
import { Tools } from "@/pages/Tools";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden pb-24">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/scanner" component={Scanner} />
        <Route path="/create" component={Create} />
        <Route path="/history" component={History} />
        <Route path="/settings" component={Settings} />
        <Route path="/tools" component={Tools} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
