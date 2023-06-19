# CrackMe RE Challenge
### Steps

**1. Download and install CrackMe.apk**
- Download and rename to "CrackMe.apk"
- Start emulator (Nexus 5)
- `adb install CrackMe.apk` -> install

**2. Look at the code of CrackMe.apk**
- `jadx-gui` and check decompiled code
  - *Remark: had to set path to the $path variable again: `export PATH=$PATH:/home/hacker/jadx/build/jadx/bin`*



Hardcoded string in MainActivity: "MDE5MjgzNzQ2NTAw"
What happens with string that is entered:
1. var step1 = getBytes("UTF-8"); // reversible action
2. var treatedAnswer = base64Encoded(step1); // reversible action
3. if(treatedAnswer == "MDE5MjgzNzQ2NTAw") -> we have found the secret

So goal is to find a string that after it is run through some functions results in a given string. Luckily, we don't deal with a real one-way functions (e.g. hashes) and can therefore, relativly easily revert the action. 

**3. Solution**

Little java program to find the secret code (basically performing the steps in reverse order)
```
import java.util.Base64;

public class JavaProject {

	private static final String codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	private String secret_code = "MDE5MjgzNzQ2NTAw";

	public static void main(String[] args) {
		String secretCode = new String("MDE5MjgzNzQ2NTAw");
		byte[] data = Base64.getDecoder().decode(secretCode);
		String searchedAnswer = new String(data, StandardCharsets.UTF_8);
		System.out.println("Answer we are looking for: " + searchedAnswer);// 019283746500
	}
}
```

Found secret: "019283746500"