# Postfix

### Answers
1.  what is the idea of spf
    - Answerf: To check if the sender IP is allowed to send mail for the sender/from email domain. 
2.  who is responsible for checking spf (sender, receiver)
    - Answer: receiver
3. where is the information located for spf
    - Answer: the IP is part of the connection. The domain is part of the from email. The receiver can then make DNS requests (TXT) to see which IP's are allowed to send. 
        - Question: I assume if emails are relayed, the IP of the relayer also have to be registered 
4. what is the idea of dkim
    - To allow verification that a) the mail was sent from a trusted source and b) the mail was not altered. 
5. who is responsible for checking dkim (sender, receiver)
    - Answer: receiver
6. where is the information located for dkim
    - The mail header: contains a signature (basically, a hash of the mail encrypted with a private key)
    - DNS-Server of the from mail domain: has public key for the domain
        - The receiver uses that public key to verify the signature in the mail to verify that it was sent from a authorised mail server (which owns the private key) and the message was not altered 



### Notes

Postfix: https://hub.docker.com/_/postfixadmin (a small docker mailserver)

My test account: danilson.knopfel@gmail.com

Command which will be denied relaying: 
`./smtptest.py -v ibuetler@hsr.ch danilson.knopfel@gmail.com localhost`

Command which will send mail (might still not arrive)
`./smtptest.py -v -n 587 -t -u ivan.buetler -p EBp5CJNcykf7cgmb ibuetler@hsr.ch danilson.knopfel@gmail.com localhost`
    -> different from the hacking lab mil log excerpt, I don't see google complaining about low reputation of sending IP. (but mail does still not end up in my gmail account)