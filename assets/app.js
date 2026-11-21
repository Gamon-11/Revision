/* Révisions : rendu des pages à partir de assets/data.js */
(function () {
  "use strict";
  var SITE = window.SITE;
  var body = document.body;
  var page = body.dataset.page;

  /* ---------- utilitaires ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { return null; }
  }
  function findUv(id) { return SITE.uvs.filter(function (u) { return u.id === id; })[0]; }
  function findSection(uv, id) { return (uv.sections || []).filter(function (s) { return s.id === id; })[0]; }
  function allItems(section) {
    var out = [];
    (section.groupes || []).forEach(function (g) { g.items.forEach(function (it) { out.push(it); }); });
    return out;
  }
  var TYPES = { atelier: "Atelier", fiche: "Fiche", corrige: "Corrigé" };
  function itemHref(it) { return it.type === "atelier" ? it.href : "/fiche.html?src=" + encodeURIComponent(it.src); }

  /* ---------- thème clair / sombre ---------- */
  var saved = store("rv-theme");
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
  function currentTheme() {
    var t = document.documentElement.dataset.theme;
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /* ---------- en-tête ---------- */
  function header(crumbs) {
    var h = document.getElementById("top");
    if (!h) return;
    var c = crumbs.map(function (x, i) {
      var last = i === crumbs.length - 1;
      return (i ? '<span class="sep">/</span>' : "") +
        (last ? '<span class="here">' + esc(x[0]) + "</span>" : '<a href="' + x[1] + '">' + esc(x[0]) + "</a>");
    }).join("");
    h.className = "top";
    h.innerHTML = '<div class="wrap"><a class="brand" href="/"><span class="logo" aria-hidden="true">R</span>' + esc(SITE.titre) + "</a>" +
      '<nav class="crumbs" aria-label="Fil d\'Ariane">' + c + '</nav><span class="spacer"></span>' +
      '<button class="icon-btn" id="theme" type="button" aria-label="Changer de thème"></button></div>';
    var b = document.getElementById("theme");
    function paint() { b.textContent = currentTheme() === "dark" ? "☀" : "☾"; }
    paint();
    b.onclick = function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      store("rv-theme", next);
      paint();
    };
  }

  function footer() {
    var f = document.getElementById("foot");
    if (f) f.innerHTML = '<div class="wrap">Site de révision personnel. Les ateliers marchent aussi hors ligne une fois chargés.</div>';
  }

  /* ---------- accueil ---------- */
  function renderHome() {
    header([]);
    document.getElementById("hero-title").textContent = SITE.titre;
    document.getElementById("hero-lead").textContent = SITE.sousTitre;
    var g = document.getElementById("uvs");
    g.innerHTML = SITE.uvs.map(function (uv) {
      var n = 0;
      (uv.sections || []).forEach(function (s) { n += allItems(s).length; });
      return '<a class="card uv-card" style="--uv:' + esc(uv.couleur || "") + '" href="/' + esc(uv.id) + '">' +
        '<span class="code">' + esc(uv.code) + "</span><h3>" + esc(uv.nom) + "</h3><p>" + esc(uv.resume) + "</p>" +
        '<div class="meta"><span class="chip">' + (uv.sections || []).length + " section" + ((uv.sections || []).length > 1 ? "s" : "") +
        '</span><span class="chip">' + n + " ressources</span>" + (uv.examen ? '<span class="chip tag">' + esc(uv.examen) + "</span>" : "") + "</div></a>";
    }).join("") +
      '<div class="card uv-card soon"><span class="code">+</span><h3>Autre UV</h3><p>Ajoute une entrée dans <code>assets/data.js</code> et un dossier à son nom.</p></div>';
  }

  /* ---------- page UV ---------- */
  function renderUv() {
    var uv = findUv(body.dataset.uv);
    header([[uv.code, "/" + uv.id]]);
    var box = document.getElementById("sections");
    var secs = uv.sections || [];
    box.innerHTML = secs.map(function (s) {
      var items = allItems(s);
      var nA = items.filter(function (i) { return i.type === "atelier"; }).length;
      var nF = items.length - nA;
      return '<a class="card" href="/' + esc(uv.id) + "/" + esc(s.id) + '"><h3>' + esc(s.titre) + "</h3><p>" + esc(s.resume) + "</p>" +
        '<div class="meta"><span class="chip atelier">' + nA + " ateliers</span>" + '<span class="chip fiche">' + nF + " fiches et corrigés</span></div></a>";
    }).join("") +
      '<div class="card uv-card soon" style="border-top-width:1px"><h3>Prochaine section</h3><p>PPC (GNU-Prolog), PLNE… à ajouter quand tu auras le nom des parties.</p></div>';
    var cnt = document.getElementById("sections-count");
    if (cnt) cnt.textContent = secs.length + " section" + (secs.length > 1 ? "s" : "");
    initChecklist(uv.id);
  }

  function initChecklist(uvId) {
    var boxes = document.querySelectorAll(".prio input[type=checkbox]");
    if (!boxes.length) return;
    var key = "rv-check-" + uvId;
    var state = {};
    try { state = JSON.parse(store(key) || "{}") || {}; } catch (e) { state = {}; }
    var bar = document.querySelector(".progress span");
    var lbl = document.getElementById("progress-label");
    function update() {
      var done = 0;
      boxes.forEach(function (b) { b.closest("li").classList.toggle("done", b.checked); if (b.checked) done++; });
      if (bar) bar.style.width = (100 * done / boxes.length) + "%";
      if (lbl) lbl.textContent = done + " / " + boxes.length + " maîtrisés";
    }
    boxes.forEach(function (b) {
      b.checked = !!state[b.id];
      b.addEventListener("change", function () { state[b.id] = b.checked; store(key, JSON.stringify(state)); update(); });
    });
    update();
  }

  /* ---------- page section ---------- */
  function renderSection() {
    var uv = findUv(body.dataset.uv);
    var s = findSection(uv, body.dataset.section);
    document.title = s.titre + " · " + uv.code;
    header([[uv.code, "/" + uv.id], [s.titre, ""]]);
    document.getElementById("kicker").textContent = uv.code + " · section";
    document.getElementById("hero-title").textContent = s.titre;
    document.getElementById("hero-lead").textContent = s.resume;

    var filter = store("rv-filter") || "tout";
    var q = "";
    var fbox = document.getElementById("filters");
    var opts = [["tout", "Tout"], ["atelier", "Ateliers"], ["fiche", "Fiches"], ["corrige", "Corrigés"]];
    fbox.innerHTML = opts.map(function (o) { return '<button type="button" data-f="' + o[0] + '">' + o[1] + "</button>"; }).join("") +
      '<input type="search" id="q" placeholder="Chercher (ex. Fletcher, A15, ratio)…" aria-label="Chercher une ressource">';

    function card(it) {
      var tags = (it.tags || []).map(function (t) { return '<span class="chip tag">' + esc(t) + "</span>"; }).join("");
      return '<a class="card" href="' + esc(itemHref(it)) + '"><div><span class="chip ' + it.type + '">' + TYPES[it.type] + "</span></div>" +
        "<h3>" + esc(it.titre) + "</h3><p>" + esc(it.resume) + '</p><div class="meta">' + tags + "</div></a>";
    }
    function draw() {
      fbox.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.f === filter); });
      var out = "";
      var total = 0;
      (s.groupes || []).forEach(function (g) {
        var items = g.items.filter(function (it) {
          if (filter !== "tout" && it.type !== filter) return false;
          if (!q) return true;
          var hay = (it.titre + " " + it.resume + " " + (it.tags || []).join(" ") + " " + g.titre).toLowerCase();
          return hay.indexOf(q) !== -1;
        });
        if (!items.length) return;
        total += items.length;
        out += '<h2 class="section-title">' + esc(g.titre) + '<span class="count">' + items.length + '</span></h2>' + (g.resume ? '<p class="group-lead">' + esc(g.resume) + '</p>' : '') + '<div class="grid">' + items.map(card).join("") + "</div>";
      });
      document.getElementById("groups").innerHTML = out || '<p class="empty">Rien ne correspond à cette recherche.</p>';
    }
    fbox.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      filter = b.dataset.f;
      store("rv-filter", filter);
      draw();
    });
    document.getElementById("q").addEventListener("input", function (e) { q = e.target.value.trim().toLowerCase(); draw(); });
    draw();
  }

  /* ---------- fiche Markdown ---------- */
  function locateItem(src) {
    var found = null;
    SITE.uvs.forEach(function (uv) {
      (uv.sections || []).forEach(function (s) {
        allItems(s).forEach(function (it) { if (it.src === src) found = { uv: uv, s: s, it: it }; });
      });
    });
    return found;
  }
  function slug(t) {
    return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function renderFiche() {
    var src = new URLSearchParams(location.search).get("src") || "";
    var loc = locateItem(src);
    var out = document.getElementById("doc");
    if (!loc || !/^\/[\w\-\/]+\.md$/.test(src)) {
      header([["Fiche introuvable", ""]]);
      out.innerHTML = '<div class="err">Cette fiche n\'existe pas (ou n\'est pas déclarée dans <code>assets/data.js</code>). <a href="/">Retour à l\'accueil</a>.</div>';
      return;
    }
    header([[loc.uv.code, "/" + loc.uv.id], [loc.s.titre, "/" + loc.uv.id + "/" + loc.s.id], [loc.it.titre, ""]]);
    document.title = loc.it.titre + " · " + loc.uv.code;
    fetch(src).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (md) {
      var html = window.marked.parse(md, { gfm: true });
      out.innerHTML = '<div class="doc-actions"><span class="chip ' + loc.it.type + '">' + TYPES[loc.it.type] + "</span>" +
        '<a class="chip tag" href="/' + loc.uv.id + "/" + loc.s.id + '">← ' + esc(loc.s.titre) + "</a>" +
        '<a class="chip tag" href="' + esc(src) + '" download>Télécharger le .md</a></div>' + html;
      out.querySelectorAll("table").forEach(function (t) {
        var w = document.createElement("div");
        w.className = "tbl";
        t.parentNode.insertBefore(w, t);
        w.appendChild(t);
      });
      out.querySelectorAll("pre > code.language-latex, pre > code.language-math, pre > code.language-tex").forEach(function (c) {
        var div = document.createElement("div");
        div.className = "math";
        try { window.katex.render(c.textContent, div, { displayMode: true, throwOnError: false }); }
        catch (e) { div.textContent = c.textContent; }
        c.parentNode.replaceWith(div);
      });
      var toc = document.getElementById("toc");
      var hs = out.querySelectorAll("h2");
      var links = [];
      hs.forEach(function (h) { h.id = slug(h.textContent); links.push('<a href="#' + h.id + '">' + esc(h.textContent) + "</a>"); });
      if (toc && links.length) {
        toc.innerHTML = '<div class="lbl">Sommaire</div>' + links.join("");
        if ("IntersectionObserver" in window) {
          var as = toc.querySelectorAll("a");
          var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) {
              if (!e.isIntersecting) return;
              as.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
            });
          }, { rootMargin: "-80px 0px -70% 0px" });
          hs.forEach(function (h) { io.observe(h); });
        }
      }
      if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
    }).catch(function () {
      out.innerHTML = '<div class="err">Impossible de charger la fiche. Si tu as ouvert le fichier directement depuis le disque, lance plutôt un petit serveur : <code>npx serve .</code></div>';
    });
  }

  if (page === "home") renderHome();
  else if (page === "uv") renderUv();
  else if (page === "section") renderSection();
  else if (page === "fiche") renderFiche();
  else header([]);
  footer();
})();
