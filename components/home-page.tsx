"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Cloud,
  FileText,
  Network,
  RadioTower,
  Server,
  ShieldCheck,
  Terminal,
  Monitor
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" }
  }
};

const stages = [
  { n: "00", slug: "it-fundamentals", title: "IT & Computer Fundamentals", level: "Beginner", icon: Monitor, desc: "Understand hardware, computer architecture, operating-system fundamentals and structured troubleshooting.", topics: ["Hardware & architecture", "OS fundamentals", "Boot & recovery", "Troubleshooting"] },
  { n: "01", slug: "networking", title: "Networking & Network Administration", level: "Foundation to intermediate", icon: Network, desc: "Learn addressing, subnetting, switching, routing, DNS, DHCP, firewalls and secure connectivity.", topics: ["TCP/IP & subnetting", "VLANs & routing", "DNS & DHCP", "Firewalls & VPNs"] },
  { n: "02", slug: "linux-windows-administration", title: "Linux & Windows Administration", level: "Core SysAdmin skills", icon: Terminal, desc: "Administer Linux and Windows servers, manage users and services, configure storage and troubleshoot from the command line.", topics: ["Linux administration", "Windows Server", "Bash & PowerShell", "Services & storage"] },
  { n: "03", slug: "enterprise-administration", title: "Enterprise System Administration", level: "Junior to independent", icon: Server, desc: "Manage organisational identity, Active Directory, Group Policy, shared services and enterprise operations.", topics: ["Active Directory", "Group Policy", "Identity lifecycle", "Enterprise services"] },
  { n: "04", slug: "infrastructure-operations", title: "Virtualization, Storage & Monitoring", level: "Intermediate", icon: Boxes, desc: "Operate virtual infrastructure, containers, storage, backup, disaster recovery and monitoring platforms.", topics: ["Proxmox & hypervisors", "Storage & RAID", "Backup & recovery", "Monitoring"] },
  { n: "05", slug: "security-automation", title: "Security, Automation & Operations", level: "Intermediate to advanced", icon: ShieldCheck, desc: "Harden systems, manage risk and automate repeatable infrastructure tasks with scripts and infrastructure as code.", topics: ["System hardening", "IAM & security", "Ansible", "Terraform & Git"] },
  { n: "06", slug: "cloud-hybrid", title: "Cloud & Hybrid Administration", level: "Intermediate to advanced", icon: Cloud, desc: "Operate Azure, AWS or Google Cloud and integrate cloud services with on-premises infrastructure.", topics: ["Cloud foundations", "Azure / AWS / GCP", "Hybrid identity", "Cloud governance"] },
  { n: "07", slug: "advanced-engineering", title: "Advanced Infrastructure, Kubernetes & SRE", level: "Advanced", icon: Activity, desc: "Design resilient platforms, operate Kubernetes, measure reliability and develop infrastructure architecture skills.", topics: ["High availability", "Kubernetes", "SRE & observability", "Architecture"] }
];

const destinations = [
  { title: "Technologies & tools", description: "Explore guides to operating systems, networking, virtualization, security and cloud.", href: "/technologies", action: "Browse technologies", icon: Boxes },
  { title: "Learning resources", description: "Find official documentation and trusted learning material in one searchable library.", href: "/resources", action: "Browse resources", icon: BookOpen },
  { title: "Study schedule", description: "Use a flexible 12-month plan with weekly topics, tasks and milestones.", href: "/schedule", action: "View the schedule", icon: CalendarDays },
  { title: "Career center", description: "Compare certifications, explore roles, build a portfolio and practise interviews.", href: "/career-center", action: "Explore career paths", icon: ShieldCheck }
];

function Heading({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </motion.div>
  );
}

function InfrastructureGraphic() {
  return (
    <div className="network-visual" aria-label="Illustration of connected IT infrastructure">
      <svg className="network-lines" viewBox="0 0 620 440" fill="none" aria-hidden="true">
        <path d="M310 95 L145 180 L145 275 M310 95 L475 180 L475 275 M145 275 L310 350 L475 275 M310 95 L310 350" />
        <path d="M145 180 L475 180" className="line-dash" />
        <circle cx="310" cy="95" r="4" /><circle cx="145" cy="180" r="4" /><circle cx="475" cy="180" r="4" />
        <circle cx="145" cy="275" r="4" /><circle cx="475" cy="275" r="4" /><circle cx="310" cy="350" r="4" />
      </svg>
      <div className="infra-node node-cloud"><Cloud size={21} /><span>Cloud</span><small>Public / Private</small></div>
      <div className="infra-node node-network"><Network size={21} /><span>Network</span><small>Routing · DNS</small></div>
      <div className="infra-node node-identity"><ShieldCheck size={21} /><span>Identity</span><small>Access · Policies</small></div>
      <div className="infra-core">
        <div className="core-icon"><Server size={27} /></div>
        <strong>Core infrastructure</strong>
        <span>Compute · Storage · Services</span>
        <div className="core-status"><i /> ALL SYSTEMS CONNECTED</div>
      </div>
      <div className="infra-node node-monitor"><Activity size={21} /><span>Monitoring</span><small>Logs · Metrics</small></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-section">
          <div className="hero-grid" />
          <div className="container hero-layout">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }}>
              <motion.h1 variants={reveal}>Understand the systems.<br /><span>Master the infrastructure.</span></motion.h1>
              <motion.p variants={reveal}>A practical, structured guide to System Administration, from operating systems and networking to enterprise infrastructure, automation and cloud architecture.</motion.p>
              <motion.div variants={reveal} className="hero-actions">
                <a className="button button-primary" href="#roadmap">Explore the roadmap <ArrowRight size={17} /></a>
                <a className="button button-secondary" href="#explore">Choose where to go next <BookOpen size={16} /></a>
              </motion.div>
              <motion.div variants={reveal} className="hero-note"><CheckCircle2 size={15} /> A knowledge and roadmap portal. Not an online course platform.</motion.div>
            </motion.div>
            <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
              <InfrastructureGraphic />
            </motion.div>
          </div>
          <div className="container hero-bottom"><a href="#roadmap">Start with the roadmap <ArrowDown size={14} /></a></div>
        </section>

        <section id="roadmap" className="section section-roadmap">
          <div className="container">
            <Heading title="Start with the fundamentals." desc="Follow the first steps in order. Every stage has its own topics, practical labs and projects." />
            <div className="roadmap-grid">
              {stages.slice(0, 3).map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.article key={stage.n} className="stage-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} transition={{ delay: index * 0.035 }}>
                    <div className="stage-card-top"><span className="stage-number">{stage.n}</span><span className="stage-level">{stage.level}</span></div>
                    <div className="stage-icon"><Icon size={21} /></div>
                    <h3>{stage.title}</h3>
                    <p>{stage.desc}</p>
                    <div className="stage-topics">{stage.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
                    <Link href={`/roadmap/${stage.slug}`} className="stage-link">Explore this stage <ChevronRight size={15} /></Link>
                  </motion.article>
                );
              })}
            </div>
            <div className="roadmap-footnote"><FileText size={16} /><span>Every roadmap stage includes practical labs, project ideas and a completion checklist.</span><Link href="/roadmap" className="text-link">View all 8 stages <ArrowUpRight size={15} /></Link></div>
          </div>
        </section>

        <section id="explore" className="section home-explore-section">
          <div className="container">
            <Heading title="Choose what you need next." desc="Go straight to the guide that matches your current goal." />
            <div className="home-explore-grid">
              {destinations.map((destination) => {
                const Icon = destination.icon;
                return (
                  <Link className="home-explore-card" href={destination.href} key={destination.href}>
                    <span className="home-explore-icon"><Icon size={20} /></span>
                    <h3>{destination.title}</h3>
                    <p>{destination.description}</p>
                    <span className="home-explore-action">{destination.action}<ArrowUpRight size={15} /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="container closing-inner">
            <div className="closing-orb"><RadioTower size={27} /></div>
            <h2>Understand the infrastructure.<br /><span>Build the capability.</span></h2>
            <p>Start with the roadmap and build your System Administration skills one stage at a time.</p>
            <Link className="button button-primary" href="/roadmap">Explore the roadmap <ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
