# Java


## Run java

Firstly, ensure java SDK is available on your machine. 
Check installed version: `java --version`  (should be > 11 and JDK). If not available you need to install java SDK.-

### Run java in VS Code

**Variant 1 -> just use Code Runner (for simple stuff)**
In the .vscode/settings.json define the code runner to run jshell
```
{
	"code-runner.executorMap": {
		"java": "JAVA_HOME=$(/usr/libexec/java_home -v11) && cd $dir && cat $fileName | jshell -",
	},
}
```

*Remark: not tested (aka didnt work on first attempt)*

**Variant 2 -> Using VS Extension** 
1. Install extension: 
    - Language Support for Java (by Red Hat)
    - https://marketplace.visualstudio.com/items?itemName=redhat.java
      - This - from my understanding - only provides intellisense etc. (or it is not fully integrated in VS Code) Debugging didnt work. This extension is likely unnecessary
2. Install extension
   - Extension pack for java (by Microsoft)
   - https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack
3. Open (or create) a java file  (see example hello world)
4. Run and/or debug java :-) 

*Remark: tested and works on Kali Linux*


### Compile and run java manually

Generally, you have to be in the directory of the concerned files (or add directory via additional param which is not shown here) 

- Compile a java program to class (bytecode): `javac helloWorld.java` -> output would be "helloWorld.class"
- Run java bytecode (.class): `java helloWorld` (without the class extension)
- Compile and run in one step:  `java helloWorld.java`
  - possible since version 11

*Remark: not tested*

## Java Hello World

Hello world program: 
```
public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("Hello, Java!");
	}
}
```

Possible filename: helloWorld.java