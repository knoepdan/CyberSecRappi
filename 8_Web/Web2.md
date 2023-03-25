# Web (day 2)



### Script gadget  (XSS-attack)
Script gadget is a piece of legitimate JavaScript code, that can be triggered via an HTML injection. 
Can be used to circumvent CSP (see example in pdf, which uses Vue and and the framework/code)

```
<div data-role="button" data-text="Hello"></div>
<script>
    var buttons = $('data-role-button');
    buttons.html(buttons.attr("data-text""));  // data is elevated to code !!
</script>

```

Notes: 
- basically always: data is elevated to code
- lots of frameworks had ( and problems still have ) problems (react should be ok though)
- Attacks are usually framework specific

Mitigation: 
- CSP policy `trusted-types` > prevents innerHTML property 
    - check pdf how it is still possible to set html (with sanitizer)



Github repo with some known script gadgets for common frameworks: 
https://github.com/google/security-research-pocs/tree/master/script-gadgets 


### Mass Assignment
Other names: Autobinding (Asp Net MVC), Object injection (PHP)
Automatically binds HTTP properties to program code (like asp.net mvc binds request to input object)

Input object has additional properties that are accepted but the UI doesn't pass.  
Example:
 ```
 class UserInput{
  public string Username {get;set;}
  public bool IsAdmin {get;set;}  // UI doesn't pass this property
 }

class Controller{
    public void CreateUser(UserInput input){
        db.Save(inut);
    }
}
```

Mitigation: 
- do not directly bind input object to database code
    - Dto 
    - whitelist properties
    - ..some kind of validation etc.  (see PDF)


### Insecure Deserialization
Example Java (which is vulnerable to it): 
```
// code is java like (not exact java)
class Foo implementes ISerializable {
    writeObject(ObjectOututStream oos){}  // is executed during serialization
    readObject{ObjectInputStream ois} // takes bytestream .. used during deserialization.. 
}
```
-> Attacker uses a class that implements ISerializable that allows to inject custom code (readObject is run during deserialization) 

Mitigations
- do not accept serialized objects (especially java) -> best solution
- if we have to use deserialized objects then: 
    - only accept serialized sources from trusted soruces
    - digital signatures
    - secure coding with look-Ahead Deserializtion
        - library which will be used by for serialization and detects known attacks (also allows whitelists) -> only whitelisting will be ultimatly 100% secure given that the white listed classes are not vulnerable
    - dont use vulernable libraries..
    - WAF could block bytestream (However, if an application needs it, we cannot block it and WAF becomes useless against this type of attack)
    - etc... see pdf



### HTTPS
HTTPS = HTTP on TLS

Historically quite a few implementation bugs (e.g. heartbleed) or desgin bugs (older versions of tls/ssl)
SSLCipher hardening: ensure secure configuration of webserver

https://keylength.com website have a look at algorithms and for how long they are expected to remain secure
Common configuration mistakes -> see PDF
Certificate Management:  tool "Let's Encrpyt" facilitates certifiate handling (cert renewal etc.) https://letsencrypt.org/how-it-works/ 

Revoke compromised certificates
- CRL Key revocation list: 
- OCSP:  Browser will ask service if certificate is still valid (basically online version of CRL)


**Perfect forward secrecy (PFS)**   
> Not possible to decrypt communication later  (not possible to decrypt communication later on)
No "master key", helps against compromised private keys (at least past communication can still not be encrypted).. but future encryption are compromised (man in the middle attack)
used protocol Ephemeral Difie Hellman (EDH/DHE, ECDHE)

(to decrpyt older communication that enforces PFS with Wireshark the session keys need to be accessible (can be logged), without PFS, the private key is enough )

**private keys**
private keys should always live in a secure location  
bad: filesystem without proper restriction
HSM Hardware Security Module:  to protect private keys
 > contains private key. Can encrypt stuff with private key 


**recommened settings for https**
Cookie: Secure
HSTS: HTTP Response Header: Strict-Transport-Security: max-age=3153600   -> browser will enforce https for all communication
    - Security concept: "Trust on first use" -> first request might be insecure but follow up requests are: HSTS



**Certificat Transparency  (CT)**
CA's can be compromized!!
To counter this google has developed a concept: the certificate transparency list
Certificate Transparency is a publi log of certifiates. 
- CA unable to issue a certificate without being visible on the log (enforced by Chrome)
- infos which info is CA is responsible for which domains etc.
- https://crt.sh  (and there is also a site from facebook)
    - can be used to query all issued certificates (and provides infos about host etc.) -> can be used by attackers



**Compression side channel Attacks**
Attack on crypto: Encryption and compression in combination can be dangerous
Most compression will replace strings (or bytes) with references. So by sending requests with the attackers input and the response reflects the input, it is possible to deduce from the size of the response if the input was already part of the site. etc.  (see pdf for details) 
Mitigation: 
- disable compression at all
- prevent cross-site requests (ensure that info is being leaked)
    - some WAFS disable compression when site is cross site
- prevent nof requests (attacker doesn't have enough info to calculate secret)


