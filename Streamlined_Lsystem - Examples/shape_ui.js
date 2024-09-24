class ShapeUI {
  constructor(posDropdown, choice) {
    this.choice = choice;
    // this.values = values;
    this.shape = null;
    this.message = null;
    this.addMessage = false;
    this.dropdown = createSelect(); // Create a select element
    this.dropdown.position(posDropdown, 50); // Position the dropdown
    this.setupDropdown(); // Initialize dropdown with options
  }

  // Populate the dropdown with shape options
  setupDropdown() {
    const shapes = [
      "Archimedes Spiral",
      "Arc",
      "Astroid",
      "Atom",
      "Bicorn",
      "Box",
      "Cassini Oval",
      "Ceva",
      "Cornu Spiral",
      "Maltese Cross",
      "Deltoid",
      "Eight",
      "Gear",
      "Heart",
      "Kiss Curve",
      "Knot",
      "Line",
      "Quadrifolium",
      "Quadrilateral",
      "Rose",
      "Superellipse",
      "Supershape",
      "Tear Drop",
    ];

    // Add shape options to the dropdown
    shapes.forEach((shape) => this.dropdown.option(shape));
    this.dropdown.selected(this.choice);
  }

  // sliders - wadj,hadj,level,length,strokeweight, shapeAlpha,sc,rot,rotateShape,a,b,m,n,n1,n2, n3
  // Create a shape based on the selected option
  selectShape(shapeName, values) {
    let r = values[0] * values[1]; // gridlength * shapeScale
    // Create a new Shape object with necessary parameters
    this.shape = new Shape(
      r,
      values[2], // a
      values[3], // b
      values[4], // m
      values[5], // n
      values[6], // n1
      values[7], // n2
      values[8], // n3
      values[9] // rotateShape
    );

    this.shape.points = []; // Clear any existing points
    this.message = null; // Clear out any prior message;
    // Use a switch statement to call the corresponding method
    switch (shapeName) {
      case "Archimedes Spiral":
        this.shape.archimedesSpiral();
        this.addMessage = true;
        this.message = "The archimedes spiral is a f(n).";
        break;
      case "Arc":
        this.shape.arc();
        this.addMessage = true;
        this.message = "Arc is a f(a), a = 2 yields a circle";
        break;
      case "Astroid":
        this.shape.astroid();
        this.addMessage = true;
        this.message = "The astroid is a f(a).";
        break;
      case "Atom":
        this.shape.atom();
        break;
      case "Bicorn":
        this.shape.bicorn();
        break;
      case "Box":
        this.shape.box();
        break;
      case "Cassini Oval":
        this.shape.cassiniOval();
        this.addMessage = true;
        this.message = "The cassini oval curve is a f(a, b).";
        break;
      case "Ceva":
        this.shape.ceva();
        break;
      case "Cornu Spiral":
        this.shape.cornuSpiral();
        this.addMessage = true;
        this.message = "The cornu spiral is f(a), a ~ [0.5, 2]";
        break;
      case "Maltese Cross":
        this.shape.malteseCross();
        this.addMessage = true;
        this.message = "The cross curve is a f(a, b).";
        break;
      case "Deltoid":
        this.shape.deltoid();
        break;
      case "Eight":
        this.shape.eight();
        break;
      case "Gear":
        this.shape.gear();
        this.addMessage = true;
        this.message = "The gear curve is a f(a, b, m).";
        break;
      case "Heart":
        this.shape.heart();
        break;
      case "Kiss Curve":
        this.shape.kissCurve();
        this.addMessage = true;
        this.message = "The kiss curve is a f(a, b).";
        break;
      case "Knot":
        this.shape.knot();
        break;
      case "Line":
        this.shape.showLine();
        break;
      case "Quadrifolium":
        this.shape.quadrifolium();
        break;
      case "Quadrilateral":
        this.shape.quadrilaterial();
        this.addMessage = true;
        this.message = "The quadrilaterial curve is a f(m).";
        break;
      case "Rose":
        this.shape.rose();
        break;
      case "Superellipse":
        this.shape.superellipse();
        this.addMessage = true;
        this.message = "The superellipse curve is a f(a, b, n).";
        break;
      case "Supershape":
        this.shape.supershape();
        this.addMessage = true;
        this.message = "The supershape curve is a f(a, b, m, n1, n2, n3).";
        break;
      case "Tear Drop":
        this.shape.tearDrop();
        break;
      default:
        break;
    }
  }
}
