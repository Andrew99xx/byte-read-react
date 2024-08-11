import React, { useEffect, useState } from 'react';
// import './HomePage.css';
import '../assets/css/main.css'
import Header from '../Layout';
import { getAllBookList } from '../services/service';
import { Book } from './all-books';

const HomePage: React.FC = () => {

  const [books, setBook]=useState<Book[]>([])
  useEffect(()=>{
    const fetch=async()=>{

      const booklist=await getAllBookList()
      setBook(booklist.slice(0, 3))
    }
    fetch()
  },[])
  return (
    <>
    <Header/>
    <main>
      <section id="hero">
        <div className="hero-content">
          <h2>Explore Australian Literature</h2>
          <p>
            Discover a wide range of Australian books, magazines, and newspapers, completely free of charge.
          </p>
          <a href="all-books" className="btn">
            Start Reading
          </a>
        </div>
      </section>

      <section id="featured-books">
        <h2>Featured Books</h2>
        <div className="book-grid">
        {books.map((book, index) => (
        <div key={index} className="book-card">
          <img src={book.imageUrl} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </div>
      ))}
        </div>
      </section>
    </main>
    </>
  );
};

export default HomePage;
