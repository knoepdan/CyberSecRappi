package ClassesAndInheritance;

public class Triangle implements Shape {

	private double a; // side a

	private double b; // side b

	private double gamma; // angle

	public Triangle(double sideA, double sideB, double angleGamma) {
		this.a = sideA;
		this.b = sideB;
		this.gamma = angleGamma;
	}

	public double calculateArea() {
		double res = (this.a * this.b * Math.sin(this.gamma)) / 2;
		return Math.abs(res);
	}

	public double calculateCircumference() {
		// in 2 steps to limit line lenght
		double resOne = Math.pow(this.a, 2) + Math.pow(this.b, 2) - (2 * this.a * this.b * Math.cos(this.gamma));
		return this.a + this.b + Math.sqrt(Math.abs(resOne));
	}

	public String toString() {
		return "Triangle";
	}
}
