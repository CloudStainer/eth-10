"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [792],
  {
    46792: function (e, o, t) {
      t.r(o);
      var n = null;
      "undefined" != typeof WebSocket
        ? (n = WebSocket)
        : "undefined" != typeof MozWebSocket
        ? (n = MozWebSocket)
        : void 0 !== t.g
        ? (n = t.g.WebSocket || t.g.MozWebSocket)
        : "undefined" != typeof window
        ? (n = window.WebSocket || window.MozWebSocket)
        : "undefined" != typeof self &&
          (n = self.WebSocket || self.MozWebSocket),
        (o.default = n);
    },
  },
]);
