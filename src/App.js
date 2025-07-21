import react ,{useState,useEffect,useRef,Suspense} from 'react';
import {Canvas,useFrame} from  '@react-three/fiber';

// --- 3D Starfield Background ---
const Starfield = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
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




const App=()=>{
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const [theme,setTheme]=usestate('dark');
  useEffect(()=>{
    document.documentElement.className=`theme-${theme}`;
  },[theme]);
  const toggleTheme=()=>{
    setTheme(prevTheme=>prevTheme ==='dark'?'light':'dark');
  };
  const portfolioData={
    name:"Akankasha Korrayi",
    title:"Creative Full-stack Developer",
    about:{
      intro:"I build immersive and beautiful web applications from concept to completion.",
      description:"I'm a developer who is passionate about merging technology and design to create intuitive,engaing user experiences.wih a strong foundation in both frontend and backend development"
    },
    experience:[{
      role:"Web Developer",
      company:"NEXUS Swarm",
      duration:"April2025-present",
      description:"Developed an ARCADE website which helps in knowing the overall points of the users along with their milestone.Currently working on website building.",

    },
    {role:"Web Developer",
     company:"UptoSkills",
     duration:"April2025-July2025",
     description:"Contributing to AI_RESUME_BUILDER website which helps users to enhance their resume more effectively using AI and they can also create resumes using provided templates",

    }
  ],
  projects:[
    {
      title:"AntidoteHUB",
      decription:"A real time  emergency antidote tracker,helps in finding the antidote by enetring name of the antidote and location",
      techStack:["HTML","CSS","JavaSCript","Firebase"],
      imageUrl:"",
      liveUrl:"",
    },
    {
      title:"CareTakers",
      description:"A platform that provides services like Home-Nursing,CompanionShip,Adoption.Any user can book any service by paying minimal price(we don't charge for Adopting the children)",
      techstack:["React","Vite","tailwindCSS"],
      imageUrl:"",
      liveUrl:"",
    },
    {
      title:"Arcade Website",
      description:"It is a website built for google Arcade participants where they can check their points and milestones.",
      techStack:["Html","CSS","JavaScript","CSV"],
      imageUrl:"",
      liveUrl:"",
    }
  ],
  Achievements:[
    {
      title:"Qualified Gate",
      Source:"Gate 2025",
      description:"",
    },
    {
      title:"Top 10.67%",
      Source:"LeetCode",
      description:"Attended 40+ contents and having highest rating as 1736",
    },
    {
      title:"Finalist",
      Source:"Jagssom NextMinds",
      description:"It's a innovative bussiness idea presentaion which is Stood in Top-100 out of 7100+ participants",

    }

  ],
  profiles:[
    {
      name:'Github',
      url:'',
    },
    {
      name:'Leetcode',
      url:'',
    },
    {
      name:'CodeChef',
      url:'',
    },
    {
      name:'HackerRank',
      url:'',
    },
    {
      name:'LinkedIn',
      url:'',
    }
  ],
  contact:{
    email:'Korrayiakankasha@gmail.com',
    mobile:"+91 9110746462",
    sociala:{
      linkedIn:"",
      Github:'',
    }
  }
  };
  const navLinks=[
    {href:'#about',label:'About'},
    {href:'#experience',label:'Experience'},
    {href:"#projects",label:"Projects"},
    {href:"#profiles",label:"Profiles"},
    {href:"#achievements",label:"Achivements"},
    {href:"#contact",label:"Contact"},
  ];

  const renderNavLinks=(isMobile=false)=>
    navLinks.map((link)=>(
      <a key={link.href} href={link.href} onClick={()=> isMobile && setIsMenuOpen(false)}
      className="nav-Link">
        {link.label}
      </a>
    ));
  return(
    <div className="app-container">
      <CursorLight/>
      <div className="star-field-canvas-container">
        <Canvas camera={{position:[0,0,1]}}>
          <Suspense fallback={null}>
            <Starfield />
          </Suspense>
        </Canvas> 
      </div>
      <div className="content-wrapper">
        <header className="main-header">
          <nav className="main-nav container">
            <a href="#home" className="logo">AK</a>
            <div className="desktop-nav">
              {renderNavLinks()}
              <button onClick={toggleTheme} classNmae="theme-toggle-button">
                {theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}
              </button>
            </div>
            <div classNmae="mobile-nav-toggle">
              <button onClick={toggleTheme} className="theme-toggle-button">
                {theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}
              </button>
              <button onClick={()=>setIsMenuOpen(!isMenuOpen)} className="mobile-nav-button">
                {isMenuOpen?<X size={24}/>:<Menu size={24}/>}
              </button>
            </div>
          </nav>
          {isMenuOpen &&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}}
            className="mobile-nav-menu">
              <div className="mobile-nav-links">
                {renderNavLinks(true)}
              </div>
            </motion.div>
          )}
          
        </header>
        <main className="container">
          {/* Hero section */}
          <section id="home" className="hero-section">
            <GlitchText text={portfolioData.name} className="hero-name" />
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            transition={{duration:0.8,delay:0.5}}  className="hero-title">
              {portfolioData.title}

            </motion.p>
            <motion.a href="#about" initial={{opacity:0}} animate={{opacity:1}}
            transition={{duration:1,delay:1}} className="scroll-down-indicator">
              <chevronsDown size={32} />
            </motion.a>

          </section>
          {/*About me*/}
          <AnimatedSection id='about'>
            <h2 className="section-title">ABOUT ME</h2>
            <div  className="about-grid">
              <div className="about-text">
                <p className="about-intro">{portfolioDataData.about.intro}</p>
                <p className="about-description">{portfolioData.about.descrption}</p>
              </div>
              <div className="holographic-card about-stack-card">
                <h3 className="about-stack-title">My Tech Stack</h3>
                <p classNmae="about-stack-list">React,Node.js ,Express.js,Next.js,MongoDB,python,C,C++,SQL,HTML,CSS,TailwindCSS</p>

              </div>
            </div>
          </AnimatedSection>
          {/*Experience*/}
          <AnimatedSection id="experience">
            <h2 className="section-title">Experience</h2>
            <div className="experience-timeline">
              {portfolioData.experience.map((Item,index)=>(
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

          {/* Profiles Section */}
          <AnimatedSection id="profiles">
            <h2 className="section-title">My Coding Profiles</h2>
            <p className="section-subtitle">Swipe through my profiles to see my work and skills across different platforms.</p>
            <ProfileCardDeck profiles={portfolioData.profiles} />
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
          {/* Contact */}
          <AnimatedSection id="contact">
            <h2 className="section-title">Contact Me</h2>
            <div className="contact-card holographic-card">
                <p className="contact-intro">
                    Let's build something amazing together. Whether you have a project idea, a job opportunity, or just want to connect, feel free to reach out.
                </p>
                <div className="contact-info-grid">
                    <ContactInfoItem icon={<Mail />} label="Email" value={portfolioData.contact.email} href={`mailto:${portfolioData.contact.email}`} />
                    <ContactInfoItem icon={<Phone />} label="Mobile" value={portfolioData.contact.mobile} href={`tel:${portfolioData.contact.mobile}`} />
                    <ContactInfoItem icon={<Linkedin />} label="LinkedIn" value="Connect with me" href={portfolioData.contact.socials.linkedin} />
                    <ContactInfoItem icon={<Github />} label="GitHub" value="Explore my code" href={portfolioData.contact.socials.github} />
                </div>
            </div>
          </AnimatedSection>
        </main>
        <footer className="main-footer-bottom">
            <p>Designed & Built by Akankasha Korrayi &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
      <style jsx global>{`
        /* CSS Variables for Theming */
        :root {
          --font-size-normal: 16px;
          --font-size-large: 17px;
        }

        .theme-dark {
          --bg-primary: #020617;
          --text-primary: #e0f2fe;
          --text-secondary: #94a3b8;
          --text-hero: #a5f3fc;
          --accent-primary: #67e8f9;
          --accent-secondary: #0891b2;
          --accent-tertiary: #f0abfc;
          --card-bg: linear-gradient(135deg, rgba(2,6,23,0.5) 0%, rgba(8,47,73,0.5) 100%);
          --card-border: rgba(103, 232, 249, 0.2);
          --card-highlight: rgba(103, 232, 249, 0.2);
          --header-bg: rgba(2, 6, 23, 0.5);
          --timeline-line: rgba(14, 116, 144, 0.5);
          --timeline-marker-bg: #1e293b;
          --tag-bg: rgba(14, 116, 144, 0.5);
          --tag-text: #a5f3fc;
          --input-bg: rgba(2, 6, 23, 0.5);
          --input-border: rgba(14, 116, 144, 0.5);
          --cursor-light-bg: radial-gradient(circle, rgba(22, 78, 99, 0.2), transparent 40%);
          font-size: var(--font-size-large);
        }

        .theme-light {
          --bg-primary: #f8fafc;
          --text-primary: #1e293b;
          --text-secondary: #475569;
          --text-hero: #0f172a;
          --accent-primary: #f97316;
          --accent-secondary: #ea580c;
          --accent-tertiary: #4338ca;
          --card-bg: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(241,245,249,0.8) 100%);
          --card-border: rgba(30, 41, 59, 0.1);
          --card-highlight: rgba(249, 115, 22, 0.2);
          --header-bg: rgba(248, 250, 252, 0.7);
          --timeline-line: rgba(234, 88, 12, 0.3);
          --timeline-marker-bg: #475569;
          --tag-bg: rgba(249, 115, 22, 0.1);
          --tag-text: #b45309;
          --input-bg: #ffffff;
          --input-border: #cbd5e1;
          --cursor-light-bg: radial-gradient(circle, rgba(249, 115, 22, 0.1), transparent 40%);
          font-size: var(--font-size-normal);
        }
        
        /* Basic Setup */
        body {
          margin: 0;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .app-container {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          position: relative;
          transition: background-color 0.5s ease, color 0.5s ease;
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

        /* Background and Effects */
        .starfield-canvas-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: var(--starfield-opacity, 1);
          transition: opacity 0.5s ease;
        }
        .theme-light .starfield-canvas-container {
            --starfield-opacity: 0;
        }
        .cursor-light {
            position: fixed;
            top: 0;
            left: 0;
            width: 1000px;
            height: 1000px;
            border-radius: 50%;
            background: var(--cursor-light-bg);
            pointer-events: none;
            z-index: 2;
            transition: transform 0.1s ease-out, background 0.5s ease;
            transform-origin: -500px -500px;
        }
        .content-wrapper {
          position: relative;
          z-index: 10;
        }

        /* Header & Navigation */
        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background-color: var(--header-bg);
          backdrop-filter: blur(10px);
          transition: background-color 0.5s ease;
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
          color: var(--accent-primary);
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
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: var(--accent-primary);
        }
        .nav-link::after { 
            content: '';
            position: absolute;
            width: 0;
            height: 1px;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--accent-primary);
            transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .mobile-nav-toggle { display: flex; align-items: center; gap: 1rem; }
        @media (min-width: 768px) { .mobile-nav-toggle { display: none; } }
        .mobile-nav-button, .theme-toggle-button { color: var(--text-primary); background: none; border: none; cursor: pointer; }
        .mobile-nav-menu { background-color: var(--header-bg); padding: 1rem 0; }
        .mobile-nav-links { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        @media (min-width: 768px) { .mobile-nav-menu { display: none; } }

        /* General Section Styling */
        .section-title {
          font-size: 1.875rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 1rem;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }
        .section-subtitle {
            text-align: center;
            margin-bottom: 3rem;
            color: var(--text-secondary);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        section {
            padding-top: 6rem;
            padding-bottom: 6rem;
        }

        /* Hero Section */
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
          color: var(--text-hero);
          max-width: 42rem;
        }
        @media (min-width: 768px) { .hero-title { font-size: 1.25rem; } }
        .scroll-down-indicator {
          position: absolute;
          bottom: 2.5rem;
          animation: bounce 2s infinite;
        }
        .scroll-down-indicator svg { color: var(--accent-primary); }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-8px); }
        }

        /* About Section */
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
        .about-intro { font-size: 1.25rem; font-weight: 300; color: var(--text-primary); margin-bottom: 1rem; }
        .about-description { color: var(--text-secondary); line-height: 1.6; }
        .about-stack-card { padding: 1.5rem; text-align: center; }
        .about-stack-title { font-weight: bold; font-size: 1.125rem; color: var(--accent-primary); margin-bottom: 0.5rem; }
        .about-stack-list { font-size: 0.875rem; color: var(--text-primary); }

        /* Experience Section */
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
            background-color: var(--timeline-line);
        }
        @media (min-width: 768px) {
            .timeline-line { left: 50%; transform: translateX(-50%); }
        }

        /* Projects Section */
        .projects-grid {
            display: grid;
            gap: 2rem;
        }
        @media (min-width: 768px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .projects-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Achievements Section */
        .achievements-list {
            max-width: 56rem;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        /* Contact Section */
        .contact-card {
            max-width: 48rem;
            margin: auto;
            padding: 2rem;
        }
        @media (min-width: 768px) { .contact-card { padding: 3rem; } }
        .contact-intro { text-align: center; color: var(--text-secondary); margin-bottom: 2rem; max-width: 42rem; margin-left: auto; margin-right: auto; }
        .contact-info-grid {
            display: grid;
            gap: 1.5rem;
        }
        @media (min-width: 768px) { .contact-info-grid { grid-template-columns: 1fr 1fr; } }


        /* Footer */
        .main-footer-bottom {
            text-align: center;
            padding: 2.5rem 0;
            margin-top: 5rem;
        }
        .main-footer-bottom p { color: var(--text-secondary); opacity: 0.7; font-size: 0.875rem; }

        /* Holographic Card Effect */
        .holographic-card {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--card-border);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            border-radius: 0.5rem;
        }
        .holographic-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0, 0.1);
        }
        .holographic-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(110deg, transparent 20%, var(--card-highlight), transparent 80%);
            transition: left 0.8s ease;
        }
        .holographic-card:hover::before { left: 100%; }
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
                .glitch { position: relative; color: var(--text-primary); }
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
                    text-shadow: -2px 0 var(--accent-tertiary);
                    animation: glitch-anim-1 2.5s infinite linear reverse;
                }
                .glitch::after {
                    left: -2px;
                    text-shadow: -2px 0 var(--accent-primary), 2px 2px var(--accent-tertiary);
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
                .timeline-marker { z-index: 20; display: flex; align-items: center; order: 1; background-color: var(--timeline-marker-bg); box-shadow: 0 0 10px rgba(0,0,0,0.5); width: 2rem; height: 2rem; border-radius: 9999px; }
                .timeline-marker h1 { margin: auto; font-weight: 600; font-size: 1.125rem; color: white; }
                .timeline-content { order: 1; width: calc(50% - 1rem); padding: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .timeline-content h3 { font-weight: bold; color: var(--accent-primary); font-size: 1.25rem; }
                .timeline-company { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); margin-bottom: 0.5rem; }
                .timeline-description { font-size: 0.875rem; color: var(--text-secondary); }
                
                @media (max-width: 767px) {
                    .timeline-item, .timeline-item-right { flex-direction: row; text-align: left; }
                    .timeline-spacer { display: none; }
                    .timeline-marker { order: 0; margin-right: 1rem; }
                    .timeline-item-right .timeline-marker { margin-left: 1rem; margin-right: 0; }
                    .timeline-content { width: calc(100% - 3rem); order: 1; }
                }
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
            .project-card-content h3 { font-size: 1.25rem; font-weight: bold; color: var(--accent-primary); margin-bottom: 0.5rem; }
            .project-card-content p { color: var(--text-secondary); margin-bottom: 1rem; }
            .tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
            .tech-tag { font-size: 0.75rem; background-color: var(--tag-bg); color: var(--tag-text); padding: 0.25rem 0.5rem; border-radius: 9999px; }
            .project-card-content a { font-weight: 600; color: var(--accent-secondary); text-decoration: none; transition: color 0.3s; }
            .project-card-content a:hover { color: var(--accent-primary); }
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
            .achievement-icon { background-color: var(--tag-bg); padding: 0.75rem; border-radius: 9999px; }
            .achievement-icon svg { color: var(--accent-primary); }
            .achievement-item h3 { font-weight: bold; font-size: 1.125rem; color: var(--accent-primary); }
            .achievement-source { font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.25rem; }
            .achievement-description { color: var(--text-secondary); font-size: 0.875rem; }
        `}</style>
    </div>
);

const ContactInfoItem = ({ icon, label, value, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact-info-item holographic-card">
        <div className="contact-icon">{icon}</div>
        <div className="contact-text">
            <span className="contact-label">{label}</span>
            <span className="contact-value">{value}</span>
        </div>
        <style jsx>{`
            .contact-info-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                text-decoration: none;
                color: var(--text-primary);
            }
            .contact-icon {
                color: var(--accent-primary);
            }
            .contact-text {
                display: flex;
                flex-direction: column;
            }
            .contact-label {
                font-size: 0.875rem;
                color: var(--text-secondary);
            }
            .contact-value {
                font-weight: 500;
                color: var(--text-primary);
            }
        `}</style>
    </a>
);

// --- Profile Swipe Cards ---
const ProfileCardDeck = ({ profiles }) => {
    const [gone] = useState(() => new Set());
    const [props, api] = useSprings(profiles.length, i => ({
        from: { x: 0, rot: 0, scale: 1.5, y: -1000 },
        to: { x: 0, y: i * -4, scale: 1 - i * 0.05, rot: -10 + Math.random() * 20, delay: i * 100 },
    }));

    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
        const trigger = vx > 0.2;
        const dir = xDir < 0 ? -1 : 1;
        if (!down && trigger) gone.add(index);
        api.start(i => {
            if (index !== i) return;
            const isGone = gone.has(index);
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
            const rot = mx / 100 + (isGone ? dir * 10 * vx : 0);
            const scale = down ? 1.1 : 1;
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
            };
        });
        if (!down && gone.size === profiles.length)
            setTimeout(() => {
                gone.clear();
                api.start(i => ({ to: { x: 0, y: i * -4, scale: 1 - i * 0.05, rot: -10 + Math.random() * 20, delay: i * 100 } }));
            }, 600);
    });

    return (
        <div className="profile-deck-container">
            {props.map((springProps, i) => (
                <animated.div className="profile-card" key={i} style={springProps}>
                    <animated.div {...bind(i)} className="holographic-card profile-card-inner">
                        <div className="profile-icon">{profiles[i].icon}</div>
                        <h3 className="profile-name">{profiles[i].name}</h3>
                        <p className="profile-description">{profiles[i].description}</p>
                        <a href={profiles[i].url} target="_blank" rel="noopener noreferrer" className="profile-link">
                            View Profile <ArrowRight size={16} />
                        </a>
                    </animated.div>
                </animated.div>
            ))}
            <style jsx>{`
                .profile-deck-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    width: 100%;
                    height: 400px;
                    position: relative;
                }
                .profile-card {
                    position: absolute;
                    width: 300px;
                    height: 350px;
                    will-change: transform;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    touch-action: none;
                }
                .profile-card-inner {
                    width: 100%;
                    height: 100%;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                }
                .profile-icon {
                    color: var(--accent-primary);
                    margin-bottom: 1rem;
                }
                .profile-icon :global(svg) {
                    width: 48px;
                    height: 48px;
                }
                .profile-name {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent-primary);
                    margin-bottom: 0.5rem;
                }
                .profile-description {
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                    flex-grow: 1;
                }
                .profile-link {
                    font-weight: 600;
                    color: var(--accent-secondary);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: color 0.3s;
                }
                .profile-link:hover {
                    color: var(--accent-primary);
                }
            `}</style>
        </div>
    );
};


// Custom hook for Intersection Observer
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
