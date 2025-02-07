import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gutendex.com/books/?page=${currentPage}`
        );
        const data = await response.json();
        setBooks(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        const calculatedPages = Math.ceil(data.count / 32);
        setTotalPages(calculatedPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="homepage">
      <h1>All Books</h1>
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
              {book.authors.map((a) => a.name).join(", ") || "Unknown"}
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

      <div className="pagination">
        {prevPage && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        )}
        <p>
          Page {currentPage} of {totalPages}
        </p>
        {nextPage && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}
