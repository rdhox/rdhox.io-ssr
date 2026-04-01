/**
 * Opacité dérivée de la position du ressort `x` (même animation que translateX).
 * Ouverture : invisible jusqu’à la fin du trajet, puis fondu (derniers ~22 % du parcours).
 * Fermeture : même fenêtre, inversée — opacité 1 jusqu’aux ~78 % du retour, puis fondu sur la fin.
 */
export function opacityFromSpringX(
  x: number,
  from: number,
  isOpening: boolean,
  /** Seuil symétrique : derniers (1 − fadeStart) du trajet pour le fondu (0.78 → 22 %). */
  fadeStart = 0.78
): number {
  if (isOpening) {
    const denom = 0 - from;
    if (Math.abs(denom) < 1e-6) return 1;
    const p = Math.min(1, Math.max(0, (x - from) / denom));
    if (p < fadeStart) return 0;
    return (p - fadeStart) / (1 - fadeStart);
  }
  if (Math.abs(from) < 1e-6) return 1;
  /** Progression du retour x=0 → x=from (0 = encore en place, 1 = empilé). */
  const q = Math.min(1, Math.max(0, x / from));
  if (q < fadeStart) return 1;
  return (1 - q) / (1 - fadeStart);
}
