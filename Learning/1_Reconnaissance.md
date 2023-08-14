# Reconaissance (aka information gathering)

**Passive**
- dns names
- ip addresses
- internet provider
- emails
- passwords, phone numbers, physical locations 

**WhoIs**
WHOIS is a public database that houses the information collected when someone registers a domain name or updates their DNS settings.
  - Linux tool "whois":  
    - `whois -h riswhois.ripe.net -- '80.254.178.110'` (single ip)
    - `whois -h riswhois.ripe.net -- '-m 193/19'` (ip mask)
  - Online tool: https://stat.ripe.net/ 
  - search for .ch and .li domains: https://www.nic.ch/whois/
  - search for .com domains: https://lookup.icann.org/lookup

  *Remark: Most WHOIS databases in their current form are often not
compliant with the GDPR. However, there is a way: Domain privacy (or Whois privacy)*

Via Whois we get: 
- Technical contact
- DNS Server 
- Provider Information (Routing)

**Certificate Transparency**
Standard for monitoring + auditing the issuance of digital certificates. Can help exposing certificates issued by compromised CS (without genuine owner requesting it). Logs are append only (Merkle Tree), and a Certificate has an entry (SCT) which is a signed timestamp of log operator.
*remark: revocation list usually takes too long to detect compromised certificates*
Search in logs
- https://crt.sh/ -> main search
- https://developers.facebook.com/tools/ct/search  

Via CT we get: 
- Hostnames (as certificates are per host/domain)
- sometimes additional stuff such as email etc.


**DNS**  (attention: no longer passive)
Techniques
- DNS Lookup (hostname to IP)
- Reverse DNS lookups (IP to hostname)
- DNS Zone transfer (query all info, usually disabled)
- DNSSEC Zone walking  
    - DNS entries secured with DNSSEC are chained. Tools can follow this chain

Some links and tools: 
- see bookmarks for links
- and important tools (like dig, sublist3 etc.)

Via DNS we get: 
- IP Addresses
- Mailservers
- Nameservers

Via Reverse DNS we get: 
- Provider
- Domains
- SubDomains

**Provider lookup**
Via IP we can get Provider inof
Tools: 
- https://geoiplookup.net/
- Whois: `whois 80.74.140.101`

We get: 
- Provider name
- IP-Ranges (of provider i guess)
- BGP info (???)



**Varia**
- Search engines: mainly Google search (google dork)
    - use google to search for vulnerabilities (bing could probably also be used for this)
    - Searches see: https://www.exploit-db.com/google-hacking-database
    - Also bing for dns reverse lookup. Example bing search: "ip:+80.74.140.119"
- Virus Total
   - allows searching for domains etc .
    - https://www.virustotal.com/gui/home/search
- Shodan search enginge (IPs, domain names, products, companies)
    - https://www.shodan.io/
    - examples: 
        - https://www.shodan.io/search?query=compass-security.com
        - https://www.shodan.io/host/212.254.178.163
        - see pdf "01F Passive Reconnaissance.pdf" for search syntax

**Tools**
- Maltego (see liveCD)
- there are more...


### Playbook passive reconnaissance
