export interface Project {
  name: string;
  imagePath: string;
  tools: string[];
  description: string;
  award?: string;
  links: { [key: string]: string };
}
