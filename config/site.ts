export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Merc Streaks",
  description: "An open source sports guessing game. ",
  url: "https://streak.mercsclan.com",
  ogImage: "https://streak.mercsclan.com/og.jpg",
  links: {
    github: "https://github.com/unmonk/mercstreaks",
  },
};
