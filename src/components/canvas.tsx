import p5 from "p5";
import { onCleanup, onMount, Setter } from "solid-js";

interface P5CanvasProps {
  clean: boolean;
  setClean: Setter<boolean>;
}

export default function P5Canvas(props: P5CanvasProps) {
  let cav = null;
  // p5canvas create
  const sketch = (p: p5) => {
    const bgg = 240;
    p.setup = () => {
      p.createCanvas(980, 980);
      // p.background(bgg);
      p.frameRate(120);
    };
    p.draw = () => {
      if (p.mouseIsPressed) {
        p.stroke(0);
        p.strokeWeight(8);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
      if (props.clean) {
        p.clear(0, 0, 0, 0);
        // p.background(bgg);
        props.setClean(false);
      }
    };
  };

  let p5js: p5;

  onMount(() => {
    p5js = new p5(sketch, cav);
  });

  onCleanup(() => {
    p5js.remove();
  });

  return (
    <div id="p5canvas" class="flex justify-center items-center" ref={cav}></div>
  );
}
