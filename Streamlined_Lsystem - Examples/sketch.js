// https://editor.p5js.org/kfahn/sketches/eJ37jUEeU

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
  "ADH256a with Kiss Curve",
  "Box with Ceva",
  "Crystal with Maltese Cross",
  "Crystal with Supershape",
  "Hilbert Curve with Eight Curve",
  "Hilbert Curve with Gear Curve",
  "Hilbert Curve with Kiss Curve",
  "Hilbert Curve with Quadrifolium Curve",
  "Doily with Supershape Curve",
  "Dragon2 with Gear Curve",
  "Dragon1 with Astroid Curve",
  "Koch snowflake with Bicorn curve",
  "Koch snowflake with Kiss curve",
  "Koch snowflake with Quadrilateral",
  "Kolam with Ceva",
  "Kolam with Deltoid",
  "Kolam with Gear Curve",
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
let controls;
let sliderGroup;
let sliders = []; // Array to store slider references
let dropdowns = []; // Array to store dropdowns
let shape_ui;

// Message variables
let ruleWarning; // Warning if level gets too high
let shapeMessage; // Shape message re parameters to choosen shape

// Buttons/checkboxes
let resetButton;
let fillShape; // Boolean, default false
let addStroke; // Boolean, default true
let showExample; // Boolean, default true

// https://github.com/meezwhite/p5.grain
let addGrain; // Boolean, default false

// Preload the L-system rulesets and example data
function preload() {
  rulesetData = loadJSON("rules.json");
  exampleData = loadJSON("examples.json");
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.position(250, 200);
  p5grain.setup();
  exampleDropdown = new ExampleDropdown(
    700,
    10,
    exampleData,
    exampleOptions[1]
  );
  exampledropdown = exampleDropdown.dropdown;
  dropdowns.push(exampleDropdown.dropdown);
  controls = addLsystem();
}

function handleInput(dropdowns, resetButton) {
  for (let d of dropdowns) {
    d.changed(reset);
  }
  resetButton.mousePressed(reset);
}

function reset() {
  clear();
  shapeMessage.hide();
  ruleWarning.hide();
  exampleDropdown.selectExample();
  let exampleValues = exampleDropdown.setExample();
  //console.log(exampleValues)
  setSystemVariables(exampleValues);
}

function addLsystem() {
  exampleDropdown.selectExample();
  let exampleValues = exampleDropdown.setExample();
  controls = new AddControls(10, rulesetData, exampleValues);
  [dropdowns, resetButton] = addControls();
  setSystemVariables(exampleValues);
  // Add function to handle changes in sliders
  handleInput(dropdowns, resetButton);
  return controls;
}

function addControls() {
  let otherdropdowns = controls.returnDropdowns();
  for (d of otherdropdowns) {
    dropdowns.push(d);
  }
  resetButton = controls.returnButtons();
  [fillShape, addStroke, addGrain] = controls.returnCheckboxes();

  return [dropdowns, resetButton];
}

function setSystemVariables(exampleValues) {
  [currentBackgroundPalette, currentStrokePalette, currentFillPalette] =
    controls.setPalettes(exampleValues[2], exampleValues[3], exampleValues[4]);

  background(currentBackgroundPalette[0]);

  let ruleset = controls.ruleset;
  let shape_ui = controls.shape_ui;
 // let colorMode = controls.setColorMode();

  let colorMode;
  if (exampleValues[6] === true && exampleValues[5] === false) {
    colorMode = 0;
  } else if (exampleValues[6] === false && exampleValues[5] === true) {
    colorMode = 1;
  } else if (exampleValues[6] === true && exampleValues[5] === true) {
    colorMode = 2;
  }
  //console.log(exampleValues[5], exampleValues[6], colorMode);

  //Add turtle system
  let turtle = new Turtle(
    exampleValues,
    shape_ui,
    ruleset,
    currentStrokePalette,
    currentFillPalette,
    colorMode
  );

  // When both stroke and fill are choosen, render is best if they are added sequencially
  if (colorMode == 0 || colorMode == 1) {
    turtle.addLsystem(colorMode);
  } else if (colorMode == 2) {
    turtle.addLsystemStrokeFill();
  }

  addGrain = exampleValues[7];

  if (addGrain == true) {
    applyChromaticGrain(42);
  }
  // Add messages for shape parameters and rule level
  addMessages(shape_ui.message, turtle.warning, turtle.addWarning);
}

function addMessages(newMessage, warning, addWarning) {
  let addMessage = true;
  let message = null;
  if (newMessage != null) {
    message = newMessage;
  } else addMessage = false;

  shapeMessage = createP(message);
  shapeMessage.position(600, 10);
  shapeMessage.addClass("p");

  if (addMessage) {
    shapeMessage.show();
  } else {
    shapeMessage.hide();
  }
  ruleWarning = createP(warning);
  ruleWarning.position(600, 50);
  ruleWarning.addClass("p");

  if (!addWarning) {
    ruleWarning.hide();
  }
}
