
const path = require('path')
const {writeFile} = require('fs/promises')
const os = require('os')

async function fixCheerio() {
  const cheerioPkgJsonPath = path.join(__dirname, '../../node_modules/cheerio/package.json')
  const cheerioPkgJson= require(cheerioPkgJsonPath)

  cheerioPkgJson.exports= {
    ... cheerioPkgJson.exports,
    "./lib/utils": {
      "require": "./lib/utils.js",
      "import": "./lib/esm/utils.js"
    }
  }

  await writeFile(
    cheerioPkgJsonPath,
    JSON.stringify(cheerioPkgJson, null, 2) + os.EOL
  )
}

fixCheerio()