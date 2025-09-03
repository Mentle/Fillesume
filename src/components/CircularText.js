import React from 'react';
import './CircularText.css';

const CircularText = ({ text = "FROM EARTH TO EARTH", radius = 120 }) => {
  return (
    <div className="circular-text-container">
      <svg width={radius * 2 + 60} height={radius * 2 + 60} className="circular-text-svg">
        <defs>
          <path
            id="circle-path"
            d={`M ${radius + 30} ${30} A ${radius} ${radius} 0 1 1 ${radius + 29.9} ${30}`}
          />
        </defs>
        <text className="circular-text">
          <textPath href="#circle-path" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CircularText;
