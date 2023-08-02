# Crypto

## basics

**Properties**

- Authentication
- Confidentiality
  - encryption
- Integrity
  - hash
- Non-Repudiation
  - proof that something has happened

_TODO > check also with old stuff from winti_

**Main technologies**

- Block ciphers
  - different modes
- Stream ciphers
- Public Key
  - Signatures
  - Public key infrastructure
    - Web of trust (PGP)
    - CA's
- Hash
- MAC (message authentication code) - ensures integrity and authenticity - https://en.wikipedia.org/wiki/Message_authentication_code (Quote: MACs differ from digital signatures as MAC values are both generated and verified using the same secret key. )
  **Websites**

- https://www.keylength.com/

\*Remark: should also be in other places (book marks etc)

## For examens

(since it is an assignment, the tasks are not really relevant but some relevant parts, which will also be covered elsewehere, are described well )

**Perfect forward secrecy**
Not possible to break encryption later even if long-term secret which is used to exchange session keys is compromissed (known to the attacker).

**CLR** Certificate revokation list
Client (browser) can download list and check if certificate is on list

**OCSP**
During the handshake: the client (browser) can ask the OCSP responder if server certificate is still valid.
(Alternative: OCSP Stapling: server asks OCSP responder and caches answer from some time and can then send its OCSP status to the client during handshake. Not widely supported/used yet )

-> generally: CRL, OCSP browser will still accept certificate if CLR or OCSP servers not reachable. When using OCSP stapling: Flag "Must Staple" (X.509 extension), makes browser abort connection when no OCSP response is present.

**TLS**

- TLS downgrade -> trying to (re)negotiate a weaker protocol
  - TLS_FALLBACK_SCSV flag should prevent this
