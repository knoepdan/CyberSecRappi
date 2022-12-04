# HTTP Cookies

Cookies are small pieces of data that is passed around via browser and server in the http header (in response or request)
Can be set client or serverside. Often set server side for session id.

### Syntax and flags

Set-Cookie: Name=Wert; domain=ex.ch; secure;

Cookie configuration per key/value pair to be interpreted by the browser:

- Domain
  - Default (when empty): only to originating server.
  - only subdomain can be configured (cross domain NOT possible)
  - Example 1: Domain=mozilla.org -> allows "xx.mozilla.org" (setting it is less restrictive than omitting it)
  - Example 2: "foo.xx.ch" -> cookie is sent: "xx.ch" and "foo.xx.ch" but NOT to "bar.xx.ch" or "baz.foo.xx.ch"
  - https://datacadamia.com/web/http/cookie_domain 
- Path
  - similar to Domain but for path (attention all subpaths are valid)
  - `path=/` -> all paths and subpaths
  - Default: only to originating path
- Secure
  - if set only via https
  - Default: http and https (attention downgrading possible o)
- Expires
  - Expiry date of cookie
  - Default: Cookie is only per session (destroyed when browser is closed)
- HttpOnly
  - if set, Cookie cannot be accessed via Javascript
- SameSite
  - if set cross site requests will NOT send cookie
    - example: we are on evilSite.ch and html contains: `<img src="eBanking.ch/transferAllMoney />` -> img supports doesn't follow same site policy and request would potentially send authentication cookies of eBankging.ch if we are currently logged in on that site
  - Value "strict": never
  - Value "lax": will still send for get requests (above example would work)

### Security recommendations

Value for sessionId: random and big enough
domain: dont set (to make sure)
path: depends on application, as restrive as possible
expire: dont set (to ensure it is removed)
secure: set
httpOnly: set for sessionId (for other stuff it might not a good idea to set)
sameSite: strict

### Preefixes

There are prefixes for cookies: **Secure or **Host which require secure to be set. \_\_Host must have a path of / and may not have domain set (_remark: seems very strange and never heard of it_)
https://www.sjoerdlangkemper.nl/2017/02/09/cookie-prefixes/
