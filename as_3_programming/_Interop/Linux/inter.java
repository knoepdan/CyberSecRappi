import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Exercises {
	public static void main(String[] args) {	

		// read in standard input (can be piped via bash)
		// https://www.logicbig.com/how-to/java-cmd/piping-command-input-to-java.html
    	try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
          String line = null;
          while (true) {
              if ((line = reader.readLine()) != null) {
                  System.out.println("Standard input: " + line);
              } else {
                  //input finishes
                  break;
              }
        	}
      	} catch (Exception e) {
        	System.err.println(e);
		}

		// arguments
		if(args != null){
			for(int i = 0; i < args.length; i++){
				String param = args[i];
				System.out.println("Args-"+ i+": " + args[i]);
			}
		}else{
			System.out.println("No arguments passed");
		}
	}
}
