import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Mail, Github, Linkedin, Twitter, Award, Briefcase, Code, Send, ChevronsDown, Menu, X } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

// --- 3D Starfield Background ---
const Starfield = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#67e8f9" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

// --- Cursor Light Effect ---
const CursorLight = () => {
    const lightRef = useRef();
    useEffect(() => {
        const handleMouseMove = (event) => {
            if(lightRef.current) {
                lightRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return <div ref={lightRef} className="cursor-light"></div>;
};

// --- Coding Profiles Data ---
const codingProfiles = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Akankasha/",
    icon: "https://assets.leetcode.com/static_assets/public/icons/favicon.ico",
    username: "Akankasha",
    color: "#FFA116"
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/akankasha",
    icon: "https://cdn.codechef.com/images/cc-logo.svg",
    username: "akankasha",
    color: "#5B4638"
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/profile/korrayiakankasha",
    icon: "https://cdn.prod.website-files.com/66b6d7fd4d3e9cef94717176/6765dc51a13e31531996cef3_logo-dark.svg",
    username: "korrayiakankasha",
    color: "#2EC866"
  },
  {
    name: "CodingNinjas",
    url: "https://www.naukri.com/code360/profile/c18d31f1-f79d-4481-b4e2-cfa4e12423f6",
    icon: "https://files.codingninjas.in/new-cn-logos-1-1711622387.svg",
    username: "korrayiakankasha",
    color: "#f1752dff"
  },
];

// --- Main App Component ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const portfolioData = {
    name: "Akankasha Korrayi",
    title: "Creative Full-Stack Developer",
    about: {
      intro: "I build immersive and beautiful web applications from concept to completion.",
      description: "I'm a developer who is passionate about merging technology and design to create intuitive, engaging user experiences. With a strong foundation in both front-end and back-end development, I love tackling complex problems and turning ideas into reality. I'm a lifelong learner, constantly exploring new technologies to push the boundaries of what's possible on the web."
    },
    resumeUrl: "/WEBDEV.pdf",
    experience: [
      {
        role: "Web Developer",
        company: "NEXUS Swarm",
        duration: "April 2025 - Present",
        description: "A core team member focused on developing creative  websites for the community.",
      },
      {
        role: "MERN Developer",
        company: "UptoSkills",
        duration: "April 2025 - July 2025",
        description: "Worked on a real time project using MERN stack, enhancing my skills in building scalable web applications.",
      },
      
    ],
    projects: [
      {
        title: "CareTakers",
        description: "A website designed for providing services like Home-Nursing,Adoption,Companionship based on user requirements",
        tech: ["React", "vite","TailwindCSS"],
        imageUrl: "./ct.png",
        liveUrl: "https://akankasha-3.github.io/CARE-TAKERS/",
      },
      {
        title: "AntidoteHUB",
        description: "A comprehensive platform for tracing antidotes and accessing antidotes.",
        tech: ["HTML", "CSS", "Javascript", "Firebase"],
        imageUrl: "./AH.png",
        liveUrl: "https://ak-phi-rust.vercel.app/",
      },
      {
        title: "SUKOON",
        description: "A serene mental wellness platform inspired by yogic practices, designed to promote inner peace by connecting users with the five elements of nature through calming interfaces and mindful experiences.",
        tech: ["HTML", "CSS", "Javascript"],
        imageUrl: "./Sukoon.png",
        liveUrl: "https://akankasha-3.github.io/Sukoon/",
      },
    ],
    achievements: [
      {
        title: "GATE 2025 Qualified",
        source: "Graduate Aptitude Test in Engineering",
        description: "Qualified GATE 2025 with a rank of 27128 .",
      },
      {
        title: "Finalist",
        source: "NextMinds JagSoM",
        description: "Finalist at NextMinds JagSoM for presenting an innovative business idea demonstrating problemsolving and impactful contribution.",
      },
      {
        title: "Top 10.65% in LeetCode",
        source: "LeetCode",
        description: "Achieved a ranking in the top 10.66% of all users on LeetCode.",
      }
    ],
    contact: {
      email: "korrayiakankasha@gmail.com",
      socials: {
        github: "https://github.com/Akankasha-3",
        linkedin: "https://www.linkedin.com/in/akankasha-korrayi-560021268/",
        twitter: "https://x.com/Akankasha33310",
      }
    }
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <a key={link.href} href={link.href} onClick={() => isMobile && setIsMenuOpen(false)}
         className="nav-link">
        {link.label}
      </a>
    ));

  return (
    <div className={`app-container ${theme}`}>
      <CursorLight />
      <div className="starfield-canvas-container">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Starfield />
          </Suspense>
        </Canvas>
      </div>

      <div className="content-wrapper">
        <header className="main-header">
          <nav className="main-nav container">
            <a href="#home" className="logo">Akankasha</a>
            <div className="desktop-nav">
              {renderNavLinks()}
            </div>
            <div className="mobile-nav-toggle">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-nav-button">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <button onClick={handleThemeToggle} className="theme-toggle-btn">
              {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </nav>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mobile-nav-menu">
              <div className="mobile-nav-links">
                {renderNavLinks(true)}
              </div>
            </motion.div>
          )}
        </header>

        <main className="container">
          {/* Hero Section */}
          <section id="home" className="hero-section">
            <GlitchText text={portfolioData.name} className="hero-name" />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                      className="hero-title">
              {portfolioData.title}
            </motion.p>
            <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
                      className="scroll-down-indicator">
              <ChevronsDown size={32} />
            </motion.a>
          </section>

          {/* About Me */}
          <AnimatedSection id="about">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
                <div className="about-text">
                    <p className="about-intro">{portfolioData.about.intro}</p>
                    <p className="about-description">{portfolioData.about.description}</p>
                    <a
                  href={portfolioData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-button"
                  style={{
                    display: 'inline-block',
                    marginTop: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    background: '#2563eb',
                    color: '#fff',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px #bae6fd',
                    transition: 'background 0.2s'
                  }}
                >
                  View Resume
                </a>
                </div>
                <div className="holographic-card about-stack-card">
                    <h3 className="about-stack-title">My Stack</h3>
                    <p className="about-stack-list">HTML,CSS,Javascript,React, Node.js, Next.js, Python, SQL,C++,ML,NLP,Firebase</p>
                </div>
            </div>
          </AnimatedSection>
          
          {/* Experience */}
          <AnimatedSection id="experience">
            <h2 className="section-title">Experience</h2>
            <div className="experience-timeline">
                <div className="timeline-line"></div>
                {portfolioData.experience.map((item, index) => (
                    <ExperienceItem key={index} item={item} index={index} />
                ))}
            </div>
          </AnimatedSection>

          {/* Projects */}
          <AnimatedSection id="projects">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
                {portfolioData.projects.map((project, i) => (
                    <ProjectCard key={i} project={project} />
                ))}
            </div>
          </AnimatedSection>

          {/* Achievements */}
          <AnimatedSection id="achievements">
            <h2 className="section-title">Achievements</h2>
            <div className="achievements-list">
                {portfolioData.achievements.map((item, i) => (
                    <AchievementItem key={i} item={item} />
                ))}
            </div>
          </AnimatedSection>

          {/* Coding Profiles Swipe Cards */}
          <AnimatedSection id="profiles">
            <ProfileSwipeCards profiles={codingProfiles} />
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection id="contact">
            <h2 className="section-title">Contact Me</h2>
            <div className="contact-card holographic-card">
                <p className="contact-intro">
                    Have a project in mind or just want to say hello? Send me a message.
                </p>
                <ContactForm contactInfo={portfolioData.contact} />
            </div>
          </AnimatedSection>
        </main>

        <footer className="main-footer-bottom">
            <p>Designed & Built by Akankasha &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .app-container {
          background-color: #020617;
          color: #e0f2fe;
          position: relative;
        }
        .app-container.light {
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
          color: #22223b;
        }
        .app-container.light .main-header {
          background: linear-gradient(90deg, #e0e7ff 80%, #f8fafc 100%);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 12px #bae6fd;
        }
        .app-container.light .logo {
          color: #2563eb;
        }
        .app-container.light .nav-link {
          color: #22223b;
        }
        .app-container.light .nav-link:hover {
          color: #2563eb;
        }
        .app-container.light .section-title {
          color: #2563eb;
          text-shadow: 0 2px 8px #bae6fd;
        }
        .app-container.light .holographic-card {
          background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
          border: 1px solid #bae6fd;
          box-shadow: 0 8px 32px #bae6fd;
        }
        .app-container.light .holographic-card:hover {
          box-shadow: 0 16px 48px #bae6fd;
        }
        .app-container.light .timeline-marker {
          background-color: #bae6fd;
        }
        .app-container.light .timeline-content h3,
        .app-container.light .project-card-content h3,
        .app-container.light .achievement-item h3 {
          color: #2563eb;
        }
        .app-container.light .contact-button {
          background-color: #2563eb;
          color: white;
        }
        .app-container.light .contact-button:hover {
          background-color: #60a5fa;
        }
        .app-container.light .social-link {
          color: #2563eb;
        }
        .app-container.light .social-link:hover {
          color: #22223b;
        }
        .theme-toggle-btn {
          margin-left: 1rem;
          background: none;
          border: none;
          color: inherit;
          font-size: 1rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          transition: background 0.2s;
        }
        .theme-toggle-btn:hover {
          background: rgba(103, 232, 249, 0.1);
        }
        .container {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        @media (min-width: 640px) { .container { max-width: 640px; } }
        @media (min-width: 768px) { .container { max-width: 768px; } }
        @media (min-width: 1024px) { .container { max-width: 1024px; } }
        @media (min-width: 1280px) { .container { max-width: 1280px; } }
        .starfield-canvas-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .cursor-light {
            position: fixed;
            top: 0;
            left: 0;
            width: 1000px;
            height: 1000px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(22, 78, 99, 0.2), transparent 40%);
            pointer-events: none;
            z-index: 2;
            transition: transform 0.1s ease-out;
            transform-origin: -500px -500px;
        }
        .content-wrapper {
          position: relative;
          z-index: 10;
        }
        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background-color: rgba(2, 6, 23, 0.5);
          backdrop-filter: blur(10px);
        }
        .main-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 0.1em;
          color: #67e8f9;
          text-decoration: none;
        }
        .desktop-nav {
          display: none;
        }
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 2rem;
          }
        }
        .nav-link {
          position: relative;
          color: #e0f2fe;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #67e8f9;
        }
        .nav-link::after { 
            content: '';
            position: absolute;
            width: 0;
            height: 1px;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #1db4c8ff;
            transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .mobile-nav-toggle { display: block; }
        @media (min-width: 768px) { .mobile-nav-toggle { display: none; } }
        .mobile-nav-button { color: #e0f2fe; background: none; border: none; cursor: pointer; }
        .mobile-nav-menu { background-color: #081028; padding: 1rem 0; }
        .mobile-nav-links { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        @media (min-width: 768px) { .mobile-nav-menu { display: none; } }
        .section-title {
          font-size: 1.875rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 3rem;
          color: #f0f9ff;
          letter-spacing: 0.05em;
        }
        section {
            padding-top: 6rem;
            padding-bottom: 6rem;
        }
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .hero-name {
          font-size: 3rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) { .hero-name { font-size: 4.5rem; } }
        .hero-title {
          font-size: 1.125rem;
          color: #a5f3fc;
          max-width: 42rem;
        }
        @media (min-width: 768px) { .hero-title { font-size: 1.25rem; } }
        .scroll-down-indicator {
          position: absolute;
          bottom: 2.5rem;
          animation: bounce 2s infinite;
        }
        .scroll-down-indicator svg { color: #67e8f9; }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-8px); }
        }
        .about-grid {
            max-width: 56rem;
            margin: auto;
            display: grid;
            gap: 2rem;
            align-items: center;
        }
        @media (min-width: 768px) { .about-grid { grid-template-columns: repeat(3, 1fr); } }
        .about-text { grid-column: span 1 / span 1; }
        @media (min-width: 768px) { .about-text { grid-column: span 2 / span 2; } }
        .about-intro { font-size: 1.25rem; font-weight: 300; color: #e0f2fe; margin-bottom: 1rem; }
        .about-description { color: #6fafbeff; line-height: 1.6; }
        .about-stack-card { padding: 1.5rem; text-align: center; }
        .about-stack-title { font-weight: bold; font-size: 1.125rem; color: #11d2ebff; margin-bottom: 0.5rem; }
        .about-stack-list { font-size: 0.875rem; color: #5e686eff; }
        .experience-timeline {
            max-width: 48rem;
            margin: auto;
            position: relative;
        }
        .timeline-line {
            position: absolute;
            left: 1rem;
            width: 2px;
            height: 100%;
            background-color: rgba(99, 185, 208, 0.5);
        }
        @media (min-width: 768px) {
            .timeline-line { left: 50%; }
        }
        .projects-grid {
            display: grid;
            gap: 2rem;
        }
        @media (min-width: 768px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .projects-grid { grid-template-columns: repeat(3, 1fr); } }
        .achievements-list {
            max-width: 56rem;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .contact-card {
            max-width: 42rem;
            margin: auto;
            padding: 2rem;
        }
        @media (min-width: 768px) { .contact-card { padding: 3rem; } }
        .contact-intro { text-align: center; color: #2f58e0ff; margin-bottom: 1.5rem; }
        .main-footer-bottom {
            text-align: center;
            padding: 2.5rem 0;
            margin-top: 5rem;
        }
        .main-footer-bottom p { color: rgba(165, 243, 252, 0.5); font-size: 0.875rem; }
        .holographic-card {
            background: linear-gradient(135deg, rgba(2,6,23,0.5) 0%, rgba(8,47,73,0.5) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(103, 232, 249, 0.2);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            border-radius: 0.5rem;
        }
        .holographic-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(103, 232, 249, 0.1);
        }
        .holographic-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(110deg, transparent 20%, rgba(103, 232, 249, 0.2), transparent 80%);
            transition: left 0.8s ease;
        }
        .holographic-card:hover::before { left: 100%; }
        /* Profile swipe cards */
        .profile-swipe-container {
          margin: 3rem 0;
          text-align: center;
        }
        .profile-swipe-scroll {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          padding: 1rem 0;
          scrollbar-width: thin;
          scrollbar-color: #bae6fd #f8fafc;
        }
        .profile-card {
          min-width: 180px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
          border-radius: 1rem;
          border: 2px solid #bae6fd;
          box-shadow: 0 4px 16px #bae6fd;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 2rem;
          text-decoration: none;
          color: #22223b;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .profile-card:hover {
          transform: scale(1.07);
          box-shadow: 0 8px 32px #bae6fd;
        }
        .profile-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 0.75rem;
          border-radius: 0.5rem;
          background: #fff;
          box-shadow: 0 2px 8px #bae6fd;
        }
        .profile-info {
          text-align: center;
        }
        .profile-name {
          font-weight: bold;
          font-size: 1.1rem;
          color: #2563eb;
        }
        .profile-username {
          font-size: 0.95rem;
          color: #64748b;
        }
        /* Contact Socials as Boxes */
        .social-boxes {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 2rem;
        }
        .social-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 100%);
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          font-weight: 600;
          color: #334155;
          text-decoration: none;
          border: 2px solid #bae6fd;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .social-box:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 24px #bae6fd;
        }
        .social-box.github { border-color: #24292f; }
        .social-box.linkedin { border-color: #0A66C2; }
        .social-box.twitter { border-color: #1DA1F2; }
        .social-box span { margin-top: 0.5rem; font-size: 1rem; }
      `}</style>
    </div>
  );
};

// --- Child Components ---

const GlitchText = ({ text, className }) => {
    return (
        <div className={`glitch ${className}`} data-text={text}>
            {text}
            <style jsx>{`
                .glitch { position: relative; }
                .glitch::before, .glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .glitch::before {
                    left: 2px;
                    text-shadow: -2px 0 #f0abfc;
                    animation: glitch-anim-1 2.5s infinite linear reverse;
                }
                .glitch::after {
                    left: -2px;
                    text-shadow: -2px 0 #29b2c4ff, 2px 2px #f0abfc;
                    animation: glitch-anim-2 2s infinite linear reverse;
                }
                @keyframes glitch-anim-1 { 0%, 100% { clip-path: inset(45% 0 50% 0); } 25% { clip-path: inset(0 0 0 0); } 50% { clip-path: inset(80% 0 15% 0); } 75% { clip-path: inset(50% 0 45% 0); } }
                @keyframes glitch-anim-2 { 0%, 100% { clip-path: inset(5% 0 90% 0); } 25% { clip-path: inset(90% 0 5% 0); } 50% { clip-path: inset(30% 0 65% 0); } 75% { clip-path: inset(0 0 100% 0); } }
            `}</style>
        </div>
    );
};

const AnimatedSection = ({ children, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.section id={id} ref={ref} initial="hidden" animate={controls}
                        variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="section-container">
            {children}
        </motion.section>
    );
};

const ExperienceItem = ({ item, index }) => {
    const sideClass = index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right';
    return (
        <div className={`timeline-item ${sideClass}`}>
            <div className="timeline-spacer"></div>
            <div className="timeline-marker">
                <h1>{index + 1}</h1>
            </div>
            <div className="timeline-content holographic-card">
                <h3>{item.role}</h3>
                <p className="timeline-company">{item.company} | {item.duration}</p>
                <p className="timeline-description">{item.description}</p>
            </div>
            <style jsx>{`
                .timeline-item { margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; width: 100%; }
                .timeline-item-right { flex-direction: row-reverse; text-align: right; }
                .timeline-spacer { order: 1; width: calc(50% - 1rem); }
                .timeline-marker { z-index: 20; display: flex; align-items: center; order: 1; background-color: #1e293b; box-shadow: 0 0 10px rgba(0,0,0,0.5); width: 2rem; height: 2rem; border-radius: 9999px; }
                .timeline-marker h1 { margin: auto; font-weight: 600; font-size: 1.125rem; color: black; }
                .timeline-content { order: 1; width: calc(50% - 1rem); padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .timeline-content h3 { font-weight: bold; color: #e0bfe0ff; font-size: 1.25rem; }
                .timeline-company { font-size: 0.9rem; font-weight: 500; color: #60afd6ff; margin-bottom: 0.5rem; }
                .timeline-description { font-size: 0.9rem; color: rgba(207, 90, 168, 0.8); }
            `}</style>
        </div>
    );
};

const ProjectCard = ({ project }) => (
    <div className="holographic-card project-card">
        <img src={project.imageUrl} alt={project.title} />
        <div className="project-card-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
                {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                View Project &rarr;
            </a>
        </div>
        <style jsx>{`
            .project-card { border-radius: 0.5rem; overflow: hidden; }
            .project-card img { width: 100%; height: 12rem; object-fit: cover; opacity: 0.75; }
            .project-card-content { padding: 1.5rem; }
            .project-card-content h3 { font-size: 1.25rem; font-weight: bold; color: #67e8f9; margin-bottom: 0.5rem; }
            .project-card-content p { color: rgba(30, 193, 225, 0.8); margin-bottom: 2rem; }
            .tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
            .tech-tag { font-size: 0.75rem; background-color: rgba(13, 36, 43, 0.5); color: #a5f3fc; padding: 0.25rem 0.5rem; border-radius: 9999px; }
            .project-card-content a { font-weight: 600; color: #67e8f9; text-decoration: none; transition: color 0.3s; }
            .project-card-content a:hover { color: #e0f2fe; }
        `}</style>
    </div>
);

const AchievementItem = ({ item }) => (
    <div className="holographic-card achievement-item">
        <div className="achievement-icon">
            <Award />
        </div>
        <div>
            <h3>{item.title}</h3>
            <p className="achievement-source">{item.source}</p>
            <p className="achievement-description">{item.description}</p>
        </div>
        <style jsx>{`
            .achievement-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem; }
            .achievement-icon { background-color: rgba(201, 214, 218, 0.5); padding: 0.75rem; border-radius: 9999px; }
            .achievement-icon svg { color: #2f3232ff; }
            .achievement-item h3 { font-weight: bold; font-size: 1.125rem; color: #67e8f9; }
            .achievement-source { font-weight: 600; color: #528d9bff; font-size: 0.875rem; margin-bottom: 0.25rem; }
            .achievement-description { color: rgba(16, 65, 199, 0.8); font-size: 0.875rem; }
        `}</style>
    </div>
);

// --- Profile Swipe Cards Component ---
const ProfileSwipeCards = ({ profiles }) => (
  <div className="profile-swipe-container">
    <h2 className="section-title">Coding Profiles</h2>
    <div className="profile-swipe-scroll">
      {profiles.map(profile => (
        <a
          key={profile.name}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-card"
          style={{ borderColor: profile.color }}
        >
          <img src={profile.icon} alt={profile.name} className="profile-icon" />
          <div className="profile-info">
            <span className="profile-name">{profile.name}</span>
            <span className="profile-username">{profile.username}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
);

// --- Contact Form with Social Boxes ---
const ContactForm = ({ contactInfo }) => {
    const [status, setStatus] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => { setStatus('success'); }, 2000);
    };

    return (
        <>
            
            <div className="social-boxes">
                <a href={contactInfo.socials.github} target="_blank" rel="noopener noreferrer" className="social-box github">
                  <Github size={32} />
                  <span>GitHub</span>
                </a>
                <a href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-box linkedin">
                  <Linkedin size={32} />
                  <span>LinkedIn</span>
                </a>
                <a href={contactInfo.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-box twitter">
                  <Twitter size={32} />
                  <span>Twitter</span>
                </a>
            </div>
        </>
    );
};

// --- Intersection Observer Hook ---
function useInView(options) {
    const [inView, setInView] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (options.triggerOnce) {
                    observer.unobserve(entry.target);
                }
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, inView];
}
export default App;