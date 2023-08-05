# Web

## Http

- Keep-Alive: will keep TCP connection open
- Redirect 302 after login (username/password): browser will delete username/pw which is in memory (so using back button it is not possible to relogin, which is intended (example internet cafe))
- Session fixation attack
  - Hacker tricks user to use a session already known to him (user logs in and then is using the session of hijacker)
  - Remedy: new session after each login

**Cookie**

- Attributes
  - Domain (no value: cookie is sent to originating server only)
  - Path
  - Secure (only via https)
  - Expires (not set means, cookie will be destroyed upon closing browser)
  - HttpOnly (not accessible via JS)
  - SameSite ( prevents CSRF attacks where as Cookie is only sent if we are on the same site already )

Cookie prefixes: **Host or **Secure .. (must have Secure attribute set, just know that they exis for now

**Same Origin policy SOP**
browser policy that restricts access to resources of a different origin.

> relevant: protocol, hostname, port

Examples:

- js (or flash, java applets..) request to other domain (GET): request can be made but answer may not be evaluated !!
  - unless allowed by CORS
- js request to other domain (POST, PUT etc.): not allowed
  - unless allowed by CORS
- Same origin policy does not apply for:
  - images source attributes
  - script tags (can come from another domain)
  - websockets (see pdf for how to protect)

Null origin: sandboxed documents: <iframe sandbox="allow-scripts" src="frame.html"></iframe> -> will run under the NULL domain which means CORS is always triggered

Bypass Same Origin policy: CORS (bad: JSONP)

## Varia

Fully qualified domain name: https://techterms.com/definition/fqdn
Top level domain: "com", "org" etc.
