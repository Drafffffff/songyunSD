import "./app.css";
import p5 from "p5";
import P5Canvas from "./components/canvas";
import { createEffect, createSignal } from "solid-js";
import reqData from "./components/req.json";

function App() {
  const [clean, setClean] = createSignal(false);
  const [imgList, setImgList] = createSignal([]);

  console.log(import.meta.env.VITE_URL);
  const getCanvas = () => {
    const canvas = document.getElementById(
      "defaultCanvas0"
    ) as HTMLCanvasElement;
    const img = canvas?.toDataURL("image/png");
    return img;
  };
  async function getImg() {
    const img = getCanvas();
    reqData["controlnet_units"][0]["input_image"] = img;
    console.log(reqData);
    const res = await fetch(import.meta.env.VITE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const json = await res.json();
    setImgList(json.images.splice(0,json.images.length-1));
  }

  return (
    <div>
      <div class="text">
        <h1>App</h1>
      </div>
      <div class="canvas ">
        <P5Canvas clean={clean()} setClean={setClean}></P5Canvas>
      </div>
      <div class="controls">
        <button
          class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            getImg();
          }}
        >
          生图
        </button>
        <button
          class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setClean(true);
          }}
        >
          清除画布
        </button>
      </div>
      {imgList().map((item: any) => (
        <div>
          <img src={`data:image/png;base64,${item}`} alt="" />
        </div>
      ))}
    </div>
  );
}

export default App;
