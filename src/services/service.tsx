import {  doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { Book } from "../Components/all-books";
import { BookDetail } from "../Components/books";
export const configurl="https://us-central1-byte-read-book.cloudfunctions.net/api"
// interface Book {
//   name: string;
//   description: string;
//   author: string;
//   genre: string;
//   imageUrl: string;
// }

export const getUsernameByUid = async (uid:string) => {
    if (!uid) {
      throw new Error('UID is required to fetch the username.');
    }
  
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.username || null;
      } else {
        return null; // User not found
      }
    } catch (error) {
      console.error('Error fetching username:', error);
      throw error;
    }
  };
  
export const getAllBookList=async():Promise<Book[]>=>{
    try{
        const response = await fetch(configurl+'/books');
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
    }catch (error) {
    console.error("Error saving book to Firestore:", error);
    throw error; // Re-throw the error if you want to handle it later
  }
}

export const getBookDetail=async(id:string):Promise<BookDetail>=>{
    try{
        const response = await fetch(configurl+'/books/'+id);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
    }catch (error) {
    console.error("Error saving book to Firestore:", error);
    throw error; // Re-throw the error if you want to handle it later
  }
}




