// https://github.com/kfahn22/L-System-Pattern-Generator
// https://editor.p5js.org/kfahn/sketches/KmKxgvx03

// Lsystem data from rules.json
let rulesetData;

// Control variables
let images = [];

let backgroundDropdown;
let syncVariables; // checkbox for whether the same translation and length variables are used for both Lsystems

let sliderPos = 0;
let dropdownPos = sliderPos + 280;
let canvasPos = dropdownPos + 250;

// Array to store dropdowns, sliderGroup, sliders, checkBoxes
let lsystem0;
// let ruleChoice0 = "ADH231a";
// let shapeChoice0 = "Flower";
// let strokeChoice0 = "orange";
// let fillChoice0 = "purplePalette";
let sliderValues0 = [
  sliderPos,
  0.05, // wadj
  0.5, // hadj
  3, // level
  1, // strokeWeight
  220, // stroke alpha
  240, // fill alpha
  0, // fractal angle
  0.023, // length
  0.4, // shapeScale
  3.8, // a
  1, // b
  8, // m
  1, // n1
  0.8, // n2
  1, // n3
  1, // n,
  5, // d
  0, // shape angle
];

let lsystem1;
// let ruleChoice1 = "ADH231a";
// let shapeChoice1 = "Supershape";
// let strokeChoice1 = "orange";
// let fillChoice1 = "bluePalette";
let sliderValues1 = [
 sliderPos + 1600,
  0.05, // wadj
  0.5, // hadj
  3, // level
  1, // strokeWeight
  220, // stroke alpha
  150, // fill alpha
  0, // fractal angle
  0.023, // length
  0.4, // shapeScale
  4.1, // a
  3.8, // b
  8, // m
  1, // n1
  0.8, // n2
  1, // n3
  1, // n
  5, // d
  0, // shape angle
];
let lsystems = [];
let sliderArrays = [sliderValues0, sliderValues1];
let ruleChoices = ["ADH231a", "ADH231a"];
let shapeChoices = ["Flower", "Supershape"];
let strokeChoices = ["orange", "orange"];
let fillChoices = ["purplePalette", "bluePalette"];

// Message variables
let ruleWarning = [null, null]; // Warning if level gets too high
let shapeMessage; // Shape message RE parameters of choosen shape
let removeRuleset;
let addp5Grain = []; // checkbox re whether to add p5grain, default false

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
  canvas.position(canvasPos, 95);
  canvas.id("mycanvas");
  p5grain.setup();

  backgroundDropdown = new PaletteDropdown(
    dropdownPos,
    260,
    "black",
    "Background Color"
  );

  syncVariables = createCheckbox(
    "Use the same translation and length variables",
    true
  );
  syncVariables.position(canvasPos, 10);
  syncVariables.style("color", "white");

  for (let i = 0; i < 2; i++) {
    lsystems.push(
      addLsystem(
        i,
        dropdownPos + i * 1000,
        sliderArrays[i],
        ruleChoices[i],
        shapeChoices[i],
        strokeChoices[i],
        fillChoices[i]
      )
    );
  }
  // lsystems.push(
  //   addLsystem(
  //     dropdownPos,
  //     sliderValues0,
  //     ruleChoice0,
  //     shapeChoice0,
  //     strokeChoice0,
  //     fillChoice0
  //   )
  // );
  // lsystems.push(
  //   addLsystem(
  //     1170,
  //     sliderValues1,
  //     ruleChoice1,
  //     shapeChoice1,
  //     strokeChoice1,
  //     fillChoice1
  //   )
  // );
  setSystemVariables(lsystems);
}

function updateValues(lsystem) {
  backgroundDropdown.setPalette(backgroundDropdown.dropdown.value());
  let c = backgroundDropdown.palette;
  background(c[0]);
  let dropdowns = lsystem[1];
  let checkBoxes = lsystem[2];
  let sliderGroup = lsystem[3];
  let values = [];
  // Add ruleset, shape, palettes dropdown values
  for (let i = 0; i < dropdowns.length; i++) {
    values.push(dropdowns[i].value());
  }
  // Add values for addStroke, fillShape, and addP5Grain
  for (let i = 0; i < 4; i++) {
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
  let dropdowns = lsystem[1];
  let checkBoxes = lsystem[2];
  let sliders = lsystem[4];
  backgroundDropdown.dropdown.changed(reset);
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

function addLsystem(
  index,
  pos,
  sliderValues,
  ruleChoice,
  shapeChoice,
  strokeChoice,
  fillChoice
) {
  let lsystem = [];
  let controls = new AddControls(
    index,
    pos,
    sliderValues,
    rulesetData,
    ruleChoice,
    shapeChoice,
    strokeChoice,
    fillChoice
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
  let sliderValues = [];
  removeRuleset = lsystems[1][2][3];
  let n; // number of rulesets to render
  if (removeRuleset.checked()) {
    n = 1;
  } else {
    n = 2;
  }

  for (let i = 0; i < n; i++) {
    // Array to hold the data of each Lsystem
    let lsystemData = [];

    let controls = lsystems[i][0];
    let values = updateValues(lsystems[i]);

    addp5Grain.push(lsystems[i][2][2]); // add addp5Grain checkBoxes to array

    // Set color palettes
    let [currentStrokePalette, currentFillPalette] = controls.setPalettes(
      values[2], // strokePalette
      values[3] // fillPalette
    );

    let ruleset = controls.ruleset;
    let shape_ui = controls.shape_ui;

    // Check to see whether addStroke and/or fillShape are checked
    // Set value of colorMode to 0,1,2 depended on state of variables
    let clrMode = null;
    if (values[4] === true && values[5] === false) {
      clrMode = 0;
    } else if (values[4] === false && values[5] === true) {
      clrMode = 1;
    } else if (values[4] === true && values[5] === true) {
      clrMode = 2;
    }

    lsystemData[0] = values;
    lsystemData[1] = shape_ui;
    lsystemData[2] = ruleset;
    lsystemData[3] = currentStrokePalette;
    lsystemData[4] = currentFillPalette;
    lsystemData[5] = clrMode;
    lsystemValues[i] = lsystemData;
  }

  let turtle = new Turtle(lsystemValues, images);

  let shapeChoices = [];
  let ruleChoices = [];

  // colorMode (addStroke, fillShape)
  for (let i = 0; i < n; i++) {
    let dropdowns = lsystems[i][1];
    let ruleset = lsystemValues[i][2];
    let ruleChoice = dropdowns[0].value();
    shapeChoices.push(lsystems[i][1][1].value());
    ruleChoices.push(ruleChoice);
    ruleset.selectRule(ruleChoice);
    let lsystemData = ruleset.currentFractal;

    // Whether same translation and grid length should be used for all L-systems
    if (syncVariables.checked() && n == 2) {
      lsystemValues[1][0][8] = lsystemValues[0][0][8];
      lsystemValues[1][0][9] = lsystemValues[0][0][9];
      lsystemValues[1][0][15] = lsystemValues[0][0][15];
    }

    // Get Shape data
    sliderValues.push(lsystemValues[i][0].slice(-18)); // -18
    let clrMode = lsystemValues[i][5];
    let currentStrokePalette = lsystemValues[i][3];
    let currentFillPalette = lsystemValues[i][4];

    // Pass value of colorMode to turtle to indicate whether stroke or fill should be used to render Lsystem
    turtle.addLsystem(
      lsystemData,
      shapeChoices,
      clrMode,
      currentStrokePalette,
      currentFillPalette,
      sliderValues,
      i,
      ruleChoices
    );

    if (addp5Grain[i].checked() == true) {
      applyChromaticGrain(42);
    }
  }
  // Add messages for shape parameters and rule level
  // Number of messages returned on number of rulesets
  shapeMessage = updateMessage(turtle.shape_messages, n);
  ruleWarning = updateMessage(turtle.ruleWarnings, n);
  addMessages(shapeMessage, ruleWarning, turtle.addWarning);
}

// This function adds a message if the choosen shape is a function of the parameters (a, b, m, n, n1, n2, n3, d)
// A warning is also added if the choosen level exceeds some limits I imposed to keep the sketch from slowing down significantly or freezing
function addMessages(shapeMessages, warnings) {
  let addMessage = true;
  let addWarning = true;
  let message = null;
  let warning = null;
  if (shapeMessages != null) {
    message = shapeMessages;
  } else addMessage = false;

  shapeMessage = createP(message);
  shapeMessage.position(canvasPos, 30);
  shapeMessage.addClass("p");

  if (addMessage) {
    shapeMessage.show();
  } else {
    shapeMessage.hide();
  }

  if (warnings != null) {
    warning = warnings;
  } else addWarning = false;

  ruleWarning = createP(warning);
  ruleWarning.position(canvasPos, 60);
  ruleWarning.addClass("p");

  if (addWarning) {
    ruleWarning.show;
  } else {
    ruleWarning.hide();
  }
}

// Adds a message if the choosen shape is a function of one of the shape parameters
function updateMessage(messages, n) {
  let message;
  if (n > 1) {
    if (
      (messages[0] == messages[1] && messages[0] != null) ||
      (messages[0] != null && messages[1] === null)
    ) {
      message = messages[0];
    } else if (
      messages[0] != null &&
      messages[1] != null &&
      messages[0] != messages[1]
    ) {
      message = messages[0] + " " + messages[1];
    } else if (messages[0] == null && messages[1] != null) {
      message = messages[1];
    } else if (messages[0] == null && messages[0] == null) {
      message = null;
    }
  } else {
    message = messages;
  }
  return message;
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "k" || key === "K") {
    save("img.jpg");
  }
}
