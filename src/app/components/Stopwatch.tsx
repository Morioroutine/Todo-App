import React, { useState, useEffect, useRef } from 'react';
import '../globals.css'

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      const interval = setInterval(() => {

        setTime(Date.now() - startTimeRef.current);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="timer">
      <span>{("0" + Math.floor((time / 3600000))).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span className="smallText">{("0" + Math.floor((time % 1000) / 10)).slice(-2)}</span>
      <div>
        <button onClick={startStopwatch} className="watchButton">Start</button>
        <button onClick={stopStopwatch} className="watchButton"> Stop</button>
        <button onClick={resetStopwatch} className="watchButton">Reset</button>
      </div>
    </div>
  );
};
