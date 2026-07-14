import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavSidebarProvider } from "@/components/nav/NavSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import CurriculumPage from "./pages/curriculum/Index";
import PromptTemplatesPage from "./pages/prompt-templates/Index";
import WorkshopPage from "./pages/workshop/Index";
import WorkshopCurriculumPage from "./pages/workshop/WorkshopCurriculumPage";
import IdeaPracticePage from "./pages/workshop/IdeaPracticePage";
import SetupPage from "./pages/workshop/SetupPage";
import ExamplePage from "./pages/workshop/ExamplePage";
import ExamplePractice1Page from "./pages/workshop/ExamplePractice1Page";
import ExamplePractice1GuidePage from "./pages/workshop/ExamplePractice1GuidePage";
import ExamplePractice1PracticePage from "./pages/workshop/ExamplePractice1PracticePage";
import ExamplePractice2Page from "./pages/workshop/ExamplePractice2Page";
import ExamplePractice2GuidePage from "./pages/workshop/ExamplePractice2GuidePage";
import ExamplePractice2PracticePage from "./pages/workshop/ExamplePractice2PracticePage";
import ExampleQuizPage from "./pages/workshop/ExampleQuizPage";
import ExampleQuizGuidePage from "./pages/workshop/ExampleQuizGuidePage";
import ImplementPage from "./pages/workshop/ImplementPage";
import NotFound from "./pages/not-found/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <NavSidebarProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/prompts" element={<PromptTemplatesPage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="/workshop/curriculum" element={<WorkshopCurriculumPage />} />
          <Route path="/workshop/idea" element={<IdeaPracticePage />} />
          <Route path="/workshop/setup" element={<SetupPage />} />
          <Route path="/workshop/example" element={<ExamplePage />} />
          <Route path="/workshop/example/ex-1/guide" element={<ExamplePractice1GuidePage />} />
          <Route path="/workshop/example/ex-1/practice" element={<ExamplePractice1PracticePage />} />
          <Route path="/workshop/example/ex-1" element={<ExamplePractice1Page />} />
          <Route path="/workshop/example/ex-2/guide" element={<ExamplePractice2GuidePage />} />
          <Route path="/workshop/example/ex-2/practice" element={<ExamplePractice2PracticePage />} />
          <Route path="/workshop/example/ex-2" element={<ExamplePractice2Page />} />
          <Route path="/workshop/example/quiz/guide" element={<ExampleQuizGuidePage />} />
          <Route path="/workshop/example/quiz" element={<ExampleQuizPage />} />
          <Route path="/workshop/implement" element={<ImplementPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </NavSidebarProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
