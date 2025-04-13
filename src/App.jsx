import './styles.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import UserDetails from './components/UserDetails'

function App() {

  return (
   <Router>
      <div className='app'>
         <header className='app-header'>
           <div className='header-content'>
            <h1>User Managment Systems</h1>
            <nav className='main-nav'>
               <Link to={'/'}
               className='nav-link'>
                  All Users
               </Link>
               <Link to={'/create'}
               className='nav-link'>
                  Create User
               </Link>
            </nav>
           </div>
         </header>
         <main className='app-content'>
            <Routes>
               <Route path={'/'} element={<UserList/>}/>
               <Route path={'/create'} element={<UserForm/>}/>
               <Route path={'/users/:id'} element={<UserDetails/>}/>
            </Routes>
         </main>
         <footer className='app-footer'>
            <p>&copy; 2025 all rigths reserved</p>
         </footer>
      </div>
   </Router>
  )
}

export default App
