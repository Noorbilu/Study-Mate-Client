import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = ({
  brand = {
    name: 'StudyMate',
    emoji: '📚',
    tagline:
      'Find your perfect study partner by subject, style, and schedule. Learn better together.',
  },
  contactInfo = {
    email: 'studymate@gmail.com',
    phone: '+880 1234-000000',
    address: 'Lane Side, Badda, Dhaka',
  },
  socialLinks = {
    facebook: 'https://www.facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://www.linkedin.com',
    instagram: 'https://instagram.com',
  },
}) => {
  const year = new Date().getFullYear();

  const socials = [
    { name: 'Facebook', Icon: FaFacebook, url: socialLinks?.facebook },
    { name: 'X (Twitter)', Icon: FaXTwitter, url: socialLinks?.twitter },
    { name: 'LinkedIn', Icon: FaLinkedin, url: socialLinks?.linkedin },
    { name: 'Instagram', Icon: FaInstagram, url: socialLinks?.instagram },
  ].filter((s) => Boolean(s.url));

  const email = contactInfo?.email;
  const phone = contactInfo?.phone;
  const address = contactInfo?.address;
  const telHref =
    phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined;
  const mailHref =
    email ? `mailto:${email}?subject=Support%20Request` : undefined;

  return (
    <footer className="bg-purple-200 text-purple-950 mt-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3 sm:grid-cols-1">
        
        <div className="space-y-2">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">{brand.emoji}</span>
            {brand.name}
          </div>
          {brand.tagline && (
            <p className="text-sm">{brand.tagline}</p>
          )}
        </div>

        
        <div className="space-y-3">
          <div className="font-semibold">Contact</div>
          <ul className="text-sm space-y-1">
            {email && (
              <li>
                <a
                  href={mailHref}
                  className="hover:text-purple-700 transition"
                  aria-label={`Email ${brand.name}`}
                >
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a
                  href={telHref}
                  className="hover:text-purple-700 transition"
                  aria-label={`Call ${brand.name}`}
                >
                  {phone}
                </a>
              </li>
            )}
            {address && (
              <li>
                <address className="not-italic">
                  {address}
                </address>
              </li>
            )}
          </ul>
        </div>

        
        <div className="space-y-2 flex flex-col items-start sm:items-start md:items-center">
          <div className="font-semibold">Follow us</div>
          <div className="flex gap-4 text-2xl">
            {socials.map(({ name, Icon, url }) => (
              <a
                key={name}
                href={url}
                aria-label={name}
                title={name}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-700 transition"
              >
                <Icon />
                <span className="sr-only">{name}</span>
              </a>
            ))}
          </div>
        </div>

        
        <div className="md:col-span-3 pt-4 border-t border-purple-300 text-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>© {year} {brand.name}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
