import { useState, useLayoutEffect, useEffect } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';
import { getTemplate } from '../services/server-client';
import {
	writeText,
	localElementsJson,
	localPartyDetailsJson,
} from '../utils/helper_functions';
import '../Styles/Party-landing-page.style.css';

function writeDetails(text, medium, ctx) {
	writeText(
		{ text: `${text.name}`, x: medium.width / 2, y: 100 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: 'is turning', x: medium.width / 2, y: 150 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: `${text.age}`, x: medium.width / 2, y: 200 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: 'Join us for lots of fun on', x: medium.width / 2, y: 250 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: `${text.date} at ${text.time}`, x: medium.width / 2, y: 300 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: `${text.address}`, x: medium.width / 2, y: 350 },
		{ textAlign: 'center' },
		ctx
	);
}

const PartyLandingPage = ({ userId }) => {
	const [elements, setElements] = useState(localElementsJson);
	const [partyDetails, setPartyDetails] = useState(localPartyDetailsJson);

	const [confirmationHidden, setConfirmationHidden] = useState(true);
	const [messageToGuestHidden, setMessageToGuestHidden] = useState(true);

	useEffect(() => {
		const getMyTemplate = async () => {
			const myTemplate = await getTemplate('alicia');
			if (myTemplate) {
				const myElements = myTemplate.stickers;
				const myDetails = {
					name: myTemplate.name,
					age: myTemplate.age,
					date: myTemplate.date,
					time: myTemplate.time,
					address: myTemplate.address,
				};

				setElements([...myElements]);
				setPartyDetails(myDetails);
			}
		};

		getMyTemplate();
	}, [userId]);

	useLayoutEffect(() => {
		const canvas = document.getElementById('canvas');

		const context = canvas.getContext('2d');

		context.clearRect(0, 0, canvas.width, canvas.height);

		const roughCanvas = rough.canvas(canvas);
		console.log(elements);
		elements.forEach((element) => roughCanvas.draw(element.roughElement));
		writeDetails(partyDetails, canvas, context);

		if (elements) {
			localStorage.setItem('elements', JSON.stringify(elements));
		}

		writeDetails(partyDetails, canvas, context);
		if (partyDetails) {
			localStorage.setItem('partyDetails', JSON.stringify(partyDetails));
		}
	}, [elements, partyDetails]);

	async function confirm() {
		setConfirmationHidden(false);
	}
	function onSubmitHandler(e) {
		e.preventDefault();
		setConfirmationHidden(true);
		setMessageToGuestHidden(false);
	}

	return (
		<div className="Editor">
			{!confirmationHidden && (
				<div className="confirmation-menu">
					<form id="details-form" onSubmit={onSubmitHandler}>
						<label>Your Name</label>
						<input type="text" name="name" placeholder="your name" />
						<label>You email</label>
						<input type="email" name="email" placeholder="email" />
						<button type="submit">Confirm</button>
					</form>
				</div>
			)}
			{!messageToGuestHidden && <div id="see-you">See you there!</div>}
			<canvas
				id="canvas"
				width={window.innerWidth}
				height={window.innerHeight}
			></canvas>
			<button onClick={() => confirm()} id="save-button">
				Confirm
			</button>
		</div>
	);
};
export default PartyLandingPage;
