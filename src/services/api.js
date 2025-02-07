const URL = "https://gutendex.com/books";

export const fetchBooks = async (page = 1) => {
  const response = await fetch(`${URL}/?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
};

export const fetchBooksByCategory = async (category, page = 1) => {
  const response = await fetch(`${URL}/?topic=${category}&page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch books by category");
  return response.json();
};

export const fetchBookDetails = async (id) => {
  const response = await fetch(`${URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch book details");
  return response.json();
};
