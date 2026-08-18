const PRESETS = {
  sm: { box: 36, border: 3, innerBorder: 2, radius: 10, innerRadius: 4, line: 1.6, gap: 2, fold: false },
  md: { box: 44, border: 3, innerBorder: 2, radius: 12, innerRadius: 5, line: 2, gap: 2.5, fold: true },
  lg: { box: 90, border: 3, innerBorder: 3, radius: 22, innerRadius: 8, line: 4, gap: 5, fold: true },
} as const;

export function Logo({ size = "md" }: { size?: keyof typeof PRESETS }) {
  const p = PRESETS[size];

  return (
    <div style={{ width: p.box, height: p.box, position: "relative", flexShrink: 0 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          border: `${p.border}px solid #111`,
          borderRadius: p.radius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "60%",
            height: "52%",
            background: "#FFD100",
            border: `${p.innerBorder}px solid #111`,
            borderRadius: p.innerRadius,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: p.gap,
            padding: "0 20%",
          }}
        >
          <div style={{ height: p.line, background: "#111", borderRadius: p.line }} />
          <div style={{ height: p.line, background: "#111", borderRadius: p.line, width: "80%" }} />
          <div style={{ height: p.line, background: "#111", borderRadius: p.line, width: "60%" }} />
        </div>
      </div>
      {p.fold && (
        <div
          style={{
            position: "absolute",
            bottom: p.box * -0.13,
            left: p.box * 0.18,
            width: p.box * 0.25,
            height: p.box * 0.25,
            background: "#fff",
            borderLeft: "3px solid #111",
            borderBottom: "3px solid #111",
            transform: "rotate(-45deg)",
          }}
        />
      )}
    </div>
  );
}

export function WordMark({ size = 22 }: { size?: number }) {
  return (
    <span
      style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: size, color: "#111" }}
    >
      berbahasa<span style={{ color: "#FFD100" }}>.</span>id
    </span>
  );
}
