# OAuth

## Attack


1. Make sure user is logged in to https://mypix.compass-demo.com/
2. Go to landing page (landing.html)
  - click on button which triggers a redirect to 'https://mypix.compass-demo.com/authorize?responseType..... ' -> redirect url is the landing page again
  - User (browser) is redirected to mypix but since we are already authorizsed, we are immediatly redirected back to the url we passed in the "redirect_url" query string param


![Attack success](LandingPageSuccessWithAccessToken.png)
*works in chrome and FF*

## How to fix vulnerability
Problem is that the redirect_url is not checked. The url should either be whitelisted or not be passed at all when the Auth Server already knows the redirect_url (from the clientId) 
 *(not sure what follows the standard, I believe you have to pass it)*




## Analysis

### Worflow (not logged in)

1. printabookv2/start  (https://printabookv2.compass-demo.com/start ) 
  - user can choose which pics to import
  - Action: user chooses "private" pics and clicks "Import from MyPix"
2. mypix/authorize  https://mypix.compass-demo.com/authorize?response_type=token&client_id=c075fa13858988e5c50c8b71f8df39da&redirect_url=https://printabookv2.compass-demo.com/callback&state=Wtv4c8BC4u1wrqp3BezV&tracking_id=43aa6c80-14c8-4277-b90b-578e8110ee9f&scope=private
  - Redirected "mypix" via 302 http://mypix.compass-demo.com/ (which redirects to https://mypix.compass-demo.com/ )
  - user sees Login form (on https://mypix.compass-demo.com/)
  - Action: user enters credentials and posts credentials
3. POST mypix/signin   
  - Redirect to mypix/authorize (302)
4. mypix/authorize response_type=token&client_id=c075fa13858988e5c50c8b71f8df39da&redirect_url=https://printabookv2.compass-demo.com/callback&scope=public%20private&state=aLwNopm4DVAT48Dk8tvZ&tracking_id=76ef8ac0-20fc-4f52-bbff-a95e8d627a0c 
 - User is asked to confirm that he will allow (or deny) myPix to access pictures
  - Action: user clicks on allow
3. mypix/authorize POST  ()
  - info in body: response_type=token&client_id=c075fa13858988e5c50c8b71f8df39da&redirect_url=https%3A%2F%2Fprintabookv2.compass-demo.com%2Fcallback&scope=public+private&state=aLwNopm4DVAT48Dk8tvZ&tracking_id=76ef8ac0-20fc-4f52-bbff-a95e8d627a0c&grant=allow
  - Redirects back to printabook 
4. printabookv2/callback  https://printabookv2.compass-demo.com/callback#access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJteXBpeC1hdXRoLXNlcnZlciIsInVzZXIiOiJhbGljZSIsInNjb3BlIjoiIiwiZXhwIjoxNjgwMDQxNDU4LjE4ODQ5Nn0.PJ3VakzLr7R7DmiIqVDw7btKPRsvIEv-f7hR7R_EI9hmIPrXqjQBLRsnVYpaLHziCudfc1DHJs8o5ctMBekacaVAW-SgT6470W-1PjMnss6lvfOG69jxGuyPSco6tArpVI4AJVtUNSGuBRYrg55UTfvBtBldy_9xhxHqQZWkFmS4BEpH1AisJ03z47myiZlwwbCReT2lM8I2B1-qN4NqXG4AwoL9WLO0SVNysiYaUJbPLM36CkxVWgX6Gmlw1Iw7GEKgVVVCH_QFFmpJhV4Wck3f5XBKO0dYQV9bGOgz-bRCj6RYnDGuR0Ui8aGjiYYs0sLec30YkznFbPRwoHXCuQ&state=U8QPIyll60D7Kd7Fd0Ra&token_type=bearer
  - Shows imported images (public and/or private depending on what pics we initially wanted to see)



### Worflow (already logged in, same as before, just skips the login part)

1. printabookv2/start  (https://printabookv2.compass-demo.com/start ) 
  - user can choose which pics to import
  - Action: user chooses "private" pics and clicks "Import from MyPix"
2. mypix/authorize  https://mypix.compass-demo.com/authorize?response_type=token&client_id=c075fa13858988e5c50c8b71f8df39da&redirect_url=https://printabookv2.compass-demo.com/callback&state=Wtv4c8BC4u1wrqp3BezV&tracking_id=43aa6c80-14c8-4277-b90b-578e8110ee9f&scope=private
  - User is asked to confirm that he will allow (or deny) myPix to access pictures
  - Action: user clicks on allow
3. mypix/authorize POST  ()
  - info in body: response_type=token&client_id=c075fa13858988e5c50c8b71f8df39da&redirect_url=https%3A%2F%2Fprintabookv2.compass-demo.com%2Fcallback&scope=&state=U8QPIyll60D7Kd7Fd0Ra&tracking_id=23f65d8a-246a-44b7-afb5-45bec94618b2&grant=allow
  - Redirects back to printabook 
4. printabookv2/callback  https://printabookv2.compass-demo.com/callback#access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJteXBpeC1hdXRoLXNlcnZlciIsInVzZXIiOiJhbGljZSIsInNjb3BlIjoiIiwiZXhwIjoxNjgwMDQxNDU4LjE4ODQ5Nn0.PJ3VakzLr7R7DmiIqVDw7btKPRsvIEv-f7hR7R_EI9hmIPrXqjQBLRsnVYpaLHziCudfc1DHJs8o5ctMBekacaVAW-SgT6470W-1PjMnss6lvfOG69jxGuyPSco6tArpVI4AJVtUNSGuBRYrg55UTfvBtBldy_9xhxHqQZWkFmS4BEpH1AisJ03z47myiZlwwbCReT2lM8I2B1-qN4NqXG4AwoL9WLO0SVNysiYaUJbPLM36CkxVWgX6Gmlw1Iw7GEKgVVVCH_QFFmpJhV4Wck3f5XBKO0dYQV9bGOgz-bRCj6RYnDGuR0Ui8aGjiYYs0sLec30YkznFbPRwoHXCuQ&state=U8QPIyll60D7Kd7Fd0Ra&token_type=bearer
  - Shows imported images

### Info

App I explore
- https://printabookv2.compass-demo.com/start 
- example credentials: "Alice"  -> "Alice.123"

Catcher url
- /debug
- /clear
- /  -> index
- anything else will be captured