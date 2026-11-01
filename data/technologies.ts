export type TechnologyResource = {
  label: string;
  url: string;
  type: "Official documentation" | "Getting started" | "Reference" | "Training";
};

export type Technology = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
  tagline: string;
  summary: string;
  whatItIs: string;
  whyAdminsUseIt: string;
  infrastructureFit: string;
  concepts: string[];
  gettingStarted: string[];
  labRequirements: string;
  labs: { title: string; description: string }[];
  practices: string[];
  resources: TechnologyResource[];
  roadmapStages: string[];
  resourceIds: string[];
  relatedTools: string[];
};

export const technologies: Technology[] = [
  {
    slug: "linux-server",
    name: "Linux Server Administration",
    shortName: "Linux Server",
    category: "Operating Systems",
    level: "Beginner",
    icon: "terminal",
    tagline: "Operate the systems behind web services, cloud platforms and infrastructure.",
    summary: "Learn to install, configure, secure and troubleshoot Linux servers using the shell and the operating system's native administration tools.",
    whatItIs: "Linux is an open-source operating-system kernel used by a wide range of server distributions. Debian, Ubuntu Server and Red Hat Enterprise Linux are common distributions, each packaging the kernel with system utilities, package management and support conventions.",
    whyAdminsUseIt: "Linux is widely used for web servers, application hosting, databases, network services, containers and cloud workloads. Administrators value its automation capabilities, service-management tools, flexibility and strong ecosystem of command-line utilities.",
    infrastructureFit: "Linux commonly runs as a physical server, virtual machine or cloud instance. It may host DNS, web applications, databases, file services, monitoring agents or container workloads. Administrators manage it locally or remotely, usually through SSH.",
    concepts: ["Filesystem hierarchy, mounts and storage", "Users, groups, ownership and permissions", "Package managers such as APT and DNF", "systemd services, targets and journal logs", "SSH, firewall rules and network configuration", "Processes, memory, disks and performance monitoring", "Backups, patching and recovery"],
    gettingStarted: ["Create a disposable Debian or Ubuntu Server virtual machine with 2 virtual CPUs, 2–4 GB RAM and a small virtual disk.", "Install the operating system and create a named administrative account rather than using the root account for routine work.", "Update packages, set the hostname and configure a predictable network identity for the lab.", "Enable SSH, use key-based authentication where possible and restrict access to the lab network.", "Practise inspecting services, logs, storage, users and resource usage before deploying an application."],
    labRequirements: "A hypervisor such as Proxmox VE, Hyper-V, VirtualBox or VMware; a Debian or Ubuntu Server ISO; and a terminal or SSH client. A separate virtual network is recommended for experiments.",
    labs: [
      { title: "Build a baseline Linux server", description: "Install a server VM, create an administrator, apply updates, set the hostname and document its CPU, memory, disk and network configuration." },
      { title: "Deploy and troubleshoot a service", description: "Install a web service, manage it with systemctl, inspect its journal, change its configuration and diagnose a deliberately introduced service failure." },
      { title: "Harden remote administration", description: "Configure SSH keys, review sudo access, apply a host firewall policy and verify that only the required management ports are reachable." }
    ],
    practices: ["Patch regularly and test significant changes in a disposable VM first.", "Use named accounts, sudo and least privilege instead of sharing root access.", "Keep configuration changes documented and maintain tested backups before risky storage or boot changes."],
    resources: [
      { label: "Debian documentation", url: "https://www.debian.org/doc/", type: "Official documentation" },
      { label: "Ubuntu Server documentation", url: "https://documentation.ubuntu.com/server/", type: "Official documentation" },
      { label: "Linux man-pages", url: "https://man7.org/linux/man-pages/", type: "Reference" },
      { label: "Debian Administrator's Handbook", url: "https://www.debian.org/doc/manuals/debian-handbook/", type: "Training" }
    ],
    roadmapStages: ["it-fundamentals", "linux-windows-administration", "infrastructure-operations", "security-automation"],
    resourceIds: ["debian-docs", "ubuntu-server", "linux-man-pages", "debian-handbook", "linux-journey"],
    relatedTools: ["SSH", "systemd", "APT", "UFW", "Bash", "LVM"]
  },
  {
    slug: "windows-server",
    name: "Windows Server Administration",
    shortName: "Windows Server",
    category: "Operating Systems",
    level: "Beginner",
    icon: "server",
    tagline: "Build and maintain the server roles used in Microsoft-based organisations.",
    summary: "Understand Windows Server deployment, roles, storage, networking, remote administration, patching and operational troubleshooting.",
    whatItIs: "Windows Server is Microsoft's server operating-system family. It provides a platform for directory services, DNS, DHCP, file and print services, web workloads, virtualisation and other infrastructure roles.",
    whyAdminsUseIt: "Organisations use Windows Server to provide central identity, policy enforcement, shared resources and business applications. Its management ecosystem integrates with Active Directory, PowerShell, Windows Admin Center and Microsoft cloud services.",
    infrastructureFit: "A Windows Server instance may run on physical hardware, a virtualisation host or a cloud VM. In a domain environment, it can act as a domain controller or provide supporting roles such as DNS, DHCP, file services and certificate services.",
    concepts: ["Server editions, installation options and roles", "Server Manager and Windows Admin Center", "PowerShell administration and remoting", "Storage Spaces, volumes and file permissions", "Windows Firewall and security baselines", "Event Viewer, services and performance monitoring", "Windows Update and backup planning"],
    gettingStarted: ["Create an isolated Windows Server evaluation VM using Microsoft's current evaluation media and licensing terms.", "Set a hostname, static lab IP address and appropriate time settings.", "Use Server Manager or PowerShell to inspect installed roles, features, services and storage.", "Enable secure remote administration for the lab and practise using Windows Admin Center or PowerShell remoting.", "Document a patching, backup and recovery approach before adding production-like roles."],
    labRequirements: "A Windows-capable hypervisor, a Windows Server evaluation image, at least 2 virtual CPUs and 4 GB RAM for a basic lab. More memory is useful when running multiple servers and domain services.",
    labs: [
      { title: "Deploy a member server", description: "Install Windows Server, configure its hostname and network settings, apply updates and record its system inventory." },
      { title: "Configure a file server", description: "Create a shared folder, apply NTFS and share permissions, test access with a standard user and review relevant audit events." },
      { title: "Operate the server remotely", description: "Use PowerShell remoting or Windows Admin Center to inspect services, event logs, disks and Windows updates." }
    ],
    practices: ["Keep server roles limited to the services the machine is intended to provide.", "Separate standard user accounts from privileged administrative accounts.", "Test restore procedures and monitor patch status, event logs and disk capacity."],
    resources: [
      { label: "Windows Server documentation", url: "https://learn.microsoft.com/en-us/windows-server/", type: "Official documentation" },
      { label: "Windows Server administration learning path", url: "https://learn.microsoft.com/en-us/training/paths/windows-server-deployment-configuration-administration/", type: "Training" },
      { label: "Windows Admin Center", url: "https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview", type: "Getting started" }
    ],
    roadmapStages: ["it-fundamentals", "linux-windows-administration", "enterprise-administration", "infrastructure-operations"],
    resourceIds: ["microsoft-server", "windows-server-path", "microsoft-learn", "hybrid-server"],
    relatedTools: ["Server Manager", "Windows Admin Center", "PowerShell", "Event Viewer", "Windows Defender Firewall"]
  },
  {
    slug: "powershell",
    name: "PowerShell Administration",
    shortName: "PowerShell",
    category: "Automation & Scripting",
    level: "Beginner",
    icon: "code",
    tagline: "Automate Windows administration with commands, objects and reusable scripts.",
    summary: "Use PowerShell to inspect systems, manage services and users, automate routine tasks and administer Windows and cloud environments.",
    whatItIs: "PowerShell is a command-line shell and scripting language designed around structured .NET objects. It is available on Windows and, through PowerShell 7, on Linux and macOS as well.",
    whyAdminsUseIt: "It helps administrators perform repeatable tasks consistently, gather system information, manage remote machines and reduce manual work. PowerShell commands pass objects through the pipeline rather than relying only on plain text.",
    infrastructureFit: "PowerShell is used on administrator workstations and Windows servers, in scheduled jobs, deployment scripts and automation pipelines. It also connects to Microsoft 365, Azure and other services through supported modules and APIs.",
    concepts: ["Cmdlets, verbs and command discovery", "Objects, properties and the pipeline", "Variables, arrays, loops and conditions", "Functions, modules and script parameters", "Error handling and logging", "PowerShell remoting and sessions", "Execution policy, signing and script security"],
    gettingStarted: ["Open PowerShell and learn Get-Help, Get-Command and Get-Member.", "Practise reading system information with Get-ComputerInfo, Get-Service and Get-Process.", "Use Where-Object, Select-Object and Sort-Object to filter and format pipeline data.", "Write a small script with parameters, validation and clear output.", "Run scripts against lab machines using an appropriately secured remoting configuration."],
    labRequirements: "Windows 10/11 or Windows Server with PowerShell, plus an optional Windows Server VM for remote administration practice.",
    labs: [
      { title: "Create a system inventory report", description: "Collect hostname, OS version, uptime, disk capacity, memory and running services, then export a CSV report." },
      { title: "Automate service checks", description: "Write a script that checks selected services, records their status and reports failures without making unauthorised changes." },
      { title: "Manage remote lab servers", description: "Configure PowerShell remoting securely and run a read-only health check against two lab servers." }
    ],
    practices: ["Use approved modules and review scripts before running them with elevated privileges.", "Prefer structured objects and explicit error handling over fragile text parsing.", "Keep scripts in version control and never embed passwords, tokens or private keys in source files."],
    resources: [
      { label: "PowerShell documentation", url: "https://learn.microsoft.com/en-us/powershell/", type: "Official documentation" },
      { label: "PowerShell getting started", url: "https://learn.microsoft.com/en-us/powershell/scripting/overview", type: "Getting started" },
      { label: "PowerShell system administration learning path", url: "https://learn.microsoft.com/en-us/training/paths/maintain-system-administration-tasks-windows-powershell/", type: "Training" }
    ],
    roadmapStages: ["linux-windows-administration", "enterprise-administration", "security-automation", "cloud-hybrid"],
    resourceIds: ["powershell-docs", "powershell-basics", "powershell-admin"],
    relatedTools: ["Windows Terminal", "Windows Admin Center", "Active Directory module", "Microsoft Graph PowerShell"]
  },
  {
    slug: "active-directory",
    name: "Active Directory Domain Services",
    shortName: "Active Directory",
    category: "Identity & Access",
    level: "Intermediate",
    icon: "users",
    tagline: "Centralise identity, authentication and policy across a Windows domain.",
    summary: "Learn the directory concepts and operational tasks behind user accounts, groups, domain controllers, Group Policy and domain-joined devices.",
    whatItIs: "Active Directory Domain Services (AD DS) is Microsoft's directory service for Windows domain environments. It stores information about users, computers, groups and other directory objects, and supports authentication and centralised administration.",
    whyAdminsUseIt: "Administrators use AD DS to manage identities at scale, apply access policies, control workstation and server configuration, and support authentication for internal services.",
    infrastructureFit: "AD DS is usually deployed on Windows Server domain controllers. DNS supports service discovery, while replication keeps directory data consistent across domain controllers and sites.",
    concepts: ["Forests, domains, trees and organisational units", "Domain controllers and global catalogues", "Users, groups, computer objects and service accounts", "DNS records and domain controller discovery", "Group Policy Objects and inheritance", "Sites, replication and FSMO roles", "Backups, recovery and privileged access"],
    gettingStarted: ["Build an isolated virtual network with at least one Windows Server VM and one Windows client VM.", "Install AD DS and DNS in the lab, then promote the server to a new test forest.", "Create a small organisational unit structure and test user and group accounts.", "Join the client VM to the test domain and confirm domain sign-in and name resolution.", "Create a simple Group Policy Object and verify its application on the test client."],
    labRequirements: "Two or more VMs are recommended: one Windows Server domain controller and one Windows client. Keep the domain isolated from any real organisation's network and identity systems.",
    labs: [
      { title: "Build a test domain", description: "Install AD DS and DNS, create a new lab forest and verify that the domain controller advertises the expected services." },
      { title: "Model users and access", description: "Create organisational units, security groups and test users. Apply least-privilege group membership and test access to a shared folder." },
      { title: "Apply and troubleshoot Group Policy", description: "Configure a harmless desktop or security setting, run policy-result tools and diagnose why a test policy does or does not apply." }
    ],
    practices: ["Protect domain controllers as critical infrastructure and avoid browsing or routine work from them.", "Use tiered administration and separate privileged accounts.", "Back up AD DS system state and understand authoritative and non-authoritative recovery before a real incident."],
    resources: [
      { label: "AD DS documentation", url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/", type: "Official documentation" },
      { label: "Group Policy overview", url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview", type: "Reference" },
      { label: "Windows Server learning resources", url: "https://learn.microsoft.com/en-us/training/windows/", type: "Training" }
    ],
    roadmapStages: ["enterprise-administration", "security-automation", "cloud-hybrid"],
    resourceIds: ["ad-ds", "microsoft-server", "powershell-admin"],
    relatedTools: ["DNS", "Group Policy", "PowerShell", "Windows Admin Center", "Microsoft Entra ID"]
  },
  {
    slug: "networking-cisco",
    name: "Network Administration & Cisco Networking",
    shortName: "Cisco Networking",
    category: "Networking",
    level: "Beginner",
    icon: "network",
    tagline: "Understand how systems communicate and how networks are segmented and routed.",
    summary: "Build practical knowledge of TCP/IP, subnetting, switching, VLANs, routing, DNS, DHCP, firewalls and network troubleshooting.",
    whatItIs: "Network administration covers the design, configuration and operation of the infrastructure that connects users, servers and services. Cisco IOS is one widely used network operating system for managing routers and switches.",
    whyAdminsUseIt: "SysAdmins need reliable network services to deploy servers, support users, enable remote access and troubleshoot outages. Understanding the network helps distinguish an application problem from a DNS, routing, switching or firewall problem.",
    infrastructureFit: "The network connects endpoints, servers, hypervisors, storage and cloud environments. Switches provide local connectivity, routers move traffic between networks, and services such as DNS and DHCP make systems easier to locate and configure.",
    concepts: ["OSI and TCP/IP models", "IPv4 addressing, CIDR and subnetting", "Ethernet, MAC addresses and ARP", "VLANs, access ports and trunk links", "Static routes and dynamic routing concepts", "DNS, DHCP, NAT and firewalls", "Packet capture and structured troubleshooting"],
    gettingStarted: ["Learn to calculate network and host ranges for common IPv4 prefixes.", "Build a small topology in Packet Tracer or GNS3 with two LANs and a router.", "Configure switch access ports, VLANs and an 802.1Q trunk in a simulator.", "Add DHCP and DNS services, then test connectivity with ping, traceroute and name lookups.", "Capture selected traffic with Wireshark and explain what the packets show."],
    labRequirements: "Cisco Packet Tracer or GNS3, a basic understanding of IP addressing and optionally Wireshark. Use simulated devices before experimenting with physical network equipment.",
    labs: [
      { title: "Design a segmented campus LAN", description: "Create separate management, staff and lab VLANs, assign IP subnets and document the topology and port map." },
      { title: "Configure routing and DHCP", description: "Connect two routed networks, configure DHCP scopes and verify that clients can reach approved remote services." },
      { title: "Troubleshoot a network outage", description: "Introduce an incorrect subnet mask, trunk mismatch or default gateway and use a repeatable process to isolate the fault." }
    ],
    practices: ["Document IP ranges, VLAN IDs, gateway addresses and switch port assignments.", "Use least privilege for management access and avoid exposing device management interfaces to untrusted networks.", "Back up device configurations and make network changes with a rollback plan."],
    resources: [
      { label: "Cisco Networking Academy", url: "https://www.netacad.com/", type: "Training" },
      { label: "Cisco Packet Tracer", url: "https://www.netacad.com/cisco-packet-tracer", type: "Getting started" },
      { label: "GNS3 documentation", url: "https://docs.gns3.com/", type: "Official documentation" },
      { label: "Wireshark documentation", url: "https://www.wireshark.org/docs/", type: "Reference" }
    ],
    roadmapStages: ["networking", "enterprise-administration", "infrastructure-operations", "cloud-hybrid"],
    resourceIds: ["cisco-netacad", "packet-tracer", "gns3", "wireshark", "opnsense"],
    relatedTools: ["Wireshark", "GNS3", "Packet Tracer", "OPNsense", "MikroTik RouterOS"]
  },
  {
    slug: "proxmox-ve",
    name: "Proxmox Virtual Environment",
    shortName: "Proxmox VE",
    category: "Virtualization & Storage",
    level: "Intermediate",
    icon: "boxes",
    tagline: "Run a practical virtualisation platform for servers, services and home labs.",
    summary: "Learn how to deploy and operate Proxmox VE, manage VMs and containers, configure storage and networking, and protect workloads with backups.",
    whatItIs: "Proxmox Virtual Environment is an open-source server virtualisation platform built around KVM virtual machines and Linux containers. It provides a web interface, clustering capabilities, storage integration and backup workflows.",
    whyAdminsUseIt: "It allows administrators to consolidate workloads, create isolated test environments, allocate compute resources and manage virtual infrastructure from one interface. It is also a popular platform for learning server operations in a home lab.",
    infrastructureFit: "Proxmox VE is installed on a physical host. It runs virtual machines and containers, connects them to virtual bridges and physical networks, and stores their disks on supported local or shared storage backends.",
    concepts: ["KVM virtual machines and LXC containers", "CPU, RAM and virtual hardware allocation", "Linux bridges, VLAN-aware networking and firewalling", "Directory, LVM-thin, ZFS and shared storage concepts", "Snapshots, backups and restore testing", "Cluster quorum, migration and high availability", "Host updates, logs and hardware monitoring"],
    gettingStarted: ["Check hardware compatibility, CPU virtualisation support, storage health and memory capacity before installation.", "Install Proxmox VE on a dedicated lab host or nested virtual machine for initial exploration.", "Configure a management address, DNS and a Linux bridge connected to the lab network.", "Create one Linux VM and one unprivileged LXC container, then compare their use cases.", "Configure scheduled backups and perform a restore test before relying on the host."],
    labRequirements: "A spare x86-64 computer with hardware virtualisation enabled is ideal. For a small lab, 16 GB RAM and SSD storage provide a more comfortable experience; nested virtualisation can be used for learning the interface when dedicated hardware is unavailable.",
    labs: [
      { title: "Build a virtualisation host", description: "Install Proxmox VE, configure management networking and storage, and record host hardware and network settings." },
      { title: "Create an isolated server lab", description: "Deploy Linux and Windows VMs plus an LXC container, then connect them through a dedicated virtual network." },
      { title: "Practise backup and recovery", description: "Schedule a VM backup, make a controlled change, restore the backup and verify service and data integrity." }
    ],
    practices: ["Do not treat snapshots as a substitute for independent backups.", "Keep the management interface on a trusted network and protect privileged accounts with strong authentication.", "Monitor storage health and capacity; test restores before making a backup plan part of your recovery strategy."],
    resources: [
      { label: "Proxmox VE documentation", url: "https://pve.proxmox.com/pve-docs/", type: "Official documentation" },
      { label: "Proxmox VE administration guide", url: "https://pve.proxmox.com/pve-docs/pve-admin-guide.html", type: "Reference" },
      { label: "Proxmox training", url: "https://www.proxmox.com/en/proxmox-virtual-environment/training", type: "Training" }
    ],
    roadmapStages: ["infrastructure-operations", "security-automation", "advanced-engineering"],
    resourceIds: ["proxmox-docs", "proxmox-training"],
    relatedTools: ["KVM", "LXC", "ZFS", "Ceph", "Proxmox Backup Server"]
  },
  {
    slug: "docker",
    name: "Docker & Container Administration",
    shortName: "Docker",
    category: "Containers & Orchestration",
    level: "Intermediate",
    icon: "package",
    tagline: "Package applications and their dependencies into portable containers.",
    summary: "Understand images, containers, networks, volumes and Compose, then learn how to operate containerised applications safely.",
    whatItIs: "Docker is a platform and ecosystem for building, distributing and running container images. Containers use operating-system-level isolation to run application processes with their dependencies in a consistent environment.",
    whyAdminsUseIt: "Containers make application deployments more repeatable, simplify dependency management and help separate services. Administrators use Docker to run internal tools, databases, monitoring stacks and application workloads.",
    infrastructureFit: "Docker Engine runs on a Linux host or supported desktop environment. Containers share the host kernel and connect through virtual networks, while persistent data is stored in volumes or mounted directories.",
    concepts: ["Images, layers, registries and tags", "Containers, lifecycle and resource limits", "Dockerfiles and image builds", "Bridge networks, published ports and DNS", "Volumes, bind mounts and data persistence", "Docker Compose and multi-container applications", "Secrets, least privilege and image vulnerability management"],
    gettingStarted: ["Install Docker Engine or Docker Desktop using the official instructions for your operating system.", "Run a simple test container and inspect its logs, ports and lifecycle.", "Build a small image from a Dockerfile and use a specific version tag.", "Create a Compose file for an application and its supporting database.", "Persist application data in a named volume and test what happens when the container is recreated."],
    labRequirements: "A Linux VM or supported desktop operating system with Docker installed. Start with 2–4 GB RAM and avoid exposing lab services directly to the public internet.",
    labs: [
      { title: "Containerise a small web service", description: "Build an image for a simple web application, run it with a published port and inspect its logs and resource use." },
      { title: "Deploy a Compose stack", description: "Use Docker Compose to run a web service and database on a private network with persistent storage." },
      { title: "Recover a containerised service", description: "Recreate a container, restore its persistent volume from a backup and verify the application can use its data." }
    ],
    practices: ["Use trusted base images, pin versions and rebuild images to include security updates.", "Avoid running containers as root when the application supports a non-root user.", "Do not store credentials in Dockerfiles or commit environment files containing secrets."],
    resources: [
      { label: "Docker documentation", url: "https://docs.docker.com/", type: "Official documentation" },
      { label: "Docker getting started", url: "https://docs.docker.com/get-started/", type: "Getting started" },
      { label: "Docker Compose documentation", url: "https://docs.docker.com/compose/", type: "Reference" }
    ],
    roadmapStages: ["infrastructure-operations", "security-automation", "advanced-engineering"],
    resourceIds: ["docker-docs", "play-docker"],
    relatedTools: ["Docker Compose", "Podman", "Container registries", "BuildKit", "Kubernetes"]
  },
  {
    slug: "kubernetes",
    name: "Kubernetes Administration",
    shortName: "Kubernetes",
    category: "Containers & Orchestration",
    level: "Advanced",
    icon: "workflow",
    tagline: "Operate containerised applications across a cluster of machines.",
    summary: "Explore cluster architecture, workloads, networking, storage, configuration, access control and operational troubleshooting.",
    whatItIs: "Kubernetes is an open-source platform for orchestrating containerised workloads. It schedules containers onto cluster nodes and provides declarative APIs for managing application deployments and related resources.",
    whyAdminsUseIt: "It helps teams deploy and scale applications consistently, recover workloads after failures, manage service discovery and standardise application operations across environments.",
    infrastructureFit: "A Kubernetes cluster contains a control plane and worker nodes. Workloads run in Pods, are managed by controllers and communicate through cluster networking and Services. Persistent data can be supplied through storage classes and persistent volumes.",
    concepts: ["Control plane, nodes and cluster components", "Pods, Deployments, ReplicaSets and StatefulSets", "Services, DNS, Ingress and network policies", "ConfigMaps, Secrets and service accounts", "Persistent volumes and storage classes", "RBAC, namespaces and admission controls", "Probes, resource requests, limits and observability"],
    gettingStarted: ["Learn container fundamentals and Linux networking before attempting cluster administration.", "Create a disposable local cluster with a supported learning tool such as kind or minikube.", "Deploy a simple application using a Deployment and expose it with a Service.", "Inspect Pods, events, logs and rollout status using kubectl.", "Delete and recreate workloads to understand declarative desired state and recovery behaviour."],
    labRequirements: "A Linux or Windows workstation with a container runtime and enough memory for a local cluster. Start with a single-node learning cluster; multi-node labs require additional CPU and RAM.",
    labs: [
      { title: "Deploy and expose an application", description: "Create a namespace, deploy a container image, expose it through a Service and inspect how cluster DNS resolves it." },
      { title: "Configure health and rollout behaviour", description: "Add readiness and liveness probes, perform a rolling update and roll back a deliberately faulty release." },
      { title: "Investigate a failing workload", description: "Use events, logs, resource metrics and describe output to diagnose image, scheduling, configuration or connectivity problems." }
    ],
    practices: ["Do not expose the Kubernetes API server or dashboards publicly without a deliberate security design.", "Use namespaces, RBAC and network policies to separate workloads and permissions.", "Plan upgrades, backups of cluster state and persistent data recovery before production use."],
    resources: [
      { label: "Kubernetes documentation", url: "https://kubernetes.io/docs/home/", type: "Official documentation" },
      { label: "Kubernetes tutorials", url: "https://kubernetes.io/docs/tutorials/", type: "Getting started" },
      { label: "Kubernetes concepts", url: "https://kubernetes.io/docs/concepts/", type: "Reference" }
    ],
    roadmapStages: ["advanced-engineering", "infrastructure-operations", "cloud-hybrid"],
    resourceIds: ["kubernetes-tutorials", "kubernetes-training", "docker-docs"],
    relatedTools: ["kubectl", "Helm", "kind", "minikube", "Prometheus"]
  },
  {
    slug: "ansible",
    name: "Ansible Automation",
    shortName: "Ansible",
    category: "Automation & Scripting",
    level: "Intermediate",
    icon: "workflow",
    tagline: "Configure multiple systems consistently with readable automation.",
    summary: "Use inventories, playbooks, modules, variables and roles to automate server configuration and routine operational tasks.",
    whatItIs: "Ansible is an open-source automation engine used for configuration management, application deployment and orchestration. It commonly connects to Linux hosts over SSH and Windows hosts through supported remoting mechanisms.",
    whyAdminsUseIt: "It reduces repetitive manual configuration, makes changes reviewable and helps keep many servers in a known state. Its YAML playbooks are relatively approachable for administrators learning infrastructure automation.",
    infrastructureFit: "Ansible typically runs from a control node and manages remote machines listed in an inventory. It can configure operating systems, deploy services, manage users and coordinate multi-step infrastructure tasks.",
    concepts: ["Control node and managed nodes", "Static and dynamic inventories", "Ad hoc commands and modules", "Playbooks, tasks, handlers and variables", "Roles, collections and templates", "Idempotency and check mode", "Vault, credentials and execution environments"],
    gettingStarted: ["Prepare a Linux control node and two disposable managed Linux VMs.", "Create SSH access using dedicated lab credentials and verify connectivity before changing configuration.", "Define an inventory and run a read-only ad hoc command to gather system facts.", "Write a playbook that creates a directory or installs a package, then run it twice to observe idempotent behaviour.", "Move reusable tasks into a role and keep the playbooks in Git."],
    labRequirements: "A Linux control node with Ansible installed, SSH access and one or more disposable Linux VMs. Use a separate lab inventory and never test against production hosts by accident.",
    labs: [
      { title: "Build an inventory and gather facts", description: "Define host groups for two Linux VMs and collect operating-system, network and hardware facts." },
      { title: "Configure a standard server baseline", description: "Create an idempotent playbook to install updates, create an administrator group and configure a basic service." },
      { title: "Create a reusable role", description: "Convert repeated tasks into a role, use variables for environment differences and store the project in version control." }
    ],
    practices: ["Use check mode and review diffs before applying significant changes.", "Keep inventories environment-specific and protect secrets with Ansible Vault or an approved secret manager.", "Make playbooks idempotent and test them against disposable systems before wider rollout."],
    resources: [
      { label: "Ansible getting started", url: "https://docs.ansible.com/ansible/latest/getting_started/index.html", type: "Getting started" },
      { label: "Ansible documentation", url: "https://docs.ansible.com/ansible/latest/index.html", type: "Official documentation" },
      { label: "Ansible playbooks guide", url: "https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html", type: "Reference" }
    ],
    roadmapStages: ["security-automation", "infrastructure-operations", "advanced-engineering"],
    resourceIds: ["ansible-start", "ansible-docs", "github-skills"],
    relatedTools: ["SSH", "Git", "Jinja2", "Ansible Vault", "AWX"]
  },
  {
    slug: "terraform",
    name: "Terraform & Infrastructure as Code",
    shortName: "Terraform",
    category: "Automation & Scripting",
    level: "Advanced",
    icon: "code",
    tagline: "Describe infrastructure declaratively and manage changes through code.",
    summary: "Learn providers, resources, variables, state and plans to provision infrastructure in a controlled and repeatable way.",
    whatItIs: "Terraform is an infrastructure-as-code tool that uses declarative configuration to create and manage infrastructure through provider APIs. It can work with cloud platforms, virtualisation systems and many other services.",
    whyAdminsUseIt: "It makes infrastructure definitions reviewable, repeatable and easier to reproduce. Plans help administrators understand proposed changes before applying them, while modules encourage reuse.",
    infrastructureFit: "Terraform runs from a workstation or automation pipeline and communicates with providers such as cloud platforms or infrastructure services. Its state tracks managed resources and must be protected as operational data.",
    concepts: ["Providers, resources and data sources", "HCL configuration and expressions", "Variables, outputs and locals", "State files, backends and locking", "Plans, applies and drift", "Modules and reusable patterns", "Secrets, credentials and lifecycle management"],
    gettingStarted: ["Install Terraform using the official instructions and select a provider suitable for a safe lab.", "Start with a local or low-cost test environment and read the provider's authentication guidance.", "Define one small resource, initialise the working directory and inspect the execution plan.", "Apply the configuration only after reviewing the plan and understanding potential costs.", "Destroy disposable resources when finished and protect any state file that contains sensitive data."],
    labRequirements: "A workstation with Terraform installed and a provider account or local test provider. For cloud labs, configure budgets, cost alerts and least-privilege credentials before provisioning anything billable.",
    labs: [
      { title: "Create a first infrastructure definition", description: "Use a safe provider to declare a small resource, review the plan and explain what Terraform intends to change." },
      { title: "Build a reusable module", description: "Refactor repeated configuration into a module with input variables and outputs." },
      { title: "Practise state and change review", description: "Inspect state, introduce a configuration change, review the plan and document how state is stored and protected." }
    ],
    practices: ["Never commit state files, credentials or secrets to a public repository.", "Use remote state with access controls and locking for collaborative environments.", "Review every plan and understand resource replacement or deletion before applying it."],
    resources: [
      { label: "Terraform tutorials", url: "https://developer.hashicorp.com/terraform/tutorials", type: "Getting started" },
      { label: "Terraform language documentation", url: "https://developer.hashicorp.com/terraform/language", type: "Official documentation" },
      { label: "Terraform CLI documentation", url: "https://developer.hashicorp.com/terraform/cli", type: "Reference" }
    ],
    roadmapStages: ["security-automation", "cloud-hybrid", "advanced-engineering"],
    resourceIds: ["terraform", "aws-overview", "azure-admin"],
    relatedTools: ["Ansible", "Git", "OpenTofu", "Packer", "Cloud provider CLI"]
  },
  {
    slug: "git",
    name: "Git & Configuration Version Control",
    shortName: "Git",
    category: "Automation & Scripting",
    level: "Beginner",
    icon: "git-branch",
    tagline: "Track configuration changes and collaborate safely on infrastructure code.",
    summary: "Learn repositories, commits, branches, remotes and review workflows for scripts, configuration files and infrastructure projects.",
    whatItIs: "Git is a distributed version control system. It records changes to files in a repository, allowing users to inspect history, create branches, compare revisions and collaborate through remote hosting services.",
    whyAdminsUseIt: "System administrators use Git to version scripts, Ansible playbooks, Terraform definitions, documentation and configuration templates. It creates an audit-friendly history and supports review before changes are deployed.",
    infrastructureFit: "Git is used from administrator workstations and automation runners. Repositories are commonly hosted on platforms such as GitHub, GitLab or an organisation's internal Git service.",
    concepts: ["Repositories, working tree and staging area", "Commits, history and diffs", "Branches, merges and conflict resolution", "Remotes, fetch, pull and push", "Pull requests and code review", ".gitignore and repository hygiene", "SSH keys, tokens and secret handling"],
    gettingStarted: ["Install Git and configure a display name and email appropriate for your repository activity.", "Create a private practice repository for scripts and documentation.", "Make small changes, inspect the diff and commit with clear messages.", "Create a branch for a change, merge it and resolve a deliberate conflict.", "Connect to a remote repository using an SSH key or supported token-based authentication."],
    labRequirements: "A workstation with Git installed and an account on a Git hosting service. Use a private repository for personal infrastructure notes and never upload credentials or sensitive configuration.",
    labs: [
      { title: "Version a server build guide", description: "Create a repository containing a README, network diagram source and a safe server configuration checklist." },
      { title: "Review an automation change", description: "Create a branch, modify an Ansible playbook, inspect the diff and merge after a review." },
      { title: "Recover a previous configuration", description: "Use Git history to identify a change, compare revisions and restore a known-good version of a non-secret configuration file." }
    ],
    practices: ["Commit small, understandable changes and write messages that explain intent.", "Use .gitignore and secret scanning; never commit passwords, API keys, private keys or production state.", "Use branches and reviews for changes that could affect shared infrastructure."],
    resources: [
      { label: "Pro Git book", url: "https://git-scm.com/book/en/v2", type: "Training" },
      { label: "Git reference documentation", url: "https://git-scm.com/docs", type: "Official documentation" },
      { label: "GitHub Skills", url: "https://skills.github.com/", type: "Getting started" }
    ],
    roadmapStages: ["security-automation", "advanced-engineering"],
    resourceIds: ["github-skills", "ansible-docs", "terraform"],
    relatedTools: ["GitHub", "GitLab", "Gitea", "SSH", "pre-commit"]
  },
  {
    slug: "nagios",
    name: "Nagios Infrastructure Monitoring",
    shortName: "Nagios",
    category: "Monitoring & Observability",
    level: "Intermediate",
    icon: "activity",
    tagline: "Detect service and host problems before they become prolonged outages.",
    summary: "Monitor host availability, service health and thresholds, then build alerting and operational checks around meaningful signals.",
    whatItIs: "Nagios Core is an open-source monitoring and alerting engine. It checks hosts and services through plugins, evaluates results against configured thresholds and can notify administrators when a state changes.",
    whyAdminsUseIt: "Monitoring helps teams discover outages, capacity problems and failed services. Nagios is useful for learning host and service checks, alert states, plugin-based monitoring and escalation concepts.",
    infrastructureFit: "A Nagios server polls or receives check results from monitored hosts and services. Plugins perform checks such as ping, disk usage, HTTP response or remote agent queries; notifications can be routed to responsible operators.",
    concepts: ["Hosts, services and host groups", "Plugins, commands and check intervals", "OK, WARNING, CRITICAL and UNKNOWN states", "NRPE and agent-based remote checks", "Notifications, contacts and escalation", "Configuration validation and object relationships", "Availability reports and alert fatigue"],
    gettingStarted: ["Install Nagios Core in a dedicated Linux VM using the official installation guidance for your distribution.", "Start by monitoring localhost and validate the core service and plugin paths.", "Add one lab host and a small set of low-risk checks such as ping, disk and HTTP.", "Introduce a controlled test failure and confirm that the state changes and notification path work.", "Document check intervals, thresholds, ownership and the action expected when an alert fires."],
    labRequirements: "A Linux VM for Nagios Core and one or more disposable Linux or Windows test machines. Remote checks may require an agent, plugin or firewall configuration appropriate to the selected method.",
    labs: [
      { title: "Monitor a Linux host", description: "Configure host availability, CPU or load, disk and service checks, then validate each result against the target machine." },
      { title: "Add a Windows server", description: "Set up a supported Windows monitoring agent in a lab, configure remote checks and troubleshoot connectivity or plugin errors." },
      { title: "Design useful alerts", description: "Tune warning and critical thresholds, configure contacts and document the first response for each alert." }
    ],
    practices: ["Monitor services from the perspective of users, not only whether a process is running.", "Tune thresholds and notification frequency to avoid alert fatigue.", "Restrict monitoring interfaces and agent access to trusted management networks."],
    resources: [
      { label: "Nagios Core documentation", url: "https://www.nagios.org/documentation/", type: "Official documentation" },
      { label: "Nagios Core project", url: "https://github.com/NagiosEnterprises/nagioscore", type: "Reference" },
      { label: "Nagios Exchange plugins", url: "https://exchange.nagios.org/", type: "Reference" }
    ],
    roadmapStages: ["infrastructure-operations", "security-automation", "advanced-engineering"],
    resourceIds: ["nagios", "linux-man-pages"],
    relatedTools: ["NRPE", "NSClient++", "Monitoring Plugins", "Prometheus", "Zabbix"]
  },
  {
    slug: "prometheus-grafana",
    name: "Prometheus & Grafana Observability",
    shortName: "Prometheus + Grafana",
    category: "Monitoring & Observability",
    level: "Intermediate",
    icon: "chart",
    tagline: "Collect metrics, visualise system health and investigate performance trends.",
    summary: "Build a metrics pipeline with Prometheus and create dashboards and alerts with Grafana for hosts, applications and services.",
    whatItIs: "Prometheus is a monitoring system and time-series database that collects metrics, commonly by scraping HTTP endpoints. Grafana is an analytics and visualisation platform that can query Prometheus and many other data sources.",
    whyAdminsUseIt: "Metrics reveal trends in CPU, memory, disk, network and application behaviour. Dashboards make system health easier to understand, while alerts can notify operators when a meaningful condition persists.",
    infrastructureFit: "Prometheus collects metrics from targets such as Node Exporter and application exporters. Grafana queries the stored metrics to present dashboards and can evaluate alert rules or integrate with external notification systems.",
    concepts: ["Time-series metrics, labels and scrape targets", "PromQL queries and recording rules", "Exporters and instrumentation", "Grafana data sources, dashboards and panels", "Alert rules, evaluation and notification policies", "Retention, storage and scaling considerations", "Metrics versus logs versus traces"],
    gettingStarted: ["Deploy Prometheus and Grafana in a disposable Linux VM or a small Docker Compose lab.", "Add a host metrics exporter and confirm that Prometheus can scrape its endpoint.", "Query basic CPU, memory, filesystem and network metrics using PromQL.", "Connect Grafana to Prometheus and build a dashboard for the lab host.", "Create a test alert with a clear condition and verify the notification path."],
    labRequirements: "A Linux VM or Docker-capable host with enough memory for Prometheus, Grafana and one or more exporters. Keep the web interfaces private to the lab network.",
    labs: [
      { title: "Collect host metrics", description: "Deploy Prometheus and Node Exporter, add a scrape target and confirm that metrics are arriving." },
      { title: "Build an operations dashboard", description: "Create Grafana panels for CPU, memory, disk and network utilisation with useful labels and time ranges." },
      { title: "Create and test an alert", description: "Define a threshold-based alert, trigger a safe test condition and document how an operator should respond." }
    ],
    practices: ["Choose alerts that indicate actionable symptoms rather than alerting on every metric fluctuation.", "Protect dashboards and metric endpoints; they can expose internal infrastructure details.", "Plan retention and storage capacity as the number of targets and metrics grows."],
    resources: [
      { label: "Prometheus overview", url: "https://prometheus.io/docs/introduction/overview/", type: "Official documentation" },
      { label: "Prometheus getting started", url: "https://prometheus.io/docs/prometheus/latest/getting_started/", type: "Getting started" },
      { label: "Grafana documentation", url: "https://grafana.com/docs/grafana/latest/", type: "Official documentation" }
    ],
    roadmapStages: ["infrastructure-operations", "security-automation", "advanced-engineering"],
    resourceIds: ["prometheus", "grafana"],
    relatedTools: ["Node Exporter", "Alertmanager", "Loki", "OpenTelemetry", "Nagios"]
  },
  {
    slug: "postgresql",
    name: "PostgreSQL Database Operations",
    shortName: "PostgreSQL",
    category: "Infrastructure Services",
    level: "Intermediate",
    icon: "database",
    tagline: "Operate a reliable relational database service for applications and internal systems.",
    summary: "Understand database roles, access control, backups, storage, logs, performance and routine PostgreSQL administration.",
    whatItIs: "PostgreSQL is an open-source relational database management system. It stores structured data and provides SQL, transactions, indexing, replication options and a mature extension ecosystem.",
    whyAdminsUseIt: "Administrators deploy and maintain PostgreSQL for web applications, internal services and business systems. Database operations include managing access, monitoring health, protecting data and ensuring that recovery procedures work.",
    infrastructureFit: "PostgreSQL can run on a dedicated server, virtual machine, container or managed cloud database service. Applications connect over a network using database roles and controlled credentials.",
    concepts: ["Clusters, databases, schemas and tables", "Roles, privileges and authentication", "Connections, ports and pg_hba.conf", "WAL, checkpoints and transaction behaviour", "Indexes, query plans and vacuum", "Logical and physical backups", "Replication, monitoring and recovery"],
    gettingStarted: ["Install PostgreSQL on a disposable Linux VM using the distribution's supported packages or the official project guidance.", "Create a dedicated database role and database for a test application.", "Restrict network access and configure authentication deliberately rather than opening the service broadly.", "Practise using psql to inspect roles, databases, connections and server settings.", "Create a backup, restore it into a separate test database and verify the restored data."],
    labRequirements: "A Linux VM or container host with PostgreSQL installed, a terminal with psql and a separate test database. Never use production data in a learning environment.",
    labs: [
      { title: "Deploy a database service", description: "Install PostgreSQL, create a database and least-privilege role, and test a local application connection." },
      { title: "Back up and restore data", description: "Use pg_dump and pg_restore for a test database, restore it under a different name and verify the records." },
      { title: "Investigate a slow query", description: "Use EXPLAIN to inspect a query plan, add an appropriate index and compare the plan before and after." }
    ],
    practices: ["Use separate roles for applications and administrators, granting only required privileges.", "Keep backups separate from the database host and test restores regularly.", "Monitor connections, storage, logs, replication health and long-running queries."],
    resources: [
      { label: "PostgreSQL documentation", url: "https://www.postgresql.org/docs/current/", type: "Official documentation" },
      { label: "PostgreSQL tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html", type: "Getting started" },
      { label: "PostgreSQL backup and restore", url: "https://www.postgresql.org/docs/current/backup.html", type: "Reference" }
    ],
    roadmapStages: ["infrastructure-operations", "security-automation", "cloud-hybrid"],
    resourceIds: ["debian-docs", "ubuntu-server", "microsoft-learn"],
    relatedTools: ["psql", "pg_dump", "pg_restore", "pgAdmin", "Prometheus exporters"]
  },
  {
    slug: "microsoft-azure",
    name: "Microsoft Azure Administration",
    shortName: "Microsoft Azure",
    category: "Cloud Platforms",
    level: "Intermediate",
    icon: "cloud",
    tagline: "Manage compute, networking, identity and governance in Microsoft's cloud.",
    summary: "Learn the core Azure services and operational practices needed to administer cloud resources and hybrid environments.",
    whatItIs: "Microsoft Azure is a public cloud platform offering infrastructure, platform and managed services. Administrators use its portal, command-line tools, APIs and automation interfaces to deploy and operate resources.",
    whyAdminsUseIt: "Azure supports virtual machines, virtual networks, storage, identity integration, monitoring and managed services. It is especially relevant where organisations already use Microsoft identity and Windows Server technologies.",
    infrastructureFit: "Azure resources are organised through tenants, management groups, subscriptions and resource groups. Virtual networks connect workloads, role-based access control governs permissions and monitoring services provide operational visibility.",
    concepts: ["Tenants, subscriptions and resource groups", "Azure Resource Manager and resource providers", "Virtual networks, subnets, NSGs and private connectivity", "Virtual machines, disks and storage accounts", "Microsoft Entra ID and role-based access control", "Azure Monitor, alerts and activity logs", "Budgets, tagging, policy and cost management"],
    gettingStarted: ["Create or use an authorised learning subscription and review its spending limits before deploying resources.", "Explore the portal and identify subscriptions, resource groups, regions and available quotas.", "Deploy a small test resource group and a low-cost learning resource, checking its pricing first.", "Configure access using least-privilege role assignments and review activity logs.", "Delete lab resources when finished and confirm that no billable resources remain."],
    labRequirements: "An Azure account with an authorised subscription. Check current free-tier eligibility, regional availability and pricing; set a budget alert before creating billable resources.",
    labs: [
      { title: "Build a small cloud network", description: "Create a virtual network and subnet, deploy a test VM and restrict management access to a trusted source." },
      { title: "Configure identity and access", description: "Review role-based access control, assign a limited role to a test identity and inspect sign-in and activity logs." },
      { title: "Monitor and control cloud costs", description: "Create resource tags and a budget alert, inspect usage and remove the test environment after the lab." }
    ],
    practices: ["Apply least privilege and use strong authentication for administrative identities.", "Use budgets, tags and policy controls to reduce unexpected costs and configuration drift.", "Prefer private connectivity and managed identities over exposed services and embedded credentials."],
    resources: [
      { label: "Azure documentation", url: "https://learn.microsoft.com/en-us/azure/", type: "Official documentation" },
      { label: "Azure administrator learning", url: "https://learn.microsoft.com/en-us/training/paths/az-104-administrator-prerequisites/", type: "Training" },
      { label: "Azure architecture centre", url: "https://learn.microsoft.com/en-us/azure/architecture/", type: "Reference" }
    ],
    roadmapStages: ["cloud-hybrid", "security-automation", "advanced-engineering"],
    resourceIds: ["azure-admin", "az104", "microsoft-learn", "hybrid-server"],
    relatedTools: ["Azure CLI", "Azure PowerShell", "Microsoft Entra ID", "Azure Monitor", "Azure Arc"]
  },
  {
    slug: "amazon-web-services",
    name: "Amazon Web Services Administration",
    shortName: "Amazon Web Services",
    category: "Cloud Platforms",
    level: "Intermediate",
    icon: "cloud",
    tagline: "Operate cloud infrastructure using AWS compute, network, storage and identity services.",
    summary: "Build a foundation in AWS accounts, IAM, EC2, VPC, storage, monitoring, cost controls and infrastructure operations.",
    whatItIs: "Amazon Web Services (AWS) is a public cloud platform offering infrastructure and managed services across compute, networking, storage, databases, security and application delivery.",
    whyAdminsUseIt: "AWS allows teams to provision infrastructure on demand, scale workloads and use managed services without operating every underlying component. SysAdmins are responsible for secure access, network design, patching, monitoring and cost control.",
    infrastructureFit: "AWS resources are deployed within an account and region. Identity and Access Management controls permissions, VPCs provide network boundaries, EC2 supplies virtual servers and services such as CloudWatch support monitoring.",
    concepts: ["AWS accounts, regions and availability zones", "IAM users, roles, policies and federation", "VPCs, subnets, route tables and security groups", "EC2 instances, AMIs and EBS volumes", "S3 buckets, lifecycle and access policies", "CloudWatch metrics, logs and alarms", "Budgets, tagging and shared responsibility"],
    gettingStarted: ["Create or use an authorised AWS learning account and secure the root identity with MFA.", "Set a budget and review service pricing, free-tier limits and regional charges before launching resources.", "Learn IAM roles and policies before creating long-lived access keys.", "Deploy a small EC2 lab instance in a controlled VPC with restricted inbound access.", "Stop or delete the lab resources and verify billing and resource inventories afterwards."],
    labRequirements: "An AWS account with billing access and permission to create lab resources. Enable MFA, create a budget, use least-privilege identities and check current pricing before every cloud exercise.",
    labs: [
      { title: "Create a secure EC2 lab", description: "Launch a small instance in a test VPC, restrict inbound access and connect using an approved secure method." },
      { title: "Design basic VPC connectivity", description: "Create public and private subnets, route tables and security groups, then document the permitted traffic paths." },
      { title: "Monitor and clean up resources", description: "Review CloudWatch metrics and billing tools, then remove or stop all lab resources that are no longer needed." }
    ],
    practices: ["Protect the root account, use MFA and perform daily administration through least-privilege roles.", "Avoid public access by default and review security groups and bucket policies carefully.", "Set budgets and clean up resources after labs; free-tier limits and pricing can change."],
    resources: [
      { label: "AWS documentation", url: "https://docs.aws.amazon.com/", type: "Official documentation" },
      { label: "AWS Skill Builder", url: "https://skillbuilder.aws/", type: "Training" },
      { label: "AWS getting started", url: "https://aws.amazon.com/getting-started/", type: "Getting started" }
    ],
    roadmapStages: ["cloud-hybrid", "security-automation", "advanced-engineering"],
    resourceIds: ["aws-overview", "aws-skillbuilder", "aws-training-faq"],
    relatedTools: ["AWS CLI", "IAM", "EC2", "VPC", "CloudWatch", "Systems Manager"]
  }
];

export function getTechnologyBySlug(slug: string) {
  return technologies.find((technology) => technology.slug === slug);
}
