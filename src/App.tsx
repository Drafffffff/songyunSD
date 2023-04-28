import "./app.css";
import P5Canvas from "./components/canvas";

function App()  {
  return (
    <div>
      <div class="text">
        <h1>App</h1>
      </div>
      <div class="canvas">
        <P5Canvas></P5Canvas> 
      </div>
    </div>
  );
};

export default App;
