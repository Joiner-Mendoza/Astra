import React, { useState } from "react";
import "./styles/Home.css";
import matterimg from '../../assets/hero-img.svg'
import blog from '../../assets/blog.svg'
import building from '../../assets/building.svg'
import shopping from '../../assets/shopping-bag.svg'
import portfolio from '../../assets/portfolio.svg'
import graphic from '../../assets/graphic.jpg'
import web from '../../assets/web.jpg'
import branding from '../../assets/branding.jpg'
import aboutUs from '../../assets/about-us.jpg'
import avatar from '../../assets/avatar.png'
import passionate from '../../assets/passionate.svg'
import professional from '../../assets/professional.svg'
import support from '../../assets/support.svg'
// import calendar from './calendar/Calendary'

// calendario
import { Calendary } from "./calendar/Calendary";

function HomePage() {
  const [isCalendarOpen,setIsOpenCalendar] = useState('')
  
  const openCalendar = () => setIsOpenCalendar(true);
  const closeCalendar =() => setIsOpenCalendar(false)
  
  return (
    <div className="container-all">

      <main className="container-main">
        
        {/* Sections */}
        {/* ################################ */}
        <section className="first-section" id="first-section">{/* primera seccion (Inicio) */}

          <div className="container_matters">
              <h1>Your Idea Matters!</h1>
              <p>Pulvinar enim ac tortor nulla facilisi tristique facilisi
              elementum sollicitudin eget lorem.</p>
              <button>Make a website</button>
          </div>

          <div className="img"> 
            <img src={matterimg} alt="Banner principal" className="Hero" />
          </div>

        </section> {/* primera secion (Fin) */}
        {/* ################################ */}
        <section className="second-section" id="second-section">{/* Segunda seccion (Inicio) */}
          <div className="container_second_section">
            <div className="containers_mini_cards">
              <div className="mini_cards">
                <img src={building} alt="Banner principal" className="img-cards" />
                  <h2>Local Business</h2>
                    <p>Lorem ipsum dolor consectetur adipiscing elit eiusmod.</p>
              </div>

              <div className="mini_cards">
                <img src={shopping} alt="Banner principal" className="img-cards" />
                  <h2>Online Store</h2>
                    <p>Lorem ipsum dolor consectetur adipiscing elit eiusmod.</p>
              </div>

              <div className="mini_cards">
                <img src={blog} alt="Banner principal" className="img-cards" />
                  <h2>Blogging</h2>
                    <p>Lorem ipsum dolor consectetur adipiscing elit eiusmod.</p>
              </div>
              
              <div className="mini_cards">
                <img src={portfolio} alt="Banner principal" className="img-cards" />
                  <h2>Portfolio</h2>
                    <p>Lorem ipsum dolor consectetur adipiscing elit eiusmod.</p>
              </div>
            </div>
            {/* services */}
            <div className="our_services" id="services">
                <h2>Our Services</h2>
              <div className="container_card_services">
              <div className="cards-our_services">
                  <img src={branding} alt="Banner principal" className="img-cards_services" />
                    <h2>Branding Design</h2>
                       <p>Sem quis erat nibh id neque tincidunt molestie convallis ut nibh vel, lorem consequat ullamcorper.</p>
              </div>
              <div className="cards-our_services">
                  <img src={graphic} alt="Banner principal" className="img-cards-services" />
                    <h2>Graphic Design</h2>
                       <p>Sem quis erat nibh id neque tincidunt molestie convallis ut nibh vel, lorem consequat ullamcorper.</p>
              </div>
              <div className="cards-our_services">
                  <img src={web} alt="Banner principal" className="img-cards-services" />
                    <h2 className="Development">Web Development</h2>
                       <p>Sem quis erat nibh id neque tincidunt molestie convallis ut nibh vel, lorem consequat ullamcorper.</p>
              </div>
              </div>
            </div>
            {/* We help teams build the business of their dreams */}
            <div className="bussines">
             <div className="bussines_content">
                 <h2>We help teams build the business of their dreams</h2>
                <p>Et in risus egestas nec vitae odio ac nibh vestibulum volutpat aliquet aenean erat lobortis non.</p>
                <p>Nibh egestas dictumst cursus est turpis quis tincidunt pulvinar maecenas eget massa vel, ante nam blandit egestas
                enim id quis sit maecenas id nunc tempus auctor orci, enim imperdiet proin nibh mattis.</p>
             </div>
             <img src={aboutUs} alt="aboutUs" />
            </div>
          </div>
          
        </section>{/* Segunda secion (Fin) */}
        {/* ################################ */}
        <section className="third-section">{/* Tercera seccion (Inicio) */}
          <div className="third-section-content">
            <img src={avatar} alt="avatar" />
            <h2>
              “The best part is that Astra comes with hundreds of professionally designed 
              templates for just about every industry, makes it super easy for non-techy users to build a website.”
            </h2>
            <p>Wade Warren</p>
          </div>
        </section>{/* Tercera seccion (Fin) */}
        {/* ################################ */}

      <section className="fourth-section">{/* cuarta seccion (inicio) */}
        <h2>Why Choose Us</h2>
        <div className="card-container">
          <div>
            <img src={passionate} alt="passionate" />
            <p>Passionate</p>
            <p>Tempor ullamcorper urna, est, lectus amet sit tempor pretium mi sed morbi cras posuere sit ultrices bibendum augue sit ornare.</p>
          </div>
          <div>
            <img src={professional} alt="professional" />
            <p>Professional</p>
            <p>Tempor ullamcorper urna, est, lectus amet sit tempor pretium mi sed morbi cras posuere sit ultrices bibendum augue sit ornare.</p>
          </div>
          <div>
            <img src={support} alt="support" />
            <p>Support</p>
            <p>Tempor ullamcorper urna, est, lectus amet sit tempor pretium mi sed morbi cras posuere sit ultrices bibendum augue sit ornare.</p>
          </div>
        </div>
      </section>{/* cuarta seccion (Fin) */}

        <section className="fifth-section" >{/* quinta seccion (inicio) */}
            <h2>Get a professional website today!</h2>
            <button onClick={openCalendar}>Make a Website</button>
        </section>{/* quinta seccion (fin) */}
        <section className="sixth-section">{/* sexta seccion (inicio) */}
            <div>
              <p>Leave a Reply</p>
              <p>You must be <a href="">logged</a> in to post a comment.</p>
            </div>
            <p>Copyright © 2025 Astra | Powered by<a href="">Astra WordPress Theme</a></p>
        </section>{/* sexta seccion (fin) */}
      </main>
      {/* Calendario */}
           {isCalendarOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <button className="close-btn" onClick={closeCalendar}>X</button>
                  <Calendary />
                </div>
              </div>
            )}

    </div>
  );
}

export { HomePage };
