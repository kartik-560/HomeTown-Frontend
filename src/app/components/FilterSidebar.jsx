"use client";
import React from "react";

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);

const FilterSidebar = ({ filters, selectedFilters, toggleFilter, close }) => {
  return (
    <aside
      className="w-full sm:w-72 p-4 border rounded bg-white"
      style={{ borderColor: "#e6e6e6" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Filters</h3>
        <button onClick={close} className="text-sm">
          Close
        </button>
      </div>

      {Object.keys(filters).map((category) => (
        <div key={category} className="mb-4">
          <h4 className="text-sm font-medium mb-2">{category}</h4>
          <div className="flex flex-col gap-2">
            {filters[category].map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={selectedFilters[category]?.includes(opt)}
                onChange={() => toggleFilter(category, opt)}
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;
