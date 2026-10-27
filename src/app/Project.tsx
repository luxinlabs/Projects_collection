export interface Project {
  name: string;
  imagePath: string;
  tools: string[];
  description: string;
  award?: string;
  awards?: string[];
  awardOrder?: number;
  subtitle?: string;
  links: { [key: string]: string };
}
