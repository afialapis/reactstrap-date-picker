const compareMonths = (a, b) => {
  try {
  const da= new Date(a)
  const db= new Date(b)

  const sameYear= da.getFullYear() == db.getFullYear()
  const sameMonth = da.getMonth() == db.getMonth()

  return sameMonth && sameYear
  }catch(e) {
    console.error(e)
    return true
  }
}


export {compareMonths}