# VirusTotal Graph



## Steps in my own words
1. On VirusTotal, i entered the hash "b2fc2c0e222c88b45df343109a204a46b60d85f56e9fbfd9527e18f693469412" of a file ("Subconract 504.zip") to see what information we can fine (initially not much)

2. We use the site https://bazaar.abuse.ch to search for the hash as well (  https://bazaar.abuse.ch/sample/b2fc2c0e222c88b45df343109a204a46b60d85f56e9fbfd9527e18f693469412/ ) and find some more info: So the hash was from an encrypted zip file  but luckuly we found info about the decrypted file on bazaar.buse.ch (as in reality we might not have the decryption key). It is a xlsm file "Subconract 504.xlsm" with a new hash: "adbfe3ab87bdb320c3ef08a99550da2b188dfabe822b90519806e5f399732b69" 

3. With the new hash of the xlsm found in bazaar.abuse.ch we create a new node in VirusTotal and connect the node of the xmls file with the zip node. Upon expanding this new node, we see a lot of new nodes. So the hash of the xlsm file was already in the virusTotal database plus data connected to it. 
    - we can also add our own info nodes such as the name of the malware (Dridex) https://malpedia.caad.fkie.fraunhofer.de/details/win.dridex


4. Back to bazaar.abuse.ch we find the link (was a dropbox link) via URLhaus, the malware (xlsm file) was distributed with and we can create another new node in VirusTotal (url node)
    - Info about url: https://urlhaus.abuse.ch/url/1024269/ (where we find the info that it was from a dropbox link)

5. Saved graph:  https://www.virustotal.com/graph/embed/g73a2723c2ca1468eb816ad7ccbcdb9099e0b26639d73472aa839b9131139d96b?theme=light 


## My profile
Username: danKnop  (daniel.knoepfel@ost.ch)
https://www.virustotal.com/gui/user/danKnopf

https://www.virustotal.com/  VirusTotal aggregates many antivirus products and online scan engines to check for viruses that the user's own antivirus may have missed, or to verify against any false positives. 
