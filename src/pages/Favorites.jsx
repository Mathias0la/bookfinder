import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((book) => book.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="homepage">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="book-grid">
          {favorites.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.formats?.["image/jpeg"] || "default-cover.jpg"}
                alt={book.title}
                className="book-cover"
              />
              <h3>{book.title}</h3>
              <h4>
                <strong>Author:</strong>{" "}
                {book.authors.map((a) => a.name).join(", ") || "Unknown"}
              </h4>
              <p>
                <strong>Downloads:</strong> {book.download_count}
              </p>
              <Link to={`/book/${book.id}`} className="read-more">
                Read More
              </Link>
              <button
                onClick={() => removeFavorite(book.id)}
                className="remove-favorite"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
