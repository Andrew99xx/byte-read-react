import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Components/home";
import BookDetails from "./Components/books";
import AllBooks from "./Components/all-books";
import UserAccount from "./Components/user-acc";

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/book/:id',
      element: <BookDetails />,
    },
   
    {
      path: '/all-books',
      element: <AllBooks />,
    },
    {
      path: '/user-acc',
      element: <UserAccount />,
    },
  ]);
  
  export default router;