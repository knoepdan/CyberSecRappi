# Fingerprinting

Start 15:00


## Security questions
### 1. list and describe the services offered on 51.15.43.110
Run nmap scan
- `nmap -sV -PN -n 51.15.43.110`
   - Pn: skip host discoversy, n: disable dns resolution
   - sV: Service detection

**Result (relevant)**
22/tcp   open  ssh        OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
25/tcp   open  smtp       Postfix smtpd
53/tcp   open  domain     dnsmasq 2.75
80/tcp   open  http
81/tcp   open  http       Apache httpd 2.4.18
82/tcp   open  http       Apache httpd 2.4.18 ((Ubuntu))
83/tcp   open  http       Apache httpd 2.4.18 ((Ubuntu))
443/tcp  open  ssl/http   Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
8080/tcp open  http-proxy
Service-Version for port 80/8080 not reconized

It offers the follwing services
- SMTP: so it could be a mailserver
- HTTP/HTTP: Apache so it acts as webser (also port 80/443 ar open)
- DNS
- SSH -> to administar??
- Some kind of webprox??



### 2. list and describe the OS for the services on 51.15.43.110
OS scan: `sudo nmap -O 51.15.43.110`

**Result**
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Actiontec MI424WR-GEN3I WAP (97%), DD-WRT v24-sp2 (Linux 2.4.37) (97%), Linux 3.2 (94%), Microsoft Windows XP SP3 or Windows 7 or Windows Server 2012 (94%), Microsoft Windows XP SP3 (93%), VMware Player virtual NAT device (93%), Linux 4.4 (92%), BlueArc Titan 2100 NAS device (89%)
No exact OS matches for host (test conditions non-ideal).

Not sure what to do with this answer but I believe it is a linux system because: 
- result of OS Scan
- SMTP server postfix which was detected is for Linux only http://dozent.maruweb.de/material/postfix.shtml

### 3. describe the provider of 51.15.43.110 (ASN, Provider)
Reverse lookup: `dig -x 51.15.43.110`: 110-43-15-51.instances.scw.cloud.
Whois: `whois -h riswhois.ripe.net '51.15.43.110' | egrep -i "origin|desc"` or just `whois 51.15.43.110`
We get: 
- ASN: AS12876
- Provider: SCALEWAY S.A.S., FR


## Steps and varia

Also possible: `sudo nmap -sO 51.15.43.110` (will detect ports in IP protocol) for step 1 but not really relevant so i moved it out of answer section
**Result(way less relevant.. Attention: number are not port but protocol numbers of IP protocol)**
1        open          icmp
6        open          tcp
17       open|filtered udp
47       open|filtered gre
