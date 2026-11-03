import { PALETTE, SPRITES } from "../data/sprites";
import { SPRITE_IMG } from "../data/assets";

export function PixelSprite({ name, map, scale = 6, className = "", style = {}, flip = false }) {
  const rows = map || SPRITES[name] || [];
  const box = 16 * scale;
  const img = SPRITE_IMG[name];

  if (img) {
    return (
      <div
        className={`px-sprite px-img ${className}`}
        data-testid={`sprite-${name}`}
        style={{
          position: "relative",
          width: box,
          height: box,
          transform: flip ? "scaleX(-1)" : undefined,
          ...style,
        }}
      >
        <img src={img} alt={name} draggable={false} />
      </div>
    );
  }
  if (!rows.length) return null;

  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  const cells = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === "." || !PALETTE[ch]) continue;
      cells.push(
        <i
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x * scale,
            top: y * scale,
            width: scale,
            height: scale,
            background: PALETTE[ch],
          }}
        />
      );
    }
  });
  return (
    <div
      className={`px-sprite ${className}`}
      data-testid={`sprite-${name}`}
      style={{
        position: "relative",
        width: w * scale,
        height: h * scale,
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      {cells}
    </div>
  );
}
