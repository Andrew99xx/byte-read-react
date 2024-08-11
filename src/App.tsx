
import './App.css'
// import HomePage from './Components/home'
import { RouterProvider } from 'react-router-dom'
import router from './route'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        

        <RouterProvider router={router} >


        </RouterProvider>
      </AuthProvider>
    </>
  )
}

export default App
