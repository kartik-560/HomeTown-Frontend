"use client";
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
<div className="flex items-center gap-3">
<button
onClick={() => setSidebarOpen(true)}
className="px-3 py-2 border rounded-md"
style={{ borderColor: themeColors.border }}
>
Filters
</button>


<div className="hidden sm:flex items-center gap-2">
<label className="text-sm">Min:</label>
<input
type="number"
onChange={(e) => setMinPrice(Number(e.target.value || 0))}
className="w-24 p-1 border rounded"
style={{ borderColor: themeColors.border }}
/>
<label className="text-sm">Max:</label>
<input
type="number"
onChange={(e) => setMaxPrice(Number(e.target.value || 0))}
className="w-24 p-1 border rounded"
style={{ borderColor: themeColors.border }}
/>
</div>
</div>


<div className="flex items-center gap-3">
<div className="flex gap-2">
<button
onClick={() => setViewMode("grid")}
className={`px-3 py-2 rounded ${viewMode === "grid" ? "font-semibold" : ""}`}
style={{ border: `1px solid ${themeColors.border}` }}
>
Grid
</button>
<button
onClick={() => setViewMode("list")}
className={`px-3 py-2 rounded ${viewMode === "list" ? "font-semibold" : ""}`}
style={{ border: `1px solid ${themeColors.border}` }}
>
List
</button>
</div>


<button
onClick={clearAll}
className="px-3 py-2 rounded border"
style={{ borderColor: themeColors.border }}
>
Clear
</button>
</div>
</div>
);
};


export default FilterTopBar;