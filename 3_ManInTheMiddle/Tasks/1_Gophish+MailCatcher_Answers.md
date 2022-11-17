# Gophish + MailCatcher

### Answers
with which variable can you specify the phishing url in a mail at gophish? : {{.URL}}

Conclusion: 
Step 16: However - what is required to send valid and legitimate e-mails to our victims?  
(*maybe no need to answer here as this is part of a later task*). 
I think we would a) send the mails to a real mailserver (not mailcatcher), b) ensure mails are actually sent (SPF, DKIM), c) website doesn't trigger invalid certificate warninger etc. (not a must, but campain would be more successful with a valid certificate)



### Recap

Gophish: website/framework to create a phishing campain. 
- allows to create and send an email that contains a link (which user is enticed to click) that redirects user to a fake website (which can be configured as well)
- an then website, user is supposed to enter sensitive data (credentials, credite card number...) 

MailCatcher: Tool to intercept and see "our" phishing emails. (otherwise we would have to actually send to a real mail server)