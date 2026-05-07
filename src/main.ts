import "./style.css";
import {
  $,
  muestraCarta,
  nuevaPartida,
  onDraw,
  onStand,
  pintaPartida,
  partida,
  setGameOverUI,
} from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  muestraCarta(null);
  pintaPartida(partida);
  setGameOverUI(false);

  $("btnDraw").addEventListener("click", onDraw);
  $("btnStand").addEventListener("click", onStand);
  $("btnNew").addEventListener("click", nuevaPartida);
});
