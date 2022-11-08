# PXE (Pre-boot Execution Environment)

PXE Preboot eXecution Environment
Standardized client-server environment that boots software (and OS??) from a network. 
Many companies have automated the installation of clients in the network. Often PXE is used for this purpose (also common in modern data centers)


### Basic workflow
1. DHCP Part
    - Client broadcasts DHCPDISCOVER with extension to identify client implements PXE protocol
    - DHCP server (or proxy) sends the client
        -  a list of boot servers
        - name of bootstrap on TFTP server
2. TFTP part
    - client downloads bootstrap from TFTP server (starts login process to PVS server)
3. PVS (Provisioning Service) server
    - client gets provisioning info from provisioning service
    - PVS is "finishing" the client with latest software and os and may join it into the AD domain




<span style="color:red">TODO this is all too superficial</span> also check powerpoint in assignment