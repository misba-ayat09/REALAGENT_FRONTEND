import { useEffect } from 'react';

// Type for the scroll callback
type ScrollCallback = () => void;

/**
 * Throttled scroll event handler that triggers the callback when the user scrolls near the bottom of the page.
 *
 * @param offset - Distance from the bottom to trigger the callback.
 * @param callback - Function to call when the user is near the bottom of the page.
 */
const useScrollNearBottom = (offset = 0, callback: ScrollCallback): void => {
  let triggered = false;

  // Scroll handler
  const handleScroll = () => {
    // Calculate how far the user has scrolled
    const scrollPosition: number = window.scrollY;
    // Calculate the height of the entire document
    const documentHeight: number = document.body.scrollHeight;
    // Calculate the height of the viewport
    const windowHeight: number = window.innerHeight;

    // Check if the user has scrolled to within the specified offset of the bottom of the page
    if (!triggered && scrollPosition + windowHeight >= documentHeight - offset) {
      console.log('Scrolled near the bottom, triggering callback');
      callback(); // Trigger the callback
      triggered = true; // Set triggered to true to prevent further triggers
    }

    // Reset triggered if the user scrolls back up
    if (triggered && scrollPosition + windowHeight < documentHeight - offset) {
      triggered = false;
    }
  };

  // Throttling the scroll handler to improve performance
  const throttledScroll = throttle(handleScroll, 200); // Throttle every 200ms

  // Add scroll event listener on mount and remove on unmount
  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [throttledScroll]);
};

/**
 * Throttle function to limit the frequency of the scroll event handler.
 *
 * @param func - The function to throttle.
 * @param limit - The time limit in milliseconds for throttling.
 * @returns Throttled function.
 */
function throttle(func: () => void, limit: number) {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function () {
    const now = Date.now();
    if (!lastRan) {
      func();
      lastRan = now;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (now - lastRan >= limit) {
          func();
          lastRan = now;
        }
      }, limit - (now - lastRan));
    }
  };
}

export default useScrollNearBottom;
