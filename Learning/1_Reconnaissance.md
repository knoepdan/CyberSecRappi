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
    - OSINT: Open Source Intelligence tool
    - https://www.youtube.com/watch?v=BNLwp4uGB5A
- there are more...


### Playbook passive reconnaissance
Example with compass-security.ch. 
Attention: a full list 

**1. Whois**
-  `whois compass-security.ch`
    - alternative: https://www.nic.ch/whois/  (as might "whois" via bash might be prohibited)

We get nameservers: ns1.compass-security.com, ns2.compass-security.com  (and possibly some additional info)

**2. Get IPs**
get ip:  `dig +short www.compass-security.ch`  -> 80.74.140.132

*remark: also do this for the nameservers*s

**3. Provider Lookup via WhoIs**
provider info: `whois -h riswhois.ripe.net '80.74.140.132' | egrep -i "origin|desc"` (without part after "|" would be ok)
we get ASN: AS21069   (ASN-METANET METANET AG, CH). 

*remark: also do this for the nameservers*

**4. Certificate Transparency (get more domains)**
1. run in browser: https://crt.sh/?q=compass-security.ch   -> get html source
2. if there too many: extract domains in Cyberchef
    - html source from step one and extract domain names in cyberchef (Extractors-> Extract domains)
        - if there are too many false positives: just copy inner html table
        - also make sure you don't use incorrect 


**5. Get domains/subdomains from already retrieved domains**

Content of bash file "subdom.sh"
```
mkdir -p ./subdomains
while read p; do
    if [ -z $p ]
    then 
        echo "line empty"
    else
        echo $p
        ### sublist3r -d $p -o ./subdomains/$p.txt  #did not yield good results
        amass enum -d $p > ./subdomains/$p.txt
    fi
done <hosts.txt
```
Call file: `bash subdom.sh`
*Remark: approach can also be used with other tools*

**5b. Alternative scanning for subdomains via dnscan**
"dnscan" tries to get subdomains via worklist. Attention: is considered active scanning

Should run out of the box (maybe already downloaded)
```
cd /home/hacker
git clone https://github.com/rbsec/dnscan.git
cd dnscan
python3 dnscan.py -d compass-security.com
python3 dnscan.py -d compass-security.com -w subdomains-10000.txt
```

**5c. Alternative scanning for subdomains via dnsenum**
script to enumerate via wordlist and goolge and discover non-contiguous IP blocks.  Attention: is considered active scanning
```
cd /home/hacker
git clone https://github.com/rbsec/dnscan.git
cd dnscan
ls -al subdomain*
```
Run it: `dnsenum -f subdomains-100.txt --enum compass-security.com --private -p 20 -s 20 -r -w -o dnsenum-compass-100.xml` (some results may not make sense)

**Varia**
- get domain from IP
    - `dig -x 146.136.105.52`
    - or https://www.reverseip.ch/en/
- Find related domains from IP
    - bing search: "ip:+80.74.140.119"
    - `curl -s https://api.hackertarget.com/reverseiplookup/\?q\=80.74.140.11
- use Cyberchef to 
    - sort, make unique or extract domains and/or IP's
    - can be saved to a file and then used for further processing
