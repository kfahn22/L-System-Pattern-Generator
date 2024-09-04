# Tear Curve

<p align="center"><img src="../assets/shape_images/tear.jpg" alt="tear" width="300px"></p>

Code:

```JavaScript
tearDrop() {
    let n = 4;
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta) * pow(sin(theta / 2), n);
      this.points.push(createVector(x, y));
    }
  }
```

[Source](https://mathcurve.com/courbes2d.gb/larme/larme.shtml)

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/snake-kolam-tear.jpg" alt="Snake kolam with tear curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Snake kolam with tear curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/two-levy-tear.jpg" alt="Two levy curves with tear curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Two levy curves with tear curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/mango-leaf-tear.jpg" alt="Mango leaf with tear curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Mango leaf with tear curve</b></sub></a></td>
    <td align="center"><a href=""> <img class="img" src="../assets/krishna-anklet-tear2.jpg" alt="Krishna anklet with tear curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Krishna anklet with tear curve</b></sub></a></td>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
