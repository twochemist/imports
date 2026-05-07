import { BACK_URL, CARD_IMAGE_BY_VALUE, crearPartida, Partida } from "./model";
import {
  dameCarta,
  estaPartidaTerminada,
  evaluarPlantarse,
  plantarse,
  sumarCartaAPartida,
} from "./motor";

export let partida: Partida = crearPartida();

export const $ = (id: string): HTMLElement => {
  const el = document.getElementById(id);

  if (el === null) {
    throw new Error(`No existe #${id}`);
  }

  return el;
};

const getCardImg = (): HTMLImageElement => {
  const img = $("cardImg");

  if (!(img instanceof HTMLImageElement)) {
    throw new Error("#cardImg no es una imagen.");
  }

  return img;
};

const getButton = (id: string): HTMLButtonElement => {
  const button = $(id);

  if (!(button instanceof HTMLButtonElement)) {
    throw new Error(`#${id} no es un boton.`);
  }

  return button;
};

export const muestraPuntuacion = (puntuacion: number): void => {
  $("scoreValue").textContent = puntuacion.toString();
};

export const muestraCarta = (carta: number | null): void => {
  const img = getCardImg();
  img.src = carta === null ? BACK_URL : CARD_IMAGE_BY_VALUE[carta] ?? BACK_URL;
};

export const muestraMensaje = (text: string): void => {
  $("message").textContent = text;
};

export const setGameOverUI = (isOver: boolean): void => {
  getButton("btnDraw").disabled = isOver;
  getButton("btnStand").disabled = isOver;
  getButton("btnNew").hidden = !isOver;
};

export const pintaPartida = (partidaActual: Partida): void => {
  muestraPuntuacion(partidaActual.puntuacion);
  setGameOverUI(estaPartidaTerminada(partidaActual));
};

export const pintaMensajeEstado = (partidaActual: Partida): void => {
  if (partidaActual.estado === "perdida") {
    muestraMensaje("GAME OVER. Te has pasado de 7,5.");
    return;
  }

  if (partidaActual.estado === "ganada") {
    muestraMensaje("¡Lo has clavado! ¡Enhorabuena!");
    return;
  }

  if (partidaActual.estado === "plantada") {
    muestraMensaje(evaluarPlantarse(partidaActual.puntuacion));
    return;
  }

  muestraMensaje("¿Pides otra carta o te plantas?");
};

export const onDraw = (): void => {
  if (estaPartidaTerminada(partida)) return;

  const carta = dameCarta();
  muestraCarta(carta);

  partida = sumarCartaAPartida(partida, carta);
  pintaPartida(partida);
  pintaMensajeEstado(partida);
};

export const onStand = (): void => {
  if (estaPartidaTerminada(partida)) return;

  partida = plantarse(partida);
  pintaPartida(partida);
  pintaMensajeEstado(partida);
};

export const nuevaPartida = (): void => {
  partida = crearPartida();
  muestraCarta(null);
  pintaPartida(partida);
  muestraMensaje("");
};
