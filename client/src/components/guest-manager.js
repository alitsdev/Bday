import React from 'react';
import  {postGuest}  from '../services/server-client';

const GuestManager = ({guestList, setGuestList}) =>{

   async function onSubmitHandler(e) {
        e.preventDefault();

        const guest = {
          name: e.target.name.value,
          email: e.target.email.value,
        };
        const savedGuest = await postGuest('alicia', guest)
        setGuestList([...guestList, savedGuest]);
      }

return (
    <div className="text-menu"><form id = 'details-form' onSubmit={onSubmitHandler}>
    <label>Guest Name</label>
    <input type='text' name='name' placeholder= 'name' />
    <label>Email</label>
    <input type='email' name='email' placeholder='email' />
    <button type='submit'>Send</button>
  </form></div>

)
};
 export default GuestManager;