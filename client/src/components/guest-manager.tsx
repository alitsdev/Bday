import React from 'react';
import '../Styles/Text-form.style.css';
const postGuest = require('../services/server-client');

type GuestManagerProps = {
  guestList: [];
  setGuestList: React.Dispatch<React.SetStateAction<any[]>>;
};
type guest = {
  name: string;
  email: string;
};

const GuestManager: React.FC<GuestManagerProps> = ({
  guestList,
  setGuestList,
}) => {
  async function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
    };
    // console.log(e.target);
    const guest: guest = {
      name: target.name.value,
      email: target.email.value,
    };
    const savedGuest = await postGuest('alicia', guest);
    setGuestList([...guestList, savedGuest]);
  }

  return (
    <div className="text-menu">
      <form id="details-form" onSubmit={onSubmitHandler}>
        <label>Guest Name</label>
        <input type="text" name="name" placeholder="name" />
        <label>Email</label>
        <input type="email" name="email" placeholder="email" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default GuestManager;
