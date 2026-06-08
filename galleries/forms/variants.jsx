/* ============================================================
   FORMS GALLERY — VARIANT COMPONENTS
   Each category = 6 creative variants
   ============================================================ */

const { useState, useEffect, useRef } = React;

/* Icons */
const Ic = {
    Eye: () => (
        <svg className="icn" viewBox="0 0 24 24" width="16" height="16">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    EyeOff: () => (
        <svg className="icn" viewBox="0 0 24 24" width="16" height="16">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
        </svg>
    ),
    Search: () => (
        <svg className="icn" viewBox="0 0 24 24" width="16" height="16">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
        </svg>
    ),
    Check: () => (
        <svg viewBox="0 0 24 24">
            <path d="M5 12l5 5L20 7" />
        </svg>
    ),
    Plus: () => (
        <svg className="icn" viewBox="0 0 24 24" width="14" height="14">
            <path d="M12 5v14M5 12h14" />
        </svg>
    ),
    Up: () => (
        <svg className="icn" viewBox="0 0 24 24" width="10" height="10">
            <path d="M6 15l6-6 6 6" />
        </svg>
    ),
    Down: () => (
        <svg className="icn" viewBox="0 0 24 24" width="10" height="10">
            <path d="M6 9l6 6 6-6" />
        </svg>
    ),
    Upload: () => (
        <svg className="icn" viewBox="0 0 24 24" width="22" height="22">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
    ),
    Cal: () => (
        <svg className="icn" viewBox="0 0 24 24" width="14" height="14">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    ),
    Clock: () => (
        <svg className="icn" viewBox="0 0 24 24" width="14" height="14">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    ),
    Star: () => (
        <svg viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    Heart: () => (
        <svg viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    ),
};

/* =============== 01. TEXT INPUT =============== */
const TextInput1 = () => <input className="inp-base ti-1" placeholder="Jane Doe" />;
const TextInput2 = () => <input className="inp-base ti-2" placeholder="Email address" />;
const TextInput3 = () => <input className="inp-base ti-3" placeholder="Your name" />;
const TextInput4 = () => (
    <div className="ti-4-wrap">
        <input placeholder=" " id="fl4" />
        <label htmlFor="fl4">Full name</label>
    </div>
);
const TextInput5 = () => <input className="inp-base ti-5" placeholder="~/projects $" />;
const TextInput6 = () => (
    <div className="ti-6-wrap">
        <span className="ic">
            <Ic.Search />
        </span>
        <input placeholder="Search..." />
    </div>
);

/* =============== 02. PASSWORD =============== */
const Pw1 = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="pi-wrap">
            <input className="inp-base" type={show ? "text" : "password"} defaultValue="secret123" />
            <button className="eye" onClick={() => setShow((s) => !s)}>
                {show ? <Ic.EyeOff /> : <Ic.Eye />}
            </button>
        </div>
    );
};
const Pw2 = () => {
    const [v, setV] = useState("Aa1!xyz");
    const [show, setShow] = useState(false);
    const score = Math.min(4, (v.length > 0) + /[A-Z]/.test(v) + /\d/.test(v) + /[!@#$]/.test(v));
    return (
        <div style={{ maxWidth: 280, width: "100%" }}>
            <div className="pi-wrap">
                <input
                    className="inp-base"
                    type={show ? "text" : "password"}
                    value={v}
                    onChange={(e) => setV(e.target.value)}
                />
                <button className="eye" onClick={() => setShow((s) => !s)}>
                    {show ? <Ic.EyeOff /> : <Ic.Eye />}
                </button>
            </div>
            <div className="pi-strength">
                {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={i < score ? "on" : ""} />
                ))}
            </div>
        </div>
    );
};
const Pw3 = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="pi-wrap">
            <input
                className="inp-base ti-2"
                type={show ? "text" : "password"}
                defaultValue="hidden"
                placeholder="Password"
            />
            <button className="eye" onClick={() => setShow((s) => !s)}>
                {show ? <Ic.EyeOff /> : <Ic.Eye />}
            </button>
        </div>
    );
};
const Pw4 = () => {
    const [v, setV] = useState(["1", "2", "3", "", "", "", ""]);
    return (
        <div className="pi-dot-wrap">
            {v.map((c, i) => (
                <input
                    key={i}
                    className="pi-dot"
                    type="password"
                    maxLength={1}
                    value={c}
                    onChange={(e) => {
                        const n = [...v];
                        n[i] = e.target.value;
                        setV(n);
                    }}
                />
            ))}
        </div>
    );
};
const Pw5 = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="pi-wrap">
            <input className="inp-base ti-5" type={show ? "text" : "password"} defaultValue="••••••••" />
            <button className="eye" style={{ color: "var(--accent)" }} onClick={() => setShow((s) => !s)}>
                {show ? "HIDE" : "SHOW"}
            </button>
        </div>
    );
};
const Pw6 = () => {
    const [v, setV] = useState("password");
    const [show, setShow] = useState(false);
    const checks = [
        { label: "8+ chars", ok: v.length >= 8 },
        { label: "Number", ok: /\d/.test(v) },
        { label: "Symbol", ok: /[!@#$%]/.test(v) },
    ];
    return (
        <div style={{ maxWidth: 260, width: "100%" }}>
            <div className="pi-wrap">
                <input
                    className="inp-base"
                    type={show ? "text" : "password"}
                    value={v}
                    onChange={(e) => setV(e.target.value)}
                />
                <button className="eye" onClick={() => setShow((s) => !s)}>
                    {show ? <Ic.EyeOff /> : <Ic.Eye />}
                </button>
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {checks.map((c, i) => (
                    <span
                        key={i}
                        style={{
                            fontSize: 10,
                            padding: "3px 7px",
                            borderRadius: 4,
                            fontFamily: "JetBrains Mono, monospace",
                            background: c.ok ? "color-mix(in oklab, var(--accent) 15%, white)" : "var(--bg-2)",
                            color: c.ok ? "var(--accent)" : "var(--fg-3)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                        }}
                    >
                        {c.ok ? "✓" : "○"} {c.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

/* =============== 03. NUMBER =============== */
const Num1 = () => {
    const [v, setV] = useState(10);
    return (
        <div className="ni-wrap">
            <button onClick={() => setV((n) => n - 1)}>−</button>
            <input value={v} onChange={(e) => setV(+e.target.value || 0)} />
            <button onClick={() => setV((n) => n + 1)}>+</button>
        </div>
    );
};
const Num2 = () => {
    const [v, setV] = useState(42);
    return (
        <div className="ni-steppers">
            <input value={v} onChange={(e) => setV(+e.target.value || 0)} />
            <div className="col">
                <button onClick={() => setV((n) => n + 1)}>
                    <Ic.Up />
                </button>
                <button onClick={() => setV((n) => n - 1)}>
                    <Ic.Down />
                </button>
            </div>
        </div>
    );
};
const Num3 = () => {
    const [v, setV] = useState(50);
    return (
        <div className="ni-slider-wrap">
            <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} />
            <div className="val">{v}</div>
        </div>
    );
};
const Num4 = () => {
    const [v, setV] = useState("1,250");
    return (
        <div className="ni-currency">
            <span className="sym">$</span>
            <input className="inp-base" value={v} onChange={(e) => setV(e.target.value)} />
            <span className="sfx">USD</span>
        </div>
    );
};
const Num5 = () => {
    const [v, setV] = useState(5);
    return (
        <div style={{ display: "inline-flex", gap: 4, background: "var(--bg-2)", padding: 4, borderRadius: 8 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                    key={n}
                    onClick={() => setV(n)}
                    style={{
                        width: 30,
                        height: 30,
                        border: "none",
                        borderRadius: 6,
                        fontFamily: "JetBrains Mono,monospace",
                        cursor: "pointer",
                        fontSize: 13,
                        background: v === n ? "var(--accent)" : "transparent",
                        color: v === n ? "white" : "var(--fg-2)",
                    }}
                >
                    {n}
                </button>
            ))}
        </div>
    );
};
const Num6 = () => {
    const [v, setV] = useState(24);
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                background: "#0a0a08",
                color: "var(--accent)",
                borderRadius: 8,
                fontFamily: "JetBrains Mono,monospace",
                border: "1px solid #2d2c28",
            }}
        >
            <button
                onClick={() => setV((n) => n - 5)}
                style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: 13 }}
            >
                [−5]
            </button>
            <span style={{ fontSize: 20, minWidth: 40, textAlign: "center" }}>{v}</span>
            <button
                onClick={() => setV((n) => n + 5)}
                style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: 13 }}
            >
                [+5]
            </button>
        </div>
    );
};

/* =============== 04. TEXTAREA =============== */
const Ta1 = () => <textarea className="inp-base ta-1" placeholder="Write a message..." />;
const Ta2 = () => {
    const [v, setV] = useState("Auto-resizing textarea.");
    const r = useRef();
    useEffect(() => {
        if (r.current) {
            r.current.style.height = "auto";
            r.current.style.height = r.current.scrollHeight + "px";
        }
    }, [v]);
    return <textarea ref={r} className="inp-base ta-auto" value={v} onChange={(e) => setV(e.target.value)} />;
};
const Ta3 = () => {
    const [v, setV] = useState("A short note");
    return (
        <div className="ta-count-wrap">
            <textarea className="inp-base" value={v} onChange={(e) => setV(e.target.value.slice(0, 280))} />
            <span className="cnt">{v.length}/280</span>
        </div>
    );
};
const Ta4 = () => (
    <div className="ta-toolbar-wrap">
        <div className="tb">
            <button style={{ fontWeight: 700 }}>B</button>
            <button style={{ fontStyle: "italic" }}>I</button>
            <button style={{ textDecoration: "underline" }}>U</button>
            <button>{"{ }"}</button>
            <button>🔗</button>
        </div>
        <textarea className="inp-base" placeholder="Your note..." style={{ border: "none", borderRadius: 0 }} />
    </div>
);
const Ta5 = () => <textarea className="inp-base ta-1 ta-markdown" defaultValue={"# Heading\n\nMarkdown editor."} />;
const Ta6 = () => <textarea className="inp-base ta-ghost" placeholder="Jot down thoughts..." />;

/* =============== 05. CHECKBOX =============== */
const Cb1 = () => {
    const [v, s] = useState(true);
    return (
        <label className="cb">
            <input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} />
            <span className="box">
                <Ic.Check />
            </span>
            Accept terms
        </label>
    );
};
const Cb2 = () => {
    const [v, s] = useState(true);
    return (
        <label className="cb cb-round">
            <input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} />
            <span className="box">
                <Ic.Check />
            </span>
            Remember me
        </label>
    );
};
const Cb3 = () => {
    const [v, s] = useState(true);
    return (
        <label className="cb cb-switch-style">
            <input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} />
            <span className="box"></span>Notifications
        </label>
    );
};
const Cb4 = () => {
    const [v, s] = useState(true);
    return (
        <label className="cb cb-card">
            <input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} />
            <span className="box">
                <Ic.Check />
            </span>
            <span>
                <div style={{ fontWeight: 600 }}>Premium plan</div>
                <div style={{ fontSize: 12, color: "var(--fg-2)" }}>$29/month</div>
            </span>
        </label>
    );
};
const Cb5 = () => {
    const [v, s] = useState(true);
    return (
        <label className="cb cb-x">
            <input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} />
            <span className="box">
                <svg
                    viewBox="0 0 24 24"
                    style={{ width: 12, height: 12, stroke: "currentColor", strokeWidth: 3, fill: "none" }}
                >
                    <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
            </span>
            Opt out
        </label>
    );
};
const Cb6 = () => {
    const [v, s] = useState(true);
    return (
        <label className="cb cb-ascii">
            <input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} />
            <span className="box"></span>[x] enabled
        </label>
    );
};

/* =============== 06. CHECKBOX GROUP =============== */
const CbG1 = () => {
    const [v, s] = useState(["a", "b"]);
    const t = (k) => s((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Apple", "Banana", "Cherry"].map((n, i) => {
                const k = ["a", "b", "c"][i];
                return (
                    <label key={k} className="cb">
                        <input type="checkbox" checked={v.includes(k)} onChange={() => t(k)} />
                        <span className="box">
                            <Ic.Check />
                        </span>
                        {n}
                    </label>
                );
            })}
        </div>
    );
};
const CbG2 = () => {
    const [v, s] = useState(["a"]);
    const t = (k) => s((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Design", "Code", "Write", "Ship"].map((n, i) => {
                const k = ["a", "b", "c", "d"][i];
                return (
                    <label key={k} className="cb cb-card" style={{ minWidth: 130 }}>
                        <input type="checkbox" checked={v.includes(k)} onChange={() => t(k)} />
                        <span className="box">
                            <Ic.Check />
                        </span>
                        {n}
                    </label>
                );
            })}
        </div>
    );
};
const CbG3 = () => {
    const [v, s] = useState(["b"]);
    const t = (k) => s((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
    return (
        <div style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
            {["React", "Vue", "Svelte", "Solid", "Qwik"].map((n) => (
                <button
                    key={n}
                    onClick={() => t(n)}
                    style={{
                        padding: "6px 12px",
                        borderRadius: 999,
                        border: v.includes(n) ? "1px solid var(--accent)" : "1px solid var(--border)",
                        background: v.includes(n) ? "var(--accent)" : "var(--surface)",
                        color: v.includes(n) ? "white" : "var(--fg)",
                        cursor: "pointer",
                        fontSize: 13,
                    }}
                >
                    {n}
                </button>
            ))}
        </div>
    );
};
const CbG4 = () => {
    const [v, s] = useState(["a", "b"]);
    const all = ["a", "b", "c"];
    const t = (k) => s((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: 12,
                background: "var(--surface)",
                minWidth: 200,
            }}
        >
            <label
                className="cb"
                style={{ borderBottom: "1px solid var(--border)", paddingBottom: 8, fontWeight: 600 }}
            >
                <input
                    type="checkbox"
                    checked={v.length === 3}
                    ref={(el) => {
                        if (el) el.indeterminate = v.length > 0 && v.length < 3;
                    }}
                    onChange={() => s(v.length === 3 ? [] : all)}
                />
                <span className="box">
                    <Ic.Check />
                </span>
                Select all
            </label>
            {["Marketing", "Product", "Engineering"].map((n, i) => {
                const k = ["a", "b", "c"][i];
                return (
                    <label key={k} className="cb">
                        <input type="checkbox" checked={v.includes(k)} onChange={() => t(k)} />
                        <span className="box">
                            <Ic.Check />
                        </span>
                        {n}
                    </label>
                );
            })}
        </div>
    );
};
const CbG5 = () => {
    const [v, s] = useState(["Mon", "Wed", "Fri"]);
    const t = (d) => s((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));
    return (
        <div style={{ display: "inline-flex", gap: 4 }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <button
                    key={d}
                    onClick={() => t(d)}
                    style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        border: "1px solid var(--border)",
                        background: v.includes(d) ? "var(--accent)" : "var(--surface)",
                        color: v.includes(d) ? "white" : "var(--fg-2)",
                        cursor: "pointer",
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: "JetBrains Mono,monospace",
                    }}
                >
                    {d.slice(0, 2)}
                </button>
            ))}
        </div>
    );
};
const CbG6 = () => {
    const [v, s] = useState(["a", "b"]);
    const t = (k) => s((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
    const items = [
        { k: "a", n: "Essentials", p: "Free" },
        { k: "b", n: "Pro tools", p: "$9" },
        { k: "c", n: "Team seats", p: "$24" },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 240 }}>
            {items.map((i) => (
                <label
                    key={i.k}
                    className="cb"
                    style={{
                        justifyContent: "space-between",
                        padding: 10,
                        border: v.includes(i.k) ? "1px solid var(--accent)" : "1px solid var(--border)",
                        borderRadius: 8,
                        background: "var(--surface)",
                    }}
                >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <input type="checkbox" checked={v.includes(i.k)} onChange={() => t(i.k)} />
                        <span className="box">
                            <Ic.Check />
                        </span>
                        {i.n}
                    </span>
                    <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 12, color: "var(--fg-2)" }}>
                        {i.p}
                    </span>
                </label>
            ))}
        </div>
    );
};

/* =============== 07. RADIO =============== */
const Rd1 = () => {
    const [v, s] = useState("a");
    return (
        <div style={{ display: "flex", gap: 20 }}>
            {["a", "b"].map((k) => (
                <label key={k} className="rd">
                    <input type="radio" name="r1" checked={v === k} onChange={() => s(k)} />
                    <span className="dot"></span>
                    {k === "a" ? "Option A" : "Option B"}
                </label>
            ))}
        </div>
    );
};
const Rd2 = () => {
    const [v, s] = useState("a");
    return (
        <div style={{ display: "flex", gap: 16 }}>
            {["a", "b"].map((k) => (
                <label key={k} className="rd rd-square">
                    <input type="radio" name="r2" checked={v === k} onChange={() => s(k)} />
                    <span className="dot"></span>
                    {k === "a" ? "Yes" : "No"}
                </label>
            ))}
        </div>
    );
};
const Rd3 = () => {
    const [v, s] = useState("a");
    return (
        <div style={{ display: "flex", gap: 16 }}>
            {["a", "b"].map((k) => (
                <label key={k} className="rd rd-bullseye">
                    <input type="radio" name="r3" checked={v === k} onChange={() => s(k)} />
                    <span className="dot"></span>
                    {k === "a" ? "Monthly" : "Yearly"}
                </label>
            ))}
        </div>
    );
};
const Rd4 = () => {
    const [v, s] = useState("b");
    return (
        <div style={{ display: "flex", gap: 8 }}>
            {[
                { k: "a", t: "Basic" },
                { k: "b", t: "Pro" },
            ].map((o) => (
                <label key={o.k} className="rd rd-card">
                    <input type="radio" name="r4" checked={v === o.k} onChange={() => s(o.k)} />
                    <span className="dot"></span>
                    {o.t}
                </label>
            ))}
        </div>
    );
};
const Rd5 = () => {
    const [v, s] = useState("b");
    return (
        <div className="rd-segmented">
            {["Left", "Center", "Right"].map((k) => (
                <label key={k}>
                    <input type="radio" name="r5" checked={v === k} onChange={() => s(k)} />
                    {k}
                </label>
            ))}
        </div>
    );
};
const Rd6 = () => {
    const [v, s] = useState("M");
    return (
        <div style={{ display: "inline-flex", gap: 6 }}>
            {["XS", "S", "M", "L", "XL"].map((k) => (
                <label
                    key={k}
                    className="rd-pill"
                    style={{
                        padding: "8px 14px",
                        border: "1.5px solid",
                        borderColor: v === k ? "var(--accent)" : "var(--border)",
                        borderRadius: 999,
                        cursor: "pointer",
                        fontSize: 13,
                        background: v === k ? "var(--accent)" : "var(--surface)",
                        color: v === k ? "white" : "var(--fg)",
                    }}
                >
                    <input type="radio" name="r6" checked={v === k} onChange={() => s(k)} style={{ display: "none" }} />
                    {k}
                </label>
            ))}
        </div>
    );
};

/* =============== 08. RADIO GROUP =============== */
const RdG1 = () => {
    const [v, s] = useState("m");
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
                ["m", "Monthly"],
                ["q", "Quarterly"],
                ["y", "Yearly"],
            ].map(([k, t]) => (
                <label key={k} className="rd">
                    <input type="radio" name="rg1" checked={v === k} onChange={() => s(k)} />
                    <span className="dot"></span>
                    {t}
                </label>
            ))}
        </div>
    );
};
const RdG2 = () => {
    const [v, s] = useState("a");
    const opts = [
        { k: "a", t: "Starter", p: "$0", d: "For hobby" },
        { k: "b", t: "Team", p: "$49", d: "For pros" },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {opts.map((o) => (
                <label key={o.k} className="rd rd-card" style={{ minWidth: 220 }}>
                    <input type="radio" name="rg2" checked={v === o.k} onChange={() => s(o.k)} />
                    <span className="dot"></span>
                    <span style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{o.t}</div>
                        <div style={{ fontSize: 11, color: "var(--fg-2)" }}>{o.d}</div>
                    </span>
                    <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 13 }}>{o.p}</span>
                </label>
            ))}
        </div>
    );
};
const RdG3 = () => {
    const [v, s] = useState("b");
    return (
        <div className="rd-segmented">
            {["Grid", "List", "Kanban"].map((k) => (
                <label key={k}>
                    <input type="radio" name="rg3" checked={v === k} onChange={() => s(k)} />
                    {k}
                </label>
            ))}
        </div>
    );
};
const RdG4 = () => {
    const [v, s] = useState("a");
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
            {[
                ["a", "☀"],
                ["b", "◐"],
                ["c", "☾"],
            ].map(([k, g]) => (
                <label
                    key={k}
                    style={{
                        aspectRatio: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        border: "1.5px solid",
                        borderColor: v === k ? "var(--accent)" : "var(--border)",
                        borderRadius: 8,
                        cursor: "pointer",
                        background: v === k ? "color-mix(in oklab, var(--accent) 8%, white)" : "var(--surface)",
                    }}
                >
                    <input
                        type="radio"
                        name="rg4"
                        checked={v === k}
                        onChange={() => s(k)}
                        style={{ display: "none" }}
                    />
                    {g}
                </label>
            ))}
        </div>
    );
};
const RdG5 = () => {
    const [v, s] = useState(2);
    return (
        <div style={{ display: "inline-flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    onClick={() => s(n)}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 6,
                        border: "1px solid var(--border)",
                        background: v === n ? "var(--fg)" : "var(--surface)",
                        color: v === n ? "var(--bg)" : "var(--fg-2)",
                        fontFamily: "JetBrains Mono,monospace",
                        cursor: "pointer",
                        fontSize: 13,
                    }}
                >
                    {n}
                </button>
            ))}
        </div>
    );
};
const RdG6 = () => {
    const [v, s] = useState("b");
    const opts = [
        ["a", "Email"],
        ["b", "SMS"],
        ["c", "Push"],
        ["d", "None"],
    ];
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                border: "1px solid var(--border)",
                borderRadius: 10,
                background: "var(--surface)",
                minWidth: 220,
            }}
        >
            {opts.map(([k, t], i) => (
                <li key={k} style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
                    <label
                        className="rd"
                        style={{ padding: "10px 14px", width: "100%", justifyContent: "space-between" }}
                    >
                        <span>{t}</span>
                        <span style={{ display: "inline-flex", alignItems: "center" }}>
                            <input type="radio" name="rg6" checked={v === k} onChange={() => s(k)} />
                            <span className="dot"></span>
                        </span>
                    </label>
                </li>
            ))}
        </ul>
    );
};

/* =============== 09. SELECT =============== */
const Sel1 = () => (
    <select className="sel-native">
        <option>Select country...</option>
        <option>United States</option>
        <option>Japan</option>
        <option>Brazil</option>
    </select>
);
const Sel2 = () => {
    const [open, setOpen] = useState(false);
    const [v, setV] = useState("React");
    return (
        <div className={`sel-custom ${open ? "open" : ""}`}>
            <div className="trigger" onClick={() => setOpen((o) => !o)}>
                {v}
                <Ic.Down />
            </div>
            {open && (
                <div className="menu">
                    {["React", "Vue", "Svelte", "Solid"].map((o) => (
                        <div
                            key={o}
                            className={`opt ${v === o ? "active" : ""}`}
                            onClick={() => {
                                setV(o);
                                setOpen(false);
                            }}
                        >
                            {o}
                            {v === o ? "✓" : ""}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Sel3 = () => {
    const [open, setOpen] = useState(false);
    const [v, setV] = useState({ n: "Aria Chen", i: "AC" });
    const ppl = [
        { n: "Aria Chen", i: "AC" },
        { n: "Ben Lee", i: "BL" },
        { n: "Carmen Diaz", i: "CD" },
    ];
    return (
        <div className={`sel-custom sel-avatar ${open ? "open" : ""}`}>
            <div className="trigger" onClick={() => setOpen((o) => !o)}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <span className="av">{v.i}</span>
                    {v.n}
                </span>
                <Ic.Down />
            </div>
            {open && (
                <div className="menu">
                    {ppl.map((p) => (
                        <div
                            key={p.i}
                            className="opt"
                            onClick={() => {
                                setV(p);
                                setOpen(false);
                            }}
                        >
                            <span className="av">{p.i}</span>
                            {p.n}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Sel4 = () => {
    const [open, setOpen] = useState(false);
    const [v, setV] = useState("Medium");
    return (
        <div className={`sel-custom sel-flat ${open ? "open" : ""}`}>
            <div className="trigger" onClick={() => setOpen((o) => !o)}>
                {v}
                <Ic.Down />
            </div>
            {open && (
                <div className="menu">
                    {["Low", "Medium", "High", "Critical"].map((o) => (
                        <div
                            key={o}
                            className="opt"
                            onClick={() => {
                                setV(o);
                                setOpen(false);
                            }}
                        >
                            {o}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Sel5 = () => {
    const [open, setOpen] = useState(false);
    const [v, setV] = useState("production");
    return (
        <div className={`sel-custom sel-mono ${open ? "open" : ""}`}>
            <div className="trigger" onClick={() => setOpen((o) => !o)}>
                {v}
                <span style={{ color: "var(--accent)" }}>▼</span>
            </div>
            {open && (
                <div className="menu" style={{ background: "#0a0a08", color: "#d4d0c8", borderColor: "#2d2c28" }}>
                    {["production", "staging", "development"].map((o) => (
                        <div
                            key={o}
                            className="opt"
                            onClick={() => {
                                setV(o);
                                setOpen(false);
                            }}
                        >
                            {o}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Sel6 = () => {
    const [open, setOpen] = useState(false);
    const [v, setV] = useState({ f: "🇯🇵", n: "Japan" });
    const opts = [
        { f: "🇺🇸", n: "USA" },
        { f: "🇯🇵", n: "Japan" },
        { f: "🇧🇷", n: "Brazil" },
        { f: "🇫🇷", n: "France" },
    ];
    return (
        <div className={`sel-custom ${open ? "open" : ""}`}>
            <div className="trigger" onClick={() => setOpen((o) => !o)}>
                <span style={{ display: "inline-flex", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{v.f}</span>
                    {v.n}
                </span>
                <Ic.Down />
            </div>
            {open && (
                <div className="menu">
                    {opts.map((o) => (
                        <div
                            key={o.n}
                            className="opt"
                            onClick={() => {
                                setV(o);
                                setOpen(false);
                            }}
                        >
                            <span style={{ fontSize: 18, marginRight: 10 }}>{o.f}</span>
                            {o.n}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/* =============== 10. MULTI-SELECT =============== */
const Ms1 = () => {
    const [tags, setTags] = useState(["design", "system"]);
    return (
        <div className="mse-wrap">
            {tags.map((t) => (
                <span key={t} className="mse-tag">
                    {t}
                    <button onClick={() => setTags((s) => s.filter((x) => x !== t))}>×</button>
                </span>
            ))}
            <input
                placeholder="Add tag..."
                onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                        setTags([...tags, e.target.value]);
                        e.target.value = "";
                    }
                }}
            />
        </div>
    );
};
const Ms2 = () => {
    const [tags, setTags] = useState(["React", "TypeScript"]);
    return (
        <div className="mse-wrap mse-chip">
            {tags.map((t) => (
                <span key={t} className="mse-tag">
                    {t}
                    <button onClick={() => setTags((s) => s.filter((x) => x !== t))}>×</button>
                </span>
            ))}
            <input
                placeholder="+ add"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                        setTags([...tags, e.target.value]);
                        e.target.value = "";
                    }
                }}
            />
        </div>
    );
};
const Ms3 = () => {
    const [v, setV] = useState(["a", "c"]);
    const t = (k) => setV((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
    return (
        <div className="mse-check">
            {[
                ["a", "Urgent"],
                ["b", "Important"],
                ["c", "Low priority"],
            ].map(([k, n]) => (
                <label key={k} className="cb">
                    <input type="checkbox" checked={v.includes(k)} onChange={() => t(k)} />
                    <span className="box">
                        <Ic.Check />
                    </span>
                    {n}
                </label>
            ))}
        </div>
    );
};
const Ms4 = () => {
    const [v, setV] = useState(["a", "b"]);
    const opts = [
        ["a", "Red"],
        ["b", "Blue"],
        ["c", "Green"],
        ["d", "Yellow"],
    ];
    return (
        <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 6, maxWidth: 240 }}>
            {opts.map(([k, n]) => (
                <button
                    key={k}
                    onClick={() => setV((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]))}
                    style={{
                        padding: "6px 12px",
                        borderRadius: 999,
                        border: v.includes(k) ? "1px solid var(--accent)" : "1px solid var(--border)",
                        background: v.includes(k) ? "color-mix(in oklab, var(--accent) 12%, white)" : "var(--surface)",
                        color: v.includes(k) ? "var(--accent)" : "var(--fg)",
                        cursor: "pointer",
                        fontSize: 13,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                    }}
                >
                    {v.includes(k) && <Ic.Check />}
                    {n}
                </button>
            ))}
        </div>
    );
};
const Ms5 = () => {
    const [v, setV] = useState(["a"]);
    const opts = [
        ["a", "Frontend"],
        ["b", "Backend"],
        ["c", "Mobile"],
        ["d", "DevOps"],
    ];
    return (
        <div
            style={{
                display: "flex",
                gap: 0,
                border: "1px solid var(--border)",
                borderRadius: 8,
                overflow: "hidden",
                background: "var(--surface)",
            }}
        >
            {opts.map(([k, n], i) => (
                <button
                    key={k}
                    onClick={() => setV((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]))}
                    style={{
                        padding: "10px 14px",
                        border: "none",
                        borderLeft: i === 0 ? "none" : "1px solid var(--border)",
                        background: v.includes(k) ? "var(--fg)" : "transparent",
                        color: v.includes(k) ? "var(--bg)" : "var(--fg-2)",
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: "JetBrains Mono,monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                    }}
                >
                    {n}
                </button>
            ))}
        </div>
    );
};
const Ms6 = () => {
    const [open, setOpen] = useState(false);
    const [v, setV] = useState(["Apple", "Cherry"]);
    const opts = ["Apple", "Banana", "Cherry", "Durian", "Elderberry"];
    const t = (k) => setV((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
    return (
        <div className={`sel-custom ${open ? "open" : ""}`}>
            <div className="trigger" onClick={() => setOpen((o) => !o)}>
                <span>{v.length} selected</span>
                <Ic.Down />
            </div>
            {open && (
                <div className="menu">
                    {opts.map((o) => (
                        <label key={o} className="opt" style={{ cursor: "pointer" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                                <input type="checkbox" checked={v.includes(o)} onChange={() => t(o)} />
                                {o}
                            </span>
                            {v.includes(o) && "✓"}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

/* =============== 11. AUTOCOMPLETE =============== */
const useFocus = () => {
    const [f, setF] = useState(false);
    return { f, bind: { onFocus: () => setF(true), onBlur: () => setTimeout(() => setF(false), 150) } };
};
const Ac1 = () => {
    const [q, setQ] = useState("ja");
    const { f, bind } = useFocus();
    const opts = ["Japan", "Jamaica", "Jordan"].filter((o) => o.toLowerCase().includes(q.toLowerCase()));
    return (
        <div className="ac-wrap">
            <input
                className="inp-base"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Type country..."
                {...bind}
            />
            {f && q && (
                <div className="ac-menu">
                    {opts.length ? (
                        opts.map((o) => (
                            <div
                                key={o}
                                className="opt"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    setQ(o);
                                }}
                            >
                                {o}
                            </div>
                        ))
                    ) : (
                        <div className="empty">No matches</div>
                    )}
                </div>
            )}
        </div>
    );
};
const Ac2 = () => {
    const [q, setQ] = useState("re");
    const { f, bind } = useFocus();
    const opts = [
        { l: "React", h: "library" },
        { l: "Redux", h: "state" },
        { l: "Redwood", h: "framework" },
    ];
    const filt = opts.filter((o) => o.l.toLowerCase().includes(q.toLowerCase()));
    return (
        <div className="ac-wrap">
            <input
                className="inp-base"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search packages..."
                {...bind}
            />
            {f && q && filt.length > 0 && (
                <div className="ac-menu">
                    {filt.map((o) => (
                        <div
                            key={o.l}
                            className="opt"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setQ(o.l);
                            }}
                        >
                            {o.l}
                            <span className="hint">{o.h}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Ac3 = () => {
    const [q, setQ] = useState("");
    const { f, bind } = useFocus();
    const recent = ["dashboard", "settings", "billing"];
    return (
        <div className="ac-wrap">
            <input
                className="inp-base"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Jump to..."
                {...bind}
            />
            {f && (
                <div className="ac-menu">
                    <div
                        style={{
                            padding: "6px 10px",
                            fontSize: 10,
                            color: "var(--fg-3)",
                            fontFamily: "JetBrains Mono,monospace",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        Recent
                    </div>
                    {recent.map((r) => (
                        <div
                            key={r}
                            className="opt"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setQ(r);
                            }}
                        >
                            ⌘ {r}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Ac4 = () => {
    const [q, setQ] = useState("jane");
    const { f, bind } = useFocus();
    const ppl = [
        { n: "Jane Austen", e: "jane@lit" },
        { n: "Jane Goodall", e: "jane@conserv" },
    ];
    const filt = ppl.filter((p) => p.n.toLowerCase().includes(q.toLowerCase()));
    return (
        <div className="ac-wrap">
            <input
                className="inp-base"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Mention..."
                {...bind}
            />
            {f && q && filt.length > 0 && (
                <div className="ac-menu">
                    {filt.map((p) => (
                        <div
                            key={p.n}
                            className="opt"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setQ(p.n);
                            }}
                            style={{ display: "flex", alignItems: "center", gap: 10 }}
                        >
                            <span
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    background: "var(--bg-2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 11,
                                    fontWeight: 700,
                                }}
                            >
                                {p.n[0]}
                            </span>
                            <span style={{ flex: 1 }}>{p.n}</span>
                            <span className="hint">@{p.e}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Ac5 = () => {
    const [q, setQ] = useState("/c");
    const { f, bind } = useFocus();
    const matches = ["/create", "/copy", "/close"].filter((c) => c.startsWith(q));
    return (
        <div className="ac-wrap">
            <input className="inp-base ti-5" value={q} onChange={(e) => setQ(e.target.value)} {...bind} />
            {f && q.startsWith("/") && matches.length > 0 && (
                <div className="ac-menu" style={{ background: "#0a0a08", borderColor: "#2d2c28" }}>
                    {matches.map((c) => (
                        <div
                            key={c}
                            className="opt"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setQ(c);
                            }}
                            style={{ color: "var(--accent)", fontFamily: "JetBrains Mono,monospace" }}
                        >
                            {c}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Ac6 = () => {
    const [q, setQ] = useState("tod");
    const { f, bind } = useFocus();
    const opts = ["today", "tomorrow", "tonight", "toddler"];
    const best = opts.find((o) => o.startsWith(q));
    return (
        <div className="ac-wrap" style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
                {f && best && best !== q && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            padding: "10px 14px",
                            fontFamily: "var(--font)",
                            fontSize: 14,
                            color: "var(--fg-3)",
                            pointerEvents: "none",
                        }}
                    >
                        <span style={{ visibility: "hidden" }}>{q}</span>
                        {best.slice(q.length)}
                    </div>
                )}
                <input
                    className="inp-base"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Tab" && best) {
                            e.preventDefault();
                            setQ(best);
                        }
                    }}
                    {...bind}
                    style={{ position: "relative", background: "transparent" }}
                />
            </div>
            <div
                style={{
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 10,
                    color: "var(--fg-3)",
                    marginTop: 4,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                }}
            >
                Tab to complete
            </div>
        </div>
    );
};

/* =============== 12. SWITCH =============== */
const Sw1 = () => {
    const [v, s] = useState(true);
    return <div className={`sw ${v ? "on" : ""}`} onClick={() => s((o) => !o)}></div>;
};
const Sw2 = () => {
    const [v, s] = useState(false);
    return <div className={`sw sw-square ${v ? "on" : ""}`} onClick={() => s((o) => !o)}></div>;
};
const Sw3 = () => {
    const [v, s] = useState(true);
    return (
        <label className="sw-label">
            <span style={{ fontSize: 13, color: "var(--fg-2)" }}>Notifications</span>
            <div className={`sw ${v ? "on" : ""}`} onClick={() => s((o) => !o)}></div>
        </label>
    );
};
const Sw4 = () => {
    const [v, s] = useState(true);
    return <div className={`sw sw-ios ${v ? "on" : ""}`} onClick={() => s((o) => !o)}></div>;
};
const Sw5 = () => {
    const [v, s] = useState("on");
    return (
        <div className="sw-bi" onClick={() => s((o) => (o === "on" ? "off" : "on"))}>
            <span className={v === "off" ? "active" : ""}>Off</span>
            <span className={v === "on" ? "active" : ""}>On</span>
        </div>
    );
};
const Sw6 = () => {
    const [v, s] = useState(true);
    return <div className={`sw sw-switch-industrial ${v ? "on" : ""}`} onClick={() => s((o) => !o)}></div>;
};

/* =============== 13. SLIDER =============== */
const Sli1 = () => {
    const [v, s] = useState(50);
    return (
        <div className="sl-base">
            <div className="track">
                <div className="fill" style={{ width: v + "%" }} />
                <div className="thumb" style={{ left: v + "%" }} />
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={v}
                onChange={(e) => s(+e.target.value)}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
            />
        </div>
    );
};
const Sli2 = () => {
    const [v, s] = useState(35);
    return (
        <div className="sl-base sl-thick">
            <div className="track">
                <div className="fill" style={{ width: v + "%" }} />
                <div className="thumb" style={{ left: v + "%" }} />
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={v}
                onChange={(e) => s(+e.target.value)}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
            />
        </div>
    );
};
const Sli3 = () => {
    const [v, s] = useState(70);
    return (
        <div className="sl-base sl-bubble">
            <div className="track">
                <div className="fill" style={{ width: v + "%" }} />
                <div className="thumb" style={{ left: v + "%" }} data-v={v} />
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={v}
                onChange={(e) => s(+e.target.value)}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", marginTop: 16 }}
            />
        </div>
    );
};
const Sli4 = () => {
    const [v, s] = useState(2);
    return (
        <div className="sl-base sl-ticks" style={{ width: 240 }}>
            <div className="track">
                <div className="fill" style={{ width: (v / 4) * 100 + "%" }} />
                <div className="thumb" style={{ left: (v / 4) * 100 + "%" }} />
            </div>
            <div className="ticks">
                {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} />
                ))}
            </div>
            <div className="labels">
                {["XS", "S", "M", "L", "XL"].map((l) => (
                    <span key={l}>{l}</span>
                ))}
            </div>
            <input
                type="range"
                min="0"
                max="4"
                value={v}
                onChange={(e) => s(+e.target.value)}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
            />
        </div>
    );
};
const Sli5 = () => {
    const [v, s] = useState(60);
    return (
        <div className="sl-base sl-gradient">
            <div className="track">
                <div className="fill" style={{ width: v + "%" }} />
                <div className="thumb" style={{ left: v + "%" }} />
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={v}
                onChange={(e) => s(+e.target.value)}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
            />
        </div>
    );
};
const Sli6 = () => {
    const [v, s] = useState(40);
    return (
        <div className="sl-base sl-mono">
            <div className="track">
                <div className="fill" style={{ width: v + "%" }} />
                <div className="thumb" style={{ left: v + "%" }} />
            </div>
            <div
                style={{
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 11,
                    color: "var(--fg-2)",
                    textAlign: "right",
                    marginTop: 10,
                    letterSpacing: "0.1em",
                }}
            >
                {v.toString().padStart(3, "0")} / 100
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={v}
                onChange={(e) => s(+e.target.value)}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: 20, opacity: 0, cursor: "pointer" }}
            />
        </div>
    );
};

/* =============== 14. RANGE SLIDER =============== */
const RSl = ({ a, b, setA, setB, style, klass }) => {
    const ref = useRef();
    const dragRef = useRef(null);
    const onDown = (which) => (e) => {
        e.preventDefault();
        dragRef.current = which;
        const move = (ev) => {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            const x = ev.touches?.[0]?.clientX ?? ev.clientX;
            const pct = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
            if (dragRef.current === "a") setA(Math.min(Math.round(pct), b - 1));
            else setB(Math.max(Math.round(pct), a + 1));
        };
        const up = () => {
            dragRef.current = null;
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("touchend", up);
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("touchend", up);
    };
    const onTrackClick = (e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const pct = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
        if (Math.abs(pct - a) < Math.abs(pct - b)) setA(Math.min(Math.round(pct), b - 1));
        else setB(Math.max(Math.round(pct), a + 1));
    };
    return (
        <div className={`sl-base rsl-wrap ${klass || ""}`} style={style}>
            <div className="track" ref={ref} onMouseDown={onTrackClick} style={{ cursor: "pointer" }}>
                <div className="fill" style={{ left: a + "%", width: b - a + "%" }} />
                <div
                    className="thumb"
                    style={{ left: a + "%", zIndex: dragRef.current === "a" ? 3 : 2, touchAction: "none" }}
                    onMouseDown={onDown("a")}
                    onTouchStart={onDown("a")}
                />
                <div
                    className="thumb thumb2"
                    style={{ left: b + "%", zIndex: dragRef.current === "b" ? 3 : 2, touchAction: "none" }}
                    onMouseDown={onDown("b")}
                    onTouchStart={onDown("b")}
                />
            </div>
        </div>
    );
};
const RSli1 = () => {
    const [a, sA] = useState(20);
    const [b, sB] = useState(70);
    return <RSl a={a} b={b} setA={sA} setB={sB} />;
};
const RSli2 = () => {
    const [a, sA] = useState(25);
    const [b, sB] = useState(75);
    return (
        <div>
            <RSl a={a} b={b} setA={sA} setB={sB} klass="sl-thick" />
            <div className="rsl-labels">
                <span>${a * 10}</span>
                <span>${b * 10}</span>
            </div>
        </div>
    );
};
const RSli3 = () => {
    const [a, sA] = useState(30);
    const [b, sB] = useState(80);
    return <RSl a={a} b={b} setA={sA} setB={sB} klass="sl-bubble" />;
};
const RSli4 = () => {
    const [a, sA] = useState(20);
    const [b, sB] = useState(60);
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, width: 280 }}>
            <div
                style={{
                    padding: "6px 10px",
                    background: "var(--bg-2)",
                    borderRadius: 6,
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 12,
                    minWidth: 34,
                    textAlign: "center",
                }}
            >
                {a}
            </div>
            <RSl a={a} b={b} setA={sA} setB={sB} style={{ flex: 1, width: "auto" }} />
            <div
                style={{
                    padding: "6px 10px",
                    background: "var(--bg-2)",
                    borderRadius: 6,
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 12,
                    minWidth: 34,
                    textAlign: "center",
                }}
            >
                {b}
            </div>
        </div>
    );
};
const RSli5 = () => {
    const [a, sA] = useState(30);
    const [b, sB] = useState(70);
    const data = [2, 4, 3, 6, 9, 12, 14, 10, 7, 4, 3, 2];
    const max = Math.max(...data);
    return (
        <div style={{ width: 240 }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 40, marginBottom: 8 }}>
                {data.map((d, i) => {
                    const p = (i / (data.length - 1)) * 100;
                    const inR = p >= a && p <= b;
                    return (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                height: (d / max) * 100 + "%",
                                background: inR ? "var(--accent)" : "var(--border-2)",
                                borderRadius: "2px 2px 0 0",
                                transition: "background 0.2s",
                            }}
                        />
                    );
                })}
            </div>
            <RSl a={a} b={b} setA={sA} setB={sB} style={{ width: 240 }} />
        </div>
    );
};
const RSli6 = () => {
    const [a, sA] = useState(40);
    const [b, sB] = useState(60);
    return (
        <div style={{ textAlign: "center" }}>
            <div
                style={{
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 12,
                    marginBottom: 8,
                    letterSpacing: "0.1em",
                    color: "var(--fg-2)",
                }}
            >
                [{a}—{b}] · RANGE {b - a}
            </div>
            <RSl a={a} b={b} setA={sA} setB={sB} klass="sl-mono" />
        </div>
    );
};

/* =============== 15. FILE INPUT =============== */
const Fi1 = () => (
    <label className="fi-button">
        <Ic.Upload />
        Upload file
        <input type="file" />
    </label>
);
const Fi2 = () => {
    const [n, s] = useState("No file chosen");
    return (
        <label className="fi-segmented">
            <span className="lbl">Choose file</span>
            <span className="name">{n}</span>
            <input type="file" onChange={(e) => s(e.target.files[0]?.name || "No file")} />
        </label>
    );
};
const Fi3 = () => (
    <label className="fi-preview">
        <Ic.Upload />
        <span>PNG / JPG</span>
        <span>≤ 5 MB</span>
        <input type="file" />
    </label>
);
const Fi4 = () => (
    <label
        style={{
            display: "inline-flex",
            gap: 10,
            alignItems: "center",
            padding: "10px 16px",
            border: "1.5px dashed var(--border)",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 14,
            color: "var(--fg-2)",
        }}
    >
        <span
            style={{
                width: 28,
                height: 28,
                background: "var(--bg-2)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            📎
        </span>
        Attach file
        <input type="file" style={{ display: "none" }} />
    </label>
);
const Fi5 = () => (
    <label
        style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 14px 8px 8px",
            background: "#0a0a08",
            color: "var(--accent)",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "JetBrains Mono,monospace",
            fontSize: 12,
            gap: 10,
            border: "1px solid #2d2c28",
        }}
    >
        <span style={{ background: "var(--accent)", color: "#0a0a08", padding: "3px 8px", borderRadius: 3 }}>
            $ upload
        </span>
        ./file.txt
        <input type="file" style={{ display: "none" }} />
    </label>
);
const Fi6 = () => (
    <label
        style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            background: "var(--accent)",
            color: "white",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 8px 20px -4px color-mix(in oklab, var(--accent) 40%, transparent)",
        }}
    >
        <Ic.Plus />
        <input type="file" style={{ display: "none" }} />
    </label>
);

/* =============== 16. DROPZONE =============== */
const Dz1 = () => {
    const [a, s] = useState(false);
    return (
        <div
            className={`dz ${a ? "active" : ""}`}
            onDragOver={(e) => {
                e.preventDefault();
                s(true);
            }}
            onDragLeave={() => s(false)}
            onDrop={(e) => {
                e.preventDefault();
                s(false);
            }}
        >
            <div className="icn">
                <Ic.Upload />
            </div>
            <div className="t">Drop files here</div>
            <div className="s">or click to browse · max 10 MB</div>
        </div>
    );
};
const Dz2 = () => (
    <div className="dz dz-compact">
        <span
            style={{
                width: 36,
                height: 36,
                background: "color-mix(in oklab, var(--accent) 15%, white)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
            }}
        >
            <Ic.Upload />
        </span>
        <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Add files</div>
            <div style={{ fontSize: 11, color: "var(--fg-3)" }}>Drop or click</div>
        </div>
    </div>
);
const Dz3 = () => (
    <div className="dz-grid">
        <div className="slot full">✓</div>
        <div className="slot full">✓</div>
        <div className="slot">+</div>
        <div className="slot">+</div>
        <div className="slot">+</div>
        <div className="slot">+</div>
    </div>
);
const Dz4 = () => (
    <div
        style={{
            padding: "14px 16px",
            background: "var(--surface)",
            border: "1.5px dashed var(--border)",
            borderRadius: 10,
            minWidth: 260,
        }}
    >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 20 }}>📄</span>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>resume.pdf</div>
                <div style={{ fontSize: 11, color: "var(--fg-3)" }}>2.1 MB</div>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }}>×</button>
        </div>
        <div style={{ height: 4, background: "var(--bg-2)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: "65%", background: "var(--accent)", borderRadius: 2 }} />
        </div>
    </div>
);
const Dz5 = () => (
    <div
        className="dz"
        style={{
            borderRadius: 0,
            background:
                "repeating-linear-gradient(135deg, var(--surface), var(--surface) 8px, var(--bg-2) 8px, var(--bg-2) 16px)",
        }}
    >
        <div
            style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--fg-2)",
            }}
        >
            [ DROP ZONE ]
        </div>
        <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 8, fontFamily: "JetBrains Mono,monospace" }}>
            PDF · DOC · TXT
        </div>
    </div>
);
const Dz6 = () => (
    <div
        style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "2px dashed var(--border)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 8%, white) 0%, transparent 70%)",
            cursor: "pointer",
        }}
    >
        <Ic.Upload />
        <div style={{ fontSize: 12, color: "var(--fg-2)" }}>Drop image</div>
        <div style={{ fontSize: 10, color: "var(--fg-3)", fontFamily: "JetBrains Mono,monospace" }}>1:1 · ≤2MB</div>
    </div>
);

/* =============== 17. DATE PICKER =============== */
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const firstDow = (y, m) => new Date(y, m, 1).getDay();

const InteractiveCal = ({ onPick, theme }) => {
    const [ym, setYm] = useState({ y: 2026, m: 3 });
    const [sel, setSel] = useState(18);
    const dim = daysInMonth(ym.y, ym.m);
    const fdw = firstDow(ym.y, ym.m);
    const prev = () => setYm((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { ...v, m: v.m - 1 }));
    const next = () => setYm((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { ...v, m: v.m + 1 }));
    const todayDate = new Date();
    const isToday = (d) =>
        todayDate.getFullYear() === ym.y && todayDate.getMonth() === ym.m && todayDate.getDate() === d;
    const cells = [];
    for (let i = 0; i < fdw; i++) cells.push({ mute: true, n: daysInMonth(ym.y, ym.m - 1) - fdw + i + 1 });
    for (let d = 1; d <= dim; d++) cells.push({ n: d, d });
    while (cells.length < 42) cells.push({ mute: true, n: cells.length - dim - fdw + 1 });
    return (
        <div className="dp" style={theme}>
            <div className="hd" style={theme ? { color: theme.color } : {}}>
                <button style={theme ? { color: "var(--accent)" } : {}} onClick={prev}>
                    ‹
                </button>
                <span>
                    {MONTHS[ym.m]} {ym.y}
                </span>
                <button style={theme ? { color: "var(--accent)" } : {}} onClick={next}>
                    ›
                </button>
            </div>
            <div className="grid7">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="dow">
                        {d}
                    </div>
                ))}
                {cells.map((c, i) => (
                    <div
                        key={i}
                        className={`day ${c.mute ? "mute" : ""} ${!c.mute && isToday(c.d) ? "today" : ""} ${!c.mute && sel === c.d ? "sel" : ""}`}
                        onClick={() => {
                            if (!c.mute) {
                                setSel(c.d);
                                onPick && onPick({ y: ym.y, m: ym.m, d: c.d });
                            }
                        }}
                    >
                        {c.n}
                    </div>
                ))}
            </div>
        </div>
    );
};
const Dp1 = () => <InteractiveCal />;
const Dp2 = () => <input className="inp-base" type="date" defaultValue="2026-04-18" />;
const Dp3 = () => (
    <div
        style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 10,
        }}
    >
        <Ic.Cal />
        <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 13 }}>2026-04-18</span>
        <span style={{ color: "var(--fg-3)" }}>▾</span>
    </div>
);
const Dp4 = () => (
    <div
        style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "16px",
            width: 240,
        }}
    >
        <div
            style={{ fontFamily: "Fraunces, serif", fontSize: 28, lineHeight: 1, textAlign: "center", fontWeight: 500 }}
        >
            April
        </div>
        <div
            style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
                textAlign: "center",
                color: "var(--fg-3)",
                letterSpacing: "0.2em",
            }}
        >
            2026
        </div>
        <div style={{ height: 1, background: "var(--border)", margin: "12px 0" }} />
        <div
            style={{
                fontSize: 48,
                textAlign: "center",
                fontFamily: "Fraunces, serif",
                fontWeight: 500,
                color: "var(--accent)",
                lineHeight: 1,
            }}
        >
            18
        </div>
        <div
            style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                textAlign: "center",
                color: "var(--fg-3)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: 4,
            }}
        >
            Saturday
        </div>
    </div>
);
const Dp5 = () => (
    <InteractiveCal
        theme={{
            background: "#0a0a08",
            borderColor: "#2d2c28",
            color: "#d4d0c8",
            fontFamily: "JetBrains Mono,monospace",
        }}
    />
);
const Dp6 = () => {
    const [v, s] = useState("Tomorrow");
    return (
        <div style={{ display: "inline-flex", gap: 8 }}>
            {["Today", "Tomorrow", "Next week"].map((t) => (
                <button
                    key={t}
                    onClick={() => s(t)}
                    style={{
                        padding: "10px 14px",
                        borderRadius: 8,
                        border: "1px solid",
                        borderColor: v === t ? "var(--accent)" : "var(--border)",
                        background: v === t ? "var(--accent)" : "var(--surface)",
                        color: v === t ? "white" : "var(--fg)",
                        cursor: "pointer",
                        fontSize: 13,
                    }}
                >
                    {t}
                </button>
            ))}
        </div>
    );
};

/* =============== 18. TIME PICKER =============== */
const Tp1 = () => {
    const [h, sH] = useState(9);
    const [m, sM] = useState(30);
    const [a, sA] = useState("AM");
    const clampH = (v) => Math.max(1, Math.min(12, v || 1));
    const clampM = (v) => Math.max(0, Math.min(59, v || 0));
    return (
        <div className="tp-wrap">
            <input
                value={String(h).padStart(2, "0")}
                onChange={(e) => sH(clampH(+e.target.value.replace(/\D/g, "")))}
            />
            <span className="sep">:</span>
            <input
                value={String(m).padStart(2, "0")}
                onChange={(e) => sM(clampM(+e.target.value.replace(/\D/g, "")))}
            />
            <div className="ampm">
                <span className={a === "AM" ? "on" : ""} onClick={() => sA("AM")}>
                    AM
                </span>
                <span className={a === "PM" ? "on" : ""} onClick={() => sA("PM")}>
                    PM
                </span>
            </div>
        </div>
    );
};
const Tp2 = () => {
    const [h, sH] = useState(14);
    const [m, sM] = useState(30);
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 36,
                letterSpacing: "0.05em",
                fontWeight: 500,
            }}
        >
            <input
                value={String(h).padStart(2, "0")}
                onChange={(e) => sH(Math.max(0, Math.min(23, +e.target.value.replace(/\D/g, "") || 0)))}
                style={{
                    width: 62,
                    border: "none",
                    background: "transparent",
                    font: "inherit",
                    outline: "none",
                    textAlign: "right",
                }}
            />
            <span style={{ color: "var(--accent)" }}>:</span>
            <input
                value={String(m).padStart(2, "0")}
                onChange={(e) => sM(Math.max(0, Math.min(59, +e.target.value.replace(/\D/g, "") || 0)))}
                style={{ width: 62, border: "none", background: "transparent", font: "inherit", outline: "none" }}
            />
            <span style={{ fontSize: 14, color: "var(--fg-2)", marginLeft: 8 }}>UTC</span>
        </div>
    );
};
const Tp3 = () => {
    const [h, sH] = useState("09");
    const [m, sM] = useState("30");
    const [a, sA] = useState("AM");
    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
    const mins = ["00", "15", "30", "45"];
    return (
        <div style={{ display: "flex", gap: 4 }}>
            <select className="sel-native" style={{ maxWidth: 80 }} value={h} onChange={(e) => sH(e.target.value)}>
                {hours.map((x) => (
                    <option key={x}>{x}</option>
                ))}
            </select>
            <select className="sel-native" style={{ maxWidth: 80 }} value={m} onChange={(e) => sM(e.target.value)}>
                {mins.map((x) => (
                    <option key={x}>{x}</option>
                ))}
            </select>
            <div className="rd-segmented">
                <label>
                    <input type="radio" name="tp3" checked={a === "AM"} onChange={() => sA("AM")} />
                    AM
                </label>
                <label>
                    <input type="radio" name="tp3" checked={a === "PM"} onChange={() => sA("PM")} />
                    PM
                </label>
            </div>
        </div>
    );
};
const Tp4 = () => {
    const [t, s] = useState("09:30");
    return (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", maxWidth: 240 }}>
            {["08:00", "09:30", "10:00", "11:30", "14:00", "15:30"].map((ts) => (
                <button
                    key={ts}
                    onClick={() => s(ts)}
                    style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: "1px solid var(--border)",
                        background: t === ts ? "var(--accent)" : "var(--surface)",
                        color: t === ts ? "white" : "var(--fg)",
                        cursor: "pointer",
                        fontSize: 13,
                        fontFamily: "JetBrains Mono,monospace",
                    }}
                >
                    {ts}
                </button>
            ))}
        </div>
    );
};
const Tp5 = () => {
    const [h, sH] = useState(2);
    const [m, sM] = useState(40);
    const hAng = ((h % 12) / 12) * 360 + m / 2 - 90;
    const mAng = (m / 60) * 360 - 90;
    return (
        <div
            style={{
                width: 140,
                height: 140,
                border: "2px solid var(--fg)",
                borderRadius: "50%",
                position: "relative",
                background: "var(--surface)",
            }}
        >
            {[12, 3, 6, 9].map((n, i) => {
                const a = i * 90 - 90;
                const r = 52;
                return (
                    <span
                        key={n}
                        style={{
                            position: "absolute",
                            left: `calc(50% + ${Math.cos((a * Math.PI) / 180) * r}px)`,
                            top: `calc(50% + ${Math.sin((a * Math.PI) / 180) * r}px)`,
                            transform: "translate(-50%,-50%)",
                            fontFamily: "JetBrains Mono,monospace",
                            fontSize: 11,
                            fontWeight: 600,
                        }}
                    >
                        {n}
                    </span>
                );
            })}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 40,
                    height: 2,
                    background: "var(--fg)",
                    transformOrigin: "left",
                    transform: `translateY(-50%) rotate(${hAng}deg)`,
                    transition: "transform 0.3s",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 55,
                    height: 1,
                    background: "var(--accent)",
                    transformOrigin: "left",
                    transform: `translateY(-50%) rotate(${mAng}deg)`,
                    transition: "transform 0.3s",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 6,
                    height: 6,
                    background: "var(--fg)",
                    borderRadius: "50%",
                    transform: "translate(-50%,-50%)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    bottom: -26,
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 4,
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 10,
                }}
            >
                <button
                    onClick={() => sH((h + 1) % 12)}
                    style={{
                        padding: "2px 6px",
                        background: "var(--bg-2)",
                        border: "none",
                        borderRadius: 3,
                        cursor: "pointer",
                    }}
                >
                    H+
                </button>
                <button
                    onClick={() => sM((m + 5) % 60)}
                    style={{
                        padding: "2px 6px",
                        background: "var(--bg-2)",
                        border: "none",
                        borderRadius: 3,
                        cursor: "pointer",
                    }}
                >
                    M+
                </button>
            </div>
        </div>
    );
};
const Tp6 = () => (
    <div
        style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
        }}
    >
        <Ic.Clock />
        <input
            className="inp-base"
            type="time"
            defaultValue="09:30"
            style={{
                border: "none",
                padding: 0,
                fontFamily: "JetBrains Mono,monospace",
                width: 90,
                background: "transparent",
            }}
        />
    </div>
);

/* =============== 19. DATE RANGE =============== */
const Dr1 = () => (
    <div
        style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 10,
        }}
    >
        <Ic.Cal />
        <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 13 }}>Apr 18</span>
        <span style={{ color: "var(--fg-3)" }}>→</span>
        <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 13 }}>Apr 25</span>
    </div>
);
const Dr2 = () => {
    const [range, setRange] = useState({ start: 10, end: 18 });
    const [picking, setPicking] = useState("end");
    const dim = 30;
    const handleClick = (d) => {
        if (picking === "start" || d < range.start) {
            setRange({ start: d, end: d });
            setPicking("end");
        } else {
            setRange((r) => ({ ...r, end: d }));
            setPicking("start");
        }
    };
    return (
        <div className="dp" style={{ width: 260 }}>
            <div className="hd">
                <button>‹</button>April 2026<button>›</button>
            </div>
            <div className="grid7">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="dow">
                        {d}
                    </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                    const d = i - 3;
                    if (d < 1 || d > dim)
                        return (
                            <div key={i} className="day mute">
                                {d < 1 ? 31 + d : d - dim}
                            </div>
                        );
                    const inR = d >= range.start && d <= range.end;
                    const start = d === range.start;
                    const end = d === range.end;
                    return (
                        <div
                            key={i}
                            className="day"
                            onClick={() => handleClick(d)}
                            style={{
                                cursor: "pointer",
                                background: inR
                                    ? start || end
                                        ? "var(--accent)"
                                        : "color-mix(in oklab, var(--accent) 20%, white)"
                                    : "transparent",
                                color: start || end ? "white" : inR ? "var(--accent)" : "var(--fg)",
                                borderRadius:
                                    start && end ? 4 : start ? "4px 0 0 4px" : end ? "0 4px 4px 0" : inR ? 0 : 4,
                            }}
                        >
                            {d}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const Dr3 = () => {
    const [v, s] = useState("7D");
    return (
        <div style={{ display: "inline-flex", gap: 6 }}>
            {["Today", "7D", "30D", "90D", "YTD"].map((t) => (
                <button
                    key={t}
                    onClick={() => s(t)}
                    style={{
                        padding: "8px 12px",
                        border: "1px solid",
                        borderColor: v === t ? "var(--accent)" : "var(--border)",
                        background: v === t ? "var(--accent)" : "var(--surface)",
                        color: v === t ? "white" : "var(--fg)",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: "JetBrains Mono,monospace",
                    }}
                >
                    {t}
                </button>
            ))}
        </div>
    );
};
const Dr4 = () => (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <input className="inp-base" type="date" defaultValue="2026-04-18" style={{ width: 160 }} />
        <span style={{ color: "var(--fg-3)" }}>—</span>
        <input className="inp-base" type="date" defaultValue="2026-04-25" style={{ width: 160 }} />
    </div>
);
const Dr5 = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            border: "1px solid var(--border)",
            borderRadius: 10,
            overflow: "hidden",
            background: "var(--surface)",
            minWidth: 240,
        }}
    >
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
            <div>
                <div
                    style={{
                        fontSize: 11,
                        color: "var(--fg-3)",
                        fontFamily: "JetBrains Mono,monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                    }}
                >
                    From
                </div>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 20 }}>Apr 18</div>
            </div>
        </div>
        <div style={{ height: 1, background: "var(--border)" }} />
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", opacity: 0.3 }} />
            <div>
                <div
                    style={{
                        fontSize: 11,
                        color: "var(--fg-3)",
                        fontFamily: "JetBrains Mono,monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                    }}
                >
                    To
                </div>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 20 }}>Apr 25</div>
            </div>
        </div>
    </div>
);
const Dr6 = () => (
    <div
        style={{
            padding: "14px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            width: 260,
        }}
    >
        <div
            style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--fg-3)",
                marginBottom: 10,
            }}
        >
            Duration: 7 days
        </div>
        <div style={{ height: 20, background: "var(--bg-2)", borderRadius: 4, position: "relative" }}>
            <div
                style={{
                    position: "absolute",
                    left: "30%",
                    width: "25%",
                    height: "100%",
                    background: "var(--accent)",
                    borderRadius: 4,
                }}
            />
        </div>
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
                color: "var(--fg-2)",
            }}
        >
            <span>Apr 18</span>
            <span>Apr 25</span>
        </div>
    </div>
);

/* =============== 20. COLOR PICKER =============== */
const Cp1 = () => {
    const [c, s] = useState("#2b7fff");
    const sw = [
        "#1a1917",
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
        "#ffffff",
        "#6b6862",
        "#fafaf7",
        "#d97757",
    ];
    return (
        <div className="cp-swatches">
            {sw.map((x) => (
                <div key={x} className={`sw ${c === x ? "sel" : ""}`} style={{ "--col": x }} onClick={() => s(x)} />
            ))}
        </div>
    );
};
const Cp2 = () => (
    <div className="cp-hex">
        <span className="chip" />
        <span>#</span>
        <input defaultValue="2B7FFF" />
    </div>
);
const Cp3 = () => <div className="cp-wheel" />;
const Cp4 = () => {
    const [h, sH] = useState(215);
    const [ss, sS] = useState(90);
    const [l, sL] = useState(55);
    return (
        <div
            style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 14,
                width: 220,
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            <div style={{ width: "100%", height: 40, borderRadius: 6, background: `hsl(${h} ${ss}% ${l}%)` }} />
            {[
                {
                    l: "H",
                    v: h,
                    sV: sH,
                    max: 360,
                    c: `linear-gradient(90deg, hsl(0 90% 55%), hsl(60 90% 55%), hsl(120 90% 55%), hsl(180 90% 55%), hsl(240 90% 55%), hsl(300 90% 55%), hsl(360 90% 55%))`,
                },
                {
                    l: "S",
                    v: ss,
                    sV: sS,
                    max: 100,
                    c: `linear-gradient(90deg, hsl(${h} 0% ${l}%), hsl(${h} 100% ${l}%))`,
                },
                {
                    l: "L",
                    v: l,
                    sV: sL,
                    max: 100,
                    c: `linear-gradient(90deg, hsl(${h} ${ss}% 0%), hsl(${h} ${ss}% 50%), hsl(${h} ${ss}% 100%))`,
                },
            ].map((r) => (
                <div key={r.l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, fontFamily: "JetBrains Mono,monospace", width: 10 }}>{r.l}</span>
                    <div style={{ flex: 1, height: 10, borderRadius: 5, background: r.c, position: "relative" }}>
                        <div
                            style={{
                                position: "absolute",
                                left: `${(r.v / r.max) * 100}%`,
                                top: "50%",
                                transform: "translate(-50%,-50%)",
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                border: "2px solid white",
                                boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                            }}
                        />
                    </div>
                    <span
                        style={{ fontSize: 10, fontFamily: "JetBrains Mono,monospace", width: 26, textAlign: "right" }}
                    >
                        {r.v}
                    </span>
                </div>
            ))}
        </div>
    );
};
const Cp5 = () => (
    <div style={{ display: "inline-flex", gap: 2 }}>
        {["#e11d48", "#f97316", "#f59e0b", "#10b981", "#06b6d4", "#2b7fff", "#8b5cf6"].map((c) => (
            <button
                key={c}
                style={{ width: 28, height: 36, background: c, border: "none", cursor: "pointer", borderRadius: 0 }}
            />
        ))}
    </div>
);
const Cp6 = () => (
    <div
        style={{
            background: "var(--surface)",
            padding: 10,
            borderRadius: 8,
            border: "1px solid var(--border)",
            display: "inline-flex",
            flexDirection: "column",
            gap: 6,
            width: 180,
        }}
    >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3 }}>
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w, i) => (
                <div
                    key={w}
                    style={{
                        aspectRatio: 1,
                        background: `color-mix(in oklab, var(--accent) ${w / 10}%, white)`,
                        borderRadius: 3,
                        cursor: "pointer",
                        fontSize: 8,
                        fontFamily: "JetBrains Mono,monospace",
                        color: i > 4 ? "white" : "var(--fg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {w}
                </div>
            ))}
        </div>
        <div
            style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "var(--fg-2)", textAlign: "center" }}
        >
            accent/500
        </div>
    </div>
);

/* =============== 21. RATING =============== */
const Rt1 = () => {
    const [v, s] = useState(4);
    return (
        <div className="rt">
            {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`star ${n <= v ? "on" : ""}`} onClick={() => s(n)}>
                    <Ic.Star />
                </span>
            ))}
        </div>
    );
};
const Rt2 = () => {
    const [v, s] = useState(3.5);
    return (
        <div className="rt rt-big">
            {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`star ${n <= Math.ceil(v) ? "on" : ""}`}>
                    <Ic.Star />
                </span>
            ))}
        </div>
    );
};
const Rt3 = () => {
    const [v, s] = useState(3);
    return (
        <div className="rt rt-heart">
            {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`star ${n <= v ? "on" : ""}`} onClick={() => s(n)}>
                    <Ic.Heart />
                </span>
            ))}
        </div>
    );
};
const Rt4 = () => {
    const [v, s] = useState(7);
    return (
        <div className="rt-numeric">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button key={n} className={n <= v ? "on" : ""} onClick={() => s(n)}>
                    {n}
                </button>
            ))}
        </div>
    );
};
const Rt5 = () => {
    const [v, s] = useState(2);
    const em = ["😡", "😕", "😐", "🙂", "😍"];
    return (
        <div className="rt-emoji">
            {em.map((e, i) => (
                <span key={i} className={i === v ? "on" : ""} onClick={() => s(i)}>
                    {e}
                </span>
            ))}
        </div>
    );
};
const Rt6 = () => {
    const [v, s] = useState(70);
    return (
        <div style={{ width: 200 }}>
            <div
                style={{
                    height: 8,
                    background: "var(--bg-2)",
                    borderRadius: 4,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(90deg, var(--danger), var(--accent), var(--success))",
                        clipPath: `inset(0 ${100 - v}% 0 0)`,
                    }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 11,
                    color: "var(--fg-2)",
                }}
            >
                <span>Poor</span>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>{v}/100</span>
                <span>Excellent</span>
            </div>
        </div>
    );
};

/* =============== 22. OTP =============== */
const useOtp = (len = 6, initial) => {
    const [v, setV] = useState(
        Array(len)
            .fill("")
            .map((_, i) => initial?.[i] || ""),
    );
    const refs = useRef([]);
    const onChange = (i, raw) => {
        const c = raw.replace(/\D/g, "").slice(-1);
        const n = [...v];
        n[i] = c;
        setV(n);
        if (c && i < len - 1) refs.current[i + 1]?.focus();
    };
    const onKey = (i, e) => {
        if (e.key === "Backspace" && !v[i] && i > 0) {
            refs.current[i - 1]?.focus();
        }
        if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
        if (e.key === "ArrowRight" && i < len - 1) refs.current[i + 1]?.focus();
    };
    const onPaste = (e) => {
        const txt = (e.clipboardData?.getData("text") || "").replace(/\D/g, "").slice(0, len);
        if (!txt) return;
        e.preventDefault();
        const n = Array(len).fill("");
        for (let i = 0; i < txt.length; i++) n[i] = txt[i];
        setV(n);
        refs.current[Math.min(txt.length, len - 1)]?.focus();
    };
    const bind = (i) => ({
        ref: (el) => (refs.current[i] = el),
        value: v[i],
        onChange: (e) => onChange(i, e.target.value),
        onKeyDown: (e) => onKey(i, e),
        onPaste,
        maxLength: 1,
    });
    return { v, bind };
};
const Otp1 = () => {
    const { v, bind } = useOtp(6, ["4", "8"]);
    return (
        <div className="otp-wrap">
            {v.map((c, i) => (
                <input key={i} className={c ? "filled" : ""} {...bind(i)} />
            ))}
        </div>
    );
};
const Otp2 = () => {
    const { v, bind } = useOtp(6);
    return (
        <div className="otp-wrap otp-underline">
            {v.map((c, i) => (
                <input key={i} {...bind(i)} />
            ))}
        </div>
    );
};
const Otp3 = () => {
    const { v, bind } = useOtp(6, ["7", "3", "2"]);
    return (
        <div className="otp-wrap otp-big">
            {v.map((c, i) => (
                <input key={i} className={c ? "filled" : ""} {...bind(i)} />
            ))}
        </div>
    );
};
const Otp4 = () => {
    const { v, bind } = useOtp(6, ["1"]);
    return (
        <div className="otp-wrap otp-dash" style={{ alignItems: "center" }}>
            {v.slice(0, 3).map((c, i) => (
                <input key={"a" + i} className={c ? "filled" : ""} {...bind(i)} />
            ))}
            <span className="dash" style={{ color: "var(--fg-3)", fontFamily: "JetBrains Mono,monospace" }}>
                —
            </span>
            {v.slice(3, 6).map((c, i) => (
                <input key={"b" + (i + 3)} className={c ? "filled" : ""} {...bind(i + 3)} />
            ))}
        </div>
    );
};
const Otp5 = () => {
    const { v, bind } = useOtp(6, ["4", "2", "0"]);
    return (
        <div className="otp-wrap">
            {v.map((c, i) => (
                <input
                    key={i}
                    style={{ background: "#0a0a08", borderColor: "#2d2c28", color: "var(--accent)" }}
                    className={c ? "filled" : ""}
                    {...bind(i)}
                />
            ))}
        </div>
    );
};
const Otp6 = () => {
    const { v, bind } = useOtp(6, ["8", "3", "6"]);
    return (
        <div
            style={{
                display: "inline-flex",
                gap: 2,
                alignItems: "center",
                padding: "8px 14px",
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: 10,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 22,
                letterSpacing: "0.3em",
            }}
        >
            {v.map((c, i) => (
                <input
                    key={i}
                    {...bind(i)}
                    style={{
                        width: 22,
                        border: "none",
                        outline: "none",
                        textAlign: "center",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        letterSpacing: "inherit",
                        background: "transparent",
                        color: c ? "var(--fg)" : "var(--fg-3)",
                    }}
                    placeholder="_"
                />
            ))}
        </div>
    );
};

/* =============== 23. INPUT MASK =============== */
const Im1 = () => (
    <div className="im-wrap">
        <input className="inp-base" defaultValue="(415) 555-0132" />
    </div>
);
const Im2 = () => (
    <div className="im-wrap">
        <input className="inp-base" defaultValue="4242 4242 4242 4242" />
    </div>
);
const Im3 = () => (
    <div className="im-wrap">
        <input className="inp-base" defaultValue="04/18/2026" />
    </div>
);
const Im4 = () => (
    <div className="im-wrap">
        <input className="inp-base" defaultValue="94107-1234" placeholder="#####-####" />
    </div>
);
const Im5 = () => (
    <div className="im-wrap">
        <input className="inp-base" defaultValue="123-45-6789" />
    </div>
);
const Im6 = () => (
    <div className="im-wrap">
        <input className="inp-base" defaultValue="+1 (415) 555-0132" />
    </div>
);

/* =============== 24. SEARCH =============== */
const S1 = () => (
    <div className="search-wrap">
        <span className="ic">
            <Ic.Search />
        </span>
        <input className="inp-base" placeholder="Search..." />
    </div>
);
const S2 = () => (
    <div className="search-wrap">
        <span className="ic">
            <Ic.Search />
        </span>
        <input className="inp-base" placeholder="Find anything" />
        <span className="kbd">⌘K</span>
    </div>
);
const S3 = () => (
    <div className="search-wrap search-pill">
        <span className="ic">
            <Ic.Search />
        </span>
        <input className="inp-base" placeholder="Search notes..." />
    </div>
);
const S4 = () => (
    <div className="search-wrap search-floaty">
        <span className="ic">
            <Ic.Search />
        </span>
        <input className="inp-base" placeholder="Elevated search" />
    </div>
);
const S5 = () => (
    <div className="search-wrap search-command">
        <span className="ic">
            <Ic.Search />
        </span>
        <input className="inp-base" placeholder="> grep pattern" />
    </div>
);
const S6 = () => (
    <div
        style={{
            display: "inline-flex",
            border: "1px solid var(--border)",
            borderRadius: 10,
            background: "var(--surface)",
            overflow: "hidden",
        }}
    >
        <select
            className="sel-native"
            style={{ border: "none", borderRadius: 0, background: "var(--bg-2)", fontSize: 12 }}
        >
            <option>All</option>
            <option>Docs</option>
            <option>People</option>
        </select>
        <input className="inp-base" placeholder="Search" style={{ border: "none", borderRadius: 0 }} />
        <button
            style={{
                background: "var(--accent)",
                color: "white",
                border: "none",
                padding: "0 16px",
                cursor: "pointer",
            }}
        >
            <Ic.Search />
        </button>
    </div>
);

/* =============== 25. FORM =============== */
const F1 = () => (
    <form className="form-card">
        <div className="row">
            <label>Email</label>
            <input className="inp-base" defaultValue="you@example.com" />
        </div>
        <div className="row">
            <label>Password</label>
            <input className="inp-base" type="password" defaultValue="••••••" />
        </div>
        <div className="actions">
            <button type="button" className="primary">
                Sign in
            </button>
        </div>
    </form>
);
const F2 = () => (
    <form className="form-stack form-minimal">
        <div className="row">
            <label>Full name</label>
            <input className="inp-base ti-2" />
        </div>
        <div className="row">
            <label>Email</label>
            <input className="inp-base ti-2" />
        </div>
        <button
            style={{
                padding: "10px 16px",
                background: "var(--fg)",
                color: "var(--bg)",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                marginTop: 8,
            }}
        >
            Continue →
        </button>
    </form>
);
const F3 = () => (
    <div style={{ width: 280 }}>
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--fg-2)",
            }}
        >
            <span>Step 2/3</span>
            <span>67%</span>
        </div>
        <div style={{ height: 3, background: "var(--bg-2)", borderRadius: 2, marginBottom: 16 }}>
            <div style={{ width: "67%", height: "100%", background: "var(--accent)", borderRadius: 2 }} />
        </div>
        <input className="inp-base" placeholder="Company name" style={{ width: "100%", marginBottom: 10 }} />
        <input className="inp-base" placeholder="Role" style={{ width: "100%" }} />
    </div>
);
const F4 = () => (
    <div
        style={{
            background: "#0a0a08",
            color: "#d4d0c8",
            padding: 18,
            borderRadius: 8,
            fontFamily: "JetBrains Mono,monospace",
            fontSize: 13,
            width: 260,
            border: "1px solid #2d2c28",
        }}
    >
        <div style={{ color: "var(--accent)", marginBottom: 10 }}>$ sudo login --user</div>
        <input
            className="inp-base ti-5"
            placeholder="username"
            defaultValue="admin"
            style={{ width: "100%", marginBottom: 6 }}
        />
        <input
            className="inp-base ti-5"
            type="password"
            defaultValue="••••••••"
            style={{ width: "100%", marginBottom: 10 }}
        />
        <div style={{ color: "var(--fg-3)", fontSize: 11 }}>Press ENTER to continue...</div>
    </div>
);
const F5 = () => (
    <div className="form-card" style={{ maxWidth: 300, borderColor: "var(--accent)", borderRadius: 4 }}>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 500 }}>Subscribe</div>
        <div style={{ fontSize: 12, color: "var(--fg-2)" }}>Weekly essays. No spam.</div>
        <div style={{ display: "flex", gap: 6 }}>
            <input className="inp-base" placeholder="email@you.com" style={{ flex: 1 }} />
            <button
                className="primary"
                style={{
                    padding: "10px 18px",
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                }}
            >
                →
            </button>
        </div>
    </div>
);
const F6 = () => (
    <div className="form-card" style={{ maxWidth: 280 }}>
        <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        fontSize: 10,
                        color: "var(--fg-2)",
                        fontFamily: "JetBrains Mono,monospace",
                        textTransform: "uppercase",
                        marginBottom: 4,
                        letterSpacing: "0.1em",
                    }}
                >
                    First
                </div>
                <input className="inp-base" defaultValue="Aria" />
            </div>
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        fontSize: 10,
                        color: "var(--fg-2)",
                        fontFamily: "JetBrains Mono,monospace",
                        textTransform: "uppercase",
                        marginBottom: 4,
                        letterSpacing: "0.1em",
                    }}
                >
                    Last
                </div>
                <input className="inp-base" defaultValue="Chen" />
            </div>
        </div>
        <div className="row">
            <label>Phone</label>
            <input className="inp-base" defaultValue="(415) 555-0132" />
        </div>
        <button
            style={{
                padding: "10px",
                background: "var(--accent)",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 500,
            }}
        >
            Save
        </button>
    </div>
);

/* =============== 26. LABEL =============== */
const L1 = () => (
    <div>
        <label className="lbl-1">Email address</label>
        <input className="inp-base" placeholder="you@example.com" />
    </div>
);
const L2 = () => (
    <div>
        <label className="lbl-1 lbl-req">Full name</label>
        <input className="inp-base" />
    </div>
);
const L3 = () => (
    <div>
        <label className="lbl-mono">api_key / secret</label>
        <input className="inp-base ti-5" defaultValue="sk_live_..." />
    </div>
);
const L4 = () => (
    <div>
        <div className="lbl-badge">
            Premium <span className="num">PRO</span>
        </div>
        <input className="inp-base" style={{ marginTop: 8 }} placeholder="Unlock with pro" />
    </div>
);
const L5 = () => (
    <div>
        <div className="lbl-inline">
            <label className="lbl-1" style={{ margin: 0 }}>
                API Token
            </label>
            <span className="tag">Required</span>
            <span
                className="tag"
                style={{ background: "color-mix(in oklab, var(--accent) 20%, white)", color: "var(--accent)" }}
            >
                v2
            </span>
        </div>
        <input className="inp-base" style={{ marginTop: 6 }} />
    </div>
);
const L6 = () => (
    <div>
        <label className="lbl-accent">Special field</label>
        <input className="inp-base" style={{ marginTop: 4, borderColor: "var(--accent)" }} />
    </div>
);

/* =============== 27. HELPER =============== */
const H1 = () => (
    <div>
        <input className="inp-base" defaultValue="my-username" />
        <div className="help-1">This is how others will see you.</div>
    </div>
);
const H2 = () => (
    <div>
        <input className="inp-base" defaultValue="8+ characters" />
        <div className="help-icon">Include a number and symbol</div>
    </div>
);
const H3 = () => (
    <div>
        <input className="inp-base ti-5" defaultValue="users/42" />
        <div className="help-mono">// format: collection/id</div>
    </div>
);
const H4 = () => (
    <div style={{ width: 260 }}>
        <textarea
            className="inp-base"
            defaultValue="Lorem ipsum dolor sit amet consectetur."
            style={{ width: "100%", minHeight: 60, resize: "none" }}
        />
        <div className="help-counter">
            <span>Markdown supported</span>
            <span>42 / 280</span>
        </div>
    </div>
);
const H5 = () => (
    <div style={{ width: 280 }}>
        <input className="inp-base" placeholder="API endpoint" style={{ width: "100%" }} />
        <div className="help-box" style={{ marginTop: 6 }}>
            Your endpoint must be publicly reachable.
        </div>
    </div>
);
const H6 = () => (
    <div>
        <input className="inp-base" placeholder="Subdomain" />
        <div className="help-tip" style={{ marginTop: 4 }}>
            Choose wisely — this can't be changed later.
        </div>
    </div>
);

/* =============== 28. ERROR =============== */
const E1 = () => (
    <div>
        <input className="inp-base" defaultValue="not-an-email" style={{ borderColor: "var(--danger)" }} />
        <div className="err-1">Please enter a valid email</div>
    </div>
);
const E2 = () => (
    <div>
        <input className="inp-base" defaultValue="xyz" style={{ borderColor: "var(--danger)" }} />
        <div className="err-inline">Username already taken</div>
    </div>
);
const E3 = () => (
    <div style={{ width: 260 }}>
        <input
            className="inp-base err-shake"
            defaultValue="incorrect"
            style={{ borderColor: "var(--danger)", width: "100%" }}
        />
        <div className="err-banner" style={{ marginTop: 6 }}>
            Your password is incorrect. Try again.
        </div>
    </div>
);
const E4 = () => (
    <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Username</label>
            <span className="err-badge">Invalid</span>
        </div>
        <input className="inp-base" defaultValue="  " style={{ borderColor: "var(--danger)" }} />
    </div>
);
const E5 = () => (
    <div>
        <input className="inp-base" defaultValue="weak" />
        <div className="err-tick" style={{ marginTop: 8 }}>
            Password too weak — add a number and symbol
        </div>
    </div>
);
const E6 = () => (
    <div>
        <input
            className="inp-base"
            defaultValue="oversized file.zip (22MB)"
            style={{ borderColor: "var(--danger)", background: "color-mix(in oklab, var(--danger) 5%, white)" }}
        />
        <div
            style={{
                display: "flex",
                gap: 6,
                marginTop: 6,
                fontSize: 11,
                fontFamily: "JetBrains Mono,monospace",
                color: "var(--danger)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
            }}
        >
            <span>ERR_413</span>
            <span>·</span>
            <span>File exceeds 10MB</span>
        </div>
    </div>
);

/* =============== 29. FIELDSET =============== */
const Fs1 = () => (
    <fieldset className="fs-wrap">
        <legend>Shipping address</legend>
        <div className="body">
            <input className="inp-base" placeholder="Street" />
            <input className="inp-base" placeholder="City" />
        </div>
    </fieldset>
);
const Fs2 = () => (
    <div className="fs-card">
        <div className="title">Notifications</div>
        <div className="sub">Choose what you want to hear about.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="cb">
                <input type="checkbox" defaultChecked />
                <span className="box">
                    <Ic.Check />
                </span>
                Email
            </label>
            <label className="cb">
                <input type="checkbox" />
                <span className="box">
                    <Ic.Check />
                </span>
                Push
            </label>
        </div>
    </div>
);
const Fs3 = () => (
    <fieldset className="fs-line">
        <legend>Personal details</legend>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input className="inp-base" placeholder="Name" />
            <input className="inp-base" placeholder="Email" />
        </div>
    </fieldset>
);
const Fs4 = () => (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, background: "var(--surface)", maxWidth: 280 }}>
        <div
            style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-2)",
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--fg-2)",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <span>Billing</span>
            <span>§2</span>
        </div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            <input className="inp-base" placeholder="Card number" />
            <input className="inp-base" placeholder="Expiry" />
        </div>
    </div>
);
const Fs5 = () => (
    <div
        style={{
            background: "var(--surface)",
            borderRadius: 12,
            padding: 16,
            maxWidth: 280,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid var(--border)",
        }}
    >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "color-mix(in oklab, var(--accent) 15%, white)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                }}
            >
                1
            </span>
            <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Account</div>
                <div style={{ fontSize: 11, color: "var(--fg-2)" }}>Required</div>
            </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input className="inp-base" placeholder="Email" />
        </div>
    </div>
);
const Fs6 = () => (
    <div style={{ maxWidth: 280 }}>
        <div
            style={{
                fontFamily: "Fraunces, serif",
                fontSize: 22,
                fontStyle: "italic",
                color: "var(--accent)",
                marginBottom: 4,
            }}
        >
            Address.
        </div>
        <div
            style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                color: "var(--fg-3)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 12,
            }}
        >
            Where to send it
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input className="inp-base ti-2" placeholder="Street" />
            <input className="inp-base ti-2" placeholder="City, ZIP" />
        </div>
    </div>
);

/* =============== REGISTRY =============== */
window.CATEGORIES = [
    {
        n: "Text Input",
        k: "ti",
        notes: [
            "Classic bordered",
            "Underline minimal",
            "Filled soft",
            "Floating label",
            "Terminal mono",
            "Rounded search-style",
        ],
        v: [TextInput1, TextInput2, TextInput3, TextInput4, TextInput5, TextInput6],
    },
    {
        n: "Password Input",
        k: "pw",
        notes: [
            "Toggle reveal",
            "Strength meter",
            "Underline reveal",
            "Segmented digits",
            "Terminal style",
            "Live criteria",
        ],
        v: [Pw1, Pw2, Pw3, Pw4, Pw5, Pw6],
    },
    {
        n: "Number Input",
        k: "num",
        notes: ["±  steppers", "Vertical chevrons", "Slider + tag", "Currency", "1-9 picker", "Terminal increment"],
        v: [Num1, Num2, Num3, Num4, Num5, Num6],
    },
    {
        n: "Textarea",
        k: "ta",
        notes: ["Classic", "Auto-expanding", "With counter", "Rich toolbar", "Markdown mono", "Ghost underline"],
        v: [Ta1, Ta2, Ta3, Ta4, Ta5, Ta6],
    },
    {
        n: "Checkbox",
        k: "cb",
        notes: ["Classic square", "Round", "Switch-styled", "Card", "X-mark negative", "ASCII"],
        v: [Cb1, Cb2, Cb3, Cb4, Cb5, Cb6],
    },
    {
        n: "Checkbox Group",
        k: "cbg",
        notes: ["Stacked list", "Card grid", "Pill buttons", 'With "Select all"', "Day-of-week", "Priced rows"],
        v: [CbG1, CbG2, CbG3, CbG4, CbG5, CbG6],
    },
    {
        n: "Radio",
        k: "rd",
        notes: ["Classic dot", "Square", "Bullseye", "Card", "Segmented", "Size pills"],
        v: [Rd1, Rd2, Rd3, Rd4, Rd5, Rd6],
    },
    {
        n: "Radio Group",
        k: "rdg",
        notes: ["Vertical", "Plan cards", "Segmented", "Icon grid", "Number scale", "List w/ right dots"],
        v: [RdG1, RdG2, RdG3, RdG4, RdG5, RdG6],
    },
    {
        n: "Select / Dropdown",
        k: "sel",
        notes: ["Native", "Custom", "With avatars", "Flat underline", "Terminal", "With flags"],
        v: [Sel1, Sel2, Sel3, Sel4, Sel5, Sel6],
    },
    {
        n: "Multi-Select",
        k: "ms",
        notes: ["Tag pills", "Chip dark", "Checklist", "Filter chips", "Segmented bar", "Dropdown w/ checks"],
        v: [Ms1, Ms2, Ms3, Ms4, Ms5, Ms6],
    },
    {
        n: "Autocomplete",
        k: "ac",
        notes: ["Basic", "With hints", "With recents", "@ mentions", "Slash commands", "Inline ghost hint"],
        v: [Ac1, Ac2, Ac3, Ac4, Ac5, Ac6],
    },
    {
        n: "Switch",
        k: "sw",
        notes: ["Classic", "Square", "With label", "iOS-style", "Text bi-state", "Industrial"],
        v: [Sw1, Sw2, Sw3, Sw4, Sw5, Sw6],
    },
    {
        n: "Slider",
        k: "sli",
        notes: ["Classic", "Thick", "Floating value", "Stepped with ticks", "Gradient fill", "Mono scientific"],
        v: [Sli1, Sli2, Sli3, Sli4, Sli5, Sli6],
    },
    {
        n: "Range Slider",
        k: "rsli",
        notes: [
            "Classic range",
            "Thick w/ labels",
            "Floating bubbles",
            "With numeric fields",
            "Price histogram",
            "Mono readout",
        ],
        v: [RSli1, RSli2, RSli3, RSli4, RSli5, RSli6],
    },
    {
        n: "File Input",
        k: "fi",
        notes: ["Classic upload", "Segmented filename", "Image preview tile", "Dashed attach", "Terminal", "FAB +"],
        v: [Fi1, Fi2, Fi3, Fi4, Fi5, Fi6],
    },
    {
        n: "Dropzone",
        k: "dz",
        notes: ["Classic big", "Compact row", "Grid slots", "With progress", "Hatched pattern", "Circular image"],
        v: [Dz1, Dz2, Dz3, Dz4, Dz5, Dz6],
    },
    {
        n: "Date Picker",
        k: "dp",
        notes: ["Calendar grid", "Native", "Inline pill", "Big single date", "Terminal", "Quick presets"],
        v: [Dp1, Dp2, Dp3, Dp4, Dp5, Dp6],
    },
    {
        n: "Time Picker",
        k: "tp",
        notes: ["HH:MM + AMPM", "Big readout", "Split selects", "Time slots", "Analog clock", "Native"],
        v: [Tp1, Tp2, Tp3, Tp4, Tp5, Tp6],
    },
    {
        n: "Date Range",
        k: "dr",
        notes: ["Pill span", "Calendar range", "Quick presets", "Twin native", "Stacked cards", "Duration bar"],
        v: [Dr1, Dr2, Dr3, Dr4, Dr5, Dr6],
    },
    {
        n: "Color Picker",
        k: "cp",
        notes: ["Swatch grid", "Hex input", "Wheel", "HSL sliders", "Strip", "Shade scale"],
        v: [Cp1, Cp2, Cp3, Cp4, Cp5, Cp6],
    },
    {
        n: "Rating",
        k: "rt",
        notes: ["Stars", "Big stars", "Hearts", "Numeric 0-10", "Emoji", "Gradient scale"],
        v: [Rt1, Rt2, Rt3, Rt4, Rt5, Rt6],
    },
    {
        n: "OTP / Pin",
        k: "otp",
        notes: ["Classic 6-boxes", "Underlined", "Big XL", "Dashed 3-3", "Terminal", "Read-only display"],
        v: [Otp1, Otp2, Otp3, Otp4, Otp5, Otp6],
    },
    {
        n: "Input Mask",
        k: "im",
        notes: ["Phone", "Credit card", "Date", "ZIP", "SSN", "Intl phone"],
        v: [Im1, Im2, Im3, Im4, Im5, Im6],
    },
    {
        n: "Search",
        k: "sr",
        notes: ["Classic", "With ⌘K hint", "Pill soft", "Elevated floaty", "Terminal grep", "Scoped w/ filter"],
        v: [S1, S2, S3, S4, S5, S6],
    },
    {
        n: "Form",
        k: "f",
        notes: [
            "Login card",
            "Minimal stack",
            "Stepped progress",
            "Terminal login",
            "Subscribe CTA",
            "Compact profile",
        ],
        v: [F1, F2, F3, F4, F5, F6],
    },
    {
        n: "Form Label",
        k: "lb",
        notes: ["Classic", "Required *", "Mono technical", "Badge pro", "Inline tags", "Accent lead"],
        v: [L1, L2, L3, L4, L5, L6],
    },
    {
        n: "Helper Text",
        k: "hl",
        notes: ["Subtle hint", "With (i) icon", "Mono comment", "Live counter", "Info box", "Tip lightbulb"],
        v: [H1, H2, H3, H4, H5, H6],
    },
    {
        n: "Error Message",
        k: "er",
        notes: ["Icon inline", "✕ inline", "Shake + banner", "Invalid badge", "Ticked detail", "Error code"],
        v: [E1, E2, E3, E4, E5, E6],
    },
    {
        n: "Fieldset",
        k: "fs",
        notes: [
            "Classic legend",
            "Card w/ accent bar",
            "Horizontal rule",
            "Section header",
            "Numbered step",
            "Editorial",
        ],
        v: [Fs1, Fs2, Fs3, Fs4, Fs5, Fs6],
    },
];
