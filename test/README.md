# Run tests

1. Clone the [reactstrap-date-picker repository](https://github.com/afialapis/reactstrap-date-picker)
2. Run `npm install` to install dependencies
3. Run `npm run test`

# About `enzyme` and `cheerio`

`enzyme` needs `cheerio`. At least for current `enzyme` version (3.11.0), there is an import error.

We need to stick to `cheerio`'s version "1.0.0-rc.3".

[More info here](https://github.com/enzymejs/enzyme/issues/2518)

