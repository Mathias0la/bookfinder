import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";
import SearchResultsPage from "./pages/SearchResultsPage";
import CategoryPage from "./pages/CategoryPage";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
