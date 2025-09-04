import React, { useState, useEffect, useCallback } from 'react';
import './Model360Viewer.css';

const Model360Viewer = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalFrames = 6;
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoPlaying(false); // Stop autoplay when user interacts
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoPlaying(false); // Stop autoplay when user interacts
  };
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const sensitivity = 50; // pixels needed to change frame
    
    if (Math.abs(deltaX) >= sensitivity) {
      if (deltaX > 0) {
        // Dragging right - next frame
        setCurrentFrame(prev => prev === totalFrames ? 1 : prev + 1);
      } else {
        // Dragging left - previous frame
        setCurrentFrame(prev => prev === 1 ? totalFrames : prev - 1);
      }
      setStartX(e.clientX); // Reset start position for continuous dragging
    }
  }, [isDragging, startX, totalFrames]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    e.preventDefault(); // Prevent scrolling while dragging
    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 50; // pixels needed to change frame
    
    if (Math.abs(deltaX) >= sensitivity) {
      if (deltaX > 0) {
        // Dragging right - next frame
        setCurrentFrame(prev => prev === totalFrames ? 1 : prev + 1);
      } else {
        // Dragging left - previous frame
        setCurrentFrame(prev => prev === 1 ? totalFrames : prev - 1);
      }
      setStartX(e.touches[0].clientX); // Reset start position for continuous dragging
    }
  }, [isDragging, startX, totalFrames]);
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Autoplay effect
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentFrame(prev => prev === totalFrames ? 1 : prev + 1);
      }, 800); // Change frame every 800ms
      
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalFrames]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startX, handleMouseMove, handleTouchMove]);

  return (
    <div className="model-360-viewer">
      <div 
        className="model-image-container"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <img 
          src={`${process.env.PUBLIC_URL}/images/modelturning/s${currentFrame}.png`}
          alt={`Model view ${currentFrame}`}
          className="model-image"
          draggable={false}
        />
      </div>
      <div className="rotation-hint">
        <svg className="rotation-icon" viewBox="0 0 24 24" width="18" height="18">
          <path 
            d="M12 4V2l3 3-3 3V6c-3.31 0-6 2.69-6 6 0 1.01.25 1.97.7 2.8l-1.46 1.46C4.46 15.15 4 13.66 4 12c0-4.42 3.58-8 8-8z" 
            fill="#6B7280"
          />
          <path 
            d="M12 20v2l-3-3 3-3v2c3.31 0 6-2.69 6-6 0-1.01-.25-1.97-.7-2.8l1.46-1.46C19.54 8.85 20 10.34 20 12c0 4.42-3.58 8-8 8z" 
            fill="#6B7280"
          />
        </svg>
        <span className="rotation-text">360°</span>
        <button 
          className="autoplay-toggle"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          title={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isAutoPlaying ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#6B7280">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#6B7280">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Model360Viewer;
