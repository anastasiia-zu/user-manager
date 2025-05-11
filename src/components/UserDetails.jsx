import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserForm from './UserForm'
import { usersApi } from '../api/axios';

const UserDetails = () => {
   const {id} = useParams();
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   
   useEffect(() => {
      const fetchUser = async() => {
         try {
            setLoading(true);
            const responce = await usersApi.getById(id);
            setUser(responce.data);
            setError(null);
         } catch(err) {
            setError('user doesnt exist');
            console.error('error in fetch user', err);
         } finally {
            setLoading(false);
         }
      };
      fetchUser();
   }, [id]);

   const handleDelete = async() => {
      if (window.confirm('are you sure that you want to delete this user?')) {
         try {
            await usersApi.delete(id);
            navigate('/');
         } catch(err) {
            alert(`error with deleting user ${err.message}`);
         }
      }
   };

   if (loading) return <div className='loading'> Loading user data... </div>;

   if (error) return <div className='error'> {error} </div>;

   if (!user) return <div className='not-found'> user not found </div>;

   if (isEditing) return <UserForm user={user} isEditMode={true}/>;

  return (
    <div className='user-details'>
      <div className='back-nav'>
         <button 
         className='back-btn'
         onClick={() => navigate('/')}
         >
            Back to list
         </button>
      </div>
      <div className='user-details-card'>
         <h2>
            {user?.fullName}
         </h2>
         <div className='user-info'>
            <p>
               <strong>Email:</strong>
               {user?.email}
            </p>
            <p>
               <strong>Status:</strong>
               <span className={`status-badge ${user?.isConfirmed ? 'confirmed' : 'unconfirmed'}`}>
               {user?.isConfirmed ? 'Confirmed' : 'Unconfirmed'}
               </span>
            </p>
            <p>
               <strong>Id:</strong>
               {user?._id}
            </p>
         </div>
         <div className='user-actions'>
            <button 
            className='edit-btn'
            onClick={() => setIsEditing(true)}
            >
               Edit
            </button>
            <button
            onClick={handleDelete}
            className='delete-btn'
            >
            Delete
            </button>
         </div>
      </div>
    </div>
  )
}

export default UserDetails