import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ProductAccordion({ product }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Build accordion data from product
  const accordionData = [];

  // Features
  if (product?.features && product.features.length > 0) {
    accordionData.push({
      title: "Features",
      content: (
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {product.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      ),
    });
  }

  // Details
  const hasDetails = product?.material || product?.color || product?.seaterCount || product?.brand;
  if (hasDetails) {
    accordionData.push({
      title: "Details",
      content: (
        <div className="text-gray-700 space-y-2">
          {product?.brand && <p><strong>Brand:</strong> {product.brand}</p>}
          {product?.material && <p><strong>Material:</strong> {product.material}</p>}
          {product?.color && <p><strong>Color:</strong> {product.color}</p>}
          {product?.seaterCount && <p><strong>Seats:</strong> {product.seaterCount} Seater</p>}
        </div>
      ),
    });
  }

  // Product Care Instructions
  if (product?.productCareInstructions) {
    accordionData.push({
      title: "Product Care Instruction",
      content: (
        <p className="text-gray-700 whitespace-pre-line">
          {product.productCareInstructions}
        </p>
      ),
    });
  }

  // Return and Cancellation Policy
  if (product?.returnAndCancellationPolicy) {
    accordionData.push({
      title: "Return and cancellation policy",
      content: (
        <p className="text-gray-700 whitespace-pre-line">
          {product.returnAndCancellationPolicy}
        </p>
      ),
    });
  }

  // Show note as "About this product" if available
  if (product?.note) {
    accordionData.push({
      title: "About this product",
      content: (
        <p className="text-gray-700 whitespace-pre-line">
          {product.note}
        </p>
      ),
    });
  }

  // If no data, return null
  if (accordionData.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 mt-8">
      {accordionData.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-900 hover:text-[#A0937D] transition-colors"
          >
            {item.title}
            <span className={`text-xl transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
              <ChevronDown size={20} />
            </span>
          </button>
          {openIndex === index && (
            <div className="pb-4 text-gray-700">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
