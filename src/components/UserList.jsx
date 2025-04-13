import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usersApi } from '../api/axios'

const UserList = () => {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   console.log(users);

   useEffect(() => {
      const fetchUsers = async() => {
         try {
            setLoading(true);
            const responce = await usersApi.getAll();
            setUsers(responce.data);
            setError(null);
         } catch (err) {
            setError('An Error accured by users api')
            console.log(err);
         } finally {
            setLoading(false);
         }
      }

      fetchUsers();
   }, []) 

   if (loading) return <div className='loading'>loading users...</div>
   if (error) return <div className='error'>{error}</div>

  return (
    <div className='user-list'>
      <h2>
         Users List
      </h2>
      {users.length === 0 ? (
         <p className='empty-list'>Users not found</p>
      ) : (
         <div className='users-grid'>
            {users.map((user) => (
               <div
               key={user._id}
               className='user-card'>
                  <h3>{user.fullName}</h3>
                  <p className='email'>{user.email}</p>
                  <p className='status'>status:{user.isConfirmed ? 'confirmed' : 'not confirmed'}</p>
                  <Link to={`/users/${user._id}`} className='view-btn'>
                  info
                  </Link>
               </div>
               ))}
         </div>
      )}
    </div>
  )
}

export default UserList