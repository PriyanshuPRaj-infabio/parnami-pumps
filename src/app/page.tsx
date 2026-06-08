"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Check,
  Menu,
  X,
} from "lucide-react";

const FRAME_COUNT = 290;
const frameSrc = (index: number) =>
  `/hero-sequence-new/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

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

const serviceCategories = [
  {
    number: "01",
    title: "Fire Fighting Services",
    description: "Advanced fire protection infrastructure and pumping systems engineered to meet stringent safety and regulatory compliance standards.",
    subServices: [
      { name: "Fire Hydrant Piping", image: "/assets/images/fire-hydrant-piping.webp" },
      { name: "Hydrant & FHR Systems", image: "/assets/images/fire-hydrant-fhr.webp" },
      { name: "Hydrant Pumping Stations", image: "/assets/images/fire-hydrant-pumping.png" },
      { name: "Fire Panel Integration", image: "/assets/images/fire-panel.jpg" },
      { name: "Automatic Sprinkler Systems", image: "/assets/images/fire-sprinklers.webp" },
      { name: "Fire Water Curtain Systems", image: "/assets/images/fire-water-curtain.jpg" },
      { name: "Gas Flooding Systems", image: "/assets/images/gas-flooding-system.jpg" },
    ]
  },
  {
    number: "02",
    title: "HSD Storage & Distribution",
    description: "Secure, high-capacity High-Speed Diesel storage and pumping facilities designed for industrial utilities and power backup.",
    subServices: [
      { name: "Underground HSD Storage Tanks", image: "/assets/images/underground-hsd-storage-tank.png" },
      { name: "HSD Storage Yards", image: "/assets/images/hsd-storage-yard.png" },
      { name: "HSD Pumping Stations", image: "/assets/images/hsd-pumping-station.png" },
      { name: "HSD Service Tanks", image: "/assets/images/hsd-service-tank.png" },
    ]
  },
  {
    number: "03",
    title: "Utility Services",
    description: "Comprehensive utility support including compressed air, cooling tower, water supply, and processed water networks.",
    subServices: [
      { name: "Compressed Air Systems", image: "/assets/images/compressed-air-system.png" },
      { name: "Water Supply Systems", image: "/assets/images/water-supply-system.jpg" },
      { name: "Cooling Towers", image: "/assets/images/cooling-tower.png" },
      { name: "RO Water Processing Systems", image: "/assets/images/ro-water-processing-system.png" },
      { name: "Chilled Water Distribution Piping", image: "/assets/images/chilled-water-distribution-piping.png" },
    ]
  },
  {
    number: "04",
    title: "Gas Distribution & Leak Detection",
    description: "Safe gas regulation and distribution networks paired with advanced sensor systems for real-time hazard detection.",
    subServices: [
      { name: "Gas Pressure Regulating Stations", image: "/assets/images/gas-pressure-regulating-station.jpg" },
      { name: "LPG, Oxygen & Utility Piping", image: "/assets/images/air-water-nitrogen-lpg-distribution-piping.png" },
      { name: "Gas Leak Detection Systems", image: "/assets/images/gas-detector.png" },
    ]
  },
  {
    number: "05",
    title: "Steam & Hot Water Services",
    description: "High-pressure steam piping, distribution headers, and commercial hot water generators built for heavy duty utilities.",
    subServices: [
      { name: "Steam Distribution Piping", image: "/assets/images/steam-distribution-piping.webp" },
      { name: "Steam Distribution Headers", image: "/assets/images/steam-distribution-header.png" },
      { name: "Hot Water Generators", image: "/assets/images/hot-water-generator.png" },
    ]
  },
  {
    number: "06",
    title: "Boring & Rainwater Harvesting (RWH)",
    description: "Turnkey tube-well development and ecological rainwater harvesting systems to secure sustainable water supplies.",
    subServices: [
      { name: "Tubewell & DTH Boring Services", image: "/assets/images/dth-boring.png" },
      { name: "Rainwater Harvesting Systems", image: "/assets/images/rain-water-harvesting.jpg" },
    ]
  },
  {
    number: "07",
    title: "Fabrication Services",
    description: "High-precision fabrication of stainless steel enclosures, safety wash systems, and structural architectural railings.",
    subServices: [
      { name: "SS Safety Wash Enclosures", image: "/assets/images/ss-safety-wash-enclosures.png" },
      { name: "SS Architectural Railings", image: "/assets/images/ss-railing.png" },
    ]
  },
  {
    number: "08",
    title: "Industrial Plumbing & Finishing",
    description: "Turnkey execution of institutional washrooms, hand-wash sections, pantry setups, reception lobbies, and corporate dining facilities.",
    subServices: [
      { name: "Institutional Toilets & Cubicles", image: "/assets/images/hand-wash-urinals-cubicles.png" },
      { name: "Pantry Sinks & Cabinets", image: "/assets/images/pantry-sinks-cabinets.jpg" },
      { name: "Industrial Finishing Works", image: "/assets/images/industrial-finishing.jpg" },
      { name: "Reception Lobby Entries", image: "/assets/images/reception-entries.webp" },
      { name: "Executive Dining Facilities", image: "/assets/images/executive-dining.jpg" },
    ]
  },
  {
    number: "09",
    title: "Trading & Retail (Parnami Sales)",
    description: "Premium distribution of high-end sanitaryware, automated faucets, geysers, doors, windows, and luxury floor tiles.",
    subServices: [
      { name: "Kohler Premium Faucets & Chinaware", image: "/assets/images/kohler.jpg" },
      { name: "TOTO Luxury Bath Systems", image: "/assets/images/toto.jpg" },
      { name: "Jaquar Geysers, Lights & Showers", image: "/assets/images/jaquar.png" },
      { name: "Hindware Sanitary Products", image: "/assets/images/hindware.png" },
      { name: "Fenesta Premium Doors & Windows", image: "/assets/images/fenesta-doors-windows.jpg" },
      { name: "Designer Wall & Floor Tiles", image: "/assets/images/designer-tiles.webp" },
    ]
  }
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

const recentProjects = [
  { client: "M/s CINDA Engineering ECO Technology Pvt. Ltd.", location: "Pan-India", scope: "Industrial Piping & Utility Systems" },
  { client: "M/s Escorts Limited", location: "Faridabad (Plot No 1, 2 & 3)", scope: "Fire Fighting & Utility Piping" },
  { client: "M/s Tadano Escorts India Pvt. Ltd.", location: "Faridabad, Haryana", scope: "Process Piping & Pumping Stations" },
  { client: "M/s Nanliu Manufacturing India Limited", location: "Industrial Facility", scope: "Mechanical Utility Infrastructure" },
  { client: "M/s Escorts Kubota India Private Limited", location: "Faridabad, Haryana", scope: "Piping & Fire Protection Services" },
  { client: "M/s Y-Tec India Pvt. Ltd.", location: "Industrial Zone", scope: "Utility Distribution Piping" },
  { client: "M/s Mitsui Kinzoku Components India Pvt. Ltd.", location: "Bawal, Haryana", scope: "Industrial Piping & Fire Fighting" },
  { client: "M/s Denso Haryana India Pvt. Ltd.", location: "Manesar, Haryana", scope: "Plant Utilities & Piping Systems" },
  { client: "M/s Keihin India Manufacturing Pvt. Ltd.", location: "Bawal, Haryana", scope: "Mechanical Utility Piping" },
  { client: "Honda Motocycles and Scooters India Limited", location: "Tapukara, Rajasthan", scope: "Industrial Utility Installations" },
  { client: "Honda cars India Limited", location: "Tapukara & Greater Noida", scope: "Fire Fighting Infrastructure" },
  { client: "HMI Warehouse", location: "Tapukara, Rajasthan", scope: "Fire Hydrant & Sprinkler Systems" },
  { client: "Yamaha Motors India", location: "Chennai, Tamil Nadu", scope: "Industrial Piping & Utility Systems" },
  { client: "Honda Motorcycles and Scooters India Ltd.", location: "Vithilapur, Gujarat", scope: "Piping & Fire Hydrant System" },
  { client: "Techno Trends Auto Park", location: "Vithilapur, Gujarat", scope: "Industrial Facilities & Utilities" },
  { client: "Hilex India Pvt. Limited", location: "Sanand, Gujarat", scope: "Piping Networks & Utility System" },
  { client: "M/s Sumitomo Corporation (Tyre Wheel Project)", location: "Maruti Complex, Bacheraji, Gujarat", scope: "Turnkey Piping & Fire Protection" }
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
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Leadership", "#leadership"],
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
  const overlay = useRef<HTMLDivElement>(null);
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

    if (overlay.current) {
      gsap.fromTo(overlay.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "top -18%",
            scrub: true,
          }
        }
      );
    }

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
        
        <div ref={overlay} className="hero-content-overlay">
          <div className="hero-text-group">
            <div className="hero-technical-specs">
              <span>SYS.LOC // IN-HR-FBD</span>
              <span>EST. 1984</span>
            </div>
            <h1 className="hero-title">
              Engineering The Flow <em>Behind Modern Infrastructure</em>
            </h1>
            <p className="hero-subtitle">
              Industrial Piping, Fire Protection &amp; Water Infrastructure Solutions Since 1984.
            </p>
          </div>
          <div className="hero-actions">
            <a href="#services" className="hero-btn primary-btn">
              Explore Our Expertise
            </a>
            <a href="#projects" className="hero-btn secondary-btn">
              View Projects
            </a>
          </div>
        </div>

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
  const [activeService, setActiveService] = useState(0);
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
          <div className="about-visual reveal reactive"><Image className="parallax-img" src="/assets/images/about-us.webp" fill alt="Industrial piping network" sizes="(max-width: 800px) 100vw, 52vw" /><div className="technical-frame"><i /><i /><i /><i /></div><div className="visual-index">01 <span>/ ABOUT</span></div></div>
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
          
          <div className="services-dashboard">
            <div className="services-tabs-container">
              <div className="services-nav">
                {serviceCategories.map((category, idx) => (
                  <button
                    key={category.number}
                    className={`service-tab-btn ${idx === activeService ? 'active' : ''}`}
                    onClick={() => setActiveService(idx)}
                    onMouseEnter={() => setActiveService(idx)}
                  >
                    <span className="tab-number">{category.number}</span>
                    <span className="tab-title">{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="service-details-panel">
              <div className="service-details-header">
                <h3>{serviceCategories[activeService].title}</h3>
                <p>{serviceCategories[activeService].description}</p>
              </div>
              
              <div className="service-subservices-grid">
                {serviceCategories[activeService].subServices.map((sub) => (
                  <article className="subservice-card reveal reactive" key={sub.name}>
                    <div className="subservice-img-wrapper">
                      <Image 
                        className="subservice-img" 
                        src={sub.image} 
                        fill 
                        alt={sub.name} 
                        sizes="(max-width: 800px) 100vw, 30vw" 
                      />
                    </div>
                    <div className="subservice-info">
                      <h4>{sub.name}</h4>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="capabilities section-grid">
          <div className="section-wipe" />
          <div className="cap-copy reveal"><Label>Capabilities</Label><h2>Designed For Performance. <em>Built For Scale.</em></h2><p>Critical systems engineered around the demands of industrial environments and large infrastructure projects.</p></div>
          <div className="cap-grid">{capabilities.map((cap, i) => <div className="cap-item reveal reactive" key={cap}><span>0{i + 1}</span><p>{cap}</p><i /></div>)}</div>
        </section>

        <section className="projects" id="projects">
          <div className="section-wipe" />
          
          <div className="projects-dashboard">
            <div className="projects-header reveal">
              <Label>Recent Projects</Label>
              <h2>Engineering Executed <em>With Precision</em></h2>
              <p>
                Delivering high-performance utility piping, fire protection infrastructure, 
                and turnkey mechanical engineering installations for global automotive and industrial leaders.
              </p>
              
              <div className="projects-telemetry-panel">
                <div className="telemetry-stat">
                  <span className="stat-num">17+</span>
                  <span className="stat-label">Major Facilities</span>
                </div>
                <div className="telemetry-stat">
                  <span className="stat-num">04</span>
                  <span className="stat-label">States Covered</span>
                </div>
                <div className="telemetry-stat">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">Quality Audits Passed</span>
                </div>
              </div>
            </div>
            
            <div className="projects-log-container reveal">
              <div className="projects-log-header">
                <span>{`// LOG_ID`}</span>
                <span>CLIENT / PROJECT DEPLOYMENT</span>
                <span>LOCATION</span>
              </div>
              <div className="projects-log-list" data-lenis-prevent>
                {recentProjects.map((proj, idx) => (
                  <div className="project-log-item" key={idx}>
                    <div className="project-log-index">
                      <span className="active-dot" />
                      PRJ-{String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="project-log-main">
                      <h4>{proj.client}</h4>
                      <p>{proj.scope}</p>
                    </div>
                    <div className="project-log-location">
                      {proj.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

        <section className="leadership" id="leadership">
          <div className="section-wipe" />
          <div className="section-title reveal"><Label>Leadership</Label><h2>Leadership Driven By <em>Vision &amp; Experience</em></h2></div>
          
          <div className="leader-grid">
            <article className="leader-card reveal">
              <div className="leader-img-wrapper">
                <Image src="/assets/founder(hd).png" fill alt="Satish Parnami" sizes="(max-width: 800px) 100vw, 30vw" />
                <div className="technical-frame"><i /><i /><i /><i /></div>
              </div>
              <div className="leader-info">
                <h3>SATISH PARNAMI</h3>
                <span className="leader-role">Managing Director</span>
                <p>Leading the company with a strong foundation in engineering excellence, quality execution, and long-term client trust. Graduated from Rajasthan University, established the water supply and tubewell development business over 40 years ago.</p>
              </div>
            </article>

            <article className="leader-card reveal">
              <div className="leader-img-wrapper">
                <Image src="/assets/images/yr-pasrija.jpg" fill alt="Y.R. Pasrija" sizes="(max-width: 800px) 100vw, 30vw" />
                <div className="technical-frame"><i /><i /><i /><i /></div>
              </div>
              <div className="leader-info">
                <h3>Y.R. PASRIJA</h3>
                <span className="leader-role">General Manager</span>
                <p>Mechanical Engineering graduate with specialized training in Japan. Bringing over 50 years of industry experience and leading the project team at Parnami for the past 20 years.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-wipe" />
          <div className="blueprint-grid" />
          <div className="contact-orbit"><i /><i /><i /></div>
          
          <div className="contact-grid">
            <div className="contact-inner reveal">
              <Label>Start A Conversation</Label>
              <h2>Let&apos;s Build Infrastructure <em>That Performs</em></h2>
              <p>Whether you&apos;re planning a new facility, upgrading an existing system, or executing a large-scale engineering project, our team is ready to deliver solutions built around performance and reliability.</p>
              <ArrowLink light>Start A Project Discussion</ArrowLink>
            </div>
            
            <div className="contact-details reveal">
              <div className="contact-block">
                <h3>Headquarters &amp; Project Office</h3>
                <p>Parnami Pump &amp; Project PVT. LTD.<br />1E-1, Opposite Geeta Mandir,<br />N.I.T. Faridabad - 121001, Haryana</p>
              </div>
              <div className="contact-block">
                <h3>Showroom (Parnami Sales Corp.)</h3>
                <p>Shop No. 4 &amp; 5, New Shopping Centre,<br />Tikona Park, N.I.T. Faridabad - 121001</p>
              </div>
              <div className="contact-block">
                <h3>Get In Touch</h3>
                <p>
                  <strong>Phone:</strong> (0129) 4023268, 2417222<br />
                  <strong>Project Email:</strong> project@parnamipump.com<br />
                  <strong>Sales Email:</strong> parnamisales@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer>
        <div className="footer-brand">
          <Image src="/assets/logo.png" alt="Parnami Pump & Project Pvt. Ltd." width={173} height={53} />
          <p>Engineering Water Infrastructure Since 1984.</p>
        </div>
        <div>
          <b>COMPANY</b>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#leadership">Leadership</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <b>SERVICES</b>
          <a href="#services">Fire Fighting Services</a>
          <a href="#services">HSD Storage &amp; Distribution</a>
          <a href="#services">Utility Services</a>
          <a href="#services">Gas Distribution</a>
          <a href="#services">Trading &amp; Retail</a>
        </div>
        <div>
          <b>CONTACT</b>
          <p>Parnami Pump &amp; Project Pvt. Ltd.<br />Faridabad, Haryana</p>
        </div>
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
