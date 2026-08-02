// UPHSL BITCF - Cybersecurity & Forensics Specialization
// Each topic can be learned in any programming language the user picks

export interface SpecModule {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  concepts: string[];
  subLessons: string[]; // Pre-built list of sub-topics within this module
}

export const cybersecModules: SpecModule[] = [
  // FUNDAMENTALS
  {
    id: "cs-networking-basics",
    title: "Networking Fundamentals",
    category: "fundamentals",
    difficulty: "EASY",
    description: "Understand how computers communicate — TCP/IP, ports, protocols, and packet structure.",
    concepts: ["TCP/IP model", "ports and services", "HTTP/HTTPS", "DNS resolution", "packet structure"],
    subLessons: ["What is TCP/IP?","Understanding Ports & Services","HTTP vs HTTPS Deep Dive","How DNS Resolution Works","Packet Structure & Wireshark Intro"],
  },
  {
    id: "cs-crypto-basics",
    title: "Cryptography Basics",
    category: "fundamentals",
    difficulty: "EASY",
    description: "Learn encryption, hashing, and how data is secured in transit and at rest.",
    concepts: ["symmetric vs asymmetric encryption", "hashing (SHA, MD5)", "digital signatures", "SSL/TLS", "key exchange"],
    subLessons: ["Symmetric Encryption (AES)","Asymmetric Encryption (RSA)","Hashing Algorithms (SHA, MD5)","Digital Signatures & Certificates","SSL/TLS Handshake Explained"],
  },
  {
    id: "cs-linux-cli",
    title: "Linux Command Line for Security",
    category: "fundamentals",
    difficulty: "EASY",
    description: "Master the terminal — the hacker's primary tool for navigation, recon, and exploitation.",
    concepts: ["file system navigation", "permissions", "grep/find", "process management", "networking commands (netstat, ss, curl)"],
    subLessons: ["File System Navigation & Permissions","grep, find, and Text Processing","Process Management (ps, kill, top)","Networking Commands (netstat, ss, curl)","Bash Scripting for Automation"],
  },
  {
    id: "cs-python-security",
    title: "Python for Security Scripting",
    category: "fundamentals",
    difficulty: "EASY",
    description: "Write security tools and automation scripts using Python — the language of hackers.",
    concepts: ["socket programming", "HTTP requests", "file manipulation", "subprocess calls", "argument parsing"],
    subLessons: ["Socket Programming Basics","Making HTTP Requests (requests lib)","File & System Manipulation","Subprocess & OS Commands","Building CLI Security Tools"],
  },

  // OFFENSE (Ethical Hacking)
  {
    id: "cs-recon",
    title: "Reconnaissance & Information Gathering",
    category: "offense",
    difficulty: "MEDIUM",
    description: "Discover targets — footprinting, OSINT, DNS enumeration, and network mapping.",
    concepts: ["OSINT techniques", "DNS enumeration", "subdomain discovery", "WHOIS lookup", "Shodan/Censys"],
    subLessons: ["OSINT Techniques & Tools","DNS Enumeration & Zone Transfers","Subdomain Discovery Methods","WHOIS & IP Range Mapping","Using Shodan & Censys"],
  },
  {
    id: "cs-port-scanning",
    title: "Port Scanning & Service Detection",
    category: "offense",
    difficulty: "MEDIUM",
    description: "Build your own port scanner and learn how Nmap works under the hood.",
    concepts: ["TCP connect scan", "SYN scan", "UDP scanning", "banner grabbing", "service fingerprinting"],
    subLessons: ["TCP Connect Scan","SYN Scan (Stealth Scan)","UDP Scanning Techniques","Banner Grabbing & Service ID","Building Your Own Port Scanner"],
  },
  {
    id: "cs-password-cracking",
    title: "Password Cracking & Brute Force",
    category: "offense",
    difficulty: "MEDIUM",
    description: "Understand how passwords are stored and cracked — dictionary attacks, rainbow tables, hashcat.",
    concepts: ["hash cracking", "dictionary attacks", "brute force", "rainbow tables", "salting", "bcrypt/argon2"],
    subLessons: ["How Passwords Are Stored (Hashes)","Dictionary Attacks","Brute Force Techniques","Rainbow Tables Explained","Modern Hashing (bcrypt, argon2)"],
  },
  {
    id: "cs-sql-injection",
    title: "SQL Injection Attacks",
    category: "offense",
    difficulty: "MEDIUM",
    description: "Exploit vulnerable databases — learn how SQL injection works and how to test for it.",
    concepts: ["classic SQLi", "blind SQLi", "union-based injection", "error-based injection", "automated tools (sqlmap)"],
    subLessons: ["Classic SQL Injection","Blind SQL Injection","Union-Based Injection","Error-Based Injection","Automated Testing with sqlmap"],
  },
  {
    id: "cs-xss",
    title: "Cross-Site Scripting (XSS)",
    category: "offense",
    difficulty: "HARD",
    description: "Inject malicious scripts into web pages — reflected, stored, and DOM-based XSS.",
    concepts: ["reflected XSS", "stored XSS", "DOM-based XSS", "cookie stealing", "session hijacking"],
    subLessons: ["Reflected XSS Attacks","Stored XSS Attacks","DOM-Based XSS","Cookie Stealing Techniques","XSS Prevention Methods"],
  },
  {
    id: "cs-network-attacks",
    title: "Network Attacks & Man-in-the-Middle",
    category: "offense",
    difficulty: "HARD",
    description: "ARP spoofing, packet sniffing, MITM attacks — intercept and manipulate network traffic.",
    concepts: ["ARP spoofing", "packet sniffing", "DNS poisoning", "SSL stripping", "session hijacking"],
    subLessons: ["ARP Spoofing & Poisoning","Packet Sniffing with Scapy","DNS Poisoning Attacks","SSL Stripping (MITM)","Session Hijacking Techniques"],
  },
  {
    id: "cs-exploit-dev",
    title: "Exploit Development",
    category: "offense",
    difficulty: "EXPERT",
    description: "Write your own exploits — buffer overflows, shellcode, and return-oriented programming.",
    concepts: ["buffer overflow", "stack smashing", "shellcode", "ROP chains", "format string vulnerabilities"],
    subLessons: ["Understanding Buffer Overflows","Stack Smashing Fundamentals","Writing Basic Shellcode","Return-Oriented Programming (ROP)","Format String Vulnerabilities"],
  },
  {
    id: "cs-wireless-hacking",
    title: "Wireless Network Hacking",
    category: "offense",
    difficulty: "EXPERT",
    description: "Crack Wi-Fi passwords, evil twin attacks, and wireless packet injection.",
    concepts: ["WPA/WPA2 cracking", "handshake capture", "deauthentication attacks", "evil twin AP", "packet injection"],
    subLessons: ["WPA/WPA2 Handshake Capture","Cracking Wi-Fi Passwords","Deauthentication Attacks","Evil Twin Access Points","Wireless Packet Injection"],
  },

  // DEFENSE
  {
    id: "cs-firewalls",
    title: "Firewalls & Network Defense",
    category: "defense",
    difficulty: "MEDIUM",
    description: "Configure firewalls, set up rules, and build network perimeter defenses.",
    concepts: ["iptables/nftables", "firewall rules", "stateful inspection", "DMZ architecture", "IDS/IPS"],
    subLessons: ["iptables/nftables Rules","Stateful vs Stateless Inspection","DMZ Architecture Design","IDS vs IPS Systems","Building Firewall Rules from Scratch"],
  },
  {
    id: "cs-secure-coding",
    title: "Secure Coding Practices",
    category: "defense",
    difficulty: "MEDIUM",
    description: "Write code that can't be hacked — input validation, parameterized queries, CSRF tokens.",
    concepts: ["input sanitization", "parameterized queries", "CSRF protection", "authentication best practices", "secure session management"],
    subLessons: ["Input Validation & Sanitization","Parameterized Queries (Preventing SQLi)","CSRF Token Implementation","Secure Authentication Patterns","Session Management Best Practices"],
  },
  {
    id: "cs-incident-response",
    title: "Incident Response & Handling",
    category: "defense",
    difficulty: "HARD",
    description: "What to do when you're breached — detection, containment, eradication, and recovery.",
    concepts: ["incident detection", "log analysis", "containment strategies", "malware removal", "post-incident review"],
    subLessons: ["Incident Detection Methods","Log Analysis & SIEM","Containment Strategies","Malware Removal Techniques","Post-Incident Review & Reporting"],
  },
  {
    id: "cs-hardening",
    title: "System Hardening",
    category: "defense",
    difficulty: "HARD",
    description: "Lock down servers and endpoints — remove attack surfaces and apply security baselines.",
    concepts: ["OS hardening", "service minimization", "patch management", "security baselines (CIS)", "access control"],
    subLessons: ["OS Hardening Checklist","Service Minimization","Patch Management Strategies","CIS Security Baselines","Access Control Implementation"],
  },

  // FORENSICS
  {
    id: "cs-disk-forensics",
    title: "Disk & File System Forensics",
    category: "forensics",
    difficulty: "HARD",
    description: "Recover deleted files, analyze disk images, and reconstruct timelines from file systems.",
    concepts: ["disk imaging", "file carving", "deleted file recovery", "timeline analysis", "metadata extraction"],
    subLessons: ["Disk Imaging Techniques","File Carving & Recovery","Deleted File Reconstruction","Timeline Analysis","Metadata Extraction Methods"],
  },
  {
    id: "cs-memory-forensics",
    title: "Memory Forensics",
    category: "forensics",
    difficulty: "EXPERT",
    description: "Analyze RAM dumps to find malware, extract passwords, and reconstruct attacker activity.",
    concepts: ["memory acquisition", "process analysis", "DLL injection detection", "rootkit detection", "Volatility framework"],
    subLessons: ["Memory Acquisition Tools","Process & DLL Analysis","Detecting Injected Code","Rootkit Detection Methods","Using Volatility Framework"],
  },
  {
    id: "cs-network-forensics",
    title: "Network Traffic Forensics",
    category: "forensics",
    difficulty: "EXPERT",
    description: "Capture and analyze network packets to reconstruct attacks and identify data exfiltration.",
    concepts: ["PCAP analysis", "Wireshark filters", "protocol analysis", "traffic reconstruction", "IOC identification"],
    subLessons: ["PCAP Capture & Storage","Wireshark Advanced Filters","Protocol Deep Analysis","Traffic Reconstruction","Identifying IOCs in Traffic"],
  },
  {
    id: "cs-malware-analysis",
    title: "Malware Analysis",
    category: "forensics",
    difficulty: "EXPERT",
    description: "Reverse engineer malware — static and dynamic analysis, sandboxing, and deobfuscation.",
    concepts: ["static analysis", "dynamic analysis", "sandboxing", "decompilation", "behavioral indicators"],
    subLessons: ["Static Analysis Fundamentals","Dynamic Analysis in Sandboxes","Decompilation & Disassembly","Behavioral Indicator Extraction","Writing YARA Rules"],
  },
];
