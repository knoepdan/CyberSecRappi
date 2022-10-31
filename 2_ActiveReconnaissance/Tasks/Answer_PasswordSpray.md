# Password spray

1. is this blocking someone performing nmap scans?
    - While the common nmap scans will not cause an IP to be blocked by fail2Ban, some scans no longer work when an IP is blocked by the firewall (for example by fail2Ban). Scans without a firewall involved are not affected.
2. is this blocking someone performing vulnerability scans? (Nessus, OpenVAS, ...)
    - Within the same net (meaning no firewall is involved), it doesn't affect the vulnerability scan, as fail2Ban tells the firewall to block the IP. Vulnerability scans over a firewall would be affected but I believe a vulnerability scan via firewall would not be able to return a lot of info as most services are blocked anyway. 
    Some vulnerability scans (brute force attack to find weak passwords) might even cause an IP to be banned by Fail2Ban.
2. how would you hack the server? what would bypass fail2ban?
    - Changing the IP from which we attempt the different password/login combinations.
        - using fake the IP (not so easy as might not be routed correctly)
        - using proxies

