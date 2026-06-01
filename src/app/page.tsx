"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const FRAME_COUNT = 290;
const frameSrc = (index: number) =>
  `/hero-sequence/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const metrics = [
  ["40+", "Years Of Experience"],
  ["100+", "Industrial Projects"],
  ["1000+", "Systems Installed"],
  ["PAN INDIA", "Project Execution"],
];

const timeline = [
  ["1984", "Foundation", "Established as a company focused on industrial water systems, pumping infrastructure, and engineering services."],
  ["1990s", "Industrial Expansion", "Expanded operations into large-scale industrial plumbing and piping projects across multiple sectors."],
  ["2000s", "Infrastructure Growth", "Executed major industrial, institutional, and commercial infrastructure projects."],
  ["TODAY", "Engineering Partner", "Recognized as a trusted engineering and project execution partner across India."],
];

const services = [
  ["01", "Industrial Plumbing", "Complete industrial plumbing systems designed for operational efficiency and long-term reliability.", "/assets/services/industrial-plumbing(HD).png"],
  ["02", "Industrial Piping", "High-performance piping solutions engineered for industrial environments and critical infrastructure.", "/assets/services/industrial-piping.jpg"],
  ["03", "Piping Projects", "End-to-end project execution including planning, fabrication, installation, testing, and commissioning.", "/assets/pipingwork.png"],
  ["04", "Fire Hydrant Systems", "Advanced fire protection infrastructure designed to meet safety and compliance standards.", "/assets/services/fire_fighting_system.jpg"],
  ["05", "Water Management Systems", "Solutions focused on efficient water distribution, conservation, and operational sustainability.", "/assets/services/rain_water_harvesting.jpg"],
  ["06", "Fabrication & Engineering Support", "Precision fabrication capabilities supporting industrial and infrastructure projects.", "/assets/bluepipes.png"],
];

const capabilities = [
  "Industrial Water Distribution Systems",
  "Fire Fighting Infrastructure",
  "Pumping Stations",
  "Mechanical Piping Networks",
  "Water Supply Schemes",
  "Process Piping Systems",
  "Fabrication Solutions",
  "Industrial Utilities Infrastructure",
];

const projectScenes = [
  ["01", "Automotive", "Industrial Facilities", "/assets/services/industrial-piping.jpg"],
  ["02", "Manufacturing", "Mechanical Piping Networks", "/assets/pipingwork.png"],
  ["03", "Infrastructure", "Fire Fighting Infrastructure", "/assets/services/fire_fighting_system.jpg"],
  ["04", "Water Management", "Water Supply Schemes", "/assets/services/rain_water_harvesting.jpg"],
];

const clients = [
  ["ahresty", "Ahresty India"],
  ["belsonica", "Belsonica Auto Component"],
  ["bmw", "BMW India"],
  ["daiichi", "Daiichi India"],
  ["daikin", "Daikin Airconditioning"],
  ["denso", "Denso Haryana"],
  ["escorts", "Escorts Agri Machinery"],
  ["frigoglass", "Frigoglass India"],
  ["ge-motors", "GE Motors"],
  ["hi-lex", "Hi-Lex India"],
  ["honda-motorcycle", "Honda Motorcycle & Scooter India"],
  ["honda", "Honda Cars India"],
  ["jcb", "JCB India"],
  ["maeda", "MAEDA Corporation"],
  ["manav-rachna", "Manav Rachna International University"],
  ["manav", "Manav Institute"],
  ["manesar", "Model Economic Township Manesar"],
  ["marathon", "Marathon Electric"],
  ["metro", "Delhi Metro Rail Corporation"],
  ["metso", "METSO Mineral India"],
  ["mkun", "Munjal Kiriu Industries"],
  ["musahi", "Musashi Auto Parts"],
  ["mytex", "Mytex Polymers"],
  ["nhk", "NHK Spring"],
  ["nippon", "Nippon Leakless"],
  ["panasonic", "Panasonic India"],
  ["sankei", "Sankei Giken India"],
  ["shmz", "Shimizu Corporation"],
  ["star-wire", "Star Wire India"],
  ["taisei", "TAISEI Corporation"],
  ["tata-steel", "Tata Steel"],
  ["tata", "Tata Motors"],
  ["tecumseh", "Tecumseh Products"],
  ["toyoda", "Toyoda Gosei"],
  ["tpr", "TPR India"],
  ["yakut", "Yakult Danone India"],
  ["yamaha", "Yamaha Motor India"],
  ["ykk", "YKK India"],
  ["yokohama", "Yokohama India"],
];

const process = [
  "Consultation & Site Assessment",
  "System Planning & Design",
  "Engineering & Fabrication",
  "Execution & Installation",
  "Testing & Commissioning",
  "Long-Term Support",
];

const reasons = [
  "Decades Of Engineering Expertise",
  "Reliable Project Delivery",
  "Technical Excellence",
  "Experienced Engineering Teams",
  "Industry-Compliant Systems",
  "Commitment To Quality",
  "Pan India Project Capability",
  "Long-Term Client Relationships",
];

const nav = [
  ["About", "#about"],
  ["Expertise", "#services"],
  ["Projects", "#projects"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

function ArrowLink({ children, href = "#contact", light = false }: { children: React.ReactNode; href?: string; light?: boolean }) {
  return <a href={href} className={`arrow-link ${light ? "light" : ""}`}><span>{children}</span><ArrowUpRight size={17} /></a>;
}

function HeroCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const section = useRef<HTMLElement>(null);
  const progressBar = useRef<HTMLElement>(null);
  const images = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const el = canvas.current;
    const wrap = section.current;
    if (!el || !wrap) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const frames: HTMLImageElement[] = [];
    images.current = frames;
    let current = 1;
    let raf = 0;
    const render = () => {
      let img = frames[current - 1];
      for (let i = current - 1; (!img?.complete || !img.naturalWidth) && i >= 0; i--) img = frames[i];
      if (!img?.complete || !img.naturalWidth) return;
      const ratio = Math.max(el.width / img.naturalWidth, el.height / img.naturalHeight);
      const width = img.naturalWidth * ratio;
      const height = img.naturalHeight * ratio;
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.drawImage(img, (el.width - width) / 2, (el.height - height) / 2, width, height);
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      el.width = innerWidth * dpr;
      el.height = innerHeight * dpr;
      render();
    };
    resize();
    const loadFrame = (i: number) => {
      if (frames[i - 1]) return;
      const image = new window.Image();
      image.src = frameSrc(i);
      image.onload = () => { if (i === 1 || i === current) render(); };
      frames[i - 1] = image;
    };
    for (let i = 1; i <= 42; i++) loadFrame(i);
    const deferredLoad = window.setTimeout(() => {
      for (let i = 43; i <= FRAME_COUNT; i++) loadFrame(i);
    }, 650);
    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35,
      onUpdate: ({ progress }) => {
        current = Math.min(FRAME_COUNT, Math.max(1, Math.round(progress * (FRAME_COUNT - 1)) + 1));
        if (!frames[current - 1]) loadFrame(current);
        if (progressBar.current) progressBar.current.style.transform = `scaleX(${progress})`;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(render);
      },
    });
    addEventListener("resize", resize);
    return () => {
      trigger.kill();
      clearTimeout(deferredLoad);
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="hero-scroll" ref={section} id="top">
      <div className="hero-sticky">
        <canvas ref={canvas} className="hero-canvas" aria-label="Industrial infrastructure sequence" />
        <div className="hero-shade" />
        <div className="blueprint-grid" />
        <div className="hero-progress" aria-hidden="true"><i ref={progressBar} /></div>
      </div>
    </section>
  );
}

function SchematicBackbone() {
  return (
    <div className="schematic-backbone" aria-hidden="true">
      <svg viewBox="0 0 100 1600" preserveAspectRatio="none">
        <path pathLength="1" className="schematic-ghost" d="M50 0V160Q50 205 76 205H84V355H27V515H71V690H43V845H78V1015H24V1190H63V1370H50V1600" />
        <path pathLength="1" className="schematic-flow" d="M50 0V160Q50 205 76 205H84V355H27V515H71V690H43V845H78V1015H24V1190H63V1370H50V1600" />
      </svg>
      <i className="flow-node node-a" /><i className="flow-node node-b" /><i className="flow-node node-c" />
    </div>
  );
}

function Loader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setHidden(true), 2300);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className={`loader ${hidden ? "is-hidden" : ""}`} aria-hidden="true">
      <div className="loader-network"><i /><i /><i /><i /><i /><b /></div>
      <Image src="/assets/logo.png" alt="" width={173} height={53} className="loader-logo" priority />
      <span>ENGINEERING THE FLOW</span>
    </div>
  );
}

function SiteChrome() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("#top");
  useEffect(() => {
    let oldY = scrollY;
    const onScroll = () => {
      setHidden(scrollY > oldY && scrollY > 180);
      oldY = scrollY;
    };
    addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`));
    }, { rootMargin: "-42% 0px -52%" });
    document.querySelectorAll<HTMLElement>("section[id]").forEach((el) => observer.observe(el));
    return () => { removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  return (
    <>
      <header className={`site-nav ${hidden ? "nav-hidden" : ""}`}>
        <a href="#top" className="brand"><Image src="/assets/logo.png" alt="Parnami Pump & Project Pvt. Ltd." width={173} height={53} priority /></a>
        <nav>{nav.map(([name, href]) => <a className={active === href ? "active" : ""} href={href} key={href}>{name}</a>)}</nav>
        <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </header>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
        {nav.map(([name, href]) => <a href={href} onClick={() => setOpen(false)} key={href}>{name}</a>)}
      </div>
    </>
  );
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    let x = -50, y = -50, rx = -50, ry = -50, raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const enter = () => ring.current?.classList.add("is-hover");
    const leave = () => ring.current?.classList.remove("is-hover");
    const animate = () => {
      rx += (x - rx) * 0.14; ry += (y - ry) * 0.14;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(animate);
    };
    addEventListener("mousemove", move);
    const targets = document.querySelectorAll("a,button,.service-card,.why-card");
    targets.forEach((target) => { target.addEventListener("mouseenter", enter); target.addEventListener("mouseleave", leave); });
    animate();
    return () => { removeEventListener("mousemove", move); targets.forEach((target) => { target.removeEventListener("mouseenter", enter); target.removeEventListener("mouseleave", leave); }); cancelAnimationFrame(raf); };
  }, []);
  return <><div ref={ring} className="cursor-ring" /><div ref={dot} className="cursor-dot" /></>;
}



export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = matchMedia("(min-width: 801px)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const tick = (time: number) => { lenis?.raf(time); raf = requestAnimationFrame(tick); };
    if (lenis) raf = requestAnimationFrame(tick);
    const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
    reveals.forEach((el) => gsap.fromTo(el, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } }));
    gsap.fromTo(".schematic-flow", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: 0.2 } });
    gsap.utils.toArray<HTMLElement>(".section-wipe").forEach((el) => gsap.fromTo(el, { scaleX: 1 }, { scaleX: 0, transformOrigin: "right center", ease: "power3.inOut", scrollTrigger: { trigger: el.parentElement, start: "top 88%", end: "top 42%", scrub: true } }));
    if (!reduce && desktop) {
      gsap.to(".timeline-track", { xPercent: -50, ease: "none", scrollTrigger: { trigger: ".journey", start: "top top", end: "+=2200", scrub: 0.7, pin: true } });
      gsap.fromTo(".timeline-route span", { width: "0%" }, { width: "100%", ease: "none", scrollTrigger: { trigger: ".journey", start: "top top", end: "+=2200", scrub: 0.7 } });
      gsap.to(".project-track", { xPercent: -75, ease: "none", scrollTrigger: { trigger: ".projects", start: "top top", end: "+=3200", scrub: 0.7, pin: true } });
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => gsap.fromTo(el, { scale: 1.12, xPercent: -4 }, { scale: 1.02, xPercent: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }));
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => gsap.to(".section-title h2", { skewY: gsap.utils.clamp(-1.2, 1.2, self.getVelocity() / -1800), duration: 0.35, overwrite: true }) });
    }
    const reactive = gsap.utils.toArray<HTMLElement>(".reactive");
    const light = (event: PointerEvent) => {
      reactive.forEach((el) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    addEventListener("pointermove", light, { passive: true });
    const magnets = document.querySelectorAll<HTMLElement>(".arrow-link,.nav-cta,nav a");
    const magneticMove = (event: Event) => {
      const pointer = event as PointerEvent;
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      gsap.to(el, { x: (pointer.clientX - rect.left - rect.width / 2) * 0.18, y: (pointer.clientY - rect.top - rect.height / 2) * 0.22, duration: 0.35 });
    };
    const magneticLeave = (event: Event) => gsap.to(event.currentTarget as HTMLElement, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1,.45)" });
    magnets.forEach((el) => { el.addEventListener("pointermove", magneticMove); el.addEventListener("pointerleave", magneticLeave); });
    const tilts = document.querySelectorAll<HTMLElement>(".service-card,.why-card,.client-card-inner");
    const tiltMove = (event: Event) => {
      const pointer = event as PointerEvent;
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      gsap.to(el, { rotateX: (pointer.clientY - rect.top - rect.height / 2) / -32, rotateY: (pointer.clientX - rect.left - rect.width / 2) / 32, transformPerspective: 900, duration: 0.5 });
    };
    const tiltLeave = (event: Event) => gsap.to(event.currentTarget as HTMLElement, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
    tilts.forEach((el) => { el.addEventListener("pointermove", tiltMove); el.addEventListener("pointerleave", tiltLeave); });
    const clientsSection = document.querySelector(".clients") as HTMLElement;
    const handleClientsMouseMove = (event: MouseEvent) => {
      if (!clientsSection) return;
      const rect = clientsSection.getBoundingClientRect();
      clientsSection.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      clientsSection.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    clientsSection?.addEventListener("mousemove", handleClientsMouseMove);

    let marqueeRafId = 0;
    const updateActiveMarqueeCard = () => {
      const viewportCenter = window.innerWidth / 2;
      const cards = document.querySelectorAll(".client-card");
      let closestCard: Element | null = null;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.right > 0 && rect.left < window.innerWidth) {
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
          }
        }
      });

      cards.forEach((card) => {
        if (card === closestCard) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });

      marqueeRafId = requestAnimationFrame(updateActiveMarqueeCard);
    };

    if (!reduce) {
      marqueeRafId = requestAnimationFrame(updateActiveMarqueeCard);
    }

    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(marqueeRafId); lenis?.destroy(); removeEventListener("pointermove", light); magnets.forEach((el) => { el.removeEventListener("pointermove", magneticMove); el.removeEventListener("pointerleave", magneticLeave); }); tilts.forEach((el) => { el.removeEventListener("pointermove", tiltMove); el.removeEventListener("pointerleave", tiltLeave); }); clientsSection?.removeEventListener("mousemove", handleClientsMouseMove); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      <Loader /><Cursor /><SiteChrome /><SchematicBackbone />
      <main>
        <HeroCanvas />
        <section className="metrics section-grid">
          <div className="section-wipe" />
          <div className="section-head"><Label>Our Impact</Label><p>Trusted by industries, institutions, contractors, and infrastructure partners for delivering critical engineering solutions with precision and reliability.</p></div>
          <div className="metric-grid">{metrics.map(([number, text]) => <div className="metric reveal" key={text}><strong>{number}</strong><span>{text}</span></div>)}</div>
        </section>

        <section className="about section-grid" id="about">
          <div className="section-wipe" />
          <div className="about-visual reveal reactive"><Image className="parallax-img" src="/parnami.png" fill alt="Industrial piping network" sizes="(max-width: 800px) 100vw, 52vw" /><div className="technical-frame"><i /><i /><i /><i /></div><div className="visual-index">01 <span>/ ABOUT</span></div></div>
          <div className="about-copy reveal"><Label>About Us</Label><h2>Building Critical Infrastructure <em>Through Engineering Excellence</em></h2><p>Founded in 1984, Parnami Pump &amp; Project Pvt. Ltd. has grown into a trusted name in industrial plumbing, piping systems, fire protection infrastructure, and water management solutions.</p><p>For decades, we have partnered with industries, institutions, contractors, and developers to design and execute complex engineering systems that support essential operations.</p><p>From industrial piping networks to large-scale water infrastructure projects, our focus remains on quality, precision, reliability, and long-term performance.</p></div>
        </section>

        <section className="journey">
          <div className="section-wipe" />
          <div className="journey-stage">
            <div className="section-title reveal"><Label>Our Journey</Label><h2>A legacy of <em>engineering progress.</em></h2></div>
            <div className="timeline-track">
              <div className="timeline-route"><span /></div>
              {timeline.map(([year, title, text], i) => (
                <article className="timeline-item reveal" key={year}>
                  <i className="timeline-dot" />
                  <b>0{i + 1}</b>
                  <strong>{year}</strong>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-wipe" />
          <div className="section-title reveal"><Label>What We Do</Label><h2>Integrated <em>Engineering Solutions</em></h2></div>
          <div className="service-grid">{services.map(([number, title, text, image]) => <article className="service-card reveal reactive" key={number}><Image className="parallax-img" src={image} fill alt="" sizes="(max-width: 800px) 100vw, 50vw" /><div className="service-shade" /><div className="service-scan" /><span>{number}</span><div><h3>{title}</h3><p>{text}</p><ChevronRight /></div></article>)}</div>
        </section>

        <section className="capabilities section-grid">
          <div className="section-wipe" />
          <div className="cap-copy reveal"><Label>Capabilities</Label><h2>Designed For Performance. <em>Built For Scale.</em></h2><p>Critical systems engineered around the demands of industrial environments and large infrastructure projects.</p></div>
          <div className="cap-grid">{capabilities.map((cap, i) => <div className="cap-item reveal reactive" key={cap}><span>0{i + 1}</span><p>{cap}</p><i /></div>)}</div>
        </section>

        <section className="projects" id="projects">
          <div className="section-wipe" />
          <div className="project-intro"><Label>Projects</Label><h2>Engineering Solutions Delivered <em>Across Industries</em></h2><p>Our expertise spans manufacturing facilities, automotive plants, educational institutions, industrial developments, commercial infrastructure, and large-scale engineering projects.</p></div>
          <div className="project-track">{projectScenes.map(([number, industry, system, image]) => <article className="project-scene reactive" key={number}><Image className="parallax-img" src={image} fill alt="" sizes="85vw" /><div className="project-scene-shade" /><div className="project-meta"><span>{number} / 04</span><h3>{industry}</h3><p>{system}</p></div></article>)}</div>

        </section>

        <section className="clients" id="clients">
          <div className="section-wipe" />
          <div className="clients-ambient-glow clients-glow-1" />
          <div className="clients-ambient-glow clients-glow-2" />
          
          <div className="clients-header">
            <span className="clients-eyebrow">TRUSTED BY</span>
            <h2 className="clients-title">
              Built With <span><em>Industry Leaders</em></span>
            </h2>
          </div>

          <div className="client-scroll-container">
            <div className="client-track marquee">
              <div className="marquee-content">
                {clients.map(([logo, name]) => (
                  <div className="client-card" key={`${logo}-1`}>
                    <div className="client-card-inner">
                      <div className="client-logo-wrapper">
                        <Image
                          src={`/assets/clients/${logo}.jpg`}
                          width={140}
                          height={70}
                          alt={name}
                          className="client-logo-img"
                        />
                      </div>
                      <div className="client-card-glow" />
                    </div>
                    <div className="client-name">{name}</div>
                  </div>
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {clients.map(([logo, name]) => (
                  <div className="client-card" key={`${logo}-2`}>
                    <div className="client-card-inner">
                      <div className="client-logo-wrapper">
                        <Image
                          src={`/assets/clients/${logo}.jpg`}
                          width={140}
                          height={70}
                          alt={name}
                          className="client-logo-img"
                        />
                      </div>
                      <div className="client-card-glow" />
                    </div>
                    <div className="client-name">{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="process section-grid" id="process">
          <div className="section-wipe" />
          <div className="process-intro reveal"><Label>How We Work</Label><h2>Engineering Precision <em>At Every Stage</em></h2><p>From the first site assessment to long-term support, each stage is built around clear technical ownership.</p></div>
          <div className="process-list">{process.map((step, i) => <div className="process-step reveal" key={step}><span>0{i + 1}</span><h3>{step}</h3><ArrowUpRight /></div>)}</div>
        </section>

        <section className="why">
          <div className="section-wipe" />
          <div className="section-title reveal"><Label>Why Parnami</Label><h2>Why Industries <em>Trust Parnami</em></h2></div>
          <div className="why-grid">{reasons.map((reason) => <div className="why-card reveal reactive" key={reason}><Check size={16} /><span>{reason}</span></div>)}</div>
        </section>

        <section className="leadership section-grid">
          <div className="section-wipe" />
          <div className="leader-img reveal"><Image src="/assets/founder(hd).png" fill alt="Satish Parnami" sizes="(max-width: 800px) 100vw, 38vw" /></div>
          <div className="leader-copy reveal"><Label>Leadership</Label><h2>Leadership Driven By <em>Vision &amp; Experience</em></h2><h3>SATISH PARNAMI</h3><p>Leading the company with a strong foundation in engineering excellence, quality execution, and long-term client trust.</p></div>
        </section>

        <section className="contact" id="contact">
          <div className="section-wipe" /><div className="blueprint-grid" /><div className="contact-orbit"><i /><i /><i /></div><div className="contact-inner reveal"><Label>Start A Conversation</Label><h2>Let&apos;s Build Infrastructure <em>That Performs</em></h2><p>Whether you&apos;re planning a new facility, upgrading an existing system, or executing a large-scale engineering project, our team is ready to deliver solutions built around performance and reliability.</p><ArrowLink light>Start A Project Discussion</ArrowLink></div>
        </section>
      </main>
      <footer>
        <div><Image src="/assets/logo.png" alt="Parnami Pump & Project Pvt. Ltd." width={173} height={53} /><p>Engineering Water Infrastructure Since 1984.</p></div>
        <div><b>COMPANY</b><a href="#about">About Us</a><a href="#services">Services</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
        <div><b>SERVICES</b><a href="#services">Industrial Plumbing</a><a href="#services">Industrial Piping</a><a href="#services">Fire Hydrant Systems</a><a href="#services">Engineering Solutions</a></div>
        <div><b>CONTACT</b><p>Parnami Pump &amp; Project Pvt. Ltd.<br />Faridabad, Haryana</p></div>
        <div className="footer-bottom">
          <small>© Parnami Pump &amp; Project Pvt. Ltd.</small>
          <div className="footer-credits">
            <div className="credits-pill">
              <a
                href="https://fabulousmedia.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="credits-link"
                aria-label="FabulousMedia"
              >
                <img
                  src="/fabulous-logo.png"
                  alt="FabulousMedia"
                  className="credits-logo"
                />
              </a>
              <span className="credits-divider" />
              <a
                href="https://gocommercially.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="credits-link"
                aria-label="GoCommercially"
              >
                <img
                  src="/go_tm_logo_white.png"
                  alt="GoCommercially"
                  className="credits-logo"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
