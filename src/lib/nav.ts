import type { Tier } from "./tiers";

export const navItems: { id: string; label: string; tier?: Tier }[] = [
  { id: "experience", label: "Experience", tier: "silver" },
  { id: "projects", label: "Projects", tier: "gold" },
  { id: "architecture", label: "Architecture", tier: "gold" },
  { id: "skills", label: "Skills" },
  { id: "notes", label: "Notes" },
  { id: "education", label: "Education", tier: "bronze" },
  { id: "contact", label: "Contact" },
];
