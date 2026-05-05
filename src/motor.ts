import { Partida, PUNTUACION_MAXIMA } from "./model";

const VALID_VALUES: number[] = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const dameCarta = (): number => {
  const idx = randomInt(0, VALID_VALUES.length - 1);
  return VALID_VALUES[idx];
};

export const valorCarta = (carta: number): number => (carta >= 10 ? 0.5 : carta);

export const sumarCartaAPartida = (partida: Partida, carta: number): Partida => {
  const puntuacion = +(partida.puntuacion + valorCarta(carta)).toFixed(1);

  if (puntuacion > PUNTUACION_MAXIMA) {
    return {
      puntuacion,
      gameOver: true,
      estado: "perdida",
    };
  }

  if (puntuacion === PUNTUACION_MAXIMA) {
    return {
      puntuacion,
      gameOver: true,
      estado: "ganada",
    };
  }

  return {
    puntuacion,
    gameOver: false,
    estado: "jugando",
  };
};

export const plantarse = (partida: Partida): Partida => ({
  ...partida,
  gameOver: true,
  estado: "plantada",
});

export const evaluarPlantarse = (puntuacion: number): string => {
  if (puntuacion < 4) return "Has sido muy conservador";
  if (puntuacion === 5) return "Te ha entrado el canguelo eh?";
  if (puntuacion === 6 || puntuacion === 7) return "Casi casi...";
  if (puntuacion === PUNTUACION_MAXIMA) return "¡Lo has clavado! ¡Enhorabuena!";
  return "Te has plantado.";
};
