"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { FORM_ENDPOINT, PERSON } from "../../lib/site";
import { BiSend, BiLoaderAlt } from "react-icons/bi";
import { MdMailOutline } from "react-icons/md";
import { BsWhatsapp, BsLinkedin } from "react-icons/bs";
import { SiOrcid } from "react-icons/si";

type StatusType = "Loading" | "Success" | "Error";

const directLinks = [
  {
    label: "kaul23ananya@gmail.com",
    href: "mailto:kaul23ananya@gmail.com",
    icon: <MdMailOutline size={18} aria-hidden />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+918968692390",
    icon: <BsWhatsapp size={16} aria-hidden />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ananyakaul",
    icon: <BsLinkedin size={16} aria-hidden />,
  },
  {
    // The label is the full iD URI rather than the word "ORCID": that is what
    // ORCID's display guidelines ask for, and it is the string a journal or an
    // editor will actually want to copy.
    label: PERSON.orcid,
    href: PERSON.orcid,
    icon: <SiOrcid size={16} style={{ color: "#A6CE39" }} aria-hidden />,
  },
];

const Contact = () => {
  const [form, setForm] = useState({ email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<{
    message: string;
    status: StatusType;
  } | null>(null);
  const [isSending, setIsSending] = useState(false);

  /** Email validation */
  const checkEmailIsValid = (email: string) => {
    const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailReg.test(email);
  };

  /** Handle input changes */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error when typing
  };

  /** Validate fields before submit */
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!checkEmailIsValid(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Handle submit */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);
    setStatus({ message: "Sending...", status: "Loading" });

    const formData = new FormData();
    formData.set("Name", "@PORTFOLIO-v2");
    formData.set("Email", form.email);
    formData.set("Message", form.message);

    try {
      await fetch(FORM_ENDPOINT, { method: "POST", body: formData });
      setStatus({
        message: "Thanks for reaching out! I'll get back to you soon.",
        status: "Success",
      });
      setForm({ email: "", message: "" });
    } catch {
      setStatus({
        message:
          "Something went wrong. You can also email me directly at kaul23ananya@gmail.com.",
        status: "Error",
      });
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const color =
    status?.status === "Success"
      ? "text-positive"
      : status?.status === "Error"
        ? "text-danger"
        : "text-muted";

  return (
    <section
      className="w-full mt-20 sm:mt-25 px-4 sm:px-6"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 justify-center items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full"
        >
          <SectionHeader
            id="contact-heading"
            title="Contact Me"
            subtitle="Get in Touch"
            description="Have a project, a role, or just a question? Send a note — or reach me directly on any of the links below."
          />
        </motion.div>

        {/* Direct links — faster than a form on a phone */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {directLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-11 px-4 rounded-xl border border-line bg-tint text-sm text-body hover:text-ink hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
            >
              {link.icon}
              <span className="break-all">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`w-full max-w-3xl border border-line-strong bg-surface-raised/70 backdrop-blur-3xl p-5 sm:p-8 rounded-2xl flex flex-col gap-5 sm:gap-6 text-ink ${
            isSending ? "opacity-70 pointer-events-none" : ""
          }`}
        >
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-muted mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`min-h-12 px-4 py-3 text-base rounded-md bg-transparent border ${
                errors.email ? "border-red-500" : "border-line-strong"
              } focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
              } placeholder-faint transition-all duration-200`}
              disabled={isSending}
            />
            {errors.email && (
              <span id="email-error" className="text-danger text-sm mt-1">
                {errors.email}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm text-muted mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`px-4 py-3 text-base rounded-md bg-transparent border ${
                errors.message ? "border-red-500" : "border-line-strong"
              } focus:outline-none focus:ring-2 ${
                errors.message ? "focus:ring-red-500" : "focus:ring-blue-500"
              } placeholder-faint resize-none transition-all duration-200`}
              disabled={isSending}
            />
            {errors.message && (
              <span id="message-error" className="text-danger text-sm mt-1">
                {errors.message}
              </span>
            )}
          </div>

          {/* Status Message */}
          <p aria-live="polite" className={`text-sm ${color}`}>
            {status?.message ?? ""}
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className={`cursor-pointer w-full sm:w-fit min-h-12 py-3 px-6 flex gap-2 justify-center items-center rounded-xl border border-line-strong text-ink font-semibold transition-all ${
              isSending
                ? "bg-tint-strong cursor-not-allowed"
                : "hover:border-blue-500 hover:text-accent active:scale-[0.98]"
            }`}
          >
            {isSending ? (
              <>
                <BiLoaderAlt className="animate-spin" aria-hidden /> Sending...
              </>
            ) : (
              <>
                Send Message <BiSend aria-hidden />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
