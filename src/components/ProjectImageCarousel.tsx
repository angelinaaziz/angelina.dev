'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type ProjectImageCarouselProps = {
  images: string[];
  title: string;
};

export default function ProjectImageCarousel({ images, title }: ProjectImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Skip if there's only one image
  if (images.length <= 1) {
    return (
      <div className="relative rounded-2xl mb-8 overflow-hidden shadow-soft bg-gray-100">
        <div className="w-full h-[250px] md:h-[300px]">
          <Image 
            src={images[0]} 
            alt={`${title} screenshot`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative rounded-2xl mb-8 overflow-hidden group shadow-soft bg-gray-100">
      {/* Navigation buttons - only visible on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button 
          onClick={goToPrevious} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-purple-600 p-2 rounded-full shadow-md transition-all duration-300 z-20"
          aria-label="Previous image"
        >
          <FaChevronLeft size={20} />
        </button>
        <button 
          onClick={goToNext} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-purple-600 p-2 rounded-full shadow-md transition-all duration-300 z-20"
          aria-label="Next image"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Images */}
      <div className="w-full h-[250px] md:h-[300px] relative">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image 
              src={image} 
              alt={`${title} screenshot ${index + 1}`} 
              fill
              className="object-contain"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-purple-600 w-8' 
                : 'bg-white/70 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
} 