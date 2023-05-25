import "./app.css";
import p5 from "p5";
import P5Canvas from "./components/canvas";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import reqData from "./components/req.json";
import Start from "./components/Start.jsx";
import Swiper from "swiper";
import "swiper/css";
import Images from "./components/Images";

function App() {
  const [clean, setClean] = createSignal(false);
  const [imgList, setImgList] = createSignal([]);
  const [isStart, setIsStart] = createSignal(true);
  const [promptList, setPromptList] = createSignal({
    shan: {
      text: "mountain, ",
      active: false,
    },
    qiao: {
      text: "bridge, ",
      active: false,
    },
    he: {
      text: "river, ",
      active: false,
    },
    chuan: {
      text: "boat, ",
      active: false,
    },
    jianzhu: {
      text: "east asian architecture, ",
      active: false,
    },
  });
  const [isShow, setIsShow] = createSignal(false);
  let swiper: any;
  // console.log(import.meta.env.VITE_URL);
  const getCanvas = () => {
    const canvas = document.getElementById(
      "defaultCanvas0"
    ) as HTMLCanvasElement;
    const img = canvas?.toDataURL("image/png");
    return img;
  };
  async function getImg() {
    setIsShow(true);
    setImgList([]);
    const img = getCanvas();
    reqData["controlnet_units"][0]["input_image"] = img;
    let customPrompt = "";
    for (const key in promptList()) {
      if (promptList()[key].active) {
        customPrompt += promptList()[key].text;
      }
    }
    const prompt = `songyun, shukezouma, traditional chinese ink painting,${customPrompt} traditional media, outdoors, nature,<lora:songyun_v3:0.7>,<lora:Moxin_Shukezouma11:0.2>`;
    reqData["prompt"] = prompt;
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
    setImgList(json.images.splice(0, json.images.length));
  }
  function handleStartClick() {
    setIsStart(!isStart);
  }
  onMount(() => {
    swiper = new Swiper(".mySwiper", {
      spaceBetween: 50,
      loop: true,
    });
  });

  function handlePreClick() {
    swiper.slidePrev();
  }
  function handleNextClick() {
    swiper.slideNext();
  }
  return (
    <div class="main">
      <Show when={isStart()}>
        <Start
          onClick={() => {
            handleStartClick();
          }}
        />
      </Show>
      <Show
        when={!isShow()}
        fallback={
          <Images
            imgList={imgList}
            setImageList={setImgList}
            setIsShow={setIsShow}
            getImg={getImg}
          />
        }
      >
        <div class="draw">
          <div class="canvas ">
            <img
              src="/reset.png"
              class="reset"
              onClick={() => {
                setClean(true);
              }}
            />
            <P5Canvas clean={clean()} setClean={setClean}></P5Canvas>
          </div>
          <div class="controls mt-[12px]">
            <img
              src={
                promptList().shan.active
                  ? "/btn/shanActive.png"
                  : "/btn/shan.png"
              }
              onClick={() => {
                setPromptList({
                  ...promptList(),
                  shan: {
                    text: promptList().shan.text,
                    active: !promptList().shan.active,
                  },
                });
              }}
            />
            <img
              src={
                promptList().qiao.active
                  ? "/btn/qiaoActive.png"
                  : "/btn/qiao.png"
              }
              onClick={() => {
                setPromptList({
                  ...promptList(),
                  qiao: {
                    text: promptList().qiao.text,
                    active: !promptList().qiao.active,
                  },
                });
              }}
            />
            <img
              src={promptList().he.active ? "/btn/heActive.png" : "/btn/he.png"}
              onClick={() => {
                setPromptList({
                  ...promptList(),
                  he: {
                    text: promptList().he.text,
                    active: !promptList().he.active,
                  },
                });
              }}
            />
            <img
              src={
                promptList().chuan.active
                  ? "/btn/chuanActive.png"
                  : "/btn/chuan.png"
              }
              onClick={() => {
                setPromptList({
                  ...promptList(),
                  chuan: {
                    text: promptList().chuan.text,
                    active: !promptList().chuan.active,
                  },
                });
              }}
            />
            <img
              src={
                promptList().jianzhu.active
                  ? "/btn/jianzhuActive.png"
                  : "/btn/jianzhu.png"
              }
              onClick={() => {
                setPromptList({
                  ...promptList(),
                  jianzhu: {
                    text: promptList().jianzhu.text,
                    active: !promptList().jianzhu.active,
                  },
                });
              }}
            />
            <img src="/btn/blank.png" />
            <img
              src="/btn/gen.png"
              onClick={() => {
                getImg();
              }}
            />
          </div>
          <img src="description1.png" class="mt-[15px]" />
        </div>
      </Show>
      <div class="show"></div>
      <div class="guangu">
        <img src="/guangu.png" class="title" />
        <div class="swiper mySwiper mt-[13px]">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="/g1.png" />
            </div>
            <div class="swiper-slide">
              <img src="/g1.png" />
            </div>
            <div class="swiper-slide">
              <img src="/g1.png" />
            </div>
            <div class="swiper-slide">
              <img src="/g1.png" />
            </div>
          </div>
          <div class="pagenation mt-[33px]">
            <img
              src="pre.png"
              onClick={() => {
                handlePreClick();
              }}
            />
            <img
              src="next.png"
              onClick={() => {
                handleNextClick();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
