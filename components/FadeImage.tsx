"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// next/image that fades in once decoded instead of popping in line by line.
// Above-the-fold images (loading="eager") skip the fade so they paint immediately.
export default function FadeImage({ className = "", onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  if (props.loading === "eager" || props.preload) return <Image {...props} alt={alt} className={className} onLoad={onLoad} />;
  return (
    <Image
      {...props}
      alt={alt}
      data-loaded={loaded}
      // The inline script in the root layout may flip data-loaded before hydration.
      suppressHydrationWarning
      className={`img-fade ${className}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
