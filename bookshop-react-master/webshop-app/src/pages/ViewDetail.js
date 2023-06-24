import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

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
    window.scrollTo(0, 0); // Scroll to top-left corner (0, 0)
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

  const calculatePrice = (title, author) => {
    // Custom price calculation logic based on book title and author
    // Replace this with your actual price calculation code
    return 9.99;
  };

  return (
    <div>
      <NavbarComponent />
      <div style={styles.container}>
        {book ? (
          <div style={styles.bookDetails}>
            <h3 style={styles.title}>{book.title}</h3>
            {book.cover_i && (
              <img style={styles.coverImage} src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="Book Cover" />
            )}
            <p style={styles.info}><b>Author:</b> {book.author_name?.join(', ') || 'Unknown Author'}</p>
            <p style={styles.info}><b>Publish Date:</b> {book.publish_date?.[0] || 'Unknown Publish Date'}</p>
            <p style={styles.info}><b>Price:</b> {calculatePrice(book.title, book.author_name?.join(', ') || 'Unknown Author')}</p>
            {book.description && <p style={styles.info}><b>Description:</b> {book.description}</p>}
            {book.publisher && <p style={styles.info}><b>Publisher:</b> {book.publisher}</p>}
            {book.language && <p style={styles.info}><b>Language:</b> {book.language[0]}</p>}
            {book.subject && <p style={styles.info}><b>Subject:</b> {book.subject.join(', ')}</p>}
            {book.contributor && <p style={styles.info}><b>Contributor:</b> {book.contributor.join(', ')}</p>}
            {book.publish_place && <p style={styles.info}><b>Publish Place:</b> {book.publish_place[0]}</p>}
            {book.preview_url && (
              <p style={styles.link}>
                <a href={book.preview_url} target="_blank" rel="noopener noreferrer">
                  Preview the Story Book
                </a>
              </p>
            )}
            {book.key && (
              <p style={styles.link}>
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
      <FooterComponent />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  bookDetails: {
    maxWidth: '100rem',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  coverImage: {
    width: '15%',
    marginBottom: '20px',
  },
  info: {
    marginBottom: '10px',
  },
  link: {
    marginBottom: '10px',
  },
};

export default ViewDetail;
