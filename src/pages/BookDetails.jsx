import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../services/api";
import { FaHeart } from "react-icons/fa";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        const data = await fetchBookDetails(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBookDetails();
  }, [id]);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some((fav) => fav.id === book.id)) {
      favorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bookdetails">
      <div className="book-info">
        <h1>{book.title}</h1>
        <img
          src={book.formats["image/jpeg"]}
          alt={`Cover of ${book.title}`}
        ></img>
        <p>Authors: {book.authors.map((author) => author.name).join(", ")}</p>

        <p>Download Count: {book.download_count}</p>
        <p>Category: {book.subjects[0]}</p>
        <p>Language: {book.languages.join(", ")}</p>
        <a
          href={book.formats["text/html"]}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more"
        >
          Read Online
        </a>
        <button onClick={addToFavorites} className="read-more">
          <FaHeart></FaHeart> Add to Favorites
        </button>
      </div>
    </div>
  );
}
