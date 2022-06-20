import React from 'react';
import '../Styles/Text-form.style.css';
import { postGuest } from '../services/server-client';

type GuestManagerProps = {
	guestList: guest[];
	setGuestList: React.Dispatch<React.SetStateAction<guest[]>>;
};
export type guest = {
	name: string;
	mail: string;
	host?: string;
	invitationSent?: boolean;
	confirmed?: boolean;
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
			mail: target.email.value,
		};
		const savedGuest = await postGuest('hola', guest);
		setGuestList([...guestList, savedGuest]);
	}

	//Hola Joan Marc

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
