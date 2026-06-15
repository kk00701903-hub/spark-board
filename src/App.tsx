import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import CurriculumPage from "./pages/curriculum/Index";
import PromptTemplatesPage from "./pages/prompt-templates/Index";
import TimeSavingsPage from "./pages/time-savings/Index";
import WorkshopPage from "./pages/workshop/Index";
import SetupPage from "./pages/workshop/SetupPage";
import ImplementPage from "./pages/workshop/ImplementPage";
import NotFound from "./pages/not-found/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/prompts" element={<PromptTemplatesPage />} />
          <Route path="/time-savings" element={<TimeSavingsPage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="/workshop/setup" element={<SetupPage />} />
          <Route path="/workshop/implement" element={<ImplementPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
