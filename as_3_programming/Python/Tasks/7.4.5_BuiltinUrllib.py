import urllib.request

# 7.4.5 Urllib request  
# (works but implementation might not be as intended)
req = urllib.request.Request(url='https://postman-echo.com/headers', method="GET")
with urllib.request.urlopen(req) as response:
    print(type(response)) # <class 'http.client.HTTPResponse'>
    print(type(response.headers)) # <class 'http.client.HTTPMessage'>
    result = str(response.status) + " - "
    for index, item in enumerate(response.headers):
        #print(" " + str(index) + " " + item + "   " + response.headers[item])
        result = result + item +": " + response.headers[item]+", "
    result = result.strip()[:-1]  # remove ", "
    
    print(result)

