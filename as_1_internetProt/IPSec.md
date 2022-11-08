
# IPSec

Multiple protocols for establishing VNP tunnels (not a single protocol). 

- IKE (Internet Key Exchange) 
    - authentication protocol over UDP Port 500
    - sometimes IKEv1 or IKEv2 (depending on version)
ESP (Encapsulating Security Payload)
    - session protocol protects data (IP Protocol = 50)

Basic workflow: Step 1 is authentication via IKE. Once this succeeded the traffic is encrypted using ESP. 


![IPSec ESP payload](IpSec_package.png)


Transport mode:  enccryption and/or authentication from end host to end host
Tunnel mode: via IPsec gateway. Message is only encrypted/authenticated via 2 IPsec gateways