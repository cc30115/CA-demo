export interface TeamMember {
  id: string;
  name: string;
  title: string;
  tagline?: string;
  photo: string;
  links?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

export const TEAM_VISION = "我們是一群相信開發應該更簡單的人。來自後端工程、產品設計與企業顧問的跨領域組合，共同目標是讓每間公司都能用資料結構驅動創新。";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Nathan Mansour",
    title: "Co-Founder | Partner",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&q=80"
  },
  {
    id: "2",
    name: "Thomas Barrett",
    title: "Co-Founder | Partner",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&q=80"
  },
  {
    id: "3",
    name: "Sarah Nieminen",
    title: "General Partner | COO",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&q=80"
  },
  {
    id: "4",
    name: "Marcus Okafor",
    title: "Operations Manager",
    photo: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&h=800&fit=crop&q=80"
  },
  {
    id: "5",
    name: "Thomas Kovács",
    title: "Senior Associate",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&q=80"
  },
  {
    id: "6",
    name: "Katherine Hayes",
    title: "Investment Analyst",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&q=80"
  }
];
