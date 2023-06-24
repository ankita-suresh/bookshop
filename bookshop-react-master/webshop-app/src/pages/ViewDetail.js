import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ViewDetail = () => {
  const { bookKey } = useParams();
  const location = useLocation();
  const [book, setBook] = useState(null);

  const fetchBookDetails = async () => {
    if (bookKey) {
      const url = `https://openlibrary.org/works/${bookKey}.json`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        setBook(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookKey]);

  useEffect(() => {
    // Access the book data from the location state
    const bookData = location.state?.bookData;
    console.log('Book Data:', bookData);
    // Perform any additional operations with the book data if needed

    // Example: Update the book state with the received book data
    if (bookData) {
      setBook(bookData);
    }
  }, [location]);

  return (
    <div>
      <h2>Book Details</h2>
      {book ? (
        <div>
          <h3>Title: {book.title}</h3>
          <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
          <p>Genre: {book.subject ? book.subject.join(', ') : 'N/A'}</p>
          {book.preview_url && (
            <p>
              <a href={book.preview_url} target="_blank" rel="noopener noreferrer">
                Preview the Story Book
              </a>
            </p>
          )}
          {book.key && (
            <p>
              <a
                href={`https://openlibrary.org${book.key}/ebooks`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the Ebook
              </a>
            </p>
          )}
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default ViewDetail;
