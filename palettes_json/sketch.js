// L-system rules mostly from Paul Bourke
// https://paulbourke.net/fractals/lsys/

let level; // fractal level
let length; // step length
let axiom;
let sentence;
let rules = {};
let fractals = {};
let currentFractal;
let lsystem; // rules data
let lf; // length adjustment factor
let fractal; // rendered fractal

// Add variables for the lsystems
let none;
let board;
let circular;
let circular2;
let cross;
let crystal;
let diamond;
let dragon1, dragon2;
let fern, fern2, fern3;
let hexagonal_gosper;
let hilbert;
let kolam;
let koch_curve;
let krishna_anklet;
let koch_snowflake;
let leaf;
let mango_leaf;
let monkey_tree;
let peano;
let pentaplexity;
let quadratic_gosper;
let quadratic_snowflake1;
let quadratic_snowflake2;
let quadratic_koch_island;
let rings;
let snake_kolam;
let skierpinski;
let square_skierpinski;
let sticks;
let tree2;
let tiles;
let triangle_rule;

// Shape and color variables
let selectedShape; // custom shape to use in fractal
let blueGreenPalette;
let lightBluePalette;
let brownGreenPalette;
let aquaBluePalette;
let plantGreensPalette;
let redPalette;
let orangeBluePalette;
let rygbPalette;
let gyobPalette;
let violetMintPalette;
let purpleBluePalette;
let yellowBluePalette;
let blueYellowPalette;
let modrianPalette;
let pinkPalette;
let pinkPurplePalette;
let greenOrangePalette;
let rgpPalette;
let currentPalette;
let selectedColor; // current color within palette
let palettes = {}; // array that holds all of the available palettes

// Color variables
let fl = true; // whether the shapes are filled or stroke
let sw; // strokeweight
let currentAlpha; // alpha of color
let angle; // angle of rotation
let checkbox; // boolean for whether shape is filed

let resetButton; // Reset fractal
let saveButton; // Save image
let wadj; // amount to to translate in x direction
let hadj; // amount to to translate in y direction
let shapeScale; //variable to adjust size of shapes

// Shape parameters
let shapeAngle;
let a;
let b;
let m;
let n;
let n1, n2, n3;

// Drop downs to select rule, pattern, and colors
let colorDropdown;
let shapeDropdown;
let ruleDropdown;

// Sliders
let wSlider, hSlider; // placement of fractral
let levelSlider; // the level of the fractal
let lengthSlider; // determines step size
let strokeWeightSlider; // strokeweight
let scaleSlider; // scale of shape
let rotateSlider; // rotation of fractal
let rotateShapeSlider; // rotatation of shape
let alphaSlider;
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
let rotatelabel;
let alphalabel;
let alabel;
let blabel;
let mlabel;
let nlabel;
let n1label, n2label, n3label;
let rotate2label;

function preload() {
  loadJSON("rules.json", getRules);
  loadJSON("palettes.json", getColors);
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.position(0, 50);
  background(currentPalette[4]);

  // Controls
  addButtons();
  addSliders();
  fillShape = createCheckbox("Fill");
  fillShape.position(430, 5);

  wadj = wSlider.value();
  hadj = hSlider.value();
  level = levelSlider.value();
  length = lengthSlider.value();
  sw = strokeWeightSlider.value();
  angle = radians(rotateSlider.value());
  shapeScale = scaleSlider.value();
  currentAlpha = alphaSlider.value();
  shapeScale = scaleSlider.value();
  shapeAngle = rotateShapeSlider.value();
  a = aSlider.value();
  b = bSlider.value();
  m = mSlider.value();
  n = nSlider.value();
  n1 = n1Slider.value();
  n2 = n2Slider.value();
  n3 = n3Slider.value();

  adjustFill();
  chooseColor(currentPalette);

  pickRule();
  addShapes();
  pickShape();
  translate(width / 2, height / 2);
  rotate(angle);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
}

function draw() {
  noLoop();
}

function addSliders() {
  wSlider = createSlider(0.05, 1, 0.5, 0.025);
  wSlider.position(width + 10, 35);
  // Create a label for the slider
  wlabel = createP("Translate x:");
  wlabel.position(wSlider.x, wSlider.y - 35);

  hSlider = createSlider(0.05, 1, 0.5, 0.025);
  // hSlider = createSlider(5, height - 5, height*0.5, 5);
  hSlider.position(width + 10, 90);
  hlabel = createP("Translate y:");
  hlabel.position(hSlider.x, hSlider.y - 35);

  lengthSlider = createSlider(10, 50, 20, 1);
  lengthSlider.position(width + 10, 215);
  lengthlabel = createP("Step length:");
  lengthlabel.position(lengthSlider.x, lengthSlider.y - 35);

  strokeWeightSlider = createSlider(0.1, 8, 1, 0.1);
  strokeWeightSlider.position(width + 10, 270);
  swlabel = createP("StrokeWeight:");
  swlabel.position(strokeWeightSlider.x, strokeWeightSlider.y - 35);

  // Create alpha slider
  alphaSlider = createSlider(100, 255, 200, 5);
  alphaSlider.position(width + 10, 330);
  alphalabel = createP("Alpha:");
  alphalabel.position(alphaSlider.x, alphaSlider.y - 35);

  scaleSlider = createSlider(0.15, 1.15, 0.5, 0.05);
  scaleSlider.position(width + 10, 370);
  scalelabel = createP("Scale:");
  scalelabel.position(scaleSlider.x, scaleSlider.y - 35);

  rotateSlider = createSlider(-180, 180, 0, 5);
  rotateSlider.position(width + 10, 410);
  rotatelabel = createP("Rotate fractal:");
  rotatelabel.position(rotateSlider.x, rotateSlider.y - 35);

  levelSlider = createSlider(0, 12, 1, 1);
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
  rotateSlider.input(reset);
  alphaSlider.input(reset);
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

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  lf = pattern.length_factor;
  sentence = axiom;
}

function getRules(data) {
  lsystem = data;

  none = lsystem.none;
  board = lsystem.board;
  circular = lsystem.circular;
  circular2 = lsystem.circular2;
  cross = lsystem.cross;
  crystal = lsystem.crystal;
  diamond = lsystem.diamond;
  dragon1 = lsystem.dragon1; // some shapes have fill
  dragon2 = lsystem.dragon2; // unfilled
  leaf = lsystem.leaf;
  fern = lsystem.fern;
  fern2 = lsystem.fern2;
  fern3 = lsystem.fern3;
  hexagonal_gosper = lsystem.hexagonal_gosper;
  hilbert = lsystem.hilbert;
  krishna_anklet = lsystem.krishna_anklet;
  kolam = lsystem.kolam;
  koch_curve = lsystem.koch_curve;
  krishna_anklet = lsystem.krishna_anklet;
  koch_snowflake = lsystem.koch_snowflake;
  leaf = lsystem.leaf;
  mango_leaf = lsystem.mango_leaf;
  peano = lsystem.peano;
  pentaplexity = lsystem.pentaplexity;
  quadratic_gosper = lsystem.quadratic_gosper;
  quadratic_koch_island = lsystem.quadratic_koch_island;
  quadratic_snowflake1 = lsystem.quadratic_snowflake1;
  quadratic_snowflake2 = lsystem.quadratic_snowflake2;
  rings = lsystem.rings;
  snake_kolam = lsystem.snake_kolam;
  skierpinski = lsystem.skierpinski;
  square_skierpinski = lsystem.square_skierpinski;
  sticks = lsystem.sticks;
  tree2 = lsystem.tree2;
  tiles = lsystem.tiles;
  triangle_rule = lsystem.triangle;

  ruleDropdown = createSelect();
  ruleDropdown.position(10, 5);
  ruleDropdown.option("none");
  ruleDropdown.option("board");
  ruleDropdown.option("board2");
  ruleDropdown.option("circular");
  ruleDropdown.option("circular2");
  ruleDropdown.option("cross");
  ruleDropdown.option("crystal");
  ruleDropdown.option("diamond");
  ruleDropdown.option("dragon1");
  ruleDropdown.option("dragon2");
  ruleDropdown.option("fern");
  ruleDropdown.option("fern2");
  ruleDropdown.option("fern3");
  ruleDropdown.option("hexagonal_gosper");
  ruleDropdown.option("hilbert");
  ruleDropdown.option("kolam");
  ruleDropdown.option("koch_curve");
  ruleDropdown.option("krishna_anklet");
  ruleDropdown.option("koch_snowflake");
  ruleDropdown.option("leaf");
  ruleDropdown.option("mango_leaf");
  ruleDropdown.option("peano");
  ruleDropdown.option("pentaplexity");
  ruleDropdown.option("quadratic_gosper");
  ruleDropdown.option("quadratic_koch_island");
  ruleDropdown.option("quadratic_snowflake1");
  ruleDropdown.option("quadratic_snowflake2");
  ruleDropdown.option("rings");
  ruleDropdown.option("snake_kolam");
  ruleDropdown.option("skierpinski");
  ruleDropdown.option("square_skierpinski");
  ruleDropdown.option("sticks");
  ruleDropdown.option("tree2");
  ruleDropdown.option("tiles");
  // ruleDropdown.option("tree");
  ruleDropdown.option("triangle_rule");

  // Set initial value of the dropdown
  currentFractal = ruleDropdown.selected("dragon2");
  ruleDropdown.changed(pickRule);
}
function pickRule() {
  currentFractal = ruleDropdown.value();

  switch (currentFractal) {
    case "none":
      currentFractal = none;
      break;

    case "board":
      currentFractal = board;
      break;
    case "circular":
      currentFractal = circular;
      break;
    case "circular2":
      currentFractal = circular2;
      break;
    case "cross":
      currentFractal = cross;
      break;
    case "crystal":
      currentFractal = crystal;
      break;
    case "diamond":
      currentFractal = diamond;
      break;
    case "dragon1":
      currentFractal = dragon1;
      break;
    case "dragon2":
      currentFractal = dragon2;
      break;
    case "fern":
      currentFractal = fern;
      break;
    case "fern2":
      currentFractal = fern2;
      break;
    case "fern3":
      currentFractal = fern3;
      break;
    case "hexagonal_gosper":
      currentFractal = hexagonal_gosper;
      break;
    case "hilbert":
      currentFractal = hilbert;
      break;
    case "kolam":
      currentFractal = kolam;
      break;
    case "krishna_anklet":
      currentFractal = krishna_anklet;
      break;
    case "koch_curve":
      currentFractal = koch_curve;
      break;
    case "koch_snowflake":
      currentFractal = koch_snowflake;
      break;
    case "leaf":
      currentFractal = leaf;
      break;
    case "mango_leaf":
      currentFractal = mango_leaf;
      break;
    case "peano":
      currentFractal = peano;
      break;
    case "pentaplexity":
      currentFractal = pentaplexity;
      break;
    case "quadratic_gosper":
      currentFractal = quadratic_gosper;
      break;
    case "quadratic_koch_island":
      currentFractal = quadratic_koch_island;
      break;
    case "quadratic_snowflake1":
      currentFractal = quadratic_snowflake1;
      break;
    case "quadratic_snowflake2":
      currentFractal = quadratic_snowflake2;
      break;
    case "rings":
      currentFractal = rings;
      break;
    case "snake_kolam":
      currentFractal = snake_kolam;
      break;
    case "rings":
      currentFractal = rings;
      break;
    case "skierpinski":
      currentFractal = skierpinski;
      break;
    case "square_skierpinski":
      currentFractal = square_skierpinski;
      break;
    case "sticks":
      currentFractal = sticks;
      break;
    case "tiles":
      currentFractal = tiles;
      break;
    case "tree2":
      currentFractal = tree2;
      break;
    case "triangle_rule":
      currentFractal = triangle_rule;
      break;
  }
  setRule(currentFractal);
}

function getColors(data) {
  palettes = data.colors;
  aquaBluePalette = palettes.aqua_blue;
  lightBluePalette = palettes.light_blue;
  brownGreenPalette = palettes.brown_green;
  blueGreenPalette = palettes.blue_green;
  plantGreensPalette = palettes.plant_greens;
  redPalette = palettes.reds;
  orangeBluePalette = palettes.orange_blue;
  rygbPalette = palettes.rygb;
  gyobPalette = palettes.gyob;
  violetMintPalette = palettes.violet_mint;
  maroonBluePalette = palettes.maroon_blue;
  purpleBluePalette = palettes.purple_blue;
  yellowBluePalette = palettes.yellow_blue;
  modrianPalette = palettes.modrian;
  blueYellowPalette = palettes.blue_yellow;
  pinkPalette = palettes.pink;
  pinkPurplePalette = palettes.pink_purple;
  greenOrangePalette = palettes.green_orange;
  rgpPalette = palettes.ruby_green_peach;

  // Set default palette
  currentPalette = aquaBluePalette;

  // Create dropdown menu
  colorDropdown = createSelect();
  colorDropdown.position(300, 5);
  colorDropdown.option("aqua_blue");
  colorDropdown.option("light_blue");
  colorDropdown.option("brown_green");
  colorDropdown.option("blue_green");
  colorDropdown.option("plant_greens");
  colorDropdown.option("reds");
  colorDropdown.option("orange_blue");
  colorDropdown.option("rygb");
  colorDropdown.option("gyob");
  colorDropdown.option("violet_mint");
  colorDropdown.option("maroon_blue");
  colorDropdown.option("purple_blue");
  colorDropdown.option("yellow_blue");
  colorDropdown.option("blue_yellow");
  colorDropdown.option("modrian");
  colorDropdown.option("pink");
  colorDropdown.option("pink");
  colorDropdown.option("pink_purple");
  colorDropdown.option("green_orange");
  colorDropdown.option("ruby_green_peach");

  // Set initial value of the dropdown
  colorDropdown.selected("aqua_blue");

  // Attach event listener
  colorDropdown.changed(pickColor);
  selectedColor = chooseColor(currentPalette);
}

function addShapes() {
  shapeDropdown = createSelect();
  shapeDropdown.position(180, 5);
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
  shapeDropdown.selected("cassini");
}

function pickShape() {
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
      break;
    case "astroid":
      selectedShape = new Astroid(0, 0, length * shapeScale, a);
      selectedShape.addPoints();
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
      selectedShape = new addText(0, 0, length * shapeScale, shapeAngle);
      break;
    case "zigzag":
      // shapeAngle PI
      selectedShape = new Zigzag(0, 0, length * shapeScale, shapeAngle);
      selectedShape.addPoints();
      break;
  }
  shapeDropdown.changed(pickShape);
}

function pickColor() {
  currentPalette = colorDropdown.value();
  switch (currentPalette) {
    case "aqua_blue":
      currentPalette = aquaBluePalette;
      break;
    case "light_blue":
      currentPalette = lightBluePalette;
      break;
    case "brown_green":
      currentPalette = brownGreenPalette;
      break;
    case "blue_green":
      currentPalette = blueGreenPalette;
      break;
    case "plant_greens":
      currentPalette = plantGreensPalette;
      break;
    case "reds":
      currentPalette = redPalette;
      break;
    case "orange_blue":
      currentPalette = orangeBluePalette;
      break;
    case "rygb":
      currentPalette = rygbPalette;
      break;
    case "gyob":
      currentPalette = rygbPalette;
      break;
    case "violet_mint":
      currentPalette = violetMintPalette;
      break;
    case "maroon_blue":
      currentPalette = maroonBluePalette;
      break;
    case "purple_blue":
      currentPalette = purpleBluePalette;
      break;
    case "yellow_blue":
      currentPalette = yellowBluePalette;
      break;
    case "modrian":
      currentPalette = modrianPalette;
      break;
    case "blue_yellow":
      currentPalette = blueYellowPalette;
      break;
    case "pink":
      currentPalette = pinkPalette;
      break;
    case "pink_purple":
      currentPalette = pinkPurplePalette;
      break;
    case "green-orange":
      currentPalette = greenOrangePalette;
      break;
    case "ruby_green_peach":
      currentPalette = rgpPalette;
      break;
  }

  colorDropdown.changed(pickColor);
  fillShape.changed(adjustFill);
}

// Add buttons
function addButtons() {
  // Add a reset button
  resetButton = createButton("Reset");
  resetButton.position(475, 5);
  resetButton.mousePressed(reset);

  // Add a button to save the design
  // saveButton = createButton("Save Image");
  // saveButton.position(520, 5);
  // saveButton.mousePressed();
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
}

function updateVariables() {
  colorDropdown.changed(pickColor);
  background(currentPalette[4]);
  fillShape.changed(adjustFill);
  shapeDropdown.changed(pickShape);
  ruleDropdown.changed(pickRule);
}

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let key in rules) {
      if (current === key) {
        found = true;
        nextSentence += rules[key];

        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
}

function turtle() {
  for (let i = 0; i < sentence.length; i++) {
    let sl = sentence.length;
    let current = sentence.charAt(i);
    adjustFill();
    if (current === "F") {
      if (selectedShape) {
        selectedShape.show();
      } else {
        stroke(currentPalette[1]);
        noFill();
        strokeWeight(sw);
        line(0, 0, length, 0);
      }
      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == ">") {
      push();
      if (ruleDropdown === "line") {
        length = length * lf;
      } else {
        length = length * lf;
        pickShape();
      }
      pop();
    } else if (current == "<") {
      push();
      if (ruleDropdown === "line") {
        length = length / lf;
      } else {
        length = length / lf;
        pickShape();
      }
      pop();
    } else if (current == "(") {
      angle -= radians(0.1);
    } else if (current == ")") {
      angle += radians(0.1);
    } else if (current == "{") {
      beginShape();
    } else if (current == "}") {
      noStroke();
      fill(currentPalette[0]);
      endShape();
    }
  }
}

function reset() {
  background(currentPalette[4]);
  wadj = wSlider.value();
  hadj = hSlider.value();
  level = levelSlider.value();
  length = lengthSlider.value();
  sw = strokeWeightSlider.value();
  angle = radians(rotateSlider.value());
  shapeScale = scaleSlider.value();
  shapeAngle = rotateShapeSlider.value();
  a = aSlider.value();
  b = bSlider.value();
  m = mSlider.value();
  n = nSlider.value();
  n1 = n1Slider.value();
  n2 = n2Slider.value();
  n3 = n3Slider.value();

  // Update Color Variables
  selectedColor = chooseColor(currentPalette);
  adjustFill();
  updateLabels();
  updateVariables();

  pickShape();
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  pickRule();
  if (levelSlider.value() > 1 && ruleDropdown.value() === "circular") {
    stroke(255);
    text(
      "The level cannot be > 1 with the circular pattern",
      -width / 2 + 20,
      -height / 2 + 20
    );
    level = 1;
    for (let i = 0; i < 1; i++) {
      generate();
    }
    levellabel.html("Level: " + "1");
    turtle();
  } else if (
    levelSlider.value() > 2 &&
    (ruleDropdown.value() === "quadratic_gosper" ||
      ruleDropdown.value() === "quadratic_koch_island")
  ) {
    stroke(255);
    text(
      "The level cannot be > 2 with the current fractal pattern",
      -width / 2 + 20,
      -height / 2 + 20
    );
    level = 2;
    for (let i = 0; i < level; i++) {
      generate();
    }
    levellabel.html("Level: " + "2");
    turtle();
  } else if (
    levelSlider.value() > 3 &&
    (ruleDropdown.value() === "board" ||
      ruleDropdown.value() === "fern" ||
      ruleDropdown.value() === "hexagonal_gosper" ||
      ruleDropdown.value() === "skierpinski" ||
      ruleDropdown.value() === "peano" ||
      ruleDropdown.value() === "quadratic_snowflake1" ||
      ruleDropdown.value() === "quadratic_snowflake2" ||
      ruleDropdown.value() === "skierpinski" ||
      ruleDropdown.value() === "square_skierpinski" ||
      ruleDropdown.value() === "tiles")
  ) {
    stroke(255);
    text(
      "The level cannot be > 3 with the current fractal pattern",
      -width / 2 + 20,
      -height / 2 + 20
    );
    level = 3;
    for (let i = 0; i < level; i++) {
      generate();
    }
    levellabel.html("Level: " + "3");
    turtle();
  } else if (
    levelSlider.value() > 4 &&
    (ruleDropdown.value() === "cross" || ruleDropdown.value() === "crystal")
  ) {
    stroke(255);
    text(
      "The level cannot be > 4 with the current fractal pattern",
      -width / 2 + 20,
      -height / 2 + 20
    );
    level = 4;
    for (let i = 0; i < level; i++) {
      generate();
    }
    levellabel.html("Level: " + "4");
    turtle();
  } else if (
    levelSlider.value() > 5 &&
    (ruleDropdown.value() === "hilbert" ||
      ruleDropdown.value() === "pentaplexity" ||
      ruleDropdown.value() === "triangle_rule" ||
      ruleDropdown.value() === "fern3")
  ) {
    stroke(255);
    text(
      "The level cannot be > 5 with the current fractal pattern",
      -width / 2 + 20,
      -height / 2 + 20
    );
    level = 5;
    for (let i = 0; i < level; i++) {
      generate();
    }
    levellabel.html("Level: " + "5");
    turtle();
  } else {
    for (let i = 0; i < level; i++) {
      generate();
    }
    turtle();
    levellabel.html("Level: " + levelSlider.value());
  }
  pop();
}

function updateLabels() {
  wlabel.html("Translate w: " + wSlider.value());
  hlabel.html("Translate h: " + hSlider.value());
  levellabel.html("Level: " + levelSlider.value());
  lengthlabel.html("Length: " + lengthSlider.value());
  rotatelabel.html("Rotate fractal: " + rotateSlider.value());
  scalelabel.html("Scale: " + scaleSlider.value());
  alphalabel.html("Alpha: " + alphaSlider.value());
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

function adjustFill() {
  selectedColor = chooseColor(currentPalette);
  let c = color(selectedColor[0], selectedColor[1], selectedColor[2]);
  let a = alphaSlider.value();
  c.setAlpha(a);
  if (fillShape.checked() === true) {
    noStroke();
    fill(c);
  } else {
    noFill();
    strokeWeight(sw);
    stroke(c);
  }
}

function chooseColor(palette) {
  let c;
  let r = random(1);
  if (r <= 0.25) {
    c = palette[0];
  } else if (r > 0.25 && r <= 0.5) {
    c = palette[1];
  } else if (r > 0.5 && r <= 0.75) {
    c = palette[2];
  } else if (r > 0.75) {
    c = palette[3];
  }
  return c;
}
