import React from "react";
import PartnerCard from "./PartnerCard";

export const PartnerCardSkeleton = () => (
  <div className="h-full flex flex-col bg-gradient-to-br from-fuchsia-50 via-pink-50 to-purple-50 rounded-3xl shadow-md border border-fuchsia-200 overflow-hidden animate-pulse">
    <div className="h-40 bg-fuchsia-100" />
    <div className="p-5 flex-1 flex flex-col">
      <div className="h-5 bg-fuchsia-100 rounded w-2/3 mb-2" />
      <div className="h-4 bg-fuchsia-100 rounded w-full mb-1" />
      <div className="h-4 bg-fuchsia-100 rounded w-5/6 mb-4" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="h-4 bg-fuchsia-100 rounded" />
        <div className="h-4 bg-fuchsia-100 rounded" />
        <div className="h-4 bg-fuchsia-100 rounded" />
        <div className="h-4 bg-fuchsia-100 rounded" />
      </div>
      <div className="mt-auto h-9 bg-fuchsia-200 rounded-xl" />
    </div>
  </div>
);

const PartnersGrid = ({
  partners = [],
  loading = false,
  basePath = "/partners",
  skeletonCount = 12,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <PartnerCardSkeleton key={i} />
          ))
        : partners.map((p) => (
            <PartnerCard key={p._id} partner={p} basePath={basePath} />
          ))}
    </div>
  );
};

export default PartnersGrid;