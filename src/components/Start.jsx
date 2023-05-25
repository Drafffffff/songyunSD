import { createEffect, createSignal } from "solid-js";
import "../styles/untils.css";
import StartImg from "../assets/start.png";

export default function Start(props) {
  return (
    <div class="start">
      <img src={StartImg}></img>
      <div class="clickArea" onClick={props.onClick} />
    </div>
  );
}
