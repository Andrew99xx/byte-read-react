import React, { useEffect, useState } from 'react';
import '../assets/css/main.css';
import Header from '../Layout';
import { useParams } from 'react-router-dom';
import { getBookDetail, getUsernameByUid } from '../services/service';
import { auth } from '../firebaseconfig';

export interface Comment {
  username: string;
  comment: string;
  timestamp: string;
}

export interface BookDetail {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  imageUrl: string;
  comments?: Comment[];
}

const BookDetails: React.FC = () => {
  const { id } = useParams<string>(); // Extract the 'id' from the URL
  const [book, setBook] = useState<BookDetail>();
  // @ts-ignore
  const [username, setUsername] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading]= useState<boolean>(false)

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const bookDetail = await getBookDetail(id);
        // console.log(bookDetail);

        setBook(bookDetail);
      }
    };
    fetchBook();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    const uid = auth.currentUser?.uid
    // console.log("UID", +uid);
    
    var uName=''
    if (uid) {

      uName = await getUsernameByUid(uid)
      console.log('UNAME', uName);
      setUsername(uName)
      
    }else{
      alert("Please login or signup to comment")
    }
    if (!id || !uName || !comment) {
      setError('Username and comment are required.');
      // console.log(username);
      
      return;
    }

    try {
      const response = await fetch(`https://us-central1-byte-read-book.cloudfunctions.net/api/books/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username:uName,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const newComment: Comment = {
        username:uName,
        comment,
        timestamp: new Date().toISOString(),
      };
      // @ts-ignore
      setBook((prevBook) => {
        if (!prevBook) return null;
        return {
          ...prevBook,
          comments: [...(prevBook.comments || []), newComment],
        };
      });

      setUsername('');
      setComment('');
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false)
  };

  if (!book) {
    return (
      <>
        <Header />
        <main>
          <p>Loading book details...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ marginTop: '20%' }}>
        <section id="book-details">
          <div className="book-cover">
            <img src={book.imageUrl} alt={book.title} />
          </div>
          <div className="book-info">
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <div className="description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          </div>
        </section>

        <section id="comments">
          <h3>Comments</h3>
          {book.comments && book.comments.length > 0 ? (
            book.comments.map((comment, index) => (
              <div key={index} className="comment">
                <p><strong>{comment.username}:</strong> {comment.comment}</p>
                <p><small>{new Date(comment.timestamp).toLocaleString()}</small></p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <div id="comment-form">
            <h3>Leave a Comment</h3>
            <form onSubmit={handleCommentSubmit}>
              {/* <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              /> */}

              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />

              <button type="submit">{loading?'Saving':'Submit'}</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default BookDetails;
