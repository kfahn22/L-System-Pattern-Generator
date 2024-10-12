// https://github.com/kfahn22/L-System-Pattern-Generator
// https://editor.p5js.org/kfahn/sketches/A4ksi8iY9j

// This sketch renders patterns that I have created using a L-system combined with different shapes
// The parameters are contained in the examples.json file

// For more info, refer to my github repo
// https://github.com/kfahn22/L-System-Pattern-Generator
// https://editor.p5js.org/kfahn/sketches/A4ksi8iY9j

// Build your own pattern https://editor.p5js.org/kfahn/sketches/3fdOtG7WX

// Lsystem data from rules.json
let rulesetData;

// Example data from examples.json
let exampleData;
let exampleDropdown; // object
let exampledropdown; // instance

let exampleOptions = [
  "ADH231a with Archimedes Spiral",
  "ADH231a with Astroid Curve",
  "ADH231a with Supershape Curve",
  "ADH256a with Superellipse",
  "ADH256a with Kiss Curve",
  "Board with Lissajous",
  "Box with Ceva",
  "Crystal with Maltese Cross",
  "Crystal with Supershape",
  "Doily with Bicorn Curve",
  "Doily with Supershape Curve",
  "Dragon2 with Gear Curve",
  "Dragon2 with Cornu Spiral",
  "Dragon1 with Astroid Curve",
  "Hilbert Curve with Eight Curve",
  "Hilbert Curve with Gear Curve",
  "Hilbert Curve with Kiss Curve",
  "Hilbert Curve with Quadrifolium Curve",
  "Koch snowflake with Bicorn curve",
  "Koch snowflake with Kiss curve",
  "Koch snowflake with Quadrilateral",
  "Koch snowflake with Supershape",
  "Koch snowflake with Word",
  "Kolam with Butterfly",
  "Kolam with Ceva",
  "Kolam with Deltoid",
  "Kolam with Gear Curve",
  "Kolam with Image",
  "Krishna Anklet with Gear Curve (Background)",
  "Krishna Anklet with Gear Curve",
  "Mango Leaf with Gear Curve",
  "Mango Leaf with Rose",
  "Peano with Cassini Oval",
  "Peano with Quadrilateral Curve",
  "Pentaplexity with Gear Curve",
  "Pentaplexity with Supershape Curve",
  "Quadratic gosper with Kiss curve",
  "Quadratic Snowflake with Quadrifolium curve",
  "Rounded Star with Cornu Spiral",
  "Skierpinski with Gear curve",
  "Skierpinski carpet with Supershape",
  "Snake kolam with Tear curve",
  "Square Skierpinski with Cornu Spiral",
];

// Control variables
let ruleset;
let shape_ui;

// Images (Dahlias with background removed)
let images = [];

// Preload the L-system rulesets and example data
function preload() {
  rulesetData = loadJSON("rules.json");
  exampleData = loadJSON("examples.json");
  for (let i = 0; i < 10; i++) {
    const path = "images/flowers";
    images[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup() {
  canvas = createCanvas(1000, 1000);
  canvas.position(10, 80);
  p5grain.setup();
  let posx = 10;
  let posy = 60;
  exampleDropdown = new ExampleDropdown(
    posx,
    posy,
    exampleData,
    exampleOptions[2]
  );
  let label = createP("L-system Pattern Examples");
  label.position(posx, posy - 50);
  exampledropdown = exampleDropdown.dropdown;

  addLsystem();
}

function handleInput() {
  exampledropdown.changed(reset);
}

function reset() {
  clear();
  exampleDropdown.selectExample();
  let exampleValues = exampleDropdown.setExample();
  setSystemVariables(exampleValues);
}

function addLsystem() {
  exampleDropdown.selectExample();
  let exampleValues = exampleDropdown.setExample();
  setSystemVariables(exampleValues);
  // Add function to handle change in choosen example
  handleInput();
}

function setSystemVariables(exampleValues) {
  let backgroundPalette = new Palette(exampleValues[2]); // Object
  let strokePalette = new Palette(exampleValues[3]); // Object
  let fillPalette = new Palette(exampleValues[4]); // Object
  background(backgroundPalette.palette[0]); // Need to get the palette, I am choosing first element in array (some choices only have one element)

  let ruleset = new Ruleset(rulesetData);
  let shape_ui = new ShapeUI();

  let colorMode;
  if (exampleValues[5] === true && exampleValues[6] === false) {
    colorMode = 0;
  } else if (exampleValues[5] === false && exampleValues[6] === true) {
    colorMode = 1;
  } else if (exampleValues[5] === true && exampleValues[6] === true) {
    colorMode = 2;
  }

  //Add turtle system
  let turtle = new Turtle(
    exampleValues,
    shape_ui,
    ruleset,
    strokePalette.palette,
    fillPalette.palette,
    colorMode,
    images
  );

  // When both stroke and fill are choosen, render is best if they are added sequencially
  if (colorMode == 0 || colorMode == 1) {
    turtle.addLsystem(colorMode);
  } else if (colorMode == 2) {
    turtle.addLsystemStrokeFill();
  }

  if (exampleValues[7] == true) {
    applyChromaticGrain(42);
  }
}