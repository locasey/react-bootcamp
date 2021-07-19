// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/web-vitals/dist/web-vitals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTTFB = exports.getLCP = exports.getFID = exports.getFCP = exports.getCLS = void 0;

var e,
    t,
    n,
    i,
    a = function (e, t) {
  return {
    name: e,
    value: void 0 === t ? -1 : t,
    delta: 0,
    entries: [],
    id: "v2-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
  };
},
    r = function (e, t) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(e)) {
      if ("first-input" === e && !("PerformanceEventTiming" in self)) return;
      var n = new PerformanceObserver(function (e) {
        return e.getEntries().map(t);
      });
      return n.observe({
        type: e,
        buffered: !0
      }), n;
    }
  } catch (e) {}
},
    o = function (e, t) {
  var n = function n(i) {
    "pagehide" !== i.type && "hidden" !== document.visibilityState || (e(i), t && (removeEventListener("visibilitychange", n, !0), removeEventListener("pagehide", n, !0)));
  };

  addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0);
},
    u = function (e) {
  addEventListener("pageshow", function (t) {
    t.persisted && e(t);
  }, !0);
},
    c = "function" == typeof WeakSet ? new WeakSet() : new Set(),
    f = function (e, t, n) {
  var i;
  return function () {
    t.value >= 0 && (n || c.has(t) || "hidden" === document.visibilityState) && (t.delta = t.value - (i || 0), (t.delta || void 0 === i) && (i = t.value, e(t)));
  };
},
    s = -1,
    m = function () {
  return "hidden" === document.visibilityState ? 0 : 1 / 0;
},
    d = function () {
  o(function (e) {
    var t = e.timeStamp;
    s = t;
  }, !0);
},
    v = function () {
  return s < 0 && (s = m(), d(), u(function () {
    setTimeout(function () {
      s = m(), d();
    }, 0);
  })), {
    get firstHiddenTime() {
      return s;
    }

  };
},
    p = function (e, t) {
  var n,
      i = v(),
      o = a("FCP"),
      s = function (e) {
    "first-contentful-paint" === e.name && (d && d.disconnect(), e.startTime < i.firstHiddenTime && (o.value = e.startTime, o.entries.push(e), c.add(o), n()));
  },
      m = performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0],
      d = m ? null : r("paint", s);

  (m || d) && (n = f(e, o, t), m && s(m), u(function (i) {
    o = a("FCP"), n = f(e, o, t), requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        o.value = performance.now() - i.timeStamp, c.add(o), n();
      });
    });
  }));
},
    l = !1,
    h = -1,
    y = function (e, t) {
  l || (p(function (e) {
    h = e.value;
  }), l = !0);

  var n,
      i = function (t) {
    h > -1 && e(t);
  },
      c = a("CLS", 0),
      s = 0,
      m = [],
      d = function (e) {
    if (!e.hadRecentInput) {
      var t = m[0],
          i = m[m.length - 1];
      s && e.startTime - i.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (s += e.value, m.push(e)) : (s = e.value, m = [e]), s > c.value && (c.value = s, c.entries = m, n());
    }
  },
      v = r("layout-shift", d);

  v && (n = f(i, c, t), o(function () {
    v.takeRecords().map(d), n();
  }), u(function () {
    s = 0, h = -1, c = a("CLS", 0), n = f(i, c, t);
  }));
},
    g = {
  passive: !0,
  capture: !0
},
    T = new Date(),
    E = function (i, a) {
  e || (e = a, t = i, n = new Date(), L(removeEventListener), S());
},
    S = function () {
  if (t >= 0 && t < n - T) {
    var a = {
      entryType: "first-input",
      name: e.type,
      target: e.target,
      cancelable: e.cancelable,
      startTime: e.timeStamp,
      processingStart: e.timeStamp + t
    };
    i.forEach(function (e) {
      e(a);
    }), i = [];
  }
},
    w = function (e) {
  if (e.cancelable) {
    var t = (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
    "pointerdown" == e.type ? function (e, t) {
      var n = function () {
        E(e, t), a();
      },
          i = function () {
        a();
      },
          a = function () {
        removeEventListener("pointerup", n, g), removeEventListener("pointercancel", i, g);
      };

      addEventListener("pointerup", n, g), addEventListener("pointercancel", i, g);
    }(t, e) : E(t, e);
  }
},
    L = function (e) {
  ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (t) {
    return e(t, w, g);
  });
},
    b = function (n, s) {
  var m,
      d = v(),
      p = a("FID"),
      l = function (e) {
    e.startTime < d.firstHiddenTime && (p.value = e.processingStart - e.startTime, p.entries.push(e), c.add(p), m());
  },
      h = r("first-input", l);

  m = f(n, p, s), h && o(function () {
    h.takeRecords().map(l), h.disconnect();
  }, !0), h && u(function () {
    var r;
    p = a("FID"), m = f(n, p, s), i = [], t = -1, e = null, L(addEventListener), r = l, i.push(r), S();
  });
},
    F = function (e, t) {
  var n,
      i = v(),
      s = a("LCP"),
      m = function (e) {
    var t = e.startTime;
    t < i.firstHiddenTime && (s.value = t, s.entries.push(e)), n();
  },
      d = r("largest-contentful-paint", m);

  if (d) {
    n = f(e, s, t);

    var p = function () {
      c.has(s) || (d.takeRecords().map(m), d.disconnect(), c.add(s), n());
    };

    ["keydown", "click"].forEach(function (e) {
      addEventListener(e, p, {
        once: !0,
        capture: !0
      });
    }), o(p, !0), u(function (i) {
      s = a("LCP"), n = f(e, s, t), requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          s.value = performance.now() - i.timeStamp, c.add(s), n();
        });
      });
    });
  }
},
    k = function (e) {
  var t,
      n = a("TTFB");
  t = function () {
    try {
      var t = performance.getEntriesByType("navigation")[0] || function () {
        var e = performance.timing,
            t = {
          entryType: "navigation",
          startTime: 0
        };

        for (var n in e) "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));

        return t;
      }();

      if (n.value = n.delta = t.responseStart, n.value < 0) return;
      n.entries = [t], e(n);
    } catch (e) {}
  }, "complete" === document.readyState ? setTimeout(t, 0) : addEventListener("pageshow", t);
};

exports.getTTFB = k;
exports.getLCP = F;
exports.getFID = b;
exports.getCLS = y;
exports.getFCP = p;
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50062" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../node_modules/web-vitals/dist/web-vitals.js"], null)
//# sourceMappingURL=/web-vitals.78b1c500.js.map