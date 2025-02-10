before(async function(){
  // console.log('Preloading functions (ESM) for being used in test units (CJS)')

  const { _resolve } = await import("./esm_pkg.cjs")
  await _resolve()
})

