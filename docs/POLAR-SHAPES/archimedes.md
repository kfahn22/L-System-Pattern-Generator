# Archimedes Spiral

<p align="center"><img src="shape_images/archimedes.jpg" alt="archimedes spiral" width="300px"></p>

Code:

```JavaScript
archimedesSpiral() {
    let a = 0.1;
    let dir = -1;
    for (let theta = 0; theta < 4 * PI; theta += 0.1) {
      let r = dir * a * pow(theta, this.n);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
}
```

[Source](https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml)

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/ADH231a-archimedes.jpg" alt="ADH231a ruleset with archimedes spiral" style="vertical-align:top;" width="500" /><br /><sub><b><br/>ADH231a ruleset with archimedes spiral</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/rounded-star-archimedes.jpg" alt="Rounded-star ruleset with archimedes spiral" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Rounded-star ruleset with archimedes spiral</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/dragons-archimedes.jpg" alt="Two dragon curves with the archimedes spiral" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Two dragon curves with the archimedes spiral</b></sub></a></td>
    <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/hilbert-archimedes.jpg" alt="Hilbert curve with the archimedes spiral" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Hilbert curve with the archimedes spiral</b></sub></a></td>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
