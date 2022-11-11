#QUIC and http/3 protocols (coming UDP protocols)

### HTTP/2

- still based on TCP.
- fewer TCP connectsion
- push to client
  Generally focus on performance. HTTP status code etc. still work. Nearly no difference for developers. Browser support already there (even IE 11).

### QUIC

QUIC = Quick UDP Internet Connections

- reliable, mulitplexed transport over UDP
- always encrypted
- reduces latency
- runs in user-space (meaning???)

In a way, it is a replacement for TCP. TCP could not be changed so easily. Was easier to create something new on top of UDP.

Already supported in chrome. Analyze it in Chrome: https://netlog-viewer.appspot.com/#impor

### HTTP 3.0

Used QUIC as a protocol on the transport layer.
