"use client";
import React from "react";
import Link from "next/link";

const Breadcrumb = ({ paths = [], style = {} }) => {
  return (
    <nav aria-label="breadcrumb" className="text-sm" style={style}>
      <ol className="flex gap-2 items-center">
        {paths.map((p, idx) => (
          <li key={p.href || p.label} className="flex items-center">
            {idx !== 0 && <span className="mx-1">/</span>}
            {p.href ? (
              <Link href={p.href} className="hover:underline">
                {p.label}
              </Link>
            ) : (
              <span>{p.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
