import { z } from "zod";
import { SiteConfigSchema } from "../types";

type SiteConfig = z.infer<typeof SiteConfigSchema>;

export const siteConfig: SiteConfig = {
  name: "Multi-Step-Form",
  description:
    "An open source multi-step-form built with typescript, Next.js 13 server components & tailwindcss",
  url: "https://multi-formstepper.netlify.app/",
  links: {
    github: "https://github.com/SammieKei40",
  },
};
