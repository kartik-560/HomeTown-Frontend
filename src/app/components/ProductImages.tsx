"use client";
import { useState } from "react";
import Image from "next/image";

const images = [
  "/images/im-2.webp",
  "/images/im-3.webp",
  "/images/im-4.webp",
  "/images/im-5.webp",
  "/images/im-6.webp",
  "/images/im-7.webp",
  "/images/im-8.webp",
  "/images/im-9.webp",
];

export default function ProductImages() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="h-[500px] relative mb-4">
        <Image
          src={images[selected]}
          alt="Product"
          fill
          sizes="80vw"
          className="object-contain rounded-md"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative h-32 cursor-pointer rounded-md border ${
              selected === index ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelected(index)}
          >
            <Image
              src={img}
              alt={`Product thumbnail ${index + 1}`}
              fill
              sizes="25vw"
              className="object-contain rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
