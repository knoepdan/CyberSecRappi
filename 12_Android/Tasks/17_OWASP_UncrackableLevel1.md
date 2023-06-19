# Android OWASP Uncrackable level 1
### Steps

**1. Download and install CrackMeSimple.apk**
- Download and rename to "UnCrackable-Level1.apk"
- Start emulator (Nexus 5)
- `adb install UnCrackable-Level1.apk` -> install

**2. First analysis**
- start app
    - message "root deteced" appears and app exits  
- have a first look at apk file with `jadx-gui`
    - starting point found "MainActivity" including root (and debug) check which will cause the app to exit

Relevant code to access secrect (bArr)
```
public static boolean a(String str) {
        byte[] bArr;
        byte[] bArr2 = new byte[0];
        try {
            bArr = sg.vantagepoint.a.a.a(b("8d127684cbc37c17616d806cf50473cc"), Base64.decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=", 0));
        } catch (Exception e) {
            Log.d("CodeCheck", "AES error:" + e.getMessage());
            bArr = bArr2;
        }
        return str.equals(new String(bArr));
    }
```

**3. Reveal secret by running java code**

- Run relevant java code in a normal java environment. 
    - in Android studio ("Empty Views Activity" as here we can use java)
        - normal java would probably also work but some interfaces and classes are different which makes it easier to use the "real" thing. (unfortunately, android studio is extremly slow)
        - Code see below (minimally shortended)
    - Found secret: **"I want to believe"**

```

import androidx.appcompat.app.AppCompatActivity;
import android.util.Base64;
import android.os.Bundle;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_main);
        test();
    }

    public static void test() {
        String str = new String("dummyirrelevant");
        byte[] bArr;
        byte[] bArr2 = new byte[0];
        try {
            byte[] bb = b("8d127684cbc37c17616d806cf50473cc");
            byte[] baseDecoded = Base64.decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=", 0);

            bArr = vantagePoint_a(bb, baseDecoded);
        } catch (Exception e) {
            System.out.println("Error " + e.getMessage());

            bArr = bArr2;
        }
        String secret = new String(bArr);
        System.out.println("This is the secret: " + secret);
    }

    public static byte[] b(String str) {
        int length = str.length();
        byte[] bArr = new byte[length / 2];
        for (int i = 0; i < length; i += 2) {
            bArr[i / 2] = (byte) ((Character.digit(str.charAt(i), 16) << 4) + Character.digit(str.charAt(i + 1), 16));
        }
        return bArr;
    }

    public static byte[] vantagePoint_a(byte[] bArr, byte[] bArr2) {
        try {
            SecretKeySpec secretKeySpec = new SecretKeySpec(bArr, "AES/ECB/PKCS7Padding");
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(2, secretKeySpec); // cipher.init(2, secretKeySpec);
            return cipher.doFinal(bArr2);
        } catch (Exception ex) {
            System.out.println("Error initiate AES " + ex.getMessage());
        }
        return new byte[0];
    }

}
```

