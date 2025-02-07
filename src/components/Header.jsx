import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${searchQuery}`;
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/bookfinder">
          <h1>Book Finder</h1>
        </Link>
      </div>

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <nav>
        <ul className={menuOpen ? "show" : ""}>
          <li>
            <Link to="/bookfinder">
              {" "}
              <FaHouse /> Home
            </Link>
          </li>
          <li>
            <Link to="/favorites">
              {" "}
              <FaHeart></FaHeart> Favorites
            </Link>
          </li>
          <li>
            <Link to="/category/fiction">Fiction</Link>
          </li>
          <li>
            <Link to="/category/mystery">Mystery</Link>
          </li>
          <li>
            <Link to="/category/thriller">Thriller</Link>
          </li>
          <li>
            <Link to="/category/romance">Romance</Link>
          </li>
          <li>
            <Link to="/category/fantasy">Fantasy</Link>
          </li>
          <li>
            <Link to="/category/philosophy">Philosophy</Link>
          </li>
          <li>
            <Link to="/category/morality">Morality</Link>
          </li>
          <li>
            <Link to="/category/society">Society</Link>
          </li>
          <li>
            <Link to="/category/power">Power</Link>
          </li>
          <li>
            <Link to="/category/justice">Justice</Link>
          </li>
          <li>
            <Link to="/category/adventure">Adventure</Link>
          </li>
          <li>
            <Link to="/category/tragedy">Tragedy</Link>
          </li>
          <li>
            <Link to="/category/war">War</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
