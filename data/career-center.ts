export type CertificationTrack = "Foundations" | "Networking" | "Linux" | "Security" | "Cloud & automation";

export type Certification = {
  id: string;
  name: string;
  provider: string;
  track: CertificationTrack;
  level: "Entry" | "Associate" | "Professional";
  examCode: string;
  versionNote: string;
  bestFor: string;
  summary: string;
  prerequisites: string;
  format: string;
  domains: { title: string; detail: string; weight?: string }[];
  practicalProof: string[];
  officialUrl: string;
  objectivesUrl: string;
  roadmapStages: string[];
};

export const certifications: Certification[] = [
  {
    id: "comptia-a-plus",
    name: "CompTIA A+",
    provider: "CompTIA",
    track: "Foundations",
    level: "Entry",
    examCode: "V15 · 220-1201 + 220-1202",
    versionNote: "A+ requires two exams from the same series. Confirm the live exam series and language availability before buying a voucher or study material.",
    bestFor: "People building their first professional IT support and troubleshooting foundation.",
    summary: "A broad entry-level credential covering endpoint hardware, operating systems, networking basics, security, troubleshooting and operational procedures.",
    prerequisites: "No formal prerequisite. Practical familiarity with PCs, operating systems and basic networking is helpful.",
    format: "Two separate exams: Core 1 and Core 2. Both must be passed to earn the certification.",
    domains: [
      { title: "Hardware and mobile devices", detail: "PC components, peripherals, mobile devices, installation and maintenance." },
      { title: "Networking and connectivity", detail: "Common network concepts, wireless, ports, protocols and endpoint connectivity." },
      { title: "Virtualisation and cloud", detail: "Virtual machines, cloud concepts and client-side deployment considerations." },
      { title: "Operating systems and security", detail: "Windows, Linux and macOS fundamentals, account security and endpoint protection." },
      { title: "Troubleshooting and operations", detail: "Structured diagnosis, software issues, documentation, safety and professional procedures." }
    ],
    practicalProof: ["Build and document a Windows workstation from a clean installation.", "Diagnose common hardware, driver, DNS and connectivity faults.", "Create a repeatable troubleshooting checklist and asset inventory."],
    officialUrl: "https://www.comptia.org/certifications/a",
    objectivesUrl: "https://www.comptia.org/certifications/a",
    roadmapStages: ["it-fundamentals", "networking", "linux-windows-administration"]
  },
  {
    id: "comptia-network-plus",
    name: "CompTIA Network+",
    provider: "CompTIA",
    track: "Networking",
    level: "Associate",
    examCode: "N10-009",
    versionNote: "Use study material explicitly aligned to N10-009. Check CompTIA for any exam lifecycle update before booking.",
    bestFor: "A vendor-neutral networking foundation for support, systems and junior network roles.",
    summary: "Validates practical understanding of network concepts, implementation, operations, security and troubleshooting across wired, wireless, virtual and cloud-connected environments.",
    prerequisites: "No mandatory prerequisite. CompTIA recommends prior IT and networking experience; hands-on subnetting and device configuration practice is strongly advised.",
    format: "One exam with multiple-choice and performance-based questions. The published exam duration is 90 minutes.",
    domains: [
      { title: "Networking concepts", detail: "OSI/TCP-IP, addressing, subnetting, ports, protocols, network devices and cloud connectivity.", weight: "23%" },
      { title: "Network implementation", detail: "Switching, VLANs, routing, wireless, WAN connectivity and network infrastructure deployment.", weight: "20%" },
      { title: "Network operations", detail: "Documentation, monitoring, configuration management, DNS, DHCP, time services and resilience.", weight: "19%" },
      { title: "Network security", detail: "Segmentation, authentication, secure protocols, hardening and common network threats.", weight: "14%" },
      { title: "Network troubleshooting", detail: "Structured fault isolation for cabling, switching, routing, addressing, wireless and performance.", weight: "24%" }
    ],
    practicalProof: ["Build a routed multi-VLAN topology in Packet Tracer or GNS3.", "Configure DHCP, DNS, NAT and access control, then document the design.", "Capture traffic with Wireshark and write a troubleshooting report."],
    officialUrl: "https://www.comptia.org/certifications/network",
    objectivesUrl: "https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-%284-0%29-%281%29.pdf",
    roadmapStages: ["networking", "enterprise-administration", "infrastructure-operations"]
  },
  {
    id: "cisco-ccna",
    name: "Cisco Certified Network Associate (CCNA)",
    provider: "Cisco",
    track: "Networking",
    level: "Associate",
    examCode: "200-301 CCNA",
    versionNote: "Cisco publishes updated exam-topic documents. The current topic document surfaced for this guide is version 2.0; check Cisco's exam page before preparing.",
    bestFor: "Candidates targeting network administration, NOC, network engineering or infrastructure roles involving Cisco environments.",
    summary: "A practical networking credential covering network fundamentals, access, IP connectivity, IP services, security fundamentals and network automation concepts.",
    prerequisites: "No formal prerequisite. Strong IP addressing, subnetting and command-line practice are important.",
    format: "One 120-minute exam. Cisco lists multiple-choice and other exam item formats; consult its current exam details.",
    domains: [
      { title: "Network fundamentals", detail: "Network components, topologies, cabling, IPv4/IPv6, wireless and switching concepts." },
      { title: "Network access", detail: "VLANs, trunks, spanning tree, EtherChannel, wireless architectures and access-layer security." },
      { title: "IP connectivity and services", detail: "Routing tables, static routes, OSPF concepts, NAT, DHCP, DNS, NTP and device management." },
      { title: "Security fundamentals", detail: "Access control, device hardening, AAA, VPN concepts and Layer 2 security features." },
      { title: "Automation and network operations", detail: "APIs, controllers, configuration management, telemetry and automation concepts." }
    ],
    practicalProof: ["Configure VLANs, trunks, inter-VLAN routing and EtherChannel in a simulator.", "Implement static routes and OSPF, then verify path selection.", "Create a network diagram, address plan and device configuration backup."],
    officialUrl: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html",
    objectivesUrl: "https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf",
    roadmapStages: ["networking", "enterprise-administration", "infrastructure-operations", "advanced-engineering"]
  },
  {
    id: "comptia-security-plus",
    name: "CompTIA Security+",
    provider: "CompTIA",
    track: "Security",
    level: "Associate",
    examCode: "Check current exam series",
    versionNote: "Security+ versions and retirement dates change. Open the official page and download the active objectives before choosing a course or scheduling an exam.",
    bestFor: "System and network administrators who want a broad, vendor-neutral security foundation.",
    summary: "Covers security concepts, threats, secure architecture, operational security and governance. It complements administration experience but does not replace hands-on hardening and incident-response practice.",
    prerequisites: "No formal prerequisite. Networking knowledge and experience supporting systems are useful preparation.",
    format: "A single exam with multiple-choice and performance-based question types; confirm current duration and passing requirements with CompTIA.",
    domains: [
      { title: "General security concepts", detail: "Security principles, controls, identity, authentication, access and cryptography." },
      { title: "Threats, vulnerabilities and mitigations", detail: "Threat actors, attack surfaces, vulnerability management and defensive controls." },
      { title: "Security architecture", detail: "Secure network and system design, segmentation, cloud security and resilience." },
      { title: "Security operations", detail: "Monitoring, incident response, vulnerability handling, endpoint and infrastructure security." },
      { title: "Governance, risk and compliance", detail: "Policies, risk management, audits, awareness and regulatory responsibilities." }
    ],
    practicalProof: ["Harden a Linux or Windows server against a documented baseline.", "Centralise logs and create alerts for suspicious authentication events.", "Write an incident runbook for a compromised account or exposed service."],
    officialUrl: "https://www.comptia.org/certifications/security",
    objectivesUrl: "https://www.comptia.org/certifications/security",
    roadmapStages: ["security-automation", "enterprise-administration", "infrastructure-operations"]
  },
  {
    id: "comptia-linux-plus",
    name: "CompTIA Linux+",
    provider: "CompTIA",
    track: "Linux",
    level: "Associate",
    examCode: "XK0-006 · verify active series",
    versionNote: "CompTIA's Linux+ objectives are revised periodically. Confirm that XK0-006 is the active exam and use the latest final objectives, not a draft or superseded PDF.",
    bestFor: "Administrators who want a vendor-neutral Linux credential covering more than basic command-line use.",
    summary: "Focuses on managing Linux server environments, services, users, security, automation, scripting, containers and troubleshooting.",
    prerequisites: "No formal prerequisite. Prior Linux command-line and basic networking experience is recommended.",
    format: "One exam with multiple-choice and performance-based questions. Check the current CompTIA exam page for duration and availability.",
    domains: [
      { title: "System management", detail: "Linux architecture, distributions, boot, storage, package management and system configuration." },
      { title: "Services and user management", detail: "Users, groups, permissions, processes, services, networking and core server services." },
      { title: "Security", detail: "Account hardening, encryption, certificates, access controls, audit and vulnerability handling." },
      { title: "Automation, orchestration and scripting", detail: "Shell scripting, scheduled tasks, configuration management and container workflows." },
      { title: "Troubleshooting", detail: "Diagnosing boot, service, resource, storage, network and application problems." }
    ],
    practicalProof: ["Build a Linux server and manage users, storage, services and firewall rules.", "Automate patch reporting, backups and service checks with shell scripts.", "Troubleshoot a failed boot or full filesystem and document the recovery."],
    officialUrl: "https://www.comptia.org/certifications/linux",
    objectivesUrl: "https://www.comptia.org/certifications/linux",
    roadmapStages: ["linux-windows-administration", "infrastructure-operations", "security-automation"]
  },
  {
    id: "lpic-1",
    name: "Linux Professional Institute LPIC-1",
    provider: "Linux Professional Institute",
    track: "Linux",
    level: "Associate",
    examCode: "101-500 + 102-500 · version 5.0",
    versionNote: "LPIC-1 currently requires both exams. Confirm the latest objective version and regional exam pricing with LPI before booking.",
    bestFor: "Linux administrators who want a distribution-neutral credential with detailed command-line and system maintenance coverage.",
    summary: "Validates the ability to install and maintain Linux systems, work confidently at the command line, manage files and permissions, and configure basic networking and security.",
    prerequisites: "No formal prerequisite. Candidates should be comfortable practising Linux administration on a real or virtual machine.",
    format: "Two 90-minute exams, each with multiple-choice and fill-in-the-blank questions.",
    domains: [
      { title: "System architecture and installation", detail: "Hardware, boot process, runlevels or targets, partitioning and package management." },
      { title: "GNU and Unix commands", detail: "Shell usage, text processing, file management, streams, processes and regular expressions." },
      { title: "Filesystems and permissions", detail: "Partitions, filesystems, mounts, links, ownership, permissions and filesystem hierarchy." },
      { title: "Shells and scripting", detail: "Shell environments, Bash scripts, scheduling, localisation and administrative tasks." },
      { title: "System services, networking and security", detail: "Logging, time, printing, networking fundamentals, SSH and essential security practices." }
    ],
    practicalProof: ["Complete common admin tasks using both Debian-family and RPM-family distributions.", "Configure partitions, mounts, users, groups, SSH and scheduled jobs.", "Create a Bash script that validates input, logs results and handles failures."],
    officialUrl: "https://www.lpi.org/our-certifications/lpic-1-overview/",
    objectivesUrl: "https://www.lpi.org/our-certifications/exam-101-102-objectives/",
    roadmapStages: ["linux-windows-administration", "infrastructure-operations", "security-automation"]
  },
  {
    id: "red-hat-rhcsa",
    name: "Red Hat Certified System Administrator (RHCSA)",
    provider: "Red Hat",
    track: "Linux",
    level: "Professional",
    examCode: "EX200 · Red Hat Enterprise Linux 10",
    versionNote: "The current Red Hat exam page states that EX200 is based on Red Hat Enterprise Linux 10. Always review the live objectives before purchasing training or an exam.",
    bestFor: "People targeting Linux system administration in Red Hat Enterprise Linux environments and organisations using RHEL.",
    summary: "A hands-on, performance-based credential that tests whether a candidate can complete real Linux administration tasks without step-by-step assistance.",
    prerequisites: "Red Hat recommends RH124 and RH134 training or comparable real administration experience. There is no substitute for repeated hands-on practice.",
    format: "Performance-based practical exam in a live Red Hat Enterprise Linux environment.",
    domains: [
      { title: "Essential tools and command line", detail: "Shell, files, text processing, SSH, permissions, documentation and archives." },
      { title: "Software and scripting", detail: "Package repositories, software installation and simple shell scripts." },
      { title: "System operation and services", detail: "Boot targets, processes, logs, service management, time and scheduled jobs." },
      { title: "Storage and filesystems", detail: "Partitions, LVM, filesystems, mounts, swap, NFS and autofs." },
      { title: "System configuration and maintenance", detail: "Networking, firewall basics, security contexts and persistent configuration." }
    ],
    practicalProof: ["Perform timed administration tasks on a clean RHEL-compatible lab VM.", "Recover a service, repair permissions and extend a logical volume without a walkthrough.", "Rebuild the VM from a written checklist and verify that configuration persists after reboot."],
    officialUrl: "https://www.redhat.com/en/services/certification/rhcsa",
    objectivesUrl: "https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam",
    roadmapStages: ["linux-windows-administration", "infrastructure-operations", "advanced-engineering"]
  },
  {
    id: "azure-administrator",
    name: "Microsoft Certified: Azure Administrator Associate",
    provider: "Microsoft",
    track: "Cloud & automation",
    level: "Associate",
    examCode: "AZ-104",
    versionNote: "Microsoft updates skills measured over time. The study guide linked here reflects the current published objective set; re-check it close to your exam date.",
    bestFor: "Windows and infrastructure administrators moving into Azure operations and hybrid cloud administration.",
    summary: "Validates the ability to implement, manage, secure and monitor Azure identities, governance, compute, storage, networking and operational services.",
    prerequisites: "Microsoft recommends familiarity with operating systems, networking, servers and virtualisation, plus hands-on use of PowerShell, Azure CLI and Microsoft Entra ID.",
    format: "One role-based associate exam. Microsoft role-based certifications require renewal every 12 months through a free online assessment.",
    domains: [
      { title: "Identity and governance", detail: "Microsoft Entra ID, role-based access control, subscriptions, policy and governance." },
      { title: "Storage", detail: "Storage accounts, Blob Storage, Azure Files, access controls and data protection." },
      { title: "Compute", detail: "Virtual machines, availability, scale, containers and deployment options." },
      { title: "Virtual networking", detail: "VNets, subnets, peering, routing, network security groups and connectivity." },
      { title: "Monitoring and maintenance", detail: "Azure Monitor, alerts, backup, recovery and operational health." }
    ],
    practicalProof: ["Deploy a small VNet with subnets, a VM and least-privilege access.", "Configure backup, monitoring alerts and a recovery test.", "Use Azure CLI or PowerShell to inventory resources and report configuration."],
    officialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    objectivesUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104",
    roadmapStages: ["cloud-hybrid", "security-automation", "advanced-engineering"]
  },
  {
    id: "aws-cloudops",
    name: "AWS Certified CloudOps Engineer – Associate",
    provider: "Amazon Web Services",
    track: "Cloud & automation",
    level: "Associate",
    examCode: "SOA-C03",
    versionNote: "This credential replaced the AWS Certified SysOps Administrator – Associate name for the current exam. Existing holders keep the credential name they earned; check the current AWS page for language and exam updates.",
    bestFor: "Administrators who want to operate, monitor and maintain production workloads on AWS.",
    summary: "Validates practical AWS operations skills across workload deployment, monitoring, security, networking, business continuity, cost and performance optimisation.",
    prerequisites: "AWS describes roughly one year of experience deploying, managing and operating workloads on AWS as the intended candidate profile.",
    format: "One 130-minute associate exam with 65 multiple-choice or multiple-response questions.",
    domains: [
      { title: "Monitoring, logging and remediation", detail: "CloudWatch, CloudTrail, event-driven response, operational visibility and troubleshooting." },
      { title: "Reliability and business continuity", detail: "Backup, restore, high availability, disaster recovery and resilience testing." },
      { title: "Deployment and provisioning", detail: "Compute, storage, configuration, automation and infrastructure deployment." },
      { title: "Security and compliance", detail: "IAM, network controls, encryption, audit evidence and secure operations." },
      { title: "Networking, cost and performance", detail: "VPC connectivity, load balancing, scaling, cost monitoring and optimisation." }
    ],
    practicalProof: ["Deploy a small workload in a VPC with private and public subnets.", "Create monitoring alarms, logs and an incident response runbook.", "Test backup restoration and calculate a basic monthly cost estimate."],
    officialUrl: "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/",
    objectivesUrl: "https://docs.aws.amazon.com/aws-certification/latest/examguides/",
    roadmapStages: ["cloud-hybrid", "infrastructure-operations", "advanced-engineering"]
  },
  {
    id: "terraform-associate",
    name: "HashiCorp Certified: Terraform Associate",
    provider: "HashiCorp",
    track: "Cloud & automation",
    level: "Associate",
    examCode: "Terraform Associate (004) · Terraform 1.12",
    versionNote: "The current HashiCorp page lists version 004 and Terraform 1.12. Check the exam page for any newer version before beginning a long study plan.",
    bestFor: "SysAdmins and cloud engineers who want to manage repeatable infrastructure using Infrastructure as Code.",
    summary: "Validates foundational Terraform knowledge: providers, configuration, state, variables, outputs and the plan/apply workflow.",
    prerequisites: "Basic terminal skills and an understanding of on-premises or cloud infrastructure. Professional experience is recommended but not mandatory.",
    format: "One-hour, online-proctored multiple-choice exam. The credential expires after two years.",
    domains: [
      { title: "Infrastructure as Code", detail: "IaC concepts, benefits, declarative configuration and multi-cloud workflows." },
      { title: "Terraform fundamentals", detail: "Providers, resources, data sources, variables, outputs and state." },
      { title: "Core workflow", detail: "Initialise, validate, plan, apply, review changes and destroy managed resources safely." },
      { title: "Configuration and collaboration", detail: "Modules, version constraints, state handling, formatting and workflow practices." }
    ],
    practicalProof: ["Write Terraform to provision a small, disposable lab environment.", "Store configuration in Git and use variables and outputs safely.", "Demonstrate plan review, state handling and a controlled destroy workflow."],
    officialUrl: "https://developer.hashicorp.com/certifications/terraform-associate",
    objectivesUrl: "https://developer.hashicorp.com/certifications/terraform-associate",
    roadmapStages: ["security-automation", "cloud-hybrid", "advanced-engineering"]
  }
];

export type CareerPath = {
  id: string;
  title: string;
  summary: string;
  progression: { role: string; focus: string }[];
  skills: string[];
  portfolio: string[];
  certifications: string[];
};

export const careerPaths: CareerPath[] = [
  {
    id: "systems-administration",
    title: "Systems Administration",
    summary: "Operate the servers, identity, storage, backups and core services that keep an organisation's IT environment dependable.",
    progression: [
      { role: "IT Support / Junior Administrator", focus: "Endpoint support, user accounts, basic networking, ticket handling and documentation." },
      { role: "System Administrator", focus: "Server operations, patching, access, backups, monitoring and service availability." },
      { role: "Senior Systems Administrator", focus: "Complex incidents, standards, capacity, resilience and operational improvements." },
      { role: "Infrastructure Engineer / Architect", focus: "Design, automation, platform strategy, security and high availability." }
    ],
    skills: ["Linux and Windows Server", "DNS, DHCP and Active Directory", "Virtualisation and storage", "Backup and disaster recovery", "Monitoring and scripting", "Change and incident management"],
    portfolio: ["Document a small domain or Linux server environment.", "Demonstrate backup restoration and a tested recovery procedure.", "Build a monitoring dashboard and an operational runbook."],
    certifications: ["comptia-a-plus", "comptia-network-plus", "red-hat-rhcsa", "azure-administrator"]
  },
  {
    id: "linux-platform",
    title: "Linux & Platform Engineering",
    summary: "Specialise in Linux fleets, virtualisation, containers, configuration management and the platforms that host applications.",
    progression: [
      { role: "Junior Linux Administrator", focus: "Shell, users, permissions, packages, services and basic troubleshooting." },
      { role: "Linux Systems Administrator", focus: "Storage, networking, security hardening, automation and production operations." },
      { role: "Platform Engineer", focus: "Containers, orchestration, infrastructure as code and developer platforms." },
      { role: "Senior Platform Engineer", focus: "Platform reliability, standards, architecture and engineering enablement." }
    ],
    skills: ["Linux internals and systemd", "Bash or Python scripting", "SSH, firewall and network services", "Proxmox, KVM or another hypervisor", "Docker and Kubernetes fundamentals", "Ansible and Terraform"],
    portfolio: ["Create a reproducible Linux server build with hardening notes.", "Automate user, package and service configuration with Ansible.", "Deploy a containerised service with monitoring and backup."],
    certifications: ["comptia-linux-plus", "lpic-1", "red-hat-rhcsa", "terraform-associate"]
  },
  {
    id: "windows-identity",
    title: "Windows Server & Identity",
    summary: "Manage Windows Server environments, directory services, endpoint policies and identity across on-premises and cloud systems.",
    progression: [
      { role: "IT Support Technician", focus: "Windows endpoints, account support, Microsoft 365 basics and ticket workflows." },
      { role: "Windows Server Administrator", focus: "AD DS, DNS, DHCP, Group Policy, file services and patching." },
      { role: "Identity / Infrastructure Administrator", focus: "Privileged access, Entra ID, hybrid identity and endpoint management." },
      { role: "Infrastructure Engineer", focus: "Identity architecture, automation, hybrid services and security controls." }
    ],
    skills: ["Windows Server and PowerShell", "Active Directory and Group Policy", "DNS, DHCP and certificates", "Microsoft Entra ID and RBAC", "Windows event logs and monitoring", "Backup, recovery and patching"],
    portfolio: ["Build an isolated AD DS lab with a domain controller and client.", "Create least-privilege groups and test Group Policy application.", "Write a PowerShell inventory and service-health report."],
    certifications: ["comptia-a-plus", "comptia-network-plus", "comptia-security-plus", "azure-administrator"]
  },
  {
    id: "network-operations",
    title: "Network Administration & Engineering",
    summary: "Design, configure and troubleshoot the connectivity, switching, routing and security services that link users, sites and systems.",
    progression: [
      { role: "NOC / IT Support Technician", focus: "Connectivity checks, monitoring, incident triage and network documentation." },
      { role: "Network Administrator", focus: "Switches, VLANs, routing, wireless, firewalls and network services." },
      { role: "Network Engineer", focus: "Routing design, resilient connectivity, security and automation." },
      { role: "Network Architect", focus: "Enterprise design, segmentation, capacity, standards and strategic planning." }
    ],
    skills: ["IPv4/IPv6 and subnetting", "Switching, VLANs and trunks", "Routing and VPNs", "DNS, DHCP, NAT and firewalls", "Packet analysis and monitoring", "Network automation and documentation"],
    portfolio: ["Build a multi-VLAN campus topology with inter-VLAN routing.", "Connect two sites with routing and a documented addressing plan.", "Capture and explain a packet flow during a simulated fault."],
    certifications: ["comptia-network-plus", "cisco-ccna", "comptia-security-plus"]
  },
  {
    id: "cloud-operations",
    title: "Cloud & Hybrid Operations",
    summary: "Operate workloads across cloud and on-premises infrastructure, with responsibility for identity, networking, reliability and cost.",
    progression: [
      { role: "Cloud Support Associate", focus: "Cloud fundamentals, access, basic compute, storage and service troubleshooting." },
      { role: "Cloud Administrator / CloudOps Engineer", focus: "Provisioning, monitoring, IAM, networking, backup and operations." },
      { role: "Cloud Infrastructure Engineer", focus: "Automation, platform reliability, governance and hybrid connectivity." },
      { role: "Cloud Architect", focus: "Multi-account design, resilience, security, cost and platform strategy." }
    ],
    skills: ["One major cloud platform in depth", "Identity and access management", "Virtual networks and connectivity", "Compute, storage and backup", "Monitoring and cost control", "Terraform, CLI and scripting"],
    portfolio: ["Deploy a small cloud network with private and public components.", "Configure logs, alerts, backup and a restore test.", "Provision the environment with version-controlled Terraform."],
    certifications: ["azure-administrator", "aws-cloudops", "terraform-associate", "comptia-network-plus"]
  },
  {
    id: "automation-devops",
    title: "Infrastructure Automation & DevOps",
    summary: "Reduce manual work and configuration drift by treating infrastructure, deployment and operations as repeatable engineering workflows.",
    progression: [
      { role: "Systems Administrator", focus: "Understand services, operating systems, networking and operational pain points." },
      { role: "Automation Engineer", focus: "Scripting, configuration management, source control and repeatable provisioning." },
      { role: "DevOps / Platform Engineer", focus: "CI/CD, containers, observability, cloud and developer enablement." },
      { role: "Senior Platform / SRE Engineer", focus: "Reliability engineering, service objectives, architecture and automation strategy." }
    ],
    skills: ["Bash, PowerShell or Python", "Git and code review", "Ansible and Terraform", "Docker and Kubernetes", "CI/CD fundamentals", "Monitoring, logs and incident response"],
    portfolio: ["Create an Ansible playbook that configures a clean server.", "Use Terraform to provision a repeatable test environment.", "Build a small CI pipeline that validates configuration and scripts."],
    certifications: ["red-hat-rhcsa", "terraform-associate", "aws-cloudops", "azure-administrator"]
  }
];

export type InterviewQuestion = {
  id: string;
  category: "Linux" | "Windows & identity" | "Networking" | "Virtualisation & storage" | "Security" | "Troubleshooting" | "Behavioural";
  level: "Entry" | "Intermediate" | "Advanced";
  question: string;
  why: string;
  answerFramework: string[];
  followUp: string;
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "linux-service-failed",
    category: "Linux",
    level: "Intermediate",
    question: "A Linux service fails to start after a reboot. How would you investigate it?",
    why: "Tests whether you can troubleshoot systematically instead of restarting services blindly.",
    answerFramework: ["Confirm the exact service name and current state with systemctl.", "Read the service journal and relevant logs with journalctl; identify the first meaningful error.", "Check unit configuration, dependencies, permissions, ports, disk space and required files.", "Make one controlled change, restart the service and verify both status and application behaviour.", "Record the root cause and any prevention step."],
    followUp: "What would you check if the service works manually but fails when systemd starts it?"
  },
  {
    id: "linux-disk-full",
    category: "Linux",
    level: "Entry",
    question: "A Linux server reports that the root filesystem is 100% full. What do you do?",
    why: "Checks safe disk investigation, impact awareness and prioritisation.",
    answerFramework: ["Confirm the affected filesystem with df -h and check inode usage with df -i.", "Locate large directories with du, inspect logs, caches, temporary files and deleted-but-open files.", "Do not delete unknown application or database files to create space quickly.", "Follow the service's log rotation or cleanup procedure, or extend storage if that is the correct fix.", "Recheck capacity and confirm affected services are healthy."],
    followUp: "How would you find a deleted file that is still consuming disk space?"
  },
  {
    id: "linux-permissions",
    category: "Linux",
    level: "Entry",
    question: "A user can see a directory but cannot open a file inside it. How do Linux permissions explain this?",
    why: "Tests understanding of ownership, group membership, directory traversal and access control.",
    answerFramework: ["Explain read, write and execute permissions for files and directories.", "Check ownership and mode with ls -l and inspect each parent directory in the path.", "Check group membership, ACLs with getfacl and any relevant SELinux denial.", "Apply the smallest permission change that grants the required access; avoid chmod 777."],
    followUp: "What is the difference between file execute permission and directory execute permission?"
  },
  {
    id: "windows-domain-login",
    category: "Windows & identity",
    level: "Intermediate",
    question: "A domain user cannot sign in to a Windows workstation, but other users can. What would you check?",
    why: "Assesses identity troubleshooting and the ability to separate account, device and domain issues.",
    answerFramework: ["Capture the exact error and determine whether the issue follows the user or the workstation.", "Check account status, lockout, password expiry, logon restrictions and group membership.", "Verify workstation DNS, domain connectivity, time synchronisation and secure channel health.", "Review relevant client and domain controller event logs.", "Test with a controlled account or another workstation, then document the cause."],
    followUp: "Why is correct DNS configuration essential for Active Directory?"
  },
  {
    id: "gpo-not-applied",
    category: "Windows & identity",
    level: "Intermediate",
    question: "A Group Policy setting is not applying to a workstation. How do you troubleshoot it?",
    why: "Tests practical knowledge of AD structure, policy scope and client-side diagnostics.",
    answerFramework: ["Confirm the computer or user is in the expected OU and the GPO is linked and enabled.", "Check security filtering, WMI filtering, inheritance and link order.", "Run gpresult /r or gpresult /h and inspect Group Policy operational logs.", "Verify DNS and domain controller connectivity, then refresh policy and retest.", "Change only the relevant scope or permission and confirm the result."],
    followUp: "How would you distinguish a user policy issue from a computer policy issue?"
  },
  {
    id: "windows-powershell",
    category: "Windows & identity",
    level: "Entry",
    question: "How would you use PowerShell to find stopped services on several Windows servers?",
    why: "Looks for repeatable administration, remoting awareness and safe scripting habits.",
    answerFramework: ["Use Get-Service locally or Invoke-Command for approved remote sessions.", "Filter objects by Status rather than parsing formatted console text.", "Return the computer name, service name and status in structured output.", "Handle unreachable hosts and permission errors, and export a report if required.", "Keep the script read-only unless an approved remediation is requested."],
    followUp: "Why is the PowerShell object pipeline useful for administration?"
  },
  {
    id: "network-no-internet",
    category: "Networking",
    level: "Entry",
    question: "A workstation has no internet access. Explain your troubleshooting sequence.",
    why: "Evaluates layered troubleshooting and whether you can isolate local, network, DNS and upstream faults.",
    answerFramework: ["Check link or Wi-Fi state, IP address, subnet mask, gateway and DHCP lease.", "Test loopback, local gateway, a known external IP and then a DNS name.", "Use ipconfig /all, ping, tracert or traceroute, nslookup and route information as appropriate.", "Check VLAN, switch port, wireless, firewall, proxy and upstream gateway if local tests pass.", "Record the failing boundary and verify service after the fix."],
    followUp: "If pinging 1.1.1.1 works but a website name does not, what is the likely fault domain?"
  },
  {
    id: "vlan-vs-subnet",
    category: "Networking",
    level: "Entry",
    question: "What is the difference between a VLAN and an IP subnet?",
    why: "Checks whether you understand Layer 2 segmentation and Layer 3 addressing.",
    answerFramework: ["A VLAN creates a separate Layer 2 broadcast domain on switched infrastructure.", "An IP subnet is a Layer 3 logical address range.", "They are commonly mapped one-to-one in enterprise designs, but they are not the same thing.", "Communication between VLANs/subnets normally requires routing and appropriate policy."],
    followUp: "What is a trunk port, and why would a switch need one?"
  },
  {
    id: "dhcp-process",
    category: "Networking",
    level: "Intermediate",
    question: "Walk through how a DHCP client obtains an IPv4 address.",
    why: "Tests protocol knowledge that is frequently used in real support and network operations.",
    answerFramework: ["Describe Discover, Offer, Request and Acknowledge (DORA).", "Explain the role of broadcast traffic before the client has an address.", "Mention leases, scope options, exclusions and reservations.", "Explain when a DHCP relay is needed across routed networks."],
    followUp: "What would you investigate if clients receive an APIPA address?"
  },
  {
    id: "vm-host-failure",
    category: "Virtualisation & storage",
    level: "Intermediate",
    question: "A hypervisor host fails and several virtual machines become unavailable. What is your response?",
    why: "Assesses service impact, recovery priorities and understanding of virtual infrastructure dependencies.",
    answerFramework: ["Establish scope, business impact, affected services and recovery priorities.", "Check host power, storage, networking, cluster state and management-plane health.", "Use the documented HA or recovery process; do not attach or mount shared storage carelessly.", "Restore critical services from a healthy host or validated backup according to the recovery plan.", "Verify application consistency, dependencies and data integrity before declaring recovery."],
    followUp: "What is the difference between high availability and a backup?"
  },
  {
    id: "backup-restore",
    category: "Virtualisation & storage",
    level: "Intermediate",
    question: "How do you prove that a backup strategy actually works?",
    why: "Separates real recoverability from simply having successful backup job notifications.",
    answerFramework: ["Define recovery point objective (RPO) and recovery time objective (RTO).", "Check backup coverage, retention, encryption, access controls and off-site or immutable copies.", "Perform scheduled test restores in an isolated environment.", "Validate application consistency, permissions, databases and dependencies.", "Record restore time, issues, evidence and improvements."],
    followUp: "When would you choose file-level restore rather than a full VM restore?"
  },
  {
    id: "raid-backup",
    category: "Virtualisation & storage",
    level: "Entry",
    question: "Does RAID replace backups? Explain your answer.",
    why: "Checks whether the candidate understands availability versus recoverability.",
    answerFramework: ["RAID can maintain availability through some disk failures, depending on the RAID level.", "It does not protect against accidental deletion, ransomware, corruption, theft or site loss.", "Backups should be separate, protected and regularly restore-tested.", "Choose RAID and backup design based on workload, capacity and recovery requirements."],
    followUp: "What risks does RAID 5 have during a rebuild with large disks?"
  },
  {
    id: "least-privilege",
    category: "Security",
    level: "Entry",
    question: "What does least privilege mean in day-to-day system administration?",
    why: "Tests whether security is treated as an operational design principle.",
    answerFramework: ["Grant only the access needed for a defined task and time period.", "Use separate standard and privileged accounts, role-based groups and MFA.", "Avoid shared administrator accounts and review permissions regularly.", "Log privileged actions and remove access promptly when roles change."],
    followUp: "How would you provide temporary elevated access for an urgent maintenance task?"
  },
  {
    id: "server-compromise",
    category: "Security",
    level: "Advanced",
    question: "You suspect a production server has been compromised. What are your first actions?",
    why: "Looks for calm incident handling, evidence preservation and controlled containment.",
    answerFramework: ["Follow the organisation's incident response process and notify the appropriate responders.", "Preserve relevant logs and evidence; avoid destructive cleanup or unnecessary rebooting.", "Contain the system in coordination with security and service owners, balancing evidence and business impact.", "Identify scope, initial access, affected credentials, persistence and lateral movement.", "Recover from a trusted baseline, rotate exposed secrets and monitor for recurrence."],
    followUp: "When might isolating a server immediately destroy useful evidence or disrupt critical services?"
  },
  {
    id: "patching-risk",
    category: "Security",
    level: "Intermediate",
    question: "How would you plan patching for a critical server that cannot be taken offline unexpectedly?",
    why: "Assesses risk-based maintenance, change control and rollback planning.",
    answerFramework: ["Identify the vulnerability, exposure, business impact and vendor guidance.", "Test the patch in a representative non-production environment.", "Agree a maintenance window, dependencies, stakeholder communication and rollback or recovery plan.", "Back up or snapshot where appropriate, apply the change and monitor service health.", "Verify the patch level and document any exceptions or follow-up actions."],
    followUp: "How would you prioritise a critical internet-facing vulnerability over a routine update?"
  },
  {
    id: "troubleshooting-method",
    category: "Troubleshooting",
    level: "Entry",
    question: "Describe your general approach to troubleshooting an unfamiliar technical issue.",
    why: "A core interview question that reveals how you think, communicate and manage risk.",
    answerFramework: ["Clarify symptoms, scope, timing, recent changes and business impact.", "Gather evidence and establish a baseline before changing anything.", "Form a small number of testable hypotheses and isolate the fault domain.", "Make one controlled change at a time, with a rollback path.", "Verify the outcome, communicate status and document root cause and prevention."],
    followUp: "What would you do if your first hypothesis is wrong?"
  },
  {
    id: "dns-vs-connectivity",
    category: "Troubleshooting",
    level: "Intermediate",
    question: "A server is reachable by IP address but not by hostname. What does that suggest?",
    why: "Checks whether the candidate can use symptoms to narrow the fault domain.",
    answerFramework: ["Suspect name resolution before assuming the server or route is down.", "Check resolver configuration, DNS server reachability and the record being queried.", "Use nslookup, dig or Resolve-DnsName and compare results from another client.", "Check search suffixes, stale records, split DNS and firewall rules for DNS traffic.", "Verify the correct record and TTL after any fix."],
    followUp: "What is the difference between an A record and a CNAME record?"
  },
  {
    id: "incident-story",
    category: "Behavioural",
    level: "Entry",
    question: "Tell me about a technical problem you solved. How should you structure your answer?",
    why: "Employers want evidence of ownership, communication, learning and practical judgement—not just a list of tools.",
    answerFramework: ["Situation: briefly describe the environment and impact without exposing sensitive information.", "Task: explain what you were responsible for and what success looked like.", "Action: describe the evidence gathered, steps taken, decisions and communication.", "Result: state what improved and how you verified it.", "Learning: explain what you documented or changed to prevent recurrence."],
    followUp: "What would you do differently if the same incident happened again?"
  },
  {
    id: "production-change",
    category: "Behavioural",
    level: "Intermediate",
    question: "A manager asks you to make an urgent production change but there is no approved change record. What do you do?",
    why: "Tests professional judgement, communication and understanding of operational controls.",
    answerFramework: ["Clarify urgency, impact, risk and whether an emergency change process exists.", "Explain the risks of an undocumented change and request the required approval or incident authority.", "Prepare a minimal implementation, validation and rollback plan.", "Communicate with affected stakeholders and record the action as soon as policy permits.", "Verify the service and complete a post-change review."],
    followUp: "How would your response differ if the change is needed to contain an active security incident?"
  }
];

export const portfolioProjects = [
  {
    title: "Documented server environment",
    focus: "Linux or Windows Server administration",
    evidence: ["Architecture and network diagram", "User, group and permission model", "Service configuration and patch record", "Operational runbook and screenshots"]
  },
  {
    title: "Segmented multi-site network",
    focus: "Switching, routing and network services",
    evidence: ["IP addressing and VLAN plan", "Router and switch configuration excerpts", "DHCP/DNS and connectivity test results", "Troubleshooting report for an introduced fault"]
  },
  {
    title: "Virtualisation, backup and recovery lab",
    focus: "Proxmox, virtual machines and storage",
    evidence: ["VM and storage layout", "Backup schedule and retention plan", "Successful restore-test log", "Recovery objectives and lessons learned"]
  },
  {
    title: "Monitoring and automation stack",
    focus: "Nagios or Prometheus, scripting and configuration management",
    evidence: ["Monitoring dashboard and alert rules", "Ansible or PowerShell automation", "Incident response notes", "Git repository with README and safe sample configuration"]
  }
];
