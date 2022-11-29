<?php eval(base64_decode('c2V0Y29va2llKCJUZXN0Q29va2llIiwgcGkoKSk7')); ?>
<?php 
//Use HTML comments to answer questions in this file -->
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Assignment DK </title>
</head>
<body class='body_style'>
<h1 id="title">Web Basics</h1>
<div id='d77'></div>
<p>

<?php 
// this obfuscated code sets a value in the browser sessionStorage for exercise 5-->
?>
<script>var _0x4b79=['valueOfSecret72','secret72'];(function(_0x197a9d,_0x4b7944){var _0x35f09d=function(_0xa2c524){while(--_0xa2c524){_0x197a9d['push'](_0x197a9d['shift']());}};_0x35f09d(++_0x4b7944);}(_0x4b79,0xcf));var _0x35f0=function(_0x197a9d,_0x4b7944){_0x197a9d=_0x197a9d-0x0;var _0x35f09d=_0x4b79[_0x197a9d];return _0x35f09d;};sessionStorage['setItem'](_0x35f0('0x0'),_0x35f0('0x1'));</script>


<h1>Reference Cross-Origin Resources</h1>
<?php 
// 1) include/show the OST-logo here by creating an image tag pointing to the logo hosted on www.ost.ch.
// It does not matter which URL you are using as long as the logo is correctly displayed. 
?>
<img src="https://d3pelj80y5v5k4.cloudfront.net/ad16e225-3832-4120-86a1-877f56f5eeec?w=100&h=100&q=85&nu=1" alt=""/>
<hr>
<h1>HTML Form</h1>
<?php 
/*
2) the following HTML form submits the username and password parameters to this (current) page

2.1. Change the form so that the form parameters are sent to the request catcher which you can start with the
second resource in this challenge. Send the parameters to the path /test of the request catcher.
To show the received requests in the request catcher access the path /debug.

2.2. Submit the form with any parameter values. How are the parameters passed to the external website?   ANSWER: as url query (when method is get)

2.3. Change the form so that the parameters are send in the HTTP body, i.e. browser creates a POST request
*/
?>
<form action="https://811fb157-84bc-4876-9632-5e8697c21a38.idocker.vuln.land/test" method="post">
Username: <input type="text" name="user" /><br/>
Password: <input type="password" name="pass" /><br/>
<input type="submit" name="login" />
</form>

<hr>
<h1>Web site in web site</h1>
<?php 
/*
3) show the content of the page https://www.ost.ch/ in a small "box", e.g. 400x400 pixels, here
hint: frame
*/ ?>

<iframe src="https://www.ost.ch/" style="width:400px; height:400px"  ></iframe>


<hr>
<h1>DOM</h1>
<?php 
/* 4) Modify DOM
Your Browser provides an API to modify the DOM using JavaScript.
Add JavaScript code here to modify the title of the h1-tag ("Web Basics") of this web page. Change it to any other string.
 */ ?>
<script>
	// insert your JavaScript code here
    window.onload=function(){
        let titleNode = document.getElementById('title');
        titleNode.innerText = "Changed title :-)";
    }
</script>

<?php
/* 
5) Access HTTP cookies
5.1) Show all HTTP cookies of this web page in an alert box
5.2) What is the value of the session cookie?
*/ ?>

<script>
	// insert your JavaScript code here
    alert(document.cookie); // 3.1415926535898  -> ohhh it is PI
</script>

<hr>
<h1>LocalStorage/sessionStorage</h1>
<?php /*
6) Sensitive information is sometimes saved to sessionStorage or localStorage on client side. The main difference between localStorage and sessionStorage is that sessionStorage is cleared when you close your browser.

Use your browser developer tools to check the content of the sessionStorage (e.g. for Firefox check the DevTool tab 'Storage')

6.1) Write all key/value pairs from the sessionStorage into the content of the div-tag with id d77 (no formatting necessary as long as the content of the sessionStorage is reflected on the web page).
*/ ?>
<script>
	// insert your JavaScript code here
    window.onload=function(){
        let sessionStorageString = '';
        for (let i=0; i< sessionStorage.length; i++) {
            let key = sessionStorage.key(i);
            let value = sessionStorage[key];
            sessionStorageString += key + ', ' + value +'; ';
        }
        let div = document.getElementById('d77');
        div.innerText = sessionStorageString;
    }
</script>

<hr>
<h1>JavaScript Event Handler</h1>
<?php 
/*
7) Event handlers are triggered by a browser or user event - such as when the page loads, when the user clicks the mouse.
Event handler have the prefix "on" like onload:

https://www.w3schools.com/tags/ref_eventattributes.asp

The following example triggers the alert function when the user clicks on the image
*/ ?>
<img src="cat.jpg" onclick="alert('thanks for clicking')" alt="">

<?php /*
Modify the div element below so that the function *changeText* is executed when you move with your mouse over the text.
You can pass the JavaScript object "this" to the changeText-function as a reference to the div-tag.
*/ ?>
<script>
function changeText(element) {
	element.innerHTML = "New text - refresh browser to reset";
}
</script>
<p><div onclick="changeText(this)" style="font-size: 20pt">Hover over this text with your mouse</div>

<hr>
<h1>HTML Validator</h1>
<?php 
// 8) Copy the HTML source code to https://validator.w3.org/#validate_by_input and fix all errors. Hand in the resulting file
?>

</html>
