
module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": [
	"react"
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "globalReturn ": true,
      "impliedStrict": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "browser": true,
    "mocha": true,
    "node": true,
    "es6": true
  },
  "globals": {
		"Exception": true,
		"uvl": false
  },
  "rules": {
	"semi": 0,
	"vars-on-top": 0,
	"spaced-comment": 0,
	"prefer-template": 0,
	"consistent-return": 0,
	"comma-dangle": 0,
	"no-use-before-define": 0,
	"no-return-assign": 0,
	"no-case-declarations": 0,
	"no-cond-assign": 0,
	"no-console": 0,
	"max-len": 0,
	"arrow-body-style": 0,
	"new-cap": 0,
	"quotes": 0,
	"quote-props": 0,
	"prefer-arrow-callback": 0,
	"func-names": 0,
	"padded-blocks": 0,
	"keyword-spacing": 0,
	"no-var": 1,
	"no-trailing-spaces": 0,
	"no-unused-expressions": 0,
	"no-unused-vars": [1, {"argsIgnorePattern": "^_", "varsIgnorePattern": "^_"}],
	"no-inner-declarations": 0,
	"space-before-function-paren": 0,
	"global-require": 0,
	"react/jsx-indent": 0,
	"react/jsx-no-bind": 0,
	"react/jsx-wrap-multilines": 0,
	"react/jsx-space-before-closing": 0,
	"react/jsx-closing-bracket-location": 0,
	"react/prop-types": 0,
	"react/prefer-stateless-function": 0,
	"no-empty": 0
  }
}

/*
module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/warnings"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8,
  },
  "rules": {
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": "warn",    
    "no-console": 'off'
  }
};
*/