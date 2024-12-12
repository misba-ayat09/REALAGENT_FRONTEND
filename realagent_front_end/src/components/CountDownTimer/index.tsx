/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "./CountDownTimer.css";
import { Time } from "../../utils/time";



/**
 * Function to decrement the time by one second, handling roll-over.
 * @param time - The time object to decrement.
 * @returns The updated time object.
 */
const decrementTime = (time: Time): Time => {
  let newHours = time.hours;
  let newMinutes = time.minutes;
  let newSeconds = time.seconds - 1;

  if (newSeconds < 0) {
    newMinutes--;
    newSeconds = 59;
  }

  if (newMinutes < 0) {
    newHours--;
    newMinutes = 59;
  }

  return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
};

interface CountDownTimerProps {
  time?: Time;
  onComplete?: () => void; // Callback to be triggered when the countdown is complete
}

/**
 * A countdown timer component.
 */
export const CountDownTimer: React.FC<CountDownTimerProps> = (props) => {
  const initialTime: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [time, setTime] = useState<Time>(props?.time || initialTime);
  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (props?.time) setTime(props?.time);

    return () => setTime(initialTime);
  }, [props?.time]);

  useEffect(() => {
    if (time.hours + time.minutes + time.seconds > 0) {
      interval.current = setInterval(() => {
        setTime((prevState) => {
          const newTime = decrementTime(prevState);
          if (
            newTime.hours === initialTime.hours &&
            newTime.minutes === initialTime.minutes &&
            newTime.seconds === initialTime.seconds
          ) {
            // Check if onComplete prop is defined and call it
            if (props.onComplete) {
              props.onComplete();
            }
          }
          return newTime;
        });
      }, 1000) as unknown as number;
    } else {
      clearInterval(interval.current!);
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [time, props.onComplete]);

  /**
   * Get an array of two-digit strings representing the digits of a number.
   * @param num - The number to convert to an array of digits.
   * @returns An array of two-digit strings.
   */
  const getDigitsArray = (num: number): string[] =>
    num.toString().padStart(2, "0").split("");

  return (
    <div
      // style={{ marginLeft: "10px" }}
      className='timer d-flex flex-row justify-content-center align-items-center'
    >
      {getDigitsArray(time.hours).map((digit, index) => (
        <div key={index}>
          <span className='digits'>{digit}</span>
        </div>
      ))}
      <span className='separator'>:</span>
      {getDigitsArray(time.minutes).map((digit, index) => (
        <div key={index}>
          <span className='digits'>{digit}</span>
        </div>
      ))}
      <span className='separator'>:</span>
      {getDigitsArray(time.seconds).map((digit, index) => (
        <div key={index}>
          <span className='digits'>{digit}</span>
        </div>
      ))}
    </div>
  );
};
