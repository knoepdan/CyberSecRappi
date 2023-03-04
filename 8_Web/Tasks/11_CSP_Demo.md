# CSP Demo

## Security questions
1. what is the meaning of data in <script src="data:;base64,YWxlcnQoZG9jdW1lbnQuZG9tYWluKQ=="></script>
    - Data defines that the actual source is embedded into the src attribute. Usually, the data attribute is used for embedded images (a trick for small images to avoid another request, with the raise of http2 this is seen less. 
        -  I believe the data is usually base64 encoded to avoid breaking the html tag syntax. (and maybe to obfuscate )
    - The CSP directive "script-src data:" allows script sources from the scheme data (other possible schemes could be: "https"), so that is why the script is executed as it is not considered an inline script. 

2. what is the difference between hash and nonce
    <script nonce="ABC">alert(document.cookie)</script>
    <img onerror=alert("HASH") src=x>
    - HASH: When the CSP directive contains a hash only the script that that has the same hash value is executed. Besides the hash value, the directive needs to contain the hash algorithm as the browser could otherwise not calculate the hash (obviously). This approach is probably not suitable for scripts that contain dynamic data scripts that change often as the hash would change too often.
    - NONCE: Since hash is not ideal in a lot of situations (when script is dynamic or changes too often) a Nonce can be set in he CSP directive. Only scripts that the nonce attribute with the same value are then executed. To make this secure, the Nonce has to be random. This approach is far easier to maintain the hash approach. 

3. explain the following csp script-src 'unsafe-hashes' 'self' 'sha256-bnQkgwAfjTxnZSlFxZe1ogJadBHLnRuuL54WC+v+tMY='
    - unsafe-hashes: will allow inline eventhandlers functions rendered into html element attributes: 
        - `<button id="btn" onclick="alert('xss')">hello</button>` this will still work (but not a script tag) 
            - might be needed if it is not possible to move the eventhandler code into script files (or inline scripts)
    - 'self': allows any script from the same source, this includes inline scripts and event handler scripts (however: when specifing "default-src 'self';" inline scripts won't work. This is a bit confusing for the layman)
    - 'sha256-bnQkgwAfjTxnZSlFxZe1ogJadBHLnRuuL54WC+v+tMY=^': scripts that hash to the passed value ("bnQ..." with sha256) will be executed. 
    - *Remark: defining all 3 values in one CSP makes little sense as script-src: 'self' already allows all scripts that the other 2 directive values would allow*

