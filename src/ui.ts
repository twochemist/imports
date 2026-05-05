import { BACK_URL, CARD_IMAGE_BY_VALUE, Partida } from "./model";
import { evaluarPlantarse } from "./motor";

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`No existe #${id}`);
  return el as T;
};

export const muestraPuntuacion = (puntuacion: number): void => {
  $("scoreValue").textContent = puntuacion.toString();
};

export const muestraCarta = (carta: number | null): void => {
  const img = $("cardImg") as HTMLImageElement;
  img.src = carta === null ? BACK_URL : CARD_IMAGE_BY_VALUE[carta] ?? BACK_URL;
};

export const muestraMensaje = (text: string): void => {
  $("message").textContent = text;
};

export const setGameOverUI = (isOver: boolean): void => {
  ($("btnDraw") as HTMLButtonElement).disabled = isOver;
  ($("btnStand") as HTMLButtonElement).disabled = isOver;
  ($("btnNew") as HTMLButtonElement).hidden = !isOver;
};

export const pintaPartida = (partida: Partida): void => {
  muestraPuntuacion(partida.puntuacion);
  setGameOverUI(partida.gameOver);
};

export const pintaMensajeEstado = (partida: Partida): void => {
  if (partida.estado === "perdida") {
    muestraMensaje("🪦 GAME OVER. Te has pasado de 7,5.");
    return;
  }

  if (partida.estado === "ganada") {
    muestraMensaje("¡Lo has clavado! ¡Enhorabuena!");
    return;
  }

  if (partida.estado === "plantada") {
    muestraMensaje(evaluarPlantarse(partida.puntuacion));
    return;
  }

  muestraMensaje("¿Pides otra carta o te plantas?");
};
