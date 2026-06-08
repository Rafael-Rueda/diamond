/* FEEDBACK GALLERY — VARIANTS */
const { useState, useEffect } = React;

/* ===== 01 ALERT ===== */
const Al1 = () => (
    <div className="alert-b alert-info">
        <div className="ico">i</div>
        <div className="body">
            <b>New update available</b>
            <p>Version 2.4.0 is ready to install with new features.</p>
        </div>
        <button className="x">×</button>
    </div>
);
const Al2 = () => (
    <div className="alert-b alert-success">
        <div className="ico">✓</div>
        <div className="body">
            <b>Payment received</b>
            <p>Your invoice #2401 has been marked as paid.</p>
        </div>
        <button className="x">×</button>
    </div>
);
const Al3 = () => (
    <div className="alert-b alert-warn">
        <div className="ico">!</div>
        <div className="body">
            <b>Storage almost full</b>
            <p>You've used 92% of your 10GB plan. Consider upgrading.</p>
        </div>
    </div>
);
const Al4 = () => (
    <div className="alert-b alert-danger">
        <div className="ico">×</div>
        <div className="body">
            <b>Action failed</b>
            <p>We couldn't save your changes. Please try again.</p>
        </div>
        <button className="x">×</button>
    </div>
);
const Al5 = () => (
    <div className="alert-b" style={{ background: "var(--fg)", color: "var(--bg)", border: "none" }}>
        <div className="ico" style={{ background: "var(--accent)", color: "white" }}>
            ★
        </div>
        <div className="body">
            <b style={{ color: "var(--bg)" }}>Pro tip</b>
            <p style={{ color: "#c4bfb3" }}>Press ⌘K anywhere to open the command palette.</p>
        </div>
    </div>
);
const Al6 = () => (
    <div
        className="alert-b"
        style={{
            background: "transparent",
            border: "1px dashed var(--border-2)",
            color: "var(--fg-2)",
            fontFamily: "'JetBrains Mono', monospace",
        }}
    >
        <div style={{ color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em" }}>NOTICE</div>
        <div className="body" style={{ fontSize: 11 }}>
            Scheduled maintenance · Sun 02:00 UTC · ~30 min
        </div>
    </div>
);

/* ===== 02 TOAST ===== */
const T1 = () => (
    <div className="toast-frame">
        <div className="app-bg">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
            <div className="bar" style={{ width: "40%" }} />
        </div>
        <div className="toast" style={{ bottom: 14, right: 14 }}>
            <div className="ico" style={{ background: "var(--success)" }}>
                ✓
            </div>
            <div>
                <div style={{ fontWeight: 600 }}>Saved</div>
                <div style={{ fontSize: 10, color: "var(--fg-3)" }}>Draft updated</div>
            </div>
        </div>
    </div>
);
const T2 = () => (
    <div className="toast-frame">
        <div className="app-bg">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div
            className="toast"
            style={{
                top: 14,
                right: 14,
                background: "var(--fg)",
                color: "var(--bg)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
        >
            <div className="ico" style={{ background: "var(--accent)" }}>
                ↩
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ color: "var(--bg)", fontWeight: 600 }}>Message sent</div>
            </div>
            <a style={{ color: "var(--accent)", fontSize: 11, textDecoration: "none" }}>UNDO</a>
        </div>
    </div>
);
const T3 = () => (
    <div className="toast-frame">
        <div className="app-bg">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div className="toast" style={{ bottom: 14, left: 14, maxWidth: 240 }}>
            <div className="ico" style={{ background: "var(--accent)" }}>
                <div
                    className="spin"
                    style={{
                        width: 14,
                        height: 14,
                        borderWidth: 2,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                    }}
                />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Uploading</div>
                <div style={{ height: 3, background: "var(--bg-2)", borderRadius: 2, marginTop: 4 }}>
                    <div style={{ width: "45%", height: "100%", background: "var(--accent)", borderRadius: 2 }} />
                </div>
            </div>
        </div>
    </div>
);
const T4 = () => (
    <div className="toast-frame">
        <div className="app-bg">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div className="toast" style={{ top: 14, right: 14 }}>
            <div className="ico" style={{ background: "var(--danger)" }}>
                !
            </div>
            <div>
                <div style={{ fontWeight: 600 }}>Failed to connect</div>
                <div style={{ fontSize: 10, color: "var(--fg-3)" }}>Check your network</div>
            </div>
        </div>
    </div>
);
const T5 = () => (
    <div className="toast-frame">
        <div className="app-bg">
            <div className="bar" style={{ width: "60%" }} />
        </div>
        <div
            className="toast"
            style={{
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "8px 16px",
                maxWidth: 200,
                textAlign: "center",
                justifyContent: "center",
                borderRadius: 20,
            }}
        >
            <div style={{ fontSize: 11 }}>Copied to clipboard</div>
        </div>
    </div>
);
const T6 = () => (
    <div className="toast-frame">
        <div className="app-bg">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div
            className="toast"
            style={{ top: 14, right: 14, flexDirection: "column", alignItems: "stretch", maxWidth: 220, padding: 12 }}
        >
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div className="ico" style={{ background: "var(--accent)" }}>
                    @
                </div>
                <div style={{ flex: 1, fontSize: 11 }}>
                    <b>Aria mentioned you</b>
                    <div style={{ color: "var(--fg-2)", fontSize: 10 }}>"can you review this?"</div>
                </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
                <button
                    style={{
                        flex: 1,
                        padding: 4,
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        borderRadius: 4,
                        fontSize: 10,
                    }}
                >
                    Later
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: 4,
                        border: "none",
                        background: "var(--accent)",
                        color: "white",
                        borderRadius: 4,
                        fontSize: 10,
                    }}
                >
                    Open
                </button>
            </div>
        </div>
    </div>
);

/* ===== 03 NOTIFICATION CENTER ===== */
const Nc1 = () => (
    <div className="nc">
        <div className="nc-head">
            <b>Notifications</b>
            <a>Mark all read</a>
        </div>
        <div className="nc-item unread">
            <div className="udot" />
            <div className="av">A</div>
            <div className="body">
                <b>Aria</b> commented on your draft<div className="time">2m ago</div>
            </div>
        </div>
        <div className="nc-item unread">
            <div className="udot" />
            <div className="av">B</div>
            <div className="body">
                <b>Build #241</b> completed<div className="time">15m ago</div>
            </div>
        </div>
        <div className="nc-item">
            <div className="av" style={{ background: "transparent" }} />
            <div className="av">M</div>
            <div className="body">
                Monthly report ready<div className="time">2h ago</div>
            </div>
        </div>
    </div>
);
const Nc2 = () => (
    <div className="nc">
        <div className="nc-head">
            <b>Inbox</b>
            <span style={{ fontSize: 10, color: "var(--fg-3)" }}>3 unread</span>
        </div>
        <div className="nc-tabs">
            <div className="t on">All</div>
            <div className="t">Mentions</div>
            <div className="t">Alerts</div>
        </div>
        <div className="nc-item unread">
            <div className="udot" />
            <div className="av">@</div>
            <div className="body">
                <b>Jay</b> mentioned you in #design<div className="time">just now</div>
            </div>
        </div>
        <div className="nc-item">
            <div className="av" style={{ background: "transparent" }} />
            <div className="av">D</div>
            <div className="body">
                Design sync at 3pm<div className="time">1h ago</div>
            </div>
        </div>
    </div>
);
const Nc3 = () => (
    <div className="nc" style={{ maxWidth: 310 }}>
        <div className="nc-head">
            <b>Today</b>
        </div>
        <div className="nc-item">
            <div
                className="av"
                style={{ background: "color-mix(in oklab, var(--success) 20%, white)", color: "var(--success)" }}
            >
                ✓
            </div>
            <div className="body">
                <b>Deploy successful</b>
                <div style={{ color: "var(--fg-3)", fontSize: 10 }}>Production · v2.4.0</div>
                <div className="time">10m ago</div>
            </div>
        </div>
        <div className="nc-item">
            <div
                className="av"
                style={{ background: "color-mix(in oklab, var(--warn) 20%, white)", color: "var(--warn)" }}
            >
                !
            </div>
            <div className="body">
                <b>Billing reminder</b>
                <div style={{ color: "var(--fg-3)", fontSize: 10 }}>Invoice due in 3 days</div>
                <div className="time">1h ago</div>
            </div>
        </div>
    </div>
);
const Nc4 = () => (
    <div className="nc" style={{ background: "#0f0f0e", color: "#f5f3ef", borderColor: "#2d2c28" }}>
        <div className="nc-head" style={{ borderColor: "#2d2c28" }}>
            <b style={{ color: "#f5f3ef" }}>Activity</b>
            <a>Clear</a>
        </div>
        <div className="nc-item unread" style={{ borderColor: "#2d2c28", background: "rgba(43,127,255,0.08)" }}>
            <div className="udot" />
            <div className="av" style={{ background: "#2d2c28", color: "#d4d0c8" }}>
                L
            </div>
            <div className="body" style={{ color: "#a8a49c" }}>
                <b style={{ color: "#f5f3ef" }}>Leo</b> invited you
                <div className="time" style={{ color: "#6b6862" }}>
                    5m ago
                </div>
            </div>
        </div>
        <div className="nc-item" style={{ borderColor: "#2d2c28" }}>
            <div className="av" style={{ background: "transparent" }} />
            <div className="av" style={{ background: "#2d2c28", color: "#d4d0c8" }}>
                S
            </div>
            <div className="body" style={{ color: "#a8a49c" }}>
                <b style={{ color: "#f5f3ef" }}>Sync</b> complete
                <div className="time" style={{ color: "#6b6862" }}>
                    30m ago
                </div>
            </div>
        </div>
    </div>
);
const Nc5 = () => (
    <div className="nc" style={{ padding: 8 }}>
        <div
            style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--fg-3)",
                padding: "4px 6px 8px",
            }}
        >
            TODAY · MON, JAN 18
        </div>
        <div style={{ display: "flex", gap: 8, padding: "6px 6px", fontSize: 11 }}>
            <div
                style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--accent)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                💬
            </div>
            <div style={{ flex: 1 }}>
                <b>3 new replies</b>
                <div style={{ color: "var(--fg-2)", fontSize: 10 }}>in "Q4 roadmap"</div>
            </div>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "6px 6px", fontSize: 11 }}>
            <div
                style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--bg-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                📎
            </div>
            <div style={{ flex: 1 }}>
                <b>Shared a file</b>
                <div style={{ color: "var(--fg-2)", fontSize: 10 }}>brief.pdf · Jay</div>
            </div>
        </div>
    </div>
);
const Nc6 = () => (
    <div className="nc">
        <div className="nc-head" style={{ background: "var(--fg)", color: "var(--bg)", borderColor: "var(--fg)" }}>
            <b style={{ color: "var(--bg)" }}>🔔 3 New</b>
            <a style={{ color: "var(--accent)" }}>See all</a>
        </div>
        <div className="nc-item">
            <div className="av" style={{ background: "var(--accent)", color: "white" }}>
                ★
            </div>
            <div className="body">
                <b>You were added to "Alpha"</b>
                <div className="time">just now</div>
            </div>
        </div>
        <div className="nc-item">
            <div className="av">🎉</div>
            <div className="body">
                <b>Your article hit 1k views</b>
                <div className="time">1h ago</div>
            </div>
        </div>
    </div>
);

/* ===== 04 DOT ===== */
const D1 = () => (
    <div className="dotframe">
        <div className="trigger">
            🔔 Alerts
            <span className="ndot" />
        </div>
        <div className="trigger">
            Inbox
            <span className="ndot" />
        </div>
    </div>
);
const D2 = () => (
    <div className="dotframe">
        <div className="trigger">
            Messages<span className="ndot big">3</span>
        </div>
        <div className="trigger">
            Mail<span className="ndot big">12</span>
        </div>
    </div>
);
const D3 = () => (
    <div className="dotframe">
        <div className="trigger">
            Live
            <span className="ndot pulse" />
        </div>
        <div className="trigger">
            Updates
            <span className="ndot pulse" style={{ background: "var(--success)" }} />
        </div>
    </div>
);
const D4 = () => (
    <div className="dotframe">
        <div
            style={{
                position: "relative",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--bg-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
            }}
        >
            A
            <span
                className="ndot"
                style={{
                    background: "var(--success)",
                    width: 10,
                    height: 10,
                    top: 1,
                    right: 1,
                    border: "2px solid var(--surface)",
                }}
            />
        </div>
        <div
            style={{
                position: "relative",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--bg-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
            }}
        >
            B
            <span
                className="ndot"
                style={{
                    background: "var(--warn)",
                    width: 10,
                    height: 10,
                    top: 1,
                    right: 1,
                    border: "2px solid var(--surface)",
                }}
            />
        </div>
    </div>
);
const D5 = () => (
    <div className="dotframe">
        <div className="trigger">
            Inbox
            <span className="ndot big" style={{ background: "var(--fg)", right: "auto", left: "calc(100% - 24px)" }}>
                99+
            </span>
        </div>
    </div>
);
const D6 = () => (
    <div className="dotframe">
        <div className="trigger" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} />
            Online
        </div>
        <div className="trigger" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--warn)" }} />
            Away
        </div>
        <div className="trigger" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg-3)" }} />
            Offline
        </div>
    </div>
);

/* ===== 05 TOOLTIP ===== */
const Tt1 = () => (
    <div className="tt-host">
        <span className="trigger">Hover me</span>
        <span className="tt">Save changes</span>
    </div>
);
const Tt2 = () => (
    <div className="tt-host">
        <span className="trigger">⌘</span>
        <span className="tt" style={{ padding: "4px 8px" }}>
            Copy · ⌘C
        </span>
    </div>
);
const Tt3 = () => (
    <div className="tt-host">
        <span className="trigger">Help</span>
        <span
            className="tt"
            style={{ whiteSpace: "normal", width: 180, textAlign: "left", padding: "8px 10px", lineHeight: 1.4 }}
        >
            <b style={{ color: "var(--accent)", display: "block", fontSize: 10, marginBottom: 2 }}>PRO TIP</b>You can
            drag items to reorder them.
        </span>
    </div>
);
const Tt4 = () => (
    <div className="tt-host">
        <span className="trigger">★</span>
        <span className="tt" style={{ background: "var(--accent)", color: "white" }}>
            Add to favorites
            <span
                style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    border: "4px solid transparent",
                    borderTopColor: "var(--accent)",
                }}
            />
        </span>
    </div>
);
const Tt5 = () => (
    <div className="tt-host">
        <span className="trigger">?</span>
        <span
            className="tt"
            style={{
                background: "var(--surface)",
                color: "var(--fg)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        >
            Requires admin role
            <span
                style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    border: "4px solid transparent",
                    borderTopColor: "var(--surface)",
                }}
            />
        </span>
    </div>
);
const Tt6 = () => (
    <div className="tt-host">
        <span className="trigger">Status</span>
        <span className="tt" style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} />
            All systems operational
        </span>
    </div>
);

/* ===== 06 POPOVER ===== */
const Pv1 = () => (
    <div className="pop-host">
        <span className="trigger">Profile ▾</span>
        <div className="pop">
            <h5>Aria Chen</h5>
            <p style={{ marginBottom: 6 }}>aria@team.co · Admin</p>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 8, display: "flex", gap: 6 }}>
                <button
                    style={{
                        flex: 1,
                        padding: 5,
                        background: "var(--bg-2)",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 11,
                    }}
                >
                    View
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: 5,
                        background: "var(--accent)",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 11,
                    }}
                >
                    Message
                </button>
            </div>
        </div>
    </div>
);
const Pv2 = () => (
    <div className="pop-host">
        <span className="trigger">Filters ▾</span>
        <div className="pop">
            <h5>Filters</h5>
            <label style={{ display: "flex", gap: 6, fontSize: 11, marginBottom: 4 }}>
                <input type="checkbox" defaultChecked />
                Active
            </label>
            <label style={{ display: "flex", gap: 6, fontSize: 11, marginBottom: 4 }}>
                <input type="checkbox" />
                Archived
            </label>
            <label style={{ display: "flex", gap: 6, fontSize: 11, marginBottom: 8 }}>
                <input type="checkbox" />
                Shared
            </label>
            <button
                style={{
                    width: "100%",
                    padding: 5,
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 11,
                }}
            >
                Apply
            </button>
        </div>
    </div>
);
const Pv3 = () => (
    <div className="pop-host">
        <span className="trigger">Share ↗</span>
        <div className="pop">
            <h5>Share link</h5>
            <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                <div
                    style={{
                        flex: 1,
                        padding: "5px 7px",
                        background: "var(--bg-2)",
                        borderRadius: 4,
                        fontSize: 10,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "var(--fg-2)",
                        overflow: "hidden",
                    }}
                >
                    app.co/abc123
                </div>
                <button
                    style={{
                        padding: "5px 8px",
                        background: "var(--fg)",
                        color: "var(--bg)",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 10,
                    }}
                >
                    Copy
                </button>
            </div>
            <p style={{ fontSize: 10 }}>Anyone with the link can view.</p>
        </div>
    </div>
);
const Pv4 = () => (
    <div className="pop-host">
        <span className="trigger">🎨</span>
        <div className="pop" style={{ width: 140 }}>
            <h5>Color</h5>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
                {["#2b7fff", "#e11d48", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#1a1917"].map((c) => (
                    <div key={c} style={{ aspectRatio: 1, background: c, borderRadius: 4, cursor: "pointer" }} />
                ))}
            </div>
        </div>
    </div>
);
const Pv5 = () => (
    <div className="pop-host">
        <span className="trigger">⋯</span>
        <div className="pop" style={{ width: 160, padding: 4 }}>
            <div style={{ padding: "6px 10px", fontSize: 11, cursor: "pointer", borderRadius: 4 }}>✏ Edit</div>
            <div style={{ padding: "6px 10px", fontSize: 11, cursor: "pointer", borderRadius: 4 }}>⎘ Duplicate</div>
            <div style={{ padding: "6px 10px", fontSize: 11, cursor: "pointer", borderRadius: 4 }}>📎 Archive</div>
            <div
                style={{
                    padding: "6px 10px",
                    fontSize: 11,
                    cursor: "pointer",
                    borderRadius: 4,
                    color: "var(--danger)",
                    borderTop: "1px solid var(--border)",
                    marginTop: 4,
                }}
            >
                🗑 Delete
            </div>
        </div>
    </div>
);
const Pv6 = () => (
    <div className="pop-host">
        <span className="trigger">@mentions</span>
        <div className="pop">
            <h5>Mentioned you</h5>
            <div style={{ display: "flex", gap: 6, fontSize: 11, padding: "6px 0" }}>
                <div
                    style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "var(--bg-2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                    }}
                >
                    J
                </div>
                <div>
                    <b>Jay</b> · 2h<div style={{ color: "var(--fg-2)", fontSize: 10 }}>"check this out"</div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: 6,
                    fontSize: 11,
                    padding: "6px 0",
                    borderTop: "1px solid var(--border)",
                }}
            >
                <div
                    style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "var(--bg-2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                    }}
                >
                    L
                </div>
                <div>
                    <b>Leo</b> · 1d<div style={{ color: "var(--fg-2)", fontSize: 10 }}>"ship it?"</div>
                </div>
            </div>
        </div>
    </div>
);

/* ===== 07 PROGRESS ===== */
const Pr1 = () => (
    <div className="pbar">
        <div className="track">
            <div className="fill" style={{ width: "64%" }} />
        </div>
        <div className="meta">
            <span>Uploading</span>
            <span>64%</span>
        </div>
    </div>
);
const Pr2 = () => (
    <div className="pbar thick">
        <div className="track">
            <div className="fill" style={{ width: "35%" }} />
        </div>
        <div className="meta">
            <span>Step 2 of 5</span>
            <span>35%</span>
        </div>
    </div>
);
const Pr3 = () => (
    <div className="pbar stepped">
        <div className="track">
            <span className="on" />
            <span className="on" />
            <span className="on" />
            <span />
            <span />
        </div>
        <div className="meta">
            <span>Setup</span>
            <span>3 / 5</span>
        </div>
    </div>
);
const Pr4 = () => (
    <div className="pbar striped">
        <div className="track">
            <div className="fill" style={{ width: "72%" }} />
        </div>
        <div className="meta">
            <span>Installing</span>
            <span>72%</span>
        </div>
    </div>
);
const Pr5 = () => (
    <div className="pbar indet">
        <div className="track" style={{ overflow: "hidden" }}>
            <div className="fill" style={{ background: "var(--accent)" }} />
        </div>
        <div className="meta">
            <span>Syncing…</span>
            <span>--</span>
        </div>
    </div>
);
const Pr6 = () => (
    <div className="pbar" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ fontSize: 11, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
            <span>build</span>
            <span style={{ color: "var(--accent)" }}>[==== ] 48%</span>
        </div>
        <div style={{ height: 2, background: "var(--bg-2)", borderRadius: 0 }}>
            <div style={{ width: "48%", height: "100%", background: "var(--accent)" }} />
        </div>
    </div>
);

/* ===== 08 SPINNER ===== */
const Sp1 = () => (
    <div className="spinwrap">
        <div className="spin" />
        <span style={{ fontSize: 11, color: "var(--fg-2)" }}>Loading…</span>
    </div>
);
const Sp2 = () => (
    <div className="spinwrap">
        <div className="spin dual" />
        <div className="spin dual" style={{ width: 22, height: 22, borderWidth: 2, animationDuration: "1.4s" }} />
    </div>
);
const Sp3 = () => (
    <div className="spinwrap">
        <div className="spin-dots">
            <span />
            <span />
            <span />
        </div>
    </div>
);
const Sp4 = () => (
    <div className="spinwrap">
        <div className="spin-bars">
            <span />
            <span />
            <span />
            <span />
            <span />
        </div>
    </div>
);
const Sp5 = () => (
    <div className="spinwrap">
        <div className="spin-ring">
            <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" className="track" />
                <circle cx="18" cy="18" r="16" className="fill" pathLength="100" />
            </svg>
            <div className="label">65%</div>
        </div>
    </div>
);
const Sp6 = () => (
    <div className="spinwrap">
        <div className="spin-pulse" />
        <div className="spin-pulse" style={{ animationDelay: "0.3s" }} />
        <div className="spin-pulse" style={{ animationDelay: "0.6s" }} />
    </div>
);

/* ===== 09 SKELETON ===== */
const Sk1 = () => (
    <div className="skel-card">
        <div className="skel" style={{ width: "100%", height: 100, borderRadius: 8 }} />
        <div className="skel" style={{ width: "70%", height: 12 }} />
        <div className="skel" style={{ width: "50%", height: 10 }} />
    </div>
);
const Sk2 = () => (
    <div className="skel-card">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="skel" style={{ width: 36, height: 36, borderRadius: "50%" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                <div className="skel" style={{ width: "60%", height: 10 }} />
                <div className="skel" style={{ width: "40%", height: 8 }} />
            </div>
        </div>
        <div className="skel" style={{ width: "100%", height: 8 }} />
        <div className="skel" style={{ width: "85%", height: 8 }} />
    </div>
);
const Sk3 = () => (
    <div className="skel-card">
        <div style={{ display: "flex", gap: 6 }}>
            <div className="skel" style={{ width: 60, height: 60, borderRadius: 6 }} />
            <div className="skel" style={{ width: 60, height: 60, borderRadius: 6 }} />
            <div className="skel" style={{ width: 60, height: 60, borderRadius: 6 }} />
        </div>
        <div className="skel" style={{ width: "100%", height: 10 }} />
    </div>
);
const Sk4 = () => (
    <div className="skel-card">
        <div className="skel" style={{ width: 120, height: 16, borderRadius: 4 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="skel" style={{ width: "100%", height: 8 }} />
            <div className="skel" style={{ width: "95%", height: 8 }} />
            <div className="skel" style={{ width: "90%", height: 8 }} />
            <div className="skel" style={{ width: "60%", height: 8 }} />
        </div>
    </div>
);
const Sk5 = () => (
    <div className="skel-card">
        <div
            style={{
                padding: 12,
                border: "1px solid var(--border)",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <div className="skel" style={{ width: "50%", height: 10 }} />
            <div className="skel" style={{ width: "100%", height: 60, borderRadius: 4 }} />
            <div style={{ display: "flex", gap: 6 }}>
                <div className="skel" style={{ width: 60, height: 22, borderRadius: 11 }} />
                <div className="skel" style={{ width: 60, height: 22, borderRadius: 11 }} />
            </div>
        </div>
    </div>
);
const Sk6 = () => (
    <div className="skel-card">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", gap: 8 }}>
                <div className="skel" style={{ width: 20, height: 20, borderRadius: 4 }} />
                <div className="skel" style={{ flex: 1, height: 12 }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                <div className="skel" style={{ width: 20, height: 20, borderRadius: 4 }} />
                <div className="skel" style={{ flex: 1, height: 12 }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                <div className="skel" style={{ width: 20, height: 20, borderRadius: 4 }} />
                <div className="skel" style={{ flex: 1, height: 12 }} />
            </div>
        </div>
    </div>
);

/* ===== 10 EMPTY ===== */
const E1 = () => (
    <div className="empty">
        <div className="art">📭</div>
        <h4>No messages yet</h4>
        <p>When you receive messages, they'll appear here.</p>
        <button>Compose</button>
    </div>
);
const E2 = () => (
    <div className="empty">
        <div
            className="art"
            style={{
                background: "color-mix(in oklab, var(--accent) 12%, white)",
                color: "var(--accent)",
                borderRadius: 12,
            }}
        >
            ＋
        </div>
        <h4>Create your first project</h4>
        <p>Projects help organize your work across teams.</p>
        <button>New project</button>
    </div>
);
const E3 = () => (
    <div className="empty">
        <svg width="64" height="48" viewBox="0 0 64 48" style={{ marginBottom: 10 }}>
            <rect
                x="4"
                y="8"
                width="56"
                height="36"
                rx="4"
                fill="none"
                stroke="var(--border-2)"
                strokeDasharray="4 3"
            />
            <line x1="14" y1="22" x2="50" y2="22" stroke="var(--border-2)" />
            <line x1="14" y1="30" x2="38" y2="30" stroke="var(--border-2)" />
        </svg>
        <h4>No results found</h4>
        <p>Try adjusting your search or filters.</p>
        <button style={{ background: "var(--bg-2)", color: "var(--fg)" }}>Clear filters</button>
    </div>
);
const E4 = () => (
    <div className="empty">
        <div className="art" style={{ fontSize: 28 }}>
            🗂
        </div>
        <h4>Folder is empty</h4>
        <p>Drop files here or click to upload.</p>
        <div
            style={{
                padding: "12px 16px",
                border: "2px dashed var(--border-2)",
                borderRadius: 8,
                fontSize: 10,
                color: "var(--fg-3)",
            }}
        >
            Drag & drop files
        </div>
    </div>
);
const E5 = () => (
    <div className="empty" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.18em", marginBottom: 8 }}>
            404 · NO DATA
        </div>
        <h4 style={{ fontFamily: "var(--font)" }}>Nothing here yet</h4>
        <p style={{ fontFamily: "var(--font)" }}>Start by adding your first entry.</p>
        <button>＋ Add entry</button>
    </div>
);
const E6 = () => (
    <div className="empty">
        <div className="art" style={{ background: "var(--fg)", color: "var(--bg)", fontSize: 22 }}>
            ★
        </div>
        <h4>All caught up!</h4>
        <p>No new items. You've read everything.</p>
    </div>
);

/* ===== 11 ERROR ===== */
const Er1 = () => (
    <div className="errstate">
        <div className="code">404</div>
        <h4>Page not found</h4>
        <p>The page you're looking for doesn't exist.</p>
        <button>Go home</button>
    </div>
);
const Er2 = () => (
    <div className="errstate">
        <div className="code">500</div>
        <h4>Server error</h4>
        <p>Something went wrong. Our team has been notified.</p>
        <button>Try again</button>
    </div>
);
const Er3 = () => (
    <div className="errstate">
        <div style={{ fontSize: 48, marginBottom: 8 }}>🚧</div>
        <h4>Something broke</h4>
        <p>We're on it. Refresh the page or come back later.</p>
        <button>Refresh</button>
    </div>
);
const Er4 = () => (
    <div className="errstate">
        <div
            style={{
                width: 56,
                height: 56,
                margin: "0 auto 10px",
                borderRadius: "50%",
                background: "color-mix(in oklab, var(--danger) 15%, white)",
                color: "var(--danger)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
            }}
        >
            !
        </div>
        <h4>Connection lost</h4>
        <p>We couldn't reach the server. Check your network.</p>
        <button>Retry</button>
    </div>
);
const Er5 = () => (
    <div
        className="errstate"
        style={{
            fontFamily: "'JetBrains Mono', monospace",
            textAlign: "left",
            background: "#0a0a08",
            color: "#d4d0c8",
            padding: 14,
            borderRadius: 6,
        }}
    >
        <div style={{ color: "var(--danger)", fontSize: 11, marginBottom: 6 }}>ERR_CONN_REFUSED</div>
        <div style={{ fontSize: 11, marginBottom: 4 }}>{">"} ping api.app.co</div>
        <div style={{ fontSize: 11, marginBottom: 10, color: "#6b6862" }}>Request timed out</div>
        <button style={{ background: "var(--accent)", color: "#0a0a08", fontFamily: "inherit" }}>retry →</button>
    </div>
);
const Er6 = () => (
    <div className="errstate">
        <div className="code" style={{ color: "var(--fg)" }}>
            :(
        </div>
        <h4>Unexpected error</h4>
        <p>
            Error code:{" "}
            <code
                style={{
                    background: "var(--bg-2)",
                    padding: "1px 4px",
                    borderRadius: 3,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                }}
            >
                E_4301
            </code>
        </p>
        <button>Report issue</button>
    </div>
);

/* ===== 12 OFFLINE ===== */
const Of1 = () => (
    <div className="offline-frame">
        <div className="app">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
            <div className="bar" style={{ width: "40%" }} />
        </div>
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "8px 12px",
                background: "var(--warn)",
                color: "white",
                fontSize: 11,
                fontWeight: 600,
                display: "flex",
                gap: 8,
                alignItems: "center",
            }}
        >
            <span>⚠</span>No internet connection. Working offline.
        </div>
    </div>
);
const Of2 = () => (
    <div className="offline-frame">
        <div className="app">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div
            style={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "6px 14px",
                background: "var(--fg)",
                color: "var(--bg)",
                borderRadius: 20,
                fontSize: 11,
                display: "flex",
                gap: 6,
                alignItems: "center",
            }}
        >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--danger)" }} />
            You're offline
        </div>
    </div>
);
const Of3 = () => (
    <div className="offline-frame">
        <div className="app">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div
            style={{
                position: "absolute",
                top: 8,
                right: 8,
                padding: "5px 10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                fontSize: 10,
                display: "flex",
                gap: 5,
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
        >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--danger)" }} />
            Offline
        </div>
    </div>
);
const Of4 = () => (
    <div className="offline-frame">
        <div className="app">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "8px 12px",
                background: "color-mix(in oklab, var(--warn) 15%, white)",
                color: "color-mix(in oklab, var(--warn) 60%, var(--fg))",
                fontSize: 11,
                borderBottom: "1px solid color-mix(in oklab, var(--warn) 30%, transparent)",
                display: "flex",
                gap: 8,
                alignItems: "center",
            }}
        >
            <span>📡</span>
            <span style={{ flex: 1 }}>Reconnecting…</span>
            <div className="spin" style={{ width: 12, height: 12, borderWidth: 2, borderTopColor: "var(--warn)" }} />
        </div>
    </div>
);
const Of5 = () => (
    <div className="offline-frame">
        <div className="app">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15,14,12,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "var(--surface)",
                    padding: 14,
                    borderRadius: 10,
                    textAlign: "center",
                    maxWidth: 160,
                }}
            >
                <div style={{ fontSize: 24, marginBottom: 4 }}>📵</div>
                <b style={{ fontSize: 12 }}>Offline</b>
                <div style={{ fontSize: 10, color: "var(--fg-2)", marginTop: 2 }}>Check your network</div>
            </div>
        </div>
    </div>
);
const Of6 = () => (
    <div className="offline-frame">
        <div className="app">
            <div className="bar" style={{ width: "60%" }} />
            <div className="bar" style={{ width: "80%" }} />
        </div>
        <div
            style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                right: 10,
                padding: "8px 10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderLeft: "3px solid var(--warn)",
                borderRadius: 6,
                fontSize: 11,
                display: "flex",
                gap: 8,
                alignItems: "center",
            }}
        >
            <b style={{ flex: 1 }}>Connection lost.</b>
            <button
                style={{
                    padding: "3px 8px",
                    background: "var(--fg)",
                    color: "var(--bg)",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 10,
                }}
            >
                Retry
            </button>
        </div>
    </div>
);

window.CATEGORIES = [
    {
        n: "Alert",
        k: "al",
        desc: "Static important messages",
        notes: [
            "Info · dismissible",
            "Success confirmation",
            "Warning · persistent",
            "Destructive error",
            "Inverted brand tip",
            "Editorial notice",
        ],
        v: [Al1, Al2, Al3, Al4, Al5, Al6],
    },
    {
        n: "Toast / Snackbar",
        k: "ts",
        desc: "Temporary notifications",
        notes: [
            "Success bottom-right",
            "Dark with undo",
            "Inline upload progress",
            "Error top-right",
            "Minimal centered",
            "Actionable mention",
        ],
        v: [T1, T2, T3, T4, T5, T6],
    },
    {
        n: "Notification Center",
        k: "nc",
        desc: "Grouped notifications",
        notes: [
            "Classic unread list",
            "Tabbed filters",
            "By-time grouping",
            "Dark mode",
            "Calendar heading",
            "Bold header banner",
        ],
        v: [Nc1, Nc2, Nc3, Nc4, Nc5, Nc6],
    },
    {
        n: "Notification Dot",
        k: "nd",
        desc: "Unread indicator",
        notes: [
            "Simple red dot",
            "Counted badge",
            "Pulsing live dot",
            "Avatar status",
            "Huge 99+ badge",
            "Status legend",
        ],
        v: [D1, D2, D3, D4, D5, D6],
    },
    {
        n: "Tooltip",
        k: "tt",
        desc: "Hover info bubble",
        notes: [
            "Standard label",
            "Keyboard shortcut",
            "Rich pro tip",
            "Accent variant",
            "Light with border",
            "Status indicator",
        ],
        v: [Tt1, Tt2, Tt3, Tt4, Tt5, Tt6],
    },
    {
        n: "Popover",
        k: "pv",
        desc: "Click-triggered panel",
        notes: ["Profile card", "Filter picker", "Share link", "Color picker", "Action menu", "Mentions feed"],
        v: [Pv1, Pv2, Pv3, Pv4, Pv5, Pv6],
    },
    {
        n: "Progress Bar",
        k: "pr",
        desc: "Linear completion",
        notes: [
            "Default with %",
            "Thick step counter",
            "Stepped segments",
            "Animated stripes",
            "Indeterminate",
            "Terminal ASCII",
        ],
        v: [Pr1, Pr2, Pr3, Pr4, Pr5, Pr6],
    },
    {
        n: "Spinner",
        k: "sp",
        desc: "Loading indicator",
        notes: ["Classic ring", "Dual rings", "Bouncing dots", "Audio bars", "Circular %", "Pulsing trio"],
        v: [Sp1, Sp2, Sp3, Sp4, Sp5, Sp6],
    },
    {
        n: "Skeleton Loader",
        k: "sk",
        desc: "Content placeholder",
        notes: ["Image card", "User post", "Gallery grid", "Article block", "Form scaffold", "List rows"],
        v: [Sk1, Sk2, Sk3, Sk4, Sk5, Sk6],
    },
    {
        n: "Empty State",
        k: "em",
        desc: "No data to show",
        notes: [
            "Inbox empty",
            "First project CTA",
            "No search results",
            "Empty folder · dropzone",
            "Editorial 404",
            "All caught up",
        ],
        v: [E1, E2, E3, E4, E5, E6],
    },
    {
        n: "Error State",
        k: "er",
        desc: "System failure",
        notes: [
            "Classic 404",
            "500 server error",
            "Playful broken",
            "Connection lost",
            "Terminal output",
            "Friendly error code",
        ],
        v: [Er1, Er2, Er3, Er4, Er5, Er6],
    },
    {
        n: "Offline Indicator",
        k: "of",
        desc: "Network loss",
        notes: [
            "Top warning bar",
            "Floating pill",
            "Subtle corner chip",
            "Reconnecting spinner",
            "Full-screen blocker",
            "Bottom toast + retry",
        ],
        v: [Of1, Of2, Of3, Of4, Of5, Of6],
    },
];
