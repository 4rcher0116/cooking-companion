import { useEffect, useState } from "react";

const useImageLoader = (imageUrls: string[], delay: number = 0) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setLoadedImages([]);
      return;
    }

    let isCancelled = false;

    const loadImages = async () => {
      const loaded: string[] = Array(imageUrls.length).fill(""); // Initialize array with placeholders

      for (let i = 0; i < imageUrls.length; i++) {
        if (isCancelled) break;

        const url = imageUrls[i];

        try {
          await new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Ignore errors
          });
          loaded[i] = url; // Update the specific index
        } catch {
          loaded[i] = ""; // Fallback for failed images
        }

        if (!isCancelled) setLoadedImages([...loaded]); // Trigger a state update
        if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
      }
    };

    setLoadedImages([]); // Reset when imageUrls change
    loadImages();

    return () => {
      isCancelled = true; // Cancel ongoing loads
    };
  }, [imageUrls, delay]);

  return loadedImages;
};

export default useImageLoader;
