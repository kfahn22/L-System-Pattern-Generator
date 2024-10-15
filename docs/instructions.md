# Instructions - WIP


## Options

1. Choose one or two rulesets (default).  Press "Remove second ruleset" checkbox to remove the second ruleset.  Dropdowns and sliders remain but ruleset will be gone.

2. Choose the rulseset from the ruleset dropdown.

See ruleset-dropdown.js and ruleset.json files.

 Because I was have an issue with the sketch slowing down or freezing, I have imposed limits (maxLevel field in the ruleset.json file) on the level for most of the rulesets. A message will pop up if you try to increase the level beyond the maxLevel I have imposed.  You can find the code in the addLsystem() function in the turtle.js file.

```JAVASCRIPT
if (level > this.maxLevel) {
        this.addWarning = true;
        params[0] = this.maxLevel;
        this.levelWarning(params, colorParams, ruleChoices);
      } else {
        this.ruleWarnings[index] = null;
        this.render(params, colorParams);
      }
```

You might also want to be careful about increasing the level for certain curves, most significantly the "rose" curve.  

3. Choose a shape/curve from the shapes dropdown.

```JAVASCRIPT
constructor(r, a, b, m, n1, n2, n3, n, d, angle) {
    this.r = r;
    this.a = a;
    this.b = b;
    this.n1 = n1;
    this.n2 = n2;
    this.n3 = n3;
    this.m = m;
    this.n = n;
    this.d = d;
    this.angle = angle;
    this.points = [];
}
```


See shape_ui.js and shape.js

4. Adjust shape parameters. If the shape is a function of the slider parameters, a message will pop up.



TODO:  add pic of sliders

4. Choose color palettes, strokeWeight, and alpha

See palette-dropdown.js file


## Palettes

I have utiliized [https://supercolorpalette.com](supercolorpalette) to add the color palettes. For consistency, I have added two "dummy" palettes with white and black, as well as a gray palette. You can easily add more palettes by using the the supercolorpalette generator. Once you are happy with your colors, copy the url, and add it to the code in the selectPalette function (line 344). Remember to add the name of the color to the addPalettes dropdown or it will not appear in the paletteDropdown.

## Tips

- The Hilbert and Peano curve rule-sets have generated the best backgrounds for me. I have found it generally best to stick to simple color palettes and use a fill with a lower alpha. My favorite backgrounds are created with the gear curve and supershape.

- One downside of creating a generic shape class is that the parameters are not, in general, optimized for specific shapes. If you choose a shape and the scale is completely off, try editing either the shapeScale or the shape parameters. The ones to try first are a and b.

- If you choose the line and have fill checked, nothing will appear.



## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/dragon1-astroid-filled.jpg" alt="Dragon curve with astroid" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Dragon curve with astroid</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/dragons-archimedes.jpg" alt="Dragon rule-set with archimedes spiral" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Dragon rule-set with archimedes spiral</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/krishna-anklet-gear.jpg" alt="Krishna's Anklet rule-set with gear curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Krishna's Anklet rule-set with gear curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/mango-astroid.jpg" alt="Mango leaf filled with astroid shape" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Mango leaf with astroid shape</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/doily-deltoid.jpg" alt="Doily rule-set with deltoid" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Doily rule-set with deltoid </b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/square-skierpinkski-lissajous.jpg" alt="Square skierpinski with lissajous curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Square skierpinski with lissajous curve</b></sub></a></td>
</tr>
<tr>
      <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/crystal-rose.jpg" alt="Crystal rule-set with rose curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Crystal rule-set with rose curve</b></sub></a></td>
      <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/box-ceva.jpg" alt="Box rule-set with ceva curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Box rule-set with ceva curve</b></sub></a></td>
       </tr>
    <tr>
       <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/snake-kolam-kiss.jpg" alt="Snake kolam rule set with kiss curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Snake kolam rule set with kiss curve</b></sub></a></td>
       <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/krisha-anklet-supershape.jpg" alt="Krisna anklet with the supershape" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Krisna anklet with the supershape</b></sub></a></td>
  </tr>
  <tr>
      <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/peano-recursive-circles.jpg" alt="Peano ruleset background with recursive circles" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Peano ruleset background with recursive circles</b></sub></a></td>
      <td align="center"><a href=""> <img class="img" src="assets/Ruleset-shape-examples/hillbert-circular.jpg" alt="Hilbert ruleset background with circular ruleset" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Hilbert ruleset background with circular ruleset</b></sub></a></td>
       </tr>
  
    
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->