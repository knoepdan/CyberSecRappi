# DNSCAN using dnscan.py script


### Answers 

- Please analyze and describe the behavior of dnscan 
    - Worflow of program
        1. Initialize arguments and setup  some classes (like resolver)$
        2. Will get nameserver of passed domain (saving ns ip in variable)
        3. Will try to do a zone transfer which fails
        4. Will then try to get IPV6, TXT entries and DMARC(??) 
        5. Check if DNSEC is supported (its not)
        6. Writes possible subdomains into a queue (add_target)
            - possible subdomains are from a file (or if none is passed from a default). All the subdomains are added to the passed domain. Eg. "world.compas-security.com" (world would be a possible subdomain listed in one of the subdomain files)
        7. Multiple threads are started and the each thread will take a subdomain and try to get it's ip (lookup). If the looup succeeds, the IP and subdomain are written into a variable (list) and finally printed to the output. 

- Is dnscan communicating directly with the authoritative DNS server or does the analysis take place via an open DNS server. $
    - it uses the system resolver. For the zone transfer, it will directly as the compass nameserver. (Via params one could configure an open DNS server)
- What is the source IP address of the DNS packets arriving at the authoritative DNS? 
    - Answer: 
        - for some lookups the system resolver 192.168.127.2 is used, which will then ask the authoritative DNS, so 192.168.127.2 is the answer
- Can the DNS administrator of the authoritative DNS find out from which ip the DNS scan is performed?
    - No

