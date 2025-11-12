import { Link } from 'react-router';


export default function PartnerCard({ partner }) {
    return (
        <div className="card bg-fuchsia-100 shadow max-w-11/12 h-full">
            <figure className="h-40 w-50 overflow-hidden">
                <img src={partner.profileimage} alt={partner.name} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
                <h3 className="card-title">{partner.name}</h3>
                <p className="text-sm">Subject: <span className="font-medium">{partner.subject}</span></p>
                <p className="text-sm">Mode: {partner.studyMode} • Exp: {partner.experienceLevel}</p>
                <div className="flex items-center gap-2 text-sm">
                    <span>⭐ {partner.rating ?? 0}</span>
                    <span>🤝 {partner.partnerCount ?? 0}</span>
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/partners/${partner._id}`} className="btn btn-primary btn-sm m-2 bg-gradient-to-r from-purple-900 to-gray-400 text-white border-none">View Profile</Link>
            </div>
        </div>
</div >
);
}