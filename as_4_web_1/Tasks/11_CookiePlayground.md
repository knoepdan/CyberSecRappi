# Cookie playground

**1. Define how a cookie must be set by the server if the cookie shall be sent by the browser to two different hosts of the same domain (two subdomains)**
Set-Cookie: cookieName=bla; domain=71060273-38f0-4a2c-a35e-4bed2ea668ee.idocker.vuln.land

Remark: just setting domain allows subdomains (setting domain is less restrictive than omitting it)

**2. Define how a cookie must be set by the server if the cookie shall only be sent via https and javascript in the browser shall not be allowed to access the content of the cookie using the JavaScript variable document.cookie**
Set-Cookie: cookieName=bla; Secure; HttpOnly

**3. Define how a cookie must be set by the server if the cookie shall be set persistent until 31.12.2034. Furthermore, the cookie should be sent by the browser to all hosts of the domain and to all URLs**
Set-Cookie: cookieName=bla; domain=xx.ch; path=/

**4. What's the difference between the cookie attributes SameSite=Lax and SameSite=Strict? Describe a concrete case where the two settings lead to different cookie behavior in a modern browser.**

Strict: With SameSite=Strict the cookie is never sent in cross site requests, plus it also won't send any cookies when following a link (or get form). Example: i have 2 tabs open: Website A and Website B. Website B has a link to Website A and when i click on the link Cookies from Website A are NOT sent.
From my understanding: strict is therefore not ideal for keeping user sessions for public sites that are often referenced and where the user should remain logged in. (Possible solutions: maybe there is a redirect to circumvent this problem)

LAX: Similar to strict but in some cirumstances, when the request is considered safe, a "lax" cookie is sent. Such request are: links and get forms.

https://blog.viadee.de/samesite-cookies-strict-oder-lax
