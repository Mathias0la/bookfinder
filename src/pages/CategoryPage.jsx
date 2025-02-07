import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooksByCategory } from "../services/api";
import { Link } from "react-router-dom";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooksByCategory(category);
        setBooks(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-page">
      <h1>Category: {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.formats["image/jpeg"] || "default-cover.jpg"}
              alt={book.title}
              className="book-cover"
            />
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong>{" "}
              {book.authors.map((author) => author.name).join(", ") ||
                "Unknown"}
            </p>
            <p>
              <strong>Downloads:</strong> {book.download_count}
            </p>
            <Link to={`/book/${book.id}`} className="read-more">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
