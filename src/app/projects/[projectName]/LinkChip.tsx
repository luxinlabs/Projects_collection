import {
  faEnvelope,
  faFile,
  fas,
  faHammer,
  faGlobe,
  faVideo,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPython,
  faJava,
  faHtml5,
  faCss3,
  faReact,
  faGoogle,
  faGitlab,
  faJs,
  faGithub,
  faSlideshare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const toolIcons: { [tool: string]: IconDefinition } = {
  Java: faJava,
  Python: faPython,
  HTML: faHtml5,
  CSS: faCss3,
  React: faReact,
  Google: faGoogle,
  GitLab: faGitlab,
  JavaScript: faJs,
  GitHub: faGithub,
  Writeup: faFile,
  Report: faFile,
  Demo: faVideo,
  Slides: faFile,
};

interface LinkChipProps {
  name: string;
}

export default function LinkChip({ name }: LinkChipProps) {
  return (
    <div className="theme-toggle underline flex flex-row my-1 justify-between items-center hover:opacity-50 transition p-3 border-2 rounded-xl w-fit h-fit">
      {name}
      <FontAwesomeIcon
        size="lg"
        className="px-1"
        icon={name in toolIcons ? toolIcons[name] : faGlobe}
      ></FontAwesomeIcon>
    </div>
  );
}
