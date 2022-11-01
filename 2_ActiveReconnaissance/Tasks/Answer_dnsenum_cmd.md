# "dnsenum" tool

Using subdomains file from https://github.com/rbsec/dnscan.git so we don't have to create a subdomain file ourselves

`dnsenum -f subdomains-100.txt --enum compass-security.com --private -p 20 -s 20 -r -w -o dnsenum-compass-100.xml`

`dnsenum -f subdomains-10000.txt --enum hacking-lab.com --private -p 20 -s 20 -r -w -o dnsenum-hl-10000.xml`

### Answers 



- describe the benefit of the Google option
    - Brute force are basically trial and error with a given set of subdomains. If a subdomain is part of our set of possible subdomains, the brute force approach won't find it. However, using a google search, we make use of google ressources and might find additional subdomains. 
- describe the benefit of the brute-force option
    - Brute force might find subdomains not found via google. In order for the google search it has to appear in one of google's search results, which may not be the case for all subdomains. Using a file (subdomains-100.txt) subdomains it is possible to "brute force" other subdomains. Brute force + google are complementary. 
- describe the benefit of whois netrange option
    - Not sure if I understand but the dns enum tool, will do reverse lookups on a range of IP's addresses. This way, every IP in a particular range is tested. (Not fully clear to me how this actually works as a) I tried it and could not verify my assumptions via Wireshark b) according to the help it would query the IP's of a C Network which would be huge)
- describe your lesson learned
    - google search did not work. has google blocked the tool, or just the hacking lab source IP?
    - Unless a zone transfer is possble (which is usually forbidden), there is no perfect way to get all subdomains. Multiple approaches (google, bruteforce etc.) might return different results.
