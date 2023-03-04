# SSRF Server-Side Request Forgery (GlockenEmil 2.0)

## Steps

**Exploit**
It is possible to upload an image via url on community. When entering "http://localhost:8765/file002.jpg", the file/image is loaded from the server. 

*Remark: I basically followed the tutorial*

**Analyze image**
Image displays displays a cat and diverse passwords (e.g. "iLikeTrains", or "NotSoSecureStorage")
Using https://jimpl.com ("exif-viewer.com/" seems to be broken) I get to see all the metadata: 

Flag in image-description: d61dcd8a-c87c-4286-90cd-c56cb1db05cc 

## Security questions

- Explain the security problem
    - The webserver receiving the request, while accessible via the internet, also has access to the machines in his local network. When it is possible to make the webserver access and expose local resources (or even trigger actions in the local network) via user data that should not be exposed, it is called an SSRF attack.
- Explain the exploit
    - The steps are as follows: 
    1. User sends post request with url "http://localhost:8765/file002.jpg" 
    2. The server takes this url and tries to download the image. In this particular case, the images resides on the server itself (localhost) and is not accessible from the outside. However, the server just downloads it from itself and stores it to be displayed to the public. There seems to be no check on the passed url.
- Explain mitigation (how this can be fixed)
    - if possible try not to have functionality where the user can pass a url  (not always possible)
        - In this case: probably not possible, as we want to have this functionality. 
    - Strict URL validation 
        - only allow protocols / ports that are ok
        - whitelist urls (andd possible blacklist)
        - Would help here as port could be blocked, and localhost url would probably be blacklisted and not be on a whitelist (ip range). 
    - Check responses from local servers and don't expose them
        - Does not really apply in this case as the response is an image which cannot be checked so easily
    - Services must authenticate themselves (zero trust)
        - Would help here as access to service would not be allowed. 
