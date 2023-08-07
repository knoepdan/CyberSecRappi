# Network

## BGP protocol

BGP is the most common protocol to connect 2 autonomous systems (AS) with each other.
AS = Autonomous system
ASN = Autonomous system number

## Ethernet

MAC addresses (Media Access Control): Ethernet addresses that are unique to every device
ARP: Address resolution protocol (map MAC address to IP)

Example:

1. ARP request: Who has IP XXX (flooded -> )
2. ARP Reply of machine with IP XXX with IP + MAC
   - likely via a bridge which understands ARP and learns

## DNS

- Root dns
  - knows only about the top-level domain servers (will return location/ip of TLD server)
- Top-level domain servers (TLD)
  - top level domains: "com", "org" and country domains: "ch", "uk" etc.
- Authoritative DNS servers
  - responsible for his own zone
  - only answers to queries about domain names configured by admin
- Local name server
  - every ISP (internet service provider, + companies, universities..) has a local server "default name server"
  - a host's DNS query will be sent to the local DNS which acts as proxy

DNS varia:

- Google’s public DNS server: Accessible at the IPv4 addresses - 8.8.8.8 and 8.8.4.4
- see tools like nslookup or dig (`dig www.ost.ch`)
- DNS uses UDP for most queries and TCP for zone transfers (so both)
- DNS over HTTPS
  - DNS itself is vulnerable to eavesdropping and man-in-the-middle, so google and mozilla moved to DNS over http
  - `curl -s -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=ost.ch&type=A' | jq .`

**DNSSEC (Security Extensions)**
DNSSEC: Domain Name System Security Extensions
Number of standards extending that extend DNS to ensure authenticy and integrity. DNSSEC does NOT encrypt messages.
Entries will be signed. Public key is accessible via "DNSKEY resource record" (`dig dnskey switch.ch +short`). Signature is in RRSIG record.

Good explanation: https://support.openprovider.eu/hc/en-us/articles/360009662413-DNSSEC-Chain-of-Trust

Example

- openprovider.nl. 900 IN A 185.87.187.6
- openprovider.nl. 900 IN RRSIG A 8 2 900 20181004000000... A entry signed with (secret) private part DNSKEY
- openprovider.nl. 1800 IN DNSKEY 256 3 8 AwE[...]WRd -> public key
  Parent
- openprovider.nl. 3600 IN DS 5299 8 2 A79[...]3AC -> hash of DNSKEY of child (by this the parent proves that the )
- openprovider.nl. 3600 IN RRSIG DS 8 2 3600 20181.... DS entry signed with public key (of this level as I understand it)
  Parent of parent -> same mechanism would apply here to verify the public key of the lower level (parent). If it is a root server, then we just have to trust it.

## IP and similar

**Traceroute**
sending ICPM packages with Time to leave (TTL) incremented each time (starting with 1) to see how far package gets.

## Varia

- PXE (Pre-boot Execution Environment): load software (OS?) via network using standard protocols such as DHCP etc.

- OSI-Model
