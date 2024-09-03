# Astroid

<p align="center"><img src="assets/shape_images/astroid.jpg" alt="kiss curve" width="300px"></p>

Code:

```JavaScript
astroid() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * this.a * pow(cos(theta), 3);
      let y = this.r * this.a * pow(sin(theta), 3);
      this.points.push(createVector(x, y));
    }
}
```

Sources:
[Mathcurve - astroid](https://mathcurve.com/courbes2d.gb/astroid/astroid.shtml)
[Mathword - Astroid](https://mathworld.wolfram.com/Astroid.html)

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="assets/mango-astroid.jpg" alt="Mango leaf with astroid" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Mango leaf with astroid</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/krishna-anklet-astroid.jpg" alt="Krishna anklet with astroid" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Krishna anklet with astroid</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/dd-astroid.jpg" alt="Two dragon curves with astroid" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Two dragon curves with astroid</b></sub></a></td>
    <td align="center"><a href=""> <img class="img" src="assets/dragon-astroid-filled.jpg" alt="Dragon curve with astroid" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Dragon curve with astroid</b></sub></a></td>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
