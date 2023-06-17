# CrackMeSimple -> find password

### Basics

Prerequisite 1: installation of android tools (Lab 1)
Prerequisite 2: CrackMeSimple installedand running (original or hacked version from exercise 5 Modify package)


## Approach copy java code and run it

started `jadx-gui` and copied java code into my own java project to get the password: 

```
package javaproject.com;

import javax.crypto.Cipher;
import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class JavaProject {

	private static byte[] exs = { -28, 73, 79, 78, 113, 73, 101, 98, 115, 6, 27, -35, 111, -55, -114, -11, -29, 0, -73,
			91, 115, -24, -4, -94, -59, 43, -57, 112, 11, -54, -115, 2 };

	private static final String ENCRYPTION_IV = "SHCUOkfd89ut7777";
	private static final String ENCRYPTION_KEY = "Simpleji4todnkfL";

	public static byte[] decrypt(byte[] bArr) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(2, makeKey(), makeIv());
			return cipher.doFinal(bArr);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	static AlgorithmParameterSpec makeIv() {
		try {
			return new IvParameterSpec(ENCRYPTION_IV.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}
	}

	static Key makeKey() {
		try {
			return new SecretKeySpec(MessageDigest.getInstance("SHA-256").digest(ENCRYPTION_KEY.getBytes("UTF-8")),
					"AES");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		} catch (NoSuchAlgorithmException e2) {
			e2.printStackTrace();
			return null;
		}
	}

	public static void main(String[] args) {
		byte[] bytePw = decrypt(exs);
		String str2 = new String(bytePw);
		System.out.println(str2);
	}
}


```
str2 -> "HL{R3v3rsing.FUN}"




## Other possible approaches
- Adapt code byte code and build apk
    - it should be possible to adjust the byte code so the string is displayed on the screen (e.g.: adapt code so always successful as in previous task and then display pw instead of "Well done..." string )
- tracing with frida (not tried)
- overload/hooking with frida
    - see lab video: 30:00
    - https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/_layouts/15/stream.aspx?
- Cyberchef
    - see lab video: 36:00