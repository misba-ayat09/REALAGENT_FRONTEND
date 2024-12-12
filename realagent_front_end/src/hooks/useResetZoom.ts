import { useEffect } from 'react';

function useResetZoom() {
  useEffect(() => {
    // const resetZoom = () => {
    //   const viewport = window.visualViewport;


    //   // Check if viewport scale is greater than 1 (i.e., greater than 100%)
    //   if (viewport && viewport.scale > 1) {

    //     // Directly reset zoom using CSS transforms
    //     document.body.style.transform = 'scale(1)';
    //     document.body.style.transformOrigin = 'top left';

    //     // Optionally reset other properties if needed
    //     document.body.style.width = '100%';
    //     document.body.style.height = '100%';
    //   }
    // };

    // Initial zoom reset
    // resetZoom();

    // window.addEventListener('resize', () => {
    //   const browserZoomLevel = Math.round(window.devicePixelRatio * 100);
    // });

    // Add event listener for viewport changes (zoom)
    // window.visualViewport?.addEventListener('resize', resetZoom);

    return () => {
      // window.visualViewport?.removeEventListener('resize', resetZoom);
    };
  }, []);
}

export default useResetZoom;
