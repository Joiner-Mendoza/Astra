import React from "react";
import { Link as ScrollLink } from "react-scroll";
import "./styles/Menu.css"; 
import Hero from '../../assets/Astra-Logo.svg.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Menu() {
  return (
    <header className="container-header">
      <nav>
        <ul id="img-Hero">
          <img src={Hero} alt="Banner principal" className="Hero" />
        </ul>
        <ul>
          <li>
            <ScrollLink to="first-section" smooth={true} duration={10}>
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="services" smooth={true} duration={10}>
              Services
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="fourth-section" smooth={true} duration={10}>
              Why Us
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="sixth-section" smooth={true} duration={10}>
              Contact
            </ScrollLink>
          </li>

          {/* Redes sociales */}
          <div className="social-icons">
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </ul>
      </nav>
    </header>
  );
}

export { Menu };
