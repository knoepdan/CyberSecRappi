# Reverse shell answers

### Security questions
1. explain how to run the same connection via udp
    - To listen via udp (-u): `nc -l -v -p 8080 -u` 
    - Reverse shell via udp did not work, which to me would make sense as UDP is fire and forget (no connections)
    - There seem to be ways though: https://stackoverflow.com/questions/44730441/obtain-reverse-shell-over-udp-with-netcat
2. is it possible to run a http end-point with netcat?
    - yes, or to put it differently, nc can (probably) handle the connection tcp connection part of a http endpoint. As such it would have to forward the incoming request to some other program that knows how to deal with them and that can return the response. (at the moment probably above my shell/nc abilities). In the last exercise, we have to create a static http mock endpoint (static).
3. is it possible to send netcat traffic via proxy?
    - yes, proxy can be specified (-proxy option)
4. explain the following netcat command
    - nc will return the file index.http for any (!) incoming request on port 8080. "PV" part slows done the request. 

### Varia
PS: pv is a terminal-based (command-line based) tool in Linux that allows us for the monitoring of data being sent through pipe.
good explanation: https://jameshfisher.com/2018/12/31/how-to-make-a-webserver-with-netcat-nc/ (looks very familiar)