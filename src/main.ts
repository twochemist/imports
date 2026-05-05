import "./style.css";
import { crearPartida, Partida } from "./model";
import { dameCarta, plantarse, sumarCartaAPartida } from "./motor";
import {
  muestraCarta,
  muestraMensaje,
  pintaMensajeEstado,
  pintaPartida,
  setGameOverUI,
} from "./ui";

let partida: Partida = crearPartida();

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`No existe #${id}`);
  return el as T;
};

const onDraw = (): void => {
  if (partida.gameOver) return;

  const carta = dameCarta();
  muestraCarta(carta);

  partida = sumarCartaAPartida(partida, carta);
  pintaPartida(partida);
  pintaMensajeEstado(partida);
};

const onStand = (): void => {
  if (partida.gameOver) return;

  partida = plantarse(partida);
  pintaPartida(partida);
  pintaMensajeEstado(partida);
};

const nuevaPartida = (): void => {
  partida = crearPartida();
  muestraCarta(null);
  pintaPartida(partida);
  muestraMensaje("");
};

document.addEventListener("DOMContentLoaded", () => {
  muestraCarta(null);
  pintaPartida(partida);
  setGameOverUI(false);

  $("btnDraw").addEventListener("click", onDraw);
  $("btnStand").addEventListener("click", onStand);
  $("btnNew").addEventListener("click", nuevaPartida);
});
