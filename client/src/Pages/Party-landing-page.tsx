import React, { useState, useLayoutEffect, useEffect } from 'react';
import '../Styles/Party-landing-page.style.css';
const rough = require('roughjs/bundled/rough.esm.js');
const { getTemplate } = require('../services/server-client');
const {
  writeText,
  localElementsJson,
  localPartyDetailsJson,
} = require('../utils/helper_functions');

type PartyLandingPageProps = {
  userId: string;
};
type Text = {
  text: string;
  x: number;
  y: number;
  name: string;
  age: number;
  date: Date;
  time: Date;
  address: string;
};
type Medium = HTMLCanvasElement;
export type element = {
  color: string;
  id: number;
  type: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  roughElement: {
    shape: string;
  };
};

function writeDetails(
  text: Text,
  medium: Medium,
  ctx: CanvasRenderingContext2D | null
) {
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

const PartyLandingPage: React.FC<PartyLandingPageProps> = ({ userId }) => {
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
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext(
      '2d'
    ) as unknown as CanvasRenderingContext2D;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element: element) =>
      roughCanvas.draw(element.roughElement)
    );
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
  function onSubmitHandler(e: React.FormEvent) {
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
