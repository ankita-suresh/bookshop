import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import "../css/searchpage.css";
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = async () => {
    let url = '';

    if (filterType === 'author') {
      url = `http://openlibrary.org/search.json?author=${encodeURIComponent(filterValue)}`;
    } else if (filterType === 'genre') {
      url = `http://openlibrary.org/search.json?q=${encodeURIComponent(filterValue)}+subject:${encodeURIComponent(filterValue)}`;
    } else {
      url = `http://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`;
    }

    try {
      setIsLoading(true);

      const response = await fetch(url);
      const data = await response.json();

      if (data.docs) {
        setBooks(data.docs);
      } else {
        setBooks([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const addToCart = (book) => {
    setCartItems([...cartItems, book]);
  };

  const generateRandomCoverImage = () => {
    const randomCoverID = Math.floor(Math.random() * 1000000);
    return `http://covers.openlibrary.org/b/id/${randomCoverID}-M.jpg`;
  };

  const generateRandomPrice = () => {
    const randomPrice = Math.floor(Math.random() * 100) + 1;
    return `$${randomPrice.toFixed(2)}`;
  };

  const generateRandomQuantity = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const handleClick = (book) => {
    navigate(`/views${book.key.substring(6)}`, { state: { bookData: book } });
  };

  useEffect(() => {
    const fetchRandomBooks = async () => {
      setIsLoading(true);

      const url = 'http://openlibrary.org/search.json?q=random';

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.docs) {
          setBooks(data.docs);
        } else {
          setBooks([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchRandomBooks();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="search-page">
        <h1>Book Search</h1>

        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
          </select>

          {filterType === 'author' || filterType === 'genre' ? (
            <input
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="filter-input"
              placeholder={filterType === 'author' ? 'Enter author name' : 'Enter genre'}
            />
          ) : null}

          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <div className="search-results">
          <h4>Search Results ({books.length} books found):</h4>
          {isLoading ? (
            <div className="loading">
              <ClipLoader color="#000" size={40} />
            </div>
          ) : (
            <ul className="books-list">
              {books.map((book) => (
                <li key={book.key} className="book-item">
                  <div onClick={() => handleClick(book)} className="book-item-content">
                    <img
                      style={{ width: '100%', height: '15.5rem' }}
                      src={
                        book.cover_i
                          ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                          : generateRandomCoverImage()
                      }
                      alt="Book Cover"
                      className="book-cover"
                    />
                   <div className="book-details">
  <h3 className="book-title">{book.title.length > 20 ? `${book.title.substring(0, 20)}...` : book.title}</h3>
                      {book.author_name ? (
                        <p>Author: {book.author_name.join(', ')}</p>
                      ) : (
                        <p>Author: Unknown</p>
                      )}
                      {book.price ? (
                        <p>Price: {book.price.join(', ')}</p>
                      ) : (
                        <p>Price: {generateRandomPrice()}</p>
                      )}
                      {book.edition_count ? (
                        <p>Quantity: {book.edition_count}</p>
                      ) : (
                        <p>Quantity: {generateRandomQuantity()}</p>
                      )}

                      <div>
                        <button
                          style={{ bottom: '0.8rem', left: '6rem', position: 'absolute' }}
                          onClick={() => addToCart(book)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {books.length === 0 && searchQuery && !isLoading && <p>No books found.</p>}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default SearchPage;
