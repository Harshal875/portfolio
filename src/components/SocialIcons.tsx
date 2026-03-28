import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import './styles/SocialIcons.css'

const SocialIcons = () => {
  return (
    <div className="icons-section" data-cursor="icons">
      <a
        href="https://github.com/Harshal875"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-link"
        data-cursor="disable"
        aria-label="GitHub"
      >
        <FiGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/harshal-bansal/"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-link"
        data-cursor="disable"
        aria-label="LinkedIn"
      >
        <FiLinkedin />
      </a>
      <a
        href="mailto:harshalbansal.bt23cseai@pec.edu.in"
        className="icon-link"
        data-cursor="disable"
        aria-label="Email"
      >
        <FiMail />
      </a>
      <div className="icons-line" />
    </div>
  )
}

export default SocialIcons
