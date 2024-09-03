# Eight Curve

<p align="center"><img src="assets/shape_images/eight.jpg" alt="eight" width="300px"></p>

Code:

```JavaScript
eight() {
    let a = 1;
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * a * sin(theta);
      let y = this.r * a * sin(theta) * cos(theta);
      this.points.push(createVector(x, y));
    }
  }
```

[Source]()

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="assets/rounded-star-eight.jpg" alt="Rounded star ruleset with eight curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Rounded star ruleset with eight curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/hilbert-eight.jpg" alt="Hilbert curve with eight curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Hilbert curve with eight curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/krishna-anklet-eight.jpg" alt="Krishna anklet with eight curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Krishna anklet with eight curve</b></sub></a></td>
    <td align="center"><a href=""> <img class="img" src="assets/box-eight.jpg" alt="Box ruleset with eight curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Box ruleset with eight curve</b></sub></a></td>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
