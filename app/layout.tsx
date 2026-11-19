import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { RoadmapProgressProvider } from "@/components/roadmap/use-roadmap-progress";
import { getCanonicalUrl, getSiteUrl } from "@/lib/site-url";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./styles/font-stack.css";
import "./styles/roadmap.css";
import "./styles/schedule.css";
import "./styles/technologies.css";
import "./styles/career-center.css";
import "./styles/accessibility.css";
import "./styles/visual-refresh.css";

const siteUrl = getSiteUrl();
const homeCanonical = getCanonicalUrl("/");

export const metadata: Metadata = {
  metadataBase: siteUrl ?? undefined,
  title: { default: "SYSADMIN.", template: "SYSADMIN. | %s" },
  description: "A practical System Administration knowledge and roadmap portal covering operating systems, networking, infrastructure, security, automation, cloud and career development.",
  applicationName: "SYSADMIN.",
  keywords: ["System Administration", "SysAdmin roadmap", "Linux", "Windows Server", "Networking", "Virtualization", "Infrastructure", "Cloud", "Automation", "Proxmox", "Docker", "Kubernetes", "Ansible", "Nagios", "Prometheus", "Terraform", "SysAdmin certifications", "IT career paths", "System Administrator interview questions"],
  icons: { icon: "/sysadmin-logo.png", apple: "/sysadmin-logo.png" },
  ...(homeCanonical ? { alternates: { canonical: homeCanonical } } : {}),
  openGraph: {
    type: "website",
    title: { default: "SYSADMIN.", template: "SYSADMIN. | %s" },
    description: "Explore the System Administration journey, technology guides, practical labs, certifications and career preparation.",
    siteName: "SYSADMIN.",
    locale: "en_GB"
  },
  twitter: {
    card: "summary_large_image",
    title: { default: "SYSADMIN.", template: "SYSADMIN. | %s" },
    description: "Explore the System Administration journey, technology guides, practical labs, certifications and career preparation."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b111a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MotionProvider>
            <RoadmapProgressProvider>{children}</RoadmapProgressProvider>
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
