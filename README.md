# L-System Generator with Shapes Instead of Lines

From Wikipedia:

 >"An L-system or Lindenmayer system is a parallel rewriting system and a type of formal grammar. An L-system consists of an alphabet of symbols that can be used to make strings, a collection of production rules that expand each symbol into some larger string of symbols, an initial "axiom" string from which to begin construction, and a mechanism for translating the generated strings into geometric structures."

- [Fractal Trees L-system Coding Challenge](https://thecodingtrain.com/challenges/16-l-system-fractal-trees)


I have used the [L-system formulas by Paul Bourke](https://paulbourke.net/fractals/lsys/) to generate these designs. The rulesets can be found in the ruleset.json file. The code for the shapes is pulled from a couple of different sources: [the Code Train](https://thecodingtrain.com), [Mathcurve.com](https://mathcurve.com), and [Wolfram Mathworld](https://mathworld.wolfram.com/topics/Curves.html)

I have experimented with inserting different shapes--including spirals, ovals, and even the supershape--into different L-system rule-sets. It is hard to predict, in advance, whether a particular rule-set/shape combination is going to produce a nice design, but trial and error have resulted in some pretty cool patterns.


[p5-sketch](https://editor.p5js.org/kfahn/sketches/B_P7q5oG_)

Daniel Shiffman recently did a Coding Challenge on the dragon fractal, and my experiments started with the Dragon rule-set. (Add link!) One of my favorites is this image, which was created using the Dragon rule-set filled with the Astroid (level 10).

<p align="center"><img src="assets/dragon-astroid-filled.jpg" alt="Dragon rule-set with astroid" width="300px"></p>

I also really like this version with the Archimedes Spiral.

<p align="center"><img src="assets/dragon-archimedes-spiral.jpg" alt="Dragon rule-set with eight curve" width="300px"></p>

Using the [supershape](https://thecodingtrain.com/challenges/23-2d-supershapes) expands the creative possibilities. I used it in the Crystal rule-set with an alpha of 150 and different shades of blue since the shapes overlap.

<p align="center"><img src="assets/crystal-supershape.jpg" alt="Crystal pattern with supershape" width="300px"></p>

I also added it to the Krishna's Anklet pattern.

<p align="center"><img src="assets/krisha-anklet-supershape.jpg" alt="Crystal pattern with supershape" width="300px"></p>


Changing the parameters in a curve can yield very different shapes, which lend themselves to different rule-sets. Here are two different designs using the kiss curve:

Snake Kolam rule-set with overlapping kiss curves.

<p align="center"><img src="assets/snake-kolam-kiss.jpg" alt="Snake kolam rule-set with kiss curve" width="300px"></p>

Sometimes when you insert a shape into a rule-set, the result is quite different from the typical representation. One example is inserting the Cassini oval into the Hilbert rule-set. I am not sure that many people would look at this image and realize how it was generated.

<p align="center"><img src="assets/hillbert-cassini.jpg" alt="Hillbert rule-set with cassini oval" width="500px"></p>

Or this one generated with the pentaplexity ruleset and the cannibus curve.

<p align="center"><img src="assets/pentaplexity-cannibus.jpg" alt="Hillbert rule-set with cassini oval" width="500px"></p>

## Fractal Trees

Of course, one of the original applications for L-systems is creating realistic looking trees. I think adding a shape to the rule-set can improve the look of the trees. For example, here is a tree using a regular line.

<p align="center"><img src="assets/tree-line.jpg" alt="Tree rule-set with line" width="300px"></p>


## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href=""> <img class="img" src="assets/dragon-supershape.jpg" alt="Dragon curve with supershape" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Dragon curve with supershape</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/mango-astroid.jpg" alt="Mango leaf filled with astroid shape" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Mango leaf with astroid shape</b></sub></a></td>
      <td align="center"><a href=""> <img class="img" src="assets/anklet-quadrifolium.jpg" alt="Krishna's anklet with the quadrifolium curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Krishna's Anklet with the quadrifolium</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/pentaplexity-quad.jpg" alt="Pentaplexity filled with quadrifolium" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Pentaplexity filled with quadrifolium</b></sub></a></td>
</tr>
<tr>
      <td align="center"><a href=""> <img class="img" src="assets/dragon-supershape.jpg" alt="Dragon curve with supershape" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Dragon curve with supershape</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/mango-astroid.jpg" alt="Mango leaf filled with astroid shape" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Mango leaf with astroid shape</b></sub></a></td>
      <td align="center"><a href=""> <img class="img" src="assets/anklet-quadrifolium.jpg" alt="Krishna's anklet with the quadrifolium curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Krishna's Anklet with the quadrifolium</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/pentaplexity-quad.jpg" alt="Pentaplexity filled with quadrifolium" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Pentaplexity filled with quadrifolium</b></sub></a></td>
</tr>
<tr>
      <td align="center"><a href=""> <img class="img" src="assets/zigzag-tree.jpg" alt="Tree with zigzag shape" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Tree with zigzag shape</b></sub></a></td>
      <td align="center"><a href=""> <img class="img" src="" alt="" style="vertical-align:top;" width="500" /><br /><sub><b><br/>title</b></sub></a></td>
      <td align="center"><a href=""> <img class="img" src="" alt="" style="vertical-align:top;" width="500" /><br /><sub><b><br/>title</b></sub></a></td>
    <td align="center"><a href=""> <img class="img" src="" alt="Steiner chain filled with gaskets" style="vertical-align:top;" width="500" /><br /><sub><b><br/>title</b></sub></a></td>
  </tr>
    
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->

[Animated dragon curve](https://editor.p5js.org/kfahn/sketches/ePtGuXHE-)
Resources

## References

- [L-system](https://en.wikipedia.org/wiki/L-system)
- [LSystemCreator](https://anuraghazra.dev/LSystemCreator/)
- [Principles of L-Systems](https://www.houdinikitchen.net/wp-content/uploads/2019/12/L-systems.pdf)