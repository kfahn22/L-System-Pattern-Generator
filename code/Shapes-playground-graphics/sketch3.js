//https://editor.p5js.org/kfahn/sketches/R6T0EmC5j

// let n = 0;

let graphics = [];
let shapes = [];

let sliderGroup;
let sliders;
let sliderValues;
let shape_ui;
let shapeMessages = [];
let addMessages = [];
//let w = 100;
let n = 4;

const shapeNames = [
  "Arc",
  "Astroid",
  "Cassini Oval",
  "Ceva",
  "Cornu Spiral",
  "Craniod",
  "Flower",
  "Gear",
  "Kiss Curve",
  "Knot",
  "Lissajous",
  "Maltese Cross",
  "Quadrilateral",
  "Spiral",
  "Superellipse",
  "Supershape",
];

function setup() {
  let cvs = createCanvas(1000, 1000);
  cvs.position(250, 10);
  // let n = shapes.length;
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

  drawShapes(0, 0, w, sliderValues);
  console.log(shapes)
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  for (let g of graphics) {
    image(g.buffer, g.x, g.y, g.w, g.h);
  }
}

// draw all of the shapes to the graphics buffers
// function drawShapes(x, y, index) {
//   drawShape(x, y, shapes[index]);
//   let newD = d * 0.5;
//   if (newD > val) {
//     drawSquare(x, y, newD);
//     drawSquare(x + newD, y + newD, newD);
//   }
// }

function drawShapes(x, y, w, sliderValues) {
  let buffer = createGraphics(w, w);

  for (let i = 0; i < shapeNames.length; i++) {
    selectShape(i, buffer, w, sliderValues);
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
  for (let i = 0; i < n; i++) {
    x += i * w;
    y += y * w;
    shapes[i].show();
  }

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
      shapes.push(shape.arc());
      //shape.arc();
      //addMessage = true;
      message = "Arc is a f(a), a = 2 yields a circle";
      break;
    case 1:
      shapes.push(shape.astroid());
     // addMessage = true;
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
      shapes.push(shape.cassiniOval());
      //addMessage = true;
      message = "The cassini oval curve is a f(a, b).";
      break;
    case 3:
      shapes.push(shape.ceva());
      break;
    case 4:
      shapes.push(shape.cornuSpiral());
      //addMessage = true;
      message = "The cornu spiral is f(a), a ~ [0.5, 2]";
      break;
    case 5:
      shapes.push(shape.craniod());
      //addMessage = true;
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
      shapes.push(shape.gear());
     // addMessage = true;
      message = "The gear curve is a f(a, b, m).";
      break;
    // case 13:
    //   shape.heart();
    //    message = "This shape is not a function of any parameters.";
    //   break;
    case 7:
      shapes.push(shape.kissCurve());
     // addMessage = true;
      message = "The kiss curve is a f(a, b).";
      break;
    // case 15:
    //   shape.knot();
    //    message = "The knot is not a function of any parameters.";
    //   break;
    case 8:
      shapes.push(shape.lissajous());
     // addMessage = true;
      message = "The lissajous curve is a f(a, b, m).";
      break;
    case 9:
      shapes.push(shape.malteseCross());
      //addMessage = true;
      message = "The cross curve is a f(a, b).";
      break;
    // case 18:
    //   shape.quadrifolium();
    //    message = "The quadrifolium curve is not a function of any parameters.";
    //   break;
    case 10:
      shapes.push(shape.quadrilaterial());
      //addMessage = true;
      message = "The quadrilaterial curve is a f(m).";
      break;
    case 11:
      // This started out as the rose curve, but I have edit the code and now renders a flower-like shape
      shapes.push(shape.flower());
      //addMessage = true;
      message = "The flower curve is a f(a, m)";
      break;
    case 12:
      shapes.push(shape.superellipse());
      //addMessage = true;
      message = "The superellipse curve is a f(a, b, m).";
      break;
    case 13:
        shapes.push(shape.supershape());
     // addMessage = true;
      message = "The supershape curve is a f(a, b, m, n1, n2, n3).";
      break;
    case 14:
       shapes.push(shape.spiral());
     // addMessage = true;
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
  // shapes.push(shape);
  shapeMessages.push(message);
}

// function mousePressed() {
//   save("image.jpg");
// }
