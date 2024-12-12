(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [811],
  {
    39016: function (t, e, r) {
      "use strict";
      var n = r(83454);
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.CoinbaseWalletSDK = void 0);
      let i = r(52719),
        o = r(49682),
        s = r(83143),
        a = r(31405),
        u = r(16570),
        c = r(27472),
        l = r(94643),
        h = n.env.LINK_API_URL || "https://www.walletlink.org",
        d = n.env.SDK_VERSION || r(40626).i8 || "unknown";
      class f {
        constructor(t) {
          var e, r, n;
          let i;
          (this._appName = ""),
            (this._appLogoUrl = null),
            (this._relay = null),
            (this._relayEventManager = null);
          let s = t.linkAPIUrl || h;
          if (
            ((i = t.uiConstructor
              ? t.uiConstructor
              : (t) => new a.WalletSDKUI(t)),
            void 0 === t.overrideIsMetaMask
              ? (this._overrideIsMetaMask = !1)
              : (this._overrideIsMetaMask = t.overrideIsMetaMask),
            (this._overrideIsCoinbaseWallet =
              null === (e = t.overrideIsCoinbaseWallet) || void 0 === e || e),
            (this._overrideIsCoinbaseBrowser =
              null !== (r = t.overrideIsCoinbaseBrowser) && void 0 !== r && r),
            t.diagnosticLogger && t.eventListener)
          )
            throw Error(
              "Can't have both eventListener and diagnosticLogger options, use only diagnosticLogger"
            );
          t.eventListener
            ? (this._diagnosticLogger = { log: t.eventListener.onEvent })
            : (this._diagnosticLogger = t.diagnosticLogger),
            (this._reloadOnDisconnect =
              null === (n = t.reloadOnDisconnect) || void 0 === n || n);
          let l = new URL(s),
            p = `${l.protocol}//${l.host}`;
          if (
            ((this._storage = new o.ScopedLocalStorage(`-walletlink:${p}`)),
            this._storage.setItem("version", f.VERSION),
            this.walletExtension ||
              this.coinbaseBrowser ||
              ((this._relayEventManager = new c.WalletSDKRelayEventManager()),
              (this._relay = new u.WalletSDKRelay({
                linkAPIUrl: s,
                version: d,
                darkMode: !!t.darkMode,
                uiConstructor: i,
                storage: this._storage,
                relayEventManager: this._relayEventManager,
                diagnosticLogger: this._diagnosticLogger,
                reloadOnDisconnect: this._reloadOnDisconnect,
              })),
              this.setAppInfo(t.appName, t.appLogoUrl),
              t.headlessMode))
          )
            return;
          this._relay.attachUI();
        }
        makeWeb3Provider(t = "", e = 1) {
          let r = this.walletExtension;
          if (r)
            return (
              this.isCipherProvider(r) || r.setProviderInfo(t, e),
              !1 === this._reloadOnDisconnect &&
                "function" == typeof r.disableReloadOnDisconnect &&
                r.disableReloadOnDisconnect(),
              r
            );
          let n = this.coinbaseBrowser;
          if (n) return n;
          let i = this._relay;
          if (!i || !this._relayEventManager || !this._storage)
            throw Error("Relay not initialized, should never happen");
          return (
            t || i.setConnectDisabled(!0),
            new s.CoinbaseWalletProvider({
              relayProvider: () => Promise.resolve(i),
              relayEventManager: this._relayEventManager,
              storage: this._storage,
              jsonRpcUrl: t,
              chainId: e,
              qrUrl: this.getQrUrl(),
              diagnosticLogger: this._diagnosticLogger,
              overrideIsMetaMask: this._overrideIsMetaMask,
              overrideIsCoinbaseWallet: this._overrideIsCoinbaseWallet,
              overrideIsCoinbaseBrowser: this._overrideIsCoinbaseBrowser,
            })
          );
        }
        setAppInfo(t, e) {
          var r;
          (this._appName = t || "DApp"),
            (this._appLogoUrl = e || (0, l.getFavicon)());
          let n = this.walletExtension;
          n
            ? this.isCipherProvider(n) ||
              n.setAppInfo(this._appName, this._appLogoUrl)
            : null === (r = this._relay) ||
              void 0 === r ||
              r.setAppInfo(this._appName, this._appLogoUrl);
        }
        disconnect() {
          var t;
          let e = this.walletExtension;
          e
            ? e.close()
            : null === (t = this._relay) || void 0 === t || t.resetAndReload();
        }
        getQrUrl() {
          var t, e;
          return null !==
            (e =
              null === (t = this._relay) || void 0 === t
                ? void 0
                : t.getQRCodeUrl()) && void 0 !== e
            ? e
            : null;
        }
        getCoinbaseWalletLogo(t, e = 240) {
          return (0, i.walletLogo)(t, e);
        }
        get walletExtension() {
          var t;
          return null !== (t = window.coinbaseWalletExtension) && void 0 !== t
            ? t
            : window.walletLinkExtension;
        }
        get coinbaseBrowser() {
          var t, e;
          try {
            let r =
              null !== (t = window.ethereum) && void 0 !== t
                ? t
                : null === (e = window.top) || void 0 === e
                ? void 0
                : e.ethereum;
            if (!r) return;
            if ("isCoinbaseBrowser" in r && r.isCoinbaseBrowser) return r;
            return;
          } catch (t) {
            return;
          }
        }
        isCipherProvider(t) {
          return "boolean" == typeof t.isCipher && t.isCipher;
        }
      }
      (e.CoinbaseWalletSDK = f), (f.VERSION = d);
    },
    52719: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.walletLogo = void 0),
        (e.walletLogo = (t, e) => {
          switch (t) {
            case "standard":
            default:
              return `data:image/svg+xml,%3Csvg width='${e}' height='${e}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `;
            case "circle":
              return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${e}' viewBox='0 0 999.81 999.81'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052fe;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%230152fe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M655-115.9h56c.83,1.59,2.36.88,3.56,1a478,478,0,0,1,75.06,10.42C891.4-81.76,978.33-32.58,1049.19,44q116.7,126,131.94,297.61c.38,4.14-.34,8.53,1.78,12.45v59c-1.58.84-.91,2.35-1,3.56a482.05,482.05,0,0,1-10.38,74.05c-24,106.72-76.64,196.76-158.83,268.93s-178.18,112.82-287.2,122.6c-4.83.43-9.86-.25-14.51,1.77H654c-1-1.68-2.69-.91-4.06-1a496.89,496.89,0,0,1-105.9-18.59c-93.54-27.42-172.78-77.59-236.91-150.94Q199.34,590.1,184.87,426.58c-.47-5.19.25-10.56-1.77-15.59V355c1.68-1,.91-2.7,1-4.06a498.12,498.12,0,0,1,18.58-105.9c26-88.75,72.64-164.9,140.6-227.57q126-116.27,297.21-131.61C645.32-114.57,650.35-113.88,655-115.9Zm377.92,500c0-192.44-156.31-349.49-347.56-350.15-194.13-.68-350.94,155.13-352.29,347.42-1.37,194.55,155.51,352.1,348.56,352.47C876.15,734.23,1032.93,577.84,1032.93,384.11Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-2' d='M1032.93,384.11c0,193.73-156.78,350.12-351.29,349.74-193-.37-349.93-157.92-348.56-352.47C334.43,189.09,491.24,33.28,685.37,34,876.62,34.62,1032.94,191.67,1032.93,384.11ZM683,496.81q43.74,0,87.48,0c15.55,0,25.32-9.72,25.33-25.21q0-87.48,0-175c0-15.83-9.68-25.46-25.59-25.46H595.77c-15.88,0-25.57,9.64-25.58,25.46q0,87.23,0,174.45c0,16.18,9.59,25.7,25.84,25.71Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-3' d='M683,496.81H596c-16.25,0-25.84-9.53-25.84-25.71q0-87.23,0-174.45c0-15.82,9.7-25.46,25.58-25.46H770.22c15.91,0,25.59,9.63,25.59,25.46q0,87.47,0,175c0,15.49-9.78,25.2-25.33,25.21Q726.74,496.84,683,496.81Z' transform='translate(-183.1 115.9)'/%3E%3C/svg%3E`;
            case "text":
              return `data:image/svg+xml,%3Csvg width='${e}' height='${(
                0.1 * e
              ).toFixed(
                2
              )}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`;
            case "textWithLogo":
              return `data:image/svg+xml,%3Csvg width='${e}' height='${(
                0.25 * e
              ).toFixed(
                2
              )}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`;
            case "textLight":
              return `data:image/svg+xml,%3Csvg width='${e}' height='${(
                0.1 * e
              ).toFixed(
                2
              )}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`;
            case "textWithLogoLight":
              return `data:image/svg+xml,%3Csvg width='${e}' height='${(
                0.25 * e
              ).toFixed(
                2
              )}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`;
          }
        });
    },
    57816: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default =
          ".-cbwsdk-css-reset .-cbwsdk-connect-content{height:430px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-connect-content.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-header{display:flex;align-items:center;justify-content:space-between;margin:0 0 30px}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading{font-style:normal;font-weight:500;font-size:28px;line-height:36px;margin:0}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-layout{display:flex;flex-direction:row}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-left{margin-right:30px;display:flex;flex-direction:column;justify-content:space-between}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-right{flex:25%;margin-right:34px}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-wrapper{width:220px;height:220px;border-radius:12px;display:flex;justify-content:center;align-items:center;background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light{background-color:rgba(255,255,255,.95)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light>p{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark{background-color:rgba(10,11,13,.9)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark>p{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting>p{font-size:12px;font-weight:bold;margin-top:16px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app{border-radius:8px;font-size:14px;line-height:20px;padding:12px;width:339px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.light{background:#eef0f3;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.dark{background:#1e2025;color:#8a919e}.-cbwsdk-css-reset .-cbwsdk-cancel-button{-webkit-appearance:none;border:none;background:none;cursor:pointer;padding:0;margin:0}.-cbwsdk-css-reset .-cbwsdk-cancel-button-x{position:relative;display:block;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-wallet-steps{padding:0 0 0 16px;margin:0;width:100%;list-style:decimal}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item{list-style-type:decimal;display:list-item;font-style:normal;font-weight:400;font-size:16px;line-height:24px;margin-top:20px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item-wrapper{display:flex;align-items:center}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-pad-left{margin-left:6px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon{display:flex;border-radius:50%;height:24px;width:24px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.light{background:#0052ff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.dark{background:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item{align-items:center;display:flex;flex-direction:row;padding:16px 24px;gap:12px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-connect-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-item.light.selected{background:#f5f8ff;color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark.selected{background:#001033;color:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item.selected{border-radius:100px;font-weight:600}.-cbwsdk-css-reset .-cbwsdk-connect-item-copy-wrapper{margin:0 4px 0 8px}.-cbwsdk-css-reset .-cbwsdk-connect-item-title{margin:0 0 0;font-size:16px;line-height:24px;font-weight:500}.-cbwsdk-css-reset .-cbwsdk-connect-item-description{font-weight:400;font-size:14px;line-height:20px;margin:0}");
    },
    95558: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.CoinbaseAppSteps =
          e.CoinbaseWalletSteps =
          e.ConnectItem =
          e.ConnectContent =
            void 0);
      let i = n(r(86010)),
        o = r(6400),
        s = r(30396),
        a = r(94643),
        u = r(43604),
        c = r(37598),
        l = n(r(417)),
        h = n(r(12348)),
        d = r(18646),
        f = n(r(35666)),
        p = n(r(30019)),
        y = r(67494),
        g = r(70381),
        m = r(88727),
        b = n(r(57816)),
        v = {
          "coinbase-wallet-app": {
            title: "Coinbase Wallet app",
            description: "Connect with your self-custody wallet",
            icon: h.default,
            steps: S,
          },
          "coinbase-app": {
            title: "Coinbase app",
            description: "Connect with your Coinbase account",
            icon: l.default,
            steps: M,
          },
        },
        _ = (t) => ("coinbase-app" === t ? f.default : p.default),
        w = (t) => ("light" === t ? "#FFFFFF" : "#0A0B0D");
      function E({
        title: t,
        description: e,
        icon: r,
        selected: n,
        theme: s,
        onClick: a,
      }) {
        return (0, o.h)(
          "div",
          {
            onClick: a,
            class: (0, i.default)("-cbwsdk-connect-item", s, { selected: n }),
          },
          (0, o.h)("div", null, (0, o.h)("img", { src: r, alt: t })),
          (0, o.h)(
            "div",
            { class: "-cbwsdk-connect-item-copy-wrapper" },
            (0, o.h)("h3", { class: "-cbwsdk-connect-item-title" }, t),
            (0, o.h)("p", { class: "-cbwsdk-connect-item-description" }, e)
          )
        );
      }
      function S({ theme: t }) {
        return (0, o.h)(
          "ol",
          { class: "-cbwsdk-wallet-steps" },
          (0, o.h)(
            "li",
            { class: (0, i.default)("-cbwsdk-wallet-steps-item", t) },
            (0, o.h)(
              "div",
              { class: "-cbwsdk-wallet-steps-item-wrapper" },
              "Open Coinbase Wallet app"
            )
          ),
          (0, o.h)(
            "li",
            { class: (0, i.default)("-cbwsdk-wallet-steps-item", t) },
            (0, o.h)(
              "div",
              { class: "-cbwsdk-wallet-steps-item-wrapper" },
              (0, o.h)(
                "span",
                null,
                "Tap ",
                (0, o.h)("strong", null, "Scan"),
                " "
              ),
              (0, o.h)(
                "span",
                {
                  class: (0, i.default)(
                    "-cbwsdk-wallet-steps-pad-left",
                    "-cbwsdk-wallet-steps-icon",
                    t
                  ),
                },
                (0, o.h)(d.QRCodeIcon, { fill: w(t) })
              )
            )
          )
        );
      }
      function M({ theme: t }) {
        return (0, o.h)(
          "ol",
          { class: "-cbwsdk-wallet-steps" },
          (0, o.h)(
            "li",
            { class: (0, i.default)("-cbwsdk-wallet-steps-item", t) },
            (0, o.h)(
              "div",
              { class: "-cbwsdk-wallet-steps-item-wrapper" },
              "Open Coinbase app"
            )
          ),
          (0, o.h)(
            "li",
            { class: (0, i.default)("-cbwsdk-wallet-steps-item", t) },
            (0, o.h)(
              "div",
              { class: "-cbwsdk-wallet-steps-item-wrapper" },
              (0, o.h)("span", null, "Tap ", (0, o.h)("strong", null, "More")),
              (0, o.h)(
                "span",
                {
                  class: (0, i.default)(
                    "-cbwsdk-wallet-steps-pad-left",
                    "-cbwsdk-wallet-steps-icon",
                    t
                  ),
                },
                (0, o.h)(y.StatusDotIcon, { fill: w(t) })
              ),
              (0, o.h)(
                "span",
                { class: "-cbwsdk-wallet-steps-pad-left" },
                "then ",
                (0, o.h)("strong", null, "Scan")
              ),
              (0, o.h)(
                "span",
                {
                  class: (0, i.default)(
                    "-cbwsdk-wallet-steps-pad-left",
                    "-cbwsdk-wallet-steps-icon",
                    t
                  ),
                },
                (0, o.h)(d.QRCodeIcon, { fill: w(t) })
              )
            )
          )
        );
      }
      (e.ConnectContent = function (t) {
        let { theme: e } = t,
          [r, n] = (0, s.useState)("coinbase-wallet-app"),
          l = (0, s.useCallback)((t) => {
            n(t);
          }, []),
          h = (0, a.createQrUrl)(
            t.sessionId,
            t.sessionSecret,
            t.linkAPIUrl,
            t.isParentConnection,
            t.version,
            t.chainId
          ),
          d = v[r];
        if (!r) return null;
        let f = d.steps,
          p = "coinbase-app" === r;
        return (0, o.h)(
          "div",
          {
            "data-testid": "connect-content",
            class: (0, i.default)("-cbwsdk-connect-content", e),
          },
          (0, o.h)("style", null, b.default),
          (0, o.h)(
            "div",
            { class: "-cbwsdk-connect-content-header" },
            (0, o.h)(
              "h2",
              { class: (0, i.default)("-cbwsdk-connect-content-heading", e) },
              "Scan to connect with one of our mobile apps"
            ),
            t.onCancel &&
              (0, o.h)(
                "button",
                {
                  type: "button",
                  class: "-cbwsdk-cancel-button",
                  onClick: t.onCancel,
                },
                (0, o.h)(c.CloseIcon, {
                  fill: "light" === e ? "#0A0B0D" : "#FFFFFF",
                })
              )
          ),
          (0, o.h)(
            "div",
            { class: "-cbwsdk-connect-content-layout" },
            (0, o.h)(
              "div",
              { class: "-cbwsdk-connect-content-column-left" },
              (0, o.h)(
                "div",
                null,
                Object.entries(v).map(([t, n]) =>
                  (0, o.h)(E, {
                    key: t,
                    title: n.title,
                    description: n.description,
                    icon: n.icon,
                    selected: r === t,
                    onClick: () => l(t),
                    theme: e,
                  })
                )
              ),
              p &&
                (0, o.h)(
                  "div",
                  {
                    class: (0, i.default)(
                      "-cbwsdk-connect-content-update-app",
                      e
                    ),
                  },
                  "Don’t see a ",
                  (0, o.h)("strong", null, "Scan"),
                  " option? Update your Coinbase app to the latest version and try again."
                )
            ),
            (0, o.h)(
              "div",
              { class: "-cbwsdk-connect-content-column-right" },
              (0, o.h)(
                "div",
                { class: "-cbwsdk-connect-content-qr-wrapper" },
                (0, o.h)(g.QRCode, {
                  content: h,
                  width: 200,
                  height: 200,
                  fgColor: "#000",
                  bgColor: "transparent",
                  image: { svg: _(r), width: 25, height: 25 },
                }),
                (0, o.h)("input", {
                  type: "hidden",
                  name: "cbw-cbwsdk-version",
                  value: u.LIB_VERSION,
                }),
                (0, o.h)("input", { type: "hidden", value: h })
              ),
              (0, o.h)(f, { theme: e }),
              !t.isConnected &&
                (0, o.h)(
                  "div",
                  {
                    "data-testid": "connecting-spinner",
                    class: (0, i.default)(
                      "-cbwsdk-connect-content-qr-connecting",
                      e
                    ),
                  },
                  (0, o.h)(m.Spinner, {
                    size: 36,
                    color: "dark" === e ? "#FFF" : "#000",
                  }),
                  (0, o.h)("p", null, "Connecting...")
                )
            )
          )
        );
      }),
        (e.ConnectItem = E),
        (e.CoinbaseWalletSteps = S),
        (e.CoinbaseAppSteps = M);
    },
    96956: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default =
          ".-cbwsdk-css-reset .-cbwsdk-connect-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.light{background-color:rgba(0,0,0,.5)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.dark{background-color:rgba(50,53,61,.4)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box{display:flex;position:relative;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container{display:block}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container-hidden{display:none}");
    },
    98845: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ConnectDialog = void 0);
      let i = n(r(86010)),
        o = r(6400),
        s = r(30396),
        a = r(95558),
        u = r(26868),
        c = n(r(96956));
      e.ConnectDialog = (t) => {
        let { isOpen: e, darkMode: r } = t,
          [n, l] = (0, s.useState)(!e),
          [h, d] = (0, s.useState)(!e);
        (0, s.useEffect)(() => {
          let t = [
            window.setTimeout(() => {
              d(!e);
            }, 10),
          ];
          return (
            e
              ? l(!1)
              : t.push(
                  window.setTimeout(() => {
                    l(!0);
                  }, 360)
                ),
            () => {
              t.forEach(window.clearTimeout);
            }
          );
        }, [t.isOpen]);
        let f = r ? "dark" : "light";
        return (0, o.h)(
          "div",
          {
            class: (0, i.default)(
              "-cbwsdk-connect-dialog-container",
              n && "-cbwsdk-connect-dialog-container-hidden"
            ),
          },
          (0, o.h)("style", null, c.default),
          (0, o.h)("div", {
            class: (0, i.default)(
              "-cbwsdk-connect-dialog-backdrop",
              f,
              h && "-cbwsdk-connect-dialog-backdrop-hidden"
            ),
          }),
          (0, o.h)(
            "div",
            { class: "-cbwsdk-connect-dialog" },
            (0, o.h)(
              "div",
              {
                class: (0, i.default)(
                  "-cbwsdk-connect-dialog-box",
                  h && "-cbwsdk-connect-dialog-box-hidden"
                ),
              },
              t.connectDisabled
                ? null
                : (0, o.h)(a.ConnectContent, {
                    theme: f,
                    version: t.version,
                    sessionId: t.sessionId,
                    sessionSecret: t.sessionSecret,
                    linkAPIUrl: t.linkAPIUrl,
                    isConnected: t.isConnected,
                    isParentConnection: t.isParentConnection,
                    chainId: t.chainId,
                    onCancel: t.onCancel,
                  }),
              (0, o.h)(u.TryExtensionContent, { theme: f })
            )
          )
        );
      };
    },
    27759: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.LinkFlow = void 0);
      let n = r(6400),
        i = r(88710),
        o = r(98845);
      e.LinkFlow = class {
        constructor(t) {
          (this.extensionUI$ = new i.BehaviorSubject({})),
            (this.subscriptions = new i.Subscription()),
            (this.isConnected = !1),
            (this.chainId = 1),
            (this.isOpen = !1),
            (this.onCancel = null),
            (this.root = null),
            (this.connectDisabled = !1),
            (this.darkMode = t.darkMode),
            (this.version = t.version),
            (this.sessionId = t.sessionId),
            (this.sessionSecret = t.sessionSecret),
            (this.linkAPIUrl = t.linkAPIUrl),
            (this.isParentConnection = t.isParentConnection),
            (this.connected$ = t.connected$),
            (this.chainId$ = t.chainId$);
        }
        attach(t) {
          (this.root = document.createElement("div")),
            (this.root.className = "-cbwsdk-link-flow-root"),
            t.appendChild(this.root),
            this.render(),
            this.subscriptions.add(
              this.connected$.subscribe((t) => {
                this.isConnected !== t &&
                  ((this.isConnected = t), this.render());
              })
            ),
            this.subscriptions.add(
              this.chainId$.subscribe((t) => {
                this.chainId !== t && ((this.chainId = t), this.render());
              })
            );
        }
        detach() {
          var t;
          this.root &&
            (this.subscriptions.unsubscribe(),
            (0, n.render)(null, this.root),
            null === (t = this.root.parentElement) ||
              void 0 === t ||
              t.removeChild(this.root));
        }
        setConnectDisabled(t) {
          this.connectDisabled = t;
        }
        open(t) {
          (this.isOpen = !0), (this.onCancel = t.onCancel), this.render();
        }
        close() {
          (this.isOpen = !1), (this.onCancel = null), this.render();
        }
        render() {
          if (!this.root) return;
          let t = this.extensionUI$.subscribe(() => {
            this.root &&
              (0, n.render)(
                (0, n.h)(o.ConnectDialog, {
                  darkMode: this.darkMode,
                  version: this.version,
                  sessionId: this.sessionId,
                  sessionSecret: this.sessionSecret,
                  linkAPIUrl: this.linkAPIUrl,
                  isOpen: this.isOpen,
                  isConnected: this.isConnected,
                  isParentConnection: this.isParentConnection,
                  chainId: this.chainId,
                  onCancel: this.onCancel,
                  connectDisabled: this.connectDisabled,
                }),
                this.root
              );
          });
          this.subscriptions.add(t);
        }
      };
    },
    70381: function (t, e, r) {
      "use strict";
      var n = r(48764).Buffer,
        i =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.QRCode = void 0);
      let o = r(6400),
        s = r(30396),
        a = i(r(7713));
      e.QRCode = (t) => {
        let [e, r] = (0, s.useState)("");
        return (
          (0, s.useEffect)(() => {
            var e, i;
            let o = new a.default({
                content: t.content,
                background: t.bgColor || "#ffffff",
                color: t.fgColor || "#000000",
                container: "svg",
                ecl: "M",
                width: null !== (e = t.width) && void 0 !== e ? e : 256,
                height: null !== (i = t.height) && void 0 !== i ? i : 256,
                padding: 0,
                image: t.image,
              }),
              s = n.from(o.svg(), "utf8").toString("base64");
            r(`data:image/svg+xml;base64,${s}`);
          }),
          e ? (0, o.h)("img", { src: e, alt: "QR Code" }) : null
        );
      };
    },
    24325: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default =
          ".-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}");
    },
    19199: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.SnackbarInstance = e.SnackbarContainer = e.Snackbar = void 0);
      let i = n(r(86010)),
        o = r(6400),
        s = r(30396),
        a = n(r(24325));
      (e.Snackbar = class {
        constructor(t) {
          (this.items = new Map()),
            (this.nextItemKey = 0),
            (this.root = null),
            (this.darkMode = t.darkMode);
        }
        attach(t) {
          (this.root = document.createElement("div")),
            (this.root.className = "-cbwsdk-snackbar-root"),
            t.appendChild(this.root),
            this.render();
        }
        presentItem(t) {
          let e = this.nextItemKey++;
          return (
            this.items.set(e, t),
            this.render(),
            () => {
              this.items.delete(e), this.render();
            }
          );
        }
        clear() {
          this.items.clear(), this.render();
        }
        render() {
          this.root &&
            (0, o.render)(
              (0, o.h)(
                "div",
                null,
                (0, o.h)(
                  e.SnackbarContainer,
                  { darkMode: this.darkMode },
                  Array.from(this.items.entries()).map(([t, r]) =>
                    (0, o.h)(
                      e.SnackbarInstance,
                      Object.assign({}, r, { key: t })
                    )
                  )
                )
              ),
              this.root
            );
        }
      }),
        (e.SnackbarContainer = (t) =>
          (0, o.h)(
            "div",
            { class: (0, i.default)("-cbwsdk-snackbar-container") },
            (0, o.h)("style", null, a.default),
            (0, o.h)("div", { class: "-cbwsdk-snackbar" }, t.children)
          )),
        (e.SnackbarInstance = ({
          autoExpand: t,
          message: e,
          menuItems: r,
          appSrc: n,
        }) => {
          let [a, u] = (0, s.useState)(!0),
            [c, l] = (0, s.useState)(null != t && t);
          return (
            (0, s.useEffect)(() => {
              let t = [
                window.setTimeout(() => {
                  u(!1);
                }, 1),
                window.setTimeout(() => {
                  l(!0);
                }, 1e4),
              ];
              return () => {
                t.forEach(window.clearTimeout);
              };
            }),
            (0, o.h)(
              "div",
              {
                class: (0, i.default)(
                  "-cbwsdk-snackbar-instance",
                  a && "-cbwsdk-snackbar-instance-hidden",
                  c && "-cbwsdk-snackbar-instance-expanded"
                ),
              },
              (0, o.h)(
                "div",
                {
                  class: "-cbwsdk-snackbar-instance-header",
                  onClick: () => {
                    l(!c);
                  },
                },
                (0, o.h)("img", {
                  src:
                    "coinbase-app" === n
                      ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0LjY3NCAxOC44NThjLTIuMDQ1IDAtMy42NDgtMS43MjItMy42NDgtMy44NDVzMS42NTktMy44NDUgMy42NDgtMy44NDVjMS44MjQgMCAzLjMxNyAxLjM3NyAzLjU5MyAzLjIxNGgzLjcwM2MtLjMzMS0zLjk2LTMuNDgyLTcuMDU5LTcuMjk2LTcuMDU5LTQuMDM0IDAtNy4zNSAzLjQ0My03LjM1IDcuNjkgMCA0LjI0NiAzLjI2IDcuNjkgNy4zNSA3LjY5IDMuODcgMCA2Ljk2NS0zLjEgNy4yOTYtNy4wNTloLTMuNzAzYy0uMjc2IDEuODM2LTEuNzY5IDMuMjE0LTMuNTkzIDMuMjE0WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDEwLjY3OGMwLTMuNzExIDAtNS41OTYuNzQyLTcuMDIzQTYuNTMyIDYuNTMyIDAgMCAxIDMuNjU1Ljc0MkM1LjA4MiAwIDYuOTY3IDAgMTAuNjc4IDBoNy45MzhjMy43MTEgMCA1LjU5NiAwIDcuMDIzLjc0MmE2LjUzMSA2LjUzMSAwIDAgMSAyLjkxMyAyLjkxM2MuNzQyIDEuNDI3Ljc0MiAzLjMxMi43NDIgNy4wMjN2Ny45MzhjMCAzLjcxMSAwIDUuNTk2LS43NDIgNy4wMjNhNi41MzEgNi41MzEgMCAwIDEtMi45MTMgMi45MTNjLTEuNDI3Ljc0Mi0zLjMxMi43NDItNy4wMjMuNzQyaC03LjkzOGMtMy43MTEgMC01LjU5NiAwLTcuMDIzLS43NDJhNi41MzEgNi41MzEgMCAwIDEtMi45MTMtMi45MTNDMCAyNC4yMTIgMCAyMi4zODQgMCAxOC42MTZ2LTcuOTM4WiIgZmlsbD0iIzAwNTJGRiIvPjxwYXRoIGQ9Ik0xNC42ODQgMTkuNzczYy0yLjcyNyAwLTQuODY0LTIuMjk1LTQuODY0LTUuMTI2IDAtMi44MzEgMi4yMS01LjEyNyA0Ljg2NC01LjEyNyAyLjQzMiAwIDQuNDIyIDEuODM3IDQuNzkgNC4yODVoNC45MzhjLS40NDItNS4yOC00LjY0My05LjQxMS05LjcyOC05LjQxMS01LjM4IDAtOS44MDIgNC41OS05LjgwMiAxMC4yNTMgMCA1LjY2MiA0LjM0OCAxMC4yNTMgOS44MDIgMTAuMjUzIDUuMTU5IDAgOS4yODYtNC4xMzIgOS43MjgtOS40MTFoLTQuOTM4Yy0uMzY4IDIuNDQ4LTIuMzU4IDQuMjg0LTQuNzkgNC4yODRaIiBmaWxsPSIjZmZmIi8+PC9zdmc+"
                      : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+",
                  class: "-cbwsdk-snackbar-instance-header-cblogo",
                }),
                (0, o.h)(
                  "div",
                  { class: "-cbwsdk-snackbar-instance-header-message" },
                  e
                ),
                (0, o.h)(
                  "div",
                  { class: "-gear-container" },
                  !c &&
                    (0, o.h)(
                      "svg",
                      {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      (0, o.h)("circle", {
                        cx: "12",
                        cy: "12",
                        r: "12",
                        fill: "#F5F7F8",
                      })
                    ),
                  (0, o.h)("img", {
                    src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=",
                    class: "-gear-icon",
                    title: "Expand",
                  })
                )
              ),
              r &&
                r.length > 0 &&
                (0, o.h)(
                  "div",
                  { class: "-cbwsdk-snackbar-instance-menu" },
                  r.map((t, e) =>
                    (0, o.h)(
                      "div",
                      {
                        class: (0, i.default)(
                          "-cbwsdk-snackbar-instance-menu-item",
                          t.isRed &&
                            "-cbwsdk-snackbar-instance-menu-item-is-red"
                        ),
                        onClick: t.onClick,
                        key: e,
                      },
                      (0, o.h)(
                        "svg",
                        {
                          width: t.svgWidth,
                          height: t.svgHeight,
                          viewBox: "0 0 10 11",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                        },
                        (0, o.h)("path", {
                          "fill-rule": t.defaultFillRule,
                          "clip-rule": t.defaultClipRule,
                          d: t.path,
                          fill: "#AAAAAA",
                        })
                      ),
                      (0, o.h)(
                        "span",
                        {
                          class: (0, i.default)(
                            "-cbwsdk-snackbar-instance-menu-item-info",
                            t.isRed &&
                              "-cbwsdk-snackbar-instance-menu-item-info-is-red"
                          ),
                        },
                        t.info
                      )
                    )
                  )
                )
            )
          );
        });
    },
    22061: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default =
          ".-cbwsdk-css-reset .-cbwsdk-spinner{display:inline-block}.-cbwsdk-css-reset .-cbwsdk-spinner svg{display:inline-block;animation:2s linear infinite -cbwsdk-spinner-svg}.-cbwsdk-css-reset .-cbwsdk-spinner svg circle{animation:1.9s ease-in-out infinite both -cbwsdk-spinner-circle;display:block;fill:rgba(0,0,0,0);stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -cbwsdk-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -cbwsdk-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}");
    },
    88727: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Spinner = void 0);
      let i = r(6400),
        o = n(r(22061));
      e.Spinner = (t) => {
        var e;
        let r = null !== (e = t.size) && void 0 !== e ? e : 64,
          n = t.color || "#000";
        return (0, i.h)(
          "div",
          { class: "-cbwsdk-spinner" },
          (0, i.h)("style", null, o.default),
          (0, i.h)(
            "svg",
            {
              viewBox: "0 0 100 100",
              xmlns: "http://www.w3.org/2000/svg",
              style: { width: r, height: r },
            },
            (0, i.h)("circle", { style: { cx: 50, cy: 50, r: 45, stroke: n } })
          )
        );
      };
    },
    5157: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default =
          ".-cbwsdk-css-reset .-cbwsdk-try-extension{display:flex;margin-top:12px;height:202px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-try-extension.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-column-half{flex:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading{font-style:normal;font-weight:500;font-size:25px;line-height:32px;margin:0;max-width:204px}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta{appearance:none;border:none;background:none;color:#0052ff;cursor:pointer;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.light{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.dark{color:#588af5}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-wrapper{display:flex;align-items:center;margin-top:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-icon{display:block;margin-left:4px;height:14px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0;padding:0;list-style:none;height:100%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item{display:flex;align-items:center;flex-flow:nowrap;margin-top:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item:first-of-type{margin-top:0}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon-wrapper{display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon{display:flex;height:32px;width:32px;border-radius:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.light{background:#eef0f3}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.dark{background:#1e2025}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy{display:block;font-weight:400;font-size:14px;line-height:20px;padding-left:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.light{color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.dark{color:#8a919e}");
    },
    26868: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.TryExtensionContent = void 0);
      let i = n(r(86010)),
        o = r(6400),
        s = r(30396),
        a = r(79414),
        u = r(52467),
        c = r(25178),
        l = n(r(5157));
      e.TryExtensionContent = function ({ theme: t }) {
        let [e, r] = (0, s.useState)(!1),
          n = (0, s.useCallback)(() => {
            window.open(
              "https://api.wallet.coinbase.com/rpc/v2/desktop/chrome",
              "_blank"
            );
          }, []),
          h = (0, s.useCallback)(() => {
            e ? window.location.reload() : (n(), r(!0));
          }, [n, e]);
        return (0, o.h)(
          "div",
          { class: (0, i.default)("-cbwsdk-try-extension", t) },
          (0, o.h)("style", null, l.default),
          (0, o.h)(
            "div",
            { class: "-cbwsdk-try-extension-column-half" },
            (0, o.h)(
              "h3",
              { class: (0, i.default)("-cbwsdk-try-extension-heading", t) },
              "Or try the Coinbase Wallet browser extension"
            ),
            (0, o.h)(
              "div",
              { class: "-cbwsdk-try-extension-cta-wrapper" },
              (0, o.h)(
                "button",
                {
                  class: (0, i.default)("-cbwsdk-try-extension-cta", t),
                  onClick: h,
                },
                e ? "Refresh" : "Install"
              ),
              (0, o.h)(
                "div",
                null,
                !e &&
                  (0, o.h)(a.ArrowLeftIcon, {
                    class: "-cbwsdk-try-extension-cta-icon",
                    fill: "light" === t ? "#0052FF" : "#588AF5",
                  })
              )
            )
          ),
          (0, o.h)(
            "div",
            { class: "-cbwsdk-try-extension-column-half" },
            (0, o.h)(
              "ul",
              { class: "-cbwsdk-try-extension-list" },
              (0, o.h)(
                "li",
                { class: "-cbwsdk-try-extension-list-item" },
                (0, o.h)(
                  "div",
                  { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
                  (0, o.h)(
                    "span",
                    {
                      class: (0, i.default)(
                        "-cbwsdk-try-extension-list-item-icon",
                        t
                      ),
                    },
                    (0, o.h)(u.LaptopIcon, {
                      fill: "light" === t ? "#0A0B0D" : "#FFFFFF",
                    })
                  )
                ),
                (0, o.h)(
                  "div",
                  {
                    class: (0, i.default)(
                      "-cbwsdk-try-extension-list-item-copy",
                      t
                    ),
                  },
                  "Connect with dapps with just one click on your desktop browser"
                )
              ),
              (0, o.h)(
                "li",
                { class: "-cbwsdk-try-extension-list-item" },
                (0, o.h)(
                  "div",
                  { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
                  (0, o.h)(
                    "span",
                    {
                      class: (0, i.default)(
                        "-cbwsdk-try-extension-list-item-icon",
                        t
                      ),
                    },
                    (0, o.h)(c.SafeIcon, {
                      fill: "light" === t ? "#0A0B0D" : "#FFFFFF",
                    })
                  )
                ),
                (0, o.h)(
                  "div",
                  {
                    class: (0, i.default)(
                      "-cbwsdk-try-extension-list-item-copy",
                      t
                    ),
                  },
                  "Add an additional layer of security by using a supported Ledger hardware wallet"
                )
              )
            )
          )
        );
      };
    },
    79414: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ArrowLeftIcon = void 0);
      let n = r(6400);
      e.ArrowLeftIcon = function (t) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              xmlns: "http://www.w3.org/2000/svg",
            },
            t
          ),
          (0, n.h)("path", {
            d: "M8.60675 0.155884L7.37816 1.28209L12.7723 7.16662H0V8.83328H12.6548L6.82149 14.6666L8 15.8451L15.8201 8.02501L8.60675 0.155884Z",
          })
        );
      };
    },
    37598: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.CloseIcon = void 0);
      let n = r(6400);
      e.CloseIcon = function (t) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "40",
              height: "40",
              viewBox: "0 0 40 40",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            t
          ),
          (0, n.h)("path", {
            d: "M13.7677 13L12.3535 14.4142L18.3535 20.4142L12.3535 26.4142L13.7677 27.8284L19.7677 21.8284L25.7677 27.8284L27.1819 26.4142L21.1819 20.4142L27.1819 14.4142L25.7677 13L19.7677 19L13.7677 13Z",
          })
        );
      };
    },
    52467: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.LaptopIcon = void 0);
      let n = r(6400);
      e.LaptopIcon = function (t) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "14",
              height: "14",
              viewBox: "0 0 14 14",
              xmlns: "http://www.w3.org/2000/svg",
            },
            t
          ),
          (0, n.h)("path", {
            d: "M1.8001 2.2002H12.2001V9.40019H1.8001V2.2002ZM3.4001 3.8002V7.80019H10.6001V3.8002H3.4001Z",
          }),
          (0, n.h)("path", {
            d: "M13.4001 10.2002H0.600098C0.600098 11.0838 1.31644 11.8002 2.2001 11.8002H11.8001C12.6838 11.8002 13.4001 11.0838 13.4001 10.2002Z",
          })
        );
      };
    },
    18646: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.QRCodeIcon = void 0);
      let n = r(6400);
      e.QRCodeIcon = function (t) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "10",
              height: "10",
              viewBox: "0 0 10 10",
              xmlns: "http://www.w3.org/2000/svg",
            },
            t
          ),
          (0, n.h)("path", {
            d: "M8.2271 1.77124L7.0271 1.77124V2.97124H8.2271V1.77124Z",
          }),
          (0, n.h)("path", {
            d: "M5.44922 0.199219L5.44922 4.54922L9.79922 4.54922V0.199219L5.44922 0.199219ZM8.89922 3.64922L6.34922 3.64922L6.34922 1.09922L8.89922 1.09922V3.64922Z",
          }),
          (0, n.h)("path", {
            d: "M2.97124 1.77124L1.77124 1.77124L1.77124 2.97124H2.97124V1.77124Z",
          }),
          (0, n.h)("path", {
            d: "M0.199219 4.54922L4.54922 4.54922L4.54922 0.199219L0.199219 0.199219L0.199219 4.54922ZM1.09922 1.09922L3.64922 1.09922L3.64922 3.64922L1.09922 3.64922L1.09922 1.09922Z",
          }),
          (0, n.h)("path", {
            d: "M2.97124 7.0271H1.77124L1.77124 8.2271H2.97124V7.0271Z",
          }),
          (0, n.h)("path", {
            d: "M0.199219 9.79922H4.54922L4.54922 5.44922L0.199219 5.44922L0.199219 9.79922ZM1.09922 6.34922L3.64922 6.34922L3.64922 8.89922H1.09922L1.09922 6.34922Z",
          }),
          (0, n.h)("path", {
            d: "M8.89922 7.39912H7.99922V5.40112H5.44922L5.44922 9.79912H6.34922L6.34922 6.30112H7.09922V8.29912H9.79922V5.40112H8.89922V7.39912Z",
          }),
          (0, n.h)("path", {
            d: "M7.99912 8.89917H7.09912V9.79917H7.99912V8.89917Z",
          }),
          (0, n.h)("path", {
            d: "M9.79917 8.89917H8.89917V9.79917H9.79917V8.89917Z",
          })
        );
      };
    },
    35666: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      let r = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill="white"/>
        <path d="M50.512 94C74.2907 94 93.5673 74.5244 93.5673 50.5C93.5673 26.4756 74.2907 7 50.512 7C26.7332 7 7.45667 26.4756 7.45667 50.5C7.45667 74.5244 26.7332 94 50.512 94Z" fill="#0052FF"/>
        <path d="M50.6248 65.4335C42.3697 65.4335 35.8996 58.7469 35.8996 50.5C35.8996 42.2531 42.5928 35.5664 50.6248 35.5664C57.9873 35.5664 64.0111 40.9157 65.1267 48.0481H80.0749C78.7363 32.6688 66.0191 20.6328 50.6248 20.6328C34.3379 20.6328 20.9514 34.0062 20.9514 50.5C20.9514 66.9936 34.1148 80.3671 50.6248 80.3671C66.2422 80.3671 78.7363 68.331 80.0749 52.9516H65.1267C64.0111 60.0841 57.9873 65.4335 50.6248 65.4335Z" fill="white"/>
    </svg>
`;
      e.default = r;
    },
    30019: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="white"/>
        <circle cx="49.9996" cy="49.9996" r="43.6363" fill="#1B53E4"/>
        <circle cx="49.9996" cy="49.9996" r="43.6363" stroke="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3379 49.9484C19.3379 66.8508 33.04 80.553 49.9425 80.553C66.8449 80.553 80.5471 66.8508 80.5471 49.9484C80.5471 33.0459 66.8449 19.3438 49.9425 19.3438C33.04 19.3438 19.3379 33.0459 19.3379 49.9484ZM44.0817 40.0799C41.8725 40.0799 40.0817 41.8708 40.0817 44.0799V55.8029C40.0817 58.012 41.8725 59.8029 44.0817 59.8029H55.8046C58.0138 59.8029 59.8046 58.012 59.8046 55.8029V44.0799C59.8046 41.8708 58.0138 40.0799 55.8046 40.0799H44.0817Z" fill="white"/>
    </svg>
`);
    },
    25178: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.SafeIcon = void 0);
      let n = r(6400);
      e.SafeIcon = function (t) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "14",
              height: "14",
              viewBox: "0 0 14 14",
              xmlns: "http://www.w3.org/2000/svg",
            },
            t
          ),
          (0, n.h)("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M0.600098 0.600098V11.8001H13.4001V0.600098H0.600098ZM7.0001 9.2001C5.3441 9.2001 4.0001 7.8561 4.0001 6.2001C4.0001 4.5441 5.3441 3.2001 7.0001 3.2001C8.6561 3.2001 10.0001 4.5441 10.0001 6.2001C10.0001 7.8561 8.6561 9.2001 7.0001 9.2001ZM0.600098 12.6001H3.8001V13.4001H0.600098V12.6001ZM10.2001 12.6001H13.4001V13.4001H10.2001V12.6001ZM8.8001 6.2001C8.8001 7.19421 7.99421 8.0001 7.0001 8.0001C6.00598 8.0001 5.2001 7.19421 5.2001 6.2001C5.2001 5.20598 6.00598 4.4001 7.0001 4.4001C7.99421 4.4001 8.8001 5.20598 8.8001 6.2001Z",
          })
        );
      };
    },
    67494: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.StatusDotIcon = void 0);
      let n = r(6400);
      e.StatusDotIcon = function (t) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "10",
              height: "10",
              viewBox: "0 0 10 10",
              xmlns: "http://www.w3.org/2000/svg",
            },
            t
          ),
          (0, n.h)("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M2.29995 4.99995C2.29995 5.57985 1.82985 6.04995 1.24995 6.04995C0.670052 6.04995 0.199951 5.57985 0.199951 4.99995C0.199951 4.42005 0.670052 3.94995 1.24995 3.94995C1.82985 3.94995 2.29995 4.42005 2.29995 4.99995ZM4.99995 6.04995C5.57985 6.04995 6.04995 5.57985 6.04995 4.99995C6.04995 4.42005 5.57985 3.94995 4.99995 3.94995C4.42005 3.94995 3.94995 4.42005 3.94995 4.99995C3.94995 5.57985 4.42005 6.04995 4.99995 6.04995ZM8.74995 6.04995C9.32985 6.04995 9.79995 5.57985 9.79995 4.99995C9.79995 4.42005 9.32985 3.94995 8.74995 3.94995C8.17005 3.94995 7.69995 4.42005 7.69995 4.99995C7.69995 5.57985 8.17005 6.04995 8.74995 6.04995Z",
          })
        );
      };
    },
    417: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiMwMDUyRkYiLz48cGF0aCBkPSJNMTQuMDM3IDE4LjkyNmMtMi43NSAwLTQuOTA3LTIuMjA1LTQuOTA3LTQuOTI2IDAtMi43MiAyLjIzLTQuOTI2IDQuOTA3LTQuOTI2YTQuODY2IDQuODY2IDAgMCAxIDQuODMzIDQuMTE4aDQuOTgyYy0uNDQ2LTUuMDczLTQuNjg0LTkuMDQ0LTkuODE1LTkuMDQ0QzguNjEgNC4xNDggNC4xNDkgOC41NiA0LjE0OSAxNHM0LjM4NyA5Ljg1MiA5Ljg5IDkuODUyYzUuMjA0IDAgOS4zNjgtMy45NyA5LjgxNC05LjA0M0gxOC44N2E0Ljg2NiA0Ljg2NiAwIDAgMS00LjgzMyA0LjExN1oiIGZpbGw9IiNmZmYiLz48L3N2Zz4=");
    },
    12348: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiMwMDUyRkYiLz48cGF0aCBkPSJNMjMuODUyIDE0QTkuODM0IDkuODM0IDAgMCAxIDE0IDIzLjg1MiA5LjgzNCA5LjgzNCAwIDAgMSA0LjE0OCAxNCA5LjgzNCA5LjgzNCAwIDAgMSAxNCA0LjE0OCA5LjgzNCA5LjgzNCAwIDAgMSAyMy44NTIgMTRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExLjE4NSAxMi41MDRjMC0uNDU2IDAtLjcxLjA5OC0uODYyLjA5OC0uMTUyLjE5Ni0uMzA0LjM0My0uMzU1LjE5Ni0uMTAyLjM5Mi0uMTAyLjg4MS0uMTAyaDIuOTg2Yy40OSAwIC42ODYgMCAuODgyLjEwMi4xNDYuMTAxLjI5My4yMDMuMzQyLjM1NS4wOTguMjAzLjA5OC40MDYuMDk4Ljg2MnYyLjk5MmMwIC40NTcgMCAuNzEtLjA5OC44NjMtLjA5OC4xNTItLjE5NS4zMDQtLjM0Mi4zNTUtLjE5Ni4xMDEtLjM5Mi4xMDEtLjg4Mi4xMDFoLTIuOTg2Yy0uNDkgMC0uNjg1IDAtLjg4LS4xMDEtLjE0OC0uMTAyLS4yOTUtLjIwMy0uMzQ0LS4zNTUtLjA5OC0uMjAzLS4wOTgtLjQwNi0uMDk4LS44NjN2LTIuOTkyWiIgZmlsbD0iIzAwNTJGRiIvPjwvc3ZnPg==");
    },
    85755: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ClientMessagePublishEvent =
          e.ClientMessageSetSessionConfig =
          e.ClientMessageGetSessionConfig =
          e.ClientMessageIsLinked =
          e.ClientMessageHostSession =
            void 0),
        (e.ClientMessageHostSession = function (t) {
          return Object.assign({ type: "HostSession" }, t);
        }),
        (e.ClientMessageIsLinked = function (t) {
          return Object.assign({ type: "IsLinked" }, t);
        }),
        (e.ClientMessageGetSessionConfig = function (t) {
          return Object.assign({ type: "GetSessionConfig" }, t);
        }),
        (e.ClientMessageSetSessionConfig = function (t) {
          return Object.assign({ type: "SetSessionConfig" }, t);
        }),
        (e.ClientMessagePublishEvent = function (t) {
          return Object.assign({ type: "PublishEvent" }, t);
        });
    },
    32191: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.EVENTS = void 0),
        (e.EVENTS = {
          STARTED_CONNECTING: "walletlink_sdk.started.connecting",
          CONNECTED_STATE_CHANGE: "walletlink_sdk.connected",
          DISCONNECTED: "walletlink_sdk.disconnected",
          METADATA_DESTROYED: "walletlink_sdk_metadata_destroyed",
          LINKED: "walletlink_sdk.linked",
          FAILURE: "walletlink_sdk.generic_failure",
          SESSION_CONFIG_RECEIVED:
            "walletlink_sdk.session_config_event_received",
          ETH_ACCOUNTS_STATE: "walletlink_sdk.eth_accounts_state",
          SESSION_STATE_CHANGE: "walletlink_sdk.session_state_change",
          UNLINKED_ERROR_STATE: "walletlink_sdk.unlinked_error_state",
          SKIPPED_CLEARING_SESSION: "walletlink_sdk.skipped_clearing_session",
          GENERAL_ERROR: "walletlink_sdk.general_error",
          WEB3_REQUEST: "walletlink_sdk.web3.request",
          WEB3_REQUEST_PUBLISHED: "walletlink_sdk.web3.request_published",
          WEB3_RESPONSE: "walletlink_sdk.web3.response",
          UNKNOWN_ADDRESS_ENCOUNTERED:
            "walletlink_sdk.unknown_address_encountered",
        });
    },
    80179: function (t, e, r) {
      "use strict";
      var n, i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.RxWebSocket = e.ConnectionState = void 0);
      let o = r(88710),
        s = r(42100);
      ((i = n = e.ConnectionState || (e.ConnectionState = {}))[
        (i.DISCONNECTED = 0)
      ] = "DISCONNECTED"),
        (i[(i.CONNECTING = 1)] = "CONNECTING"),
        (i[(i.CONNECTED = 2)] = "CONNECTED"),
        (e.RxWebSocket = class {
          constructor(t, e = WebSocket) {
            (this.WebSocketClass = e),
              (this.webSocket = null),
              (this.connectionStateSubject = new o.BehaviorSubject(
                n.DISCONNECTED
              )),
              (this.incomingDataSubject = new o.Subject()),
              (this.url = t.replace(/^http/, "ws"));
          }
          connect() {
            return this.webSocket
              ? (0, o.throwError)(Error("webSocket object is not null"))
              : new o.Observable((t) => {
                  let e;
                  try {
                    this.webSocket = e = new this.WebSocketClass(this.url);
                  } catch (e) {
                    t.error(e);
                    return;
                  }
                  this.connectionStateSubject.next(n.CONNECTING),
                    (e.onclose = (e) => {
                      this.clearWebSocket(),
                        t.error(
                          Error(`websocket error ${e.code}: ${e.reason}`)
                        ),
                        this.connectionStateSubject.next(n.DISCONNECTED);
                    }),
                    (e.onopen = (e) => {
                      t.next(),
                        t.complete(),
                        this.connectionStateSubject.next(n.CONNECTED);
                    }),
                    (e.onmessage = (t) => {
                      this.incomingDataSubject.next(t.data);
                    });
                }).pipe((0, s.take)(1));
          }
          disconnect() {
            let { webSocket: t } = this;
            if (t) {
              this.clearWebSocket(),
                this.connectionStateSubject.next(n.DISCONNECTED);
              try {
                t.close();
              } catch (t) {}
            }
          }
          get connectionState$() {
            return this.connectionStateSubject.asObservable();
          }
          get incomingData$() {
            return this.incomingDataSubject.asObservable();
          }
          get incomingJSONData$() {
            return this.incomingData$.pipe(
              (0, s.flatMap)((t) => {
                let e;
                try {
                  e = JSON.parse(t);
                } catch (t) {
                  return (0, o.empty)();
                }
                return (0, o.of)(e);
              })
            );
          }
          sendData(t) {
            let { webSocket: e } = this;
            if (!e) throw Error("websocket is not connected");
            e.send(t);
          }
          clearWebSocket() {
            let { webSocket: t } = this;
            t &&
              ((this.webSocket = null),
              (t.onclose = null),
              (t.onerror = null),
              (t.onmessage = null),
              (t.onopen = null));
          }
        });
    },
    76156: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.isServerMessageFail = void 0),
        (e.isServerMessageFail = function (t) {
          return (
            t &&
            "Fail" === t.type &&
            "number" == typeof t.id &&
            "string" == typeof t.sessionId &&
            "string" == typeof t.error
          );
        });
    },
    18876: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.WalletSDKConnection = void 0);
      let n = r(88710),
        i = r(42100),
        o = r(73526),
        s = r(91295),
        a = r(85755),
        u = r(32191),
        c = r(80179),
        l = r(76156);
      e.WalletSDKConnection = class {
        constructor(t, e, r, a, l = WebSocket) {
          (this.sessionId = t),
            (this.sessionKey = e),
            (this.diagnostic = a),
            (this.subscriptions = new n.Subscription()),
            (this.destroyed = !1),
            (this.lastHeartbeatResponse = 0),
            (this.nextReqId = (0, s.IntNumber)(1)),
            (this.connectedSubject = new n.BehaviorSubject(!1)),
            (this.linkedSubject = new n.BehaviorSubject(!1)),
            (this.sessionConfigSubject = new n.ReplaySubject(1));
          let h = new c.RxWebSocket(r + "/rpc", l);
          (this.ws = h),
            this.subscriptions.add(
              h.connectionState$
                .pipe(
                  (0, i.tap)((e) => {
                    var r;
                    return null === (r = this.diagnostic) || void 0 === r
                      ? void 0
                      : r.log(u.EVENTS.CONNECTED_STATE_CHANGE, {
                          state: e,
                          sessionIdHash: o.Session.hash(t),
                        });
                  }),
                  (0, i.skip)(1),
                  (0, i.filter)(
                    (t) =>
                      t === c.ConnectionState.DISCONNECTED && !this.destroyed
                  ),
                  (0, i.delay)(5e3),
                  (0, i.filter)((t) => !this.destroyed),
                  (0, i.flatMap)((t) => h.connect()),
                  (0, i.retry)()
                )
                .subscribe()
            ),
            this.subscriptions.add(
              h.connectionState$
                .pipe(
                  (0, i.skip)(2),
                  (0, i.switchMap)((t) =>
                    (0, n.iif)(
                      () => t === c.ConnectionState.CONNECTED,
                      this.authenticate().pipe(
                        (0, i.tap)((t) => this.sendIsLinked()),
                        (0, i.tap)((t) => this.sendGetSessionConfig()),
                        (0, i.map)((t) => !0)
                      ),
                      (0, n.of)(!1)
                    )
                  ),
                  (0, i.distinctUntilChanged)(),
                  (0, i.catchError)((t) => (0, n.of)(!1))
                )
                .subscribe((t) => this.connectedSubject.next(t))
            ),
            this.subscriptions.add(
              h.connectionState$
                .pipe(
                  (0, i.skip)(1),
                  (0, i.switchMap)((t) =>
                    (0, n.iif)(
                      () => t === c.ConnectionState.CONNECTED,
                      (0, n.timer)(0, 1e4)
                    )
                  )
                )
                .subscribe((t) =>
                  0 === t ? this.updateLastHeartbeat() : this.heartbeat()
                )
            ),
            this.subscriptions.add(
              h.incomingData$
                .pipe((0, i.filter)((t) => "h" === t))
                .subscribe((t) => this.updateLastHeartbeat())
            ),
            this.subscriptions.add(
              h.incomingJSONData$
                .pipe(
                  (0, i.filter)((t) =>
                    ["IsLinkedOK", "Linked"].includes(t.type)
                  )
                )
                .subscribe((e) => {
                  var r;
                  null === (r = this.diagnostic) ||
                    void 0 === r ||
                    r.log(u.EVENTS.LINKED, {
                      sessionIdHash: o.Session.hash(t),
                      linked: e.linked,
                      type: e.type,
                      onlineGuests: e.onlineGuests,
                    }),
                    this.linkedSubject.next(e.linked || e.onlineGuests > 0);
                })
            ),
            this.subscriptions.add(
              h.incomingJSONData$
                .pipe(
                  (0, i.filter)((t) =>
                    ["GetSessionConfigOK", "SessionConfigUpdated"].includes(
                      t.type
                    )
                  )
                )
                .subscribe((e) => {
                  var r;
                  null === (r = this.diagnostic) ||
                    void 0 === r ||
                    r.log(u.EVENTS.SESSION_CONFIG_RECEIVED, {
                      sessionIdHash: o.Session.hash(t),
                      metadata_keys:
                        e && e.metadata ? Object.keys(e.metadata) : void 0,
                    }),
                    this.sessionConfigSubject.next({
                      webhookId: e.webhookId,
                      webhookUrl: e.webhookUrl,
                      metadata: e.metadata,
                    });
                })
            );
        }
        connect() {
          var t;
          if (this.destroyed) throw Error("instance is destroyed");
          null === (t = this.diagnostic) ||
            void 0 === t ||
            t.log(u.EVENTS.STARTED_CONNECTING, {
              sessionIdHash: o.Session.hash(this.sessionId),
            }),
            this.ws.connect().subscribe();
        }
        destroy() {
          var t;
          this.subscriptions.unsubscribe(),
            this.ws.disconnect(),
            null === (t = this.diagnostic) ||
              void 0 === t ||
              t.log(u.EVENTS.DISCONNECTED, {
                sessionIdHash: o.Session.hash(this.sessionId),
              }),
            (this.destroyed = !0);
        }
        get isDestroyed() {
          return this.destroyed;
        }
        get connected$() {
          return this.connectedSubject.asObservable();
        }
        get onceConnected$() {
          return this.connected$.pipe(
            (0, i.filter)((t) => t),
            (0, i.take)(1),
            (0, i.map)(() => void 0)
          );
        }
        get linked$() {
          return this.linkedSubject.asObservable();
        }
        get onceLinked$() {
          return this.linked$.pipe(
            (0, i.filter)((t) => t),
            (0, i.take)(1),
            (0, i.map)(() => void 0)
          );
        }
        get sessionConfig$() {
          return this.sessionConfigSubject.asObservable();
        }
        get incomingEvent$() {
          return this.ws.incomingJSONData$.pipe(
            (0, i.filter)(
              (t) =>
                "Event" === t.type &&
                "string" == typeof t.sessionId &&
                "string" == typeof t.eventId &&
                "string" == typeof t.event &&
                "string" == typeof t.data
            ),
            (0, i.map)((t) => t)
          );
        }
        setSessionMetadata(t, e) {
          let r = (0, a.ClientMessageSetSessionConfig)({
            id: (0, s.IntNumber)(this.nextReqId++),
            sessionId: this.sessionId,
            metadata: { [t]: e },
          });
          return this.onceConnected$.pipe(
            (0, i.flatMap)((t) => this.makeRequest(r)),
            (0, i.map)((t) => {
              if ((0, l.isServerMessageFail)(t))
                throw Error(t.error || "failed to set session metadata");
            })
          );
        }
        publishEvent(t, e, r = !1) {
          let n = (0, a.ClientMessagePublishEvent)({
            id: (0, s.IntNumber)(this.nextReqId++),
            sessionId: this.sessionId,
            event: t,
            data: e,
            callWebhook: r,
          });
          return this.onceLinked$.pipe(
            (0, i.flatMap)((t) => this.makeRequest(n)),
            (0, i.map)((t) => {
              if ((0, l.isServerMessageFail)(t))
                throw Error(t.error || "failed to publish event");
              return t.eventId;
            })
          );
        }
        sendData(t) {
          this.ws.sendData(JSON.stringify(t));
        }
        updateLastHeartbeat() {
          this.lastHeartbeatResponse = Date.now();
        }
        heartbeat() {
          if (Date.now() - this.lastHeartbeatResponse > 2e4) {
            this.ws.disconnect();
            return;
          }
          try {
            this.ws.sendData("h");
          } catch (t) {}
        }
        makeRequest(t, e = 6e4) {
          let r = t.id;
          try {
            this.sendData(t);
          } catch (t) {
            return (0, n.throwError)(t);
          }
          return this.ws.incomingJSONData$.pipe(
            (0, i.timeoutWith)(
              e,
              (0, n.throwError)(Error(`request ${r} timed out`))
            ),
            (0, i.filter)((t) => t.id === r),
            (0, i.take)(1)
          );
        }
        authenticate() {
          let t = (0, a.ClientMessageHostSession)({
            id: (0, s.IntNumber)(this.nextReqId++),
            sessionId: this.sessionId,
            sessionKey: this.sessionKey,
          });
          return this.makeRequest(t).pipe(
            (0, i.map)((t) => {
              if ((0, l.isServerMessageFail)(t))
                throw Error(t.error || "failed to authentcate");
            })
          );
        }
        sendIsLinked() {
          let t = (0, a.ClientMessageIsLinked)({
            id: (0, s.IntNumber)(this.nextReqId++),
            sessionId: this.sessionId,
          });
          this.sendData(t);
        }
        sendGetSessionConfig() {
          let t = (0, a.ClientMessageGetSessionConfig)({
            id: (0, s.IntNumber)(this.nextReqId++),
            sessionId: this.sessionId,
          });
          this.sendData(t);
        }
      };
    },
    45811: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.CoinbaseWalletProvider = e.CoinbaseWalletSDK = void 0);
      let n = r(39016),
        i = r(83143);
      var o = r(39016);
      Object.defineProperty(e, "CoinbaseWalletSDK", {
        enumerable: !0,
        get: function () {
          return o.CoinbaseWalletSDK;
        },
      });
      var s = r(83143);
      Object.defineProperty(e, "CoinbaseWalletProvider", {
        enumerable: !0,
        get: function () {
          return s.CoinbaseWalletProvider;
        },
      }),
        (e.default = n.CoinbaseWalletSDK),
        "undefined" != typeof window &&
          ((window.CoinbaseWalletSDK = n.CoinbaseWalletSDK),
          (window.CoinbaseWalletProvider = i.CoinbaseWalletProvider),
          (window.WalletLink = n.CoinbaseWalletSDK),
          (window.WalletLinkProvider = i.CoinbaseWalletProvider));
    },
    49682: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ScopedLocalStorage = void 0),
        (e.ScopedLocalStorage = class {
          constructor(t) {
            this.scope = t;
          }
          setItem(t, e) {
            localStorage.setItem(this.scopedKey(t), e);
          }
          getItem(t) {
            return localStorage.getItem(this.scopedKey(t));
          }
          removeItem(t) {
            localStorage.removeItem(this.scopedKey(t));
          }
          clear() {
            let t = this.scopedKey(""),
              e = [];
            for (let r = 0; r < localStorage.length; r++) {
              let n = localStorage.key(r);
              "string" == typeof n && n.startsWith(t) && e.push(n);
            }
            e.forEach((t) => localStorage.removeItem(t));
          }
          scopedKey(t) {
            return `${this.scope}:${t}`;
          }
        });
    },
    1119: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default =
          '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}');
    },
    27162: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.injectCssReset = void 0);
      let i = n(r(1119));
      e.injectCssReset = function () {
        let t = document.createElement("style");
        (t.type = "text/css"),
          t.appendChild(document.createTextNode(i.default)),
          document.documentElement.appendChild(t);
      };
    },
    83143: function (t, e, r) {
      "use strict";
      var n = r(48764).Buffer,
        i =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.CoinbaseWalletProvider = void 0);
      let o = i(r(19394)),
        s = i(r(13550)),
        a = r(79826),
        u = r(32191),
        c = r(73526),
        l = r(15633),
        h = r(94643),
        d = i(r(14497)),
        f = r(33648),
        p = r(28565),
        y = r(5313),
        g = "DefaultChainId",
        m = "DefaultJsonRpcUrl";
      class b extends o.default {
        constructor(t) {
          var e, r;
          super(),
            (this._filterPolyfill = new f.FilterPolyfill(this)),
            (this._subscriptionManager = new y.SubscriptionManager(this)),
            (this._relay = null),
            (this._addresses = []),
            (this.hasMadeFirstChainChangedEmission = !1),
            (this._send = this.send.bind(this)),
            (this._sendAsync = this.sendAsync.bind(this)),
            (this.setProviderInfo = this.setProviderInfo.bind(this)),
            (this.updateProviderInfo = this.updateProviderInfo.bind(this)),
            (this.getChainId = this.getChainId.bind(this)),
            (this.setAppInfo = this.setAppInfo.bind(this)),
            (this.enable = this.enable.bind(this)),
            (this.close = this.close.bind(this)),
            (this.send = this.send.bind(this)),
            (this.sendAsync = this.sendAsync.bind(this)),
            (this.request = this.request.bind(this)),
            (this._setAddresses = this._setAddresses.bind(this)),
            (this.scanQRCode = this.scanQRCode.bind(this)),
            (this.genericRequest = this.genericRequest.bind(this)),
            (this._chainIdFromOpts = t.chainId),
            (this._jsonRpcUrlFromOpts = t.jsonRpcUrl),
            (this._overrideIsMetaMask = t.overrideIsMetaMask),
            (this._relayProvider = t.relayProvider),
            (this._storage = t.storage),
            (this._relayEventManager = t.relayEventManager),
            (this.diagnostic = t.diagnosticLogger),
            (this.reloadOnDisconnect = !0),
            (this.isCoinbaseWallet =
              null === (e = t.overrideIsCoinbaseWallet) || void 0 === e || e),
            (this.isCoinbaseBrowser =
              null !== (r = t.overrideIsCoinbaseBrowser) && void 0 !== r && r),
            (this.qrUrl = t.qrUrl),
            (this.supportsAddressSwitching = t.supportsAddressSwitching),
            (this.isLedger = t.isLedger);
          let n = this.getChainId(),
            i = (0, h.prepend0x)(n.toString(16));
          this.emit("connect", { chainIdStr: i });
          let o = this._storage.getItem(l.LOCAL_STORAGE_ADDRESSES_KEY);
          if (o) {
            let t = o.split(" ");
            "" !== t[0] &&
              ((this._addresses = t.map((t) => (0, h.ensureAddressString)(t))),
              this.emit("accountsChanged", t));
          }
          this._subscriptionManager.events.on("notification", (t) => {
            this.emit("message", { type: t.method, data: t.params });
          }),
            this._addresses.length > 0 && this.initializeRelay(),
            window.addEventListener("message", (t) => {
              var e;
              if (
                t.origin === location.origin &&
                t.source === window &&
                "walletLinkMessage" === t.data.type
              ) {
                if (
                  "defaultChainChanged" === t.data.data.action ||
                  "dappChainSwitched" === t.data.data.action
                ) {
                  let r = t.data.data.chainId,
                    n =
                      null !== (e = t.data.data.jsonRpcUrl) && void 0 !== e
                        ? e
                        : this.jsonRpcUrl;
                  this.updateProviderInfo(n, Number(r));
                }
                "addressChanged" === t.data.data.action &&
                  this._setAddresses([t.data.data.address]);
              }
            });
        }
        get selectedAddress() {
          return this._addresses[0] || void 0;
        }
        get networkVersion() {
          return this.getChainId().toString(10);
        }
        get chainId() {
          return (0, h.prepend0x)(this.getChainId().toString(16));
        }
        get isWalletLink() {
          return !0;
        }
        get isMetaMask() {
          return this._overrideIsMetaMask;
        }
        get host() {
          return this.jsonRpcUrl;
        }
        get connected() {
          return !0;
        }
        isConnected() {
          return !0;
        }
        get jsonRpcUrl() {
          var t;
          return null !== (t = this._storage.getItem(m)) && void 0 !== t
            ? t
            : this._jsonRpcUrlFromOpts;
        }
        set jsonRpcUrl(t) {
          this._storage.setItem(m, t);
        }
        disableReloadOnDisconnect() {
          this.reloadOnDisconnect = !1;
        }
        setProviderInfo(t, e) {
          this.isLedger ||
            this.isCoinbaseBrowser ||
            ((this._chainIdFromOpts = e), (this._jsonRpcUrlFromOpts = t)),
            this.updateProviderInfo(this.jsonRpcUrl, this.getChainId());
        }
        updateProviderInfo(t, e) {
          this.jsonRpcUrl = t;
          let r = this.getChainId();
          this._storage.setItem(g, e.toString(10));
          let n = (0, h.ensureIntNumber)(e) !== r;
          (n || !this.hasMadeFirstChainChangedEmission) &&
            (this.emit("chainChanged", this.getChainId()),
            (this.hasMadeFirstChainChangedEmission = !0));
        }
        async watchAsset(t, e, r, n, i, o) {
          let s = await this.initializeRelay(),
            a = await s.watchAsset(
              t,
              e,
              r,
              n,
              i,
              null == o ? void 0 : o.toString()
            ).promise;
          return !!a.result;
        }
        async addEthereumChain(t, e, r, n, i, o) {
          var s, a;
          if ((0, h.ensureIntNumber)(t) === this.getChainId()) return !1;
          let u = await this.initializeRelay(),
            c = u.inlineAddEthereumChain(t.toString());
          this._isAuthorized() ||
            c ||
            (await u.requestEthereumAccounts().promise);
          let l = await u.addEthereumChain(t.toString(), e, i, r, n, o).promise;
          return (
            (null === (s = l.result) || void 0 === s
              ? void 0
              : s.isApproved) === !0 && this.updateProviderInfo(e[0], t),
            (null === (a = l.result) || void 0 === a
              ? void 0
              : a.isApproved) === !0
          );
        }
        async switchEthereumChain(t) {
          let e = await this.initializeRelay(),
            r = await e.switchEthereumChain(
              t.toString(10),
              this.selectedAddress || void 0
            ).promise;
          if (r.errorCode)
            throw a.ethErrors.provider.custom({ code: r.errorCode });
          let n = r.result;
          n.isApproved &&
            n.rpcUrl.length > 0 &&
            this.updateProviderInfo(n.rpcUrl, t);
        }
        setAppInfo(t, e) {
          this.initializeRelay().then((r) => r.setAppInfo(t, e));
        }
        async enable() {
          var t;
          return (null === (t = this.diagnostic) ||
            void 0 === t ||
            t.log(u.EVENTS.ETH_ACCOUNTS_STATE, {
              method: "provider::enable",
              addresses_length: this._addresses.length,
              sessionIdHash: this._relay
                ? c.Session.hash(this._relay.session.id)
                : void 0,
            }),
          this._addresses.length > 0)
            ? [...this._addresses]
            : await this._send(p.JSONRPCMethod.eth_requestAccounts);
        }
        async close() {
          let t = await this.initializeRelay();
          t.resetAndReload();
        }
        send(t, e) {
          if ("string" == typeof t) {
            let r = Array.isArray(e) ? e : void 0 !== e ? [e] : [];
            return this._sendRequestAsync({
              jsonrpc: "2.0",
              id: 0,
              method: t,
              params: r,
            }).then((t) => t.result);
          }
          return "function" == typeof e
            ? this._sendAsync(t, e)
            : Array.isArray(t)
            ? t.map((t) => this._sendRequest(t))
            : this._sendRequest(t);
        }
        async sendAsync(t, e) {
          if ("function" != typeof e) throw Error("callback is required");
          if (Array.isArray(t)) {
            this._sendMultipleRequestsAsync(t)
              .then((t) => e(null, t))
              .catch((t) => e(t, null));
            return;
          }
          return this._sendRequestAsync(t)
            .then((t) => e(null, t))
            .catch((t) => e(t, null));
        }
        async request(t) {
          if (!t || "object" != typeof t || Array.isArray(t))
            throw a.ethErrors.rpc.invalidRequest({
              message: "Expected a single, non-array, object argument.",
              data: t,
            });
          let { method: e, params: r } = t;
          if ("string" != typeof e || 0 === e.length)
            throw a.ethErrors.rpc.invalidRequest({
              message: "'args.method' must be a non-empty string.",
              data: t,
            });
          if (
            void 0 !== r &&
            !Array.isArray(r) &&
            ("object" != typeof r || null === r)
          )
            throw a.ethErrors.rpc.invalidRequest({
              message: "'args.params' must be an object or array if provided.",
              data: t,
            });
          let n = void 0 === r ? [] : r,
            i = this._relayEventManager.makeRequestId(),
            o = await this._sendRequestAsync({
              method: e,
              params: n,
              jsonrpc: "2.0",
              id: i,
            });
          return o.result;
        }
        async scanQRCode(t) {
          let e = await this.initializeRelay(),
            r = await e.scanQRCode((0, h.ensureRegExpString)(t)).promise;
          if ("string" != typeof r.result)
            throw Error("result was not a string");
          return r.result;
        }
        async genericRequest(t, e) {
          let r = await this.initializeRelay(),
            n = await r.genericRequest(t, e).promise;
          if ("string" != typeof n.result)
            throw Error("result was not a string");
          return n.result;
        }
        async selectProvider(t) {
          let e = await this.initializeRelay(),
            r = await e.selectProvider(t).promise;
          if ("string" != typeof r.result)
            throw Error("result was not a string");
          return r.result;
        }
        supportsSubscriptions() {
          return !1;
        }
        subscribe() {
          throw Error("Subscriptions are not supported");
        }
        unsubscribe() {
          throw Error("Subscriptions are not supported");
        }
        disconnect() {
          return !0;
        }
        _sendRequest(t) {
          let e = { jsonrpc: "2.0", id: t.id },
            { method: r } = t;
          if (
            ((e.result = this._handleSynchronousMethods(t)),
            void 0 === e.result)
          )
            throw Error(
              `Coinbase Wallet does not support calling ${r} synchronously without a callback. Please provide a callback parameter to call ${r} asynchronously.`
            );
          return e;
        }
        _setAddresses(t, e) {
          if (!Array.isArray(t)) throw Error("addresses is not an array");
          let r = t.map((t) => (0, h.ensureAddressString)(t));
          JSON.stringify(r) !== JSON.stringify(this._addresses) &&
            (!(this._addresses.length > 0) ||
              !1 !== this.supportsAddressSwitching ||
              e) &&
            ((this._addresses = r),
            this.emit("accountsChanged", this._addresses),
            this._storage.setItem(l.LOCAL_STORAGE_ADDRESSES_KEY, r.join(" ")));
        }
        _sendRequestAsync(t) {
          return new Promise((e, r) => {
            try {
              let n = this._handleSynchronousMethods(t);
              if (void 0 !== n)
                return e({ jsonrpc: "2.0", id: t.id, result: n });
              let i = this._handleAsynchronousFilterMethods(t);
              if (void 0 !== i) {
                i.then((r) =>
                  e(Object.assign(Object.assign({}, r), { id: t.id }))
                ).catch((t) => r(t));
                return;
              }
              let o = this._handleSubscriptionMethods(t);
              if (void 0 !== o) {
                o.then((r) =>
                  e({ jsonrpc: "2.0", id: t.id, result: r.result })
                ).catch((t) => r(t));
                return;
              }
            } catch (t) {
              return r(t);
            }
            this._handleAsynchronousMethods(t)
              .then(
                (r) => r && e(Object.assign(Object.assign({}, r), { id: t.id }))
              )
              .catch((t) => r(t));
          });
        }
        _sendMultipleRequestsAsync(t) {
          return Promise.all(t.map((t) => this._sendRequestAsync(t)));
        }
        _handleSynchronousMethods(t) {
          let { method: e } = t,
            r = t.params || [];
          switch (e) {
            case p.JSONRPCMethod.eth_accounts:
              return this._eth_accounts();
            case p.JSONRPCMethod.eth_coinbase:
              return this._eth_coinbase();
            case p.JSONRPCMethod.eth_uninstallFilter:
              return this._eth_uninstallFilter(r);
            case p.JSONRPCMethod.net_version:
              return this._net_version();
            case p.JSONRPCMethod.eth_chainId:
              return this._eth_chainId();
            default:
              return;
          }
        }
        async _handleAsynchronousMethods(t) {
          let { method: e } = t,
            r = t.params || [];
          switch (e) {
            case p.JSONRPCMethod.eth_requestAccounts:
              return this._eth_requestAccounts();
            case p.JSONRPCMethod.eth_sign:
              return this._eth_sign(r);
            case p.JSONRPCMethod.eth_ecRecover:
              return this._eth_ecRecover(r);
            case p.JSONRPCMethod.personal_sign:
              return this._personal_sign(r);
            case p.JSONRPCMethod.personal_ecRecover:
              return this._personal_ecRecover(r);
            case p.JSONRPCMethod.eth_signTransaction:
              return this._eth_signTransaction(r);
            case p.JSONRPCMethod.eth_sendRawTransaction:
              return this._eth_sendRawTransaction(r);
            case p.JSONRPCMethod.eth_sendTransaction:
              return this._eth_sendTransaction(r);
            case p.JSONRPCMethod.eth_signTypedData_v1:
              return this._eth_signTypedData_v1(r);
            case p.JSONRPCMethod.eth_signTypedData_v2:
              return this._throwUnsupportedMethodError();
            case p.JSONRPCMethod.eth_signTypedData_v3:
              return this._eth_signTypedData_v3(r);
            case p.JSONRPCMethod.eth_signTypedData_v4:
            case p.JSONRPCMethod.eth_signTypedData:
              return this._eth_signTypedData_v4(r);
            case p.JSONRPCMethod.cbWallet_arbitrary:
              return this._cbwallet_arbitrary(r);
            case p.JSONRPCMethod.wallet_addEthereumChain:
              return this._wallet_addEthereumChain(r);
            case p.JSONRPCMethod.wallet_switchEthereumChain:
              return this._wallet_switchEthereumChain(r);
            case p.JSONRPCMethod.wallet_watchAsset:
              return this._wallet_watchAsset(r);
          }
          let n = await this.initializeRelay();
          return n.makeEthereumJSONRPCRequest(t, this.jsonRpcUrl);
        }
        _handleAsynchronousFilterMethods(t) {
          let { method: e } = t,
            r = t.params || [];
          switch (e) {
            case p.JSONRPCMethod.eth_newFilter:
              return this._eth_newFilter(r);
            case p.JSONRPCMethod.eth_newBlockFilter:
              return this._eth_newBlockFilter();
            case p.JSONRPCMethod.eth_newPendingTransactionFilter:
              return this._eth_newPendingTransactionFilter();
            case p.JSONRPCMethod.eth_getFilterChanges:
              return this._eth_getFilterChanges(r);
            case p.JSONRPCMethod.eth_getFilterLogs:
              return this._eth_getFilterLogs(r);
          }
        }
        _handleSubscriptionMethods(t) {
          switch (t.method) {
            case p.JSONRPCMethod.eth_subscribe:
            case p.JSONRPCMethod.eth_unsubscribe:
              return this._subscriptionManager.handleRequest(t);
          }
        }
        _isKnownAddress(t) {
          try {
            let e = (0, h.ensureAddressString)(t),
              r = this._addresses.map((t) => (0, h.ensureAddressString)(t));
            return r.includes(e);
          } catch (t) {}
          return !1;
        }
        _ensureKnownAddress(t) {
          var e;
          if (!this._isKnownAddress(t))
            throw (
              (null === (e = this.diagnostic) ||
                void 0 === e ||
                e.log(u.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED),
              Error("Unknown Ethereum address"))
            );
        }
        _prepareTransactionParams(t) {
          let e = t.from
            ? (0, h.ensureAddressString)(t.from)
            : this.selectedAddress;
          if (!e) throw Error("Ethereum address is unavailable");
          this._ensureKnownAddress(e);
          let r = t.to ? (0, h.ensureAddressString)(t.to) : null,
            i = null != t.value ? (0, h.ensureBN)(t.value) : new s.default(0),
            o = t.data ? (0, h.ensureBuffer)(t.data) : n.alloc(0),
            a = null != t.nonce ? (0, h.ensureIntNumber)(t.nonce) : null,
            u = null != t.gasPrice ? (0, h.ensureBN)(t.gasPrice) : null,
            c = null != t.maxFeePerGas ? (0, h.ensureBN)(t.maxFeePerGas) : null,
            l =
              null != t.maxPriorityFeePerGas
                ? (0, h.ensureBN)(t.maxPriorityFeePerGas)
                : null,
            d = null != t.gas ? (0, h.ensureBN)(t.gas) : null,
            f = this.getChainId();
          return {
            fromAddress: e,
            toAddress: r,
            weiValue: i,
            data: o,
            nonce: a,
            gasPriceInWei: u,
            maxFeePerGas: c,
            maxPriorityFeePerGas: l,
            gasLimit: d,
            chainId: f,
          };
        }
        _isAuthorized() {
          return this._addresses.length > 0;
        }
        _requireAuthorization() {
          if (!this._isAuthorized())
            throw a.ethErrors.provider.unauthorized({});
        }
        _throwUnsupportedMethodError() {
          throw a.ethErrors.provider.unsupportedMethod({});
        }
        async _signEthereumMessage(t, e, r, n) {
          this._ensureKnownAddress(e);
          try {
            let i = await this.initializeRelay(),
              o = await i.signEthereumMessage(t, e, r, n).promise;
            return { jsonrpc: "2.0", id: 0, result: o.result };
          } catch (t) {
            if (
              "string" == typeof t.message &&
              t.message.match(/(denied|rejected)/i)
            )
              throw a.ethErrors.provider.userRejectedRequest(
                "User denied message signature"
              );
            throw t;
          }
        }
        async _ethereumAddressFromSignedMessage(t, e, r) {
          let n = await this.initializeRelay(),
            i = await n.ethereumAddressFromSignedMessage(t, e, r).promise;
          return { jsonrpc: "2.0", id: 0, result: i.result };
        }
        _eth_accounts() {
          return [...this._addresses];
        }
        _eth_coinbase() {
          return this.selectedAddress || null;
        }
        _net_version() {
          return this.getChainId().toString(10);
        }
        _eth_chainId() {
          return (0, h.hexStringFromIntNumber)(this.getChainId());
        }
        getChainId() {
          let t = this._storage.getItem(g);
          if (!t) return (0, h.ensureIntNumber)(this._chainIdFromOpts);
          let e = parseInt(t, 10);
          return (0, h.ensureIntNumber)(e);
        }
        async _eth_requestAccounts() {
          var t;
          let e;
          if (
            (null === (t = this.diagnostic) ||
              void 0 === t ||
              t.log(u.EVENTS.ETH_ACCOUNTS_STATE, {
                method: "provider::_eth_requestAccounts",
                addresses_length: this._addresses.length,
                sessionIdHash: this._relay
                  ? c.Session.hash(this._relay.session.id)
                  : void 0,
              }),
            this._addresses.length > 0)
          )
            return Promise.resolve({
              jsonrpc: "2.0",
              id: 0,
              result: this._addresses,
            });
          try {
            let t = await this.initializeRelay();
            e = await t.requestEthereumAccounts().promise;
          } catch (t) {
            if (
              "string" == typeof t.message &&
              t.message.match(/(denied|rejected)/i)
            )
              throw a.ethErrors.provider.userRejectedRequest(
                "User denied account authorization"
              );
            throw t;
          }
          if (!e.result) throw Error("accounts received is empty");
          return (
            this._setAddresses(e.result),
            this.isLedger ||
              this.isCoinbaseBrowser ||
              (await this.switchEthereumChain(this.getChainId())),
            { jsonrpc: "2.0", id: 0, result: this._addresses }
          );
        }
        _eth_sign(t) {
          this._requireAuthorization();
          let e = (0, h.ensureAddressString)(t[0]),
            r = (0, h.ensureBuffer)(t[1]);
          return this._signEthereumMessage(r, e, !1);
        }
        _eth_ecRecover(t) {
          let e = (0, h.ensureBuffer)(t[0]),
            r = (0, h.ensureBuffer)(t[1]);
          return this._ethereumAddressFromSignedMessage(e, r, !1);
        }
        _personal_sign(t) {
          this._requireAuthorization();
          let e = (0, h.ensureBuffer)(t[0]),
            r = (0, h.ensureAddressString)(t[1]);
          return this._signEthereumMessage(e, r, !0);
        }
        _personal_ecRecover(t) {
          let e = (0, h.ensureBuffer)(t[0]),
            r = (0, h.ensureBuffer)(t[1]);
          return this._ethereumAddressFromSignedMessage(e, r, !0);
        }
        async _eth_signTransaction(t) {
          this._requireAuthorization();
          let e = this._prepareTransactionParams(t[0] || {});
          try {
            let t = await this.initializeRelay(),
              r = await t.signEthereumTransaction(e).promise;
            return { jsonrpc: "2.0", id: 0, result: r.result };
          } catch (t) {
            if (
              "string" == typeof t.message &&
              t.message.match(/(denied|rejected)/i)
            )
              throw a.ethErrors.provider.userRejectedRequest(
                "User denied transaction signature"
              );
            throw t;
          }
        }
        async _eth_sendRawTransaction(t) {
          let e = (0, h.ensureBuffer)(t[0]),
            r = await this.initializeRelay(),
            n = await r.submitEthereumTransaction(e, this.getChainId()).promise;
          return { jsonrpc: "2.0", id: 0, result: n.result };
        }
        async _eth_sendTransaction(t) {
          this._requireAuthorization();
          let e = this._prepareTransactionParams(t[0] || {});
          try {
            let t = await this.initializeRelay(),
              r = await t.signAndSubmitEthereumTransaction(e).promise;
            return { jsonrpc: "2.0", id: 0, result: r.result };
          } catch (t) {
            if (
              "string" == typeof t.message &&
              t.message.match(/(denied|rejected)/i)
            )
              throw a.ethErrors.provider.userRejectedRequest(
                "User denied transaction signature"
              );
            throw t;
          }
        }
        async _eth_signTypedData_v1(t) {
          this._requireAuthorization();
          let e = (0, h.ensureParsedJSONObject)(t[0]),
            r = (0, h.ensureAddressString)(t[1]);
          this._ensureKnownAddress(r);
          let n = d.default.hashForSignTypedDataLegacy({ data: e }),
            i = JSON.stringify(e, null, 2);
          return this._signEthereumMessage(n, r, !1, i);
        }
        async _eth_signTypedData_v3(t) {
          this._requireAuthorization();
          let e = (0, h.ensureAddressString)(t[0]),
            r = (0, h.ensureParsedJSONObject)(t[1]);
          this._ensureKnownAddress(e);
          let n = d.default.hashForSignTypedData_v3({ data: r }),
            i = JSON.stringify(r, null, 2);
          return this._signEthereumMessage(n, e, !1, i);
        }
        async _eth_signTypedData_v4(t) {
          this._requireAuthorization();
          let e = (0, h.ensureAddressString)(t[0]),
            r = (0, h.ensureParsedJSONObject)(t[1]);
          this._ensureKnownAddress(e);
          let n = d.default.hashForSignTypedData_v4({ data: r }),
            i = JSON.stringify(r, null, 2);
          return this._signEthereumMessage(n, e, !1, i);
        }
        async _cbwallet_arbitrary(t) {
          let e = t[0],
            r = t[1];
          if ("string" != typeof r) throw Error("parameter must be a string");
          if ("object" != typeof e || null === e)
            throw Error("parameter must be an object");
          let n = await this.genericRequest(e, r);
          return { jsonrpc: "2.0", id: 0, result: n };
        }
        async _wallet_addEthereumChain(t) {
          var e, r, n, i;
          let o = t[0];
          if (
            (null === (e = o.rpcUrls) || void 0 === e ? void 0 : e.length) === 0
          )
            return {
              jsonrpc: "2.0",
              id: 0,
              error: { code: 2, message: "please pass in at least 1 rpcUrl" },
            };
          if (!o.chainName || "" === o.chainName.trim())
            throw a.ethErrors.provider.custom({
              code: 0,
              message: "chainName is a required field",
            });
          if (!o.nativeCurrency)
            throw a.ethErrors.provider.custom({
              code: 0,
              message: "nativeCurrency is a required field",
            });
          let s = parseInt(o.chainId, 16),
            u = await this.addEthereumChain(
              s,
              null !== (r = o.rpcUrls) && void 0 !== r ? r : [],
              null !== (n = o.blockExplorerUrls) && void 0 !== n ? n : [],
              o.chainName,
              null !== (i = o.iconUrls) && void 0 !== i ? i : [],
              o.nativeCurrency
            );
          return u
            ? { jsonrpc: "2.0", id: 0, result: null }
            : {
                jsonrpc: "2.0",
                id: 0,
                error: { code: 2, message: "unable to add ethereum chain" },
              };
        }
        async _wallet_switchEthereumChain(t) {
          let e = t[0];
          return (
            await this.switchEthereumChain(parseInt(e.chainId, 16)),
            { jsonrpc: "2.0", id: 0, result: null }
          );
        }
        async _wallet_watchAsset(t) {
          let e = Array.isArray(t) ? t[0] : t;
          if (!e.type)
            throw a.ethErrors.rpc.invalidParams({
              message: "Type is required",
            });
          if ((null == e ? void 0 : e.type) !== "ERC20")
            throw a.ethErrors.rpc.invalidParams({
              message: `Asset of type '${e.type}' is not supported`,
            });
          if (!(null == e ? void 0 : e.options))
            throw a.ethErrors.rpc.invalidParams({
              message: "Options are required",
            });
          if (!(null == e ? void 0 : e.options.address))
            throw a.ethErrors.rpc.invalidParams({
              message: "Address is required",
            });
          let r = this.getChainId(),
            { address: n, symbol: i, image: o, decimals: s } = e.options,
            u = await this.watchAsset(e.type, n, i, s, o, r);
          return { jsonrpc: "2.0", id: 0, result: u };
        }
        _eth_uninstallFilter(t) {
          let e = (0, h.ensureHexString)(t[0]);
          return this._filterPolyfill.uninstallFilter(e);
        }
        async _eth_newFilter(t) {
          let e = t[0],
            r = await this._filterPolyfill.newFilter(e);
          return { jsonrpc: "2.0", id: 0, result: r };
        }
        async _eth_newBlockFilter() {
          let t = await this._filterPolyfill.newBlockFilter();
          return { jsonrpc: "2.0", id: 0, result: t };
        }
        async _eth_newPendingTransactionFilter() {
          let t = await this._filterPolyfill.newPendingTransactionFilter();
          return { jsonrpc: "2.0", id: 0, result: t };
        }
        _eth_getFilterChanges(t) {
          let e = (0, h.ensureHexString)(t[0]);
          return this._filterPolyfill.getFilterChanges(e);
        }
        _eth_getFilterLogs(t) {
          let e = (0, h.ensureHexString)(t[0]);
          return this._filterPolyfill.getFilterLogs(e);
        }
        initializeRelay() {
          return this._relay
            ? Promise.resolve(this._relay)
            : this._relayProvider().then(
                (t) => (
                  t.setAccountsCallback((t, e) => this._setAddresses(t, e)),
                  t.setChainCallback((t, e) => {
                    this.updateProviderInfo(e, parseInt(t, 10));
                  }),
                  t.setDappDefaultChainCallback(this._chainIdFromOpts),
                  (this._relay = t),
                  t
                )
              );
        }
      }
      e.CoinbaseWalletProvider = b;
    },
    33648: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.filterFromParam = e.FilterPolyfill = void 0);
      let n = r(91295),
        i = r(94643),
        o = { jsonrpc: "2.0", id: 0 };
      function s(t) {
        return {
          fromBlock: u(t.fromBlock),
          toBlock: u(t.toBlock),
          addresses:
            void 0 === t.address
              ? null
              : Array.isArray(t.address)
              ? t.address
              : [t.address],
          topics: t.topics || [],
        };
      }
      function a(t) {
        let e = {
          fromBlock: c(t.fromBlock),
          toBlock: c(t.toBlock),
          topics: t.topics,
        };
        return null !== t.addresses && (e.address = t.addresses), e;
      }
      function u(t) {
        if (void 0 === t || "latest" === t || "pending" === t) return "latest";
        if ("earliest" === t) return (0, n.IntNumber)(0);
        if ((0, i.isHexString)(t)) return (0, i.intNumberFromHexString)(t);
        throw Error(`Invalid block option: ${String(t)}`);
      }
      function c(t) {
        return "latest" === t ? t : (0, i.hexStringFromIntNumber)(t);
      }
      function l() {
        return Object.assign(Object.assign({}, o), {
          error: { code: -32e3, message: "filter not found" },
        });
      }
      function h() {
        return Object.assign(Object.assign({}, o), { result: [] });
      }
      (e.FilterPolyfill = class {
        constructor(t) {
          (this.logFilters = new Map()),
            (this.blockFilters = new Set()),
            (this.pendingTransactionFilters = new Set()),
            (this.cursors = new Map()),
            (this.timeouts = new Map()),
            (this.nextFilterId = (0, n.IntNumber)(1)),
            (this.provider = t);
        }
        async newFilter(t) {
          let e = s(t),
            r = this.makeFilterId(),
            n = await this.setInitialCursorPosition(r, e.fromBlock);
          return (
            console.log(
              `Installing new log filter(${r}):`,
              e,
              "initial cursor position:",
              n
            ),
            this.logFilters.set(r, e),
            this.setFilterTimeout(r),
            (0, i.hexStringFromIntNumber)(r)
          );
        }
        async newBlockFilter() {
          let t = this.makeFilterId(),
            e = await this.setInitialCursorPosition(t, "latest");
          return (
            console.log(
              `Installing new block filter (${t}) with initial cursor position:`,
              e
            ),
            this.blockFilters.add(t),
            this.setFilterTimeout(t),
            (0, i.hexStringFromIntNumber)(t)
          );
        }
        async newPendingTransactionFilter() {
          let t = this.makeFilterId(),
            e = await this.setInitialCursorPosition(t, "latest");
          return (
            console.log(
              `Installing new block filter (${t}) with initial cursor position:`,
              e
            ),
            this.pendingTransactionFilters.add(t),
            this.setFilterTimeout(t),
            (0, i.hexStringFromIntNumber)(t)
          );
        }
        uninstallFilter(t) {
          let e = (0, i.intNumberFromHexString)(t);
          return (
            console.log(`Uninstalling filter (${e})`), this.deleteFilter(e), !0
          );
        }
        getFilterChanges(t) {
          let e = (0, i.intNumberFromHexString)(t);
          return (this.timeouts.has(e) && this.setFilterTimeout(e),
          this.logFilters.has(e))
            ? this.getLogFilterChanges(e)
            : this.blockFilters.has(e)
            ? this.getBlockFilterChanges(e)
            : this.pendingTransactionFilters.has(e)
            ? this.getPendingTransactionFilterChanges(e)
            : Promise.resolve(l());
        }
        async getFilterLogs(t) {
          let e = (0, i.intNumberFromHexString)(t),
            r = this.logFilters.get(e);
          return r
            ? this.sendAsyncPromise(
                Object.assign(Object.assign({}, o), {
                  method: "eth_getLogs",
                  params: [a(r)],
                })
              )
            : l();
        }
        makeFilterId() {
          return (0, n.IntNumber)(++this.nextFilterId);
        }
        sendAsyncPromise(t) {
          return new Promise((e, r) => {
            this.provider.sendAsync(t, (t, n) =>
              t
                ? r(t)
                : Array.isArray(n) || null == n
                ? r(Error(`unexpected response received: ${JSON.stringify(n)}`))
                : void e(n)
            );
          });
        }
        deleteFilter(t) {
          console.log(`Deleting filter (${t})`),
            this.logFilters.delete(t),
            this.blockFilters.delete(t),
            this.pendingTransactionFilters.delete(t),
            this.cursors.delete(t),
            this.timeouts.delete(t);
        }
        async getLogFilterChanges(t) {
          let e = this.logFilters.get(t),
            r = this.cursors.get(t);
          if (!r || !e) return l();
          let s = await this.getCurrentBlockHeight(),
            u = "latest" === e.toBlock ? s : e.toBlock;
          if (r > s || r > e.toBlock) return h();
          console.log(`Fetching logs from ${r} to ${u} for filter ${t}`);
          let c = await this.sendAsyncPromise(
            Object.assign(Object.assign({}, o), {
              method: "eth_getLogs",
              params: [
                a(
                  Object.assign(Object.assign({}, e), {
                    fromBlock: r,
                    toBlock: u,
                  })
                ),
              ],
            })
          );
          if (Array.isArray(c.result)) {
            let e = c.result.map((t) =>
                (0, i.intNumberFromHexString)(t.blockNumber || "0x0")
              ),
              o = Math.max(...e);
            if (o && o > r) {
              let e = (0, n.IntNumber)(o + 1);
              console.log(
                `Moving cursor position for filter (${t}) from ${r} to ${e}`
              ),
                this.cursors.set(t, e);
            }
          }
          return c;
        }
        async getBlockFilterChanges(t) {
          let e = this.cursors.get(t);
          if (!e) return l();
          let r = await this.getCurrentBlockHeight();
          if (e > r) return h();
          console.log(`Fetching blocks from ${e} to ${r} for filter (${t})`);
          let s = (
              await Promise.all(
                (0, i.range)(e, r + 1).map((t) =>
                  this.getBlockHashByNumber((0, n.IntNumber)(t))
                )
              )
            ).filter((t) => !!t),
            a = (0, n.IntNumber)(e + s.length);
          return (
            console.log(
              `Moving cursor position for filter (${t}) from ${e} to ${a}`
            ),
            this.cursors.set(t, a),
            Object.assign(Object.assign({}, o), { result: s })
          );
        }
        async getPendingTransactionFilterChanges(t) {
          return Promise.resolve(h());
        }
        async setInitialCursorPosition(t, e) {
          let r = await this.getCurrentBlockHeight(),
            n = "number" == typeof e && e > r ? e : r;
          return this.cursors.set(t, n), n;
        }
        setFilterTimeout(t) {
          let e = this.timeouts.get(t);
          e && window.clearTimeout(e);
          let r = window.setTimeout(() => {
            console.log(`Filter (${t}) timed out`), this.deleteFilter(t);
          }, 3e5);
          this.timeouts.set(t, r);
        }
        async getCurrentBlockHeight() {
          let { result: t } = await this.sendAsyncPromise(
            Object.assign(Object.assign({}, o), {
              method: "eth_blockNumber",
              params: [],
            })
          );
          return (0, i.intNumberFromHexString)((0, i.ensureHexString)(t));
        }
        async getBlockHashByNumber(t) {
          let e = await this.sendAsyncPromise(
            Object.assign(Object.assign({}, o), {
              method: "eth_getBlockByNumber",
              params: [(0, i.hexStringFromIntNumber)(t), !1],
            })
          );
          return e.result && "string" == typeof e.result.hash
            ? (0, i.ensureHexString)(e.result.hash)
            : null;
        }
      }),
        (e.filterFromParam = s);
    },
    28565: function (t, e) {
      "use strict";
      var r;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.JSONRPCMethod = void 0),
        ((r = e.JSONRPCMethod || (e.JSONRPCMethod = {})).eth_accounts =
          "eth_accounts"),
        (r.eth_coinbase = "eth_coinbase"),
        (r.net_version = "net_version"),
        (r.eth_chainId = "eth_chainId"),
        (r.eth_uninstallFilter = "eth_uninstallFilter"),
        (r.eth_requestAccounts = "eth_requestAccounts"),
        (r.eth_sign = "eth_sign"),
        (r.eth_ecRecover = "eth_ecRecover"),
        (r.personal_sign = "personal_sign"),
        (r.personal_ecRecover = "personal_ecRecover"),
        (r.eth_signTransaction = "eth_signTransaction"),
        (r.eth_sendRawTransaction = "eth_sendRawTransaction"),
        (r.eth_sendTransaction = "eth_sendTransaction"),
        (r.eth_signTypedData_v1 = "eth_signTypedData_v1"),
        (r.eth_signTypedData_v2 = "eth_signTypedData_v2"),
        (r.eth_signTypedData_v3 = "eth_signTypedData_v3"),
        (r.eth_signTypedData_v4 = "eth_signTypedData_v4"),
        (r.eth_signTypedData = "eth_signTypedData"),
        (r.cbWallet_arbitrary = "walletlink_arbitrary"),
        (r.wallet_addEthereumChain = "wallet_addEthereumChain"),
        (r.wallet_switchEthereumChain = "wallet_switchEthereumChain"),
        (r.wallet_watchAsset = "wallet_watchAsset"),
        (r.eth_subscribe = "eth_subscribe"),
        (r.eth_unsubscribe = "eth_unsubscribe"),
        (r.eth_newFilter = "eth_newFilter"),
        (r.eth_newBlockFilter = "eth_newBlockFilter"),
        (r.eth_newPendingTransactionFilter = "eth_newPendingTransactionFilter"),
        (r.eth_getFilterChanges = "eth_getFilterChanges"),
        (r.eth_getFilterLogs = "eth_getFilterLogs");
    },
    5313: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.SubscriptionManager = void 0);
      let n = r(6842),
        i = r(68961),
        o = () => {};
      e.SubscriptionManager = class {
        constructor(t) {
          let e = new n.PollingBlockTracker({
              provider: t,
              pollingInterval: 15e3,
              setSkipCacheFlag: !0,
            }),
            { events: r, middleware: o } = i({ blockTracker: e, provider: t });
          (this.events = r), (this.subscriptionMiddleware = o);
        }
        async handleRequest(t) {
          let e = {};
          return await this.subscriptionMiddleware(t, e, o, o), e;
        }
        destroy() {
          this.subscriptionMiddleware.destroy();
        }
      };
    },
    31405: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.WalletSDKUI = void 0);
      let n = r(27759),
        i = r(19199),
        o = r(27162);
      e.WalletSDKUI = class {
        constructor(t) {
          (this.standalone = null),
            (this.attached = !1),
            (this.appSrc = null),
            (this.snackbar = new i.Snackbar({ darkMode: t.darkMode })),
            (this.linkFlow = new n.LinkFlow({
              darkMode: t.darkMode,
              version: t.version,
              sessionId: t.session.id,
              sessionSecret: t.session.secret,
              linkAPIUrl: t.linkAPIUrl,
              connected$: t.connected$,
              chainId$: t.chainId$,
              isParentConnection: !1,
            }));
        }
        attach() {
          if (this.attached)
            throw Error("Coinbase Wallet SDK UI is already attached");
          let t = document.documentElement,
            e = document.createElement("div");
          (e.className = "-cbwsdk-css-reset"),
            t.appendChild(e),
            this.linkFlow.attach(e),
            this.snackbar.attach(e),
            (this.attached = !0),
            (0, o.injectCssReset)();
        }
        setConnectDisabled(t) {
          this.linkFlow.setConnectDisabled(t);
        }
        addEthereumChain(t) {}
        watchAsset(t) {}
        switchEthereumChain(t) {}
        requestEthereumAccounts(t) {
          this.linkFlow.open({ onCancel: t.onCancel });
        }
        hideRequestEthereumAccounts() {
          this.linkFlow.close();
        }
        signEthereumMessage(t) {}
        signEthereumTransaction(t) {}
        submitEthereumTransaction(t) {}
        ethereumAddressFromSignedMessage(t) {}
        showConnecting(t) {
          let e;
          return (
            (e = t.isUnlinkedErrorState
              ? {
                  autoExpand: !0,
                  message: "Connection lost",
                  appSrc: this.appSrc,
                  menuItems: [
                    {
                      isRed: !1,
                      info: "Reset connection",
                      svgWidth: "10",
                      svgHeight: "11",
                      path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                      defaultFillRule: "evenodd",
                      defaultClipRule: "evenodd",
                      onClick: t.onResetConnection,
                    },
                  ],
                }
              : {
                  message: "Confirm on phone",
                  appSrc: this.appSrc,
                  menuItems: [
                    {
                      isRed: !0,
                      info: "Cancel transaction",
                      svgWidth: "11",
                      svgHeight: "11",
                      path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
                      defaultFillRule: "inherit",
                      defaultClipRule: "inherit",
                      onClick: t.onCancel,
                    },
                    {
                      isRed: !1,
                      info: "Reset connection",
                      svgWidth: "10",
                      svgHeight: "11",
                      path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                      defaultFillRule: "evenodd",
                      defaultClipRule: "evenodd",
                      onClick: t.onResetConnection,
                    },
                  ],
                }),
            this.snackbar.presentItem(e)
          );
        }
        setAppSrc(t) {
          this.appSrc = t;
        }
        reloadUI() {
          document.location.reload();
        }
        inlineAccountsResponse() {
          return !1;
        }
        inlineAddEthereumChain(t) {
          return !1;
        }
        inlineWatchAsset() {
          return !1;
        }
        inlineSwitchEthereumChain() {
          return !1;
        }
        setStandalone(t) {
          this.standalone = t;
        }
        isStandalone() {
          var t;
          return null !== (t = this.standalone) && void 0 !== t && t;
        }
      };
    },
    64493: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.WalletUIError = void 0);
      class r extends Error {
        constructor(t, e) {
          super(t), (this.message = t), (this.errorCode = e);
        }
      }
      (e.WalletUIError = r),
        (r.UserRejectedRequest = new r("User rejected request")),
        (r.SwitchEthereumChainUnsupportedChainId = new r(
          "Unsupported chainId",
          4902
        ));
    },
    85813: function (t, e) {
      "use strict";
      var r;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.RelayMessageType = void 0),
        ((r =
          e.RelayMessageType || (e.RelayMessageType = {})).SESSION_ID_REQUEST =
          "SESSION_ID_REQUEST"),
        (r.SESSION_ID_RESPONSE = "SESSION_ID_RESPONSE"),
        (r.LINKED = "LINKED"),
        (r.UNLINKED = "UNLINKED"),
        (r.WEB3_REQUEST = "WEB3_REQUEST"),
        (r.WEB3_REQUEST_CANCELED = "WEB3_REQUEST_CANCELED"),
        (r.WEB3_RESPONSE = "WEB3_RESPONSE");
    },
    73526: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Session = void 0);
      let n = r(89072),
        i = r(94643),
        o = "session:id",
        s = "session:secret",
        a = "session:linked";
      class u {
        constructor(t, e, r, o) {
          (this._storage = t),
            (this._id = e || (0, i.randomBytesHex)(16)),
            (this._secret = r || (0, i.randomBytesHex)(32)),
            (this._key = new n.sha256()
              .update(`${this._id}, ${this._secret} WalletLink`)
              .digest("hex")),
            (this._linked = !!o);
        }
        static load(t) {
          let e = t.getItem(o),
            r = t.getItem(a),
            n = t.getItem(s);
          return e && n ? new u(t, e, n, "1" === r) : null;
        }
        static hash(t) {
          return new n.sha256().update(t).digest("hex");
        }
        get id() {
          return this._id;
        }
        get secret() {
          return this._secret;
        }
        get key() {
          return this._key;
        }
        get linked() {
          return this._linked;
        }
        set linked(t) {
          (this._linked = t), this.persistLinked();
        }
        save() {
          return (
            this._storage.setItem(o, this._id),
            this._storage.setItem(s, this._secret),
            this.persistLinked(),
            this
          );
        }
        persistLinked() {
          this._storage.setItem(a, this._linked ? "1" : "0");
        }
      }
      e.Session = u;
    },
    16570: function (t, e, r) {
      "use strict";
      var n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (t, e, r, n) {
                void 0 === n && (n = r),
                  Object.defineProperty(t, n, {
                    enumerable: !0,
                    get: function () {
                      return e[r];
                    },
                  });
              }
            : function (t, e, r, n) {
                void 0 === n && (n = r), (t[n] = e[r]);
              }),
        i =
          (this && this.__setModuleDefault) ||
          (Object.create
            ? function (t, e) {
                Object.defineProperty(t, "default", {
                  enumerable: !0,
                  value: e,
                });
              }
            : function (t, e) {
                t.default = e;
              }),
        o =
          (this && this.__decorate) ||
          function (t, e, r, n) {
            var i,
              o = arguments.length,
              s =
                o < 3
                  ? e
                  : null === n
                  ? (n = Object.getOwnPropertyDescriptor(e, r))
                  : n;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              s = Reflect.decorate(t, e, r, n);
            else
              for (var a = t.length - 1; a >= 0; a--)
                (i = t[a]) &&
                  (s = (o < 3 ? i(s) : o > 3 ? i(e, r, s) : i(e, r)) || s);
            return o > 3 && s && Object.defineProperty(e, r, s), s;
          },
        s =
          (this && this.__importStar) ||
          function (t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var r in t)
                "default" !== r &&
                  Object.prototype.hasOwnProperty.call(t, r) &&
                  n(e, t, r);
            return i(e, t), e;
          },
        a =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.WalletSDKRelay = void 0);
      let u = a(r(47056)),
        c = r(79826),
        l = r(88710),
        h = r(42100),
        d = r(32191),
        f = r(18876),
        p = r(64493),
        y = r(91295),
        g = r(94643),
        m = s(r(20235)),
        b = r(73526),
        v = r(15633),
        _ = r(93083),
        w = r(85186),
        E = r(3770),
        S = r(67386),
        M = r(50287);
      class x extends v.WalletSDKRelayAbstract {
        constructor(t) {
          var e;
          super(),
            (this.accountsCallback = null),
            (this.chainCallback = null),
            (this.dappDefaultChainSubject = new l.BehaviorSubject(1)),
            (this.dappDefaultChain = 1),
            (this.appName = ""),
            (this.appLogoUrl = null),
            (this.subscriptions = new l.Subscription()),
            (this.linkAPIUrl = t.linkAPIUrl),
            (this.storage = t.storage),
            (this.options = t);
          let { session: r, ui: n, connection: i } = this.subscribe();
          if (
            ((this._session = r),
            (this.connection = i),
            (this.relayEventManager = t.relayEventManager),
            t.diagnosticLogger && t.eventListener)
          )
            throw Error(
              "Can't have both eventListener and diagnosticLogger options, use only diagnosticLogger"
            );
          t.eventListener
            ? (this.diagnostic = { log: t.eventListener.onEvent })
            : (this.diagnostic = t.diagnosticLogger),
            (this._reloadOnDisconnect =
              null === (e = t.reloadOnDisconnect) || void 0 === e || e),
            (this.ui = n);
        }
        subscribe() {
          this.subscriptions.add(
            this.dappDefaultChainSubject.subscribe((t) => {
              this.dappDefaultChain !== t && (this.dappDefaultChain = t);
            })
          );
          let t =
              b.Session.load(this.storage) ||
              new b.Session(this.storage).save(),
            e = new f.WalletSDKConnection(
              t.id,
              t.key,
              this.linkAPIUrl,
              this.diagnostic
            );
          this.subscriptions.add(
            e.sessionConfig$.subscribe({
              next: (t) => {
                this.onSessionConfigChanged(t);
              },
              error: () => {
                var t;
                null === (t = this.diagnostic) ||
                  void 0 === t ||
                  t.log(d.EVENTS.GENERAL_ERROR, {
                    message: "error while invoking session config callback",
                  });
              },
            })
          ),
            this.subscriptions.add(
              e.incomingEvent$
                .pipe((0, h.filter)((t) => "Web3Response" === t.event))
                .subscribe({ next: this.handleIncomingEvent })
            ),
            this.subscriptions.add(
              e.linked$
                .pipe(
                  (0, h.skip)(1),
                  (0, h.tap)((t) => {
                    var e;
                    this.isLinked = t;
                    let r = this.storage.getItem(v.LOCAL_STORAGE_ADDRESSES_KEY);
                    if (
                      (t && (this.session.linked = t),
                      (this.isUnlinkedErrorState = !1),
                      r)
                    ) {
                      let n = r.split(" "),
                        i =
                          "true" ===
                          this.storage.getItem("IsStandaloneSigning");
                      if ("" !== n[0] && !t && this.session.linked && !i) {
                        this.isUnlinkedErrorState = !0;
                        let t = this.getSessionIdHash();
                        null === (e = this.diagnostic) ||
                          void 0 === e ||
                          e.log(d.EVENTS.UNLINKED_ERROR_STATE, {
                            sessionIdHash: t,
                          });
                      }
                    }
                  })
                )
                .subscribe()
            ),
            this.subscriptions.add(
              e.sessionConfig$
                .pipe(
                  (0, h.filter)(
                    (t) => !!t.metadata && "1" === t.metadata.__destroyed
                  )
                )
                .subscribe(() => {
                  var t;
                  let r = e.isDestroyed;
                  return (
                    null === (t = this.diagnostic) ||
                      void 0 === t ||
                      t.log(d.EVENTS.METADATA_DESTROYED, {
                        alreadyDestroyed: r,
                        sessionIdHash: this.getSessionIdHash(),
                      }),
                    this.resetAndReload()
                  );
                })
            ),
            this.subscriptions.add(
              e.sessionConfig$
                .pipe(
                  (0, h.filter)(
                    (t) => t.metadata && void 0 !== t.metadata.WalletUsername
                  )
                )
                .pipe(
                  (0, h.mergeMap)((e) =>
                    m.decrypt(e.metadata.WalletUsername, t.secret)
                  )
                )
                .subscribe({
                  next: (t) => {
                    this.storage.setItem(v.WALLET_USER_NAME_KEY, t);
                  },
                  error: () => {
                    var t;
                    null === (t = this.diagnostic) ||
                      void 0 === t ||
                      t.log(d.EVENTS.GENERAL_ERROR, {
                        message: "Had error decrypting",
                        value: "username",
                      });
                  },
                })
            ),
            this.subscriptions.add(
              e.sessionConfig$
                .pipe(
                  (0, h.filter)(
                    (t) => t.metadata && void 0 !== t.metadata.AppVersion
                  )
                )
                .pipe(
                  (0, h.mergeMap)((e) =>
                    m.decrypt(e.metadata.AppVersion, t.secret)
                  )
                )
                .subscribe({
                  next: (t) => {
                    this.storage.setItem(v.APP_VERSION_KEY, t);
                  },
                  error: () => {
                    var t;
                    null === (t = this.diagnostic) ||
                      void 0 === t ||
                      t.log(d.EVENTS.GENERAL_ERROR, {
                        message: "Had error decrypting",
                        value: "appversion",
                      });
                  },
                })
            ),
            this.subscriptions.add(
              e.sessionConfig$
                .pipe(
                  (0, h.filter)(
                    (t) =>
                      t.metadata &&
                      void 0 !== t.metadata.ChainId &&
                      void 0 !== t.metadata.JsonRpcUrl
                  )
                )
                .pipe(
                  (0, h.mergeMap)((e) =>
                    (0, l.zip)(
                      m.decrypt(e.metadata.ChainId, t.secret),
                      m.decrypt(e.metadata.JsonRpcUrl, t.secret)
                    )
                  )
                )
                .pipe((0, h.distinctUntilChanged)())
                .subscribe({
                  next: ([t, e]) => {
                    this.chainCallback && this.chainCallback(t, e);
                  },
                  error: () => {
                    var t;
                    null === (t = this.diagnostic) ||
                      void 0 === t ||
                      t.log(d.EVENTS.GENERAL_ERROR, {
                        message: "Had error decrypting",
                        value: "chainId|jsonRpcUrl",
                      });
                  },
                })
            ),
            this.subscriptions.add(
              e.sessionConfig$
                .pipe(
                  (0, h.filter)(
                    (t) => t.metadata && void 0 !== t.metadata.EthereumAddress
                  )
                )
                .pipe(
                  (0, h.mergeMap)((e) =>
                    m.decrypt(e.metadata.EthereumAddress, t.secret)
                  )
                )
                .subscribe({
                  next: (t) => {
                    this.accountsCallback && this.accountsCallback([t]),
                      x.accountRequestCallbackIds.size > 0 &&
                        (Array.from(
                          x.accountRequestCallbackIds.values()
                        ).forEach((e) => {
                          let r = (0, M.Web3ResponseMessage)({
                            id: e,
                            response: (0, S.RequestEthereumAccountsResponse)([
                              t,
                            ]),
                          });
                          this.invokeCallback(
                            Object.assign(Object.assign({}, r), { id: e })
                          );
                        }),
                        x.accountRequestCallbackIds.clear());
                  },
                  error: () => {
                    var t;
                    null === (t = this.diagnostic) ||
                      void 0 === t ||
                      t.log(d.EVENTS.GENERAL_ERROR, {
                        message: "Had error decrypting",
                        value: "selectedAddress",
                      });
                  },
                })
            ),
            this.subscriptions.add(
              e.sessionConfig$
                .pipe(
                  (0, h.filter)(
                    (t) => t.metadata && void 0 !== t.metadata.AppSrc
                  )
                )
                .pipe(
                  (0, h.mergeMap)((e) => m.decrypt(e.metadata.AppSrc, t.secret))
                )
                .subscribe({
                  next: (t) => {
                    this.ui.setAppSrc(t);
                  },
                  error: () => {
                    var t;
                    null === (t = this.diagnostic) ||
                      void 0 === t ||
                      t.log(d.EVENTS.GENERAL_ERROR, {
                        message: "Had error decrypting",
                        value: "appSrc",
                      });
                  },
                })
            );
          let r = this.options.uiConstructor({
            linkAPIUrl: this.options.linkAPIUrl,
            version: this.options.version,
            darkMode: this.options.darkMode,
            session: t,
            connected$: e.connected$,
            chainId$: this.dappDefaultChainSubject,
          });
          return e.connect(), { session: t, ui: r, connection: e };
        }
        attachUI() {
          this.ui.attach();
        }
        resetAndReload() {
          this.connection
            .setSessionMetadata("__destroyed", "1")
            .pipe(
              (0, h.timeout)(1e3),
              (0, h.catchError)((t) => (0, l.of)(null))
            )
            .subscribe(
              (t) => {
                var e, r, n;
                let i = this.ui.isStandalone();
                try {
                  this.subscriptions.unsubscribe();
                } catch (t) {
                  null === (e = this.diagnostic) ||
                    void 0 === e ||
                    e.log(d.EVENTS.GENERAL_ERROR, {
                      message: "Had error unsubscribing",
                    });
                }
                null === (r = this.diagnostic) ||
                  void 0 === r ||
                  r.log(d.EVENTS.SESSION_STATE_CHANGE, {
                    method: "relay::resetAndReload",
                    sessionMetadataChange: "__destroyed, 1",
                    sessionIdHash: this.getSessionIdHash(),
                  }),
                  this.connection.destroy();
                let o = b.Session.load(this.storage);
                if (
                  ((null == o ? void 0 : o.id) === this._session.id
                    ? this.storage.clear()
                    : o &&
                      (null === (n = this.diagnostic) ||
                        void 0 === n ||
                        n.log(d.EVENTS.SKIPPED_CLEARING_SESSION, {
                          sessionIdHash: this.getSessionIdHash(),
                          storedSessionIdHash: b.Session.hash(o.id),
                        })),
                  this._reloadOnDisconnect)
                ) {
                  this.ui.reloadUI();
                  return;
                }
                this.accountsCallback && this.accountsCallback([], !0),
                  (this.subscriptions = new l.Subscription());
                let { session: s, ui: a, connection: u } = this.subscribe();
                (this._session = s),
                  (this.connection = u),
                  (this.ui = a),
                  i && this.ui.setStandalone && this.ui.setStandalone(!0),
                  this.attachUI();
              },
              (t) => {
                var e;
                null === (e = this.diagnostic) ||
                  void 0 === e ||
                  e.log(d.EVENTS.FAILURE, {
                    method: "relay::resetAndReload",
                    message: `failed to reset and reload with ${t}`,
                    sessionIdHash: this.getSessionIdHash(),
                  });
              }
            );
        }
        setAppInfo(t, e) {
          (this.appName = t), (this.appLogoUrl = e);
        }
        getStorageItem(t) {
          return this.storage.getItem(t);
        }
        get session() {
          return this._session;
        }
        setStorageItem(t, e) {
          this.storage.setItem(t, e);
        }
        signEthereumMessage(t, e, r, n) {
          return this.sendRequest({
            method: _.Web3Method.signEthereumMessage,
            params: {
              message: (0, g.hexStringFromBuffer)(t, !0),
              address: e,
              addPrefix: r,
              typedDataJson: n || null,
            },
          });
        }
        ethereumAddressFromSignedMessage(t, e, r) {
          return this.sendRequest({
            method: _.Web3Method.ethereumAddressFromSignedMessage,
            params: {
              message: (0, g.hexStringFromBuffer)(t, !0),
              signature: (0, g.hexStringFromBuffer)(e, !0),
              addPrefix: r,
            },
          });
        }
        signEthereumTransaction(t) {
          return this.sendRequest({
            method: _.Web3Method.signEthereumTransaction,
            params: {
              fromAddress: t.fromAddress,
              toAddress: t.toAddress,
              weiValue: (0, g.bigIntStringFromBN)(t.weiValue),
              data: (0, g.hexStringFromBuffer)(t.data, !0),
              nonce: t.nonce,
              gasPriceInWei: t.gasPriceInWei
                ? (0, g.bigIntStringFromBN)(t.gasPriceInWei)
                : null,
              maxFeePerGas: t.gasPriceInWei
                ? (0, g.bigIntStringFromBN)(t.gasPriceInWei)
                : null,
              maxPriorityFeePerGas: t.gasPriceInWei
                ? (0, g.bigIntStringFromBN)(t.gasPriceInWei)
                : null,
              gasLimit: t.gasLimit
                ? (0, g.bigIntStringFromBN)(t.gasLimit)
                : null,
              chainId: t.chainId,
              shouldSubmit: !1,
            },
          });
        }
        signAndSubmitEthereumTransaction(t) {
          return this.sendRequest({
            method: _.Web3Method.signEthereumTransaction,
            params: {
              fromAddress: t.fromAddress,
              toAddress: t.toAddress,
              weiValue: (0, g.bigIntStringFromBN)(t.weiValue),
              data: (0, g.hexStringFromBuffer)(t.data, !0),
              nonce: t.nonce,
              gasPriceInWei: t.gasPriceInWei
                ? (0, g.bigIntStringFromBN)(t.gasPriceInWei)
                : null,
              maxFeePerGas: t.maxFeePerGas
                ? (0, g.bigIntStringFromBN)(t.maxFeePerGas)
                : null,
              maxPriorityFeePerGas: t.maxPriorityFeePerGas
                ? (0, g.bigIntStringFromBN)(t.maxPriorityFeePerGas)
                : null,
              gasLimit: t.gasLimit
                ? (0, g.bigIntStringFromBN)(t.gasLimit)
                : null,
              chainId: t.chainId,
              shouldSubmit: !0,
            },
          });
        }
        submitEthereumTransaction(t, e) {
          return this.sendRequest({
            method: _.Web3Method.submitEthereumTransaction,
            params: {
              signedTransaction: (0, g.hexStringFromBuffer)(t, !0),
              chainId: e,
            },
          });
        }
        scanQRCode(t) {
          return this.sendRequest({
            method: _.Web3Method.scanQRCode,
            params: { regExp: t },
          });
        }
        getQRCodeUrl() {
          return (0, g.createQrUrl)(
            this._session.id,
            this._session.secret,
            this.linkAPIUrl,
            !1,
            this.options.version,
            this.dappDefaultChain
          );
        }
        genericRequest(t, e) {
          return this.sendRequest({
            method: _.Web3Method.generic,
            params: { action: e, data: t },
          });
        }
        sendGenericMessage(t) {
          return this.sendRequest(t);
        }
        sendRequest(t) {
          let e = null,
            r = (0, g.randomBytesHex)(8),
            n = (n) => {
              this.publishWeb3RequestCanceledEvent(r),
                this.handleErrorResponse(r, t.method, n),
                null == e || e();
            },
            i = new Promise((i, o) => {
              this.ui.isStandalone() ||
                (e = this.ui.showConnecting({
                  isUnlinkedErrorState: this.isUnlinkedErrorState,
                  onCancel: n,
                  onResetConnection: this.resetAndReload,
                })),
                this.relayEventManager.callbacks.set(r, (t) => {
                  if ((null == e || e(), t.errorMessage))
                    return o(Error(t.errorMessage));
                  i(t);
                }),
                this.ui.isStandalone()
                  ? this.sendRequestStandalone(r, t)
                  : this.publishWeb3RequestEvent(r, t);
            });
          return { promise: i, cancel: n };
        }
        setConnectDisabled(t) {
          this.ui.setConnectDisabled(t);
        }
        setAccountsCallback(t) {
          this.accountsCallback = t;
        }
        setChainCallback(t) {
          this.chainCallback = t;
        }
        setDappDefaultChainCallback(t) {
          this.dappDefaultChainSubject.next(t);
        }
        publishWeb3RequestEvent(t, e) {
          var r;
          let n = (0, E.Web3RequestMessage)({ id: t, request: e }),
            i = b.Session.load(this.storage);
          null === (r = this.diagnostic) ||
            void 0 === r ||
            r.log(d.EVENTS.WEB3_REQUEST, {
              eventId: n.id,
              method: `relay::${n.request.method}`,
              sessionIdHash: this.getSessionIdHash(),
              storedSessionIdHash: i ? b.Session.hash(i.id) : "",
              isSessionMismatched: (
                (null == i ? void 0 : i.id) !== this._session.id
              ).toString(),
            }),
            this.subscriptions.add(
              this.publishEvent("Web3Request", n, !0).subscribe({
                next: (t) => {
                  var e;
                  null === (e = this.diagnostic) ||
                    void 0 === e ||
                    e.log(d.EVENTS.WEB3_REQUEST_PUBLISHED, {
                      eventId: n.id,
                      method: `relay::${n.request.method}`,
                      sessionIdHash: this.getSessionIdHash(),
                      storedSessionIdHash: i ? b.Session.hash(i.id) : "",
                      isSessionMismatched: (
                        (null == i ? void 0 : i.id) !== this._session.id
                      ).toString(),
                    });
                },
                error: (t) => {
                  this.handleWeb3ResponseMessage(
                    (0, M.Web3ResponseMessage)({
                      id: n.id,
                      response: {
                        method: n.request.method,
                        errorMessage: t.message,
                      },
                    })
                  );
                },
              })
            );
        }
        publishWeb3RequestCanceledEvent(t) {
          let e = (0, w.Web3RequestCanceledMessage)(t);
          this.subscriptions.add(
            this.publishEvent("Web3RequestCanceled", e, !1).subscribe()
          );
        }
        publishEvent(t, e, r) {
          let n = this.session.secret;
          return new l.Observable((t) => {
            m.encrypt(
              JSON.stringify(
                Object.assign(Object.assign({}, e), { origin: location.origin })
              ),
              n
            ).then((e) => {
              t.next(e), t.complete();
            });
          }).pipe(
            (0, h.mergeMap)((e) => this.connection.publishEvent(t, e, r))
          );
        }
        handleIncomingEvent(t) {
          try {
            this.subscriptions.add(
              (0, l.from)(m.decrypt(t.data, this.session.secret))
                .pipe((0, h.map)((t) => JSON.parse(t)))
                .subscribe({
                  next: (t) => {
                    let e = (0, M.isWeb3ResponseMessage)(t) ? t : null;
                    e && this.handleWeb3ResponseMessage(e);
                  },
                  error: () => {
                    var t;
                    null === (t = this.diagnostic) ||
                      void 0 === t ||
                      t.log(d.EVENTS.GENERAL_ERROR, {
                        message: "Had error decrypting",
                        value: "incomingEvent",
                      });
                  },
                })
            );
          } catch (t) {
            return;
          }
        }
        handleWeb3ResponseMessage(t) {
          var e;
          let { response: r } = t;
          if (
            (null === (e = this.diagnostic) ||
              void 0 === e ||
              e.log(d.EVENTS.WEB3_RESPONSE, {
                eventId: t.id,
                method: `relay::${r.method}`,
                sessionIdHash: this.getSessionIdHash(),
              }),
            (0, S.isRequestEthereumAccountsResponse)(r))
          ) {
            x.accountRequestCallbackIds.forEach((e) =>
              this.invokeCallback(
                Object.assign(Object.assign({}, t), { id: e })
              )
            ),
              x.accountRequestCallbackIds.clear();
            return;
          }
          this.invokeCallback(t);
        }
        handleErrorResponse(t, e, r, n) {
          this.handleWeb3ResponseMessage(
            (0, M.Web3ResponseMessage)({
              id: t,
              response: (0, S.ErrorResponse)(
                e,
                (null != r ? r : p.WalletUIError.UserRejectedRequest).message,
                n
              ),
            })
          );
        }
        invokeCallback(t) {
          let e = this.relayEventManager.callbacks.get(t.id);
          e && (e(t.response), this.relayEventManager.callbacks.delete(t.id));
        }
        requestEthereumAccounts() {
          let t = {
              method: _.Web3Method.requestEthereumAccounts,
              params: {
                appName: this.appName,
                appLogoUrl: this.appLogoUrl || null,
              },
            },
            e = (0, g.randomBytesHex)(8),
            r = (r) => {
              this.publishWeb3RequestCanceledEvent(e),
                this.handleErrorResponse(e, t.method, r);
            },
            n = new Promise((n, i) => {
              var o;
              this.relayEventManager.callbacks.set(e, (t) => {
                if ((this.ui.hideRequestEthereumAccounts(), t.errorMessage))
                  return i(Error(t.errorMessage));
                n(t);
              });
              let s =
                (null === (o = null == window ? void 0 : window.navigator) ||
                void 0 === o
                  ? void 0
                  : o.userAgent) || null;
              if (
                s &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  s
                )
              ) {
                let t;
                try {
                  t =
                    (0, g.isInIFrame)() && window.top
                      ? window.top.location
                      : window.location;
                } catch (e) {
                  t = window.location;
                }
                t.href = `https://www.coinbase.com/connect-dapp?uri=${encodeURIComponent(
                  t.href
                )}`;
                return;
              }
              if (this.ui.inlineAccountsResponse())
                this.ui.requestEthereumAccounts({
                  onCancel: r,
                  onAccounts: (t) => {
                    this.handleWeb3ResponseMessage(
                      (0, M.Web3ResponseMessage)({
                        id: e,
                        response: (0, S.RequestEthereumAccountsResponse)(t),
                      })
                    );
                  },
                });
              else {
                let t = c.ethErrors.provider.userRejectedRequest(
                  "User denied account authorization"
                );
                this.ui.requestEthereumAccounts({ onCancel: () => r(t) });
              }
              x.accountRequestCallbackIds.add(e),
                this.ui.inlineAccountsResponse() ||
                  this.ui.isStandalone() ||
                  this.publishWeb3RequestEvent(e, t);
            });
          return { promise: n, cancel: r };
        }
        selectProvider(t) {
          let e = {
              method: _.Web3Method.selectProvider,
              params: { providerOptions: t },
            },
            r = (0, g.randomBytesHex)(8),
            n = new Promise((e, n) => {
              this.relayEventManager.callbacks.set(r, (t) => {
                if (t.errorMessage) return n(Error(t.errorMessage));
                e(t);
              }),
                this.ui.selectProvider &&
                  this.ui.selectProvider({
                    onApprove: (t) => {
                      this.handleWeb3ResponseMessage(
                        (0, M.Web3ResponseMessage)({
                          id: r,
                          response: (0, S.SelectProviderResponse)(t),
                        })
                      );
                    },
                    onCancel: (t) => {
                      this.handleWeb3ResponseMessage(
                        (0, M.Web3ResponseMessage)({
                          id: r,
                          response: (0, S.SelectProviderResponse)(
                            y.ProviderType.Unselected
                          ),
                        })
                      );
                    },
                    providerOptions: t,
                  });
            });
          return {
            cancel: (t) => {
              this.publishWeb3RequestCanceledEvent(r),
                this.handleErrorResponse(r, e.method, t);
            },
            promise: n,
          };
        }
        watchAsset(t, e, r, n, i, o) {
          let s = {
              method: _.Web3Method.watchAsset,
              params: {
                type: t,
                options: { address: e, symbol: r, decimals: n, image: i },
                chainId: o,
              },
            },
            a = null,
            u = (0, g.randomBytesHex)(8),
            c = (t) => {
              this.publishWeb3RequestCanceledEvent(u),
                this.handleErrorResponse(u, s.method, t),
                null == a || a();
            };
          this.ui.inlineWatchAsset() ||
            (a = this.ui.showConnecting({
              isUnlinkedErrorState: this.isUnlinkedErrorState,
              onCancel: c,
              onResetConnection: this.resetAndReload,
            }));
          let l = new Promise((c, l) => {
            this.relayEventManager.callbacks.set(u, (t) => {
              if ((null == a || a(), t.errorMessage))
                return l(Error(t.errorMessage));
              c(t);
            }),
              this.ui.inlineWatchAsset() &&
                this.ui.watchAsset({
                  onApprove: () => {
                    this.handleWeb3ResponseMessage(
                      (0, M.Web3ResponseMessage)({
                        id: u,
                        response: (0, S.WatchAssetReponse)(!0),
                      })
                    );
                  },
                  onCancel: (t) => {
                    this.handleWeb3ResponseMessage(
                      (0, M.Web3ResponseMessage)({
                        id: u,
                        response: (0, S.WatchAssetReponse)(!1),
                      })
                    );
                  },
                  type: t,
                  address: e,
                  symbol: r,
                  decimals: n,
                  image: i,
                  chainId: o,
                }),
              this.ui.inlineWatchAsset() ||
                this.ui.isStandalone() ||
                this.publishWeb3RequestEvent(u, s);
          });
          return { cancel: c, promise: l };
        }
        addEthereumChain(t, e, r, n, i, o) {
          let s = {
              method: _.Web3Method.addEthereumChain,
              params: {
                chainId: t,
                rpcUrls: e,
                blockExplorerUrls: n,
                chainName: i,
                iconUrls: r,
                nativeCurrency: o,
              },
            },
            a = null,
            u = (0, g.randomBytesHex)(8),
            c = (t) => {
              this.publishWeb3RequestCanceledEvent(u),
                this.handleErrorResponse(u, s.method, t),
                null == a || a();
            };
          this.ui.inlineAddEthereumChain(t) ||
            (a = this.ui.showConnecting({
              isUnlinkedErrorState: this.isUnlinkedErrorState,
              onCancel: c,
              onResetConnection: this.resetAndReload,
            }));
          let l = new Promise((e, r) => {
            this.relayEventManager.callbacks.set(u, (t) => {
              if ((null == a || a(), t.errorMessage))
                return r(Error(t.errorMessage));
              e(t);
            }),
              this.ui.inlineAddEthereumChain(t) &&
                this.ui.addEthereumChain({
                  onCancel: (t) => {
                    this.handleWeb3ResponseMessage(
                      (0, M.Web3ResponseMessage)({
                        id: u,
                        response: (0, S.AddEthereumChainResponse)({
                          isApproved: !1,
                          rpcUrl: "",
                        }),
                      })
                    );
                  },
                  onApprove: (t) => {
                    this.handleWeb3ResponseMessage(
                      (0, M.Web3ResponseMessage)({
                        id: u,
                        response: (0, S.AddEthereumChainResponse)({
                          isApproved: !0,
                          rpcUrl: t,
                        }),
                      })
                    );
                  },
                  chainId: s.params.chainId,
                  rpcUrls: s.params.rpcUrls,
                  blockExplorerUrls: s.params.blockExplorerUrls,
                  chainName: s.params.chainName,
                  iconUrls: s.params.iconUrls,
                  nativeCurrency: s.params.nativeCurrency,
                }),
              this.ui.inlineAddEthereumChain(t) ||
                this.ui.isStandalone() ||
                this.publishWeb3RequestEvent(u, s);
          });
          return { promise: l, cancel: c };
        }
        switchEthereumChain(t, e) {
          let r = {
              method: _.Web3Method.switchEthereumChain,
              params: Object.assign({ chainId: t }, { address: e }),
            },
            n = (0, g.randomBytesHex)(8),
            i = new Promise((t, e) => {
              this.relayEventManager.callbacks.set(n, (r) =>
                r.errorMessage && r.errorCode
                  ? e(
                      c.ethErrors.provider.custom({
                        code: r.errorCode,
                        message:
                          "Unrecognized chain ID. Try adding the chain using addEthereumChain first.",
                      })
                    )
                  : r.errorMessage
                  ? e(Error(r.errorMessage))
                  : void t(r)
              ),
                this.ui.switchEthereumChain({
                  onCancel: (t) => {
                    "number" == typeof t
                      ? this.handleWeb3ResponseMessage(
                          (0, M.Web3ResponseMessage)({
                            id: n,
                            response: (0, S.ErrorResponse)(
                              _.Web3Method.switchEthereumChain,
                              p.WalletUIError
                                .SwitchEthereumChainUnsupportedChainId.message,
                              t
                            ),
                          })
                        )
                      : t instanceof p.WalletUIError
                      ? this.handleErrorResponse(
                          n,
                          _.Web3Method.switchEthereumChain,
                          t,
                          t.errorCode
                        )
                      : this.handleWeb3ResponseMessage(
                          (0, M.Web3ResponseMessage)({
                            id: n,
                            response: (0, S.SwitchEthereumChainResponse)({
                              isApproved: !1,
                              rpcUrl: "",
                            }),
                          })
                        );
                  },
                  onApprove: (t) => {
                    this.handleWeb3ResponseMessage(
                      (0, M.Web3ResponseMessage)({
                        id: n,
                        response: (0, S.SwitchEthereumChainResponse)({
                          isApproved: !0,
                          rpcUrl: t,
                        }),
                      })
                    );
                  },
                  chainId: r.params.chainId,
                  address: r.params.address,
                }),
                this.ui.inlineSwitchEthereumChain() ||
                  this.ui.isStandalone() ||
                  this.publishWeb3RequestEvent(n, r);
            });
          return {
            promise: i,
            cancel: (t) => {
              this.publishWeb3RequestCanceledEvent(n),
                this.handleErrorResponse(n, r.method, t);
            },
          };
        }
        inlineAddEthereumChain(t) {
          return this.ui.inlineAddEthereumChain(t);
        }
        getSessionIdHash() {
          return b.Session.hash(this._session.id);
        }
        sendRequestStandalone(t, e) {
          let r = (r) => {
              this.handleErrorResponse(t, e.method, r);
            },
            n = (e) => {
              this.handleWeb3ResponseMessage(
                (0, M.Web3ResponseMessage)({ id: t, response: e })
              );
            };
          switch (e.method) {
            case _.Web3Method.signEthereumMessage:
              this.ui.signEthereumMessage({
                request: e,
                onSuccess: n,
                onCancel: r,
              });
              break;
            case _.Web3Method.signEthereumTransaction:
              this.ui.signEthereumTransaction({
                request: e,
                onSuccess: n,
                onCancel: r,
              });
              break;
            case _.Web3Method.submitEthereumTransaction:
              this.ui.submitEthereumTransaction({
                request: e,
                onSuccess: n,
                onCancel: r,
              });
              break;
            case _.Web3Method.ethereumAddressFromSignedMessage:
              this.ui.ethereumAddressFromSignedMessage({
                request: e,
                onSuccess: n,
              });
              break;
            default:
              r();
          }
        }
        onSessionConfigChanged(t) {}
      }
      (x.accountRequestCallbackIds = new Set()),
        o([u.default], x.prototype, "resetAndReload", null),
        o([u.default], x.prototype, "handleIncomingEvent", null),
        (e.WalletSDKRelay = x);
    },
    15633: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.WalletSDKRelayAbstract =
          e.APP_VERSION_KEY =
          e.LOCAL_STORAGE_ADDRESSES_KEY =
          e.WALLET_USER_NAME_KEY =
            void 0);
      let n = r(79826);
      (e.WALLET_USER_NAME_KEY = "walletUsername"),
        (e.LOCAL_STORAGE_ADDRESSES_KEY = "Addresses"),
        (e.APP_VERSION_KEY = "AppVersion"),
        (e.WalletSDKRelayAbstract = class {
          async makeEthereumJSONRPCRequest(t, e) {
            if (!e) throw Error("Error: No jsonRpcUrl provided");
            return window
              .fetch(e, {
                method: "POST",
                body: JSON.stringify(t),
                mode: "cors",
                headers: { "Content-Type": "application/json" },
              })
              .then((t) => t.json())
              .then((t) => {
                if (!t) throw n.ethErrors.rpc.parse({});
                let { error: e } = t;
                if (e) throw (0, n.serializeError)(e);
                return t;
              });
          }
        });
    },
    27472: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.WalletSDKRelayEventManager = void 0);
      let n = r(94643);
      e.WalletSDKRelayEventManager = class {
        constructor() {
          (this._nextRequestId = 0), (this.callbacks = new Map());
        }
        makeRequestId() {
          this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
          let t = this._nextRequestId,
            e = (0, n.prepend0x)(t.toString(16)),
            r = this.callbacks.get(e);
          return r && this.callbacks.delete(e), t;
        }
      };
    },
    93083: function (t, e) {
      "use strict";
      var r;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Web3Method = void 0),
        ((r = e.Web3Method || (e.Web3Method = {})).requestEthereumAccounts =
          "requestEthereumAccounts"),
        (r.signEthereumMessage = "signEthereumMessage"),
        (r.signEthereumTransaction = "signEthereumTransaction"),
        (r.submitEthereumTransaction = "submitEthereumTransaction"),
        (r.ethereumAddressFromSignedMessage =
          "ethereumAddressFromSignedMessage"),
        (r.scanQRCode = "scanQRCode"),
        (r.generic = "generic"),
        (r.childRequestEthereumAccounts = "childRequestEthereumAccounts"),
        (r.addEthereumChain = "addEthereumChain"),
        (r.switchEthereumChain = "switchEthereumChain"),
        (r.makeEthereumJSONRPCRequest = "makeEthereumJSONRPCRequest"),
        (r.watchAsset = "watchAsset"),
        (r.selectProvider = "selectProvider");
    },
    85186: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Web3RequestCanceledMessage = void 0);
      let n = r(85813);
      e.Web3RequestCanceledMessage = function (t) {
        return { type: n.RelayMessageType.WEB3_REQUEST_CANCELED, id: t };
      };
    },
    3770: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Web3RequestMessage = void 0);
      let n = r(85813);
      e.Web3RequestMessage = function (t) {
        return Object.assign({ type: n.RelayMessageType.WEB3_REQUEST }, t);
      };
    },
    67386: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.EthereumAddressFromSignedMessageResponse =
          e.SubmitEthereumTransactionResponse =
          e.SignEthereumTransactionResponse =
          e.SignEthereumMessageResponse =
          e.isRequestEthereumAccountsResponse =
          e.SelectProviderResponse =
          e.WatchAssetReponse =
          e.RequestEthereumAccountsResponse =
          e.SwitchEthereumChainResponse =
          e.AddEthereumChainResponse =
          e.ErrorResponse =
            void 0);
      let n = r(93083);
      (e.ErrorResponse = function (t, e, r) {
        return { method: t, errorMessage: e, errorCode: r };
      }),
        (e.AddEthereumChainResponse = function (t) {
          return { method: n.Web3Method.addEthereumChain, result: t };
        }),
        (e.SwitchEthereumChainResponse = function (t) {
          return { method: n.Web3Method.switchEthereumChain, result: t };
        }),
        (e.RequestEthereumAccountsResponse = function (t) {
          return { method: n.Web3Method.requestEthereumAccounts, result: t };
        }),
        (e.WatchAssetReponse = function (t) {
          return { method: n.Web3Method.watchAsset, result: t };
        }),
        (e.SelectProviderResponse = function (t) {
          return { method: n.Web3Method.selectProvider, result: t };
        }),
        (e.isRequestEthereumAccountsResponse = function (t) {
          return t && t.method === n.Web3Method.requestEthereumAccounts;
        }),
        (e.SignEthereumMessageResponse = function (t) {
          return { method: n.Web3Method.signEthereumMessage, result: t };
        }),
        (e.SignEthereumTransactionResponse = function (t) {
          return { method: n.Web3Method.signEthereumTransaction, result: t };
        }),
        (e.SubmitEthereumTransactionResponse = function (t) {
          return { method: n.Web3Method.submitEthereumTransaction, result: t };
        }),
        (e.EthereumAddressFromSignedMessageResponse = function (t) {
          return {
            method: n.Web3Method.ethereumAddressFromSignedMessage,
            result: t,
          };
        });
    },
    50287: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.isWeb3ResponseMessage = e.Web3ResponseMessage = void 0);
      let n = r(85813);
      (e.Web3ResponseMessage = function (t) {
        return Object.assign({ type: n.RelayMessageType.WEB3_RESPONSE }, t);
      }),
        (e.isWeb3ResponseMessage = function (t) {
          return t && t.type === n.RelayMessageType.WEB3_RESPONSE;
        });
    },
    20235: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.decrypt = e.encrypt = void 0);
      let n = r(94643);
      async function i(t, e) {
        if (64 !== e.length) throw Error("secret must be 256 bits");
        let r = crypto.getRandomValues(new Uint8Array(12)),
          i = await crypto.subtle.importKey(
            "raw",
            (0, n.hexStringToUint8Array)(e),
            { name: "aes-gcm" },
            !1,
            ["encrypt", "decrypt"]
          ),
          o = new TextEncoder(),
          s = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv: r },
            i,
            o.encode(t)
          ),
          a = s.slice(s.byteLength - 16),
          u = s.slice(0, s.byteLength - 16),
          c = new Uint8Array(a),
          l = new Uint8Array(u),
          h = new Uint8Array([...r, ...c, ...l]);
        return (0, n.uint8ArrayToHex)(h);
      }
      (e.encrypt = i),
        (e.decrypt = function (t, e) {
          if (64 !== e.length) throw Error("secret must be 256 bits");
          return new Promise((r, i) => {
            !(async function () {
              let o = await crypto.subtle.importKey(
                  "raw",
                  (0, n.hexStringToUint8Array)(e),
                  { name: "aes-gcm" },
                  !1,
                  ["encrypt", "decrypt"]
                ),
                s = (0, n.hexStringToUint8Array)(t),
                a = s.slice(0, 12),
                u = s.slice(12, 28),
                c = s.slice(28),
                l = new Uint8Array([...c, ...u]),
                h = { name: "AES-GCM", iv: new Uint8Array(a) };
              try {
                let t = await window.crypto.subtle.decrypt(h, o, l),
                  e = new TextDecoder();
                r(e.decode(t));
              } catch (t) {
                i(t);
              }
            })();
          });
        });
    },
    91295: function (t, e) {
      "use strict";
      var r;
      function n() {
        return (t) => t;
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ProviderType =
          e.RegExpString =
          e.IntNumber =
          e.BigIntString =
          e.AddressString =
          e.HexString =
          e.OpaqueType =
            void 0),
        (e.OpaqueType = n),
        (e.HexString = n()),
        (e.AddressString = n()),
        (e.BigIntString = n()),
        (e.IntNumber = function (t) {
          return Math.floor(t);
        }),
        (e.RegExpString = n()),
        ((r = e.ProviderType || (e.ProviderType = {})).CoinbaseWallet =
          "CoinbaseWallet"),
        (r.MetaMask = "MetaMask"),
        (r.Unselected = "");
    },
    94643: function (t, e, r) {
      "use strict";
      var n = r(48764).Buffer,
        i =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.isInIFrame =
          e.createQrUrl =
          e.getFavicon =
          e.range =
          e.isBigNumber =
          e.ensureParsedJSONObject =
          e.ensureBN =
          e.ensureRegExpString =
          e.ensureIntNumber =
          e.ensureBuffer =
          e.ensureAddressString =
          e.ensureEvenLengthHexString =
          e.ensureHexString =
          e.isHexString =
          e.prepend0x =
          e.strip0x =
          e.has0xPrefix =
          e.hexStringFromIntNumber =
          e.intNumberFromHexString =
          e.bigIntStringFromBN =
          e.hexStringFromBuffer =
          e.hexStringToUint8Array =
          e.uint8ArrayToHex =
          e.randomBytesHex =
            void 0);
      let o = i(r(13550)),
        s = r(80129),
        a = r(91295),
        u = /^[0-9]*$/,
        c = /^[a-f0-9]*$/;
      function l(t) {
        return [...t].map((t) => t.toString(16).padStart(2, "0")).join("");
      }
      function h(t) {
        return t.startsWith("0x") || t.startsWith("0X");
      }
      function d(t) {
        return h(t) ? t.slice(2) : t;
      }
      function f(t) {
        return h(t) ? "0x" + t.slice(2) : "0x" + t;
      }
      function p(t) {
        if ("string" != typeof t) return !1;
        let e = d(t).toLowerCase();
        return c.test(e);
      }
      function y(t, e = !1) {
        if ("string" == typeof t) {
          let r = d(t).toLowerCase();
          if (c.test(r)) return (0, a.HexString)(e ? "0x" + r : r);
        }
        throw Error(`"${String(t)}" is not a hexadecimal string`);
      }
      function g(t, e = !1) {
        let r = y(t, !1);
        return (
          r.length % 2 == 1 && (r = (0, a.HexString)("0" + r)),
          e ? (0, a.HexString)("0x" + r) : r
        );
      }
      function m(t) {
        if ("number" == typeof t && Number.isInteger(t))
          return (0, a.IntNumber)(t);
        if ("string" == typeof t) {
          if (u.test(t)) return (0, a.IntNumber)(Number(t));
          if (p(t))
            return (0, a.IntNumber)(new o.default(g(t, !1), 16).toNumber());
        }
        throw Error(`Not an integer: ${String(t)}`);
      }
      function b(t) {
        if (null == t || "function" != typeof t.constructor) return !1;
        let { constructor: e } = t;
        return "function" == typeof e.config && "number" == typeof e.EUCLID;
      }
      (e.randomBytesHex = function (t) {
        return l(crypto.getRandomValues(new Uint8Array(t)));
      }),
        (e.uint8ArrayToHex = l),
        (e.hexStringToUint8Array = function (t) {
          return new Uint8Array(t.match(/.{1,2}/g).map((t) => parseInt(t, 16)));
        }),
        (e.hexStringFromBuffer = function (t, e = !1) {
          let r = t.toString("hex");
          return (0, a.HexString)(e ? "0x" + r : r);
        }),
        (e.bigIntStringFromBN = function (t) {
          return (0, a.BigIntString)(t.toString(10));
        }),
        (e.intNumberFromHexString = function (t) {
          return (0, a.IntNumber)(new o.default(g(t, !1), 16).toNumber());
        }),
        (e.hexStringFromIntNumber = function (t) {
          return (0, a.HexString)("0x" + new o.default(t).toString(16));
        }),
        (e.has0xPrefix = h),
        (e.strip0x = d),
        (e.prepend0x = f),
        (e.isHexString = p),
        (e.ensureHexString = y),
        (e.ensureEvenLengthHexString = g),
        (e.ensureAddressString = function (t) {
          if ("string" == typeof t) {
            let e = d(t).toLowerCase();
            if (p(e) && 40 === e.length) return (0, a.AddressString)(f(e));
          }
          throw Error(`Invalid Ethereum address: ${String(t)}`);
        }),
        (e.ensureBuffer = function (t) {
          if (n.isBuffer(t)) return t;
          if ("string" == typeof t) {
            if (!p(t)) return n.from(t, "utf8");
            {
              let e = g(t, !1);
              return n.from(e, "hex");
            }
          }
          throw Error(`Not binary data: ${String(t)}`);
        }),
        (e.ensureIntNumber = m),
        (e.ensureRegExpString = function (t) {
          if (t instanceof RegExp) return (0, a.RegExpString)(t.toString());
          throw Error(`Not a RegExp: ${String(t)}`);
        }),
        (e.ensureBN = function (t) {
          if (null !== t && (o.default.isBN(t) || b(t)))
            return new o.default(t.toString(10), 10);
          if ("number" == typeof t) return new o.default(m(t));
          if ("string" == typeof t) {
            if (u.test(t)) return new o.default(t, 10);
            if (p(t)) return new o.default(g(t, !1), 16);
          }
          throw Error(`Not an integer: ${String(t)}`);
        }),
        (e.ensureParsedJSONObject = function (t) {
          if ("string" == typeof t) return JSON.parse(t);
          if ("object" == typeof t) return t;
          throw Error(`Not a JSON string or an object: ${String(t)}`);
        }),
        (e.isBigNumber = b),
        (e.range = function (t, e) {
          return Array.from({ length: e - t }, (e, r) => t + r);
        }),
        (e.getFavicon = function () {
          let t =
              document.querySelector('link[sizes="192x192"]') ||
              document.querySelector('link[sizes="180x180"]') ||
              document.querySelector('link[rel="icon"]') ||
              document.querySelector('link[rel="shortcut icon"]'),
            { protocol: e, host: r } = document.location,
            n = t ? t.getAttribute("href") : null;
          return !n || n.startsWith("javascript:")
            ? null
            : n.startsWith("http://") ||
              n.startsWith("https://") ||
              n.startsWith("data:")
            ? n
            : n.startsWith("//")
            ? e + n
            : `${e}//${r}${n}`;
        }),
        (e.createQrUrl = function (t, e, r, n, i, o) {
          let a = (0, s.stringify)({
              [n ? "parent-id" : "id"]: t,
              secret: e,
              server: r,
              v: i,
              chainId: o,
            }),
            u = `${r}/#/link?${a}`;
          return u;
        }),
        (e.isInIFrame = function () {
          try {
            return null !== window.frameElement;
          } catch (t) {
            return !1;
          }
        });
    },
    36089: function (t, e, r) {
      var n = r(48764).Buffer;
      let i = r(32518),
        o = r(13550);
      function s(t) {
        if (t.startsWith("int[")) return "int256" + t.slice(3);
        if ("int" === t) return "int256";
        if (t.startsWith("uint[")) return "uint256" + t.slice(4);
        if ("uint" === t) return "uint256";
        if (t.startsWith("fixed[")) return "fixed128x128" + t.slice(5);
        if ("fixed" === t) return "fixed128x128";
        if (t.startsWith("ufixed[")) return "ufixed128x128" + t.slice(6);
        else if ("ufixed" === t) return "ufixed128x128";
        return t;
      }
      function a(t) {
        return parseInt(/^\D+(\d+)$/.exec(t)[1], 10);
      }
      function u(t) {
        var e = /^\D+(\d+)x(\d+)$/.exec(t);
        return [parseInt(e[1], 10), parseInt(e[2], 10)];
      }
      function c(t) {
        var e = t.match(/(.*)\[(.*?)\]$/);
        return e ? ("" === e[2] ? "dynamic" : parseInt(e[2], 10)) : null;
      }
      function l(t) {
        var e = typeof t;
        if ("string" === e)
          return i.isHexString(t)
            ? new o(i.stripHexPrefix(t), 16)
            : new o(t, 10);
        if ("number" === e) return new o(t);
        if (t.toArray) return t;
        throw Error("Argument is not a number");
      }
      function h(t, e) {
        if ("address" === t) return h("uint160", l(e));
        if ("bool" === t) return h("uint8", e ? 1 : 0);
        if ("string" === t) return h("bytes", new n(e, "utf8"));
        if ((p = t).lastIndexOf("]") === p.length - 1) {
          if (void 0 === e.length) throw Error("Not an array?");
          if ("dynamic" !== (r = c(t)) && 0 !== r && e.length > r)
            throw Error("Elements exceed array size: " + r);
          for (f in ((d = []),
          (t = t.slice(0, t.lastIndexOf("["))),
          "string" == typeof e && (e = JSON.parse(e)),
          e))
            d.push(h(t, e[f]));
          if ("dynamic" === r) {
            var r,
              s,
              d,
              f,
              p,
              y = h("uint256", e.length);
            d.unshift(y);
          }
          return n.concat(d);
        }
        if ("bytes" === t)
          return (
            (e = new n(e)),
            (d = n.concat([h("uint256", e.length), e])),
            e.length % 32 != 0 &&
              (d = n.concat([d, i.zeros(32 - (e.length % 32))])),
            d
          );
        if (t.startsWith("bytes")) {
          if ((r = a(t)) < 1 || r > 32)
            throw Error("Invalid bytes<N> width: " + r);
          return i.setLengthRight(e, 32);
        } else if (t.startsWith("uint")) {
          if ((r = a(t)) % 8 || r < 8 || r > 256)
            throw Error("Invalid uint<N> width: " + r);
          if ((s = l(e)).bitLength() > r)
            throw Error(
              "Supplied uint exceeds width: " + r + " vs " + s.bitLength()
            );
          if (s < 0) throw Error("Supplied uint is negative");
          return s.toArrayLike(n, "be", 32);
        } else if (t.startsWith("int")) {
          if ((r = a(t)) % 8 || r < 8 || r > 256)
            throw Error("Invalid int<N> width: " + r);
          if ((s = l(e)).bitLength() > r)
            throw Error(
              "Supplied int exceeds width: " + r + " vs " + s.bitLength()
            );
          return s.toTwos(256).toArrayLike(n, "be", 32);
        } else if (t.startsWith("ufixed")) {
          if (((r = u(t)), (s = l(e)) < 0))
            throw Error("Supplied ufixed is negative");
          return h("uint256", s.mul(new o(2).pow(new o(r[1]))));
        } else if (t.startsWith("fixed"))
          return (r = u(t)), h("int256", l(e).mul(new o(2).pow(new o(r[1]))));
        throw Error("Unsupported or invalid type: " + t);
      }
      function d(t, e) {
        if (t.length !== e.length)
          throw Error("Number of types are not matching the values");
        for (var r, o, u = [], c = 0; c < t.length; c++) {
          var h = s(t[c]),
            d = e[c];
          if ("bytes" === h) u.push(d);
          else if ("string" === h) u.push(new n(d, "utf8"));
          else if ("bool" === h) u.push(new n(d ? "01" : "00", "hex"));
          else if ("address" === h) u.push(i.setLength(d, 20));
          else if (h.startsWith("bytes")) {
            if ((r = a(h)) < 1 || r > 32)
              throw Error("Invalid bytes<N> width: " + r);
            u.push(i.setLengthRight(d, r));
          } else if (h.startsWith("uint")) {
            if ((r = a(h)) % 8 || r < 8 || r > 256)
              throw Error("Invalid uint<N> width: " + r);
            if ((o = l(d)).bitLength() > r)
              throw Error(
                "Supplied uint exceeds width: " + r + " vs " + o.bitLength()
              );
            u.push(o.toArrayLike(n, "be", r / 8));
          } else if (h.startsWith("int")) {
            if ((r = a(h)) % 8 || r < 8 || r > 256)
              throw Error("Invalid int<N> width: " + r);
            if ((o = l(d)).bitLength() > r)
              throw Error(
                "Supplied int exceeds width: " + r + " vs " + o.bitLength()
              );
            u.push(o.toTwos(r).toArrayLike(n, "be", r / 8));
          } else throw Error("Unsupported or invalid type: " + h);
        }
        return n.concat(u);
      }
      t.exports = {
        rawEncode: function (t, e) {
          var r = [],
            i = [],
            o = 32 * t.length;
          for (var a in t) {
            var u = s(t[a]),
              l = h(u, e[a]);
            "string" === u || "bytes" === u || "dynamic" === c(u)
              ? (r.push(h("uint256", o)), i.push(l), (o += l.length))
              : r.push(l);
          }
          return n.concat(r.concat(i));
        },
        solidityPack: d,
        soliditySHA3: function (t, e) {
          return i.keccak(d(t, e));
        },
      };
    },
    14497: function (t, e, r) {
      var n = r(48764).Buffer;
      let i = r(32518),
        o = r(36089),
        s = {
          type: "object",
          properties: {
            types: {
              type: "object",
              additionalProperties: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                  },
                  required: ["name", "type"],
                },
              },
            },
            primaryType: { type: "string" },
            domain: { type: "object" },
            message: { type: "object" },
          },
          required: ["types", "primaryType", "domain", "message"],
        },
        a = {
          encodeData(t, e, r, s = !0) {
            let a = ["bytes32"],
              u = [this.hashType(t, r)];
            if (s) {
              let c = (t, e, a) => {
                if (void 0 !== r[e])
                  return [
                    "bytes32",
                    null == a
                      ? "0x0000000000000000000000000000000000000000000000000000000000000000"
                      : i.keccak(this.encodeData(e, a, r, s)),
                  ];
                if (void 0 === a)
                  throw Error(`missing value for field ${t} of type ${e}`);
                if ("bytes" === e) return ["bytes32", i.keccak(a)];
                if ("string" === e)
                  return (
                    "string" == typeof a && (a = n.from(a, "utf8")),
                    ["bytes32", i.keccak(a)]
                  );
                if (e.lastIndexOf("]") === e.length - 1) {
                  let r = e.slice(0, e.lastIndexOf("[")),
                    n = a.map((e) => c(t, r, e));
                  return [
                    "bytes32",
                    i.keccak(
                      o.rawEncode(
                        n.map(([t]) => t),
                        n.map(([, t]) => t)
                      )
                    ),
                  ];
                }
                return [e, a];
              };
              for (let n of r[t]) {
                let [t, r] = c(n.name, n.type, e[n.name]);
                a.push(t), u.push(r);
              }
            } else
              for (let o of r[t]) {
                let t = e[o.name];
                if (void 0 !== t) {
                  if ("bytes" === o.type)
                    a.push("bytes32"), (t = i.keccak(t)), u.push(t);
                  else if ("string" === o.type)
                    a.push("bytes32"),
                      "string" == typeof t && (t = n.from(t, "utf8")),
                      (t = i.keccak(t)),
                      u.push(t);
                  else if (void 0 !== r[o.type])
                    a.push("bytes32"),
                      (t = i.keccak(this.encodeData(o.type, t, r, s))),
                      u.push(t);
                  else if (o.type.lastIndexOf("]") === o.type.length - 1)
                    throw Error("Arrays currently unimplemented in encodeData");
                  else a.push(o.type), u.push(t);
                }
              }
            return o.rawEncode(a, u);
          },
          encodeType(t, e) {
            let r = "",
              n = this.findTypeDependencies(t, e).filter((e) => e !== t);
            for (let i of (n = [t].concat(n.sort()))) {
              let t = e[i];
              if (!t) throw Error("No type definition specified: " + i);
              r +=
                i +
                "(" +
                e[i].map(({ name: t, type: e }) => e + " " + t).join(",") +
                ")";
            }
            return r;
          },
          findTypeDependencies(t, e, r = []) {
            if (((t = t.match(/^\w*/)[0]), r.includes(t) || void 0 === e[t]))
              return r;
            for (let n of (r.push(t), e[t]))
              for (let t of this.findTypeDependencies(n.type, e, r))
                r.includes(t) || r.push(t);
            return r;
          },
          hashStruct(t, e, r, n = !0) {
            return i.keccak(this.encodeData(t, e, r, n));
          },
          hashType(t, e) {
            return i.keccak(this.encodeType(t, e));
          },
          sanitizeData(t) {
            let e = {};
            for (let r in s.properties) t[r] && (e[r] = t[r]);
            return (
              e.types &&
                (e.types = Object.assign({ EIP712Domain: [] }, e.types)),
              e
            );
          },
          hash(t, e = !0) {
            let r = this.sanitizeData(t),
              o = [n.from("1901", "hex")];
            return (
              o.push(this.hashStruct("EIP712Domain", r.domain, r.types, e)),
              "EIP712Domain" !== r.primaryType &&
                o.push(this.hashStruct(r.primaryType, r.message, r.types, e)),
              i.keccak(n.concat(o))
            );
          },
        };
      t.exports = {
        TYPED_MESSAGE_SCHEMA: s,
        TypedDataUtils: a,
        hashForSignTypedDataLegacy: function (t) {
          return (function (t) {
            let e = Error("Expect argument to be non-empty array");
            if ("object" != typeof t || !t.length) throw e;
            let r = t.map(function (t) {
                return "bytes" === t.type ? i.toBuffer(t.value) : t.value;
              }),
              n = t.map(function (t) {
                return t.type;
              }),
              s = t.map(function (t) {
                if (!t.name) throw e;
                return t.type + " " + t.name;
              });
            return o.soliditySHA3(
              ["bytes32", "bytes32"],
              [
                o.soliditySHA3(Array(t.length).fill("string"), s),
                o.soliditySHA3(n, r),
              ]
            );
          })(t.data);
        },
        hashForSignTypedData_v3: function (t) {
          return a.hash(t.data, !1);
        },
        hashForSignTypedData_v4: function (t) {
          return a.hash(t.data);
        },
      };
    },
    32518: function (t, e, r) {
      var n = r(48764).Buffer;
      let i = r(95811),
        o = r(13550);
      function s(t) {
        return n.allocUnsafe(t).fill(0);
      }
      function a(t, e, r) {
        let n = s(e);
        return ((t = u(t)), r)
          ? t.length < e
            ? (t.copy(n), n)
            : t.slice(0, e)
          : t.length < e
          ? (t.copy(n, e - t.length), n)
          : t.slice(-e);
      }
      function u(t) {
        if (!n.isBuffer(t)) {
          if (Array.isArray(t)) t = n.from(t);
          else if ("string" == typeof t) {
            var e;
            t = c(t)
              ? n.from((e = l(t)).length % 2 ? "0" + e : e, "hex")
              : n.from(t);
          } else if ("number" == typeof t) t = intToBuffer(t);
          else if (null == t) t = n.allocUnsafe(0);
          else if (o.isBN(t)) t = t.toArrayLike(n);
          else if (t.toArray) t = n.from(t.toArray());
          else throw Error("invalid type");
        }
        return t;
      }
      function c(t) {
        return "string" == typeof t && t.match(/^0x[0-9A-Fa-f]*$/);
      }
      function l(t) {
        return "string" == typeof t && t.startsWith("0x") ? t.slice(2) : t;
      }
      t.exports = {
        zeros: s,
        setLength: a,
        setLengthRight: function (t, e) {
          return a(t, e, !0);
        },
        isHexString: c,
        stripHexPrefix: l,
        toBuffer: u,
        bufferToHex: function (t) {
          return "0x" + (t = u(t)).toString("hex");
        },
        keccak: function (t, e) {
          return (
            (t = u(t)),
            e || (e = 256),
            i("keccak" + e)
              .update(t)
              .digest()
          );
        },
      };
    },
    7713: function (t) {
      function e(t) {
        (this.mode = n.MODE_8BIT_BYTE), (this.data = t), (this.parsedData = []);
        for (var e = 0, r = this.data.length; e < r; e++) {
          var i = [],
            o = this.data.charCodeAt(e);
          o > 65536
            ? ((i[0] = 240 | ((1835008 & o) >>> 18)),
              (i[1] = 128 | ((258048 & o) >>> 12)),
              (i[2] = 128 | ((4032 & o) >>> 6)),
              (i[3] = 128 | (63 & o)))
            : o > 2048
            ? ((i[0] = 224 | ((61440 & o) >>> 12)),
              (i[1] = 128 | ((4032 & o) >>> 6)),
              (i[2] = 128 | (63 & o)))
            : o > 128
            ? ((i[0] = 192 | ((1984 & o) >>> 6)), (i[1] = 128 | (63 & o)))
            : (i[0] = o),
            this.parsedData.push(i);
        }
        (this.parsedData = Array.prototype.concat.apply([], this.parsedData)),
          this.parsedData.length != this.data.length &&
            (this.parsedData.unshift(191),
            this.parsedData.unshift(187),
            this.parsedData.unshift(239));
      }
      function r(t, e) {
        (this.typeNumber = t),
          (this.errorCorrectLevel = e),
          (this.modules = null),
          (this.moduleCount = 0),
          (this.dataCache = null),
          (this.dataList = []);
      }
      (e.prototype = {
        getLength: function (t) {
          return this.parsedData.length;
        },
        write: function (t) {
          for (var e = 0, r = this.parsedData.length; e < r; e++)
            t.put(this.parsedData[e], 8);
        },
      }),
        (r.prototype = {
          addData: function (t) {
            var r = new e(t);
            this.dataList.push(r), (this.dataCache = null);
          },
          isDark: function (t, e) {
            if (
              t < 0 ||
              this.moduleCount <= t ||
              e < 0 ||
              this.moduleCount <= e
            )
              throw Error(t + "," + e);
            return this.modules[t][e];
          },
          getModuleCount: function () {
            return this.moduleCount;
          },
          make: function () {
            this.makeImpl(!1, this.getBestMaskPattern());
          },
          makeImpl: function (t, e) {
            (this.moduleCount = 4 * this.typeNumber + 17),
              (this.modules = Array(this.moduleCount));
            for (var n = 0; n < this.moduleCount; n++) {
              this.modules[n] = Array(this.moduleCount);
              for (var i = 0; i < this.moduleCount; i++)
                this.modules[n][i] = null;
            }
            this.setupPositionProbePattern(0, 0),
              this.setupPositionProbePattern(this.moduleCount - 7, 0),
              this.setupPositionProbePattern(0, this.moduleCount - 7),
              this.setupPositionAdjustPattern(),
              this.setupTimingPattern(),
              this.setupTypeInfo(t, e),
              this.typeNumber >= 7 && this.setupTypeNumber(t),
              null == this.dataCache &&
                (this.dataCache = r.createData(
                  this.typeNumber,
                  this.errorCorrectLevel,
                  this.dataList
                )),
              this.mapData(this.dataCache, e);
          },
          setupPositionProbePattern: function (t, e) {
            for (var r = -1; r <= 7; r++)
              if (!(t + r <= -1) && !(this.moduleCount <= t + r))
                for (var n = -1; n <= 7; n++)
                  e + n <= -1 ||
                    this.moduleCount <= e + n ||
                    ((0 <= r && r <= 6 && (0 == n || 6 == n)) ||
                    (0 <= n && n <= 6 && (0 == r || 6 == r)) ||
                    (2 <= r && r <= 4 && 2 <= n && n <= 4)
                      ? (this.modules[t + r][e + n] = !0)
                      : (this.modules[t + r][e + n] = !1));
          },
          getBestMaskPattern: function () {
            for (var t = 0, e = 0, r = 0; r < 8; r++) {
              this.makeImpl(!0, r);
              var n = s.getLostPoint(this);
              (0 == r || t > n) && ((t = n), (e = r));
            }
            return e;
          },
          createMovieClip: function (t, e, r) {
            var n = t.createEmptyMovieClip(e, r);
            this.make();
            for (var i = 0; i < this.modules.length; i++)
              for (var o = 1 * i, s = 0; s < this.modules[i].length; s++) {
                var a = 1 * s;
                this.modules[i][s] &&
                  (n.beginFill(0, 100),
                  n.moveTo(a, o),
                  n.lineTo(a + 1, o),
                  n.lineTo(a + 1, o + 1),
                  n.lineTo(a, o + 1),
                  n.endFill());
              }
            return n;
          },
          setupTimingPattern: function () {
            for (var t = 8; t < this.moduleCount - 8; t++)
              null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
            for (var e = 8; e < this.moduleCount - 8; e++)
              null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
          },
          setupPositionAdjustPattern: function () {
            for (
              var t = s.getPatternPosition(this.typeNumber), e = 0;
              e < t.length;
              e++
            )
              for (var r = 0; r < t.length; r++) {
                var n = t[e],
                  i = t[r];
                if (null == this.modules[n][i])
                  for (var o = -2; o <= 2; o++)
                    for (var a = -2; a <= 2; a++)
                      -2 == o ||
                      2 == o ||
                      -2 == a ||
                      2 == a ||
                      (0 == o && 0 == a)
                        ? (this.modules[n + o][i + a] = !0)
                        : (this.modules[n + o][i + a] = !1);
              }
          },
          setupTypeNumber: function (t) {
            for (
              var e = s.getBCHTypeNumber(this.typeNumber), r = 0;
              r < 18;
              r++
            ) {
              var n = !t && ((e >> r) & 1) == 1;
              this.modules[Math.floor(r / 3)][
                (r % 3) + this.moduleCount - 8 - 3
              ] = n;
            }
            for (var r = 0; r < 18; r++) {
              var n = !t && ((e >> r) & 1) == 1;
              this.modules[(r % 3) + this.moduleCount - 8 - 3][
                Math.floor(r / 3)
              ] = n;
            }
          },
          setupTypeInfo: function (t, e) {
            for (
              var r = (this.errorCorrectLevel << 3) | e,
                n = s.getBCHTypeInfo(r),
                i = 0;
              i < 15;
              i++
            ) {
              var o = !t && ((n >> i) & 1) == 1;
              i < 6
                ? (this.modules[i][8] = o)
                : i < 8
                ? (this.modules[i + 1][8] = o)
                : (this.modules[this.moduleCount - 15 + i][8] = o);
            }
            for (var i = 0; i < 15; i++) {
              var o = !t && ((n >> i) & 1) == 1;
              i < 8
                ? (this.modules[8][this.moduleCount - i - 1] = o)
                : i < 9
                ? (this.modules[8][15 - i - 1 + 1] = o)
                : (this.modules[8][15 - i - 1] = o);
            }
            this.modules[this.moduleCount - 8][8] = !t;
          },
          mapData: function (t, e) {
            for (
              var r = -1,
                n = this.moduleCount - 1,
                i = 7,
                o = 0,
                a = this.moduleCount - 1;
              a > 0;
              a -= 2
            )
              for (6 == a && a--; ; ) {
                for (var u = 0; u < 2; u++)
                  if (null == this.modules[n][a - u]) {
                    var c = !1;
                    o < t.length && (c = ((t[o] >>> i) & 1) == 1),
                      s.getMask(e, n, a - u) && (c = !c),
                      (this.modules[n][a - u] = c),
                      -1 == --i && (o++, (i = 7));
                  }
                if ((n += r) < 0 || this.moduleCount <= n) {
                  (n -= r), (r = -r);
                  break;
                }
              }
          },
        }),
        (r.PAD0 = 236),
        (r.PAD1 = 17),
        (r.createData = function (t, e, n) {
          for (
            var i = l.getRSBlocks(t, e), o = new h(), a = 0;
            a < n.length;
            a++
          ) {
            var u = n[a];
            o.put(u.mode, 4),
              o.put(u.getLength(), s.getLengthInBits(u.mode, t)),
              u.write(o);
          }
          for (var c = 0, a = 0; a < i.length; a++) c += i[a].dataCount;
          if (o.getLengthInBits() > 8 * c)
            throw Error(
              "code length overflow. (" +
                o.getLengthInBits() +
                ">" +
                8 * c +
                ")"
            );
          for (
            o.getLengthInBits() + 4 <= 8 * c && o.put(0, 4);
            o.getLengthInBits() % 8 != 0;

          )
            o.putBit(!1);
          for (
            ;
            !(o.getLengthInBits() >= 8 * c) &&
            (o.put(r.PAD0, 8), !(o.getLengthInBits() >= 8 * c));

          )
            o.put(r.PAD1, 8);
          return r.createBytes(o, i);
        }),
        (r.createBytes = function (t, e) {
          for (
            var r = 0,
              n = 0,
              i = 0,
              o = Array(e.length),
              a = Array(e.length),
              u = 0;
            u < e.length;
            u++
          ) {
            var l = e[u].dataCount,
              h = e[u].totalCount - l;
            (n = Math.max(n, l)), (i = Math.max(i, h)), (o[u] = Array(l));
            for (var d = 0; d < o[u].length; d++)
              o[u][d] = 255 & t.buffer[d + r];
            r += l;
            var f = s.getErrorCorrectPolynomial(h),
              p = new c(o[u], f.getLength() - 1).mod(f);
            a[u] = Array(f.getLength() - 1);
            for (var d = 0; d < a[u].length; d++) {
              var y = d + p.getLength() - a[u].length;
              a[u][d] = y >= 0 ? p.get(y) : 0;
            }
          }
          for (var g = 0, d = 0; d < e.length; d++) g += e[d].totalCount;
          for (var m = Array(g), b = 0, d = 0; d < n; d++)
            for (var u = 0; u < e.length; u++)
              d < o[u].length && (m[b++] = o[u][d]);
          for (var d = 0; d < i; d++)
            for (var u = 0; u < e.length; u++)
              d < a[u].length && (m[b++] = a[u][d]);
          return m;
        });
      for (
        var n = {
            MODE_NUMBER: 1,
            MODE_ALPHA_NUM: 2,
            MODE_8BIT_BYTE: 4,
            MODE_KANJI: 8,
          },
          i = { L: 1, M: 0, Q: 3, H: 2 },
          o = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7,
          },
          s = {
            PATTERN_POSITION_TABLE: [
              [],
              [6, 18],
              [6, 22],
              [6, 26],
              [6, 30],
              [6, 34],
              [6, 22, 38],
              [6, 24, 42],
              [6, 26, 46],
              [6, 28, 50],
              [6, 30, 54],
              [6, 32, 58],
              [6, 34, 62],
              [6, 26, 46, 66],
              [6, 26, 48, 70],
              [6, 26, 50, 74],
              [6, 30, 54, 78],
              [6, 30, 56, 82],
              [6, 30, 58, 86],
              [6, 34, 62, 90],
              [6, 28, 50, 72, 94],
              [6, 26, 50, 74, 98],
              [6, 30, 54, 78, 102],
              [6, 28, 54, 80, 106],
              [6, 32, 58, 84, 110],
              [6, 30, 58, 86, 114],
              [6, 34, 62, 90, 118],
              [6, 26, 50, 74, 98, 122],
              [6, 30, 54, 78, 102, 126],
              [6, 26, 52, 78, 104, 130],
              [6, 30, 56, 82, 108, 134],
              [6, 34, 60, 86, 112, 138],
              [6, 30, 58, 86, 114, 142],
              [6, 34, 62, 90, 118, 146],
              [6, 30, 54, 78, 102, 126, 150],
              [6, 24, 50, 76, 102, 128, 154],
              [6, 28, 54, 80, 106, 132, 158],
              [6, 32, 58, 84, 110, 136, 162],
              [6, 26, 54, 82, 110, 138, 166],
              [6, 30, 58, 86, 114, 142, 170],
            ],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (t) {
              for (
                var e = t << 10;
                s.getBCHDigit(e) - s.getBCHDigit(s.G15) >= 0;

              )
                e ^= s.G15 << (s.getBCHDigit(e) - s.getBCHDigit(s.G15));
              return ((t << 10) | e) ^ s.G15_MASK;
            },
            getBCHTypeNumber: function (t) {
              for (
                var e = t << 12;
                s.getBCHDigit(e) - s.getBCHDigit(s.G18) >= 0;

              )
                e ^= s.G18 << (s.getBCHDigit(e) - s.getBCHDigit(s.G18));
              return (t << 12) | e;
            },
            getBCHDigit: function (t) {
              for (var e = 0; 0 != t; ) e++, (t >>>= 1);
              return e;
            },
            getPatternPosition: function (t) {
              return s.PATTERN_POSITION_TABLE[t - 1];
            },
            getMask: function (t, e, r) {
              switch (t) {
                case o.PATTERN000:
                  return (e + r) % 2 == 0;
                case o.PATTERN001:
                  return e % 2 == 0;
                case o.PATTERN010:
                  return r % 3 == 0;
                case o.PATTERN011:
                  return (e + r) % 3 == 0;
                case o.PATTERN100:
                  return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
                case o.PATTERN101:
                  return ((e * r) % 2) + ((e * r) % 3) == 0;
                case o.PATTERN110:
                  return (((e * r) % 2) + ((e * r) % 3)) % 2 == 0;
                case o.PATTERN111:
                  return (((e * r) % 3) + ((e + r) % 2)) % 2 == 0;
                default:
                  throw Error("bad maskPattern:" + t);
              }
            },
            getErrorCorrectPolynomial: function (t) {
              for (var e = new c([1], 0), r = 0; r < t; r++)
                e = e.multiply(new c([1, a.gexp(r)], 0));
              return e;
            },
            getLengthInBits: function (t, e) {
              if (1 <= e && e < 10)
                switch (t) {
                  case n.MODE_NUMBER:
                    return 10;
                  case n.MODE_ALPHA_NUM:
                    return 9;
                  case n.MODE_8BIT_BYTE:
                  case n.MODE_KANJI:
                    return 8;
                  default:
                    throw Error("mode:" + t);
                }
              else if (e < 27)
                switch (t) {
                  case n.MODE_NUMBER:
                    return 12;
                  case n.MODE_ALPHA_NUM:
                    return 11;
                  case n.MODE_8BIT_BYTE:
                    return 16;
                  case n.MODE_KANJI:
                    return 10;
                  default:
                    throw Error("mode:" + t);
                }
              else if (e < 41)
                switch (t) {
                  case n.MODE_NUMBER:
                    return 14;
                  case n.MODE_ALPHA_NUM:
                    return 13;
                  case n.MODE_8BIT_BYTE:
                    return 16;
                  case n.MODE_KANJI:
                    return 12;
                  default:
                    throw Error("mode:" + t);
                }
              else throw Error("type:" + e);
            },
            getLostPoint: function (t) {
              for (var e = t.getModuleCount(), r = 0, n = 0; n < e; n++)
                for (var i = 0; i < e; i++) {
                  for (var o = 0, s = t.isDark(n, i), a = -1; a <= 1; a++)
                    if (!(n + a < 0) && !(e <= n + a))
                      for (var u = -1; u <= 1; u++)
                        !(i + u < 0) &&
                          !(e <= i + u) &&
                          (0 != a || 0 != u) &&
                          s == t.isDark(n + a, i + u) &&
                          o++;
                  o > 5 && (r += 3 + o - 5);
                }
              for (var n = 0; n < e - 1; n++)
                for (var i = 0; i < e - 1; i++) {
                  var c = 0;
                  t.isDark(n, i) && c++,
                    t.isDark(n + 1, i) && c++,
                    t.isDark(n, i + 1) && c++,
                    t.isDark(n + 1, i + 1) && c++,
                    (0 == c || 4 == c) && (r += 3);
                }
              for (var n = 0; n < e; n++)
                for (var i = 0; i < e - 6; i++)
                  t.isDark(n, i) &&
                    !t.isDark(n, i + 1) &&
                    t.isDark(n, i + 2) &&
                    t.isDark(n, i + 3) &&
                    t.isDark(n, i + 4) &&
                    !t.isDark(n, i + 5) &&
                    t.isDark(n, i + 6) &&
                    (r += 40);
              for (var i = 0; i < e; i++)
                for (var n = 0; n < e - 6; n++)
                  t.isDark(n, i) &&
                    !t.isDark(n + 1, i) &&
                    t.isDark(n + 2, i) &&
                    t.isDark(n + 3, i) &&
                    t.isDark(n + 4, i) &&
                    !t.isDark(n + 5, i) &&
                    t.isDark(n + 6, i) &&
                    (r += 40);
              for (var l = 0, i = 0; i < e; i++)
                for (var n = 0; n < e; n++) t.isDark(n, i) && l++;
              return r + 10 * (Math.abs((100 * l) / e / e - 50) / 5);
            },
          },
          a = {
            glog: function (t) {
              if (t < 1) throw Error("glog(" + t + ")");
              return a.LOG_TABLE[t];
            },
            gexp: function (t) {
              for (; t < 0; ) t += 255;
              for (; t >= 256; ) t -= 255;
              return a.EXP_TABLE[t];
            },
            EXP_TABLE: Array(256),
            LOG_TABLE: Array(256),
          },
          u = 0;
        u < 8;
        u++
      )
        a.EXP_TABLE[u] = 1 << u;
      for (var u = 8; u < 256; u++)
        a.EXP_TABLE[u] =
          a.EXP_TABLE[u - 4] ^
          a.EXP_TABLE[u - 5] ^
          a.EXP_TABLE[u - 6] ^
          a.EXP_TABLE[u - 8];
      for (var u = 0; u < 255; u++) a.LOG_TABLE[a.EXP_TABLE[u]] = u;
      function c(t, e) {
        if (void 0 == t.length) throw Error(t.length + "/" + e);
        for (var r = 0; r < t.length && 0 == t[r]; ) r++;
        this.num = Array(t.length - r + e);
        for (var n = 0; n < t.length - r; n++) this.num[n] = t[n + r];
      }
      function l(t, e) {
        (this.totalCount = t), (this.dataCount = e);
      }
      function h() {
        (this.buffer = []), (this.length = 0);
      }
      (c.prototype = {
        get: function (t) {
          return this.num[t];
        },
        getLength: function () {
          return this.num.length;
        },
        multiply: function (t) {
          for (
            var e = Array(this.getLength() + t.getLength() - 1), r = 0;
            r < this.getLength();
            r++
          )
            for (var n = 0; n < t.getLength(); n++)
              e[r + n] ^= a.gexp(a.glog(this.get(r)) + a.glog(t.get(n)));
          return new c(e, 0);
        },
        mod: function (t) {
          if (this.getLength() - t.getLength() < 0) return this;
          for (
            var e = a.glog(this.get(0)) - a.glog(t.get(0)),
              r = Array(this.getLength()),
              n = 0;
            n < this.getLength();
            n++
          )
            r[n] = this.get(n);
          for (var n = 0; n < t.getLength(); n++)
            r[n] ^= a.gexp(a.glog(t.get(n)) + e);
          return new c(r, 0).mod(t);
        },
      }),
        (l.RS_BLOCK_TABLE = [
          [1, 26, 19],
          [1, 26, 16],
          [1, 26, 13],
          [1, 26, 9],
          [1, 44, 34],
          [1, 44, 28],
          [1, 44, 22],
          [1, 44, 16],
          [1, 70, 55],
          [1, 70, 44],
          [2, 35, 17],
          [2, 35, 13],
          [1, 100, 80],
          [2, 50, 32],
          [2, 50, 24],
          [4, 25, 9],
          [1, 134, 108],
          [2, 67, 43],
          [2, 33, 15, 2, 34, 16],
          [2, 33, 11, 2, 34, 12],
          [2, 86, 68],
          [4, 43, 27],
          [4, 43, 19],
          [4, 43, 15],
          [2, 98, 78],
          [4, 49, 31],
          [2, 32, 14, 4, 33, 15],
          [4, 39, 13, 1, 40, 14],
          [2, 121, 97],
          [2, 60, 38, 2, 61, 39],
          [4, 40, 18, 2, 41, 19],
          [4, 40, 14, 2, 41, 15],
          [2, 146, 116],
          [3, 58, 36, 2, 59, 37],
          [4, 36, 16, 4, 37, 17],
          [4, 36, 12, 4, 37, 13],
          [2, 86, 68, 2, 87, 69],
          [4, 69, 43, 1, 70, 44],
          [6, 43, 19, 2, 44, 20],
          [6, 43, 15, 2, 44, 16],
          [4, 101, 81],
          [1, 80, 50, 4, 81, 51],
          [4, 50, 22, 4, 51, 23],
          [3, 36, 12, 8, 37, 13],
          [2, 116, 92, 2, 117, 93],
          [6, 58, 36, 2, 59, 37],
          [4, 46, 20, 6, 47, 21],
          [7, 42, 14, 4, 43, 15],
          [4, 133, 107],
          [8, 59, 37, 1, 60, 38],
          [8, 44, 20, 4, 45, 21],
          [12, 33, 11, 4, 34, 12],
          [3, 145, 115, 1, 146, 116],
          [4, 64, 40, 5, 65, 41],
          [11, 36, 16, 5, 37, 17],
          [11, 36, 12, 5, 37, 13],
          [5, 109, 87, 1, 110, 88],
          [5, 65, 41, 5, 66, 42],
          [5, 54, 24, 7, 55, 25],
          [11, 36, 12],
          [5, 122, 98, 1, 123, 99],
          [7, 73, 45, 3, 74, 46],
          [15, 43, 19, 2, 44, 20],
          [3, 45, 15, 13, 46, 16],
          [1, 135, 107, 5, 136, 108],
          [10, 74, 46, 1, 75, 47],
          [1, 50, 22, 15, 51, 23],
          [2, 42, 14, 17, 43, 15],
          [5, 150, 120, 1, 151, 121],
          [9, 69, 43, 4, 70, 44],
          [17, 50, 22, 1, 51, 23],
          [2, 42, 14, 19, 43, 15],
          [3, 141, 113, 4, 142, 114],
          [3, 70, 44, 11, 71, 45],
          [17, 47, 21, 4, 48, 22],
          [9, 39, 13, 16, 40, 14],
          [3, 135, 107, 5, 136, 108],
          [3, 67, 41, 13, 68, 42],
          [15, 54, 24, 5, 55, 25],
          [15, 43, 15, 10, 44, 16],
          [4, 144, 116, 4, 145, 117],
          [17, 68, 42],
          [17, 50, 22, 6, 51, 23],
          [19, 46, 16, 6, 47, 17],
          [2, 139, 111, 7, 140, 112],
          [17, 74, 46],
          [7, 54, 24, 16, 55, 25],
          [34, 37, 13],
          [4, 151, 121, 5, 152, 122],
          [4, 75, 47, 14, 76, 48],
          [11, 54, 24, 14, 55, 25],
          [16, 45, 15, 14, 46, 16],
          [6, 147, 117, 4, 148, 118],
          [6, 73, 45, 14, 74, 46],
          [11, 54, 24, 16, 55, 25],
          [30, 46, 16, 2, 47, 17],
          [8, 132, 106, 4, 133, 107],
          [8, 75, 47, 13, 76, 48],
          [7, 54, 24, 22, 55, 25],
          [22, 45, 15, 13, 46, 16],
          [10, 142, 114, 2, 143, 115],
          [19, 74, 46, 4, 75, 47],
          [28, 50, 22, 6, 51, 23],
          [33, 46, 16, 4, 47, 17],
          [8, 152, 122, 4, 153, 123],
          [22, 73, 45, 3, 74, 46],
          [8, 53, 23, 26, 54, 24],
          [12, 45, 15, 28, 46, 16],
          [3, 147, 117, 10, 148, 118],
          [3, 73, 45, 23, 74, 46],
          [4, 54, 24, 31, 55, 25],
          [11, 45, 15, 31, 46, 16],
          [7, 146, 116, 7, 147, 117],
          [21, 73, 45, 7, 74, 46],
          [1, 53, 23, 37, 54, 24],
          [19, 45, 15, 26, 46, 16],
          [5, 145, 115, 10, 146, 116],
          [19, 75, 47, 10, 76, 48],
          [15, 54, 24, 25, 55, 25],
          [23, 45, 15, 25, 46, 16],
          [13, 145, 115, 3, 146, 116],
          [2, 74, 46, 29, 75, 47],
          [42, 54, 24, 1, 55, 25],
          [23, 45, 15, 28, 46, 16],
          [17, 145, 115],
          [10, 74, 46, 23, 75, 47],
          [10, 54, 24, 35, 55, 25],
          [19, 45, 15, 35, 46, 16],
          [17, 145, 115, 1, 146, 116],
          [14, 74, 46, 21, 75, 47],
          [29, 54, 24, 19, 55, 25],
          [11, 45, 15, 46, 46, 16],
          [13, 145, 115, 6, 146, 116],
          [14, 74, 46, 23, 75, 47],
          [44, 54, 24, 7, 55, 25],
          [59, 46, 16, 1, 47, 17],
          [12, 151, 121, 7, 152, 122],
          [12, 75, 47, 26, 76, 48],
          [39, 54, 24, 14, 55, 25],
          [22, 45, 15, 41, 46, 16],
          [6, 151, 121, 14, 152, 122],
          [6, 75, 47, 34, 76, 48],
          [46, 54, 24, 10, 55, 25],
          [2, 45, 15, 64, 46, 16],
          [17, 152, 122, 4, 153, 123],
          [29, 74, 46, 14, 75, 47],
          [49, 54, 24, 10, 55, 25],
          [24, 45, 15, 46, 46, 16],
          [4, 152, 122, 18, 153, 123],
          [13, 74, 46, 32, 75, 47],
          [48, 54, 24, 14, 55, 25],
          [42, 45, 15, 32, 46, 16],
          [20, 147, 117, 4, 148, 118],
          [40, 75, 47, 7, 76, 48],
          [43, 54, 24, 22, 55, 25],
          [10, 45, 15, 67, 46, 16],
          [19, 148, 118, 6, 149, 119],
          [18, 75, 47, 31, 76, 48],
          [34, 54, 24, 34, 55, 25],
          [20, 45, 15, 61, 46, 16],
        ]),
        (l.getRSBlocks = function (t, e) {
          var r = l.getRsBlockTable(t, e);
          if (void 0 == r)
            throw Error(
              "bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e
            );
          for (var n = r.length / 3, i = [], o = 0; o < n; o++)
            for (
              var s = r[3 * o + 0], a = r[3 * o + 1], u = r[3 * o + 2], c = 0;
              c < s;
              c++
            )
              i.push(new l(a, u));
          return i;
        }),
        (l.getRsBlockTable = function (t, e) {
          switch (e) {
            case i.L:
              return l.RS_BLOCK_TABLE[(t - 1) * 4 + 0];
            case i.M:
              return l.RS_BLOCK_TABLE[(t - 1) * 4 + 1];
            case i.Q:
              return l.RS_BLOCK_TABLE[(t - 1) * 4 + 2];
            case i.H:
              return l.RS_BLOCK_TABLE[(t - 1) * 4 + 3];
            default:
              return;
          }
        }),
        (h.prototype = {
          get: function (t) {
            var e = Math.floor(t / 8);
            return ((this.buffer[e] >>> (7 - (t % 8))) & 1) == 1;
          },
          put: function (t, e) {
            for (var r = 0; r < e; r++)
              this.putBit(((t >>> (e - r - 1)) & 1) == 1);
          },
          getLengthInBits: function () {
            return this.length;
          },
          putBit: function (t) {
            var e = Math.floor(this.length / 8);
            this.buffer.length <= e && this.buffer.push(0),
              t && (this.buffer[e] |= 128 >>> this.length % 8),
              this.length++;
          },
        });
      var d = [
        [17, 14, 11, 7],
        [32, 26, 20, 14],
        [53, 42, 32, 24],
        [78, 62, 46, 34],
        [106, 84, 60, 44],
        [134, 106, 74, 58],
        [154, 122, 86, 64],
        [192, 152, 108, 84],
        [230, 180, 130, 98],
        [271, 213, 151, 119],
        [321, 251, 177, 137],
        [367, 287, 203, 155],
        [425, 331, 241, 177],
        [458, 362, 258, 194],
        [520, 412, 292, 220],
        [586, 450, 322, 250],
        [644, 504, 364, 280],
        [718, 560, 394, 310],
        [792, 624, 442, 338],
        [858, 666, 482, 382],
        [929, 711, 509, 403],
        [1003, 779, 565, 439],
        [1091, 857, 611, 461],
        [1171, 911, 661, 511],
        [1273, 997, 715, 535],
        [1367, 1059, 751, 593],
        [1465, 1125, 805, 625],
        [1528, 1190, 868, 658],
        [1628, 1264, 908, 698],
        [1732, 1370, 982, 742],
        [1840, 1452, 1030, 790],
        [1952, 1538, 1112, 842],
        [2068, 1628, 1168, 898],
        [2188, 1722, 1228, 958],
        [2303, 1809, 1283, 983],
        [2431, 1911, 1351, 1051],
        [2563, 1989, 1423, 1093],
        [2699, 2099, 1499, 1139],
        [2809, 2213, 1579, 1219],
        [2953, 2331, 1663, 1273],
      ];
      function f(t) {
        if (
          ((this.options = {
            padding: 4,
            width: 256,
            height: 256,
            typeNumber: 4,
            color: "#000000",
            background: "#ffffff",
            ecl: "M",
            image: { svg: "", width: 0, height: 0 },
          }),
          "string" == typeof t && (t = { content: t }),
          t)
        )
          for (var e in t) this.options[e] = t[e];
        if ("string" != typeof this.options.content)
          throw Error("Expected 'content' as string!");
        if (0 === this.options.content.length)
          throw Error("Expected 'content' to be non-empty!");
        if (!(this.options.padding >= 0))
          throw Error("Expected 'padding' value to be non-negative!");
        if (!(this.options.width > 0) || !(this.options.height > 0))
          throw Error(
            "Expected 'width' or 'height' value to be higher than zero!"
          );
        var n = this.options.content,
          o = (function (t, e) {
            for (
              var r,
                n =
                  (r = encodeURI(t)
                    .toString()
                    .replace(/\%[0-9a-fA-F]{2}/g, "a")).length +
                  (r.length != t ? 3 : 0),
                i = 1,
                o = 0,
                s = 0,
                a = d.length;
              s <= a;
              s++
            ) {
              var u = d[s];
              if (!u)
                throw Error(
                  "Content too long: expected " + o + " but got " + n
                );
              switch (e) {
                case "L":
                  o = u[0];
                  break;
                case "M":
                  o = u[1];
                  break;
                case "Q":
                  o = u[2];
                  break;
                case "H":
                  o = u[3];
                  break;
                default:
                  throw Error("Unknwon error correction level: " + e);
              }
              if (n <= o) break;
              i++;
            }
            if (i > d.length) throw Error("Content too long");
            return i;
          })(n, this.options.ecl),
          s = (function (t) {
            switch (t) {
              case "L":
                return i.L;
              case "M":
                return i.M;
              case "Q":
                return i.Q;
              case "H":
                return i.H;
              default:
                throw Error("Unknwon error correction level: " + t);
            }
          })(this.options.ecl);
        (this.qrcode = new r(o, s)), this.qrcode.addData(n), this.qrcode.make();
      }
      (f.prototype.svg = function (t) {
        var e = this.options || {},
          r = this.qrcode.modules;
        void 0 === t && (t = { container: e.container || "svg" });
        for (
          var n = void 0 === e.pretty || !!e.pretty,
            i = n ? "  " : "",
            o = n ? "\r\n" : "",
            s = e.width,
            a = e.height,
            u = r.length,
            c = s / (u + 2 * e.padding),
            l = a / (u + 2 * e.padding),
            h = void 0 !== e.join && !!e.join,
            d = void 0 !== e.swap && !!e.swap,
            f = void 0 === e.xmlDeclaration || !!e.xmlDeclaration,
            p = void 0 !== e.predefined && !!e.predefined,
            y = p
              ? i +
                '<defs><path id="qrmodule" d="M0 0 h' +
                l +
                " v" +
                c +
                ' H0 z" style="fill:' +
                e.color +
                ';shape-rendering:crispEdges;" /></defs>' +
                o
              : "",
            g =
              i +
              '<rect x="0" y="0" width="' +
              s +
              '" height="' +
              a +
              '" style="fill:' +
              e.background +
              ';shape-rendering:crispEdges;"/>' +
              o,
            m = "",
            b = "",
            v = 0;
          v < u;
          v++
        )
          for (var _ = 0; _ < u; _++)
            if (r[_][v]) {
              var w = _ * c + e.padding * c,
                E = v * l + e.padding * l;
              if (d) {
                var S = w;
                (w = E), (E = S);
              }
              if (h) {
                var M = c + w,
                  x = l + E;
                (w = Number.isInteger(w) ? Number(w) : w.toFixed(2)),
                  (E = Number.isInteger(E) ? Number(E) : E.toFixed(2)),
                  (M = Number.isInteger(M) ? Number(M) : M.toFixed(2)),
                  (b +=
                    "M" +
                    w +
                    "," +
                    E +
                    " V" +
                    (x = Number.isInteger(x) ? Number(x) : x.toFixed(2)) +
                    " H" +
                    M +
                    " V" +
                    E +
                    " H" +
                    w +
                    " Z ");
              } else
                p
                  ? (m +=
                      i +
                      '<use x="' +
                      w.toString() +
                      '" y="' +
                      E.toString() +
                      '" href="#qrmodule" />' +
                      o)
                  : (m +=
                      i +
                      '<rect x="' +
                      w.toString() +
                      '" y="' +
                      E.toString() +
                      '" width="' +
                      c +
                      '" height="' +
                      l +
                      '" style="fill:' +
                      e.color +
                      ';shape-rendering:crispEdges;"/>' +
                      o);
            }
        h &&
          (m =
            i +
            '<path x="0" y="0" style="fill:' +
            e.color +
            ';shape-rendering:crispEdges;" d="' +
            b +
            '" />');
        let k = "";
        if (void 0 !== this.options.image && this.options.image.svg) {
          let t = (s * this.options.image.width) / 100,
            e = (a * this.options.image.height) / 100;
          k +=
            `<svg x="${s / 2 - t / 2}" y="${
              a / 2 - e / 2
            }" width="${t}" height="${e}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">` +
            (this.options.image.svg + o) +
            "</svg>";
        }
        var C = "";
        switch (t.container) {
          case "svg":
            f && (C += '<?xml version="1.0" standalone="yes"?>' + o),
              (C +=
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' +
                s +
                '" height="' +
                a +
                '">' +
                o +
                (y + g + m) +
                k +
                "</svg>");
            break;
          case "svg-viewbox":
            f && (C += '<?xml version="1.0" standalone="yes"?>' + o),
              (C +=
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' +
                s +
                " " +
                a +
                '">' +
                o +
                (y + g + m) +
                k +
                "</svg>");
            break;
          case "g":
            C +=
              '<g width="' +
              s +
              '" height="' +
              a +
              '">' +
              o +
              (y + g + m) +
              k +
              "</g>";
            break;
          default:
            C += (y + g + m + k).replace(/^\s+/, "");
        }
        return C;
      }),
        (t.exports = f);
    },
    43604: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.LIB_VERSION = void 0),
        (e.LIB_VERSION = "3.6.6");
    },
    88710: function (t, e, r) {
      "use strict";
      r.r(e),
        r.d(e, {
          ArgumentOutOfRangeError: function () {
            return A.W;
          },
          AsyncSubject: function () {
            return l.c;
          },
          BehaviorSubject: function () {
            return u.X;
          },
          ConnectableObservable: function () {
            return i.c;
          },
          EMPTY: function () {
            return Z.E;
          },
          EmptyError: function () {
            return N.K;
          },
          GroupedObservable: function () {
            return o.T;
          },
          NEVER: function () {
            return ts;
          },
          Notification: function () {
            return x.P;
          },
          NotificationKind: function () {
            return x.W;
          },
          ObjectUnsubscribedError: function () {
            return T.N;
          },
          Observable: function () {
            return n.y;
          },
          ReplaySubject: function () {
            return c.t;
          },
          Scheduler: function () {
            return E.b;
          },
          Subject: function () {
            return a.xQ;
          },
          Subscriber: function () {
            return M.L;
          },
          Subscription: function () {
            return S.w;
          },
          TimeoutError: function () {
            return L.W;
          },
          UnsubscriptionError: function () {
            return O.B;
          },
          VirtualAction: function () {
            return w;
          },
          VirtualTimeScheduler: function () {
            return _;
          },
          animationFrame: function () {
            return v;
          },
          animationFrameScheduler: function () {
            return b;
          },
          asap: function () {
            return h.e;
          },
          asapScheduler: function () {
            return h.E;
          },
          async: function () {
            return d.P;
          },
          asyncScheduler: function () {
            return d.z;
          },
          bindCallback: function () {
            return function t(e, r, i) {
              if (r) {
                if (!(0, B.K)(r))
                  return function () {
                    for (var n = [], o = 0; o < arguments.length; o++)
                      n[o] = arguments[o];
                    return t(e, i)
                      .apply(void 0, n)
                      .pipe(
                        (0, j.U)(function (t) {
                          return (0, D.k)(t) ? r.apply(void 0, t) : r(t);
                        })
                      );
                  };
                i = r;
              }
              return function () {
                for (var t, r = [], o = 0; o < arguments.length; o++)
                  r[o] = arguments[o];
                var s = this,
                  a = { context: s, subject: t, callbackFunc: e, scheduler: i };
                return new n.y(function (n) {
                  if (i)
                    return i.schedule(F, 0, {
                      args: r,
                      subscriber: n,
                      params: a,
                    });
                  if (!t) {
                    t = new l.c();
                    try {
                      e.apply(
                        s,
                        r.concat([
                          function () {
                            for (var e = [], r = 0; r < arguments.length; r++)
                              e[r] = arguments[r];
                            t.next(e.length <= 1 ? e[0] : e), t.complete();
                          },
                        ])
                      );
                    } catch (e) {
                      (0, P._)(t) ? t.error(e) : console.warn(e);
                    }
                  }
                  return t.subscribe(n);
                });
              };
            };
          },
          bindNodeCallback: function () {
            return function t(e, r, i) {
              if (r) {
                if (!(0, B.K)(r))
                  return function () {
                    for (var n = [], o = 0; o < arguments.length; o++)
                      n[o] = arguments[o];
                    return t(e, i)
                      .apply(void 0, n)
                      .pipe(
                        (0, j.U)(function (t) {
                          return (0, D.k)(t) ? r.apply(void 0, t) : r(t);
                        })
                      );
                  };
                i = r;
              }
              return function () {
                for (var t = [], r = 0; r < arguments.length; r++)
                  t[r] = arguments[r];
                var o = {
                  subject: void 0,
                  args: t,
                  callbackFunc: e,
                  scheduler: i,
                  context: this,
                };
                return new n.y(function (r) {
                  var n = o.context,
                    s = o.subject;
                  if (i)
                    return i.schedule(U, 0, {
                      params: o,
                      subscriber: r,
                      context: n,
                    });
                  if (!s) {
                    s = o.subject = new l.c();
                    try {
                      e.apply(
                        n,
                        t.concat([
                          function () {
                            for (var t = [], e = 0; e < arguments.length; e++)
                              t[e] = arguments[e];
                            var r = t.shift();
                            if (r) {
                              s.error(r);
                              return;
                            }
                            s.next(t.length <= 1 ? t[0] : t), s.complete();
                          },
                        ])
                      );
                    } catch (t) {
                      (0, P._)(s) ? s.error(t) : console.warn(t);
                    }
                  }
                  return s.subscribe(r);
                });
              };
            };
          },
          combineLatest: function () {
            return W.aj;
          },
          concat: function () {
            return H.z;
          },
          config: function () {
            return tM.v;
          },
          defer: function () {
            return q.P;
          },
          empty: function () {
            return Z.c;
          },
          forkJoin: function () {
            return Y;
          },
          from: function () {
            return G.D;
          },
          fromEvent: function () {
            return function t(e, r, i, o) {
              return ((0, K.m)(i) && ((o = i), (i = void 0)), o)
                ? t(e, r, i).pipe(
                    (0, j.U)(function (t) {
                      return (0, D.k)(t) ? o.apply(void 0, t) : o(t);
                    })
                  )
                : new n.y(function (t) {
                    (function t(e, r, n, i, o) {
                      if (
                        e &&
                        "function" == typeof e.addEventListener &&
                        "function" == typeof e.removeEventListener
                      )
                        e.addEventListener(r, n, o),
                          (s = function () {
                            return e.removeEventListener(r, n, o);
                          });
                      else if (
                        e &&
                        "function" == typeof e.on &&
                        "function" == typeof e.off
                      )
                        e.on(r, n),
                          (s = function () {
                            return e.off(r, n);
                          });
                      else if (
                        e &&
                        "function" == typeof e.addListener &&
                        "function" == typeof e.removeListener
                      )
                        e.addListener(r, n),
                          (s = function () {
                            return e.removeListener(r, n);
                          });
                      else if (e && e.length)
                        for (var s, a = 0, u = e.length; a < u; a++)
                          t(e[a], r, n, i, o);
                      else throw TypeError("Invalid event target");
                      i.add(s);
                    })(
                      e,
                      r,
                      function (e) {
                        arguments.length > 1
                          ? t.next(Array.prototype.slice.call(arguments))
                          : t.next(e);
                      },
                      t,
                      i
                    );
                  });
            };
          },
          fromEventPattern: function () {
            return function t(e, r, i) {
              return i
                ? t(e, r).pipe(
                    (0, j.U)(function (t) {
                      return (0, D.k)(t) ? i.apply(void 0, t) : i(t);
                    })
                  )
                : new n.y(function (t) {
                    var n,
                      i = function () {
                        for (var e = [], r = 0; r < arguments.length; r++)
                          e[r] = arguments[r];
                        return t.next(1 === e.length ? e[0] : e);
                      };
                    try {
                      n = e(i);
                    } catch (e) {
                      t.error(e);
                      return;
                    }
                    if ((0, K.m)(r))
                      return function () {
                        return r(i, n);
                      };
                  });
            };
          },
          generate: function () {
            return X;
          },
          identity: function () {
            return I.y;
          },
          iif: function () {
            return te;
          },
          interval: function () {
            return tn;
          },
          isObservable: function () {
            return R;
          },
          merge: function () {
            return to.T;
          },
          never: function () {
            return ta;
          },
          noop: function () {
            return C.Z;
          },
          observable: function () {
            return s.L;
          },
          of: function () {
            return tu.of;
          },
          onErrorResumeNext: function () {
            return tc;
          },
          pairs: function () {
            return tl;
          },
          partition: function () {
            return ty;
          },
          pipe: function () {
            return k.z;
          },
          queue: function () {
            return f.c;
          },
          queueScheduler: function () {
            return f.N;
          },
          race: function () {
            return tg.S3;
          },
          range: function () {
            return tm;
          },
          scheduled: function () {
            return tS.x;
          },
          throwError: function () {
            return tv._;
          },
          timer: function () {
            return t_.H;
          },
          using: function () {
            return tw;
          },
          zip: function () {
            return tE.$R;
          },
        });
      var n = r(83912),
        i = r(75623),
        o = r(53592),
        s = r(33917),
        a = r(53037),
        u = r(29381),
        c = r(80436),
        l = r(25343),
        h = r(13220),
        d = r(71055),
        f = r(86513),
        p = r(55313),
        y = r(26368),
        g = (function (t) {
          function e(e, r) {
            var n = t.call(this, e, r) || this;
            return (n.scheduler = e), (n.work = r), n;
          }
          return (
            p.ZT(e, t),
            (e.prototype.requestAsyncId = function (e, r, n) {
              return (void 0 === n && (n = 0), null !== n && n > 0)
                ? t.prototype.requestAsyncId.call(this, e, r, n)
                : (e.actions.push(this),
                  e.scheduled ||
                    (e.scheduled = requestAnimationFrame(function () {
                      return e.flush(null);
                    })));
            }),
            (e.prototype.recycleAsyncId = function (e, r, n) {
              if (
                (void 0 === n && (n = 0),
                (null !== n && n > 0) || (null === n && this.delay > 0))
              )
                return t.prototype.recycleAsyncId.call(this, e, r, n);
              0 === e.actions.length &&
                (cancelAnimationFrame(r), (e.scheduled = void 0));
            }),
            e
          );
        })(y.o),
        m = r(15780),
        b = new ((function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            p.ZT(e, t),
            (e.prototype.flush = function (t) {
              (this.active = !0), (this.scheduled = void 0);
              var e,
                r = this.actions,
                n = -1,
                i = r.length;
              t = t || r.shift();
              do if ((e = t.execute(t.state, t.delay))) break;
              while (++n < i && (t = r.shift()));
              if (((this.active = !1), e)) {
                for (; ++n < i && (t = r.shift()); ) t.unsubscribe();
                throw e;
              }
            }),
            e
          );
        })(m.v))(g),
        v = b,
        _ = (function (t) {
          function e(e, r) {
            void 0 === e && (e = w),
              void 0 === r && (r = Number.POSITIVE_INFINITY);
            var n =
              t.call(this, e, function () {
                return n.frame;
              }) || this;
            return (n.maxFrames = r), (n.frame = 0), (n.index = -1), n;
          }
          return (
            p.ZT(e, t),
            (e.prototype.flush = function () {
              for (
                var t, e, r = this.actions, n = this.maxFrames;
                (e = r[0]) &&
                e.delay <= n &&
                (r.shift(),
                (this.frame = e.delay),
                !(t = e.execute(e.state, e.delay)));

              );
              if (t) {
                for (; (e = r.shift()); ) e.unsubscribe();
                throw t;
              }
            }),
            (e.frameTimeFactor = 10),
            e
          );
        })(m.v),
        w = (function (t) {
          function e(e, r, n) {
            void 0 === n && (n = e.index += 1);
            var i = t.call(this, e, r) || this;
            return (
              (i.scheduler = e),
              (i.work = r),
              (i.index = n),
              (i.active = !0),
              (i.index = e.index = n),
              i
            );
          }
          return (
            p.ZT(e, t),
            (e.prototype.schedule = function (r, n) {
              if ((void 0 === n && (n = 0), !this.id))
                return t.prototype.schedule.call(this, r, n);
              this.active = !1;
              var i = new e(this.scheduler, this.work);
              return this.add(i), i.schedule(r, n);
            }),
            (e.prototype.requestAsyncId = function (t, r, n) {
              void 0 === n && (n = 0), (this.delay = t.frame + n);
              var i = t.actions;
              return i.push(this), i.sort(e.sortActions), !0;
            }),
            (e.prototype.recycleAsyncId = function (t, e, r) {
              void 0 === r && (r = 0);
            }),
            (e.prototype._execute = function (e, r) {
              if (!0 === this.active)
                return t.prototype._execute.call(this, e, r);
            }),
            (e.sortActions = function (t, e) {
              return t.delay === e.delay
                ? t.index === e.index
                  ? 0
                  : t.index > e.index
                  ? 1
                  : -1
                : t.delay > e.delay
                ? 1
                : -1;
            }),
            e
          );
        })(y.o),
        E = r(96145),
        S = r(5587),
        M = r(90960),
        x = r(72672),
        k = r(26883),
        C = r(62082),
        I = r(33562);
      function R(t) {
        return (
          !!t &&
          (t instanceof n.y ||
            ("function" == typeof t.lift && "function" == typeof t.subscribe))
        );
      }
      var A = r(99371),
        N = r(70166),
        T = r(92962),
        O = r(48642),
        L = r(64839),
        j = r(57054),
        P = r(36659),
        D = r(18354),
        B = r(6306);
      function F(t) {
        var e = this,
          r = t.args,
          n = t.subscriber,
          i = t.params,
          o = i.callbackFunc,
          s = i.context,
          a = i.scheduler,
          u = i.subject;
        if (!u) {
          u = i.subject = new l.c();
          try {
            o.apply(
              s,
              r.concat([
                function () {
                  for (var t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                  var n = t.length <= 1 ? t[0] : t;
                  e.add(a.schedule($, 0, { value: n, subject: u }));
                },
              ])
            );
          } catch (t) {
            u.error(t);
          }
        }
        this.add(u.subscribe(n));
      }
      function $(t) {
        var e = t.value,
          r = t.subject;
        r.next(e), r.complete();
      }
      function U(t) {
        var e = this,
          r = t.params,
          n = t.subscriber,
          i = t.context,
          o = r.callbackFunc,
          s = r.args,
          a = r.scheduler,
          u = r.subject;
        if (!u) {
          u = r.subject = new l.c();
          try {
            o.apply(
              i,
              s.concat([
                function () {
                  for (var t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                  var n = t.shift();
                  if (n) e.add(a.schedule(V, 0, { err: n, subject: u }));
                  else {
                    var i = t.length <= 1 ? t[0] : t;
                    e.add(a.schedule(z, 0, { value: i, subject: u }));
                  }
                },
              ])
            );
          } catch (t) {
            this.add(a.schedule(V, 0, { err: t, subject: u }));
          }
        }
        this.add(u.subscribe(n));
      }
      function z(t) {
        var e = t.value,
          r = t.subject;
        r.next(e), r.complete();
      }
      function V(t) {
        var e = t.err;
        t.subject.error(e);
      }
      var W = r(46864),
        H = r(50961),
        q = r(59052),
        Z = r(49117),
        J = r(58011),
        G = r(53279);
      function Y() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        if (1 === t.length) {
          var r = t[0];
          if ((0, D.k)(r)) return Q(r, null);
          if ((0, J.K)(r) && Object.getPrototypeOf(r) === Object.prototype) {
            var n = Object.keys(r);
            return Q(
              n.map(function (t) {
                return r[t];
              }),
              n
            );
          }
        }
        if ("function" == typeof t[t.length - 1]) {
          var i = t.pop();
          return Q(
            (t = 1 === t.length && (0, D.k)(t[0]) ? t[0] : t),
            null
          ).pipe(
            (0, j.U)(function (t) {
              return i.apply(void 0, t);
            })
          );
        }
        return Q(t, null);
      }
      function Q(t, e) {
        return new n.y(function (r) {
          var n = t.length;
          if (0 === n) {
            r.complete();
            return;
          }
          for (
            var i = Array(n),
              o = 0,
              s = 0,
              a = function (a) {
                var u = (0, G.D)(t[a]),
                  c = !1;
                r.add(
                  u.subscribe({
                    next: function (t) {
                      !c && ((c = !0), s++), (i[a] = t);
                    },
                    error: function (t) {
                      return r.error(t);
                    },
                    complete: function () {
                      (++o !== n && c) ||
                        (s === n &&
                          r.next(
                            e
                              ? e.reduce(function (t, e, r) {
                                  return (t[e] = i[r]), t;
                                }, {})
                              : i
                          ),
                        r.complete());
                    },
                  })
                );
              },
              u = 0;
            u < n;
            u++
          )
            a(u);
        });
      }
      var K = r(23991);
      function X(t, e, r, i, o) {
        if (1 == arguments.length) {
          var s, a;
          (a = t.initialState),
            (e = t.condition),
            (r = t.iterate),
            (s = t.resultSelector || I.y),
            (o = t.scheduler);
        } else
          void 0 === i || (0, B.K)(i)
            ? ((a = t), (s = I.y), (o = i))
            : ((a = t), (s = i));
        return new n.y(function (t) {
          var n = a;
          if (o)
            return o.schedule(tt, 0, {
              subscriber: t,
              iterate: r,
              condition: e,
              resultSelector: s,
              state: n,
            });
          for (;;) {
            if (e) {
              var i = void 0;
              try {
                i = e(n);
              } catch (e) {
                t.error(e);
                return;
              }
              if (!i) {
                t.complete();
                break;
              }
            }
            var u = void 0;
            try {
              u = s(n);
            } catch (e) {
              t.error(e);
              break;
            }
            if ((t.next(u), t.closed)) break;
            try {
              n = r(n);
            } catch (e) {
              t.error(e);
              break;
            }
          }
        });
      }
      function tt(t) {
        var e,
          r = t.subscriber,
          n = t.condition;
        if (!r.closed) {
          if (t.needIterate)
            try {
              t.state = t.iterate(t.state);
            } catch (t) {
              r.error(t);
              return;
            }
          else t.needIterate = !0;
          if (n) {
            var i = void 0;
            try {
              i = n(t.state);
            } catch (t) {
              r.error(t);
              return;
            }
            if (!i) {
              r.complete();
              return;
            }
            if (r.closed) return;
          }
          try {
            e = t.resultSelector(t.state);
          } catch (t) {
            r.error(t);
            return;
          }
          if (!r.closed && (r.next(e), !r.closed)) return this.schedule(t);
        }
      }
      function te(t, e, r) {
        return (
          void 0 === e && (e = Z.E),
          void 0 === r && (r = Z.E),
          (0, q.P)(function () {
            return t() ? e : r;
          })
        );
      }
      var tr = r(64090);
      function tn(t, e) {
        return (
          void 0 === t && (t = 0),
          void 0 === e && (e = d.P),
          (!(0, tr.k)(t) || t < 0) && (t = 0),
          (e && "function" == typeof e.schedule) || (e = d.P),
          new n.y(function (r) {
            return (
              r.add(
                e.schedule(ti, t, { subscriber: r, counter: 0, period: t })
              ),
              r
            );
          })
        );
      }
      function ti(t) {
        var e = t.subscriber,
          r = t.counter,
          n = t.period;
        e.next(r),
          this.schedule({ subscriber: e, counter: r + 1, period: n }, n);
      }
      var to = r(28051),
        ts = new n.y(C.Z);
      function ta() {
        return ts;
      }
      var tu = r(17010);
      function tc() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        if (0 === t.length) return Z.E;
        var r = t[0],
          i = t.slice(1);
        return 1 === t.length && (0, D.k)(r)
          ? tc.apply(void 0, r)
          : new n.y(function (t) {
              var e = function () {
                return t.add(tc.apply(void 0, i).subscribe(t));
              };
              return (0, G.D)(r).subscribe({
                next: function (e) {
                  t.next(e);
                },
                error: e,
                complete: e,
              });
            });
      }
      function tl(t, e) {
        return new n.y(
          e
            ? function (r) {
                var n = Object.keys(t),
                  i = new S.w();
                return (
                  i.add(
                    e.schedule(th, 0, {
                      keys: n,
                      index: 0,
                      subscriber: r,
                      subscription: i,
                      obj: t,
                    })
                  ),
                  i
                );
              }
            : function (e) {
                for (
                  var r = Object.keys(t), n = 0;
                  n < r.length && !e.closed;
                  n++
                ) {
                  var i = r[n];
                  t.hasOwnProperty(i) && e.next([i, t[i]]);
                }
                e.complete();
              }
        );
      }
      function th(t) {
        var e = t.keys,
          r = t.index,
          n = t.subscriber,
          i = t.subscription,
          o = t.obj;
        if (!n.closed) {
          if (r < e.length) {
            var s = e[r];
            n.next([s, o[s]]),
              i.add(
                this.schedule({
                  keys: e,
                  index: r + 1,
                  subscriber: n,
                  subscription: i,
                  obj: o,
                })
              );
          } else n.complete();
        }
      }
      var td = r(64409),
        tf = r(55665),
        tp = r(70363);
      function ty(t, e, r) {
        return [
          (0, tp.h)(e, r)(new n.y((0, tf.s)(t))),
          (0, tp.h)((0, td.f)(e, r))(new n.y((0, tf.s)(t))),
        ];
      }
      var tg = r(51340);
      function tm(t, e, r) {
        return (
          void 0 === t && (t = 0),
          new n.y(function (n) {
            void 0 === e && ((e = t), (t = 0));
            var i = 0,
              o = t;
            if (r)
              return r.schedule(tb, 0, {
                index: i,
                count: e,
                start: t,
                subscriber: n,
              });
            for (;;) {
              if (i++ >= e) {
                n.complete();
                break;
              }
              if ((n.next(o++), n.closed)) break;
            }
          })
        );
      }
      function tb(t) {
        var e = t.start,
          r = t.index,
          n = t.count,
          i = t.subscriber;
        if (r >= n) {
          i.complete();
          return;
        }
        i.next(e),
          i.closed || ((t.index = r + 1), (t.start = e + 1), this.schedule(t));
      }
      var tv = r(81885),
        t_ = r(19126);
      function tw(t, e) {
        return new n.y(function (r) {
          try {
            n = t();
          } catch (t) {
            r.error(t);
            return;
          }
          try {
            i = e(n);
          } catch (t) {
            r.error(t);
            return;
          }
          var n,
            i,
            o = (i ? (0, G.D)(i) : Z.E).subscribe(r);
          return function () {
            o.unsubscribe(), n && n.unsubscribe();
          };
        });
      }
      var tE = r(35071),
        tS = r(89967),
        tM = r(70538);
    },
    25343: function (t, e, r) {
      "use strict";
      r.d(e, {
        c: function () {
          return s;
        },
      });
      var n = r(55313),
        i = r(53037),
        o = r(5587),
        s = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e.value = null), (e.hasNext = !1), (e.hasCompleted = !1), e;
          }
          return (
            n.ZT(e, t),
            (e.prototype._subscribe = function (e) {
              return this.hasError
                ? (e.error(this.thrownError), o.w.EMPTY)
                : this.hasCompleted && this.hasNext
                ? (e.next(this.value), e.complete(), o.w.EMPTY)
                : t.prototype._subscribe.call(this, e);
            }),
            (e.prototype.next = function (t) {
              this.hasCompleted || ((this.value = t), (this.hasNext = !0));
            }),
            (e.prototype.error = function (e) {
              this.hasCompleted || t.prototype.error.call(this, e);
            }),
            (e.prototype.complete = function () {
              (this.hasCompleted = !0),
                this.hasNext && t.prototype.next.call(this, this.value),
                t.prototype.complete.call(this);
            }),
            e
          );
        })(i.xQ);
    },
    29381: function (t, e, r) {
      "use strict";
      r.d(e, {
        X: function () {
          return s;
        },
      });
      var n = r(55313),
        i = r(53037),
        o = r(92962),
        s = (function (t) {
          function e(e) {
            var r = t.call(this) || this;
            return (r._value = e), r;
          }
          return (
            n.ZT(e, t),
            Object.defineProperty(e.prototype, "value", {
              get: function () {
                return this.getValue();
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._subscribe = function (e) {
              var r = t.prototype._subscribe.call(this, e);
              return r && !r.closed && e.next(this._value), r;
            }),
            (e.prototype.getValue = function () {
              if (this.hasError) throw this.thrownError;
              if (!this.closed) return this._value;
              throw new o.N();
            }),
            (e.prototype.next = function (e) {
              t.prototype.next.call(this, (this._value = e));
            }),
            e
          );
        })(i.xQ);
    },
    72672: function (t, e, r) {
      "use strict";
      r.d(e, {
        P: function () {
          return a;
        },
        W: function () {
          return n;
        },
      });
      var n,
        i = r(49117),
        o = r(17010),
        s = r(81885);
      n || (n = {});
      var a = (function () {
        function t(t, e, r) {
          (this.kind = t),
            (this.value = e),
            (this.error = r),
            (this.hasValue = "N" === t);
        }
        return (
          (t.prototype.observe = function (t) {
            switch (this.kind) {
              case "N":
                return t.next && t.next(this.value);
              case "E":
                return t.error && t.error(this.error);
              case "C":
                return t.complete && t.complete();
            }
          }),
          (t.prototype.do = function (t, e, r) {
            switch (this.kind) {
              case "N":
                return t && t(this.value);
              case "E":
                return e && e(this.error);
              case "C":
                return r && r();
            }
          }),
          (t.prototype.accept = function (t, e, r) {
            return t && "function" == typeof t.next
              ? this.observe(t)
              : this.do(t, e, r);
          }),
          (t.prototype.toObservable = function () {
            switch (this.kind) {
              case "N":
                return (0, o.of)(this.value);
              case "E":
                return (0, s._)(this.error);
              case "C":
                return (0, i.c)();
            }
            throw Error("unexpected notification kind value");
          }),
          (t.createNext = function (e) {
            return void 0 !== e ? new t("N", e) : t.undefinedValueNotification;
          }),
          (t.createError = function (e) {
            return new t("E", void 0, e);
          }),
          (t.createComplete = function () {
            return t.completeNotification;
          }),
          (t.completeNotification = new t("C")),
          (t.undefinedValueNotification = new t("N", void 0)),
          t
        );
      })();
    },
    83912: function (t, e, r) {
      "use strict";
      r.d(e, {
        y: function () {
          return l;
        },
      });
      var n = r(36659),
        i = r(90960),
        o = r(25095),
        s = r(64054),
        a = r(33917),
        u = r(26883),
        c = r(70538),
        l = (function () {
          function t(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          return (
            (t.prototype.lift = function (e) {
              var r = new t();
              return (r.source = this), (r.operator = e), r;
            }),
            (t.prototype.subscribe = function (t, e, r) {
              var n = this.operator,
                a = (function (t, e, r) {
                  if (t) {
                    if (t instanceof i.L) return t;
                    if (t[o.b]) return t[o.b]();
                  }
                  return t || e || r ? new i.L(t, e, r) : new i.L(s.c);
                })(t, e, r);
              if (
                (n
                  ? a.add(n.call(a, this.source))
                  : a.add(
                      this.source ||
                        (c.v.useDeprecatedSynchronousErrorHandling &&
                          !a.syncErrorThrowable)
                        ? this._subscribe(a)
                        : this._trySubscribe(a)
                    ),
                c.v.useDeprecatedSynchronousErrorHandling &&
                  a.syncErrorThrowable &&
                  ((a.syncErrorThrowable = !1), a.syncErrorThrown))
              )
                throw a.syncErrorValue;
              return a;
            }),
            (t.prototype._trySubscribe = function (t) {
              try {
                return this._subscribe(t);
              } catch (e) {
                c.v.useDeprecatedSynchronousErrorHandling &&
                  ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                  (0, n._)(t) ? t.error(e) : console.warn(e);
              }
            }),
            (t.prototype.forEach = function (t, e) {
              var r = this;
              return new (e = h(e))(function (e, n) {
                var i;
                i = r.subscribe(
                  function (e) {
                    try {
                      t(e);
                    } catch (t) {
                      n(t), i && i.unsubscribe();
                    }
                  },
                  n,
                  e
                );
              });
            }),
            (t.prototype._subscribe = function (t) {
              var e = this.source;
              return e && e.subscribe(t);
            }),
            (t.prototype[a.L] = function () {
              return this;
            }),
            (t.prototype.pipe = function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              return 0 === t.length ? this : (0, u.U)(t)(this);
            }),
            (t.prototype.toPromise = function (t) {
              var e = this;
              return new (t = h(t))(function (t, r) {
                var n;
                e.subscribe(
                  function (t) {
                    return (n = t);
                  },
                  function (t) {
                    return r(t);
                  },
                  function () {
                    return t(n);
                  }
                );
              });
            }),
            (t.create = function (e) {
              return new t(e);
            }),
            t
          );
        })();
      function h(t) {
        if ((t || (t = c.v.Promise || Promise), !t))
          throw Error("no Promise impl found");
        return t;
      }
    },
    64054: function (t, e, r) {
      "use strict";
      r.d(e, {
        c: function () {
          return o;
        },
      });
      var n = r(70538),
        i = r(91195),
        o = {
          closed: !0,
          next: function (t) {},
          error: function (t) {
            if (n.v.useDeprecatedSynchronousErrorHandling) throw t;
            (0, i.z)(t);
          },
          complete: function () {},
        };
    },
    42031: function (t, e, r) {
      "use strict";
      r.d(e, {
        L: function () {
          return i;
        },
      });
      var n = r(55313),
        i = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function (t, e, r, n, i) {
              this.destination.next(e);
            }),
            (e.prototype.notifyError = function (t, e) {
              this.destination.error(t);
            }),
            (e.prototype.notifyComplete = function (t) {
              this.destination.complete();
            }),
            e
          );
        })(r(90960).L);
    },
    80436: function (t, e, r) {
      "use strict";
      r.d(e, {
        t: function () {
          return l;
        },
      });
      var n = r(55313),
        i = r(53037),
        o = r(86513),
        s = r(5587),
        a = r(11373),
        u = r(92962),
        c = r(66897),
        l = (function (t) {
          function e(e, r, n) {
            void 0 === e && (e = Number.POSITIVE_INFINITY),
              void 0 === r && (r = Number.POSITIVE_INFINITY);
            var i = t.call(this) || this;
            return (
              (i.scheduler = n),
              (i._events = []),
              (i._infiniteTimeWindow = !1),
              (i._bufferSize = e < 1 ? 1 : e),
              (i._windowTime = r < 1 ? 1 : r),
              r === Number.POSITIVE_INFINITY
                ? ((i._infiniteTimeWindow = !0),
                  (i.next = i.nextInfiniteTimeWindow))
                : (i.next = i.nextTimeWindow),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.nextInfiniteTimeWindow = function (e) {
              if (!this.isStopped) {
                var r = this._events;
                r.push(e), r.length > this._bufferSize && r.shift();
              }
              t.prototype.next.call(this, e);
            }),
            (e.prototype.nextTimeWindow = function (e) {
              this.isStopped ||
                (this._events.push(new h(this._getNow(), e)),
                this._trimBufferThenGetEvents()),
                t.prototype.next.call(this, e);
            }),
            (e.prototype._subscribe = function (t) {
              var e,
                r = this._infiniteTimeWindow,
                n = r ? this._events : this._trimBufferThenGetEvents(),
                i = this.scheduler,
                o = n.length;
              if (this.closed) throw new u.N();
              if (
                (this.isStopped || this.hasError
                  ? (e = s.w.EMPTY)
                  : (this.observers.push(t), (e = new c.W(this, t))),
                i && t.add((t = new a.ht(t, i))),
                r)
              )
                for (var l = 0; l < o && !t.closed; l++) t.next(n[l]);
              else for (var l = 0; l < o && !t.closed; l++) t.next(n[l].value);
              return (
                this.hasError
                  ? t.error(this.thrownError)
                  : this.isStopped && t.complete(),
                e
              );
            }),
            (e.prototype._getNow = function () {
              return (this.scheduler || o.c).now();
            }),
            (e.prototype._trimBufferThenGetEvents = function () {
              for (
                var t = this._getNow(),
                  e = this._bufferSize,
                  r = this._windowTime,
                  n = this._events,
                  i = n.length,
                  o = 0;
                o < i && !(t - n[o].time < r);

              )
                o++;
              return (
                i > e && (o = Math.max(o, i - e)), o > 0 && n.splice(0, o), n
              );
            }),
            e
          );
        })(i.xQ),
        h = function (t, e) {
          (this.time = t), (this.value = e);
        };
    },
    96145: function (t, e, r) {
      "use strict";
      r.d(e, {
        b: function () {
          return n;
        },
      });
      var n = (function () {
        function t(e, r) {
          void 0 === r && (r = t.now),
            (this.SchedulerAction = e),
            (this.now = r);
        }
        return (
          (t.prototype.schedule = function (t, e, r) {
            return (
              void 0 === e && (e = 0),
              new this.SchedulerAction(this, t).schedule(r, e)
            );
          }),
          (t.now = function () {
            return Date.now();
          }),
          t
        );
      })();
    },
    53037: function (t, e, r) {
      "use strict";
      r.d(e, {
        Yc: function () {
          return l;
        },
        xQ: function () {
          return h;
        },
      });
      var n = r(55313),
        i = r(83912),
        o = r(90960),
        s = r(5587),
        a = r(92962),
        u = r(66897),
        c = r(25095),
        l = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (r.destination = e), r;
          }
          return n.ZT(e, t), e;
        })(o.L),
        h = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.observers = []),
              (e.closed = !1),
              (e.isStopped = !1),
              (e.hasError = !1),
              (e.thrownError = null),
              e
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype[c.b] = function () {
              return new l(this);
            }),
            (e.prototype.lift = function (t) {
              var e = new d(this, this);
              return (e.operator = t), e;
            }),
            (e.prototype.next = function (t) {
              if (this.closed) throw new a.N();
              if (!this.isStopped)
                for (
                  var e = this.observers, r = e.length, n = e.slice(), i = 0;
                  i < r;
                  i++
                )
                  n[i].next(t);
            }),
            (e.prototype.error = function (t) {
              if (this.closed) throw new a.N();
              (this.hasError = !0),
                (this.thrownError = t),
                (this.isStopped = !0);
              for (
                var e = this.observers, r = e.length, n = e.slice(), i = 0;
                i < r;
                i++
              )
                n[i].error(t);
              this.observers.length = 0;
            }),
            (e.prototype.complete = function () {
              if (this.closed) throw new a.N();
              this.isStopped = !0;
              for (
                var t = this.observers, e = t.length, r = t.slice(), n = 0;
                n < e;
                n++
              )
                r[n].complete();
              this.observers.length = 0;
            }),
            (e.prototype.unsubscribe = function () {
              (this.isStopped = !0),
                (this.closed = !0),
                (this.observers = null);
            }),
            (e.prototype._trySubscribe = function (e) {
              if (!this.closed) return t.prototype._trySubscribe.call(this, e);
              throw new a.N();
            }),
            (e.prototype._subscribe = function (t) {
              if (this.closed) throw new a.N();
              return this.hasError
                ? (t.error(this.thrownError), s.w.EMPTY)
                : this.isStopped
                ? (t.complete(), s.w.EMPTY)
                : (this.observers.push(t), new u.W(this, t));
            }),
            (e.prototype.asObservable = function () {
              var t = new i.y();
              return (t.source = this), t;
            }),
            (e.create = function (t, e) {
              return new d(t, e);
            }),
            e
          );
        })(i.y),
        d = (function (t) {
          function e(e, r) {
            var n = t.call(this) || this;
            return (n.destination = e), (n.source = r), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype.next = function (t) {
              var e = this.destination;
              e && e.next && e.next(t);
            }),
            (e.prototype.error = function (t) {
              var e = this.destination;
              e && e.error && this.destination.error(t);
            }),
            (e.prototype.complete = function () {
              var t = this.destination;
              t && t.complete && this.destination.complete();
            }),
            (e.prototype._subscribe = function (t) {
              return this.source ? this.source.subscribe(t) : s.w.EMPTY;
            }),
            e
          );
        })(h);
    },
    66897: function (t, e, r) {
      "use strict";
      r.d(e, {
        W: function () {
          return i;
        },
      });
      var n = r(55313),
        i = (function (t) {
          function e(e, r) {
            var n = t.call(this) || this;
            return (n.subject = e), (n.subscriber = r), (n.closed = !1), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype.unsubscribe = function () {
              if (!this.closed) {
                this.closed = !0;
                var t = this.subject,
                  e = t.observers;
                if (
                  ((this.subject = null),
                  e && 0 !== e.length && !t.isStopped && !t.closed)
                ) {
                  var r = e.indexOf(this.subscriber);
                  -1 !== r && e.splice(r, 1);
                }
              }
            }),
            e
          );
        })(r(5587).w);
    },
    90960: function (t, e, r) {
      "use strict";
      r.d(e, {
        L: function () {
          return l;
        },
      });
      var n = r(55313),
        i = r(23991),
        o = r(64054),
        s = r(5587),
        a = r(25095),
        u = r(70538),
        c = r(91195),
        l = (function (t) {
          function e(r, n, i) {
            var s = t.call(this) || this;
            switch (
              ((s.syncErrorValue = null),
              (s.syncErrorThrown = !1),
              (s.syncErrorThrowable = !1),
              (s.isStopped = !1),
              arguments.length)
            ) {
              case 0:
                s.destination = o.c;
                break;
              case 1:
                if (!r) {
                  s.destination = o.c;
                  break;
                }
                if ("object" == typeof r) {
                  r instanceof e
                    ? ((s.syncErrorThrowable = r.syncErrorThrowable),
                      (s.destination = r),
                      r.add(s))
                    : ((s.syncErrorThrowable = !0),
                      (s.destination = new h(s, r)));
                  break;
                }
              default:
                (s.syncErrorThrowable = !0),
                  (s.destination = new h(s, r, n, i));
            }
            return s;
          }
          return (
            n.ZT(e, t),
            (e.prototype[a.b] = function () {
              return this;
            }),
            (e.create = function (t, r, n) {
              var i = new e(t, r, n);
              return (i.syncErrorThrowable = !1), i;
            }),
            (e.prototype.next = function (t) {
              this.isStopped || this._next(t);
            }),
            (e.prototype.error = function (t) {
              this.isStopped || ((this.isStopped = !0), this._error(t));
            }),
            (e.prototype.complete = function () {
              this.isStopped || ((this.isStopped = !0), this._complete());
            }),
            (e.prototype.unsubscribe = function () {
              this.closed ||
                ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
            }),
            (e.prototype._next = function (t) {
              this.destination.next(t);
            }),
            (e.prototype._error = function (t) {
              this.destination.error(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.destination.complete(), this.unsubscribe();
            }),
            (e.prototype._unsubscribeAndRecycle = function () {
              var t = this._parentOrParents;
              return (
                (this._parentOrParents = null),
                this.unsubscribe(),
                (this.closed = !1),
                (this.isStopped = !1),
                (this._parentOrParents = t),
                this
              );
            }),
            e
          );
        })(s.w),
        h = (function (t) {
          function e(e, r, n, s) {
            var a,
              u = t.call(this) || this;
            u._parentSubscriber = e;
            var c = u;
            return (
              (0, i.m)(r)
                ? (a = r)
                : r &&
                  ((a = r.next),
                  (n = r.error),
                  (s = r.complete),
                  r !== o.c &&
                    ((c = Object.create(r)),
                    (0, i.m)(c.unsubscribe) && u.add(c.unsubscribe.bind(c)),
                    (c.unsubscribe = u.unsubscribe.bind(u)))),
              (u._context = c),
              (u._next = a),
              (u._error = n),
              (u._complete = s),
              u
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.next = function (t) {
              if (!this.isStopped && this._next) {
                var e = this._parentSubscriber;
                u.v.useDeprecatedSynchronousErrorHandling &&
                e.syncErrorThrowable
                  ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
                  : this.__tryOrUnsub(this._next, t);
              }
            }),
            (e.prototype.error = function (t) {
              if (!this.isStopped) {
                var e = this._parentSubscriber,
                  r = u.v.useDeprecatedSynchronousErrorHandling;
                if (this._error)
                  r && e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, this._error, t),
                      this.unsubscribe())
                    : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                else if (e.syncErrorThrowable)
                  r
                    ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0))
                    : (0, c.z)(t),
                    this.unsubscribe();
                else {
                  if ((this.unsubscribe(), r)) throw t;
                  (0, c.z)(t);
                }
              }
            }),
            (e.prototype.complete = function () {
              var t = this;
              if (!this.isStopped) {
                var e = this._parentSubscriber;
                if (this._complete) {
                  var r = function () {
                    return t._complete.call(t._context);
                  };
                  u.v.useDeprecatedSynchronousErrorHandling &&
                  e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, r), this.unsubscribe())
                    : (this.__tryOrUnsub(r), this.unsubscribe());
                } else this.unsubscribe();
              }
            }),
            (e.prototype.__tryOrUnsub = function (t, e) {
              try {
                t.call(this._context, e);
              } catch (t) {
                if (
                  (this.unsubscribe(),
                  u.v.useDeprecatedSynchronousErrorHandling)
                )
                  throw t;
                (0, c.z)(t);
              }
            }),
            (e.prototype.__tryOrSetError = function (t, e, r) {
              if (!u.v.useDeprecatedSynchronousErrorHandling)
                throw Error("bad call");
              try {
                e.call(this._context, r);
              } catch (e) {
                if (u.v.useDeprecatedSynchronousErrorHandling)
                  return (t.syncErrorValue = e), (t.syncErrorThrown = !0), !0;
                return (0, c.z)(e), !0;
              }
              return !1;
            }),
            (e.prototype._unsubscribe = function () {
              var t = this._parentSubscriber;
              (this._context = null),
                (this._parentSubscriber = null),
                t.unsubscribe();
            }),
            e
          );
        })(l);
    },
    5587: function (t, e, r) {
      "use strict";
      r.d(e, {
        w: function () {
          return a;
        },
      });
      var n = r(18354),
        i = r(58011),
        o = r(23991),
        s = r(48642),
        a = (function () {
          var t;
          function e(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          return (
            (e.prototype.unsubscribe = function () {
              if (!this.closed) {
                var t,
                  r = this._parentOrParents,
                  a = this._ctorUnsubscribe,
                  c = this._unsubscribe,
                  l = this._subscriptions;
                if (
                  ((this.closed = !0),
                  (this._parentOrParents = null),
                  (this._subscriptions = null),
                  r instanceof e)
                )
                  r.remove(this);
                else if (null !== r)
                  for (var h = 0; h < r.length; ++h) r[h].remove(this);
                if ((0, o.m)(c)) {
                  a && (this._unsubscribe = void 0);
                  try {
                    c.call(this);
                  } catch (e) {
                    t = e instanceof s.B ? u(e.errors) : [e];
                  }
                }
                if ((0, n.k)(l))
                  for (var h = -1, d = l.length; ++h < d; ) {
                    var f = l[h];
                    if ((0, i.K)(f))
                      try {
                        f.unsubscribe();
                      } catch (e) {
                        (t = t || []),
                          e instanceof s.B
                            ? (t = t.concat(u(e.errors)))
                            : t.push(e);
                      }
                  }
                if (t) throw new s.B(t);
              }
            }),
            (e.prototype.add = function (t) {
              var r = t;
              if (!t) return e.EMPTY;
              switch (typeof t) {
                case "function":
                  r = new e(t);
                case "object":
                  if (
                    r === this ||
                    r.closed ||
                    "function" != typeof r.unsubscribe
                  )
                    return r;
                  if (this.closed) return r.unsubscribe(), r;
                  if (!(r instanceof e)) {
                    var n = r;
                    (r = new e())._subscriptions = [n];
                  }
                  break;
                default:
                  throw Error(
                    "unrecognized teardown " + t + " added to Subscription."
                  );
              }
              var i = r._parentOrParents;
              if (null === i) r._parentOrParents = this;
              else if (i instanceof e) {
                if (i === this) return r;
                r._parentOrParents = [i, this];
              } else {
                if (-1 !== i.indexOf(this)) return r;
                i.push(this);
              }
              var o = this._subscriptions;
              return null === o ? (this._subscriptions = [r]) : o.push(r), r;
            }),
            (e.prototype.remove = function (t) {
              var e = this._subscriptions;
              if (e) {
                var r = e.indexOf(t);
                -1 !== r && e.splice(r, 1);
              }
            }),
            (e.EMPTY = (((t = new e()).closed = !0), t)),
            e
          );
        })();
      function u(t) {
        return t.reduce(function (t, e) {
          return t.concat(e instanceof s.B ? e.errors : e);
        }, []);
      }
    },
    70538: function (t, e, r) {
      "use strict";
      r.d(e, {
        v: function () {
          return i;
        },
      });
      var n = !1,
        i = {
          Promise: void 0,
          set useDeprecatedSynchronousErrorHandling(value) {
            value && Error().stack, (n = value);
          },
          get useDeprecatedSynchronousErrorHandling() {
            return n;
          },
        };
    },
    75994: function (t, e, r) {
      "use strict";
      r.d(e, {
        Ds: function () {
          return u;
        },
        IY: function () {
          return a;
        },
        ft: function () {
          return c;
        },
      });
      var n = r(55313),
        i = r(90960),
        o = r(83912),
        s = r(55665),
        a = (function (t) {
          function e(e) {
            var r = t.call(this) || this;
            return (r.parent = e), r;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.parent.notifyNext(t);
            }),
            (e.prototype._error = function (t) {
              this.parent.notifyError(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.parent.notifyComplete(), this.unsubscribe();
            }),
            e
          );
        })(i.L),
        u = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function (t) {
              this.destination.next(t);
            }),
            (e.prototype.notifyError = function (t) {
              this.destination.error(t);
            }),
            (e.prototype.notifyComplete = function () {
              this.destination.complete();
            }),
            e
          );
        })(i.L);
      function c(t, e) {
        var r;
        if (!e.closed) {
          if (t instanceof o.y) return t.subscribe(e);
          try {
            r = (0, s.s)(t)(e);
          } catch (t) {
            e.error(t);
          }
          return r;
        }
      }
    },
    75623: function (t, e, r) {
      "use strict";
      r.d(e, {
        N: function () {
          return l;
        },
        c: function () {
          return c;
        },
      });
      var n,
        i = r(55313),
        o = r(53037),
        s = r(83912),
        a = r(5587),
        u = r(46287),
        c = (function (t) {
          function e(e, r) {
            var n = t.call(this) || this;
            return (
              (n.source = e),
              (n.subjectFactory = r),
              (n._refCount = 0),
              (n._isComplete = !1),
              n
            );
          }
          return (
            i.ZT(e, t),
            (e.prototype._subscribe = function (t) {
              return this.getSubject().subscribe(t);
            }),
            (e.prototype.getSubject = function () {
              var t = this._subject;
              return (
                (!t || t.isStopped) && (this._subject = this.subjectFactory()),
                this._subject
              );
            }),
            (e.prototype.connect = function () {
              var t = this._connection;
              return (
                !t &&
                  ((this._isComplete = !1),
                  (t = this._connection = new a.w()).add(
                    this.source.subscribe(new h(this.getSubject(), this))
                  ),
                  t.closed && ((this._connection = null), (t = a.w.EMPTY))),
                t
              );
            }),
            (e.prototype.refCount = function () {
              return (0, u.x)()(this);
            }),
            e
          );
        })(s.y),
        l = {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: (n = c.prototype)._subscribe },
          _isComplete: { value: n._isComplete, writable: !0 },
          getSubject: { value: n.getSubject },
          connect: { value: n.connect },
          refCount: { value: n.refCount },
        },
        h = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.connectable = r), n;
          }
          return (
            i.ZT(e, t),
            (e.prototype._error = function (e) {
              this._unsubscribe(), t.prototype._error.call(this, e);
            }),
            (e.prototype._complete = function () {
              (this.connectable._isComplete = !0),
                this._unsubscribe(),
                t.prototype._complete.call(this);
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.connectable;
              if (t) {
                this.connectable = null;
                var e = t._connection;
                (t._refCount = 0),
                  (t._subject = null),
                  (t._connection = null),
                  e && e.unsubscribe();
              }
            }),
            e
          );
        })(o.Yc);
    },
    46864: function (t, e, r) {
      "use strict";
      r.d(e, {
        Ms: function () {
          return h;
        },
        aj: function () {
          return l;
        },
      });
      var n = r(55313),
        i = r(6306),
        o = r(18354),
        s = r(42031),
        a = r(14789),
        u = r(95319),
        c = {};
      function l() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = void 0,
          n = void 0;
        return (
          (0, i.K)(t[t.length - 1]) && (n = t.pop()),
          "function" == typeof t[t.length - 1] && (r = t.pop()),
          1 === t.length && (0, o.k)(t[0]) && (t = t[0]),
          (0, u.n)(t, n).lift(new h(r))
        );
      }
      var h = (function () {
          function t(t) {
            this.resultSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new d(t, this.resultSelector));
            }),
            t
          );
        })(),
        d = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (
              (n.resultSelector = r),
              (n.active = 0),
              (n.values = []),
              (n.observables = []),
              n
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.values.push(c), this.observables.push(t);
            }),
            (e.prototype._complete = function () {
              var t = this.observables,
                e = t.length;
              if (0 === e) this.destination.complete();
              else {
                (this.active = e), (this.toRespond = e);
                for (var r = 0; r < e; r++) {
                  var n = t[r];
                  this.add((0, a.D)(this, n, void 0, r));
                }
              }
            }),
            (e.prototype.notifyComplete = function (t) {
              0 == (this.active -= 1) && this.destination.complete();
            }),
            (e.prototype.notifyNext = function (t, e, r) {
              var n = this.values,
                i = n[r],
                o = this.toRespond
                  ? i === c
                    ? --this.toRespond
                    : this.toRespond
                  : 0;
              (n[r] = e),
                0 === o &&
                  (this.resultSelector
                    ? this._tryResultSelector(n)
                    : this.destination.next(n.slice()));
            }),
            (e.prototype._tryResultSelector = function (t) {
              var e;
              try {
                e = this.resultSelector.apply(this, t);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              this.destination.next(e);
            }),
            e
          );
        })(s.L);
    },
    50961: function (t, e, r) {
      "use strict";
      r.d(e, {
        z: function () {
          return o;
        },
      });
      var n = r(17010),
        i = r(82953);
      function o() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return (0, i.u)()(n.of.apply(void 0, t));
      }
    },
    59052: function (t, e, r) {
      "use strict";
      r.d(e, {
        P: function () {
          return s;
        },
      });
      var n = r(83912),
        i = r(53279),
        o = r(49117);
      function s(t) {
        return new n.y(function (e) {
          var r;
          try {
            r = t();
          } catch (t) {
            e.error(t);
            return;
          }
          return (r ? (0, i.D)(r) : (0, o.c)()).subscribe(e);
        });
      }
    },
    49117: function (t, e, r) {
      "use strict";
      r.d(e, {
        E: function () {
          return i;
        },
        c: function () {
          return o;
        },
      });
      var n = r(83912),
        i = new n.y(function (t) {
          return t.complete();
        });
      function o(t) {
        return t
          ? new n.y(function (e) {
              return t.schedule(function () {
                return e.complete();
              });
            })
          : i;
      }
    },
    53279: function (t, e, r) {
      "use strict";
      r.d(e, {
        D: function () {
          return s;
        },
      });
      var n = r(83912),
        i = r(55665),
        o = r(89967);
      function s(t, e) {
        return e ? (0, o.x)(t, e) : t instanceof n.y ? t : new n.y((0, i.s)(t));
      }
    },
    95319: function (t, e, r) {
      "use strict";
      r.d(e, {
        n: function () {
          return s;
        },
      });
      var n = r(83912),
        i = r(60958),
        o = r(92272);
      function s(t, e) {
        return e ? (0, o.r)(t, e) : new n.y((0, i.V)(t));
      }
    },
    28051: function (t, e, r) {
      "use strict";
      r.d(e, {
        T: function () {
          return a;
        },
      });
      var n = r(83912),
        i = r(6306),
        o = r(15587),
        s = r(95319);
      function a() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = Number.POSITIVE_INFINITY,
          a = null,
          u = t[t.length - 1];
        return ((0, i.K)(u)
          ? ((a = t.pop()),
            t.length > 1 && "number" == typeof t[t.length - 1] && (r = t.pop()))
          : "number" == typeof u && (r = t.pop()),
        null === a && 1 === t.length && t[0] instanceof n.y)
          ? t[0]
          : (0, o.J)(r)((0, s.n)(t, a));
      }
    },
    17010: function (t, e, r) {
      "use strict";
      r.d(e, {
        of: function () {
          return s;
        },
      });
      var n = r(6306),
        i = r(95319),
        o = r(92272);
      function s() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = t[t.length - 1];
        return (0, n.K)(r) ? (t.pop(), (0, o.r)(t, r)) : (0, i.n)(t);
      }
    },
    51340: function (t, e, r) {
      "use strict";
      r.d(e, {
        S3: function () {
          return u;
        },
      });
      var n = r(55313),
        i = r(18354),
        o = r(95319),
        s = r(42031),
        a = r(14789);
      function u() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        if (1 === t.length) {
          if (!(0, i.k)(t[0])) return t[0];
          t = t[0];
        }
        return (0, o.n)(t, void 0).lift(new c());
      }
      var c = (function () {
          function t() {}
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new l(t));
            }),
            t
          );
        })(),
        l = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.hasFirst = !1), (r.observables = []), (r.subscriptions = []), r
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.observables.push(t);
            }),
            (e.prototype._complete = function () {
              var t = this.observables,
                e = t.length;
              if (0 === e) this.destination.complete();
              else {
                for (var r = 0; r < e && !this.hasFirst; r++) {
                  var n = t[r],
                    i = (0, a.D)(this, n, void 0, r);
                  this.subscriptions && this.subscriptions.push(i), this.add(i);
                }
                this.observables = null;
              }
            }),
            (e.prototype.notifyNext = function (t, e, r) {
              if (!this.hasFirst) {
                this.hasFirst = !0;
                for (var n = 0; n < this.subscriptions.length; n++)
                  if (n !== r) {
                    var i = this.subscriptions[n];
                    i.unsubscribe(), this.remove(i);
                  }
                this.subscriptions = null;
              }
              this.destination.next(e);
            }),
            e
          );
        })(s.L);
    },
    81885: function (t, e, r) {
      "use strict";
      r.d(e, {
        _: function () {
          return i;
        },
      });
      var n = r(83912);
      function i(t, e) {
        return new n.y(
          e
            ? function (r) {
                return e.schedule(o, 0, { error: t, subscriber: r });
              }
            : function (e) {
                return e.error(t);
              }
        );
      }
      function o(t) {
        var e = t.error;
        t.subscriber.error(e);
      }
    },
    19126: function (t, e, r) {
      "use strict";
      r.d(e, {
        H: function () {
          return a;
        },
      });
      var n = r(83912),
        i = r(71055),
        o = r(64090),
        s = r(6306);
      function a(t, e, r) {
        void 0 === t && (t = 0);
        var a = -1;
        return (
          (0, o.k)(e)
            ? (a = (1 > Number(e) && 1) || Number(e))
            : (0, s.K)(e) && (r = e),
          (0, s.K)(r) || (r = i.P),
          new n.y(function (e) {
            var n = (0, o.k)(t) ? t : +t - r.now();
            return r.schedule(u, n, { index: 0, period: a, subscriber: e });
          })
        );
      }
      function u(t) {
        var e = t.index,
          r = t.period,
          n = t.subscriber;
        if ((n.next(e), !n.closed)) {
          if (-1 === r) return n.complete();
          (t.index = e + 1), this.schedule(t, r);
        }
      }
    },
    35071: function (t, e, r) {
      "use strict";
      r.d(e, {
        $R: function () {
          return c;
        },
        mx: function () {
          return l;
        },
      });
      var n = r(55313),
        i = r(95319),
        o = r(18354),
        s = r(90960),
        a = r(72963),
        u = r(75994);
      function c() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = t[t.length - 1];
        return (
          "function" == typeof r && t.pop(), (0, i.n)(t, void 0).lift(new l(r))
        );
      }
      var l = (function () {
          function t(t) {
            this.resultSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new h(t, this.resultSelector));
            }),
            t
          );
        })(),
        h = (function (t) {
          function e(e, r, n) {
            void 0 === n && (n = Object.create(null));
            var i = t.call(this, e) || this;
            return (
              (i.resultSelector = r),
              (i.iterators = []),
              (i.active = 0),
              (i.resultSelector = "function" == typeof r ? r : void 0),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e = this.iterators;
              (0, o.k)(t)
                ? e.push(new f(t))
                : "function" == typeof t[a.hZ]
                ? e.push(new d(t[a.hZ]()))
                : e.push(new p(this.destination, this, t));
            }),
            (e.prototype._complete = function () {
              var t = this.iterators,
                e = t.length;
              if ((this.unsubscribe(), 0 === e)) {
                this.destination.complete();
                return;
              }
              this.active = e;
              for (var r = 0; r < e; r++) {
                var n = t[r];
                n.stillUnsubscribed
                  ? this.destination.add(n.subscribe())
                  : this.active--;
              }
            }),
            (e.prototype.notifyInactive = function () {
              this.active--, 0 === this.active && this.destination.complete();
            }),
            (e.prototype.checkIterators = function () {
              for (
                var t = this.iterators,
                  e = t.length,
                  r = this.destination,
                  n = 0;
                n < e;
                n++
              ) {
                var i = t[n];
                if ("function" == typeof i.hasValue && !i.hasValue()) return;
              }
              for (var o = !1, s = [], n = 0; n < e; n++) {
                var i = t[n],
                  a = i.next();
                if ((i.hasCompleted() && (o = !0), a.done)) {
                  r.complete();
                  return;
                }
                s.push(a.value);
              }
              this.resultSelector ? this._tryresultSelector(s) : r.next(s),
                o && r.complete();
            }),
            (e.prototype._tryresultSelector = function (t) {
              var e;
              try {
                e = this.resultSelector.apply(this, t);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              this.destination.next(e);
            }),
            e
          );
        })(s.L),
        d = (function () {
          function t(t) {
            (this.iterator = t), (this.nextResult = t.next());
          }
          return (
            (t.prototype.hasValue = function () {
              return !0;
            }),
            (t.prototype.next = function () {
              var t = this.nextResult;
              return (this.nextResult = this.iterator.next()), t;
            }),
            (t.prototype.hasCompleted = function () {
              var t = this.nextResult;
              return !!(t && t.done);
            }),
            t
          );
        })(),
        f = (function () {
          function t(t) {
            (this.array = t),
              (this.index = 0),
              (this.length = 0),
              (this.length = t.length);
          }
          return (
            (t.prototype[a.hZ] = function () {
              return this;
            }),
            (t.prototype.next = function (t) {
              var e = this.index++,
                r = this.array;
              return e < this.length
                ? { value: r[e], done: !1 }
                : { value: null, done: !0 };
            }),
            (t.prototype.hasValue = function () {
              return this.array.length > this.index;
            }),
            (t.prototype.hasCompleted = function () {
              return this.array.length === this.index;
            }),
            t
          );
        })(),
        p = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.parent = r),
              (i.observable = n),
              (i.stillUnsubscribed = !0),
              (i.buffer = []),
              (i.isComplete = !1),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype[a.hZ] = function () {
              return this;
            }),
            (e.prototype.next = function () {
              var t = this.buffer;
              return 0 === t.length && this.isComplete
                ? { value: null, done: !0 }
                : { value: t.shift(), done: !1 };
            }),
            (e.prototype.hasValue = function () {
              return this.buffer.length > 0;
            }),
            (e.prototype.hasCompleted = function () {
              return 0 === this.buffer.length && this.isComplete;
            }),
            (e.prototype.notifyComplete = function () {
              this.buffer.length > 0
                ? ((this.isComplete = !0), this.parent.notifyInactive())
                : this.destination.complete();
            }),
            (e.prototype.notifyNext = function (t) {
              this.buffer.push(t), this.parent.checkIterators();
            }),
            (e.prototype.subscribe = function () {
              return (0, u.ft)(this.observable, new u.IY(this));
            }),
            e
          );
        })(u.Ds);
    },
    82953: function (t, e, r) {
      "use strict";
      r.d(e, {
        u: function () {
          return i;
        },
      });
      var n = r(15587);
      function i() {
        return (0, n.J)(1);
      }
    },
    70363: function (t, e, r) {
      "use strict";
      r.d(e, {
        h: function () {
          return o;
        },
      });
      var n = r(55313),
        i = r(90960);
      function o(t, e) {
        return function (r) {
          return r.lift(new s(t, e));
        };
      }
      var s = (function () {
          function t(t, e) {
            (this.predicate = t), (this.thisArg = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new a(t, this.predicate, this.thisArg));
            }),
            t
          );
        })(),
        a = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (i.predicate = r), (i.thisArg = n), (i.count = 0), i;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.predicate.call(this.thisArg, t, this.count++);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              e && this.destination.next(t);
            }),
            e
          );
        })(i.L);
    },
    53592: function (t, e, r) {
      "use strict";
      r.d(e, {
        T: function () {
          return d;
        },
        v: function () {
          return u;
        },
      });
      var n = r(55313),
        i = r(90960),
        o = r(5587),
        s = r(83912),
        a = r(53037);
      function u(t, e, r, n) {
        return function (i) {
          return i.lift(new c(t, e, r, n));
        };
      }
      var c = (function () {
          function t(t, e, r, n) {
            (this.keySelector = t),
              (this.elementSelector = e),
              (this.durationSelector = r),
              (this.subjectSelector = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new l(
                  t,
                  this.keySelector,
                  this.elementSelector,
                  this.durationSelector,
                  this.subjectSelector
                )
              );
            }),
            t
          );
        })(),
        l = (function (t) {
          function e(e, r, n, i, o) {
            var s = t.call(this, e) || this;
            return (
              (s.keySelector = r),
              (s.elementSelector = n),
              (s.durationSelector = i),
              (s.subjectSelector = o),
              (s.groups = null),
              (s.attemptedToUnsubscribe = !1),
              (s.count = 0),
              s
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.keySelector(t);
              } catch (t) {
                this.error(t);
                return;
              }
              this._group(t, e);
            }),
            (e.prototype._group = function (t, e) {
              var r,
                n = this.groups;
              n || (n = this.groups = new Map());
              var i = n.get(e);
              if (this.elementSelector)
                try {
                  r = this.elementSelector(t);
                } catch (t) {
                  this.error(t);
                }
              else r = t;
              if (!i) {
                (i = this.subjectSelector
                  ? this.subjectSelector()
                  : new a.xQ()),
                  n.set(e, i);
                var o = new d(e, i, this);
                if ((this.destination.next(o), this.durationSelector)) {
                  var s = void 0;
                  try {
                    s = this.durationSelector(new d(e, i));
                  } catch (t) {
                    this.error(t);
                    return;
                  }
                  this.add(s.subscribe(new h(e, i, this)));
                }
              }
              i.closed || i.next(r);
            }),
            (e.prototype._error = function (t) {
              var e = this.groups;
              e &&
                (e.forEach(function (e, r) {
                  e.error(t);
                }),
                e.clear()),
                this.destination.error(t);
            }),
            (e.prototype._complete = function () {
              var t = this.groups;
              t &&
                (t.forEach(function (t, e) {
                  t.complete();
                }),
                t.clear()),
                this.destination.complete();
            }),
            (e.prototype.removeGroup = function (t) {
              this.groups.delete(t);
            }),
            (e.prototype.unsubscribe = function () {
              this.closed ||
                ((this.attemptedToUnsubscribe = !0),
                0 === this.count && t.prototype.unsubscribe.call(this));
            }),
            e
          );
        })(i.L),
        h = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, r) || this;
            return (i.key = e), (i.group = r), (i.parent = n), i;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.complete();
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.parent,
                e = this.key;
              (this.key = this.parent = null), t && t.removeGroup(e);
            }),
            e
          );
        })(i.L),
        d = (function (t) {
          function e(e, r, n) {
            var i = t.call(this) || this;
            return (
              (i.key = e), (i.groupSubject = r), (i.refCountSubscription = n), i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._subscribe = function (t) {
              var e = new o.w(),
                r = this.refCountSubscription,
                n = this.groupSubject;
              return (
                r && !r.closed && e.add(new f(r)), e.add(n.subscribe(t)), e
              );
            }),
            e
          );
        })(s.y),
        f = (function (t) {
          function e(e) {
            var r = t.call(this) || this;
            return (r.parent = e), e.count++, r;
          }
          return (
            n.ZT(e, t),
            (e.prototype.unsubscribe = function () {
              var e = this.parent;
              e.closed ||
                this.closed ||
                (t.prototype.unsubscribe.call(this),
                (e.count -= 1),
                0 === e.count && e.attemptedToUnsubscribe && e.unsubscribe());
            }),
            e
          );
        })(o.w);
    },
    57054: function (t, e, r) {
      "use strict";
      r.d(e, {
        U: function () {
          return o;
        },
      });
      var n = r(55313),
        i = r(90960);
      function o(t, e) {
        return function (r) {
          if ("function" != typeof t)
            throw TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return r.lift(new s(t, e));
        };
      }
      var s = (function () {
          function t(t, e) {
            (this.project = t), (this.thisArg = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new a(t, this.project, this.thisArg));
            }),
            t
          );
        })(),
        a = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (i.project = r), (i.count = 0), (i.thisArg = n || i), i;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.project.call(this.thisArg, t, this.count++);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              this.destination.next(e);
            }),
            e
          );
        })(i.L);
    },
    15587: function (t, e, r) {
      "use strict";
      r.d(e, {
        J: function () {
          return o;
        },
      });
      var n = r(96136),
        i = r(33562);
      function o(t) {
        return (
          void 0 === t && (t = Number.POSITIVE_INFINITY), (0, n.zg)(i.y, t)
        );
      }
    },
    96136: function (t, e, r) {
      "use strict";
      r.d(e, {
        VS: function () {
          return l;
        },
        zg: function () {
          return a;
        },
      });
      var n = r(55313),
        i = r(57054),
        o = r(53279),
        s = r(75994);
      function a(t, e, r) {
        return (void 0 === r && (r = Number.POSITIVE_INFINITY),
        "function" == typeof e)
          ? function (n) {
              return n.pipe(
                a(function (r, n) {
                  return (0, o.D)(t(r, n)).pipe(
                    (0, i.U)(function (t, i) {
                      return e(r, t, n, i);
                    })
                  );
                }, r)
              );
            }
          : ("number" == typeof e && (r = e),
            function (e) {
              return e.lift(new u(t, r));
            });
      }
      var u = (function () {
          function t(t, e) {
            void 0 === e && (e = Number.POSITIVE_INFINITY),
              (this.project = t),
              (this.concurrent = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new c(t, this.project, this.concurrent));
            }),
            t
          );
        })(),
        c = (function (t) {
          function e(e, r, n) {
            void 0 === n && (n = Number.POSITIVE_INFINITY);
            var i = t.call(this, e) || this;
            return (
              (i.project = r),
              (i.concurrent = n),
              (i.hasCompleted = !1),
              (i.buffer = []),
              (i.active = 0),
              (i.index = 0),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.active < this.concurrent
                ? this._tryNext(t)
                : this.buffer.push(t);
            }),
            (e.prototype._tryNext = function (t) {
              var e,
                r = this.index++;
              try {
                e = this.project(t, r);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              this.active++, this._innerSub(e);
            }),
            (e.prototype._innerSub = function (t) {
              var e = new s.IY(this),
                r = this.destination;
              r.add(e);
              var n = (0, s.ft)(t, e);
              n !== e && r.add(n);
            }),
            (e.prototype._complete = function () {
              (this.hasCompleted = !0),
                0 === this.active &&
                  0 === this.buffer.length &&
                  this.destination.complete(),
                this.unsubscribe();
            }),
            (e.prototype.notifyNext = function (t) {
              this.destination.next(t);
            }),
            (e.prototype.notifyComplete = function () {
              var t = this.buffer;
              this.active--,
                t.length > 0
                  ? this._next(t.shift())
                  : 0 === this.active &&
                    this.hasCompleted &&
                    this.destination.complete();
            }),
            e
          );
        })(s.Ds),
        l = a;
    },
    11373: function (t, e, r) {
      "use strict";
      r.d(e, {
        QV: function () {
          return s;
        },
        ht: function () {
          return u;
        },
      });
      var n = r(55313),
        i = r(90960),
        o = r(72672);
      function s(t, e) {
        return (
          void 0 === e && (e = 0),
          function (r) {
            return r.lift(new a(t, e));
          }
        );
      }
      var a = (function () {
          function t(t, e) {
            void 0 === e && (e = 0), (this.scheduler = t), (this.delay = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new u(t, this.scheduler, this.delay));
            }),
            t
          );
        })(),
        u = (function (t) {
          function e(e, r, n) {
            void 0 === n && (n = 0);
            var i = t.call(this, e) || this;
            return (i.scheduler = r), (i.delay = n), i;
          }
          return (
            n.ZT(e, t),
            (e.dispatch = function (t) {
              var e = t.notification,
                r = t.destination;
              e.observe(r), this.unsubscribe();
            }),
            (e.prototype.scheduleMessage = function (t) {
              this.destination.add(
                this.scheduler.schedule(
                  e.dispatch,
                  this.delay,
                  new c(t, this.destination)
                )
              );
            }),
            (e.prototype._next = function (t) {
              this.scheduleMessage(o.P.createNext(t));
            }),
            (e.prototype._error = function (t) {
              this.scheduleMessage(o.P.createError(t)), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.scheduleMessage(o.P.createComplete()), this.unsubscribe();
            }),
            e
          );
        })(i.L),
        c = function (t, e) {
          (this.notification = t), (this.destination = e);
        };
    },
    46287: function (t, e, r) {
      "use strict";
      r.d(e, {
        x: function () {
          return o;
        },
      });
      var n = r(55313),
        i = r(90960);
      function o() {
        return function (t) {
          return t.lift(new s(t));
        };
      }
      var s = (function () {
          function t(t) {
            this.connectable = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              var r = this.connectable;
              r._refCount++;
              var n = new a(t, r),
                i = e.subscribe(n);
              return n.closed || (n.connection = r.connect()), i;
            }),
            t
          );
        })(),
        a = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.connectable = r), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._unsubscribe = function () {
              var t = this.connectable;
              if (!t) {
                this.connection = null;
                return;
              }
              this.connectable = null;
              var e = t._refCount;
              if (e <= 0 || ((t._refCount = e - 1), e > 1)) {
                this.connection = null;
                return;
              }
              var r = this.connection,
                n = t._connection;
              (this.connection = null), n && (!r || n === r) && n.unsubscribe();
            }),
            e
          );
        })(i.L);
    },
    92272: function (t, e, r) {
      "use strict";
      r.d(e, {
        r: function () {
          return o;
        },
      });
      var n = r(83912),
        i = r(5587);
      function o(t, e) {
        return new n.y(function (r) {
          var n = new i.w(),
            o = 0;
          return (
            n.add(
              e.schedule(function () {
                if (o === t.length) {
                  r.complete();
                  return;
                }
                r.next(t[o++]), r.closed || n.add(this.schedule());
              })
            ),
            n
          );
        });
      }
    },
    89967: function (t, e, r) {
      "use strict";
      r.d(e, {
        x: function () {
          return l;
        },
      });
      var n = r(83912),
        i = r(5587),
        o = r(33917),
        s = r(92272),
        a = r(72963),
        u = r(83484),
        c = r(38581);
      function l(t, e) {
        if (null != t) {
          if (t && "function" == typeof t[o.L])
            return new n.y(function (r) {
              var n = new i.w();
              return (
                n.add(
                  e.schedule(function () {
                    var i = t[o.L]();
                    n.add(
                      i.subscribe({
                        next: function (t) {
                          n.add(
                            e.schedule(function () {
                              return r.next(t);
                            })
                          );
                        },
                        error: function (t) {
                          n.add(
                            e.schedule(function () {
                              return r.error(t);
                            })
                          );
                        },
                        complete: function () {
                          n.add(
                            e.schedule(function () {
                              return r.complete();
                            })
                          );
                        },
                      })
                    );
                  })
                ),
                n
              );
            });
          if ((0, u.t)(t))
            return new n.y(function (r) {
              var n = new i.w();
              return (
                n.add(
                  e.schedule(function () {
                    return t.then(
                      function (t) {
                        n.add(
                          e.schedule(function () {
                            r.next(t),
                              n.add(
                                e.schedule(function () {
                                  return r.complete();
                                })
                              );
                          })
                        );
                      },
                      function (t) {
                        n.add(
                          e.schedule(function () {
                            return r.error(t);
                          })
                        );
                      }
                    );
                  })
                ),
                n
              );
            });
          if ((0, c.z)(t)) return (0, s.r)(t, e);
          if ((t && "function" == typeof t[a.hZ]) || "string" == typeof t)
            return (function (t, e) {
              if (!t) throw Error("Iterable cannot be null");
              return new n.y(function (r) {
                var n,
                  o = new i.w();
                return (
                  o.add(function () {
                    n && "function" == typeof n.return && n.return();
                  }),
                  o.add(
                    e.schedule(function () {
                      (n = t[a.hZ]()),
                        o.add(
                          e.schedule(function () {
                            if (!r.closed) {
                              try {
                                var t,
                                  e,
                                  i = n.next();
                                (t = i.value), (e = i.done);
                              } catch (t) {
                                r.error(t);
                                return;
                              }
                              e ? r.complete() : (r.next(t), this.schedule());
                            }
                          })
                        );
                    })
                  ),
                  o
                );
              });
            })(t, e);
        }
        throw TypeError(((null !== t && typeof t) || t) + " is not observable");
      }
    },
    26368: function (t, e, r) {
      "use strict";
      r.d(e, {
        o: function () {
          return i;
        },
      });
      var n = r(55313),
        i = (function (t) {
          function e(e, r) {
            var n = t.call(this, e, r) || this;
            return (n.scheduler = e), (n.work = r), (n.pending = !1), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype.schedule = function (t, e) {
              if ((void 0 === e && (e = 0), this.closed)) return this;
              this.state = t;
              var r = this.id,
                n = this.scheduler;
              return (
                null != r && (this.id = this.recycleAsyncId(n, r, e)),
                (this.pending = !0),
                (this.delay = e),
                (this.id = this.id || this.requestAsyncId(n, this.id, e)),
                this
              );
            }),
            (e.prototype.requestAsyncId = function (t, e, r) {
              return (
                void 0 === r && (r = 0), setInterval(t.flush.bind(t, this), r)
              );
            }),
            (e.prototype.recycleAsyncId = function (t, e, r) {
              if (
                (void 0 === r && (r = 0),
                null !== r && this.delay === r && !1 === this.pending)
              )
                return e;
              clearInterval(e);
            }),
            (e.prototype.execute = function (t, e) {
              if (this.closed) return Error("executing a cancelled action");
              this.pending = !1;
              var r = this._execute(t, e);
              if (r) return r;
              !1 === this.pending &&
                null != this.id &&
                (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }),
            (e.prototype._execute = function (t, e) {
              var r = !1,
                n = void 0;
              try {
                this.work(t);
              } catch (t) {
                (r = !0), (n = (!!t && t) || Error(t));
              }
              if (r) return this.unsubscribe(), n;
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.id,
                e = this.scheduler,
                r = e.actions,
                n = r.indexOf(this);
              (this.work = null),
                (this.state = null),
                (this.pending = !1),
                (this.scheduler = null),
                -1 !== n && r.splice(n, 1),
                null != t && (this.id = this.recycleAsyncId(e, t, null)),
                (this.delay = null);
            }),
            e
          );
        })(
          (function (t) {
            function e(e, r) {
              return t.call(this) || this;
            }
            return (
              n.ZT(e, t),
              (e.prototype.schedule = function (t, e) {
                return void 0 === e && (e = 0), this;
              }),
              e
            );
          })(r(5587).w)
        );
    },
    15780: function (t, e, r) {
      "use strict";
      r.d(e, {
        v: function () {
          return o;
        },
      });
      var n = r(55313),
        i = r(96145),
        o = (function (t) {
          function e(r, n) {
            void 0 === n && (n = i.b.now);
            var o =
              t.call(this, r, function () {
                return e.delegate && e.delegate !== o ? e.delegate.now() : n();
              }) || this;
            return (o.actions = []), (o.active = !1), (o.scheduled = void 0), o;
          }
          return (
            n.ZT(e, t),
            (e.prototype.schedule = function (r, n, i) {
              return (void 0 === n && (n = 0),
              e.delegate && e.delegate !== this)
                ? e.delegate.schedule(r, n, i)
                : t.prototype.schedule.call(this, r, n, i);
            }),
            (e.prototype.flush = function (t) {
              var e,
                r = this.actions;
              if (this.active) {
                r.push(t);
                return;
              }
              this.active = !0;
              do if ((e = t.execute(t.state, t.delay))) break;
              while ((t = r.shift()));
              if (((this.active = !1), e)) {
                for (; (t = r.shift()); ) t.unsubscribe();
                throw e;
              }
            }),
            e
          );
        })(i.b);
    },
    13220: function (t, e, r) {
      "use strict";
      r.d(e, {
        e: function () {
          return h;
        },
        E: function () {
          return l;
        },
      });
      var n = r(55313),
        i = 1,
        o = Promise.resolve(),
        s = {};
      function a(t) {
        return t in s && (delete s[t], !0);
      }
      var u = {
          setImmediate: function (t) {
            var e = i++;
            return (
              (s[e] = !0),
              o.then(function () {
                return a(e) && t();
              }),
              e
            );
          },
          clearImmediate: function (t) {
            a(t);
          },
        },
        c = (function (t) {
          function e(e, r) {
            var n = t.call(this, e, r) || this;
            return (n.scheduler = e), (n.work = r), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype.requestAsyncId = function (e, r, n) {
              return (void 0 === n && (n = 0), null !== n && n > 0)
                ? t.prototype.requestAsyncId.call(this, e, r, n)
                : (e.actions.push(this),
                  e.scheduled ||
                    (e.scheduled = u.setImmediate(e.flush.bind(e, null))));
            }),
            (e.prototype.recycleAsyncId = function (e, r, n) {
              if (
                (void 0 === n && (n = 0),
                (null !== n && n > 0) || (null === n && this.delay > 0))
              )
                return t.prototype.recycleAsyncId.call(this, e, r, n);
              0 === e.actions.length &&
                (u.clearImmediate(r), (e.scheduled = void 0));
            }),
            e
          );
        })(r(26368).o),
        l = new ((function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            n.ZT(e, t),
            (e.prototype.flush = function (t) {
              (this.active = !0), (this.scheduled = void 0);
              var e,
                r = this.actions,
                n = -1,
                i = r.length;
              t = t || r.shift();
              do if ((e = t.execute(t.state, t.delay))) break;
              while (++n < i && (t = r.shift()));
              if (((this.active = !1), e)) {
                for (; ++n < i && (t = r.shift()); ) t.unsubscribe();
                throw e;
              }
            }),
            e
          );
        })(r(15780).v))(c),
        h = l;
    },
    71055: function (t, e, r) {
      "use strict";
      r.d(e, {
        P: function () {
          return o;
        },
        z: function () {
          return i;
        },
      });
      var n = r(26368),
        i = new (r(15780).v)(n.o),
        o = i;
    },
    86513: function (t, e, r) {
      "use strict";
      r.d(e, {
        c: function () {
          return s;
        },
        N: function () {
          return o;
        },
      });
      var n = r(55313),
        i = (function (t) {
          function e(e, r) {
            var n = t.call(this, e, r) || this;
            return (n.scheduler = e), (n.work = r), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype.schedule = function (e, r) {
              return (void 0 === r && (r = 0), r > 0)
                ? t.prototype.schedule.call(this, e, r)
                : ((this.delay = r),
                  (this.state = e),
                  this.scheduler.flush(this),
                  this);
            }),
            (e.prototype.execute = function (e, r) {
              return r > 0 || this.closed
                ? t.prototype.execute.call(this, e, r)
                : this._execute(e, r);
            }),
            (e.prototype.requestAsyncId = function (e, r, n) {
              return (void 0 === n && (n = 0),
              (null !== n && n > 0) || (null === n && this.delay > 0))
                ? t.prototype.requestAsyncId.call(this, e, r, n)
                : e.flush(this);
            }),
            e
          );
        })(r(26368).o),
        o = new ((function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return n.ZT(e, t), e;
        })(r(15780).v))(i),
        s = o;
    },
    72963: function (t, e, r) {
      "use strict";
      r.d(e, {
        hZ: function () {
          return n;
        },
      });
      var n =
        "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
    },
    33917: function (t, e, r) {
      "use strict";
      r.d(e, {
        L: function () {
          return n;
        },
      });
      var n =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
    },
    25095: function (t, e, r) {
      "use strict";
      r.d(e, {
        b: function () {
          return n;
        },
      });
      var n =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
    },
    99371: function (t, e, r) {
      "use strict";
      r.d(e, {
        W: function () {
          return n;
        },
      });
      var n = (function () {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    70166: function (t, e, r) {
      "use strict";
      r.d(e, {
        K: function () {
          return n;
        },
      });
      var n = (function () {
        function t() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    92962: function (t, e, r) {
      "use strict";
      r.d(e, {
        N: function () {
          return n;
        },
      });
      var n = (function () {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    64839: function (t, e, r) {
      "use strict";
      r.d(e, {
        W: function () {
          return n;
        },
      });
      var n = (function () {
        function t() {
          return (
            Error.call(this),
            (this.message = "Timeout has occurred"),
            (this.name = "TimeoutError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    48642: function (t, e, r) {
      "use strict";
      r.d(e, {
        B: function () {
          return n;
        },
      });
      var n = (function () {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? t.length +
                " errors occurred during unsubscription:\n" +
                t
                  .map(function (t, e) {
                    return e + 1 + ") " + t.toString();
                  })
                  .join("\n  ")
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    36659: function (t, e, r) {
      "use strict";
      r.d(e, {
        _: function () {
          return i;
        },
      });
      var n = r(90960);
      function i(t) {
        for (; t; ) {
          var e = t,
            r = e.closed,
            i = e.destination,
            o = e.isStopped;
          if (r || o) return !1;
          t = i && i instanceof n.L ? i : null;
        }
        return !0;
      }
    },
    91195: function (t, e, r) {
      "use strict";
      function n(t) {
        setTimeout(function () {
          throw t;
        }, 0);
      }
      r.d(e, {
        z: function () {
          return n;
        },
      });
    },
    33562: function (t, e, r) {
      "use strict";
      function n(t) {
        return t;
      }
      r.d(e, {
        y: function () {
          return n;
        },
      });
    },
    18354: function (t, e, r) {
      "use strict";
      r.d(e, {
        k: function () {
          return n;
        },
      });
      var n =
        Array.isArray ||
        function (t) {
          return t && "number" == typeof t.length;
        };
    },
    38581: function (t, e, r) {
      "use strict";
      r.d(e, {
        z: function () {
          return n;
        },
      });
      var n = function (t) {
        return t && "number" == typeof t.length && "function" != typeof t;
      };
    },
    23991: function (t, e, r) {
      "use strict";
      function n(t) {
        return "function" == typeof t;
      }
      r.d(e, {
        m: function () {
          return n;
        },
      });
    },
    64090: function (t, e, r) {
      "use strict";
      r.d(e, {
        k: function () {
          return i;
        },
      });
      var n = r(18354);
      function i(t) {
        return !(0, n.k)(t) && t - parseFloat(t) + 1 >= 0;
      }
    },
    58011: function (t, e, r) {
      "use strict";
      function n(t) {
        return null !== t && "object" == typeof t;
      }
      r.d(e, {
        K: function () {
          return n;
        },
      });
    },
    83484: function (t, e, r) {
      "use strict";
      function n(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      r.d(e, {
        t: function () {
          return n;
        },
      });
    },
    6306: function (t, e, r) {
      "use strict";
      function n(t) {
        return t && "function" == typeof t.schedule;
      }
      r.d(e, {
        K: function () {
          return n;
        },
      });
    },
    62082: function (t, e, r) {
      "use strict";
      function n() {}
      r.d(e, {
        Z: function () {
          return n;
        },
      });
    },
    64409: function (t, e, r) {
      "use strict";
      function n(t, e) {
        function r() {
          return !r.pred.apply(r.thisArg, arguments);
        }
        return (r.pred = t), (r.thisArg = e), r;
      }
      r.d(e, {
        f: function () {
          return n;
        },
      });
    },
    26883: function (t, e, r) {
      "use strict";
      r.d(e, {
        U: function () {
          return o;
        },
        z: function () {
          return i;
        },
      });
      var n = r(33562);
      function i() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return o(t);
      }
      function o(t) {
        return 0 === t.length
          ? n.y
          : 1 === t.length
          ? t[0]
          : function (e) {
              return t.reduce(function (t, e) {
                return e(t);
              }, e);
            };
      }
    },
    55665: function (t, e, r) {
      "use strict";
      r.d(e, {
        s: function () {
          return l;
        },
      });
      var n = r(60958),
        i = r(91195),
        o = r(72963),
        s = r(33917),
        a = r(38581),
        u = r(83484),
        c = r(58011),
        l = function (t) {
          if (t && "function" == typeof t[s.L])
            return function (e) {
              var r = t[s.L]();
              if ("function" == typeof r.subscribe) return r.subscribe(e);
              throw TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            };
          if ((0, a.z)(t)) return (0, n.V)(t);
          if ((0, u.t)(t))
            return function (e) {
              return (
                t
                  .then(
                    function (t) {
                      e.closed || (e.next(t), e.complete());
                    },
                    function (t) {
                      return e.error(t);
                    }
                  )
                  .then(null, i.z),
                e
              );
            };
          if (t && "function" == typeof t[o.hZ])
            return function (e) {
              for (var r = t[o.hZ](); ; ) {
                var n = void 0;
                try {
                  n = r.next();
                } catch (t) {
                  return e.error(t), e;
                }
                if (n.done) {
                  e.complete();
                  break;
                }
                if ((e.next(n.value), e.closed)) break;
              }
              return (
                "function" == typeof r.return &&
                  e.add(function () {
                    r.return && r.return();
                  }),
                e
              );
            };
          throw TypeError(
            "You provided " +
              ((0, c.K)(t) ? "an invalid object" : "'" + t + "'") +
              " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."
          );
        };
    },
    60958: function (t, e, r) {
      "use strict";
      r.d(e, {
        V: function () {
          return n;
        },
      });
      var n = function (t) {
        return function (e) {
          for (var r = 0, n = t.length; r < n && !e.closed; r++) e.next(t[r]);
          e.complete();
        };
      };
    },
    14789: function (t, e, r) {
      "use strict";
      r.d(e, {
        D: function () {
          return a;
        },
      });
      var n = r(55313),
        i = (function (t) {
          function e(e, r, n) {
            var i = t.call(this) || this;
            return (
              (i.parent = e),
              (i.outerValue = r),
              (i.outerIndex = n),
              (i.index = 0),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.parent.notifyNext(
                this.outerValue,
                t,
                this.outerIndex,
                this.index++,
                this
              );
            }),
            (e.prototype._error = function (t) {
              this.parent.notifyError(t, this), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.parent.notifyComplete(this), this.unsubscribe();
            }),
            e
          );
        })(r(90960).L),
        o = r(55665),
        s = r(83912);
      function a(t, e, r, n, a) {
        return (void 0 === a && (a = new i(t, r, n)), a.closed)
          ? void 0
          : e instanceof s.y
          ? e.subscribe(a)
          : (0, o.s)(e)(a);
      }
    },
    42100: function (t, e, r) {
      "use strict";
      r.r(e),
        r.d(e, {
          audit: function () {
            return o;
          },
          auditTime: function () {
            return l;
          },
          buffer: function () {
            return h;
          },
          bufferCount: function () {
            return y;
          },
          bufferTime: function () {
            return _;
          },
          bufferToggle: function () {
            return A;
          },
          bufferWhen: function () {
            return O;
          },
          catchError: function () {
            return P;
          },
          combineAll: function () {
            return $;
          },
          combineLatest: function () {
            return V;
          },
          concat: function () {
            return H;
          },
          concatAll: function () {
            return q.u;
          },
          concatMap: function () {
            return J;
          },
          concatMapTo: function () {
            return G;
          },
          count: function () {
            return Y;
          },
          debounce: function () {
            return X;
          },
          debounceTime: function () {
            return tr;
          },
          defaultIfEmpty: function () {
            return ts;
          },
          delay: function () {
            return th;
          },
          delayWhen: function () {
            return tg;
          },
          dematerialize: function () {
            return tw;
          },
          distinct: function () {
            return tM;
          },
          distinctUntilChanged: function () {
            return tC;
          },
          distinctUntilKeyChanged: function () {
            return tA;
          },
          elementAt: function () {
            return tz;
          },
          endWith: function () {
            return tW;
          },
          every: function () {
            return tH;
          },
          exhaust: function () {
            return tJ;
          },
          exhaustMap: function () {
            return function t(e, r) {
              return r
                ? function (n) {
                    return n.pipe(
                      t(function (t, n) {
                        return (0, z.D)(e(t, n)).pipe(
                          (0, tQ.U)(function (e, i) {
                            return r(t, e, n, i);
                          })
                        );
                      })
                    );
                  }
                : function (t) {
                    return t.lift(new tK(e));
                  };
            };
          },
          expand: function () {
            return t0;
          },
          filter: function () {
            return tT.h;
          },
          finalize: function () {
            return t3;
          },
          find: function () {
            return t6;
          },
          findIndex: function () {
            return t7;
          },
          first: function () {
            return ee;
          },
          flatMap: function () {
            return Z.VS;
          },
          groupBy: function () {
            return er.v;
          },
          ignoreElements: function () {
            return en;
          },
          isEmpty: function () {
            return es;
          },
          last: function () {
            return ed;
          },
          map: function () {
            return tQ.U;
          },
          mapTo: function () {
            return ef;
          },
          materialize: function () {
            return eg;
          },
          max: function () {
            return eM;
          },
          merge: function () {
            return ek;
          },
          mergeAll: function () {
            return eC.J;
          },
          mergeMap: function () {
            return Z.zg;
          },
          mergeMapTo: function () {
            return eI;
          },
          mergeScan: function () {
            return eR;
          },
          min: function () {
            return eT;
          },
          multicast: function () {
            return eL;
          },
          observeOn: function () {
            return eP.QV;
          },
          onErrorResumeNext: function () {
            return eD;
          },
          pairwise: function () {
            return e$;
          },
          partition: function () {
            return eW;
          },
          pluck: function () {
            return eH;
          },
          publish: function () {
            return eZ;
          },
          publishBehavior: function () {
            return eG;
          },
          publishLast: function () {
            return eQ;
          },
          publishReplay: function () {
            return eX;
          },
          race: function () {
            return e1;
          },
          reduce: function () {
            return eS;
          },
          refCount: function () {
            return ri.x;
          },
          repeat: function () {
            return e2;
          },
          repeatWhen: function () {
            return e5;
          },
          retry: function () {
            return e9;
          },
          retryWhen: function () {
            return re;
          },
          sample: function () {
            return ro;
          },
          sampleTime: function () {
            return ru;
          },
          scan: function () {
            return ev;
          },
          sequenceEqual: function () {
            return rd;
          },
          share: function () {
            return rm;
          },
          shareReplay: function () {
            return rb;
          },
          single: function () {
            return rv;
          },
          skip: function () {
            return rE;
          },
          skipLast: function () {
            return rx;
          },
          skipUntil: function () {
            return rI;
          },
          skipWhile: function () {
            return rN;
          },
          startWith: function () {
            return rL;
          },
          subscribeOn: function () {
            return rB;
          },
          switchAll: function () {
            return rV;
          },
          switchMap: function () {
            return r$;
          },
          switchMapTo: function () {
            return rW;
          },
          take: function () {
            return tF;
          },
          takeLast: function () {
            return ec;
          },
          takeUntil: function () {
            return rH;
          },
          takeWhile: function () {
            return rJ;
          },
          tap: function () {
            return rX;
          },
          throttle: function () {
            return r3;
          },
          throttleTime: function () {
            return r6;
          },
          throwIfEmpty: function () {
            return tL;
          },
          timeInterval: function () {
            return ne;
          },
          timeout: function () {
            return nu;
          },
          timeoutWith: function () {
            return ni;
          },
          timestamp: function () {
            return nc;
          },
          toArray: function () {
            return nd;
          },
          window: function () {
            return nf;
          },
          windowCount: function () {
            return ng;
          },
          windowTime: function () {
            return nv;
          },
          windowToggle: function () {
            return nk;
          },
          windowWhen: function () {
            return nR;
          },
          withLatestFrom: function () {
            return nT;
          },
          zip: function () {
            return nP;
          },
          zipAll: function () {
            return nD;
          },
        });
      var n = r(55313),
        i = r(75994);
      function o(t) {
        return function (e) {
          return e.lift(new s(t));
        };
      }
      var s = (function () {
          function t(t) {
            this.durationSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new a(t, this.durationSelector));
            }),
            t
          );
        })(),
        a = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.durationSelector = r), (n.hasValue = !1), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              if (((this.value = t), (this.hasValue = !0), !this.throttled)) {
                var e = void 0;
                try {
                  e = (0, this.durationSelector)(t);
                } catch (t) {
                  return this.destination.error(t);
                }
                var r = (0, i.ft)(e, new i.IY(this));
                !r || r.closed
                  ? this.clearThrottle()
                  : this.add((this.throttled = r));
              }
            }),
            (e.prototype.clearThrottle = function () {
              var t = this.value,
                e = this.hasValue,
                r = this.throttled;
              r && (this.remove(r), (this.throttled = void 0), r.unsubscribe()),
                e &&
                  ((this.value = void 0),
                  (this.hasValue = !1),
                  this.destination.next(t));
            }),
            (e.prototype.notifyNext = function () {
              this.clearThrottle();
            }),
            (e.prototype.notifyComplete = function () {
              this.clearThrottle();
            }),
            e
          );
        })(i.Ds),
        u = r(71055),
        c = r(19126);
      function l(t, e) {
        return (
          void 0 === e && (e = u.P),
          o(function () {
            return (0, c.H)(t, e);
          })
        );
      }
      function h(t) {
        return function (e) {
          return e.lift(new d(t));
        };
      }
      var d = (function () {
          function t(t) {
            this.closingNotifier = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new f(t, this.closingNotifier));
            }),
            t
          );
        })(),
        f = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.buffer = []), n.add((0, i.ft)(r, new i.IY(n))), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.buffer.push(t);
            }),
            (e.prototype.notifyNext = function () {
              var t = this.buffer;
              (this.buffer = []), this.destination.next(t);
            }),
            e
          );
        })(i.Ds),
        p = r(90960);
      function y(t, e) {
        return (
          void 0 === e && (e = null),
          function (r) {
            return r.lift(new g(t, e));
          }
        );
      }
      var g = (function () {
          function t(t, e) {
            (this.bufferSize = t),
              (this.startBufferEvery = e),
              e && t !== e
                ? (this.subscriberClass = b)
                : (this.subscriberClass = m);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new this.subscriberClass(
                  t,
                  this.bufferSize,
                  this.startBufferEvery
                )
              );
            }),
            t
          );
        })(),
        m = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.bufferSize = r), (n.buffer = []), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e = this.buffer;
              e.push(t),
                e.length == this.bufferSize &&
                  (this.destination.next(e), (this.buffer = []));
            }),
            (e.prototype._complete = function () {
              var e = this.buffer;
              e.length > 0 && this.destination.next(e),
                t.prototype._complete.call(this);
            }),
            e
          );
        })(p.L),
        b = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.bufferSize = r),
              (i.startBufferEvery = n),
              (i.buffers = []),
              (i.count = 0),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e = this.bufferSize,
                r = this.startBufferEvery,
                n = this.buffers,
                i = this.count;
              this.count++, i % r == 0 && n.push([]);
              for (var o = n.length; o--; ) {
                var s = n[o];
                s.push(t),
                  s.length === e && (n.splice(o, 1), this.destination.next(s));
              }
            }),
            (e.prototype._complete = function () {
              for (var e = this.buffers, r = this.destination; e.length > 0; ) {
                var n = e.shift();
                n.length > 0 && r.next(n);
              }
              t.prototype._complete.call(this);
            }),
            e
          );
        })(p.L),
        v = r(6306);
      function _(t) {
        var e = arguments.length,
          r = u.P;
        (0, v.K)(arguments[arguments.length - 1]) &&
          ((r = arguments[arguments.length - 1]), e--);
        var n = null;
        e >= 2 && (n = arguments[1]);
        var i = Number.POSITIVE_INFINITY;
        return (
          e >= 3 && (i = arguments[2]),
          function (e) {
            return e.lift(new w(t, n, i, r));
          }
        );
      }
      var w = (function () {
          function t(t, e, r, n) {
            (this.bufferTimeSpan = t),
              (this.bufferCreationInterval = e),
              (this.maxBufferSize = r),
              (this.scheduler = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new S(
                  t,
                  this.bufferTimeSpan,
                  this.bufferCreationInterval,
                  this.maxBufferSize,
                  this.scheduler
                )
              );
            }),
            t
          );
        })(),
        E = function () {
          this.buffer = [];
        },
        S = (function (t) {
          function e(e, r, n, i, o) {
            var s = t.call(this, e) || this;
            (s.bufferTimeSpan = r),
              (s.bufferCreationInterval = n),
              (s.maxBufferSize = i),
              (s.scheduler = o),
              (s.contexts = []);
            var a = s.openContext();
            return (
              (s.timespanOnly = null == n || n < 0),
              s.timespanOnly
                ? s.add(
                    (a.closeAction = o.schedule(M, r, {
                      subscriber: s,
                      context: a,
                      bufferTimeSpan: r,
                    }))
                  )
                : (s.add(
                    (a.closeAction = o.schedule(k, r, {
                      subscriber: s,
                      context: a,
                    }))
                  ),
                  s.add(
                    o.schedule(x, n, {
                      bufferTimeSpan: r,
                      bufferCreationInterval: n,
                      subscriber: s,
                      scheduler: o,
                    })
                  )),
              s
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              for (var e, r = this.contexts, n = r.length, i = 0; i < n; i++) {
                var o = r[i],
                  s = o.buffer;
                s.push(t), s.length == this.maxBufferSize && (e = o);
              }
              e && this.onBufferFull(e);
            }),
            (e.prototype._error = function (e) {
              (this.contexts.length = 0), t.prototype._error.call(this, e);
            }),
            (e.prototype._complete = function () {
              for (
                var e = this.contexts, r = this.destination;
                e.length > 0;

              ) {
                var n = e.shift();
                r.next(n.buffer);
              }
              t.prototype._complete.call(this);
            }),
            (e.prototype._unsubscribe = function () {
              this.contexts = null;
            }),
            (e.prototype.onBufferFull = function (t) {
              this.closeContext(t);
              var e = t.closeAction;
              if (
                (e.unsubscribe(),
                this.remove(e),
                !this.closed && this.timespanOnly)
              ) {
                t = this.openContext();
                var r = this.bufferTimeSpan,
                  n = { subscriber: this, context: t, bufferTimeSpan: r };
                this.add((t.closeAction = this.scheduler.schedule(M, r, n)));
              }
            }),
            (e.prototype.openContext = function () {
              var t = new E();
              return this.contexts.push(t), t;
            }),
            (e.prototype.closeContext = function (t) {
              this.destination.next(t.buffer);
              var e = this.contexts;
              (e ? e.indexOf(t) : -1) >= 0 && e.splice(e.indexOf(t), 1);
            }),
            e
          );
        })(p.L);
      function M(t) {
        var e = t.subscriber,
          r = t.context;
        r && e.closeContext(r),
          e.closed ||
            ((t.context = e.openContext()),
            (t.context.closeAction = this.schedule(t, t.bufferTimeSpan)));
      }
      function x(t) {
        var e = t.bufferCreationInterval,
          r = t.bufferTimeSpan,
          n = t.subscriber,
          i = t.scheduler,
          o = n.openContext();
        n.closed ||
          (n.add(
            (o.closeAction = i.schedule(k, r, { subscriber: n, context: o }))
          ),
          this.schedule(t, e));
      }
      function k(t) {
        var e = t.subscriber,
          r = t.context;
        e.closeContext(r);
      }
      var C = r(5587),
        I = r(14789),
        R = r(42031);
      function A(t, e) {
        return function (r) {
          return r.lift(new N(t, e));
        };
      }
      var N = (function () {
          function t(t, e) {
            (this.openings = t), (this.closingSelector = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new T(t, this.openings, this.closingSelector));
            }),
            t
          );
        })(),
        T = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.closingSelector = n),
              (i.contexts = []),
              i.add((0, I.D)(i, r)),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              for (var e = this.contexts, r = e.length, n = 0; n < r; n++)
                e[n].buffer.push(t);
            }),
            (e.prototype._error = function (e) {
              for (var r = this.contexts; r.length > 0; ) {
                var n = r.shift();
                n.subscription.unsubscribe(),
                  (n.buffer = null),
                  (n.subscription = null);
              }
              (this.contexts = null), t.prototype._error.call(this, e);
            }),
            (e.prototype._complete = function () {
              for (var e = this.contexts; e.length > 0; ) {
                var r = e.shift();
                this.destination.next(r.buffer),
                  r.subscription.unsubscribe(),
                  (r.buffer = null),
                  (r.subscription = null);
              }
              (this.contexts = null), t.prototype._complete.call(this);
            }),
            (e.prototype.notifyNext = function (t, e) {
              t ? this.closeBuffer(t) : this.openBuffer(e);
            }),
            (e.prototype.notifyComplete = function (t) {
              this.closeBuffer(t.context);
            }),
            (e.prototype.openBuffer = function (t) {
              try {
                var e = this.closingSelector.call(this, t);
                e && this.trySubscribe(e);
              } catch (t) {
                this._error(t);
              }
            }),
            (e.prototype.closeBuffer = function (t) {
              var e = this.contexts;
              if (e && t) {
                var r = t.buffer,
                  n = t.subscription;
                this.destination.next(r),
                  e.splice(e.indexOf(t), 1),
                  this.remove(n),
                  n.unsubscribe();
              }
            }),
            (e.prototype.trySubscribe = function (t) {
              var e = this.contexts,
                r = new C.w(),
                n = { buffer: [], subscription: r };
              e.push(n);
              var i = (0, I.D)(this, t, n);
              !i || i.closed
                ? this.closeBuffer(n)
                : ((i.context = n), this.add(i), r.add(i));
            }),
            e
          );
        })(R.L);
      function O(t) {
        return function (e) {
          return e.lift(new L(t));
        };
      }
      var L = (function () {
          function t(t) {
            this.closingSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new j(t, this.closingSelector));
            }),
            t
          );
        })(),
        j = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (
              (n.closingSelector = r), (n.subscribing = !1), n.openBuffer(), n
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.buffer.push(t);
            }),
            (e.prototype._complete = function () {
              var e = this.buffer;
              e && this.destination.next(e), t.prototype._complete.call(this);
            }),
            (e.prototype._unsubscribe = function () {
              (this.buffer = void 0), (this.subscribing = !1);
            }),
            (e.prototype.notifyNext = function () {
              this.openBuffer();
            }),
            (e.prototype.notifyComplete = function () {
              this.subscribing ? this.complete() : this.openBuffer();
            }),
            (e.prototype.openBuffer = function () {
              var t,
                e = this.closingSubscription;
              e && (this.remove(e), e.unsubscribe());
              var r = this.buffer;
              this.buffer && this.destination.next(r), (this.buffer = []);
              try {
                t = (0, this.closingSelector)();
              } catch (t) {
                return this.error(t);
              }
              (e = new C.w()),
                (this.closingSubscription = e),
                this.add(e),
                (this.subscribing = !0),
                e.add((0, i.ft)(t, new i.IY(this))),
                (this.subscribing = !1);
            }),
            e
          );
        })(i.Ds);
      function P(t) {
        return function (e) {
          var r = new D(t),
            n = e.lift(r);
          return (r.caught = n);
        };
      }
      var D = (function () {
          function t(t) {
            this.selector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new B(t, this.selector, this.caught));
            }),
            t
          );
        })(),
        B = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (i.selector = r), (i.caught = n), i;
          }
          return (
            n.ZT(e, t),
            (e.prototype.error = function (e) {
              if (!this.isStopped) {
                var r = void 0;
                try {
                  r = this.selector(e, this.caught);
                } catch (e) {
                  t.prototype.error.call(this, e);
                  return;
                }
                this._unsubscribeAndRecycle();
                var n = new i.IY(this);
                this.add(n);
                var o = (0, i.ft)(r, n);
                o !== n && this.add(o);
              }
            }),
            e
          );
        })(i.Ds),
        F = r(46864);
      function $(t) {
        return function (e) {
          return e.lift(new F.Ms(t));
        };
      }
      var U = r(18354),
        z = r(53279);
      function V() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = null;
        return (
          "function" == typeof t[t.length - 1] && (r = t.pop()),
          1 === t.length && (0, U.k)(t[0]) && (t = t[0].slice()),
          function (e) {
            return e.lift.call((0, z.D)([e].concat(t)), new F.Ms(r));
          }
        );
      }
      var W = r(50961);
      function H() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e) {
          return e.lift.call(W.z.apply(void 0, [e].concat(t)));
        };
      }
      var q = r(82953),
        Z = r(96136);
      function J(t, e) {
        return (0, Z.zg)(t, e, 1);
      }
      function G(t, e) {
        return J(function () {
          return t;
        }, e);
      }
      function Y(t) {
        return function (e) {
          return e.lift(new Q(t, e));
        };
      }
      var Q = (function () {
          function t(t, e) {
            (this.predicate = t), (this.source = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new K(t, this.predicate, this.source));
            }),
            t
          );
        })(),
        K = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.predicate = r), (i.source = n), (i.count = 0), (i.index = 0), i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.predicate ? this._tryPredicate(t) : this.count++;
            }),
            (e.prototype._tryPredicate = function (t) {
              var e;
              try {
                e = this.predicate(t, this.index++, this.source);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              e && this.count++;
            }),
            (e.prototype._complete = function () {
              this.destination.next(this.count), this.destination.complete();
            }),
            e
          );
        })(p.L);
      function X(t) {
        return function (e) {
          return e.lift(new tt(t));
        };
      }
      var tt = (function () {
          function t(t) {
            this.durationSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new te(t, this.durationSelector));
            }),
            t
          );
        })(),
        te = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.durationSelector = r), (n.hasValue = !1), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              try {
                var e = this.durationSelector.call(this, t);
                e && this._tryNext(t, e);
              } catch (t) {
                this.destination.error(t);
              }
            }),
            (e.prototype._complete = function () {
              this.emitValue(), this.destination.complete();
            }),
            (e.prototype._tryNext = function (t, e) {
              var r = this.durationSubscription;
              (this.value = t),
                (this.hasValue = !0),
                r && (r.unsubscribe(), this.remove(r)),
                (r = (0, i.ft)(e, new i.IY(this))) &&
                  !r.closed &&
                  this.add((this.durationSubscription = r));
            }),
            (e.prototype.notifyNext = function () {
              this.emitValue();
            }),
            (e.prototype.notifyComplete = function () {
              this.emitValue();
            }),
            (e.prototype.emitValue = function () {
              if (this.hasValue) {
                var e = this.value,
                  r = this.durationSubscription;
                r &&
                  ((this.durationSubscription = void 0),
                  r.unsubscribe(),
                  this.remove(r)),
                  (this.value = void 0),
                  (this.hasValue = !1),
                  t.prototype._next.call(this, e);
              }
            }),
            e
          );
        })(i.Ds);
      function tr(t, e) {
        return (
          void 0 === e && (e = u.P),
          function (r) {
            return r.lift(new tn(t, e));
          }
        );
      }
      var tn = (function () {
          function t(t, e) {
            (this.dueTime = t), (this.scheduler = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new ti(t, this.dueTime, this.scheduler));
            }),
            t
          );
        })(),
        ti = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.dueTime = r),
              (i.scheduler = n),
              (i.debouncedSubscription = null),
              (i.lastValue = null),
              (i.hasValue = !1),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.clearDebounce(),
                (this.lastValue = t),
                (this.hasValue = !0),
                this.add(
                  (this.debouncedSubscription = this.scheduler.schedule(
                    to,
                    this.dueTime,
                    this
                  ))
                );
            }),
            (e.prototype._complete = function () {
              this.debouncedNext(), this.destination.complete();
            }),
            (e.prototype.debouncedNext = function () {
              if ((this.clearDebounce(), this.hasValue)) {
                var t = this.lastValue;
                (this.lastValue = null),
                  (this.hasValue = !1),
                  this.destination.next(t);
              }
            }),
            (e.prototype.clearDebounce = function () {
              var t = this.debouncedSubscription;
              null !== t &&
                (this.remove(t),
                t.unsubscribe(),
                (this.debouncedSubscription = null));
            }),
            e
          );
        })(p.L);
      function to(t) {
        t.debouncedNext();
      }
      function ts(t) {
        return (
          void 0 === t && (t = null),
          function (e) {
            return e.lift(new ta(t));
          }
        );
      }
      var ta = (function () {
          function t(t) {
            this.defaultValue = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tu(t, this.defaultValue));
            }),
            t
          );
        })(),
        tu = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.defaultValue = r), (n.isEmpty = !0), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              (this.isEmpty = !1), this.destination.next(t);
            }),
            (e.prototype._complete = function () {
              this.isEmpty && this.destination.next(this.defaultValue),
                this.destination.complete();
            }),
            e
          );
        })(p.L);
      function tc(t) {
        return t instanceof Date && !isNaN(+t);
      }
      var tl = r(72672);
      function th(t, e) {
        void 0 === e && (e = u.P);
        var r = tc(t) ? +t - e.now() : Math.abs(t);
        return function (t) {
          return t.lift(new td(r, e));
        };
      }
      var td = (function () {
          function t(t, e) {
            (this.delay = t), (this.scheduler = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tf(t, this.delay, this.scheduler));
            }),
            t
          );
        })(),
        tf = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.delay = r),
              (i.scheduler = n),
              (i.queue = []),
              (i.active = !1),
              (i.errored = !1),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.dispatch = function (t) {
              for (
                var e = t.source,
                  r = e.queue,
                  n = t.scheduler,
                  i = t.destination;
                r.length > 0 && r[0].time - n.now() <= 0;

              )
                r.shift().notification.observe(i);
              if (r.length > 0) {
                var o = Math.max(0, r[0].time - n.now());
                this.schedule(t, o);
              } else this.unsubscribe(), (e.active = !1);
            }),
            (e.prototype._schedule = function (t) {
              (this.active = !0),
                this.destination.add(
                  t.schedule(e.dispatch, this.delay, {
                    source: this,
                    destination: this.destination,
                    scheduler: t,
                  })
                );
            }),
            (e.prototype.scheduleNotification = function (t) {
              if (!0 !== this.errored) {
                var e = this.scheduler,
                  r = new tp(e.now() + this.delay, t);
                this.queue.push(r), !1 === this.active && this._schedule(e);
              }
            }),
            (e.prototype._next = function (t) {
              this.scheduleNotification(tl.P.createNext(t));
            }),
            (e.prototype._error = function (t) {
              (this.errored = !0),
                (this.queue = []),
                this.destination.error(t),
                this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.scheduleNotification(tl.P.createComplete()),
                this.unsubscribe();
            }),
            e
          );
        })(p.L),
        tp = function (t, e) {
          (this.time = t), (this.notification = e);
        },
        ty = r(83912);
      function tg(t, e) {
        return e
          ? function (r) {
              return new tv(r, e).lift(new tm(t));
            }
          : function (e) {
              return e.lift(new tm(t));
            };
      }
      var tm = (function () {
          function t(t) {
            this.delayDurationSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tb(t, this.delayDurationSelector));
            }),
            t
          );
        })(),
        tb = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (
              (n.delayDurationSelector = r),
              (n.completed = !1),
              (n.delayNotifierSubscriptions = []),
              (n.index = 0),
              n
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function (t, e, r, n, i) {
              this.destination.next(t),
                this.removeSubscription(i),
                this.tryComplete();
            }),
            (e.prototype.notifyError = function (t, e) {
              this._error(t);
            }),
            (e.prototype.notifyComplete = function (t) {
              var e = this.removeSubscription(t);
              e && this.destination.next(e), this.tryComplete();
            }),
            (e.prototype._next = function (t) {
              var e = this.index++;
              try {
                var r = this.delayDurationSelector(t, e);
                r && this.tryDelay(r, t);
              } catch (t) {
                this.destination.error(t);
              }
            }),
            (e.prototype._complete = function () {
              (this.completed = !0), this.tryComplete(), this.unsubscribe();
            }),
            (e.prototype.removeSubscription = function (t) {
              t.unsubscribe();
              var e = this.delayNotifierSubscriptions.indexOf(t);
              return (
                -1 !== e && this.delayNotifierSubscriptions.splice(e, 1),
                t.outerValue
              );
            }),
            (e.prototype.tryDelay = function (t, e) {
              var r = (0, I.D)(this, t, e);
              r &&
                !r.closed &&
                (this.destination.add(r),
                this.delayNotifierSubscriptions.push(r));
            }),
            (e.prototype.tryComplete = function () {
              this.completed &&
                0 === this.delayNotifierSubscriptions.length &&
                this.destination.complete();
            }),
            e
          );
        })(R.L),
        tv = (function (t) {
          function e(e, r) {
            var n = t.call(this) || this;
            return (n.source = e), (n.subscriptionDelay = r), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._subscribe = function (t) {
              this.subscriptionDelay.subscribe(new t_(t, this.source));
            }),
            e
          );
        })(ty.y),
        t_ = (function (t) {
          function e(e, r) {
            var n = t.call(this) || this;
            return (n.parent = e), (n.source = r), (n.sourceSubscribed = !1), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.subscribeToSource();
            }),
            (e.prototype._error = function (t) {
              this.unsubscribe(), this.parent.error(t);
            }),
            (e.prototype._complete = function () {
              this.unsubscribe(), this.subscribeToSource();
            }),
            (e.prototype.subscribeToSource = function () {
              this.sourceSubscribed ||
                ((this.sourceSubscribed = !0),
                this.unsubscribe(),
                this.source.subscribe(this.parent));
            }),
            e
          );
        })(p.L);
      function tw() {
        return function (t) {
          return t.lift(new tE());
        };
      }
      var tE = (function () {
          function t() {}
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tS(t));
            }),
            t
          );
        })(),
        tS = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              t.observe(this.destination);
            }),
            e
          );
        })(p.L);
      function tM(t, e) {
        return function (r) {
          return r.lift(new tx(t, e));
        };
      }
      var tx = (function () {
          function t(t, e) {
            (this.keySelector = t), (this.flushes = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tk(t, this.keySelector, this.flushes));
            }),
            t
          );
        })(),
        tk = (function (t) {
          function e(e, r, n) {
            var o = t.call(this, e) || this;
            return (
              (o.keySelector = r),
              (o.values = new Set()),
              n && o.add((0, i.ft)(n, new i.IY(o))),
              o
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function () {
              this.values.clear();
            }),
            (e.prototype.notifyError = function (t) {
              this._error(t);
            }),
            (e.prototype._next = function (t) {
              this.keySelector
                ? this._useKeySelector(t)
                : this._finalizeNext(t, t);
            }),
            (e.prototype._useKeySelector = function (t) {
              var e,
                r = this.destination;
              try {
                e = this.keySelector(t);
              } catch (t) {
                r.error(t);
                return;
              }
              this._finalizeNext(e, t);
            }),
            (e.prototype._finalizeNext = function (t, e) {
              var r = this.values;
              r.has(t) || (r.add(t), this.destination.next(e));
            }),
            e
          );
        })(i.Ds);
      function tC(t, e) {
        return function (r) {
          return r.lift(new tI(t, e));
        };
      }
      var tI = (function () {
          function t(t, e) {
            (this.compare = t), (this.keySelector = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tR(t, this.compare, this.keySelector));
            }),
            t
          );
        })(),
        tR = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.keySelector = n),
              (i.hasKey = !1),
              "function" == typeof r && (i.compare = r),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.compare = function (t, e) {
              return t === e;
            }),
            (e.prototype._next = function (t) {
              try {
                var e,
                  r = this.keySelector;
                e = r ? r(t) : t;
              } catch (t) {
                return this.destination.error(t);
              }
              var n = !1;
              if (this.hasKey)
                try {
                  n = (0, this.compare)(this.key, e);
                } catch (t) {
                  return this.destination.error(t);
                }
              else this.hasKey = !0;
              n || ((this.key = e), this.destination.next(t));
            }),
            e
          );
        })(p.L);
      function tA(t, e) {
        return tC(function (r, n) {
          return e ? e(r[t], n[t]) : r[t] === n[t];
        });
      }
      var tN = r(99371),
        tT = r(70363),
        tO = r(70166);
      function tL(t) {
        return (
          void 0 === t && (t = tD),
          function (e) {
            return e.lift(new tj(t));
          }
        );
      }
      var tj = (function () {
          function t(t) {
            this.errorFactory = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tP(t, this.errorFactory));
            }),
            t
          );
        })(),
        tP = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.errorFactory = r), (n.hasValue = !1), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              (this.hasValue = !0), this.destination.next(t);
            }),
            (e.prototype._complete = function () {
              if (this.hasValue) return this.destination.complete();
              var t = void 0;
              try {
                t = this.errorFactory();
              } catch (e) {
                t = e;
              }
              this.destination.error(t);
            }),
            e
          );
        })(p.L);
      function tD() {
        return new tO.K();
      }
      var tB = r(49117);
      function tF(t) {
        return function (e) {
          return 0 === t ? (0, tB.c)() : e.lift(new t$(t));
        };
      }
      var t$ = (function () {
          function t(t) {
            if (((this.total = t), this.total < 0)) throw new tN.W();
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tU(t, this.total));
            }),
            t
          );
        })(),
        tU = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.total = r), (n.count = 0), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e = this.total,
                r = ++this.count;
              r <= e &&
                (this.destination.next(t),
                r === e && (this.destination.complete(), this.unsubscribe()));
            }),
            e
          );
        })(p.L);
      function tz(t, e) {
        if (t < 0) throw new tN.W();
        var r = arguments.length >= 2;
        return function (n) {
          return n.pipe(
            (0, tT.h)(function (e, r) {
              return r === t;
            }),
            tF(1),
            r
              ? ts(e)
              : tL(function () {
                  return new tN.W();
                })
          );
        };
      }
      var tV = r(17010);
      function tW() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e) {
          return (0, W.z)(e, tV.of.apply(void 0, t));
        };
      }
      function tH(t, e) {
        return function (r) {
          return r.lift(new tq(t, e, r));
        };
      }
      var tq = (function () {
          function t(t, e, r) {
            (this.predicate = t), (this.thisArg = e), (this.source = r);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new tZ(t, this.predicate, this.thisArg, this.source)
              );
            }),
            t
          );
        })(),
        tZ = (function (t) {
          function e(e, r, n, i) {
            var o = t.call(this, e) || this;
            return (
              (o.predicate = r),
              (o.thisArg = n),
              (o.source = i),
              (o.index = 0),
              (o.thisArg = n || o),
              o
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyComplete = function (t) {
              this.destination.next(t), this.destination.complete();
            }),
            (e.prototype._next = function (t) {
              var e = !1;
              try {
                e = this.predicate.call(
                  this.thisArg,
                  t,
                  this.index++,
                  this.source
                );
              } catch (t) {
                this.destination.error(t);
                return;
              }
              e || this.notifyComplete(!1);
            }),
            (e.prototype._complete = function () {
              this.notifyComplete(!0);
            }),
            e
          );
        })(p.L);
      function tJ() {
        return function (t) {
          return t.lift(new tG());
        };
      }
      var tG = (function () {
          function t() {}
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tY(t));
            }),
            t
          );
        })(),
        tY = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (r.hasCompleted = !1), (r.hasSubscription = !1), r;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.hasSubscription ||
                ((this.hasSubscription = !0),
                this.add((0, i.ft)(t, new i.IY(this))));
            }),
            (e.prototype._complete = function () {
              (this.hasCompleted = !0),
                this.hasSubscription || this.destination.complete();
            }),
            (e.prototype.notifyComplete = function () {
              (this.hasSubscription = !1),
                this.hasCompleted && this.destination.complete();
            }),
            e
          );
        })(i.Ds),
        tQ = r(57054),
        tK = (function () {
          function t(t) {
            this.project = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new tX(t, this.project));
            }),
            t
          );
        })(),
        tX = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (
              (n.project = r),
              (n.hasSubscription = !1),
              (n.hasCompleted = !1),
              (n.index = 0),
              n
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.hasSubscription || this.tryNext(t);
            }),
            (e.prototype.tryNext = function (t) {
              var e,
                r = this.index++;
              try {
                e = this.project(t, r);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              (this.hasSubscription = !0), this._innerSub(e);
            }),
            (e.prototype._innerSub = function (t) {
              var e = new i.IY(this),
                r = this.destination;
              r.add(e);
              var n = (0, i.ft)(t, e);
              n !== e && r.add(n);
            }),
            (e.prototype._complete = function () {
              (this.hasCompleted = !0),
                this.hasSubscription || this.destination.complete(),
                this.unsubscribe();
            }),
            (e.prototype.notifyNext = function (t) {
              this.destination.next(t);
            }),
            (e.prototype.notifyError = function (t) {
              this.destination.error(t);
            }),
            (e.prototype.notifyComplete = function () {
              (this.hasSubscription = !1),
                this.hasCompleted && this.destination.complete();
            }),
            e
          );
        })(i.Ds);
      function t0(t, e, r) {
        return (
          void 0 === e && (e = Number.POSITIVE_INFINITY),
          (e = 1 > (e || 0) ? Number.POSITIVE_INFINITY : e),
          function (n) {
            return n.lift(new t1(t, e, r));
          }
        );
      }
      var t1 = (function () {
          function t(t, e, r) {
            (this.project = t), (this.concurrent = e), (this.scheduler = r);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new t2(t, this.project, this.concurrent, this.scheduler)
              );
            }),
            t
          );
        })(),
        t2 = (function (t) {
          function e(e, r, n, i) {
            var o = t.call(this, e) || this;
            return (
              (o.project = r),
              (o.concurrent = n),
              (o.scheduler = i),
              (o.index = 0),
              (o.active = 0),
              (o.hasCompleted = !1),
              n < Number.POSITIVE_INFINITY && (o.buffer = []),
              o
            );
          }
          return (
            n.ZT(e, t),
            (e.dispatch = function (t) {
              var e = t.subscriber,
                r = t.result,
                n = t.value,
                i = t.index;
              e.subscribeToProjection(r, n, i);
            }),
            (e.prototype._next = function (t) {
              var r = this.destination;
              if (r.closed) {
                this._complete();
                return;
              }
              var n = this.index++;
              if (this.active < this.concurrent) {
                r.next(t);
                try {
                  var i = (0, this.project)(t, n);
                  this.scheduler
                    ? this.destination.add(
                        this.scheduler.schedule(e.dispatch, 0, {
                          subscriber: this,
                          result: i,
                          value: t,
                          index: n,
                        })
                      )
                    : this.subscribeToProjection(i, t, n);
                } catch (t) {
                  r.error(t);
                }
              } else this.buffer.push(t);
            }),
            (e.prototype.subscribeToProjection = function (t, e, r) {
              this.active++, this.destination.add((0, i.ft)(t, new i.IY(this)));
            }),
            (e.prototype._complete = function () {
              (this.hasCompleted = !0),
                this.hasCompleted &&
                  0 === this.active &&
                  this.destination.complete(),
                this.unsubscribe();
            }),
            (e.prototype.notifyNext = function (t) {
              this._next(t);
            }),
            (e.prototype.notifyComplete = function () {
              var t = this.buffer;
              this.active--,
                t && t.length > 0 && this._next(t.shift()),
                this.hasCompleted &&
                  0 === this.active &&
                  this.destination.complete();
            }),
            e
          );
        })(i.Ds);
      function t3(t) {
        return function (e) {
          return e.lift(new t4(t));
        };
      }
      var t4 = (function () {
          function t(t) {
            this.callback = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new t5(t, this.callback));
            }),
            t
          );
        })(),
        t5 = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return n.add(new C.w(r)), n;
          }
          return n.ZT(e, t), e;
        })(p.L);
      function t6(t, e) {
        if ("function" != typeof t)
          throw TypeError("predicate is not a function");
        return function (r) {
          return r.lift(new t8(t, r, !1, e));
        };
      }
      var t8 = (function () {
          function t(t, e, r, n) {
            (this.predicate = t),
              (this.source = e),
              (this.yieldIndex = r),
              (this.thisArg = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new t9(
                  t,
                  this.predicate,
                  this.source,
                  this.yieldIndex,
                  this.thisArg
                )
              );
            }),
            t
          );
        })(),
        t9 = (function (t) {
          function e(e, r, n, i, o) {
            var s = t.call(this, e) || this;
            return (
              (s.predicate = r),
              (s.source = n),
              (s.yieldIndex = i),
              (s.thisArg = o),
              (s.index = 0),
              s
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyComplete = function (t) {
              var e = this.destination;
              e.next(t), e.complete(), this.unsubscribe();
            }),
            (e.prototype._next = function (t) {
              var e = this.predicate,
                r = this.thisArg,
                n = this.index++;
              try {
                e.call(r || this, t, n, this.source) &&
                  this.notifyComplete(this.yieldIndex ? n : t);
              } catch (t) {
                this.destination.error(t);
              }
            }),
            (e.prototype._complete = function () {
              this.notifyComplete(this.yieldIndex ? -1 : void 0);
            }),
            e
          );
        })(p.L);
      function t7(t, e) {
        return function (r) {
          return r.lift(new t8(t, r, !0, e));
        };
      }
      var et = r(33562);
      function ee(t, e) {
        var r = arguments.length >= 2;
        return function (n) {
          return n.pipe(
            t
              ? (0, tT.h)(function (e, r) {
                  return t(e, r, n);
                })
              : et.y,
            tF(1),
            r
              ? ts(e)
              : tL(function () {
                  return new tO.K();
                })
          );
        };
      }
      var er = r(53592);
      function en() {
        return function (t) {
          return t.lift(new ei());
        };
      }
      var ei = (function () {
          function t() {}
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new eo(t));
            }),
            t
          );
        })(),
        eo = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return n.ZT(e, t), (e.prototype._next = function (t) {}), e;
        })(p.L);
      function es() {
        return function (t) {
          return t.lift(new ea());
        };
      }
      var ea = (function () {
          function t() {}
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new eu(t));
            }),
            t
          );
        })(),
        eu = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyComplete = function (t) {
              var e = this.destination;
              e.next(t), e.complete();
            }),
            (e.prototype._next = function (t) {
              this.notifyComplete(!1);
            }),
            (e.prototype._complete = function () {
              this.notifyComplete(!0);
            }),
            e
          );
        })(p.L);
      function ec(t) {
        return function (e) {
          return 0 === t ? (0, tB.c)() : e.lift(new el(t));
        };
      }
      var el = (function () {
          function t(t) {
            if (((this.total = t), this.total < 0)) throw new tN.W();
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new eh(t, this.total));
            }),
            t
          );
        })(),
        eh = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.total = r), (n.ring = []), (n.count = 0), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e = this.ring,
                r = this.total,
                n = this.count++;
              e.length < r ? e.push(t) : (e[n % r] = t);
            }),
            (e.prototype._complete = function () {
              var t = this.destination,
                e = this.count;
              if (e > 0)
                for (
                  var r = this.count >= this.total ? this.total : this.count,
                    n = this.ring,
                    i = 0;
                  i < r;
                  i++
                ) {
                  var o = e++ % r;
                  t.next(n[o]);
                }
              t.complete();
            }),
            e
          );
        })(p.L);
      function ed(t, e) {
        var r = arguments.length >= 2;
        return function (n) {
          return n.pipe(
            t
              ? (0, tT.h)(function (e, r) {
                  return t(e, r, n);
                })
              : et.y,
            ec(1),
            r
              ? ts(e)
              : tL(function () {
                  return new tO.K();
                })
          );
        };
      }
      function ef(t) {
        return function (e) {
          return e.lift(new ep(t));
        };
      }
      var ep = (function () {
          function t(t) {
            this.value = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new ey(t, this.value));
            }),
            t
          );
        })(),
        ey = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.value = r), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.destination.next(this.value);
            }),
            e
          );
        })(p.L);
      function eg() {
        return function (t) {
          return t.lift(new em());
        };
      }
      var em = (function () {
          function t() {}
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new eb(t));
            }),
            t
          );
        })(),
        eb = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.destination.next(tl.P.createNext(t));
            }),
            (e.prototype._error = function (t) {
              var e = this.destination;
              e.next(tl.P.createError(t)), e.complete();
            }),
            (e.prototype._complete = function () {
              var t = this.destination;
              t.next(tl.P.createComplete()), t.complete();
            }),
            e
          );
        })(p.L);
      function ev(t, e) {
        var r = !1;
        return (
          arguments.length >= 2 && (r = !0),
          function (n) {
            return n.lift(new e_(t, e, r));
          }
        );
      }
      var e_ = (function () {
          function t(t, e, r) {
            void 0 === r && (r = !1),
              (this.accumulator = t),
              (this.seed = e),
              (this.hasSeed = r);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new ew(t, this.accumulator, this.seed, this.hasSeed)
              );
            }),
            t
          );
        })(),
        ew = (function (t) {
          function e(e, r, n, i) {
            var o = t.call(this, e) || this;
            return (
              (o.accumulator = r),
              (o._seed = n),
              (o.hasSeed = i),
              (o.index = 0),
              o
            );
          }
          return (
            n.ZT(e, t),
            Object.defineProperty(e.prototype, "seed", {
              get: function () {
                return this._seed;
              },
              set: function (t) {
                (this.hasSeed = !0), (this._seed = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._next = function (t) {
              if (this.hasSeed) return this._tryNext(t);
              (this.seed = t), this.destination.next(t);
            }),
            (e.prototype._tryNext = function (t) {
              var e,
                r = this.index++;
              try {
                e = this.accumulator(this.seed, t, r);
              } catch (t) {
                this.destination.error(t);
              }
              (this.seed = e), this.destination.next(e);
            }),
            e
          );
        })(p.L),
        eE = r(26883);
      function eS(t, e) {
        return arguments.length >= 2
          ? function (r) {
              return (0, eE.z)(ev(t, e), ec(1), ts(e))(r);
            }
          : function (e) {
              return (0, eE.z)(
                ev(function (e, r, n) {
                  return t(e, r, n + 1);
                }),
                ec(1)
              )(e);
            };
      }
      function eM(t) {
        return eS(
          "function" == typeof t
            ? function (e, r) {
                return t(e, r) > 0 ? e : r;
              }
            : function (t, e) {
                return t > e ? t : e;
              }
        );
      }
      var ex = r(28051);
      function ek() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e) {
          return e.lift.call(ex.T.apply(void 0, [e].concat(t)));
        };
      }
      var eC = r(15587);
      function eI(t, e, r) {
        return (void 0 === r && (r = Number.POSITIVE_INFINITY),
        "function" == typeof e)
          ? (0, Z.zg)(
              function () {
                return t;
              },
              e,
              r
            )
          : ("number" == typeof e && (r = e),
            (0, Z.zg)(function () {
              return t;
            }, r));
      }
      function eR(t, e, r) {
        return (
          void 0 === r && (r = Number.POSITIVE_INFINITY),
          function (n) {
            return n.lift(new eA(t, e, r));
          }
        );
      }
      var eA = (function () {
          function t(t, e, r) {
            (this.accumulator = t), (this.seed = e), (this.concurrent = r);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new eN(t, this.accumulator, this.seed, this.concurrent)
              );
            }),
            t
          );
        })(),
        eN = (function (t) {
          function e(e, r, n, i) {
            var o = t.call(this, e) || this;
            return (
              (o.accumulator = r),
              (o.acc = n),
              (o.concurrent = i),
              (o.hasValue = !1),
              (o.hasCompleted = !1),
              (o.buffer = []),
              (o.active = 0),
              (o.index = 0),
              o
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              if (this.active < this.concurrent) {
                var e = this.index++,
                  r = this.destination,
                  n = void 0;
                try {
                  n = (0, this.accumulator)(this.acc, t, e);
                } catch (t) {
                  return r.error(t);
                }
                this.active++, this._innerSub(n);
              } else this.buffer.push(t);
            }),
            (e.prototype._innerSub = function (t) {
              var e = new i.IY(this),
                r = this.destination;
              r.add(e);
              var n = (0, i.ft)(t, e);
              n !== e && r.add(n);
            }),
            (e.prototype._complete = function () {
              (this.hasCompleted = !0),
                0 === this.active &&
                  0 === this.buffer.length &&
                  (!1 === this.hasValue && this.destination.next(this.acc),
                  this.destination.complete()),
                this.unsubscribe();
            }),
            (e.prototype.notifyNext = function (t) {
              var e = this.destination;
              (this.acc = t), (this.hasValue = !0), e.next(t);
            }),
            (e.prototype.notifyComplete = function () {
              var t = this.buffer;
              this.active--,
                t.length > 0
                  ? this._next(t.shift())
                  : 0 === this.active &&
                    this.hasCompleted &&
                    (!1 === this.hasValue && this.destination.next(this.acc),
                    this.destination.complete());
            }),
            e
          );
        })(i.Ds);
      function eT(t) {
        return eS(
          "function" == typeof t
            ? function (e, r) {
                return 0 > t(e, r) ? e : r;
              }
            : function (t, e) {
                return t < e ? t : e;
              }
        );
      }
      var eO = r(75623);
      function eL(t, e) {
        return function (r) {
          if (
            ((n =
              "function" == typeof t
                ? t
                : function () {
                    return t;
                  }),
            "function" == typeof e)
          )
            return r.lift(new ej(n, e));
          var n,
            i = Object.create(r, eO.N);
          return (i.source = r), (i.subjectFactory = n), i;
        };
      }
      var ej = (function () {
          function t(t, e) {
            (this.subjectFactory = t), (this.selector = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              var r = this.selector,
                n = this.subjectFactory(),
                i = r(n).subscribe(t);
              return i.add(e.subscribe(n)), i;
            }),
            t
          );
        })(),
        eP = r(11373);
      function eD() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return (
          1 === t.length && (0, U.k)(t[0]) && (t = t[0]),
          function (e) {
            return e.lift(new eB(t));
          }
        );
      }
      var eB = (function () {
          function t(t) {
            this.nextSources = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new eF(t, this.nextSources));
            }),
            t
          );
        })(),
        eF = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.destination = e), (n.nextSources = r), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyError = function () {
              this.subscribeToNextSource();
            }),
            (e.prototype.notifyComplete = function () {
              this.subscribeToNextSource();
            }),
            (e.prototype._error = function (t) {
              this.subscribeToNextSource(), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.subscribeToNextSource(), this.unsubscribe();
            }),
            (e.prototype.subscribeToNextSource = function () {
              var t = this.nextSources.shift();
              if (t) {
                var e = new i.IY(this),
                  r = this.destination;
                r.add(e);
                var n = (0, i.ft)(t, e);
                n !== e && r.add(n);
              } else this.destination.complete();
            }),
            e
          );
        })(i.Ds);
      function e$() {
        return function (t) {
          return t.lift(new eU());
        };
      }
      var eU = (function () {
          function t() {}
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new ez(t));
            }),
            t
          );
        })(),
        ez = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (r.hasPrev = !1), r;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e;
              this.hasPrev ? (e = [this.prev, t]) : (this.hasPrev = !0),
                (this.prev = t),
                e && this.destination.next(e);
            }),
            e
          );
        })(p.L),
        eV = r(64409);
      function eW(t, e) {
        return function (r) {
          return [(0, tT.h)(t, e)(r), (0, tT.h)((0, eV.f)(t, e))(r)];
        };
      }
      function eH() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = t.length;
        if (0 === r) throw Error("list of properties cannot be empty.");
        return function (e) {
          return (0, tQ.U)(function (e) {
            for (var n = e, i = 0; i < r; i++) {
              var o = null != n ? n[t[i]] : void 0;
              if (void 0 === o) return;
              n = o;
            }
            return n;
          })(e);
        };
      }
      var eq = r(53037);
      function eZ(t) {
        return t
          ? eL(function () {
              return new eq.xQ();
            }, t)
          : eL(new eq.xQ());
      }
      var eJ = r(29381);
      function eG(t) {
        return function (e) {
          return eL(new eJ.X(t))(e);
        };
      }
      var eY = r(25343);
      function eQ() {
        return function (t) {
          return eL(new eY.c())(t);
        };
      }
      var eK = r(80436);
      function eX(t, e, r, n) {
        r && "function" != typeof r && (n = r);
        var i = "function" == typeof r ? r : void 0,
          o = new eK.t(t, e, n);
        return function (t) {
          return eL(function () {
            return o;
          }, i)(t);
        };
      }
      var e0 = r(51340);
      function e1() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e) {
          return (
            1 === t.length && (0, U.k)(t[0]) && (t = t[0]),
            e.lift.call(e0.S3.apply(void 0, [e].concat(t)))
          );
        };
      }
      function e2(t) {
        return (
          void 0 === t && (t = -1),
          function (e) {
            return 0 === t
              ? (0, tB.c)()
              : t < 0
              ? e.lift(new e3(-1, e))
              : e.lift(new e3(t - 1, e));
          }
        );
      }
      var e3 = (function () {
          function t(t, e) {
            (this.count = t), (this.source = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new e4(t, this.count, this.source));
            }),
            t
          );
        })(),
        e4 = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (i.count = r), (i.source = n), i;
          }
          return (
            n.ZT(e, t),
            (e.prototype.complete = function () {
              if (!this.isStopped) {
                var e = this.source,
                  r = this.count;
                if (0 === r) return t.prototype.complete.call(this);
                r > -1 && (this.count = r - 1),
                  e.subscribe(this._unsubscribeAndRecycle());
              }
            }),
            e
          );
        })(p.L);
      function e5(t) {
        return function (e) {
          return e.lift(new e6(t));
        };
      }
      var e6 = (function () {
          function t(t) {
            this.notifier = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new e8(t, this.notifier, e));
            }),
            t
          );
        })(),
        e8 = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.notifier = r),
              (i.source = n),
              (i.sourceIsBeingSubscribedTo = !0),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function () {
              (this.sourceIsBeingSubscribedTo = !0),
                this.source.subscribe(this);
            }),
            (e.prototype.notifyComplete = function () {
              if (!1 === this.sourceIsBeingSubscribedTo)
                return t.prototype.complete.call(this);
            }),
            (e.prototype.complete = function () {
              if (((this.sourceIsBeingSubscribedTo = !1), !this.isStopped)) {
                if (
                  (this.retries || this.subscribeToRetries(),
                  !this.retriesSubscription || this.retriesSubscription.closed)
                )
                  return t.prototype.complete.call(this);
                this._unsubscribeAndRecycle(), this.notifications.next(void 0);
              }
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.notifications,
                e = this.retriesSubscription;
              t && (t.unsubscribe(), (this.notifications = void 0)),
                e && (e.unsubscribe(), (this.retriesSubscription = void 0)),
                (this.retries = void 0);
            }),
            (e.prototype._unsubscribeAndRecycle = function () {
              var e = this._unsubscribe;
              return (
                (this._unsubscribe = null),
                t.prototype._unsubscribeAndRecycle.call(this),
                (this._unsubscribe = e),
                this
              );
            }),
            (e.prototype.subscribeToRetries = function () {
              this.notifications = new eq.xQ();
              try {
                var e;
                e = (0, this.notifier)(this.notifications);
              } catch (e) {
                return t.prototype.complete.call(this);
              }
              (this.retries = e),
                (this.retriesSubscription = (0, i.ft)(e, new i.IY(this)));
            }),
            e
          );
        })(i.Ds);
      function e9(t) {
        return (
          void 0 === t && (t = -1),
          function (e) {
            return e.lift(new e7(t, e));
          }
        );
      }
      var e7 = (function () {
          function t(t, e) {
            (this.count = t), (this.source = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rt(t, this.count, this.source));
            }),
            t
          );
        })(),
        rt = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (i.count = r), (i.source = n), i;
          }
          return (
            n.ZT(e, t),
            (e.prototype.error = function (e) {
              if (!this.isStopped) {
                var r = this.source,
                  n = this.count;
                if (0 === n) return t.prototype.error.call(this, e);
                n > -1 && (this.count = n - 1),
                  r.subscribe(this._unsubscribeAndRecycle());
              }
            }),
            e
          );
        })(p.L);
      function re(t) {
        return function (e) {
          return e.lift(new rr(t, e));
        };
      }
      var rr = (function () {
          function t(t, e) {
            (this.notifier = t), (this.source = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rn(t, this.notifier, this.source));
            }),
            t
          );
        })(),
        rn = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (i.notifier = r), (i.source = n), i;
          }
          return (
            n.ZT(e, t),
            (e.prototype.error = function (e) {
              if (!this.isStopped) {
                var r = this.errors,
                  n = this.retries,
                  o = this.retriesSubscription;
                if (n)
                  (this.errors = void 0), (this.retriesSubscription = void 0);
                else {
                  r = new eq.xQ();
                  try {
                    n = (0, this.notifier)(r);
                  } catch (e) {
                    return t.prototype.error.call(this, e);
                  }
                  o = (0, i.ft)(n, new i.IY(this));
                }
                this._unsubscribeAndRecycle(),
                  (this.errors = r),
                  (this.retries = n),
                  (this.retriesSubscription = o),
                  r.next(e);
              }
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.errors,
                e = this.retriesSubscription;
              t && (t.unsubscribe(), (this.errors = void 0)),
                e && (e.unsubscribe(), (this.retriesSubscription = void 0)),
                (this.retries = void 0);
            }),
            (e.prototype.notifyNext = function () {
              var t = this._unsubscribe;
              (this._unsubscribe = null),
                this._unsubscribeAndRecycle(),
                (this._unsubscribe = t),
                this.source.subscribe(this);
            }),
            e
          );
        })(i.Ds),
        ri = r(46287);
      function ro(t) {
        return function (e) {
          return e.lift(new rs(t));
        };
      }
      var rs = (function () {
          function t(t) {
            this.notifier = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              var r = new ra(t),
                n = e.subscribe(r);
              return n.add((0, i.ft)(this.notifier, new i.IY(r))), n;
            }),
            t
          );
        })(),
        ra = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e.hasValue = !1), e;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              (this.value = t), (this.hasValue = !0);
            }),
            (e.prototype.notifyNext = function () {
              this.emitValue();
            }),
            (e.prototype.notifyComplete = function () {
              this.emitValue();
            }),
            (e.prototype.emitValue = function () {
              this.hasValue &&
                ((this.hasValue = !1), this.destination.next(this.value));
            }),
            e
          );
        })(i.Ds);
      function ru(t, e) {
        return (
          void 0 === e && (e = u.P),
          function (r) {
            return r.lift(new rc(t, e));
          }
        );
      }
      var rc = (function () {
          function t(t, e) {
            (this.period = t), (this.scheduler = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rl(t, this.period, this.scheduler));
            }),
            t
          );
        })(),
        rl = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.period = r),
              (i.scheduler = n),
              (i.hasValue = !1),
              i.add(n.schedule(rh, r, { subscriber: i, period: r })),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              (this.lastValue = t), (this.hasValue = !0);
            }),
            (e.prototype.notifyNext = function () {
              this.hasValue &&
                ((this.hasValue = !1), this.destination.next(this.lastValue));
            }),
            e
          );
        })(p.L);
      function rh(t) {
        var e = t.subscriber,
          r = t.period;
        e.notifyNext(), this.schedule(t, r);
      }
      function rd(t, e) {
        return function (r) {
          return r.lift(new rf(t, e));
        };
      }
      var rf = (function () {
          function t(t, e) {
            (this.compareTo = t), (this.comparator = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rp(t, this.compareTo, this.comparator));
            }),
            t
          );
        })(),
        rp = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.compareTo = r),
              (i.comparator = n),
              (i._a = []),
              (i._b = []),
              (i._oneComplete = !1),
              i.destination.add(r.subscribe(new ry(e, i))),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this._oneComplete && 0 === this._b.length
                ? this.emit(!1)
                : (this._a.push(t), this.checkValues());
            }),
            (e.prototype._complete = function () {
              this._oneComplete
                ? this.emit(0 === this._a.length && 0 === this._b.length)
                : (this._oneComplete = !0),
                this.unsubscribe();
            }),
            (e.prototype.checkValues = function () {
              for (
                var t = this._a, e = this._b, r = this.comparator;
                t.length > 0 && e.length > 0;

              ) {
                var n = t.shift(),
                  i = e.shift(),
                  o = !1;
                try {
                  o = r ? r(n, i) : n === i;
                } catch (t) {
                  this.destination.error(t);
                }
                o || this.emit(!1);
              }
            }),
            (e.prototype.emit = function (t) {
              var e = this.destination;
              e.next(t), e.complete();
            }),
            (e.prototype.nextB = function (t) {
              this._oneComplete && 0 === this._a.length
                ? this.emit(!1)
                : (this._b.push(t), this.checkValues());
            }),
            (e.prototype.completeB = function () {
              this._oneComplete
                ? this.emit(0 === this._a.length && 0 === this._b.length)
                : (this._oneComplete = !0);
            }),
            e
          );
        })(p.L),
        ry = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.parent = r), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.parent.nextB(t);
            }),
            (e.prototype._error = function (t) {
              this.parent.error(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.parent.completeB(), this.unsubscribe();
            }),
            e
          );
        })(p.L);
      function rg() {
        return new eq.xQ();
      }
      function rm() {
        return function (t) {
          return (0, ri.x)()(eL(rg)(t));
        };
      }
      function rb(t, e, r) {
        var n;
        return (
          (n =
            t && "object" == typeof t
              ? t
              : { bufferSize: t, windowTime: e, refCount: !1, scheduler: r }),
          function (t) {
            var e, r, i, o, s, a, u, c, l, h, d;
            return t.lift(
              ((o =
                void 0 === (i = n.bufferSize) ? Number.POSITIVE_INFINITY : i),
              (a =
                void 0 === (s = n.windowTime) ? Number.POSITIVE_INFINITY : s),
              (u = n.refCount),
              (c = n.scheduler),
              (l = 0),
              (h = !1),
              (d = !1),
              function (t) {
                var n;
                l++,
                  !e || h
                    ? ((h = !1),
                      (n = (e = new eK.t(o, a, c)).subscribe(this)),
                      (r = t.subscribe({
                        next: function (t) {
                          e.next(t);
                        },
                        error: function (t) {
                          (h = !0), e.error(t);
                        },
                        complete: function () {
                          (d = !0), (r = void 0), e.complete();
                        },
                      })),
                      d && (r = void 0))
                    : (n = e.subscribe(this)),
                  this.add(function () {
                    l--,
                      n.unsubscribe(),
                      (n = void 0),
                      r &&
                        !d &&
                        u &&
                        0 === l &&
                        (r.unsubscribe(), (r = void 0), (e = void 0));
                  });
              })
            );
          }
        );
      }
      function rv(t) {
        return function (e) {
          return e.lift(new r_(t, e));
        };
      }
      var r_ = (function () {
          function t(t, e) {
            (this.predicate = t), (this.source = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rw(t, this.predicate, this.source));
            }),
            t
          );
        })(),
        rw = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.predicate = r),
              (i.source = n),
              (i.seenValue = !1),
              (i.index = 0),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.applySingleValue = function (t) {
              this.seenValue
                ? this.destination.error(
                    "Sequence contains more than one element"
                  )
                : ((this.seenValue = !0), (this.singleValue = t));
            }),
            (e.prototype._next = function (t) {
              var e = this.index++;
              this.predicate ? this.tryNext(t, e) : this.applySingleValue(t);
            }),
            (e.prototype.tryNext = function (t, e) {
              try {
                this.predicate(t, e, this.source) && this.applySingleValue(t);
              } catch (t) {
                this.destination.error(t);
              }
            }),
            (e.prototype._complete = function () {
              var t = this.destination;
              this.index > 0
                ? (t.next(this.seenValue ? this.singleValue : void 0),
                  t.complete())
                : t.error(new tO.K());
            }),
            e
          );
        })(p.L);
      function rE(t) {
        return function (e) {
          return e.lift(new rS(t));
        };
      }
      var rS = (function () {
          function t(t) {
            this.total = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rM(t, this.total));
            }),
            t
          );
        })(),
        rM = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.total = r), (n.count = 0), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              ++this.count > this.total && this.destination.next(t);
            }),
            e
          );
        })(p.L);
      function rx(t) {
        return function (e) {
          return e.lift(new rk(t));
        };
      }
      var rk = (function () {
          function t(t) {
            if (((this._skipCount = t), this._skipCount < 0)) throw new tN.W();
          }
          return (
            (t.prototype.call = function (t, e) {
              return 0 === this._skipCount
                ? e.subscribe(new p.L(t))
                : e.subscribe(new rC(t, this._skipCount));
            }),
            t
          );
        })(),
        rC = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n._skipCount = r), (n._count = 0), (n._ring = Array(r)), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e = this._skipCount,
                r = this._count++;
              if (r < e) this._ring[r] = t;
              else {
                var n = r % e,
                  i = this._ring,
                  o = i[n];
                (i[n] = t), this.destination.next(o);
              }
            }),
            e
          );
        })(p.L);
      function rI(t) {
        return function (e) {
          return e.lift(new rR(t));
        };
      }
      var rR = (function () {
          function t(t) {
            this.notifier = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rA(t, this.notifier));
            }),
            t
          );
        })(),
        rA = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            n.hasValue = !1;
            var o = new i.IY(n);
            n.add(o), (n.innerSubscription = o);
            var s = (0, i.ft)(r, o);
            return s !== o && (n.add(s), (n.innerSubscription = s)), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (e) {
              this.hasValue && t.prototype._next.call(this, e);
            }),
            (e.prototype.notifyNext = function () {
              (this.hasValue = !0),
                this.innerSubscription && this.innerSubscription.unsubscribe();
            }),
            (e.prototype.notifyComplete = function () {}),
            e
          );
        })(i.Ds);
      function rN(t) {
        return function (e) {
          return e.lift(new rT(t));
        };
      }
      var rT = (function () {
          function t(t) {
            this.predicate = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rO(t, this.predicate));
            }),
            t
          );
        })(),
        rO = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.predicate = r), (n.skipping = !0), (n.index = 0), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e = this.destination;
              this.skipping && this.tryCallPredicate(t),
                this.skipping || e.next(t);
            }),
            (e.prototype.tryCallPredicate = function (t) {
              try {
                var e = this.predicate(t, this.index++);
                this.skipping = !!e;
              } catch (t) {
                this.destination.error(t);
              }
            }),
            e
          );
        })(p.L);
      function rL() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var r = t[t.length - 1];
        return (0, v.K)(r)
          ? (t.pop(),
            function (e) {
              return (0, W.z)(t, e, r);
            })
          : function (e) {
              return (0, W.z)(t, e);
            };
      }
      var rj = r(13220),
        rP = r(64090),
        rD = (function (t) {
          function e(e, r, n) {
            void 0 === r && (r = 0), void 0 === n && (n = rj.e);
            var i = t.call(this) || this;
            return (
              (i.source = e),
              (i.delayTime = r),
              (i.scheduler = n),
              (!(0, rP.k)(r) || r < 0) && (i.delayTime = 0),
              (n && "function" == typeof n.schedule) || (i.scheduler = rj.e),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.create = function (t, r, n) {
              return (
                void 0 === r && (r = 0),
                void 0 === n && (n = rj.e),
                new e(t, r, n)
              );
            }),
            (e.dispatch = function (t) {
              var e = t.source,
                r = t.subscriber;
              return this.add(e.subscribe(r));
            }),
            (e.prototype._subscribe = function (t) {
              var r = this.delayTime,
                n = this.source;
              return this.scheduler.schedule(e.dispatch, r, {
                source: n,
                subscriber: t,
              });
            }),
            e
          );
        })(ty.y);
      function rB(t, e) {
        return (
          void 0 === e && (e = 0),
          function (r) {
            return r.lift(new rF(t, e));
          }
        );
      }
      var rF = (function () {
        function t(t, e) {
          (this.scheduler = t), (this.delay = e);
        }
        return (
          (t.prototype.call = function (t, e) {
            return new rD(e, this.delay, this.scheduler).subscribe(t);
          }),
          t
        );
      })();
      function r$(t, e) {
        return "function" == typeof e
          ? function (r) {
              return r.pipe(
                r$(function (r, n) {
                  return (0, z.D)(t(r, n)).pipe(
                    (0, tQ.U)(function (t, i) {
                      return e(r, t, n, i);
                    })
                  );
                })
              );
            }
          : function (e) {
              return e.lift(new rU(t));
            };
      }
      var rU = (function () {
          function t(t) {
            this.project = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rz(t, this.project));
            }),
            t
          );
        })(),
        rz = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (n.project = r), (n.index = 0), n;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e,
                r = this.index++;
              try {
                e = this.project(t, r);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              this._innerSub(e);
            }),
            (e.prototype._innerSub = function (t) {
              var e = this.innerSubscription;
              e && e.unsubscribe();
              var r = new i.IY(this),
                n = this.destination;
              n.add(r),
                (this.innerSubscription = (0, i.ft)(t, r)),
                this.innerSubscription !== r && n.add(this.innerSubscription);
            }),
            (e.prototype._complete = function () {
              var e = this.innerSubscription;
              (!e || e.closed) && t.prototype._complete.call(this),
                this.unsubscribe();
            }),
            (e.prototype._unsubscribe = function () {
              this.innerSubscription = void 0;
            }),
            (e.prototype.notifyComplete = function () {
              (this.innerSubscription = void 0),
                this.isStopped && t.prototype._complete.call(this);
            }),
            (e.prototype.notifyNext = function (t) {
              this.destination.next(t);
            }),
            e
          );
        })(i.Ds);
      function rV() {
        return r$(et.y);
      }
      function rW(t, e) {
        return e
          ? r$(function () {
              return t;
            }, e)
          : r$(function () {
              return t;
            });
      }
      function rH(t) {
        return function (e) {
          return e.lift(new rq(t));
        };
      }
      var rq = (function () {
          function t(t) {
            this.notifier = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              var r = new rZ(t),
                n = (0, i.ft)(this.notifier, new i.IY(r));
              return n && !r.seenValue ? (r.add(n), e.subscribe(r)) : r;
            }),
            t
          );
        })(),
        rZ = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (r.seenValue = !1), r;
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function () {
              (this.seenValue = !0), this.complete();
            }),
            (e.prototype.notifyComplete = function () {}),
            e
          );
        })(i.Ds);
      function rJ(t, e) {
        return (
          void 0 === e && (e = !1),
          function (r) {
            return r.lift(new rG(t, e));
          }
        );
      }
      var rG = (function () {
          function t(t, e) {
            (this.predicate = t), (this.inclusive = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rY(t, this.predicate, this.inclusive));
            }),
            t
          );
        })(),
        rY = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (i.predicate = r), (i.inclusive = n), (i.index = 0), i;
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e,
                r = this.destination;
              try {
                e = this.predicate(t, this.index++);
              } catch (t) {
                r.error(t);
                return;
              }
              this.nextOrComplete(t, e);
            }),
            (e.prototype.nextOrComplete = function (t, e) {
              var r = this.destination;
              e ? r.next(t) : (this.inclusive && r.next(t), r.complete());
            }),
            e
          );
        })(p.L),
        rQ = r(62082),
        rK = r(23991);
      function rX(t, e, r) {
        return function (n) {
          return n.lift(new r0(t, e, r));
        };
      }
      var r0 = (function () {
          function t(t, e, r) {
            (this.nextOrObserver = t), (this.error = e), (this.complete = r);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new r1(t, this.nextOrObserver, this.error, this.complete)
              );
            }),
            t
          );
        })(),
        r1 = (function (t) {
          function e(e, r, n, i) {
            var o = t.call(this, e) || this;
            return (
              (o._tapNext = rQ.Z),
              (o._tapError = rQ.Z),
              (o._tapComplete = rQ.Z),
              (o._tapError = n || rQ.Z),
              (o._tapComplete = i || rQ.Z),
              (0, rK.m)(r)
                ? ((o._context = o), (o._tapNext = r))
                : r &&
                  ((o._context = r),
                  (o._tapNext = r.next || rQ.Z),
                  (o._tapError = r.error || rQ.Z),
                  (o._tapComplete = r.complete || rQ.Z)),
              o
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              try {
                this._tapNext.call(this._context, t);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              this.destination.next(t);
            }),
            (e.prototype._error = function (t) {
              try {
                this._tapError.call(this._context, t);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              this.destination.error(t);
            }),
            (e.prototype._complete = function () {
              try {
                this._tapComplete.call(this._context);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              return this.destination.complete();
            }),
            e
          );
        })(p.L),
        r2 = { leading: !0, trailing: !1 };
      function r3(t, e) {
        return (
          void 0 === e && (e = r2),
          function (r) {
            return r.lift(new r4(t, !!e.leading, !!e.trailing));
          }
        );
      }
      var r4 = (function () {
          function t(t, e, r) {
            (this.durationSelector = t),
              (this.leading = e),
              (this.trailing = r);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new r5(t, this.durationSelector, this.leading, this.trailing)
              );
            }),
            t
          );
        })(),
        r5 = (function (t) {
          function e(e, r, n, i) {
            var o = t.call(this, e) || this;
            return (
              (o.destination = e),
              (o.durationSelector = r),
              (o._leading = n),
              (o._trailing = i),
              (o._hasValue = !1),
              o
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              (this._hasValue = !0),
                (this._sendValue = t),
                this._throttled ||
                  (this._leading ? this.send() : this.throttle(t));
            }),
            (e.prototype.send = function () {
              var t = this._hasValue,
                e = this._sendValue;
              t && (this.destination.next(e), this.throttle(e)),
                (this._hasValue = !1),
                (this._sendValue = void 0);
            }),
            (e.prototype.throttle = function (t) {
              var e = this.tryDurationSelector(t);
              e && this.add((this._throttled = (0, i.ft)(e, new i.IY(this))));
            }),
            (e.prototype.tryDurationSelector = function (t) {
              try {
                return this.durationSelector(t);
              } catch (t) {
                return this.destination.error(t), null;
              }
            }),
            (e.prototype.throttlingDone = function () {
              var t = this._throttled,
                e = this._trailing;
              t && t.unsubscribe(),
                (this._throttled = void 0),
                e && this.send();
            }),
            (e.prototype.notifyNext = function () {
              this.throttlingDone();
            }),
            (e.prototype.notifyComplete = function () {
              this.throttlingDone();
            }),
            e
          );
        })(i.Ds);
      function r6(t, e, r) {
        return (
          void 0 === e && (e = u.P),
          void 0 === r && (r = r2),
          function (n) {
            return n.lift(new r8(t, e, r.leading, r.trailing));
          }
        );
      }
      var r8 = (function () {
          function t(t, e, r, n) {
            (this.duration = t),
              (this.scheduler = e),
              (this.leading = r),
              (this.trailing = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new r9(
                  t,
                  this.duration,
                  this.scheduler,
                  this.leading,
                  this.trailing
                )
              );
            }),
            t
          );
        })(),
        r9 = (function (t) {
          function e(e, r, n, i, o) {
            var s = t.call(this, e) || this;
            return (
              (s.duration = r),
              (s.scheduler = n),
              (s.leading = i),
              (s.trailing = o),
              (s._hasTrailingValue = !1),
              (s._trailingValue = null),
              s
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              this.throttled
                ? this.trailing &&
                  ((this._trailingValue = t), (this._hasTrailingValue = !0))
                : (this.add(
                    (this.throttled = this.scheduler.schedule(
                      r7,
                      this.duration,
                      { subscriber: this }
                    ))
                  ),
                  this.leading
                    ? this.destination.next(t)
                    : this.trailing &&
                      ((this._trailingValue = t),
                      (this._hasTrailingValue = !0)));
            }),
            (e.prototype._complete = function () {
              this._hasTrailingValue &&
                this.destination.next(this._trailingValue),
                this.destination.complete();
            }),
            (e.prototype.clearThrottle = function () {
              var t = this.throttled;
              t &&
                (this.trailing &&
                  this._hasTrailingValue &&
                  (this.destination.next(this._trailingValue),
                  (this._trailingValue = null),
                  (this._hasTrailingValue = !1)),
                t.unsubscribe(),
                this.remove(t),
                (this.throttled = null));
            }),
            e
          );
        })(p.L);
      function r7(t) {
        t.subscriber.clearThrottle();
      }
      var nt = r(59052);
      function ne(t) {
        return (
          void 0 === t && (t = u.P),
          function (e) {
            return (0, nt.P)(function () {
              return e.pipe(
                ev(
                  function (e, r) {
                    var n = e.current;
                    return { value: r, current: t.now(), last: n };
                  },
                  { current: t.now(), value: void 0, last: void 0 }
                ),
                (0, tQ.U)(function (t) {
                  var e = t.current,
                    r = t.last,
                    n = t.value;
                  return new nr(n, e - r);
                })
              );
            });
          }
        );
      }
      var nr = function (t, e) {
          (this.value = t), (this.interval = e);
        },
        nn = r(64839);
      function ni(t, e, r) {
        return (
          void 0 === r && (r = u.P),
          function (n) {
            var i = tc(t),
              o = i ? +t - r.now() : Math.abs(t);
            return n.lift(new no(o, i, e, r));
          }
        );
      }
      var no = (function () {
          function t(t, e, r, n) {
            (this.waitFor = t),
              (this.absoluteTimeout = e),
              (this.withObservable = r),
              (this.scheduler = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new ns(
                  t,
                  this.absoluteTimeout,
                  this.waitFor,
                  this.withObservable,
                  this.scheduler
                )
              );
            }),
            t
          );
        })(),
        ns = (function (t) {
          function e(e, r, n, i, o) {
            var s = t.call(this, e) || this;
            return (
              (s.absoluteTimeout = r),
              (s.waitFor = n),
              (s.withObservable = i),
              (s.scheduler = o),
              s.scheduleTimeout(),
              s
            );
          }
          return (
            n.ZT(e, t),
            (e.dispatchTimeout = function (t) {
              var e = t.withObservable;
              t._unsubscribeAndRecycle(), t.add((0, i.ft)(e, new i.IY(t)));
            }),
            (e.prototype.scheduleTimeout = function () {
              var t = this.action;
              t
                ? (this.action = t.schedule(this, this.waitFor))
                : this.add(
                    (this.action = this.scheduler.schedule(
                      e.dispatchTimeout,
                      this.waitFor,
                      this
                    ))
                  );
            }),
            (e.prototype._next = function (e) {
              this.absoluteTimeout || this.scheduleTimeout(),
                t.prototype._next.call(this, e);
            }),
            (e.prototype._unsubscribe = function () {
              (this.action = void 0),
                (this.scheduler = null),
                (this.withObservable = null);
            }),
            e
          );
        })(i.Ds),
        na = r(81885);
      function nu(t, e) {
        return void 0 === e && (e = u.P), ni(t, (0, na._)(new nn.W()), e);
      }
      function nc(t) {
        return (
          void 0 === t && (t = u.P),
          (0, tQ.U)(function (e) {
            return new nl(e, t.now());
          })
        );
      }
      var nl = function (t, e) {
        (this.value = t), (this.timestamp = e);
      };
      function nh(t, e, r) {
        return 0 === r ? [e] : (t.push(e), t);
      }
      function nd() {
        return eS(nh, []);
      }
      function nf(t) {
        return function (e) {
          return e.lift(new np(t));
        };
      }
      var np = (function () {
          function t(t) {
            this.windowBoundaries = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              var r = new ny(t),
                n = e.subscribe(r);
              return (
                n.closed ||
                  r.add((0, i.ft)(this.windowBoundaries, new i.IY(r))),
                n
              );
            }),
            t
          );
        })(),
        ny = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (r.window = new eq.xQ()), e.next(r.window), r;
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function () {
              this.openWindow();
            }),
            (e.prototype.notifyError = function (t) {
              this._error(t);
            }),
            (e.prototype.notifyComplete = function () {
              this._complete();
            }),
            (e.prototype._next = function (t) {
              this.window.next(t);
            }),
            (e.prototype._error = function (t) {
              this.window.error(t), this.destination.error(t);
            }),
            (e.prototype._complete = function () {
              this.window.complete(), this.destination.complete();
            }),
            (e.prototype._unsubscribe = function () {
              this.window = null;
            }),
            (e.prototype.openWindow = function () {
              var t = this.window;
              t && t.complete();
              var e = this.destination,
                r = (this.window = new eq.xQ());
              e.next(r);
            }),
            e
          );
        })(i.Ds);
      function ng(t, e) {
        return (
          void 0 === e && (e = 0),
          function (r) {
            return r.lift(new nm(t, e));
          }
        );
      }
      var nm = (function () {
          function t(t, e) {
            (this.windowSize = t), (this.startWindowEvery = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new nb(t, this.windowSize, this.startWindowEvery)
              );
            }),
            t
          );
        })(),
        nb = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.destination = e),
              (i.windowSize = r),
              (i.startWindowEvery = n),
              (i.windows = [new eq.xQ()]),
              (i.count = 0),
              e.next(i.windows[0]),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              for (
                var e =
                    this.startWindowEvery > 0
                      ? this.startWindowEvery
                      : this.windowSize,
                  r = this.destination,
                  n = this.windowSize,
                  i = this.windows,
                  o = i.length,
                  s = 0;
                s < o && !this.closed;
                s++
              )
                i[s].next(t);
              var a = this.count - n + 1;
              if (
                (a >= 0 && a % e == 0 && !this.closed && i.shift().complete(),
                ++this.count % e == 0 && !this.closed)
              ) {
                var u = new eq.xQ();
                i.push(u), r.next(u);
              }
            }),
            (e.prototype._error = function (t) {
              var e = this.windows;
              if (e) for (; e.length > 0 && !this.closed; ) e.shift().error(t);
              this.destination.error(t);
            }),
            (e.prototype._complete = function () {
              var t = this.windows;
              if (t)
                for (; t.length > 0 && !this.closed; ) t.shift().complete();
              this.destination.complete();
            }),
            (e.prototype._unsubscribe = function () {
              (this.count = 0), (this.windows = null);
            }),
            e
          );
        })(p.L);
      function nv(t) {
        var e = u.P,
          r = null,
          n = Number.POSITIVE_INFINITY;
        return (
          (0, v.K)(arguments[3]) && (e = arguments[3]),
          (0, v.K)(arguments[2])
            ? (e = arguments[2])
            : (0, rP.k)(arguments[2]) && (n = Number(arguments[2])),
          (0, v.K)(arguments[1])
            ? (e = arguments[1])
            : (0, rP.k)(arguments[1]) && (r = Number(arguments[1])),
          function (i) {
            return i.lift(new n_(t, r, n, e));
          }
        );
      }
      var n_ = (function () {
          function t(t, e, r, n) {
            (this.windowTimeSpan = t),
              (this.windowCreationInterval = e),
              (this.maxWindowSize = r),
              (this.scheduler = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new nE(
                  t,
                  this.windowTimeSpan,
                  this.windowCreationInterval,
                  this.maxWindowSize,
                  this.scheduler
                )
              );
            }),
            t
          );
        })(),
        nw = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e._numberOfNextedValues = 0), e;
          }
          return (
            n.ZT(e, t),
            (e.prototype.next = function (e) {
              this._numberOfNextedValues++, t.prototype.next.call(this, e);
            }),
            Object.defineProperty(e.prototype, "numberOfNextedValues", {
              get: function () {
                return this._numberOfNextedValues;
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(eq.xQ),
        nE = (function (t) {
          function e(e, r, n, i, o) {
            var s = t.call(this, e) || this;
            (s.destination = e),
              (s.windowTimeSpan = r),
              (s.windowCreationInterval = n),
              (s.maxWindowSize = i),
              (s.scheduler = o),
              (s.windows = []);
            var a = s.openWindow();
            return (
              null !== n && n >= 0
                ? (s.add(
                    o.schedule(nx, r, {
                      subscriber: s,
                      window: a,
                      context: null,
                    })
                  ),
                  s.add(
                    o.schedule(nM, n, {
                      windowTimeSpan: r,
                      windowCreationInterval: n,
                      subscriber: s,
                      scheduler: o,
                    })
                  ))
                : s.add(
                    o.schedule(nS, r, {
                      subscriber: s,
                      window: a,
                      windowTimeSpan: r,
                    })
                  ),
              s
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              for (var e = this.windows, r = e.length, n = 0; n < r; n++) {
                var i = e[n];
                !i.closed &&
                  (i.next(t),
                  i.numberOfNextedValues >= this.maxWindowSize &&
                    this.closeWindow(i));
              }
            }),
            (e.prototype._error = function (t) {
              for (var e = this.windows; e.length > 0; ) e.shift().error(t);
              this.destination.error(t);
            }),
            (e.prototype._complete = function () {
              for (var t = this.windows; t.length > 0; ) {
                var e = t.shift();
                e.closed || e.complete();
              }
              this.destination.complete();
            }),
            (e.prototype.openWindow = function () {
              var t = new nw();
              return this.windows.push(t), this.destination.next(t), t;
            }),
            (e.prototype.closeWindow = function (t) {
              t.complete();
              var e = this.windows;
              e.splice(e.indexOf(t), 1);
            }),
            e
          );
        })(p.L);
      function nS(t) {
        var e = t.subscriber,
          r = t.windowTimeSpan,
          n = t.window;
        n && e.closeWindow(n), (t.window = e.openWindow()), this.schedule(t, r);
      }
      function nM(t) {
        var e = t.windowTimeSpan,
          r = t.subscriber,
          n = t.scheduler,
          i = t.windowCreationInterval,
          o = r.openWindow(),
          s = { action: this, subscription: null };
        (s.subscription = n.schedule(nx, e, {
          subscriber: r,
          window: o,
          context: s,
        })),
          this.add(s.subscription),
          this.schedule(t, i);
      }
      function nx(t) {
        var e = t.subscriber,
          r = t.window,
          n = t.context;
        n && n.action && n.subscription && n.action.remove(n.subscription),
          e.closeWindow(r);
      }
      function nk(t, e) {
        return function (r) {
          return r.lift(new nC(t, e));
        };
      }
      var nC = (function () {
          function t(t, e) {
            (this.openings = t), (this.closingSelector = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new nI(t, this.openings, this.closingSelector)
              );
            }),
            t
          );
        })(),
        nI = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            return (
              (i.openings = r),
              (i.closingSelector = n),
              (i.contexts = []),
              i.add((i.openSubscription = (0, I.D)(i, r, r))),
              i
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype._next = function (t) {
              var e = this.contexts;
              if (e)
                for (var r = e.length, n = 0; n < r; n++) e[n].window.next(t);
            }),
            (e.prototype._error = function (e) {
              var r = this.contexts;
              if (((this.contexts = null), r))
                for (var n = r.length, i = -1; ++i < n; ) {
                  var o = r[i];
                  o.window.error(e), o.subscription.unsubscribe();
                }
              t.prototype._error.call(this, e);
            }),
            (e.prototype._complete = function () {
              var e = this.contexts;
              if (((this.contexts = null), e))
                for (var r = e.length, n = -1; ++n < r; ) {
                  var i = e[n];
                  i.window.complete(), i.subscription.unsubscribe();
                }
              t.prototype._complete.call(this);
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.contexts;
              if (((this.contexts = null), t))
                for (var e = t.length, r = -1; ++r < e; ) {
                  var n = t[r];
                  n.window.unsubscribe(), n.subscription.unsubscribe();
                }
            }),
            (e.prototype.notifyNext = function (t, e, r, n, i) {
              if (t === this.openings) {
                var o = void 0;
                try {
                  o = (0, this.closingSelector)(e);
                } catch (t) {
                  return this.error(t);
                }
                var s = new eq.xQ(),
                  a = new C.w(),
                  u = { window: s, subscription: a };
                this.contexts.push(u);
                var c = (0, I.D)(this, o, u);
                c.closed
                  ? this.closeWindow(this.contexts.length - 1)
                  : ((c.context = u), a.add(c)),
                  this.destination.next(s);
              } else this.closeWindow(this.contexts.indexOf(t));
            }),
            (e.prototype.notifyError = function (t) {
              this.error(t);
            }),
            (e.prototype.notifyComplete = function (t) {
              t !== this.openSubscription &&
                this.closeWindow(this.contexts.indexOf(t.context));
            }),
            (e.prototype.closeWindow = function (t) {
              if (-1 !== t) {
                var e = this.contexts,
                  r = e[t],
                  n = r.window,
                  i = r.subscription;
                e.splice(t, 1), n.complete(), i.unsubscribe();
              }
            }),
            e
          );
        })(R.L);
      function nR(t) {
        return function (e) {
          return e.lift(new nA(t));
        };
      }
      var nA = (function () {
          function t(t) {
            this.closingSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new nN(t, this.closingSelector));
            }),
            t
          );
        })(),
        nN = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return (
              (n.destination = e), (n.closingSelector = r), n.openWindow(), n
            );
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function (t, e, r, n, i) {
              this.openWindow(i);
            }),
            (e.prototype.notifyError = function (t) {
              this._error(t);
            }),
            (e.prototype.notifyComplete = function (t) {
              this.openWindow(t);
            }),
            (e.prototype._next = function (t) {
              this.window.next(t);
            }),
            (e.prototype._error = function (t) {
              this.window.error(t),
                this.destination.error(t),
                this.unsubscribeClosingNotification();
            }),
            (e.prototype._complete = function () {
              this.window.complete(),
                this.destination.complete(),
                this.unsubscribeClosingNotification();
            }),
            (e.prototype.unsubscribeClosingNotification = function () {
              this.closingNotification &&
                this.closingNotification.unsubscribe();
            }),
            (e.prototype.openWindow = function (t) {
              void 0 === t && (t = null),
                t && (this.remove(t), t.unsubscribe());
              var e,
                r = this.window;
              r && r.complete();
              var n = (this.window = new eq.xQ());
              this.destination.next(n);
              try {
                e = (0, this.closingSelector)();
              } catch (t) {
                this.destination.error(t), this.window.error(t);
                return;
              }
              this.add((this.closingNotification = (0, I.D)(this, e)));
            }),
            e
          );
        })(R.L);
      function nT() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e) {
          var r;
          return (
            "function" == typeof t[t.length - 1] && (r = t.pop()),
            e.lift(new nO(t, r))
          );
        };
      }
      var nO = (function () {
          function t(t, e) {
            (this.observables = t), (this.project = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new nL(t, this.observables, this.project));
            }),
            t
          );
        })(),
        nL = (function (t) {
          function e(e, r, n) {
            var i = t.call(this, e) || this;
            (i.observables = r), (i.project = n), (i.toRespond = []);
            var o = r.length;
            i.values = Array(o);
            for (var s = 0; s < o; s++) i.toRespond.push(s);
            for (var s = 0; s < o; s++) {
              var a = r[s];
              i.add((0, I.D)(i, a, void 0, s));
            }
            return i;
          }
          return (
            n.ZT(e, t),
            (e.prototype.notifyNext = function (t, e, r) {
              this.values[r] = e;
              var n = this.toRespond;
              if (n.length > 0) {
                var i = n.indexOf(r);
                -1 !== i && n.splice(i, 1);
              }
            }),
            (e.prototype.notifyComplete = function () {}),
            (e.prototype._next = function (t) {
              if (0 === this.toRespond.length) {
                var e = [t].concat(this.values);
                this.project ? this._tryProject(e) : this.destination.next(e);
              }
            }),
            (e.prototype._tryProject = function (t) {
              var e;
              try {
                e = this.project.apply(this, t);
              } catch (t) {
                this.destination.error(t);
                return;
              }
              this.destination.next(e);
            }),
            e
          );
        })(R.L),
        nj = r(35071);
      function nP() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e) {
          return e.lift.call(nj.$R.apply(void 0, [e].concat(t)));
        };
      }
      function nD(t) {
        return function (e) {
          return e.lift(new nj.mx(t));
        };
      }
    },
    55313: function (t, e, r) {
      "use strict";
      r.d(e, {
        ZT: function () {
          return i;
        },
      });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var n =
        function (t, e) {
          return (n =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            })(t, e);
        };
      function i(t, e) {
        function r() {
          this.constructor = t;
        }
        n(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
    },
    19394: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      let n = r(17187);
      function i(t, e, r) {
        try {
          Reflect.apply(t, e, r);
        } catch (t) {
          setTimeout(() => {
            throw t;
          });
        }
      }
      class o extends n.EventEmitter {
        emit(t, ...e) {
          let r = "error" === t,
            n = this._events;
          if (void 0 !== n) r = r && void 0 === n.error;
          else if (!r) return !1;
          if (r) {
            let t;
            if ((e.length > 0 && ([t] = e), t instanceof Error)) throw t;
            let r = Error(`Unhandled error.${t ? ` (${t.message})` : ""}`);
            throw ((r.context = t), r);
          }
          let o = n[t];
          if (void 0 === o) return !1;
          if ("function" == typeof o) i(o, this, e);
          else {
            let t = o.length,
              r = (function (t) {
                let e = t.length,
                  r = Array(e);
                for (let n = 0; n < e; n += 1) r[n] = t[n];
                return r;
              })(o);
            for (let n = 0; n < t; n += 1) i(r[n], this, e);
          }
          return !0;
        }
      }
      e.default = o;
    },
    31422: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.assertExhaustive =
          e.assertStruct =
          e.assert =
          e.AssertionError =
            void 0);
      let n = r(11821);
      function i(t, e) {
        var r, n;
        return "string" ==
          typeof (null ===
            (n =
              null === (r = null == t ? void 0 : t.prototype) || void 0 === r
                ? void 0
                : r.constructor) || void 0 === n
            ? void 0
            : n.name)
          ? new t({ message: e })
          : t({ message: e });
      }
      class o extends Error {
        constructor(t) {
          super(t.message), (this.code = "ERR_ASSERTION");
        }
      }
      (e.AssertionError = o),
        (e.assert = function (t, e = "Assertion failed.", r = o) {
          if (!t) {
            if (e instanceof Error) throw e;
            throw i(r, e);
          }
        }),
        (e.assertStruct = function (t, e, r = "Assertion failed", s = o) {
          try {
            (0, n.assert)(t, e);
          } catch (t) {
            throw i(
              s,
              `${r}: ${(function (t) {
                let e =
                  "object" == typeof t && null !== t && "message" in t
                    ? t.message
                    : String(t);
                return e.endsWith(".") ? e.slice(0, -1) : e;
              })(t)}.`
            );
          }
        }),
        (e.assertExhaustive = function (t) {
          throw Error(
            "Invalid branch reached. Should be detected during compilation."
          );
        });
    },
    47207: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.base64 = void 0);
      let n = r(11821),
        i = r(31422);
      e.base64 = (t, e = {}) => {
        var r, o;
        let s, a;
        let u = null !== (r = e.paddingRequired) && void 0 !== r && r,
          c = null !== (o = e.characterSet) && void 0 !== o ? o : "base64";
        return (
          "base64" === c
            ? (s = String.raw`[A-Za-z0-9+\/]`)
            : ((0, i.assert)("base64url" === c),
              (s = String.raw`[-_A-Za-z0-9]`)),
          (a = u
            ? RegExp(`^(?:${s}{4})*(?:${s}{3}=|${s}{2}==)?$`, "u")
            : RegExp(`^(?:${s}{4})*(?:${s}{2,3}|${s}{3}=|${s}{2}==)?$`, "u")),
          (0, n.pattern)(t, a)
        );
      };
    },
    8476: function (t, e, r) {
      "use strict";
      var n = r(48764).Buffer;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createDataView =
          e.concatBytes =
          e.valueToBytes =
          e.stringToBytes =
          e.numberToBytes =
          e.signedBigIntToBytes =
          e.bigIntToBytes =
          e.hexToBytes =
          e.bytesToString =
          e.bytesToNumber =
          e.bytesToSignedBigInt =
          e.bytesToBigInt =
          e.bytesToHex =
          e.assertIsBytes =
          e.isBytes =
            void 0);
      let i = r(31422),
        o = r(62009),
        s = (function () {
          let t = [];
          return () => {
            if (0 === t.length)
              for (let e = 0; e < 256; e++)
                t.push(e.toString(16).padStart(2, "0"));
            return t;
          };
        })();
      function a(t) {
        return t instanceof Uint8Array;
      }
      function u(t) {
        (0, i.assert)(a(t), "Value must be a Uint8Array.");
      }
      function c(t) {
        if ((u(t), 0 === t.length)) return "0x";
        let e = s(),
          r = Array(t.length);
        for (let n = 0; n < t.length; n++) r[n] = e[t[n]];
        return (0, o.add0x)(r.join(""));
      }
      function l(t) {
        u(t);
        let e = c(t);
        return BigInt(e);
      }
      function h(t) {
        var e;
        if (
          (null === (e = null == t ? void 0 : t.toLowerCase) || void 0 === e
            ? void 0
            : e.call(t)) === "0x"
        )
          return new Uint8Array();
        (0, o.assertIsHexString)(t);
        let r = (0, o.remove0x)(t).toLowerCase(),
          n = r.length % 2 == 0 ? r : `0${r}`,
          i = new Uint8Array(n.length / 2);
        for (let t = 0; t < i.length; t++) {
          let e = n.charCodeAt(2 * t),
            r = n.charCodeAt(2 * t + 1),
            o = e - (e < 58 ? 48 : 87),
            s = r - (r < 58 ? 48 : 87);
          i[t] = 16 * o + s;
        }
        return i;
      }
      function d(t) {
        (0, i.assert)("bigint" == typeof t, "Value must be a bigint."),
          (0, i.assert)(t >= BigInt(0), "Value must be a non-negative bigint.");
        let e = t.toString(16);
        return h(e);
      }
      function f(t) {
        (0, i.assert)("number" == typeof t, "Value must be a number."),
          (0, i.assert)(t >= 0, "Value must be a non-negative number."),
          (0, i.assert)(
            Number.isSafeInteger(t),
            "Value is not a safe integer. Use `bigIntToBytes` instead."
          );
        let e = t.toString(16);
        return h(e);
      }
      function p(t) {
        return (
          (0, i.assert)("string" == typeof t, "Value must be a string."),
          new TextEncoder().encode(t)
        );
      }
      function y(t) {
        if ("bigint" == typeof t) return d(t);
        if ("number" == typeof t) return f(t);
        if ("string" == typeof t) return t.startsWith("0x") ? h(t) : p(t);
        if (a(t)) return t;
        throw TypeError(`Unsupported value type: "${typeof t}".`);
      }
      (e.isBytes = a),
        (e.assertIsBytes = u),
        (e.bytesToHex = c),
        (e.bytesToBigInt = l),
        (e.bytesToSignedBigInt = function (t) {
          u(t);
          let e = BigInt(0);
          for (let r of t) e = (e << BigInt(8)) + BigInt(r);
          return BigInt.asIntN(8 * t.length, e);
        }),
        (e.bytesToNumber = function (t) {
          u(t);
          let e = l(t);
          return (
            (0, i.assert)(
              e <= BigInt(Number.MAX_SAFE_INTEGER),
              "Number is not a safe integer. Use `bytesToBigInt` instead."
            ),
            Number(e)
          );
        }),
        (e.bytesToString = function (t) {
          return u(t), new TextDecoder().decode(t);
        }),
        (e.hexToBytes = h),
        (e.bigIntToBytes = d),
        (e.signedBigIntToBytes = function (t, e) {
          (0, i.assert)("bigint" == typeof t, "Value must be a bigint."),
            (0, i.assert)(
              "number" == typeof e,
              "Byte length must be a number."
            ),
            (0, i.assert)(e > 0, "Byte length must be greater than 0."),
            (0, i.assert)(
              (function (t, e) {
                (0, i.assert)(e > 0);
                let r = t >> BigInt(31);
                return !(((~t & r) + (t & ~r)) >> BigInt(8 * e + -1));
              })(t, e),
              "Byte length is too small to represent the given value."
            );
          let r = t,
            n = new Uint8Array(e);
          for (let t = 0; t < n.length; t++)
            (n[t] = Number(BigInt.asUintN(8, r))), (r >>= BigInt(8));
          return n.reverse();
        }),
        (e.numberToBytes = f),
        (e.stringToBytes = p),
        (e.valueToBytes = y),
        (e.concatBytes = function (t) {
          let e = Array(t.length),
            r = 0;
          for (let n = 0; n < t.length; n++) {
            let i = y(t[n]);
            (e[n] = i), (r += i.length);
          }
          let n = new Uint8Array(r);
          for (let t = 0, r = 0; t < e.length; t++)
            n.set(e[t], r), (r += e[t].length);
          return n;
        }),
        (e.createDataView = function (t) {
          if (void 0 !== n && t instanceof n) {
            let e = t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
            return new DataView(e);
          }
          return new DataView(t.buffer, t.byteOffset, t.byteLength);
        });
    },
    85013: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ChecksumStruct = void 0);
      let n = r(11821),
        i = r(47207);
      e.ChecksumStruct = (0, n.size)(
        (0, i.base64)((0, n.string)(), { paddingRequired: !0 }),
        44,
        44
      );
    },
    73557: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createHex =
          e.createBytes =
          e.createBigInt =
          e.createNumber =
            void 0);
      let n = r(11821),
        i = r(31422),
        o = r(8476),
        s = r(62009),
        a = (0, n.union)([
          (0, n.number)(),
          (0, n.bigint)(),
          (0, n.string)(),
          s.StrictHexStruct,
        ]),
        u = (0, n.coerce)((0, n.number)(), a, Number),
        c = (0, n.coerce)((0, n.bigint)(), a, BigInt);
      (0, n.union)([s.StrictHexStruct, (0, n.instance)(Uint8Array)]);
      let l = (0, n.coerce)(
          (0, n.instance)(Uint8Array),
          (0, n.union)([s.StrictHexStruct]),
          o.hexToBytes
        ),
        h = (0, n.coerce)(
          s.StrictHexStruct,
          (0, n.instance)(Uint8Array),
          o.bytesToHex
        );
      (e.createNumber = function (t) {
        try {
          let e = (0, n.create)(t, u);
          return (
            (0, i.assert)(
              Number.isFinite(e),
              `Expected a number-like value, got "${t}".`
            ),
            e
          );
        } catch (e) {
          if (e instanceof n.StructError)
            throw Error(`Expected a number-like value, got "${t}".`);
          throw e;
        }
      }),
        (e.createBigInt = function (t) {
          try {
            return (0, n.create)(t, c);
          } catch (t) {
            if (t instanceof n.StructError)
              throw Error(
                `Expected a number-like value, got "${String(t.value)}".`
              );
            throw t;
          }
        }),
        (e.createBytes = function (t) {
          if ("string" == typeof t && "0x" === t.toLowerCase())
            return new Uint8Array();
          try {
            return (0, n.create)(t, l);
          } catch (t) {
            if (t instanceof n.StructError)
              throw Error(
                `Expected a bytes-like value, got "${String(t.value)}".`
              );
            throw t;
          }
        }),
        (e.createHex = function (t) {
          if (
            (t instanceof Uint8Array && 0 === t.length) ||
            ("string" == typeof t && "0x" === t.toLowerCase())
          )
            return "0x";
          try {
            return (0, n.create)(t, h);
          } catch (t) {
            if (t instanceof n.StructError)
              throw Error(
                `Expected a bytes-like value, got "${String(t.value)}".`
              );
            throw t;
          }
        });
    },
    94283: function (t, e) {
      "use strict";
      var r,
        n,
        i =
          (this && this.__classPrivateFieldSet) ||
          function (t, e, r, n, i) {
            if ("m" === n) throw TypeError("Private method is not writable");
            if ("a" === n && !i)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof e ? t !== e || !i : !e.has(t))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === n ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r
            );
          },
        o =
          (this && this.__classPrivateFieldGet) ||
          function (t, e, r, n) {
            if ("a" === r && !n)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof e ? t !== e || !n : !e.has(t))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === r
              ? n
              : "a" === r
              ? n.call(t)
              : n
              ? n.value
              : e.get(t);
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.FrozenSet = e.FrozenMap = void 0);
      class s {
        constructor(t) {
          r.set(this, void 0), i(this, r, new Map(t), "f"), Object.freeze(this);
        }
        get size() {
          return o(this, r, "f").size;
        }
        [((r = new WeakMap()), Symbol.iterator)]() {
          return o(this, r, "f")[Symbol.iterator]();
        }
        entries() {
          return o(this, r, "f").entries();
        }
        forEach(t, e) {
          return o(this, r, "f").forEach((r, n, i) => t.call(e, r, n, this));
        }
        get(t) {
          return o(this, r, "f").get(t);
        }
        has(t) {
          return o(this, r, "f").has(t);
        }
        keys() {
          return o(this, r, "f").keys();
        }
        values() {
          return o(this, r, "f").values();
        }
        toString() {
          return `FrozenMap(${this.size}) {${
            this.size > 0
              ? ` ${[...this.entries()]
                  .map(([t, e]) => `${String(t)} => ${String(e)}`)
                  .join(", ")} `
              : ""
          }}`;
        }
      }
      e.FrozenMap = s;
      class a {
        constructor(t) {
          n.set(this, void 0), i(this, n, new Set(t), "f"), Object.freeze(this);
        }
        get size() {
          return o(this, n, "f").size;
        }
        [((n = new WeakMap()), Symbol.iterator)]() {
          return o(this, n, "f")[Symbol.iterator]();
        }
        entries() {
          return o(this, n, "f").entries();
        }
        forEach(t, e) {
          return o(this, n, "f").forEach((r, n, i) => t.call(e, r, n, this));
        }
        has(t) {
          return o(this, n, "f").has(t);
        }
        keys() {
          return o(this, n, "f").keys();
        }
        values() {
          return o(this, n, "f").values();
        }
        toString() {
          return `FrozenSet(${this.size}) {${
            this.size > 0
              ? ` ${[...this.values()].map((t) => String(t)).join(", ")} `
              : ""
          }}`;
        }
      }
      (e.FrozenSet = a),
        Object.freeze(s),
        Object.freeze(s.prototype),
        Object.freeze(a),
        Object.freeze(a.prototype);
    },
    62009: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.remove0x =
          e.add0x =
          e.assertIsStrictHexString =
          e.assertIsHexString =
          e.isStrictHexString =
          e.isHexString =
          e.StrictHexStruct =
          e.HexStruct =
            void 0);
      let n = r(11821),
        i = r(31422);
      function o(t) {
        return (0, n.is)(t, e.HexStruct);
      }
      function s(t) {
        return (0, n.is)(t, e.StrictHexStruct);
      }
      (e.HexStruct = (0, n.pattern)((0, n.string)(), /^(?:0x)?[0-9a-f]+$/iu)),
        (e.StrictHexStruct = (0, n.pattern)(
          (0, n.string)(),
          /^0x[0-9a-f]+$/iu
        )),
        (e.isHexString = o),
        (e.isStrictHexString = s),
        (e.assertIsHexString = function (t) {
          (0, i.assert)(o(t), "Value must be a hexadecimal string.");
        }),
        (e.assertIsStrictHexString = function (t) {
          (0, i.assert)(
            s(t),
            'Value must be a hexadecimal string, starting with "0x".'
          );
        }),
        (e.add0x = function (t) {
          return t.startsWith("0x")
            ? t
            : t.startsWith("0X")
            ? `0x${t.substring(2)}`
            : `0x${t}`;
        }),
        (e.remove0x = function (t) {
          return t.startsWith("0x") || t.startsWith("0X") ? t.substring(2) : t;
        });
    },
    42451: function (t, e, r) {
      "use strict";
      var n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (t, e, r, n) {
                void 0 === n && (n = r);
                var i = Object.getOwnPropertyDescriptor(e, r);
                (!i ||
                  ("get" in i
                    ? !e.__esModule
                    : i.writable || i.configurable)) &&
                  (i = {
                    enumerable: !0,
                    get: function () {
                      return e[r];
                    },
                  }),
                  Object.defineProperty(t, n, i);
              }
            : function (t, e, r, n) {
                void 0 === n && (n = r), (t[n] = e[r]);
              }),
        i =
          (this && this.__exportStar) ||
          function (t, e) {
            for (var r in t)
              "default" === r ||
                Object.prototype.hasOwnProperty.call(e, r) ||
                n(e, t, r);
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        i(r(31422), e),
        i(r(47207), e),
        i(r(8476), e),
        i(r(85013), e),
        i(r(73557), e),
        i(r(94283), e),
        i(r(62009), e),
        i(r(22497), e),
        i(r(20160), e),
        i(r(66215), e),
        i(r(89679), e),
        i(r(99108), e),
        i(r(97772), e),
        i(r(88426), e);
    },
    22497: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.validateJsonAndGetSize =
          e.getJsonRpcIdValidator =
          e.assertIsJsonRpcError =
          e.isJsonRpcError =
          e.assertIsJsonRpcFailure =
          e.isJsonRpcFailure =
          e.assertIsJsonRpcSuccess =
          e.isJsonRpcSuccess =
          e.assertIsJsonRpcResponse =
          e.isJsonRpcResponse =
          e.assertIsPendingJsonRpcResponse =
          e.isPendingJsonRpcResponse =
          e.JsonRpcResponseStruct =
          e.JsonRpcFailureStruct =
          e.JsonRpcSuccessStruct =
          e.PendingJsonRpcResponseStruct =
          e.assertIsJsonRpcRequest =
          e.isJsonRpcRequest =
          e.assertIsJsonRpcNotification =
          e.isJsonRpcNotification =
          e.JsonRpcNotificationStruct =
          e.JsonRpcRequestStruct =
          e.JsonRpcParamsStruct =
          e.JsonRpcErrorStruct =
          e.JsonRpcIdStruct =
          e.JsonRpcVersionStruct =
          e.jsonrpc2 =
          e.isValidJson =
          e.JsonStruct =
            void 0);
      let n = r(11821),
        i = r(31422),
        o = r(66215);
      function s(t, e = !1) {
        let r = new Set();
        return (function t(e, n) {
          if (void 0 === e) return [!1, 0];
          if (null === e) return [!0, n ? 0 : o.JsonSize.Null];
          let i = typeof e;
          try {
            if ("function" === i) return [!1, 0];
            if ("string" === i || e instanceof String)
              return [
                !0,
                n ? 0 : (0, o.calculateStringSize)(e) + 2 * o.JsonSize.Quote,
              ];
            if ("boolean" === i || e instanceof Boolean) {
              if (n) return [!0, 0];
              return [!0, !0 == e ? o.JsonSize.True : o.JsonSize.False];
            }
            if ("number" === i || e instanceof Number) {
              if (n) return [!0, 0];
              return [!0, (0, o.calculateNumberSize)(e)];
            } else if (e instanceof Date) {
              if (n) return [!0, 0];
              return [
                !0,
                isNaN(e.getDate())
                  ? o.JsonSize.Null
                  : o.JsonSize.Date + 2 * o.JsonSize.Quote,
              ];
            }
          } catch (t) {
            return [!1, 0];
          }
          if ((!(0, o.isPlainObject)(e) && !Array.isArray(e)) || r.has(e))
            return [!1, 0];
          r.add(e);
          try {
            return [
              !0,
              Object.entries(e).reduce(
                (i, [s, a], u, c) => {
                  let [l, h] = t(a, n);
                  if (!l)
                    throw Error(
                      "JSON validation did not pass. Validation process stopped."
                    );
                  if ((r.delete(e), n)) return 0;
                  let d = Array.isArray(e)
                      ? 0
                      : s.length + o.JsonSize.Comma + 2 * o.JsonSize.Colon,
                    f = u < c.length - 1 ? o.JsonSize.Comma : 0;
                  return i + d + h + f;
                },
                n ? 0 : 2 * o.JsonSize.Wrapper
              ),
            ];
          } catch (t) {
            return [!1, 0];
          }
        })(t, e);
      }
      (e.JsonStruct = (0, n.define)("Json", (t) => {
        let [e] = s(t, !0);
        return !!e || "Expected a valid JSON-serializable value";
      })),
        (e.isValidJson = function (t) {
          return (0, n.is)(t, e.JsonStruct);
        }),
        (e.jsonrpc2 = "2.0"),
        (e.JsonRpcVersionStruct = (0, n.literal)(e.jsonrpc2)),
        (e.JsonRpcIdStruct = (0, n.nullable)(
          (0, n.union)([(0, n.number)(), (0, n.string)()])
        )),
        (e.JsonRpcErrorStruct = (0, n.object)({
          code: (0, n.integer)(),
          message: (0, n.string)(),
          data: (0, n.optional)(e.JsonStruct),
          stack: (0, n.optional)((0, n.string)()),
        })),
        (e.JsonRpcParamsStruct = (0, n.optional)(
          (0, n.union)([
            (0, n.record)((0, n.string)(), e.JsonStruct),
            (0, n.array)(e.JsonStruct),
          ])
        )),
        (e.JsonRpcRequestStruct = (0, n.object)({
          id: e.JsonRpcIdStruct,
          jsonrpc: e.JsonRpcVersionStruct,
          method: (0, n.string)(),
          params: e.JsonRpcParamsStruct,
        })),
        (e.JsonRpcNotificationStruct = (0, n.omit)(e.JsonRpcRequestStruct, [
          "id",
        ])),
        (e.isJsonRpcNotification = function (t) {
          return (0, n.is)(t, e.JsonRpcNotificationStruct);
        }),
        (e.assertIsJsonRpcNotification = function (t, r) {
          (0, i.assertStruct)(
            t,
            e.JsonRpcNotificationStruct,
            "Invalid JSON-RPC notification",
            r
          );
        }),
        (e.isJsonRpcRequest = function (t) {
          return (0, n.is)(t, e.JsonRpcRequestStruct);
        }),
        (e.assertIsJsonRpcRequest = function (t, r) {
          (0, i.assertStruct)(
            t,
            e.JsonRpcRequestStruct,
            "Invalid JSON-RPC request",
            r
          );
        }),
        (e.PendingJsonRpcResponseStruct = (0, n.object)({
          id: e.JsonRpcIdStruct,
          jsonrpc: e.JsonRpcVersionStruct,
          result: (0, n.optional)((0, n.unknown)()),
          error: (0, n.optional)(e.JsonRpcErrorStruct),
        })),
        (e.JsonRpcSuccessStruct = (0, n.object)({
          id: e.JsonRpcIdStruct,
          jsonrpc: e.JsonRpcVersionStruct,
          result: e.JsonStruct,
        })),
        (e.JsonRpcFailureStruct = (0, n.object)({
          id: e.JsonRpcIdStruct,
          jsonrpc: e.JsonRpcVersionStruct,
          error: e.JsonRpcErrorStruct,
        })),
        (e.JsonRpcResponseStruct = (0, n.union)([
          e.JsonRpcSuccessStruct,
          e.JsonRpcFailureStruct,
        ])),
        (e.isPendingJsonRpcResponse = function (t) {
          return (0, n.is)(t, e.PendingJsonRpcResponseStruct);
        }),
        (e.assertIsPendingJsonRpcResponse = function (t, r) {
          (0, i.assertStruct)(
            t,
            e.PendingJsonRpcResponseStruct,
            "Invalid pending JSON-RPC response",
            r
          );
        }),
        (e.isJsonRpcResponse = function (t) {
          return (0, n.is)(t, e.JsonRpcResponseStruct);
        }),
        (e.assertIsJsonRpcResponse = function (t, r) {
          (0, i.assertStruct)(
            t,
            e.JsonRpcResponseStruct,
            "Invalid JSON-RPC response",
            r
          );
        }),
        (e.isJsonRpcSuccess = function (t) {
          return (0, n.is)(t, e.JsonRpcSuccessStruct);
        }),
        (e.assertIsJsonRpcSuccess = function (t, r) {
          (0, i.assertStruct)(
            t,
            e.JsonRpcSuccessStruct,
            "Invalid JSON-RPC success response",
            r
          );
        }),
        (e.isJsonRpcFailure = function (t) {
          return (0, n.is)(t, e.JsonRpcFailureStruct);
        }),
        (e.assertIsJsonRpcFailure = function (t, r) {
          (0, i.assertStruct)(
            t,
            e.JsonRpcFailureStruct,
            "Invalid JSON-RPC failure response",
            r
          );
        }),
        (e.isJsonRpcError = function (t) {
          return (0, n.is)(t, e.JsonRpcErrorStruct);
        }),
        (e.assertIsJsonRpcError = function (t, r) {
          (0, i.assertStruct)(
            t,
            e.JsonRpcErrorStruct,
            "Invalid JSON-RPC error",
            r
          );
        }),
        (e.getJsonRpcIdValidator = function (t) {
          let {
            permitEmptyString: e,
            permitFractions: r,
            permitNull: n,
          } = Object.assign(
            { permitEmptyString: !0, permitFractions: !1, permitNull: !0 },
            t
          );
          return (t) =>
            !!(
              ("number" == typeof t && (r || Number.isInteger(t))) ||
              ("string" == typeof t && (e || t.length > 0)) ||
              (n && null === t)
            );
        }),
        (e.validateJsonAndGetSize = s);
    },
    20160: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createModuleLogger = e.createProjectLogger = void 0);
      let i = n(r(11227)),
        o = (0, i.default)("metamask");
      (e.createProjectLogger = function (t) {
        return o.extend(t);
      }),
        (e.createModuleLogger = function (t, e) {
          return t.extend(e);
        });
    },
    66215: function (t, e) {
      "use strict";
      var r;
      function n(t) {
        return 127 >= t.charCodeAt(0);
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.calculateNumberSize =
          e.calculateStringSize =
          e.isASCII =
          e.isPlainObject =
          e.ESCAPE_CHARACTERS_REGEXP =
          e.JsonSize =
          e.hasProperty =
          e.isObject =
          e.isNullOrUndefined =
          e.isNonEmptyArray =
            void 0),
        (e.isNonEmptyArray = function (t) {
          return Array.isArray(t) && t.length > 0;
        }),
        (e.isNullOrUndefined = function (t) {
          return null == t;
        }),
        (e.isObject = function (t) {
          return !!t && "object" == typeof t && !Array.isArray(t);
        }),
        (e.hasProperty = (t, e) => Object.hasOwnProperty.call(t, e)),
        ((r = e.JsonSize || (e.JsonSize = {}))[(r.Null = 4)] = "Null"),
        (r[(r.Comma = 1)] = "Comma"),
        (r[(r.Wrapper = 1)] = "Wrapper"),
        (r[(r.True = 4)] = "True"),
        (r[(r.False = 5)] = "False"),
        (r[(r.Quote = 1)] = "Quote"),
        (r[(r.Colon = 1)] = "Colon"),
        (r[(r.Date = 24)] = "Date"),
        (e.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu),
        (e.isPlainObject = function (t) {
          if ("object" != typeof t || null === t) return !1;
          try {
            let e = t;
            for (; null !== Object.getPrototypeOf(e); )
              e = Object.getPrototypeOf(e);
            return Object.getPrototypeOf(t) === e;
          } catch (t) {
            return !1;
          }
        }),
        (e.isASCII = n),
        (e.calculateStringSize = function (t) {
          var r;
          let i = t.split("").reduce((t, e) => (n(e) ? t + 1 : t + 2), 0);
          return (
            i +
            (null !== (r = t.match(e.ESCAPE_CHARACTERS_REGEXP)) && void 0 !== r
              ? r
              : []
            ).length
          );
        }),
        (e.calculateNumberSize = function (t) {
          return t.toString().length;
        });
    },
    89679: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.hexToBigInt =
          e.hexToNumber =
          e.bigIntToHex =
          e.numberToHex =
            void 0);
      let n = r(31422),
        i = r(62009);
      (e.numberToHex = (t) => (
        (0, n.assert)("number" == typeof t, "Value must be a number."),
        (0, n.assert)(t >= 0, "Value must be a non-negative number."),
        (0, n.assert)(
          Number.isSafeInteger(t),
          "Value is not a safe integer. Use `bigIntToHex` instead."
        ),
        (0, i.add0x)(t.toString(16))
      )),
        (e.bigIntToHex = (t) => (
          (0, n.assert)("bigint" == typeof t, "Value must be a bigint."),
          (0, n.assert)(t >= 0, "Value must be a non-negative bigint."),
          (0, i.add0x)(t.toString(16))
        )),
        (e.hexToNumber = (t) => {
          (0, i.assertIsHexString)(t);
          let e = parseInt(t, 16);
          return (
            (0, n.assert)(
              Number.isSafeInteger(e),
              "Value is not a safe integer. Use `hexToBigInt` instead."
            ),
            e
          );
        }),
        (e.hexToBigInt = (t) => (
          (0, i.assertIsHexString)(t), BigInt((0, i.add0x)(t))
        ));
    },
    99108: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
    },
    97772: function (t, e) {
      "use strict";
      var r;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.timeSince = e.inMilliseconds = e.Duration = void 0),
        ((r = e.Duration || (e.Duration = {}))[(r.Millisecond = 1)] =
          "Millisecond"),
        (r[(r.Second = 1e3)] = "Second"),
        (r[(r.Minute = 6e4)] = "Minute"),
        (r[(r.Hour = 36e5)] = "Hour"),
        (r[(r.Day = 864e5)] = "Day"),
        (r[(r.Week = 6048e5)] = "Week"),
        (r[(r.Year = 31536e6)] = "Year");
      let n = (t) => Number.isInteger(t) && t >= 0,
        i = (t, e) => {
          if (!n(t))
            throw Error(
              `"${e}" must be a non-negative integer. Received: "${t}".`
            );
        };
      (e.inMilliseconds = function (t, e) {
        return i(t, "count"), t * e;
      }),
        (e.timeSince = function (t) {
          return i(t, "timestamp"), Date.now() - t;
        });
    },
    88426: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.satisfiesVersionRange =
          e.gtRange =
          e.gtVersion =
          e.assertIsSemVerRange =
          e.assertIsSemVerVersion =
          e.isValidSemVerRange =
          e.isValidSemVerVersion =
          e.VersionRangeStruct =
          e.VersionStruct =
            void 0);
      let n = r(45393),
        i = r(11821),
        o = r(31422);
      (e.VersionStruct = (0, i.refine)(
        (0, i.string)(),
        "Version",
        (t) => null !== (0, n.valid)(t) || `Expected SemVer version, got "${t}"`
      )),
        (e.VersionRangeStruct = (0, i.refine)(
          (0, i.string)(),
          "Version range",
          (t) =>
            null !== (0, n.validRange)(t) || `Expected SemVer range, got "${t}"`
        )),
        (e.isValidSemVerVersion = function (t) {
          return (0, i.is)(t, e.VersionStruct);
        }),
        (e.isValidSemVerRange = function (t) {
          return (0, i.is)(t, e.VersionRangeStruct);
        }),
        (e.assertIsSemVerVersion = function (t) {
          (0, o.assertStruct)(t, e.VersionStruct);
        }),
        (e.assertIsSemVerRange = function (t) {
          (0, o.assertStruct)(t, e.VersionRangeStruct);
        }),
        (e.gtVersion = function (t, e) {
          return (0, n.gt)(t, e);
        }),
        (e.gtRange = function (t, e) {
          return (0, n.gtr)(t, e);
        }),
        (e.satisfiesVersionRange = function (t, e) {
          return (0, n.satisfies)(t, e, { includePrerelease: !0 });
        });
    },
    67809: function (t, e, r) {
      let n = Symbol("SemVer ANY");
      class i {
        static get ANY() {
          return n;
        }
        constructor(t, e) {
          if (((e = o(e)), t instanceof i)) {
            if (!!e.loose === t.loose) return t;
            t = t.value;
          }
          c("comparator", t, e),
            (this.options = e),
            (this.loose = !!e.loose),
            this.parse(t),
            this.semver === n
              ? (this.value = "")
              : (this.value = this.operator + this.semver.version),
            c("comp", this);
        }
        parse(t) {
          let e = this.options.loose ? s[a.COMPARATORLOOSE] : s[a.COMPARATOR],
            r = t.match(e);
          if (!r) throw TypeError(`Invalid comparator: ${t}`);
          (this.operator = void 0 !== r[1] ? r[1] : ""),
            "=" === this.operator && (this.operator = ""),
            r[2]
              ? (this.semver = new l(r[2], this.options.loose))
              : (this.semver = n);
        }
        toString() {
          return this.value;
        }
        test(t) {
          if (
            (c("Comparator.test", t, this.options.loose),
            this.semver === n || t === n)
          )
            return !0;
          if ("string" == typeof t)
            try {
              t = new l(t, this.options);
            } catch (t) {
              return !1;
            }
          return u(t, this.operator, this.semver, this.options);
        }
        intersects(t, e) {
          if (!(t instanceof i)) throw TypeError("a Comparator is required");
          return "" === this.operator
            ? "" === this.value || new h(t.value, e).test(this.value)
            : "" === t.operator
            ? "" === t.value || new h(this.value, e).test(t.semver)
            : !(
                ((e = o(e)).includePrerelease &&
                  ("<0.0.0-0" === this.value || "<0.0.0-0" === t.value)) ||
                (!e.includePrerelease &&
                  (this.value.startsWith("<0.0.0") ||
                    t.value.startsWith("<0.0.0")))
              ) &&
              !!(
                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                (this.semver.version === t.semver.version &&
                  this.operator.includes("=") &&
                  t.operator.includes("=")) ||
                (u(this.semver, "<", t.semver, e) &&
                  this.operator.startsWith(">") &&
                  t.operator.startsWith("<")) ||
                (u(this.semver, ">", t.semver, e) &&
                  this.operator.startsWith("<") &&
                  t.operator.startsWith(">"))
              );
        }
      }
      t.exports = i;
      let o = r(33459),
        { re: s, t: a } = r(98416),
        u = r(12928),
        c = r(12494),
        l = r(30808),
        h = r(15579);
    },
    15579: function (t, e, r) {
      class n {
        constructor(t, e) {
          if (((e = s(e)), t instanceof n)) {
            if (
              !!e.loose === t.loose &&
              !!e.includePrerelease === t.includePrerelease
            )
              return t;
            return new n(t.raw, e);
          }
          if (t instanceof a)
            return (
              (this.raw = t.value), (this.set = [[t]]), this.format(), this
            );
          if (
            ((this.options = e),
            (this.loose = !!e.loose),
            (this.includePrerelease = !!e.includePrerelease),
            (this.raw = t),
            (this.set = t
              .split("||")
              .map((t) => this.parseRange(t.trim()))
              .filter((t) => t.length)),
            !this.set.length)
          )
            throw TypeError(`Invalid SemVer Range: ${t}`);
          if (this.set.length > 1) {
            let t = this.set[0];
            if (
              ((this.set = this.set.filter((t) => !m(t[0]))),
              0 === this.set.length)
            )
              this.set = [t];
            else if (this.set.length > 1) {
              for (let t of this.set)
                if (1 === t.length && b(t[0])) {
                  this.set = [t];
                  break;
                }
            }
          }
          this.format();
        }
        format() {
          return (
            (this.range = this.set
              .map((t) => t.join(" ").trim())
              .join("||")
              .trim()),
            this.range
          );
        }
        toString() {
          return this.range;
        }
        parseRange(t) {
          t = t.trim();
          let e =
              (this.options.includePrerelease && y) | (this.options.loose && g),
            r = e + ":" + t,
            n = o.get(r);
          if (n) return n;
          let i = this.options.loose,
            s = i ? l[h.HYPHENRANGELOOSE] : l[h.HYPHENRANGE];
          u(
            "hyphen replace",
            (t = t.replace(s, A(this.options.includePrerelease)))
          ),
            u("comparator trim", (t = t.replace(l[h.COMPARATORTRIM], d)));
          let c = (t = (t = (t = t.replace(l[h.TILDETRIM], f)).replace(
            l[h.CARETTRIM],
            p
          ))
            .split(/\s+/)
            .join(" "))
            .split(" ")
            .map((t) => _(t, this.options))
            .join(" ")
            .split(/\s+/)
            .map((t) => R(t, this.options));
          i &&
            (c = c.filter(
              (t) => (
                u("loose invalid filter", t, this.options),
                !!t.match(l[h.COMPARATORLOOSE])
              )
            )),
            u("range list", c);
          let b = new Map(),
            v = c.map((t) => new a(t, this.options));
          for (let t of v) {
            if (m(t)) return [t];
            b.set(t.value, t);
          }
          b.size > 1 && b.has("") && b.delete("");
          let w = [...b.values()];
          return o.set(r, w), w;
        }
        intersects(t, e) {
          if (!(t instanceof n)) throw TypeError("a Range is required");
          return this.set.some(
            (r) =>
              v(r, e) &&
              t.set.some(
                (t) =>
                  v(t, e) && r.every((r) => t.every((t) => r.intersects(t, e)))
              )
          );
        }
        test(t) {
          if (!t) return !1;
          if ("string" == typeof t)
            try {
              t = new c(t, this.options);
            } catch (t) {
              return !1;
            }
          for (let e = 0; e < this.set.length; e++)
            if (N(this.set[e], t, this.options)) return !0;
          return !1;
        }
      }
      t.exports = n;
      let i = r(28486),
        o = new i({ max: 1e3 }),
        s = r(33459),
        a = r(67809),
        u = r(12494),
        c = r(30808),
        {
          re: l,
          t: h,
          comparatorTrimReplace: d,
          tildeTrimReplace: f,
          caretTrimReplace: p,
        } = r(98416),
        { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: g } = r(41493),
        m = (t) => "<0.0.0-0" === t.value,
        b = (t) => "" === t.value,
        v = (t, e) => {
          let r = !0,
            n = t.slice(),
            i = n.pop();
          for (; r && n.length; )
            (r = n.every((t) => i.intersects(t, e))), (i = n.pop());
          return r;
        },
        _ = (t, e) => (
          u("comp", t, e),
          (t = M(t, e)),
          u("caret", t),
          (t = E(t, e)),
          u("tildes", t),
          (t = k(t, e)),
          u("xrange", t),
          (t = I(t, e)),
          u("stars", t),
          t
        ),
        w = (t) => !t || "x" === t.toLowerCase() || "*" === t,
        E = (t, e) =>
          t
            .trim()
            .split(/\s+/)
            .map((t) => S(t, e))
            .join(" "),
        S = (t, e) => {
          let r = e.loose ? l[h.TILDELOOSE] : l[h.TILDE];
          return t.replace(r, (e, r, n, i, o) => {
            let s;
            return (
              u("tilde", t, e, r, n, i, o),
              w(r)
                ? (s = "")
                : w(n)
                ? (s = `>=${r}.0.0 <${+r + 1}.0.0-0`)
                : w(i)
                ? (s = `>=${r}.${n}.0 <${r}.${+n + 1}.0-0`)
                : o
                ? (u("replaceTilde pr", o),
                  (s = `>=${r}.${n}.${i}-${o} <${r}.${+n + 1}.0-0`))
                : (s = `>=${r}.${n}.${i} <${r}.${+n + 1}.0-0`),
              u("tilde return", s),
              s
            );
          });
        },
        M = (t, e) =>
          t
            .trim()
            .split(/\s+/)
            .map((t) => x(t, e))
            .join(" "),
        x = (t, e) => {
          u("caret", t, e);
          let r = e.loose ? l[h.CARETLOOSE] : l[h.CARET],
            n = e.includePrerelease ? "-0" : "";
          return t.replace(r, (e, r, i, o, s) => {
            let a;
            return (
              u("caret", t, e, r, i, o, s),
              w(r)
                ? (a = "")
                : w(i)
                ? (a = `>=${r}.0.0${n} <${+r + 1}.0.0-0`)
                : w(o)
                ? (a =
                    "0" === r
                      ? `>=${r}.${i}.0${n} <${r}.${+i + 1}.0-0`
                      : `>=${r}.${i}.0${n} <${+r + 1}.0.0-0`)
                : s
                ? (u("replaceCaret pr", s),
                  (a =
                    "0" === r
                      ? "0" === i
                        ? `>=${r}.${i}.${o}-${s} <${r}.${i}.${+o + 1}-0`
                        : `>=${r}.${i}.${o}-${s} <${r}.${+i + 1}.0-0`
                      : `>=${r}.${i}.${o}-${s} <${+r + 1}.0.0-0`))
                : (u("no pr"),
                  (a =
                    "0" === r
                      ? "0" === i
                        ? `>=${r}.${i}.${o}${n} <${r}.${i}.${+o + 1}-0`
                        : `>=${r}.${i}.${o}${n} <${r}.${+i + 1}.0-0`
                      : `>=${r}.${i}.${o} <${+r + 1}.0.0-0`)),
              u("caret return", a),
              a
            );
          });
        },
        k = (t, e) => (
          u("replaceXRanges", t, e),
          t
            .split(/\s+/)
            .map((t) => C(t, e))
            .join(" ")
        ),
        C = (t, e) => {
          t = t.trim();
          let r = e.loose ? l[h.XRANGELOOSE] : l[h.XRANGE];
          return t.replace(r, (r, n, i, o, s, a) => {
            u("xRange", t, r, n, i, o, s, a);
            let c = w(i),
              l = c || w(o),
              h = l || w(s);
            return (
              "=" === n && h && (n = ""),
              (a = e.includePrerelease ? "-0" : ""),
              c
                ? (r = ">" === n || "<" === n ? "<0.0.0-0" : "*")
                : n && h
                ? (l && (o = 0),
                  (s = 0),
                  ">" === n
                    ? ((n = ">="),
                      l
                        ? ((i = +i + 1), (o = 0), (s = 0))
                        : ((o = +o + 1), (s = 0)))
                    : "<=" === n &&
                      ((n = "<"), l ? (i = +i + 1) : (o = +o + 1)),
                  "<" === n && (a = "-0"),
                  (r = `${n + i}.${o}.${s}${a}`))
                : l
                ? (r = `>=${i}.0.0${a} <${+i + 1}.0.0-0`)
                : h && (r = `>=${i}.${o}.0${a} <${i}.${+o + 1}.0-0`),
              u("xRange return", r),
              r
            );
          });
        },
        I = (t, e) => (
          u("replaceStars", t, e), t.trim().replace(l[h.STAR], "")
        ),
        R = (t, e) => (
          u("replaceGTE0", t, e),
          t.trim().replace(l[e.includePrerelease ? h.GTE0PRE : h.GTE0], "")
        ),
        A = (t) => (e, r, n, i, o, s, a, u, c, l, h, d, f) =>
          `${(r = w(n)
            ? ""
            : w(i)
            ? `>=${n}.0.0${t ? "-0" : ""}`
            : w(o)
            ? `>=${n}.${i}.0${t ? "-0" : ""}`
            : s
            ? `>=${r}`
            : `>=${r}${t ? "-0" : ""}`)} ${(u = w(c)
            ? ""
            : w(l)
            ? `<${+c + 1}.0.0-0`
            : w(h)
            ? `<${c}.${+l + 1}.0-0`
            : d
            ? `<=${c}.${l}.${h}-${d}`
            : t
            ? `<${c}.${l}.${+h + 1}-0`
            : `<=${u}`)}`.trim(),
        N = (t, e, r) => {
          for (let r = 0; r < t.length; r++) if (!t[r].test(e)) return !1;
          if (e.prerelease.length && !r.includePrerelease) {
            for (let r = 0; r < t.length; r++)
              if (
                (u(t[r].semver),
                t[r].semver !== a.ANY && t[r].semver.prerelease.length > 0)
              ) {
                let n = t[r].semver;
                if (
                  n.major === e.major &&
                  n.minor === e.minor &&
                  n.patch === e.patch
                )
                  return !0;
              }
            return !1;
          }
          return !0;
        };
    },
    30808: function (t, e, r) {
      let n = r(12494),
        { MAX_LENGTH: i, MAX_SAFE_INTEGER: o } = r(41493),
        { re: s, t: a } = r(98416),
        u = r(33459),
        { compareIdentifiers: c } = r(29417);
      class l {
        constructor(t, e) {
          if (((e = u(e)), t instanceof l)) {
            if (
              !!e.loose === t.loose &&
              !!e.includePrerelease === t.includePrerelease
            )
              return t;
            t = t.version;
          } else if ("string" != typeof t)
            throw TypeError(
              `Invalid version. Must be a string. Got type "${typeof t}".`
            );
          if (t.length > i)
            throw TypeError(`version is longer than ${i} characters`);
          n("SemVer", t, e),
            (this.options = e),
            (this.loose = !!e.loose),
            (this.includePrerelease = !!e.includePrerelease);
          let r = t.trim().match(e.loose ? s[a.LOOSE] : s[a.FULL]);
          if (!r) throw TypeError(`Invalid Version: ${t}`);
          if (
            ((this.raw = t),
            (this.major = +r[1]),
            (this.minor = +r[2]),
            (this.patch = +r[3]),
            this.major > o || this.major < 0)
          )
            throw TypeError("Invalid major version");
          if (this.minor > o || this.minor < 0)
            throw TypeError("Invalid minor version");
          if (this.patch > o || this.patch < 0)
            throw TypeError("Invalid patch version");
          r[4]
            ? (this.prerelease = r[4].split(".").map((t) => {
                if (/^[0-9]+$/.test(t)) {
                  let e = +t;
                  if (e >= 0 && e < o) return e;
                }
                return t;
              }))
            : (this.prerelease = []),
            (this.build = r[5] ? r[5].split(".") : []),
            this.format();
        }
        format() {
          return (
            (this.version = `${this.major}.${this.minor}.${this.patch}`),
            this.prerelease.length &&
              (this.version += `-${this.prerelease.join(".")}`),
            this.version
          );
        }
        toString() {
          return this.version;
        }
        compare(t) {
          if (
            (n("SemVer.compare", this.version, this.options, t),
            !(t instanceof l))
          ) {
            if ("string" == typeof t && t === this.version) return 0;
            t = new l(t, this.options);
          }
          return t.version === this.version
            ? 0
            : this.compareMain(t) || this.comparePre(t);
        }
        compareMain(t) {
          return (
            t instanceof l || (t = new l(t, this.options)),
            c(this.major, t.major) ||
              c(this.minor, t.minor) ||
              c(this.patch, t.patch)
          );
        }
        comparePre(t) {
          if (
            (t instanceof l || (t = new l(t, this.options)),
            this.prerelease.length && !t.prerelease.length)
          )
            return -1;
          if (!this.prerelease.length && t.prerelease.length) return 1;
          if (!this.prerelease.length && !t.prerelease.length) return 0;
          let e = 0;
          do {
            let r = this.prerelease[e],
              i = t.prerelease[e];
            if (
              (n("prerelease compare", e, r, i), void 0 === r && void 0 === i)
            )
              return 0;
            if (void 0 === i) return 1;
            if (void 0 === r) return -1;
            if (r === i) continue;
            else return c(r, i);
          } while (++e);
        }
        compareBuild(t) {
          t instanceof l || (t = new l(t, this.options));
          let e = 0;
          do {
            let r = this.build[e],
              i = t.build[e];
            if (
              (n("prerelease compare", e, r, i), void 0 === r && void 0 === i)
            )
              return 0;
            if (void 0 === i) return 1;
            if (void 0 === r) return -1;
            if (r === i) continue;
            else return c(r, i);
          } while (++e);
        }
        inc(t, e, r) {
          switch (t) {
            case "premajor":
              (this.prerelease.length = 0),
                (this.patch = 0),
                (this.minor = 0),
                this.major++,
                this.inc("pre", e, r);
              break;
            case "preminor":
              (this.prerelease.length = 0),
                (this.patch = 0),
                this.minor++,
                this.inc("pre", e, r);
              break;
            case "prepatch":
              (this.prerelease.length = 0),
                this.inc("patch", e, r),
                this.inc("pre", e, r);
              break;
            case "prerelease":
              0 === this.prerelease.length && this.inc("patch", e, r),
                this.inc("pre", e, r);
              break;
            case "major":
              (0 !== this.minor ||
                0 !== this.patch ||
                0 === this.prerelease.length) &&
                this.major++,
                (this.minor = 0),
                (this.patch = 0),
                (this.prerelease = []);
              break;
            case "minor":
              (0 !== this.patch || 0 === this.prerelease.length) &&
                this.minor++,
                (this.patch = 0),
                (this.prerelease = []);
              break;
            case "patch":
              0 === this.prerelease.length && this.patch++,
                (this.prerelease = []);
              break;
            case "pre": {
              let t = Number(r) ? 1 : 0;
              if (!e && !1 === r)
                throw Error("invalid increment argument: identifier is empty");
              if (0 === this.prerelease.length) this.prerelease = [t];
              else {
                let n = this.prerelease.length;
                for (; --n >= 0; )
                  "number" == typeof this.prerelease[n] &&
                    (this.prerelease[n]++, (n = -2));
                if (-1 === n) {
                  if (e === this.prerelease.join(".") && !1 === r)
                    throw Error(
                      "invalid increment argument: identifier already exists"
                    );
                  this.prerelease.push(t);
                }
              }
              if (e) {
                let n = [e, t];
                !1 === r && (n = [e]),
                  0 === c(this.prerelease[0], e)
                    ? isNaN(this.prerelease[1]) && (this.prerelease = n)
                    : (this.prerelease = n);
              }
              break;
            }
            default:
              throw Error(`invalid increment argument: ${t}`);
          }
          return this.format(), (this.raw = this.version), this;
        }
      }
      t.exports = l;
    },
    97321: function (t, e, r) {
      let n = r(99706);
      t.exports = (t, e) => {
        let r = n(t.trim().replace(/^[=v]+/, ""), e);
        return r ? r.version : null;
      };
    },
    12928: function (t, e, r) {
      let n = r(26393),
        i = r(70003),
        o = r(690),
        s = r(26155),
        a = r(91675),
        u = r(38800);
      t.exports = (t, e, r, c) => {
        switch (e) {
          case "===":
            return (
              "object" == typeof t && (t = t.version),
              "object" == typeof r && (r = r.version),
              t === r
            );
          case "!==":
            return (
              "object" == typeof t && (t = t.version),
              "object" == typeof r && (r = r.version),
              t !== r
            );
          case "":
          case "=":
          case "==":
            return n(t, r, c);
          case "!=":
            return i(t, r, c);
          case ">":
            return o(t, r, c);
          case ">=":
            return s(t, r, c);
          case "<":
            return a(t, r, c);
          case "<=":
            return u(t, r, c);
          default:
            throw TypeError(`Invalid operator: ${e}`);
        }
      };
    },
    65054: function (t, e, r) {
      let n = r(30808),
        i = r(99706),
        { re: o, t: s } = r(98416);
      t.exports = (t, e) => {
        if (t instanceof n) return t;
        if (("number" == typeof t && (t = String(t)), "string" != typeof t))
          return null;
        let r = null;
        if ((e = e || {}).rtl) {
          let e;
          for (
            ;
            (e = o[s.COERCERTL].exec(t)) &&
            (!r || r.index + r[0].length !== t.length);

          )
            (r && e.index + e[0].length === r.index + r[0].length) || (r = e),
              (o[s.COERCERTL].lastIndex = e.index + e[1].length + e[2].length);
          o[s.COERCERTL].lastIndex = -1;
        } else r = t.match(o[s.COERCE]);
        return null === r
          ? null
          : i(`${r[2]}.${r[3] || "0"}.${r[4] || "0"}`, e);
      };
    },
    39457: function (t, e, r) {
      let n = r(30808);
      t.exports = (t, e, r) => {
        let i = new n(t, r),
          o = new n(e, r);
        return i.compare(o) || i.compareBuild(o);
      };
    },
    18992: function (t, e, r) {
      let n = r(66837);
      t.exports = (t, e) => n(t, e, !0);
    },
    66837: function (t, e, r) {
      let n = r(30808);
      t.exports = (t, e, r) => new n(t, r).compare(new n(e, r));
    },
    49603: function (t, e, r) {
      let n = r(99706);
      t.exports = (t, e) => {
        let r = n(t, null, !0),
          i = n(e, null, !0),
          o = r.compare(i);
        if (0 === o) return null;
        let s = o > 0,
          a = s ? r : i,
          u = s ? i : r,
          c = !!a.prerelease.length,
          l = c ? "pre" : "";
        return r.major !== i.major
          ? l + "major"
          : r.minor !== i.minor
          ? l + "minor"
          : r.patch !== i.patch
          ? l + "patch"
          : c
          ? "prerelease"
          : u.patch
          ? "patch"
          : u.minor
          ? "minor"
          : "major";
      };
    },
    26393: function (t, e, r) {
      let n = r(66837);
      t.exports = (t, e, r) => 0 === n(t, e, r);
    },
    690: function (t, e, r) {
      let n = r(66837);
      t.exports = (t, e, r) => n(t, e, r) > 0;
    },
    26155: function (t, e, r) {
      let n = r(66837);
      t.exports = (t, e, r) => n(t, e, r) >= 0;
    },
    90624: function (t, e, r) {
      let n = r(30808);
      t.exports = (t, e, r, i, o) => {
        "string" == typeof r && ((o = i), (i = r), (r = void 0));
        try {
          return new n(t instanceof n ? t.version : t, r).inc(e, i, o).version;
        } catch (t) {
          return null;
        }
      };
    },
    91675: function (t, e, r) {
      let n = r(66837);
      t.exports = (t, e, r) => 0 > n(t, e, r);
    },
    38800: function (t, e, r) {
      let n = r(66837);
      t.exports = (t, e, r) => 0 >= n(t, e, r);
    },
    4352: function (t, e, r) {
      let n = r(30808);
      t.exports = (t, e) => new n(t, e).major;
    },
    71561: function (t, e, r) {
      let n = r(30808);
      t.exports = (t, e) => new n(t, e).minor;
    },
    70003: function (t, e, r) {
      let n = r(66837);
      t.exports = (t, e, r) => 0 !== n(t, e, r);
    },
    99706: function (t, e, r) {
      let n = r(30808);
      t.exports = (t, e, r = !1) => {
        if (t instanceof n) return t;
        try {
          return new n(t, e);
        } catch (t) {
          if (!r) return null;
          throw t;
        }
      };
    },
    8660: function (t, e, r) {
      let n = r(30808);
      t.exports = (t, e) => new n(t, e).patch;
    },
    77674: function (t, e, r) {
      let n = r(99706);
      t.exports = (t, e) => {
        let r = n(t, e);
        return r && r.prerelease.length ? r.prerelease : null;
      };
    },
    43370: function (t, e, r) {
      let n = r(66837);
      t.exports = (t, e, r) => n(e, t, r);
    },
    96646: function (t, e, r) {
      let n = r(39457);
      t.exports = (t, e) => t.sort((t, r) => n(r, t, e));
    },
    17819: function (t, e, r) {
      let n = r(15579);
      t.exports = (t, e, r) => {
        try {
          e = new n(e, r);
        } catch (t) {
          return !1;
        }
        return e.test(t);
      };
    },
    53124: function (t, e, r) {
      let n = r(39457);
      t.exports = (t, e) => t.sort((t, r) => n(t, r, e));
    },
    85557: function (t, e, r) {
      let n = r(99706);
      t.exports = (t, e) => {
        let r = n(t, e);
        return r ? r.version : null;
      };
    },
    45393: function (t, e, r) {
      let n = r(98416),
        i = r(41493),
        o = r(30808),
        s = r(29417),
        a = r(99706),
        u = r(85557),
        c = r(97321),
        l = r(90624),
        h = r(49603),
        d = r(4352),
        f = r(71561),
        p = r(8660),
        y = r(77674),
        g = r(66837),
        m = r(43370),
        b = r(18992),
        v = r(39457),
        _ = r(53124),
        w = r(96646),
        E = r(690),
        S = r(91675),
        M = r(26393),
        x = r(70003),
        k = r(26155),
        C = r(38800),
        I = r(12928),
        R = r(65054),
        A = r(67809),
        N = r(15579),
        T = r(17819),
        O = r(40458),
        L = r(76449),
        j = r(21940),
        P = r(20442),
        D = r(77677),
        B = r(39455),
        F = r(17922),
        $ = r(93670),
        U = r(90451),
        z = r(84501),
        V = r(94854);
      t.exports = {
        parse: a,
        valid: u,
        clean: c,
        inc: l,
        diff: h,
        major: d,
        minor: f,
        patch: p,
        prerelease: y,
        compare: g,
        rcompare: m,
        compareLoose: b,
        compareBuild: v,
        sort: _,
        rsort: w,
        gt: E,
        lt: S,
        eq: M,
        neq: x,
        gte: k,
        lte: C,
        cmp: I,
        coerce: R,
        Comparator: A,
        Range: N,
        satisfies: T,
        toComparators: O,
        maxSatisfying: L,
        minSatisfying: j,
        minVersion: P,
        validRange: D,
        outside: B,
        gtr: F,
        ltr: $,
        intersects: U,
        simplifyRange: z,
        subset: V,
        SemVer: o,
        re: n.re,
        src: n.src,
        tokens: n.t,
        SEMVER_SPEC_VERSION: i.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: i.RELEASE_TYPES,
        compareIdentifiers: s.compareIdentifiers,
        rcompareIdentifiers: s.rcompareIdentifiers,
      };
    },
    41493: function (t) {
      let e = Number.MAX_SAFE_INTEGER || 9007199254740991;
      t.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: 16,
        MAX_SAFE_INTEGER: e,
        RELEASE_TYPES: [
          "major",
          "premajor",
          "minor",
          "preminor",
          "patch",
          "prepatch",
          "prerelease",
        ],
        SEMVER_SPEC_VERSION: "2.0.0",
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2,
      };
    },
    12494: function (t, e, r) {
      var n = r(83454);
      let i =
        "object" == typeof n &&
        n.env &&
        n.env.NODE_DEBUG &&
        /\bsemver\b/i.test(n.env.NODE_DEBUG)
          ? (...t) => console.error("SEMVER", ...t)
          : () => {};
      t.exports = i;
    },
    29417: function (t) {
      let e = /^[0-9]+$/,
        r = (t, r) => {
          let n = e.test(t),
            i = e.test(r);
          return (
            n && i && ((t = +t), (r = +r)),
            t === r ? 0 : n && !i ? -1 : i && !n ? 1 : t < r ? -1 : 1
          );
        };
      t.exports = {
        compareIdentifiers: r,
        rcompareIdentifiers: (t, e) => r(e, t),
      };
    },
    33459: function (t) {
      let e = Object.freeze({ loose: !0 }),
        r = Object.freeze({});
      t.exports = (t) => (t ? ("object" != typeof t ? e : t) : r);
    },
    98416: function (t, e, r) {
      let { MAX_SAFE_COMPONENT_LENGTH: n } = r(41493),
        i = r(12494);
      e = t.exports = {};
      let o = (e.re = []),
        s = (e.src = []),
        a = (e.t = {}),
        u = 0,
        c = (t, e, r) => {
          let n = u++;
          i(t, n, e),
            (a[t] = n),
            (s[n] = e),
            (o[n] = new RegExp(e, r ? "g" : void 0));
        };
      c("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
        c("NUMERICIDENTIFIERLOOSE", "[0-9]+"),
        c("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"),
        c(
          "MAINVERSION",
          `(${s[a.NUMERICIDENTIFIER]})\\.(${s[a.NUMERICIDENTIFIER]})\\.(${
            s[a.NUMERICIDENTIFIER]
          })`
        ),
        c(
          "MAINVERSIONLOOSE",
          `(${s[a.NUMERICIDENTIFIERLOOSE]})\\.(${
            s[a.NUMERICIDENTIFIERLOOSE]
          })\\.(${s[a.NUMERICIDENTIFIERLOOSE]})`
        ),
        c(
          "PRERELEASEIDENTIFIER",
          `(?:${s[a.NUMERICIDENTIFIER]}|${s[a.NONNUMERICIDENTIFIER]})`
        ),
        c(
          "PRERELEASEIDENTIFIERLOOSE",
          `(?:${s[a.NUMERICIDENTIFIERLOOSE]}|${s[a.NONNUMERICIDENTIFIER]})`
        ),
        c(
          "PRERELEASE",
          `(?:-(${s[a.PRERELEASEIDENTIFIER]}(?:\\.${
            s[a.PRERELEASEIDENTIFIER]
          })*))`
        ),
        c(
          "PRERELEASELOOSE",
          `(?:-?(${s[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${
            s[a.PRERELEASEIDENTIFIERLOOSE]
          })*))`
        ),
        c("BUILDIDENTIFIER", "[0-9A-Za-z-]+"),
        c(
          "BUILD",
          `(?:\\+(${s[a.BUILDIDENTIFIER]}(?:\\.${s[a.BUILDIDENTIFIER]})*))`
        ),
        c(
          "FULLPLAIN",
          `v?${s[a.MAINVERSION]}${s[a.PRERELEASE]}?${s[a.BUILD]}?`
        ),
        c("FULL", `^${s[a.FULLPLAIN]}$`),
        c(
          "LOOSEPLAIN",
          `[v=\\s]*${s[a.MAINVERSIONLOOSE]}${s[a.PRERELEASELOOSE]}?${
            s[a.BUILD]
          }?`
        ),
        c("LOOSE", `^${s[a.LOOSEPLAIN]}$`),
        c("GTLT", "((?:<|>)?=?)"),
        c("XRANGEIDENTIFIERLOOSE", `${s[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
        c("XRANGEIDENTIFIER", `${s[a.NUMERICIDENTIFIER]}|x|X|\\*`),
        c(
          "XRANGEPLAIN",
          `[v=\\s]*(${s[a.XRANGEIDENTIFIER]})(?:\\.(${
            s[a.XRANGEIDENTIFIER]
          })(?:\\.(${s[a.XRANGEIDENTIFIER]})(?:${s[a.PRERELEASE]})?${
            s[a.BUILD]
          }?)?)?`
        ),
        c(
          "XRANGEPLAINLOOSE",
          `[v=\\s]*(${s[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${
            s[a.XRANGEIDENTIFIERLOOSE]
          })(?:\\.(${s[a.XRANGEIDENTIFIERLOOSE]})(?:${s[a.PRERELEASELOOSE]})?${
            s[a.BUILD]
          }?)?)?`
        ),
        c("XRANGE", `^${s[a.GTLT]}\\s*${s[a.XRANGEPLAIN]}$`),
        c("XRANGELOOSE", `^${s[a.GTLT]}\\s*${s[a.XRANGEPLAINLOOSE]}$`),
        c(
          "COERCE",
          `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?(?:$|[^\\d])`
        ),
        c("COERCERTL", s[a.COERCE], !0),
        c("LONETILDE", "(?:~>?)"),
        c("TILDETRIM", `(\\s*)${s[a.LONETILDE]}\\s+`, !0),
        (e.tildeTrimReplace = "$1~"),
        c("TILDE", `^${s[a.LONETILDE]}${s[a.XRANGEPLAIN]}$`),
        c("TILDELOOSE", `^${s[a.LONETILDE]}${s[a.XRANGEPLAINLOOSE]}$`),
        c("LONECARET", "(?:\\^)"),
        c("CARETTRIM", `(\\s*)${s[a.LONECARET]}\\s+`, !0),
        (e.caretTrimReplace = "$1^"),
        c("CARET", `^${s[a.LONECARET]}${s[a.XRANGEPLAIN]}$`),
        c("CARETLOOSE", `^${s[a.LONECARET]}${s[a.XRANGEPLAINLOOSE]}$`),
        c("COMPARATORLOOSE", `^${s[a.GTLT]}\\s*(${s[a.LOOSEPLAIN]})$|^$`),
        c("COMPARATOR", `^${s[a.GTLT]}\\s*(${s[a.FULLPLAIN]})$|^$`),
        c(
          "COMPARATORTRIM",
          `(\\s*)${s[a.GTLT]}\\s*(${s[a.LOOSEPLAIN]}|${s[a.XRANGEPLAIN]})`,
          !0
        ),
        (e.comparatorTrimReplace = "$1$2$3"),
        c(
          "HYPHENRANGE",
          `^\\s*(${s[a.XRANGEPLAIN]})\\s+-\\s+(${s[a.XRANGEPLAIN]})\\s*$`
        ),
        c(
          "HYPHENRANGELOOSE",
          `^\\s*(${s[a.XRANGEPLAINLOOSE]})\\s+-\\s+(${
            s[a.XRANGEPLAINLOOSE]
          })\\s*$`
        ),
        c("STAR", "(<|>)?=?\\s*\\*"),
        c("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"),
        c("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    },
    17922: function (t, e, r) {
      let n = r(39455);
      t.exports = (t, e, r) => n(t, e, ">", r);
    },
    90451: function (t, e, r) {
      let n = r(15579);
      t.exports = (t, e, r) => (
        (t = new n(t, r)), (e = new n(e, r)), t.intersects(e, r)
      );
    },
    93670: function (t, e, r) {
      let n = r(39455);
      t.exports = (t, e, r) => n(t, e, "<", r);
    },
    76449: function (t, e, r) {
      let n = r(30808),
        i = r(15579);
      t.exports = (t, e, r) => {
        let o = null,
          s = null,
          a = null;
        try {
          a = new i(e, r);
        } catch (t) {
          return null;
        }
        return (
          t.forEach((t) => {
            a.test(t) &&
              (!o || -1 === s.compare(t)) &&
              ((o = t), (s = new n(o, r)));
          }),
          o
        );
      };
    },
    21940: function (t, e, r) {
      let n = r(30808),
        i = r(15579);
      t.exports = (t, e, r) => {
        let o = null,
          s = null,
          a = null;
        try {
          a = new i(e, r);
        } catch (t) {
          return null;
        }
        return (
          t.forEach((t) => {
            a.test(t) &&
              (!o || 1 === s.compare(t)) &&
              ((o = t), (s = new n(o, r)));
          }),
          o
        );
      };
    },
    20442: function (t, e, r) {
      let n = r(30808),
        i = r(15579),
        o = r(690);
      t.exports = (t, e) => {
        t = new i(t, e);
        let r = new n("0.0.0");
        if (t.test(r) || ((r = new n("0.0.0-0")), t.test(r))) return r;
        r = null;
        for (let e = 0; e < t.set.length; ++e) {
          let i = t.set[e],
            s = null;
          i.forEach((t) => {
            let e = new n(t.semver.version);
            switch (t.operator) {
              case ">":
                0 === e.prerelease.length ? e.patch++ : e.prerelease.push(0),
                  (e.raw = e.format());
              case "":
              case ">=":
                (!s || o(e, s)) && (s = e);
                break;
              case "<":
              case "<=":
                break;
              default:
                throw Error(`Unexpected operation: ${t.operator}`);
            }
          }),
            s && (!r || o(r, s)) && (r = s);
        }
        return r && t.test(r) ? r : null;
      };
    },
    39455: function (t, e, r) {
      let n = r(30808),
        i = r(67809),
        { ANY: o } = i,
        s = r(15579),
        a = r(17819),
        u = r(690),
        c = r(91675),
        l = r(38800),
        h = r(26155);
      t.exports = (t, e, r, d) => {
        let f, p, y, g, m;
        switch (((t = new n(t, d)), (e = new s(e, d)), r)) {
          case ">":
            (f = u), (p = l), (y = c), (g = ">"), (m = ">=");
            break;
          case "<":
            (f = c), (p = h), (y = u), (g = "<"), (m = "<=");
            break;
          default:
            throw TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (a(t, e, d)) return !1;
        for (let r = 0; r < e.set.length; ++r) {
          let n = e.set[r],
            s = null,
            a = null;
          if (
            (n.forEach((t) => {
              t.semver === o && (t = new i(">=0.0.0")),
                (s = s || t),
                (a = a || t),
                f(t.semver, s.semver, d)
                  ? (s = t)
                  : y(t.semver, a.semver, d) && (a = t);
            }),
            s.operator === g ||
              s.operator === m ||
              ((!a.operator || a.operator === g) && p(t, a.semver)) ||
              (a.operator === m && y(t, a.semver)))
          )
            return !1;
        }
        return !0;
      };
    },
    84501: function (t, e, r) {
      let n = r(17819),
        i = r(66837);
      t.exports = (t, e, r) => {
        let o = [],
          s = null,
          a = null,
          u = t.sort((t, e) => i(t, e, r));
        for (let t of u) {
          let i = n(t, e, r);
          i
            ? ((a = t), s || (s = t))
            : (a && o.push([s, a]), (a = null), (s = null));
        }
        s && o.push([s, null]);
        let c = [];
        for (let [t, e] of o)
          t === e
            ? c.push(t)
            : e || t !== u[0]
            ? e
              ? t === u[0]
                ? c.push(`<=${e}`)
                : c.push(`${t} - ${e}`)
              : c.push(`>=${t}`)
            : c.push("*");
        let l = c.join(" || "),
          h = "string" == typeof e.raw ? e.raw : String(e);
        return l.length < h.length ? l : e;
      };
    },
    94854: function (t, e, r) {
      let n = r(15579),
        i = r(67809),
        { ANY: o } = i,
        s = r(17819),
        a = r(66837),
        u = [new i(">=0.0.0-0")],
        c = [new i(">=0.0.0")],
        l = (t, e, r) => {
          let n, i, l, f, p, y, g;
          if (t === e) return !0;
          if (1 === t.length && t[0].semver === o) {
            if (1 === e.length && e[0].semver === o) return !0;
            t = r.includePrerelease ? u : c;
          }
          if (1 === e.length && e[0].semver === o) {
            if (r.includePrerelease) return !0;
            e = c;
          }
          let m = new Set();
          for (let e of t)
            ">" === e.operator || ">=" === e.operator
              ? (n = h(n, e, r))
              : "<" === e.operator || "<=" === e.operator
              ? (i = d(i, e, r))
              : m.add(e.semver);
          if (
            m.size > 1 ||
            (n &&
              i &&
              ((l = a(n.semver, i.semver, r)) > 0 ||
                (0 === l && (">=" !== n.operator || "<=" !== i.operator))))
          )
            return null;
          for (let t of m) {
            if ((n && !s(t, String(n), r)) || (i && !s(t, String(i), r)))
              return null;
            for (let n of e) if (!s(t, String(n), r)) return !1;
            return !0;
          }
          let b =
              !!i &&
              !r.includePrerelease &&
              !!i.semver.prerelease.length &&
              i.semver,
            v =
              !!n &&
              !r.includePrerelease &&
              !!n.semver.prerelease.length &&
              n.semver;
          for (let t of (b &&
            1 === b.prerelease.length &&
            "<" === i.operator &&
            0 === b.prerelease[0] &&
            (b = !1),
          e)) {
            if (
              ((g = g || ">" === t.operator || ">=" === t.operator),
              (y = y || "<" === t.operator || "<=" === t.operator),
              n)
            ) {
              if (
                (v &&
                  t.semver.prerelease &&
                  t.semver.prerelease.length &&
                  t.semver.major === v.major &&
                  t.semver.minor === v.minor &&
                  t.semver.patch === v.patch &&
                  (v = !1),
                ">" === t.operator || ">=" === t.operator)
              ) {
                if ((f = h(n, t, r)) === t && f !== n) return !1;
              } else if (">=" === n.operator && !s(n.semver, String(t), r))
                return !1;
            }
            if (i) {
              if (
                (b &&
                  t.semver.prerelease &&
                  t.semver.prerelease.length &&
                  t.semver.major === b.major &&
                  t.semver.minor === b.minor &&
                  t.semver.patch === b.patch &&
                  (b = !1),
                "<" === t.operator || "<=" === t.operator)
              ) {
                if ((p = d(i, t, r)) === t && p !== i) return !1;
              } else if ("<=" === i.operator && !s(i.semver, String(t), r))
                return !1;
            }
            if (!t.operator && (i || n) && 0 !== l) return !1;
          }
          return (
            (!n || !y || !!i || 0 === l) &&
            (!i || !g || !!n || 0 === l) &&
            !v &&
            !b
          );
        },
        h = (t, e, r) => {
          if (!t) return e;
          let n = a(t.semver, e.semver, r);
          return n > 0
            ? t
            : n < 0
            ? e
            : ">" === e.operator && ">=" === t.operator
            ? e
            : t;
        },
        d = (t, e, r) => {
          if (!t) return e;
          let n = a(t.semver, e.semver, r);
          return n < 0
            ? t
            : n > 0
            ? e
            : "<" === e.operator && "<=" === t.operator
            ? e
            : t;
        };
      t.exports = (t, e, r = {}) => {
        if (t === e) return !0;
        (t = new n(t, r)), (e = new n(e, r));
        let i = !1;
        t: for (let n of t.set) {
          for (let t of e.set) {
            let e = l(n, t, r);
            if (((i = i || null !== e), e)) continue t;
          }
          if (i) return !1;
        }
        return !0;
      };
    },
    40458: function (t, e, r) {
      let n = r(15579);
      t.exports = (t, e) =>
        new n(t, e).set.map((t) =>
          t
            .map((t) => t.value)
            .join(" ")
            .trim()
            .split(" ")
        );
    },
    77677: function (t, e, r) {
      let n = r(15579);
      t.exports = (t, e) => {
        try {
          return new n(t, e).range || "*";
        } catch (t) {
          return null;
        }
      };
    },
    85078: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = r(70655),
        i = r(2403),
        o = (function () {
          function t() {
            this._semaphore = new i.default(1);
          }
          return (
            (t.prototype.acquire = function () {
              return n.__awaiter(this, void 0, void 0, function () {
                return n.__generator(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [4, this._semaphore.acquire()];
                    case 1:
                      return [2, t.sent()[1]];
                  }
                });
              });
            }),
            (t.prototype.runExclusive = function (t) {
              return this._semaphore.runExclusive(function () {
                return t();
              });
            }),
            (t.prototype.isLocked = function () {
              return this._semaphore.isLocked();
            }),
            (t.prototype.release = function () {
              this._semaphore.release();
            }),
            t
          );
        })();
      e.default = o;
    },
    2403: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = r(70655),
        i = (function () {
          function t(t) {
            if (((this._maxConcurrency = t), (this._queue = []), t <= 0))
              throw Error("semaphore must be initialized to a positive value");
            this._value = t;
          }
          return (
            (t.prototype.acquire = function () {
              var t = this,
                e = this.isLocked(),
                r = new Promise(function (e) {
                  return t._queue.push(e);
                });
              return e || this._dispatch(), r;
            }),
            (t.prototype.runExclusive = function (t) {
              return n.__awaiter(this, void 0, void 0, function () {
                var e, r, i;
                return n.__generator(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [4, this.acquire()];
                    case 1:
                      (r = (e = n.sent())[0]), (i = e[1]), (n.label = 2);
                    case 2:
                      return n.trys.push([2, , 4, 5]), [4, t(r)];
                    case 3:
                      return [2, n.sent()];
                    case 4:
                      return i(), [7];
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (t.prototype.isLocked = function () {
              return this._value <= 0;
            }),
            (t.prototype.release = function () {
              if (this._maxConcurrency > 1)
                throw Error(
                  "this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead"
                );
              if (this._currentReleaser) {
                var t = this._currentReleaser;
                (this._currentReleaser = void 0), t();
              }
            }),
            (t.prototype._dispatch = function () {
              var t = this,
                e = this._queue.shift();
              if (e) {
                var r = !1;
                (this._currentReleaser = function () {
                  r || ((r = !0), t._value++, t._dispatch());
                }),
                  e([this._value--, this._currentReleaser]);
              }
            }),
            t
          );
        })();
      e.default = i;
    },
    48125: function (t, e, r) {
      "use strict";
      e.WU = void 0;
      var n = r(85078);
      Object.defineProperty(e, "WU", {
        enumerable: !0,
        get: function () {
          return n.default;
        },
      }),
        r(2403),
        r(41960);
    },
    41960: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.withTimeout = void 0);
      var n = r(70655);
      e.withTimeout = function (t, e, r) {
        var i = this;
        return (
          void 0 === r && (r = Error("timeout")),
          {
            acquire: function () {
              return new Promise(function (o, s) {
                return n.__awaiter(i, void 0, void 0, function () {
                  var i, a;
                  return n.__generator(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (
                          (i = !1),
                          setTimeout(function () {
                            (i = !0), s(r);
                          }, e),
                          [4, t.acquire()]
                        );
                      case 1:
                        return (
                          (a = n.sent()),
                          i ? (Array.isArray(a) ? a[1] : a)() : o(a),
                          [2]
                        );
                    }
                  });
                });
              });
            },
            runExclusive: function (t) {
              return n.__awaiter(this, void 0, void 0, function () {
                var e, r;
                return n.__generator(this, function (n) {
                  switch (n.label) {
                    case 0:
                      (e = function () {}), (n.label = 1);
                    case 1:
                      return n.trys.push([1, , 7, 8]), [4, this.acquire()];
                    case 2:
                      if (!Array.isArray((r = n.sent()))) return [3, 4];
                      return (e = r[1]), [4, t(r[0])];
                    case 3:
                    case 5:
                      return [2, n.sent()];
                    case 4:
                      return (e = r), [4, t()];
                    case 6:
                      return [3, 8];
                    case 7:
                      return e(), [7];
                    case 8:
                      return [2];
                  }
                });
              });
            },
            release: function () {
              t.release();
            },
            isLocked: function () {
              return t.isLocked();
            },
          }
        );
      };
    },
    47056: function (t, e) {
      "use strict";
      var r, n;
      function i(t, e, n) {
        if (!n || typeof n.value !== r.typeOfFunction)
          throw TypeError(
            "Only methods can be decorated with @bind. <" +
              e +
              "> is not a method!"
          );
        return {
          configurable: r.boolTrue,
          get: function () {
            var t = n.value.bind(this);
            return (
              Object.defineProperty(this, e, {
                value: t,
                configurable: r.boolTrue,
                writable: r.boolTrue,
              }),
              t
            );
          },
        };
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        ((n = r || (r = {})).typeOfFunction = "function"),
        (n.boolTrue = !0),
        (e.bind = i),
        (e.default = i);
    },
    13550: function (t, e, r) {
      !(function (t, e) {
        "use strict";
        function n(t, e) {
          if (!t) throw Error(e || "Assertion failed");
        }
        function i(t, e) {
          t.super_ = e;
          var r = function () {};
          (r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t);
        }
        function o(t, e, r) {
          if (o.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" === e || "be" === e) && ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || "be"));
        }
        "object" == typeof t ? (t.exports = o) : (e.BN = o),
          (o.BN = o),
          (o.wordSize = 26);
        try {
          h =
            "undefined" != typeof window && void 0 !== window.Buffer
              ? window.Buffer
              : r(46601).Buffer;
        } catch (t) {}
        function s(t, e) {
          var r = t.charCodeAt(e);
          return r >= 48 && r <= 57
            ? r - 48
            : r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : void n(!1, "Invalid character in " + t);
        }
        function a(t, e, r) {
          var n = s(t, r);
          return r - 1 >= e && (n |= s(t, r - 1) << 4), n;
        }
        function u(t, e, r, i) {
          for (var o = 0, s = 0, a = Math.min(t.length, r), u = e; u < a; u++) {
            var c = t.charCodeAt(u) - 48;
            (o *= i),
              (s = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c),
              n(c >= 0 && s < i, "Invalid character"),
              (o += s);
          }
          return o;
        }
        function c(t, e) {
          (t.words = e.words),
            (t.length = e.length),
            (t.negative = e.negative),
            (t.red = e.red);
        }
        if (
          ((o.isBN = function (t) {
            return (
              t instanceof o ||
              (null !== t &&
                "object" == typeof t &&
                t.constructor.wordSize === o.wordSize &&
                Array.isArray(t.words))
            );
          }),
          (o.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (o.min = function (t, e) {
            return 0 > t.cmp(e) ? t : e;
          }),
          (o.prototype._init = function (t, e, r) {
            if ("number" == typeof t) return this._initNumber(t, e, r);
            if ("object" == typeof t) return this._initArray(t, e, r);
            "hex" === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
            var i = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
              (i++, (this.negative = 1)),
              i < t.length &&
                (16 === e
                  ? this._parseHex(t, i, r)
                  : (this._parseBase(t, e, i),
                    "le" === r && this._initArray(this.toArray(), e, r)));
          }),
          (o.prototype._initNumber = function (t, e, r) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (n(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === r && this._initArray(this.toArray(), e, r);
          }),
          (o.prototype._initArray = function (t, e, r) {
            if ((n("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = Array(this.length));
            for (var i, o, s = 0; s < this.length; s++) this.words[s] = 0;
            var a = 0;
            if ("be" === r)
              for (s = t.length - 1, i = 0; s >= 0; s -= 3)
                (o = t[s] | (t[s - 1] << 8) | (t[s - 2] << 16)),
                  (this.words[i] |= (o << a) & 67108863),
                  (this.words[i + 1] = (o >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), i++);
            else if ("le" === r)
              for (s = 0, i = 0; s < t.length; s += 3)
                (o = t[s] | (t[s + 1] << 8) | (t[s + 2] << 16)),
                  (this.words[i] |= (o << a) & 67108863),
                  (this.words[i + 1] = (o >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), i++);
            return this._strip();
          }),
          (o.prototype._parseHex = function (t, e, r) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = Array(this.length));
            for (var n, i = 0; i < this.length; i++) this.words[i] = 0;
            var o = 0,
              s = 0;
            if ("be" === r)
              for (i = t.length - 1; i >= e; i -= 2)
                (n = a(t, e, i) << o),
                  (this.words[s] |= 67108863 & n),
                  o >= 18
                    ? ((o -= 18), (s += 1), (this.words[s] |= n >>> 26))
                    : (o += 8);
            else
              for (
                i = (t.length - e) % 2 == 0 ? e + 1 : e;
                i < t.length;
                i += 2
              )
                (n = a(t, e, i) << o),
                  (this.words[s] |= 67108863 & n),
                  o >= 18
                    ? ((o -= 18), (s += 1), (this.words[s] |= n >>> 26))
                    : (o += 8);
            this._strip();
          }),
          (o.prototype._parseBase = function (t, e, r) {
            (this.words = [0]), (this.length = 1);
            for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
            n--, (i = (i / e) | 0);
            for (
              var o = t.length - r,
                s = o % n,
                a = Math.min(o, o - s) + r,
                c = 0,
                l = r;
              l < a;
              l += n
            )
              (c = u(t, l, l + n, e)),
                this.imuln(i),
                this.words[0] + c < 67108864
                  ? (this.words[0] += c)
                  : this._iaddn(c);
            if (0 !== s) {
              var h = 1;
              for (c = u(t, l, t.length, e), l = 0; l < s; l++) h *= e;
              this.imuln(h),
                this.words[0] + c < 67108864
                  ? (this.words[0] += c)
                  : this._iaddn(c);
            }
            this._strip();
          }),
          (o.prototype.copy = function (t) {
            t.words = Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (o.prototype._move = function (t) {
            c(t, this);
          }),
          (o.prototype.clone = function () {
            var t = new o(null);
            return this.copy(t), t;
          }),
          (o.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (o.prototype._strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (o.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          "undefined" != typeof Symbol && "function" == typeof Symbol.for)
        )
          try {
            o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l;
          } catch (t) {
            o.prototype.inspect = l;
          }
        else o.prototype.inspect = l;
        function l() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        }
        var h,
          d = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          f = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          p = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        function y(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var n = (t.length + e.length) | 0;
          (r.length = n), (n = (n - 1) | 0);
          var i = 0 | t.words[0],
            o = 0 | e.words[0],
            s = i * o,
            a = 67108863 & s,
            u = (s / 67108864) | 0;
          r.words[0] = a;
          for (var c = 1; c < n; c++) {
            for (
              var l = u >>> 26,
                h = 67108863 & u,
                d = Math.min(c, e.length - 1),
                f = Math.max(0, c - t.length + 1);
              f <= d;
              f++
            ) {
              var p = (c - f) | 0;
              (l +=
                ((s = (i = 0 | t.words[p]) * (o = 0 | e.words[f]) + h) /
                  67108864) |
                0),
                (h = 67108863 & s);
            }
            (r.words[c] = 0 | h), (u = 0 | l);
          }
          return 0 !== u ? (r.words[c] = 0 | u) : r.length--, r._strip();
        }
        (o.prototype.toString = function (t, e) {
          if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
            r = "";
            for (var r, i = 0, o = 0, s = 0; s < this.length; s++) {
              var a = this.words[s],
                u = (((a << i) | o) & 16777215).toString(16);
              (o = (a >>> (24 - i)) & 16777215),
                (i += 2) >= 26 && ((i -= 26), s--),
                (r =
                  0 !== o || s !== this.length - 1
                    ? d[6 - u.length] + u + r
                    : u + r);
            }
            for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var c = f[t],
              l = p[t];
            r = "";
            var h = this.clone();
            for (h.negative = 0; !h.isZero(); ) {
              var y = h.modrn(l).toString(t);
              r = (h = h.idivn(l)).isZero() ? y + r : d[c - y.length] + y + r;
            }
            for (this.isZero() && (r = "0" + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          n(!1, "Base should be between 2 and 36");
        }),
          (o.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  n(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (o.prototype.toJSON = function () {
            return this.toString(16, 2);
          }),
          h &&
            (o.prototype.toBuffer = function (t, e) {
              return this.toArrayLike(h, t, e);
            }),
          (o.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          }),
          (o.prototype.toArrayLike = function (t, e, r) {
            this._strip();
            var i = this.byteLength(),
              o = r || Math.max(1, i);
            n(i <= o, "byte array longer than desired length"),
              n(o > 0, "Requested array length <= 0");
            var s = t.allocUnsafe ? t.allocUnsafe(o) : new t(o);
            return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, i), s;
          }),
          (o.prototype._toArrayLikeLE = function (t, e) {
            for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
              var s = (this.words[i] << o) | n;
              (t[r++] = 255 & s),
                r < t.length && (t[r++] = (s >> 8) & 255),
                r < t.length && (t[r++] = (s >> 16) & 255),
                6 === o
                  ? (r < t.length && (t[r++] = (s >> 24) & 255),
                    (n = 0),
                    (o = 0))
                  : ((n = s >>> 24), (o += 2));
            }
            if (r < t.length) for (t[r++] = n; r < t.length; ) t[r++] = 0;
          }),
          (o.prototype._toArrayLikeBE = function (t, e) {
            for (
              var r = t.length - 1, n = 0, i = 0, o = 0;
              i < this.length;
              i++
            ) {
              var s = (this.words[i] << o) | n;
              (t[r--] = 255 & s),
                r >= 0 && (t[r--] = (s >> 8) & 255),
                r >= 0 && (t[r--] = (s >> 16) & 255),
                6 === o
                  ? (r >= 0 && (t[r--] = (s >> 24) & 255), (n = 0), (o = 0))
                  : ((n = s >>> 24), (o += 2));
            }
            if (r >= 0) for (t[r--] = n; r >= 0; ) t[r--] = 0;
          }),
          Math.clz32
            ? (o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (o.prototype._countBits = function (t) {
                var e = t,
                  r = 0;
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                );
              }),
          (o.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              r = 0;
            return (
              (8191 & e) == 0 && ((r += 13), (e >>>= 13)),
              (127 & e) == 0 && ((r += 7), (e >>>= 7)),
              (15 & e) == 0 && ((r += 4), (e >>>= 4)),
              (3 & e) == 0 && ((r += 2), (e >>>= 2)),
              (1 & e) == 0 && r++,
              r
            );
          }),
          (o.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return (this.length - 1) * 26 + e;
          }),
          (o.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (((t += r), 26 !== r)) break;
            }
            return t;
          }),
          (o.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (o.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (o.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (o.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (o.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (o.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (o.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this._strip();
          }),
          (o.prototype.ior = function (t) {
            return n((this.negative | t.negative) == 0), this.iuor(t);
          }),
          (o.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (o.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (o.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
            return (this.length = e.length), this._strip();
          }),
          (o.prototype.iand = function (t) {
            return n((this.negative | t.negative) == 0), this.iuand(t);
          }),
          (o.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (o.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (o.prototype.iuxor = function (t) {
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this));
            for (var e, r, n = 0; n < r.length; n++)
              this.words[n] = e.words[n] ^ r.words[n];
            if (this !== e)
              for (; n < e.length; n++) this.words[n] = e.words[n];
            return (this.length = e.length), this._strip();
          }),
          (o.prototype.ixor = function (t) {
            return n((this.negative | t.negative) == 0), this.iuxor(t);
          }),
          (o.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (o.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (o.prototype.inotn = function (t) {
            n("number" == typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              r = t % 26;
            this._expand(e), r > 0 && e--;
            for (var i = 0; i < e; i++)
              this.words[i] = 67108863 & ~this.words[i];
            return (
              r > 0 &&
                (this.words[i] = ~this.words[i] & (67108863 >> (26 - r))),
              this._strip()
            );
          }),
          (o.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (o.prototype.setn = function (t, e) {
            n("number" == typeof t && t >= 0);
            var r = (t / 26) | 0,
              i = t % 26;
            return (
              this._expand(r + 1),
              e
                ? (this.words[r] = this.words[r] | (1 << i))
                : (this.words[r] = this.words[r] & ~(1 << i)),
              this._strip()
            );
          }),
          (o.prototype.iadd = function (t) {
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((r = this), (n = t))
              : ((r = t), (n = this));
            for (var e, r, n, i = 0, o = 0; o < n.length; o++)
              (e = (0 | r.words[o]) + (0 | n.words[o]) + i),
                (this.words[o] = 67108863 & e),
                (i = e >>> 26);
            for (; 0 !== i && o < r.length; o++)
              (e = (0 | r.words[o]) + i),
                (this.words[o] = 67108863 & e),
                (i = e >>> 26);
            if (((this.length = r.length), 0 !== i))
              (this.words[this.length] = i), this.length++;
            else if (r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o];
            return this;
          }),
          (o.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (o.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e,
                r,
                n = this.iadd(t);
              return (t.negative = 1), n._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var i = this.cmp(t);
            if (0 === i)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            i > 0 ? ((e = this), (r = t)) : ((e = t), (r = this));
            for (var o = 0, s = 0; s < r.length; s++)
              (o = (n = (0 | e.words[s]) - (0 | r.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & n);
            for (; 0 !== o && s < e.length; s++)
              (o = (n = (0 | e.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & n);
            if (0 === o && s < e.length && e !== this)
              for (; s < e.length; s++) this.words[s] = e.words[s];
            return (
              (this.length = Math.max(this.length, s)),
              e !== this && (this.negative = 1),
              this._strip()
            );
          }),
          (o.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var g = function (t, e, r) {
          var n,
            i,
            o,
            s = t.words,
            a = e.words,
            u = r.words,
            c = 0,
            l = 0 | s[0],
            h = 8191 & l,
            d = l >>> 13,
            f = 0 | s[1],
            p = 8191 & f,
            y = f >>> 13,
            g = 0 | s[2],
            m = 8191 & g,
            b = g >>> 13,
            v = 0 | s[3],
            _ = 8191 & v,
            w = v >>> 13,
            E = 0 | s[4],
            S = 8191 & E,
            M = E >>> 13,
            x = 0 | s[5],
            k = 8191 & x,
            C = x >>> 13,
            I = 0 | s[6],
            R = 8191 & I,
            A = I >>> 13,
            N = 0 | s[7],
            T = 8191 & N,
            O = N >>> 13,
            L = 0 | s[8],
            j = 8191 & L,
            P = L >>> 13,
            D = 0 | s[9],
            B = 8191 & D,
            F = D >>> 13,
            $ = 0 | a[0],
            U = 8191 & $,
            z = $ >>> 13,
            V = 0 | a[1],
            W = 8191 & V,
            H = V >>> 13,
            q = 0 | a[2],
            Z = 8191 & q,
            J = q >>> 13,
            G = 0 | a[3],
            Y = 8191 & G,
            Q = G >>> 13,
            K = 0 | a[4],
            X = 8191 & K,
            tt = K >>> 13,
            te = 0 | a[5],
            tr = 8191 & te,
            tn = te >>> 13,
            ti = 0 | a[6],
            to = 8191 & ti,
            ts = ti >>> 13,
            ta = 0 | a[7],
            tu = 8191 & ta,
            tc = ta >>> 13,
            tl = 0 | a[8],
            th = 8191 & tl,
            td = tl >>> 13,
            tf = 0 | a[9],
            tp = 8191 & tf,
            ty = tf >>> 13;
          (r.negative = t.negative ^ e.negative), (r.length = 19);
          var tg =
            (((c + (n = Math.imul(h, U))) | 0) +
              ((8191 & (i = ((i = Math.imul(h, z)) + Math.imul(d, U)) | 0)) <<
                13)) |
            0;
          (c = ((((o = Math.imul(d, z)) + (i >>> 13)) | 0) + (tg >>> 26)) | 0),
            (tg &= 67108863),
            (n = Math.imul(p, U)),
            (i = ((i = Math.imul(p, z)) + Math.imul(y, U)) | 0),
            (o = Math.imul(y, z));
          var tm =
            (((c + (n = (n + Math.imul(h, W)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, H)) | 0) + Math.imul(d, W)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, H)) | 0) + (i >>> 13)) | 0) +
              (tm >>> 26)) |
            0),
            (tm &= 67108863),
            (n = Math.imul(m, U)),
            (i = ((i = Math.imul(m, z)) + Math.imul(b, U)) | 0),
            (o = Math.imul(b, z)),
            (n = (n + Math.imul(p, W)) | 0),
            (i = ((i = (i + Math.imul(p, H)) | 0) + Math.imul(y, W)) | 0),
            (o = (o + Math.imul(y, H)) | 0);
          var tb =
            (((c + (n = (n + Math.imul(h, Z)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, J)) | 0) + Math.imul(d, Z)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, J)) | 0) + (i >>> 13)) | 0) +
              (tb >>> 26)) |
            0),
            (tb &= 67108863),
            (n = Math.imul(_, U)),
            (i = ((i = Math.imul(_, z)) + Math.imul(w, U)) | 0),
            (o = Math.imul(w, z)),
            (n = (n + Math.imul(m, W)) | 0),
            (i = ((i = (i + Math.imul(m, H)) | 0) + Math.imul(b, W)) | 0),
            (o = (o + Math.imul(b, H)) | 0),
            (n = (n + Math.imul(p, Z)) | 0),
            (i = ((i = (i + Math.imul(p, J)) | 0) + Math.imul(y, Z)) | 0),
            (o = (o + Math.imul(y, J)) | 0);
          var tv =
            (((c + (n = (n + Math.imul(h, Y)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, Q)) | 0) + Math.imul(d, Y)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, Q)) | 0) + (i >>> 13)) | 0) +
              (tv >>> 26)) |
            0),
            (tv &= 67108863),
            (n = Math.imul(S, U)),
            (i = ((i = Math.imul(S, z)) + Math.imul(M, U)) | 0),
            (o = Math.imul(M, z)),
            (n = (n + Math.imul(_, W)) | 0),
            (i = ((i = (i + Math.imul(_, H)) | 0) + Math.imul(w, W)) | 0),
            (o = (o + Math.imul(w, H)) | 0),
            (n = (n + Math.imul(m, Z)) | 0),
            (i = ((i = (i + Math.imul(m, J)) | 0) + Math.imul(b, Z)) | 0),
            (o = (o + Math.imul(b, J)) | 0),
            (n = (n + Math.imul(p, Y)) | 0),
            (i = ((i = (i + Math.imul(p, Q)) | 0) + Math.imul(y, Y)) | 0),
            (o = (o + Math.imul(y, Q)) | 0);
          var t_ =
            (((c + (n = (n + Math.imul(h, X)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, tt)) | 0) + Math.imul(d, X)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, tt)) | 0) + (i >>> 13)) | 0) +
              (t_ >>> 26)) |
            0),
            (t_ &= 67108863),
            (n = Math.imul(k, U)),
            (i = ((i = Math.imul(k, z)) + Math.imul(C, U)) | 0),
            (o = Math.imul(C, z)),
            (n = (n + Math.imul(S, W)) | 0),
            (i = ((i = (i + Math.imul(S, H)) | 0) + Math.imul(M, W)) | 0),
            (o = (o + Math.imul(M, H)) | 0),
            (n = (n + Math.imul(_, Z)) | 0),
            (i = ((i = (i + Math.imul(_, J)) | 0) + Math.imul(w, Z)) | 0),
            (o = (o + Math.imul(w, J)) | 0),
            (n = (n + Math.imul(m, Y)) | 0),
            (i = ((i = (i + Math.imul(m, Q)) | 0) + Math.imul(b, Y)) | 0),
            (o = (o + Math.imul(b, Q)) | 0),
            (n = (n + Math.imul(p, X)) | 0),
            (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(y, X)) | 0),
            (o = (o + Math.imul(y, tt)) | 0);
          var tw =
            (((c + (n = (n + Math.imul(h, tr)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, tn)) | 0) + Math.imul(d, tr)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, tn)) | 0) + (i >>> 13)) | 0) +
              (tw >>> 26)) |
            0),
            (tw &= 67108863),
            (n = Math.imul(R, U)),
            (i = ((i = Math.imul(R, z)) + Math.imul(A, U)) | 0),
            (o = Math.imul(A, z)),
            (n = (n + Math.imul(k, W)) | 0),
            (i = ((i = (i + Math.imul(k, H)) | 0) + Math.imul(C, W)) | 0),
            (o = (o + Math.imul(C, H)) | 0),
            (n = (n + Math.imul(S, Z)) | 0),
            (i = ((i = (i + Math.imul(S, J)) | 0) + Math.imul(M, Z)) | 0),
            (o = (o + Math.imul(M, J)) | 0),
            (n = (n + Math.imul(_, Y)) | 0),
            (i = ((i = (i + Math.imul(_, Q)) | 0) + Math.imul(w, Y)) | 0),
            (o = (o + Math.imul(w, Q)) | 0),
            (n = (n + Math.imul(m, X)) | 0),
            (i = ((i = (i + Math.imul(m, tt)) | 0) + Math.imul(b, X)) | 0),
            (o = (o + Math.imul(b, tt)) | 0),
            (n = (n + Math.imul(p, tr)) | 0),
            (i = ((i = (i + Math.imul(p, tn)) | 0) + Math.imul(y, tr)) | 0),
            (o = (o + Math.imul(y, tn)) | 0);
          var tE =
            (((c + (n = (n + Math.imul(h, to)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, ts)) | 0) + Math.imul(d, to)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, ts)) | 0) + (i >>> 13)) | 0) +
              (tE >>> 26)) |
            0),
            (tE &= 67108863),
            (n = Math.imul(T, U)),
            (i = ((i = Math.imul(T, z)) + Math.imul(O, U)) | 0),
            (o = Math.imul(O, z)),
            (n = (n + Math.imul(R, W)) | 0),
            (i = ((i = (i + Math.imul(R, H)) | 0) + Math.imul(A, W)) | 0),
            (o = (o + Math.imul(A, H)) | 0),
            (n = (n + Math.imul(k, Z)) | 0),
            (i = ((i = (i + Math.imul(k, J)) | 0) + Math.imul(C, Z)) | 0),
            (o = (o + Math.imul(C, J)) | 0),
            (n = (n + Math.imul(S, Y)) | 0),
            (i = ((i = (i + Math.imul(S, Q)) | 0) + Math.imul(M, Y)) | 0),
            (o = (o + Math.imul(M, Q)) | 0),
            (n = (n + Math.imul(_, X)) | 0),
            (i = ((i = (i + Math.imul(_, tt)) | 0) + Math.imul(w, X)) | 0),
            (o = (o + Math.imul(w, tt)) | 0),
            (n = (n + Math.imul(m, tr)) | 0),
            (i = ((i = (i + Math.imul(m, tn)) | 0) + Math.imul(b, tr)) | 0),
            (o = (o + Math.imul(b, tn)) | 0),
            (n = (n + Math.imul(p, to)) | 0),
            (i = ((i = (i + Math.imul(p, ts)) | 0) + Math.imul(y, to)) | 0),
            (o = (o + Math.imul(y, ts)) | 0);
          var tS =
            (((c + (n = (n + Math.imul(h, tu)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, tc)) | 0) + Math.imul(d, tu)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, tc)) | 0) + (i >>> 13)) | 0) +
              (tS >>> 26)) |
            0),
            (tS &= 67108863),
            (n = Math.imul(j, U)),
            (i = ((i = Math.imul(j, z)) + Math.imul(P, U)) | 0),
            (o = Math.imul(P, z)),
            (n = (n + Math.imul(T, W)) | 0),
            (i = ((i = (i + Math.imul(T, H)) | 0) + Math.imul(O, W)) | 0),
            (o = (o + Math.imul(O, H)) | 0),
            (n = (n + Math.imul(R, Z)) | 0),
            (i = ((i = (i + Math.imul(R, J)) | 0) + Math.imul(A, Z)) | 0),
            (o = (o + Math.imul(A, J)) | 0),
            (n = (n + Math.imul(k, Y)) | 0),
            (i = ((i = (i + Math.imul(k, Q)) | 0) + Math.imul(C, Y)) | 0),
            (o = (o + Math.imul(C, Q)) | 0),
            (n = (n + Math.imul(S, X)) | 0),
            (i = ((i = (i + Math.imul(S, tt)) | 0) + Math.imul(M, X)) | 0),
            (o = (o + Math.imul(M, tt)) | 0),
            (n = (n + Math.imul(_, tr)) | 0),
            (i = ((i = (i + Math.imul(_, tn)) | 0) + Math.imul(w, tr)) | 0),
            (o = (o + Math.imul(w, tn)) | 0),
            (n = (n + Math.imul(m, to)) | 0),
            (i = ((i = (i + Math.imul(m, ts)) | 0) + Math.imul(b, to)) | 0),
            (o = (o + Math.imul(b, ts)) | 0),
            (n = (n + Math.imul(p, tu)) | 0),
            (i = ((i = (i + Math.imul(p, tc)) | 0) + Math.imul(y, tu)) | 0),
            (o = (o + Math.imul(y, tc)) | 0);
          var tM =
            (((c + (n = (n + Math.imul(h, th)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, td)) | 0) + Math.imul(d, th)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, td)) | 0) + (i >>> 13)) | 0) +
              (tM >>> 26)) |
            0),
            (tM &= 67108863),
            (n = Math.imul(B, U)),
            (i = ((i = Math.imul(B, z)) + Math.imul(F, U)) | 0),
            (o = Math.imul(F, z)),
            (n = (n + Math.imul(j, W)) | 0),
            (i = ((i = (i + Math.imul(j, H)) | 0) + Math.imul(P, W)) | 0),
            (o = (o + Math.imul(P, H)) | 0),
            (n = (n + Math.imul(T, Z)) | 0),
            (i = ((i = (i + Math.imul(T, J)) | 0) + Math.imul(O, Z)) | 0),
            (o = (o + Math.imul(O, J)) | 0),
            (n = (n + Math.imul(R, Y)) | 0),
            (i = ((i = (i + Math.imul(R, Q)) | 0) + Math.imul(A, Y)) | 0),
            (o = (o + Math.imul(A, Q)) | 0),
            (n = (n + Math.imul(k, X)) | 0),
            (i = ((i = (i + Math.imul(k, tt)) | 0) + Math.imul(C, X)) | 0),
            (o = (o + Math.imul(C, tt)) | 0),
            (n = (n + Math.imul(S, tr)) | 0),
            (i = ((i = (i + Math.imul(S, tn)) | 0) + Math.imul(M, tr)) | 0),
            (o = (o + Math.imul(M, tn)) | 0),
            (n = (n + Math.imul(_, to)) | 0),
            (i = ((i = (i + Math.imul(_, ts)) | 0) + Math.imul(w, to)) | 0),
            (o = (o + Math.imul(w, ts)) | 0),
            (n = (n + Math.imul(m, tu)) | 0),
            (i = ((i = (i + Math.imul(m, tc)) | 0) + Math.imul(b, tu)) | 0),
            (o = (o + Math.imul(b, tc)) | 0),
            (n = (n + Math.imul(p, th)) | 0),
            (i = ((i = (i + Math.imul(p, td)) | 0) + Math.imul(y, th)) | 0),
            (o = (o + Math.imul(y, td)) | 0);
          var tx =
            (((c + (n = (n + Math.imul(h, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, ty)) | 0) + Math.imul(d, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(d, ty)) | 0) + (i >>> 13)) | 0) +
              (tx >>> 26)) |
            0),
            (tx &= 67108863),
            (n = Math.imul(B, W)),
            (i = ((i = Math.imul(B, H)) + Math.imul(F, W)) | 0),
            (o = Math.imul(F, H)),
            (n = (n + Math.imul(j, Z)) | 0),
            (i = ((i = (i + Math.imul(j, J)) | 0) + Math.imul(P, Z)) | 0),
            (o = (o + Math.imul(P, J)) | 0),
            (n = (n + Math.imul(T, Y)) | 0),
            (i = ((i = (i + Math.imul(T, Q)) | 0) + Math.imul(O, Y)) | 0),
            (o = (o + Math.imul(O, Q)) | 0),
            (n = (n + Math.imul(R, X)) | 0),
            (i = ((i = (i + Math.imul(R, tt)) | 0) + Math.imul(A, X)) | 0),
            (o = (o + Math.imul(A, tt)) | 0),
            (n = (n + Math.imul(k, tr)) | 0),
            (i = ((i = (i + Math.imul(k, tn)) | 0) + Math.imul(C, tr)) | 0),
            (o = (o + Math.imul(C, tn)) | 0),
            (n = (n + Math.imul(S, to)) | 0),
            (i = ((i = (i + Math.imul(S, ts)) | 0) + Math.imul(M, to)) | 0),
            (o = (o + Math.imul(M, ts)) | 0),
            (n = (n + Math.imul(_, tu)) | 0),
            (i = ((i = (i + Math.imul(_, tc)) | 0) + Math.imul(w, tu)) | 0),
            (o = (o + Math.imul(w, tc)) | 0),
            (n = (n + Math.imul(m, th)) | 0),
            (i = ((i = (i + Math.imul(m, td)) | 0) + Math.imul(b, th)) | 0),
            (o = (o + Math.imul(b, td)) | 0);
          var tk =
            (((c + (n = (n + Math.imul(p, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(p, ty)) | 0) + Math.imul(y, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(y, ty)) | 0) + (i >>> 13)) | 0) +
              (tk >>> 26)) |
            0),
            (tk &= 67108863),
            (n = Math.imul(B, Z)),
            (i = ((i = Math.imul(B, J)) + Math.imul(F, Z)) | 0),
            (o = Math.imul(F, J)),
            (n = (n + Math.imul(j, Y)) | 0),
            (i = ((i = (i + Math.imul(j, Q)) | 0) + Math.imul(P, Y)) | 0),
            (o = (o + Math.imul(P, Q)) | 0),
            (n = (n + Math.imul(T, X)) | 0),
            (i = ((i = (i + Math.imul(T, tt)) | 0) + Math.imul(O, X)) | 0),
            (o = (o + Math.imul(O, tt)) | 0),
            (n = (n + Math.imul(R, tr)) | 0),
            (i = ((i = (i + Math.imul(R, tn)) | 0) + Math.imul(A, tr)) | 0),
            (o = (o + Math.imul(A, tn)) | 0),
            (n = (n + Math.imul(k, to)) | 0),
            (i = ((i = (i + Math.imul(k, ts)) | 0) + Math.imul(C, to)) | 0),
            (o = (o + Math.imul(C, ts)) | 0),
            (n = (n + Math.imul(S, tu)) | 0),
            (i = ((i = (i + Math.imul(S, tc)) | 0) + Math.imul(M, tu)) | 0),
            (o = (o + Math.imul(M, tc)) | 0),
            (n = (n + Math.imul(_, th)) | 0),
            (i = ((i = (i + Math.imul(_, td)) | 0) + Math.imul(w, th)) | 0),
            (o = (o + Math.imul(w, td)) | 0);
          var tC =
            (((c + (n = (n + Math.imul(m, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(m, ty)) | 0) + Math.imul(b, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(b, ty)) | 0) + (i >>> 13)) | 0) +
              (tC >>> 26)) |
            0),
            (tC &= 67108863),
            (n = Math.imul(B, Y)),
            (i = ((i = Math.imul(B, Q)) + Math.imul(F, Y)) | 0),
            (o = Math.imul(F, Q)),
            (n = (n + Math.imul(j, X)) | 0),
            (i = ((i = (i + Math.imul(j, tt)) | 0) + Math.imul(P, X)) | 0),
            (o = (o + Math.imul(P, tt)) | 0),
            (n = (n + Math.imul(T, tr)) | 0),
            (i = ((i = (i + Math.imul(T, tn)) | 0) + Math.imul(O, tr)) | 0),
            (o = (o + Math.imul(O, tn)) | 0),
            (n = (n + Math.imul(R, to)) | 0),
            (i = ((i = (i + Math.imul(R, ts)) | 0) + Math.imul(A, to)) | 0),
            (o = (o + Math.imul(A, ts)) | 0),
            (n = (n + Math.imul(k, tu)) | 0),
            (i = ((i = (i + Math.imul(k, tc)) | 0) + Math.imul(C, tu)) | 0),
            (o = (o + Math.imul(C, tc)) | 0),
            (n = (n + Math.imul(S, th)) | 0),
            (i = ((i = (i + Math.imul(S, td)) | 0) + Math.imul(M, th)) | 0),
            (o = (o + Math.imul(M, td)) | 0);
          var tI =
            (((c + (n = (n + Math.imul(_, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(_, ty)) | 0) + Math.imul(w, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(w, ty)) | 0) + (i >>> 13)) | 0) +
              (tI >>> 26)) |
            0),
            (tI &= 67108863),
            (n = Math.imul(B, X)),
            (i = ((i = Math.imul(B, tt)) + Math.imul(F, X)) | 0),
            (o = Math.imul(F, tt)),
            (n = (n + Math.imul(j, tr)) | 0),
            (i = ((i = (i + Math.imul(j, tn)) | 0) + Math.imul(P, tr)) | 0),
            (o = (o + Math.imul(P, tn)) | 0),
            (n = (n + Math.imul(T, to)) | 0),
            (i = ((i = (i + Math.imul(T, ts)) | 0) + Math.imul(O, to)) | 0),
            (o = (o + Math.imul(O, ts)) | 0),
            (n = (n + Math.imul(R, tu)) | 0),
            (i = ((i = (i + Math.imul(R, tc)) | 0) + Math.imul(A, tu)) | 0),
            (o = (o + Math.imul(A, tc)) | 0),
            (n = (n + Math.imul(k, th)) | 0),
            (i = ((i = (i + Math.imul(k, td)) | 0) + Math.imul(C, th)) | 0),
            (o = (o + Math.imul(C, td)) | 0);
          var tR =
            (((c + (n = (n + Math.imul(S, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(S, ty)) | 0) + Math.imul(M, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(M, ty)) | 0) + (i >>> 13)) | 0) +
              (tR >>> 26)) |
            0),
            (tR &= 67108863),
            (n = Math.imul(B, tr)),
            (i = ((i = Math.imul(B, tn)) + Math.imul(F, tr)) | 0),
            (o = Math.imul(F, tn)),
            (n = (n + Math.imul(j, to)) | 0),
            (i = ((i = (i + Math.imul(j, ts)) | 0) + Math.imul(P, to)) | 0),
            (o = (o + Math.imul(P, ts)) | 0),
            (n = (n + Math.imul(T, tu)) | 0),
            (i = ((i = (i + Math.imul(T, tc)) | 0) + Math.imul(O, tu)) | 0),
            (o = (o + Math.imul(O, tc)) | 0),
            (n = (n + Math.imul(R, th)) | 0),
            (i = ((i = (i + Math.imul(R, td)) | 0) + Math.imul(A, th)) | 0),
            (o = (o + Math.imul(A, td)) | 0);
          var tA =
            (((c + (n = (n + Math.imul(k, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(k, ty)) | 0) + Math.imul(C, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(C, ty)) | 0) + (i >>> 13)) | 0) +
              (tA >>> 26)) |
            0),
            (tA &= 67108863),
            (n = Math.imul(B, to)),
            (i = ((i = Math.imul(B, ts)) + Math.imul(F, to)) | 0),
            (o = Math.imul(F, ts)),
            (n = (n + Math.imul(j, tu)) | 0),
            (i = ((i = (i + Math.imul(j, tc)) | 0) + Math.imul(P, tu)) | 0),
            (o = (o + Math.imul(P, tc)) | 0),
            (n = (n + Math.imul(T, th)) | 0),
            (i = ((i = (i + Math.imul(T, td)) | 0) + Math.imul(O, th)) | 0),
            (o = (o + Math.imul(O, td)) | 0);
          var tN =
            (((c + (n = (n + Math.imul(R, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(R, ty)) | 0) + Math.imul(A, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(A, ty)) | 0) + (i >>> 13)) | 0) +
              (tN >>> 26)) |
            0),
            (tN &= 67108863),
            (n = Math.imul(B, tu)),
            (i = ((i = Math.imul(B, tc)) + Math.imul(F, tu)) | 0),
            (o = Math.imul(F, tc)),
            (n = (n + Math.imul(j, th)) | 0),
            (i = ((i = (i + Math.imul(j, td)) | 0) + Math.imul(P, th)) | 0),
            (o = (o + Math.imul(P, td)) | 0);
          var tT =
            (((c + (n = (n + Math.imul(T, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(T, ty)) | 0) + Math.imul(O, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(O, ty)) | 0) + (i >>> 13)) | 0) +
              (tT >>> 26)) |
            0),
            (tT &= 67108863),
            (n = Math.imul(B, th)),
            (i = ((i = Math.imul(B, td)) + Math.imul(F, th)) | 0),
            (o = Math.imul(F, td));
          var tO =
            (((c + (n = (n + Math.imul(j, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(j, ty)) | 0) + Math.imul(P, tp)) | 0)) <<
                13)) |
            0;
          (c =
            ((((o = (o + Math.imul(P, ty)) | 0) + (i >>> 13)) | 0) +
              (tO >>> 26)) |
            0),
            (tO &= 67108863);
          var tL =
            (((c + (n = Math.imul(B, tp))) | 0) +
              ((8191 & (i = ((i = Math.imul(B, ty)) + Math.imul(F, tp)) | 0)) <<
                13)) |
            0;
          return (
            (c =
              ((((o = Math.imul(F, ty)) + (i >>> 13)) | 0) + (tL >>> 26)) | 0),
            (tL &= 67108863),
            (u[0] = tg),
            (u[1] = tm),
            (u[2] = tb),
            (u[3] = tv),
            (u[4] = t_),
            (u[5] = tw),
            (u[6] = tE),
            (u[7] = tS),
            (u[8] = tM),
            (u[9] = tx),
            (u[10] = tk),
            (u[11] = tC),
            (u[12] = tI),
            (u[13] = tR),
            (u[14] = tA),
            (u[15] = tN),
            (u[16] = tT),
            (u[17] = tO),
            (u[18] = tL),
            0 !== c && ((u[19] = c), r.length++),
            r
          );
        };
        function m(t, e, r) {
          (r.negative = e.negative ^ t.negative),
            (r.length = t.length + e.length);
          for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
            var s = i;
            i = 0;
            for (
              var a = 67108863 & n,
                u = Math.min(o, e.length - 1),
                c = Math.max(0, o - t.length + 1);
              c <= u;
              c++
            ) {
              var l = o - c,
                h = (0 | t.words[l]) * (0 | e.words[c]),
                d = 67108863 & h;
              (s = (s + ((h / 67108864) | 0)) | 0),
                (a = 67108863 & (d = (d + a) | 0)),
                (i += (s = (s + (d >>> 26)) | 0) >>> 26),
                (s &= 67108863);
            }
            (r.words[o] = a), (n = s), (s = i);
          }
          return 0 !== n ? (r.words[o] = n) : r.length--, r._strip();
        }
        function b(t, e) {
          (this.x = t), (this.y = e);
        }
        Math.imul || (g = y),
          (o.prototype.mulTo = function (t, e) {
            var r,
              n = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? g(this, t, e)
              : n < 63
              ? y(this, t, e)
              : m(this, t, e);
          }),
          (b.prototype.makeRBT = function (t) {
            for (
              var e = Array(t), r = o.prototype._countBits(t) - 1, n = 0;
              n < t;
              n++
            )
              e[n] = this.revBin(n, r, t);
            return e;
          }),
          (b.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t;
            for (var n = 0, i = 0; i < e; i++)
              (n |= (1 & t) << (e - i - 1)), (t >>= 1);
            return n;
          }),
          (b.prototype.permute = function (t, e, r, n, i, o) {
            for (var s = 0; s < o; s++) (n[s] = e[t[s]]), (i[s] = r[t[s]]);
          }),
          (b.prototype.transform = function (t, e, r, n, i, o) {
            this.permute(o, t, e, r, n, i);
            for (var s = 1; s < i; s <<= 1)
              for (
                var a = s << 1,
                  u = Math.cos((2 * Math.PI) / a),
                  c = Math.sin((2 * Math.PI) / a),
                  l = 0;
                l < i;
                l += a
              )
                for (var h = u, d = c, f = 0; f < s; f++) {
                  var p = r[l + f],
                    y = n[l + f],
                    g = r[l + f + s],
                    m = n[l + f + s],
                    b = h * g - d * m;
                  (m = h * m + d * g),
                    (g = b),
                    (r[l + f] = p + g),
                    (n[l + f] = y + m),
                    (r[l + f + s] = p - g),
                    (n[l + f + s] = y - m),
                    f !== a &&
                      ((b = u * h - c * d), (d = u * d + c * h), (h = b));
                }
          }),
          (b.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              n = 1 & r,
              i = 0;
            for (r = (r / 2) | 0; r; r >>>= 1) i++;
            return 1 << (i + 1 + n);
          }),
          (b.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var n = 0; n < r / 2; n++) {
                var i = t[n];
                (t[n] = t[r - n - 1]),
                  (t[r - n - 1] = i),
                  (i = e[n]),
                  (e[n] = -e[r - n - 1]),
                  (e[r - n - 1] = -i);
              }
          }),
          (b.prototype.normalize13b = function (t, e) {
            for (var r = 0, n = 0; n < e / 2; n++) {
              var i =
                8192 * Math.round(t[2 * n + 1] / e) +
                Math.round(t[2 * n] / e) +
                r;
              (t[n] = 67108863 & i),
                (r = i < 67108864 ? 0 : (i / 67108864) | 0);
            }
            return t;
          }),
          (b.prototype.convert13b = function (t, e, r, i) {
            for (var o = 0, s = 0; s < e; s++)
              (o += 0 | t[s]),
                (r[2 * s] = 8191 & o),
                (o >>>= 13),
                (r[2 * s + 1] = 8191 & o),
                (o >>>= 13);
            for (s = 2 * e; s < i; ++s) r[s] = 0;
            n(0 === o), n((-8192 & o) == 0);
          }),
          (b.prototype.stub = function (t) {
            for (var e = Array(t), r = 0; r < t; r++) e[r] = 0;
            return e;
          }),
          (b.prototype.mulp = function (t, e, r) {
            var n = 2 * this.guessLen13b(t.length, e.length),
              i = this.makeRBT(n),
              o = this.stub(n),
              s = Array(n),
              a = Array(n),
              u = Array(n),
              c = Array(n),
              l = Array(n),
              h = Array(n),
              d = r.words;
            (d.length = n),
              this.convert13b(t.words, t.length, s, n),
              this.convert13b(e.words, e.length, c, n),
              this.transform(s, o, a, u, n, i),
              this.transform(c, o, l, h, n, i);
            for (var f = 0; f < n; f++) {
              var p = a[f] * l[f] - u[f] * h[f];
              (u[f] = a[f] * h[f] + u[f] * l[f]), (a[f] = p);
            }
            return (
              this.conjugate(a, u, n),
              this.transform(a, u, d, o, n, i),
              this.conjugate(d, o, n),
              this.normalize13b(d, n),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r._strip()
            );
          }),
          (o.prototype.mul = function (t) {
            var e = new o(null);
            return (e.words = Array(this.length + t.length)), this.mulTo(t, e);
          }),
          (o.prototype.mulf = function (t) {
            var e = new o(null);
            return (e.words = Array(this.length + t.length)), m(this, t, e);
          }),
          (o.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (o.prototype.imuln = function (t) {
            var e = t < 0;
            e && (t = -t), n("number" == typeof t), n(t < 67108864);
            for (var r = 0, i = 0; i < this.length; i++) {
              var o = (0 | this.words[i]) * t,
                s = (67108863 & o) + (67108863 & r);
              (r >>= 26),
                (r += ((o / 67108864) | 0) + (s >>> 26)),
                (this.words[i] = 67108863 & s);
            }
            return (
              0 !== r && ((this.words[i] = r), this.length++),
              e ? this.ineg() : this
            );
          }),
          (o.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (o.prototype.sqr = function () {
            return this.mul(this);
          }),
          (o.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (o.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = Array(t.bitLength()), r = 0; r < e.length; r++) {
                var n = (r / 26) | 0,
                  i = r % 26;
                e[r] = (t.words[n] >>> i) & 1;
              }
              return e;
            })(t);
            if (0 === e.length) return new o(1);
            for (
              var r = this, n = 0;
              n < e.length && 0 === e[n];
              n++, r = r.sqr()
            );
            if (++n < e.length)
              for (var i = r.sqr(); n < e.length; n++, i = i.sqr())
                0 !== e[n] && (r = r.mul(i));
            return r;
          }),
          (o.prototype.iushln = function (t) {
            n("number" == typeof t && t >= 0);
            var e,
              r = t % 26,
              i = (t - r) / 26,
              o = (67108863 >>> (26 - r)) << (26 - r);
            if (0 !== r) {
              var s = 0;
              for (e = 0; e < this.length; e++) {
                var a = this.words[e] & o,
                  u = ((0 | this.words[e]) - a) << r;
                (this.words[e] = u | s), (s = a >>> (26 - r));
              }
              s && ((this.words[e] = s), this.length++);
            }
            if (0 !== i) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + i] = this.words[e];
              for (e = 0; e < i; e++) this.words[e] = 0;
              this.length += i;
            }
            return this._strip();
          }),
          (o.prototype.ishln = function (t) {
            return n(0 === this.negative), this.iushln(t);
          }),
          (o.prototype.iushrn = function (t, e, r) {
            n("number" == typeof t && t >= 0),
              (i = e ? (e - (e % 26)) / 26 : 0);
            var i,
              o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              a = 67108863 ^ ((67108863 >>> o) << o);
            if (((i -= s), (i = Math.max(0, i)), r)) {
              for (var u = 0; u < s; u++) r.words[u] = this.words[u];
              r.length = s;
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, u = 0; u < this.length; u++)
                this.words[u] = this.words[u + s];
            else (this.words[0] = 0), (this.length = 1);
            var c = 0;
            for (u = this.length - 1; u >= 0 && (0 !== c || u >= i); u--) {
              var l = 0 | this.words[u];
              (this.words[u] = (c << (26 - o)) | (l >>> o)), (c = l & a);
            }
            return (
              r && 0 !== c && (r.words[r.length++] = c),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this._strip()
            );
          }),
          (o.prototype.ishrn = function (t, e, r) {
            return n(0 === this.negative), this.iushrn(t, e, r);
          }),
          (o.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (o.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (o.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (o.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (o.prototype.testn = function (t) {
            n("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            return !(this.length <= r) && !!(this.words[r] & (1 << e));
          }),
          (o.prototype.imaskn = function (t) {
            n("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            return (n(
              0 === this.negative,
              "imaskn works only with positive numbers"
            ),
            this.length <= r)
              ? this
              : (0 !== e && r++,
                (this.length = Math.min(r, this.length)),
                0 !== e &&
                  (this.words[this.length - 1] &=
                    67108863 ^ ((67108863 >>> e) << e)),
                this._strip());
          }),
          (o.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (o.prototype.iaddn = function (t) {
            return (n("number" == typeof t), n(t < 67108864), t < 0)
              ? this.isubn(-t)
              : 0 !== this.negative
              ? 1 === this.length && (0 | this.words[0]) <= t
                ? ((this.words[0] = t - (0 | this.words[0])),
                  (this.negative = 0),
                  this)
                : ((this.negative = 0),
                  this.isubn(t),
                  (this.negative = 1),
                  this)
              : this._iaddn(t);
          }),
          (o.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (o.prototype.isubn = function (t) {
            if ((n("number" == typeof t), n(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1);
            return this._strip();
          }),
          (o.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (o.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (o.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (o.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (o.prototype._ishlnsubmul = function (t, e, r) {
            var i,
              o,
              s = t.length + r;
            this._expand(s);
            var a = 0;
            for (i = 0; i < t.length; i++) {
              o = (0 | this.words[i + r]) + a;
              var u = (0 | t.words[i]) * e;
              (o -= 67108863 & u),
                (a = (o >> 26) - ((u / 67108864) | 0)),
                (this.words[i + r] = 67108863 & o);
            }
            for (; i < this.length - r; i++)
              (a = (o = (0 | this.words[i + r]) + a) >> 26),
                (this.words[i + r] = 67108863 & o);
            if (0 === a) return this._strip();
            for (n(-1 === a), a = 0, i = 0; i < this.length; i++)
              (a = (o = -(0 | this.words[i]) + a) >> 26),
                (this.words[i] = 67108863 & o);
            return (this.negative = 1), this._strip();
          }),
          (o.prototype._wordDiv = function (t, e) {
            var r,
              n = this.length - t.length,
              i = this.clone(),
              s = t,
              a = 0 | s.words[s.length - 1];
            0 != (n = 26 - this._countBits(a)) &&
              ((s = s.ushln(n)), i.iushln(n), (a = 0 | s.words[s.length - 1]));
            var u = i.length - s.length;
            if ("mod" !== e) {
              ((r = new o(null)).length = u + 1), (r.words = Array(r.length));
              for (var c = 0; c < r.length; c++) r.words[c] = 0;
            }
            var l = i.clone()._ishlnsubmul(s, 1, u);
            0 === l.negative && ((i = l), r && (r.words[u] = 1));
            for (var h = u - 1; h >= 0; h--) {
              var d =
                (0 | i.words[s.length + h]) * 67108864 +
                (0 | i.words[s.length + h - 1]);
              for (
                d = Math.min((d / a) | 0, 67108863), i._ishlnsubmul(s, d, h);
                0 !== i.negative;

              )
                d--,
                  (i.negative = 0),
                  i._ishlnsubmul(s, 1, h),
                  i.isZero() || (i.negative ^= 1);
              r && (r.words[h] = d);
            }
            return (
              r && r._strip(),
              i._strip(),
              "div" !== e && 0 !== n && i.iushrn(n),
              { div: r || null, mod: i }
            );
          }),
          (o.prototype.divmod = function (t, e, r) {
            var i, s, a;
            return (n(!t.isZero()), this.isZero())
              ? { div: new o(0), mod: new o(0) }
              : 0 !== this.negative && 0 === t.negative
              ? ((a = this.neg().divmod(t, e)),
                "mod" !== e && (i = a.div.neg()),
                "div" !== e &&
                  ((s = a.mod.neg()), r && 0 !== s.negative && s.iadd(t)),
                { div: i, mod: s })
              : 0 === this.negative && 0 !== t.negative
              ? ((a = this.divmod(t.neg(), e)),
                "mod" !== e && (i = a.div.neg()),
                { div: i, mod: a.mod })
              : (this.negative & t.negative) != 0
              ? ((a = this.neg().divmod(t.neg(), e)),
                "div" !== e &&
                  ((s = a.mod.neg()), r && 0 !== s.negative && s.isub(t)),
                { div: a.div, mod: s })
              : t.length > this.length || 0 > this.cmp(t)
              ? { div: new o(0), mod: this }
              : 1 === t.length
              ? "div" === e
                ? { div: this.divn(t.words[0]), mod: null }
                : "mod" === e
                ? { div: null, mod: new o(this.modrn(t.words[0])) }
                : {
                    div: this.divn(t.words[0]),
                    mod: new o(this.modrn(t.words[0])),
                  }
              : this._wordDiv(t, e);
          }),
          (o.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (o.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (o.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (o.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              n = t.ushrn(1),
              i = t.andln(1),
              o = r.cmp(n);
            return o < 0 || (1 === i && 0 === o)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (o.prototype.modrn = function (t) {
            var e = t < 0;
            e && (t = -t), n(t <= 67108863);
            for (var r = 67108864 % t, i = 0, o = this.length - 1; o >= 0; o--)
              i = (r * i + (0 | this.words[o])) % t;
            return e ? -i : i;
          }),
          (o.prototype.modn = function (t) {
            return this.modrn(t);
          }),
          (o.prototype.idivn = function (t) {
            var e = t < 0;
            e && (t = -t), n(t <= 67108863);
            for (var r = 0, i = this.length - 1; i >= 0; i--) {
              var o = (0 | this.words[i]) + 67108864 * r;
              (this.words[i] = (o / t) | 0), (r = o % t);
            }
            return this._strip(), e ? this.ineg() : this;
          }),
          (o.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (o.prototype.egcd = function (t) {
            n(0 === t.negative), n(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var i = new o(1), s = new o(0), a = new o(0), u = new o(1), c = 0;
              e.isEven() && r.isEven();

            )
              e.iushrn(1), r.iushrn(1), ++c;
            for (var l = r.clone(), h = e.clone(); !e.isZero(); ) {
              for (
                var d = 0, f = 1;
                (e.words[0] & f) == 0 && d < 26;
                ++d, f <<= 1
              );
              if (d > 0)
                for (e.iushrn(d); d-- > 0; )
                  (i.isOdd() || s.isOdd()) && (i.iadd(l), s.isub(h)),
                    i.iushrn(1),
                    s.iushrn(1);
              for (
                var p = 0, y = 1;
                (r.words[0] & y) == 0 && p < 26;
                ++p, y <<= 1
              );
              if (p > 0)
                for (r.iushrn(p); p-- > 0; )
                  (a.isOdd() || u.isOdd()) && (a.iadd(l), u.isub(h)),
                    a.iushrn(1),
                    u.iushrn(1);
              e.cmp(r) >= 0
                ? (e.isub(r), i.isub(a), s.isub(u))
                : (r.isub(e), a.isub(i), u.isub(s));
            }
            return { a: a, b: u, gcd: r.iushln(c) };
          }),
          (o.prototype._invmp = function (t) {
            n(0 === t.negative), n(!t.isZero());
            var e,
              r = this,
              i = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var s = new o(1), a = new o(0), u = i.clone();
              r.cmpn(1) > 0 && i.cmpn(1) > 0;

            ) {
              for (
                var c = 0, l = 1;
                (r.words[0] & l) == 0 && c < 26;
                ++c, l <<= 1
              );
              if (c > 0)
                for (r.iushrn(c); c-- > 0; )
                  s.isOdd() && s.iadd(u), s.iushrn(1);
              for (
                var h = 0, d = 1;
                (i.words[0] & d) == 0 && h < 26;
                ++h, d <<= 1
              );
              if (h > 0)
                for (i.iushrn(h); h-- > 0; )
                  a.isOdd() && a.iadd(u), a.iushrn(1);
              r.cmp(i) >= 0 ? (r.isub(i), s.isub(a)) : (i.isub(r), a.isub(s));
            }
            return 0 > (e = 0 === r.cmpn(1) ? s : a).cmpn(0) && e.iadd(t), e;
          }),
          (o.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              r = t.clone();
            (e.negative = 0), (r.negative = 0);
            for (var n = 0; e.isEven() && r.isEven(); n++)
              e.iushrn(1), r.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; r.isEven(); ) r.iushrn(1);
              var i = e.cmp(r);
              if (i < 0) {
                var o = e;
                (e = r), (r = o);
              } else if (0 === i || 0 === r.cmpn(1)) break;
              e.isub(r);
            }
            return r.iushln(n);
          }),
          (o.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (o.prototype.isEven = function () {
            return (1 & this.words[0]) == 0;
          }),
          (o.prototype.isOdd = function () {
            return (1 & this.words[0]) == 1;
          }),
          (o.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (o.prototype.bincn = function (t) {
            n("number" == typeof t);
            var e = t % 26,
              r = (t - e) / 26,
              i = 1 << e;
            if (this.length <= r)
              return this._expand(r + 1), (this.words[r] |= i), this;
            for (var o = i, s = r; 0 !== o && s < this.length; s++) {
              var a = 0 | this.words[s];
              (a += o), (o = a >>> 26), (a &= 67108863), (this.words[s] = a);
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this;
          }),
          (o.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (o.prototype.cmpn = function (t) {
            var e,
              r = t < 0;
            if (0 !== this.negative && !r) return -1;
            if (0 === this.negative && r) return 1;
            if ((this._strip(), this.length > 1)) e = 1;
            else {
              r && (t = -t), n(t <= 67108863, "Number is too big");
              var i = 0 | this.words[0];
              e = i === t ? 0 : i < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var n = 0 | this.words[r],
                i = 0 | t.words[r];
              if (n !== i) {
                n < i ? (e = -1) : n > i && (e = 1);
                break;
              }
            }
            return e;
          }),
          (o.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (o.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (o.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (o.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (o.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (o.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (o.prototype.lten = function (t) {
            return 0 >= this.cmpn(t);
          }),
          (o.prototype.lte = function (t) {
            return 0 >= this.cmp(t);
          }),
          (o.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (o.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (o.red = function (t) {
            return new x(t);
          }),
          (o.prototype.toRed = function (t) {
            return (
              n(!this.red, "Already a number in reduction context"),
              n(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (o.prototype.fromRed = function () {
            return (
              n(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (o.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (o.prototype.forceRed = function (t) {
            return (
              n(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (o.prototype.redAdd = function (t) {
            return (
              n(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (o.prototype.redIAdd = function (t) {
            return (
              n(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (o.prototype.redSub = function (t) {
            return (
              n(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (o.prototype.redISub = function (t) {
            return (
              n(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (o.prototype.redShl = function (t) {
            return (
              n(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (o.prototype.redMul = function (t) {
            return (
              n(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (o.prototype.redIMul = function (t) {
            return (
              n(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (o.prototype.redSqr = function () {
            return (
              n(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (o.prototype.redISqr = function () {
            return (
              n(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (o.prototype.redSqrt = function () {
            return (
              n(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (o.prototype.redInvm = function () {
            return (
              n(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (o.prototype.redNeg = function () {
            return (
              n(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (o.prototype.redPow = function (t) {
            return (
              n(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var v = { k256: null, p224: null, p192: null, p25519: null };
        function _(t, e) {
          (this.name = t),
            (this.p = new o(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new o(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function w() {
          _.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function E() {
          _.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function S() {
          _.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function M() {
          _.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function x(t) {
          if ("string" == typeof t) {
            var e = o._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            n(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function k(t) {
          x.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new o(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (_.prototype._tmp = function () {
          var t = new o(null);
          return (t.words = Array(Math.ceil(this.n / 13))), t;
        }),
          (_.prototype.ireduce = function (t) {
            var e,
              r = t;
            do
              this.split(r, this.tmp),
                (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
            while (e > this.n);
            var n = e < this.n ? -1 : r.ucmp(this.p);
            return (
              0 === n
                ? ((r.words[0] = 0), (r.length = 1))
                : n > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            );
          }),
          (_.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (_.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          i(w, _),
          (w.prototype.split = function (t, e) {
            for (var r = Math.min(t.length, 9), n = 0; n < r; n++)
              e.words[n] = t.words[n];
            if (((e.length = r), t.length <= 9)) {
              (t.words[0] = 0), (t.length = 1);
              return;
            }
            var i = t.words[9];
            for (n = 10, e.words[e.length++] = 4194303 & i; n < t.length; n++) {
              var o = 0 | t.words[n];
              (t.words[n - 10] = ((4194303 & o) << 4) | (i >>> 22)), (i = o);
            }
            (i >>>= 22),
              (t.words[n - 10] = i),
              0 === i && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (w.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, r = 0; r < t.length; r++) {
              var n = 0 | t.words[r];
              (e += 977 * n),
                (t.words[r] = 67108863 & e),
                (e = 64 * n + ((e / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          i(E, _),
          i(S, _),
          i(M, _),
          (M.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var n = (0 | t.words[r]) * 19 + e,
                i = 67108863 & n;
              (n >>>= 26), (t.words[r] = i), (e = n);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (o._prime = function (t) {
            var e;
            if (v[t]) return v[t];
            if ("k256" === t) e = new w();
            else if ("p224" === t) e = new E();
            else if ("p192" === t) e = new S();
            else if ("p25519" === t) e = new M();
            else throw Error("Unknown prime " + t);
            return (v[t] = e), e;
          }),
          (x.prototype._verify1 = function (t) {
            n(0 === t.negative, "red works only with positives"),
              n(t.red, "red works only with red numbers");
          }),
          (x.prototype._verify2 = function (t, e) {
            n((t.negative | e.negative) == 0, "red works only with positives"),
              n(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (x.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : (c(t, t.umod(this.m)._forceRed(this)), t);
          }),
          (x.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (x.prototype.add = function (t, e) {
            this._verify2(t, e);
            var r = t.add(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
          }),
          (x.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var r = t.iadd(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r;
          }),
          (x.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var r = t.sub(e);
            return 0 > r.cmpn(0) && r.iadd(this.m), r._forceRed(this);
          }),
          (x.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var r = t.isub(e);
            return 0 > r.cmpn(0) && r.iadd(this.m), r;
          }),
          (x.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (x.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (x.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (x.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (x.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (x.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((n(e % 2 == 1), 3 === e)) {
              var r = this.m.add(new o(1)).iushrn(2);
              return this.pow(t, r);
            }
            for (
              var i = this.m.subn(1), s = 0;
              !i.isZero() && 0 === i.andln(1);

            )
              s++, i.iushrn(1);
            n(!i.isZero());
            var a = new o(1).toRed(this),
              u = a.redNeg(),
              c = this.m.subn(1).iushrn(1),
              l = this.m.bitLength();
            for (
              l = new o(2 * l * l).toRed(this);
              0 !== this.pow(l, c).cmp(u);

            )
              l.redIAdd(u);
            for (
              var h = this.pow(l, i),
                d = this.pow(t, i.addn(1).iushrn(1)),
                f = this.pow(t, i),
                p = s;
              0 !== f.cmp(a);

            ) {
              for (var y = f, g = 0; 0 !== y.cmp(a); g++) y = y.redSqr();
              n(g < p);
              var m = this.pow(h, new o(1).iushln(p - g - 1));
              (d = d.redMul(m)), (h = m.redSqr()), (f = f.redMul(h)), (p = g);
            }
            return d;
          }),
          (x.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (x.prototype.pow = function (t, e) {
            if (e.isZero()) return new o(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var r = Array(16);
            (r[0] = new o(1).toRed(this)), (r[1] = t);
            for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
            var i = r[0],
              s = 0,
              a = 0,
              u = e.bitLength() % 26;
            for (0 === u && (u = 26), n = e.length - 1; n >= 0; n--) {
              for (var c = e.words[n], l = u - 1; l >= 0; l--) {
                var h = (c >> l) & 1;
                if ((i !== r[0] && (i = this.sqr(i)), 0 === h && 0 === s)) {
                  a = 0;
                  continue;
                }
                (s <<= 1),
                  (s |= h),
                  (4 == ++a || (0 === n && 0 === l)) &&
                    ((i = this.mul(i, r[s])), (a = 0), (s = 0));
              }
              u = 26;
            }
            return i;
          }),
          (x.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (x.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (o.mont = function (t) {
            return new k(t);
          }),
          i(k, x),
          (k.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (k.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (k.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var r = t.imul(e),
              n = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = r.isub(n).iushrn(this.shift),
              o = i;
            return (
              i.cmp(this.m) >= 0
                ? (o = i.isub(this.m))
                : 0 > i.cmpn(0) && (o = i.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (k.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
            var r = t.mul(e),
              n = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = r.isub(n).iushrn(this.shift),
              s = i;
            return (
              i.cmp(this.m) >= 0
                ? (s = i.isub(this.m))
                : 0 > i.cmpn(0) && (s = i.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (k.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })((t = r.nmd(t)), this);
    },
    21924: function (t, e, r) {
      "use strict";
      var n = r(40210),
        i = r(55559),
        o = i(n("String.prototype.indexOf"));
      t.exports = function (t, e) {
        var r = n(t, !!e);
        return "function" == typeof r && o(t, ".prototype.") > -1 ? i(r) : r;
      };
    },
    55559: function (t, e, r) {
      "use strict";
      var n = r(58612),
        i = r(40210),
        o = i("%Function.prototype.apply%"),
        s = i("%Function.prototype.call%"),
        a = i("%Reflect.apply%", !0) || n.call(s, o),
        u = i("%Object.getOwnPropertyDescriptor%", !0),
        c = i("%Object.defineProperty%", !0),
        l = i("%Math.max%");
      if (c)
        try {
          c({}, "a", { value: 1 });
        } catch (t) {
          c = null;
        }
      t.exports = function (t) {
        var e = a(n, s, arguments);
        return (
          u &&
            c &&
            u(e, "length").configurable &&
            c(e, "length", {
              value: 1 + l(0, t.length - (arguments.length - 1)),
            }),
          e
        );
      };
      var h = function () {
        return a(n, o, arguments);
      };
      c ? c(t.exports, "apply", { value: h }) : (t.exports.apply = h);
    },
    86010: function (t, e, r) {
      "use strict";
      function n() {
        for (var t, e, r = 0, n = ""; r < arguments.length; )
          (t = arguments[r++]) &&
            (e = (function t(e) {
              var r,
                n,
                i = "";
              if ("string" == typeof e || "number" == typeof e) i += e;
              else if ("object" == typeof e) {
                if (Array.isArray(e))
                  for (r = 0; r < e.length; r++)
                    e[r] && (n = t(e[r])) && (i && (i += " "), (i += n));
                else for (r in e) e[r] && (i && (i += " "), (i += r));
              }
              return i;
            })(t)) &&
            (n && (n += " "), (n += e));
        return n;
      }
      r.r(e),
        r.d(e, {
          clsx: function () {
            return n;
          },
        }),
        (e.default = n);
    },
    59435: function (t) {
      function e(t, e, r, n) {
        return Math.round(t / r) + " " + n + (e >= 1.5 * r ? "s" : "");
      }
      t.exports = function (t, r) {
        r = r || {};
        var n,
          i,
          o = typeof t;
        if ("string" === o && t.length > 0)
          return (function (t) {
            if (!((t = String(t)).length > 100)) {
              var e =
                /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                  t
                );
              if (e) {
                var r = parseFloat(e[1]);
                switch ((e[2] || "ms").toLowerCase()) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return 315576e5 * r;
                  case "weeks":
                  case "week":
                  case "w":
                    return 6048e5 * r;
                  case "days":
                  case "day":
                  case "d":
                    return 864e5 * r;
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return 36e5 * r;
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return 6e4 * r;
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return 1e3 * r;
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return r;
                  default:
                    return;
                }
              }
            }
          })(t);
        if ("number" === o && isFinite(t))
          return r.long
            ? (n = Math.abs(t)) >= 864e5
              ? e(t, n, 864e5, "day")
              : n >= 36e5
              ? e(t, n, 36e5, "hour")
              : n >= 6e4
              ? e(t, n, 6e4, "minute")
              : n >= 1e3
              ? e(t, n, 1e3, "second")
              : t + " ms"
            : (i = Math.abs(t)) >= 864e5
            ? Math.round(t / 864e5) + "d"
            : i >= 36e5
            ? Math.round(t / 36e5) + "h"
            : i >= 6e4
            ? Math.round(t / 6e4) + "m"
            : i >= 1e3
            ? Math.round(t / 1e3) + "s"
            : t + "ms";
        throw Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(t)
        );
      };
    },
    11227: function (t, e, r) {
      let n;
      var i = r(83454);
      (e.formatArgs = function (e) {
        if (
          ((e[0] =
            (this.useColors ? "%c" : "") +
            this.namespace +
            (this.useColors ? " %c" : " ") +
            e[0] +
            (this.useColors ? "%c " : " ") +
            "+" +
            t.exports.humanize(this.diff)),
          !this.useColors)
        )
          return;
        let r = "color: " + this.color;
        e.splice(1, 0, r, "color: inherit");
        let n = 0,
          i = 0;
        e[0].replace(/%[a-zA-Z%]/g, (t) => {
          "%%" !== t && (n++, "%c" === t && (i = n));
        }),
          e.splice(i, 0, r);
      }),
        (e.save = function (t) {
          try {
            t ? e.storage.setItem("debug", t) : e.storage.removeItem("debug");
          } catch (t) {}
        }),
        (e.load = function () {
          let t;
          try {
            t = e.storage.getItem("debug");
          } catch (t) {}
          return !t && void 0 !== i && "env" in i && (t = i.env.DEBUG), t;
        }),
        (e.useColors = function () {
          return (
            ("undefined" != typeof window &&
              !!window.process &&
              ("renderer" === window.process.type ||
                !!window.process.__nwjs)) ||
            (!(
              "undefined" != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
            ) &&
              (("undefined" != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ("undefined" != typeof window &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }),
        (e.storage = (function () {
          try {
            return localStorage;
          } catch (t) {}
        })()),
        (e.destroy =
          ((n = !1),
          () => {
            n ||
              ((n = !0),
              console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
              ));
          })),
        (e.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33",
        ]),
        (e.log = console.debug || console.log || (() => {})),
        (t.exports = r(82447)(e));
      let { formatters: o } = t.exports;
      o.j = function (t) {
        try {
          return JSON.stringify(t);
        } catch (t) {
          return "[UnexpectedJSONParseError]: " + t.message;
        }
      };
    },
    82447: function (t, e, r) {
      t.exports = function (t) {
        function e(t) {
          let r, i, o;
          let s = null;
          function a(...t) {
            if (!a.enabled) return;
            let n = Number(new Date()),
              i = n - (r || n);
            (a.diff = i),
              (a.prev = r),
              (a.curr = n),
              (r = n),
              (t[0] = e.coerce(t[0])),
              "string" != typeof t[0] && t.unshift("%O");
            let o = 0;
            (t[0] = t[0].replace(/%([a-zA-Z%])/g, (r, n) => {
              if ("%%" === r) return "%";
              o++;
              let i = e.formatters[n];
              if ("function" == typeof i) {
                let e = t[o];
                (r = i.call(a, e)), t.splice(o, 1), o--;
              }
              return r;
            })),
              e.formatArgs.call(a, t);
            let s = a.log || e.log;
            s.apply(a, t);
          }
          return (
            (a.namespace = t),
            (a.useColors = e.useColors()),
            (a.color = e.selectColor(t)),
            (a.extend = n),
            (a.destroy = e.destroy),
            Object.defineProperty(a, "enabled", {
              enumerable: !0,
              configurable: !1,
              get: () =>
                null !== s
                  ? s
                  : (i !== e.namespaces &&
                      ((i = e.namespaces), (o = e.enabled(t))),
                    o),
              set: (t) => {
                s = t;
              },
            }),
            "function" == typeof e.init && e.init(a),
            a
          );
        }
        function n(t, r) {
          let n = e(this.namespace + (void 0 === r ? ":" : r) + t);
          return (n.log = this.log), n;
        }
        function i(t) {
          return t
            .toString()
            .substring(2, t.toString().length - 2)
            .replace(/\.\*\?$/, "*");
        }
        return (
          (e.debug = e),
          (e.default = e),
          (e.coerce = function (t) {
            return t instanceof Error ? t.stack || t.message : t;
          }),
          (e.disable = function () {
            let t = [
              ...e.names.map(i),
              ...e.skips.map(i).map((t) => "-" + t),
            ].join(",");
            return e.enable(""), t;
          }),
          (e.enable = function (t) {
            let r;
            e.save(t), (e.namespaces = t), (e.names = []), (e.skips = []);
            let n = ("string" == typeof t ? t : "").split(/[\s,]+/),
              i = n.length;
            for (r = 0; r < i; r++)
              n[r] &&
                ("-" === (t = n[r].replace(/\*/g, ".*?"))[0]
                  ? e.skips.push(RegExp("^" + t.slice(1) + "$"))
                  : e.names.push(RegExp("^" + t + "$")));
          }),
          (e.enabled = function (t) {
            let r, n;
            if ("*" === t[t.length - 1]) return !0;
            for (r = 0, n = e.skips.length; r < n; r++)
              if (e.skips[r].test(t)) return !1;
            for (r = 0, n = e.names.length; r < n; r++)
              if (e.names[r].test(t)) return !0;
            return !1;
          }),
          (e.humanize = r(59435)),
          (e.destroy = function () {
            console.warn(
              "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            );
          }),
          Object.keys(t).forEach((r) => {
            e[r] = t[r];
          }),
          (e.names = []),
          (e.skips = []),
          (e.formatters = {}),
          (e.selectColor = function (t) {
            let r = 0;
            for (let e = 0; e < t.length; e++)
              r = ((r << 5) - r + t.charCodeAt(e)) | 0;
            return e.colors[Math.abs(r) % e.colors.length];
          }),
          e.enable(e.load()),
          e
        );
      };
    },
    60190: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.BaseBlockTracker = void 0);
      let i = n(r(19394)),
        o = (t, e) => t + e,
        s = ["sync", "latest"];
      class a extends i.default {
        constructor(t) {
          super(),
            (this._blockResetDuration = t.blockResetDuration || 2e4),
            (this._currentBlock = null),
            (this._isRunning = !1),
            (this._onNewListener = this._onNewListener.bind(this)),
            (this._onRemoveListener = this._onRemoveListener.bind(this)),
            (this._resetCurrentBlock = this._resetCurrentBlock.bind(this)),
            this._setupInternalEvents();
        }
        async destroy() {
          this._cancelBlockResetTimeout(),
            await this._maybeEnd(),
            super.removeAllListeners();
        }
        isRunning() {
          return this._isRunning;
        }
        getCurrentBlock() {
          return this._currentBlock;
        }
        async getLatestBlock() {
          if (this._currentBlock) return this._currentBlock;
          let t = await new Promise((t) => this.once("latest", t));
          return t;
        }
        removeAllListeners(t) {
          return (
            t ? super.removeAllListeners(t) : super.removeAllListeners(),
            this._setupInternalEvents(),
            this._onRemoveListener(),
            this
          );
        }
        _setupInternalEvents() {
          this.removeListener("newListener", this._onNewListener),
            this.removeListener("removeListener", this._onRemoveListener),
            this.on("newListener", this._onNewListener),
            this.on("removeListener", this._onRemoveListener);
        }
        _onNewListener(t) {
          s.includes(t) && this._maybeStart();
        }
        _onRemoveListener() {
          this._getBlockTrackerEventCount() > 0 || this._maybeEnd();
        }
        async _maybeStart() {
          this._isRunning ||
            ((this._isRunning = !0),
            this._cancelBlockResetTimeout(),
            await this._start(),
            this.emit("_started"));
        }
        async _maybeEnd() {
          this._isRunning &&
            ((this._isRunning = !1),
            this._setupBlockResetTimeout(),
            await this._end(),
            this.emit("_ended"));
        }
        _getBlockTrackerEventCount() {
          return s.map((t) => this.listenerCount(t)).reduce(o);
        }
        _newPotentialLatest(t) {
          let e = this._currentBlock;
          (e && u(t) <= u(e)) || this._setCurrentBlock(t);
        }
        _setCurrentBlock(t) {
          let e = this._currentBlock;
          (this._currentBlock = t),
            this.emit("latest", t),
            this.emit("sync", { oldBlock: e, newBlock: t });
        }
        _setupBlockResetTimeout() {
          this._cancelBlockResetTimeout(),
            (this._blockResetTimeout = setTimeout(
              this._resetCurrentBlock,
              this._blockResetDuration
            )),
            this._blockResetTimeout.unref && this._blockResetTimeout.unref();
        }
        _cancelBlockResetTimeout() {
          this._blockResetTimeout && clearTimeout(this._blockResetTimeout);
        }
        _resetCurrentBlock() {
          this._currentBlock = null;
        }
      }
      function u(t) {
        return Number.parseInt(t, 16);
      }
      e.BaseBlockTracker = a;
    },
    30790: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.PollingBlockTracker = void 0);
      let i = n(r(23420)),
        o = n(r(62110)),
        s = r(60190),
        a = r(59579),
        u = (0, a.createModuleLogger)(a.projectLogger, "polling-block-tracker"),
        c = (0, i.default)();
      class l extends s.BaseBlockTracker {
        constructor(t = {}) {
          var e;
          if (!t.provider)
            throw Error("PollingBlockTracker - no provider specified.");
          super({
            blockResetDuration:
              null !== (e = t.blockResetDuration) && void 0 !== e
                ? e
                : t.pollingInterval,
          }),
            (this._provider = t.provider),
            (this._pollingInterval = t.pollingInterval || 2e4),
            (this._retryTimeout = t.retryTimeout || this._pollingInterval / 10),
            (this._keepEventLoopActive =
              void 0 === t.keepEventLoopActive || t.keepEventLoopActive),
            (this._setSkipCacheFlag = t.setSkipCacheFlag || !1);
        }
        async checkForLatestBlock() {
          return await this._updateLatestBlock(), await this.getLatestBlock();
        }
        async _start() {
          this._synchronize();
        }
        async _end() {}
        async _synchronize() {
          for (var t; this._isRunning; )
            try {
              await this._updateLatestBlock();
              let t = h(this._pollingInterval, !this._keepEventLoopActive);
              this.emit("_waitingForNextIteration"), await t;
            } catch (n) {
              let e =
                Error(`PollingBlockTracker - encountered an error while attempting to update latest block:
${null !== (t = n.stack) && void 0 !== t ? t : n}`);
              try {
                this.emit("error", e);
              } catch (t) {
                console.error(e);
              }
              let r = h(this._retryTimeout, !this._keepEventLoopActive);
              this.emit("_waitingForNextIteration"), await r;
            }
        }
        async _updateLatestBlock() {
          let t = await this._fetchLatestBlock();
          this._newPotentialLatest(t);
        }
        async _fetchLatestBlock() {
          let t = {
            jsonrpc: "2.0",
            id: c(),
            method: "eth_blockNumber",
            params: [],
          };
          this._setSkipCacheFlag && (t.skipCache = !0), u("Making request", t);
          let e = await (0, o.default)((e) => this._provider.sendAsync(t, e))();
          if ((u("Got response", e), e.error))
            throw Error(`PollingBlockTracker - encountered error fetching block:
${e.error.message}`);
          return e.result;
        }
      }
      function h(t, e) {
        return new Promise((r) => {
          let n = setTimeout(r, t);
          n.unref && e && n.unref();
        });
      }
      e.PollingBlockTracker = l;
    },
    66767: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.SubscribeBlockTracker = void 0);
      let i = n(r(23420)),
        o = r(60190),
        s = (0, i.default)();
      class a extends o.BaseBlockTracker {
        constructor(t = {}) {
          if (!t.provider)
            throw Error("SubscribeBlockTracker - no provider specified.");
          super(t),
            (this._provider = t.provider),
            (this._subscriptionId = null);
        }
        async checkForLatestBlock() {
          return await this.getLatestBlock();
        }
        async _start() {
          if (void 0 === this._subscriptionId || null === this._subscriptionId)
            try {
              let t = await this._call("eth_blockNumber");
              (this._subscriptionId = await this._call(
                "eth_subscribe",
                "newHeads"
              )),
                this._provider.on("data", this._handleSubData.bind(this)),
                this._newPotentialLatest(t);
            } catch (t) {
              this.emit("error", t);
            }
        }
        async _end() {
          if (null !== this._subscriptionId && void 0 !== this._subscriptionId)
            try {
              await this._call("eth_unsubscribe", this._subscriptionId),
                (this._subscriptionId = null);
            } catch (t) {
              this.emit("error", t);
            }
        }
        _call(t, ...e) {
          return new Promise((r, n) => {
            this._provider.sendAsync(
              { id: s(), method: t, params: e, jsonrpc: "2.0" },
              (t, e) => {
                t ? n(t) : r(e.result);
              }
            );
          });
        }
        _handleSubData(t, e) {
          var r;
          "eth_subscription" === e.method &&
            (null === (r = e.params) || void 0 === r
              ? void 0
              : r.subscription) === this._subscriptionId &&
            this._newPotentialLatest(e.params.result.number);
        }
      }
      e.SubscribeBlockTracker = a;
    },
    6842: function (t, e, r) {
      "use strict";
      var n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (t, e, r, n) {
                void 0 === n && (n = r),
                  Object.defineProperty(t, n, {
                    enumerable: !0,
                    get: function () {
                      return e[r];
                    },
                  });
              }
            : function (t, e, r, n) {
                void 0 === n && (n = r), (t[n] = e[r]);
              }),
        i =
          (this && this.__exportStar) ||
          function (t, e) {
            for (var r in t)
              "default" === r ||
                Object.prototype.hasOwnProperty.call(e, r) ||
                n(e, t, r);
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        i(r(30790), e),
        i(r(66767), e),
        i(r(77627), e);
    },
    59579: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createModuleLogger = e.projectLogger = void 0);
      let n = r(42451);
      Object.defineProperty(e, "createModuleLogger", {
        enumerable: !0,
        get: function () {
          return n.createModuleLogger;
        },
      }),
        (e.projectLogger = (0, n.createProjectLogger)("eth-block-tracker"));
    },
    77627: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
    },
    23256: function (t, e, r) {
      let n = r(76622);
      t.exports = class extends n {
        constructor() {
          super(), (this.allResults = []);
        }
        async update() {
          throw Error("BaseFilterWithHistory - no update method specified");
        }
        addResults(t) {
          (this.allResults = this.allResults.concat(t)), super.addResults(t);
        }
        addInitialResults(t) {
          (this.allResults = this.allResults.concat(t)),
            super.addInitialResults(t);
        }
        getAllResults() {
          return this.allResults;
        }
      };
    },
    76622: function (t, e, r) {
      let n = r(19394).default;
      t.exports = class extends n {
        constructor() {
          super(), (this.updates = []);
        }
        async initialize() {}
        async update() {
          throw Error("BaseFilter - no update method specified");
        }
        addResults(t) {
          (this.updates = this.updates.concat(t)),
            t.forEach((t) => this.emit("update", t));
        }
        addInitialResults(t) {}
        getChangesAndClear() {
          let t = this.updates;
          return (this.updates = []), t;
        }
      };
    },
    72785: function (t, e, r) {
      let n = r(76622),
        i = r(40207),
        { incrementHexInt: o } = r(98112);
      t.exports = class extends n {
        constructor({ provider: t, params: e }) {
          super(), (this.type = "block"), (this.provider = t);
        }
        async update({ oldBlock: t, newBlock: e }) {
          let r = o(t),
            n = await i({ provider: this.provider, fromBlock: r, toBlock: e }),
            s = n.map((t) => t.hash);
          this.addResults(s);
        }
      };
    },
    40207: function (t) {
      async function e({ provider: t, fromBlock: e, toBlock: o }) {
        e || (e = o);
        let s = r(e),
          a = r(o),
          u = a - s + 1,
          c = Array(u)
            .fill()
            .map((t, e) => s + e)
            .map(n),
          l = await Promise.all(
            c.map((e) => i(t, "eth_getBlockByNumber", [e, !1]))
          );
        return l;
      }
      function r(t) {
        return null == t ? t : Number.parseInt(t, 16);
      }
      function n(t) {
        if (null == t) return t;
        let e = t.toString(16);
        return "0x" + e;
      }
      async function i(t, e, r) {
        for (let n = 0; n < 3; n++)
          try {
            return await (function (t, e) {
              return new Promise((r, n) => {
                t.sendAsync(e, (t, e) => {
                  t
                    ? n(t)
                    : e.error
                    ? n(e.error)
                    : e.result
                    ? r(e.result)
                    : n(Error("Result was empty"));
                });
              });
            })(t, { id: 1, jsonrpc: "2.0", method: e, params: r });
          } catch (t) {
            console.error(
              `provider.sendAsync failed: ${t.stack || t.message || t}`
            );
          }
        throw Error(`Block not found for params: ${JSON.stringify(r)}`);
      }
      t.exports = e;
    },
    98112: function (t) {
      function e(t) {
        return t.sort((t, e) =>
          "latest" === t || "earliest" === e
            ? 1
            : "latest" === e || "earliest" === t
            ? -1
            : r(t) - r(e)
        );
      }
      function r(t) {
        return null == t ? t : Number.parseInt(t, 16);
      }
      function n(t) {
        if (null == t) return t;
        let e = t.toString(16),
          r = e.length % 2;
        return r && (e = "0" + e), "0x" + e;
      }
      function i() {
        return Math.floor(16 * Math.random()).toString(16);
      }
      t.exports = {
        minBlockRef: function (...t) {
          let r = e(t);
          return r[0];
        },
        maxBlockRef: function (...t) {
          let r = e(t);
          return r[r.length - 1];
        },
        sortBlockRefs: e,
        bnToHex: function (t) {
          return "0x" + t.toString(16);
        },
        blockRefIsNumber: function (t) {
          return t && !["earliest", "latest", "pending"].includes(t);
        },
        hexToInt: r,
        incrementHexInt: function (t) {
          if (null == t) return t;
          let e = r(t);
          return n(e + 1);
        },
        intToHex: n,
        unsafeRandomBytes: function (t) {
          let e = "0x";
          for (let r = 0; r < t; r++) e += i() + i();
          return e;
        },
      };
    },
    98406: function (t, e, r) {
      let n = r(48125).WU,
        { createAsyncMiddleware: i, createScaffoldMiddleware: o } = r(88625),
        s = r(81663),
        a = r(72785),
        u = r(25792),
        { intToHex: c, hexToInt: l } = r(98112);
      function h(t) {
        return d(async (...e) => {
          let r = await t(...e),
            n = c(r.id);
          return n;
        });
      }
      function d(t) {
        return i(async (e, r) => {
          let n = await t.apply(null, e.params);
          r.result = n;
        });
      }
      function f(t, e) {
        let r = [];
        for (let e in t) r.push(t[e]);
        return r;
      }
      t.exports = function ({ blockTracker: t, provider: e }) {
        let r = 0,
          i = {},
          p = new n(),
          y = (function ({ mutex: t }) {
            return (e) => async (r, n, i, o) => {
              let s = await t.acquire();
              s(), e(r, n, i, o);
            };
          })({ mutex: p }),
          g = o({
            eth_newFilter: y(h(b)),
            eth_newBlockFilter: y(h(v)),
            eth_newPendingTransactionFilter: y(h(_)),
            eth_uninstallFilter: y(d(S)),
            eth_getFilterChanges: y(d(w)),
            eth_getFilterLogs: y(d(E)),
          }),
          m = async ({ oldBlock: t, newBlock: e }) => {
            if (0 === i.length) return;
            let r = await p.acquire();
            try {
              await Promise.all(
                f(i).map(async (r) => {
                  try {
                    await r.update({ oldBlock: t, newBlock: e });
                  } catch (t) {
                    console.error(t);
                  }
                })
              );
            } catch (t) {
              console.error(t);
            }
            r();
          };
        return (
          (g.newLogFilter = b),
          (g.newBlockFilter = v),
          (g.newPendingTransactionFilter = _),
          (g.uninstallFilter = S),
          (g.getFilterChanges = w),
          (g.getFilterLogs = E),
          (g.destroy = () => {
            k();
          }),
          g
        );
        async function b(t) {
          let r = new s({ provider: e, params: t });
          return await M(r), r;
        }
        async function v() {
          let t = new a({ provider: e });
          return await M(t), t;
        }
        async function _() {
          let t = new u({ provider: e });
          return await M(t), t;
        }
        async function w(t) {
          let e = l(t),
            r = i[e];
          if (!r) throw Error(`No filter for index "${e}"`);
          let n = r.getChangesAndClear();
          return n;
        }
        async function E(t) {
          let e = l(t),
            r = i[e];
          if (!r) throw Error(`No filter for index "${e}"`);
          let n = [];
          return "log" === r.type && (n = r.getAllResults()), n;
        }
        async function S(t) {
          let e = l(t),
            r = i[e],
            n = !!r;
          return n && (await x(e)), n;
        }
        async function M(e) {
          let n = f(i).length,
            o = await t.getLatestBlock();
          await e.initialize({ currentBlock: o }),
            (i[++r] = e),
            (e.id = r),
            (e.idHex = c(r));
          let s = f(i).length;
          return C({ prevFilterCount: n, newFilterCount: s }), r;
        }
        async function x(t) {
          let e = f(i).length;
          delete i[t];
          let r = f(i).length;
          C({ prevFilterCount: e, newFilterCount: r });
        }
        async function k() {
          let t = f(i).length;
          (i = {}), C({ prevFilterCount: t, newFilterCount: 0 });
        }
        function C({ prevFilterCount: e, newFilterCount: r }) {
          if (0 === e && r > 0) {
            t.on("sync", m);
            return;
          }
          if (e > 0 && 0 === r) {
            t.removeListener("sync", m);
            return;
          }
        }
      };
    },
    81663: function (t, e, r) {
      let n = r(75682),
        i = r(6417),
        o = r(23256),
        {
          bnToHex: s,
          hexToInt: a,
          incrementHexInt: u,
          minBlockRef: c,
          blockRefIsNumber: l,
        } = r(98112);
      t.exports = class extends o {
        constructor({ provider: t, params: e }) {
          super(),
            (this.type = "log"),
            (this.ethQuery = new n(t)),
            (this.params = Object.assign(
              {
                fromBlock: "latest",
                toBlock: "latest",
                address: void 0,
                topics: [],
              },
              e
            )),
            this.params.address &&
              (Array.isArray(this.params.address) ||
                (this.params.address = [this.params.address]),
              (this.params.address = this.params.address.map((t) =>
                t.toLowerCase()
              )));
        }
        async initialize({ currentBlock: t }) {
          let e = this.params.fromBlock;
          ["latest", "pending"].includes(e) && (e = t),
            "earliest" === e && (e = "0x0"),
            (this.params.fromBlock = e);
          let r = c(this.params.toBlock, t),
            n = Object.assign({}, this.params, { toBlock: r }),
            i = await this._fetchLogs(n);
          this.addInitialResults(i);
        }
        async update({ oldBlock: t, newBlock: e }) {
          let r;
          r = t ? u(t) : e;
          let n = Object.assign({}, this.params, { fromBlock: r, toBlock: e }),
            i = await this._fetchLogs(n),
            o = i.filter((t) => this.matchLog(t));
          this.addResults(o);
        }
        async _fetchLogs(t) {
          let e = await i((e) => this.ethQuery.getLogs(t, e))();
          return e;
        }
        matchLog(t) {
          if (
            a(this.params.fromBlock) >= a(t.blockNumber) ||
            (l(this.params.toBlock) &&
              a(this.params.toBlock) <= a(t.blockNumber))
          )
            return !1;
          let e = t.address && t.address.toLowerCase();
          if (this.params.address && e && !this.params.address.includes(e))
            return !1;
          let r = this.params.topics.every((e, r) => {
            let n = t.topics[r];
            if (!n) return !1;
            n = n.toLowerCase();
            let i = Array.isArray(e) ? e : [e],
              o = i.includes(null);
            if (o) return !0;
            i = i.map((t) => t.toLowerCase());
            let s = i.includes(n);
            return s;
          });
          return r;
        }
      };
    },
    6417: function (t) {
      "use strict";
      let e = (t, e, r, n) =>
          function (...i) {
            let o = e.promiseModule;
            return new o((o, s) => {
              e.multiArgs
                ? i.push((...t) => {
                    e.errorFirst ? (t[0] ? s(t) : (t.shift(), o(t))) : o(t);
                  })
                : e.errorFirst
                ? i.push((t, e) => {
                    t ? s(t) : o(e);
                  })
                : i.push(o);
              let a = this === r ? n : this;
              Reflect.apply(t, a, i);
            });
          },
        r = new WeakMap();
      t.exports = (t, n) => {
        n = {
          exclude: [/.+(?:Sync|Stream)$/],
          errorFirst: !0,
          promiseModule: Promise,
          ...n,
        };
        let i = typeof t;
        if (!(null !== t && ("object" === i || "function" === i)))
          throw TypeError(
            `Expected \`input\` to be a \`Function\` or \`Object\`, got \`${
              null === t ? "null" : i
            }\``
          );
        let o = (t, e) => {
            let i = r.get(t);
            if ((i || ((i = {}), r.set(t, i)), e in i)) return i[e];
            let o = (t) =>
                "string" == typeof t || "symbol" == typeof e
                  ? e === t
                  : t.test(e),
              s = Reflect.getOwnPropertyDescriptor(t, e),
              a = void 0 === s || s.writable || s.configurable,
              u = n.include ? n.include.some(o) : !n.exclude.some(o),
              c = u && a;
            return (i[e] = c), c;
          },
          s = new WeakMap(),
          a = new Proxy(t, {
            apply(t, r, i) {
              let o = s.get(t);
              if (o) return Reflect.apply(o, r, i);
              let u = n.excludeMain ? t : e(t, n, a, t);
              return s.set(t, u), Reflect.apply(u, r, i);
            },
            get(t, r) {
              let i = t[r];
              if (!o(t, r) || i === Function.prototype[r]) return i;
              let u = s.get(i);
              if (u) return u;
              if ("function" == typeof i) {
                let r = e(i, n, a, t);
                return s.set(i, r), r;
              }
              return i;
            },
          });
        return a;
      };
    },
    68961: function (t, e, r) {
      let n = r(19394).default,
        { createAsyncMiddleware: i, createScaffoldMiddleware: o } = r(88625),
        s = r(98406),
        { unsafeRandomBytes: a, incrementHexInt: u } = r(98112),
        c = r(40207);
      function l(t) {
        return null == t
          ? null
          : {
              hash: t.hash,
              parentHash: t.parentHash,
              sha3Uncles: t.sha3Uncles,
              miner: t.miner,
              stateRoot: t.stateRoot,
              transactionsRoot: t.transactionsRoot,
              receiptsRoot: t.receiptsRoot,
              logsBloom: t.logsBloom,
              difficulty: t.difficulty,
              number: t.number,
              gasLimit: t.gasLimit,
              gasUsed: t.gasUsed,
              nonce: t.nonce,
              mixHash: t.mixHash,
              timestamp: t.timestamp,
              extraData: t.extraData,
            };
      }
      t.exports = function ({ blockTracker: t, provider: e }) {
        let r = {},
          h = s({ blockTracker: t, provider: e }),
          d = !1,
          f = new n(),
          p = o({ eth_subscribe: i(y), eth_unsubscribe: i(g) });
        return (
          (p.destroy = function () {
            for (let t in (f.removeAllListeners(), r))
              r[t].destroy(), delete r[t];
            d = !0;
          }),
          { events: f, middleware: p }
        );
        async function y(n, i) {
          let o;
          if (d)
            throw Error(
              "SubscriptionManager - attempting to use after destroying"
            );
          let s = n.params[0],
            f = a(16);
          switch (s) {
            case "newHeads":
              o = (function ({ subId: r }) {
                let n = {
                  type: s,
                  destroy: async () => {
                    t.removeListener("sync", n.update);
                  },
                  update: async ({ oldBlock: t, newBlock: n }) => {
                    let i = u(t),
                      o = await c({ provider: e, fromBlock: i, toBlock: n }),
                      s = o.map(l).filter((t) => null !== t);
                    s.forEach((t) => {
                      m(r, t);
                    });
                  },
                };
                return t.on("sync", n.update), n;
              })({ subId: f });
              break;
            case "logs":
              let p = n.params[1],
                y = await h.newLogFilter(p);
              o = (function ({ subId: t, filter: e }) {
                return (
                  e.on("update", (e) => m(t, e)),
                  {
                    type: s,
                    destroy: async () => await h.uninstallFilter(e.idHex),
                  }
                );
              })({ subId: f, filter: y });
              break;
            default:
              throw Error(
                `SubscriptionManager - unsupported subscription type "${s}"`
              );
          }
          (r[f] = o), (i.result = f);
        }
        async function g(t, e) {
          if (d)
            throw Error(
              "SubscriptionManager - attempting to use after destroying"
            );
          let n = t.params[0],
            i = r[n];
          if (!i) {
            e.result = !1;
            return;
          }
          delete r[n], await i.destroy(), (e.result = !0);
        }
        function m(t, e) {
          f.emit("notification", {
            jsonrpc: "2.0",
            method: "eth_subscription",
            params: { subscription: t, result: e },
          });
        }
      };
    },
    25792: function (t, e, r) {
      let n = r(76622),
        i = r(40207),
        { incrementHexInt: o } = r(98112);
      t.exports = class extends n {
        constructor({ provider: t }) {
          super(), (this.type = "tx"), (this.provider = t);
        }
        async update({ oldBlock: t }) {
          let e = o(t),
            r = await i({ provider: this.provider, fromBlock: e, toBlock: t }),
            n = [];
          for (let t of r) n.push(...t.transactions);
          this.addResults(n);
        }
      };
    },
    75682: function (t, e, r) {
      let n = r(47529),
        i = r(23420)();
      function o(t) {
        this.currentProvider = t;
      }
      function s(t) {
        return function () {
          var e = [].slice.call(arguments),
            r = e.pop();
          this.sendAsync({ method: t, params: e }, r);
        };
      }
      function a(t, e) {
        return function () {
          var r = [].slice.call(arguments),
            n = r.pop();
          r.length < t && r.push("latest"),
            this.sendAsync({ method: e, params: r }, n);
        };
      }
      (t.exports = o),
        (o.prototype.getBalance = a(2, "eth_getBalance")),
        (o.prototype.getCode = a(2, "eth_getCode")),
        (o.prototype.getTransactionCount = a(2, "eth_getTransactionCount")),
        (o.prototype.getStorageAt = a(3, "eth_getStorageAt")),
        (o.prototype.call = a(2, "eth_call")),
        (o.prototype.protocolVersion = s("eth_protocolVersion")),
        (o.prototype.syncing = s("eth_syncing")),
        (o.prototype.coinbase = s("eth_coinbase")),
        (o.prototype.mining = s("eth_mining")),
        (o.prototype.hashrate = s("eth_hashrate")),
        (o.prototype.gasPrice = s("eth_gasPrice")),
        (o.prototype.accounts = s("eth_accounts")),
        (o.prototype.blockNumber = s("eth_blockNumber")),
        (o.prototype.getBlockTransactionCountByHash = s(
          "eth_getBlockTransactionCountByHash"
        )),
        (o.prototype.getBlockTransactionCountByNumber = s(
          "eth_getBlockTransactionCountByNumber"
        )),
        (o.prototype.getUncleCountByBlockHash = s(
          "eth_getUncleCountByBlockHash"
        )),
        (o.prototype.getUncleCountByBlockNumber = s(
          "eth_getUncleCountByBlockNumber"
        )),
        (o.prototype.sign = s("eth_sign")),
        (o.prototype.sendTransaction = s("eth_sendTransaction")),
        (o.prototype.sendRawTransaction = s("eth_sendRawTransaction")),
        (o.prototype.estimateGas = s("eth_estimateGas")),
        (o.prototype.getBlockByHash = s("eth_getBlockByHash")),
        (o.prototype.getBlockByNumber = s("eth_getBlockByNumber")),
        (o.prototype.getTransactionByHash = s("eth_getTransactionByHash")),
        (o.prototype.getTransactionByBlockHashAndIndex = s(
          "eth_getTransactionByBlockHashAndIndex"
        )),
        (o.prototype.getTransactionByBlockNumberAndIndex = s(
          "eth_getTransactionByBlockNumberAndIndex"
        )),
        (o.prototype.getTransactionReceipt = s("eth_getTransactionReceipt")),
        (o.prototype.getUncleByBlockHashAndIndex = s(
          "eth_getUncleByBlockHashAndIndex"
        )),
        (o.prototype.getUncleByBlockNumberAndIndex = s(
          "eth_getUncleByBlockNumberAndIndex"
        )),
        (o.prototype.getCompilers = s("eth_getCompilers")),
        (o.prototype.compileLLL = s("eth_compileLLL")),
        (o.prototype.compileSolidity = s("eth_compileSolidity")),
        (o.prototype.compileSerpent = s("eth_compileSerpent")),
        (o.prototype.newFilter = s("eth_newFilter")),
        (o.prototype.newBlockFilter = s("eth_newBlockFilter")),
        (o.prototype.newPendingTransactionFilter = s(
          "eth_newPendingTransactionFilter"
        )),
        (o.prototype.uninstallFilter = s("eth_uninstallFilter")),
        (o.prototype.getFilterChanges = s("eth_getFilterChanges")),
        (o.prototype.getFilterLogs = s("eth_getFilterLogs")),
        (o.prototype.getLogs = s("eth_getLogs")),
        (o.prototype.getWork = s("eth_getWork")),
        (o.prototype.submitWork = s("eth_submitWork")),
        (o.prototype.submitHashrate = s("eth_submitHashrate")),
        (o.prototype.sendAsync = function (t, e) {
          this.currentProvider.sendAsync(
            n({ id: i(), jsonrpc: "2.0", params: [] }, t),
            function (t, r) {
              if (
                (!t &&
                  r.error &&
                  (t = Error("EthQuery - RPC Error - " + r.error.message)),
                t)
              )
                return e(t);
              e(null, r.result);
            }
          );
        });
    },
    12294: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.EthereumProviderError = e.EthereumRpcError = void 0);
      let n = r(4445);
      class i extends Error {
        constructor(t, e, r) {
          if (!Number.isInteger(t)) throw Error('"code" must be an integer.');
          if (!e || "string" != typeof e)
            throw Error('"message" must be a nonempty string.');
          super(e), (this.code = t), void 0 !== r && (this.data = r);
        }
        serialize() {
          let t = { code: this.code, message: this.message };
          return (
            void 0 !== this.data && (t.data = this.data),
            this.stack && (t.stack = this.stack),
            t
          );
        }
        toString() {
          return n.default(this.serialize(), o, 2);
        }
      }
      function o(t, e) {
        if ("[Circular]" !== e) return e;
      }
      (e.EthereumRpcError = i),
        (e.EthereumProviderError = class extends i {
          constructor(t, e, r) {
            if (!(Number.isInteger(t) && t >= 1e3 && t <= 4999))
              throw Error(
                '"code" must be an integer such that: 1000 <= code <= 4999'
              );
            super(t, e, r);
          }
        });
    },
    92662: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.errorValues = e.errorCodes = void 0),
        (e.errorCodes = {
          rpc: {
            invalidInput: -32e3,
            resourceNotFound: -32001,
            resourceUnavailable: -32002,
            transactionRejected: -32003,
            methodNotSupported: -32004,
            limitExceeded: -32005,
            parse: -32700,
            invalidRequest: -32600,
            methodNotFound: -32601,
            invalidParams: -32602,
            internal: -32603,
          },
          provider: {
            userRejectedRequest: 4001,
            unauthorized: 4100,
            unsupportedMethod: 4200,
            disconnected: 4900,
            chainDisconnected: 4901,
          },
        }),
        (e.errorValues = {
          "-32700": {
            standard: "JSON RPC 2.0",
            message:
              "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
          },
          "-32600": {
            standard: "JSON RPC 2.0",
            message: "The JSON sent is not a valid Request object.",
          },
          "-32601": {
            standard: "JSON RPC 2.0",
            message: "The method does not exist / is not available.",
          },
          "-32602": {
            standard: "JSON RPC 2.0",
            message: "Invalid method parameter(s).",
          },
          "-32603": {
            standard: "JSON RPC 2.0",
            message: "Internal JSON-RPC error.",
          },
          "-32000": { standard: "EIP-1474", message: "Invalid input." },
          "-32001": { standard: "EIP-1474", message: "Resource not found." },
          "-32002": { standard: "EIP-1474", message: "Resource unavailable." },
          "-32003": { standard: "EIP-1474", message: "Transaction rejected." },
          "-32004": { standard: "EIP-1474", message: "Method not supported." },
          "-32005": {
            standard: "EIP-1474",
            message: "Request limit exceeded.",
          },
          4001: { standard: "EIP-1193", message: "User rejected the request." },
          4100: {
            standard: "EIP-1193",
            message:
              "The requested account and/or method has not been authorized by the user.",
          },
          4200: {
            standard: "EIP-1193",
            message:
              "The requested method is not supported by this Ethereum provider.",
          },
          4900: {
            standard: "EIP-1193",
            message: "The provider is disconnected from all chains.",
          },
          4901: {
            standard: "EIP-1193",
            message: "The provider is disconnected from the specified chain.",
          },
        });
    },
    68797: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ethErrors = void 0);
      let n = r(12294),
        i = r(68753),
        o = r(92662);
      function s(t, e) {
        let [r, o] = u(e);
        return new n.EthereumRpcError(t, r || i.getMessageFromCode(t), o);
      }
      function a(t, e) {
        let [r, o] = u(e);
        return new n.EthereumProviderError(t, r || i.getMessageFromCode(t), o);
      }
      function u(t) {
        if (t) {
          if ("string" == typeof t) return [t];
          if ("object" == typeof t && !Array.isArray(t)) {
            let { message: e, data: r } = t;
            if (e && "string" != typeof e)
              throw Error("Must specify string message.");
            return [e || void 0, r];
          }
        }
        return [];
      }
      e.ethErrors = {
        rpc: {
          parse: (t) => s(o.errorCodes.rpc.parse, t),
          invalidRequest: (t) => s(o.errorCodes.rpc.invalidRequest, t),
          invalidParams: (t) => s(o.errorCodes.rpc.invalidParams, t),
          methodNotFound: (t) => s(o.errorCodes.rpc.methodNotFound, t),
          internal: (t) => s(o.errorCodes.rpc.internal, t),
          server: (t) => {
            if (!t || "object" != typeof t || Array.isArray(t))
              throw Error(
                "Ethereum RPC Server errors must provide single object argument."
              );
            let { code: e } = t;
            if (!Number.isInteger(e) || e > -32005 || e < -32099)
              throw Error(
                '"code" must be an integer such that: -32099 <= code <= -32005'
              );
            return s(e, t);
          },
          invalidInput: (t) => s(o.errorCodes.rpc.invalidInput, t),
          resourceNotFound: (t) => s(o.errorCodes.rpc.resourceNotFound, t),
          resourceUnavailable: (t) =>
            s(o.errorCodes.rpc.resourceUnavailable, t),
          transactionRejected: (t) =>
            s(o.errorCodes.rpc.transactionRejected, t),
          methodNotSupported: (t) => s(o.errorCodes.rpc.methodNotSupported, t),
          limitExceeded: (t) => s(o.errorCodes.rpc.limitExceeded, t),
        },
        provider: {
          userRejectedRequest: (t) =>
            a(o.errorCodes.provider.userRejectedRequest, t),
          unauthorized: (t) => a(o.errorCodes.provider.unauthorized, t),
          unsupportedMethod: (t) =>
            a(o.errorCodes.provider.unsupportedMethod, t),
          disconnected: (t) => a(o.errorCodes.provider.disconnected, t),
          chainDisconnected: (t) =>
            a(o.errorCodes.provider.chainDisconnected, t),
          custom: (t) => {
            if (!t || "object" != typeof t || Array.isArray(t))
              throw Error(
                "Ethereum Provider custom errors must provide single object argument."
              );
            let { code: e, message: r, data: i } = t;
            if (!r || "string" != typeof r)
              throw Error('"message" must be a nonempty string');
            return new n.EthereumProviderError(e, r, i);
          },
        },
      };
    },
    79826: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.getMessageFromCode =
          e.serializeError =
          e.EthereumProviderError =
          e.EthereumRpcError =
          e.ethErrors =
          e.errorCodes =
            void 0);
      let n = r(12294);
      Object.defineProperty(e, "EthereumRpcError", {
        enumerable: !0,
        get: function () {
          return n.EthereumRpcError;
        },
      }),
        Object.defineProperty(e, "EthereumProviderError", {
          enumerable: !0,
          get: function () {
            return n.EthereumProviderError;
          },
        });
      let i = r(68753);
      Object.defineProperty(e, "serializeError", {
        enumerable: !0,
        get: function () {
          return i.serializeError;
        },
      }),
        Object.defineProperty(e, "getMessageFromCode", {
          enumerable: !0,
          get: function () {
            return i.getMessageFromCode;
          },
        });
      let o = r(68797);
      Object.defineProperty(e, "ethErrors", {
        enumerable: !0,
        get: function () {
          return o.ethErrors;
        },
      });
      let s = r(92662);
      Object.defineProperty(e, "errorCodes", {
        enumerable: !0,
        get: function () {
          return s.errorCodes;
        },
      });
    },
    68753: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.serializeError =
          e.isValidCode =
          e.getMessageFromCode =
          e.JSON_RPC_SERVER_ERROR_MESSAGE =
            void 0);
      let n = r(92662),
        i = r(12294),
        o = n.errorCodes.rpc.internal,
        s = { code: o, message: a(o) };
      function a(
        t,
        r = "Unspecified error message. This is a bug, please report it."
      ) {
        if (Number.isInteger(t)) {
          let r = t.toString();
          if (l(n.errorValues, r)) return n.errorValues[r].message;
          if (t >= -32099 && t <= -32e3) return e.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
        return r;
      }
      function u(t) {
        if (!Number.isInteger(t)) return !1;
        let e = t.toString();
        return !!(n.errorValues[e] || (t >= -32099 && t <= -32e3));
      }
      function c(t) {
        return t && "object" == typeof t && !Array.isArray(t)
          ? Object.assign({}, t)
          : t;
      }
      function l(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      (e.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error."),
        (e.getMessageFromCode = a),
        (e.isValidCode = u),
        (e.serializeError = function (
          t,
          { fallbackError: e = s, shouldIncludeStack: r = !1 } = {}
        ) {
          if (!e || !Number.isInteger(e.code) || "string" != typeof e.message)
            throw Error(
              "Must provide fallback error with integer number code and string message."
            );
          if (t instanceof i.EthereumRpcError) return t.serialize();
          let n = {};
          if (
            t &&
            "object" == typeof t &&
            !Array.isArray(t) &&
            l(t, "code") &&
            u(t.code)
          )
            (n.code = t.code),
              t.message && "string" == typeof t.message
                ? ((n.message = t.message), l(t, "data") && (n.data = t.data))
                : ((n.message = a(n.code)), (n.data = { originalError: c(t) }));
          else {
            n.code = e.code;
            let r = null == t ? void 0 : t.message;
            (n.message = r && "string" == typeof r ? r : e.message),
              (n.data = { originalError: c(t) });
          }
          let o = null == t ? void 0 : t.stack;
          return r && t && o && "string" == typeof o && (n.stack = o), n;
        });
    },
    17187: function (t) {
      "use strict";
      var e,
        r = "object" == typeof Reflect ? Reflect : null,
        n =
          r && "function" == typeof r.apply
            ? r.apply
            : function (t, e, r) {
                return Function.prototype.apply.call(t, e, r);
              };
      e =
        r && "function" == typeof r.ownKeys
          ? r.ownKeys
          : Object.getOwnPropertySymbols
          ? function (t) {
              return Object.getOwnPropertyNames(t).concat(
                Object.getOwnPropertySymbols(t)
              );
            }
          : function (t) {
              return Object.getOwnPropertyNames(t);
            };
      var i =
        Number.isNaN ||
        function (t) {
          return t != t;
        };
      function o() {
        o.init.call(this);
      }
      (t.exports = o),
        (t.exports.once = function (t, e) {
          return new Promise(function (r, n) {
            function i(r) {
              t.removeListener(e, o), n(r);
            }
            function o() {
              "function" == typeof t.removeListener &&
                t.removeListener("error", i),
                r([].slice.call(arguments));
            }
            y(t, e, o, { once: !0 }),
              "error" !== e &&
                "function" == typeof t.on &&
                y(t, "error", i, { once: !0 });
          });
        }),
        (o.EventEmitter = o),
        (o.prototype._events = void 0),
        (o.prototype._eventsCount = 0),
        (o.prototype._maxListeners = void 0);
      var s = 10;
      function a(t) {
        if ("function" != typeof t)
          throw TypeError(
            'The "listener" argument must be of type Function. Received type ' +
              typeof t
          );
      }
      function u(t) {
        return void 0 === t._maxListeners
          ? o.defaultMaxListeners
          : t._maxListeners;
      }
      function c(t, e, r, n) {
        if (
          (a(r),
          void 0 === (o = t._events)
            ? ((o = t._events = Object.create(null)), (t._eventsCount = 0))
            : (void 0 !== o.newListener &&
                (t.emit("newListener", e, r.listener ? r.listener : r),
                (o = t._events)),
              (s = o[e])),
          void 0 === s)
        )
          (s = o[e] = r), ++t._eventsCount;
        else if (
          ("function" == typeof s
            ? (s = o[e] = n ? [r, s] : [s, r])
            : n
            ? s.unshift(r)
            : s.push(r),
          (i = u(t)) > 0 && s.length > i && !s.warned)
        ) {
          s.warned = !0;
          var i,
            o,
            s,
            c = Error(
              "Possible EventEmitter memory leak detected. " +
                s.length +
                " " +
                String(e) +
                " listeners added. Use emitter.setMaxListeners() to increase limit"
            );
          (c.name = "MaxListenersExceededWarning"),
            (c.emitter = t),
            (c.type = e),
            (c.count = s.length),
            console && console.warn && console.warn(c);
        }
        return t;
      }
      function l() {
        if (!this.fired)
          return (this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          0 == arguments.length)
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments);
      }
      function h(t, e, r) {
        var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r },
          i = l.bind(n);
        return (i.listener = r), (n.wrapFn = i), i;
      }
      function d(t, e, r) {
        var n = t._events;
        if (void 0 === n) return [];
        var i = n[e];
        return void 0 === i
          ? []
          : "function" == typeof i
          ? r
            ? [i.listener || i]
            : [i]
          : r
          ? (function (t) {
              for (var e = Array(t.length), r = 0; r < e.length; ++r)
                e[r] = t[r].listener || t[r];
              return e;
            })(i)
          : p(i, i.length);
      }
      function f(t) {
        var e = this._events;
        if (void 0 !== e) {
          var r = e[t];
          if ("function" == typeof r) return 1;
          if (void 0 !== r) return r.length;
        }
        return 0;
      }
      function p(t, e) {
        for (var r = Array(e), n = 0; n < e; ++n) r[n] = t[n];
        return r;
      }
      function y(t, e, r, n) {
        if ("function" == typeof t.on) n.once ? t.once(e, r) : t.on(e, r);
        else if ("function" == typeof t.addEventListener)
          t.addEventListener(e, function i(o) {
            n.once && t.removeEventListener(e, i), r(o);
          });
        else
          throw TypeError(
            'The "emitter" argument must be of type EventEmitter. Received type ' +
              typeof t
          );
      }
      Object.defineProperty(o, "defaultMaxListeners", {
        enumerable: !0,
        get: function () {
          return s;
        },
        set: function (t) {
          if ("number" != typeof t || t < 0 || i(t))
            throw RangeError(
              'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                t +
                "."
            );
          s = t;
        },
      }),
        (o.init = function () {
          (void 0 === this._events ||
            this._events === Object.getPrototypeOf(this)._events) &&
            ((this._events = Object.create(null)), (this._eventsCount = 0)),
            (this._maxListeners = this._maxListeners || void 0);
        }),
        (o.prototype.setMaxListeners = function (t) {
          if ("number" != typeof t || t < 0 || i(t))
            throw RangeError(
              'The value of "n" is out of range. It must be a non-negative number. Received ' +
                t +
                "."
            );
          return (this._maxListeners = t), this;
        }),
        (o.prototype.getMaxListeners = function () {
          return u(this);
        }),
        (o.prototype.emit = function (t) {
          for (var e = [], r = 1; r < arguments.length; r++)
            e.push(arguments[r]);
          var i = "error" === t,
            o = this._events;
          if (void 0 !== o) i = i && void 0 === o.error;
          else if (!i) return !1;
          if (i) {
            if ((e.length > 0 && (s = e[0]), s instanceof Error)) throw s;
            var s,
              a = Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
            throw ((a.context = s), a);
          }
          var u = o[t];
          if (void 0 === u) return !1;
          if ("function" == typeof u) n(u, this, e);
          else
            for (var c = u.length, l = p(u, c), r = 0; r < c; ++r)
              n(l[r], this, e);
          return !0;
        }),
        (o.prototype.addListener = function (t, e) {
          return c(this, t, e, !1);
        }),
        (o.prototype.on = o.prototype.addListener),
        (o.prototype.prependListener = function (t, e) {
          return c(this, t, e, !0);
        }),
        (o.prototype.once = function (t, e) {
          return a(e), this.on(t, h(this, t, e)), this;
        }),
        (o.prototype.prependOnceListener = function (t, e) {
          return a(e), this.prependListener(t, h(this, t, e)), this;
        }),
        (o.prototype.removeListener = function (t, e) {
          var r, n, i, o, s;
          if ((a(e), void 0 === (n = this._events) || void 0 === (r = n[t])))
            return this;
          if (r === e || r.listener === e)
            0 == --this._eventsCount
              ? (this._events = Object.create(null))
              : (delete n[t],
                n.removeListener &&
                  this.emit("removeListener", t, r.listener || e));
          else if ("function" != typeof r) {
            for (i = -1, o = r.length - 1; o >= 0; o--)
              if (r[o] === e || r[o].listener === e) {
                (s = r[o].listener), (i = o);
                break;
              }
            if (i < 0) return this;
            0 === i
              ? r.shift()
              : (function (t, e) {
                  for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                  t.pop();
                })(r, i),
              1 === r.length && (n[t] = r[0]),
              void 0 !== n.removeListener &&
                this.emit("removeListener", t, s || e);
          }
          return this;
        }),
        (o.prototype.off = o.prototype.removeListener),
        (o.prototype.removeAllListeners = function (t) {
          var e, r, n;
          if (void 0 === (r = this._events)) return this;
          if (void 0 === r.removeListener)
            return (
              0 == arguments.length
                ? ((this._events = Object.create(null)),
                  (this._eventsCount = 0))
                : void 0 !== r[t] &&
                  (0 == --this._eventsCount
                    ? (this._events = Object.create(null))
                    : delete r[t]),
              this
            );
          if (0 == arguments.length) {
            var i,
              o = Object.keys(r);
            for (n = 0; n < o.length; ++n)
              "removeListener" !== (i = o[n]) && this.removeAllListeners(i);
            return (
              this.removeAllListeners("removeListener"),
              (this._events = Object.create(null)),
              (this._eventsCount = 0),
              this
            );
          }
          if ("function" == typeof (e = r[t])) this.removeListener(t, e);
          else if (void 0 !== e)
            for (n = e.length - 1; n >= 0; n--) this.removeListener(t, e[n]);
          return this;
        }),
        (o.prototype.listeners = function (t) {
          return d(this, t, !0);
        }),
        (o.prototype.rawListeners = function (t) {
          return d(this, t, !1);
        }),
        (o.listenerCount = function (t, e) {
          return "function" == typeof t.listenerCount
            ? t.listenerCount(e)
            : f.call(t, e);
        }),
        (o.prototype.listenerCount = f),
        (o.prototype.eventNames = function () {
          return this._eventsCount > 0 ? e(this._events) : [];
        });
    },
    4445: function (t) {
      (t.exports = s), (s.default = s), (s.stable = c), (s.stableStringify = c);
      var e = "[...]",
        r = "[Circular]",
        n = [],
        i = [];
      function o() {
        return {
          depthLimit: Number.MAX_SAFE_INTEGER,
          edgesLimit: Number.MAX_SAFE_INTEGER,
        };
      }
      function s(t, s, u, c) {
        void 0 === c && (c = o()),
          (function t(n, i, o, s, u, c, l) {
            if (((c += 1), "object" == typeof n && null !== n)) {
              for (h = 0; h < s.length; h++)
                if (s[h] === n) {
                  a(r, n, i, u);
                  return;
                }
              if (
                (void 0 !== l.depthLimit && c > l.depthLimit) ||
                (void 0 !== l.edgesLimit && o + 1 > l.edgesLimit)
              ) {
                a(e, n, i, u);
                return;
              }
              if ((s.push(n), Array.isArray(n)))
                for (h = 0; h < n.length; h++) t(n[h], h, h, s, n, c, l);
              else {
                var h,
                  d = Object.keys(n);
                for (h = 0; h < d.length; h++) {
                  var f = d[h];
                  t(n[f], f, h, s, n, c, l);
                }
              }
              s.pop();
            }
          })(t, "", 0, [], void 0, 0, c);
        try {
          h =
            0 === i.length
              ? JSON.stringify(t, s, u)
              : JSON.stringify(t, l(s), u);
        } catch (t) {
          return JSON.stringify(
            "[unable to serialize, circular reference is too complex to analyze]"
          );
        } finally {
          for (; 0 !== n.length; ) {
            var h,
              d = n.pop();
            4 === d.length
              ? Object.defineProperty(d[0], d[1], d[3])
              : (d[0][d[1]] = d[2]);
          }
        }
        return h;
      }
      function a(t, e, r, o) {
        var s = Object.getOwnPropertyDescriptor(o, r);
        void 0 !== s.get
          ? s.configurable
            ? (Object.defineProperty(o, r, { value: t }), n.push([o, r, e, s]))
            : i.push([e, r, t])
          : ((o[r] = t), n.push([o, r, e]));
      }
      function u(t, e) {
        return t < e ? -1 : t > e ? 1 : 0;
      }
      function c(t, s, c, h) {
        void 0 === h && (h = o());
        var d,
          f =
            (function t(i, o, s, c, l, h, d) {
              if (((h += 1), "object" == typeof i && null !== i)) {
                for (f = 0; f < c.length; f++)
                  if (c[f] === i) {
                    a(r, i, o, l);
                    return;
                  }
                try {
                  if ("function" == typeof i.toJSON) return;
                } catch (t) {
                  return;
                }
                if (
                  (void 0 !== d.depthLimit && h > d.depthLimit) ||
                  (void 0 !== d.edgesLimit && s + 1 > d.edgesLimit)
                ) {
                  a(e, i, o, l);
                  return;
                }
                if ((c.push(i), Array.isArray(i)))
                  for (f = 0; f < i.length; f++) t(i[f], f, f, c, i, h, d);
                else {
                  var f,
                    p = {},
                    y = Object.keys(i).sort(u);
                  for (f = 0; f < y.length; f++) {
                    var g = y[f];
                    t(i[g], g, f, c, i, h, d), (p[g] = i[g]);
                  }
                  if (void 0 === l) return p;
                  n.push([l, o, i]), (l[o] = p);
                }
                c.pop();
              }
            })(t, "", 0, [], void 0, 0, h) || t;
        try {
          d =
            0 === i.length
              ? JSON.stringify(f, s, c)
              : JSON.stringify(f, l(s), c);
        } catch (t) {
          return JSON.stringify(
            "[unable to serialize, circular reference is too complex to analyze]"
          );
        } finally {
          for (; 0 !== n.length; ) {
            var p = n.pop();
            4 === p.length
              ? Object.defineProperty(p[0], p[1], p[3])
              : (p[0][p[1]] = p[2]);
          }
        }
        return d;
      }
      function l(t) {
        return (
          (t =
            void 0 !== t
              ? t
              : function (t, e) {
                  return e;
                }),
          function (e, r) {
            if (i.length > 0)
              for (var n = 0; n < i.length; n++) {
                var o = i[n];
                if (o[1] === e && o[0] === r) {
                  (r = o[2]), i.splice(n, 1);
                  break;
                }
              }
            return t.call(this, e, r);
          }
        );
      }
    },
    17648: function (t) {
      "use strict";
      var e = Array.prototype.slice,
        r = Object.prototype.toString;
      t.exports = function (t) {
        var n,
          i = this;
        if ("function" != typeof i || "[object Function]" !== r.call(i))
          throw TypeError(
            "Function.prototype.bind called on incompatible " + i
          );
        for (
          var o = e.call(arguments, 1),
            s = Math.max(0, i.length - o.length),
            a = [],
            u = 0;
          u < s;
          u++
        )
          a.push("$" + u);
        if (
          ((n = Function(
            "binder",
            "return function (" +
              a.join(",") +
              "){ return binder.apply(this,arguments); }"
          )(function () {
            if (!(this instanceof n))
              return i.apply(t, o.concat(e.call(arguments)));
            var r = i.apply(this, o.concat(e.call(arguments)));
            return Object(r) === r ? r : this;
          })),
          i.prototype)
        ) {
          var c = function () {};
          (c.prototype = i.prototype),
            (n.prototype = new c()),
            (c.prototype = null);
        }
        return n;
      };
    },
    58612: function (t, e, r) {
      "use strict";
      var n = r(17648);
      t.exports = Function.prototype.bind || n;
    },
    40210: function (t, e, r) {
      "use strict";
      var n,
        i = SyntaxError,
        o = Function,
        s = TypeError,
        a = function (t) {
          try {
            return o('"use strict"; return (' + t + ").constructor;")();
          } catch (t) {}
        },
        u = Object.getOwnPropertyDescriptor;
      if (u)
        try {
          u({}, "");
        } catch (t) {
          u = null;
        }
      var c = function () {
          throw new s();
        },
        l = u
          ? (function () {
              try {
                return arguments.callee, c;
              } catch (t) {
                try {
                  return u(arguments, "callee").get;
                } catch (t) {
                  return c;
                }
              }
            })()
          : c,
        h = r(41405)(),
        d = r(28185)(),
        f =
          Object.getPrototypeOf ||
          (d
            ? function (t) {
                return t.__proto__;
              }
            : null),
        p = {},
        y = "undefined" != typeof Uint8Array && f ? f(Uint8Array) : n,
        g = {
          "%AggregateError%":
            "undefined" == typeof AggregateError ? n : AggregateError,
          "%Array%": Array,
          "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? n : ArrayBuffer,
          "%ArrayIteratorPrototype%": h && f ? f([][Symbol.iterator]()) : n,
          "%AsyncFromSyncIteratorPrototype%": n,
          "%AsyncFunction%": p,
          "%AsyncGenerator%": p,
          "%AsyncGeneratorFunction%": p,
          "%AsyncIteratorPrototype%": p,
          "%Atomics%": "undefined" == typeof Atomics ? n : Atomics,
          "%BigInt%": "undefined" == typeof BigInt ? n : BigInt,
          "%BigInt64Array%":
            "undefined" == typeof BigInt64Array ? n : BigInt64Array,
          "%BigUint64Array%":
            "undefined" == typeof BigUint64Array ? n : BigUint64Array,
          "%Boolean%": Boolean,
          "%DataView%": "undefined" == typeof DataView ? n : DataView,
          "%Date%": Date,
          "%decodeURI%": decodeURI,
          "%decodeURIComponent%": decodeURIComponent,
          "%encodeURI%": encodeURI,
          "%encodeURIComponent%": encodeURIComponent,
          "%Error%": Error,
          "%eval%": eval,
          "%EvalError%": EvalError,
          "%Float32Array%":
            "undefined" == typeof Float32Array ? n : Float32Array,
          "%Float64Array%":
            "undefined" == typeof Float64Array ? n : Float64Array,
          "%FinalizationRegistry%":
            "undefined" == typeof FinalizationRegistry
              ? n
              : FinalizationRegistry,
          "%Function%": o,
          "%GeneratorFunction%": p,
          "%Int8Array%": "undefined" == typeof Int8Array ? n : Int8Array,
          "%Int16Array%": "undefined" == typeof Int16Array ? n : Int16Array,
          "%Int32Array%": "undefined" == typeof Int32Array ? n : Int32Array,
          "%isFinite%": isFinite,
          "%isNaN%": isNaN,
          "%IteratorPrototype%": h && f ? f(f([][Symbol.iterator]())) : n,
          "%JSON%": "object" == typeof JSON ? JSON : n,
          "%Map%": "undefined" == typeof Map ? n : Map,
          "%MapIteratorPrototype%":
            "undefined" != typeof Map && h && f
              ? f(new Map()[Symbol.iterator]())
              : n,
          "%Math%": Math,
          "%Number%": Number,
          "%Object%": Object,
          "%parseFloat%": parseFloat,
          "%parseInt%": parseInt,
          "%Promise%": "undefined" == typeof Promise ? n : Promise,
          "%Proxy%": "undefined" == typeof Proxy ? n : Proxy,
          "%RangeError%": RangeError,
          "%ReferenceError%": ReferenceError,
          "%Reflect%": "undefined" == typeof Reflect ? n : Reflect,
          "%RegExp%": RegExp,
          "%Set%": "undefined" == typeof Set ? n : Set,
          "%SetIteratorPrototype%":
            "undefined" != typeof Set && h && f
              ? f(new Set()[Symbol.iterator]())
              : n,
          "%SharedArrayBuffer%":
            "undefined" == typeof SharedArrayBuffer ? n : SharedArrayBuffer,
          "%String%": String,
          "%StringIteratorPrototype%": h && f ? f(""[Symbol.iterator]()) : n,
          "%Symbol%": h ? Symbol : n,
          "%SyntaxError%": i,
          "%ThrowTypeError%": l,
          "%TypedArray%": y,
          "%TypeError%": s,
          "%Uint8Array%": "undefined" == typeof Uint8Array ? n : Uint8Array,
          "%Uint8ClampedArray%":
            "undefined" == typeof Uint8ClampedArray ? n : Uint8ClampedArray,
          "%Uint16Array%": "undefined" == typeof Uint16Array ? n : Uint16Array,
          "%Uint32Array%": "undefined" == typeof Uint32Array ? n : Uint32Array,
          "%URIError%": URIError,
          "%WeakMap%": "undefined" == typeof WeakMap ? n : WeakMap,
          "%WeakRef%": "undefined" == typeof WeakRef ? n : WeakRef,
          "%WeakSet%": "undefined" == typeof WeakSet ? n : WeakSet,
        };
      if (f)
        try {
          null.error;
        } catch (t) {
          var m = f(f(t));
          g["%Error.prototype%"] = m;
        }
      var b = function t(e) {
          var r;
          if ("%AsyncFunction%" === e) r = a("async function () {}");
          else if ("%GeneratorFunction%" === e) r = a("function* () {}");
          else if ("%AsyncGeneratorFunction%" === e)
            r = a("async function* () {}");
          else if ("%AsyncGenerator%" === e) {
            var n = t("%AsyncGeneratorFunction%");
            n && (r = n.prototype);
          } else if ("%AsyncIteratorPrototype%" === e) {
            var i = t("%AsyncGenerator%");
            i && f && (r = f(i.prototype));
          }
          return (g[e] = r), r;
        },
        v = {
          "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
          "%ArrayPrototype%": ["Array", "prototype"],
          "%ArrayProto_entries%": ["Array", "prototype", "entries"],
          "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
          "%ArrayProto_keys%": ["Array", "prototype", "keys"],
          "%ArrayProto_values%": ["Array", "prototype", "values"],
          "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
          "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
          "%AsyncGeneratorPrototype%": [
            "AsyncGeneratorFunction",
            "prototype",
            "prototype",
          ],
          "%BooleanPrototype%": ["Boolean", "prototype"],
          "%DataViewPrototype%": ["DataView", "prototype"],
          "%DatePrototype%": ["Date", "prototype"],
          "%ErrorPrototype%": ["Error", "prototype"],
          "%EvalErrorPrototype%": ["EvalError", "prototype"],
          "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
          "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
          "%FunctionPrototype%": ["Function", "prototype"],
          "%Generator%": ["GeneratorFunction", "prototype"],
          "%GeneratorPrototype%": [
            "GeneratorFunction",
            "prototype",
            "prototype",
          ],
          "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
          "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
          "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
          "%JSONParse%": ["JSON", "parse"],
          "%JSONStringify%": ["JSON", "stringify"],
          "%MapPrototype%": ["Map", "prototype"],
          "%NumberPrototype%": ["Number", "prototype"],
          "%ObjectPrototype%": ["Object", "prototype"],
          "%ObjProto_toString%": ["Object", "prototype", "toString"],
          "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
          "%PromisePrototype%": ["Promise", "prototype"],
          "%PromiseProto_then%": ["Promise", "prototype", "then"],
          "%Promise_all%": ["Promise", "all"],
          "%Promise_reject%": ["Promise", "reject"],
          "%Promise_resolve%": ["Promise", "resolve"],
          "%RangeErrorPrototype%": ["RangeError", "prototype"],
          "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
          "%RegExpPrototype%": ["RegExp", "prototype"],
          "%SetPrototype%": ["Set", "prototype"],
          "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
          "%StringPrototype%": ["String", "prototype"],
          "%SymbolPrototype%": ["Symbol", "prototype"],
          "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
          "%TypedArrayPrototype%": ["TypedArray", "prototype"],
          "%TypeErrorPrototype%": ["TypeError", "prototype"],
          "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
          "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
          "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
          "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
          "%URIErrorPrototype%": ["URIError", "prototype"],
          "%WeakMapPrototype%": ["WeakMap", "prototype"],
          "%WeakSetPrototype%": ["WeakSet", "prototype"],
        },
        _ = r(58612),
        w = r(17642),
        E = _.call(Function.call, Array.prototype.concat),
        S = _.call(Function.apply, Array.prototype.splice),
        M = _.call(Function.call, String.prototype.replace),
        x = _.call(Function.call, String.prototype.slice),
        k = _.call(Function.call, RegExp.prototype.exec),
        C =
          /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
        I = /\\(\\)?/g,
        R = function (t) {
          var e = x(t, 0, 1),
            r = x(t, -1);
          if ("%" === e && "%" !== r)
            throw new i("invalid intrinsic syntax, expected closing `%`");
          if ("%" === r && "%" !== e)
            throw new i("invalid intrinsic syntax, expected opening `%`");
          var n = [];
          return (
            M(t, C, function (t, e, r, i) {
              n[n.length] = r ? M(i, I, "$1") : e || t;
            }),
            n
          );
        },
        A = function (t, e) {
          var r,
            n = t;
          if ((w(v, n) && (n = "%" + (r = v[n])[0] + "%"), w(g, n))) {
            var o = g[n];
            if ((o === p && (o = b(n)), void 0 === o && !e))
              throw new s(
                "intrinsic " +
                  t +
                  " exists, but is not available. Please file an issue!"
              );
            return { alias: r, name: n, value: o };
          }
          throw new i("intrinsic " + t + " does not exist!");
        };
      t.exports = function (t, e) {
        if ("string" != typeof t || 0 === t.length)
          throw new s("intrinsic name must be a non-empty string");
        if (arguments.length > 1 && "boolean" != typeof e)
          throw new s('"allowMissing" argument must be a boolean');
        if (null === k(/^%?[^%]*%?$/, t))
          throw new i(
            "`%` may not be present anywhere but at the beginning and end of the intrinsic name"
          );
        var r = R(t),
          n = r.length > 0 ? r[0] : "",
          o = A("%" + n + "%", e),
          a = o.name,
          c = o.value,
          l = !1,
          h = o.alias;
        h && ((n = h[0]), S(r, E([0, 1], h)));
        for (var d = 1, f = !0; d < r.length; d += 1) {
          var p = r[d],
            y = x(p, 0, 1),
            m = x(p, -1);
          if (
            ('"' === y ||
              "'" === y ||
              "`" === y ||
              '"' === m ||
              "'" === m ||
              "`" === m) &&
            y !== m
          )
            throw new i("property names with quotes must have matching quotes");
          if (
            (("constructor" !== p && f) || (l = !0),
            (n += "." + p),
            w(g, (a = "%" + n + "%")))
          )
            c = g[a];
          else if (null != c) {
            if (!(p in c)) {
              if (!e)
                throw new s(
                  "base intrinsic for " +
                    t +
                    " exists, but the property is not available."
                );
              return;
            }
            if (u && d + 1 >= r.length) {
              var b = u(c, p);
              c =
                (f = !!b) && "get" in b && !("originalValue" in b.get)
                  ? b.get
                  : c[p];
            } else (f = w(c, p)), (c = c[p]);
            f && !l && (g[a] = c);
          }
        }
        return c;
      };
    },
    28185: function (t) {
      "use strict";
      var e = { foo: {} },
        r = Object;
      t.exports = function () {
        return (
          { __proto__: e }.foo === e.foo && !({ __proto__: null } instanceof r)
        );
      };
    },
    41405: function (t, e, r) {
      "use strict";
      var n = "undefined" != typeof Symbol && Symbol,
        i = r(55419);
      t.exports = function () {
        return (
          "function" == typeof n &&
          "function" == typeof Symbol &&
          "symbol" == typeof n("foo") &&
          "symbol" == typeof Symbol("bar") &&
          i()
        );
      };
    },
    55419: function (t) {
      "use strict";
      t.exports = function () {
        if (
          "function" != typeof Symbol ||
          "function" != typeof Object.getOwnPropertySymbols
        )
          return !1;
        if ("symbol" == typeof Symbol.iterator) return !0;
        var t = {},
          e = Symbol("test"),
          r = Object(e);
        if (
          "string" == typeof e ||
          "[object Symbol]" !== Object.prototype.toString.call(e) ||
          "[object Symbol]" !== Object.prototype.toString.call(r)
        )
          return !1;
        for (e in ((t[e] = 42), t)) return !1;
        if (
          ("function" == typeof Object.keys && 0 !== Object.keys(t).length) ||
          ("function" == typeof Object.getOwnPropertyNames &&
            0 !== Object.getOwnPropertyNames(t).length)
        )
          return !1;
        var n = Object.getOwnPropertySymbols(t);
        if (
          1 !== n.length ||
          n[0] !== e ||
          !Object.prototype.propertyIsEnumerable.call(t, e)
        )
          return !1;
        if ("function" == typeof Object.getOwnPropertyDescriptor) {
          var i = Object.getOwnPropertyDescriptor(t, e);
          if (42 !== i.value || !0 !== i.enumerable) return !1;
        }
        return !0;
      };
    },
    17642: function (t, e, r) {
      "use strict";
      var n = r(58612);
      t.exports = n.call(Function.call, Object.prototype.hasOwnProperty);
    },
    35717: function (t) {
      "function" == typeof Object.create
        ? (t.exports = function (t, e) {
            e &&
              ((t.super_ = e),
              (t.prototype = Object.create(e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })));
          })
        : (t.exports = function (t, e) {
            if (e) {
              t.super_ = e;
              var r = function () {};
              (r.prototype = e.prototype),
                (t.prototype = new r()),
                (t.prototype.constructor = t);
            }
          });
    },
    17398: function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.JsonRpcEngine = void 0);
      let i = n(r(19394)),
        o = r(22374);
      class s extends i.default {
        constructor() {
          super(), (this._middleware = []);
        }
        push(t) {
          this._middleware.push(t);
        }
        handle(t, e) {
          if (e && "function" != typeof e)
            throw Error('"callback" must be a function if provided.');
          return Array.isArray(t)
            ? e
              ? this._handleBatch(t, e)
              : this._handleBatch(t)
            : e
            ? this._handle(t, e)
            : this._promiseHandle(t);
        }
        asMiddleware() {
          return async (t, e, r, n) => {
            try {
              let [i, o, a] = await s._runAllMiddleware(t, e, this._middleware);
              if (o) return await s._runReturnHandlers(a), n(i);
              return r(async (t) => {
                try {
                  await s._runReturnHandlers(a);
                } catch (e) {
                  return t(e);
                }
                return t();
              });
            } catch (t) {
              return n(t);
            }
          };
        }
        async _handleBatch(t, e) {
          try {
            let r = await Promise.all(t.map(this._promiseHandle.bind(this)));
            if (e) return e(null, r);
            return r;
          } catch (t) {
            if (e) return e(t);
            throw t;
          }
        }
        _promiseHandle(t) {
          return new Promise((e) => {
            this._handle(t, (t, r) => {
              e(r);
            });
          });
        }
        async _handle(t, e) {
          if (!t || Array.isArray(t) || "object" != typeof t) {
            let r = new o.EthereumRpcError(
              o.errorCodes.rpc.invalidRequest,
              `Requests must be plain objects. Received: ${typeof t}`,
              { request: t }
            );
            return e(r, { id: void 0, jsonrpc: "2.0", error: r });
          }
          if ("string" != typeof t.method) {
            let r = new o.EthereumRpcError(
              o.errorCodes.rpc.invalidRequest,
              `Must specify a string method. Received: ${typeof t.method}`,
              { request: t }
            );
            return e(r, { id: t.id, jsonrpc: "2.0", error: r });
          }
          let r = Object.assign({}, t),
            n = { id: r.id, jsonrpc: r.jsonrpc },
            i = null;
          try {
            await this._processRequest(r, n);
          } catch (t) {
            i = t;
          }
          return (
            i && (delete n.result, n.error || (n.error = o.serializeError(i))),
            e(i, n)
          );
        }
        async _processRequest(t, e) {
          let [r, n, i] = await s._runAllMiddleware(t, e, this._middleware);
          if (
            (s._checkForCompletion(t, e, n), await s._runReturnHandlers(i), r)
          )
            throw r;
        }
        static async _runAllMiddleware(t, e, r) {
          let n = [],
            i = null,
            o = !1;
          for (let a of r)
            if ((([i, o] = await s._runMiddleware(t, e, a, n)), o)) break;
          return [i, o, n.reverse()];
        }
        static _runMiddleware(t, e, r, n) {
          return new Promise((i) => {
            let s = (t) => {
              let r = t || e.error;
              r && (e.error = o.serializeError(r)), i([r, !0]);
            };
            try {
              r(
                t,
                e,
                (r) => {
                  e.error
                    ? s(e.error)
                    : (r &&
                        ("function" != typeof r &&
                          s(
                            new o.EthereumRpcError(
                              o.errorCodes.rpc.internal,
                              `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof r}" for request:
${a(t)}`,
                              { request: t }
                            )
                          ),
                        n.push(r)),
                      i([null, !1]));
                },
                s
              );
            } catch (t) {
              s(t);
            }
          });
        }
        static async _runReturnHandlers(t) {
          for (let e of t)
            await new Promise((t, r) => {
              e((e) => (e ? r(e) : t()));
            });
        }
        static _checkForCompletion(t, e, r) {
          if (!("result" in e) && !("error" in e))
            throw new o.EthereumRpcError(
              o.errorCodes.rpc.internal,
              `JsonRpcEngine: Response has no error or result for request:
${a(t)}`,
              { request: t }
            );
          if (!r)
            throw new o.EthereumRpcError(
              o.errorCodes.rpc.internal,
              `JsonRpcEngine: Nothing ended request:
${a(t)}`,
              { request: t }
            );
        }
      }
      function a(t) {
        return JSON.stringify(t, null, 2);
      }
      e.JsonRpcEngine = s;
    },
    31841: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createAsyncMiddleware = void 0),
        (e.createAsyncMiddleware = function (t) {
          return async (e, r, n, i) => {
            let o;
            let s = new Promise((t) => {
                o = t;
              }),
              a = null,
              u = !1,
              c = async () => {
                (u = !0),
                  n((t) => {
                    (a = t), o();
                  }),
                  await s;
              };
            try {
              await t(e, r, c), u ? (await s, a(null)) : i(null);
            } catch (t) {
              a ? a(t) : i(t);
            }
          };
        });
    },
    48508: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createScaffoldMiddleware = void 0),
        (e.createScaffoldMiddleware = function (t) {
          return (e, r, n, i) => {
            let o = t[e.method];
            return void 0 === o
              ? n()
              : "function" == typeof o
              ? o(e, r, n, i)
              : ((r.result = o), i());
          };
        });
    },
    33107: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.getUniqueId = void 0);
      let r = Math.floor(4294967295 * Math.random());
      e.getUniqueId = function () {
        return (r = (r + 1) % 4294967295);
      };
    },
    85086: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createIdRemapMiddleware = void 0);
      let n = r(33107);
      e.createIdRemapMiddleware = function () {
        return (t, e, r, i) => {
          let o = t.id,
            s = n.getUniqueId();
          (t.id = s),
            (e.id = s),
            r((r) => {
              (t.id = o), (e.id = o), r();
            });
        };
      };
    },
    88625: function (t, e, r) {
      "use strict";
      var n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (t, e, r, n) {
                void 0 === n && (n = r),
                  Object.defineProperty(t, n, {
                    enumerable: !0,
                    get: function () {
                      return e[r];
                    },
                  });
              }
            : function (t, e, r, n) {
                void 0 === n && (n = r), (t[n] = e[r]);
              }),
        i =
          (this && this.__exportStar) ||
          function (t, e) {
            for (var r in t)
              "default" === r ||
                Object.prototype.hasOwnProperty.call(e, r) ||
                n(e, t, r);
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        i(r(85086), e),
        i(r(31841), e),
        i(r(48508), e),
        i(r(33107), e),
        i(r(17398), e),
        i(r(79962), e);
    },
    79962: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.mergeMiddleware = void 0);
      let n = r(17398);
      e.mergeMiddleware = function (t) {
        let e = new n.JsonRpcEngine();
        return t.forEach((t) => e.push(t)), e.asMiddleware();
      };
    },
    60010: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.EthereumProviderError = e.EthereumRpcError = void 0);
      let n = r(4445);
      class i extends Error {
        constructor(t, e, r) {
          if (!Number.isInteger(t)) throw Error('"code" must be an integer.');
          if (!e || "string" != typeof e)
            throw Error('"message" must be a nonempty string.');
          super(e), (this.code = t), void 0 !== r && (this.data = r);
        }
        serialize() {
          let t = { code: this.code, message: this.message };
          return (
            void 0 !== this.data && (t.data = this.data),
            this.stack && (t.stack = this.stack),
            t
          );
        }
        toString() {
          return n.default(this.serialize(), o, 2);
        }
      }
      function o(t, e) {
        if ("[Circular]" !== e) return e;
      }
      (e.EthereumRpcError = i),
        (e.EthereumProviderError = class extends i {
          constructor(t, e, r) {
            if (!(Number.isInteger(t) && t >= 1e3 && t <= 4999))
              throw Error(
                '"code" must be an integer such that: 1000 <= code <= 4999'
              );
            super(t, e, r);
          }
        });
    },
    22608: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.errorValues = e.errorCodes = void 0),
        (e.errorCodes = {
          rpc: {
            invalidInput: -32e3,
            resourceNotFound: -32001,
            resourceUnavailable: -32002,
            transactionRejected: -32003,
            methodNotSupported: -32004,
            limitExceeded: -32005,
            parse: -32700,
            invalidRequest: -32600,
            methodNotFound: -32601,
            invalidParams: -32602,
            internal: -32603,
          },
          provider: {
            userRejectedRequest: 4001,
            unauthorized: 4100,
            unsupportedMethod: 4200,
            disconnected: 4900,
            chainDisconnected: 4901,
          },
        }),
        (e.errorValues = {
          "-32700": {
            standard: "JSON RPC 2.0",
            message:
              "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
          },
          "-32600": {
            standard: "JSON RPC 2.0",
            message: "The JSON sent is not a valid Request object.",
          },
          "-32601": {
            standard: "JSON RPC 2.0",
            message: "The method does not exist / is not available.",
          },
          "-32602": {
            standard: "JSON RPC 2.0",
            message: "Invalid method parameter(s).",
          },
          "-32603": {
            standard: "JSON RPC 2.0",
            message: "Internal JSON-RPC error.",
          },
          "-32000": { standard: "EIP-1474", message: "Invalid input." },
          "-32001": { standard: "EIP-1474", message: "Resource not found." },
          "-32002": { standard: "EIP-1474", message: "Resource unavailable." },
          "-32003": { standard: "EIP-1474", message: "Transaction rejected." },
          "-32004": { standard: "EIP-1474", message: "Method not supported." },
          "-32005": {
            standard: "EIP-1474",
            message: "Request limit exceeded.",
          },
          4001: { standard: "EIP-1193", message: "User rejected the request." },
          4100: {
            standard: "EIP-1193",
            message:
              "The requested account and/or method has not been authorized by the user.",
          },
          4200: {
            standard: "EIP-1193",
            message:
              "The requested method is not supported by this Ethereum provider.",
          },
          4900: {
            standard: "EIP-1193",
            message: "The provider is disconnected from all chains.",
          },
          4901: {
            standard: "EIP-1193",
            message: "The provider is disconnected from the specified chain.",
          },
        });
    },
    76152: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ethErrors = void 0);
      let n = r(60010),
        i = r(5548),
        o = r(22608);
      function s(t, e) {
        let [r, o] = u(e);
        return new n.EthereumRpcError(t, r || i.getMessageFromCode(t), o);
      }
      function a(t, e) {
        let [r, o] = u(e);
        return new n.EthereumProviderError(t, r || i.getMessageFromCode(t), o);
      }
      function u(t) {
        if (t) {
          if ("string" == typeof t) return [t];
          if ("object" == typeof t && !Array.isArray(t)) {
            let { message: e, data: r } = t;
            if (e && "string" != typeof e)
              throw Error("Must specify string message.");
            return [e || void 0, r];
          }
        }
        return [];
      }
      e.ethErrors = {
        rpc: {
          parse: (t) => s(o.errorCodes.rpc.parse, t),
          invalidRequest: (t) => s(o.errorCodes.rpc.invalidRequest, t),
          invalidParams: (t) => s(o.errorCodes.rpc.invalidParams, t),
          methodNotFound: (t) => s(o.errorCodes.rpc.methodNotFound, t),
          internal: (t) => s(o.errorCodes.rpc.internal, t),
          server: (t) => {
            if (!t || "object" != typeof t || Array.isArray(t))
              throw Error(
                "Ethereum RPC Server errors must provide single object argument."
              );
            let { code: e } = t;
            if (!Number.isInteger(e) || e > -32005 || e < -32099)
              throw Error(
                '"code" must be an integer such that: -32099 <= code <= -32005'
              );
            return s(e, t);
          },
          invalidInput: (t) => s(o.errorCodes.rpc.invalidInput, t),
          resourceNotFound: (t) => s(o.errorCodes.rpc.resourceNotFound, t),
          resourceUnavailable: (t) =>
            s(o.errorCodes.rpc.resourceUnavailable, t),
          transactionRejected: (t) =>
            s(o.errorCodes.rpc.transactionRejected, t),
          methodNotSupported: (t) => s(o.errorCodes.rpc.methodNotSupported, t),
          limitExceeded: (t) => s(o.errorCodes.rpc.limitExceeded, t),
        },
        provider: {
          userRejectedRequest: (t) =>
            a(o.errorCodes.provider.userRejectedRequest, t),
          unauthorized: (t) => a(o.errorCodes.provider.unauthorized, t),
          unsupportedMethod: (t) =>
            a(o.errorCodes.provider.unsupportedMethod, t),
          disconnected: (t) => a(o.errorCodes.provider.disconnected, t),
          chainDisconnected: (t) =>
            a(o.errorCodes.provider.chainDisconnected, t),
          custom: (t) => {
            if (!t || "object" != typeof t || Array.isArray(t))
              throw Error(
                "Ethereum Provider custom errors must provide single object argument."
              );
            let { code: e, message: r, data: i } = t;
            if (!r || "string" != typeof r)
              throw Error('"message" must be a nonempty string');
            return new n.EthereumProviderError(e, r, i);
          },
        },
      };
    },
    22374: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.getMessageFromCode =
          e.serializeError =
          e.EthereumProviderError =
          e.EthereumRpcError =
          e.ethErrors =
          e.errorCodes =
            void 0);
      let n = r(60010);
      Object.defineProperty(e, "EthereumRpcError", {
        enumerable: !0,
        get: function () {
          return n.EthereumRpcError;
        },
      }),
        Object.defineProperty(e, "EthereumProviderError", {
          enumerable: !0,
          get: function () {
            return n.EthereumProviderError;
          },
        });
      let i = r(5548);
      Object.defineProperty(e, "serializeError", {
        enumerable: !0,
        get: function () {
          return i.serializeError;
        },
      }),
        Object.defineProperty(e, "getMessageFromCode", {
          enumerable: !0,
          get: function () {
            return i.getMessageFromCode;
          },
        });
      let o = r(76152);
      Object.defineProperty(e, "ethErrors", {
        enumerable: !0,
        get: function () {
          return o.ethErrors;
        },
      });
      let s = r(22608);
      Object.defineProperty(e, "errorCodes", {
        enumerable: !0,
        get: function () {
          return s.errorCodes;
        },
      });
    },
    5548: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.serializeError =
          e.isValidCode =
          e.getMessageFromCode =
          e.JSON_RPC_SERVER_ERROR_MESSAGE =
            void 0);
      let n = r(22608),
        i = r(60010),
        o = n.errorCodes.rpc.internal,
        s = { code: o, message: a(o) };
      function a(
        t,
        r = "Unspecified error message. This is a bug, please report it."
      ) {
        if (Number.isInteger(t)) {
          let r = t.toString();
          if (l(n.errorValues, r)) return n.errorValues[r].message;
          if (t >= -32099 && t <= -32e3) return e.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
        return r;
      }
      function u(t) {
        if (!Number.isInteger(t)) return !1;
        let e = t.toString();
        return !!(n.errorValues[e] || (t >= -32099 && t <= -32e3));
      }
      function c(t) {
        return t && "object" == typeof t && !Array.isArray(t)
          ? Object.assign({}, t)
          : t;
      }
      function l(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      (e.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error."),
        (e.getMessageFromCode = a),
        (e.isValidCode = u),
        (e.serializeError = function (
          t,
          { fallbackError: e = s, shouldIncludeStack: r = !1 } = {}
        ) {
          if (!e || !Number.isInteger(e.code) || "string" != typeof e.message)
            throw Error(
              "Must provide fallback error with integer number code and string message."
            );
          if (t instanceof i.EthereumRpcError) return t.serialize();
          let n = {};
          if (
            t &&
            "object" == typeof t &&
            !Array.isArray(t) &&
            l(t, "code") &&
            u(t.code)
          )
            (n.code = t.code),
              t.message && "string" == typeof t.message
                ? ((n.message = t.message), l(t, "data") && (n.data = t.data))
                : ((n.message = a(n.code)), (n.data = { originalError: c(t) }));
          else {
            n.code = e.code;
            let r = null == t ? void 0 : t.message;
            (n.message = r && "string" == typeof r ? r : e.message),
              (n.data = { originalError: c(t) });
          }
          let o = null == t ? void 0 : t.stack;
          return r && t && o && "string" == typeof o && (n.stack = o), n;
        });
    },
    23420: function (t) {
      t.exports = function (t) {
        var e = (t = t || {}).max || Number.MAX_SAFE_INTEGER,
          r = void 0 !== t.start ? t.start : Math.floor(Math.random() * e);
        return function () {
          return (r %= e), r++;
        };
      };
    },
    95811: function (t, e, r) {
      t.exports = r(26066)(r(79653));
    },
    26066: function (t, e, r) {
      let n = r(37016),
        i = r(5675);
      t.exports = function (t) {
        let e = n(t),
          r = i(t);
        return function (t, n) {
          let i = "string" == typeof t ? t.toLowerCase() : t;
          switch (i) {
            case "keccak224":
              return new e(1152, 448, null, 224, n);
            case "keccak256":
              return new e(1088, 512, null, 256, n);
            case "keccak384":
              return new e(832, 768, null, 384, n);
            case "keccak512":
              return new e(576, 1024, null, 512, n);
            case "sha3-224":
              return new e(1152, 448, 6, 224, n);
            case "sha3-256":
              return new e(1088, 512, 6, 256, n);
            case "sha3-384":
              return new e(832, 768, 6, 384, n);
            case "sha3-512":
              return new e(576, 1024, 6, 512, n);
            case "shake128":
              return new r(1344, 256, 31, n);
            case "shake256":
              return new r(1088, 512, 31, n);
            default:
              throw Error("Invald algorithm: " + t);
          }
        };
      };
    },
    37016: function (t, e, r) {
      var n = r(48764).Buffer;
      let { Transform: i } = r(88473);
      t.exports = (t) =>
        class e extends i {
          constructor(e, r, n, i, o) {
            super(o),
              (this._rate = e),
              (this._capacity = r),
              (this._delimitedSuffix = n),
              (this._hashBitLength = i),
              (this._options = o),
              (this._state = new t()),
              this._state.initialize(e, r),
              (this._finalized = !1);
          }
          _transform(t, e, r) {
            let n = null;
            try {
              this.update(t, e);
            } catch (t) {
              n = t;
            }
            r(n);
          }
          _flush(t) {
            let e = null;
            try {
              this.push(this.digest());
            } catch (t) {
              e = t;
            }
            t(e);
          }
          update(t, e) {
            if (!n.isBuffer(t) && "string" != typeof t)
              throw TypeError("Data must be a string or a buffer");
            if (this._finalized) throw Error("Digest already called");
            return (
              n.isBuffer(t) || (t = n.from(t, e)), this._state.absorb(t), this
            );
          }
          digest(t) {
            if (this._finalized) throw Error("Digest already called");
            (this._finalized = !0),
              this._delimitedSuffix &&
                this._state.absorbLastFewBits(this._delimitedSuffix);
            let e = this._state.squeeze(this._hashBitLength / 8);
            return void 0 !== t && (e = e.toString(t)), this._resetState(), e;
          }
          _resetState() {
            return this._state.initialize(this._rate, this._capacity), this;
          }
          _clone() {
            let t = new e(
              this._rate,
              this._capacity,
              this._delimitedSuffix,
              this._hashBitLength,
              this._options
            );
            return (
              this._state.copy(t._state), (t._finalized = this._finalized), t
            );
          }
        };
    },
    5675: function (t, e, r) {
      var n = r(48764).Buffer;
      let { Transform: i } = r(88473);
      t.exports = (t) =>
        class e extends i {
          constructor(e, r, n, i) {
            super(i),
              (this._rate = e),
              (this._capacity = r),
              (this._delimitedSuffix = n),
              (this._options = i),
              (this._state = new t()),
              this._state.initialize(e, r),
              (this._finalized = !1);
          }
          _transform(t, e, r) {
            let n = null;
            try {
              this.update(t, e);
            } catch (t) {
              n = t;
            }
            r(n);
          }
          _flush() {}
          _read(t) {
            this.push(this.squeeze(t));
          }
          update(t, e) {
            if (!n.isBuffer(t) && "string" != typeof t)
              throw TypeError("Data must be a string or a buffer");
            if (this._finalized) throw Error("Squeeze already called");
            return (
              n.isBuffer(t) || (t = n.from(t, e)), this._state.absorb(t), this
            );
          }
          squeeze(t, e) {
            this._finalized ||
              ((this._finalized = !0),
              this._state.absorbLastFewBits(this._delimitedSuffix));
            let r = this._state.squeeze(t);
            return void 0 !== e && (r = r.toString(e)), r;
          }
          _resetState() {
            return this._state.initialize(this._rate, this._capacity), this;
          }
          _clone() {
            let t = new e(
              this._rate,
              this._capacity,
              this._delimitedSuffix,
              this._options
            );
            return (
              this._state.copy(t._state), (t._finalized = this._finalized), t
            );
          }
        };
    },
    34040: function (t, e) {
      let r = [
        1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
        2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136,
        0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
        2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648,
        32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896,
        2147483648, 2147483649, 0, 2147516424, 2147483648,
      ];
      e.p1600 = function (t) {
        for (let e = 0; e < 24; ++e) {
          let n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
            i = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
            o = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
            s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
            a = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
            u = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
            c = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
            l = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
            h = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
            d = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49],
            f = h ^ ((o << 1) | (s >>> 31)),
            p = d ^ ((s << 1) | (o >>> 31)),
            y = t[0] ^ f,
            g = t[1] ^ p,
            m = t[10] ^ f,
            b = t[11] ^ p,
            v = t[20] ^ f,
            _ = t[21] ^ p,
            w = t[30] ^ f,
            E = t[31] ^ p,
            S = t[40] ^ f,
            M = t[41] ^ p;
          (f = n ^ ((a << 1) | (u >>> 31))), (p = i ^ ((u << 1) | (a >>> 31)));
          let x = t[2] ^ f,
            k = t[3] ^ p,
            C = t[12] ^ f,
            I = t[13] ^ p,
            R = t[22] ^ f,
            A = t[23] ^ p,
            N = t[32] ^ f,
            T = t[33] ^ p,
            O = t[42] ^ f,
            L = t[43] ^ p;
          (f = o ^ ((c << 1) | (l >>> 31))), (p = s ^ ((l << 1) | (c >>> 31)));
          let j = t[4] ^ f,
            P = t[5] ^ p,
            D = t[14] ^ f,
            B = t[15] ^ p,
            F = t[24] ^ f,
            $ = t[25] ^ p,
            U = t[34] ^ f,
            z = t[35] ^ p,
            V = t[44] ^ f,
            W = t[45] ^ p;
          (f = a ^ ((h << 1) | (d >>> 31))), (p = u ^ ((d << 1) | (h >>> 31)));
          let H = t[6] ^ f,
            q = t[7] ^ p,
            Z = t[16] ^ f,
            J = t[17] ^ p,
            G = t[26] ^ f,
            Y = t[27] ^ p,
            Q = t[36] ^ f,
            K = t[37] ^ p,
            X = t[46] ^ f,
            tt = t[47] ^ p;
          (f = c ^ ((n << 1) | (i >>> 31))), (p = l ^ ((i << 1) | (n >>> 31)));
          let te = t[8] ^ f,
            tr = t[9] ^ p,
            tn = t[18] ^ f,
            ti = t[19] ^ p,
            to = t[28] ^ f,
            ts = t[29] ^ p,
            ta = t[38] ^ f,
            tu = t[39] ^ p,
            tc = t[48] ^ f,
            tl = t[49] ^ p,
            th = (b << 4) | (m >>> 28),
            td = (m << 4) | (b >>> 28),
            tf = (v << 3) | (_ >>> 29),
            tp = (_ << 3) | (v >>> 29),
            ty = (E << 9) | (w >>> 23),
            tg = (w << 9) | (E >>> 23),
            tm = (S << 18) | (M >>> 14),
            tb = (M << 18) | (S >>> 14),
            tv = (x << 1) | (k >>> 31),
            t_ = (k << 1) | (x >>> 31),
            tw = (I << 12) | (C >>> 20),
            tE = (C << 12) | (I >>> 20),
            tS = (R << 10) | (A >>> 22),
            tM = (A << 10) | (R >>> 22),
            tx = (T << 13) | (N >>> 19),
            tk = (N << 13) | (T >>> 19),
            tC = (O << 2) | (L >>> 30),
            tI = (L << 2) | (O >>> 30),
            tR = (P << 30) | (j >>> 2),
            tA = (j << 30) | (P >>> 2),
            tN = (D << 6) | (B >>> 26),
            tT = (B << 6) | (D >>> 26),
            tO = ($ << 11) | (F >>> 21),
            tL = (F << 11) | ($ >>> 21),
            tj = (U << 15) | (z >>> 17),
            tP = (z << 15) | (U >>> 17),
            tD = (W << 29) | (V >>> 3),
            tB = (V << 29) | (W >>> 3),
            tF = (H << 28) | (q >>> 4),
            t$ = (q << 28) | (H >>> 4),
            tU = (J << 23) | (Z >>> 9),
            tz = (Z << 23) | (J >>> 9),
            tV = (G << 25) | (Y >>> 7),
            tW = (Y << 25) | (G >>> 7),
            tH = (Q << 21) | (K >>> 11),
            tq = (K << 21) | (Q >>> 11),
            tZ = (tt << 24) | (X >>> 8),
            tJ = (X << 24) | (tt >>> 8),
            tG = (te << 27) | (tr >>> 5),
            tY = (tr << 27) | (te >>> 5),
            tQ = (tn << 20) | (ti >>> 12),
            tK = (ti << 20) | (tn >>> 12),
            tX = (ts << 7) | (to >>> 25),
            t0 = (to << 7) | (ts >>> 25),
            t1 = (ta << 8) | (tu >>> 24),
            t2 = (tu << 8) | (ta >>> 24),
            t3 = (tc << 14) | (tl >>> 18),
            t4 = (tl << 14) | (tc >>> 18);
          (t[0] = y ^ (~tw & tO)),
            (t[1] = g ^ (~tE & tL)),
            (t[10] = tF ^ (~tQ & tf)),
            (t[11] = t$ ^ (~tK & tp)),
            (t[20] = tv ^ (~tN & tV)),
            (t[21] = t_ ^ (~tT & tW)),
            (t[30] = tG ^ (~th & tS)),
            (t[31] = tY ^ (~td & tM)),
            (t[40] = tR ^ (~tU & tX)),
            (t[41] = tA ^ (~tz & t0)),
            (t[2] = tw ^ (~tO & tH)),
            (t[3] = tE ^ (~tL & tq)),
            (t[12] = tQ ^ (~tf & tx)),
            (t[13] = tK ^ (~tp & tk)),
            (t[22] = tN ^ (~tV & t1)),
            (t[23] = tT ^ (~tW & t2)),
            (t[32] = th ^ (~tS & tj)),
            (t[33] = td ^ (~tM & tP)),
            (t[42] = tU ^ (~tX & ty)),
            (t[43] = tz ^ (~t0 & tg)),
            (t[4] = tO ^ (~tH & t3)),
            (t[5] = tL ^ (~tq & t4)),
            (t[14] = tf ^ (~tx & tD)),
            (t[15] = tp ^ (~tk & tB)),
            (t[24] = tV ^ (~t1 & tm)),
            (t[25] = tW ^ (~t2 & tb)),
            (t[34] = tS ^ (~tj & tZ)),
            (t[35] = tM ^ (~tP & tJ)),
            (t[44] = tX ^ (~ty & tC)),
            (t[45] = t0 ^ (~tg & tI)),
            (t[6] = tH ^ (~t3 & y)),
            (t[7] = tq ^ (~t4 & g)),
            (t[16] = tx ^ (~tD & tF)),
            (t[17] = tk ^ (~tB & t$)),
            (t[26] = t1 ^ (~tm & tv)),
            (t[27] = t2 ^ (~tb & t_)),
            (t[36] = tj ^ (~tZ & tG)),
            (t[37] = tP ^ (~tJ & tY)),
            (t[46] = ty ^ (~tC & tR)),
            (t[47] = tg ^ (~tI & tA)),
            (t[8] = t3 ^ (~y & tw)),
            (t[9] = t4 ^ (~g & tE)),
            (t[18] = tD ^ (~tF & tQ)),
            (t[19] = tB ^ (~t$ & tK)),
            (t[28] = tm ^ (~tv & tN)),
            (t[29] = tb ^ (~t_ & tT)),
            (t[38] = tZ ^ (~tG & th)),
            (t[39] = tJ ^ (~tY & td)),
            (t[48] = tC ^ (~tR & tU)),
            (t[49] = tI ^ (~tA & tz)),
            (t[0] ^= r[2 * e]),
            (t[1] ^= r[2 * e + 1]);
        }
      };
    },
    79653: function (t, e, r) {
      var n = r(48764).Buffer;
      let i = r(34040);
      function o() {
        (this.state = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ]),
          (this.blockSize = null),
          (this.count = 0),
          (this.squeezing = !1);
      }
      (o.prototype.initialize = function (t, e) {
        for (let t = 0; t < 50; ++t) this.state[t] = 0;
        (this.blockSize = t / 8), (this.count = 0), (this.squeezing = !1);
      }),
        (o.prototype.absorb = function (t) {
          for (let e = 0; e < t.length; ++e)
            (this.state[~~(this.count / 4)] ^= t[e] << (8 * (this.count % 4))),
              (this.count += 1),
              this.count === this.blockSize &&
                (i.p1600(this.state), (this.count = 0));
        }),
        (o.prototype.absorbLastFewBits = function (t) {
          (this.state[~~(this.count / 4)] ^= t << (8 * (this.count % 4))),
            (128 & t) != 0 &&
              this.count === this.blockSize - 1 &&
              i.p1600(this.state),
            (this.state[~~((this.blockSize - 1) / 4)] ^=
              128 << (8 * ((this.blockSize - 1) % 4))),
            i.p1600(this.state),
            (this.count = 0),
            (this.squeezing = !0);
        }),
        (o.prototype.squeeze = function (t) {
          this.squeezing || this.absorbLastFewBits(1);
          let e = n.alloc(t);
          for (let r = 0; r < t; ++r)
            (e[r] =
              (this.state[~~(this.count / 4)] >>> (8 * (this.count % 4))) &
              255),
              (this.count += 1),
              this.count === this.blockSize &&
                (i.p1600(this.state), (this.count = 0));
          return e;
        }),
        (o.prototype.copy = function (t) {
          for (let e = 0; e < 50; ++e) t.state[e] = this.state[e];
          (t.blockSize = this.blockSize),
            (t.count = this.count),
            (t.squeezing = this.squeezing);
        }),
        (t.exports = o);
    },
    28486: function (t, e, r) {
      "use strict";
      let n = r(34411),
        i = Symbol("max"),
        o = Symbol("length"),
        s = Symbol("lengthCalculator"),
        a = Symbol("allowStale"),
        u = Symbol("maxAge"),
        c = Symbol("dispose"),
        l = Symbol("noDisposeOnSet"),
        h = Symbol("lruList"),
        d = Symbol("cache"),
        f = Symbol("updateAgeOnGet"),
        p = () => 1,
        y = (t, e, r) => {
          let n = t[d].get(e);
          if (n) {
            let e = n.value;
            if (g(t, e)) {
              if ((b(t, n), !t[a])) return;
            } else
              r && (t[f] && (n.value.now = Date.now()), t[h].unshiftNode(n));
            return e.value;
          }
        },
        g = (t, e) => {
          if (!e || (!e.maxAge && !t[u])) return !1;
          let r = Date.now() - e.now;
          return e.maxAge ? r > e.maxAge : t[u] && r > t[u];
        },
        m = (t) => {
          if (t[o] > t[i])
            for (let e = t[h].tail; t[o] > t[i] && null !== e; ) {
              let r = e.prev;
              b(t, e), (e = r);
            }
        },
        b = (t, e) => {
          if (e) {
            let r = e.value;
            t[c] && t[c](r.key, r.value),
              (t[o] -= r.length),
              t[d].delete(r.key),
              t[h].removeNode(e);
          }
        };
      class v {
        constructor(t, e, r, n, i) {
          (this.key = t),
            (this.value = e),
            (this.length = r),
            (this.now = n),
            (this.maxAge = i || 0);
        }
      }
      let _ = (t, e, r, n) => {
        let i = r.value;
        g(t, i) && (b(t, r), t[a] || (i = void 0)),
          i && e.call(n, i.value, i.key, t);
      };
      t.exports = class {
        constructor(t) {
          if (
            ("number" == typeof t && (t = { max: t }),
            t || (t = {}),
            t.max && ("number" != typeof t.max || t.max < 0))
          )
            throw TypeError("max must be a non-negative number");
          this[i] = t.max || 1 / 0;
          let e = t.length || p;
          if (
            ((this[s] = "function" != typeof e ? p : e),
            (this[a] = t.stale || !1),
            t.maxAge && "number" != typeof t.maxAge)
          )
            throw TypeError("maxAge must be a number");
          (this[u] = t.maxAge || 0),
            (this[c] = t.dispose),
            (this[l] = t.noDisposeOnSet || !1),
            (this[f] = t.updateAgeOnGet || !1),
            this.reset();
        }
        set max(t) {
          if ("number" != typeof t || t < 0)
            throw TypeError("max must be a non-negative number");
          (this[i] = t || 1 / 0), m(this);
        }
        get max() {
          return this[i];
        }
        set allowStale(t) {
          this[a] = !!t;
        }
        get allowStale() {
          return this[a];
        }
        set maxAge(t) {
          if ("number" != typeof t)
            throw TypeError("maxAge must be a non-negative number");
          (this[u] = t), m(this);
        }
        get maxAge() {
          return this[u];
        }
        set lengthCalculator(t) {
          "function" != typeof t && (t = p),
            t !== this[s] &&
              ((this[s] = t),
              (this[o] = 0),
              this[h].forEach((t) => {
                (t.length = this[s](t.value, t.key)), (this[o] += t.length);
              })),
            m(this);
        }
        get lengthCalculator() {
          return this[s];
        }
        get length() {
          return this[o];
        }
        get itemCount() {
          return this[h].length;
        }
        rforEach(t, e) {
          e = e || this;
          for (let r = this[h].tail; null !== r; ) {
            let n = r.prev;
            _(this, t, r, e), (r = n);
          }
        }
        forEach(t, e) {
          e = e || this;
          for (let r = this[h].head; null !== r; ) {
            let n = r.next;
            _(this, t, r, e), (r = n);
          }
        }
        keys() {
          return this[h].toArray().map((t) => t.key);
        }
        values() {
          return this[h].toArray().map((t) => t.value);
        }
        reset() {
          this[c] &&
            this[h] &&
            this[h].length &&
            this[h].forEach((t) => this[c](t.key, t.value)),
            (this[d] = new Map()),
            (this[h] = new n()),
            (this[o] = 0);
        }
        dump() {
          return this[h]
            .map(
              (t) =>
                !g(this, t) && {
                  k: t.key,
                  v: t.value,
                  e: t.now + (t.maxAge || 0),
                }
            )
            .toArray()
            .filter((t) => t);
        }
        dumpLru() {
          return this[h];
        }
        set(t, e, r) {
          if ((r = r || this[u]) && "number" != typeof r)
            throw TypeError("maxAge must be a number");
          let n = r ? Date.now() : 0,
            a = this[s](e, t);
          if (this[d].has(t)) {
            if (a > this[i]) return b(this, this[d].get(t)), !1;
            let s = this[d].get(t),
              u = s.value;
            return (
              this[c] && !this[l] && this[c](t, u.value),
              (u.now = n),
              (u.maxAge = r),
              (u.value = e),
              (this[o] += a - u.length),
              (u.length = a),
              this.get(t),
              m(this),
              !0
            );
          }
          let f = new v(t, e, a, n, r);
          return f.length > this[i]
            ? (this[c] && this[c](t, e), !1)
            : ((this[o] += f.length),
              this[h].unshift(f),
              this[d].set(t, this[h].head),
              m(this),
              !0);
        }
        has(t) {
          if (!this[d].has(t)) return !1;
          let e = this[d].get(t).value;
          return !g(this, e);
        }
        get(t) {
          return y(this, t, !0);
        }
        peek(t) {
          return y(this, t, !1);
        }
        pop() {
          let t = this[h].tail;
          return t ? (b(this, t), t.value) : null;
        }
        del(t) {
          b(this, this[d].get(t));
        }
        load(t) {
          this.reset();
          let e = Date.now();
          for (let r = t.length - 1; r >= 0; r--) {
            let n = t[r],
              i = n.e || 0;
            if (0 === i) this.set(n.k, n.v);
            else {
              let t = i - e;
              t > 0 && this.set(n.k, n.v, t);
            }
          }
        }
        prune() {
          this[d].forEach((t, e) => y(this, e, !1));
        }
      };
    },
    70631: function (t, e, r) {
      var n = "function" == typeof Map && Map.prototype,
        i =
          Object.getOwnPropertyDescriptor && n
            ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
            : null,
        o = n && i && "function" == typeof i.get ? i.get : null,
        s = n && Map.prototype.forEach,
        a = "function" == typeof Set && Set.prototype,
        u =
          Object.getOwnPropertyDescriptor && a
            ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
            : null,
        c = a && u && "function" == typeof u.get ? u.get : null,
        l = a && Set.prototype.forEach,
        h =
          "function" == typeof WeakMap && WeakMap.prototype
            ? WeakMap.prototype.has
            : null,
        d =
          "function" == typeof WeakSet && WeakSet.prototype
            ? WeakSet.prototype.has
            : null,
        f =
          "function" == typeof WeakRef && WeakRef.prototype
            ? WeakRef.prototype.deref
            : null,
        p = Boolean.prototype.valueOf,
        y = Object.prototype.toString,
        g = Function.prototype.toString,
        m = String.prototype.match,
        b = String.prototype.slice,
        v = String.prototype.replace,
        _ = String.prototype.toUpperCase,
        w = String.prototype.toLowerCase,
        E = RegExp.prototype.test,
        S = Array.prototype.concat,
        M = Array.prototype.join,
        x = Array.prototype.slice,
        k = Math.floor,
        C = "function" == typeof BigInt ? BigInt.prototype.valueOf : null,
        I = Object.getOwnPropertySymbols,
        R =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? Symbol.prototype.toString
            : null,
        A = "function" == typeof Symbol && "object" == typeof Symbol.iterator,
        N =
          "function" == typeof Symbol &&
          Symbol.toStringTag &&
          (typeof Symbol.toStringTag === A ? "object" : "symbol")
            ? Symbol.toStringTag
            : null,
        T = Object.prototype.propertyIsEnumerable,
        O =
          ("function" == typeof Reflect
            ? Reflect.getPrototypeOf
            : Object.getPrototypeOf) ||
          ([].__proto__ === Array.prototype
            ? function (t) {
                return t.__proto__;
              }
            : null);
      function L(t, e) {
        if (
          t === 1 / 0 ||
          t === -1 / 0 ||
          t != t ||
          (t && t > -1e3 && t < 1e3) ||
          E.call(/e/, e)
        )
          return e;
        var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if ("number" == typeof t) {
          var n = t < 0 ? -k(-t) : k(t);
          if (n !== t) {
            var i = String(n),
              o = b.call(e, i.length + 1);
            return (
              v.call(i, r, "$&_") +
              "." +
              v.call(v.call(o, /([0-9]{3})/g, "$&_"), /_$/, "")
            );
          }
        }
        return v.call(e, r, "$&_");
      }
      var j = r(24654),
        P = j.custom,
        D = U(P) ? P : null;
      function B(t, e, r) {
        var n = "double" === (r.quoteStyle || e) ? '"' : "'";
        return n + t + n;
      }
      function F(t) {
        return (
          "[object Array]" === W(t) && (!N || !("object" == typeof t && N in t))
        );
      }
      function $(t) {
        return (
          "[object RegExp]" === W(t) &&
          (!N || !("object" == typeof t && N in t))
        );
      }
      function U(t) {
        if (A) return t && "object" == typeof t && t instanceof Symbol;
        if ("symbol" == typeof t) return !0;
        if (!t || "object" != typeof t || !R) return !1;
        try {
          return R.call(t), !0;
        } catch (t) {}
        return !1;
      }
      t.exports = function t(e, r, n, i) {
        var a = r || {};
        if (
          V(a, "quoteStyle") &&
          "single" !== a.quoteStyle &&
          "double" !== a.quoteStyle
        )
          throw TypeError('option "quoteStyle" must be "single" or "double"');
        if (
          V(a, "maxStringLength") &&
          ("number" == typeof a.maxStringLength
            ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0
            : null !== a.maxStringLength)
        )
          throw TypeError(
            'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
          );
        var u = !V(a, "customInspect") || a.customInspect;
        if ("boolean" != typeof u && "symbol" !== u)
          throw TypeError(
            "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"
          );
        if (
          V(a, "indent") &&
          null !== a.indent &&
          "	" !== a.indent &&
          !(parseInt(a.indent, 10) === a.indent && a.indent > 0)
        )
          throw TypeError(
            'option "indent" must be "\\t", an integer > 0, or `null`'
          );
        if (V(a, "numericSeparator") && "boolean" != typeof a.numericSeparator)
          throw TypeError(
            'option "numericSeparator", if provided, must be `true` or `false`'
          );
        var y = a.numericSeparator;
        if (void 0 === e) return "undefined";
        if (null === e) return "null";
        if ("boolean" == typeof e) return e ? "true" : "false";
        if ("string" == typeof e)
          return (function t(e, r) {
            if (e.length > r.maxStringLength) {
              var n = e.length - r.maxStringLength;
              return (
                t(b.call(e, 0, r.maxStringLength), r) +
                "... " +
                n +
                " more character" +
                (n > 1 ? "s" : "")
              );
            }
            return B(
              v.call(v.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, q),
              "single",
              r
            );
          })(e, a);
        if ("number" == typeof e) {
          if (0 === e) return 1 / 0 / e > 0 ? "0" : "-0";
          var _ = String(e);
          return y ? L(e, _) : _;
        }
        if ("bigint" == typeof e) {
          var E = String(e) + "n";
          return y ? L(e, E) : E;
        }
        var k = void 0 === a.depth ? 5 : a.depth;
        if ((void 0 === n && (n = 0), n >= k && k > 0 && "object" == typeof e))
          return F(e) ? "[Array]" : "[Object]";
        var I = (function (t, e) {
          var r;
          if ("	" === t.indent) r = "	";
          else {
            if ("number" != typeof t.indent || !(t.indent > 0)) return null;
            r = M.call(Array(t.indent + 1), " ");
          }
          return { base: r, prev: M.call(Array(e + 1), r) };
        })(a, n);
        if (void 0 === i) i = [];
        else if (H(i, e) >= 0) return "[Circular]";
        function P(e, r, o) {
          if ((r && (i = x.call(i)).push(r), o)) {
            var s = { depth: a.depth };
            return (
              V(a, "quoteStyle") && (s.quoteStyle = a.quoteStyle),
              t(e, s, n + 1, i)
            );
          }
          return t(e, a, n + 1, i);
        }
        if ("function" == typeof e && !$(e)) {
          var z = (function (t) {
              if (t.name) return t.name;
              var e = m.call(g.call(t), /^function\s*([\w$]+)/);
              return e ? e[1] : null;
            })(e),
            K = Q(e, P);
          return (
            "[Function" +
            (z ? ": " + z : " (anonymous)") +
            "]" +
            (K.length > 0 ? " { " + M.call(K, ", ") + " }" : "")
          );
        }
        if (U(e)) {
          var X = A
            ? v.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1")
            : R.call(e);
          return "object" != typeof e || A ? X : Z(X);
        }
        if (
          e &&
          "object" == typeof e &&
          (("undefined" != typeof HTMLElement && e instanceof HTMLElement) ||
            ("string" == typeof e.nodeName &&
              "function" == typeof e.getAttribute))
        ) {
          for (
            var tt,
              te = "<" + w.call(String(e.nodeName)),
              tr = e.attributes || [],
              tn = 0;
            tn < tr.length;
            tn++
          )
            te +=
              " " +
              tr[tn].name +
              "=" +
              B(
                ((tt = tr[tn].value), v.call(String(tt), /"/g, "&quot;")),
                "double",
                a
              );
          return (
            (te += ">"),
            e.childNodes && e.childNodes.length && (te += "..."),
            (te += "</" + w.call(String(e.nodeName)) + ">")
          );
        }
        if (F(e)) {
          if (0 === e.length) return "[]";
          var ti = Q(e, P);
          return I &&
            !(function (t) {
              for (var e = 0; e < t.length; e++)
                if (H(t[e], "\n") >= 0) return !1;
              return !0;
            })(ti)
            ? "[" + Y(ti, I) + "]"
            : "[ " + M.call(ti, ", ") + " ]";
        }
        if (
          "[object Error]" === W(e) &&
          (!N || !("object" == typeof e && N in e))
        ) {
          var to = Q(e, P);
          return "cause" in Error.prototype ||
            !("cause" in e) ||
            T.call(e, "cause")
            ? 0 === to.length
              ? "[" + String(e) + "]"
              : "{ [" + String(e) + "] " + M.call(to, ", ") + " }"
            : "{ [" +
                String(e) +
                "] " +
                M.call(S.call("[cause]: " + P(e.cause), to), ", ") +
                " }";
        }
        if ("object" == typeof e && u) {
          if (D && "function" == typeof e[D] && j)
            return j(e, { depth: k - n });
          if ("symbol" !== u && "function" == typeof e.inspect)
            return e.inspect();
        }
        if (
          (function (t) {
            if (!o || !t || "object" != typeof t) return !1;
            try {
              o.call(t);
              try {
                c.call(t);
              } catch (t) {
                return !0;
              }
              return t instanceof Map;
            } catch (t) {}
            return !1;
          })(e)
        ) {
          var ts = [];
          return (
            s &&
              s.call(e, function (t, r) {
                ts.push(P(r, e, !0) + " => " + P(t, e));
              }),
            G("Map", o.call(e), ts, I)
          );
        }
        if (
          (function (t) {
            if (!c || !t || "object" != typeof t) return !1;
            try {
              c.call(t);
              try {
                o.call(t);
              } catch (t) {
                return !0;
              }
              return t instanceof Set;
            } catch (t) {}
            return !1;
          })(e)
        ) {
          var ta = [];
          return (
            l &&
              l.call(e, function (t) {
                ta.push(P(t, e));
              }),
            G("Set", c.call(e), ta, I)
          );
        }
        if (
          (function (t) {
            if (!h || !t || "object" != typeof t) return !1;
            try {
              h.call(t, h);
              try {
                d.call(t, d);
              } catch (t) {
                return !0;
              }
              return t instanceof WeakMap;
            } catch (t) {}
            return !1;
          })(e)
        )
          return J("WeakMap");
        if (
          (function (t) {
            if (!d || !t || "object" != typeof t) return !1;
            try {
              d.call(t, d);
              try {
                h.call(t, h);
              } catch (t) {
                return !0;
              }
              return t instanceof WeakSet;
            } catch (t) {}
            return !1;
          })(e)
        )
          return J("WeakSet");
        if (
          (function (t) {
            if (!f || !t || "object" != typeof t) return !1;
            try {
              return f.call(t), !0;
            } catch (t) {}
            return !1;
          })(e)
        )
          return J("WeakRef");
        if (
          "[object Number]" === W(e) &&
          (!N || !("object" == typeof e && N in e))
        )
          return Z(P(Number(e)));
        if (
          (function (t) {
            if (!t || "object" != typeof t || !C) return !1;
            try {
              return C.call(t), !0;
            } catch (t) {}
            return !1;
          })(e)
        )
          return Z(P(C.call(e)));
        if (
          "[object Boolean]" === W(e) &&
          (!N || !("object" == typeof e && N in e))
        )
          return Z(p.call(e));
        if (
          "[object String]" === W(e) &&
          (!N || !("object" == typeof e && N in e))
        )
          return Z(P(String(e)));
        if (
          !(
            "[object Date]" === W(e) &&
            (!N || !("object" == typeof e && N in e))
          ) &&
          !$(e)
        ) {
          var tu = Q(e, P),
            tc = O
              ? O(e) === Object.prototype
              : e instanceof Object || e.constructor === Object,
            tl = e instanceof Object ? "" : "null prototype",
            th =
              !tc && N && Object(e) === e && N in e
                ? b.call(W(e), 8, -1)
                : tl
                ? "Object"
                : "",
            td =
              (tc || "function" != typeof e.constructor
                ? ""
                : e.constructor.name
                ? e.constructor.name + " "
                : "") +
              (th || tl
                ? "[" + M.call(S.call([], th || [], tl || []), ": ") + "] "
                : "");
          return 0 === tu.length
            ? td + "{}"
            : I
            ? td + "{" + Y(tu, I) + "}"
            : td + "{ " + M.call(tu, ", ") + " }";
        }
        return String(e);
      };
      var z =
        Object.prototype.hasOwnProperty ||
        function (t) {
          return t in this;
        };
      function V(t, e) {
        return z.call(t, e);
      }
      function W(t) {
        return y.call(t);
      }
      function H(t, e) {
        if (t.indexOf) return t.indexOf(e);
        for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
        return -1;
      }
      function q(t) {
        var e = t.charCodeAt(0),
          r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[e];
        return r
          ? "\\" + r
          : "\\x" + (e < 16 ? "0" : "") + _.call(e.toString(16));
      }
      function Z(t) {
        return "Object(" + t + ")";
      }
      function J(t) {
        return t + " { ? }";
      }
      function G(t, e, r, n) {
        return t + " (" + e + ") {" + (n ? Y(r, n) : M.call(r, ", ")) + "}";
      }
      function Y(t, e) {
        if (0 === t.length) return "";
        var r = "\n" + e.prev + e.base;
        return r + M.call(t, "," + r) + "\n" + e.prev;
      }
      function Q(t, e) {
        var r,
          n = F(t),
          i = [];
        if (n) {
          i.length = t.length;
          for (var o = 0; o < t.length; o++) i[o] = V(t, o) ? e(t[o], t) : "";
        }
        var s = "function" == typeof I ? I(t) : [];
        if (A) {
          r = {};
          for (var a = 0; a < s.length; a++) r["$" + s[a]] = s[a];
        }
        for (var u in t)
          V(t, u) &&
            (!n || String(Number(u)) !== u || !(u < t.length)) &&
            ((A && r["$" + u] instanceof Symbol) ||
              (E.call(/[^\w$]/, u)
                ? i.push(e(u, t) + ": " + e(t[u], t))
                : i.push(u + ": " + e(t[u], t))));
        if ("function" == typeof I)
          for (var c = 0; c < s.length; c++)
            T.call(t, s[c]) && i.push("[" + e(s[c]) + "]: " + e(t[s[c]], t));
        return i;
      }
    },
    62110: function (t) {
      "use strict";
      let e = (t, e) =>
        function () {
          let r = e.promiseModule,
            n = Array(arguments.length);
          for (let t = 0; t < arguments.length; t++) n[t] = arguments[t];
          return new r((r, i) => {
            e.errorFirst
              ? n.push(function (t, n) {
                  if (e.multiArgs) {
                    let e = Array(arguments.length - 1);
                    for (let t = 1; t < arguments.length; t++)
                      e[t - 1] = arguments[t];
                    t ? (e.unshift(t), i(e)) : r(e);
                  } else t ? i(t) : r(n);
                })
              : n.push(function (t) {
                  if (e.multiArgs) {
                    let t = Array(arguments.length - 1);
                    for (let e = 0; e < arguments.length; e++)
                      t[e] = arguments[e];
                    r(t);
                  } else r(t);
                }),
              t.apply(this, n);
          });
        };
      t.exports = (t, r) => {
        let n;
        r = Object.assign(
          {
            exclude: [/.+(Sync|Stream)$/],
            errorFirst: !0,
            promiseModule: Promise,
          },
          r
        );
        let i = (t) => {
          let e = (e) => ("string" == typeof e ? t === e : e.test(t));
          return r.include ? r.include.some(e) : !r.exclude.some(e);
        };
        for (let o in ((n =
          "function" == typeof t
            ? function () {
                return r.excludeMain
                  ? t.apply(this, arguments)
                  : e(t, r).apply(this, arguments);
              }
            : Object.create(Object.getPrototypeOf(t))),
        t)) {
          let s = t[o];
          n[o] = "function" == typeof s && i(o) ? e(s, r) : s;
        }
        return n;
      };
    },
    6400: function (t, e, r) {
      "use strict";
      r.r(e),
        r.d(e, {
          Component: function () {
            return E;
          },
          Fragment: function () {
            return w;
          },
          cloneElement: function () {
            return B;
          },
          createContext: function () {
            return F;
          },
          createElement: function () {
            return b;
          },
          createRef: function () {
            return _;
          },
          h: function () {
            return b;
          },
          hydrate: function () {
            return D;
          },
          isValidElement: function () {
            return s;
          },
          options: function () {
            return i;
          },
          render: function () {
            return P;
          },
          toChildArray: function () {
            return function t(e, r) {
              return (
                (r = r || []),
                null == e ||
                  "boolean" == typeof e ||
                  (y(e)
                    ? e.some(function (e) {
                        t(e, r);
                      })
                    : r.push(e)),
                r
              );
            };
          },
        });
      var n,
        i,
        o,
        s,
        a,
        u,
        c,
        l,
        h,
        d = {},
        f = [],
        p = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
        y = Array.isArray;
      function g(t, e) {
        for (var r in e) t[r] = e[r];
        return t;
      }
      function m(t) {
        var e = t.parentNode;
        e && e.removeChild(t);
      }
      function b(t, e, r) {
        var i,
          o,
          s,
          a = {};
        for (s in e)
          "key" == s ? (i = e[s]) : "ref" == s ? (o = e[s]) : (a[s] = e[s]);
        if (
          (arguments.length > 2 &&
            (a.children = arguments.length > 3 ? n.call(arguments, 2) : r),
          "function" == typeof t && null != t.defaultProps)
        )
          for (s in t.defaultProps)
            void 0 === a[s] && (a[s] = t.defaultProps[s]);
        return v(t, a, i, o, null);
      }
      function v(t, e, r, n, s) {
        var a = {
          type: t,
          props: e,
          key: r,
          ref: n,
          __k: null,
          __: null,
          __b: 0,
          __e: null,
          __d: void 0,
          __c: null,
          __h: null,
          constructor: void 0,
          __v: null == s ? ++o : s,
        };
        return null == s && null != i.vnode && i.vnode(a), a;
      }
      function _() {
        return { current: null };
      }
      function w(t) {
        return t.children;
      }
      function E(t, e) {
        (this.props = t), (this.context = e);
      }
      function S(t, e) {
        if (null == e) return t.__ ? S(t.__, t.__.__k.indexOf(t) + 1) : null;
        for (var r; e < t.__k.length; e++)
          if (null != (r = t.__k[e]) && null != r.__e) return r.__e;
        return "function" == typeof t.type ? S(t) : null;
      }
      function M(t) {
        ((!t.__d && (t.__d = !0) && a.push(t) && !x.__r++) ||
          u !== i.debounceRendering) &&
          ((u = i.debounceRendering) || c)(x);
      }
      function x() {
        var t, e, r, n, i, o, s, u;
        for (a.sort(l); (t = a.shift()); )
          t.__d &&
            ((e = a.length),
            (n = void 0),
            (i = void 0),
            (s = (o = (r = t).__v).__e),
            (u = r.__P) &&
              ((n = []),
              ((i = g({}, o)).__v = o.__v + 1),
              T(
                u,
                o,
                i,
                r.__n,
                void 0 !== u.ownerSVGElement,
                null != o.__h ? [s] : null,
                n,
                null == s ? S(o) : s,
                o.__h
              ),
              O(n, o),
              o.__e != s &&
                (function t(e) {
                  var r, n;
                  if (null != (e = e.__) && null != e.__c) {
                    for (
                      e.__e = e.__c.base = null, r = 0;
                      r < e.__k.length;
                      r++
                    )
                      if (null != (n = e.__k[r]) && null != n.__e) {
                        e.__e = e.__c.base = n.__e;
                        break;
                      }
                    return t(e);
                  }
                })(o)),
            a.length > e && a.sort(l));
        x.__r = 0;
      }
      function k(t, e, r, n, o, s, a, u, c, l) {
        var h,
          p,
          g,
          b,
          _,
          E,
          M,
          x = (n && n.__k) || f,
          k = x.length;
        for (r.__k = [], h = 0; h < e.length; h++)
          if (
            null !=
            (b = r.__k[h] =
              null == (b = e[h]) ||
              "boolean" == typeof b ||
              "function" == typeof b
                ? null
                : "string" == typeof b ||
                  "number" == typeof b ||
                  "bigint" == typeof b
                ? v(null, b, null, null, b)
                : y(b)
                ? v(w, { children: b }, null, null, null)
                : b.__b > 0
                ? v(b.type, b.props, b.key, b.ref ? b.ref : null, b.__v)
                : b)
          ) {
            if (
              ((b.__ = r),
              (b.__b = r.__b + 1),
              null === (g = x[h]) || (g && b.key == g.key && b.type === g.type))
            )
              x[h] = void 0;
            else
              for (p = 0; p < k; p++) {
                if ((g = x[p]) && b.key == g.key && b.type === g.type) {
                  x[p] = void 0;
                  break;
                }
                g = null;
              }
            T(t, b, (g = g || d), o, s, a, u, c, l),
              (_ = b.__e),
              (p = b.ref) &&
                g.ref != p &&
                (M || (M = []),
                g.ref && M.push(g.ref, null, b),
                M.push(p, b.__c || _, b)),
              null != _
                ? (null == E && (E = _),
                  "function" == typeof b.type && b.__k === g.__k
                    ? (b.__d = c =
                        (function t(e, r, n) {
                          for (var i, o = e.__k, s = 0; o && s < o.length; s++)
                            (i = o[s]) &&
                              ((i.__ = e),
                              (r =
                                "function" == typeof i.type
                                  ? t(i, r, n)
                                  : C(n, i, i, o, i.__e, r)));
                          return r;
                        })(b, c, t))
                    : (c = C(t, b, g, x, _, c)),
                  "function" == typeof r.type && (r.__d = c))
                : c && g.__e == c && c.parentNode != t && (c = S(g));
          }
        for (r.__e = E, h = k; h--; )
          null != x[h] &&
            ("function" == typeof r.type &&
              null != x[h].__e &&
              x[h].__e == r.__d &&
              (r.__d = (function t(e) {
                var r, n, i;
                if (null == e.type || "string" == typeof e.type) return e.__e;
                if (e.__k) {
                  for (r = e.__k.length - 1; r >= 0; r--)
                    if ((n = e.__k[r]) && (i = t(n))) return i;
                }
                return null;
              })(n).nextSibling),
            (function t(e, r, n) {
              var o, s;
              if (
                (i.unmount && i.unmount(e),
                (o = e.ref) &&
                  ((o.current && o.current !== e.__e) || L(o, null, r)),
                null != (o = e.__c))
              ) {
                if (o.componentWillUnmount)
                  try {
                    o.componentWillUnmount();
                  } catch (t) {
                    i.__e(t, r);
                  }
                (o.base = o.__P = null), (e.__c = void 0);
              }
              if ((o = e.__k))
                for (s = 0; s < o.length; s++)
                  o[s] && t(o[s], r, n || "function" != typeof e.type);
              n || null == e.__e || m(e.__e), (e.__ = e.__e = e.__d = void 0);
            })(x[h], x[h]));
        if (M) for (h = 0; h < M.length; h++) L(M[h], M[++h], M[++h]);
      }
      function C(t, e, r, n, i, o) {
        var s, a, u;
        if (void 0 !== e.__d) (s = e.__d), (e.__d = void 0);
        else if (null == r || i != o || null == i.parentNode)
          e: if (null == o || o.parentNode !== t) t.appendChild(i), (s = null);
          else {
            for (a = o, u = 0; (a = a.nextSibling) && u < n.length; u += 1)
              if (a == i) break e;
            t.insertBefore(i, o), (s = o);
          }
        return void 0 !== s ? s : i.nextSibling;
      }
      function I(t, e, r) {
        "-" === e[0]
          ? t.setProperty(e, null == r ? "" : r)
          : (t[e] =
              null == r
                ? ""
                : "number" != typeof r || p.test(e)
                ? r
                : r + "px");
      }
      function R(t, e, r, n, i) {
        var o;
        e: if ("style" === e) {
          if ("string" == typeof r) t.style.cssText = r;
          else {
            if (("string" == typeof n && (t.style.cssText = n = ""), n))
              for (e in n) (r && e in r) || I(t.style, e, "");
            if (r) for (e in r) (n && r[e] === n[e]) || I(t.style, e, r[e]);
          }
        } else if ("o" === e[0] && "n" === e[1])
          (o = e !== (e = e.replace(/Capture$/, ""))),
            (e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2)),
            t.l || (t.l = {}),
            (t.l[e + o] = r),
            r
              ? n || t.addEventListener(e, o ? N : A, o)
              : t.removeEventListener(e, o ? N : A, o);
        else if ("dangerouslySetInnerHTML" !== e) {
          if (i) e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if (
            "width" !== e &&
            "height" !== e &&
            "href" !== e &&
            "list" !== e &&
            "form" !== e &&
            "tabIndex" !== e &&
            "download" !== e &&
            "rowSpan" !== e &&
            "colSpan" !== e &&
            e in t
          )
            try {
              t[e] = null == r ? "" : r;
              break e;
            } catch (t) {}
          "function" == typeof r ||
            (null == r || (!1 === r && "-" !== e[4])
              ? t.removeAttribute(e)
              : t.setAttribute(e, r));
        }
      }
      function A(t) {
        return this.l[t.type + !1](i.event ? i.event(t) : t);
      }
      function N(t) {
        return this.l[t.type + !0](i.event ? i.event(t) : t);
      }
      function T(t, e, r, o, s, a, u, c, l) {
        var h,
          f,
          p,
          b,
          v,
          _,
          M,
          x,
          C,
          I,
          A,
          N,
          T,
          O,
          L,
          P = e.type;
        if (void 0 !== e.constructor) return null;
        null != r.__h &&
          ((l = r.__h), (c = e.__e = r.__e), (e.__h = null), (a = [c])),
          (h = i.__b) && h(e);
        try {
          e: if ("function" == typeof P) {
            if (
              ((x = e.props),
              (C = (h = P.contextType) && o[h.__c]),
              (I = h ? (C ? C.props.value : h.__) : o),
              r.__c
                ? (M = (f = e.__c = r.__c).__ = f.__E)
                : ("prototype" in P && P.prototype.render
                    ? (e.__c = f = new P(x, I))
                    : ((e.__c = f = new E(x, I)),
                      (f.constructor = P),
                      (f.render = j)),
                  C && C.sub(f),
                  (f.props = x),
                  f.state || (f.state = {}),
                  (f.context = I),
                  (f.__n = o),
                  (p = f.__d = !0),
                  (f.__h = []),
                  (f._sb = [])),
              null == f.__s && (f.__s = f.state),
              null != P.getDerivedStateFromProps &&
                (f.__s == f.state && (f.__s = g({}, f.__s)),
                g(f.__s, P.getDerivedStateFromProps(x, f.__s))),
              (b = f.props),
              (v = f.state),
              (f.__v = e),
              p)
            )
              null == P.getDerivedStateFromProps &&
                null != f.componentWillMount &&
                f.componentWillMount(),
                null != f.componentDidMount && f.__h.push(f.componentDidMount);
            else {
              if (
                (null == P.getDerivedStateFromProps &&
                  x !== b &&
                  null != f.componentWillReceiveProps &&
                  f.componentWillReceiveProps(x, I),
                (!f.__e &&
                  null != f.shouldComponentUpdate &&
                  !1 === f.shouldComponentUpdate(x, f.__s, I)) ||
                  e.__v === r.__v)
              ) {
                for (
                  e.__v !== r.__v &&
                    ((f.props = x), (f.state = f.__s), (f.__d = !1)),
                    f.__e = !1,
                    e.__e = r.__e,
                    e.__k = r.__k,
                    e.__k.forEach(function (t) {
                      t && (t.__ = e);
                    }),
                    A = 0;
                  A < f._sb.length;
                  A++
                )
                  f.__h.push(f._sb[A]);
                (f._sb = []), f.__h.length && u.push(f);
                break e;
              }
              null != f.componentWillUpdate &&
                f.componentWillUpdate(x, f.__s, I),
                null != f.componentDidUpdate &&
                  f.__h.push(function () {
                    f.componentDidUpdate(b, v, _);
                  });
            }
            if (
              ((f.context = I),
              (f.props = x),
              (f.__P = t),
              (N = i.__r),
              (T = 0),
              "prototype" in P && P.prototype.render)
            ) {
              for (
                f.state = f.__s,
                  f.__d = !1,
                  N && N(e),
                  h = f.render(f.props, f.state, f.context),
                  O = 0;
                O < f._sb.length;
                O++
              )
                f.__h.push(f._sb[O]);
              f._sb = [];
            } else
              do
                (f.__d = !1),
                  N && N(e),
                  (h = f.render(f.props, f.state, f.context)),
                  (f.state = f.__s);
              while (f.__d && ++T < 25);
            (f.state = f.__s),
              null != f.getChildContext &&
                (o = g(g({}, o), f.getChildContext())),
              p ||
                null == f.getSnapshotBeforeUpdate ||
                (_ = f.getSnapshotBeforeUpdate(b, v)),
              k(
                t,
                y(
                  (L =
                    null != h && h.type === w && null == h.key
                      ? h.props.children
                      : h)
                )
                  ? L
                  : [L],
                e,
                r,
                o,
                s,
                a,
                u,
                c,
                l
              ),
              (f.base = e.__e),
              (e.__h = null),
              f.__h.length && u.push(f),
              M && (f.__E = f.__ = null),
              (f.__e = !1);
          } else
            null == a && e.__v === r.__v
              ? ((e.__k = r.__k), (e.__e = r.__e))
              : (e.__e = (function (t, e, r, i, o, s, a, u) {
                  var c,
                    l,
                    h,
                    f = r.props,
                    p = e.props,
                    g = e.type,
                    b = 0;
                  if (("svg" === g && (o = !0), null != s)) {
                    for (; b < s.length; b++)
                      if (
                        (c = s[b]) &&
                        "setAttribute" in c == !!g &&
                        (g ? c.localName === g : 3 === c.nodeType)
                      ) {
                        (t = c), (s[b] = null);
                        break;
                      }
                  }
                  if (null == t) {
                    if (null === g) return document.createTextNode(p);
                    (t = o
                      ? document.createElementNS(
                          "http://www.w3.org/2000/svg",
                          g
                        )
                      : document.createElement(g, p.is && p)),
                      (s = null),
                      (u = !1);
                  }
                  if (null === g)
                    f === p || (u && t.data === p) || (t.data = p);
                  else {
                    if (
                      ((s = s && n.call(t.childNodes)),
                      (l = (f = r.props || d).dangerouslySetInnerHTML),
                      (h = p.dangerouslySetInnerHTML),
                      !u)
                    ) {
                      if (null != s)
                        for (f = {}, b = 0; b < t.attributes.length; b++)
                          f[t.attributes[b].name] = t.attributes[b].value;
                      (h || l) &&
                        ((h &&
                          ((l && h.__html == l.__html) ||
                            h.__html === t.innerHTML)) ||
                          (t.innerHTML = (h && h.__html) || ""));
                    }
                    if (
                      ((function (t, e, r, n, i) {
                        var o;
                        for (o in r)
                          "children" === o ||
                            "key" === o ||
                            o in e ||
                            R(t, o, null, r[o], n);
                        for (o in e)
                          (i && "function" != typeof e[o]) ||
                            "children" === o ||
                            "key" === o ||
                            "value" === o ||
                            "checked" === o ||
                            r[o] === e[o] ||
                            R(t, o, e[o], r[o], n);
                      })(t, p, f, o, u),
                      h)
                    )
                      e.__k = [];
                    else if (
                      (k(
                        t,
                        y((b = e.props.children)) ? b : [b],
                        e,
                        r,
                        i,
                        o && "foreignObject" !== g,
                        s,
                        a,
                        s ? s[0] : r.__k && S(r, 0),
                        u
                      ),
                      null != s)
                    )
                      for (b = s.length; b--; ) null != s[b] && m(s[b]);
                    u ||
                      ("value" in p &&
                        void 0 !== (b = p.value) &&
                        (b !== t.value ||
                          ("progress" === g && !b) ||
                          ("option" === g && b !== f.value)) &&
                        R(t, "value", b, f.value, !1),
                      "checked" in p &&
                        void 0 !== (b = p.checked) &&
                        b !== t.checked &&
                        R(t, "checked", b, f.checked, !1));
                  }
                  return t;
                })(r.__e, e, r, o, s, a, u, l));
          (h = i.diffed) && h(e);
        } catch (t) {
          (e.__v = null),
            (l || null != a) &&
              ((e.__e = c), (e.__h = !!l), (a[a.indexOf(c)] = null)),
            i.__e(t, e, r);
        }
      }
      function O(t, e) {
        i.__c && i.__c(e, t),
          t.some(function (e) {
            try {
              (t = e.__h),
                (e.__h = []),
                t.some(function (t) {
                  t.call(e);
                });
            } catch (t) {
              i.__e(t, e.__v);
            }
          });
      }
      function L(t, e, r) {
        try {
          "function" == typeof t ? t(e) : (t.current = e);
        } catch (t) {
          i.__e(t, r);
        }
      }
      function j(t, e, r) {
        return this.constructor(t, r);
      }
      function P(t, e, r) {
        var o, s, a;
        i.__ && i.__(t, e),
          (s = (o = "function" == typeof r) ? null : (r && r.__k) || e.__k),
          (a = []),
          T(
            e,
            (t = ((!o && r) || e).__k = b(w, null, [t])),
            s || d,
            d,
            void 0 !== e.ownerSVGElement,
            !o && r
              ? [r]
              : s
              ? null
              : e.firstChild
              ? n.call(e.childNodes)
              : null,
            a,
            !o && r ? r : s ? s.__e : e.firstChild,
            o
          ),
          O(a, t);
      }
      function D(t, e) {
        P(t, e, D);
      }
      function B(t, e, r) {
        var i,
          o,
          s,
          a,
          u = g({}, t.props);
        for (s in (t.type && t.type.defaultProps && (a = t.type.defaultProps),
        e))
          "key" == s
            ? (i = e[s])
            : "ref" == s
            ? (o = e[s])
            : (u[s] = void 0 === e[s] && void 0 !== a ? a[s] : e[s]);
        return (
          arguments.length > 2 &&
            (u.children = arguments.length > 3 ? n.call(arguments, 2) : r),
          v(t.type, u, i || t.key, o || t.ref, null)
        );
      }
      function F(t, e) {
        var r = {
          __c: (e = "__cC" + h++),
          __: t,
          Consumer: function (t, e) {
            return t.children(e);
          },
          Provider: function (t) {
            var r, n;
            return (
              this.getChildContext ||
                ((r = []),
                ((n = {})[e] = this),
                (this.getChildContext = function () {
                  return n;
                }),
                (this.shouldComponentUpdate = function (t) {
                  this.props.value !== t.value &&
                    r.some(function (t) {
                      (t.__e = !0), M(t);
                    });
                }),
                (this.sub = function (t) {
                  r.push(t);
                  var e = t.componentWillUnmount;
                  t.componentWillUnmount = function () {
                    r.splice(r.indexOf(t), 1), e && e.call(t);
                  };
                })),
              t.children
            );
          },
        };
        return (r.Provider.__ = r.Consumer.contextType = r);
      }
      (n = f.slice),
        (i = {
          __e: function (t, e, r, n) {
            for (var i, o, s; (e = e.__); )
              if ((i = e.__c) && !i.__)
                try {
                  if (
                    ((o = i.constructor) &&
                      null != o.getDerivedStateFromError &&
                      (i.setState(o.getDerivedStateFromError(t)), (s = i.__d)),
                    null != i.componentDidCatch &&
                      (i.componentDidCatch(t, n || {}), (s = i.__d)),
                    s)
                  )
                    return (i.__E = i);
                } catch (e) {
                  t = e;
                }
            throw t;
          },
        }),
        (o = 0),
        (s = function (t) {
          return null != t && void 0 === t.constructor;
        }),
        (E.prototype.setState = function (t, e) {
          var r;
          (r =
            null != this.__s && this.__s !== this.state
              ? this.__s
              : (this.__s = g({}, this.state))),
            "function" == typeof t && (t = t(g({}, r), this.props)),
            t && g(r, t),
            null != t && this.__v && (e && this._sb.push(e), M(this));
        }),
        (E.prototype.forceUpdate = function (t) {
          this.__v && ((this.__e = !0), t && this.__h.push(t), M(this));
        }),
        (E.prototype.render = w),
        (a = []),
        (c =
          "function" == typeof Promise
            ? Promise.prototype.then.bind(Promise.resolve())
            : setTimeout),
        (l = function (t, e) {
          return t.__v.__b - e.__v.__b;
        }),
        (x.__r = 0),
        (h = 0);
    },
    30396: function (t, e, r) {
      "use strict";
      r.r(e),
        r.d(e, {
          useCallback: function () {
            return M;
          },
          useContext: function () {
            return x;
          },
          useDebugValue: function () {
            return k;
          },
          useEffect: function () {
            return v;
          },
          useErrorBoundary: function () {
            return C;
          },
          useId: function () {
            return I;
          },
          useImperativeHandle: function () {
            return E;
          },
          useLayoutEffect: function () {
            return _;
          },
          useMemo: function () {
            return S;
          },
          useReducer: function () {
            return b;
          },
          useRef: function () {
            return w;
          },
          useState: function () {
            return m;
          },
        });
      var n,
        i,
        o,
        s,
        a = r(6400),
        u = 0,
        c = [],
        l = [],
        h = a.options.__b,
        d = a.options.__r,
        f = a.options.diffed,
        p = a.options.__c,
        y = a.options.unmount;
      function g(t, e) {
        a.options.__h && a.options.__h(i, t, u || e), (u = 0);
        var r = i.__H || (i.__H = { __: [], __h: [] });
        return t >= r.__.length && r.__.push({ __V: l }), r.__[t];
      }
      function m(t) {
        return (u = 1), b(j, t);
      }
      function b(t, e, r) {
        var o = g(n++, 2);
        if (
          ((o.t = t),
          !o.__c &&
            ((o.__ = [
              r ? r(e) : j(void 0, e),
              function (t) {
                var e = o.__N ? o.__N[0] : o.__[0],
                  r = o.t(e, t);
                e !== r && ((o.__N = [r, o.__[1]]), o.__c.setState({}));
              },
            ]),
            (o.__c = i),
            !i.u))
        ) {
          var s = function (t, e, r) {
            if (!o.__c.__H) return !0;
            var n = o.__c.__H.__.filter(function (t) {
              return t.__c;
            });
            if (
              n.every(function (t) {
                return !t.__N;
              })
            )
              return !a || a.call(this, t, e, r);
            var i = !1;
            return (
              n.forEach(function (t) {
                if (t.__N) {
                  var e = t.__[0];
                  (t.__ = t.__N), (t.__N = void 0), e !== t.__[0] && (i = !0);
                }
              }),
              !(!i && o.__c.props === t) && (!a || a.call(this, t, e, r))
            );
          };
          i.u = !0;
          var a = i.shouldComponentUpdate,
            u = i.componentWillUpdate;
          (i.componentWillUpdate = function (t, e, r) {
            if (this.__e) {
              var n = a;
              (a = void 0), s(t, e, r), (a = n);
            }
            u && u.call(this, t, e, r);
          }),
            (i.shouldComponentUpdate = s);
        }
        return o.__N || o.__;
      }
      function v(t, e) {
        var r = g(n++, 3);
        !a.options.__s &&
          L(r.__H, e) &&
          ((r.__ = t), (r.i = e), i.__H.__h.push(r));
      }
      function _(t, e) {
        var r = g(n++, 4);
        !a.options.__s && L(r.__H, e) && ((r.__ = t), (r.i = e), i.__h.push(r));
      }
      function w(t) {
        return (
          (u = 5),
          S(function () {
            return { current: t };
          }, [])
        );
      }
      function E(t, e, r) {
        (u = 6),
          _(
            function () {
              return "function" == typeof t
                ? (t(e()),
                  function () {
                    return t(null);
                  })
                : t
                ? ((t.current = e()),
                  function () {
                    return (t.current = null);
                  })
                : void 0;
            },
            null == r ? r : r.concat(t)
          );
      }
      function S(t, e) {
        var r = g(n++, 7);
        return L(r.__H, e)
          ? ((r.__V = t()), (r.i = e), (r.__h = t), r.__V)
          : r.__;
      }
      function M(t, e) {
        return (
          (u = 8),
          S(function () {
            return t;
          }, e)
        );
      }
      function x(t) {
        var e = i.context[t.__c],
          r = g(n++, 9);
        return (
          (r.c = t),
          e ? (null == r.__ && ((r.__ = !0), e.sub(i)), e.props.value) : t.__
        );
      }
      function k(t, e) {
        a.options.useDebugValue && a.options.useDebugValue(e ? e(t) : t);
      }
      function C(t) {
        var e = g(n++, 10),
          r = m();
        return (
          (e.__ = t),
          i.componentDidCatch ||
            (i.componentDidCatch = function (t, n) {
              e.__ && e.__(t, n), r[1](t);
            }),
          [
            r[0],
            function () {
              r[1](void 0);
            },
          ]
        );
      }
      function I() {
        var t = g(n++, 11);
        if (!t.__) {
          for (var e = i.__v; null !== e && !e.__m && null !== e.__; ) e = e.__;
          var r = e.__m || (e.__m = [0, 0]);
          t.__ = "P" + r[0] + "-" + r[1]++;
        }
        return t.__;
      }
      function R() {
        for (var t; (t = c.shift()); )
          if (t.__P && t.__H)
            try {
              t.__H.__h.forEach(T), t.__H.__h.forEach(O), (t.__H.__h = []);
            } catch (e) {
              (t.__H.__h = []), a.options.__e(e, t.__v);
            }
      }
      (a.options.__b = function (t) {
        (i = null), h && h(t);
      }),
        (a.options.__r = function (t) {
          d && d(t), (n = 0);
          var e = (i = t.__c).__H;
          e &&
            (o === i
              ? ((e.__h = []),
                (i.__h = []),
                e.__.forEach(function (t) {
                  t.__N && (t.__ = t.__N), (t.__V = l), (t.__N = t.i = void 0);
                }))
              : (e.__h.forEach(T), e.__h.forEach(O), (e.__h = []), (n = 0))),
            (o = i);
        }),
        (a.options.diffed = function (t) {
          f && f(t);
          var e = t.__c;
          e &&
            e.__H &&
            (e.__H.__h.length &&
              ((1 !== c.push(e) && s === a.options.requestAnimationFrame) ||
                ((s = a.options.requestAnimationFrame) || N)(R)),
            e.__H.__.forEach(function (t) {
              t.i && (t.__H = t.i),
                t.__V !== l && (t.__ = t.__V),
                (t.i = void 0),
                (t.__V = l);
            })),
            (o = i = null);
        }),
        (a.options.__c = function (t, e) {
          e.some(function (t) {
            try {
              t.__h.forEach(T),
                (t.__h = t.__h.filter(function (t) {
                  return !t.__ || O(t);
                }));
            } catch (r) {
              e.some(function (t) {
                t.__h && (t.__h = []);
              }),
                (e = []),
                a.options.__e(r, t.__v);
            }
          }),
            p && p(t, e);
        }),
        (a.options.unmount = function (t) {
          y && y(t);
          var e,
            r = t.__c;
          r &&
            r.__H &&
            (r.__H.__.forEach(function (t) {
              try {
                T(t);
              } catch (t) {
                e = t;
              }
            }),
            (r.__H = void 0),
            e && a.options.__e(e, r.__v));
        });
      var A = "function" == typeof requestAnimationFrame;
      function N(t) {
        var e,
          r = function () {
            clearTimeout(n), A && cancelAnimationFrame(e), setTimeout(t);
          },
          n = setTimeout(r, 100);
        A && (e = requestAnimationFrame(r));
      }
      function T(t) {
        var e = i,
          r = t.__c;
        "function" == typeof r && ((t.__c = void 0), r()), (i = e);
      }
      function O(t) {
        var e = i;
        (t.__c = t.__()), (i = e);
      }
      function L(t, e) {
        return (
          !t ||
          t.length !== e.length ||
          e.some(function (e, r) {
            return e !== t[r];
          })
        );
      }
      function j(t, e) {
        return "function" == typeof e ? e(t) : e;
      }
    },
    55798: function (t) {
      "use strict";
      var e = String.prototype.replace,
        r = /%20/g,
        n = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
      t.exports = {
        default: n.RFC3986,
        formatters: {
          RFC1738: function (t) {
            return e.call(t, r, "+");
          },
          RFC3986: function (t) {
            return String(t);
          },
        },
        RFC1738: n.RFC1738,
        RFC3986: n.RFC3986,
      };
    },
    80129: function (t, e, r) {
      "use strict";
      var n = r(58261),
        i = r(55235),
        o = r(55798);
      t.exports = { formats: o, parse: i, stringify: n };
    },
    55235: function (t, e, r) {
      "use strict";
      var n = r(12769),
        i = Object.prototype.hasOwnProperty,
        o = Array.isArray,
        s = {
          allowDots: !1,
          allowPrototypes: !1,
          allowSparse: !1,
          arrayLimit: 20,
          charset: "utf-8",
          charsetSentinel: !1,
          comma: !1,
          decoder: n.decode,
          delimiter: "&",
          depth: 5,
          ignoreQueryPrefix: !1,
          interpretNumericEntities: !1,
          parameterLimit: 1e3,
          parseArrays: !0,
          plainObjects: !1,
          strictNullHandling: !1,
        },
        a = function (t, e) {
          return t && "string" == typeof t && e.comma && t.indexOf(",") > -1
            ? t.split(",")
            : t;
        },
        u = function (t, e) {
          var r = { __proto__: null },
            u = e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t,
            c = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit,
            l = u.split(e.delimiter, c),
            h = -1,
            d = e.charset;
          if (e.charsetSentinel)
            for (f = 0; f < l.length; ++f)
              0 === l[f].indexOf("utf8=") &&
                ("utf8=%E2%9C%93" === l[f]
                  ? (d = "utf-8")
                  : "utf8=%26%2310003%3B" === l[f] && (d = "iso-8859-1"),
                (h = f),
                (f = l.length));
          for (f = 0; f < l.length; ++f)
            if (f !== h) {
              var f,
                p,
                y,
                g = l[f],
                m = g.indexOf("]="),
                b = -1 === m ? g.indexOf("=") : m + 1;
              -1 === b
                ? ((p = e.decoder(g, s.decoder, d, "key")),
                  (y = e.strictNullHandling ? null : ""))
                : ((p = e.decoder(g.slice(0, b), s.decoder, d, "key")),
                  (y = n.maybeMap(a(g.slice(b + 1), e), function (t) {
                    return e.decoder(t, s.decoder, d, "value");
                  }))),
                y &&
                  e.interpretNumericEntities &&
                  "iso-8859-1" === d &&
                  (y = y.replace(/&#(\d+);/g, function (t, e) {
                    return String.fromCharCode(parseInt(e, 10));
                  })),
                g.indexOf("[]=") > -1 && (y = o(y) ? [y] : y),
                i.call(r, p) ? (r[p] = n.combine(r[p], y)) : (r[p] = y);
            }
          return r;
        },
        c = function (t, e, r, n) {
          for (var i = n ? e : a(e, r), o = t.length - 1; o >= 0; --o) {
            var s,
              u = t[o];
            if ("[]" === u && r.parseArrays) s = [].concat(i);
            else {
              s = r.plainObjects ? Object.create(null) : {};
              var c =
                  "[" === u.charAt(0) && "]" === u.charAt(u.length - 1)
                    ? u.slice(1, -1)
                    : u,
                l = parseInt(c, 10);
              r.parseArrays || "" !== c
                ? !isNaN(l) &&
                  u !== c &&
                  String(l) === c &&
                  l >= 0 &&
                  r.parseArrays &&
                  l <= r.arrayLimit
                  ? ((s = [])[l] = i)
                  : "__proto__" !== c && (s[c] = i)
                : (s = { 0: i });
            }
            i = s;
          }
          return i;
        },
        l = function (t, e, r, n) {
          if (t) {
            var o = r.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t,
              s = /(\[[^[\]]*])/g,
              a = r.depth > 0 && /(\[[^[\]]*])/.exec(o),
              u = a ? o.slice(0, a.index) : o,
              l = [];
            if (u) {
              if (
                !r.plainObjects &&
                i.call(Object.prototype, u) &&
                !r.allowPrototypes
              )
                return;
              l.push(u);
            }
            for (
              var h = 0;
              r.depth > 0 && null !== (a = s.exec(o)) && h < r.depth;

            ) {
              if (
                ((h += 1),
                !r.plainObjects &&
                  i.call(Object.prototype, a[1].slice(1, -1)) &&
                  !r.allowPrototypes)
              )
                return;
              l.push(a[1]);
            }
            return a && l.push("[" + o.slice(a.index) + "]"), c(l, e, r, n);
          }
        },
        h = function (t) {
          if (!t) return s;
          if (
            null !== t.decoder &&
            void 0 !== t.decoder &&
            "function" != typeof t.decoder
          )
            throw TypeError("Decoder has to be a function.");
          if (
            void 0 !== t.charset &&
            "utf-8" !== t.charset &&
            "iso-8859-1" !== t.charset
          )
            throw TypeError(
              "The charset option must be either utf-8, iso-8859-1, or undefined"
            );
          var e = void 0 === t.charset ? s.charset : t.charset;
          return {
            allowDots: void 0 === t.allowDots ? s.allowDots : !!t.allowDots,
            allowPrototypes:
              "boolean" == typeof t.allowPrototypes
                ? t.allowPrototypes
                : s.allowPrototypes,
            allowSparse:
              "boolean" == typeof t.allowSparse ? t.allowSparse : s.allowSparse,
            arrayLimit:
              "number" == typeof t.arrayLimit ? t.arrayLimit : s.arrayLimit,
            charset: e,
            charsetSentinel:
              "boolean" == typeof t.charsetSentinel
                ? t.charsetSentinel
                : s.charsetSentinel,
            comma: "boolean" == typeof t.comma ? t.comma : s.comma,
            decoder: "function" == typeof t.decoder ? t.decoder : s.decoder,
            delimiter:
              "string" == typeof t.delimiter || n.isRegExp(t.delimiter)
                ? t.delimiter
                : s.delimiter,
            depth:
              "number" == typeof t.depth || !1 === t.depth ? +t.depth : s.depth,
            ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
            interpretNumericEntities:
              "boolean" == typeof t.interpretNumericEntities
                ? t.interpretNumericEntities
                : s.interpretNumericEntities,
            parameterLimit:
              "number" == typeof t.parameterLimit
                ? t.parameterLimit
                : s.parameterLimit,
            parseArrays: !1 !== t.parseArrays,
            plainObjects:
              "boolean" == typeof t.plainObjects
                ? t.plainObjects
                : s.plainObjects,
            strictNullHandling:
              "boolean" == typeof t.strictNullHandling
                ? t.strictNullHandling
                : s.strictNullHandling,
          };
        };
      t.exports = function (t, e) {
        var r = h(e);
        if ("" === t || null == t)
          return r.plainObjects ? Object.create(null) : {};
        for (
          var i = "string" == typeof t ? u(t, r) : t,
            o = r.plainObjects ? Object.create(null) : {},
            s = Object.keys(i),
            a = 0;
          a < s.length;
          ++a
        ) {
          var c = s[a],
            d = l(c, i[c], r, "string" == typeof t);
          o = n.merge(o, d, r);
        }
        return !0 === r.allowSparse ? o : n.compact(o);
      };
    },
    58261: function (t, e, r) {
      "use strict";
      var n = r(37478),
        i = r(12769),
        o = r(55798),
        s = Object.prototype.hasOwnProperty,
        a = {
          brackets: function (t) {
            return t + "[]";
          },
          comma: "comma",
          indices: function (t, e) {
            return t + "[" + e + "]";
          },
          repeat: function (t) {
            return t;
          },
        },
        u = Array.isArray,
        c = Array.prototype.push,
        l = function (t, e) {
          c.apply(t, u(e) ? e : [e]);
        },
        h = Date.prototype.toISOString,
        d = o.default,
        f = {
          addQueryPrefix: !1,
          allowDots: !1,
          charset: "utf-8",
          charsetSentinel: !1,
          delimiter: "&",
          encode: !0,
          encoder: i.encode,
          encodeValuesOnly: !1,
          format: d,
          formatter: o.formatters[d],
          indices: !1,
          serializeDate: function (t) {
            return h.call(t);
          },
          skipNulls: !1,
          strictNullHandling: !1,
        },
        p = {},
        y = function t(e, r, o, s, a, c, h, d, y, g, m, b, v, _, w, E) {
          for (
            var S, M, x = e, k = E, C = 0, I = !1;
            void 0 !== (k = k.get(p)) && !I;

          ) {
            var R = k.get(e);
            if (((C += 1), void 0 !== R)) {
              if (R === C) throw RangeError("Cyclic object value");
              I = !0;
            }
            void 0 === k.get(p) && (C = 0);
          }
          if (
            ("function" == typeof d
              ? (x = d(r, x))
              : x instanceof Date
              ? (x = m(x))
              : "comma" === o &&
                u(x) &&
                (x = i.maybeMap(x, function (t) {
                  return t instanceof Date ? m(t) : t;
                })),
            null === x)
          ) {
            if (a) return h && !_ ? h(r, f.encoder, w, "key", b) : r;
            x = "";
          }
          if (
            "string" == typeof (S = x) ||
            "number" == typeof S ||
            "boolean" == typeof S ||
            "symbol" == typeof S ||
            "bigint" == typeof S ||
            i.isBuffer(x)
          )
            return h
              ? [
                  v(_ ? r : h(r, f.encoder, w, "key", b)) +
                    "=" +
                    v(h(x, f.encoder, w, "value", b)),
                ]
              : [v(r) + "=" + v(String(x))];
          var A = [];
          if (void 0 === x) return A;
          if ("comma" === o && u(x))
            _ && h && (x = i.maybeMap(x, h)),
              (M = [{ value: x.length > 0 ? x.join(",") || null : void 0 }]);
          else if (u(d)) M = d;
          else {
            var N = Object.keys(x);
            M = y ? N.sort(y) : N;
          }
          for (
            var T = s && u(x) && 1 === x.length ? r + "[]" : r, O = 0;
            O < M.length;
            ++O
          ) {
            var L = M[O],
              j = "object" == typeof L && void 0 !== L.value ? L.value : x[L];
            if (!c || null !== j) {
              var P = u(x)
                ? "function" == typeof o
                  ? o(T, L)
                  : T
                : T + (g ? "." + L : "[" + L + "]");
              E.set(e, C);
              var D = n();
              D.set(p, E),
                l(
                  A,
                  t(
                    j,
                    P,
                    o,
                    s,
                    a,
                    c,
                    "comma" === o && _ && u(x) ? null : h,
                    d,
                    y,
                    g,
                    m,
                    b,
                    v,
                    _,
                    w,
                    D
                  )
                );
            }
          }
          return A;
        },
        g = function (t) {
          if (!t) return f;
          if (
            null !== t.encoder &&
            void 0 !== t.encoder &&
            "function" != typeof t.encoder
          )
            throw TypeError("Encoder has to be a function.");
          var e = t.charset || f.charset;
          if (
            void 0 !== t.charset &&
            "utf-8" !== t.charset &&
            "iso-8859-1" !== t.charset
          )
            throw TypeError(
              "The charset option must be either utf-8, iso-8859-1, or undefined"
            );
          var r = o.default;
          if (void 0 !== t.format) {
            if (!s.call(o.formatters, t.format))
              throw TypeError("Unknown format option provided.");
            r = t.format;
          }
          var n = o.formatters[r],
            i = f.filter;
          return (
            ("function" == typeof t.filter || u(t.filter)) && (i = t.filter),
            {
              addQueryPrefix:
                "boolean" == typeof t.addQueryPrefix
                  ? t.addQueryPrefix
                  : f.addQueryPrefix,
              allowDots: void 0 === t.allowDots ? f.allowDots : !!t.allowDots,
              charset: e,
              charsetSentinel:
                "boolean" == typeof t.charsetSentinel
                  ? t.charsetSentinel
                  : f.charsetSentinel,
              delimiter: void 0 === t.delimiter ? f.delimiter : t.delimiter,
              encode: "boolean" == typeof t.encode ? t.encode : f.encode,
              encoder: "function" == typeof t.encoder ? t.encoder : f.encoder,
              encodeValuesOnly:
                "boolean" == typeof t.encodeValuesOnly
                  ? t.encodeValuesOnly
                  : f.encodeValuesOnly,
              filter: i,
              format: r,
              formatter: n,
              serializeDate:
                "function" == typeof t.serializeDate
                  ? t.serializeDate
                  : f.serializeDate,
              skipNulls:
                "boolean" == typeof t.skipNulls ? t.skipNulls : f.skipNulls,
              sort: "function" == typeof t.sort ? t.sort : null,
              strictNullHandling:
                "boolean" == typeof t.strictNullHandling
                  ? t.strictNullHandling
                  : f.strictNullHandling,
            }
          );
        };
      t.exports = function (t, e) {
        var r,
          i,
          o = t,
          s = g(e);
        "function" == typeof s.filter
          ? (o = (0, s.filter)("", o))
          : u(s.filter) && (r = s.filter);
        var c = [];
        if ("object" != typeof o || null === o) return "";
        i =
          e && e.arrayFormat in a
            ? e.arrayFormat
            : e && "indices" in e
            ? e.indices
              ? "indices"
              : "repeat"
            : "indices";
        var h = a[i];
        if (e && "commaRoundTrip" in e && "boolean" != typeof e.commaRoundTrip)
          throw TypeError("`commaRoundTrip` must be a boolean, or absent");
        var d = "comma" === h && e && e.commaRoundTrip;
        r || (r = Object.keys(o)), s.sort && r.sort(s.sort);
        for (var f = n(), p = 0; p < r.length; ++p) {
          var m = r[p];
          (s.skipNulls && null === o[m]) ||
            l(
              c,
              y(
                o[m],
                m,
                h,
                d,
                s.strictNullHandling,
                s.skipNulls,
                s.encode ? s.encoder : null,
                s.filter,
                s.sort,
                s.allowDots,
                s.serializeDate,
                s.format,
                s.formatter,
                s.encodeValuesOnly,
                s.charset,
                f
              )
            );
        }
        var b = c.join(s.delimiter),
          v = !0 === s.addQueryPrefix ? "?" : "";
        return (
          s.charsetSentinel &&
            ("iso-8859-1" === s.charset
              ? (v += "utf8=%26%2310003%3B&")
              : (v += "utf8=%E2%9C%93&")),
          b.length > 0 ? v + b : ""
        );
      };
    },
    12769: function (t, e, r) {
      "use strict";
      var n = r(55798),
        i = Object.prototype.hasOwnProperty,
        o = Array.isArray,
        s = (function () {
          for (var t = [], e = 0; e < 256; ++e)
            t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
          return t;
        })(),
        a = function (t) {
          for (; t.length > 1; ) {
            var e = t.pop(),
              r = e.obj[e.prop];
            if (o(r)) {
              for (var n = [], i = 0; i < r.length; ++i)
                void 0 !== r[i] && n.push(r[i]);
              e.obj[e.prop] = n;
            }
          }
        },
        u = function (t, e) {
          for (
            var r = e && e.plainObjects ? Object.create(null) : {}, n = 0;
            n < t.length;
            ++n
          )
            void 0 !== t[n] && (r[n] = t[n]);
          return r;
        };
      t.exports = {
        arrayToObject: u,
        assign: function (t, e) {
          return Object.keys(e).reduce(function (t, r) {
            return (t[r] = e[r]), t;
          }, t);
        },
        combine: function (t, e) {
          return [].concat(t, e);
        },
        compact: function (t) {
          for (
            var e = [{ obj: { o: t }, prop: "o" }], r = [], n = 0;
            n < e.length;
            ++n
          )
            for (
              var i = e[n], o = i.obj[i.prop], s = Object.keys(o), u = 0;
              u < s.length;
              ++u
            ) {
              var c = s[u],
                l = o[c];
              "object" == typeof l &&
                null !== l &&
                -1 === r.indexOf(l) &&
                (e.push({ obj: o, prop: c }), r.push(l));
            }
          return a(e), t;
        },
        decode: function (t, e, r) {
          var n = t.replace(/\+/g, " ");
          if ("iso-8859-1" === r) return n.replace(/%[0-9a-f]{2}/gi, unescape);
          try {
            return decodeURIComponent(n);
          } catch (t) {
            return n;
          }
        },
        encode: function (t, e, r, i, o) {
          if (0 === t.length) return t;
          var a = t;
          if (
            ("symbol" == typeof t
              ? (a = Symbol.prototype.toString.call(t))
              : "string" != typeof t && (a = String(t)),
            "iso-8859-1" === r)
          )
            return escape(a).replace(/%u[0-9a-f]{4}/gi, function (t) {
              return "%26%23" + parseInt(t.slice(2), 16) + "%3B";
            });
          for (var u = "", c = 0; c < a.length; ++c) {
            var l = a.charCodeAt(c);
            if (
              45 === l ||
              46 === l ||
              95 === l ||
              126 === l ||
              (l >= 48 && l <= 57) ||
              (l >= 65 && l <= 90) ||
              (l >= 97 && l <= 122) ||
              (o === n.RFC1738 && (40 === l || 41 === l))
            ) {
              u += a.charAt(c);
              continue;
            }
            if (l < 128) {
              u += s[l];
              continue;
            }
            if (l < 2048) {
              u += s[192 | (l >> 6)] + s[128 | (63 & l)];
              continue;
            }
            if (l < 55296 || l >= 57344) {
              u +=
                s[224 | (l >> 12)] +
                s[128 | ((l >> 6) & 63)] +
                s[128 | (63 & l)];
              continue;
            }
            (c += 1),
              (u +=
                s[
                  240 |
                    ((l =
                      65536 +
                      (((1023 & l) << 10) | (1023 & a.charCodeAt(c)))) >>
                      18)
                ] +
                s[128 | ((l >> 12) & 63)] +
                s[128 | ((l >> 6) & 63)] +
                s[128 | (63 & l)]);
          }
          return u;
        },
        isBuffer: function (t) {
          return (
            !!t &&
            "object" == typeof t &&
            !!(
              t.constructor &&
              t.constructor.isBuffer &&
              t.constructor.isBuffer(t)
            )
          );
        },
        isRegExp: function (t) {
          return "[object RegExp]" === Object.prototype.toString.call(t);
        },
        maybeMap: function (t, e) {
          if (o(t)) {
            for (var r = [], n = 0; n < t.length; n += 1) r.push(e(t[n]));
            return r;
          }
          return e(t);
        },
        merge: function t(e, r, n) {
          if (!r) return e;
          if ("object" != typeof r) {
            if (o(e)) e.push(r);
            else {
              if (!e || "object" != typeof e) return [e, r];
              ((n && (n.plainObjects || n.allowPrototypes)) ||
                !i.call(Object.prototype, r)) &&
                (e[r] = !0);
            }
            return e;
          }
          if (!e || "object" != typeof e) return [e].concat(r);
          var s = e;
          return (o(e) && !o(r) && (s = u(e, n)), o(e) && o(r))
            ? (r.forEach(function (r, o) {
                if (i.call(e, o)) {
                  var s = e[o];
                  s && "object" == typeof s && r && "object" == typeof r
                    ? (e[o] = t(s, r, n))
                    : e.push(r);
                } else e[o] = r;
              }),
              e)
            : Object.keys(r).reduce(function (e, o) {
                var s = r[o];
                return i.call(e, o) ? (e[o] = t(e[o], s, n)) : (e[o] = s), e;
              }, s);
        },
      };
    },
    94281: function (t) {
      "use strict";
      var e = {};
      function r(t, r, n) {
        n || (n = Error);
        var i = (function (t) {
          function e(e, n, i) {
            return t.call(this, "string" == typeof r ? r : r(e, n, i)) || this;
          }
          return (
            (e.prototype = Object.create(t.prototype)),
            (e.prototype.constructor = e),
            (e.__proto__ = t),
            e
          );
        })(n);
        (i.prototype.name = n.name), (i.prototype.code = t), (e[t] = i);
      }
      function n(t, e) {
        if (!Array.isArray(t)) return "of ".concat(e, " ").concat(String(t));
        var r = t.length;
        return ((t = t.map(function (t) {
          return String(t);
        })),
        r > 2)
          ? "one of "
              .concat(e, " ")
              .concat(t.slice(0, r - 1).join(", "), ", or ") + t[r - 1]
          : 2 === r
          ? "one of ".concat(e, " ").concat(t[0], " or ").concat(t[1])
          : "of ".concat(e, " ").concat(t[0]);
      }
      r(
        "ERR_INVALID_OPT_VALUE",
        function (t, e) {
          return 'The value "' + e + '" is invalid for option "' + t + '"';
        },
        TypeError
      ),
        r(
          "ERR_INVALID_ARG_TYPE",
          function (t, e, r) {
            if (
              ("string" == typeof e &&
              ((i = "not "), e.substr(!o || o < 0 ? 0 : +o, i.length) === i)
                ? ((c = "must not be"), (e = e.replace(/^not /, "")))
                : (c = "must be"),
              (s = " argument"),
              (void 0 === a || a > t.length) && (a = t.length),
              t.substring(a - s.length, a) === s)
            )
              l = "The ".concat(t, " ").concat(c, " ").concat(n(e, "type"));
            else {
              var i,
                o,
                s,
                a,
                u,
                c,
                l,
                h = ("number" != typeof u && (u = 0),
                u + 1 > t.length || -1 === t.indexOf(".", u))
                  ? "argument"
                  : "property";
              l = 'The "'
                .concat(t, '" ')
                .concat(h, " ")
                .concat(c, " ")
                .concat(n(e, "type"));
            }
            return l + ". Received type ".concat(typeof r);
          },
          TypeError
        ),
        r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
        r("ERR_METHOD_NOT_IMPLEMENTED", function (t) {
          return "The " + t + " method is not implemented";
        }),
        r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
        r("ERR_STREAM_DESTROYED", function (t) {
          return "Cannot call " + t + " after a stream was destroyed";
        }),
        r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
        r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
        r("ERR_STREAM_WRITE_AFTER_END", "write after end"),
        r(
          "ERR_STREAM_NULL_VALUES",
          "May not write null values to stream",
          TypeError
        ),
        r(
          "ERR_UNKNOWN_ENCODING",
          function (t) {
            return "Unknown encoding: " + t;
          },
          TypeError
        ),
        r(
          "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
          "stream.unshift() after end event"
        ),
        (t.exports.q = e);
    },
    56753: function (t, e, r) {
      "use strict";
      var n = r(83454),
        i =
          Object.keys ||
          function (t) {
            var e = [];
            for (var r in t) e.push(r);
            return e;
          };
      t.exports = l;
      var o = r(79481),
        s = r(64229);
      r(35717)(l, o);
      for (var a = i(s.prototype), u = 0; u < a.length; u++) {
        var c = a[u];
        l.prototype[c] || (l.prototype[c] = s.prototype[c]);
      }
      function l(t) {
        if (!(this instanceof l)) return new l(t);
        o.call(this, t),
          s.call(this, t),
          (this.allowHalfOpen = !0),
          t &&
            (!1 === t.readable && (this.readable = !1),
            !1 === t.writable && (this.writable = !1),
            !1 === t.allowHalfOpen &&
              ((this.allowHalfOpen = !1), this.once("end", h)));
      }
      function h() {
        this._writableState.ended || n.nextTick(d, this);
      }
      function d(t) {
        t.end();
      }
      Object.defineProperty(l.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function () {
          return this._writableState.highWaterMark;
        },
      }),
        Object.defineProperty(l.prototype, "writableBuffer", {
          enumerable: !1,
          get: function () {
            return this._writableState && this._writableState.getBuffer();
          },
        }),
        Object.defineProperty(l.prototype, "writableLength", {
          enumerable: !1,
          get: function () {
            return this._writableState.length;
          },
        }),
        Object.defineProperty(l.prototype, "destroyed", {
          enumerable: !1,
          get: function () {
            return (
              void 0 !== this._readableState &&
              void 0 !== this._writableState &&
              this._readableState.destroyed &&
              this._writableState.destroyed
            );
          },
          set: function (t) {
            void 0 !== this._readableState &&
              void 0 !== this._writableState &&
              ((this._readableState.destroyed = t),
              (this._writableState.destroyed = t));
          },
        });
    },
    82725: function (t, e, r) {
      "use strict";
      t.exports = i;
      var n = r(74605);
      function i(t) {
        if (!(this instanceof i)) return new i(t);
        n.call(this, t);
      }
      r(35717)(i, n),
        (i.prototype._transform = function (t, e, r) {
          r(null, t);
        });
    },
    79481: function (t, e, r) {
      "use strict";
      var n,
        i,
        o,
        s,
        a,
        u = r(83454);
      (t.exports = x), (x.ReadableState = M), r(17187).EventEmitter;
      var c = function (t, e) {
          return t.listeners(e).length;
        },
        l = r(22503),
        h = r(48764).Buffer,
        d =
          (void 0 !== r.g
            ? r.g
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof self
            ? self
            : {}
          ).Uint8Array || function () {},
        f = r(94616);
      i = f && f.debuglog ? f.debuglog("stream") : function () {};
      var p = r(57327),
        y = r(61195),
        g = r(82457).getHighWaterMark,
        m = r(94281).q,
        b = m.ERR_INVALID_ARG_TYPE,
        v = m.ERR_STREAM_PUSH_AFTER_EOF,
        _ = m.ERR_METHOD_NOT_IMPLEMENTED,
        w = m.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
      r(35717)(x, l);
      var E = y.errorOrDestroy,
        S = ["error", "close", "destroy", "pause", "resume"];
      function M(t, e, i) {
        (n = n || r(56753)),
          (t = t || {}),
          "boolean" != typeof i && (i = e instanceof n),
          (this.objectMode = !!t.objectMode),
          i && (this.objectMode = this.objectMode || !!t.readableObjectMode),
          (this.highWaterMark = g(this, t, "readableHighWaterMark", i)),
          (this.buffer = new p()),
          (this.length = 0),
          (this.pipes = null),
          (this.pipesCount = 0),
          (this.flowing = null),
          (this.ended = !1),
          (this.endEmitted = !1),
          (this.reading = !1),
          (this.sync = !0),
          (this.needReadable = !1),
          (this.emittedReadable = !1),
          (this.readableListening = !1),
          (this.resumeScheduled = !1),
          (this.paused = !0),
          (this.emitClose = !1 !== t.emitClose),
          (this.autoDestroy = !!t.autoDestroy),
          (this.destroyed = !1),
          (this.defaultEncoding = t.defaultEncoding || "utf8"),
          (this.awaitDrain = 0),
          (this.readingMore = !1),
          (this.decoder = null),
          (this.encoding = null),
          t.encoding &&
            (o || (o = r(32553).s),
            (this.decoder = new o(t.encoding)),
            (this.encoding = t.encoding));
      }
      function x(t) {
        if (((n = n || r(56753)), !(this instanceof x))) return new x(t);
        var e = this instanceof n;
        (this._readableState = new M(t, this, e)),
          (this.readable = !0),
          t &&
            ("function" == typeof t.read && (this._read = t.read),
            "function" == typeof t.destroy && (this._destroy = t.destroy)),
          l.call(this);
      }
      function k(t, e, r, n, o) {
        i("readableAddChunk", e);
        var s,
          a,
          u,
          c,
          l,
          f = t._readableState;
        if (null === e)
          (f.reading = !1),
            (function (t, e) {
              if ((i("onEofChunk"), !e.ended)) {
                if (e.decoder) {
                  var r = e.decoder.end();
                  r &&
                    r.length &&
                    (e.buffer.push(r),
                    (e.length += e.objectMode ? 1 : r.length));
                }
                (e.ended = !0),
                  e.sync
                    ? R(t)
                    : ((e.needReadable = !1),
                      e.emittedReadable || ((e.emittedReadable = !0), A(t)));
              }
            })(t, f);
        else {
          if (
            (o ||
              ((s = f),
              (a = e),
              h.isBuffer(a) ||
                a instanceof d ||
                "string" == typeof a ||
                void 0 === a ||
                s.objectMode ||
                (u = new b("chunk", ["string", "Buffer", "Uint8Array"], a)),
              (l = u)),
            l)
          )
            E(t, l);
          else if (f.objectMode || (e && e.length > 0)) {
            if (
              ("string" == typeof e ||
                f.objectMode ||
                Object.getPrototypeOf(e) === h.prototype ||
                ((c = e), (e = h.from(c))),
              n)
            )
              f.endEmitted ? E(t, new w()) : C(t, f, e, !0);
            else if (f.ended) E(t, new v());
            else {
              if (f.destroyed) return !1;
              (f.reading = !1),
                f.decoder && !r
                  ? ((e = f.decoder.write(e)),
                    f.objectMode || 0 !== e.length ? C(t, f, e, !1) : N(t, f))
                  : C(t, f, e, !1);
            }
          } else n || ((f.reading = !1), N(t, f));
        }
        return !f.ended && (f.length < f.highWaterMark || 0 === f.length);
      }
      function C(t, e, r, n) {
        e.flowing && 0 === e.length && !e.sync
          ? ((e.awaitDrain = 0), t.emit("data", r))
          : ((e.length += e.objectMode ? 1 : r.length),
            n ? e.buffer.unshift(r) : e.buffer.push(r),
            e.needReadable && R(t)),
          N(t, e);
      }
      function I(t, e) {
        if (t <= 0 || (0 === e.length && e.ended)) return 0;
        if (e.objectMode) return 1;
        if (t != t)
          return e.flowing && e.length ? e.buffer.head.data.length : e.length;
        if (t > e.highWaterMark) {
          var r;
          e.highWaterMark =
            ((r = t) >= 1073741824
              ? (r = 1073741824)
              : (r--,
                (r |= r >>> 1),
                (r |= r >>> 2),
                (r |= r >>> 4),
                (r |= r >>> 8),
                (r |= r >>> 16),
                r++),
            r);
        }
        return t <= e.length
          ? t
          : e.ended
          ? e.length
          : ((e.needReadable = !0), 0);
      }
      function R(t) {
        var e = t._readableState;
        i("emitReadable", e.needReadable, e.emittedReadable),
          (e.needReadable = !1),
          e.emittedReadable ||
            (i("emitReadable", e.flowing),
            (e.emittedReadable = !0),
            u.nextTick(A, t));
      }
      function A(t) {
        var e = t._readableState;
        i("emitReadable_", e.destroyed, e.length, e.ended),
          !e.destroyed &&
            (e.length || e.ended) &&
            (t.emit("readable"), (e.emittedReadable = !1)),
          (e.needReadable =
            !e.flowing && !e.ended && e.length <= e.highWaterMark),
          P(t);
      }
      function N(t, e) {
        e.readingMore || ((e.readingMore = !0), u.nextTick(T, t, e));
      }
      function T(t, e) {
        for (
          ;
          !e.reading &&
          !e.ended &&
          (e.length < e.highWaterMark || (e.flowing && 0 === e.length));

        ) {
          var r = e.length;
          if ((i("maybeReadMore read 0"), t.read(0), r === e.length)) break;
        }
        e.readingMore = !1;
      }
      function O(t) {
        var e = t._readableState;
        (e.readableListening = t.listenerCount("readable") > 0),
          e.resumeScheduled && !e.paused
            ? (e.flowing = !0)
            : t.listenerCount("data") > 0 && t.resume();
      }
      function L(t) {
        i("readable nexttick read 0"), t.read(0);
      }
      function j(t, e) {
        i("resume", e.reading),
          e.reading || t.read(0),
          (e.resumeScheduled = !1),
          t.emit("resume"),
          P(t),
          e.flowing && !e.reading && t.read(0);
      }
      function P(t) {
        var e = t._readableState;
        for (i("flow", e.flowing); e.flowing && null !== t.read(); );
      }
      function D(t, e) {
        var r;
        return 0 === e.length
          ? null
          : (e.objectMode
              ? (r = e.buffer.shift())
              : !t || t >= e.length
              ? ((r = e.decoder
                  ? e.buffer.join("")
                  : 1 === e.buffer.length
                  ? e.buffer.first()
                  : e.buffer.concat(e.length)),
                e.buffer.clear())
              : (r = e.buffer.consume(t, e.decoder)),
            r);
      }
      function B(t) {
        var e = t._readableState;
        i("endReadable", e.endEmitted),
          e.endEmitted || ((e.ended = !0), u.nextTick(F, e, t));
      }
      function F(t, e) {
        if (
          (i("endReadableNT", t.endEmitted, t.length),
          !t.endEmitted &&
            0 === t.length &&
            ((t.endEmitted = !0),
            (e.readable = !1),
            e.emit("end"),
            t.autoDestroy))
        ) {
          var r = e._writableState;
          (!r || (r.autoDestroy && r.finished)) && e.destroy();
        }
      }
      function $(t, e) {
        for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
        return -1;
      }
      Object.defineProperty(x.prototype, "destroyed", {
        enumerable: !1,
        get: function () {
          return (
            void 0 !== this._readableState && this._readableState.destroyed
          );
        },
        set: function (t) {
          this._readableState && (this._readableState.destroyed = t);
        },
      }),
        (x.prototype.destroy = y.destroy),
        (x.prototype._undestroy = y.undestroy),
        (x.prototype._destroy = function (t, e) {
          e(t);
        }),
        (x.prototype.push = function (t, e) {
          var r,
            n = this._readableState;
          return (
            n.objectMode
              ? (r = !0)
              : "string" == typeof t &&
                ((e = e || n.defaultEncoding) !== n.encoding &&
                  ((t = h.from(t, e)), (e = "")),
                (r = !0)),
            k(this, t, e, !1, r)
          );
        }),
        (x.prototype.unshift = function (t) {
          return k(this, t, null, !0, !1);
        }),
        (x.prototype.isPaused = function () {
          return !1 === this._readableState.flowing;
        }),
        (x.prototype.setEncoding = function (t) {
          o || (o = r(32553).s);
          var e = new o(t);
          (this._readableState.decoder = e),
            (this._readableState.encoding =
              this._readableState.decoder.encoding);
          for (var n = this._readableState.buffer.head, i = ""; null !== n; )
            (i += e.write(n.data)), (n = n.next);
          return (
            this._readableState.buffer.clear(),
            "" !== i && this._readableState.buffer.push(i),
            (this._readableState.length = i.length),
            this
          );
        }),
        (x.prototype.read = function (t) {
          i("read", t), (t = parseInt(t, 10));
          var e,
            r = this._readableState,
            n = t;
          if (
            (0 !== t && (r.emittedReadable = !1),
            0 === t &&
              r.needReadable &&
              ((0 !== r.highWaterMark
                ? r.length >= r.highWaterMark
                : r.length > 0) ||
                r.ended))
          )
            return (
              i("read: emitReadable", r.length, r.ended),
              0 === r.length && r.ended ? B(this) : R(this),
              null
            );
          if (0 === (t = I(t, r)) && r.ended)
            return 0 === r.length && B(this), null;
          var o = r.needReadable;
          return (
            i("need readable", o),
            (0 === r.length || r.length - t < r.highWaterMark) &&
              i("length less than watermark", (o = !0)),
            r.ended || r.reading
              ? i("reading or ended", (o = !1))
              : o &&
                (i("do read"),
                (r.reading = !0),
                (r.sync = !0),
                0 === r.length && (r.needReadable = !0),
                this._read(r.highWaterMark),
                (r.sync = !1),
                r.reading || (t = I(n, r))),
            null === (e = t > 0 ? D(t, r) : null)
              ? ((r.needReadable = r.length <= r.highWaterMark), (t = 0))
              : ((r.length -= t), (r.awaitDrain = 0)),
            0 === r.length &&
              (r.ended || (r.needReadable = !0), n !== t && r.ended && B(this)),
            null !== e && this.emit("data", e),
            e
          );
        }),
        (x.prototype._read = function (t) {
          E(this, new _("_read()"));
        }),
        (x.prototype.pipe = function (t, e) {
          var r = this,
            n = this._readableState;
          switch (n.pipesCount) {
            case 0:
              n.pipes = t;
              break;
            case 1:
              n.pipes = [n.pipes, t];
              break;
            default:
              n.pipes.push(t);
          }
          (n.pipesCount += 1), i("pipe count=%d opts=%j", n.pipesCount, e);
          var o =
            (e && !1 === e.end) || t === u.stdout || t === u.stderr ? y : s;
          function s() {
            i("onend"), t.end();
          }
          n.endEmitted ? u.nextTick(o) : r.once("end", o),
            t.on("unpipe", function e(o, u) {
              i("onunpipe"),
                o === r &&
                  u &&
                  !1 === u.hasUnpiped &&
                  ((u.hasUnpiped = !0),
                  i("cleanup"),
                  t.removeListener("close", f),
                  t.removeListener("finish", p),
                  t.removeListener("drain", a),
                  t.removeListener("error", d),
                  t.removeListener("unpipe", e),
                  r.removeListener("end", s),
                  r.removeListener("end", y),
                  r.removeListener("data", h),
                  (l = !0),
                  n.awaitDrain &&
                    (!t._writableState || t._writableState.needDrain) &&
                    a());
            });
          var a = function () {
            var t = r._readableState;
            i("pipeOnDrain", t.awaitDrain),
              t.awaitDrain && t.awaitDrain--,
              0 === t.awaitDrain && c(r, "data") && ((t.flowing = !0), P(r));
          };
          t.on("drain", a);
          var l = !1;
          function h(e) {
            i("ondata");
            var o = t.write(e);
            i("dest.write", o),
              !1 === o &&
                (((1 === n.pipesCount && n.pipes === t) ||
                  (n.pipesCount > 1 && -1 !== $(n.pipes, t))) &&
                  !l &&
                  (i("false write response, pause", n.awaitDrain),
                  n.awaitDrain++),
                r.pause());
          }
          function d(e) {
            i("onerror", e),
              y(),
              t.removeListener("error", d),
              0 === c(t, "error") && E(t, e);
          }
          function f() {
            t.removeListener("finish", p), y();
          }
          function p() {
            i("onfinish"), t.removeListener("close", f), y();
          }
          function y() {
            i("unpipe"), r.unpipe(t);
          }
          return (
            r.on("data", h),
            (function (t, e, r) {
              if ("function" == typeof t.prependListener)
                return t.prependListener(e, r);
              t._events && t._events[e]
                ? Array.isArray(t._events[e])
                  ? t._events[e].unshift(r)
                  : (t._events[e] = [r, t._events[e]])
                : t.on(e, r);
            })(t, "error", d),
            t.once("close", f),
            t.once("finish", p),
            t.emit("pipe", r),
            n.flowing || (i("pipe resume"), r.resume()),
            t
          );
        }),
        (x.prototype.unpipe = function (t) {
          var e = this._readableState,
            r = { hasUnpiped: !1 };
          if (0 === e.pipesCount) return this;
          if (1 === e.pipesCount)
            return (
              (t && t !== e.pipes) ||
                (t || (t = e.pipes),
                (e.pipes = null),
                (e.pipesCount = 0),
                (e.flowing = !1),
                t && t.emit("unpipe", this, r)),
              this
            );
          if (!t) {
            var n = e.pipes,
              i = e.pipesCount;
            (e.pipes = null), (e.pipesCount = 0), (e.flowing = !1);
            for (var o = 0; o < i; o++)
              n[o].emit("unpipe", this, { hasUnpiped: !1 });
            return this;
          }
          var s = $(e.pipes, t);
          return (
            -1 === s ||
              (e.pipes.splice(s, 1),
              (e.pipesCount -= 1),
              1 === e.pipesCount && (e.pipes = e.pipes[0]),
              t.emit("unpipe", this, r)),
            this
          );
        }),
        (x.prototype.on = function (t, e) {
          var r = l.prototype.on.call(this, t, e),
            n = this._readableState;
          return (
            "data" === t
              ? ((n.readableListening = this.listenerCount("readable") > 0),
                !1 !== n.flowing && this.resume())
              : "readable" !== t ||
                n.endEmitted ||
                n.readableListening ||
                ((n.readableListening = n.needReadable = !0),
                (n.flowing = !1),
                (n.emittedReadable = !1),
                i("on readable", n.length, n.reading),
                n.length ? R(this) : n.reading || u.nextTick(L, this)),
            r
          );
        }),
        (x.prototype.addListener = x.prototype.on),
        (x.prototype.removeListener = function (t, e) {
          var r = l.prototype.removeListener.call(this, t, e);
          return "readable" === t && u.nextTick(O, this), r;
        }),
        (x.prototype.removeAllListeners = function (t) {
          var e = l.prototype.removeAllListeners.apply(this, arguments);
          return ("readable" === t || void 0 === t) && u.nextTick(O, this), e;
        }),
        (x.prototype.resume = function () {
          var t = this._readableState;
          return (
            t.flowing ||
              (i("resume"),
              (t.flowing = !t.readableListening),
              t.resumeScheduled ||
                ((t.resumeScheduled = !0), u.nextTick(j, this, t))),
            (t.paused = !1),
            this
          );
        }),
        (x.prototype.pause = function () {
          return (
            i("call pause flowing=%j", this._readableState.flowing),
            !1 !== this._readableState.flowing &&
              (i("pause"),
              (this._readableState.flowing = !1),
              this.emit("pause")),
            (this._readableState.paused = !0),
            this
          );
        }),
        (x.prototype.wrap = function (t) {
          var e = this,
            r = this._readableState,
            n = !1;
          for (var o in (t.on("end", function () {
            if ((i("wrapped end"), r.decoder && !r.ended)) {
              var t = r.decoder.end();
              t && t.length && e.push(t);
            }
            e.push(null);
          }),
          t.on("data", function (o) {
            i("wrapped data"),
              r.decoder && (o = r.decoder.write(o)),
              (!r.objectMode || null != o) &&
                (r.objectMode || (o && o.length)) &&
                (e.push(o) || ((n = !0), t.pause()));
          }),
          t))
            void 0 === this[o] &&
              "function" == typeof t[o] &&
              (this[o] = (function (e) {
                return function () {
                  return t[e].apply(t, arguments);
                };
              })(o));
          for (var s = 0; s < S.length; s++)
            t.on(S[s], this.emit.bind(this, S[s]));
          return (
            (this._read = function (e) {
              i("wrapped _read", e), n && ((n = !1), t.resume());
            }),
            this
          );
        }),
        "function" == typeof Symbol &&
          (x.prototype[Symbol.asyncIterator] = function () {
            return void 0 === s && (s = r(45850)), s(this);
          }),
        Object.defineProperty(x.prototype, "readableHighWaterMark", {
          enumerable: !1,
          get: function () {
            return this._readableState.highWaterMark;
          },
        }),
        Object.defineProperty(x.prototype, "readableBuffer", {
          enumerable: !1,
          get: function () {
            return this._readableState && this._readableState.buffer;
          },
        }),
        Object.defineProperty(x.prototype, "readableFlowing", {
          enumerable: !1,
          get: function () {
            return this._readableState.flowing;
          },
          set: function (t) {
            this._readableState && (this._readableState.flowing = t);
          },
        }),
        (x._fromList = D),
        Object.defineProperty(x.prototype, "readableLength", {
          enumerable: !1,
          get: function () {
            return this._readableState.length;
          },
        }),
        "function" == typeof Symbol &&
          (x.from = function (t, e) {
            return void 0 === a && (a = r(15167)), a(x, t, e);
          });
    },
    74605: function (t, e, r) {
      "use strict";
      t.exports = l;
      var n = r(94281).q,
        i = n.ERR_METHOD_NOT_IMPLEMENTED,
        o = n.ERR_MULTIPLE_CALLBACK,
        s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
        a = n.ERR_TRANSFORM_WITH_LENGTH_0,
        u = r(56753);
      function c(t, e) {
        var r = this._transformState;
        r.transforming = !1;
        var n = r.writecb;
        if (null === n) return this.emit("error", new o());
        (r.writechunk = null),
          (r.writecb = null),
          null != e && this.push(e),
          n(t);
        var i = this._readableState;
        (i.reading = !1),
          (i.needReadable || i.length < i.highWaterMark) &&
            this._read(i.highWaterMark);
      }
      function l(t) {
        if (!(this instanceof l)) return new l(t);
        u.call(this, t),
          (this._transformState = {
            afterTransform: c.bind(this),
            needTransform: !1,
            transforming: !1,
            writecb: null,
            writechunk: null,
            writeencoding: null,
          }),
          (this._readableState.needReadable = !0),
          (this._readableState.sync = !1),
          t &&
            ("function" == typeof t.transform &&
              (this._transform = t.transform),
            "function" == typeof t.flush && (this._flush = t.flush)),
          this.on("prefinish", h);
      }
      function h() {
        var t = this;
        "function" != typeof this._flush || this._readableState.destroyed
          ? d(this, null, null)
          : this._flush(function (e, r) {
              d(t, e, r);
            });
      }
      function d(t, e, r) {
        if (e) return t.emit("error", e);
        if ((null != r && t.push(r), t._writableState.length)) throw new a();
        if (t._transformState.transforming) throw new s();
        return t.push(null);
      }
      r(35717)(l, u),
        (l.prototype.push = function (t, e) {
          return (
            (this._transformState.needTransform = !1),
            u.prototype.push.call(this, t, e)
          );
        }),
        (l.prototype._transform = function (t, e, r) {
          r(new i("_transform()"));
        }),
        (l.prototype._write = function (t, e, r) {
          var n = this._transformState;
          if (
            ((n.writecb = r),
            (n.writechunk = t),
            (n.writeencoding = e),
            !n.transforming)
          ) {
            var i = this._readableState;
            (n.needTransform || i.needReadable || i.length < i.highWaterMark) &&
              this._read(i.highWaterMark);
          }
        }),
        (l.prototype._read = function (t) {
          var e = this._transformState;
          null === e.writechunk || e.transforming
            ? (e.needTransform = !0)
            : ((e.transforming = !0),
              this._transform(e.writechunk, e.writeencoding, e.afterTransform));
        }),
        (l.prototype._destroy = function (t, e) {
          u.prototype._destroy.call(this, t, function (t) {
            e(t);
          });
        });
    },
    64229: function (t, e, r) {
      "use strict";
      var n,
        i,
        o = r(83454);
      function s(t) {
        var e = this;
        (this.next = null),
          (this.entry = null),
          (this.finish = function () {
            (function (t, e, r) {
              var n = t.entry;
              for (t.entry = null; n; ) {
                var i = n.callback;
                e.pendingcb--, i(void 0), (n = n.next);
              }
              e.corkedRequestsFree.next = t;
            })(e, t);
          });
      }
      (t.exports = x), (x.WritableState = M);
      var a = { deprecate: r(94927) },
        u = r(22503),
        c = r(48764).Buffer,
        l =
          (void 0 !== r.g
            ? r.g
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof self
            ? self
            : {}
          ).Uint8Array || function () {},
        h = r(61195),
        d = r(82457).getHighWaterMark,
        f = r(94281).q,
        p = f.ERR_INVALID_ARG_TYPE,
        y = f.ERR_METHOD_NOT_IMPLEMENTED,
        g = f.ERR_MULTIPLE_CALLBACK,
        m = f.ERR_STREAM_CANNOT_PIPE,
        b = f.ERR_STREAM_DESTROYED,
        v = f.ERR_STREAM_NULL_VALUES,
        _ = f.ERR_STREAM_WRITE_AFTER_END,
        w = f.ERR_UNKNOWN_ENCODING,
        E = h.errorOrDestroy;
      function S() {}
      function M(t, e, i) {
        (n = n || r(56753)),
          (t = t || {}),
          "boolean" != typeof i && (i = e instanceof n),
          (this.objectMode = !!t.objectMode),
          i && (this.objectMode = this.objectMode || !!t.writableObjectMode),
          (this.highWaterMark = d(this, t, "writableHighWaterMark", i)),
          (this.finalCalled = !1),
          (this.needDrain = !1),
          (this.ending = !1),
          (this.ended = !1),
          (this.finished = !1),
          (this.destroyed = !1);
        var a = !1 === t.decodeStrings;
        (this.decodeStrings = !a),
          (this.defaultEncoding = t.defaultEncoding || "utf8"),
          (this.length = 0),
          (this.writing = !1),
          (this.corked = 0),
          (this.sync = !0),
          (this.bufferProcessing = !1),
          (this.onwrite = function (t) {
            (function (t, e) {
              var r = t._writableState,
                n = r.sync,
                i = r.writecb;
              if ("function" != typeof i) throw new g();
              if (
                ((r.writing = !1),
                (r.writecb = null),
                (r.length -= r.writelen),
                (r.writelen = 0),
                e)
              )
                --r.pendingcb,
                  n
                    ? (o.nextTick(i, e),
                      o.nextTick(N, t, r),
                      (t._writableState.errorEmitted = !0),
                      E(t, e))
                    : (i(e),
                      (t._writableState.errorEmitted = !0),
                      E(t, e),
                      N(t, r));
              else {
                var s = R(r) || t.destroyed;
                s ||
                  r.corked ||
                  r.bufferProcessing ||
                  !r.bufferedRequest ||
                  I(t, r),
                  n ? o.nextTick(C, t, r, s, i) : C(t, r, s, i);
              }
            })(e, t);
          }),
          (this.writecb = null),
          (this.writelen = 0),
          (this.bufferedRequest = null),
          (this.lastBufferedRequest = null),
          (this.pendingcb = 0),
          (this.prefinished = !1),
          (this.errorEmitted = !1),
          (this.emitClose = !1 !== t.emitClose),
          (this.autoDestroy = !!t.autoDestroy),
          (this.bufferedRequestCount = 0),
          (this.corkedRequestsFree = new s(this));
      }
      function x(t) {
        var e = this instanceof (n = n || r(56753));
        if (!e && !i.call(x, this)) return new x(t);
        (this._writableState = new M(t, this, e)),
          (this.writable = !0),
          t &&
            ("function" == typeof t.write && (this._write = t.write),
            "function" == typeof t.writev && (this._writev = t.writev),
            "function" == typeof t.destroy && (this._destroy = t.destroy),
            "function" == typeof t.final && (this._final = t.final)),
          u.call(this);
      }
      function k(t, e, r, n, i, o, s) {
        (e.writelen = n),
          (e.writecb = s),
          (e.writing = !0),
          (e.sync = !0),
          e.destroyed
            ? e.onwrite(new b("write"))
            : r
            ? t._writev(i, e.onwrite)
            : t._write(i, o, e.onwrite),
          (e.sync = !1);
      }
      function C(t, e, r, n) {
        r ||
          (0 === e.length &&
            e.needDrain &&
            ((e.needDrain = !1), t.emit("drain"))),
          e.pendingcb--,
          n(),
          N(t, e);
      }
      function I(t, e) {
        e.bufferProcessing = !0;
        var r = e.bufferedRequest;
        if (t._writev && r && r.next) {
          var n = Array(e.bufferedRequestCount),
            i = e.corkedRequestsFree;
          i.entry = r;
          for (var o = 0, a = !0; r; )
            (n[o] = r), r.isBuf || (a = !1), (r = r.next), (o += 1);
          (n.allBuffers = a),
            k(t, e, !0, e.length, n, "", i.finish),
            e.pendingcb++,
            (e.lastBufferedRequest = null),
            i.next
              ? ((e.corkedRequestsFree = i.next), (i.next = null))
              : (e.corkedRequestsFree = new s(e)),
            (e.bufferedRequestCount = 0);
        } else {
          for (; r; ) {
            var u = r.chunk,
              c = r.encoding,
              l = r.callback,
              h = e.objectMode ? 1 : u.length;
            if (
              (k(t, e, !1, h, u, c, l),
              (r = r.next),
              e.bufferedRequestCount--,
              e.writing)
            )
              break;
          }
          null === r && (e.lastBufferedRequest = null);
        }
        (e.bufferedRequest = r), (e.bufferProcessing = !1);
      }
      function R(t) {
        return (
          t.ending &&
          0 === t.length &&
          null === t.bufferedRequest &&
          !t.finished &&
          !t.writing
        );
      }
      function A(t, e) {
        t._final(function (r) {
          e.pendingcb--,
            r && E(t, r),
            (e.prefinished = !0),
            t.emit("prefinish"),
            N(t, e);
        });
      }
      function N(t, e) {
        var r = R(e);
        if (
          r &&
          (e.prefinished ||
            e.finalCalled ||
            ("function" != typeof t._final || e.destroyed
              ? ((e.prefinished = !0), t.emit("prefinish"))
              : (e.pendingcb++, (e.finalCalled = !0), o.nextTick(A, t, e))),
          0 === e.pendingcb &&
            ((e.finished = !0), t.emit("finish"), e.autoDestroy))
        ) {
          var n = t._readableState;
          (!n || (n.autoDestroy && n.endEmitted)) && t.destroy();
        }
        return r;
      }
      r(35717)(x, u),
        (M.prototype.getBuffer = function () {
          for (var t = this.bufferedRequest, e = []; t; )
            e.push(t), (t = t.next);
          return e;
        }),
        (function () {
          try {
            Object.defineProperty(M.prototype, "buffer", {
              get: a.deprecate(
                function () {
                  return this.getBuffer();
                },
                "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
                "DEP0003"
              ),
            });
          } catch (t) {}
        })(),
        "function" == typeof Symbol &&
        Symbol.hasInstance &&
        "function" == typeof Function.prototype[Symbol.hasInstance]
          ? ((i = Function.prototype[Symbol.hasInstance]),
            Object.defineProperty(x, Symbol.hasInstance, {
              value: function (t) {
                return (
                  !!i.call(this, t) ||
                  (this === x && t && t._writableState instanceof M)
                );
              },
            }))
          : (i = function (t) {
              return t instanceof this;
            }),
        (x.prototype.pipe = function () {
          E(this, new m());
        }),
        (x.prototype.write = function (t, e, r) {
          var n,
            i,
            s,
            a,
            u,
            h,
            d,
            f = this._writableState,
            y = !1,
            g = !f.objectMode && ((n = t), c.isBuffer(n) || n instanceof l);
          return (
            g && !c.isBuffer(t) && ((i = t), (t = c.from(i))),
            ("function" == typeof e && ((r = e), (e = null)),
            g ? (e = "buffer") : e || (e = f.defaultEncoding),
            "function" != typeof r && (r = S),
            f.ending)
              ? ((s = r), E(this, (a = new _())), o.nextTick(s, a))
              : (g ||
                  ((u = t),
                  (h = r),
                  null === u
                    ? (d = new v())
                    : "string" == typeof u ||
                      f.objectMode ||
                      (d = new p("chunk", ["string", "Buffer"], u)),
                  !d || (E(this, d), o.nextTick(h, d), 0))) &&
                (f.pendingcb++,
                (y = (function (t, e, r, n, i, o) {
                  if (!r) {
                    var s,
                      a,
                      u =
                        ((s = n),
                        (a = i),
                        e.objectMode ||
                          !1 === e.decodeStrings ||
                          "string" != typeof s ||
                          (s = c.from(s, a)),
                        s);
                    n !== u && ((r = !0), (i = "buffer"), (n = u));
                  }
                  var l = e.objectMode ? 1 : n.length;
                  e.length += l;
                  var h = e.length < e.highWaterMark;
                  if ((h || (e.needDrain = !0), e.writing || e.corked)) {
                    var d = e.lastBufferedRequest;
                    (e.lastBufferedRequest = {
                      chunk: n,
                      encoding: i,
                      isBuf: r,
                      callback: o,
                      next: null,
                    }),
                      d
                        ? (d.next = e.lastBufferedRequest)
                        : (e.bufferedRequest = e.lastBufferedRequest),
                      (e.bufferedRequestCount += 1);
                  } else k(t, e, !1, l, n, i, o);
                  return h;
                })(this, f, g, t, e, r))),
            y
          );
        }),
        (x.prototype.cork = function () {
          this._writableState.corked++;
        }),
        (x.prototype.uncork = function () {
          var t = this._writableState;
          !t.corked ||
            (t.corked--,
            t.writing ||
              t.corked ||
              t.bufferProcessing ||
              !t.bufferedRequest ||
              I(this, t));
        }),
        (x.prototype.setDefaultEncoding = function (t) {
          if (
            ("string" == typeof t && (t = t.toLowerCase()),
            !(
              [
                "hex",
                "utf8",
                "utf-8",
                "ascii",
                "binary",
                "base64",
                "ucs2",
                "ucs-2",
                "utf16le",
                "utf-16le",
                "raw",
              ].indexOf((t + "").toLowerCase()) > -1
            ))
          )
            throw new w(t);
          return (this._writableState.defaultEncoding = t), this;
        }),
        Object.defineProperty(x.prototype, "writableBuffer", {
          enumerable: !1,
          get: function () {
            return this._writableState && this._writableState.getBuffer();
          },
        }),
        Object.defineProperty(x.prototype, "writableHighWaterMark", {
          enumerable: !1,
          get: function () {
            return this._writableState.highWaterMark;
          },
        }),
        (x.prototype._write = function (t, e, r) {
          r(new y("_write()"));
        }),
        (x.prototype._writev = null),
        (x.prototype.end = function (t, e, r) {
          var n,
            i = this._writableState;
          return (
            "function" == typeof t
              ? ((r = t), (t = null), (e = null))
              : "function" == typeof e && ((r = e), (e = null)),
            null != t && this.write(t, e),
            i.corked && ((i.corked = 1), this.uncork()),
            i.ending ||
              ((n = r),
              (i.ending = !0),
              N(this, i),
              n && (i.finished ? o.nextTick(n) : this.once("finish", n)),
              (i.ended = !0),
              (this.writable = !1)),
            this
          );
        }),
        Object.defineProperty(x.prototype, "writableLength", {
          enumerable: !1,
          get: function () {
            return this._writableState.length;
          },
        }),
        Object.defineProperty(x.prototype, "destroyed", {
          enumerable: !1,
          get: function () {
            return (
              void 0 !== this._writableState && this._writableState.destroyed
            );
          },
          set: function (t) {
            this._writableState && (this._writableState.destroyed = t);
          },
        }),
        (x.prototype.destroy = h.destroy),
        (x.prototype._undestroy = h.undestroy),
        (x.prototype._destroy = function (t, e) {
          e(t);
        });
    },
    45850: function (t, e, r) {
      "use strict";
      var n,
        i = r(83454);
      function o(t, e, r) {
        var n;
        return (
          (e =
            "symbol" ==
            typeof (n = (function (t, e) {
              if ("object" != typeof t || null === t) return t;
              var r = t[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(t, e || "default");
                if ("object" != typeof n) return n;
                throw TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string"))
              ? n
              : String(n)) in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r),
          t
        );
      }
      var s = r(8610),
        a = Symbol("lastResolve"),
        u = Symbol("lastReject"),
        c = Symbol("error"),
        l = Symbol("ended"),
        h = Symbol("lastPromise"),
        d = Symbol("handlePromise"),
        f = Symbol("stream");
      function p(t, e) {
        return { value: t, done: e };
      }
      function y(t) {
        var e = t[a];
        if (null !== e) {
          var r = t[f].read();
          null !== r &&
            ((t[h] = null), (t[a] = null), (t[u] = null), e(p(r, !1)));
        }
      }
      function g(t) {
        i.nextTick(y, t);
      }
      var m = Object.getPrototypeOf(function () {}),
        b = Object.setPrototypeOf(
          (o(
            (n = {
              get stream() {
                return this[f];
              },
              next: function () {
                var t,
                  e,
                  r = this,
                  n = this[c];
                if (null !== n) return Promise.reject(n);
                if (this[l]) return Promise.resolve(p(void 0, !0));
                if (this[f].destroyed)
                  return new Promise(function (t, e) {
                    i.nextTick(function () {
                      r[c] ? e(r[c]) : t(p(void 0, !0));
                    });
                  });
                var o = this[h];
                if (o)
                  e = new Promise(
                    ((t = this),
                    function (e, r) {
                      o.then(function () {
                        if (t[l]) {
                          e(p(void 0, !0));
                          return;
                        }
                        t[d](e, r);
                      }, r);
                    })
                  );
                else {
                  var s = this[f].read();
                  if (null !== s) return Promise.resolve(p(s, !1));
                  e = new Promise(this[d]);
                }
                return (this[h] = e), e;
              },
            }),
            Symbol.asyncIterator,
            function () {
              return this;
            }
          ),
          o(n, "return", function () {
            var t = this;
            return new Promise(function (e, r) {
              t[f].destroy(null, function (t) {
                if (t) {
                  r(t);
                  return;
                }
                e(p(void 0, !0));
              });
            });
          }),
          n),
          m
        );
      t.exports = function (t) {
        var e,
          r = Object.create(
            b,
            (o((e = {}), f, { value: t, writable: !0 }),
            o(e, a, { value: null, writable: !0 }),
            o(e, u, { value: null, writable: !0 }),
            o(e, c, { value: null, writable: !0 }),
            o(e, l, { value: t._readableState.endEmitted, writable: !0 }),
            o(e, d, {
              value: function (t, e) {
                var n = r[f].read();
                n
                  ? ((r[h] = null), (r[a] = null), (r[u] = null), t(p(n, !1)))
                  : ((r[a] = t), (r[u] = e));
              },
              writable: !0,
            }),
            e)
          );
        return (
          (r[h] = null),
          s(t, function (t) {
            if (t && "ERR_STREAM_PREMATURE_CLOSE" !== t.code) {
              var e = r[u];
              null !== e && ((r[h] = null), (r[a] = null), (r[u] = null), e(t)),
                (r[c] = t);
              return;
            }
            var n = r[a];
            null !== n &&
              ((r[h] = null), (r[a] = null), (r[u] = null), n(p(void 0, !0))),
              (r[l] = !0);
          }),
          t.on("readable", g.bind(null, r)),
          r
        );
      };
    },
    57327: function (t, e, r) {
      "use strict";
      function n(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e &&
            (n = n.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function i(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? n(Object(r), !0).forEach(function (e) {
                var n, i;
                (n = e),
                  (i = r[e]),
                  (n = s(n)) in t
                    ? Object.defineProperty(t, n, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (t[n] = i);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
            : n(Object(r)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(r, e)
                );
              });
        }
        return t;
      }
      function o(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, s(n.key), n);
        }
      }
      function s(t) {
        var e = (function (t, e) {
          if ("object" != typeof t || null === t) return t;
          var r = t[Symbol.toPrimitive];
          if (void 0 !== r) {
            var n = r.call(t, e || "default");
            if ("object" != typeof n) return n;
            throw TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" == typeof e ? e : String(e);
      }
      var a = r(48764).Buffer,
        u = r(52361).inspect,
        c = (u && u.custom) || "inspect";
      t.exports = (function () {
        var t, e;
        function r() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw TypeError("Cannot call a class as a function");
          })(this, r),
            (this.head = null),
            (this.tail = null),
            (this.length = 0);
        }
        return (
          (t = [
            {
              key: "push",
              value: function (t) {
                var e = { data: t, next: null };
                this.length > 0 ? (this.tail.next = e) : (this.head = e),
                  (this.tail = e),
                  ++this.length;
              },
            },
            {
              key: "unshift",
              value: function (t) {
                var e = { data: t, next: this.head };
                0 === this.length && (this.tail = e),
                  (this.head = e),
                  ++this.length;
              },
            },
            {
              key: "shift",
              value: function () {
                if (0 !== this.length) {
                  var t = this.head.data;
                  return (
                    1 === this.length
                      ? (this.head = this.tail = null)
                      : (this.head = this.head.next),
                    --this.length,
                    t
                  );
                }
              },
            },
            {
              key: "clear",
              value: function () {
                (this.head = this.tail = null), (this.length = 0);
              },
            },
            {
              key: "join",
              value: function (t) {
                if (0 === this.length) return "";
                for (var e = this.head, r = "" + e.data; (e = e.next); )
                  r += t + e.data;
                return r;
              },
            },
            {
              key: "concat",
              value: function (t) {
                if (0 === this.length) return a.alloc(0);
                for (
                  var e, r, n = a.allocUnsafe(t >>> 0), i = this.head, o = 0;
                  i;

                )
                  (e = i.data),
                    (r = o),
                    a.prototype.copy.call(e, n, r),
                    (o += i.data.length),
                    (i = i.next);
                return n;
              },
            },
            {
              key: "consume",
              value: function (t, e) {
                var r;
                return (
                  t < this.head.data.length
                    ? ((r = this.head.data.slice(0, t)),
                      (this.head.data = this.head.data.slice(t)))
                    : (r =
                        t === this.head.data.length
                          ? this.shift()
                          : e
                          ? this._getString(t)
                          : this._getBuffer(t)),
                  r
                );
              },
            },
            {
              key: "first",
              value: function () {
                return this.head.data;
              },
            },
            {
              key: "_getString",
              value: function (t) {
                var e = this.head,
                  r = 1,
                  n = e.data;
                for (t -= n.length; (e = e.next); ) {
                  var i = e.data,
                    o = t > i.length ? i.length : t;
                  if (
                    (o === i.length ? (n += i) : (n += i.slice(0, t)),
                    0 == (t -= o))
                  ) {
                    o === i.length
                      ? (++r,
                        e.next
                          ? (this.head = e.next)
                          : (this.head = this.tail = null))
                      : ((this.head = e), (e.data = i.slice(o)));
                    break;
                  }
                  ++r;
                }
                return (this.length -= r), n;
              },
            },
            {
              key: "_getBuffer",
              value: function (t) {
                var e = a.allocUnsafe(t),
                  r = this.head,
                  n = 1;
                for (r.data.copy(e), t -= r.data.length; (r = r.next); ) {
                  var i = r.data,
                    o = t > i.length ? i.length : t;
                  if ((i.copy(e, e.length - t, 0, o), 0 == (t -= o))) {
                    o === i.length
                      ? (++n,
                        r.next
                          ? (this.head = r.next)
                          : (this.head = this.tail = null))
                      : ((this.head = r), (r.data = i.slice(o)));
                    break;
                  }
                  ++n;
                }
                return (this.length -= n), e;
              },
            },
            {
              key: c,
              value: function (t, e) {
                return u(
                  this,
                  i(i({}, e), {}, { depth: 0, customInspect: !1 })
                );
              },
            },
          ]),
          o(r.prototype, t),
          e && o(r, e),
          Object.defineProperty(r, "prototype", { writable: !1 }),
          r
        );
      })();
    },
    61195: function (t, e, r) {
      "use strict";
      var n = r(83454);
      function i(t, e) {
        s(t, e), o(t);
      }
      function o(t) {
        (!t._writableState || t._writableState.emitClose) &&
          (!t._readableState || t._readableState.emitClose) &&
          t.emit("close");
      }
      function s(t, e) {
        t.emit("error", e);
      }
      t.exports = {
        destroy: function (t, e) {
          var r = this,
            a = this._readableState && this._readableState.destroyed,
            u = this._writableState && this._writableState.destroyed;
          return a || u
            ? (e
                ? e(t)
                : t &&
                  (this._writableState
                    ? this._writableState.errorEmitted ||
                      ((this._writableState.errorEmitted = !0),
                      n.nextTick(s, this, t))
                    : n.nextTick(s, this, t)),
              this)
            : (this._readableState && (this._readableState.destroyed = !0),
              this._writableState && (this._writableState.destroyed = !0),
              this._destroy(t || null, function (t) {
                !e && t
                  ? r._writableState
                    ? r._writableState.errorEmitted
                      ? n.nextTick(o, r)
                      : ((r._writableState.errorEmitted = !0),
                        n.nextTick(i, r, t))
                    : n.nextTick(i, r, t)
                  : e
                  ? (n.nextTick(o, r), e(t))
                  : n.nextTick(o, r);
              }),
              this);
        },
        undestroy: function () {
          this._readableState &&
            ((this._readableState.destroyed = !1),
            (this._readableState.reading = !1),
            (this._readableState.ended = !1),
            (this._readableState.endEmitted = !1)),
            this._writableState &&
              ((this._writableState.destroyed = !1),
              (this._writableState.ended = !1),
              (this._writableState.ending = !1),
              (this._writableState.finalCalled = !1),
              (this._writableState.prefinished = !1),
              (this._writableState.finished = !1),
              (this._writableState.errorEmitted = !1));
        },
        errorOrDestroy: function (t, e) {
          var r = t._readableState,
            n = t._writableState;
          (r && r.autoDestroy) || (n && n.autoDestroy)
            ? t.destroy(e)
            : t.emit("error", e);
        },
      };
    },
    8610: function (t, e, r) {
      "use strict";
      var n = r(94281).q.ERR_STREAM_PREMATURE_CLOSE;
      function i() {}
      t.exports = function t(e, r, o) {
        if ("function" == typeof r) return t(e, null, r);
        r || (r = {}),
          (s = o || i),
          (a = !1),
          (o = function () {
            if (!a) {
              a = !0;
              for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                e[r] = arguments[r];
              s.apply(this, e);
            }
          });
        var s,
          a,
          u = r.readable || (!1 !== r.readable && e.readable),
          c = r.writable || (!1 !== r.writable && e.writable),
          l = function () {
            e.writable || d();
          },
          h = e._writableState && e._writableState.finished,
          d = function () {
            (c = !1), (h = !0), u || o.call(e);
          },
          f = e._readableState && e._readableState.endEmitted,
          p = function () {
            (u = !1), (f = !0), c || o.call(e);
          },
          y = function (t) {
            o.call(e, t);
          },
          g = function () {
            var t;
            return u && !f
              ? ((e._readableState && e._readableState.ended) || (t = new n()),
                o.call(e, t))
              : c && !h
              ? ((e._writableState && e._writableState.ended) || (t = new n()),
                o.call(e, t))
              : void 0;
          },
          m = function () {
            e.req.on("finish", d);
          };
        return (
          e.setHeader && "function" == typeof e.abort
            ? (e.on("complete", d),
              e.on("abort", g),
              e.req ? m() : e.on("request", m))
            : c && !e._writableState && (e.on("end", l), e.on("close", l)),
          e.on("end", p),
          e.on("finish", d),
          !1 !== r.error && e.on("error", y),
          e.on("close", g),
          function () {
            e.removeListener("complete", d),
              e.removeListener("abort", g),
              e.removeListener("request", m),
              e.req && e.req.removeListener("finish", d),
              e.removeListener("end", l),
              e.removeListener("close", l),
              e.removeListener("finish", d),
              e.removeListener("end", p),
              e.removeListener("error", y),
              e.removeListener("close", g);
          }
        );
      };
    },
    15167: function (t) {
      t.exports = function () {
        throw Error("Readable.from is not available in the browser");
      };
    },
    59946: function (t, e, r) {
      "use strict";
      var n,
        i = r(94281).q,
        o = i.ERR_MISSING_ARGS,
        s = i.ERR_STREAM_DESTROYED;
      function a(t) {
        if (t) throw t;
      }
      function u(t) {
        t();
      }
      function c(t, e) {
        return t.pipe(e);
      }
      t.exports = function () {
        for (var t, e, i = arguments.length, l = Array(i), h = 0; h < i; h++)
          l[h] = arguments[h];
        var d =
          (t = l).length && "function" == typeof t[t.length - 1] ? t.pop() : a;
        if ((Array.isArray(l[0]) && (l = l[0]), l.length < 2))
          throw new o("streams");
        var f = l.map(function (t, i) {
          var o,
            a,
            c,
            h,
            p,
            y = i < l.length - 1;
          return (
            (a = o =
              function (t) {
                e || (e = t), t && f.forEach(u), y || (f.forEach(u), d(e));
              }),
            (c = !1),
            (o = function () {
              c || ((c = !0), a.apply(void 0, arguments));
            }),
            (h = !1),
            t.on("close", function () {
              h = !0;
            }),
            void 0 === n && (n = r(8610)),
            n(t, { readable: y, writable: i > 0 }, function (t) {
              if (t) return o(t);
              (h = !0), o();
            }),
            (p = !1),
            function (e) {
              if (!h && !p) {
                if (((p = !0), t.setHeader && "function" == typeof t.abort))
                  return t.abort();
                if ("function" == typeof t.destroy) return t.destroy();
                o(e || new s("pipe"));
              }
            }
          );
        });
        return l.reduce(c);
      };
    },
    82457: function (t, e, r) {
      "use strict";
      var n = r(94281).q.ERR_INVALID_OPT_VALUE;
      t.exports = {
        getHighWaterMark: function (t, e, r, i) {
          var o = null != e.highWaterMark ? e.highWaterMark : i ? e[r] : null;
          if (null != o) {
            if (!(isFinite(o) && Math.floor(o) === o) || o < 0) {
              var s = i ? r : "highWaterMark";
              throw new n(s, o);
            }
            return Math.floor(o);
          }
          return t.objectMode ? 16 : 16384;
        },
      };
    },
    22503: function (t, e, r) {
      t.exports = r(17187).EventEmitter;
    },
    88473: function (t, e, r) {
      ((e = t.exports = r(79481)).Stream = e),
        (e.Readable = e),
        (e.Writable = r(64229)),
        (e.Duplex = r(56753)),
        (e.Transform = r(74605)),
        (e.PassThrough = r(82725)),
        (e.finished = r(8610)),
        (e.pipeline = r(59946));
    },
    89509: function (t, e, r) {
      /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ var n =
          r(48764),
        i = n.Buffer;
      function o(t, e) {
        for (var r in t) e[r] = t[r];
      }
      function s(t, e, r) {
        return i(t, e, r);
      }
      i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
        ? (t.exports = n)
        : (o(n, e), (e.Buffer = s)),
        (s.prototype = Object.create(i.prototype)),
        o(i, s),
        (s.from = function (t, e, r) {
          if ("number" == typeof t)
            throw TypeError("Argument must not be a number");
          return i(t, e, r);
        }),
        (s.alloc = function (t, e, r) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          var n = i(t);
          return (
            void 0 !== e
              ? "string" == typeof r
                ? n.fill(e, r)
                : n.fill(e)
              : n.fill(0),
            n
          );
        }),
        (s.allocUnsafe = function (t) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          return i(t);
        }),
        (s.allocUnsafeSlow = function (t) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          return n.SlowBuffer(t);
        });
    },
    24189: function (t, e, r) {
      var n = r(89509).Buffer;
      function i(t, e) {
        (this._block = n.alloc(t)),
          (this._finalSize = e),
          (this._blockSize = t),
          (this._len = 0);
      }
      (i.prototype.update = function (t, e) {
        "string" == typeof t && ((e = e || "utf8"), (t = n.from(t, e)));
        for (
          var r = this._block,
            i = this._blockSize,
            o = t.length,
            s = this._len,
            a = 0;
          a < o;

        ) {
          for (var u = s % i, c = Math.min(o - a, i - u), l = 0; l < c; l++)
            r[u + l] = t[a + l];
          (s += c), (a += c), s % i == 0 && this._update(r);
        }
        return (this._len += o), this;
      }),
        (i.prototype.digest = function (t) {
          var e = this._len % this._blockSize;
          (this._block[e] = 128),
            this._block.fill(0, e + 1),
            e >= this._finalSize &&
              (this._update(this._block), this._block.fill(0));
          var r = 8 * this._len;
          if (r <= 4294967295)
            this._block.writeUInt32BE(r, this._blockSize - 4);
          else {
            var n = (4294967295 & r) >>> 0,
              i = (r - n) / 4294967296;
            this._block.writeUInt32BE(i, this._blockSize - 8),
              this._block.writeUInt32BE(n, this._blockSize - 4);
          }
          this._update(this._block);
          var o = this._hash();
          return t ? o.toString(t) : o;
        }),
        (i.prototype._update = function () {
          throw Error("_update must be implemented by subclass");
        }),
        (t.exports = i);
    },
    89072: function (t, e, r) {
      var n = (t.exports = function (t) {
        var e = n[(t = t.toLowerCase())];
        if (!e) throw Error(t + " is not supported (we accept pull requests)");
        return new e();
      });
      (n.sha = r(74448)),
        (n.sha1 = r(18336)),
        (n.sha224 = r(48432)),
        (n.sha256 = r(67499)),
        (n.sha384 = r(51686)),
        (n.sha512 = r(87816));
    },
    74448: function (t, e, r) {
      var n = r(35717),
        i = r(24189),
        o = r(89509).Buffer,
        s = [1518500249, 1859775393, -1894007588, -899497514],
        a = Array(80);
      function u() {
        this.init(), (this._w = a), i.call(this, 64, 56);
      }
      n(u, i),
        (u.prototype.init = function () {
          return (
            (this._a = 1732584193),
            (this._b = 4023233417),
            (this._c = 2562383102),
            (this._d = 271733878),
            (this._e = 3285377520),
            this
          );
        }),
        (u.prototype._update = function (t) {
          for (
            var e = this._w,
              r = 0 | this._a,
              n = 0 | this._b,
              i = 0 | this._c,
              o = 0 | this._d,
              a = 0 | this._e,
              u = 0;
            u < 16;
            ++u
          )
            e[u] = t.readInt32BE(4 * u);
          for (; u < 80; ++u)
            e[u] = e[u - 3] ^ e[u - 8] ^ e[u - 14] ^ e[u - 16];
          for (var c = 0; c < 80; ++c) {
            var l,
              h,
              d,
              f,
              p,
              y = ~~(c / 20),
              g =
                ((((l = r) << 5) | (l >>> 27)) +
                  ((h = n),
                  (d = i),
                  (f = o),
                  0 === y
                    ? (h & d) | (~h & f)
                    : 2 === y
                    ? (h & d) | (h & f) | (d & f)
                    : h ^ d ^ f) +
                  a +
                  e[c] +
                  s[y]) |
                0;
            (a = o),
              (o = i),
              (i = ((p = n) << 30) | (p >>> 2)),
              (n = r),
              (r = g);
          }
          (this._a = (r + this._a) | 0),
            (this._b = (n + this._b) | 0),
            (this._c = (i + this._c) | 0),
            (this._d = (o + this._d) | 0),
            (this._e = (a + this._e) | 0);
        }),
        (u.prototype._hash = function () {
          var t = o.allocUnsafe(20);
          return (
            t.writeInt32BE(0 | this._a, 0),
            t.writeInt32BE(0 | this._b, 4),
            t.writeInt32BE(0 | this._c, 8),
            t.writeInt32BE(0 | this._d, 12),
            t.writeInt32BE(0 | this._e, 16),
            t
          );
        }),
        (t.exports = u);
    },
    18336: function (t, e, r) {
      var n = r(35717),
        i = r(24189),
        o = r(89509).Buffer,
        s = [1518500249, 1859775393, -1894007588, -899497514],
        a = Array(80);
      function u() {
        this.init(), (this._w = a), i.call(this, 64, 56);
      }
      n(u, i),
        (u.prototype.init = function () {
          return (
            (this._a = 1732584193),
            (this._b = 4023233417),
            (this._c = 2562383102),
            (this._d = 271733878),
            (this._e = 3285377520),
            this
          );
        }),
        (u.prototype._update = function (t) {
          for (
            var e = this._w,
              r = 0 | this._a,
              n = 0 | this._b,
              i = 0 | this._c,
              o = 0 | this._d,
              a = 0 | this._e,
              u = 0;
            u < 16;
            ++u
          )
            e[u] = t.readInt32BE(4 * u);
          for (; u < 80; ++u)
            e[u] =
              ((l = e[u - 3] ^ e[u - 8] ^ e[u - 14] ^ e[u - 16]) << 1) |
              (l >>> 31);
          for (var c = 0; c < 80; ++c) {
            var l,
              h,
              d,
              f,
              p,
              y,
              g = ~~(c / 20),
              m =
                ((((h = r) << 5) | (h >>> 27)) +
                  ((d = n),
                  (f = i),
                  (p = o),
                  0 === g
                    ? (d & f) | (~d & p)
                    : 2 === g
                    ? (d & f) | (d & p) | (f & p)
                    : d ^ f ^ p) +
                  a +
                  e[c] +
                  s[g]) |
                0;
            (a = o),
              (o = i),
              (i = ((y = n) << 30) | (y >>> 2)),
              (n = r),
              (r = m);
          }
          (this._a = (r + this._a) | 0),
            (this._b = (n + this._b) | 0),
            (this._c = (i + this._c) | 0),
            (this._d = (o + this._d) | 0),
            (this._e = (a + this._e) | 0);
        }),
        (u.prototype._hash = function () {
          var t = o.allocUnsafe(20);
          return (
            t.writeInt32BE(0 | this._a, 0),
            t.writeInt32BE(0 | this._b, 4),
            t.writeInt32BE(0 | this._c, 8),
            t.writeInt32BE(0 | this._d, 12),
            t.writeInt32BE(0 | this._e, 16),
            t
          );
        }),
        (t.exports = u);
    },
    48432: function (t, e, r) {
      var n = r(35717),
        i = r(67499),
        o = r(24189),
        s = r(89509).Buffer,
        a = Array(64);
      function u() {
        this.init(), (this._w = a), o.call(this, 64, 56);
      }
      n(u, i),
        (u.prototype.init = function () {
          return (
            (this._a = 3238371032),
            (this._b = 914150663),
            (this._c = 812702999),
            (this._d = 4144912697),
            (this._e = 4290775857),
            (this._f = 1750603025),
            (this._g = 1694076839),
            (this._h = 3204075428),
            this
          );
        }),
        (u.prototype._hash = function () {
          var t = s.allocUnsafe(28);
          return (
            t.writeInt32BE(this._a, 0),
            t.writeInt32BE(this._b, 4),
            t.writeInt32BE(this._c, 8),
            t.writeInt32BE(this._d, 12),
            t.writeInt32BE(this._e, 16),
            t.writeInt32BE(this._f, 20),
            t.writeInt32BE(this._g, 24),
            t
          );
        }),
        (t.exports = u);
    },
    67499: function (t, e, r) {
      var n = r(35717),
        i = r(24189),
        o = r(89509).Buffer,
        s = [
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
          2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
          1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
          4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
          1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
          1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
          2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
          3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
          659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
          2756734187, 3204031479, 3329325298,
        ],
        a = Array(64);
      function u() {
        this.init(), (this._w = a), i.call(this, 64, 56);
      }
      n(u, i),
        (u.prototype.init = function () {
          return (
            (this._a = 1779033703),
            (this._b = 3144134277),
            (this._c = 1013904242),
            (this._d = 2773480762),
            (this._e = 1359893119),
            (this._f = 2600822924),
            (this._g = 528734635),
            (this._h = 1541459225),
            this
          );
        }),
        (u.prototype._update = function (t) {
          for (
            var e = this._w,
              r = 0 | this._a,
              n = 0 | this._b,
              i = 0 | this._c,
              o = 0 | this._d,
              a = 0 | this._e,
              u = 0 | this._f,
              c = 0 | this._g,
              l = 0 | this._h,
              h = 0;
            h < 16;
            ++h
          )
            e[h] = t.readInt32BE(4 * h);
          for (; h < 64; ++h)
            e[h] =
              (((((f = e[h - 2]) >>> 17) | (f << 15)) ^
                ((f >>> 19) | (f << 13)) ^
                (f >>> 10)) +
                e[h - 7] +
                ((((p = e[h - 15]) >>> 7) | (p << 25)) ^
                  ((p >>> 18) | (p << 14)) ^
                  (p >>> 3)) +
                e[h - 16]) |
              0;
          for (var d = 0; d < 64; ++d) {
            var f,
              p,
              y,
              g,
              m,
              b,
              v,
              _,
              w,
              E =
                (l +
                  ((((y = a) >>> 6) | (y << 26)) ^
                    ((y >>> 11) | (y << 21)) ^
                    ((y >>> 25) | (y << 7))) +
                  ((g = a), (m = u), (b = c) ^ (g & (m ^ b))) +
                  s[d] +
                  e[d]) |
                0,
              S =
                (((((v = r) >>> 2) | (v << 30)) ^
                  ((v >>> 13) | (v << 19)) ^
                  ((v >>> 22) | (v << 10))) +
                  (((_ = r) & (w = n)) | (i & (_ | w)))) |
                0;
            (l = c),
              (c = u),
              (u = a),
              (a = (o + E) | 0),
              (o = i),
              (i = n),
              (n = r),
              (r = (E + S) | 0);
          }
          (this._a = (r + this._a) | 0),
            (this._b = (n + this._b) | 0),
            (this._c = (i + this._c) | 0),
            (this._d = (o + this._d) | 0),
            (this._e = (a + this._e) | 0),
            (this._f = (u + this._f) | 0),
            (this._g = (c + this._g) | 0),
            (this._h = (l + this._h) | 0);
        }),
        (u.prototype._hash = function () {
          var t = o.allocUnsafe(32);
          return (
            t.writeInt32BE(this._a, 0),
            t.writeInt32BE(this._b, 4),
            t.writeInt32BE(this._c, 8),
            t.writeInt32BE(this._d, 12),
            t.writeInt32BE(this._e, 16),
            t.writeInt32BE(this._f, 20),
            t.writeInt32BE(this._g, 24),
            t.writeInt32BE(this._h, 28),
            t
          );
        }),
        (t.exports = u);
    },
    51686: function (t, e, r) {
      var n = r(35717),
        i = r(87816),
        o = r(24189),
        s = r(89509).Buffer,
        a = Array(160);
      function u() {
        this.init(), (this._w = a), o.call(this, 128, 112);
      }
      n(u, i),
        (u.prototype.init = function () {
          return (
            (this._ah = 3418070365),
            (this._bh = 1654270250),
            (this._ch = 2438529370),
            (this._dh = 355462360),
            (this._eh = 1731405415),
            (this._fh = 2394180231),
            (this._gh = 3675008525),
            (this._hh = 1203062813),
            (this._al = 3238371032),
            (this._bl = 914150663),
            (this._cl = 812702999),
            (this._dl = 4144912697),
            (this._el = 4290775857),
            (this._fl = 1750603025),
            (this._gl = 1694076839),
            (this._hl = 3204075428),
            this
          );
        }),
        (u.prototype._hash = function () {
          var t = s.allocUnsafe(48);
          function e(e, r, n) {
            t.writeInt32BE(e, n), t.writeInt32BE(r, n + 4);
          }
          return (
            e(this._ah, this._al, 0),
            e(this._bh, this._bl, 8),
            e(this._ch, this._cl, 16),
            e(this._dh, this._dl, 24),
            e(this._eh, this._el, 32),
            e(this._fh, this._fl, 40),
            t
          );
        }),
        (t.exports = u);
    },
    87816: function (t, e, r) {
      var n = r(35717),
        i = r(24189),
        o = r(89509).Buffer,
        s = [
          1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
          3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
          2453635748, 2937671579, 2870763221, 3664609560, 3624381080,
          2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987,
          3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103,
          633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774,
          944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983,
          1495990901, 1249150122, 1856431235, 1555081692, 3175218132,
          1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016,
          2952996808, 2566594879, 3210313671, 3203337956, 3336571891,
          1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
          168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372,
          1522805485, 1396182291, 2643833823, 1695183700, 2343527390,
          1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627,
          2730485921, 1290863460, 2820302411, 3158454273, 3259730800,
          3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804,
          1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734,
          3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877,
          3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063,
          2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
          2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
          2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
          3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
          3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
          174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
          685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
          1126000580, 2618297676, 1288033470, 3409855158, 1501505948,
          4234509866, 1607167915, 987167468, 1816402316, 1246189591,
        ],
        a = Array(160);
      function u() {
        this.init(), (this._w = a), i.call(this, 128, 112);
      }
      function c(t, e) {
        return (
          ((t >>> 28) | (e << 4)) ^
          ((e >>> 2) | (t << 30)) ^
          ((e >>> 7) | (t << 25))
        );
      }
      function l(t, e) {
        return (
          ((t >>> 14) | (e << 18)) ^
          ((t >>> 18) | (e << 14)) ^
          ((e >>> 9) | (t << 23))
        );
      }
      function h(t, e) {
        return t >>> 0 < e >>> 0 ? 1 : 0;
      }
      n(u, i),
        (u.prototype.init = function () {
          return (
            (this._ah = 1779033703),
            (this._bh = 3144134277),
            (this._ch = 1013904242),
            (this._dh = 2773480762),
            (this._eh = 1359893119),
            (this._fh = 2600822924),
            (this._gh = 528734635),
            (this._hh = 1541459225),
            (this._al = 4089235720),
            (this._bl = 2227873595),
            (this._cl = 4271175723),
            (this._dl = 1595750129),
            (this._el = 2917565137),
            (this._fl = 725511199),
            (this._gl = 4215389547),
            (this._hl = 327033209),
            this
          );
        }),
        (u.prototype._update = function (t) {
          for (
            var e = this._w,
              r = 0 | this._ah,
              n = 0 | this._bh,
              i = 0 | this._ch,
              o = 0 | this._dh,
              a = 0 | this._eh,
              u = 0 | this._fh,
              d = 0 | this._gh,
              f = 0 | this._hh,
              p = 0 | this._al,
              y = 0 | this._bl,
              g = 0 | this._cl,
              m = 0 | this._dl,
              b = 0 | this._el,
              v = 0 | this._fl,
              _ = 0 | this._gl,
              w = 0 | this._hl,
              E = 0;
            E < 32;
            E += 2
          )
            (e[E] = t.readInt32BE(4 * E)),
              (e[E + 1] = t.readInt32BE(4 * E + 4));
          for (; E < 160; E += 2) {
            var S,
              M,
              x,
              k,
              C,
              I,
              R,
              A,
              N = e[E - 30],
              T = e[E - 30 + 1],
              O =
                (((S = N) >>> 1) | ((M = T) << 31)) ^
                ((S >>> 8) | (M << 24)) ^
                (S >>> 7),
              L =
                (((x = T) >>> 1) | ((k = N) << 31)) ^
                ((x >>> 8) | (k << 24)) ^
                ((x >>> 7) | (k << 25));
            (N = e[E - 4]), (T = e[E - 4 + 1]);
            var j =
                (((C = N) >>> 19) | ((I = T) << 13)) ^
                ((I >>> 29) | (C << 3)) ^
                (C >>> 6),
              P =
                (((R = T) >>> 19) | ((A = N) << 13)) ^
                ((A >>> 29) | (R << 3)) ^
                ((R >>> 6) | (A << 26)),
              D = e[E - 14],
              B = e[E - 14 + 1],
              F = e[E - 32],
              $ = e[E - 32 + 1],
              U = (L + B) | 0,
              z = (O + D + h(U, L)) | 0;
            (z =
              ((z = (z + j + h((U = (U + P) | 0), P)) | 0) +
                F +
                h((U = (U + $) | 0), $)) |
              0),
              (e[E] = z),
              (e[E + 1] = U);
          }
          for (var V = 0; V < 160; V += 2) {
            (z = e[V]), (U = e[V + 1]);
            var W,
              H,
              q,
              Z,
              J,
              G,
              Y,
              Q,
              K,
              X,
              tt = ((W = r) & (H = n)) | (i & (W | H)),
              te = ((q = p) & (Z = y)) | (g & (q | Z)),
              tr = c(r, p),
              tn = c(p, r),
              ti = l(a, b),
              to = l(b, a),
              ts = s[V],
              ta = s[V + 1],
              tu = ((J = a), (G = u), (Y = d) ^ (J & (G ^ Y))),
              tc = ((Q = b), (K = v), (X = _) ^ (Q & (K ^ X))),
              tl = (w + to) | 0,
              th = (f + ti + h(tl, w)) | 0;
            th =
              ((th =
                ((th = (th + tu + h((tl = (tl + tc) | 0), tc)) | 0) +
                  ts +
                  h((tl = (tl + ta) | 0), ta)) |
                0) +
                z +
                h((tl = (tl + U) | 0), U)) |
              0;
            var td = (tn + te) | 0,
              tf = (tr + tt + h(td, tn)) | 0;
            (f = d),
              (w = _),
              (d = u),
              (_ = v),
              (u = a),
              (v = b),
              (a = (o + th + h((b = (m + tl) | 0), m)) | 0),
              (o = i),
              (m = g),
              (i = n),
              (g = y),
              (n = r),
              (y = p),
              (r = (th + tf + h((p = (tl + td) | 0), tl)) | 0);
          }
          (this._al = (this._al + p) | 0),
            (this._bl = (this._bl + y) | 0),
            (this._cl = (this._cl + g) | 0),
            (this._dl = (this._dl + m) | 0),
            (this._el = (this._el + b) | 0),
            (this._fl = (this._fl + v) | 0),
            (this._gl = (this._gl + _) | 0),
            (this._hl = (this._hl + w) | 0),
            (this._ah = (this._ah + r + h(this._al, p)) | 0),
            (this._bh = (this._bh + n + h(this._bl, y)) | 0),
            (this._ch = (this._ch + i + h(this._cl, g)) | 0),
            (this._dh = (this._dh + o + h(this._dl, m)) | 0),
            (this._eh = (this._eh + a + h(this._el, b)) | 0),
            (this._fh = (this._fh + u + h(this._fl, v)) | 0),
            (this._gh = (this._gh + d + h(this._gl, _)) | 0),
            (this._hh = (this._hh + f + h(this._hl, w)) | 0);
        }),
        (u.prototype._hash = function () {
          var t = o.allocUnsafe(64);
          function e(e, r, n) {
            t.writeInt32BE(e, n), t.writeInt32BE(r, n + 4);
          }
          return (
            e(this._ah, this._al, 0),
            e(this._bh, this._bl, 8),
            e(this._ch, this._cl, 16),
            e(this._dh, this._dl, 24),
            e(this._eh, this._el, 32),
            e(this._fh, this._fl, 40),
            e(this._gh, this._gl, 48),
            e(this._hh, this._hl, 56),
            t
          );
        }),
        (t.exports = u);
    },
    37478: function (t, e, r) {
      "use strict";
      var n = r(40210),
        i = r(21924),
        o = r(70631),
        s = n("%TypeError%"),
        a = n("%WeakMap%", !0),
        u = n("%Map%", !0),
        c = i("WeakMap.prototype.get", !0),
        l = i("WeakMap.prototype.set", !0),
        h = i("WeakMap.prototype.has", !0),
        d = i("Map.prototype.get", !0),
        f = i("Map.prototype.set", !0),
        p = i("Map.prototype.has", !0),
        y = function (t, e) {
          for (var r, n = t; null !== (r = n.next); n = r)
            if (r.key === e)
              return (n.next = r.next), (r.next = t.next), (t.next = r), r;
        },
        g = function (t, e) {
          var r = y(t, e);
          return r && r.value;
        },
        m = function (t, e, r) {
          var n = y(t, e);
          n ? (n.value = r) : (t.next = { key: e, next: t.next, value: r });
        };
      t.exports = function () {
        var t,
          e,
          r,
          n = {
            assert: function (t) {
              if (!n.has(t))
                throw new s("Side channel does not contain " + o(t));
            },
            get: function (n) {
              if (a && n && ("object" == typeof n || "function" == typeof n)) {
                if (t) return c(t, n);
              } else if (u) {
                if (e) return d(e, n);
              } else if (r) return g(r, n);
            },
            has: function (n) {
              if (a && n && ("object" == typeof n || "function" == typeof n)) {
                if (t) return h(t, n);
              } else if (u) {
                if (e) return p(e, n);
              } else if (r) return !!y(r, n);
              return !1;
            },
            set: function (n, i) {
              a && n && ("object" == typeof n || "function" == typeof n)
                ? (t || (t = new a()), l(t, n, i))
                : u
                ? (e || (e = new u()), f(e, n, i))
                : (r || (r = { key: {}, next: null }), m(r, n, i));
            },
          };
        return n;
      };
    },
    32553: function (t, e, r) {
      "use strict";
      var n = r(89509).Buffer,
        i =
          n.isEncoding ||
          function (t) {
            switch ((t = "" + t) && t.toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
              case "raw":
                return !0;
              default:
                return !1;
            }
          };
      function o(t) {
        var e;
        switch (
          ((this.encoding = (function (t) {
            var e = (function (t) {
              var e;
              if (!t) return "utf8";
              for (;;)
                switch (t) {
                  case "utf8":
                  case "utf-8":
                    return "utf8";
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return "utf16le";
                  case "latin1":
                  case "binary":
                    return "latin1";
                  case "base64":
                  case "ascii":
                  case "hex":
                    return t;
                  default:
                    if (e) return;
                    (t = ("" + t).toLowerCase()), (e = !0);
                }
            })(t);
            if ("string" != typeof e && (n.isEncoding === i || !i(t)))
              throw Error("Unknown encoding: " + t);
            return e || t;
          })(t)),
          this.encoding)
        ) {
          case "utf16le":
            (this.text = u), (this.end = c), (e = 4);
            break;
          case "utf8":
            (this.fillLast = a), (e = 4);
            break;
          case "base64":
            (this.text = l), (this.end = h), (e = 3);
            break;
          default:
            (this.write = d), (this.end = f);
            return;
        }
        (this.lastNeed = 0),
          (this.lastTotal = 0),
          (this.lastChar = n.allocUnsafe(e));
      }
      function s(t) {
        return t <= 127
          ? 0
          : t >> 5 == 6
          ? 2
          : t >> 4 == 14
          ? 3
          : t >> 3 == 30
          ? 4
          : t >> 6 == 2
          ? -1
          : -2;
      }
      function a(t) {
        var e = this.lastTotal - this.lastNeed,
          r = (function (t, e, r) {
            if ((192 & e[0]) != 128) return (t.lastNeed = 0), "�";
            if (t.lastNeed > 1 && e.length > 1) {
              if ((192 & e[1]) != 128) return (t.lastNeed = 1), "�";
              if (t.lastNeed > 2 && e.length > 2 && (192 & e[2]) != 128)
                return (t.lastNeed = 2), "�";
            }
          })(this, t, 0);
        return void 0 !== r
          ? r
          : this.lastNeed <= t.length
          ? (t.copy(this.lastChar, e, 0, this.lastNeed),
            this.lastChar.toString(this.encoding, 0, this.lastTotal))
          : void (t.copy(this.lastChar, e, 0, t.length),
            (this.lastNeed -= t.length));
      }
      function u(t, e) {
        if ((t.length - e) % 2 == 0) {
          var r = t.toString("utf16le", e);
          if (r) {
            var n = r.charCodeAt(r.length - 1);
            if (n >= 55296 && n <= 56319)
              return (
                (this.lastNeed = 2),
                (this.lastTotal = 4),
                (this.lastChar[0] = t[t.length - 2]),
                (this.lastChar[1] = t[t.length - 1]),
                r.slice(0, -1)
              );
          }
          return r;
        }
        return (
          (this.lastNeed = 1),
          (this.lastTotal = 2),
          (this.lastChar[0] = t[t.length - 1]),
          t.toString("utf16le", e, t.length - 1)
        );
      }
      function c(t) {
        var e = t && t.length ? this.write(t) : "";
        if (this.lastNeed) {
          var r = this.lastTotal - this.lastNeed;
          return e + this.lastChar.toString("utf16le", 0, r);
        }
        return e;
      }
      function l(t, e) {
        var r = (t.length - e) % 3;
        return 0 === r
          ? t.toString("base64", e)
          : ((this.lastNeed = 3 - r),
            (this.lastTotal = 3),
            1 === r
              ? (this.lastChar[0] = t[t.length - 1])
              : ((this.lastChar[0] = t[t.length - 2]),
                (this.lastChar[1] = t[t.length - 1])),
            t.toString("base64", e, t.length - r));
      }
      function h(t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed
          ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
          : e;
      }
      function d(t) {
        return t.toString(this.encoding);
      }
      function f(t) {
        return t && t.length ? this.write(t) : "";
      }
      (e.s = o),
        (o.prototype.write = function (t) {
          var e, r;
          if (0 === t.length) return "";
          if (this.lastNeed) {
            if (void 0 === (e = this.fillLast(t))) return "";
            (r = this.lastNeed), (this.lastNeed = 0);
          } else r = 0;
          return r < t.length
            ? e
              ? e + this.text(t, r)
              : this.text(t, r)
            : e || "";
        }),
        (o.prototype.end = function (t) {
          var e = t && t.length ? this.write(t) : "";
          return this.lastNeed ? e + "�" : e;
        }),
        (o.prototype.text = function (t, e) {
          var r = (function (t, e, r) {
            var n = e.length - 1;
            if (n < r) return 0;
            var i = s(e[n]);
            return i >= 0
              ? (i > 0 && (t.lastNeed = i - 1), i)
              : --n < r || -2 === i
              ? 0
              : (i = s(e[n])) >= 0
              ? (i > 0 && (t.lastNeed = i - 2), i)
              : --n < r || -2 === i
              ? 0
              : (i = s(e[n])) >= 0
              ? (i > 0 && (2 === i ? (i = 0) : (t.lastNeed = i - 3)), i)
              : 0;
          })(this, t, e);
          if (!this.lastNeed) return t.toString("utf8", e);
          this.lastTotal = r;
          var n = t.length - (r - this.lastNeed);
          return t.copy(this.lastChar, 0, n), t.toString("utf8", e, n);
        }),
        (o.prototype.fillLast = function (t) {
          if (this.lastNeed <= t.length)
            return (
              t.copy(
                this.lastChar,
                this.lastTotal - this.lastNeed,
                0,
                this.lastNeed
              ),
              this.lastChar.toString(this.encoding, 0, this.lastTotal)
            );
          t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length),
            (this.lastNeed -= t.length);
        });
    },
    94927: function (t, e, r) {
      t.exports = function (t, e) {
        if (n("noDeprecation")) return t;
        var r = !1;
        return function () {
          if (!r) {
            if (n("throwDeprecation")) throw Error(e);
            n("traceDeprecation") ? console.trace(e) : console.warn(e),
              (r = !0);
          }
          return t.apply(this, arguments);
        };
      };
      function n(t) {
        try {
          if (!r.g.localStorage) return !1;
        } catch (t) {
          return !1;
        }
        var e = r.g.localStorage[t];
        return null != e && "true" === String(e).toLowerCase();
      }
    },
    47529: function (t) {
      t.exports = function () {
        for (var t = {}, r = 0; r < arguments.length; r++) {
          var n = arguments[r];
          for (var i in n) e.call(n, i) && (t[i] = n[i]);
        }
        return t;
      };
      var e = Object.prototype.hasOwnProperty;
    },
    49602: function (t) {
      "use strict";
      t.exports = function (t) {
        t.prototype[Symbol.iterator] = function* () {
          for (let t = this.head; t; t = t.next) yield t.value;
        };
      };
    },
    34411: function (t, e, r) {
      "use strict";
      function n(t) {
        var e = this;
        if (
          (e instanceof n || (e = new n()),
          (e.tail = null),
          (e.head = null),
          (e.length = 0),
          t && "function" == typeof t.forEach)
        )
          t.forEach(function (t) {
            e.push(t);
          });
        else if (arguments.length > 0)
          for (var r = 0, i = arguments.length; r < i; r++)
            e.push(arguments[r]);
        return e;
      }
      function i(t, e, r, n) {
        if (!(this instanceof i)) return new i(t, e, r, n);
        (this.list = n),
          (this.value = t),
          e ? ((e.next = this), (this.prev = e)) : (this.prev = null),
          r ? ((r.prev = this), (this.next = r)) : (this.next = null);
      }
      (t.exports = n),
        (n.Node = i),
        (n.create = n),
        (n.prototype.removeNode = function (t) {
          if (t.list !== this)
            throw Error("removing node which does not belong to this list");
          var e = t.next,
            r = t.prev;
          return (
            e && (e.prev = r),
            r && (r.next = e),
            t === this.head && (this.head = e),
            t === this.tail && (this.tail = r),
            t.list.length--,
            (t.next = null),
            (t.prev = null),
            (t.list = null),
            e
          );
        }),
        (n.prototype.unshiftNode = function (t) {
          if (t !== this.head) {
            t.list && t.list.removeNode(t);
            var e = this.head;
            (t.list = this),
              (t.next = e),
              e && (e.prev = t),
              (this.head = t),
              this.tail || (this.tail = t),
              this.length++;
          }
        }),
        (n.prototype.pushNode = function (t) {
          if (t !== this.tail) {
            t.list && t.list.removeNode(t);
            var e = this.tail;
            (t.list = this),
              (t.prev = e),
              e && (e.next = t),
              (this.tail = t),
              this.head || (this.head = t),
              this.length++;
          }
        }),
        (n.prototype.push = function () {
          for (var t, e = 0, r = arguments.length; e < r; e++)
            (t = arguments[e]),
              (this.tail = new i(t, this.tail, null, this)),
              this.head || (this.head = this.tail),
              this.length++;
          return this.length;
        }),
        (n.prototype.unshift = function () {
          for (var t, e = 0, r = arguments.length; e < r; e++)
            (t = arguments[e]),
              (this.head = new i(t, null, this.head, this)),
              this.tail || (this.tail = this.head),
              this.length++;
          return this.length;
        }),
        (n.prototype.pop = function () {
          if (this.tail) {
            var t = this.tail.value;
            return (
              (this.tail = this.tail.prev),
              this.tail ? (this.tail.next = null) : (this.head = null),
              this.length--,
              t
            );
          }
        }),
        (n.prototype.shift = function () {
          if (this.head) {
            var t = this.head.value;
            return (
              (this.head = this.head.next),
              this.head ? (this.head.prev = null) : (this.tail = null),
              this.length--,
              t
            );
          }
        }),
        (n.prototype.forEach = function (t, e) {
          e = e || this;
          for (var r = this.head, n = 0; null !== r; n++)
            t.call(e, r.value, n, this), (r = r.next);
        }),
        (n.prototype.forEachReverse = function (t, e) {
          e = e || this;
          for (var r = this.tail, n = this.length - 1; null !== r; n--)
            t.call(e, r.value, n, this), (r = r.prev);
        }),
        (n.prototype.get = function (t) {
          for (var e = 0, r = this.head; null !== r && e < t; e++) r = r.next;
          if (e === t && null !== r) return r.value;
        }),
        (n.prototype.getReverse = function (t) {
          for (var e = 0, r = this.tail; null !== r && e < t; e++) r = r.prev;
          if (e === t && null !== r) return r.value;
        }),
        (n.prototype.map = function (t, e) {
          e = e || this;
          for (var r = new n(), i = this.head; null !== i; )
            r.push(t.call(e, i.value, this)), (i = i.next);
          return r;
        }),
        (n.prototype.mapReverse = function (t, e) {
          e = e || this;
          for (var r = new n(), i = this.tail; null !== i; )
            r.push(t.call(e, i.value, this)), (i = i.prev);
          return r;
        }),
        (n.prototype.reduce = function (t, e) {
          var r,
            n = this.head;
          if (arguments.length > 1) r = e;
          else if (this.head) (n = this.head.next), (r = this.head.value);
          else throw TypeError("Reduce of empty list with no initial value");
          for (var i = 0; null !== n; i++) (r = t(r, n.value, i)), (n = n.next);
          return r;
        }),
        (n.prototype.reduceReverse = function (t, e) {
          var r,
            n = this.tail;
          if (arguments.length > 1) r = e;
          else if (this.tail) (n = this.tail.prev), (r = this.tail.value);
          else throw TypeError("Reduce of empty list with no initial value");
          for (var i = this.length - 1; null !== n; i--)
            (r = t(r, n.value, i)), (n = n.prev);
          return r;
        }),
        (n.prototype.toArray = function () {
          for (
            var t = Array(this.length), e = 0, r = this.head;
            null !== r;
            e++
          )
            (t[e] = r.value), (r = r.next);
          return t;
        }),
        (n.prototype.toArrayReverse = function () {
          for (
            var t = Array(this.length), e = 0, r = this.tail;
            null !== r;
            e++
          )
            (t[e] = r.value), (r = r.prev);
          return t;
        }),
        (n.prototype.slice = function (t, e) {
          (e = e || this.length) < 0 && (e += this.length),
            (t = t || 0) < 0 && (t += this.length);
          var r = new n();
          if (e < t || e < 0) return r;
          t < 0 && (t = 0), e > this.length && (e = this.length);
          for (var i = 0, o = this.head; null !== o && i < t; i++) o = o.next;
          for (; null !== o && i < e; i++, o = o.next) r.push(o.value);
          return r;
        }),
        (n.prototype.sliceReverse = function (t, e) {
          (e = e || this.length) < 0 && (e += this.length),
            (t = t || 0) < 0 && (t += this.length);
          var r = new n();
          if (e < t || e < 0) return r;
          t < 0 && (t = 0), e > this.length && (e = this.length);
          for (var i = this.length, o = this.tail; null !== o && i > e; i--)
            o = o.prev;
          for (; null !== o && i > t; i--, o = o.prev) r.push(o.value);
          return r;
        }),
        (n.prototype.splice = function (t, e, ...r) {
          t > this.length && (t = this.length - 1),
            t < 0 && (t = this.length + t);
          for (var n = 0, o = this.head; null !== o && n < t; n++) o = o.next;
          for (var s = [], n = 0; o && n < e; n++)
            s.push(o.value), (o = this.removeNode(o));
          null === o && (o = this.tail),
            o !== this.head && o !== this.tail && (o = o.prev);
          for (var n = 0; n < r.length; n++)
            o = (function (t, e, r) {
              var n =
                e === t.head ? new i(r, null, e, t) : new i(r, e, e.next, t);
              return (
                null === n.next && (t.tail = n),
                null === n.prev && (t.head = n),
                t.length++,
                n
              );
            })(this, o, r[n]);
          return s;
        }),
        (n.prototype.reverse = function () {
          for (
            var t = this.head, e = this.tail, r = t;
            null !== r;
            r = r.prev
          ) {
            var n = r.prev;
            (r.prev = r.next), (r.next = n);
          }
          return (this.head = e), (this.tail = t), this;
        });
      try {
        r(49602)(n);
      } catch (t) {}
    },
    11821: function (t, e, r) {
      "use strict";
      r.r(e),
        r.d(e, {
          Struct: function () {
            return c;
          },
          StructError: function () {
            return n;
          },
          any: function () {
            return M;
          },
          array: function () {
            return x;
          },
          assert: function () {
            return l;
          },
          assign: function () {
            return y;
          },
          bigint: function () {
            return k;
          },
          boolean: function () {
            return C;
          },
          coerce: function () {
            return G;
          },
          create: function () {
            return h;
          },
          date: function () {
            return I;
          },
          defaulted: function () {
            return Y;
          },
          define: function () {
            return g;
          },
          deprecated: function () {
            return m;
          },
          dynamic: function () {
            return b;
          },
          empty: function () {
            return K;
          },
          enums: function () {
            return R;
          },
          func: function () {
            return A;
          },
          instance: function () {
            return N;
          },
          integer: function () {
            return T;
          },
          intersection: function () {
            return O;
          },
          is: function () {
            return f;
          },
          lazy: function () {
            return v;
          },
          literal: function () {
            return L;
          },
          map: function () {
            return j;
          },
          mask: function () {
            return d;
          },
          max: function () {
            return tt;
          },
          min: function () {
            return te;
          },
          never: function () {
            return P;
          },
          nonempty: function () {
            return tr;
          },
          nullable: function () {
            return D;
          },
          number: function () {
            return B;
          },
          object: function () {
            return F;
          },
          omit: function () {
            return _;
          },
          optional: function () {
            return $;
          },
          partial: function () {
            return w;
          },
          pattern: function () {
            return tn;
          },
          pick: function () {
            return E;
          },
          record: function () {
            return U;
          },
          refine: function () {
            return to;
          },
          regexp: function () {
            return z;
          },
          set: function () {
            return V;
          },
          size: function () {
            return ti;
          },
          string: function () {
            return W;
          },
          struct: function () {
            return S;
          },
          trimmed: function () {
            return Q;
          },
          tuple: function () {
            return H;
          },
          type: function () {
            return q;
          },
          union: function () {
            return Z;
          },
          unknown: function () {
            return J;
          },
          validate: function () {
            return p;
          },
        });
      class n extends TypeError {
        constructor(t, e) {
          let r;
          let { message: n, explanation: i, ...o } = t,
            { path: s } = t,
            a = 0 === s.length ? n : `At path: ${s.join(".")} -- ${n}`;
          super(i ?? a),
            null != i && (this.cause = a),
            Object.assign(this, o),
            (this.name = this.constructor.name),
            (this.failures = () => r ?? (r = [t, ...e()]));
        }
      }
      function i(t) {
        return "object" == typeof t && null != t;
      }
      function o(t) {
        if ("[object Object]" !== Object.prototype.toString.call(t)) return !1;
        let e = Object.getPrototypeOf(t);
        return null === e || e === Object.prototype;
      }
      function s(t) {
        return "symbol" == typeof t
          ? t.toString()
          : "string" == typeof t
          ? JSON.stringify(t)
          : `${t}`;
      }
      function* a(t, e, r, n) {
        var o;
        for (let a of ((i((o = t)) &&
          "function" == typeof o[Symbol.iterator]) ||
          (t = [t]),
        t)) {
          let t = (function (t, e, r, n) {
            if (!0 === t) return;
            !1 === t ? (t = {}) : "string" == typeof t && (t = { message: t });
            let { path: i, branch: o } = e,
              { type: a } = r,
              {
                refinement: u,
                message: c = `Expected a value of type \`${a}\`${
                  u ? ` with refinement \`${u}\`` : ""
                }, but received: \`${s(n)}\``,
              } = t;
            return {
              value: n,
              type: a,
              refinement: u,
              key: i[i.length - 1],
              path: i,
              branch: o,
              ...t,
              message: c,
            };
          })(a, e, r, n);
          t && (yield t);
        }
      }
      function* u(t, e, r = {}) {
        let { path: n = [], branch: o = [t], coerce: s = !1, mask: a = !1 } = r,
          c = { path: n, branch: o };
        if (
          s &&
          ((t = e.coercer(t, c)),
          a && "type" !== e.type && i(e.schema) && i(t) && !Array.isArray(t))
        )
          for (let r in t) void 0 === e.schema[r] && delete t[r];
        let l = "valid";
        for (let n of e.validator(t, c))
          (n.explanation = r.message), (l = "not_valid"), yield [n, void 0];
        for (let [h, d, f] of e.entries(t, c)) {
          let e = u(d, f, {
            path: void 0 === h ? n : [...n, h],
            branch: void 0 === h ? o : [...o, d],
            coerce: s,
            mask: a,
            message: r.message,
          });
          for (let r of e)
            r[0]
              ? ((l = null != r[0].refinement ? "not_refined" : "not_valid"),
                yield [r[0], void 0])
              : s &&
                ((d = r[1]),
                void 0 === h
                  ? (t = d)
                  : t instanceof Map
                  ? t.set(h, d)
                  : t instanceof Set
                  ? t.add(d)
                  : i(t) && (void 0 !== d || h in t) && (t[h] = d));
        }
        if ("not_valid" !== l)
          for (let n of e.refiner(t, c))
            (n.explanation = r.message), (l = "not_refined"), yield [n, void 0];
        "valid" === l && (yield [void 0, t]);
      }
      class c {
        constructor(t) {
          let {
            type: e,
            schema: r,
            validator: n,
            refiner: i,
            coercer: o = (t) => t,
            entries: s = function* () {},
          } = t;
          (this.type = e),
            (this.schema = r),
            (this.entries = s),
            (this.coercer = o),
            n
              ? (this.validator = (t, e) => {
                  let r = n(t, e);
                  return a(r, e, this, t);
                })
              : (this.validator = () => []),
            i
              ? (this.refiner = (t, e) => {
                  let r = i(t, e);
                  return a(r, e, this, t);
                })
              : (this.refiner = () => []);
        }
        assert(t, e) {
          return l(t, this, e);
        }
        create(t, e) {
          return h(t, this, e);
        }
        is(t) {
          return f(t, this);
        }
        mask(t, e) {
          return d(t, this, e);
        }
        validate(t, e = {}) {
          return p(t, this, e);
        }
      }
      function l(t, e, r) {
        let n = p(t, e, { message: r });
        if (n[0]) throw n[0];
      }
      function h(t, e, r) {
        let n = p(t, e, { coerce: !0, message: r });
        if (!n[0]) return n[1];
        throw n[0];
      }
      function d(t, e, r) {
        let n = p(t, e, { coerce: !0, mask: !0, message: r });
        if (!n[0]) return n[1];
        throw n[0];
      }
      function f(t, e) {
        let r = p(t, e);
        return !r[0];
      }
      function p(t, e, r = {}) {
        let i = u(t, e, r),
          o = (function (t) {
            let { done: e, value: r } = t.next();
            return e ? void 0 : r;
          })(i);
        if (o[0]) {
          let t = new n(o[0], function* () {
            for (let t of i) t[0] && (yield t[0]);
          });
          return [t, void 0];
        }
        {
          let t = o[1];
          return [void 0, t];
        }
      }
      function y(...t) {
        let e = "type" === t[0].type,
          r = t.map((t) => t.schema),
          n = Object.assign({}, ...r);
        return e ? q(n) : F(n);
      }
      function g(t, e) {
        return new c({ type: t, schema: null, validator: e });
      }
      function m(t, e) {
        return new c({
          ...t,
          refiner: (e, r) => void 0 === e || t.refiner(e, r),
          validator: (r, n) => void 0 === r || (e(r, n), t.validator(r, n)),
        });
      }
      function b(t) {
        return new c({
          type: "dynamic",
          schema: null,
          *entries(e, r) {
            let n = t(e, r);
            yield* n.entries(e, r);
          },
          validator(e, r) {
            let n = t(e, r);
            return n.validator(e, r);
          },
          coercer(e, r) {
            let n = t(e, r);
            return n.coercer(e, r);
          },
          refiner(e, r) {
            let n = t(e, r);
            return n.refiner(e, r);
          },
        });
      }
      function v(t) {
        let e;
        return new c({
          type: "lazy",
          schema: null,
          *entries(r, n) {
            e ?? (e = t()), yield* e.entries(r, n);
          },
          validator: (r, n) => (e ?? (e = t()), e.validator(r, n)),
          coercer: (r, n) => (e ?? (e = t()), e.coercer(r, n)),
          refiner: (r, n) => (e ?? (e = t()), e.refiner(r, n)),
        });
      }
      function _(t, e) {
        let { schema: r } = t,
          n = { ...r };
        for (let t of e) delete n[t];
        return "type" === t.type ? q(n) : F(n);
      }
      function w(t) {
        let e = t instanceof c ? { ...t.schema } : { ...t };
        for (let t in e) e[t] = $(e[t]);
        return F(e);
      }
      function E(t, e) {
        let { schema: r } = t,
          n = {};
        for (let t of e) n[t] = r[t];
        return F(n);
      }
      function S(t, e) {
        return (
          console.warn(
            "superstruct@0.11 - The `struct` helper has been renamed to `define`."
          ),
          g(t, e)
        );
      }
      function M() {
        return g("any", () => !0);
      }
      function x(t) {
        return new c({
          type: "array",
          schema: t,
          *entries(e) {
            if (t && Array.isArray(e))
              for (let [r, n] of e.entries()) yield [r, n, t];
          },
          coercer: (t) => (Array.isArray(t) ? t.slice() : t),
          validator: (t) =>
            Array.isArray(t) ||
            `Expected an array value, but received: ${s(t)}`,
        });
      }
      function k() {
        return g("bigint", (t) => "bigint" == typeof t);
      }
      function C() {
        return g("boolean", (t) => "boolean" == typeof t);
      }
      function I() {
        return g(
          "date",
          (t) =>
            (t instanceof Date && !isNaN(t.getTime())) ||
            `Expected a valid \`Date\` object, but received: ${s(t)}`
        );
      }
      function R(t) {
        let e = {},
          r = t.map((t) => s(t)).join();
        for (let r of t) e[r] = r;
        return new c({
          type: "enums",
          schema: e,
          validator: (e) =>
            t.includes(e) || `Expected one of \`${r}\`, but received: ${s(e)}`,
        });
      }
      function A() {
        return g(
          "func",
          (t) =>
            "function" == typeof t ||
            `Expected a function, but received: ${s(t)}`
        );
      }
      function N(t) {
        return g(
          "instance",
          (e) =>
            e instanceof t ||
            `Expected a \`${t.name}\` instance, but received: ${s(e)}`
        );
      }
      function T() {
        return g(
          "integer",
          (t) =>
            ("number" == typeof t && !isNaN(t) && Number.isInteger(t)) ||
            `Expected an integer, but received: ${s(t)}`
        );
      }
      function O(t) {
        return new c({
          type: "intersection",
          schema: null,
          *entries(e, r) {
            for (let n of t) yield* n.entries(e, r);
          },
          *validator(e, r) {
            for (let n of t) yield* n.validator(e, r);
          },
          *refiner(e, r) {
            for (let n of t) yield* n.refiner(e, r);
          },
        });
      }
      function L(t) {
        let e = s(t),
          r = typeof t;
        return new c({
          type: "literal",
          schema:
            "string" === r || "number" === r || "boolean" === r ? t : null,
          validator: (r) =>
            r === t || `Expected the literal \`${e}\`, but received: ${s(r)}`,
        });
      }
      function j(t, e) {
        return new c({
          type: "map",
          schema: null,
          *entries(r) {
            if (t && e && r instanceof Map)
              for (let [n, i] of r.entries()) yield [n, n, t], yield [n, i, e];
          },
          coercer: (t) => (t instanceof Map ? new Map(t) : t),
          validator: (t) =>
            t instanceof Map ||
            `Expected a \`Map\` object, but received: ${s(t)}`,
        });
      }
      function P() {
        return g("never", () => !1);
      }
      function D(t) {
        return new c({
          ...t,
          validator: (e, r) => null === e || t.validator(e, r),
          refiner: (e, r) => null === e || t.refiner(e, r),
        });
      }
      function B() {
        return g(
          "number",
          (t) =>
            ("number" == typeof t && !isNaN(t)) ||
            `Expected a number, but received: ${s(t)}`
        );
      }
      function F(t) {
        let e = t ? Object.keys(t) : [],
          r = P();
        return new c({
          type: "object",
          schema: t || null,
          *entries(n) {
            if (t && i(n)) {
              let i = new Set(Object.keys(n));
              for (let r of e) i.delete(r), yield [r, n[r], t[r]];
              for (let t of i) yield [t, n[t], r];
            }
          },
          validator: (t) => i(t) || `Expected an object, but received: ${s(t)}`,
          coercer: (t) => (i(t) ? { ...t } : t),
        });
      }
      function $(t) {
        return new c({
          ...t,
          validator: (e, r) => void 0 === e || t.validator(e, r),
          refiner: (e, r) => void 0 === e || t.refiner(e, r),
        });
      }
      function U(t, e) {
        return new c({
          type: "record",
          schema: null,
          *entries(r) {
            if (i(r))
              for (let n in r) {
                let i = r[n];
                yield [n, n, t], yield [n, i, e];
              }
          },
          validator: (t) => i(t) || `Expected an object, but received: ${s(t)}`,
        });
      }
      function z() {
        return g("regexp", (t) => t instanceof RegExp);
      }
      function V(t) {
        return new c({
          type: "set",
          schema: null,
          *entries(e) {
            if (t && e instanceof Set) for (let r of e) yield [r, r, t];
          },
          coercer: (t) => (t instanceof Set ? new Set(t) : t),
          validator: (t) =>
            t instanceof Set ||
            `Expected a \`Set\` object, but received: ${s(t)}`,
        });
      }
      function W() {
        return g(
          "string",
          (t) =>
            "string" == typeof t || `Expected a string, but received: ${s(t)}`
        );
      }
      function H(t) {
        let e = P();
        return new c({
          type: "tuple",
          schema: null,
          *entries(r) {
            if (Array.isArray(r)) {
              let n = Math.max(t.length, r.length);
              for (let i = 0; i < n; i++) yield [i, r[i], t[i] || e];
            }
          },
          validator: (t) =>
            Array.isArray(t) || `Expected an array, but received: ${s(t)}`,
        });
      }
      function q(t) {
        let e = Object.keys(t);
        return new c({
          type: "type",
          schema: t,
          *entries(r) {
            if (i(r)) for (let n of e) yield [n, r[n], t[n]];
          },
          validator: (t) => i(t) || `Expected an object, but received: ${s(t)}`,
          coercer: (t) => (i(t) ? { ...t } : t),
        });
      }
      function Z(t) {
        let e = t.map((t) => t.type).join(" | ");
        return new c({
          type: "union",
          schema: null,
          coercer(e) {
            for (let r of t) {
              let [t, n] = r.validate(e, { coerce: !0 });
              if (!t) return n;
            }
            return e;
          },
          validator(r, n) {
            let i = [];
            for (let e of t) {
              let [...t] = u(r, e, n),
                [o] = t;
              if (!o[0]) return [];
              for (let [e] of t) e && i.push(e);
            }
            return [
              `Expected the value to satisfy a union of \`${e}\`, but received: ${s(
                r
              )}`,
              ...i,
            ];
          },
        });
      }
      function J() {
        return g("unknown", () => !0);
      }
      function G(t, e, r) {
        return new c({
          ...t,
          coercer: (n, i) =>
            f(n, e) ? t.coercer(r(n, i), i) : t.coercer(n, i),
        });
      }
      function Y(t, e, r = {}) {
        return G(t, J(), (t) => {
          let n = "function" == typeof e ? e() : e;
          if (void 0 === t) return n;
          if (!r.strict && o(t) && o(n)) {
            let e = { ...t },
              r = !1;
            for (let t in n) void 0 === e[t] && ((e[t] = n[t]), (r = !0));
            if (r) return e;
          }
          return t;
        });
      }
      function Q(t) {
        return G(t, W(), (t) => t.trim());
      }
      function K(t) {
        return to(t, "empty", (e) => {
          let r = X(e);
          return (
            0 === r ||
            `Expected an empty ${t.type} but received one with a size of \`${r}\``
          );
        });
      }
      function X(t) {
        return t instanceof Map || t instanceof Set ? t.size : t.length;
      }
      function tt(t, e, r = {}) {
        let { exclusive: n } = r;
        return to(t, "max", (r) =>
          n
            ? r < e
            : r <= e ||
              `Expected a ${t.type} less than ${
                n ? "" : "or equal to "
              }${e} but received \`${r}\``
        );
      }
      function te(t, e, r = {}) {
        let { exclusive: n } = r;
        return to(t, "min", (r) =>
          n
            ? r > e
            : r >= e ||
              `Expected a ${t.type} greater than ${
                n ? "" : "or equal to "
              }${e} but received \`${r}\``
        );
      }
      function tr(t) {
        return to(t, "nonempty", (e) => {
          let r = X(e);
          return (
            r > 0 || `Expected a nonempty ${t.type} but received an empty one`
          );
        });
      }
      function tn(t, e) {
        return to(
          t,
          "pattern",
          (r) =>
            e.test(r) ||
            `Expected a ${t.type} matching \`/${e.source}/\` but received "${r}"`
        );
      }
      function ti(t, e, r = e) {
        let n = `Expected a ${t.type}`,
          i = e === r ? `of \`${e}\`` : `between \`${e}\` and \`${r}\``;
        return to(t, "size", (t) => {
          if ("number" == typeof t || t instanceof Date)
            return (e <= t && t <= r) || `${n} ${i} but received \`${t}\``;
          if (t instanceof Map || t instanceof Set) {
            let { size: o } = t;
            return (
              (e <= o && o <= r) ||
              `${n} with a size ${i} but received one with a size of \`${o}\``
            );
          }
          {
            let { length: o } = t;
            return (
              (e <= o && o <= r) ||
              `${n} with a length ${i} but received one with a length of \`${o}\``
            );
          }
        });
      }
      function to(t, e, r) {
        return new c({
          ...t,
          *refiner(n, i) {
            yield* t.refiner(n, i);
            let o = r(n, i),
              s = a(o, i, t, n);
            for (let t of s) yield { ...t, refinement: e };
          },
        });
      }
    },
    40626: function (t) {
      "use strict";
      t.exports = { i8: "3.6.6" };
    },
  },
]);
