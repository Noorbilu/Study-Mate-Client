import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate, useLoaderData } from 'react-router'; 
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import axios from '../../api/axiosInstance';

const MediaGallery = ({ items = [] }) => {
  const [current, setCurrent] = useState(0);
  const hasItems = items && items.length > 0;
  if (!hasItems) return null;

  const selected = items[current];

  return (
    <div>
      <div className="w-full h-72 md:h-96 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        {selected?.type === 'video' ? (
          <video
            controls
            className="w-full h-full object-cover"
            src={selected.url}
          />
        ) : (
          <img
            src={selected.url}
            alt={`Gallery item ${current + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      {items.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {items.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`border rounded overflow-hidden w-20 h-16 shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                idx === current ? 'ring-2 ring-purple-600' : ''
              }`}
              aria-label={`Show media ${idx + 1}`}
            >
              {m.type === 'video' ? (
                <div className="w-full h-full grid place-items-center bg-black text-white text-xs">
                  Video
                </div>
              ) : (
                <img
                  src={m.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const KeyInfo = ({ partner }) => {
  const rows = [
    { label: 'Subject', value: partner?.subject },
    { label: 'Study Mode', value: partner?.studyMode },
    { label: 'Availability', value: partner?.availabilityTime },
    { label: 'Experience', value: partner?.experienceLevel },
    { label: 'Location', value: partner?.location },
    { label: 'Timezone', value: partner?.timezone },
    { label: 'Languages', value: Array.isArray(partner?.languages) ? partner.languages.join(', ') : partner?.languages },
    { label: 'Rating', value: partner?.rating != null ? `⭐ ${partner.rating}` : null },
    { label: 'Partner Count', value: partner?.partnerCount != null ? `🤝 ${partner.partnerCount}` : null },
  ].filter(r => r.value);

  const rules = partner?.rules || partner?.studyRules;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Key Information</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          {rows.map((r, i) => (
            <div key={i} className="flex">
              <dt className="w-32 text-gray-600">{r.label}:</dt>
              <dd className="font-medium">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      {Array.isArray(rules) && rules.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Rules</h3>
          <ul className="list-disc list-inside space-y-1">
            {rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ReviewsSection = ({ partnerId, initialRating }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const avgFromReviews =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : null;

  const average = initialRating ?? (avgFromReviews ? Number(avgFromReviews) : 0);

  useEffect(() => {
    let mounted = true;
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/mates/${partnerId}/reviews`);
        if (mounted) setReviews(Array.isArray(res.data) ? res.data : []);
      } catch {
        try {
          const res2 = await axios.get('/reviews', { params: { partnerId } });
          if (mounted) setReviews(Array.isArray(res2.data) ? res2.data : []);
        } catch {
          if (mounted) setReviews([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (partnerId) fetchReviews();
    return () => {
      mounted = false;
    };
  }, [partnerId]);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Reviews & Ratings</h2>
      <div className="flex items-center gap-2 text-sm mb-4">
        <span className="text-lg">⭐ {average || 0}</span>
        {reviews?.length ? <span className="text-gray-600">({reviews.length} review{reviews.length > 1 ? 's' : ''})</span> : null}
      </div>

      {loading ? (
        <div className="text-sm text-gray-600">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-sm text-gray-600">No reviews yet.</div>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r, idx) => (
            <li key={r.id || idx} className="p-4 rounded border border-purple-200 bg-white">
              <div className="flex justify-between items-center mb-1">
                <div className="font-medium">{r.reviewerName || 'Anonymous'}</div>
                {r.rating != null && <div className="text-yellow-600">⭐ {r.rating}</div>}
              </div>
              {r.comment && <p className="text-sm text-gray-800">{r.comment}</p>}
              {r.createdAt && (
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(r.createdAt).toLocaleDateString()}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const RelatedPartners = ({ subject, excludeId }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchRelated = async () => {
      if (!subject) {
        setRelated([]);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/mates', { params: { subject, limit: 6 } });
        const arr = Array.isArray(res.data) ? res.data : [];
        const filtered = arr.filter((p) => p._id !== excludeId);
        if (mounted) setRelated(filtered);
      } catch {
        if (mounted) setRelated([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchRelated();
    return () => {
      mounted = false;
    };
  }, [subject, excludeId]);

  if (loading) {
    return (
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Related Partners</h2>
        <div className="text-sm text-gray-600">Loading suggestions...</div>
      </section>
    );
  }

  if (!related.length) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Related Partners</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((p) => (
          <Link
            key={p._id}
            to={`/mates/${p._id}`}
            className="block rounded border border-purple-200 hover:border-purple-400 transition bg-white"
          >
            <img
              src={p.profileimage || (Array.isArray(p.images) && p.images[0]) || 'https://via.placeholder.com/600x400?text=StudyMate'}
              alt={p.name}
              className="w-full h-40 object-cover rounded-t"
              loading="lazy"
            />
            <div className="p-3">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-700">{p.subject}</div>
              {p.location && <div className="text-xs text-gray-500 mt-1">{p.location}</div>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const PartnerDetails = () => {
  const partner = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [ setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`/mates/${id}`)
      .then((res) => {
        if (mounted) setPartner(res.data);
      })
      //.catch(() => toast.error('Failed to load partner details'))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  const mediaItems = useMemo(() => {
    if (!partner) return [];
    if (Array.isArray(partner.media) && partner.media.length) {
      return partner.media.map((m) =>
        typeof m === 'string' ? { type: 'image', url: m } : m
      );
    }
    if (Array.isArray(partner.images) && partner.images.length) {
      return partner.images.map((url) => ({ type: 'image', url }));
    }
    if (partner.profileimage) {
      return [{ type: 'image', url: partner.profileimage }];
    }
    return [];
  }, [partner]);

  const sendRequest = async () => {
    if (!partner) return;
    if (!user) {
      toast.warn('Please login first!');
      return;
    }
    try {
      const connectionData = {
        partnerId: partner._id,
        partnerName: partner.name,
        partnerEmail: partner.email,
        requesterName: user.displayName,
        requesterEmail: user.email,
        message,
        createdAt: new Date().toISOString(),
      };

      await axios.post('/connection', connectionData);

      toast.success('Connection request sent!');
      setMessage('');
    } catch (e) {
      console.error(e);
      toast.error('Failed to send connection request');
    }
  };

  if (loading) return <Spinner />;

  if (!partner) {
    return (
      <div className="container mx-auto px-4 my-8">Partner not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 my-8">
      
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{partner.name}</h1>
          {partner.location && <p className="opacity-80">{partner.location}</p>}
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-ghost"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.info('Link copied!');
            }}
          >
            Share
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MediaGallery items={mediaItems} />

        <div>
          <div className="mt-2 space-y-1 text-sm">
            <div>Subject: <b>{partner.subject}</b></div>
            {partner.studyMode && <div>Study Mode: {partner.studyMode}</div>}
            {partner.availabilityTime && <div>Availability: {partner.availabilityTime}</div>}
            {partner.experienceLevel && <div>Experience: {partner.experienceLevel}</div>}
            <div>Rating: ⭐ {partner.rating ?? 0}</div>
            <div>Partner Count: 🤝 {partner.partnerCount ?? 0}</div>
          </div>

          <div className="mt-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Add a short message (optional)"
            ></textarea>
            <button
              onClick={sendRequest}
              className="btn btn-primary mt-2 bg-gradient-to-r from-purple-900 to-gray-400 text-white border-none"
            >
              {user ? 'Send Partner Request' : 'Login to Send Request'}
            </button>
          </div>
        </div>
      </div>

      {(partner.description || partner.bio) && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-800 leading-relaxed">
            {partner.description || partner.bio}
          </p>
        </section>
      )}

      <section className="mt-8">
        <KeyInfo partner={partner} />
      </section>

      <ReviewsSection partnerId={partner._id} initialRating={partner.rating} />

    </div>
  );
};

export default PartnerDetails;
