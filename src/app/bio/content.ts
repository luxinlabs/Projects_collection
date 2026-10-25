interface TimelineItem {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  honors?: string[];
}

interface WorkExperienceItem {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

interface ActivityItem {
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export const activitiesData: ActivityItem[] = [
  {
    organization: "Los Altos Hacks",
    role: "Hackathon Judge",
    location: "Los Altos, CA",
    startDate: "Apr 2026",
    endDate: "Apr 2026",
    highlights: [
      "Evaluated student hackathon projects and provided technical feedback",
    ],
  },
  {
    organization: "RIF (Reading is Fun Club)",
    role: "Vice President",
    location: "New York, NY",
    startDate: "Oct 2018",
    endDate: "Jul 2021",
    highlights: [
      "Interviewed more than 70 native mentors for the club",
      "Communicated with Library and bookstore to mail books overseas and led 80+ club members to read books, watch movies and organize book voting activities",
      "Organized the club to participate in 'One Book, One New York,' a large-scale book-sharing activity in New York City",
    ],
  },
  {
    organization: "TPIFP PROJECT",
    role: "Treasurer",
    startDate: "Jan 2019",
    endDate: "Jul 2021",
    highlights: [
      "Budgeted club expenses for each semester and applied for club funds",
      "Estimated the cost of performances or volunteer activities within the range of $10",
      "Organized fundraisers on Facebook and Instagram to call on donations of a piano for the University Hospital",
    ],
  },
  {
    organization: "PERK SUMMIT",
    role: "Teacher Volunteer",
    startDate: "Aug 2020",
    endDate: "Aug 2020",
    highlights: [
      "Led and generated critical discussion for high-school students and organized debates",
      "Organized the class and other activities",
    ],
  },
  {
    organization: "Environment Protection Program",
    role: "Volunteer",
    location: "Qinghai, CN",
    startDate: "Aug 2019",
    endDate: "Aug 2019",
    highlights: [
      "Helped collect junk along the highway and planted trees around a lake",
      "Talked with native people about their stories about protecting animals in that area",
    ],
  },
  {
    organization: "SLUSH NANJING",
    role: "Referee's Receptionist",
    location: "Nanjing, CN",
    startDate: "Jun 2019",
    endDate: "Jun 2019",
    highlights: [
      "Helped referees to score more than 50 newly-established firms on their products",
      "Communicated with the referees in the VC meeting to make sure they arrive on time",
    ],
  },
];

export const educationData: TimelineItem[] = [
  {
    institution: "Duke University",
    degree: "Master of Engineering in Electrical and Computer Engineering",
    location: "Durham, NC",
    startDate: "Aug 2021",
    endDate: "Dec 2023",
    honors: [
      "Chancellor Scholarship (sole recipient, 2021)",
      "50% Merit-based Scholarship",
    ],
  },
  {
    institution: "Stony Brook University",
    degree: "Bachelor of Science in Applied Mathematics and Statistics",
    location: "Stony Brook, NY",
    startDate: "Aug 2018",
    endDate: "Jul 2021",
    honors: ["Dean's List with GPA of 3.84", "Graduated Magna Cum Laude"],
  },
];

export const workExperienceData: WorkExperienceItem[] = [
  {
    company: "Fortinet",
    role: "Software Developer II",
    location: "Sunnyvale, CA",
    startDate: "Apr 2025",
    endDate: "Present",
    highlights: [
      "Owned end-to-end design and delivery of core FortiDrive features: audit logging, file versioning, tagging, and lifecycle management, improving platform compliance, traceability, and data integrity at scale.",
      "Architected distributed backend services and RESTful APIs in Python Django; built high-throughput log search with Elasticsearch; led cloud-native deployments on AWS with Docker and Kubernetes.",
      "Delivered full-stack features end-to-end in TypeScript; defined cross-service API contracts and collaborated with product to translate requirements into scalable, production-ready systems.",
    ],
  },
  {
    company: "Computer Packages Inc",
    role: "Software Engineer",
    location: "Rockville, MD",
    startDate: "Mar 2024",
    endDate: "Apr 2024",
    highlights: [
      "Built full-stack enterprise features in C# / .NET with Okta SSO and role-based access control; optimized SQL Server read queries and developed RESTful APIs for third-party integrations.",
      "Implemented SSRS reports and refined system requirements directly with clients, translating business needs into detailed software specifications.",
    ],
  },
  {
    company: "Duke Pratt School of Engineering",
    role: "Software Developer - Team Lead (5 Engineers)",
    location: "Durham, NC",
    startDate: "May 2023",
    endDate: "Aug 2023",
    highlights: [
      "Led a team of five to ship a Django + React student data management platform with paginated search, CSV bulk upload, and role-based access; configured production infrastructure with Nginx, Docker, and Certbot HTTPS.",
      "Implemented search and CSV upload with Django REST Framework, enabling professors to perform full CRUD operations over a paginated SQLite database.",
    ],
  },
  {
    company: "Vivo Communication Technology Co. Ltd.",
    role: "Software Engineer - Computer Vision & Camera Algorithm",
    location: "Shenzhen, CN",
    startDate: "Mar 2022",
    endDate: "Jul 2022",
    highlights: [
      "Boosted Image Sharpness Algorithm accuracy from 63% to 82% using OpenCV, Yolo5, HED, and 68-point face extraction; built a Flask-based automated scoring platform saving 2 engineering hours weekly.",
      "Integrated image processing algorithms into a Python server infrastructure, exposing results via RESTful API for downstream quality evaluation pipelines.",
    ],
  },
  {
    company: "TikTok",
    role: "Data Platform Analyst Intern",
    location: "Beijing, CN",
    startDate: "May 2021",
    endDate: "Jul 2021",
    highlights: [
      "Optimized MySQL-based pipeline reducing CQC analysis from one day to one minute; analyzed a 30k-entry dataset with Tableau and R, improving platform performance by 17%.",
    ],
  },
];
