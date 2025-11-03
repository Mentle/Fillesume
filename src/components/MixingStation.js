import React, { useRef, useState, useEffect } from 'react';
import LiquidChrome from './LiquidChrome';
import './MixingStation.css';

// Draggable ingredient component
function DraggableIngredient({ 
  id, 
  image, 
  label, 
  initialPosition, 
  onDrop,
  isAdded 
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  const handleMouseDown = (e) => {
    if (isAdded) return;
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    });
  };
  
  const handleTouchStart = (e) => {
    if (isAdded) return;
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: touch.clientX - rect.left - rect.width / 2,
      y: touch.clientY - rect.top - rect.height / 2
    });
  };
  
  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    onDrop(id, { x: e.clientX, y: e.clientY });
    setPosition(initialPosition); // Reset if not dropped in receptacle
  };
  
  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const touch = e.changedTouches[0];
    onDrop(id, { x: touch.clientX, y: touch.clientY });
    setPosition(initialPosition);
  };
  
  useEffect(() => {
    if (isDragging) {
      const handleMove = (e) => {
        if (e.type === 'mousemove') {
          setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
          });
        }
      };
      
      const handleTouchMoveEvent = (e) => {
        const touch = e.touches[0];
        setPosition({
          x: touch.clientX - offset.x,
          y: touch.clientY - offset.y
        });
      };
      
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMoveEvent, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMoveEvent);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, offset]);
  
  if (isAdded) return null;
  
  return (
    <div
      className={`draggable-ingredient ${isDragging ? 'dragging' : ''}`}
      style={{
        left: isDragging ? position.x : initialPosition.x,
        top: isDragging ? position.y : initialPosition.y,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="ingredient-image">
        <img src={image} alt={label} className="ingredient-png" />
      </div>
    </div>
  );
}

// Ingredient dots component
function IngredientDots({ type, count = 800 }) {
  const dots = React.useMemo(() => {
    const colors = {
      pits: '#8B4513',
      algae: '#2E8B57',
      water: '#87CEEB'
    };
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      color: colors[type]
    }));
  }, [type, count]);
  
  return (
    <div className="ingredient-dots">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="ingredient-dot"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color
          }}
        />
      ))}
    </div>
  );
}

const MixingStation = ({ onComplete }) => {
  const [pitsAdded, setPitsAdded] = useState(false);
  const [algaeAdded, setAlgaeAdded] = useState(false);
  const [waterAdded, setWaterAdded] = useState(false);
  const [mixingProgress, setMixingProgress] = useState(0);
  const receptacleRef = useRef(null);
  const [liquidColor, setLiquidColor] = useState('#8B4513');
  
  const allIngredientsAdded = pitsAdded && algaeAdded && waterAdded;
  
  // Check if drop position is over receptacle
  const isOverReceptacle = (dropPos) => {
    if (!receptacleRef.current) return false;
    const rect = receptacleRef.current.getBoundingClientRect();
    return (
      dropPos.x >= rect.left &&
      dropPos.x <= rect.right &&
      dropPos.y >= rect.top &&
      dropPos.y <= rect.bottom
    );
  };
  
  // Handle ingredient drop
  const handleDrop = (ingredientId, dropPos) => {
    if (isOverReceptacle(dropPos)) {
      if (ingredientId === 'pits') setPitsAdded(true);
      if (ingredientId === 'algae') setAlgaeAdded(true);
      if (ingredientId === 'water') setWaterAdded(true);
    }
  };
  
  // Track mouse movement over liquid chrome
  const [isInteracting, setIsInteracting] = useState(false);
  
  // Increment mixing progress only when actively interacting
  useEffect(() => {
    if (isInteracting && allIngredientsAdded && mixingProgress < 100) {
      const interval = setInterval(() => {
        setMixingProgress(prev => Math.min(100, prev + 1));
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isInteracting, allIngredientsAdded, mixingProgress]);
  
  // Update liquid color based on mixing progress
  useEffect(() => {
    if (mixingProgress < 30) {
      setLiquidColor('#8B4513'); // Brown
    } else if (mixingProgress < 60) {
      setLiquidColor('#6B8E23'); // Olive green
    } else {
      setLiquidColor('#556B2F'); // Dark olive green
    }
  }, [mixingProgress]);
  
  // Complete when fully mixed
  useEffect(() => {
    if (mixingProgress >= 100) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [mixingProgress, onComplete]);
  
  return (
    <div className="mixing-station-topdown">
      {/* Instructions */}
      <div className="mixing-instructions-top">
        {!allIngredientsAdded ? (
          <h3>DRAG INGREDIENTS INTO THE RECEPTACLE</h3>
        ) : (
          <>
            <h3>MIX THE INGREDIENTS</h3>
            <p className="mix-hint">
              {mixingProgress < 100 
                ? 'Move your mouse/finger over the liquid to mix' 
                : 'Perfectly mixed! ✓'}
            </p>
          </>
        )}
      </div>
      
      {/* Receptacle - metallic square with rounded corners */}
      <div 
        ref={receptacleRef}
        className="receptacle-container"
      >
        <div className="receptacle">
          {/* Show dots for each added ingredient */}
          {!allIngredientsAdded && (
            <>
              {pitsAdded && <IngredientDots type="pits" />}
              {algaeAdded && <IngredientDots type="algae" />}
              {waterAdded && <IngredientDots type="water" />}
            </>
          )}
          
          {/* Show liquid chrome when all ingredients added */}
          {allIngredientsAdded && (
            <div 
              className="liquid-content"
              onMouseMove={() => setIsInteracting(true)}
              onMouseLeave={() => setIsInteracting(false)}
              onTouchMove={() => setIsInteracting(true)}
              onTouchEnd={() => setIsInteracting(false)}
            >
              <LiquidChrome
                baseColor={liquidColor}
                highlightColor="#FFFCF1"
                speed={0.08}
                amplitude={0.3}
                interactive={true}
              />
            </div>
          )}
          
          {/* Placeholder when empty */}
          {!pitsAdded && !algaeAdded && !waterAdded && (
            <div className="receptacle-placeholder">
              Drop ingredients here
            </div>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      {allIngredientsAdded && (
        <div className="mixing-progress-container">
          <div className="mixing-progress-bar">
            <div 
              className="mixing-progress-fill" 
              style={{ width: `${mixingProgress}%` }}
            />
          </div>
          <span className="mixing-percentage">{Math.round(mixingProgress)}% MIXED</span>
        </div>
      )}
      
      {/* Draggable ingredients at bottom */}
      <div className="ingredients-container">
        <DraggableIngredient
          id="pits"
          image={`${process.env.PUBLIC_URL}/images/mixingStation/olive.png`}
          label="PITS"
          initialPosition={{ x: window.innerWidth * 0.25, y: window.innerHeight * 0.85 }}
          onDrop={handleDrop}
          isAdded={pitsAdded}
        />
        <DraggableIngredient
          id="algae"
          image={`${process.env.PUBLIC_URL}/images/mixingStation/algae.png`}
          label="ALGAE"
          initialPosition={{ x: window.innerWidth * 0.5, y: window.innerHeight * 0.85 }}
          onDrop={handleDrop}
          isAdded={algaeAdded}
        />
        <DraggableIngredient
          id="water"
          image={`${process.env.PUBLIC_URL}/images/mixingStation/water.png`}
          label="WATER"
          initialPosition={{ x: window.innerWidth * 0.75, y: window.innerHeight * 0.85 }}
          onDrop={handleDrop}
          isAdded={waterAdded}
        />
      </div>
    </div>
  );
};

export default MixingStation;
