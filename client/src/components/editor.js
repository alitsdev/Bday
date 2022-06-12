import React from 'react';

import { useLayoutEffect, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
  let roughElement;
  if (type === 'line') {
    roughElement = generator.line(x1, y1, x2, y2);
  }
  if (type === 'rectangle') {
    roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  }
  if (type === 'circle') {
    const center = { x: x1, y: y1 };
    const a = { x: x2, y: y2 };
    const radius = distance(center, a);
    roughElement = generator.circle(
      x1,
      y1,
      2 * radius
    );
  }
  if (type === 'triangle') {
    roughElement = generator.polygon(
      [[x1,
      y1],
      [x2,
      y2],
      [x2 + x1,
      y2 + y1]
      ]
    );
  }
  return { id, x1, y1, x2, y2, type, roughElement };
}

const isWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  if (type === 'rectangle') {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  } else if (type === 'circle') {
    const center = { x: x1, y: y1 };
    const a = { x: x2, y: y2 };
    const b = { x, y };
    const radius = distance(center, a);
    const offset = distance(center, b) - radius;
    console.log(Math.abs(offset))
    return offset < 1;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < 1;
  }
};
const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
  return elements.find((element) => isWithinElement(x, y, element));
};

const Editor = (props) => {
    const [elements, setElements] = useState([]);
    const [action, setAction] = useState('none');
    const [tool, setTool] = useState('line');
    const [selectedElement, setSelectedElement] = useState(null);
    const [pointerOffset, setPointerOffset] = useState(null);

    useLayoutEffect(() => {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height);

      const roughCanvas = rough.canvas(canvas);
      elements.forEach((element) => roughCanvas.draw(element.roughElement));
    }, [elements]);

    const updateElement = (id, x1, y1, x2, y2, type) => {
      const updatedElement = createElement(id, x1, y1, x2, y2, type);
      const elementsCopy = [...elements];
      elementsCopy[id] = updatedElement;
      setElements(elementsCopy);
    };

    function handleMouseDown(event) {
      const { clientX, clientY } = event;
      if (tool === 'selection') {
        const element = getElementAtPosition(clientX, clientY, elements);
        if (element) {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element });
          setPointerOffset({ offsetX, offsetY });
          setAction('moving');
        }
      } else if (tool === 'triangle') {
        const id = elements.length;
        const element = createElement(
          id,
          clientX,
          clientY,
          clientX,
          clientY,
          tool
          );
        setElements((prevState) => [...prevState, element]);
        setAction('drawing');
      }
       else {
        const id = elements.length;
        const element = createElement(
          id,
          clientX,
          clientY,
          clientX,
          clientY,
          tool
        );
        setElements((prevState) => [...prevState, element]);
        setAction('drawing');
      }
    }
    function handleMouseMove(event) {
      const { clientX, clientY } = event;

      if (tool === 'selection') {
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
        updateElement(index, x1, y1, clientX, clientY, tool);
      } else if (action === 'moving') {
        const { id, x1, x2, y1, y2, type} = selectedElement;
        const { offsetX, offsetY } = pointerOffset;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX = clientX - offsetX;
        const newY = clientY - offsetY;
        updateElement(id, newX, newY, newX + width, newY + height, type);
      }
    }
    function handleMouseUp() {
      setAction('none');
      setSelectedElement(null);
    }

    return (
      <div className='App'>
        <div style={{ position: 'fixed' }}>
          <input
            type='radio'
            id='selection'
            checked={tool === 'selection'}
            onChange={() => setTool('selection')}
          />
          <label htmlFor='selection'>Selection</label>
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
        <canvas
          id='canvas'
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
    );


    };
 export default Editor;