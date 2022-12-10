# Social Media Scavenger Hunt Notes

access webmail of Konrad Hermann, CEO of Hermann consulting. 

###Step 2 finding web mail url

Way 1: Nikto 
nikto is a web server and CGI scanner: provides info about website
`nikto -h <URL_of_your_Webmail_docker>` -> will provide some info about website

Way 2: via robots.txt
The robots.txt file is used to control the behavior of search engines

Way 2: inspect html source code
There are some hidden links to webmail url

Result: <url>/owa


###Step 3-4: find email of CEO
Email on website: contact@hermann-consulting.ch and privay@hermann-consulting.ch
imprint@hermann-consulting.ch  -> on donwloadable pdf, author: "j.steiner@hermann-consulting.ch" -> from this we can deduct the format

Result: k.hermann@hermann-consulting.ch


###Step 7-12 find info in social media
use fb etc to find the info to reset password  (see task description in hacking lab)


###Step 12 reset pw
with the information in previous steps, password can be reset and we gain access 
:-)