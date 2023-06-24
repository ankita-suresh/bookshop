import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ViewDetail = () => {
  const { bookKey } = useParams();
  const location = useLocation();
  const [book, setBook] = useState(null);

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

  const generateGoogleBooksLink = (bookKey) => {
    return `https://books.google.com/books?vid=${bookKey}&redir_esc=y`;
  };
  
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
          {book.isbn && (
            <p>
              <a
                href={generateGoogleBooksLink(book.isbn[0])}
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