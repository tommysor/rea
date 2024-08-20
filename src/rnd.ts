export default function rndCtor() {
  return {
    rnd,
    rndInt,
    rndTamId,
  };
}

export function rnd(): number {
  return Math.random();
}

export function rndInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function rndTamId(): number {
  const max = 2 ** 30;
  return Math.ceil(Math.random() * max);
}
