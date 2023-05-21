import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetaliPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/category/:category" element={<ListPage />} />
      <Route path="/device/:device_id" element={<DetailPage />} />
      <Route path="/device/add" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
