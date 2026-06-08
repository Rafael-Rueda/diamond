/* Overlays Gallery — Variants */
const { useState, useEffect } = React;

/* Shared preview frame */
const Frame = ({ children, variant = "default" }) => (
    <div className="frame">
        <div className="chrome">
            <i />
            <i />
            <i />
            <span>app.preview</span>
        </div>
        <div className="app">
            <div className="bar w60" />
            <div className="bar w80" />
            <div className="grid2">
                <div className="card" />
                <div className="card" />
            </div>
            <div className="bar w40" />
            <div className="bar w30" />
        </div>
        {children}
    </div>
);

/* =============== 01. MODAL / DIALOG =============== */
const Modal1 = () => (
    <Frame>
        <div className="backdrop">
            <div className="md" style={{ position: "relative" }}>
                <button className="close">×</button>
                <h3>Invite teammates</h3>
                <p>Enter emails to send collaboration invites.</p>
                <div
                    style={{
                        background: "var(--bg-2)",
                        borderRadius: 6,
                        padding: 8,
                        fontSize: 11,
                        marginBottom: 12,
                        color: "var(--fg-3)",
                    }}
                >
                    name@team.com
                </div>
                <div className="actions">
                    <button className="btn ghost">Cancel</button>
                    <button className="btn primary">Send</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Modal2 = () => (
    <Frame>
        <div className="backdrop">
            <div className="md" style={{ maxWidth: 240, textAlign: "center", padding: "22px 20px" }}>
                <div
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "color-mix(in oklab, var(--success) 18%, white)",
                        color: "var(--success)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 10px",
                        fontSize: 22,
                    }}
                >
                    ✓
                </div>
                <h3>Payment confirmed</h3>
                <p>Your subscription is now active.</p>
                <button className="btn primary" style={{ width: "100%", padding: 10 }}>
                    Done
                </button>
            </div>
        </div>
    </Frame>
);
const Modal3 = () => (
    <Frame>
        <div className="backdrop heavy">
            <div className="md" style={{ background: "#0f0f0e", color: "#f5f3ef", maxWidth: 260 }}>
                <h3 style={{ color: "#f5f3ef" }}>Dark variant</h3>
                <p style={{ color: "#a8a49c" }}>For media-rich or cinematic contexts.</p>
                <div className="actions">
                    <button className="btn ghost" style={{ color: "#a8a49c" }}>
                        Close
                    </button>
                    <button className="btn" style={{ background: "var(--accent)", color: "white" }}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    </Frame>
);
const Modal4 = () => (
    <Frame>
        <div className="backdrop" style={{ alignItems: "flex-start", paddingTop: 14 }}>
            <div className="md" style={{ maxWidth: 260, padding: 0, overflow: "hidden" }}>
                <div
                    style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border)",
                        background: "var(--bg-2)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span style={{ fontSize: 12, fontWeight: 600 }}>Settings</span>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg-3)" }}>
                        ×
                    </button>
                </div>
                <div style={{ padding: 16, fontSize: 11, color: "var(--fg-2)" }}>Preferences scrollable body area.</div>
                <div
                    style={{
                        padding: "10px 16px",
                        borderTop: "1px solid var(--border)",
                        display: "flex",
                        gap: 8,
                        justifyContent: "flex-end",
                    }}
                >
                    <button className="btn secondary">Cancel</button>
                    <button className="btn primary">Save</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Modal5 = () => (
    <Frame>
        <div className="backdrop">
            <div
                className="md"
                style={{
                    maxWidth: 260,
                    borderLeft: "4px solid var(--accent)",
                    borderRadius: "0 var(--radius) var(--radius) 0",
                }}
            >
                <div
                    style={{
                        fontFamily: "JetBrains Mono,monospace",
                        fontSize: 9,
                        color: "var(--accent)",
                        letterSpacing: "0.16em",
                        marginBottom: 4,
                    }}
                >
                    DIALOG · 01
                </div>
                <h3>Editorial style</h3>
                <p>Left-rail accent with quiet mono caption.</p>
                <div className="actions">
                    <button className="btn primary">Continue</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Modal6 = () => (
    <Frame>
        <div className="backdrop light">
            <div
                className="md"
                style={{
                    maxWidth: 260,
                    background: "var(--surface)",
                    border: "2px solid var(--fg)",
                    borderRadius: 0,
                    boxShadow: "6px 6px 0 var(--fg)",
                }}
            >
                <h3>Brutalist</h3>
                <p>Hard edges, hard shadow. No fuss.</p>
                <div className="actions">
                    <button className="btn" style={{ background: "var(--fg)", color: "var(--bg)", borderRadius: 0 }}>
                        ACK
                    </button>
                </div>
            </div>
        </div>
    </Frame>
);

/* =============== 02. ALERT DIALOG =============== */
const Alert1 = () => (
    <Frame>
        <div className="backdrop">
            <div className="alert">
                <div className="icn">!</div>
                <h3>Delete this workspace?</h3>
                <p>All files, members, and history will be permanently removed. This can't be undone.</p>
                <div className="actions">
                    <button className="cancel">Cancel</button>
                    <button className="danger">Delete</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Alert2 = () => (
    <Frame>
        <div className="backdrop">
            <div className="alert" style={{ textAlign: "center" }}>
                <div className="icn warn" style={{ margin: "0 auto 10px" }}>
                    ⚠
                </div>
                <h3>Unsaved changes</h3>
                <p>Leave the page? Your draft will be lost.</p>
                <div className="actions">
                    <button className="cancel">Stay</button>
                    <button className="warn">Leave</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Alert3 = () => (
    <Frame>
        <div className="backdrop">
            <div
                className="alert"
                style={{ borderLeft: "4px solid var(--danger)", borderRadius: "0 12px 12px 0", paddingLeft: 16 }}
            >
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <div className="icn" style={{ margin: 0, flexShrink: 0, width: 28, height: 28, fontSize: 16 }}>
                        !
                    </div>
                    <div>
                        <h3 style={{ marginBottom: 2 }}>Critical error</h3>
                        <p style={{ margin: 0 }}>Database connection lost. Reconnecting…</p>
                    </div>
                </div>
                <div className="actions">
                    <button className="cancel">Dismiss</button>
                    <button className="danger">Retry</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Alert4 = () => (
    <Frame>
        <div className="backdrop">
            <div className="alert" style={{ background: "#0f0f0e", color: "#f5f3ef" }}>
                <div className="icn" style={{ background: "rgba(220,38,38,0.2)" }}>
                    !
                </div>
                <h3 style={{ color: "#f5f3ef" }}>Account suspended</h3>
                <p style={{ color: "#a8a49c" }}>Access paused due to unusual activity.</p>
                <div className="actions">
                    <button className="cancel" style={{ background: "#2d2c28", color: "#d4d0c8" }}>
                        Contact
                    </button>
                    <button className="danger">Review</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Alert5 = () => (
    <Frame>
        <div className="backdrop">
            <div className="alert" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                <div style={{ fontSize: 9, color: "var(--danger)", letterSpacing: "0.18em", marginBottom: 8 }}>
                    ERR_409 · CONFLICT
                </div>
                <h3>Merge conflict detected</h3>
                <p>3 files have conflicting changes. Resolve manually before continuing.</p>
                <div className="actions">
                    <button className="cancel">Abort</button>
                    <button className="danger">Override</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Alert6 = () => (
    <Frame>
        <div className="backdrop">
            <div className="alert" style={{ position: "relative", paddingTop: 40 }}>
                <div
                    style={{
                        position: "absolute",
                        top: -18,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "var(--danger)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        boxShadow: "0 4px 10px rgba(220,38,38,0.4)",
                    }}
                >
                    !
                </div>
                <h3 style={{ textAlign: "center" }}>Permanent deletion</h3>
                <p style={{ textAlign: "center" }}>
                    Type <b>DELETE</b> to confirm.
                </p>
                <div
                    style={{
                        padding: "6px 10px",
                        background: "var(--bg-2)",
                        borderRadius: 4,
                        fontSize: 11,
                        fontFamily: "JetBrains Mono,monospace",
                        color: "var(--fg-3)",
                        marginBottom: 10,
                    }}
                >
                    DELETE___
                </div>
                <div className="actions">
                    <button className="cancel">Cancel</button>
                    <button className="danger">Proceed</button>
                </div>
            </div>
        </div>
    </Frame>
);

/* =============== 03. CONFIRM DIALOG =============== */
const Confirm1 = () => (
    <Frame>
        <div className="backdrop">
            <div className="md">
                <h3>Move to archive?</h3>
                <p>You can restore it from Archive later.</p>
                <div className="actions">
                    <button className="btn secondary">Cancel</button>
                    <button className="btn primary">Archive</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Confirm2 = () => (
    <Frame>
        <div className="backdrop">
            <div className="md" style={{ maxWidth: 250 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "color-mix(in oklab, var(--accent) 15%, white)",
                            color: "var(--accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 16,
                        }}
                    >
                        ?
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>Publish changes?</div>
                        <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>Goes live to all users.</div>
                    </div>
                </div>
                <div className="actions">
                    <button className="btn ghost">Not now</button>
                    <button className="btn primary">Publish</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Confirm3 = () => (
    <Frame>
        <div className="backdrop">
            <div className="md" style={{ maxWidth: 260 }}>
                <h3>Confirm purchase</h3>
                <div
                    style={{ background: "var(--bg-2)", borderRadius: 6, padding: 10, marginBottom: 12, fontSize: 11 }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span>Pro plan</span>
                        <span>$29.00</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: 700,
                            paddingTop: 6,
                            borderTop: "1px solid var(--border)",
                        }}
                    >
                        <span>Total</span>
                        <span>$29.00</span>
                    </div>
                </div>
                <div className="actions">
                    <button className="btn secondary">Back</button>
                    <button className="btn primary">Pay</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Confirm4 = () => (
    <Frame>
        <div className="backdrop">
            <div className="md" style={{ maxWidth: 250, textAlign: "center" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>🚀</div>
                <h3>Ship it?</h3>
                <p>All tests are passing. Deploy to production?</p>
                <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn secondary" style={{ flex: 1 }}>
                        Wait
                    </button>
                    <button className="btn primary" style={{ flex: 1 }}>
                        Deploy
                    </button>
                </div>
            </div>
        </div>
    </Frame>
);
const Confirm5 = () => (
    <Frame>
        <div className="backdrop">
            <div className="md" style={{ maxWidth: 260, padding: "18px 20px" }}>
                <h3>Enable 2FA?</h3>
                <p>Protect your account with an extra layer.</p>
                <label style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--fg-2)", marginBottom: 12 }}>
                    <input type="checkbox" defaultChecked />
                    Remember this decision for 30 days
                </label>
                <div className="actions">
                    <button className="btn ghost">Skip</button>
                    <button className="btn primary">Enable</button>
                </div>
            </div>
        </div>
    </Frame>
);
const Confirm6 = () => (
    <Frame>
        <div className="backdrop">
            <div
                className="md"
                style={{
                    maxWidth: 260,
                    background: "#0a0a08",
                    color: "#d4d0c8",
                    fontFamily: "JetBrains Mono,monospace",
                    border: "1px solid #2d2c28",
                }}
            >
                <div style={{ color: "var(--accent)", fontSize: 11, marginBottom: 8 }}>$ confirm --force</div>
                <p style={{ color: "#d4d0c8", fontSize: 11 }}>Overwrite local changes?</p>
                <div className="actions">
                    <button className="btn" style={{ background: "#2d2c28", color: "#d4d0c8", fontFamily: "inherit" }}>
                        [n] no
                    </button>
                    <button
                        className="btn"
                        style={{ background: "var(--accent)", color: "#0a0a08", fontFamily: "inherit" }}
                    >
                        [y] yes
                    </button>
                </div>
            </div>
        </div>
    </Frame>
);

/* =============== 04. BOTTOM SHEET =============== */
const Bs1 = () => (
    <Frame>
        <div className="bs-wrap">
            <div className="bs-back" />
            <div className="bs">
                <div className="handle" />
                <h3>Share</h3>
                <div className="item">
                    <i>✉</i>Email
                </div>
                <div className="item">
                    <i>💬</i>Messages
                </div>
                <div className="item">
                    <i>🔗</i>Copy link
                </div>
            </div>
        </div>
    </Frame>
);
const Bs2 = () => (
    <Frame>
        <div className="bs-wrap">
            <div className="bs-back" />
            <div className="bs">
                <div className="handle" />
                <h3 style={{ marginBottom: 4 }}>Sort by</h3>
                <p style={{ marginBottom: 10 }}>Choose an order for the list.</p>
                <div className="item" style={{ color: "var(--accent)", fontWeight: 600 }}>
                    <i style={{ background: "color-mix(in oklab, var(--accent) 20%, white)", color: "var(--accent)" }}>
                        ✓
                    </i>
                    Date, newest
                </div>
                <div className="item">
                    <i>↑</i>Name A-Z
                </div>
                <div className="item">
                    <i>★</i>Rating
                </div>
            </div>
        </div>
    </Frame>
);
const Bs3 = () => (
    <Frame>
        <div className="bs-wrap">
            <div className="bs-back" />
            <div className="bs" style={{ padding: 0 }}>
                <div className="handle" style={{ marginTop: 10 }} />
                <div style={{ padding: "0 16px 12px" }}>
                    <h3>Filter</h3>
                </div>
                <div
                    style={{
                        borderTop: "1px solid var(--border)",
                        padding: "10px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                    }}
                >
                    Price<span style={{ color: "var(--fg-3)" }}>$0—$500 ›</span>
                </div>
                <div
                    style={{
                        borderTop: "1px solid var(--border)",
                        padding: "10px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                    }}
                >
                    Category<span style={{ color: "var(--fg-3)" }}>All ›</span>
                </div>
                <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px", display: "flex", gap: 8 }}>
                    <button
                        style={{
                            flex: 1,
                            padding: 8,
                            background: "var(--bg-2)",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 11,
                        }}
                    >
                        Reset
                    </button>
                    <button
                        style={{
                            flex: 1,
                            padding: 8,
                            background: "var(--accent)",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 11,
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    </Frame>
);
const Bs4 = () => (
    <Frame>
        <div className="bs-wrap">
            <div className="bs-back" />
            <div className="bs" style={{ paddingBottom: 22 }}>
                <div className="handle" />
                <h3 style={{ textAlign: "center", fontSize: 13 }}>Aria Chen</h3>
                <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    <button
                        style={{
                            flex: 1,
                            padding: "8px",
                            background: "var(--bg-2)",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 11,
                        }}
                    >
                        Call
                    </button>
                    <button
                        style={{
                            flex: 1,
                            padding: "8px",
                            background: "var(--bg-2)",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 11,
                        }}
                    >
                        Text
                    </button>
                    <button
                        style={{
                            flex: 1,
                            padding: "8px",
                            background: "var(--bg-2)",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 11,
                        }}
                    >
                        Mail
                    </button>
                </div>
            </div>
        </div>
    </Frame>
);
const Bs5 = () => (
    <Frame>
        <div className="bs-wrap">
            <div className="bs-back" />
            <div className="bs" style={{ maxHeight: "80%", overflow: "auto" }}>
                <div className="handle" />
                <h3>Details</h3>
                <p style={{ fontSize: 11, color: "var(--fg-2)" }}>Expanded sheet with scrollable content.</p>
                <div style={{ height: 60, background: "var(--bg-2)", borderRadius: 4, marginBottom: 6 }} />
                <div style={{ height: 60, background: "var(--bg-2)", borderRadius: 4, marginBottom: 6 }} />
                <div style={{ height: 60, background: "var(--bg-2)", borderRadius: 4 }} />
            </div>
        </div>
    </Frame>
);
const Bs6 = () => (
    <Frame>
        <div className="bs-wrap">
            <div className="bs-back" />
            <div className="bs" style={{ background: "#0f0f0e", color: "#f5f3ef" }}>
                <div className="handle" style={{ background: "#3d3c38" }} />
                <h3 style={{ color: "#f5f3ef" }}>Now playing</h3>
                <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0" }}>
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 6,
                            background: "linear-gradient(135deg,#8a9bc4,#b8a99c)",
                        }}
                    />
                    <div style={{ flex: 1, fontSize: 11 }}>
                        <div style={{ color: "#f5f3ef", fontWeight: 600 }}>Track title</div>
                        <div style={{ color: "#a8a49c", fontSize: 10 }}>Artist name</div>
                    </div>
                    <button
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "var(--accent)",
                            color: "white",
                            border: "none",
                        }}
                    >
                        ▶
                    </button>
                </div>
            </div>
        </div>
    </Frame>
);

/* =============== 05. DRAWER =============== */
const Dr1 = () => (
    <Frame>
        <div className="dw-wrap">
            <div className="dw-back" />
            <div className="dw-r">
                <div className="dw-head">
                    <h3>Menu</h3>
                    <button className="x">×</button>
                </div>
                <nav className="dw-nav">
                    <a className="active">Dashboard</a>
                    <a>Projects</a>
                    <a>Team</a>
                    <a>Billing</a>
                    <a>Settings</a>
                </nav>
            </div>
        </div>
    </Frame>
);
const Dr2 = () => (
    <Frame>
        <div className="dw-wrap">
            <div className="dw-back" />
            <div className="dw-l">
                <div className="dw-head">
                    <h3>◆ Diamond</h3>
                    <button className="x">×</button>
                </div>
                <nav className="dw-nav">
                    <a>Home</a>
                    <a className="active">Library</a>
                    <a>History</a>
                    <a>Help</a>
                </nav>
            </div>
        </div>
    </Frame>
);
const Dr3 = () => (
    <Frame>
        <div className="dw-wrap">
            <div className="dw-back" />
            <div className="dw-t">
                <div className="dw-head">
                    <h3>Notifications</h3>
                    <button className="x">×</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11 }}>
                    <div style={{ padding: 8, background: "var(--bg-2)", borderRadius: 4 }}>New comment · 2m ago</div>
                    <div style={{ padding: 8, background: "var(--bg-2)", borderRadius: 4 }}>Build passed · 1h ago</div>
                </div>
            </div>
        </div>
    </Frame>
);
const Dr4 = () => (
    <Frame>
        <div className="dw-wrap">
            <div className="dw-back" />
            <div className="dw-r" style={{ width: "70%" }}>
                <div className="dw-head">
                    <h3>Edit note</h3>
                    <button className="x">×</button>
                </div>
                <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 6 }}>Title</div>
                <div
                    style={{
                        padding: "6px 8px",
                        border: "1px solid var(--border)",
                        borderRadius: 4,
                        fontSize: 12,
                        marginBottom: 8,
                    }}
                >
                    Ideas for Q4
                </div>
                <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 6 }}>Body</div>
                <div
                    style={{
                        padding: "6px 8px",
                        border: "1px solid var(--border)",
                        borderRadius: 4,
                        fontSize: 11,
                        minHeight: 50,
                        color: "var(--fg-2)",
                    }}
                >
                    Write here...
                </div>
                <button
                    style={{
                        marginTop: 10,
                        padding: "7px 14px",
                        background: "var(--accent)",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 11,
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    </Frame>
);
const Dr5 = () => (
    <Frame>
        <div className="dw-wrap">
            <div className="dw-back" />
            <div className="dw-r" style={{ width: "65%", background: "#0f0f0e", color: "#f5f3ef" }}>
                <div className="dw-head">
                    <h3 style={{ color: "#f5f3ef" }}>Cart · 2</h3>
                    <button className="x" style={{ color: "#a8a49c" }}>
                        ×
                    </button>
                </div>
                <div
                    style={{ display: "flex", gap: 8, padding: "8px 0", fontSize: 11, borderTop: "1px solid #2d2c28" }}
                >
                    <div style={{ width: 32, height: 32, borderRadius: 4, background: "#2d2c28" }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ color: "#f5f3ef" }}>Item A</div>
                        <div style={{ color: "#a8a49c", fontSize: 10 }}>$29</div>
                    </div>
                </div>
                <div
                    style={{ display: "flex", gap: 8, padding: "8px 0", fontSize: 11, borderTop: "1px solid #2d2c28" }}
                >
                    <div style={{ width: 32, height: 32, borderRadius: 4, background: "#2d2c28" }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ color: "#f5f3ef" }}>Item B</div>
                        <div style={{ color: "#a8a49c", fontSize: 10 }}>$49</div>
                    </div>
                </div>
                <button
                    style={{
                        marginTop: 10,
                        width: "100%",
                        padding: 10,
                        background: "var(--accent)",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                    }}
                >
                    Checkout · $78
                </button>
            </div>
        </div>
    </Frame>
);
const Dr6 = () => (
    <Frame>
        <div className="dw-wrap">
            <div className="dw-back" />
            <div className="dw-l" style={{ width: "50%", fontFamily: "JetBrains Mono,monospace" }}>
                <div className="dw-head">
                    <h3 style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, letterSpacing: "0.1em" }}>
                        FILES
                    </h3>
                    <button className="x">×</button>
                </div>
                <div style={{ fontSize: 10, color: "var(--fg-2)" }}>▸ src/</div>
                <div style={{ fontSize: 10, color: "var(--fg-2)", paddingLeft: 12 }}>▾ components/</div>
                <div style={{ fontSize: 10, paddingLeft: 24, color: "var(--accent)" }}>Modal.tsx</div>
                <div style={{ fontSize: 10, paddingLeft: 24 }}>Drawer.tsx</div>
                <div style={{ fontSize: 10, paddingLeft: 12 }}>▸ hooks/</div>
                <div style={{ fontSize: 10 }}>▸ public/</div>
            </div>
        </div>
    </Frame>
);

/* =============== 06. LIGHTBOX =============== */
const Lb1 = () => (
    <Frame>
        <div className="lb">
            <button className="close">×</button>
            <button className="arrow l">‹</button>
            <div className="img" />
            <button className="arrow r">›</button>
            <div className="counter">3 / 12</div>
        </div>
    </Frame>
);
const Lb2 = () => (
    <Frame>
        <div className="lb">
            <button className="close">×</button>
            <button className="arrow l">‹</button>
            <div className="img" />
            <button className="arrow r">›</button>
            <div className="caption">“Morning light, Tokyo” · 2026</div>
        </div>
    </Frame>
);
const Lb3 = () => (
    <Frame>
        <div className="lb" style={{ flexDirection: "column", gap: 8 }}>
            <div className="img" style={{ width: "55%", aspectRatio: "4/3" }} />
            <div className="thumbs">
                <span />
                <span />
                <span className="on" />
                <span />
                <span />
            </div>
            <button className="close">×</button>
        </div>
    </Frame>
);
const Lb4 = () => (
    <Frame>
        <div className="lb">
            <button className="close">×</button>
            <div className="img" />
            <div style={{ position: "absolute", top: 10, right: 44, display: "flex", gap: 6 }}>
                {["⤢", "↗", "⋯"].map((c) => (
                    <button
                        key={c}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.12)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 11,
                        }}
                    >
                        {c}
                    </button>
                ))}
            </div>
        </div>
    </Frame>
);
const Lb5 = () => (
    <Frame>
        <div className="lb" style={{ background: "rgba(0,0,0,0.98)" }}>
            <div style={{ position: "relative" }}>
                <div className="img" style={{ width: 160, aspectRatio: "16/9" }} />
                <div
                    style={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        right: 8,
                        height: 3,
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: 2,
                    }}
                >
                    <div style={{ width: "35%", height: "100%", background: "var(--accent)", borderRadius: 2 }} />
                </div>
                <button
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        border: "none",
                        fontSize: 12,
                    }}
                >
                    ▶
                </button>
            </div>
        </div>
    </Frame>
);
const Lb6 = () => (
    <Frame>
        <div className="lb" style={{ background: "#0a0a08" }}>
            <button className="close">×</button>
            <button className="arrow l">‹</button>
            <div className="img alt" />
            <button className="arrow r">›</button>
            <div
                style={{
                    position: "absolute",
                    bottom: 10,
                    left: 12,
                    color: "white",
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 9,
                    letterSpacing: "0.14em",
                }}
            >
                IMG_0432.RAW · f/2.8 · 1/250s · ISO 400
            </div>
        </div>
    </Frame>
);

/* =============== 07. POPCONFIRM =============== */
const Pc1 = () => (
    <div className="pc-host" style={{ paddingTop: 50 }}>
        <div className="pc">
            <div className="t">
                <span>⚠</span>Delete this item?
            </div>
            <div className="actions">
                <button className="no">No</button>
                <button className="yes">Yes</button>
            </div>
        </div>
        <button className="pc-btn danger">Delete</button>
    </div>
);
const Pc2 = () => (
    <div className="pc-host" style={{ paddingTop: 50 }}>
        <div className="pc">
            <div className="t">Unsubscribe from newsletter?</div>
            <div className="actions">
                <button className="no">Cancel</button>
                <button className="yes" style={{ background: "var(--accent)" }}>
                    Yes
                </button>
            </div>
        </div>
        <button className="pc-btn">Unsubscribe</button>
    </div>
);
const Pc3 = () => (
    <div className="pc-host" style={{ paddingTop: 60 }}>
        <div className="pc" style={{ width: 200 }}>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>Reset all?</div>
            <div className="t" style={{ color: "var(--fg-2)", marginTop: 0 }}>
                This will clear filters, sort order, and view options.
            </div>
            <div className="actions">
                <button className="no">No</button>
                <button className="yes">Reset</button>
            </div>
        </div>
        <button className="pc-btn">Reset filters</button>
    </div>
);
const Pc4 = () => (
    <div className="pc-host" style={{ paddingTop: 60 }}>
        <div className="pc" style={{ background: "#0f0f0e", color: "#f5f3ef" }}>
            <div className="t" style={{ color: "#f5f3ef" }}>
                <span style={{ color: "var(--warn)" }}>!</span>Overwrite file?
            </div>
            <div className="actions">
                <button className="no" style={{ color: "#a8a49c" }}>
                    No
                </button>
                <button className="yes">Yes</button>
            </div>
        </div>
        <button className="pc-btn" style={{ background: "#1f1f1d", color: "#d4d0c8", border: "1px solid #2d2c28" }}>
            Overwrite
        </button>
    </div>
);
const Pc5 = () => (
    <div className="pc-host" style={{ paddingTop: 60 }}>
        <div className="pc">
            <div className="t" style={{ alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>🗑</span>Delete
                <br />
                permanently?
            </div>
            <div className="actions">
                <button className="no">Keep</button>
                <button className="yes">Delete</button>
            </div>
        </div>
        <button className="pc-btn danger">Trash</button>
    </div>
);
const Pc6 = () => (
    <div className="pc-host" style={{ paddingTop: 66 }}>
        <div className="pc" style={{ width: 170, fontFamily: "JetBrains Mono,monospace" }}>
            <div className="t" style={{ fontSize: 10 }}>
                <span>!</span>git push --force?
            </div>
            <div className="actions">
                <button className="no">[n]</button>
                <button className="yes">[y]</button>
            </div>
        </div>
        <button className="pc-btn" style={{ fontFamily: "JetBrains Mono,monospace" }}>
            $ force-push
        </button>
    </div>
);

/* =============== 08. TOUR =============== */
const Tr1 = () => (
    <div className="tour-frame dim">
        <div className="ui">
            <div className="btn hi">＋ Create</div>
            <div className="btn">Import</div>
            <div className="btn">Share</div>
        </div>
        <div className="grid2">
            <div className="card">Project A</div>
            <div className="card">Project B</div>
        </div>
        <div className="tour-pop" style={{ top: 44, left: 10 }}>
            <div className="hdr">
                <span className="step">STEP 1 / 4</span>
                <button className="x">×</button>
            </div>
            <h4>Create a project</h4>
            <p>Start by naming your first project. Everything lives inside it.</p>
            <div className="actions">
                <div className="dots">
                    <span className="on" />
                    <span />
                    <span />
                    <span />
                </div>
                <button>Next →</button>
            </div>
        </div>
    </div>
);
const Tr2 = () => (
    <div className="tour-frame dim">
        <div className="ui">
            <div className="btn">Create</div>
            <div className="btn hi">↓ Import</div>
            <div className="btn">Share</div>
        </div>
        <div className="grid2">
            <div className="card">Project A</div>
            <div className="card">Project B</div>
        </div>
        <div className="tour-pop" style={{ top: 44, left: 80 }}>
            <div className="hdr">
                <span className="step">STEP 2 / 4</span>
                <button className="x">×</button>
            </div>
            <h4>Import existing work</h4>
            <p>Drop in files from Figma, Notion, or a folder.</p>
            <div className="actions">
                <div className="dots">
                    <span />
                    <span className="on" />
                    <span />
                    <span />
                </div>
                <button>Next →</button>
            </div>
        </div>
    </div>
);
const Tr3 = () => (
    <div className="tour-frame dim">
        <div className="ui">
            <div className="btn">Create</div>
            <div className="btn">Import</div>
            <div className="btn">Share</div>
        </div>
        <div className="grid2">
            <div className="card hi">Project A</div>
            <div className="card">Project B</div>
        </div>
        <div className="tour-pop" style={{ bottom: 14, right: 14, background: "var(--fg)", color: "var(--bg)" }}>
            <div className="hdr">
                <span className="step" style={{ color: "var(--accent)" }}>
                    TIP · 3 / 4
                </span>
                <button className="x" style={{ color: "var(--bg)" }}>
                    ×
                </button>
            </div>
            <h4 style={{ color: "var(--bg)" }}>Click a card to open</h4>
            <p style={{ color: "#c4bfb3" }}>Or drag to reorder them.</p>
            <div className="actions">
                <div className="dots">
                    <span />
                    <span />
                    <span className="on" />
                    <span />
                </div>
                <button style={{ background: "var(--bg)", color: "var(--fg)" }}>Got it</button>
            </div>
        </div>
    </div>
);
const Tr4 = () => (
    <div className="tour-frame dim">
        <div className="ui">
            <div className="btn">Create</div>
            <div className="btn">Import</div>
            <div className="btn hi">⇪ Share</div>
        </div>
        <div className="grid2">
            <div className="card">Project A</div>
            <div className="card">Project B</div>
        </div>
        <div className="tour-pop" style={{ top: 44, right: 10, background: "var(--accent)", color: "white" }}>
            <div className="hdr">
                <span className="step" style={{ color: "white", opacity: 0.8 }}>
                    4 / 4 · FINAL
                </span>
                <button className="x" style={{ color: "white" }}>
                    ×
                </button>
            </div>
            <h4 style={{ color: "white" }}>Share with anyone</h4>
            <p style={{ color: "rgba(255,255,255,0.85)" }}>One link, access control, analytics.</p>
            <div className="actions">
                <div className="dots">
                    <span style={{ background: "rgba(255,255,255,0.3)" }} />
                    <span style={{ background: "rgba(255,255,255,0.3)" }} />
                    <span style={{ background: "rgba(255,255,255,0.3)" }} />
                    <span className="on" style={{ background: "white" }} />
                </div>
                <button style={{ background: "white", color: "var(--accent)" }}>Finish</button>
            </div>
        </div>
    </div>
);
const Tr5 = () => (
    <div className="tour-frame">
        <div className="ui">
            <div className="btn">Home</div>
            <div className="btn hi" style={{ position: "relative" }}>
                Inbox
                <span
                    style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: "var(--danger)",
                        color: "white",
                        fontSize: 9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: "pulse 1.5s infinite",
                        fontWeight: 700,
                    }}
                >
                    1
                </span>
            </div>
            <div className="btn">Profile</div>
        </div>
        <div className="grid2">
            <div className="card">Recent</div>
            <div className="card">Drafts</div>
        </div>
        <div className="tour-pop" style={{ top: 44, left: 44, border: "1px solid var(--accent)" }}>
            <div className="hdr">
                <span className="step">NEW</span>
                <button className="x">×</button>
            </div>
            <h4>Inbox is new!</h4>
            <p>We added a shared team inbox here. The dot shows what's fresh.</p>
            <div className="actions">
                <div className="dots">
                    <span className="on" />
                </div>
                <button>Dismiss</button>
            </div>
        </div>
    </div>
);
const Tr6 = () => (
    <div className="tour-frame dim">
        <div className="ui">
            <div className="btn">Home</div>
            <div className="btn">Inbox</div>
            <div className="btn">Profile</div>
        </div>
        <div className="grid2">
            <div className="card hi">Recent</div>
            <div className="card">Drafts</div>
        </div>
        <div
            style={{
                position: "absolute",
                top: 58,
                left: 18,
                width: 72,
                height: 52,
                border: "2px dashed var(--accent)",
                borderRadius: 8,
                zIndex: 3,
                pointerEvents: "none",
            }}
        />
        <div className="tour-pop" style={{ top: 72, left: 110 }}>
            <div className="hdr">
                <span className="step">SPOTLIGHT</span>
                <button className="x">×</button>
            </div>
            <h4>Focus your attention</h4>
            <p>Dashed ring frames the target; popover explains it.</p>
            <div className="actions">
                <div className="dots">
                    <span />
                    <span className="on" />
                    <span />
                </div>
                <button>Next →</button>
            </div>
        </div>
    </div>
);

/* =============== 09. COOKIE =============== */
const Ck1 = () => (
    <div className="cookie-frame">
        <div className="app">
            <div style={{ height: 6, background: "var(--border)", borderRadius: 2, width: "60%" }} />
            <div style={{ height: 6, background: "var(--border)", borderRadius: 2, width: "40%" }} />
        </div>
        <div
            style={{
                background: "var(--surface)",
                borderRadius: 8,
                padding: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                fontSize: 11,
                position: "relative",
                zIndex: 1,
            }}
        >
            <div style={{ marginBottom: 8, color: "var(--fg-2)" }}>
                We use cookies to improve your experience.{" "}
                <a href="#" style={{ color: "var(--accent)" }}>
                    Learn more
                </a>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
                <button
                    style={{
                        flex: 1,
                        padding: 6,
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        borderRadius: 4,
                        fontSize: 11,
                        cursor: "pointer",
                    }}
                >
                    Decline
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: 6,
                        background: "var(--accent)",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 11,
                        cursor: "pointer",
                    }}
                >
                    Accept
                </button>
            </div>
        </div>
    </div>
);
const Ck2 = () => (
    <div className="cookie-frame">
        <div className="app">
            <div style={{ height: 6, background: "var(--border)", borderRadius: 2, width: "60%" }} />
        </div>
        <div
            style={{
                background: "var(--fg)",
                color: "var(--bg)",
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 11,
                position: "relative",
                zIndex: 1,
                display: "flex",
                gap: 8,
                alignItems: "center",
            }}
        >
            <span style={{ flex: 1 }}>🍪 Cookies make this site work.</span>
            <button
                style={{
                    padding: "5px 12px",
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 11,
                    cursor: "pointer",
                }}
            >
                OK
            </button>
        </div>
    </div>
);
const Ck3 = () => (
    <div className="cookie-frame">
        <div className="app">
            <div style={{ height: 6, background: "var(--border)", borderRadius: 2, width: "60%" }} />
        </div>
        <div
            style={{
                background: "var(--surface)",
                borderRadius: 8,
                padding: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                fontSize: 11,
                position: "relative",
                zIndex: 1,
            }}
        >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Cookie preferences</div>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                Essential<span style={{ color: "var(--fg-3)" }}>Required</span>
            </label>
            <label style={{ display: "flex", gap: 6, fontSize: 10, marginBottom: 4 }}>
                <input type="checkbox" defaultChecked />
                Analytics
            </label>
            <label style={{ display: "flex", gap: 6, fontSize: 10, marginBottom: 8 }}>
                <input type="checkbox" />
                Marketing
            </label>
            <div style={{ display: "flex", gap: 6 }}>
                <button
                    style={{
                        flex: 1,
                        padding: 5,
                        background: "var(--bg-2)",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 10,
                    }}
                >
                    Reject
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: 5,
                        background: "var(--accent)",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 10,
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    </div>
);
const Ck4 = () => (
    <div className="cookie-frame">
        <div className="app">
            <div style={{ height: 6, background: "var(--border)", borderRadius: 2, width: "60%" }} />
        </div>
        <div
            style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                background: "var(--surface)",
                borderRadius: 12,
                padding: "10px 12px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                fontSize: 10,
                maxWidth: 160,
                border: "1px solid var(--border)",
            }}
        >
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>🍪</span>
                <b style={{ fontSize: 11 }}>Sweet!</b>
            </div>
            <div style={{ color: "var(--fg-2)", marginBottom: 8 }}>Just a few cookies to make the site tasty.</div>
            <button
                style={{
                    width: "100%",
                    padding: 5,
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 10,
                }}
            >
                Accept all
            </button>
        </div>
    </div>
);
const Ck5 = () => (
    <div className="cookie-frame">
        <div className="app">
            <div style={{ height: 6, background: "var(--border)", borderRadius: 2, width: "60%" }} />
        </div>
        <div
            style={{
                background: "#0a0a08",
                color: "#d4d0c8",
                borderRadius: 4,
                padding: 10,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                position: "relative",
                zIndex: 1,
                border: "1px solid #2d2c28",
            }}
        >
            <div style={{ color: "var(--accent)", marginBottom: 4 }}>$ cookies --ask</div>
            <div style={{ marginBottom: 6 }}>Allow analytics? [y/n]</div>
            <div style={{ display: "flex", gap: 6 }}>
                <button
                    style={{
                        padding: "4px 10px",
                        background: "#2d2c28",
                        color: "#d4d0c8",
                        border: "none",
                        borderRadius: 2,
                        fontSize: 10,
                        fontFamily: "inherit",
                    }}
                >
                    [n]
                </button>
                <button
                    style={{
                        padding: "4px 10px",
                        background: "var(--accent)",
                        color: "#0a0a08",
                        border: "none",
                        borderRadius: 2,
                        fontSize: 10,
                        fontFamily: "inherit",
                    }}
                >
                    [y]
                </button>
            </div>
        </div>
    </div>
);
const Ck6 = () => (
    <div className="cookie-frame">
        <div className="app">
            <div style={{ height: 6, background: "var(--border)", borderRadius: 2, width: "60%" }} />
        </div>
        <div
            style={{
                background: "var(--surface)",
                borderRadius: 12,
                padding: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                fontSize: 11,
                position: "relative",
                zIndex: 1,
                borderTop: "3px solid var(--accent)",
            }}
        >
            <div style={{ fontFamily: "Fraunces,serif", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                A small note.
            </div>
            <div style={{ fontSize: 10, color: "var(--fg-2)", marginBottom: 8, fontStyle: "italic" }}>
                We use minimal cookies, only where needed.
            </div>
            <div style={{ display: "flex", gap: 6 }}>
                <button
                    style={{
                        flex: 1,
                        padding: 6,
                        background: "transparent",
                        border: "1px solid var(--border)",
                        borderRadius: 6,
                        fontSize: 10,
                    }}
                >
                    Customize
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: 6,
                        background: "var(--fg)",
                        color: "var(--bg)",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 10,
                    }}
                >
                    Continue
                </button>
            </div>
        </div>
    </div>
);

window.CATEGORIES = [
    {
        n: "Modal / Dialog",
        k: "md",
        desc: "Floating window over backdrop",
        notes: [
            "Standard with form",
            "Success confirmation",
            "Dark cinematic",
            "Header + footer scroll",
            "Editorial left-rail",
            "Brutalist hard-shadow",
        ],
        v: [Modal1, Modal2, Modal3, Modal4, Modal5, Modal6],
    },
    {
        n: "Alert Dialog",
        k: "al",
        desc: "Urgent interruption",
        notes: [
            "Destructive delete",
            "Unsaved changes warn",
            "Left-rail danger",
            "Dark critical",
            "Mono error code",
            "Floating danger icon",
        ],
        v: [Alert1, Alert2, Alert3, Alert4, Alert5, Alert6],
    },
    {
        n: "Confirm Dialog",
        k: "cf",
        desc: "Ask before proceeding",
        notes: [
            "Archive simple",
            "Icon + subtitle",
            "Purchase summary",
            "Emoji deploy",
            "With persistence checkbox",
            "Terminal confirm",
        ],
        v: [Confirm1, Confirm2, Confirm3, Confirm4, Confirm5, Confirm6],
    },
    {
        n: "Bottom Sheet",
        k: "bs",
        desc: "Panel anchored to bottom",
        notes: [
            "Share actions",
            "Sort with selection",
            "Grouped settings",
            "Quick contact",
            "Scrollable detail",
            "Media now-playing",
        ],
        v: [Bs1, Bs2, Bs3, Bs4, Bs5, Bs6],
    },
    {
        n: "Drawer",
        k: "dr",
        desc: "Panel sliding from edge",
        notes: [
            "Right nav menu",
            "Left sidebar",
            "Top notifications",
            "Right edit panel",
            "Right cart dark",
            "Left file tree mono",
        ],
        v: [Dr1, Dr2, Dr3, Dr4, Dr5, Dr6],
    },
    {
        n: "Lightbox",
        k: "lb",
        desc: "Full-screen media viewer",
        notes: [
            "Counter + arrows",
            "With caption",
            "Thumbnail strip",
            "Action toolbar",
            "Video with scrubber",
            "EXIF metadata",
        ],
        v: [Lb1, Lb2, Lb3, Lb4, Lb5, Lb6],
    },
    {
        n: "Popconfirm",
        k: "pc",
        desc: "Inline confirm tooltip",
        notes: ["Quick yes/no", "Accent variant", "Titled detailed", "Dark mini", "Emoji delete", "Terminal style"],
        v: [Pc1, Pc2, Pc3, Pc4, Pc5, Pc6],
    },
    {
        n: "Tour / Onboarding",
        k: "tr",
        desc: "Spotlight UI features",
        notes: [
            "Step 1 · primary action",
            "Step 2 · import",
            "Dark tip on card",
            "Accent final step",
            "New-feature ping",
            "Spotlight circle",
        ],
        v: [Tr1, Tr2, Tr3, Tr4, Tr5, Tr6],
    },
    {
        n: "Cookie Banner",
        k: "ck",
        desc: "Privacy consent",
        notes: [
            "Classic bottom bar",
            "Inverted slim",
            "Granular preferences",
            "Corner chip",
            "Terminal prompt",
            "Editorial note",
        ],
        v: [Ck1, Ck2, Ck3, Ck4, Ck5, Ck6],
    },
];
