import React, { useState, useEffect, useRef, useCallback } from 'react';
import MaskedLiquidChrome from './MaskedLiquidChrome';
import './Model360Viewer.css';

const Model360Viewer = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startTouchX, setStartTouchX] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [accumulatedDelta, setAccumulatedDelta] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const countdownRef = useRef(null);

  const totalFrames = 6;
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoPlaying(false); // Stop autoplay when user interacts
    setCountdown(null); // Clear countdown when starting to drag
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
  };
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const newAccumulated = accumulatedDelta + deltaX;
    const sensitivity = 80; // Higher sensitivity to prevent jumping
    
    if (Math.abs(newAccumulated) >= sensitivity) {
      const framesToMove = Math.floor(Math.abs(newAccumulated) / sensitivity);
      
      if (newAccumulated > 0) {
        // Dragging right - next frame(s)
        setCurrentFrame(prev => {
          let newFrame = prev + framesToMove;
          while (newFrame > totalFrames) {
            newFrame -= totalFrames;
          }
          return newFrame;
        });
      } else {
        // Dragging left - previous frame(s)
        setCurrentFrame(prev => {
          let newFrame = prev - framesToMove;
          while (newFrame < 1) {
            newFrame += totalFrames;
          }
          return newFrame;
        });
      }
      
      // Reset accumulated delta, keeping remainder
      setAccumulatedDelta(newAccumulated % sensitivity * Math.sign(newAccumulated));
      setStartX(e.clientX);
    } else {
      setAccumulatedDelta(newAccumulated);
    }
  }, [isDragging, startX, totalFrames, accumulatedDelta]);
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setStartX(0);
    setAccumulatedDelta(0);
    startCountdown(); // Start countdown after stopping rotation
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartTouchX(e.touches[0].clientX);
    setIsAutoPlaying(false); // Stop autoplay when user interacts
    setCountdown(null); // Clear countdown when starting to drag
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    e.preventDefault(); // Prevent default touch behavior
    
    const deltaX = e.touches[0].clientX - startTouchX;
    const newAccumulated = accumulatedDelta + deltaX;
    const sensitivity = 80; // Higher sensitivity to prevent jumping
    
    if (Math.abs(newAccumulated) >= sensitivity) {
      const framesToMove = Math.floor(Math.abs(newAccumulated) / sensitivity);
      
      if (newAccumulated > 0) {
        // Dragging right - next frame(s)
        setCurrentFrame(prev => {
          let newFrame = prev + framesToMove;
          while (newFrame > totalFrames) {
            newFrame -= totalFrames;
          }
          return newFrame;
        });
      } else {
        // Dragging left - previous frame(s)
        setCurrentFrame(prev => {
          let newFrame = prev - framesToMove;
          while (newFrame < 1) {
            newFrame += totalFrames;
          }
          return newFrame;
        });
      }
      
      // Reset accumulated delta, keeping remainder
      setAccumulatedDelta(newAccumulated % sensitivity * Math.sign(newAccumulated));
      setStartTouchX(e.touches[0].clientX);
    } else {
      setAccumulatedDelta(newAccumulated);
    }
  }, [isDragging, startTouchX, totalFrames, accumulatedDelta]);

  const handleTouchEnd = () => {
    setIsDragging(false);
    setAccumulatedDelta(0); // Reset accumulated delta when stopping
    startCountdown(); // Start countdown after stopping rotation
  };

  // Start countdown function
  const startCountdown = () => {
    if (!isAutoPlaying) {
      setCountdown(5); // Start at 5 seconds
      let count = 5;
      
      countdownRef.current = setInterval(() => {
        count--;
        if (count <= 0) {
          clearInterval(countdownRef.current);
          setCountdown(null);
          setIsAutoPlaying(true); // Resume autoplay
        } else {
          setCountdown(count);
        }
      }, 1000);
    }
  };

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setCountdown(null); // Clear countdown when manually toggling
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
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
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startX, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd]);

  return (
    <div className="model-360-viewer">
      <div 
        className="model-image-container"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <MaskedLiquidChrome
          maskImage="images/mask-cutouts.png"
          baseColor="#FFFCF1"
          highlightColor="#F6B2B2"
          speed={0.5}
          amplitude={0.5}
          shadowIntensity={.2}
          shadowCenterX={44}
          shadowCenterY={49}
          shadowWidth={38}
          shadowHeight={55}
          shadowStart={70}
          shadowEnd={100}
          shadowFalloff={10}
          shadowColor="rgba(0, 0, 0, 1)"
          interactive={false}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <img 
            src={`${process.env.PUBLIC_URL}/images/modelturning/s${currentFrame}.png`}
            alt={`Model view ${currentFrame}`}
            className="model-image"
            draggable={false}
          />
        </MaskedLiquidChrome>
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
          onClick={toggleAutoplay}
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
        {countdown && (
          <span className="countdown-timer">{countdown}</span>
        )}
      </div>
    </div>
  );
};

export default Model360Viewer;
