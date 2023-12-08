import React, { useState, useRef } from 'react';

function FactCard({ profile: fact }) {
  const [rotation, setRotation] = useState(0);
  const cardRef = useRef(null);

  const handleDrag = (e) => {
    const cardRect = cardRef.current.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const dragDistance = e.clientX - cardCenterX;
    const rotationAngle = dragDistance / 20; // Adjust this factor based on your preference
    setRotation(rotationAngle);
  };

  const resetCard = () => {
    setRotation(0);
  };

  const cardStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.2s',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleDrag}
      onMouseLeave={resetCard}
      onMouseUp={resetCard}
      style={cardStyle}
      className="card">
      {/* Profile content */}
      <img src={fact.image} alt={fact.name} />
      <div>
        <h3>{fact.name}</h3>
        <p>{fact.description}</p>
      </div>
    </div>
  );
}

export default FactCard;
