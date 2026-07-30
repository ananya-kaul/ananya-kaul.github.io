"use client";
import Image from "next/image";
import React from "react";
import "./hero.css";
import { BsInstagram, BsWhatsapp, BsLinkedin } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { withBasePath } from "../../lib/basePath";
import { apps, liveApps } from "../../lib/apps";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <BsLinkedin size={20} />,
    url: "https://linkedin.com/in/ananyakaul",
    color: "#0077b5",
  },
  {
    name: "Email",
    icon: <MdMailOutline size={24} />,
    url: "mailto:kaul23ananya@gmail.com",
    color: "#EA4335",
  },
  {
    name: "WhatsApp",
    icon: <BsWhatsapp size={20} />,
    url: "https://wa.me/+918968692390",
    color: "#25D366",
  },
  {
    name: "Instagram",
    icon: <BsInstagram size={20} />,
    url: "https://www.instagram.com/theluckylad",
    color: "#E4405F",
  },
];

const stats = [
  { value: `${apps.length}`, label: "Apps shipped" },
  { value: `${liveApps.length}`, label: "Live on stores" },
  { value: "6,000+", label: "Users reached" },
];

const Hero = () => {
  return (
    <section className="w-full pt-28 sm:pt-32 md:pt-36 px-4 sm:px-6" id="home">
      <div className="max-w-7xl mx-auto flex flex-col gap-2 justify-center items-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1], // custom ease-out-expo
            scale: { type: "spring", damping: 15, stiffness: 100 },
          }}
          className="border-2 border-white/10 group relative w-32 sm:w-40 md:w-48 lg:w-56 aspect-square overflow-hidden rounded-full shadow-2xl shadow-black/50"
        >
          <Image
            src={withBasePath("/images/hero/IMG_4620.JPG")}
            alt="Ananya Kaul, mobile developer, profile photo"
            fill
            priority
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
            className="grayscale hover:grayscale-0 object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
          />
        </motion.div>

        {/* Text and Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center items-center mt-6 gap-6 sm:gap-7 w-full max-w-3xl"
        >
          <div className="flex flex-col justify-center items-center text-center">
            <span className="text-blue-400 font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-2">
              Hi, I&apos;m
            </span>
            <h1 className="font-display tracking-tight text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Ananya Kaul
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-400 font-medium">
              iOS &amp; Flutter Developer · AI/ML
            </p>
          </div>

          <div className="glass-effect px-5 sm:px-6 py-2 rounded-full border border-white/5">
            <SkillsSlider />
          </div>

          <p className="text-base sm:text-lg md:text-xl tracking-wide text-center leading-relaxed text-gray-400 max-w-2xl">
            I build{" "}
            <span className="text-white border-b-2 border-blue-500/30">
              high-performance iOS applications
            </span>{" "}
            and cross-platform Flutter apps, with AI woven in — from on-device
            Vision pipelines to LLM-powered assistants. I care about scalable
            architecture and interfaces that feel obvious to use.
          </p>

          {/* Stats — quick credibility, and reads well on a phone */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-md"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-effect rounded-2xl px-2 py-3 sm:py-4 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-xl sm:text-2xl font-bold text-gray-50">
                    {stat.value}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Actions — stacked and full width on phones */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={withBasePath("/resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-13 px-8 py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-center hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30"
            >
              Download Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="min-h-13 px-8 py-3.5 rounded-2xl border border-white/10 glass-effect bg-white/5 hover:bg-white/10 transition-all font-bold text-gray-200 text-center"
            >
              View Apps
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <SocialLinks />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

// slider style come from hero.css file.
const SkillsSlider = () => {
  return (
    <div className="flex gap-2 justify-center items-baseline">
      <div className="text-sm sm:text-2xl">I&apos;m</div>
      <div className="slider" aria-label="Mobile Developer, iOS Developer, Flutter Developer, AI/ML Enthusiast">
        <div className="slides text-gray-300">
          <div>Mobile Developer</div>
          <div>iOS Developer</div>
          <div>Flutter Developer</div>
          <div>AI/ML Enthusiast</div>
          <div>Mobile Developer</div>
        </div>
      </div>
    </div>
  );
};

const SocialLinks = () => {
  return (
    <ul className="flex gap-2 sm:gap-4 justify-center items-center">
      {socialLinks.map((link) => (
        <motion.li
          key={link.name}
          whileHover={{
            scale: 1.1,
            rotate: 6,
            color: link.color,
            filter: "drop-shadow(0 0 8px currentColor)",
          }}
          className="transition-all duration-300 text-gray-400"
        >
          <a
            title={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grid place-items-center h-11 w-11 rounded-xl hover:bg-white/5"
          >
            {link.icon}
            <span className="sr-only">{link.name}</span>
          </a>
        </motion.li>
      ))}
    </ul>
  );
};
