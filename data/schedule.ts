export type StudyWeek = {
  id: string;
  title: string;
  focus: string;
  hours: number;
  tasks: string[];
  deliverable: string;
  resourceIds: string[];
};

export type StudyMonth = {
  number: number;
  title: string;
  stageSlug: string;
  stageLabel: string;
  summary: string;
  milestone: string;
  weeks: StudyWeek[];
};

const week = (month: number, number: number, title: string, focus: string, tasks: string[], deliverable: string, resourceIds: string[], hours = 7): StudyWeek => ({
  id: `m${String(month).padStart(2, "0")}-w${String(number).padStart(2, "0")}`,
  title,
  focus,
  hours,
  tasks,
  deliverable,
  resourceIds
});

export const studySchedule: StudyMonth[] = [
  {
    number: 1, title: "IT & Computer Foundations", stageSlug: "it-fundamentals", stageLabel: "Stage 00 · IT Fundamentals",
    summary: "Understand computer hardware, operating-system fundamentals, command-line basics and a repeatable troubleshooting method.",
    milestone: "Build and document a small Windows/Linux workstation lab.",
    weeks: [
      week(1, 1, "Computer hardware & architecture", "Learn how workstations and servers are assembled and how their components affect performance.", ["Identify CPU cores, threads, cache, RAM, storage and network interfaces on your computer.", "Compare HDD, SATA SSD and NVMe storage using capacity, throughput, IOPS and latency.", "Study motherboard, firmware, BIOS/UEFI, TPM and virtualisation support."], "Create a hardware inventory with specifications and a short explanation of each component.", ["linux-journey", "microsoft-learn"]),
      week(1, 2, "Operating-system fundamentals", "Understand processes, memory, filesystems, users, permissions and system startup.", ["Compare kernel space and user space, processes and threads.", "Explore NTFS and ext4, mount points, ownership and permissions.", "Trace the boot sequence from firmware through bootloader to operating system."], "Draw a boot-process diagram and write a one-page OS fundamentals note.", ["linux-man-pages", "microsoft-server"]),
      week(1, 3, "Command line & virtual machines", "Become comfortable navigating Windows and Linux and create safe practice environments.", ["Practise navigation, file operations, process inspection and help commands in PowerShell and Bash.", "Install a Linux virtual machine and inspect CPU, memory, disk and network resources.", "Take a VM snapshot and practise a safe restore."], "Create a command reference sheet and a working Linux VM.", ["linux-journey", "powershell-basics"]),
      week(1, 4, "Troubleshooting foundations", "Use evidence and a repeatable method instead of making random configuration changes.", ["Practise identifying symptoms, scope, impact and likely causes.", "Inspect Windows Event Viewer and Linux journal logs for errors.", "Diagnose a deliberately full disk or high-resource process in a disposable VM."], "Write three troubleshooting records with symptoms, evidence, resolution and prevention.", ["microsoft-learn", "debian-docs"])
    ]
  },
  {
    number: 2, title: "Networking Fundamentals", stageSlug: "networking", stageLabel: "Stage 01 · Networking",
    summary: "Build a strong understanding of network models, Ethernet, addressing, subnetting, switching and routing.",
    milestone: "Design and simulate a small routed LAN with documented IP addressing.",
    weeks: [
      week(2, 1, "Network concepts & TCP/IP", "Learn how devices communicate across local and routed networks.", ["Study OSI and TCP/IP models and map common protocols to their layers.", "Understand Ethernet frames, MAC addresses, ARP, switches and broadcast domains.", "Use ping, tracert/traceroute and ipconfig/ip to inspect connectivity."], "Create a network-layer reference sheet and explain a packet's journey across a LAN.", ["cisco-netacad", "wireshark"]),
      week(2, 2, "IPv4 addressing & subnetting", "Understand address classes historically, CIDR, network ranges and subnet design.", ["Convert between binary and decimal and identify network and host portions.", "Calculate subnet masks, network IDs, broadcast addresses and usable host ranges.", "Design separate subnets for users, servers and management devices."], "Produce an IPv4 subnetting worksheet for a small organisation.", ["cisco-netacad", "packet-tracer"]),
      week(2, 3, "Switching & VLANs", "Learn how managed switches segment networks and carry traffic between VLANs.", ["Configure access ports and assign devices to VLANs in a simulator.", "Configure and verify an 802.1Q trunk between switches.", "Explain native VLANs, spanning tree and why loops are dangerous."], "Build a two-switch VLAN lab and save the configuration evidence.", ["packet-tracer", "gns3"]),
      week(2, 4, "Routing fundamentals", "Connect separate IP networks and understand static and dynamic routing concepts.", ["Configure router interfaces and default gateways in a network simulator.", "Add static routes and verify end-to-end reachability.", "Compare static routing with RIP, OSPF and BGP at a conceptual level."], "Build a small three-network topology and document its routing table.", ["packet-tracer", "gns3"])
    ]
  },
  {
    number: 3, title: "Network Services & Security", stageSlug: "networking", stageLabel: "Stage 01 · Networking",
    summary: "Administer core network services and understand traffic inspection, segmentation and secure remote connectivity.",
    milestone: "Deliver a segmented network with working DNS, DHCP and firewall rules.",
    weeks: [
      week(3, 1, "DNS & name resolution", "Understand how names are translated into addresses and how DNS supports enterprise services.", ["Study records including A, AAAA, CNAME, MX, PTR, NS and TXT.", "Use nslookup and dig to inspect queries, responses and common failures.", "Configure a small DNS zone in a lab or use a controlled test environment."], "Document a DNS resolution flow and a basic troubleshooting checklist.", ["microsoft-server", "debian-docs"]),
      week(3, 2, "DHCP & network services", "Learn address allocation, leases, scopes, reservations and default gateway options.", ["Configure a DHCP scope with exclusions, reservations and lease settings.", "Inspect DHCP leases and troubleshoot a client that receives no address.", "Explain how DHCP options provide DNS and default gateway information."], "Create a DHCP scope plan for user, server and guest networks.", ["microsoft-server", "ubuntu-server"]),
      week(3, 3, "Firewalls, NAT & VPNs", "Understand perimeter controls, traffic policies, address translation and secure remote access.", ["Write least-privilege firewall rules for required services.", "Explain source NAT, destination NAT, port forwarding and stateful inspection.", "Study VPN concepts and compare site-to-site with remote-access VPNs."], "Build a firewall policy matrix for a small segmented network.", ["opnsense", "nist-csf"]),
      week(3, 4, "Packet analysis & network troubleshooting", "Use packet captures and layered checks to diagnose connectivity and service problems.", ["Capture traffic in Wireshark and identify DNS, DHCP, ARP and TCP handshakes.", "Troubleshoot a broken DNS lookup and a blocked service port.", "Review network diagrams, IP plans and device configurations for consistency."], "Submit a network lab report with topology, addressing plan, captures and troubleshooting notes.", ["wireshark", "gns3", "packet-tracer"])
    ]
  },
  {
    number: 4, title: "Linux Administration I", stageSlug: "linux-windows-administration", stageLabel: "Stage 02 · Linux & Windows Administration",
    summary: "Install and administer a Linux server, work confidently in the shell, manage users and configure storage.",
    milestone: "Deploy a Linux server with secure accounts, storage and remote administration.",
    weeks: [
      week(4, 1, "Linux installation & filesystem", "Understand Linux distributions, package systems, directory layout and storage mounting.", ["Install Debian or Ubuntu Server in a VM.", "Explore /etc, /var, /home, /tmp, /usr and /opt and learn their purposes.", "Inspect disks, partitions, filesystems and mount points."], "Document the Linux server build, disk layout and filesystem hierarchy.", ["debian-docs", "ubuntu-server", "debian-handbook"]),
      week(4, 2, "Shell, commands & package management", "Use the shell to inspect and manage the system efficiently.", ["Practise pipes, redirection, grep, find, sort, cut, awk and command history.", "Install, update, remove and query packages using apt or the distribution's package manager.", "Read manual pages and discover command options with --help."], "Create a reusable Linux administration command notebook.", ["linux-journey", "linux-man-pages"]),
      week(4, 3, "Users, groups & permissions", "Control access to files and administrative functions using least privilege.", ["Create users and groups and manage account properties.", "Practise chmod, chown, umask and sudo safely.", "Explain standard permissions, special bits and basic ACL concepts."], "Create a user and group access matrix and implement it on your lab server.", ["debian-handbook", "linux-man-pages"]),
      week(4, 4, "Storage administration", "Manage disks and filesystems and understand capacity and mount persistence.", ["Create a virtual disk and partition it using safe lab procedures.", "Format and mount a filesystem and configure persistent mounts.", "Inspect disk usage and inode usage and diagnose a full filesystem."], "Attach and mount a second virtual disk and document the procedure.", ["ubuntu-server", "rhel-docs"])
    ]
  },
  {
    number: 5, title: "Linux Administration II", stageSlug: "linux-windows-administration", stageLabel: "Stage 02 · Linux & Windows Administration",
    summary: "Operate services, networking, logs, secure remote access, scheduled jobs and basic shell automation.",
    milestone: "Run a secured Linux service and automate a routine maintenance task.",
    weeks: [
      week(5, 1, "Processes, services & systemd", "Manage running workloads and service lifecycles.", ["Inspect processes, resource usage, signals and process priorities.", "Use systemctl to start, stop, enable, disable and inspect services.", "Review service dependencies and diagnose a failed unit."], "Deploy a service in your VM and document its lifecycle and logs.", ["linux-man-pages", "debian-docs"]),
      week(5, 2, "Linux networking & SSH", "Configure server networking and secure administrative access.", ["Inspect interfaces, routes, DNS settings and listening ports.", "Configure SSH keys and disable unnecessary remote access paths in the lab.", "Use ss, ip, ping, curl and journalctl to troubleshoot connectivity."], "Configure key-based SSH access and write a remote administration checklist.", ["ubuntu-server", "debian-handbook"]),
      week(5, 3, "Logs, scheduled jobs & backups", "Collect diagnostic evidence and protect important system data.", ["Use journalctl, log files and log rotation to investigate system activity.", "Create a cron job or systemd timer for a safe maintenance task.", "Create a backup and perform a test restore to a separate location."], "Create a scheduled backup with a documented restore test.", ["debian-docs", "rhel-docs"]),
      week(5, 4, "Bash scripting & Linux project", "Combine shell skills into a small administrative automation task.", ["Write a script that checks disk space, memory and service status.", "Add input validation, exit codes, logging and safe error handling.", "Run the script manually and on a schedule and review its output."], "Publish a documented Linux server administration mini-project.", ["linux-man-pages", "github-skills"])
    ]
  },
  {
    number: 6, title: "Windows Server Administration", stageSlug: "linux-windows-administration", stageLabel: "Stage 02 · Linux & Windows Administration",
    summary: "Deploy Windows Server, configure core roles and administer systems using Server Manager and PowerShell.",
    milestone: "Deploy a Windows Server lab with core network roles and administrative documentation.",
    weeks: [
      week(6, 1, "Windows Server deployment", "Understand editions, installation options, roles, features and server configuration.", ["Install a supported Windows Server evaluation image in a VM.", "Configure hostname, static IP, updates, time and remote administration.", "Explore Server Manager, Windows Admin Center and Event Viewer."], "Create a Windows Server build sheet with baseline configuration.", ["microsoft-server", "windows-server-path"]),
      week(6, 2, "Windows services, storage & permissions", "Manage Windows services, disks, volumes, shares and NTFS permissions.", ["Inspect and manage services with Services console and PowerShell.", "Create volumes and shared folders and apply NTFS/share permissions.", "Review local users, groups and local security policy."], "Deploy a file share with a documented access-control matrix.", ["microsoft-server", "powershell-docs"]),
      week(6, 3, "Windows networking roles", "Configure Windows DNS and DHCP roles in a controlled domain lab.", ["Install and configure DNS and create forward and reverse lookup zones.", "Install DHCP, configure a scope and verify client leases.", "Troubleshoot name resolution and DHCP allocation from a client VM."], "Document DNS and DHCP configuration and verify both from a client.", ["microsoft-server", "windows-server-path"]),
      week(6, 4, "PowerShell administration", "Use PowerShell objects, pipelines and scripts to inspect and manage Windows systems.", ["Practise Get-Help, Get-Command, pipelines, filtering and object properties.", "Query services, processes, disks, network adapters and event logs.", "Write a script that generates a basic server inventory report."], "Save a reusable PowerShell inventory script with example output.", ["powershell-docs", "powershell-basics", "powershell-admin"])
    ]
  },
  {
    number: 7, title: "Enterprise System Administration", stageSlug: "enterprise-administration", stageLabel: "Stage 03 · Enterprise Administration",
    summary: "Manage identity, Active Directory, Group Policy, shared services and common enterprise administration workflows.",
    milestone: "Build a small Windows domain with structured users, groups, policies and shared resources.",
    weeks: [
      week(7, 1, "Active Directory foundations", "Understand domains, forests, domain controllers, organisational units and directory objects.", ["Study AD DS architecture, LDAP, Kerberos and domain authentication.", "Promote a Windows Server VM to a domain controller in an isolated lab.", "Create organisational units, users, groups and service accounts."], "Create a domain design diagram and a documented directory structure.", ["ad-ds", "microsoft-server"]),
      week(7, 2, "Group Policy & endpoint configuration", "Apply consistent settings to users and computers through Group Policy.", ["Create and link Group Policy Objects to appropriate OUs.", "Configure a safe policy such as password settings, desktop restrictions or firewall rules.", "Use gpupdate and gpresult to verify policy application and troubleshoot scope."], "Produce a Group Policy plan with test evidence from a domain client.", ["ad-ds", "microsoft-learn"]),
      week(7, 3, "Identity lifecycle & enterprise services", "Manage access through joiner, mover and leaver processes and understand shared services.", ["Design role-based security groups and assign access through groups.", "Practise onboarding, role change and offboarding for test accounts.", "Review file services, print services, time synchronisation and service accounts."], "Write an identity lifecycle procedure and access review checklist.", ["ad-ds", "powershell-admin"]),
      week(7, 4, "Enterprise administration project", "Bring directory services, DNS, DHCP, policies and file access together.", ["Connect a Windows client to the domain and verify authentication.", "Test policy application and access to department-based file shares.", "Document backup considerations for domain controllers and directory recovery."], "Deliver a working domain lab with diagrams, screenshots and an administrator runbook.", ["ad-ds", "windows-server-path"])
    ]
  },
  {
    number: 8, title: "Virtualization, Storage & Backup", stageSlug: "infrastructure-operations", stageLabel: "Stage 04 · Infrastructure Operations",
    summary: "Build and operate virtual infrastructure, containers, storage systems and tested backup and recovery workflows.",
    milestone: "Create a documented virtual infrastructure environment and prove that a restore works.",
    weeks: [
      week(8, 1, "Virtualization concepts & hypervisors", "Understand virtual machines, hypervisors, resource allocation and virtual networking.", ["Compare Type 1 and Type 2 hypervisors and explain CPU and memory allocation.", "Install or explore Proxmox VE, Hyper-V or another available hypervisor.", "Create VMs, templates, snapshots and virtual network bridges."], "Build a small hypervisor lab and document its resource allocation.", ["proxmox-docs", "proxmox-training"]),
      week(8, 2, "Storage architecture & capacity", "Understand storage pools, RAID concepts, filesystems and capacity planning.", ["Compare direct-attached, network-attached and shared storage concepts.", "Study RAID 0, 1, 5, 6 and 10 and understand their trade-offs.", "Monitor disk health, capacity, latency and storage utilisation."], "Create a storage design for a small server environment.", ["proxmox-docs", "rhel-docs"]),
      week(8, 3, "Containers & application services", "Understand images, containers, persistent volumes, ports and container networking.", ["Install Docker or use a supported practice environment.", "Run containers, inspect logs and configure persistent volumes.", "Build a small multi-container application using Docker Compose."], "Deploy and document a containerised service stack.", ["docker-docs", "play-docker"]),
      week(8, 4, "Backup, restore & disaster recovery", "Plan backups around recovery objectives and practise restoration.", ["Explain RPO, RTO, retention, off-site copies and the 3-2-1 principle.", "Back up a VM or service and restore it into an isolated test environment.", "Write a recovery runbook and identify single points of failure."], "Complete a backup-and-restore test report with measured recovery steps.", ["proxmox-docs", "debian-handbook"])
    ]
  },
  {
    number: 9, title: "Monitoring & Security Operations", stageSlug: "security-automation", stageLabel: "Stage 05 · Security & Automation",
    summary: "Establish monitoring, alerting, patching, hardening and incident-handling habits for reliable infrastructure operations.",
    milestone: "Monitor a small infrastructure stack and apply a documented security baseline.",
    weeks: [
      week(9, 1, "Infrastructure monitoring", "Collect system and service metrics and distinguish symptoms from root causes.", ["Deploy a monitoring tool such as Nagios or Prometheus in a lab.", "Monitor host availability, CPU, memory, disk and a critical service.", "Create a dashboard and trigger a test alert."], "Create a dashboard with at least five useful infrastructure checks.", ["nagios", "prometheus", "grafana"]),
      week(9, 2, "Logging, alerting & incident response", "Correlate events and respond methodically to infrastructure incidents.", ["Collect and review logs from Linux and Windows test systems.", "Create alert thresholds and distinguish warning from critical conditions.", "Simulate a service outage and record detection, triage, mitigation and recovery."], "Write an incident report and a short post-incident review.", ["prometheus", "grafana", "cisa"]),
      week(9, 3, "System hardening & patch management", "Reduce attack surface and maintain secure, supported systems.", ["Review default accounts, open ports, unnecessary services and privileged access.", "Apply updates in a test environment and document the maintenance window.", "Configure host firewall rules, SSH security and secure remote administration."], "Create a system hardening checklist and patch record.", ["cis-controls", "nist-csf", "cisa"]),
      week(9, 4, "Identity, access & operational security", "Apply least privilege, secure credentials and basic security governance.", ["Review administrator accounts, group membership and service-account permissions.", "Study MFA, password managers, secrets handling and privileged access concepts.", "Map a small lab environment to relevant NIST CSF outcomes or CIS safeguards."], "Complete a basic security assessment with prioritised remediation actions.", ["nist-csf", "cis-controls", "nist-nice"])
    ]
  },
  {
    number: 10, title: "Automation & Infrastructure as Code", stageSlug: "security-automation", stageLabel: "Stage 05 · Security & Automation",
    summary: "Automate repeatable administration tasks with shell scripts, PowerShell, Git, Ansible and Terraform fundamentals.",
    milestone: "Store and run a repeatable infrastructure configuration project from version control.",
    weeks: [
      week(10, 1, "Administrative scripting", "Write reliable scripts that reduce repetitive work and provide useful diagnostic output.", ["Improve a Bash script with functions, arguments, logging and error handling.", "Write a PowerShell script to collect Windows server inventory or service status.", "Compare scheduled execution methods and apply safe permissions to scripts."], "Publish one Bash and one PowerShell administration script with usage notes.", ["linux-man-pages", "powershell-docs"]),
      week(10, 2, "Git & configuration workflow", "Track infrastructure changes and collaborate using version control fundamentals.", ["Create a Git repository and practise commits, branches, merges and pull requests.", "Store scripts, diagrams and configuration examples with a useful README.", "Use a .gitignore file and keep passwords, tokens and private keys out of source control."], "Create a clean infrastructure-lab repository with documented change history.", ["github-skills"]),
      week(10, 3, "Ansible configuration management", "Automate Linux configuration with inventories, playbooks, modules and roles.", ["Install Ansible in a suitable control environment and connect to a disposable Linux VM.", "Write a playbook to configure packages, users, files and a service.", "Use variables, handlers and templates and practise idempotent runs."], "Build an Ansible playbook that configures a server from a clean baseline.", ["ansible-start", "ansible-docs"]),
      week(10, 4, "Terraform & infrastructure as code", "Understand declarative infrastructure, providers, resources, state and safe change plans.", ["Study Terraform configuration, providers, resources, variables and outputs.", "Run init, fmt, validate and plan in a safe tutorial or local environment.", "Explain state files, secrets protection and why plan review matters before apply."], "Create a small IaC example and document its plan and resource lifecycle.", ["terraform", "github-skills"])
    ]
  },
  {
    number: 11, title: "Cloud & Hybrid Administration", stageSlug: "cloud-hybrid", stageLabel: "Stage 06 · Cloud & Hybrid",
    summary: "Understand cloud service models and administer identity, networking, compute, storage, monitoring and cost controls.",
    milestone: "Design and document a secure, cost-aware cloud or hybrid infrastructure pattern.",
    weeks: [
      week(11, 1, "Cloud foundations & shared responsibility", "Understand service models, regions, availability zones and cloud operating principles.", ["Compare IaaS, PaaS and SaaS and public, private and hybrid deployment models.", "Study regions, availability zones, resilience and the shared responsibility model.", "Compare core services across AWS, Azure and Google Cloud at a high level."], "Create a cloud service comparison and responsibility matrix.", ["aws-overview", "aws-skillbuilder", "azure-admin"]),
      week(11, 2, "Cloud identity & governance", "Manage identities, permissions, policy, budgets and secure administrative access.", ["Study IAM users, roles, groups, policies and least-privilege access.", "Understand MFA, role-based access, audit logs and privileged administration.", "Review budgets, quotas, tags and cost alerts before creating billable resources."], "Write a cloud account governance checklist and IAM role design.", ["aws-skillbuilder", "azure-admin", "gcp-docs"]),
      week(11, 3, "Cloud networking, compute & storage", "Understand virtual networks, subnets, routing, security groups, compute and object storage.", ["Design a virtual network with public and private subnet concepts.", "Compare virtual machines, managed compute and object storage services.", "Study firewall/security group rules, backup options and data protection."], "Draw a secure cloud network architecture with an annotated service inventory.", ["aws-overview", "azure-admin", "gcp-docs"]),
      week(11, 4, "Hybrid operations & cloud project", "Connect on-premises administration concepts with cloud management and monitoring.", ["Explore hybrid identity, secure connectivity and centralised administration concepts.", "Review monitoring, backup, patching and asset inventory for cloud workloads.", "Estimate costs and identify how to avoid leaving test resources running."], "Produce a cloud or hybrid design document with security, operations and cost notes.", ["hybrid-server", "gcp-skills", "az104"])
    ]
  },
  {
    number: 12, title: "Advanced Engineering & Capstone", stageSlug: "advanced-engineering", stageLabel: "Stage 07 · Advanced Engineering & SRE",
    summary: "Explore resilient architecture, Kubernetes, observability and reliability engineering, then integrate the skills in a capstone.",
    milestone: "Build, test and present an end-to-end infrastructure environment with an operations runbook.",
    weeks: [
      week(12, 1, "High availability & resilient design", "Design infrastructure that can tolerate component failure and recover predictably.", ["Study redundancy, clustering, load balancing and failover concepts.", "Review backup strategy, disaster recovery, RPO and RTO for a critical service.", "Identify failure domains and single points of failure in your existing lab."], "Create a high-level resilient architecture diagram and failure-mode checklist.", ["proxmox-docs", "nist-csf"]),
      week(12, 2, "Kubernetes & cloud-native operations", "Understand container orchestration and the main objects used to operate workloads.", ["Study clusters, nodes, Pods, Deployments, Services and namespaces.", "Complete a beginner Kubernetes tutorial using a local or browser-based environment.", "Inspect application health, logs, resource requests and basic rollout behaviour."], "Deploy a small containerised workload and document its Kubernetes resources.", ["kubernetes-tutorials", "kubernetes-training", "linux-foundation"]),
      week(12, 3, "SRE, observability & service reliability", "Use service-level thinking, metrics, logs and traces to improve reliability.", ["Study SLIs, SLOs, SLAs, error budgets and toil at a conceptual level.", "Define a few service health indicators and a basic availability objective.", "Use monitoring evidence to investigate latency, saturation, errors or availability."], "Create a service dashboard and a short reliability review for one lab service.", ["prometheus", "grafana", "linux-foundation"]),
      week(12, 4, "Final infrastructure capstone", "Integrate the roadmap into a realistic, secure and documented infrastructure project.", ["Plan and build an environment with network segmentation, Linux/Windows services and virtualisation.", "Add identity and access controls, backup, monitoring and at least one automated deployment task.", "Test a failure and recovery scenario, then prepare diagrams, screenshots and a walkthrough."], "Present a capstone portfolio containing architecture, configurations, test evidence, runbooks and lessons learned.", ["proxmox-docs", "ansible-docs", "prometheus", "github-skills"])
    ]
  }
];
