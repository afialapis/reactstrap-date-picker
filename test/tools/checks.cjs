const expect= global.expect

const assertIsoStringsHaveSameDate = (IsoStringA, IsoStringB) => {
  const dateA = new Date(IsoStringA)
  const dateB = new Date(IsoStringB)

  expect(dateA.getMonth()).to.equal(dateB.getMonth())
  expect(dateA.getDate()).to.equal(dateB.getDate())
  expect(dateA.getFullYear()).to.equal(dateB.getFullYear())
}


export {assertIsoStringsHaveSameDate}