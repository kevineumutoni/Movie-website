"use client";
import Image from "next/image";
import { useState } from "react";

const DEFAULT_FALLBACK = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/bDG3yei6AJlEAK3A5wN7RwFXQ7V.jpg";

export interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  style?: React.CSSProperties;
}

export default function SmartImage({
  src,
  alt,
  fill,
  priority,
  className,
  sizes,
  style,
  ...props
}: SmartImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      sizes={sizes}
      style={style}
      onError={() => setImgSrc(DEFAULT_FALLBACK)}
      {...props}
    />
  );
}