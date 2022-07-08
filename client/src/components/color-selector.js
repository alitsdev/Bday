import React from 'react';

const ColorSelector = ({setSelectedColor}) => {
    const colors = [
        { name: 'red', color: '#ffb3ba' },
        { name: 'orange', color: '#ffdfba' },
        { name: 'yellow', color: '#ffffba' },
        { name: 'green', color: '#baffc9' },
        { name: 'blue', color: '#bae1ff' },
      ];



   return (
       <div className='color-picker'>
{colors.map((item) =>{
   return (<button
   className='color-button'
    type='radio'
    id={`${item.name}`}
    onClick={() => setSelectedColor(`${item.color}`)}
    style= {{backgroundColor: `${item.color}`}}
  ></button>
)
})}
       </div>
  )

}
;
 export default ColorSelector;