import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  BookOpen,
  MapPin,
  Calendar,
  DollarSign,
  BadgeCheck,
} from "lucide-react";

const fallbackImg =
  "https://placehold.co/640x360?text=StudyMate";

const excerpt = (str, max = 100) => {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max - 1)}…` : str;
};

const formatDate = (iso) => {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return null;
  }
};

const PartnerCard = ({ partner, basePath = "/partners" }) => {
  const imgSrc =
    partner?.profileimage ||
    (Array.isArray(partner?.images) && partner.images[0]) ||
    fallbackImg;

  const shortDesc = excerpt(
    partner?.description ||
      partner?.bio ||
      `${partner?.subject || ""}${
        partner?.studyMode ? ` • ${partner.studyMode}` : ""
      }`,
    110
  );

  const price = partner?.price ?? partner?.hourlyRate;
  const status =
    partner?.status ||
    (partner?.availabilityTime ? "Available" : "Unavailable");
  const addedDate = formatDate(partner?.updatedAt || partner?.createdAt);
  const id = partner?._id?.$oid || partner?._id || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 25px rgba(162, 28, 175, 0.25)",
      }}
      transition={{ duration: 0.35 }}
      className="h-full flex flex-col bg-gradient-to-br from-fuchsia-50 via-pink-50 to-purple-50 rounded-3xl shadow-md border border-fuchsia-200 overflow-hidden hover:border-fuchsia-300 hover:shadow-lg transition-all duration-300"
    >
    
      <div className="relative h-40 overflow-hidden">
        <img
          src={imgSrc}
          alt={partner?.name || "Study partner"}
          className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg;
          }}
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center">
          <div className="bg-white/90 p-3 rounded-full shadow">
            <BookOpen className="text-fuchsia-700 w-6 h-6" />
          </div>
        </div>
      </div>

    
      <div className="p-5 flex-1 flex flex-col text-center">
        <h3 className="font-semibold text-lg text-fuchsia-900 mb-1 truncate">
          {partner?.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 min-h-[40px] line-clamp-2">
          {shortDesc}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{partner?.rating ?? 0}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Users className="w-4 h-4 text-fuchsia-600" />
            <span>{partner?.partnerCount ?? 0}</span>
          </div>
          {partner?.location && (
            <div className="flex items-center justify-center gap-1 col-span-2 sm:col-span-1">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span className="truncate max-w-[120px]">
                {partner.location}
              </span>
            </div>
          )}
          {addedDate && (
            <div className="flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>{addedDate}</span>
            </div>
          )}
          {price != null && (
            <div className="flex items-center justify-center gap-1 col-span-2 sm:col-span-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>
                {typeof price === "number" ? `$${price}` : String(price)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-center gap-1 col-span-2 sm:col-span-1">
            <BadgeCheck
              className={`w-4 h-4 ${
                String(status)
                  .toLowerCase()
                  .includes("un")
                  ? "text-gray-500"
                  : "text-emerald-600"
              }`}
            />
            <span>{status}</span>
          </div>
        </div>

        
        <div className="mt-auto">
          <Link
            to={id ? `${basePath}/${id}` : "#"}
            onClick={(e) => {
              if (!id) e.preventDefault();
            }}
            aria-label={`View ${partner?.name} details`}
            className="inline-block px-4 py-2 text-white text-sm font-medium rounded-xl bg-gradient-to-r from-fuchsia-800 to-purple-500 hover:from-purple-700 hover:to-fuchsia-800 shadow-md transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PartnerCard;