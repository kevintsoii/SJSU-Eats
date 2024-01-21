import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Tracker from "./pages/Tracker";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
