import p5 from "p5";

export default function P5Canvas() {
  const cav = null;
  // p5canvas create
  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(400, 400);
    };
    p.draw = () => {
      p.background(0);
      p.ellipse(p.mouseX, 200, 100, 100);
    };
  };
  new p5(sketch, cav);

  return <div class="canvas"></div>;
}
