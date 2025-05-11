import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../api/axios';


const UserForm = ({user, isEditMode = false}) => {

   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      isConfirmed: false,
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      if (isEditMode && user) {
         setFormData({
            fullName: user.fullName || '',
            email: user.email || '',
            isConfirmed: user.isConfirmed || false,
         })
      }
   }, [user, isEditMode]);

   const handleChange = (e) => {
      const {name, value, type, checked} = e.target;
      setFormData({
         ...formData, 
         [name] : type === 'checkbox' ? checked : value
      });
   };

   const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
      if (isEditMode) {
         await usersApi.update(user._id, formData);
      } else {
         await usersApi.create(formData);
      }
      navigate('/');
      } catch(err) {
         setError(`Cant ${isEditMode ? 'update' : 'create'} user: ${err.response?.data?.message || err.message}`)
      } finally {
         setLoading(false);
      };
   };

  return (
    <div className='user-form-container'>
      <h2>
         {isEditMode ? 'edit user' : 'create user'}
      </h2>

      {error && <div className='error-message'> {error} </div>}

      <form className='user-form' onSubmit={handleSubmit}>
      <div className='form-group'>
         <label htmlFor='fullName'>Full Name:</label>
         <input 
         type='text' 
         id='fullName' 
         name='fullName' 
         value={FormData.fullName} 
         onChange={handleChange} 
         placeholder={user?.fullName ? user?.fullName : 'full name...'}
         required
         />
      </div>
      <div className='form-group'>
         <label htmlFor='email'>Email:</label>
         <input 
         type='email' 
         id='email' 
         name='email' 
         value={FormData.email} 
         onChange={handleChange} 
         placeholder={user?.email ? user?.email : 'email...'} 
         required
         />
      </div>
      <div className='form-group checkbox'>
         <label>
            <input
            type='checkbox'
            name='isConfirmed'
            checked={formData.isConfirmed}
            onChange={handleChange}
            />
            Confirmed
         </label>
      </div>
      <div className='form-actions'>
         <button 
         className='submit-btn'
         type='submit'
         disabled={loading}
         >
         {loading ? 'Loading...' : isEditMode ? 'Save changes' : 'Create user'}
         </button>
         <button 
         className='cancel-btn'
         type='button'
         disabled={loading}
         onClick={() => navigate('/')}
         >
         Cancel
         </button>
      </div>
      </form>
    </div>
  )
}

export default UserForm