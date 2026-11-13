<script>
(function () {
  var KEY = 'hisaab-kitaab-v1';
  var LKEY = 'hisaab-kitaab-lang';
  var WHEEL = ['#0B6B4D', '#C2410C', '#1D4ED8', '#A21CAF', '#B45309', '#0E7490', '#BE123C', '#4D7C0F'];

  var T = {
    en: {
      tag: 'Split the bill with friends. Everyone pays only for what they ate, and the spinner picks who pays today.',
      stamp: 'All amounts in PKR',
      banner: 'This is example data. Clear it first to enter your own bill.',
      clear: 'Clear',
      hFriends: 'Friends',
      friendPh: "Friend's name",
      add: 'Add',
      hItems: 'Bill items',
      itemPh: 'Item (e.g. Karahi)',
      itemNameAria: 'Item name',
      priceAria: 'Price in Rs',
      itemHint: 'Select who ate each item. If more than one person is selected, the price is split equally.',
      tax: 'Tax %',
      extra: 'Tip or delivery (Rs)',
      hResult: 'Split',
      payerLbl: 'Who paid the bill?',
      copy: 'Copy for WhatsApp',
      copyBoxAria: 'Split summary text',
      hWheel: 'Who pays today?',
      wheelMsg: 'You need at least 2 friends for the spinner.',
      wheelAria: 'Spinning wheel with your friends’ names',
      spin: 'Spin',
      spinAgain: 'Spin again',
      spinning: 'Spinning…',
      makePayer: 'Make them the bill payer',
      noFriends: 'No friends yet. Type a name above and add it.',
      noItems: 'No items yet. Add a name and price above.',
      removeFriend: 'Remove {name}',
      itemName: 'Item name',
      removeItem: 'Remove item',
      whoAte: 'Who ate',
      all: 'All',
      subtotal: 'Items subtotal',
      taxLine: 'Tax ({pct}%)',
      extraLine: 'Tip or delivery',
      total: 'Total',
      unassigned: 'Nobody is selected for these items, so they are not counted: {list}',
      payerNote: 'Paid the bill. Gets the rest back from friends.',
      owes: 'Owes {payer}',
      ateNothing: 'Ate nothing',
      noShares: 'Add friends and the split will show up here.',
      wsTitle: 'Hisaab Kitaab',
      wsTotal: 'Total: {total}',
      wsTax: ' (includes {pct}% tax)',
      wsPaid: 'Paid by: {payer}',
      wsOwnShare: '{name}: {amt} (own share)',
      wsOwes: ' - pay {payer}',
      winner: '{name} pays the bill!',
      winnerSub: 'Congratulations, today’s meal is on you.',
      copied: 'Copied. Paste it in your WhatsApp group.',
      copyFallback: 'The text below is selected. Copy it from there.'
    },
    ur: {
      tag: 'Dostoon ke saath bill baanto. Har banda sirf apna khaya hua dega, aur aakhir mein spinner batayega aaj bill kaun dega.',
      stamp: 'Sab kuch PKR mein',
      banner: 'Ye misaal ka data hai. Apna bill daalne ke liye pehle isay saaf karo.',
      clear: 'Saaf karo',
      hFriends: 'Dost',
      friendPh: 'Dost ka naam',
      add: 'Add',
      hItems: 'Bill ke items',
      itemPh: 'Item (jaise Karahi)',
      itemNameAria: 'Item ka naam',
      priceAria: 'Qeemat Rs mein',
      itemHint: 'Jin logon ne item khaya unhein select karo. Ek se zyada hon to qeemat barabar baant di jaye gi.',
      tax: 'Tax %',
      extra: 'Tip ya delivery (Rs)',
      hResult: 'Hisaab',
      payerLbl: 'Bill kis ne diya?',
      copy: 'WhatsApp ke liye copy karo',
      copyBoxAria: 'Hisaab ka matan',
      hWheel: 'Aaj bill kaun dega?',
      wheelMsg: 'Spinner ke liye kam az kam 2 dost chahiye.',
      wheelAria: 'Dostoon ke naam wala ghoomne wala pahia',
      spin: 'Ghumao',
      spinAgain: 'Dobara ghumao',
      spinning: 'Ghoom raha hai…',
      makePayer: 'Isay bill dene wala bana do',
      noFriends: 'Abhi koi dost nahi. Upar naam likh kar add karo.',
      noItems: 'Koi item nahi. Upar naam aur qeemat likh kar add karo.',
      removeFriend: '{name} ko hatao',
      itemName: 'Item ka naam',
      removeItem: 'Item hatao',
      whoAte: 'Kis ne khaya',
      all: 'Sab',
      subtotal: 'Items ka jama',
      taxLine: 'Tax ({pct}%)',
      extraLine: 'Tip ya delivery',
      total: 'Total',
      unassigned: 'In items par kisi ko select nahi kiya, isliye ginti mein nahi: {list}',
      payerNote: 'Bill is ne diya. Baaki dostoon se wapas lena hai.',
      owes: 'Ye {payer} ko dega',
      ateNothing: 'Kuch nahi khaya',
      noShares: 'Dost add karo to hisaab yahan nazar aaye ga.',
      wsTitle: 'Hisaab Kitaab',
      wsTotal: 'Total: {total}',
      wsTax: ' ({pct}% tax shamil)',
      wsPaid: 'Bill diya: {payer}',
      wsOwnShare: '{name}: {amt} (apna hissa)',
      wsOwes: ' {payer} ko do',
      winner: '{name} bill dega!',
      winnerSub: 'Mubarak ho, aaj ki dawat aap ki taraf se.',
      copied: 'Copy ho gaya. Ab WhatsApp group mein paste kar do.',
      copyFallback: 'Neeche wala matan select ho gaya hai. Isay copy kar lo.'
    }
  };

  var lang = 'en';
  try { var sl = localStorage.getItem(LKEY); if (sl === 'en' || sl === 'ur') lang = sl; } catch (e) {}
  function t(k, p) {
    var s = (T[lang] && T[lang][k] !== undefined) ? T[lang][k] : (T.en[k] !== undefined ? T.en[k] : k);
    if (p) s = s.replace(/\{(\w+)\}/g, function (m, x) { return p[x] !== undefined ? p[x] : m; });
    return s;
  }

  var $ = function (s) { return document.querySelector(s); };
  var uid = function () { return Math.random().toString(36).slice(2, 8); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var fmt = function (n) { return 'Rs ' + Math.round(n).toLocaleString('en-US'); };

  function sample() {
    var a = uid(), h = uid(), s = uid(), b = uid();
    return {
      friends: [{ id: a, name: 'Ali' }, { id: h, name: 'Hamza' }, { id: s, name: 'Sara' }, { id: b, name: 'Bilal' }],
      items: [
        { id: uid(), name: 'Chicken Karahi', price: 2400, who: [a, h, s, b] },
        { id: uid(), name: 'Naan (6)', price: 300, who: [a, h, s, b] },
        { id: uid(), name: 'Mutton Biryani', price: 750, who: [h, b] },
        { id: uid(), name: 'Doodh Patti Chai', price: 360, who: [a, s] },
        { id: uid(), name: 'Cold Drink', price: 180, who: [s] }
      ],
      tax: 13, extra: 0, payer: a, isSample: true
    };
  }
  function load() {
    try {
      var r = localStorage.getItem(KEY);
      if (r) {
        var o = JSON.parse(r);
        if (o && Array.isArray(o.friends) && Array.isArray(o.items)) return o;
      }
    } catch (e) {}
    return null;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  var S = load() || sample();
  var lastResult = null;
  var winnerId = null;
  var hasSpun = false;

  function touch() {
    if (S.isSample) { S.isSample = false; $('#banner').hidden = true; }
    save();
  }
  function friendName(id) {
    for (var i = 0; i < S.friends.length; i++) if (S.friends[i].id === id) return S.friends[i].name;
    return '';
  }

  /* ---------- split ---------- */
  function compute() {
    var n = S.friends.length;
    var subs = {}, unassigned = [], subTotal = 0;
    S.friends.forEach(function (f) { subs[f.id] = 0; });
    S.items.forEach(function (it) {
      var price = Number(it.price) || 0;
      var who = (it.who || []).filter(function (id) { return subs.hasOwnProperty(id); });
      if (price > 0 && who.length === 0) { unassigned.push(it.name || 'Item'); return; }
      subTotal += price;
      who.forEach(function (id) { subs[id] += price / who.length; });
    });
    var taxPct = Math.max(0, Number(S.tax) || 0);
    var extra = Math.max(0, Number(S.extra) || 0);
    var taxAmt = subTotal * taxPct / 100;
    var total = subTotal + taxAmt + extra;
    var rows = S.friends.map(function (f) {
      var base = subs[f.id];
      var ex = subTotal > 0 ? extra * base / subTotal : (n ? extra / n : 0);
      var exact = base * (1 + taxPct / 100) + ex;
      return { id: f.id, name: f.name, sub: base, exact: exact, share: Math.round(exact) };
    });
    if (rows.length) {
      var diff = Math.round(total) - rows.reduce(function (a, r) { return a + r.share; }, 0);
      if (diff !== 0) {
        var big = rows.reduce(function (m, r) { return r.exact > m.exact ? r : m; }, rows[0]);
        big.share += diff;
      }
    }
    return { rows: rows, subTotal: subTotal, taxPct: taxPct, taxAmt: taxAmt, extra: extra, total: total, unassigned: unassigned };
  }

  /* ---------- render ---------- */
  function applyStatic() {
    document.documentElement.lang = lang === 'ur' ? 'ur-Latn' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-ph'))); });
    document.querySelectorAll('[data-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-aria'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function renderFriends() {
    var el = $('#friends');
    if (!S.friends.length) { el.innerHTML = '<span class="empty">' + esc(t('noFriends')) + '</span>'; return; }
    el.innerHTML = S.friends.map(function (f) {
      return '<span class="chip friend">' + esc(f.name) +
        '<button type="button" data-act="del-friend" data-fid="' + f.id + '" aria-label="' + esc(t('removeFriend', { name: f.name })) + '">×</button></span>';
    }).join('');
  }

  function renderItems() {
    var el = $('#items');
    if (!S.items.length) { el.innerHTML = '<li class="empty">' + esc(t('noItems')) + '</li>'; return; }
    el.innerHTML = S.items.map(function (it) {
      var chips = S.friends.map(function (f) {
        var on = (it.who || []).indexOf(f.id) > -1;
        return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-act="toggle" data-fid="' + f.id + '" aria-pressed="' + on + '">' + esc(f.name) + '</button>';
      }).join('');
      return '<li class="item" data-id="' + it.id + '">' +
        '<div class="item-top">' +
        '<input class="in" id="iname-' + it.id + '" data-f="name" value="' + esc(it.name) + '" aria-label="' + esc(t('itemName')) + '">' +
        '<input class="in price" id="iprice-' + it.id + '" data-f="price" type="number" inputmode="decimal" min="0" step="any" value="' + (it.price || '') + '" aria-label="' + esc(t('priceAria')) + '">' +
        '<button type="button" class="icon" data-act="del-item" aria-label="' + esc(t('removeItem')) + '">×</button>' +
        '</div>' +
        '<div class="who"><span class="lbl">' + esc(t('whoAte')) + '</span>' + chips +
        (S.friends.length ? '<button type="button" class="mini" data-act="all">' + esc(t('all')) + '</button>' : '') +
        '</div></li>';
    }).join('');
  }

  function renderResults() {
    var r = compute();
    lastResult = r;
    var h = '<div class="l"><span>' + esc(t('subtotal')) + '</span><span>' + fmt(r.subTotal) + '</span></div>';
    if (r.taxPct > 0) h += '<div class="l"><span>' + esc(t('taxLine', { pct: r.taxPct })) + '</span><span>' + fmt(r.taxAmt) + '</span></div>';
    if (r.extra > 0) h += '<div class="l"><span>' + esc(t('extraLine')) + '</span><span>' + fmt(r.extra) + '</span></div>';
    h += '<div class="l grand"><span>' + esc(t('total')) + '</span><span>' + fmt(r.total) + '</span></div>';
    if (r.unassigned.length) h += '<div class="warn">' + esc(t('unassigned', { list: r.unassigned.join(', ') })) + '</div>';
    $('#total').innerHTML = h;

    var sel = $('#payer');
    sel.innerHTML = S.friends.map(function (f) {
      return '<option value="' + f.id + '"' + (f.id === S.payer ? ' selected' : '') + '>' + esc(f.name) + '</option>';
    }).join('');
    sel.disabled = !S.friends.length;

    var payerId = S.payer;
    $('#shares').innerHTML = r.rows.map(function (x) {
      var line, cls = '', sub;
      if (x.id === payerId) {
        var back = r.rows.reduce(function (a, y) { return y.id === payerId ? a : a + y.share; }, 0);
        line = back > 0 ? '+ ' + fmt(back) : fmt(0);
        cls = 'get';
        sub = t('payerNote');
      } else {
        line = fmt(x.share);
        cls = x.share > 0 ? 'owe' : '';
        sub = x.share > 0 ? t('owes', { payer: friendName(payerId) }) : t('ateNothing');
      }
      return '<div class="share"><div><span class="n">' + esc(x.name) + '</span><span class="s">' + esc(sub) + '</span></div>' +
        '<div class="amt ' + cls + '">' + line + '</div></div>';
    }).join('') || '<div class="empty">' + esc(t('noShares')) + '</div>';
    $('#copyBox').hidden = true;
    $('#copyStatus').textContent = '';
  }

  function summaryText() {
    var r = lastResult || compute();
    var lines = ['*' + t('wsTitle') + '*', t('wsTotal', { total: fmt(r.total) }) + (r.taxPct > 0 ? t('wsTax', { pct: r.taxPct }) : '')];
    var payer = friendName(S.payer);
    if (payer) lines.push(t('wsPaid', { payer: payer }));
    lines.push('');
    r.rows.forEach(function (x) {
      if (x.id === S.payer) lines.push(t('wsOwnShare', { name: x.name, amt: fmt(x.share) }));
      else lines.push(x.name + ': ' + fmt(x.share) + (payer && x.share > 0 ? t('wsOwes', { payer: payer }) : ''));
    });
    return lines.join('\n');
  }

  /* ---------- wheel ---------- */
  var cv = $('#wheel');
  var ctx = cv.getContext('2d');
  var rot = -Math.PI / 2;
  var spinning = false;
  var lastSize = 0;

  function fit() {
    var size = cv.clientWidth || 300;
    var dpr = window.devicePixelRatio || 1;
    if (size !== lastSize || cv.width !== Math.round(size * dpr)) {
      lastSize = size;
      cv.width = Math.round(size * dpr);
      cv.height = Math.round(size * dpr);
    }
    return { size: size, dpr: dpr };
  }
  function segColor(i, n) {
    if (n > 8 && n % 8 === 1 && i === n - 1) return WHEEL[4];
    return WHEEL[i % WHEEL.length];
  }
  function drawWheel() {
    var m = fit();
    var size = m.size, c = ctx, n = S.friends.length;
    c.setTransform(m.dpr, 0, 0, m.dpr, 0, 0);
    c.clearRect(0, 0, size, size);
    var cs = getComputedStyle(document.documentElement);
    var paper = cs.getPropertyValue('--paper').trim() || '#fff';
    var ink = cs.getPropertyValue('--ink').trim() || '#000';
    var mid = size / 2, R = mid - 6;
    if (n < 1) {
      c.beginPath(); c.arc(mid, mid, R, 0, Math.PI * 2);
      c.fillStyle = paper; c.fill(); c.lineWidth = 3; c.strokeStyle = ink; c.stroke();
      return;
    }
    var seg = Math.PI * 2 / n;
    for (var i = 0; i < n; i++) {
      var a0 = rot + i * seg, a1 = a0 + seg;
      c.beginPath(); c.moveTo(mid, mid); c.arc(mid, mid, R, a0, a1); c.closePath();
      c.fillStyle = segColor(i, n); c.fill();
      c.lineWidth = 2; c.strokeStyle = paper; c.stroke();
      c.save();
      c.translate(mid, mid); c.rotate(a0 + seg / 2);
      c.textAlign = 'right'; c.textBaseline = 'middle';
      c.fillStyle = '#fff';
      var fs = Math.max(12, Math.min(20, size / 17));
      c.font = '700 ' + fs + 'px "DM Sans", system-ui, sans-serif';
      var nm = S.friends[i].name;
      if (nm.length > 11) nm = nm.slice(0, 10) + '…';
      c.fillText(nm, R - 14, 0);
      c.restore();
    }
    c.beginPath(); c.arc(mid, mid, R, 0, Math.PI * 2);
    c.lineWidth = 4; c.strokeStyle = ink; c.stroke();
    c.beginPath(); c.arc(mid, mid, size * 0.07, 0, Math.PI * 2);
    c.fillStyle = paper; c.fill(); c.lineWidth = 3; c.strokeStyle = ink; c.stroke();
  }

  function renderWinner() {
    var w = $('#winner');
    if (spinning) { w.textContent = t('spinning'); return; }
    if (winnerId && friendName(winnerId)) {
      w.innerHTML = esc(t('winner', { name: friendName(winnerId) })) + '<small>' + esc(t('winnerSub')) + '</small>';
      $('#makePayer').hidden = (S.payer === winnerId);
    } else {
      w.textContent = '';
      $('#makePayer').hidden = true;
    }
  }

  function updateWheelUi() {
    var n = S.friends.length;
    if (winnerId && !friendName(winnerId)) winnerId = null;
    $('#wheelMsg').hidden = n >= 2;
    $('#wheelBox').hidden = n < 2;
    $('#spin').disabled = n < 2 || spinning;
    $('#spin').textContent = hasSpun ? t('spinAgain') : t('spin');
    if (n < 2) { winnerId = null; }
    renderWinner();
    if (n >= 2) drawWheel();
  }

  function spin() {
    var n = S.friends.length;
    if (n < 2 || spinning) return;
    spinning = true;
    winnerId = null;
    $('#spin').disabled = true;
    $('#makePayer').hidden = true;
    renderWinner();
    var w = Math.floor(Math.random() * n);
    var seg = Math.PI * 2 / n;
    var TAU = Math.PI * 2;
    var target = -Math.PI / 2 - (w + 0.5) * seg;
    var delta = (((target - rot) % TAU) + TAU) % TAU + TAU * 5;
    var start = rot;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dur = reduce ? 400 : 4800;
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 4);
      rot = start + delta * e;
      drawWheel();
      if (p < 1) { requestAnimationFrame(step); return; }
      rot = start + delta;
      spinning = false;
      hasSpun = true;
      winnerId = S.friends[w].id;
      $('#spin').disabled = false;
      $('#spin').textContent = t('spinAgain');
      renderWinner();
    }
    requestAnimationFrame(step);
  }

  /* ---------- events ---------- */
  function renderAll() {
    applyStatic();
    renderFriends(); renderItems(); renderResults(); updateWheelUi();
    $('#banner').hidden = !S.isSample;
    $('#tax').value = S.tax === 0 || S.tax ? S.tax : '';
    $('#extra').value = S.extra ? S.extra : '';
  }

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem(LKEY, lang); } catch (e) {}
      var tx = $('#tax').value, ex = $('#extra').value;
      renderAll();
      $('#tax').value = tx; $('#extra').value = ex;
    });
  });

  $('#friendForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var inp = $('#friendName');
    var name = inp.value.trim();
    if (!name) { inp.focus(); return; }
    S.friends.push({ id: uid(), name: name });
    if (!S.payer) S.payer = S.friends[0].id;
    inp.value = '';
    touch(); renderAll(); inp.focus();
  });

  $('#itemForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var ni = $('#itemName'), pi = $('#itemPrice');
    var name = ni.value.trim();
    var price = Number(pi.value);
    if (!name) { ni.focus(); return; }
    if (!(price >= 0)) { pi.focus(); return; }
    S.items.push({ id: uid(), name: name, price: price || 0, who: S.friends.map(function (f) { return f.id; }) });
    ni.value = ''; pi.value = '';
    touch(); renderItems(); renderResults(); ni.focus();
  });

  $('#friends').addEventListener('click', function (e) {
    var b = e.target.closest('[data-act="del-friend"]');
    if (!b) return;
    var id = b.getAttribute('data-fid');
    S.friends = S.friends.filter(function (f) { return f.id !== id; });
    S.items.forEach(function (it) { it.who = (it.who || []).filter(function (x) { return x !== id; }); });
    if (S.payer === id) S.payer = S.friends.length ? S.friends[0].id : '';
    touch(); renderAll();
  });

  function itemOf(el) {
    var li = el.closest('.item');
    if (!li) return null;
    var id = li.getAttribute('data-id');
    for (var i = 0; i < S.items.length; i++) if (S.items[i].id === id) return S.items[i];
    return null;
  }
  $('#items').addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    var it = itemOf(b);
    if (!it) return;
    var act = b.getAttribute('data-act');
    if (act === 'del-item') {
      S.items = S.items.filter(function (x) { return x !== it; });
    } else if (act === 'toggle') {
      var fid = b.getAttribute('data-fid');
      var at = it.who.indexOf(fid);
      if (at > -1) it.who.splice(at, 1); else it.who.push(fid);
    } else if (act === 'all') {
      it.who = S.friends.map(function (f) { return f.id; });
    }
    touch(); renderItems(); renderResults();
  });
  $('#items').addEventListener('input', function (e) {
    var f = e.target.getAttribute('data-f');
    var it = itemOf(e.target);
    if (!f || !it) return;
    if (f === 'name') it.name = e.target.value;
    if (f === 'price') it.price = Math.max(0, Number(e.target.value) || 0);
    touch(); renderResults();
  });

  $('#tax').addEventListener('input', function (e) { S.tax = Math.max(0, Number(e.target.value) || 0); touch(); renderResults(); });
  $('#extra').addEventListener('input', function (e) { S.extra = Math.max(0, Number(e.target.value) || 0); touch(); renderResults(); });
  $('#payer').addEventListener('change', function (e) { S.payer = e.target.value; touch(); renderResults(); renderWinner(); });

  $('#clear').addEventListener('click', function () {
    S = { friends: [], items: [], tax: 13, extra: 0, payer: '', isSample: false };
    winnerId = null; hasSpun = false;
    save(); renderAll(); $('#friendName').focus();
  });

  $('#spin').addEventListener('click', spin);
  $('#makePayer').addEventListener('click', function () {
    if (!winnerId) return;
    S.payer = winnerId; touch(); renderResults();
    $('#makePayer').hidden = true;
  });

  $('#copy').addEventListener('click', function () {
    var text = summaryText();
    var box = $('#copyBox'), status = $('#copyStatus');
    function fallback() {
      box.value = text; box.hidden = false; box.focus(); box.select();
      status.textContent = t('copyFallback');
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          status.textContent = t('copied');
        }, fallback);
      } else { fallback(); }
    } catch (err) { fallback(); }
  });

  window.addEventListener('resize', function () { if (S.friends.length >= 2) drawWheel(); });
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', function () { drawWheel(); });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (S.friends.length >= 2) drawWheel(); });

  renderAll();
})();
</script>