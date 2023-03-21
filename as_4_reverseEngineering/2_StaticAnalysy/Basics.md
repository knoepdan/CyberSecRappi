# Static analys basics


`98ca95d5888ed57532434861e0db91d5bf9b4b10b56bf5a1fb8b27fd7659fcf8`  (in the pdf there seems to be an incorrect space after 98)

Results for this hash
- https://www.virustotal.com/gui/home/search
    - 53 security vendors and 2 sandboxes flagged this file as malicious
    - Seems to be a .net dll that makes a http request, downloads a file, writes to the registry and runs code
- https://bazaar.abuse.ch/verify-ua/  (search: `sha256:98ca95d5888ed57532434861e0db91d5bf9b4b10b56bf5a1fb8b27fd7659fcf8` )
    - 11 vendor detections
    - possible to browse information of vendors (often with an additional link)
    - YARA Rules can be browsed
        - more info https://www.varonis.com/blog/yara-rules or  https://malpedia.caad.fkie.fraunhofer.de/
