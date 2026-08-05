'use client';
import React from "react";
import { IconType } from "react-icons";
import {
  FaApple,
  FaAppStoreIos,
  FaDatabase,
  FaFilePdf,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiSwift,
  SiPython,
  SiFlutter,
  SiDart,
  SiXcode,
  SiFirebase,
  SiRealm,
  SiSqlite,
  SiJira,
  SiOpenai,
  SiGoogletranslate,
  SiWebrtc,
  SiFastlane,
} from "react-icons/si";
import {
  TbApi,
  TbBrain,
  TbBrandSwift,
  TbBrandApple,
  TbBrandAppstore,
  TbCpu,
  TbDevices,
  TbEye,
  TbFlame,
  TbLink,
  TbMessageChatbot,
  TbPhone,
  TbPhoneCall,
  TbPlane,
  TbRipple,
  TbRocket,
  TbSparkles,
  TbStack2,
  TbTestPipe,
  TbVideo,
} from "react-icons/tb";
import {
  MdArchitecture,
  MdWidgets,
  MdOutlineNotificationsActive,
  MdOutlineDocumentScanner,
} from "react-icons/md";
import SectionHeader from "../ui/SectionHeader";
import { motion } from "framer-motion";

export interface SkillItem {
  name: string;
  logo: IconType; // URL or /public path
}

export interface SkillGroup {
  title: string;
  skills: SkillItem[];
}

export const skillsData: SkillGroup[] = [
  {
    title: "iOS Development",
    skills: [
      { name: "Swift", logo: SiSwift },
      { name: "SwiftUI", logo: TbBrandSwift },
      { name: "UIKit", logo: FaApple },
      { name: "Objective-C", logo: TbBrandApple },
      { name: "Storyboard & XIB", logo: TbDevices },
      { name: "MVVM / MVC", logo: MdArchitecture },
      { name: "XCTest", logo: TbTestPipe },
    ],
  },
  {
    title: "Apple Frameworks",
    skills: [
      { name: "Core Data", logo: FaDatabase },
      { name: "Core ML", logo: TbCpu },
      { name: "Vision", logo: TbEye },
      { name: "CallKit", logo: TbPhoneCall },
      { name: "WidgetKit", logo: MdWidgets },
      { name: "PDFKit", logo: FaFilePdf },
      { name: "StoreKit / IAP", logo: FaAppStoreIos },
      { name: "Metal", logo: TbSparkles },
    ],
  },
  {
    title: "Cross-Platform (Flutter)",
    skills: [
      { name: "Flutter", logo: SiFlutter },
      { name: "Dart", logo: SiDart },
      { name: "GetX", logo: TbRocket },
      { name: "Riverpod", logo: TbRipple },
      { name: "Provider", logo: TbStack2 },
      { name: "Realm DB", logo: SiRealm },
      { name: "Firebase", logo: SiFirebase },
      { name: "Android / iOS / Desktop / Web", logo: TbDevices },
    ],
  },
  {
    title: "AI & ML",
    skills: [
      { name: "Python", logo: SiPython },
      { name: "LLM APIs (OpenAI, DeepSeek)", logo: SiOpenai },
      { name: "AI Chat Integrations", logo: TbMessageChatbot },
      { name: "AI Video Models (Kling, SeeDance)", logo: TbVideo },
      { name: "Core ML & Vision", logo: TbBrain },
      { name: "OCR & Text Extraction", logo: MdOutlineDocumentScanner },
    ],
  },
  {
    title: "APIs & Backend",
    skills: [
      { name: "RESTful APIs", logo: TbApi },
      { name: "Alamofire", logo: TbFlame },
      { name: "WebRTC", logo: SiWebrtc },
      { name: "Telnyx API", logo: TbPhone },
      { name: "Google Translation API", logo: SiGoogletranslate },
      { name: "SQLite", logo: SiSqlite },
      { name: "Push Notifications", logo: MdOutlineNotificationsActive },
      { name: "Deep Linking", logo: TbLink },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Xcode", logo: SiXcode },
      { name: "Git", logo: FaGitAlt },
      { name: "GitHub", logo: FaGithub },
      { name: "Jira", logo: SiJira },
      { name: "Fastlane", logo: SiFastlane },
      { name: "App Store Connect", logo: TbBrandAppstore },
      { name: "TestFlight", logo: TbPlane },
    ],
  },
];

const Skills = () => {
  return (
    <section
      className="w-full mt-20 sm:mt-25 px-4 sm:px-6"
      id="skills"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2 justify-center items-center">

        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full"
        >
          <SectionHeader
            id="skills-heading"
            title="Technologies"
            description="The stack I use to design, build and ship mobile products."
            subtitle="Tech Stack"
          />
        </motion.div>

        {/* Skills Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.15,
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
          viewport={{ once: true }}
          className="max-w-6xl w-full"
        >
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 sm:gap-8 border border-line-strong text-body backdrop-blur-3xl bg-surface-raised/70 p-5 sm:p-8 rounded-2xl">
            {skillsData.map((skill) => (
              <motion.div
                key={skill.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <SkillsCard group={skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Skills;

const SkillsCard = ({ group }: { group: SkillGroup }) => {
  return (
    <div key={group.title}>
      {/* h3 — the section already owns the h2 */}
      <h3 className="font-display font-semibold text-ink text-base pb-2 mb-3 border-b border-line-strong/60">
        {group.title}
      </h3>

      <div className="flex flex-wrap gap-2 md:gap-3 justify-start items-center">
        {group.skills.map((skill) => (
          <div
            key={skill.name}
            className="text-muted hover:text-foreground flex items-center gap-2 border border-line-strong bg-surface-solid px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md hover:border-blue-500/40 hover:scale-105 transition-all duration-300"
          >
            <skill.logo aria-hidden />
            <span className="text-xs sm:text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
