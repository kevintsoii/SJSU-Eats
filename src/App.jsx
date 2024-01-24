import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Tracker from "./pages/Tracker";
import { ItemContext } from "./contexts/ItemContext";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ItemContext.Provider value={{ data }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/tracker" element={<Tracker />} />
          </Routes>
        </ItemContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
