# Active Reconnaissance

Some basics (supported by NMAP)
- Host Discovery > get hosts within a network
- Port Scanning > which ports are open
- Service detection
    - well-known ports (1-1023) and registered ports (1024-49151) are assigned to specific applications. However, ports can be arbitrarily assiged. 
    - tested by sending payload and then parsing responses
- OS Detection
- Vulnerability scanning
    - NMAP is also a small vulnerability scanner but there are better tools.. like Nessus

## Vulnerability scanning
Good for detecting standardized issues:(outdated software, configuration etc. Disadvantages: not good for complex, unknown serivces, false positives, noisy

| **Problem** | **Measure** |
|---|----|
|Insufficient Monitorng & Alerting | Forensic Readiness, Fraud & APT Detection |
| Vulnerable code | Secure programming, traing developers | 
| Vulnerable libraries | Patching, Updating Libs |
|Misconfiguration (TLS, Keys) | Hardening, Secure Configuration |
| Daemon Vulnerability (Web, DNS, FTP, SSH) | Patching (Vendoer), Separation, Virtualization |
| Vulnerability withing TCP/IP Stack | Firewall & Patching OS (Product) |
*Nessus covers all except monitoring*

**Host OS Vulnerability**
1. Services
2. Patch Level
3. File Permissions
4. ProcessPermissions
5. Configurations
*Example: covered by Microsoft Baseline Security Analyzer*

Types of Vulnerability scanners (simple, via agents etc.): see pdf

## Tools
- NMAP http://nmap.org/
    - mainly host discovery and port scanner but also a (small?) vulnerability scanner
- Microsoft Baseline Security Analyz
    - Host security scanner
    - free, local host auditing
- Nessus
    - (Network) Vulnerability scanner
    - commercial and free edition
    - See lab task
- .... many others



