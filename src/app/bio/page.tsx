"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFile } from "@fortawesome/free-solid-svg-icons";
import profile_picture from "public/profile_luxin1.jpg";
import SidebarNav from "../SidebarNav";

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

const activitiesData: ActivityItem[] = [
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

const educationData: TimelineItem[] = [
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

const workExperienceData: WorkExperienceItem[] = [
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

export default function BioPage() {
  return (
    <div className="theme-page min-h-screen pt-16 md:pt-0">
      <SidebarNav />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <Link
            href="/"
            className="theme-toggle inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors"
            aria-label="Back to home"
          >
            ←
          </Link>
        </div>

        {/* Header with Profile */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 shadow-2xl">
            <Image
              src={profile_picture}
              alt="Profile Picture"
              fill={true}
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">Luxin Zhang</h1>
          <p className="text-xl theme-muted mb-6">
            Electrical & Computer Engineer | AI/ML Enthusiast
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://github.com/luxinlabs"
              target="_blank"
              className="group relative"
            >
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="lg"
                  className="text-white"
                />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/luxin-zhang-902/"
              target="_blank"
              className="group relative"
            >
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="lg"
                  className="text-white"
                />
              </div>
            </a>
            <a href="mailto:luxin.zhang@duke.edu" className="group relative">
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="lg"
                  className="text-white"
                />
              </div>
            </a>
            <a href="SDE_AI_20260414.pdf" className="group relative">
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faFile}
                  size="lg"
                  className="text-white"
                />
              </div>
            </a>
          </div>

          {/* About Me */}
          <div className="theme-surface max-w-4xl w-full rounded-2xl border theme-border p-6 md:p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-base md:text-lg leading-relaxed">
              I&apos;m a passionate engineer specializing in AI/ML, full-stack
              development, and innovative problem-solving. With a Master&apos;s
              degree from Duke University and a strong foundation in Applied
              Mathematics and Statistics, I build intelligent systems that
              bridge cutting-edge research with real-world applications. My work
              spans autonomous AI agents, healthcare technology, and scalable
              web platforms.
            </p>

            {/* Section Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 text-left">
              <a
                href="#work-experience"
                className="theme-nav-link group flex items-center justify-between rounded-xl px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold">Work Experience</span>
                <span className="text-lg group-hover:translate-y-0.5 transition-transform">
                  ↓
                </span>
              </a>
              <a
                href="#education"
                className="theme-nav-link group flex items-center justify-between rounded-xl px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold">Education</span>
                <span className="text-lg group-hover:translate-y-0.5 transition-transform">
                  ↓
                </span>
              </a>
              <a
                href="#activities"
                className="theme-nav-link group flex items-center justify-between rounded-xl px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold">Activities</span>
                <span className="text-lg group-hover:translate-y-0.5 transition-transform">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div id="work-experience" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Work Experience
          </h2>
          <div className="relative ml-2 border-l theme-border pl-6 md:pl-8 space-y-5">
            {workExperienceData.map((item) => (
              <div
                key={`${item.company}-${item.startDate}`}
                className="theme-surface relative rounded-2xl border theme-border p-5 md:p-6 shadow-lg"
              >
                <div className="theme-surface-2 absolute -left-[1.98rem] top-6 h-3.5 w-3.5 rounded-full border-2 theme-border"></div>
                <div className="theme-surface-2 inline-flex rounded-full border theme-border px-3 py-1 text-xs font-medium mb-3">
                  {item.startDate} - {item.endDate}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {item.company}
                </h3>
                <p className="text-base md:text-lg font-semibold mb-1">
                  {item.role}
                </p>
                <p className="text-sm theme-muted mb-3">{item.location}</p>
                <ul className="text-sm space-y-2 list-disc list-inside marker:text-current">
                  {item.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div id="education" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Education
          </h2>
          <div className="relative ml-2 border-l theme-border pl-6 md:pl-8 space-y-5">
            {educationData.map((item, index) => (
              <div
                key={index}
                className="theme-surface relative rounded-2xl border theme-border p-5 md:p-6 shadow-lg"
              >
                <div className="theme-surface-2 absolute -left-[1.98rem] top-6 h-3.5 w-3.5 rounded-full border-2 theme-border"></div>
                <div className="theme-surface-2 inline-flex rounded-full border theme-border px-3 py-1 text-xs font-medium mb-3">
                  {item.startDate} - {item.endDate}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {item.institution}
                </h3>
                <p className="text-base md:text-lg font-semibold mb-1">
                  {item.degree}
                </p>
                <p className="text-sm theme-muted mb-3">{item.location}</p>
                {item.honors && item.honors.length > 0 && (
                  <div>
                    <p className="font-semibold text-sm mb-2 theme-muted">
                      Honors & Awards
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside marker:text-current">
                      {item.honors.map((honor, i) => (
                        <li key={i}>{honor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Other Activities Timeline */}
        <div id="activities" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Other Activities
          </h2>
          <div className="relative ml-2 border-l theme-border pl-6 md:pl-8 space-y-5">
            {activitiesData.map((item) => (
              <div
                key={`${item.organization}-${item.startDate}`}
                className="theme-surface relative rounded-2xl border theme-border p-5 md:p-6 shadow-lg"
              >
                <div className="theme-surface-2 absolute -left-[1.98rem] top-6 h-3.5 w-3.5 rounded-full border-2 theme-border"></div>
                <div className="theme-surface-2 inline-flex rounded-full border theme-border px-3 py-1 text-xs font-medium mb-3">
                  {item.startDate} - {item.endDate}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {item.organization}
                </h3>
                <p className="text-base md:text-lg font-semibold mb-1">
                  {item.role}
                </p>
                {item.location && (
                  <p className="text-sm theme-muted mb-3">{item.location}</p>
                )}
                <ul className="text-sm space-y-2 list-disc list-inside marker:text-current">
                  {item.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
