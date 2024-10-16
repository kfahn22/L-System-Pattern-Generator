# Heart

To learn more about the heart curve, I recommend watching Daniel Shiffman's [Heart Coding Challenge](https://thecodingtrain.com/challenges/134-heart-curve).

<p align="center"><img src="./assets/shape_images/heart.jpg" alt="heart curve" width="300px"></p>

Code:

```JavaScript
heart() {
   heart() {
    for (let theta = 0; theta < 2 * PI; theta += 0.1) {
      const x = 0.1 * this.r * 16 * pow(sin(theta), 3);
      const y =
        0.1 *
        -this.r *
        (13 * cos(theta) -
          5 * cos(2 * theta) -
          2 * cos(3 * theta) -
          cos(4 * theta));
      this.points.push(createVector(x, y));
    }
}
```

[Source](https:mathworld.wolfram.com/HeartCurve.html)

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/adh231a-heart.jpg" alt="ADH231a ruleset background with box" style="vertical-align:top;" width="500" /><br /><sub><b><br/>ADH231a ruleset with heart</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/rounded-star-heart.jpg" alt="Rounded Star with heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Rounded Star with heart</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/snake-kolam-heart.jpg" alt="Snake-kolam ruleset with heart curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Snake-kolam ruleset with heart curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/skierpinski-heart.jpg" alt="Skierpinski rule-set with heart curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Skierpinski rule-set with heart curve</b></sub></a></td>
    </tr>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
