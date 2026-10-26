import { faHammer } from "@fortawesome/free-solid-svg-icons";
import {
  faPython,
  faJava,
  faHtml5,
  faCss3,
  faReact,
  faGoogle,
  faGitlab,
  faJs,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

interface TechChipProps {
  name: string;
}

const toolIcons: { [tool: string]: IconDefinition } = {
  Java: faJava,
  Python: faPython,
  HTML: faHtml5,
  CSS: faCss3,
  React: faReact,
  Google: faGoogle,
  GitLab: faGitlab,
  JavaScript: faJs,
};

export default function TechChip({ name }: TechChipProps) {
  return (
    <div className="mx-2 flex flex-row my-1 justify-between items-center transition p-3 theme-surface-2 theme-muted border theme-border rounded-xl w-fit h-fit">
      {name}
      <FontAwesomeIcon
        size="lg"
        className="px-1"
        icon={name in toolIcons ? toolIcons[name] : faHammer}
      ></FontAwesomeIcon>
    </div>
  );
}
