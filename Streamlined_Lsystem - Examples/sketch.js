// https://editor.p5js.org/kfahn/sketches/eJ37jUEeU

// Lsystem data from rules.json
let rulesetData;

// Example data from examples.json
let exampleData;
let exampleDropdown; // object
let exampledropdown; // instance
//let exampleChoice = "Dragon1 with Gear Curve";
let exampleChoice = "ADH231a with Astroid Curve";

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
    exampleChoice
  );
  exampledropdown = exampleDropdown.dropdown;
  dropdowns.push(exampleDropdown.dropdown);
  //exampleDropdown.selectExample();
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
  setSystemVariables(exampleValues);
}

function addLsystem() {
  exampleDropdown.selectExample();
  let exampleValues = exampleDropdown.setExample();
  let systemValues = exampleValues.slice(0, 15);
  //let shapeValues = exampleValues.slice(-9);
  controls = new AddControls(10, rulesetData, exampleValues);
  [dropdowns, resetButton, shape_ui] = addControls();
  setSystemVariables(exampleValues);
  // Add function to handle changes in sliders
  handleInput(dropdowns, resetButton);
  return controls;
}

function addControls() {
  let otherdropdowns = controls.returnDropdowns();
  for (d of otherdropdowns)
 { dropdowns.push(d);}
 //console.log(dropdowns)
  resetButton = controls.returnButtons();
  [fillShape, addStroke, addGrain] = controls.returnCheckboxes();
  //console.log(fillShape, addStroke, addGrain)
  shape_ui = controls.shape_ui;
  return [dropdowns, resetButton, shape_ui];
}

function setSystemVariables(exampleValues) {

  controls.setPalettes(exampleValues[2], exampleValues[3], exampleValues[4]);
  
  [currentBackgroundPalette, currentStrokePalette, currentFillPalette] =
    controls.returnColorPalettes();
    console.log(currentStrokePalette)
  background(currentBackgroundPalette[0]);
  fillShape = exampleValues[5];
  addStroke = exampleValues[6];

  // Retrieve values from json data for system 
  let systemValues = exampleValues.slice(0, 15)
  // Retrieve values from json data for shape (a, b, m, n, n1, n2, n3)
  let shapeValues = exampleValues.slice(-10);
  shape_ui.selectShape(shapeValues);

  console.log(exampleValues[0])
  let ruleset = controls.ruleset;

  //Add turtle system
   let turtle = new Turtle(
     shape_ui,
     systemValues,
     shapeValues,
     ruleset,
     fillShape,
     addStroke
   );
  
  turtle.addLsystem(currentStrokePalette, currentFillPalette, fillShape, addStroke);
//if (addGrain == true) {
    if (addGrain.checked() == true) {
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
