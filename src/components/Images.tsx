import "./images.css";
import { Show, createSignal } from "solid-js";

export default function Images(props) {
  const [bigImg, setBigImg] = createSignal(false);
  const [imgData, setimgData] = createSignal("");
  return (
    <div class="imageContainer">
      <Show when={props.imgList().length > 0} fallback={<Loading />}>
        <Show
          when={!bigImg()}
          fallback={<BigImg src={imgData()} setBigImg={setBigImg} />}
        >
          <div class="imgss">
            {props.imgList().map((item: any) => (
              <div>
                <img
                  src={`data:image/png;base64,${item}`}
                  alt=""
                  onClick={() => {
                    setimgData(`data:image/png;base64,${item}`);
                    setBigImg(true);
                  }}
                />
              </div>
            ))}
          </div>
        </Show>
      </Show>
      <div class="imgControls mt-[20px]">
        <img
          src="/btn/redraw.png"
          onClick={() => {
            props.setIsShow(false);
            props.setImageList([]);
          }}
        />
        <img src="/btn/blank2.png" />
        <img
          src="/btn/regen.png"
          onclick={() => {
            setBigImg(false);
            props.getImg();
          }}
        />
      </div>
    </div>
  );
}
function Loading() {
  return (
    <div class="loading">
      <span class="loader"></span>
    </div>
  );
}
function BigImg(props) {
  return (
    <div class="bigImg">
      <img
        src="/back.png"
        class="back"
        onClick={() => {
          props.setBigImg(false);
        }}
      />
      <div class="imgCont">
        <img src={props.src} alt="" />
      </div>
    </div>
  );
}
