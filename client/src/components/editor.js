import { useState, useLayoutEffect, useEffect } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';
import { getTemplate, postTemplate } from '../services/server-client';
import ColorSelector from './color-selector';
import TextForm from './text-form';

const generator = rough.generator();

function writeText(info, style = {}, medium) {
  const { text, x, y } = info;
  const {
    fontSize = 40,
    fontFamily = 'Comic Sans',
    color = 'black',
    textAlign = 'left',
    textBaseline = 'top',
  } = style;

  medium.beginPath();
  medium.font = fontSize + 'px ' + fontFamily;
  medium.textAlign = textAlign;
  medium.textBaseline = textBaseline;
  medium.fillStyle = color;
  medium.fillText(text, x, y);
  medium.stroke();
}

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

function createElement(id, x1, y1, x2, y2, type, color) {
  let roughElement;
  if (type === 'line') {
    roughElement =
      color === 'none'
        ? generator.line(x1, y1, x2, y2)
        : generator.line(x1, y1, x2, y2, {
            stroke: color,
          });
  }
  if (type === 'rectangle') {
    console.log('color', color);
    roughElement =
      color === 'none'
        ? generator.rectangle(x1, y1, x2 - x1, y2 - y1)
        : generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
            fill: color,
          });
  }
  if (type === 'circle') {
    const center = { x: x1, y: y1 };
    const a = { x: x2, y: y2 };
    const radius = distance(center, a);
    roughElement =
      color === 'none'
        ? generator.circle(x1, y1, 2 * radius)
        : generator.circle(x1, y1, 2 * radius, {
            fill: color,
          });
  }
  if (type === 'triangle') {
    roughElement =
      color === 'none'
        ? generator.polygon([
            [x1, y1],
            [x2, y2],
            [x2 + x1, y2 + y1],
          ])
        : generator.polygon(
            [
              [x1, y1],
              [x2, y2],
              [x2 + x1, y2 + y1],
            ],
            { fill: color }
          );
  }
  return { id, x1, y1, x2, y2, type, color, roughElement };
}

const isWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  if (type === 'rectangle') {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  }
  if (type === 'circle') {
    const center = { x: x1, y: y1 };
    const a = { x: x2, y: y2 };
    const b = { x, y };
    const radius = distance(center, a);
    const offset = distance(center, b) - radius;
    return offset < 1;
  }
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));
  return Math.abs(offset) < 1;
};
const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
  return elements.find((element) => isWithinElement(x, y, element));
};

const localElements = localStorage.getItem('elements');
let localElementsJson = localElements ? JSON.parse(localElements) : [];

const localPartyDetails = localStorage.getItem('partyDetails');
let localPartyDetailsJson = localElements
  ? JSON.parse(localPartyDetails)
  : {
      name: 'NAME',
      age: 'age',
      date: 'date',
      time: 'time',
      address: 'address',
    };

const Editor = ({ userId }) => {
  const [elements, setElements] = useState(localElementsJson);
  const [partyDetails, setPartyDetails] = useState(localPartyDetailsJson);
  const [action, setAction] = useState('none');
  const [tool, setTool] = useState('line');
  const [selectedElement, setSelectedElement] = useState(null);
  const [pointerOffset, setPointerOffset] = useState(null);
  const [selectedColor, setSelectedColor] = useState('none');

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
    // if (userId)
    getMyTemplate();
  }, [userId]);

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => roughCanvas.draw(element.roughElement));

    if (elements) {
      localStorage.setItem('elements', JSON.stringify(elements));
    }

    writeDetails(partyDetails, canvas, context);
    if (partyDetails) {
      localStorage.setItem('partyDetails', JSON.stringify(partyDetails));
    }
  }, [elements, partyDetails]);

  const updateElement = (id, x1, y1, x2, y2, type, color) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, type, color);
    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements([...elementsCopy]);
  };

  function handleMouseDown(event) {
    const { clientX, clientY } = event;
    if (tool === 'move') {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element });
        setPointerOffset({ offsetX, offsetY });
        setAction('moving');
      }
    } else if (tool === 'paint') {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const defaultColor = 'black';
        if (selectedColor === 'none') setSelectedColor(defaultColor);
        const { id, x1, y1, x2, y2, type } = element;
        const paintedElement = createElement(
          id,
          x1,
          y1,
          x2,
          y2,
          type,
          selectedColor
        );
        const elementsCopy = [...elements];
        elementsCopy[id] = paintedElement;
        setElements([...elementsCopy]);
      }
    } else if (tool === 'eraser') {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const { id } = element;
        const elementsCopy = [
          ...elements.slice(0, id),
          ...elements.slice(id + 1),
        ];
        setElements([...elementsCopy]);
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool,
        selectedColor
      );
      setElements((prevState) => [...prevState, element]);
      setAction('drawing');
    }
  }

  function handleMouseMove(event) {
    const { clientX, clientY } = event;

    if (tool === 'move') {
      event.target.style.cursor = getElementAtPosition(
        clientX,
        clientY,
        elements
      )
        ? 'move'
        : 'default';
    }

    if (action === 'drawing') {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool, selectedColor);
    } else if (action === 'moving') {
      const { id, x1, x2, y1, y2, type } = selectedElement;
      const { offsetX, offsetY } = pointerOffset;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX = clientX - offsetX;
      const newY = clientY - offsetY;
      updateElement(
        id,
        newX,
        newY,
        newX + width,
        newY + height,
        type,
        selectedColor
      );
    }
  }
  function handleMouseUp() {
    setAction('none');
    setSelectedElement(null);
  }
  async function saveCanvas() {
    const template = {
      host: userId,
      stickers: elements,
      name: partyDetails.name,
      age: partyDetails.age,
      date: partyDetails.date,
      time: partyDetails.time,
      address: partyDetails.address,
    };
    if (template.host) {
      await postTemplate(userId, template);
    }
  }

  return (
    <div className='Editor'>
      <div>
        <TextForm setPartyDetails={setPartyDetails} />
        <div>
          <input
            type='radio'
            id='eraser'
            checked={tool === 'eraser'}
            onChange={() => setTool('eraser')}
          />
          <label htmlFor='eraser'>Eraser</label>
          <input
            type='radio'
            id='paint'
            checked={tool === 'paint'}
            onChange={() => setTool('paint')}
          />
          <label htmlFor='paint'>Paint</label>
          <input
            type='radio'
            id='move'
            checked={tool === 'move'}
            onChange={() => setTool('move')}
          />
          <label htmlFor='move'>Move</label>
          <input
            type='radio'
            id='line'
            checked={tool === 'line'}
            onChange={() => setTool('line')}
          />
          <label htmlFor='line'>Line</label>
          <input
            type='radio'
            id='triangle'
            checked={tool === 'triangle'}
            onChange={() => setTool('triangle')}
          />
          <label htmlFor='triangle'>Triangle</label>
          <input
            type='radio'
            id='rectangle'
            checked={tool === 'rectangle'}
            onChange={() => setTool('rectangle')}
          />
          <label htmlFor='rectangle'>Rectangle</label>
          <input
            type='radio'
            id='circle'
            checked={tool === 'circle'}
            onChange={() => setTool('circle')}
          />
          <label htmlFor='circle'>Circle</label>
        </div>
        <ColorSelector setSelectedColor={setSelectedColor}></ColorSelector>
      </div>
      <canvas
        id='canvas'
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <button onClick={saveCanvas}>Save</button>
    </div>
  );
};
export default Editor;
