import React, { useEffect, useState } from 'react';
import '../assets/css/main.css'
import Header from '../Layout';
import { getAllBookList } from '../services/service';
import { Comment } from './books';

export interface Book {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  comments?:Comment[]
}



const AllBooks: React.FC = () => {
  const [books, setBook]=useState<Book[]>([])
  useEffect(()=>{
    const fetch=async()=>{

      const booklist=await getAllBookList()
      setBook(booklist)
    }
    fetch()
  },[])
  return (
    <>
    <Header/>
    <main>
      <section id="all-books">
        <h2>All Books</h2>
        <div className="book-list">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.imageUrl} alt={book.title} />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <a href={`/book/${book.id}`}className="btn">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
};

export default AllBooks;
