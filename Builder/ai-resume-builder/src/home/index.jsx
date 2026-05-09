import Header from '@/components/custom/header'
import React, { useEffect } from "react";
import "./LandingPage.css"; // Import the CSS file
import backgroundImage from "../assets/An_elegant_and_minimalistic_illustration_represent.webp"; // Replace with your actual path
import gsap from "gsap";
import HomeIng from '../assets/Home1.png'
import F1 from "../assets/icon-supervisor.svg"
import F2 from "../assets/icon-team-builder.svg"
import F3 from "../assets/icon-calculator.svg"
import F4 from "../assets/icon-karma.svg"
import AboutImg from "../assets/About1.png"
import team1 from "../assets/Team1.jpg"
import team2 from "../assets/team2.jpg"
import team3 from "../assets/team3.jpg"
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Home = () => {

  const { user, isSignedIn } = useUser();
  const FeatureCard = ({ title, description, imgSrc, className, hoverClass }) => (
    <div className={`box ${className} ${hoverClass}`}>
      <h2 className={className}>{title}</h2>
      <p>{description}</p>
      <img src={imgSrc} alt={title} />
    </div>
  );
  const TeamCard = ({ name, role, incharge }) => {
    return (
      <div className="team-card">
        <div className="emoji">🧑‍🦱</div>
        <h3 className="team-name">{name}</h3>
        <p className="team-role">
          <strong>Role :</strong> {role}
        </p>
        <p className="team-incharge">
          <strong>Incharge :</strong> {incharge}
        </p>
      </div>
    );
  };
  const people = [
    {
      name: 'Aradwad Tushar',
      role: 'Front-end / Back-end Developer',
      imageUrl: team1,  // Replace with your actual image path
    },
    {
        name: 'Bembade Shriprasad',
        role: 'Front-end Devloper',
        imageUrl: team3,  // Replace with your actual image path
      },
      {
        name: 'Siddheshwar Morkhande',
        role: 'UI/UX',
        imageUrl: team2,  // Replace with your actual image path
      },
    // More people...
  ];
  
  const benefitsData = [
    {
      title: "Tailored Resume Building",
      description: "Our AI offers personalized recommendations to help you craft a resume that highlights your skills, experience, and goals. Choose from industry-specific templates to create a professional-looking resume quickly."
    },
    {
      title: "Enhanced Resume Optimization",
      description: "Get intelligent feedback on your resume’s content and structure, ensuring it's optimized for both recruiters and Applicant Tracking Systems (ATS)."
    },
    {
      title: "Save Time and Effort",
      description: "Effortlessly create a resume in minutes with automatic formatting and real-time suggestions, allowing you to focus on crafting your content."
    },
    {
      title: "User-Friendly Interface",
      description: "Our intuitive platform makes it easy to build and analyze your resume, with real-time updates and a seamless experience for all users."
    },
    
  ];

useEffect(() => {
    const navbar = document.querySelector('.header .navbar');
  
    const menuBtn = document.querySelector('#menu');
    const closeBtn = document.querySelector('#close');
    
    if (menuBtn) {
      menuBtn.onclick = () => {
        navbar.classList.add('active');
      };
    }
  
    if (closeBtn) {
      closeBtn.onclick = () => {
        navbar.classList.remove('active');
      };
    }
  
    // Mouse move effect for home image
    document.addEventListener('mousemove', move);
  
    function move(e) {
      document.querySelectorAll('.move').forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 120;
        const y = (window.innerWidth - e.pageY * speed) / 120;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    }
  
    // GSAP animations for visibility after content is loaded
    gsap.from('.logo', { opacity: 0, duration: 1, delay: 2, y: 10, onComplete: () => gsap.set('.logo', { opacity: 1 }) });
    gsap.from('.navbar .nav_item', { opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.2, onComplete: () => gsap.set('.navbar .nav_item', { opacity: 1 }) });
    gsap.from('.title', { opacity: 0, duration: 1, delay: 1.6, y: 30, onComplete: () => gsap.set('.title', { opacity: 1 }) });
    gsap.from('.description', { opacity: 0, duration: 1, delay: 1.8, y: 30, onComplete: () => gsap.set('.description', { opacity: 1 }) });
    gsap.from('.btn', { opacity: 0, duration: 1, delay: 2.1, y: 30, onComplete: () => gsap.set('.btn', { opacity: 1 }) });
    gsap.from('.image', { opacity: 0, duration: 1, delay: 2.6, y: 30, onComplete: () => gsap.set('.image', { opacity: 1 }) });
  
    return () => {
      document.removeEventListener('mousemove', move); // Cleanup the mousemove event on unmount
    };
  }, []);

  return (
    <div>
        <Header/>
        <div className="app">
          {/* Home Section */}
          <section className="home">
            <div className="content">
              <h1 className="title">Build Your<span> Dream Resume,</span> Open Your <span>Career Path! 🏆</span></h1>
              <p className="description">
              Build Smarter, Not Harder–AI-Powered Resume Creation 💡🤖📄
              </p>
              {isSignedIn ? (
        <Link to="/Dashboard">
          <button className="btn">Get Started </button>
        </Link>
      ) : (
        <Link to="/auth/sign-in">
          <button className="btn">Get Started</button>
        </Link>
      )}
            </div>
    
            <div className="image">
              <img src={HomeIng} alt="Home" data-speed="-3" className="move" />
            </div>
          </section>

          

    {/* About Section  */}
    <section className="about" id="about">
      <div className="row">
        <div className="image">
          <img src={AboutImg} alt="about" />
        </div>

        <div className="content">
          <h3>What Makes Our AI Resume Analyzer & Builder Special?🙄</h3>
          <div className="line"></div>
          <p> we believe that a well-crafted resume is the first step toward unlocking new career opportunities. Our AI-powered resume analyzer and builder are designed to make the process easy, efficient, and tailored to your needs.

With cutting-edge technology and smart algorithms, our tools provide instant feedback and personalized suggestions to help you craft a resume that stands out. Whether you're a fresh graduate, a seasoned professional, or someone looking to make a career change, our platform is built to guide you every step of the way.

What sets us apart is our commitment to quality and innovation. Our AI doesn’t just analyze keywords or formats – it provides in-depth, actionable insights that align with industry trends and employer expectations. The result? A polished resume that truly reflects your strengths, achievements, and career aspirations.

Join us today and experience how our AI tools can turn your resume into a powerful career asset!
          </p>
        </div>
      </div>
    </section>
    {/* Feature Section */}
    <section className="FeatureSection">
          <div>
      <header>
        <h1 className="FeatureHead">Features of Our Ai Analyzer & Builder🤩</h1>
      </header>

      <div className="container">
        <FeatureCard
          title="Resume Builder"
          description="User-friendly interface to create resumes with customizable templates,
                       Drag-and-drop sections for easy customization."
          imgSrc={F1}
          className="box-cyan"
          hoverClass="box-push"
        />

        <FeatureCard
          title="Resume Analyzer"
          description="Real-time feedback on resume quality and ATS optimization,
Suggestions for improving grammar, keywords, and structure."
          imgSrc={F2}
          className="box-red"
        />

        <FeatureCard
          title="Skill Recommendation"
          description="AI-driven suggestions to add relevant skills or certifications.
Tailored advice for specific job roles."
          imgSrc={F3}
          className="box-blue"
          hoverClass="box-push"
        />

        <FeatureCard
          title="Job Matching"
          description="Match resumes with job descriptions for better alignment.
Highlight missing keywords to optimize for desired roles."
          imgSrc={F4}
          className="box-orange"
        />
      </div>
    </div>
    </section>
    {/* Benefits section  */}
    
    <section className="benefits" id="benefits">
      <h1 className="heading">Benefits OF Our Ai Analyzer & Builder 😎</h1>

      <div className="benefits-container">
        {benefitsData.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="card-title">
              <h3>{benefit.title}</h3>
            </div>
            <div className="card-description">
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
    {/* Team Section */}
    <div className="team-container">
      <div className="team-content">
        <div className="team-intro">
          <h2 className="team-heading">Meet our leadership</h2>
          <p className="team-description">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
            best results for our clients.
          </p>
        </div>
        <ul className="people-list">
          {people.map((person) => (
            <li key={person.name} className="person">
              <div className="person-info">
                <img alt="" src={person.imageUrl} className="person-image" />
                <div className="person-details">
                  <h3 className="person-name">{person.name}</h3>
                  <p className="person-role">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Footer */}
    <footer class="footer-container">
  <div class="footer-content">
    <div class="footer-section about">
      <h3 class="footer-title">About Us</h3>
      <p class="footer-description">
        We are dedicated to creating innovative solutions and providing exceptional services for our clients.
      </p>
    </div>

    <div class="footer-section links">
      <h3 class="footer-title">Quick Links</h3>
      <ul class="footer-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Team</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div class="footer-section contact">
      <h3 class="footer-title">Contact</h3>
      <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
      <p>Phone: +123 456 7890</p>
      <div class="footer-social">
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Ai Resume Builder & Analyzer. All rights reserved.</p>
  </div>
</footer>



        </div>
    </div>
  )
}

export default Home
