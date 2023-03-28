# JWT GlockenEmil

## Answers


1. Explain the security problem
    - JWT token has no expiry date
    - other issues
        - Get request for request that change data
        - API documention should usually not be accessible (usually, there are cases where this makes sense)
            - and api documention should of course not contain a valid JWT token.
2. Explain your attack (exploit, screenshot, hacking journal)
    - see below
3. Explain mitigation (remedy)
    - JWT token must expire (expiry data should be part of the payload)
        - ideally, the access token is short lived but there is a refresh token that can be used to get a new access token



## Steps

**Step 1 + 2 analysis**
Example url sending requestUrl: https://c5b22d5c-d986-4cb7-8426-536f342c928d.idocker.vuln.land/api/product/toprated 

api info page:   https://c5b22d5c-d986-4cb7-8426-536f342c928d.idocker.vuln.land/api/

discount request:  https://c5b22d5c-d986-4cb7-8426-536f342c928d.idocker.vuln.land/api/retailer/order/:orderId/applyDiscount/   ( GET request )

Order id: 5acb4be9d9520729d8638c9a  CHF 2950 (taken from webpage)


**Step 3 try discount with bearer token taken from previous requests**
https://c5b22d5c-d986-4cb7-8426-536f342c928d.idocker.vuln.land/api/retailer/order/5acb4be9d9520729d8638c9a/applyDiscount/   -> sending get request without adding JWT

Resend and add JWT token (using Burp )

JWT token in http header (from previous requests):
`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1JldGFpbGVyIjpmYWxzZSwiX2lkIjoiNWFhMDQ4MWU4NzZkOWQzOWQ0Mzk3ODU5IiwidXNlcm5hbWUiOiJjdXN0b21lcjAiLCJmaXJzdG5hbWUiOiJKdWxpYW5lIiwibGFzdG5hbWUiOiJTY2h1bHplIiwiZW1haWwiOiJKdWxpYW5lLlNjaHVsemVAZ21haWwuY29tIiwiaWF0IjoxNjgwMDMzODgxLCJhdWQiOiJzZWxmIiwiaXNzIjoid2Vic2hvcCJ9.b-6j7rrCteZC9VxsJrltpcappM7a5XFcfnI2S3aQedo`


**Step 4 success**
Bearer token from API documentation: 
`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1JldGFpbGVyIjp0cnVlLCJfaWQiOiI1YWNjODUxZmM4YmMyNjIyMTRjMDFlZTUiLCJ1c2VybmFtZSI6InJldGFpbGVyMCIsImZpcnN0bmFtZSI6IkphY2tvYiIsImxhc3RuYW1lIjoiTcO8bGxlciIsImVtYWlsIjoiSmFja29iLk11ZWxsZXJAZ21haWwuY29tIiwiaWF0IjoxNTIzMzU0NjIyLCJhdWQiOiJzZWxmIiwiaXNzIjoid2Vic2hvcCJ9.7eDbsqhJ0jyXdKWsjyVgpT5ZL6JIWlBMH8laQ6XYghQ`

Analyzed JWT token with https://jwt.io/
```
{
  "alg": "HS256",
  "typ": "JWT"
}

{
  "isRetailer": true,
  "_id": "5acc851fc8bc262214c01ee5",
  "username": "retailer0",
  "firstname": "Jackob",
  "lastname": "Müller",
  "email": "Jackob.Mueller@gmail.com",
  "iat": 1523354622,
  "aud": "self",
  "iss": "webshop"
}
```
-> is retailer

resend again (using Burp) -> success. new price: CHF 1475.-- (2950 / 2)

![Burp JWT token request](JWT_tokenWithBurp.png)


## Varia

JWT links
https://token.dev/  (info, maybe also a debugger)
https://jwt.io/  (jwt debugger )