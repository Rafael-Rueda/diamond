/* FEEDBACK — APP */
const TWEAKS = /*EDITMODE-BEGIN*/ { accent: "#2b7fff", radius: 10, font: "Inter", bg: "warm" } /*EDITMODE-END*/;
const SWATCHES = [
    "#2b7fff",
    "#e11d48",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#06b6d4",
    "#84cc16",
    "#6366f1",
    "#d97757",
    "#0ea5e9",
    "#f43f5e",
    "#22c55e",
    "#1a1917",
];
const FONTS = ["Inter", "Space Grotesk", "Fraunces", "JetBrains Mono"];
const BGS = {
    warm: {
        bg: "#f5f3ef",
        bg2: "#ebe8e1",
        surface: "#ffffff",
        border: "#d9d5cc",
        border2: "#c4bfb3",
        fg: "#1a1917",
        fg2: "#6b6862",
        fg3: "#9a968e",
    },
    paper: {
        bg: "#ffffff",
        bg2: "#f5f5f4",
        surface: "#ffffff",
        border: "#e5e5e4",
        border2: "#d4d4d2",
        fg: "#0a0a0a",
        fg2: "#525252",
        fg3: "#a3a3a3",
    },
    cool: {
        bg: "#f0f4f8",
        bg2: "#e3eaf2",
        surface: "#ffffff",
        border: "#cfd9e4",
        border2: "#b8c4d2",
        fg: "#0f172a",
        fg2: "#475569",
        fg3: "#94a3b8",
    },
    dark: {
        bg: "#0f0f0e",
        bg2: "#1a1a18",
        surface: "#1f1f1d",
        border: "#2d2c28",
        border2: "#3d3c38",
        fg: "#f5f3ef",
        fg2: "#a8a49c",
        fg3: "#6b6862",
    },
};
function applyTweaks(t) {
    const r = document.documentElement;
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--info", t.accent);
    r.style.setProperty("--radius", t.radius + "px");
    r.style.setProperty("--font", `'${t.font}'`);
    const bg = BGS[t.bg] || BGS.warm;
    const map = {
        bg: "--bg",
        bg2: "--bg-2",
        surface: "--surface",
        border: "--border",
        border2: "--border-2",
        fg: "--fg",
        fg2: "--fg-2",
        fg3: "--fg-3",
    };
    Object.entries(bg).forEach(([k, v]) => r.style.setProperty(map[k], v));
}
function Tweaks({ t, setT, onClose }) {
    const up = (k, v) => {
        const n = { ...t, [k]: v };
        setT(n);
        applyTweaks(n);
        window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
    };
    return (
        <div className="tweaks">
            <div className="tweaks-header">
                <span className="title">◆ Tweaks</span>
                <button className="close" onClick={onClose}>
                    ×
                </button>
            </div>
            <div className="tweaks-body">
                <div className="tweaks-row">
                    <label>
                        Accent <span className="val">{t.accent}</span>
                    </label>
                    <div className="swatches">
                        {SWATCHES.map((c) => (
                            <div
                                key={c}
                                className={`swatch ${t.accent === c ? "active" : ""}`}
                                style={{ background: c }}
                                onClick={() => up("accent", c)}
                            />
                        ))}
                    </div>
                </div>
                <div className="tweaks-row">
                    <label>
                        Radius <span className="val">{t.radius}px</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="24"
                        value={t.radius}
                        onChange={(e) => up("radius", +e.target.value)}
                    />
                </div>
                <div className="tweaks-row">
                    <label>
                        Font <span className="val">{t.font}</span>
                    </label>
                    <div className="font-picker">
                        {FONTS.map((f) => (
                            <button
                                key={f}
                                className={`font-btn ${t.font === f ? "active" : ""}`}
                                style={{ fontFamily: f }}
                                onClick={() => up("font", f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="tweaks-row">
                    <label>
                        Palette <span className="val">{t.bg}</span>
                    </label>
                    <div className="font-picker" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
                        {Object.keys(BGS).map((b) => (
                            <button
                                key={b}
                                className={`font-btn ${t.bg === b ? "active" : ""}`}
                                onClick={() => up("bg", b)}
                            >
                                {b}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
function App() {
    const { useState, useEffect } = React;
    const [t, setT] = useState(TWEAKS);
    const [tweaksOpen, setTweaksOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        applyTweaks(t);
        const onMsg = (e) => {
            if (e.data?.type === "__activate_edit_mode") {
                setEditMode(true);
                setTweaksOpen(true);
            }
            if (e.data?.type === "__deactivate_edit_mode") {
                setEditMode(false);
                setTweaksOpen(false);
            }
        };
        window.addEventListener("message", onMsg);
        window.parent.postMessage({ type: "__edit_mode_available" }, "*");
        return () => window.removeEventListener("message", onMsg);
    }, []);
    const cats = window.CATEGORIES;
    const total = cats.reduce((n, c) => n + c.v.length, 0);
    const groups = [
        { title: "I. Messages", idx: [0, 1, 2, 3] },
        { title: "II. Hover & Click", idx: [4, 5] },
        { title: "III. Progress & Loading", idx: [6, 7, 8] },
        { title: "IV. States", idx: [9, 10, 11] },
    ];
    return (
        <div className="page">
            <div className="header">
                <h1>
                    Feedback
                    <br />
                    <em>& status.</em>
                </h1>
                <div className="sub">
                    {total} feedback primitives across {cats.length} families — alerts, toasts, tooltips, progress
                    indicators, and the quiet states that tell users exactly what's happening.
                </div>
            </div>
            <div className="meta-row">
                <span>
                    <span className="dot" />
                    {cats.length} Categories
                </span>
                <span>
                    <span className="dot" />
                    {total} Variants
                </span>
                <span>
                    <span className="dot" />
                    {groups.length} Thematic Groups
                </span>
                <span>
                    <span className="dot" />
                    Live tweakable
                </span>
                <span style={{ marginLeft: "auto" }}>Vol. 05 · Edition 2026</span>
            </div>
            <div className="toc">
                {cats.map((c, i) => (
                    <a key={c.k} href={`#sec-${c.k}`}>
                        <span>{c.n}</span>
                        <span className="n">{String(i + 1).padStart(2, "0")} / 6</span>
                    </a>
                ))}
            </div>
            {groups.map((g, gi) => (
                <div key={g.title}>
                    <div className="group-head">
                        <span className="kicker">GROUP {String(gi + 1).padStart(2, "0")}</span>
                        <span className="title">{g.title}</span>
                        <span className="meta">{g.idx.map((i) => cats[i].n).join(" · ")}</span>
                    </div>
                    {g.idx.map((ci) => {
                        const c = cats[ci];
                        return (
                            <section
                                key={c.k}
                                id={`sec-${c.k}`}
                                className="section"
                                data-screen-label={`${String(ci + 1).padStart(2, "0")} ${c.n}`}
                            >
                                <div className="section-head">
                                    <span className="num">§{String(ci + 1).padStart(2, "0")}</span>
                                    <h2>{c.n}</h2>
                                    <span className="desc">
                                        {c.desc} · {c.v.length} variations
                                    </span>
                                </div>
                                <div className="grid">
                                    {c.v.map((V, i) => (
                                        <div key={i} className="cell">
                                            <span className="label">
                                                {c.k}-{String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="idx">
                                                {String(ci + 1).padStart(2, "0")}·{i + 1}
                                            </span>
                                            <div className="stage">
                                                <V />
                                            </div>
                                            <div className="footnote">{c.notes[i]}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            ))}
            <div
                style={{
                    marginTop: 100,
                    paddingTop: 32,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--fg-2)",
                }}
            >
                <span>— Fin —</span>
                <span>
                    {total} primitives · {cats.length} sections · {groups.length} groups
                </span>
                <span>Toggle Tweaks to customize</span>
            </div>
            {editMode && tweaksOpen && <Tweaks t={t} setT={setT} onClose={() => setTweaksOpen(false)} />}
            {editMode && !tweaksOpen && (
                <button className="fab" onClick={() => setTweaksOpen(true)}>
                    ◆
                </button>
            )}
        </div>
    );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
