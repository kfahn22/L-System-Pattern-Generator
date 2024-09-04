# Tear Curve

<p align="center"><img src="assets/shape_images/deltoid.jpg" alt="deltoid" width="300px"></p>

Code:

```JavaScript
deltoid() {
    let a = 1;
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * (4 * a * pow(cos(theta / 2), 2) * cos(theta) - a);
      let y = this.r * (4 * a * pow(sin(theta / 2), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
}
```

[Source](https://mathcurve.com/courbes2d.gb/deltoid/deltoid.shtml)

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="assets/kolam-deltoid.jpg" alt="Kolam ruleset with deltoid curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Kolam ruleset with deltoid curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/triangles-deltoid.jpg" alt="Two triangle rulesets with deltoid curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Two triangle rulesets with deltoid curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/hilbert-deltoid.jpg" alt="Hilbert ruleset with deltoid curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Hilbert ruleset with deltoid curve</b></sub></a></td>
    <td align="center"><a href=""> <img class="img" src="assets/box-deltoid.jpg" alt="Box ruleset with deltoid curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Box ruleset with deltoid curve</b></sub></a></td>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
