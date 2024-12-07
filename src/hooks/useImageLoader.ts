import { useState, useEffect } from 'react';

/**
 * Allows the loading of images with a delay to comply with api restrictions
 * @param imageUrls 
 * @param delay 
 * @returns 
 */
const useImageLoader = (imageUrls: string[], delay: number) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < imageUrls.length) {
      const timer = setTimeout(() => {
        setLoadedImages((prev) => [...prev, imageUrls[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, imageUrls, delay]);

  return loadedImages;
};

export default useImageLoader;