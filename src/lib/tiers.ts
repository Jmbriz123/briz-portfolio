export type Tier = "bronze" | "silver" | "gold";

export const tiers: Record<Tier, { label: string; theme: string; text: string; dot: string; border: string }> = {
  bronze: {
    label: "Bronze",
    theme: "Foundations",
    text: "text-bronze",
    dot: "bg-bronze",
    border: "border-bronze/40",
  },
  silver: {
    label: "Silver",
    theme: "Experience",
    text: "text-silver",
    dot: "bg-silver",
    border: "border-silver/40",
  },
  gold: {
    label: "Gold",
    theme: "Engineering",
    text: "text-gold",
    dot: "bg-gold",
    border: "border-gold/40",
  },
};
