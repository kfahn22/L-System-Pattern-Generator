// Edited From Daniel Shiffman
// http://natureofcode.com

class LSystem {
  constructor(lsystem, wadj, hadj, level, length, sw, selectedShape, url) {
    this.lsystem = lsystem;
    this.wadj = wadj;
    this.hadj = hadj;
    this.level = level;
    this.length = length;
    this.selectedShape = selectedShape;
    // L-system variables
    this.axiom = "";
    this.sentence = [];
    this.rules = [];
    this.angle = 0;
    // Color / strokewieght variables
    this.sw = sw;
    this.url = url;
    this.palette = [];
  }

  renderFractal() {
    let fractal = this.lsystem.kolam;
    console.log(fractal);
    this.setRule(fractal);
    this.createPaletteFromURL(this.url);
    strokeWeight(this.sw);
    fill(random(this.palette));
    this.selectedShape.addPoints();
    push();
    translate(width * this.wadj, height * this.hadj);

    for (let i = 0; i < this.level; i++) {
      this.generate();
    }
    this.turtle();
    pop();
  }

  setRule(pattern) {
    this.axiom = pattern.axiom;
    this.rules = pattern.rules;
    this.angle = radians(pattern.angle);
    //lf = pattern.length_factor;
    this.sentence = this.axiom;
  }

  generate() {
    let nextSentence = "";
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      let found = false;
      for (let key in this.rules) {
        if (current === key) {
          found = true;
          nextSentence += this.rules[key];

          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    this.sentence = nextSentence;
  }

  turtle() {
    let amt = 0;
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      if (current === "F") {
        let c = random(this.palette);
        c[3] = 235;
        noFill();
        stroke(c);
        this.selectedShape.show();
        translate(this.length, 0);
      } else if (current === "f") {
        translate(this.length, 0);
      } else if (current === "+") {
        rotate(this.angle);
        amt += 0.1;
      } else if (current === "-") {
        rotate(-this.angle);
        amt += 0.2;
      } else if (current == "[") {
        push();
      } else if (current == "]") {
        pop();
        // } else if (current == ">") {
        //   push();
        //   length = length * lf;
        //   pickShape();
        //   pop();
        // } else if (current == "<") {
        //   push();
        //   length = length / lf;
        //   pickShape();
        //   pop();
      } else if (current == "(") {
        this.angle -= radians(0.1);
      } else if (current == ")") {
        this.angle += radians(0.1);
      } else if (current == "{") {
        beginShape();
      } else if (current == "}") {
        noStroke();
        fill(random(this.palette));
        endShape();
      }
    }
  }

  // Helper functions to convert the url string to the palette array from chatGPT
  createPaletteFromURL() {
    // Extract the color codes from the URL using a regular expression
    let regex = /[0-9A-F]{6}/gi;
    let matches = this.url.match(regex);

    // Convert HEX codes to RGB and create the palette array
    this.palette = matches.map((hex) => this.hexToRgb(hex));

    return this.palette;
  }

  // Helper function to convert HEX to RGB
  hexToRgb(hex) {
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    let a = 255;
    return [r, g, b, a];
  }
}
