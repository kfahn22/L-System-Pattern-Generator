//https://editor.p5js.org/kfahn/sketches/R6T0EmC5j

// let n = 0;

let graphics = [];
let shapes = [];

let sliderGroup;
let sliders;
let shape_ui;
let shapeMessages = [];
let addMessages = [];
//let w = 100;
let n;

const shapeNames = [
  "Arc",
  "Astroid",
  //  "Bicorn",
  //  "Box",
  //  "Butterfly",
  //  "Cannibus",
  "Cassini Oval",
  "Ceva",
  "Cornu Spiral",
  "Craniod",
  //  "Deltoid",
  //  "Eight",
  "Flower",
  "Gear",
  //  "Heart",
  "Kiss Curve",
  "Knot",
  //  "Line",
  "Lissajous",
  "Maltese Cross",
  //  "Quadrifolium",
  "Quadrilateral",
  "Spiral",
  "Superellipse",
  "Supershape",
  //  "Tear Drop",
  //  "Zigzag",
];

function setup() {
  createCanvas(1000, 1000);
  let n = shapes.length;
  let w = floor(width / n);
  sliderGroup = new SliderGroup(
    10,
    1, // a
    1, // b
    8, // m
    1, // n1
    1, // n2
    1, // n3
    1, // n
    0 // shape angle
  );
  sliders = sliderGroup.sliders;
  sliderValues = sliderGroup.getValues();
  //  shape_ui = new ShapeUI(pos, 20, "Gear", "Shape");
  //shapeMessages.push(shape_ui.message);
  // addMessages.push(shape_ui.addMessage);
  ///shapeDropdown = shape_ui.dropdown;

  drawShapes(0, 0, width);
  noLoop();
}

function draw() {
  background(255);
  for (let g of graphics) {
    image(g.buffer, g.x, g.y, g.w, g.h);
  }
}

// draw all of the shapes to the graphics buffers
function drawShapes(x, y, index) {
  drawShape(x, y, shapes[index]);
  let newD = d * 0.5;
  if (newD > val) {
    drawSquare(x, y, newD);
    drawSquare(x + newD, y + newD, newD);
  }
}

function drawShapes(x, y, w, sliderValues) {
  let buffer = createGraphics(w, w);

  for (let i = 0; i < shapeNames.length; i++) {
    selectShape(i, sliderValues);
  }
  // let s = new Shape(
  //   buffer,
  //   r,
  //   a,
  //  b,
  //   n1,
  //   n2,
  //    n3,
  //   m,
  //   n,
  //   angle
  // );
  // Add the shapes to the shapes array
  //shapes[i].push[s]
  s.show();
  graphics.push({
    buffer: buffer,
    x: x,
    y: y,
    w: w,
    h: w,
  });
}

function selectShape(index, buffer, w, sliderValues) {
  // Create a new Shape object with necessary parameters
  let shape = new Shape(
    buffer,
    w,
    sliderValues[0], // a
    sliderValues[1], // b
    sliderValues[2], // m
    sliderValues[3], // n1
    sliderValues[4], // n2
    sliderValues[5], // n3
    sliderValues[6], // n
    sliderValues[7] // rotateShape
  );

  shape.points = []; // Clear any existing points
  let message = null; // Clear out any prior message;
  // Use a switch statement to call the corresponding method
  switch (index) {
    case 0:
      shape.arc();
      addMessage = true;
      tmessage = "Arc is a f(a), a = 2 yields a circle";
      break;
    case 1:
      shape.astroid();
      addMessage = true;
      message = "The astroid is a f(a).";
      break;
    // case 2:
    //   bicorn();
    //    message = "The bicorn shape is not a function of any parameters.";
    //   break;
    // case 3:
    //   box();
    //    message = "The box shape is not a function of any parameters.";
    //   break;
    // case 4:
    //   shape.butterfly();
    //    message = "This shape is not a function of any parameters.";
    //   break;
    // case 5:
    //   shape.cannibus();
    //    message = "This cannibus is not a function of any parameters.";
    //   break;
    case 2:
      shape.cassiniOval();
      addMessage = true;
      message = "The cassini oval curve is a f(a, b).";
      break;
    case 3:
      shape.ceva();
      break;
    case 4:
      shape.cornuSpiral();
      addMessage = true;
      message = "The cornu spiral is f(a), a ~ [0.5, 2]";
      break;
    case 5:
      shape.craniod();
      addMessage = true;
      message = "The craniod curve is a f(a, b, m).";
      break;
    // case 10:
    //   shape.deltoid();
    //    message = "This shape is not a function of any parameters.";
    //   break;
    // case 11:
    //   shape.eight();
    //    message = "This shape is not a function of any parameters.";
    //   break;
    case 6:
      shape.gear();
      addMessage = true;
      message = "The gear curve is a f(a, b, m).";
      break;
    // case 13:
    //   shape.heart();
    //    message = "This shape is not a function of any parameters.";
    //   break;
    case 7:
      shape.kissCurve();
      addMessage = true;
      message = "The kiss curve is a f(a, b).";
      break;
    // case 15:
    //   shape.knot();
    //    message = "The knot is not a function of any parameters.";
    //   break;
    case 8:
      shape.lissajous();
      addMessage = true;
      message = "The lissajous curve is a f(a, b, m).";
      break;
    case 9:
      shape.malteseCross();
      addMessage = true;
      message = "The cross curve is a f(a, b).";
      break;
    // case 18:
    //   shape.quadrifolium();
    //    message = "The quadrifolium curve is not a function of any parameters.";
    //   break;
    case 10:
      shape.quadrilaterial();
      addMessage = true;
      message = "The quadrilaterial curve is a f(m).";
      break;
    case 11:
      // This started out as the rose curve, but I have edit the code and now renders a flower-like shape
      shape.flower();
      addMessage = true;
      message = "The flower curve is a f(a, m)";
      break;
    case 12:
      shape.superellipse();
      addMessage = true;
      message = "The superellipse curve is a f(a, b, m).";
      break;
    case 13:
      shape.supershape();
      addMessage = true;
      message = "The supershape curve is a f(a, b, m, n1, n2, n3).";
      break;
    case 14:
      shape.spiral();
      addMessage = true;
      message = "The spiral is a f(a, n), n ~ [-1, 1]";
      break;
    // case 24:
    //   shape.tearDrop();
    //   message = "The tear drop shape is not a function of any parameters."
    //   break;
    // case 25:
    //   shape.zigzag();
    //    message = "The zigzag is not a function of any parameters.";
    //   break;
    // default:
    //   break;
  }
  shapes.push(shape);
  shapeMessages.push(message);
}

// function mousePressed() {
//   save("image.jpg");
// }
