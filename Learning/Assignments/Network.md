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

## IP and similar

**Traceroute**
sending ICPM packages with Time to leave (TTL) incremented each time (starting with 1) to see how far package gets.

## Varia

PXE (Pre-boot Execution Environment): load software (OS?) via network using standard protocols such as DHCP etc.
