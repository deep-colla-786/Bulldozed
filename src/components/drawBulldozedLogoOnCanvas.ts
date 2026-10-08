/**
 * Utility to draw the authentic Bulldozed brand mascot and stacked typography
 * onto any HTML5 Canvas context (used for ultra-crisp 3D packet textures).
 */

// Exact SVG Path Data for the Bulldozed Mascot Runner (viewBox 0 0 160 160)
export const MASCOT_PATH_DATA = `
  M 72 32
  C 67 32 62 37 62 42
  C 62 46 65 48 70 52
  L 54 58
  L 48 46
  L 54 42
  L 60 52
  L 68 56
  C 66 64 68 72 70 78
  C 62 88 50 106 28 126
  L 60 126
  C 66 112 73 98 80 90
  C 86 102 94 112 98 114
  C 104 114 110 106 114 94
  L 118 90
  L 112 86
  C 106 94 98 90 90 84
  C 84 80 82 78 82 74
  L 86 58
  C 96 52 104 54 108 56
  L 104 60
  L 96 56
  L 78 62
  L 76 52
  C 82 50 86 50 87 48
  C 87 46 82 46 79 46
  C 85 44 91 44 92 42
  C 92 40 85 40 78 40
  C 83 38 87 38 88 36
  C 88 34 82 34 76 34
  C 74 33 73 32 72 32 Z
`;

export const EYE_PATH_DATA = `
  M 65 42
  C 63 42 61 43 61 45
  C 61 47 63 48 65 48
  C 67 48 69 47 69 45
  C 69 43 67 42 65 42 Z
`;

// Row 1: BULL (Spans x=4 to 156 in 160 width)
export const BULL_TEXT_PATH_DATA = `
  M 4 4 L 28 4 C 36 4 40 7 40 13 C 40 17 37 19 33 21 C 38 22 41 25 41 31 C 41 37 36 40 28 40 L 4 40 Z M 16 12 L 16 18 L 26 18 C 28 18 30 17 30 15 C 30 13 28 12 26 12 Z M 16 26 L 16 32 L 27 32 C 29 32 31 31 31 29 C 31 27 29 26 27 26 Z
  M 44 4 L 56 4 L 56 27 C 56 30 58 32 61 32 C 64 32 66 30 66 27 L 66 4 L 78 4 L 78 28 C 78 36 71 40 61 40 C 51 40 44 36 44 28 Z
  M 84 4 L 96 4 L 96 29 L 114 29 L 114 40 L 84 40 Z
  M 122 4 L 134 4 L 134 29 L 152 29 L 152 40 L 122 40 Z
`;

// Row 2: DOZED (Spans x=4 to 156 in 160 width, perfectly fitted without cutoff)
export const DOZED_TEXT_PATH_DATA = `
  M 4 48 L 24 48 C 34 48 39 54 39 66 C 39 78 34 84 24 84 L 4 84 Z M 16 58 L 16 74 L 23 74 C 27 74 28 71 28 66 C 28 61 27 58 23 58 Z
  M 42 57 C 42 51 47 48 57 48 C 67 48 72 51 72 57 L 72 75 C 72 81 67 84 57 84 C 47 84 42 81 42 75 Z M 53 58 C 51 58 51 60 51 63 L 51 69 C 51 72 51 74 53 74 C 55 74 55 72 55 69 L 55 63 C 55 60 55 58 53 58 Z
  M 76 48 L 102 48 L 102 57 L 87 74 L 102 74 L 102 84 L 76 84 L 76 75 L 91 58 L 76 58 Z
  M 106 48 L 129 48 L 129 57 L 118 57 L 118 61 L 127 61 L 127 70 L 118 70 L 118 75 L 129 75 L 129 84 L 106 84 Z
  M 133 48 L 153 48 C 163 48 168 54 168 66 C 168 78 163 84 153 84 L 133 84 Z M 145 58 L 145 74 L 152 74 C 156 74 157 71 157 66 C 157 61 156 58 152 58 Z
`;

/**
 * Draws the authentic Bulldozed logo lockup onto a 2D canvas
 */
export function drawBulldozedLogoOnCanvas(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  scale: number,
  color: string = "#fffbee",
  eyeColor: string = "#111111"
) {
  if (typeof Path2D === "undefined") return;

  const mascotPath = new Path2D(MASCOT_PATH_DATA);
  const eyePath = new Path2D(EYE_PATH_DATA);
  const bullPath = new Path2D(BULL_TEXT_PATH_DATA);
  const dozedPath = new Path2D(DOZED_TEXT_PATH_DATA);

  ctx.save();
  ctx.translate(centerX, centerY);

  // 1. Draw Mascot Runner (centered above text)
  ctx.save();
  ctx.scale(scale * 1.35, scale * 1.35);
  ctx.translate(-76, -118);

  ctx.fillStyle = color;
  ctx.fill(mascotPath);

  // Eye
  ctx.fillStyle = eyeColor;
  ctx.fill(eyePath);

  // Pupil dot
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(64.5, 45, 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // 2. Draw Stacked BULL DOZED Typography directly underneath
  ctx.save();
  const textScale = scale * 1.15;
  ctx.scale(textScale, textScale);
  ctx.translate(-80, 8);

  ctx.fillStyle = color;
  ctx.fill(bullPath);
  ctx.fill(dozedPath);

  ctx.restore();

  ctx.restore();
}
