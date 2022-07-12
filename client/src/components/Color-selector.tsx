import React from 'react';
import '../Styles/Color-selector.style.css';

type ColorSelectorProps = {
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
};
type color = {
  name: string;
  color: string;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({ setSelectedColor }) => {
  const colors: color[] = [
    { name: 'red', color: '#ffb3ba' },
    { name: 'orange', color: '#ffdfba' },
    { name: 'yellow', color: '#ffffba' },
    { name: 'green', color: '#baffc9' },
    { name: 'blue', color: '#bae1ff' },
  ];

  return (
    <div>
      {colors.map((item: color) => {
        return (
          <button
            className="color-button"
            type="button"
            id={`${item.name}`}
            onClick={() => setSelectedColor(`${item.color}`)}
            style={{ backgroundColor: `${item.color}` }}
          ></button>
        );
      })}
    </div>
  );
};
export default ColorSelector;
