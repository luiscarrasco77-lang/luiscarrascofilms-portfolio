"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// next/image that fades in once decoded instead of popping in line by line.
export default function FadeImage({ className = "", onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      alt={alt}
      data-loaded={loaded}
      className={`img-fade ${className}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
