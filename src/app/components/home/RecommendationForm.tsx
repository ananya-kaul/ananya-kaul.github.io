"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, Check, Send, Loader2 } from "lucide-react";
import { FORM_ENDPOINT } from "../../lib/site";
import {
  RECOMMEND_OPTIONS,
  RELATIONSHIP_OPTIONS,
  STRENGTH_OPTIONS,
  WORK_AGAIN_OPTIONS,
  submitRecommendation,
} from "../../lib/recommendations";

type Props = {
  open: boolean;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EMPTY = {
  name: "",
  designation: "",
  company: "",
  relationship: "",
  rating: 0,
  howYouKnowMe: "",
  project: "",
  strengths: [] as string[],
  recommend: "",
  workAgain: "",
  message: "",
  linkedin: "",
  email: "",
};

type FormState = typeof EMPTY;
type Errors = Partial<Record<keyof FormState, string>>;

/** One readable block of text, so the notification email is already formatted. */
const buildMessage = (form: FormState) => {
  const details = [
    `Rating: ${form.rating}/5`,
    `Designation: ${form.designation}`,
    form.company && `Company: ${form.company}`,
    `Relationship: ${form.relationship}`,
    form.recommend && `Would recommend: ${form.recommend}`,
    form.workAgain && `Would work with me again: ${form.workAgain}`,
    form.strengths.length > 0 && `Stood out: ${form.strengths.join(", ")}`,
    form.howYouKnowMe && `How they know me: ${form.howYouKnowMe}`,
    form.project && `Project together: ${form.project}`,
    form.linkedin && `LinkedIn: ${form.linkedin}`,
  ].filter(Boolean);

  // Blank line between the answers and the quote, so it's readable in the email
  return `${details.join("\n")}\n\n${form.message}`;
};

/**
 * Nudge the old Google Apps Script so you still get an email telling you
 * something arrived. Deliberately not awaited and never allowed to throw: the
 * database is what actually holds the submission, so a bounced notification
 * must not turn a saved recommendation into an error on the visitor's screen.
 */
const notifyByEmail = (form: FormState) => {
  const data = new FormData();
  data.set("Name", `@RECOMMENDATION — ${form.name}`);
  data.set("Email", form.email || "not provided");
  data.set("Message", buildMessage(form));

  void fetch(FORM_ENDPOINT, { method: "POST", body: data }).catch(() => {
    /* Nothing to do here — see above. */
  });
};

const RecommendationForm = ({ open, onClose }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep Tab inside the dialog
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((node) => node.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("no-scroll");
    document.addEventListener("keydown", handleKeyDown);

    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  /** Start clean the next time it opens, but only after the exit animation. */
  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => {
      setForm(EMPTY);
      setErrors({});
      setSent(false);
      setFailed(false);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [open]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleStrength = (strength: string) =>
    setForm((prev) => ({
      ...prev,
      strengths: prev.strengths.includes(strength)
        ? prev.strengths.filter((item) => item !== strength)
        : [...prev.strengths, strength],
    }));

  /** Where to send focus when a field fails, in the order they appear. */
  const FOCUS_TARGET: Array<[keyof FormState, string]> = [
    ["name", "#rec-name"],
    ["designation", "#rec-designation"],
    ["relationship", '[aria-label="How do you know Ananya?"] button'],
    ["rating", '[aria-label="Overall rating out of five"] button'],
    ["message", "#rec-message"],
    ["email", "#rec-email"],
  ];

  const validate = () => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!form.designation.trim())
      next.designation = "Please add your role or title.";
    if (!form.relationship) next.relationship = "Pick how you know me.";
    if (form.rating === 0) next.rating = "Pick a rating.";
    if (form.message.trim().length < 20)
      next.message = "A sentence or two, please — at least 20 characters.";
    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(form.email))
      next.email = "That email doesn't look right.";
    setErrors(next);
    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const problems = validate();
    if (Object.keys(problems).length > 0) {
      // Jump to the first thing that needs fixing. Waiting a frame lets the
      // error styling land first, so the field is already highlighted.
      const target = FOCUS_TARGET.find(([key]) => problems[key]);
      if (target) {
        // A tick, so React has painted the error styling before we jump there
        window.setTimeout(
          () => panelRef.current?.querySelector<HTMLElement>(target[1])?.focus(),
          0
        );
      }
      return;
    }

    setIsSending(true);
    setFailed(false);

    try {
      /* This is the one that matters: it puts the recommendation in the
         database as "pending", where it waits in your dashboard until you
         list it. Only if this succeeds is the visitor told it went through. */
      await submitRecommendation({
        name: form.name.trim(),
        designation: form.designation.trim(),
        company: form.company.trim(),
        relationship: form.relationship,
        rating: form.rating,
        quote: form.message.trim(),
        project: form.project.trim(),
        highlights: form.strengths,
        linkedin: form.linkedin.trim(),
        wouldWorkAgain: form.workAgain,
        recommend: form.recommend,
        howYouKnowMe: form.howYouKnowMe.trim(),
        email: form.email.trim(),
      });

      notifyByEmail(form);
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      setIsSending(false);
    }
  };

  const fieldClass = (invalid?: string) =>
    `min-h-12 px-4 py-3 text-base rounded-xl bg-transparent border ${
      invalid ? "border-red-500" : "border-line-strong"
    } text-ink placeholder-faint focus:outline-none focus:ring-2 ${
      invalid ? "focus:ring-red-500" : "focus:ring-blue-500"
    } transition-all duration-200`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="recommend-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-scrim backdrop-blur-sm p-0 sm:p-6"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="recommend-title"
            key="recommend-panel"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border border-line bg-surface-solid shadow-2xl shadow-shade-strong"
          >
            {/* Drag affordance on mobile so the sheet reads as dismissible */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
              <span className="h-1.5 w-10 rounded-full bg-tint-strong" />
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close the recommendation form"
              className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 grid place-items-center h-11 w-11 rounded-full bg-scrim text-body border border-line hover:text-ink hover:bg-scrim transition-colors"
            >
              <X size={20} />
            </button>

            {sent ? (
              <div className="px-6 sm:px-10 py-14 sm:py-16 text-center flex flex-col items-center gap-4">
                <span className="grid place-items-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-positive">
                  <Check size={30} />
                </span>
                <h3
                  id="recommend-title"
                  className="font-display text-xl sm:text-2xl font-bold text-ink"
                >
                  Thank you, {form.name.split(" ")[0]}
                </h3>
                <p className="text-sm sm:text-base text-muted max-w-md leading-relaxed">
                  That means a lot. I read every submission and publish it to
                  the site once I&apos;ve reviewed it — usually within a day or
                  two.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 min-h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors active:scale-[0.98]"
                >
                  Close
                </button>
              </div>
            ) : (
              /* The bottom padding clears the iPhone home indicator, so the
                 Cancel button never ends up underneath it */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="overflow-y-auto overscroll-contain px-5 sm:px-8 pt-4 sm:pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              >
                <div className="pr-12">
                  <h3
                    id="recommend-title"
                    className="font-display text-xl sm:text-2xl font-bold text-ink leading-tight tracking-tight"
                  >
                    Leave a recommendation
                  </h3>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">
                    Takes about two minutes. Only the starred fields are
                    required — skip anything you&apos;d rather not answer.
                    Nothing appears on the site until I&apos;ve reviewed it.
                  </p>
                </div>

                {/* Who you are */}
                <Fieldset legend="About you">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Full name"
                      required
                      error={errors.name}
                      htmlFor="rec-name"
                    >
                      <input
                        id="rec-name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        autoComplete="name"
                        placeholder="Rahul Sharma"
                        aria-invalid={errors.name ? true : undefined}
                        className={fieldClass(errors.name)}
                      />
                    </Field>

                    <Field
                      label="Your role / title"
                      required
                      error={errors.designation}
                      htmlFor="rec-designation"
                    >
                      <input
                        id="rec-designation"
                        value={form.designation}
                        onChange={(e) => set("designation", e.target.value)}
                        autoComplete="organization-title"
                        placeholder="Senior Mobile Developer"
                        aria-invalid={errors.designation ? true : undefined}
                        className={fieldClass(errors.designation)}
                      />
                    </Field>

                    <Field label="Company" htmlFor="rec-company">
                      <input
                        id="rec-company"
                        value={form.company}
                        onChange={(e) => set("company", e.target.value)}
                        autoComplete="organization"
                        placeholder="iApp Technologies LLP"
                        className={fieldClass()}
                      />
                    </Field>

                    <Field
                      label="LinkedIn profile"
                      hint="Optional, but it makes your recommendation verifiable"
                      htmlFor="rec-linkedin"
                    >
                      <input
                        id="rec-linkedin"
                        value={form.linkedin}
                        onChange={(e) => set("linkedin", e.target.value)}
                        inputMode="url"
                        placeholder="linkedin.com/in/…"
                        className={fieldClass()}
                      />
                    </Field>
                  </div>
                </Fieldset>

                {/* Relationship */}
                <Fieldset
                  legend="How do you know Ananya?"
                  required
                  error={errors.relationship}
                >
                  <ChipGroup
                    label="How do you know Ananya?"
                    options={[...RELATIONSHIP_OPTIONS]}
                    selected={form.relationship ? [form.relationship] : []}
                    onSelect={(value) => set("relationship", value)}
                    invalid={Boolean(errors.relationship)}
                  />
                </Fieldset>

                {/* Rating */}
                <Fieldset legend="Overall rating" required error={errors.rating}>
                  <div
                    className="flex items-center gap-1"
                    role="radiogroup"
                    aria-label="Overall rating out of five"
                    aria-invalid={errors.rating ? true : undefined}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={form.rating === value}
                        aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                        onClick={() => set("rating", value)}
                        className="grid place-items-center h-11 w-11 rounded-xl hover:bg-tint transition-colors active:scale-95"
                      >
                        <Star
                          size={26}
                          className={
                            value <= form.rating
                              ? "text-star fill-star"
                              : "text-line-strong"
                          }
                        />
                      </button>
                    ))}
                    {form.rating > 0 && (
                      <span className="ml-2 text-sm text-muted">
                        {form.rating}/5
                      </span>
                    )}
                  </div>
                </Fieldset>

                {/* Strengths */}
                <Fieldset
                  legend="What impressed you the most?"
                  hint="Pick as many as apply"
                >
                  <ChipGroup
                    label="What impressed you the most?"
                    options={[...STRENGTH_OPTIONS]}
                    selected={form.strengths}
                    onSelect={toggleStrength}
                    multi
                  />
                </Fieldset>

                {/* Context */}
                <Fieldset legend="A bit of context">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="What project did you work on together?"
                      htmlFor="rec-project"
                    >
                      <input
                        id="rec-project"
                        value={form.project}
                        onChange={(e) => set("project", e.target.value)}
                        placeholder="SecondLine — VoIP calling"
                        className={fieldClass()}
                      />
                    </Field>

                    <Field
                      label="How did you two meet / work together?"
                      htmlFor="rec-how"
                    >
                      <input
                        id="rec-how"
                        value={form.howYouKnowMe}
                        onChange={(e) => set("howYouKnowMe", e.target.value)}
                        placeholder="Same iOS team for 18 months"
                        className={fieldClass()}
                      />
                    </Field>
                  </div>
                </Fieldset>

                {/* The two trust questions */}
                <Fieldset legend="Would you recommend Ananya?">
                  <ChipGroup
                    label="Would you recommend Ananya?"
                    options={[...RECOMMEND_OPTIONS]}
                    selected={form.recommend ? [form.recommend] : []}
                    onSelect={(value) => set("recommend", value)}
                  />
                </Fieldset>

                <Fieldset legend="Would you hire or work with Ananya again?">
                  <ChipGroup
                    label="Would you hire or work with Ananya again?"
                    options={[...WORK_AGAIN_OPTIONS]}
                    selected={form.workAgain ? [form.workAgain] : []}
                    onSelect={(value) => set("workAgain", value)}
                  />
                </Fieldset>

                {/* The words */}
                <Fieldset legend="In your own words" required>
                  <div className="flex flex-col gap-4">
                  <Field
                    label="Write a few words about your experience"
                    hint="This is the part that gets published, so write it how you'd want it read"
                    htmlFor="rec-message"
                    error={errors.message}
                  >
                    <textarea
                      id="rec-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="What was it like working with Ananya? What did he build, and what stood out?"
                      aria-invalid={errors.message ? true : undefined}
                      className={`px-4 py-3 text-base rounded-xl bg-transparent border ${
                        errors.message ? "border-red-500" : "border-line-strong"
                      } text-ink placeholder-faint focus:outline-none focus:ring-2 ${
                        errors.message ? "focus:ring-red-500" : "focus:ring-blue-500"
                      } resize-none transition-all duration-200`}
                    />
                  </Field>

                  <Field
                    label="Your email"
                    hint="Optional — only so I can thank you or check a detail. Never published."
                    htmlFor="rec-email"
                    error={errors.email}
                  >
                    <input
                      id="rec-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@company.com"
                      aria-invalid={errors.email ? true : undefined}
                      className={fieldClass(errors.email)}
                    />
                  </Field>
                  </div>
                </Fieldset>

                <p aria-live="polite" className="text-sm text-danger min-h-5 mt-2">
                  {failed
                    ? "Couldn't send that — please check your connection, or email it to kaul23ananya@gmail.com and I'll add it myself."
                    : Object.keys(errors).some((key) => errors[key as keyof Errors])
                      ? "Please fix the highlighted fields."
                      : ""}
                </p>

                <div className="mt-3 flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-12 px-6 rounded-xl border border-line-strong text-body font-semibold text-sm hover:border-faint hover:text-ink transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`flex-1 min-h-12 px-6 flex justify-center items-center gap-2 rounded-xl font-semibold text-sm text-white transition-all shadow-lg shadow-blue-600/20 ${
                      isSending
                        ? "bg-tint-strong cursor-not-allowed shadow-none"
                        : "bg-blue-600 hover:bg-blue-500 active:scale-[0.98]"
                    }`}
                  >
                    {isSending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit recommendation
                        <Send size={15} aria-hidden />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecommendationForm;

/* ---------------------------------------------------------------- helpers */

const Fieldset = ({
  legend,
  hint,
  required,
  error,
  children,
}: {
  legend: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <fieldset className="mt-6 sm:mt-7 border-t border-line-soft pt-5">
    <legend className="sr-only">{legend}</legend>
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-faint mb-3">
      {legend}
      {required && <span className="text-accent ml-1">*</span>}
      {hint && (
        <span className="block mt-1 normal-case tracking-normal font-normal text-[11px] text-faint">
          {hint}
        </span>
      )}
    </p>
    {children}
    {error && <p className="text-danger text-sm mt-2">{error}</p>}
  </fieldset>
);

const Field = ({
  label,
  hint,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <label htmlFor={htmlFor} className="text-sm text-muted mb-2">
      {label}
      {required && <span className="text-accent ml-1">*</span>}
    </label>
    {children}
    {hint && !error && (
      <span className="text-[11px] text-faint mt-1.5">{hint}</span>
    )}
    {error && <span className="text-danger text-sm mt-1.5">{error}</span>}
  </div>
);

const ChipGroup = ({
  label,
  options,
  selected,
  onSelect,
  multi,
  invalid,
}: {
  label: string;
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
  multi?: boolean;
  invalid?: boolean;
}) => (
  <div
    className="flex flex-wrap gap-2"
    role={multi ? "group" : "radiogroup"}
    aria-label={label}
    aria-invalid={invalid ? true : undefined}
  >
    {options.map((option) => {
      const isOn = selected.includes(option);
      return (
        <button
          key={option}
          type="button"
          role={multi ? "checkbox" : "radio"}
          aria-checked={isOn}
          onClick={() => onSelect(option)}
          className={`min-h-11 px-4 rounded-xl border text-sm font-medium transition-colors active:scale-[0.97] ${
            isOn
              ? "border-blue-500/50 bg-blue-500/10 text-accent-soft"
              : `${
                  invalid ? "border-red-500/50" : "border-line"
                } bg-tint text-body hover:text-ink hover:bg-tint-strong`
          }`}
        >
          {option}
        </button>
      );
    })}
  </div>
);
