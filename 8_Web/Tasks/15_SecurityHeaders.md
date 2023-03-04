# Security Headers

## 1 X-Frame options
**1a prevent attack**
I added the following code to the file bank.php: 
```
<?php
header("X-Frame-Options: Deny");
?>
```
**1b allow site to be iframed**
The header X-Frame-Options doesn't allow to specify an url. However, this can be achieved by CSP: 
`Content-Security-Policy: frame-ancestors 'self' https://www.partner-bank.net;`

## 2 Permission Policy
```
<?php
header("Permissions-Policy: geolocation=(https://www.ischi.net/ost/sechdr/permission.php), fullscreen=(self), camera=(*)");
?>
```

Allow attribute for iFrame (unchanged)

```
    <iframe src="https://www.ischi.net/ost/sechdr/permission.php" allow="fullscreen;camera;geolocation"></iframe>
```
Unfortunately, this does not work, the IFrame cannot use gelocation :-(   (played around quite a bit but didnt find a working solution)

## 3 Referrer policy
referrer header for image request: "referer: https://{UID}.idocker.vuln.land/referrer.php"

3a) Header to ensure no referrer header is sent to image request on a different domain: "Referrer-Policy: same-origin"    (or 'no-referrer') 
3b) To send the entire url including querystring etc.: "Referrer-Policy: unsafe-url"

## 4 X-Content-Type Options
Only A and E have the correct header: 'Content-Type: text/javascript'. Scripts that have an incorrect content type but are missing the 'X-Content-Type-Options: nosniff' header will display an alert box (D, G)
Displayed alert boxes: A, D, E, G

## 5 X-Content-Type (real scenario)
**5a XSS vulnerability**
 XSS-Attack: Birthday (via developer tools changed the type to text and then it is possible to enter any script)
**5b inject script**
Text entered in birthday field (XSS attack)
<script src="/uploads/attackFile.js"></script>
Content of file attackFile.js: `alert('attack')`

-> will execute content of attackFile.js

**5c disable sniffing**
Not sure I understood. I enabled the nosniff response header but was still able to inject my script. Was the idea that i upload a js file with a image (.png) extension, so the browser would have to guess (sniff) the content? This didnt work as the browser complained about incorrect mime-type as if nosniff was enabled (but it wasn't).