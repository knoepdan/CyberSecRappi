# Thread Intelligence

Start 14:35

## Premise

    Malicious file name:
        Document_may_24_16654.exe
    Malicious file hash:
        SHA256: 717beedcd2431785a0f59d194e47970e9544fbf398d462a305f6ad9a1b1100cb
        MD5: 6164e9d297d29aa8682971259da06848



## Answers

a) What malware is it? Does the malware have a name?
    - Search in virusTotal via hash (doesn't matter which one)
    - https://bazaar.abuse.ch/browse.php?search=sha256%3A717beedcd2431785a0f59d194e47970e9544fbf398d462a305f6ad9a1b1100cb
    - It runs under the label "trojan.truebot/lazy"
b) What malware family is it?
    - trojan
c) What actions does the malicious file do?
    - it gathers system information (Discovery)
    - it it also capable of downloading and executing payload
d) Is there an attribution possible?
    - Group silence 
    - https://attack.mitre.org/groups/G0091/
e) Are there public reports or sandbox runs we can use to further investigate this threat?
    yes, there is quite a lot of info
    - https://www.pcrisk.de/ratgeber-zum-entfernen/11761-truebot-malware
    - https://www.malwarebytes.com/blog/news/2023/07/warning-issued-over-increased-activity-of-truebot-malware
    - Community https://www.virustotal.com/gui/file/717beedcd2431785a0f59d194e47970e9544fbf398d462a305f6ad9a1b1100cb/community
    - via bazaar.abuse.ch we can browse to other detections/sandboxes
        -  https://bazaar.abuse.ch/browse.php?search=sha256%3A717beedcd2431785a0f59d194e47970e9544fbf398d462a305f6ad9a1b1100cb
            - https://www.capesandbox.com/analysis/391264/ (just as an example)

