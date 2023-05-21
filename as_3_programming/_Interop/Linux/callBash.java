import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Exercises {
	public static void main(String[] args) {	


	// https://mkyong.com/java/how-to-execute-shell-command-from-java/  

	try {

		// ####### Linux #######
		
		// Run a shell command
		Process process = Runtime.getRuntime().exec("ls /home/hacker/");

		// Run a shell script
		// Process process = Runtime.getRuntime().exec("path/to/hello.sh");

		// ####### Windows #######
		
		// Run a command
		//Process process = Runtime.getRuntime().exec("cmd /c dir C:\\Users\\mkyong");

		//Run a bat file
		//Process process = Runtime.getRuntime().exec(
				//"cmd /c hello.bat", null, new File("C:\\Users\\mkyong\\"));

		StringBuilder output = new StringBuilder();

		BufferedReader reader = new BufferedReader(
				new InputStreamReader(process.getInputStream()));

		String line;
		while ((line = reader.readLine()) != null) {
			output.append(line + "\n");
		}

		int exitVal = process.waitFor();
		if (exitVal == 0) {
			System.out.println("Success!");
			System.out.println(output);
			System.exit(0);
		} else {
			//abnormal...
		}

	} catch (IOException e) {
		e.printStackTrace();
	} catch (InterruptedException e) {
		e.printStackTrace();
	} catch (Exception e){
		e.printStackTrace();	
	}

	}
}
