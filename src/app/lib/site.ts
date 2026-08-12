/** Canonical origin. GitHub Pages *user* site, so served from the root. */
export const SITE_URL = "https://ananya-kaul.github.io";

export const PERSON = {
  name: "Ananya Kaul",
  jobTitle: "AI/ML & Mobile Developer",
  email: "kaul23ananya@gmail.com",
  phone: "+918968692390",
  linkedin: "https://www.linkedin.com/in/ananyakaul",
  instagram: "https://www.instagram.com/theluckylad",
  github: "https://github.com/ananya-kaul",
  medium: "https://medium.com/@ananyakaul",
  /**
   * ORCID iD. Held as the full https URI on purpose — that is the form ORCID
   * asks you to display and link, and it is what other researchers expect to
   * be able to copy straight out of the page.
   */
  orcid: "https://orcid.org/0009-0003-4125-519X",
  employer: {
    name: "iApp Technologies LLP",
    url: "https://iapptechnologies.com/",
  },
  university: "Vellore Institute of Technology",
  location: { city: "Chandigarh", country: "IN" },
} as const;

/**
 * The Google Apps Script web app that appends submissions to your Google
 * Sheet. Both the contact form and the recommendation form post here, so if
 * you ever redeploy the script you only change the URL in this one place.
 */
export const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwVoRN6EEeHKCYyn1zLtIpevnoUIGBstOU1LWt-MCXZCBcUSZ9-cKoeKuWQtGE22ZMa/exec";

export const SITE_DESCRIPTION =
  "Ananya Kaul builds AI-powered products — Vision pipelines, LLM assistants and RAG systems — shipped inside 16 production iOS and Flutter apps, and writes about AI engineering for Towards AI and Stackademic.";
