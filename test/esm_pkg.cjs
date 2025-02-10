
"use strict";

// Wrapper for dynamic import() of ESM-only packages.
// Only works in later versions of Node.js 12+

let _rdpPkg
const _getRDPPkg = async () => {
  if (!_rdpPkg) {
    _rdpPkg = await import("../src/index.mjs");
  }

  return _rdpPkg;
};


const _resolve = async () => Promise.all([
  global.formigaRPkg = await _getRDPPkg()
]);

module.exports = {
  _resolve,
};

