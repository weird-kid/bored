/* ==========================================================================
   concept-map.js — tiny dependency-free force-directed graph on <canvas>.
   Nodes repel, links act as springs, so the whole thing swings when you drag
   a node and settles again. Data comes from window.CONCEPT_MAP_DATA (see
   map.html) so the graph is easy to edit without touching this engine.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.CONCEPT_MAP_DATA;
  var canvas = document.getElementById("concept-map");
  if (!data || !canvas) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.max(1, window.devicePixelRatio || 1);
  var W = 0, H = 0;                 // CSS pixels of the drawing area

  // --- Physics tuning ------------------------------------------------------
  var REPULSION   = 9000;          // node-node push strength
  var SPRING_LEN  = 128;           // preferred link length
  var SPRING_K    = 0.035;         // link stiffness
  var GRAVITY     = 0.010;         // pull toward each cluster's anchor
  var DAMPING     = 0.90;          // velocity friction (1 = none)
  var MAX_SPEED   = 22;

  // --- Build node/link objects --------------------------------------------
  var nodes = data.nodes.map(function (n) {
    return { id: n.id, label: n.label, group: n.group,
             x: 0, y: 0, vx: 0, vy: 0, r: 0, w: 0, h: 0, fixed: false };
  });
  var byId = {};
  nodes.forEach(function (n) { byId[n.id] = n; });
  var links = data.links
    .map(function (l) { return { a: byId[l[0]], b: byId[l[1]] }; })
    .filter(function (l) { return l.a && l.b; });

  // Cluster anchors: groups drift to opposite sides so the two structures
  // stay legible instead of tangling together.
  function anchorFor(group) {
    return group === "slab"
      ? { x: W * 0.30, y: H * 0.5 }
      : { x: W * 0.70, y: H * 0.5 };
  }

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (v && v.trim()) || fallback;
  }
  var colors = {};
  function refreshColors() {
    colors.slab = cssVar("--grp-slab", "#d97706");
    colors.proc = cssVar("--grp-proc", "#2563eb");
    colors.edge = cssVar("--graph-edge", "#c9c3b4");
    colors.bg   = cssVar("--graph-bg", "#ffffff");
    colors.fg   = cssVar("--fg", "#20242a");
  }

  function groupColor(g) { return g === "slab" ? colors.slab : colors.proc; }

  // --- Layout / sizing -----------------------------------------------------
  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    measureNodes();
  }

  function measureNodes() {
    ctx.font = "600 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    nodes.forEach(function (n) {
      var tw = ctx.measureText(n.label).width;
      n.w = tw + 26;
      n.h = 30;
      n.r = n.h / 2;               // used for hit-testing / repulsion radius
    });
  }

  function seed() {
    nodes.forEach(function (n) {
      var a = anchorFor(n.group);
      n.x = a.x + (Math.random() - 0.5) * 120;
      n.y = a.y + (Math.random() - 0.5) * 160;
      n.vx = (Math.random() - 0.5) * 6;
      n.vy = (Math.random() - 0.5) * 6;
      n.fixed = false;
    });
  }

  // --- Simulation step -----------------------------------------------------
  function step() {
    var i, j, a, b, dx, dy, d2, d, f;

    // Repulsion between every pair of nodes.
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j];
        dx = a.x - b.x;
        dy = a.y - b.y;
        d2 = dx * dx + dy * dy || 0.01;
        d = Math.sqrt(d2);
        f = REPULSION / d2;
        var ux = dx / d, uy = dy / d;
        a.vx += ux * f; a.vy += uy * f;
        b.vx -= ux * f; b.vy -= uy * f;
      }
    }

    // Springs along links.
    links.forEach(function (l) {
      a = l.a; b = l.b;
      dx = b.x - a.x;
      dy = b.y - a.y;
      d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      f = (d - SPRING_LEN) * SPRING_K;
      var ux = dx / d, uy = dy / d;
      a.vx += ux * f; a.vy += uy * f;
      b.vx -= ux * f; b.vy -= uy * f;
    });

    // Gravity toward the cluster anchor keeps things on-screen & grouped.
    nodes.forEach(function (n) {
      var anc = anchorFor(n.group);
      n.vx += (anc.x - n.x) * GRAVITY;
      n.vy += (anc.y - n.y) * GRAVITY;
    });

    // Integrate + walls.
    nodes.forEach(function (n) {
      if (n.fixed) { n.vx = 0; n.vy = 0; return; }
      n.vx *= DAMPING;
      n.vy *= DAMPING;
      var sp = Math.hypot(n.vx, n.vy);
      if (sp > MAX_SPEED) { n.vx = n.vx / sp * MAX_SPEED; n.vy = n.vy / sp * MAX_SPEED; }
      n.x += n.vx;
      n.y += n.vy;

      var pad = n.w / 2 + 4;
      if (n.x < pad)     { n.x = pad;     n.vx = Math.abs(n.vx) * 0.6; }
      if (n.x > W - pad) { n.x = W - pad; n.vx = -Math.abs(n.vx) * 0.6; }
      var pv = n.h / 2 + 4;
      if (n.y < pv)      { n.y = pv;      n.vy = Math.abs(n.vy) * 0.6; }
      if (n.y > H - pv)  { n.y = H - pv;  n.vy = -Math.abs(n.vy) * 0.6; }
    });
  }

  // --- Render --------------------------------------------------------------
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Edges.
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = colors.edge;
    links.forEach(function (l) {
      ctx.beginPath();
      ctx.moveTo(l.a.x, l.a.y);
      ctx.lineTo(l.b.x, l.b.y);
      ctx.stroke();
    });

    // Nodes.
    ctx.font = "600 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    nodes.forEach(function (n) {
      var c = groupColor(n.group);
      var x = n.x - n.w / 2, y = n.y - n.h / 2;
      roundRect(x, y, n.w, n.h, n.h / 2);
      ctx.fillStyle = colors.bg;
      ctx.fill();
      ctx.globalAlpha = 0.14;
      ctx.fillStyle = c;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = n === hover || n === dragging ? 2.5 : 1.5;
      ctx.strokeStyle = c;
      ctx.stroke();
      ctx.fillStyle = colors.fg;
      ctx.fillText(n.label, n.x, n.y + 0.5);
    });
  }

  // --- Main loop -----------------------------------------------------------
  function tick() {
    step();
    draw();
    requestAnimationFrame(tick);
  }

  // --- Pointer interaction -------------------------------------------------
  var dragging = null, hover = null;
  var last = { x: 0, y: 0 };

  function pointerPos(e) {
    var rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function nodeAt(p) {
    for (var i = nodes.length - 1; i >= 0; i--) {
      var n = nodes[i];
      if (Math.abs(p.x - n.x) <= n.w / 2 && Math.abs(p.y - n.y) <= n.h / 2) return n;
    }
    return null;
  }

  canvas.addEventListener("pointerdown", function (e) {
    var p = pointerPos(e);
    dragging = nodeAt(p);
    if (dragging) {
      dragging.fixed = true;
      last = p;
      canvas.setPointerCapture(e.pointerId);
    }
  });

  canvas.addEventListener("pointermove", function (e) {
    var p = pointerPos(e);
    if (dragging) {
      dragging.x = p.x;
      dragging.y = p.y;
      last = p;
    } else {
      hover = nodeAt(p);
      canvas.style.cursor = hover ? "grab" : "default";
    }
  });

  function endDrag(e) {
    if (!dragging) return;
    // Hand back the velocity of the throw so the node (and its neighbours) swing.
    var p = pointerPos(e);
    dragging.vx = (p.x - last.x);
    dragging.vy = (p.y - last.y);
    dragging.fixed = false;
    dragging = null;
  }
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  // --- Wire up -------------------------------------------------------------
  var resetBtn = document.getElementById("concept-map-reset");
  if (resetBtn) resetBtn.addEventListener("click", seed);

  window.addEventListener("resize", function () {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    resize();
  });

  refreshColors();
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", refreshColors);
  }
  resize();
  seed();
  tick();
})();
