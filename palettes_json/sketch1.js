// sketch to print out shape images
// let resetButton;
let shapeDropdown;
let selectedShape;

// Color variables
//let fl = true; // whether the shapes are filled or stroke
let sw; // strokeweight
//let currentAlpha; // alpha of color
//let angle; // angle of rotation
//let checkbox; // boolean for whether shape is filed

let resetButton; // Reset fractal
//let saveButton; // Save image
let wadj; // amount to to translate in x direction
let hadj; // amount to to translate in y direction

// Shape parameters
let length;
let level = 0;
let shapeScale; //variable to adjust size of shapes
let shapeAngle; // shape parameters;
let a;
let b;
let m;
let n;
let n1, n2, n3;

// Sliders
let wSlider, hSlider; // placement of fractral
let levelSlider; // the level of the fractal
let lengthSlider; // determines step size
let strokeWeightSlider; // strokeweight
let scaleSlider; // scale of shape
// let rotateSlider; // rotation of fractal
let rotateShapeSlider; // rotatation of shape
//let alphaSlider;
let aSlider;
let bSlider;
let mSlider;
let nSlider;
let n1Slider, n2Slider, n3Slider;

// Labels for sliders/input
let wlabel;
let hlabel;
let levellabel;
let lengthlabel;
let swlabel;
let scalelabel;
//let rotatelabel;
let alphalabel;
let alabel;
let blabel;
let mlabel;
let nlabel;
let n1label, n2label, n3label;
let rotate2label;

function setup() {
  createCanvas(400, 400);
  background(0);
  stroke(255);
  noFill();

  // Add a reset button
  resetButton = createButton("Reset");
  resetButton.position(width + 150, 5);
  resetButton.mousePressed(reset);
  addSliders();

  wadj = wSlider.value();
  hadj = hSlider.value();
  length = lengthSlider.value();
  sw = strokeWeightSlider.value();
  //angle = radians(rotateSlider.value());
  shapeScale = scaleSlider.value();
  //currentAlpha = alphaSlider.value();
  shapeScale = scaleSlider.value();
  shapeAngle = rotateShapeSlider.value();
  a = aSlider.value();
  b = bSlider.value();
  m = mSlider.value();
  n = nSlider.value();
  n1 = n1Slider.value();
  n2 = n2Slider.value();
  n3 = n3Slider.value();

  strokeWeight(sw);
  push();
  translate(width / 2, height / 2);
  addShapes();
  pickShape();
  selectedShape.show();
  pop();
}

function draw() {
  noLoop();
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
}

function addSliders() {
  wSlider = createSlider(0.05, 1, 1, 0.025);
  wSlider.position(width + 10, 35);
  // Create a label for the slider
  wlabel = createP("Translate x:");
  wlabel.position(wSlider.x, wSlider.y - 35);

  hSlider = createSlider(0.05, 1, 1, 0.025);
  hSlider.position(width + 10, 90);
  hlabel = createP("Translate y:");
  hlabel.position(hSlider.x, hSlider.y - 35);

  lengthSlider = createSlider(10, 200, 150, 10);
  lengthSlider.position(width + 10, 215);
  lengthlabel = createP("Step length:");
  lengthlabel.position(lengthSlider.x, lengthSlider.y - 35);

  strokeWeightSlider = createSlider(1, 8, 4, 1);
  strokeWeightSlider.position(width + 10, 270);
  swlabel = createP("StrokeWeight:");
  swlabel.position(strokeWeightSlider.x, strokeWeightSlider.y - 35);

  // Create alpha slider
  //   alphaSlider = createSlider(100, 255, 200, 5);
  //   alphaSlider.position(width + 10, 330);
  //   alphalabel = createP("Alpha:");
  //   alphalabel.position(alphaSlider.x, alphaSlider.y - 35);

  scaleSlider = createSlider(0.15, 1.15, 0.5, 0.05);
  scaleSlider.position(width + 10, 370);
  scalelabel = createP("Scale:");
  scalelabel.position(scaleSlider.x, scaleSlider.y - 35);

  rotateSlider = createSlider(-180, 180, 0, 5);
  rotateSlider.position(width + 10, 410);
  rotatelabel = createP("Rotate fractal:");
  rotatelabel.position(rotateSlider.x, rotateSlider.y - 35);

  levelSlider = createSlider(0, 12, 0, 1);
  levelSlider.position(width + 10, 155);
  levellabel = createP("Fractal level:");
  levellabel.position(levelSlider.x, levelSlider.y - 35);

  // Sliders for shape variables
  rotateShapeSlider = createSlider(-180, 180, 0, 5);
  rotateShapeSlider.position(width + 10, 460);
  rotateShapelabel = createP("Rotate shape:");
  rotateShapelabel.position(rotateShapeSlider.x, rotateShapeSlider.y - 35);

  aSlider = createSlider(0, 10, 1, 0.25);
  aSlider.position(width + 10, 500);
  alabel = createP("a:");
  alabel.position(aSlider.x, aSlider.y - 35);
  bSlider = createSlider(0, 10, 1, 0.25);
  bSlider.position(width + 10, 540);
  blabel = createP("b: ");
  blabel.position(bSlider.x, bSlider.y - 35);
  mSlider = createSlider(0, 10, 4, 1);
  mSlider.position(width + 10, 580);
  mlabel = createP("m:");
  mlabel.position(mSlider.x, mSlider.y - 35);
  nSlider = createSlider(-1, 5, 1, 0.5);
  nSlider.position(width + 10, 620);
  nlabel = createP("n: ");
  nlabel.position(nSlider.x, nSlider.y - 35);

  n1Slider = createSlider(0.25, 2, 1, 0.25);
  n1Slider.position(width + 10, 660);
  n1label = createP("n1: ");
  n1label.position(n1Slider.x, n1Slider.y - 35);

  n2Slider = createSlider(0.25, 2, 1, 0.25);
  n2Slider.position(width + 10, 700);
  n2label = createP("n2: ");
  n2label.position(n2Slider.x, n2Slider.y - 35);

  n3Slider = createSlider(0.25, 2, 1, 0.25);
  n3Slider.position(width + 10, 740);
  n3label = createP("n3: ");
  n3label.position(n3Slider.x, n3Slider.y - 35);

  wSlider.input(reset);
  hSlider.input(reset);
  levelSlider.input(reset);
  lengthSlider.input(reset);
  strokeWeightSlider.input(reset);
  //   rotateSlider.input(reset);
  //   alphaSlider.input(reset);
  scaleSlider.input(reset);
  rotateShapeSlider.input(reset);
  aSlider.input(reset);
  bSlider.input(reset);
  mSlider.input(reset);
  nSlider.input(reset);
  n1Slider.input(reset);
  n2Slider.input(reset);
  n3Slider.input(reset);
  updateLabels();
}

function addShapes() {
  shapeDropdown = createSelect();
  shapeDropdown.position(width + 200, 5);
  shapeDropdown.option("archimedes");
  shapeDropdown.option("astroid");
  shapeDropdown.option("atom");
  shapeDropdown.option("bicorn");
  shapeDropdown.option("butterfly");
  shapeDropdown.option("cannibus");
  shapeDropdown.option("cassini");
  shapeDropdown.option("ceva");
  shapeDropdown.option("deltoid");
  shapeDropdown.option("cornu");
  shapeDropdown.option("cross");
  shapeDropdown.option("eight");
  shapeDropdown.option("gear");
  shapeDropdown.option("heart");
  shapeDropdown.option("lissajous");
  shapeDropdown.option("kiss");
  shapeDropdown.option("knot");
  shapeDropdown.option("line");
  shapeDropdown.option("ophiuride");
  shapeDropdown.option("quadrifolium");
  shapeDropdown.option("quadrilateral");
  shapeDropdown.option("rose");
  shapeDropdown.option("superellipse");
  shapeDropdown.option("supershape");
  shapeDropdown.option("spiral");
  shapeDropdown.option("tear");
  shapeDropdown.option("text");
  shapeDropdown.option("zigzag");

  // Set initial value of the dropdown
  shapeDropdown.selected("archimedes");
}

function pickShape() {
  // stroke(255);
  // strokeWeight(10);
  let selected = shapeDropdown.value();
  switch (selected) {
    case "archimedes":
      selectedShape = new ArchimedesSpiral(
        0,
        0,
        length * shapeScale,
        -1,
        shapeAngle
      );
      selectedShape.addPoints();
      selectedShape.show();
      break;
    case "astroid":
      selectedShape = new Astroid(0, 0, length * shapeScale, a);
      selectedShape.addPoints();
      selectedShape.show();
      break;
    case "atom":
      // angle 27/64
      // a is hard-coded at 0.25 to keep length short
      selectedShape = new AtomSpiral(0, 0, length * shapeScale, a, shapeAngle);
      selectedShape.addPoints();
      break;
    case "bicorn":
      selectedShape = new Bicorn(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "butterfly":
      selectedShape = new Butterfly(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "cannibus":
      selectedShape = new Cannibus(0, 0, length * shapeScale, shapeAngle);
      selectedShape.addPoints();
      break;
    case "cassini":
      // 1, 1.25 peanut shaped/
      // 1, 2 oval
      selectedShape = new CassiniOval(0, 0, length * shapeScale, a, b);
      selectedShape.addPoints();
      break;
    case "ceva":
      selectedShape = new Ceva(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "cornu":
      // angle PI/2;
      selectedShape = new CornuSpiral(0, 0, length * shapeScale, shapeAngle);
      selectedShape.addPoints();
      break;
    case "cross":
      // 1 quadrifolium
      // gets longer and more rounded as a increases
      selectedShape = new MalteseCross(0, 0, length * shapeScale, a, b);
      selectedShape.addPoints();
      break;
    case "deltoid":
      // angle PI/6;
      selectedShape = new Deltoid(0, 0, length * shapeScale, a, shapeAngle);
      selectedShape.addPoints();
      break;
    case "eight":
      selectedShape = new Eight(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "gear":
      selectedShape = new Gear(0, 0, length * shapeScale, b, m);
      selectedShape.addPoints();
      break;
    case "heart":
      selectedShape = new Heart(0, 0, length * shapeScale, shapeAngle);
      selectedShape.addPoints();
      break;
    case "knot":
      selectedShape = new Knot(0, 0, length * shapeScale, shapeAngle);
      selectedShape.addPoints();
      break;
    case "kiss":
      selectedShape = new KissCurve(0, 0, length * shapeScale, a, b);
      selectedShape.addPoints();
      break;
    case "line":
      selectedShape = null;
      break;
    case "lissajous":
      // angle - PI/2
      selectedShape = new Lissajous(
        0,
        0,
        length * shapeScale,
        a,
        b,
        m,
        shapeAngle
      );
      selectedShape.addPoints();
      break;
    case "quadrifolium":
      selectedShape = new Quadrifolium(0, 0, length * shapeScale, a);
      selectedShape.addPoints();
      break;
    case "quadrilateral":
      selectedShape = new Quadrilateral(
        0,
        0,
        length * shapeScale,
        m,
        shapeAngle
      );
      selectedShape.addPoints();
      break;
    case "rose":
      // a > 0 levels hole in middle
      selectedShape = new Rose(0, 0, length * shapeScale, a, b, n);
      selectedShape.addPoints();
      break;
    case "ophiuride":
      // a > 0 levels hole in middle
      selectedShape = new Ophiuride(
        0,
        0,
        length * shapeScale,
        a,
        b,
        shapeAngle
      );
      selectedShape.addPoints();
      break;
    case "spiral":
      // n = 1 Archimedian Spiral
      // n = -1 Hyperbolic Spiral
      // n = 1/2 Fermat spiral
      // n = -1/2 Lituus spiral
      // n = 2 Galilean spiral
      // let a = 0.5;
      // let n = -0.5;
      // (PI * 10) / 8
      let dir = -1;
      selectedShape = new Spiral(
        0,
        0,
        dir,
        length * shapeScale,
        a,
        n,
        shapeAngle
      );
      //selectedShape = new Spiral(0, 0, dir, length, .5, -0.5, 0);
      selectedShape.addPoints();
      break;
    case "superellipse":
      selectedShape = new Superellipse(0, 0, length * shapeScale, a, b, n);
      selectedShape.addPoints();
      break;
    case "supershape":
      selectedShape = new Supershape(
        0,
        0,
        length * shapeScale,
        a,
        b,
        n1,
        n2,
        n3,
        m
      );
      selectedShape.addPoints();
      break;
    case "tear":
      // shapeAngle PI
      selectedShape = new TearDrop(0, 0, length * shapeScale, shapeAngle);
      selectedShape.addPoints();
      break;
    case "text":
      // shapeAngle PI
      selectedShape = new addText(0, 0, length * shapeScale, shapeAngle);
      //selectedShape.addPoints();
      break;
    case "zigzag":
      // shapeAngle PI
      selectedShape = new Zigzag(0, 0, length * shapeScale, shapeAngle);
      selectedShape.addPoints();
      break;
  }
  shapeDropdown.changed(pickShape);
}

function reset() {
  wadj = wSlider.value();
  hadj = hSlider.value();
  level = levelSlider.value();
  length = lengthSlider.value();
  sw = strokeWeightSlider.value();
  //   angle = radians(rotateSlider.value());
  shapeScale = scaleSlider.value();
  shapeAngle = rotateShapeSlider.value();
  a = aSlider.value();
  b = bSlider.value();
  m = mSlider.value();
  n = nSlider.value();
  n1 = n1Slider.value();
  n2 = n2Slider.value();
  n3 = n3Slider.value();
  updateVariables();

  pickShape();
  push();
  background(0);
  translate((width / 2) * wadj, (height / 2) * hadj);
  selectedShape.show();
  pop();
  updateLabels();
}
function updateVariables() {
  //   colorDropdown.changed(pickColor);
  //   background(currentPalette[4]);
  //   fillShape.changed(adjustFill);
  shapeDropdown.changed(pickShape);
  //   ruleDropdown.changed(pickRule);
}

function updateLabels() {
  wlabel.html("Translate w: " + wSlider.value());
  hlabel.html("Translate h: " + hSlider.value());
  levellabel.html("Level: " + levelSlider.value());
  lengthlabel.html("Length: " + lengthSlider.value());
  //   rotatelabel.html("Rotate fractal: " + rotateSlider.value());
  scalelabel.html("Scale: " + scaleSlider.value());
  //   alphalabel.html("Alpha: " + alphaSlider.value());
  rotateShapelabel.html("Rotate shape: " + rotateShapeSlider.value());
  alabel.html("a: " + aSlider.value());
  blabel.html("b: " + bSlider.value());
  mlabel.html("m: " + mSlider.value());
  nlabel.html("n: " + nSlider.value());
  n1label.html("n1: " + n1Slider.value());
  n2label.html("n2: " + n2Slider.value());
  n3label.html("n3: " + n3Slider.value());
  swlabel.html("StrokeWeight: " + strokeWeightSlider.value());
}
