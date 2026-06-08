/* ============================================================
   LAYOUT & FOUNDATION GALLERY — VARIANTS
   14 categories × 6 variants = 84 components
   ============================================================ */

const { useState, useEffect } = React;

/* =============== 01. BOX =============== */
const Box1 = () => (
    <div className="box-1">
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Card Box</div>
        <div style={{ fontSize: 11, color: "var(--fg-2)" }}>A neutral bordered container.</div>
    </div>
);
const Box2 = () => (
    <div className="box-2">
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Inverted</div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>High-contrast surface.</div>
    </div>
);
const Box3 = () => (
    <div className="box-3">
        <div style={{ fontWeight: 600, fontSize: 13 }}>Accent rail</div>
        <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>Highlighted callout.</div>
    </div>
);
const Box4 = () => (
    <div className="box-4">
        <div style={{ fontWeight: 600, fontSize: 13 }}>Elevated</div>
        <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>Shadow + card.</div>
    </div>
);
const Box5 = () => (
    <div className="box-5">
        <div style={{ color: "var(--accent)" }}>$ ls boxes/</div>
        <div>drwxr-xr-x terminal</div>
        <div>-rw-r--r-- 1.2k</div>
    </div>
);
const Box6 = () => (
    <div className="box-6">
        <div style={{ fontWeight: 700, fontSize: 13 }}>Brutalist</div>
        <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>Hard-edged shadow.</div>
    </div>
);

/* =============== 02. CONTAINER =============== */
const Container1 = () => (
    <div className="container-demo" style={{ width: "100%" }}>
        <div style={{ position: "relative", padding: "0 20px" }}>
            <div className="guide-l" style={{ left: 0 }} />
            <div className="guide-r" style={{ right: 0 }} />
            <div className="content">max-w-sm · 640px</div>
        </div>
        <div className="lbl">SMALL · 640</div>
    </div>
);
const Container2 = () => (
    <div className="container-demo">
        <div style={{ position: "relative", padding: "0 10px" }}>
            <div className="guide-l" style={{ left: 0 }} />
            <div className="guide-r" style={{ right: 0 }} />
            <div className="content">max-w-md · 768px</div>
        </div>
        <div className="lbl">MEDIUM · 768</div>
    </div>
);
const Container3 = () => (
    <div className="container-demo">
        <div className="content">full-bleed · 100%</div>
        <div className="lbl">FLUID · NO MAX</div>
    </div>
);
const Container4 = () => (
    <div className="container-demo">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div className="content" style={{ maxWidth: "40%", margin: "0 auto" }}>
                sm
            </div>
            <div className="content" style={{ maxWidth: "60%", margin: "0 auto" }}>
                md
            </div>
            <div className="content" style={{ maxWidth: "80%", margin: "0 auto" }}>
                lg
            </div>
            <div className="content">xl</div>
        </div>
        <div className="lbl">RESPONSIVE STEPS</div>
    </div>
);
const Container5 = () => (
    <div className="container-demo">
        <div style={{ position: "relative", padding: "0 4px" }}>
            <div
                style={{
                    background: "#0a0a08",
                    color: "var(--accent)",
                    padding: 8,
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 10,
                    textAlign: "center",
                    borderRadius: 2,
                }}
            >
                &lt;container maxW="prose"&gt;
            </div>
        </div>
        <div className="lbl">PROSE · 65CH</div>
    </div>
);
const Container6 = () => (
    <div className="container-demo">
        <div style={{ position: "relative" }}>
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: -4,
                    fontSize: 9,
                    fontFamily: "JetBrains Mono,monospace",
                    color: "var(--fg-3)",
                }}
            >
                0
            </div>
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: -4,
                    fontSize: 9,
                    fontFamily: "JetBrains Mono,monospace",
                    color: "var(--fg-3)",
                }}
            >
                1200
            </div>
            <div className="content" style={{ marginTop: 10 }}>
                centered · w/ rulers
            </div>
        </div>
        <div className="lbl">RULED CONTAINER</div>
    </div>
);

/* =============== 03. GRID =============== */
const Grid1 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="c">
                {i + 1}
            </div>
        ))}
    </div>
);
const Grid2 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="c">
                {String(i + 1).padStart(2, "0")}
            </div>
        ))}
    </div>
);
const Grid3 = () => (
    <div className="gd" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
        {["A", "B", "C", "A", "B", "C"].map((l, i) => (
            <div key={i} className="c">
                {l}
            </div>
        ))}
    </div>
);
const Grid4 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))" }}>
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="c">
                auto
            </div>
        ))}
    </div>
);
const Grid5 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: 2 }}>
        {Array.from({ length: 12 }).map((_, i) => (
            <div
                key={i}
                className="c"
                style={{ fontSize: 9, minHeight: 22, background: "var(--fg)", color: "var(--bg)" }}
            >
                {i + 1}
            </div>
        ))}
    </div>
);
const Grid6 = () => (
    <div
        className="gd"
        style={{ gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "repeat(3,1fr)", gap: 4, aspectRatio: "3/2" }}
    >
        {Array.from({ length: 9 }).map((_, i) => (
            <div
                key={i}
                className="c"
                style={{ background: `color-mix(in oklab, var(--accent) ${8 + (i % 3) * 6}%, white)` }}
            />
        ))}
    </div>
);

/* =============== 04. GRID ITEM =============== */
const GridItem1 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "28px" }}>
        <div className="c" style={{ gridColumn: "span 2" }}>
            span 2
        </div>
        <div className="c">1</div>
        <div className="c">1</div>
        <div className="c" style={{ gridColumn: "span 4" }}>
            span 4
        </div>
    </div>
);
const GridItem2 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "repeat(3, 28px)" }}>
        <div className="c" style={{ gridRow: "span 2" }}>
            tall
        </div>
        <div className="c">a</div>
        <div className="c">b</div>
        <div className="c">c</div>
        <div className="c" style={{ gridColumn: "span 2" }}>
            wide
        </div>
    </div>
);
const GridItem3 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "repeat(3,28px)" }}>
        <div className="c" style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
            hero
        </div>
        <div className="c">a</div>
        <div className="c">b</div>
        <div className="c">c</div>
        <div className="c">d</div>
        <div className="c" style={{ gridColumn: "span 2" }}>
            foot
        </div>
    </div>
);
const GridItem4 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(6,1fr)", gridAutoRows: "24px" }}>
        <div className="c" style={{ gridColumn: "1/3", background: "var(--fg)", color: "var(--bg)" }}>
            1-3
        </div>
        <div className="c" style={{ gridColumn: "3/5" }}>
            3-5
        </div>
        <div className="c" style={{ gridColumn: "5/7" }}>
            5-7
        </div>
        <div className="c" style={{ gridColumn: "2/6", background: "var(--fg)", color: "var(--bg)" }}>
            2-6
        </div>
    </div>
);
const GridItem5 = () => (
    <div
        className="gd"
        style={{
            gridTemplateColumns: "repeat(4,1fr)",
            gridTemplateRows: "repeat(3,30px)",
            gridTemplateAreas: `"h h h h" "s m m a" "s f f a"`,
        }}
    >
        <div className="c" style={{ gridArea: "h", background: "var(--fg)", color: "var(--bg)" }}>
            header
        </div>
        <div className="c" style={{ gridArea: "s" }}>
            side
        </div>
        <div className="c" style={{ gridArea: "m" }}>
            main
        </div>
        <div className="c" style={{ gridArea: "a" }}>
            aside
        </div>
        <div className="c" style={{ gridArea: "f", background: "var(--fg)", color: "var(--bg)" }}>
            footer
        </div>
    </div>
);
const GridItem6 = () => (
    <div className="gd" style={{ gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "26px" }}>
        <div className="c" style={{ background: "var(--accent)", color: "white" }}>
            ★
        </div>
        <div className="c">b</div>
        <div className="c">c</div>
        <div className="c">d</div>
        <div className="c">e</div>
        <div className="c">f</div>
        <div className="c">g</div>
        <div className="c" style={{ gridColumn: "span 2", background: "var(--accent)", color: "white" }}>
            featured
        </div>
        <div className="c">h</div>
        <div className="c">i</div>
    </div>
);

/* =============== 05. FLEX =============== */
const Flex1 = () => (
    <div className="fd">
        <div className="c">1</div>
        <div className="c">2</div>
        <div className="c">3</div>
    </div>
);
const Flex2 = () => (
    <div className="fd" style={{ justifyContent: "space-between" }}>
        <div className="c">Logo</div>
        <div className="c">Menu</div>
    </div>
);
const Flex3 = () => (
    <div className="fd" style={{ flexDirection: "column", minHeight: 100 }}>
        <div className="c">head</div>
        <div className="c">body</div>
        <div className="c">foot</div>
    </div>
);
const Flex4 = () => (
    <div className="fd" style={{ flexWrap: "wrap", gap: 4 }}>
        {["React", "Vue", "Svelte", "Solid", "Qwik", "Astro", "Next", "Remix"].map((t) => (
            <div key={t} className="c">
                {t}
            </div>
        ))}
    </div>
);
const Flex5 = () => (
    <div className="fd" style={{ justifyContent: "center", alignItems: "center", minHeight: 90 }}>
        <div className="c" style={{ background: "var(--accent)", color: "white" }}>
            centered
        </div>
    </div>
);
const Flex6 = () => (
    <div className="fd" style={{ alignItems: "flex-end", minHeight: 90, gap: 4 }}>
        <div className="c" style={{ height: 24 }}>
            a
        </div>
        <div className="c" style={{ height: 42 }}>
            b
        </div>
        <div className="c" style={{ height: 60 }}>
            c
        </div>
        <div className="c" style={{ height: 30 }}>
            d
        </div>
        <div className="c" style={{ height: 48 }}>
            e
        </div>
    </div>
);

/* =============== 06. STACK =============== */
const Stack1 = () => (
    <div className="sd" style={{ gap: 4 }}>
        {["Title", "Subtitle", "Body text"].map((t, i) => (
            <div key={i} className="c">
                {t}
            </div>
        ))}
    </div>
);
const Stack2 = () => (
    <div className="sd" style={{ gap: 10 }}>
        {["Section A", "Section B", "Section C"].map((t, i) => (
            <div key={i} className="c">
                {t}
            </div>
        ))}
    </div>
);
const Stack3 = () => (
    <div style={{ display: "flex", flexDirection: "row", gap: 6 }}>
        {["One", "Two", "Three"].map((t, i) => (
            <div
                key={i}
                className="c"
                style={{
                    background: "color-mix(in oklab, var(--accent) 12%, white)",
                    borderRadius: 4,
                    padding: "8px 12px",
                    fontSize: 11,
                    fontFamily: "JetBrains Mono,monospace",
                    color: "color-mix(in oklab, var(--accent) 70%, black)",
                }}
            >
                {t}
            </div>
        ))}
    </div>
);
const Stack4 = () => (
    <div className="sd" style={{ gap: 0 }}>
        {["list", "of", "items", "divided"].map((t, i) => (
            <div
                key={i}
                className="c"
                style={{
                    background: "var(--surface)",
                    borderRadius: 0,
                    borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                    padding: "8px 10px",
                    color: "var(--fg)",
                }}
            >
                {t}
            </div>
        ))}
    </div>
);
const Stack5 = () => (
    <div className="sd" style={{ gap: 6 }}>
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="c" style={{ marginLeft: i * 8, opacity: 1 - i * 0.12 }}>
                step {i}
            </div>
        ))}
    </div>
);
const Stack6 = () => (
    <div className="sd" style={{ gap: 4 }}>
        <div className="c">Item</div>
        <div style={{ height: 1, background: "var(--border)" }} />
        <div className="c">Item</div>
        <div style={{ height: 1, background: "var(--border)" }} />
        <div className="c">Item</div>
    </div>
);

/* =============== 07. CENTER =============== */
const Center1 = () => (
    <div className="center-demo" style={{ width: 180 }}>
        <div className="obj">Centered</div>
    </div>
);
const Center2 = () => (
    <div className="center-demo" style={{ width: 180 }}>
        <div className="crosshair-h" />
        <div className="crosshair-v" />
        <div className="obj">◎</div>
    </div>
);
const Center3 = () => (
    <div className="center-demo" style={{ width: 180, flexDirection: "column", gap: 6 }}>
        <div className="obj">A</div>
        <div className="obj" style={{ background: "var(--fg)" }}>
            B
        </div>
    </div>
);
const Center4 = () => (
    <div className="center-demo" style={{ width: 180, display: "grid", placeItems: "center" }}>
        <div className="obj" style={{ background: "var(--fg)" }}>
            grid
        </div>
    </div>
);
const Center5 = () => (
    <div className="center-demo" style={{ width: 180, minHeight: 130, position: "relative" }}>
        <div
            className="obj"
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
            absolute
        </div>
    </div>
);
const Center6 = () => (
    <div className="center-demo" style={{ width: 180, minHeight: 130 }}>
        <div style={{ margin: "auto" }}>
            <div
                className="obj"
                style={{ background: "var(--bg)", color: "var(--fg)", border: "1px solid var(--border)" }}
            >
                margin:auto
            </div>
        </div>
    </div>
);

/* =============== 08. DIVIDER =============== */
const Div1 = () => (
    <div style={{ width: 180 }}>
        <div className="div-label">above</div>
        <div style={{ height: 1, background: "var(--border)" }} />
        <div className="div-label">below</div>
    </div>
);
const Div2 = () => (
    <div style={{ width: 180 }}>
        <div className="div-label">above</div>
        <div style={{ height: 1, background: "var(--fg)" }} />
        <div className="div-label">below</div>
    </div>
);
const Div3 = () => (
    <div style={{ width: 180 }}>
        <div className="div-label">above</div>
        <div
            style={{
                height: 1,
                background:
                    "repeating-linear-gradient(to right, var(--fg-2), var(--fg-2) 3px, transparent 3px, transparent 6px)",
            }}
        />
        <div className="div-label">below</div>
    </div>
);
const Div4 = () => (
    <div style={{ width: 180, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span
            style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                color: "var(--fg-2)",
                letterSpacing: "0.14em",
            }}
        >
            OR
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
);
const Div5 = () => (
    <div
        style={{
            width: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            color: "var(--accent)",
        }}
    >
        <span>◆</span>
        <span>◇</span>
        <span>◆</span>
    </div>
);
const Div6 = () => (
    <div style={{ display: "flex", alignItems: "stretch", gap: 10, height: 60 }}>
        <span style={{ fontSize: 12 }}>left</span>
        <div style={{ width: 1, background: "var(--border)" }} />
        <span style={{ fontSize: 12 }}>mid</span>
        <div style={{ width: 1, background: "var(--border)" }} />
        <span style={{ fontSize: 12 }}>right</span>
    </div>
);

/* =============== 09. SPACER =============== */
const Sp1 = () => (
    <div className="sp-demo">
        <div className="c">start</div>
        <div className="sp">spacer</div>
        <div className="c">end</div>
    </div>
);
const Sp2 = () => (
    <div className="sp-demo">
        <div className="c">A</div>
        <div className="c">B</div>
        <div className="sp">push →</div>
        <div className="c">C</div>
    </div>
);
const Sp3 = () => (
    <div className="sp-demo" style={{ flexDirection: "column", minHeight: 120 }}>
        <div className="c">top</div>
        <div className="sp" style={{ width: "100%", flex: 1 }}>
            vertical
        </div>
        <div className="c">bottom</div>
    </div>
);
const Sp4 = () => (
    <div style={{ width: 180, display: "flex", flexDirection: "column", gap: 4 }}>
        <div
            className="c"
            style={{
                padding: "6px 10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
            }}
        >
            sp: 4
        </div>
        <div style={{ height: 4, background: "color-mix(in oklab, var(--accent) 15%, white)" }} />
        <div
            className="c"
            style={{
                padding: "6px 10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
            }}
        >
            sp: 16
        </div>
        <div style={{ height: 16, background: "color-mix(in oklab, var(--accent) 25%, white)" }} />
        <div
            className="c"
            style={{
                padding: "6px 10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
            }}
        >
            sp: 32
        </div>
    </div>
);
const Sp5 = () => (
    <div className="sp-demo">
        <div className="c">logo</div>
        <div className="sp">&lt;Spacer /&gt;</div>
        <div className="c">sign-in</div>
    </div>
);
const Sp6 = () => (
    <div className="sp-demo" style={{ justifyContent: "space-between" }}>
        <div className="c">←</div>
        <div className="c">•</div>
        <div className="c">→</div>
    </div>
);

/* =============== 10. ASPECT RATIO =============== */
const Ar1 = () => (
    <div className="ar-wrap" style={{ "--ratio": "56.25%" }}>
        <div className="inner">
            16:9<span className="badge">VIDEO</span>
        </div>
    </div>
);
const Ar2 = () => (
    <div className="ar-wrap" style={{ "--ratio": "100%" }}>
        <div className="inner">
            1:1<span className="badge">SQUARE</span>
        </div>
    </div>
);
const Ar3 = () => (
    <div className="ar-wrap" style={{ "--ratio": "133%" }}>
        <div className="inner">
            3:4<span className="badge">PORTRAIT</span>
        </div>
    </div>
);
const Ar4 = () => (
    <div className="ar-wrap" style={{ "--ratio": "42.85%" }}>
        <div className="inner">
            21:9<span className="badge">CINEMATIC</span>
        </div>
    </div>
);
const Ar5 = () => (
    <div className="ar-wrap" style={{ "--ratio": "66.67%" }}>
        <div className="inner">
            3:2<span className="badge">PHOTO</span>
        </div>
    </div>
);
const Ar6 = () => (
    <div className="ar-wrap" style={{ "--ratio": "125%" }}>
        <div className="inner">
            4:5<span className="badge">SOCIAL</span>
        </div>
    </div>
);

/* =============== 11. TYPOGRAPHY =============== */
const Typo1 = () => (
    <div className="typo-demo">
        <span style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em" }}>
            Display
        </span>
        <span style={{ fontSize: 14 }}>Body default</span>
        <span style={{ fontSize: 11, color: "var(--fg-2)" }}>Caption</span>
    </div>
);
const Typo2 = () => (
    <div className="typo-demo">
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: "0.05em" }}>
            const x = 42;
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--fg-2)" }}>// comment</span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--accent)" }}>
            return true;
        </span>
    </div>
);
const Typo3 = () => (
    <div className="typo-demo">
        <span style={{ fontSize: 14, fontWeight: 400 }}>Regular 400</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Medium 500</span>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Semi 600</span>
        <span style={{ fontSize: 14, fontWeight: 700 }}>Bold 700</span>
        <span style={{ fontSize: 14, fontWeight: 800 }}>Black 800</span>
    </div>
);
const Typo4 = () => (
    <div className="typo-demo">
        <span
            style={{
                fontSize: 14,
                color: "var(--accent)",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: 3,
            }}
        >
            Link primary
        </span>
        <span style={{ fontSize: 14, fontStyle: "italic", color: "var(--fg-2)" }}>Italic muted</span>
        <span style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Overline
        </span>
    </div>
);
const Typo5 = () => (
    <div className="typo-demo">
        <span style={{ fontFamily: "Fraunces, serif", fontSize: 18, fontStyle: "italic" }}>“Editorial.”</span>
        <span style={{ fontSize: 12, color: "var(--fg-2)" }}>—&nbsp;A quiet remark.</span>
    </div>
);
const Typo6 = () => (
    <div className="typo-demo">
        <span
            style={{
                fontSize: 11,
                fontFamily: "JetBrains Mono,monospace",
                color: "var(--fg-3)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
            }}
        >
            Label / Eyebrow
        </span>
        <span style={{ fontSize: 18, fontWeight: 600 }}>Primary statement</span>
        <span style={{ fontSize: 12, color: "var(--fg-2)" }}>Supporting description.</span>
    </div>
);

/* =============== 12. HEADING =============== */
const Head = (lvl) => () => (
    <div className="h-demo">
        <span
            style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 9,
                color: "var(--fg-3)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
            }}
        >
            &lt;h{lvl}&gt;
        </span>
        {React.createElement(
            `h${lvl}`,
            { style: { marginTop: 4 } },
            lvl === 1
                ? "Display"
                : lvl === 2
                  ? "Section title"
                  : lvl === 3
                    ? "Subsection"
                    : lvl === 4
                      ? "Small heading"
                      : lvl === 5
                        ? "Minor title"
                        : "Overline · H6",
        )}
    </div>
);
const H1 = Head(1),
    H2 = Head(2),
    H3 = Head(3),
    H4 = Head(4),
    H5 = Head(5),
    H6 = Head(6);

/* =============== 13. PARAGRAPH =============== */
const P1 = () => (
    <div className="p-demo" style={{ maxWidth: 220 }}>
        <p>Default body paragraph. Comfortable reading measure with standard leading and neutral tone.</p>
    </div>
);
const P2 = () => (
    <div className="p-demo" style={{ maxWidth: 220 }}>
        <p style={{ fontSize: 15, lineHeight: 1.65, fontFamily: "Fraunces, serif" }}>
            Editorial prose in a warmer serif. Takes its time and lets the sentence breathe.
        </p>
    </div>
);
const P3 = () => (
    <div className="p-demo" style={{ maxWidth: 220 }}>
        <p style={{ fontSize: 12, color: "var(--fg-2)", lineHeight: 1.5 }}>
            Secondary caption style. Used for helper text, timestamps, and meta descriptions.
        </p>
    </div>
);
const P4 = () => (
    <div className="p-demo" style={{ maxWidth: 220 }}>
        <p>
            <span
                style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: 28,
                    float: "left",
                    marginRight: 6,
                    lineHeight: 0.9,
                    color: "var(--accent)",
                }}
            >
                A
            </span>{" "}
            drop-cap opens the paragraph with a deliberate editorial flourish, setting a tone.
        </p>
    </div>
);
const P5 = () => (
    <div className="p-demo" style={{ maxWidth: 220 }}>
        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, lineHeight: 1.65, color: "var(--fg-2)" }}>
            // docs.paragraph()
            <br />
            Returns a slab of text
            <br />
            rendered in monotype.
        </p>
    </div>
);
const P6 = () => (
    <div className="p-demo" style={{ maxWidth: 220 }}>
        <p
            style={{
                borderLeft: "3px solid var(--accent)",
                paddingLeft: 12,
                fontStyle: "italic",
                fontSize: 13,
                color: "var(--fg-2)",
            }}
        >
            “A pull-quote paragraph draws the eye to a single thought.”
        </p>
    </div>
);

/* =============== 14. VISUALLY HIDDEN =============== */
const Vh1 = () => (
    <div className="vh-demo">
        <button
            style={{
                background: "var(--accent)",
                color: "white",
                border: "none",
                width: 40,
                height: 40,
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 18,
            }}
        >
            ×<span className="vh">Close dialog</span>
        </button>
        <span className="sr-annot">Icon btn · SR: "Close dialog"</span>
    </div>
);
const Vh2 = () => (
    <div className="vh-demo">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
                className="inp-base"
                style={{
                    padding: "6px 10px",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    width: 120,
                    fontSize: 12,
                }}
                placeholder="Search"
            />
            <label className="vh" htmlFor="s">
                Search the site
            </label>
        </div>
        <span className="sr-annot">Visual-less label</span>
    </div>
);
const Vh3 = () => (
    <div className="vh-demo">
        <a
            href="#main"
            style={{
                position: "relative",
                padding: "4px 10px",
                background: "var(--fg)",
                color: "var(--bg)",
                fontSize: 11,
                fontFamily: "JetBrains Mono,monospace",
                textDecoration: "none",
                borderRadius: 4,
            }}
        >
            Skip to content
        </a>
        <span className="sr-annot">Skip-link (shows on focus)</span>
    </div>
);
const Vh4 = () => (
    <div className="vh-demo">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} />
            <span style={{ fontSize: 12 }}>Online</span>
            <span className="vh">Status: online</span>
        </div>
        <span className="sr-annot">Dot + SR fallback</span>
    </div>
);
const Vh5 = () => (
    <div className="vh-demo">
        <h3 style={{ fontSize: 13, margin: 0 }}>Top posts</h3>
        <ol style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: "var(--fg-2)" }}>
            <li>Article one</li>
            <li>Article two</li>
        </ol>
        <span className="vh">End of list</span>
        <span className="sr-annot">Announced list bounds</span>
    </div>
);
const Vh6 = () => (
    <div className="vh-demo">
        <div role="status" style={{ fontSize: 12, color: "var(--fg-2)", fontFamily: "JetBrains Mono,monospace" }}>
            <span className="vh">Loading status: </span>42% complete
        </div>
        <div style={{ width: 120, height: 4, background: "var(--bg-2)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: "42%", height: "100%", background: "var(--accent)" }} />
        </div>
        <span className="sr-annot">aria-live region</span>
    </div>
);

/* =============== REGISTRY =============== */
window.CATEGORIES = [
    {
        n: "Box",
        k: "bx",
        desc: "Generic container primitives",
        notes: [
            "Bordered card",
            "Inverted dark",
            "Accent rail",
            "Elevated shadow",
            "Terminal",
            "Brutalist hard-shadow",
        ],
        v: [Box1, Box2, Box3, Box4, Box5, Box6],
    },
    {
        n: "Container",
        k: "cn",
        desc: "Constrain content to a max-width",
        notes: ["Small 640", "Medium 768", "Fluid 100%", "Stepped responsive", "Prose 65ch", "Ruled w/ guides"],
        v: [Container1, Container2, Container3, Container4, Container5, Container6],
    },
    {
        n: "Grid",
        k: "gr",
        desc: "CSS Grid scaffolds",
        notes: ["3-col uniform", "4-col uniform", "2fr 1fr 1fr", "Auto-fit minmax", "12-col system", "Masonry tint"],
        v: [Grid1, Grid2, Grid3, Grid4, Grid5, Grid6],
    },
    {
        n: "Grid Item",
        k: "gi",
        desc: "Individual cells and spans",
        notes: ["Column span", "Row span", "Bento layout", "Explicit start/end", "Named areas", "Featured highlight"],
        v: [GridItem1, GridItem2, GridItem3, GridItem4, GridItem5, GridItem6],
    },
    {
        n: "Flex",
        k: "fl",
        desc: "Flexbox layouts",
        notes: ["Row default", "Space between", "Column stack", "Wrapped chips", "Center both", "Baseline bars"],
        v: [Flex1, Flex2, Flex3, Flex4, Flex5, Flex6],
    },
    {
        n: "Stack",
        k: "st",
        desc: "Consistent rhythmic spacing",
        notes: [
            "Tight vertical",
            "Loose vertical",
            "Horizontal",
            "Dividered list",
            "Indented steps",
            "Hairline separated",
        ],
        v: [Stack1, Stack2, Stack3, Stack4, Stack5, Stack6],
    },
    {
        n: "Center",
        k: "ce",
        desc: "Center children both axes",
        notes: [
            "Flex center",
            "With crosshair",
            "Multi-item column",
            "Grid place-items",
            "Absolute translate",
            "margin:auto",
        ],
        v: [Center1, Center2, Center3, Center4, Center5, Center6],
    },
    {
        n: "Divider / Separator",
        k: "dv",
        desc: "Visual breaks between content",
        notes: ["Hairline soft", "Solid strong", "Dashed", "Labeled OR", "Diamond ornament", "Vertical bars"],
        v: [Div1, Div2, Div3, Div4, Div5, Div6],
    },
    {
        n: "Spacer",
        k: "sp",
        desc: "Fill remaining flex space",
        notes: ["Between two items", "Push-end", "Vertical fill", "Token scale", "Logo / auth", "3-way push"],
        v: [Sp1, Sp2, Sp3, Sp4, Sp5, Sp6],
    },
    {
        n: "Aspect Ratio",
        k: "ar",
        desc: "Hold proportions for media",
        notes: ["16:9 video", "1:1 square", "3:4 portrait", "21:9 cinematic", "3:2 photo", "4:5 social"],
        v: [Ar1, Ar2, Ar3, Ar4, Ar5, Ar6],
    },
    {
        n: "Typography / Text",
        k: "ty",
        desc: "Base text rendering",
        notes: ["Display → caption", "Code tokens", "Weight ladder", "Decorations", "Editorial quote", "Eyebrow lead"],
        v: [Typo1, Typo2, Typo3, Typo4, Typo5, Typo6],
    },
    {
        n: "Heading",
        k: "hd",
        desc: "Semantic h1–h6",
        notes: ["H1 · display", "H2 · section", "H3 · subsection", "H4 · small", "H5 · minor", "H6 · overline"],
        v: [H1, H2, H3, H4, H5, H6],
    },
    {
        n: "Paragraph",
        k: "pg",
        desc: "Body text blocks",
        notes: ["Default body", "Editorial serif", "Secondary caption", "Drop cap", "Mono docs", "Pull quote"],
        v: [P1, P2, P3, P4, P5, P6],
    },
    {
        n: "Visually Hidden",
        k: "vh",
        desc: "Hidden visually; read by SR",
        notes: [
            "Icon button label",
            "Form field label",
            "Skip-to-content",
            "Status dot + text",
            "List bounds",
            "aria-live status",
        ],
        v: [Vh1, Vh2, Vh3, Vh4, Vh5, Vh6],
    },
];
