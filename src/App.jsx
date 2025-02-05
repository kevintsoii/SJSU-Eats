import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "./store";
import { ItemContext } from "./contexts/ItemContext";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Search from "./pages/Search";
import Location from "./pages/Location";
import Tracker from "./pages/Tracker";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  const [itemData, setItemData] = useState({});

  const fetchItemData = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/items`)
      .then((res) => res.json())
      .then((data) => setItemData(data));
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <ItemContext.Provider value={{ itemData, fetchItemData }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu/:dateParam?" element={<Menu />} />
              <Route path="/search" element={<Search />} />
              <Route path="/location" element={<Location />} />
              <Route path="/tracker" element={<Tracker />} />
            </Routes>
          </ItemContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
