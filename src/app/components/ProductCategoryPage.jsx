"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, X, Grid, List, Star } from "lucide-react";
import { filterOptions, sortOptions } from "../data/products";

// Custom hook to handle hydration
const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};

export default function ProductCategoryPage({ category, categoryName }) {
  const isHydrated = useHydration();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?category=${category}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          // Backend returns array directly
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  // Initialize selected filters based on category
  useEffect(() => {
    const categoryFilters = filterOptions[category] || {};
    const initialFilters = {};
    Object.keys(categoryFilters).forEach(filterType => {
      initialFilters[filterType] = [];
    });
    setSelectedFilters(initialFilters);
  }, [category]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply price filter
    filtered = filtered.filter(product =>
      product.discountedPrice >= priceRange.min &&
      product.discountedPrice <= priceRange.max
    );

    // Apply category filters
    Object.keys(selectedFilters).forEach(filterType => {
      if (selectedFilters[filterType] && selectedFilters[filterType].length > 0) {
        filtered = filtered.filter(product => {
          const fieldValue = product[filterType]?.toString();
          return selectedFilters[filterType].includes(fieldValue);
        });
      }
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "discount":
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  }, [products, selectedFilters, priceRange, sortBy]);

  const toggleFilter = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType]?.includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...(prev[filterType] || []), value]
    }));
  };

  const clearAllFilters = () => {
    const categoryFilters = filterOptions[category] || {};
    const clearedFilters = {};
    Object.keys(categoryFilters).forEach(filterType => {
      clearedFilters[filterType] = [];
    });
    setSelectedFilters(clearedFilters);
    setPriceRange({ min: 0, max: 50000 });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Show loading state during hydration
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0937D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  const categoryFilters = filterOptions[category] || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:relative lg:shadow-sm' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8 h-full lg:h-auto overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#A0937D] focus:border-transparent"
                      suppressHydrationWarning
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 50000 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#A0937D] focus:border-transparent"
                      suppressHydrationWarning
                    />
                  </div>
                </div>
              </div>

              {/* Filter Categories */}
              {Object.keys(categoryFilters).map((filterType) => (
                <div key={filterType} className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 capitalize">
                    {filterType === 'seaterCount' ? 'Number of Seats' :
                      filterType === 'pieces' ? 'Number of Pieces' :
                        filterType}
                  </h3>
                  <div className="space-y-2">
                    {categoryFilters[filterType].map((option) => (
                      <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={selectedFilters[filterType]?.includes(option) || false}
                          onChange={() => toggleFilter(filterType, option)}
                          className="rounded border-gray-300 text-[#A0937D] focus:ring-[#A0937D]"
                          suppressHydrationWarning
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={clearAllFilters}
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Filter size={16} />
                    Filters
                  </button>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#A0937D] focus:border-transparent"
                      suppressHydrationWarning
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md ${viewMode === "grid" ? "bg-[#A0937D] text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md ${viewMode === "list" ? "bg-[#A0937D] text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.categoryIds?.[0] || 'all'}/${product.id}`}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden product-card block ${viewMode === "list" ? "flex" : ""
                    }`}
                >
                  {/* Product Image */}
                  <div className={`relative group cursor-pointer ${viewMode === "list" ? "w-80 h-64" : "h-64"}`}>
                    <Image
                      src={product.imageUrls?.[0] || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity group-hover:opacity-0"
                    />
                    <Image
                      src={product.imageUrls?.[1] || product.imageUrls?.[0] || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 bg-[#A0937D] text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discountPercentage}% Off
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.note || product.productCareInstructions || 'No description available'}
                    </p>

                    {/* Rating - Static for now since backend doesn't have rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      {/* <span className="text-sm text-gray-600">
                        4.0 (0 reviews)
                      </span> */}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-[#A0937D]">
                        {formatPrice(product.discountedPrice || product.originalPrice)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
                      {product.material && (
                        <span className="bg-gray-100 px-2 py-1 rounded">{product.material}</span>
                      )}
                      {product.color && (
                        <span className="bg-gray-100 px-2 py-1 rounded">{product.color}</span>
                      )}
                      {product.seaterCount && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {product.seaterCount} Seater
                        </span>
                      )}
                      {product.brand && (
                        <span className="bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <div className="flex justify-center">
                      <button
                        className="w-full bg-[#A0937D] text-white py-2 px-4 rounded-md hover:bg-[#8a826b] transition-colors font-medium"
                        suppressHydrationWarning
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2 bg-[#A0937D] text-white rounded-md hover:bg-[#8a826b] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
