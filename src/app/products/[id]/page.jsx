"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Truck, Shield, RotateCcw } from "lucide-react";
import ProductAccordion from "../../components/ProductAccordion";

const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return isHydrated;
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const isHydrated = useHydration();
  const router = useRouter();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${productId}`
        );
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0937D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="bg-[#A0937D] text-white px-6 py-2 rounded-md hover:bg-[#8a826b] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const images = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls 
    : ['/placeholder.jpg'];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 py-8">
        
        {/* Left - Product Images */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={images[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Discount Badge */}
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                  {product.discountPercentage}% Off
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                    selectedImage === index ? 'border-[#A0937D]' : 'border-gray-300'
                  }`}
                >
                  <Image
                    src={image || '/placeholder.jpg'}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* Brand */}
          <p className="text-gray-500 text-lg">{product.brand || 'Brand'}</p>

          {/* Price Section */}
          <div className="space-y-2">
            <p className="line-through text-gray-400 text-lg">
              {formatPrice(product.originalPrice || 0)}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-black">
                {formatPrice(product.discountedPrice || product.originalPrice || 0)}
              </p>
              {product.discountPercentage && (
                <span className="text-red-600 text-lg font-semibold">
                  {product.discountPercentage}% off
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              (Inclusive of all prices). Tax {product.priceIncludesTax ? 'included' : 'excluded'}.{" "}
              <span className="underline cursor-pointer">Shipping</span> calculated at checkout.
            </p>
          </div>

          {/* Stock Status */}
          {product.stockStatus && (
            <p className={`text-sm font-medium ${
              product.stockStatus === 'In Stock' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {product.stockStatus === 'In Stock' ? '✓ In Stock' : 'Low stock'}
            </p>
          )}

          {/* Benefits Info */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200 border-b">
            <div className="text-center">
              <Truck className="text-[#A0937D] mx-auto mb-2" size={24} />
              <p className="font-medium text-sm">
                {product.delivery || 'Free delivery'}
              </p>
            </div>
            <div className="text-center">
              <Shield className="text-[#A0937D] mx-auto mb-2" size={24} />
              <p className="font-medium text-sm">
                {product.warrantyPeriod || '1 year warranty'}
              </p>
            </div>
            <div className="text-center">
              <RotateCcw className="text-[#A0937D] mx-auto mb-2" size={24} />
              <p className="font-medium text-sm">
                {product.installation || 'Free installation'}
              </p>
            </div>
          </div>

          {/* Product Details - Attributes */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            {product.material && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Material:</span>
                <span className="text-gray-600">{product.material}</span>
              </div>
            )}
            {product.color && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Color:</span>
                <span className="text-gray-600">{product.color}</span>
              </div>
            )}
            {product.seaterCount && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Seats:</span>
                <span className="text-gray-600">{product.seaterCount} Seater</span>
              </div>
            )}
            {product.warrantyPeriod && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Warranty:</span>
                <span className="text-gray-600">{product.warrantyPeriod}</span>
              </div>
            )}
          </div>

          {/* Features List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="text-[#A0937D] font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Product Care Instructions */}
          {product.productCareInstructions && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-900 text-sm">
                <strong>Care Instructions:</strong> {product.productCareInstructions}
              </p>
            </div>
          )}

          {/* Product Accordion */}
         <ProductAccordion product={product} />
        </div>
      </div>
    </div>
  );
}
