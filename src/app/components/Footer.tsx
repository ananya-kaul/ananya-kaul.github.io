import React from "react";
import { BsInstagram, BsWhatsapp, BsLinkedin, BsMedium } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";
import { SiOrcid } from "react-icons/si";
import { PERSON } from "../lib/site";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <BsLinkedin size={20} aria-hidden />,
    url: "https://linkedin.com/in/ananyakaul",
  },
  {
    // Keeps its brand green rather than inheriting the footer's hover colour —
    // the iD mark is only recognisable as an ORCID iD in that green.
    name: "ORCID iD",
    icon: <SiOrcid size={20} style={{ color: "#A6CE39" }} aria-hidden />,
    url: PERSON.orcid,
  },
  {
    name: "Medium",
    icon: <BsMedium size={21} aria-hidden />,
    url: "https://medium.com/@ananyakaul",
  },
  {
    name: "Email",
    icon: <MdMailOutline size={22} aria-hidden />,
    url: "mailto:kaul23ananya@gmail.com",
  },
  {
    name: "WhatsApp",
    icon: <BsWhatsapp size={19} aria-hidden />,
    url: "https://wa.me/+918968692390",
  },
  {
    name: "Instagram",
    icon: <BsInstagram size={19} aria-hidden />,
    url: "https://www.instagram.com/theluckylad",
  },
];

const footerLinks = [
  { label: "Tech Stack", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Apps", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

// Baked in at build time — the site is statically exported.
const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full mt-24 sm:mt-32 bg-surface-solid border-t border-line-soft shadow-[0_-10px_30px_rgba(13,17,23,0.45)] pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-center md:items-start text-center md:text-left">
          {/* Identity */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-lg font-medium font-display flex gap-2 items-center text-ink uppercase tracking-widest">
              <span className="flex items-center gap-1 font-mono text-accent font-bold">
                <span className="text-faint font-light">{"{"}</span>
                <span className="text-accent">AK</span>
                <span className="text-faint font-light">{"}"}</span>
              </span>
              Ananya Kaul
            </p>
            <p className="text-sm text-faint max-w-xs leading-relaxed">
              AI/ML &amp; mobile developer building AI-powered products, and
              writing about AI engineering.
            </p>
          </div>

          {/* Section links — handy on a phone, and good internal linking for crawlers */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 justify-center md:justify-start text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <ul className="flex gap-1 sm:gap-2 items-center justify-center">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  title={link.name}
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="grid place-items-center h-11 w-11 rounded-xl text-faint hover:text-accent hover:bg-tint transition-colors"
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-line-soft flex justify-center items-center text-xs text-faint">
          <p>© {year} Ananya Kaul. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
