# Instructions - WIP

There are multiple sliders and three sets of dropdowns for each visualization. (While the majority of the rule-sets render fractals, a few just render multiple copies of the shape in interesting ways.)

This code as the sliders for the first L-system, setting the translation, fractal level to 5, the grid length to 20, strokeweight to 2, alpha to 145, of the scale of the shape to 1/2 of the grid size. The L-system rotation are both set to zero. The remaining numbers are the shape parameters.

`[sliders0, sliderLabels0] = addSliders(
    10,
    "first",
    0.0,
    1.0,
    5,
    20,
    2,
    145,
    0.5,
    0,
    0,
    1.5,
    2.5,
    6,
    1,
    1,
    1,
    1
  );`

The next lines add the three dropdowns for the first L-system, setting the Hilbert curve as the fractal, the gear curve as the shape, and the color palette to raspberry.

`ruleDropdown0 = addRuleDropdown(x, 5, "hilbert");`  
 `shapeDropdown0 = addShapesDropdown(x, 50, "gear");`  
 `paletteDropdown0 = addPalettes(x, 95, "raspberry");`

<p align="center"><img src="assets/Ruleset-shape-examples/hilbert-gear-raspberrry.jpg" alt="Hilbert curve with gear curve" width="500px"></p>

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