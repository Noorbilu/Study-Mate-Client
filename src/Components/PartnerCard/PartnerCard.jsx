import { Link } from "react-router";
import { motion } from "framer-motion";
import { Star, Users, BookOpen } from "lucide-react";

const PartnerCard = ({ partner }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(162, 28, 175, 0.25)" }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-fuchsia-50 via-pink-50 to-purple-50 rounded-3xl shadow-md border border-fuchsia-200 overflow-hidden hover:border-fuchsia-300 hover:shadow-lg transition-all duration-300"
        >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
                <img
                    src={partner.profileimage}
                    alt={partner.name}
                    className="w-full h-full transform hover:scale-110 transition duration-500"
                />
                <div className="bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-center justify-center">
                    <div className="bg-white/90 p-3 rounded-full shadow">
                        <BookOpen className="text-fuchsia-700 w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="p-5 text-center">
                <h3 className="font-semibold text-lg text-fuchsia-900 mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                    Subject: <span className="font-medium text-fuchsia-700">{partner.subject}</span>
                </p>
                <p className="text-xs text-gray-500 mb-3">
                    {partner.studyMode} • {partner.experienceLevel}
                </p>

                <div className="flex justify-center gap-4 text-sm text-gray-700 mb-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {partner.rating ?? 0}
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-fuchsia-600" />
                        {partner.partnerCount ?? 0}
                    </div>
                </div>

                <Link
                    to={`/partners/${partner._id}`}
                    className="inline-block px-4 py-2 text-white text-sm font-medium rounded-xl bg-gradient-to-r from-fuchsia-800 to-purple-500 hover:from-purple-700 hover:to-fuchsia-800 shadow-md transition-all duration-300"
                >
                    View Profile
                </Link>
            </div>
        </motion.div>
    );
}


export default PartnerCard;