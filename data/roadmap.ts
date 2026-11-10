export type RoadmapTopic = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  commandExample?: string;
  task?: string;
};

export type RoadmapSection = {
  id: string;
  title: string;
  intro?: string;
  topics: RoadmapTopic[];
};

export type RoadmapProject = {
  title: string;
  description: string;
  deliverables: string[];
};

export type RoadmapStage = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  level: string;
  duration: string;
  summary: string;
  objective: string;
  prerequisites: string[];
  outcomes: string[];
  sections: RoadmapSection[];
  labs: string[];
  projects: RoadmapProject[];
  certifications: { name: string; note: string }[];
  exitCriteria: string[];
  resourceIds: string[];
};

export const roadmapStages: RoadmapStage[] = [
  {
    slug: "it-fundamentals",
    number: "01",
    title: "IT & Computer Fundamentals",
    shortTitle: "IT Fundamentals",
    level: "Beginner",
    duration: "2–4 weeks",
    summary: "Understand the computer systems, hardware, operating-system concepts and troubleshooting methods that underpin every SysAdmin role.",
    objective: "Understand how computers operate, how operating systems interact with hardware, and how to diagnose ordinary technical problems before moving into server and network administration.",
    prerequisites: ["Basic computer literacy", "A Windows or Linux computer for observation and practice"],
    outcomes: ["Explain the main components of a computer and server", "Describe the operating-system boot process", "Inspect CPU, memory, storage and network resources", "Follow a structured troubleshooting process", "Install and operate Windows and Linux virtual machines"],
    sections: [
      {
        id: "hardware",
        title: "Hardware & computer architecture",
        intro: "Learn the physical components that make up workstations and servers, and how their specifications affect reliability and performance.",
        topics: [
          { id: "it-cpu", title: "CPU & processing", summary: "Understand how the processor executes instructions and handles concurrent work.", details: ["Cores, threads, clock speed and cache", "Instruction sets and x86-64 versus ARM", "CPU utilisation, load and thermal limits", "Server CPU considerations and virtualisation extensions"], task: "Inspect the CPU model, core count and virtualisation support on your computer." },
          { id: "it-memory", title: "RAM & memory", summary: "Learn how systems allocate memory and what happens when available memory becomes constrained.", details: ["Volatile memory, capacity, speed and channels", "Memory allocation, paging and swapping", "ECC RAM and why server platforms use it", "Memory pressure, leaks and resource contention"], task: "Compare memory use by process and identify what happens when a test VM is assigned too little RAM." },
          { id: "it-storage", title: "Storage devices & performance", summary: "Understand the differences between storage media and the performance measurements administrators monitor.", details: ["HDD, SATA SSD, NVMe and SAS", "Capacity, IOPS, throughput and latency", "Partitions, volumes and device interfaces", "Drive health, SMART data and failure indicators"], task: "Inspect your disks and compare capacity, filesystem, interface and available health information." },
          { id: "it-platform", title: "Motherboards, firmware & TPM", summary: "Understand the platform components responsible for connecting hardware and establishing a trusted boot environment.", details: ["Chipsets, PCIe lanes, SATA controllers and NICs", "BIOS versus UEFI and boot order", "Secure Boot and firmware updates", "TPM and protection of encryption keys"], task: "Enter firmware setup on a device you own and identify its boot mode and virtualisation settings. Do not change settings unless you understand the effect." },
          { id: "it-boot", title: "Boot process & server hardware", summary: "Trace the path from power-on to a running operating system and become familiar with enterprise hardware.", details: ["POST, firmware, bootloader, kernel and OS startup", "Rack, tower and blade servers", "ECC memory and hot-swap components", "IPMI, Dell iDRAC and HPE iLO out-of-band management"], task: "Draw a simple boot-sequence diagram and label where firmware, bootloader and kernel take part." },
          { id: "it-power", title: "Power, cooling & resilience", summary: "Recognise how power and environmental problems affect availability and data integrity.", details: ["Power supplies, redundancy and UPS systems", "Graceful shutdown and unexpected power loss", "Thermal monitoring, airflow and cooling", "Power events and hardware failure indicators"], task: "Write a safe shutdown and recovery checklist for a small server or lab host." }
        ]
      },
      {
        id: "operating-systems",
        title: "Operating-system fundamentals",
        topics: [
          { id: "it-kernel", title: "Kernel, processes & threads", summary: "Understand the core operating-system components that manage hardware and running applications.", details: ["Kernel space versus user space", "Processes, threads, scheduling and context switching", "System calls, drivers and kernel modules", "Services, daemons and background processes"] },
          { id: "it-memory-management", title: "Virtual memory & resource management", summary: "Learn how an OS manages memory and shares CPU, RAM and I/O resources.", details: ["Virtual address spaces and paging", "Swap space and page files", "Resource allocation and contention", "Performance symptoms caused by CPU, RAM or disk pressure"] },
          { id: "it-filesystems", title: "Filesystems, permissions & devices", summary: "Learn how operating systems organise files and control access to system resources.", details: ["Files, directories, metadata and mount points", "NTFS, ext4 and XFS at a high level", "Ownership, permissions and access control", "Device drivers and hardware abstraction"] },
          { id: "it-accounts", title: "Accounts, authentication & authorisation", summary: "Distinguish identity verification from the permissions granted to an account.", details: ["Users, groups and privilege levels", "Authentication versus authorisation", "Local accounts and administrative identities", "Least privilege and safe account handling"] },
          { id: "it-startup", title: "Startup, shutdown & recovery", summary: "Understand normal startup and the tools available when an operating system cannot start correctly.", details: ["Windows startup and recovery environment", "Linux bootloader, kernel and systemd startup", "Safe mode, rescue mode and recovery media", "Shutdown, restart and service dependencies"] },
          { id: "it-logs", title: "Logs & diagnostic evidence", summary: "Use system logs and event records to establish what happened before changing a system.", details: ["Windows Event Viewer and event channels", "Linux journal and service logs", "Timestamps, severity and correlation", "Collecting evidence without destroying useful state"] }
        ]
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting methodology",
        intro: "Use a repeatable process. Avoid random changes and always verify that the underlying service has recovered.",
        topics: [
          { id: "it-troubleshoot-process", title: "A structured troubleshooting process", summary: "Move from symptoms to evidence, hypothesis, controlled change and verified recovery.", details: ["Identify symptoms, affected users and business impact", "Determine scope: user, device, service, subnet or whole environment", "Collect evidence and establish a baseline", "Form a hypothesis and test it safely", "Make a controlled change with a rollback plan", "Verify service operation and monitor for recurrence", "Document root cause, resolution and preventive action"], task: "Write a troubleshooting record for a real but non-sensitive issue you have solved." },
          { id: "it-service-terms", title: "Incidents, problems, requests & changes", summary: "Understand the operational language used by IT support and infrastructure teams.", details: ["Incident: an unplanned interruption or reduction in service quality", "Problem: the underlying or recurring cause of one or more incidents", "Service request: a routine, authorised user need", "Change: a planned modification to a service or environment"] }
        ]
      }
    ],
    labs: ["Inspect CPU, RAM, disks, firmware and virtualisation capabilities on Windows and Linux.", "Create and format virtual disks; compare NTFS, ext4 and XFS.", "Install Windows 11 and Ubuntu in virtual machines.", "Diagnose high CPU use, memory pressure and full disks.", "Break a disposable VM's boot configuration and recover it from a snapshot or installation media.", "Inspect Windows Event Viewer and Linux journal logs to identify simulated faults."],
    projects: [{ title: "IT Troubleshooting Workstation", description: "Create Windows and Linux VMs, configure networking, accounts, storage, updates and remote access.", deliverables: ["A documented workstation and VM inventory", "A troubleshooting guide covering at least ten faults", "Symptoms, diagnostic commands, likely causes and fixes", "A simple network and storage diagram"] }],
    certifications: [{ name: "CompTIA A+", note: "Optional foundation credential for hardware, operating systems and troubleshooting. Check the current exam codes and objectives before registering." }],
    exitCriteria: ["Install and configure Windows and Linux virtual machines", "Interpret basic CPU, memory and storage usage", "Solve routine workstation and OS issues", "Explain the startup process and identify useful log sources", "Use a structured troubleshooting process rather than guesswork"],
    resourceIds: ["microsoft-learn", "linux-journey", "cisco-netacad"]
  },
  {
    slug: "networking",
    number: "02",
    title: "Networking & Network Administration",
    shortTitle: "Networking",
    level: "Foundation → Intermediate",
    duration: "6–10 weeks",
    summary: "Learn how systems communicate, how networks are segmented and routed, and how to diagnose connectivity, DNS, DHCP and firewall problems.",
    objective: "Build the networking knowledge required to deploy, connect, secure and troubleshoot servers and services in small and enterprise environments.",
    prerequisites: ["Basic computer and operating-system knowledge", "Comfort using a terminal or command prompt"],
    outcomes: ["Explain OSI and TCP/IP models", "Plan IPv4 and IPv6 addressing", "Configure VLANs, switching and routing", "Troubleshoot DNS, DHCP and transport connectivity", "Apply firewall rules, NAT and VPN concepts"],
    sections: [
      {
        id: "network-core",
        title: "Core networking concepts",
        topics: [
          { id: "net-models", title: "OSI & TCP/IP models", summary: "Use layered models to understand encapsulation and locate where communication can fail.", details: ["OSI seven-layer model and TCP/IP model", "Encapsulation and decapsulation", "Ethernet frames, IP packets and transport segments", "How applications use sockets and ports"] },
          { id: "net-addressing", title: "MAC, IPv4 & IPv6 addressing", summary: "Understand hardware addressing and logical addressing across local and routed networks.", details: ["MAC addresses, ARP and neighbour discovery", "IPv4 public and private address ranges", "IPv6 address format, prefix notation and address types", "Static versus dynamic addressing", "Default gateway and DNS client settings"] },
          { id: "net-subnetting", title: "Subnetting & CIDR", summary: "Divide address space into networks that match the size and security boundaries of an environment.", details: ["CIDR notation and subnet masks", "Network and broadcast addresses in IPv4", "Usable host ranges and subnet sizing", "VLSM and address planning", "IPv6 prefixes and subnet allocation"], task: "Design an addressing plan for management, users, servers and guest networks." },
          { id: "net-transport", title: "TCP, UDP & ports", summary: "Understand how applications establish and exchange data across transport protocols.", details: ["TCP connection establishment and teardown", "UDP datagrams and connectionless communication", "Ports, sockets and listening services", "Retransmission, latency and packet loss", "Common service ports and why they matter"] },
          { id: "net-switching", title: "Ethernet switching & VLANs", summary: "Segment local networks and understand how switches forward frames.", details: ["Ethernet frames and MAC address tables", "Access ports and 802.1Q trunk ports", "VLAN tagging and segmentation", "Inter-VLAN routing", "STP/RSTP and loop prevention", "LACP link aggregation"] },
          { id: "net-routing", title: "Routing & network paths", summary: "Learn how packets move between networks and how routers select paths.", details: ["Default gateways and routing tables", "Static routes and route metrics", "Inter-VLAN routing", "Dynamic routing concepts such as RIP, OSPF and BGP awareness", "Gateway redundancy and failover"] },
          { id: "net-dns-dhcp", title: "DNS & DHCP", summary: "Understand the services that give devices network configuration and translate names into addresses.", details: ["DHCP scopes, leases, reservations, options and relay agents", "DNS recursive and authoritative queries", "Forward and reverse lookup zones", "A, AAAA, CNAME, MX, PTR, TXT and SRV records", "Caching, forwarding, conditional forwarding and DNS troubleshooting"] },
          { id: "net-quality", title: "Network performance & quality", summary: "Measure whether the network is fast, stable and suitable for its workloads.", details: ["Bandwidth, throughput and latency", "Jitter and packet loss", "MTU and fragmentation", "Quality of Service concepts", "Baselines and performance comparisons"] }
        ]
      },
      {
        id: "network-security",
        title: "Network security & remote connectivity",
        topics: [
          { id: "net-firewalls", title: "Firewalls, ACLs & NAT", summary: "Control which traffic is allowed between network zones and external networks.", details: ["Stateful versus stateless filtering", "Default-deny policy and least privilege", "Access control lists and rule ordering", "Network Address Translation and port forwarding", "DMZs and management network separation"] },
          { id: "net-vpn", title: "VPNs & secure remote administration", summary: "Connect users and sites securely without exposing management services unnecessarily.", details: ["IPsec and SSL/TLS VPN concepts", "WireGuard fundamentals", "SSH and RDP security considerations", "Site-to-site versus remote-access VPNs", "Authentication, encryption and route planning"] },
          { id: "net-advanced", title: "Advanced networking awareness", summary: "Become familiar with technologies encountered in larger or more specialised environments.", details: ["IPv6 neighbour discovery", "DNSSEC purpose and limitations", "BGP and autonomous systems at a high level", "SD-WAN concepts", "Network segmentation and zero-trust boundaries"] }
        ]
      },
      {
        id: "network-diagnostics",
        title: "Network troubleshooting & commands",
        intro: "Run commands with a question in mind, interpret the output and compare it with the expected network path.",
        topics: [
          { id: "net-windows-tools", title: "Windows network diagnostics", summary: "Inspect IP configuration, routes, adapters, DNS and TCP connectivity from PowerShell.", details: ["Get-NetIPConfiguration and Get-NetIPAddress", "Get-NetRoute and Get-NetAdapter", "Resolve-DnsName for name resolution", "Test-Connection for reachability", "Test-NetConnection for TCP port tests", "Get-NetTCPConnection for connection state"], commandExample: "Get-NetIPConfiguration\nGet-NetRoute\nResolve-DnsName example.com\nTest-NetConnection example.com -Port 443\nGet-NetTCPConnection" },
          { id: "net-linux-tools", title: "Linux network diagnostics", summary: "Inspect interfaces, routes, neighbours, listeners, DNS and packet flow on Linux servers.", details: ["ip addr, ip route and ip neigh", "ss -tulpen for listening sockets", "dig for DNS queries", "ping and traceroute for reachability and path checks", "curl for HTTP response testing", "tcpdump for packet capture"], commandExample: "ip -br addr\nip route\nip neigh\nss -tulpen\ndig example.com\ncurl -I https://example.com\nsudo tcpdump -ni any port 53" },
          { id: "net-packet-analysis", title: "Packet analysis with Wireshark & tcpdump", summary: "Use packet captures to investigate DNS, TCP handshakes, retransmissions and unexpected traffic.", details: ["Capture filters versus display filters", "DNS request and response analysis", "TCP three-way handshake", "Retransmissions, resets and timeouts", "TLS visibility limits and safe handling of captures"], task: "Capture a DNS lookup in your own lab and explain the query, response and destination address." }
        ]
      }
    ],
    labs: ["Build a multi-subnet network and calculate its IPv4 address plan.", "Configure access VLANs, trunk links and inter-VLAN routing in Packet Tracer or GNS3.", "Deploy DHCP and DNS and test name resolution from clients.", "Configure static routes or a basic dynamic routing protocol between two routers.", "Create firewall rules that permit required traffic and block unauthorised paths.", "Capture DNS and TCP traffic with Wireshark and explain what you observe."],
    projects: [
      { title: "Multi-department enterprise network", description: "Build an office network for Management, HR, Finance and IT with a simulated branch office.", deliverables: ["Network topology and IP addressing plan", "VLANs, trunks, DHCP and inter-VLAN routing", "ACLs and permitted/blocked traffic tests", "Connectivity and DNS troubleshooting notes"] },
      { title: "Virtual network firewall", description: "Install OPNsense or pfSense in an isolated lab and create secure network zones.", deliverables: ["LAN, server and management networks", "NAT, firewall rules and VPN configuration", "Firewall logs and traffic tests", "A short explanation of each security rule"] },
      { title: "Network troubleshooting challenge", description: "Intentionally misconfigure a disposable network and identify the root cause of each failure.", deliverables: ["At least five fault scenarios", "Packet captures or command output as evidence", "Root cause and repair for each scenario", "A prevention checklist"] }
    ],
    certifications: [
      { name: "CompTIA Network+", note: "Vendor-neutral networking breadth. Review the current N10-series exam objectives." },
      { name: "Cisco CCNA", note: "A deeper routing, switching and network operations path. It can be an alternative to Network+ as your first networking credential." }
    ],
    exitCriteria: ["Subnet IPv4 networks and explain IPv6 basics", "Configure VLANs, trunks and routing in a lab", "Explain DNS and DHCP operations", "Diagnose gateway, route, firewall and name-resolution problems", "Capture and interpret basic network traffic"],
    resourceIds: ["cisco-netacad", "packet-tracer", "gns3", "wireshark", "opnsense"]
  },
  {
    slug: "linux-windows-administration",
    number: "03",
    title: "Linux & Windows System Administration",
    shortTitle: "Linux & Windows",
    level: "Core SysAdmin skills",
    duration: "8–12 weeks",
    summary: "Move from operating-system concepts into hands-on server administration across Linux and Windows, including users, permissions, services, storage, logs and remote access.",
    objective: "Administer individual servers confidently, understand the core tools of each platform, and troubleshoot common operating-system and service failures.",
    prerequisites: ["Stage 1 fundamentals", "Basic networking and IP addressing"],
    outcomes: ["Administer a Linux server from the shell", "Manage Windows using Server Manager and PowerShell", "Manage users, groups, permissions and services", "Configure storage, networking, updates and logs", "Secure remote access and recover from routine failures"],
    sections: [
      {
        id: "linux-foundation",
        title: "Linux administration",
        intro: "Use Debian or Ubuntu Server alongside a Red Hat-compatible distribution to understand both APT- and DNF-based systems.",
        topics: [
          { id: "linux-distros", title: "Distributions & Linux architecture", summary: "Understand common server distributions and the components that make up a Linux system.", details: ["Debian and Ubuntu: APT-based package management", "RHEL, Rocky Linux and AlmaLinux: RPM/DNF ecosystem", "SUSE Linux Enterprise and openSUSE awareness", "Kernel, shell, GNU utilities and systemd", "Minimal server installation, LTS releases and repositories"] },
          { id: "linux-shell", title: "Bash shell & command-line workflow", summary: "Navigate and combine commands to administer systems efficiently.", details: ["Navigation, quoting and environment variables", "Pipes, redirection and command substitution", "Shell history, aliases and exit codes", "Loops, conditionals, functions and safe scripting", "Text processing with grep, sed, awk, cut, sort, uniq, wc and jq"], commandExample: "pwd\nls -lah\nfind /var/log -type f -name '*.log'\ngrep -i 'error' /var/log/syslog | tail -n 20" },
          { id: "linux-filesystem", title: "Linux filesystem hierarchy & file management", summary: "Understand where system configuration, logs, user data and runtime information are stored.", details: ["Filesystem Hierarchy Standard", "/etc, /var, /home, /usr, /tmp, /proc, /sys and /dev", "File operations with ls, cp, mv, rm, find, tar and rsync", "File metadata, inodes and symbolic links", "Mount points and filesystem visibility"] },
          { id: "linux-users", title: "Users, groups & permissions", summary: "Control who can access files and administer the operating system.", details: ["useradd, usermod, passwd and groupadd", "/etc/passwd, /etc/shadow and /etc/group", "Ownership, chmod, chown and umask", "SUID, SGID, sticky bit and ACLs", "sudo, PAM and root-account security"] },
          { id: "linux-processes", title: "Processes, services & systemd", summary: "Manage running workloads and the services that start with the system.", details: ["PID, signals, ps, top, htop, kill and process priorities", "systemctl status, start, stop, restart and enable", "Unit files, targets, dependencies and failed services", "Service troubleshooting and restart behaviour", "Cron, at and systemd timers"] },
          { id: "linux-logs", title: "Logs & system diagnostics", summary: "Use logs to understand system activity and diagnose service or boot problems.", details: ["journalctl and persistent journal configuration", "System and application logs", "Service-specific log files", "Log rotation and retention", "Timestamps, filtering and incident evidence"], commandExample: "systemctl --failed\nsystemctl status ssh\njournalctl -xe --no-pager\njournalctl -u ssh --since '1 hour ago'" },
          { id: "linux-packages", title: "Package management & updates", summary: "Install, update and remove software while maintaining repository and dependency integrity.", details: ["APT, DNF and RPM workflows", "Repositories, package signatures and trust", "Dependency resolution and package holds", "Security updates and maintenance windows", "Version checking and rollback considerations"] },
          { id: "linux-networking", title: "Linux networking & remote access", summary: "Configure host networking and securely administer Linux servers remotely.", details: ["NetworkManager and Netplan", "IP addresses, routes, DNS and resolver configuration", "OpenSSH keys, sshd configuration and access restrictions", "UFW, nftables and firewalld", "Remote administration and secure file transfer"] },
          { id: "linux-storage", title: "Linux storage & filesystems", summary: "Manage partitions, logical volumes, filesystems and persistent mounts.", details: ["GPT partitions, lsblk, blkid and findmnt", "/etc/fstab and mount options", "LVM physical volumes, volume groups and logical volumes", "ext4, XFS, Btrfs and ZFS fundamentals", "Swap, disk capacity and inode usage", "Rescue mode and safe filesystem repair"] },
          { id: "linux-security", title: "Linux security & recovery", summary: "Apply baseline controls and recover systems from common faults.", details: ["SSH hardening and least-privilege sudo", "Host firewalls and audit logs", "SELinux and AppArmor fundamentals", "Rescue mode and bootloader recovery", "Filesystem checks and recovery planning", "CPU load, memory pressure, disk I/O and network throughput"] },
          { id: "linux-services", title: "Common Linux server services", summary: "Deploy and maintain services frequently encountered in business infrastructure.", details: ["Nginx and Apache HTTP Server", "Nginx, HAProxy and Caddy reverse proxies", "PostgreSQL and MariaDB: connectivity, accounts, logs and backup/restore", "Samba and NFS file sharing", "BIND, Unbound and Kea DHCP", "Chrony, rsyslog, journald and monitoring exporters"] }
        ]
      },
      {
        id: "windows-foundation",
        title: "Windows operating-system administration",
        topics: [
          { id: "windows-architecture", title: "Windows architecture & security model", summary: "Understand the core components that support Windows workstations and servers.", details: ["Windows kernel and service architecture", "Processes, services and startup", "Registry hierarchy and safe registry administration", "NTFS permissions, access tokens, ownership and inheritance", "Local users, groups, service accounts, authentication and authorisation", "BitLocker, TPM integration and Windows Recovery Environment"] },
          { id: "windows-tools", title: "Windows administration tools", summary: "Know which built-in management console or tool to use for each operational task.", details: ["PowerShell for scripting and automation", "Windows Admin Center for remote management", "Server Manager for roles and features", "Computer Management for disks, users and services", "Event Viewer, Task Scheduler and Performance Monitor", "Resource Monitor, Disk Management and Services console", "Local Group Policy and Security Policy"] },
          { id: "windows-powershell", title: "PowerShell for server administration", summary: "Use object-based commands and pipelines to inspect and manage Windows systems.", details: ["Get-ComputerInfo, Get-CimInstance and Get-Process", "Get-Service, Get-LocalUser and Get-LocalGroup", "Get-NetIPAddress and Get-DnsClientServerAddress", "Get-NetFirewallProfile and Test-NetConnection", "Get-WinEvent, Get-Disk, Get-Partition and Get-Volume", "Get-WindowsFeature for Windows Server roles and features"], commandExample: "Get-ComputerInfo\nGet-Service | Where-Object Status -eq 'Running'\nGet-NetIPAddress\nGet-WinEvent -LogName System -MaxEvents 20\nGet-Disk" },
          { id: "windows-storage", title: "Windows storage, permissions & file sharing", summary: "Manage volumes and shared folders while applying appropriate access controls.", details: ["Disk Management, partitions and volumes", "NTFS access control lists and inheritance", "SMB shares and share permissions", "Local and domain group-based access", "Storage pools and basic capacity monitoring"] },
          { id: "windows-networking", title: "Windows networking & remote management", summary: "Configure Windows network settings and manage systems remotely.", details: ["IP configuration, routes and DNS client settings", "Windows Defender Firewall profiles and rules", "Remote Desktop security", "PowerShell remoting and WinRM", "Network troubleshooting and connectivity tests"] },
          { id: "windows-operations", title: "Windows maintenance & recovery", summary: "Keep Windows systems patched, observable and recoverable.", details: ["Windows Update and maintenance windows", "Event logs and audit policies", "Task Scheduler and automated maintenance", "Windows Server Backup fundamentals", "Server Core versus Desktop Experience", "Backup, restore and recovery environment"] }
        ]
      }
    ],
    labs: ["Install Debian or Ubuntu Server and a RHEL-compatible Linux VM.", "Create users, groups, shared directories and ACLs on Linux.", "Configure SSH key authentication and restrict administrative access.", "Attach virtual disks, configure LVM and mount filesystems persistently.", "Install Nginx and investigate a deliberately stopped service.", "Install Windows Server evaluation media and configure local users, groups and SMB shares.", "Use PowerShell to inspect services, networking, disks and event logs.", "Use remote administration to manage both Linux and Windows VMs."],
    projects: [
      { title: "Production-style Linux web server", description: "Deploy a hardened Linux VM that hosts a sample application through Nginx.", deliverables: ["Stable hostname and network configuration", "SSH key authentication and restricted admin access", "Nginx reverse proxy and TLS where applicable", "Firewall, patching, monitoring and backup", "A recovery runbook"] },
      { title: "Linux storage and recovery", description: "Attach virtual disks, configure LVM and filesystems, then practise recovery in a disposable test VM.", deliverables: ["Partition and LVM layout", "Persistent mount configuration", "Capacity monitoring and disk-exhaustion simulation", "Recovery notes and backup-restoration distinction"] },
      { title: "Windows Server administration lab", description: "Build a Windows Server VM and practise day-to-day server administration.", deliverables: ["Local users and groups", "SMB shares with NTFS permissions", "PowerShell remoting and firewall rules", "Event log analysis, updates and backup evidence"] }
    ],
    certifications: [
      { name: "Linux Foundation Certified System Administrator (LFCS)", note: "Practical Linux administration credential; prepare through repeated command-line labs." },
      { name: "Red Hat Certified System Administrator (RHCSA)", note: "Strong option for a Red Hat Enterprise Linux administration track; check the current EX200 objectives." },
      { name: "CompTIA Linux+ or LPIC-1", note: "Alternative vendor-neutral Linux administration routes. Choose one based on your target roles." }
    ],
    exitCriteria: ["Administer Linux remotely and troubleshoot services", "Manage Linux users, groups, permissions and storage", "Install software and apply system updates safely", "Administer Windows services, disks, users and firewall rules", "Use PowerShell for common administrative tasks", "Recover from routine OS and service failures"],
    resourceIds: ["linux-journey", "linux-man-pages", "debian-docs", "debian-handbook", "ubuntu-server", "rhel-docs", "redhat-training", "linux-foundation", "microsoft-server", "windows-server-path", "powershell-docs", "powershell-basics", "powershell-admin"]
  },
  {
    slug: "enterprise-administration",
    number: "04",
    title: "Enterprise System Administration",
    shortTitle: "Enterprise Administration",
    level: "Junior → Independent administrator",
    duration: "8–12 weeks",
    summary: "Move from administering individual servers to managing identity, policies, shared services and the day-to-day systems used across an organisation.",
    objective: "Build and operate a small enterprise environment with centralised identity, policy enforcement, shared storage, core network services and auditable administration.",
    prerequisites: ["Stage 2 networking fundamentals", "Stage 3 Linux and Windows server administration"],
    outcomes: ["Deploy and manage Active Directory Domain Services", "Create and troubleshoot Group Policy", "Manage joiner, mover and leaver identity processes", "Operate DNS, DHCP and file services", "Automate common domain tasks with PowerShell"],
    sections: [
      {
        id: "active-directory",
        title: "Active Directory Domain Services",
        topics: [
          { id: "ent-ad-structure", title: "Domains, forests & domain controllers", summary: "Understand the logical and physical structure of Active Directory.", details: ["Domains, trees and forests", "Domain controllers and directory partitions", "Organisational Units and delegation", "Global Catalog and directory searches", "Security principals, SIDs and group scopes"] },
          { id: "ent-ad-replication", title: "Sites, replication & FSMO roles", summary: "Learn how directory data is replicated and how specialised operations are assigned.", details: ["AD sites and subnets", "Replication topology and schedules", "FSMO role purpose and placement", "SYSVOL replication", "Health checks and replication troubleshooting"] },
          { id: "ent-ad-auth", title: "Kerberos, LDAP & authentication", summary: "Understand how domain clients locate services and authenticate to resources.", details: ["AD-integrated DNS and service records", "Kerberos tickets and service authentication", "LDAP queries and directory access", "NTLM legacy awareness and associated risks", "Time synchronisation and authentication dependencies"] },
          { id: "ent-ad-recovery", title: "Active Directory recovery", summary: "Plan for directory service failure and practise safe recovery in an isolated lab.", details: ["System State backups", "Authoritative and non-authoritative restore concepts", "Domain controller recovery considerations", "Privileged group review and directory auditing"] }
        ]
      },
      {
        id: "group-policy",
        title: "Group Policy administration",
        topics: [
          { id: "ent-gpo-basics", title: "GPO design & processing", summary: "Apply centrally managed settings to users and computers in a predictable way.", details: ["GPO creation, linking and scope", "Processing order, inheritance and enforcement", "Security filtering and WMI filters", "Loopback processing", "gpresult and gpupdate for troubleshooting"] },
          { id: "ent-gpo-controls", title: "Common enterprise policies", summary: "Use Group Policy to manage security and user experience consistently.", details: ["Password and account lockout policies", "Workstation security baselines and Windows Firewall", "Windows Update, screen-lock and device settings", "Drive mapping, printers and logon restrictions", "Software configuration, Windows LAPS and auditing"] }
        ]
      },
      {
        id: "identity-lifecycle",
        title: "Enterprise identity & access management",
        topics: [
          { id: "ent-identity-lifecycle", title: "Joiner → Mover → Leaver lifecycle", summary: "Manage account changes from onboarding to role changes and secure offboarding.", details: ["Create and disable accounts through approved processes", "Assign groups based on job role", "Remove access when responsibilities change", "Handle departures and privileged access removal", "Maintain evidence and audit trails"] },
          { id: "ent-identity-governance", title: "RBAC, privileged access & MFA", summary: "Design permissions around job responsibilities and limit administrative risk.", details: ["Role-based access control and separation of duties", "Permission reviews and access recertification", "Privileged groups and service accounts", "Managed service accounts and gMSAs", "MFA, password reset and break-glass processes"] }
        ]
      },
      {
        id: "enterprise-services",
        title: "Enterprise Windows services",
        topics: [
          { id: "ent-dns-dhcp", title: "Windows DNS & DHCP services", summary: "Operate the core network services used by domain-joined systems.", details: ["DNS zones, records, forwarders and conditional forwarders", "DHCP scopes, reservations and options", "DHCP failover and relay awareness", "DNS registration and domain discovery", "Troubleshooting name resolution and lease assignment"] },
          { id: "ent-files", title: "File services & DFS", summary: "Deliver shared storage with reliable permissions and manageable paths.", details: ["SMB shares, quotas and NTFS/share permissions", "Group-based access", "DFS Namespaces and DFS Replication", "File server auditing and access reviews"] },
          { id: "ent-other-services", title: "Additional Windows Server roles", summary: "Become familiar with common enterprise services beyond identity and file sharing.", details: ["IIS web hosting and troubleshooting", "Windows Server Backup and System State", "Windows Admin Center and Hyper-V", "AD CS and certificate lifecycle fundamentals", "WSUS and modern update deployment", "Failover Clustering and quorum", "Remote Desktop Services"] },
          { id: "ent-hybrid", title: "Modern Microsoft enterprise ecosystem", summary: "Understand how traditional Windows Server infrastructure connects to modern identity and endpoint management.", details: ["Microsoft Entra ID", "Hybrid identity and directory synchronisation", "Microsoft Intune and endpoint management", "Microsoft 365 administration awareness", "Secure remote management and Azure Arc"] }
        ]
      },
      {
        id: "enterprise-powershell",
        title: "PowerShell for enterprise administration",
        topics: [
          { id: "ent-ad-powershell", title: "Active Directory PowerShell module", summary: "Query directory information and automate common administrative reports.", details: ["Import-Module ActiveDirectory", "Get-ADDomain and Get-ADForest", "Get-ADUser, Get-ADComputer and Get-ADGroup", "Get-ADDomainController", "CSV-based account creation and reporting"], commandExample: "Import-Module ActiveDirectory\nGet-ADDomain\nGet-ADForest\nGet-ADUser -Filter *\nGet-ADComputer -Filter *\nGet-ADGroup -Filter *" },
          { id: "ent-script-safety", title: "Safe administrative scripting", summary: "Build scripts that are controlled, auditable and safe to run in a domain environment.", details: ["Input validation and error handling", "Logging and clear reporting", "Approval gates for high-impact changes", "Use -WhatIf and confirmation where available", "Test with disposable accounts and least privilege"] }
        ]
      }
    ],
    labs: ["Deploy a Windows Server domain controller in an isolated virtual network.", "Create departmental OUs and IT, Finance, HR and Management groups.", "Join a Windows client to the domain and verify DNS and policy processing.", "Create an SMB file share with group-based access and test least privilege.", "Deploy a second domain controller and verify replication.", "Automate test-user onboarding and offboarding with PowerShell.", "Back up directory services and perform a documented recovery exercise."],
    projects: [{ title: "Corporate Active Directory environment", description: "Build a small isolated corporate environment for a fictional organisation with Windows and Linux services.", deliverables: ["Primary and secondary domain controllers", "Departmental OUs, security groups and Group Policy", "Domain-joined Windows client and SMB file server", "Linux VM providing a web service and SSH administration", "Monitoring and backup service", "PowerShell account automation, audit evidence and recovery notes"] }],
    certifications: [{ name: "Microsoft Windows Server Administrator path", note: "Follow Microsoft's currently active Windows Server and hybrid administration credentials. Exam names and availability change; verify the official certification page before paying." }],
    exitCriteria: ["Manage a test Active Directory domain", "Centrally administer users, groups and permissions", "Deploy and troubleshoot Group Policy", "Operate DNS, DHCP and file services", "Troubleshoot domain authentication and replication", "Recover directory services and document the process"],
    resourceIds: ["ad-ds", "microsoft-server", "powershell-admin", "powershell-docs", "hybrid-server", "wireshark"]
  },
  {
    slug: "infrastructure-operations",
    number: "05",
    title: "Virtualization, Storage, Backup & Monitoring",
    shortTitle: "Infrastructure Operations",
    level: "Intermediate SysAdmin",
    duration: "6–10 weeks",
    summary: "Operate virtual machines and containers, design storage, protect workloads with backups and monitor the health of infrastructure services.",
    objective: "Build and maintain a small virtual infrastructure, understand data protection and recovery, and create monitoring that detects service and resource failures.",
    prerequisites: ["Comfort administering Linux and Windows servers", "Networking fundamentals", "Basic storage and filesystem knowledge"],
    outcomes: ["Deploy and manage VMs and containers", "Understand virtual networking and storage", "Design and test backup and recovery", "Monitor hosts, services and workloads", "Explain RPO, RTO and high availability"],
    sections: [
      {
        id: "virtualization",
        title: "Virtualization & hypervisors",
        topics: [
          { id: "infra-hypervisors", title: "Hypervisors & virtualisation platforms", summary: "Compare the platforms used to consolidate and operate compute workloads.", details: ["Type 1 native versus Type 2 hosted hypervisors", "Proxmox VE: KVM virtual machines and LXC containers", "Microsoft Hyper-V: virtual switches and VHDX", "VMware vSphere: ESXi, vCenter, templates and resource pools", "Docker and Podman application containers"] },
          { id: "infra-vm-concepts", title: "VMs, containers & resource allocation", summary: "Understand how compute resources are assigned and isolated.", details: ["VMs with separate guest kernels versus containers sharing the host kernel", "vCPU allocation, scheduling and overcommitment", "RAM allocation, ballooning and swapping", "Raw, qcow2, VHDX and VMDK virtual disks", "Thin versus thick provisioning and resource contention"] },
          { id: "infra-networking", title: "Virtual networking & templates", summary: "Connect workloads and make machine provisioning repeatable.", details: ["Linux bridges, virtual switches and VLAN tags", "Virtual NICs and network isolation", "Snapshots and consistency limitations", "Templates, clones and cloud-init", "PCIe passthrough, GPU access and IOMMU"] },
          { id: "infra-ha", title: "Clustering, migration & high availability", summary: "Understand how platforms coordinate hosts and recover workloads.", details: ["Live migration and compatibility requirements", "Cluster membership and quorum concepts", "High availability and workload restart behaviour", "Affinity, reservations, limits and resource scheduling", "P2V and V2V migration concepts", "A single physical host or nested lab is not equivalent to real host redundancy"] }
        ]
      },
      {
        id: "storage",
        title: "Enterprise storage",
        topics: [
          { id: "infra-storage-types", title: "DAS, NAS, SAN & storage protocols", summary: "Understand how storage is presented to servers and applications.", details: ["Direct-attached, network-attached and storage-area networks", "File versus block storage", "SMB, NFS, iSCSI and Fibre Channel", "Access control, multipathing and storage tiers"] },
          { id: "infra-raid", title: "RAID, ZFS & LVM", summary: "Understand common storage layouts and the trade-offs they introduce.", details: ["RAID 0, 1, 5, 6 and 10", "Failure tolerance and rebuild considerations", "ZFS pools, datasets, snapshots, checksums, replication and scrubbing", "LVM physical volumes, volume groups and logical volumes", "RAID is not a backup"] },
          { id: "infra-performance", title: "Storage performance & integrity", summary: "Monitor the health, performance and capacity of storage systems.", details: ["IOPS, latency, throughput and queue depth", "Thin provisioning, compression and deduplication", "SMART health and disk errors", "Checksums, scrubbing and data integrity", "Capacity forecasting and inode use"] }
        ]
      },
      {
        id: "backup-recovery",
        title: "Backup & disaster recovery",
        topics: [
          { id: "infra-backup-types", title: "Backup types & protection strategy", summary: "Build backup plans that preserve usable recovery points.", details: ["Full, incremental and differential backups", "Application-consistent backups", "Encryption, credential isolation and retention", "Off-site, offline and immutable copies", "3-2-1-1-0 strategy: three copies, two media types, one off-site, one offline/immutable and zero verification errors"] },
          { id: "infra-rpo-rto", title: "RPO, RTO & business continuity", summary: "Translate business recovery expectations into measurable technical targets.", details: ["RPO: maximum acceptable data loss expressed as time", "RTO: maximum acceptable time to restore a service", "Disaster recovery plans and recovery order", "Business continuity during disruption", "Restore validation and recovery testing"] },
          { id: "infra-restore", title: "Restore testing & recovery exercises", summary: "Prove that backups can actually restore the systems and data they are meant to protect.", details: ["Restore full VMs and individual files", "Restore application databases consistently", "Record recovery point and restore duration", "Test credentials and access to backup copies", "Compare measured results with RPO and RTO targets"] }
        ]
      },
      {
        id: "monitoring",
        title: "Monitoring & observability",
        topics: [
          { id: "infra-monitoring-tools", title: "Monitoring platforms", summary: "Understand common open-source platforms for infrastructure monitoring and dashboards.", details: ["Grafana dashboards and alert rules", "Nagios Core host and service checks", "Prometheus metrics, exporters and PromQL", "Zabbix agents, SNMP, templates and triggers"] },
          { id: "infra-signals", title: "What to monitor", summary: "Choose signals that reveal availability, saturation, errors and security problems.", details: ["CPU utilisation, load average and steal time", "Available RAM, swap and OOM events", "Disk capacity, inode use, latency, IOPS and disk errors", "Network throughput, drops, errors and packet loss", "Service availability, restarts and response time", "Database connections, slow queries and replication lag", "Backup job status and latest recovery point", "Failed logins and privilege changes"] },
          { id: "infra-observability", title: "Metrics, logs, traces & alert quality", summary: "Build operational visibility and avoid alerts that are noisy or unactionable.", details: ["Metrics, logs and traces", "Thresholds, notification routing and deduplication", "Maintenance windows and alert silencing", "Black-box monitoring and synthetic checks", "Dashboard design and incident context"] }
        ]
      }
    ],
    labs: ["Create Linux and Windows VMs, an LXC application container and a virtual firewall.", "Build isolated management and application networks using bridges and VLANs.", "Create templates and clones, then test backup and restore operations.", "Attach and configure storage; monitor capacity and disk health.", "Deploy Prometheus, Grafana and exporters or use Zabbix/Nagios.", "Stop a non-critical test service and verify alerting and recovery."],
    projects: [
      { title: "Proxmox enterprise virtualisation lab", description: "Build a small virtual environment with multiple operating systems, virtual networks and shared operational services.", deliverables: ["VM and container inventory", "Virtual network and VLAN diagram", "Storage layout and capacity report", "Template and clone workflow", "Backup and restore evidence"] },
      { title: "Backup and disaster recovery", description: "Use Proxmox Backup Server, Restic, BorgBackup or an appropriately licensed backup platform to test recovery.", deliverables: ["Backup schedule and retention policy", "Protected backup destination", "Full VM, file and database restore tests", "Measured RPO, RTO and data-loss window"] },
      { title: "Centralised infrastructure monitoring", description: "Monitor at least three Linux and Windows systems and alert on meaningful failures.", deliverables: ["Monitoring dashboard", "Disk, service, resource and backup alerts", "Alert test evidence", "Incident report and recovery verification"] }
    ],
    certifications: [{ name: "Platform-specific training", note: "Proxmox, VMware, Microsoft or backup-vendor training can be useful after hands-on practice. Choose based on the platforms used in your target environment." }],
    exitCriteria: ["Provision and administer VMs and containers", "Explain virtual networking, storage and resource allocation", "Create protected backups and perform verified restores", "Explain the difference between HA, snapshots and backups", "Monitor infrastructure and respond to meaningful alerts"],
    resourceIds: ["proxmox-docs", "proxmox-training", "docker-docs", "play-docker", "prometheus", "grafana", "nagios"]
  },
  {
    slug: "security-automation",
    number: "06",
    title: "Security, Automation & Infrastructure Management",
    shortTitle: "Security & Automation",
    level: "Intermediate → Advanced",
    duration: "8–12 weeks",
    summary: "Protect infrastructure through hardening, identity controls, patching and monitoring, then automate repeatable administration with scripts and infrastructure as code.",
    objective: "Develop secure administration habits and use automation to make system configuration consistent, repeatable, testable and auditable.",
    prerequisites: ["Linux and Windows server administration", "Networking and firewall fundamentals", "Experience with a small virtual lab"],
    outcomes: ["Apply least privilege and secure administrative access", "Harden Windows and Linux servers", "Understand vulnerability and incident response workflows", "Write useful Bash, PowerShell and Python scripts", "Use Ansible and Terraform safely", "Manage changes through Git and documentation"],
    sections: [
      {
        id: "security-foundations",
        title: "Security fundamentals & frameworks",
        topics: [
          { id: "sec-cia", title: "Security principles & risk", summary: "Understand the objectives and trade-offs behind infrastructure security.", details: ["Confidentiality, integrity and availability", "Risk assessment and asset inventory", "Threats, vulnerabilities and impact", "Security baselines and defence in depth", "Operational security and accountability"] },
          { id: "sec-identity", title: "Identity, access & privileged administration", summary: "Limit access to what is needed and protect high-impact administrative identities.", details: ["Least privilege, RBAC, ABAC and separation of duties", "MFA, SSO and federation", "OAuth 2.0, OpenID Connect and SAML awareness", "Kerberos, LDAP, certificates and SSH keys", "Privileged access management and just-in-time access", "Break-glass accounts and service-account governance"] },
          { id: "sec-hardening", title: "System hardening & patch management", summary: "Reduce attack surface and keep systems aligned with secure baselines.", details: ["CIS Benchmarks and operating-system baselines", "Disable unnecessary services and exposed interfaces", "Patch assessment, staged deployment and rollback", "Endpoint protection, EDR and host firewalls", "TLS, encryption at rest and key management"] },
          { id: "sec-vulnerability", title: "Vulnerability management", summary: "Identify, prioritise and remediate weaknesses in a controlled way.", details: ["CVE identifiers and CVSS severity", "Vulnerability scanning and asset scope", "Prioritisation by exposure and business impact", "Remediation plans and exception handling", "Verification scans and evidence"] },
          { id: "sec-logging", title: "Logging, detection & incident response", summary: "Prepare to detect suspicious activity and respond to incidents without losing evidence.", details: ["Centralised logging, retention and integrity", "SIEM concepts and correlation rules", "Failed logins and suspicious behaviour", "Detection, containment, eradication and recovery", "Evidence handling, incident reports and lessons learned"] },
          { id: "sec-data", title: "Secrets & data protection", summary: "Protect credentials, keys and sensitive data throughout their lifecycle.", details: ["Credential rotation and secrets vaults", "Managed identities and secure service authentication", "Data classification and retention", "Data loss prevention and secure deletion", "Never commit passwords, private keys or tokens to source control"] }
        ]
      },
      {
        id: "security-frameworks",
        title: "Security frameworks & governance",
        topics: [
          { id: "sec-frameworks", title: "NIST, CIS, ISO 27001 & Zero Trust", summary: "Use established frameworks to structure security improvements.", details: ["NIST Cybersecurity Framework functions", "CIS Controls and CIS Benchmarks", "ISO/IEC 27001 fundamentals", "Zero Trust architecture principles", "IT service management, incident and change processes", "Applicable national, sectoral and organisational privacy requirements"] }
        ]
      },
      {
        id: "hardening-practice",
        title: "Windows & Linux hardening practice",
        topics: [
          { id: "sec-windows-hardening", title: "Windows hardening", summary: "Apply practical security controls to Windows clients and servers.", details: ["Configure Windows LAPS where appropriate", "Restrict RDP exposure and administrative membership", "Apply security baselines and firewall policies", "Enable auditing and monitor privileged activity", "Disable unnecessary services and maintain patch levels", "Test break-glass recovery"] },
          { id: "sec-linux-hardening", title: "Linux hardening", summary: "Secure Linux access, services, permissions and system auditing.", details: ["Harden SSH and restrict administrative access", "Remove or disable unnecessary accounts and services", "Apply least privilege with sudo", "Configure host firewall and AppArmor or SELinux", "Audit authentication failures and protect sensitive files", "Patch systems and validate configuration"] }
        ]
      },
      {
        id: "automation-foundations",
        title: "Scripting & automation foundations",
        topics: [
          { id: "auto-bash", title: "Bash scripting", summary: "Automate Linux administration tasks with safe shell scripts.", details: ["Variables, quoting, pipes and exit codes", "Conditionals, loops and functions", "Input validation and error handling", "Logging and safe file operations", "set -euo pipefail and defensive scripting"] , commandExample: "#!/usr/bin/env bash\nset -euo pipefail\nusage=$(df -P / | awk 'NR==2 {gsub(/%/,\"\",$5); print $5}')\nif (( usage >= 85 )); then\n  echo \"WARNING: root filesystem usage is ${usage}%\"\n  exit 1\nfi\necho \"OK: root filesystem usage is ${usage}%\"" },
          { id: "auto-powershell", title: "PowerShell automation", summary: "Automate Windows and Active Directory tasks with object-based scripts.", details: ["Cmdlets, objects and pipelines", "Modules, functions and remoting", "CSV and JSON processing", "Error handling, validation and logging", "Export reports and use -WhatIf for high-impact actions"], commandExample: "Get-CimInstance Win32_Service |\n  Where-Object { $_.StartMode -eq 'Auto' -and $_.State -ne 'Running' } |\n  Select-Object Name, DisplayName, State, StartMode |\n  Export-Csv '.\\stopped-services.csv' -NoTypeInformation" },
          { id: "auto-python", title: "Python for system administrators", summary: "Use Python for small tools, APIs, reporting and data processing without needing to become a full-time developer.", details: ["pathlib, subprocess and argparse", "logging, json and csv", "Virtual environments and dependencies", "HTTP APIs and YAML/JSON processing", "Exception handling, testing and secrets management"] }
        ]
      },
      {
        id: "automation-platforms",
        title: "Configuration management & infrastructure as code",
        topics: [
          { id: "auto-ansible", title: "Ansible configuration management", summary: "Manage multiple servers with repeatable, idempotent playbooks.", details: ["Inventories and host groups", "Playbooks, YAML, variables and facts", "Modules, roles and collections", "Jinja2 templates, handlers, conditions and tags", "Ansible Vault for appropriate secrets", "Idempotence, error handling and staging tests"], task: "Create a playbook that configures a disposable Linux VM, then run it twice and verify the second run makes no unnecessary changes." },
          { id: "auto-terraform", title: "Terraform & declarative provisioning", summary: "Describe infrastructure as code and manage changes through plan and apply workflows.", details: ["Providers, resources and data sources", "Variables, outputs and modules", "State and state protection", "Plan, apply and destroy workflows", "Local and cloud provider practice", "Cost, secrets and environment separation"] },
          { id: "auto-git", title: "Git, version control & change management", summary: "Keep infrastructure changes reviewable and make rollbacks possible.", details: ["Repositories, commits, branches and pull requests", ".gitignore and secret exclusion", "Reviews and protected branches", "Change requests, impact and test evidence", "Approval, implementation and rollback plans", "Record who changed what, when and why"] }
        ]
      }
    ],
    labs: ["Apply a secure baseline to a Linux server and a Windows Server VM.", "Create a least-privilege administrator model and review group membership.", "Configure firewall rules, SSH key authentication, patching and audit logging.", "Scan your own isolated lab for configuration weaknesses and document remediation.", "Write Bash and PowerShell scripts for routine system reports.", "Use Ansible to configure three fresh Linux VMs and verify idempotence.", "Store infrastructure configuration in Git and demonstrate a controlled rollback."],
    projects: [
      { title: "Harden and audit enterprise servers", description: "Establish a baseline on one Windows and one Linux server, assess the lab, remediate issues and compare results.", deliverables: ["Before-and-after security assessment", "Hardening checklist and configuration evidence", "Change log with reason and rollback", "Audit and incident notes"] },
      { title: "Automated Linux server fleet", description: "Use Ansible to configure three fresh Linux VMs consistently.", deliverables: ["Git repository and inventory", "Playbooks for users, SSH, firewall, Nginx and packages", "Reusable variables and roles", "Evidence of idempotent second run", "README with test and rollback instructions"] }
    ],
    certifications: [
      { name: "CompTIA Security+", note: "Broad security and risk fundamentals; useful if it aligns with your target job roles." },
      { name: "HashiCorp Terraform Associate", note: "A focused infrastructure-as-code credential after practical Terraform work; check the current exam version." },
      { name: "RHCE / advanced Ansible", note: "A later option for Linux automation and enterprise configuration management." }
    ],
    exitCriteria: ["Harden Windows and Linux servers using a repeatable baseline", "Explain least privilege, MFA, patching and vulnerability remediation", "Write safe Bash, PowerShell or Python scripts", "Automate multi-server configuration with Ansible", "Use Git and documented change control for infrastructure changes"],
    resourceIds: ["cis-controls", "nist-csf", "nist-nice", "cisa", "ansible-start", "ansible-docs", "terraform", "github-skills", "powershell-docs", "prometheus"]
  },
  {
    slug: "cloud-hybrid",
    number: "07",
    title: "Cloud & Hybrid System Administration",
    shortTitle: "Cloud & Hybrid",
    level: "Intermediate → Advanced",
    duration: "8–12 weeks",
    summary: "Learn to operate cloud infrastructure and integrate it with on-premises environments, with attention to identity, networking, security, monitoring and cost control.",
    objective: "Become proficient in one cloud platform first, then understand how equivalent services and hybrid identity work across providers.",
    prerequisites: ["Networking and server administration", "Identity and access management basics", "Virtualisation, storage and backup fundamentals"],
    outcomes: ["Explain IaaS, PaaS and SaaS", "Configure cloud identity and network controls", "Deploy and operate cloud compute and storage", "Monitor and secure cloud resources", "Control cloud spending", "Understand hybrid identity and connectivity"],
    sections: [
      {
        id: "cloud-foundations",
        title: "Cloud foundations",
        topics: [
          { id: "cloud-models", title: "Cloud service & deployment models", summary: "Understand what is managed by the provider and what remains the customer's responsibility.", details: ["IaaS, PaaS and SaaS", "Public, private and hybrid cloud", "Provider-operated versus dedicated environments", "Shared responsibility model", "Regions, availability zones and failure boundaries"] },
          { id: "cloud-iam", title: "Cloud identity & access management", summary: "Control who can access cloud resources and what actions they can perform.", details: ["Users, groups, roles and policies", "Authentication and authorisation", "Least-privilege IAM", "Managed identities and workload identities", "MFA, audit trails and privileged access"] },
          { id: "cloud-networking", title: "Cloud virtual networking", summary: "Design private networks and secure traffic between workloads and external systems.", details: ["VPCs and VNets", "Subnets, route tables and gateways", "Security groups and network security rules", "Load balancing and autoscaling", "Site-to-site VPN and private connectivity"] },
          { id: "cloud-storage", title: "Cloud compute, storage & operations", summary: "Understand the core services used to host applications and preserve data.", details: ["Virtual machines and compute instances", "Object, block and file storage", "Managed databases and application platforms", "Metrics, logs, alerts and audit trails", "Backup, snapshots and recovery"] },
          { id: "cloud-cost", title: "Cloud governance & cost management", summary: "Avoid unexpected charges and make cloud resources accountable.", details: ["Budgets, alerts and spending reports", "Resource tagging and cost allocation", "Right-sizing and shutdown of unused resources", "Storage, snapshots, public IP and data-transfer costs", "A budget alert may not automatically stop spending"] }
        ]
      },
      {
        id: "azure",
        title: "Microsoft Azure administration",
        topics: [
          { id: "cloud-azure-compute", title: "Azure compute & networking", summary: "Learn the main Azure services used to deploy and connect workloads.", details: ["Azure Virtual Machines and VM Scale Sets", "Virtual Network, subnets and Network Security Groups", "Load Balancer and Application Gateway", "Resource groups and subscriptions"] },
          { id: "cloud-azure-services", title: "Azure identity, storage & monitoring", summary: "Manage access, data protection and operational visibility in Azure.", details: ["Microsoft Entra ID and managed identities", "Blob Storage, Managed Disks and Azure Files", "Azure Monitor and Log Analytics", "Defender for Cloud and Key Vault", "Azure Policy and RBAC", "Azure Backup and Recovery Services vault"] },
          { id: "cloud-azure-iac", title: "Azure automation & infrastructure as code", summary: "Deploy Azure resources reproducibly and document the intended configuration.", details: ["Bicep and ARM templates", "Terraform for Azure", "Azure Automation", "Azure Arc for hybrid management"] }
        ]
      },
      {
        id: "aws",
        title: "Amazon Web Services administration",
        topics: [
          { id: "cloud-aws-compute", title: "AWS compute & networking", summary: "Understand the AWS services used to host and connect workloads.", details: ["EC2 and Auto Scaling", "VPCs, subnets and route tables", "Security groups and network ACLs", "Route 53, Elastic Load Balancing and VPN"] },
          { id: "cloud-aws-services", title: "AWS identity, storage & operations", summary: "Operate AWS access, data, monitoring and security services.", details: ["IAM and IAM Identity Center", "EBS, S3 and EFS", "CloudWatch and CloudTrail", "KMS, Secrets Manager and AWS Config", "AWS Backup and EBS snapshots", "AWS Organizations, budgets and tagging"] },
          { id: "cloud-aws-iac", title: "AWS automation & governance", summary: "Recreate cloud resources consistently and maintain operational control.", details: ["CloudFormation and Systems Manager", "Terraform for AWS", "Resource tagging and cost controls", "Infrastructure recovery and configuration drift"] }
        ]
      },
      {
        id: "gcp-hybrid",
        title: "Google Cloud & hybrid infrastructure",
        topics: [
          { id: "cloud-gcp", title: "Google Cloud fundamentals", summary: "Become familiar with the core Google Cloud infrastructure services.", details: ["Compute Engine", "VPC networks", "Cloud Storage and Cloud SQL", "IAM and Cloud DNS", "Cloud Monitoring and Cloud Logging", "Infrastructure provisioning"] },
          { id: "cloud-hybrid-identity", title: "Hybrid identity & management", summary: "Connect on-premises identity and infrastructure with cloud services securely.", details: ["On-premises AD DS and Microsoft Entra ID integration", "Hybrid authentication and directory synchronisation", "Site-to-site VPN and private connectivity", "Hybrid DNS and routing", "Azure Arc-enabled servers", "Cross-environment asset inventory and recovery"] }
        ]
      }
    ],
    labs: ["Create a separate learning account or project and configure a budget before deploying resources.", "Deploy a small cloud VM in a private network with least-privilege access.", "Configure storage, monitoring, alerts and backup.", "Use Terraform or Bicep to deploy and recreate a small environment.", "Connect an on-premises lab to a cloud network using an appropriate VPN design where feasible.", "Document how to recover and remove resources to avoid ongoing charges."],
    projects: [
      { title: "Azure infrastructure administration", description: "Deploy a secure Azure environment with a resource group, virtual network and Linux VM.", deliverables: ["Application and management subnets", "Secure administration and least-privilege IAM", "Storage, monitoring, alerts and backup", "Bicep or Terraform deployment", "Budget alert and cost report"] },
      { title: "AWS operations environment", description: "Deploy a secure sample web application on EC2 with protected storage and monitoring.", deliverables: ["VPC and subnet design", "Security groups and IAM controls", "S3 backup storage", "CloudWatch metrics and alerts", "Infrastructure-as-code and cost report"] },
      { title: "Hybrid corporate infrastructure", description: "Extend an on-premises Active Directory lab with a cloud environment and secure connectivity.", deliverables: ["Hybrid network diagram", "Identity and access design", "Private connectivity and DNS plan", "Monitoring and recovery notes"] }
    ],
    certifications: [
      { name: "Microsoft Azure Administrator Associate (AZ-104)", note: "Covers identity, governance, storage, compute, networking and monitoring. Verify the current skills outline." },
      { name: "AWS CloudOps Engineer – Associate (SOA-C03)", note: "AWS operations-focused path, formerly SysOps Administrator – Associate. Confirm the current exam guide." },
      { name: "Google Associate Cloud Engineer", note: "A practical Google Cloud administration option if GCP is your selected platform." }
    ],
    exitCriteria: ["Deploy and administer a cloud VM", "Configure IAM and network security controls", "Monitor cloud services and configure backup", "Use budgets, alerts and resource cleanup to control costs", "Explain a hybrid identity and connectivity design", "Recreate a small cloud environment from code"],
    resourceIds: ["aws-skillbuilder", "aws-training-faq", "aws-overview", "azure-admin", "az104", "gcp-skills", "gcp-docs", "hybrid-server", "terraform"]
  },
  {
    slug: "advanced-engineering",
    number: "08",
    title: "Advanced Infrastructure, Kubernetes & SRE",
    shortTitle: "Advanced Engineering",
    level: "Advanced",
    duration: "6–18+ months plus professional experience",
    summary: "Progress from administering individual systems to designing, operating and improving reliable platforms and complex infrastructure.",
    objective: "Develop the engineering judgement required to design resilient infrastructure, operate container platforms, manage service reliability and lead complex operational work.",
    prerequisites: ["Strong Linux and networking fundamentals", "Experience with virtualisation, storage and backups", "Security and automation experience", "A working cloud or hybrid lab is helpful"],
    outcomes: ["Design highly available and recoverable services", "Operate Kubernetes workloads", "Use SLI, SLO and error budgets", "Plan capacity and assess architectural trade-offs", "Lead incidents, postmortems and operational improvements"],
    sections: [
      {
        id: "advanced-infrastructure",
        title: "Advanced infrastructure engineering",
        topics: [
          { id: "adv-ha", title: "High availability & resilient design", summary: "Design services that continue operating when individual components fail.", details: ["Eliminate or reduce single points of failure", "Active/passive and active/active designs", "Load balancing and health checks", "Shared versus replicated storage", "DNS and directory-service redundancy", "Multi-zone and multi-region resilience"] },
          { id: "adv-dr", title: "Disaster recovery orchestration", summary: "Coordinate recovery across infrastructure components and service dependencies.", details: ["Recovery sequencing and dependency mapping", "DR orchestration and runbooks", "RTO/RPO validation", "Failover and failback planning", "Regular recovery exercises"] },
          { id: "adv-distributed", title: "Distributed systems & capacity planning", summary: "Understand the complexity of services that span multiple machines and networks.", details: ["Distributed-systems fundamentals", "Network and storage bottleneck analysis", "Capacity forecasting and performance engineering", "Lifecycle management and technology refresh", "Migrations with minimal disruption", "Architectural risk and trade-off assessment"] }
        ]
      },
      {
        id: "containers-kubernetes",
        title: "Containers & Kubernetes operations",
        topics: [
          { id: "adv-container-basics", title: "Container images & runtimes", summary: "Understand how applications are packaged and run consistently across environments.", details: ["Container images, layers, tags and registries", "Docker and Podman containers, networks and volumes", "Image scanning and supply-chain awareness", "Docker Compose for multi-container applications"] },
          { id: "adv-k8s-architecture", title: "Kubernetes architecture & workloads", summary: "Learn the cluster components and workload objects used to orchestrate containers.", details: ["Control plane and worker nodes", "Cluster lifecycle and node management", "Pods, Deployments, StatefulSets and DaemonSets", "Services, DNS, ingress and Gateway API", "Resource requests, limits, scaling and rollbacks"] },
          { id: "adv-k8s-storage", title: "Kubernetes networking, storage & security", summary: "Configure application connectivity, persistent data and access boundaries.", details: ["Network policies and service discovery", "PersistentVolumes and PersistentVolumeClaims", "StorageClasses and CSI", "RBAC, service accounts and secrets", "Pod security and namespace boundaries"] },
          { id: "adv-k8s-operations", title: "Kubernetes troubleshooting & ecosystem", summary: "Diagnose cluster and workload failures and become familiar with the supporting ecosystem.", details: ["Node, pod, scheduler, storage and network failures", "Helm and Kustomize", "Operators and GitOps concepts", "Multi-cluster administration awareness", "Monitoring, backup and recovery"] }
        ]
      },
      {
        id: "sre",
        title: "Site Reliability Engineering",
        topics: [
          { id: "adv-sre-indicators", title: "SLI, SLO, SLA & error budgets", summary: "Define measurable reliability targets and understand how they guide operational decisions.", details: ["SLI: measured indicator of service reliability", "SLO: target for an SLI", "SLA: formal or contractual service commitment", "Error budget: permissible unreliability under an SLO", "Availability calculations and measurement windows"] },
          { id: "adv-sre-operations", title: "Toil, incidents & postmortems", summary: "Improve operational work by reducing repetitive toil and learning from failures.", details: ["Identify and reduce repetitive manual work", "Incident command and communication", "Structured postmortems and corrective actions", "Ownership, escalation and service reviews", "Blameless learning and follow-through"] },
          { id: "adv-sre-observability", title: "Observability & chaos engineering", summary: "Use telemetry and controlled fault injection to understand system behaviour and resilience.", details: ["Metrics, logs and traces", "Service health and actionable alerts", "Controlled fault injection in safe environments", "Capacity planning and performance analysis", "Example: a 99.9% time-based monthly availability SLO allows roughly 43 minutes of unavailability in a 30-day month"] }
        ]
      },
      {
        id: "architecture-leadership",
        title: "Infrastructure architecture & leadership",
        topics: [
          { id: "adv-architecture", title: "Architecture specification & design", summary: "Translate business needs into a documented and supportable infrastructure design.", details: ["Business and technical requirements, users, traffic and workloads", "Availability, recovery, security and compliance requirements", "Identity boundaries, data flows and trust boundaries", "Compute, storage and network design", "Monitoring, ownership and capacity estimates", "Cost, licensing, migration, assumptions, risks and trade-offs", "Use architecture frameworks to assess reliability, security, operations, performance and cost"] },
          { id: "adv-leadership", title: "IT operations leadership", summary: "Develop the organisational skills required to own infrastructure services and guide technical teams.", details: ["Change advisory and service ownership", "Procurement, vendor support and budgeting", "Asset and licence management", "Mentoring and technical standards", "Stakeholder communication and project planning", "Risk communication and operational reporting"] }
        ]
      }
    ],
    labs: ["Build a local Kubernetes cluster using suitable VMs or a development distribution.", "Deploy a web application with persistent storage, RBAC, monitoring and resource limits.", "Introduce an invalid configuration and diagnose a failed deployment.", "Simulate an unavailable worker node and investigate workload recovery.", "Define an SLI and SLO for a test service and create an alert.", "Run a documented disaster-recovery exercise and write a postmortem."],
    projects: [{ title: "Kubernetes operations lab", description: "Deploy and operate a small application platform, then deliberately test common failure modes.", deliverables: ["Cluster and workload architecture diagram", "RBAC, network and storage configuration", "Monitoring dashboard and alert rules", "Rolling update and rollback evidence", "Failure scenarios, recovery notes and postmortem"] }, { title: "Infrastructure architecture capstone", description: "Design an integrated environment for a 100-employee organisation with a head office, branch office and several departments.", deliverables: ["Business requirements and architecture decisions", "Network, identity, compute, storage and security diagrams", "Backup, monitoring, automation and hybrid-cloud plan", "Capacity, cost and risk analysis", "Operational runbooks and recovery strategy"] }],
    certifications: [
      { name: "Certified Kubernetes Administrator (CKA)", note: "A practical Kubernetes administration exam. Build cluster operations experience first; CKS is a later security specialisation." },
      { name: "RHCE / advanced Linux credentials", note: "Useful for deeper Linux engineering and automation roles." },
      { name: "Advanced cloud and architecture credentials", note: "Choose only when they match your platform and professional responsibilities." }
    ],
    exitCriteria: ["Design infrastructure against business and technical requirements", "Explain resilience, availability and recovery trade-offs", "Operate and troubleshoot a Kubernetes environment", "Define and monitor reliability targets", "Lead a structured incident review and corrective actions", "Document architecture, cost, capacity and operational ownership"],
    resourceIds: ["kubernetes-tutorials", "kubernetes-training", "linux-foundation", "prometheus", "grafana", "cisa", "aws-overview", "gcp-docs"]
  }
];

export const getStageBySlug = (slug: string) => roadmapStages.find((stage) => stage.slug === slug);
export const getAllTopicIds = () => roadmapStages.flatMap((stage) => stage.sections.flatMap((section) => section.topics.map((topic) => topic.id)));
