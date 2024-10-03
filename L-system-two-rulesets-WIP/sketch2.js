// https://github.com/kfahn22/L-System-Pattern-Generator
// https://editor.p5js.org/kfahn/sketches/3fdOtG7WX

// Lsystem data from rules.json
let rulesetData;

// Control variables
//let controls;
// let sliderGroup;
// let sliders = []; // Array to store slider references
// let dropdowns = []; // Array to store dropdowns
let shape_ui;
let images = [];

// Array to store dropdowns, sliderGroup, sliders, checkBoxes
let lsystem0;
let ruleChoice0 = "ADH231a";
let shapeChoice0 = "Supershape";
let sliderValues0 = [
  175,
  // "group 1",
  0.03, // wadj
  0.5, // hadj
  3, // level
  1, // strokeWeight
  220, // stroke alpha
  150, // fill alpha
  0, // fractal angle
  0.024, // length
  0.4, // shapeScale
  3.8, // a
  1, // b
  8, // m
  1, // n1
  0.8, // n2
  1, // n3
  1, // n
  0, // shape angle
];

let lsystem1;
let ruleChoice1 = "none";
let shapeChoice1 = "Rose";
let sliderValues1 = [
  1300,
  // "group 1",
  0.03, // wadj
  0.5, // hadj
  3, // level
  1, // strokeWeight
  220, // stroke alpha
  150, // fill alpha
  0, // fractal angle
  0.024, // length
  0.4, // shapeScale
  3.8, // a
  1, // b
  8, // m
  1, // n1
  0.8, // n2
  1, // n3
  1, // n
  0, // shape angle
];
let lsystems = [];

// Message variables
let ruleWarning; // Warning if level gets too high
let shapeMessage; // Shape message re parameters to choosen shape

// Buttons/checkboxes
//let resetButton;
// addStroke , fillShape , addP5Grain (default false),
// https://github.com/meezwhite/p5.grain
//let checkBoxes;

// Preload the L-system rulesets and example data
function preload() {
  rulesetData = loadJSON("rules.json");
  for (let i = 0; i < 10; i++) {
    const path = "images/flowers";
    images[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup() {
  canvas = createCanvas(800, 800);
  canvas.position(340, 75);
  canvas.id("mycanvas");
  p5grain.setup();
  lsystems.push(addLsystem(10, sliderValues0, ruleChoice0, shapeChoice0));
  lsystems.push(addLsystem(1150, sliderValues1, ruleChoice1, shapeChoice1));
  setSystemVariables(lsystems);
  //setSystemVariables(lsystems);
}

function updateValues(lsystem) {
  let controls = lsystem[0];
  let dropdowns = lsystem[1];
  let checkBoxes = lsystem[2];
  let sliderGroup = lsystem[3];
  let sliders = lsystem[4];
  let values = [];
  // Add ruleset, shape, palettes dropdown values
  for (let i = 0; i < dropdowns.length; i++) {
    values.push(dropdowns[i].selected());
  }
  // Add values for addStroke, fillShape, and addP5Grain
  for (let i = 0; i < 3; i++) {
    values.push(checkBoxes[i].checked());
  }
  let sliderValues = sliderGroup.getValues();
  for (let s of sliderValues) {
    values.push(s);
  }
  sliderGroup.updateLabels();
  return values;
}

function handleInput(lsystem) {
  //console.log(lsystem)
  let controls = lsystem[0];
  let dropdowns = lsystem[1];
  let checkBoxes = lsystem[2];
  let sliderGroup = lsystem[3];
  let sliders = lsystem[4];

  for (let d of dropdowns) {
    d.changed(reset);
  }
  for (let s of sliders) {
    s.input(reset);
  }
  for (let c of checkBoxes) {
    c.changed(reset);
  }
}

function reset() {
  clear();
  shapeMessage.hide();
  ruleWarning.hide();
  setSystemVariables(lsystems);
}

function addLsystem(pos, sliderValues, ruleChoice, shapeChoice) {
  let lsystem = [];
  let controls = new AddControls(
    pos,
    sliderValues,
    rulesetData,
    ruleChoice,
    shapeChoice
  );
  lsystem[0] = controls;
  lsystem[1] = controls.returnDropdowns();
  lsystem[2] = controls.returnCheckboxes();
  lsystem[3] = controls.sliderGroup;
  lsystem[4] = controls.sliders;
  handleInput(lsystem);

  return lsystem;
}

function setSystemVariables(lsystems) {
  // Add array to hold the data of both Lsystem arrays
  let lsystemValues = [];
  
  for (let i = 0; i < 2; i++) {
    // Array to hold the data of each Lsystem
    let lsystemData = [];
    let controls = lsystems[i][0];
    let values = updateValues(lsystems[i]);

    // Set color palettes
    let [currentBackgroundPalette, currentStrokePalette, currentFillPalette] =
      controls.setPalettes(
        values[2], // backgroundPalette
        values[3], // strokePalette
        values[4] // fillPalette
      );

    background(currentBackgroundPalette[0]);

    let ruleset = controls.ruleset;
    let shape_ui = controls.shape_ui;

    // Check to see whether addStroke and/or fillShape are checked
    // Set value of colorMode to 0,1,2 depended on state of variables
    let clrMode = null;
    if (values[5] === true && values[6] === false) {
      clrMode = 0;
    } else if (values[5] === false && values[6] === true) {
      clrMode = 1;
    } else if (values[5] === true && values[6] === true) {
      clrMode = 2;
    }

    lsystemData[0] = values;
    lsystemData[1] = shape_ui;
    lsystemData[2] = ruleset;
    lsystemData[3] = currentStrokePalette;
    lsystemData[4] = currentFillPalette;
    lsystemData[5] = clrMode;
    //console.log(lsystemData.slice(0,5))
    lsystemValues[i] = lsystemData;
    //}
  }
  //console.log(lsystemValues);
  let turtle = new Turtle(lsystemValues, images);

  // colorMode (addStroke, fillShape)
  for (let i = 0; i < 2; i++) {
    let dropdowns = lsystems[i][1];
    //console.log(lsystemValues[i][0][0])
    let ruleset = lsystemValues[i][2];
    //console.log(ruleset)
    //let ruleChoice = lsystemValues[i][0][0];
    //console.log(ruleset)
    // let ruleChoice = ruleset.currentFractal;
    let ruleChoice = dropdowns[0].value();
    ruleset.selectRule(ruleChoice);
    let lsystemData = ruleset.currentFractal
    //  let lsystemData = ruleset.setRule();
    //console.log(lsystemData)
    let clrMode = lsystemValues[i][5];
    let currentStrokePalette = lsystemValues[i][3];
    let currentFillPalette = lsystemValues[i][4];
    // Retrieve the values we need to send to the turtle function
    let values = lsystemValues[i][0].slice(8, 15); // retrieve data

    // console.log(lsystemData)
    //let fractalAngle = values[14];
    if (clrMode == 0 || clrMode == 1) {
      // Pass value of colorMode to turtle to indicate whether stroke or fill should be used to render Lsystem
      turtle.addLsystem(
        lsystemData,
        clrMode,
        currentStrokePalette,
        currentFillPalette,
        values
      );
    } else if (clrMode == 2) {
      // If both stroke and fill are checked, render the L-system twice, resetting the sentence between renders. If both are rendered at same time stroke shows through the fill (because looks best with alpha < 255) and the pattern is not as nice
      turtle.addLsystemStrokeFill(
        lsystemData,
        clrMode,
        currentStrokePalette,
        currentFillPalette,
        values
      );
    }
    let shape_ui = lsystemValues[i][1];
    // Add messages for shape parameters and rule level
    addMessages(
      shape_ui.message, // shape_ui
      turtle.warning, // turtle
      turtle.addWarning
    );
  }
}

// This function adds a message if the choosen shape is a function of the parameters (a, b, m, n, n1, n2, n3)
// A warning is also added if the choosen level exceeds some limits I imposed to keep the sketch from slowing down significantly or freezing
function addMessages(newMessage, warning, addWarning) {
  let addMessage = true;
  let message = null;
  if (newMessage != null) {
    message = newMessage;
  } else addMessage = false;

  shapeMessage = createP(message);
  shapeMessage.position(340, 0);
  shapeMessage.addClass("p");

  if (addMessage) {
    shapeMessage.show();
  } else {
    shapeMessage.hide();
  }
  ruleWarning = createP(warning);
  ruleWarning.position(340, 30);
  ruleWarning.addClass("p");

  if (!addWarning) {
    ruleWarning.hide();
  }
}
