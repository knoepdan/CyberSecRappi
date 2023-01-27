package ClassesAndInheritance;

public class Parallelogram implements Shape {

	private double base;

	private double height;

	private double angle;

	public Parallelogram(double baseLenght, double heightLength, double mainAngle){
		this.base = baseLenght;
		this.height = heightLength;
		this.angle = mainAngle;
	}

	public double calculateArea() {
		return this.base * this.height;
	}

	public double calculateCircumference() {
		double res =  2 * (this.base + (this.height / Math.sin(angle)));
		return Math.abs((res));
	}

	public String toString() {
		return "Parallelogram";
	}
}
