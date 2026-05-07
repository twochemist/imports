import { Partida, PUNTUACION_MAXIMA } from "./model";

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const dameCarta = (): number => {
  const carta = randomInt(1, 10);

  if (carta > 7) {
    return carta + 2;
  }

  return carta;
};

export const valorCarta = (carta: number): number => (carta >= 10 ? 0.5 : carta);

export const sumarCartaAPartida = (partida: Partida, carta: number): Partida => {
  const puntuacion = +(partida.puntuacion + valorCarta(carta)).toFixed(1);

  if (puntuacion > PUNTUACION_MAXIMA) {
    return {
      puntuacion,
      estado: "perdida",
    };
  }

  if (puntuacion === PUNTUACION_MAXIMA) {
    return {
      puntuacion,
      estado: "ganada",
    };
  }

  return {
    puntuacion,
    estado: "jugando",
  };
};

export const plantarse = (partida: Partida): Partida => ({
  ...partida,
  estado: "plantada",
});

export const estaPartidaTerminada = (partida: Partida): boolean =>
  partida.puntuacion >= PUNTUACION_MAXIMA || partida.estado === "plantada";

export const evaluarPlantarse = (puntuacion: number): string => {
  if (puntuacion < 4) return "Has sido muy conservador";
  if (puntuacion === 5) return "Te ha entrado el canguelo eh?";
  if (puntuacion === 6 || puntuacion === 7) return "Casi casi...";
  if (puntuacion === PUNTUACION_MAXIMA) return "¡Lo has clavado! ¡Enhorabuena!";
  return "Te has plantado.";
};
