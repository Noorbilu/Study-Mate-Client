import { Link } from 'react-router';


export default function PartnerCard({ partner }) {
    return (
        <div className="card bg-base-100 shadow h-full">
            <figure className="h-40 overflow-hidden"><img src={partner.profileimage} alt={partner.name} className="w-full h-full object-cover" /></figure>
            <div className="card-body">
                <h3 className="card-title">{partner.name}</h3>
                <p className="text-sm">Subject: <span className="font-medium">{partner.subject}</span></p>
                <p className="text-sm">Mode: {partner.studyMode} • Exp: {partner.experienceLevel}</p>
                <div className="flex items-center gap-2 text-sm">
                    <span>⭐ {partner.rating ?? 0}</span>
                    <span>🤝 {partner.partnerCount ?? 0}</span>
                </div>
                <div className="card-actions justify-end">
                    <Link to="/partners/${partner._id}" className="btn btn-primary btn-sm">View Profile</Link>
            </div>
        </div>
</div >
);
}