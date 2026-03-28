import { FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi'
import { MdOutlineCopyright } from 'react-icons/md'
import './styles/Contact.css'

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-inner">
        <div className="contact-cta">
          <h2 className="contact-heading">
            Let&apos;s build<br />
            <span className="contact-accent">something.</span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-block">
            <h4 className="contact-block-label">Reach Out</h4>
            <a
              href="mailto:harshalbansal.bt23cseai@pec.edu.in"
              className="contact-email"
              data-cursor="disable"
            >
              harshalbansal.bt23cseai@pec.edu.in
              <FiArrowUpRight className="contact-arrow" />
            </a>
          </div>

          <div className="contact-block">
            <h4 className="contact-block-label">Social</h4>
            <div className="contact-socials">
              <a
                href="https://github.com/Harshal875"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                data-cursor="disable"
              >
                <FiGithub />
                GitHub
                <FiArrowUpRight className="contact-arrow-sm" />
              </a>
              <a
                href="https://www.linkedin.com/in/harshal-bansal/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                data-cursor="disable"
              >
                <FiLinkedin />
                LinkedIn
                <FiArrowUpRight className="contact-arrow-sm" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <p className="contact-credit">
            Designed &amp; built by <span>Harshal Bansal</span>
          </p>
          <p className="contact-copy">
            <MdOutlineCopyright /> 2026
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
