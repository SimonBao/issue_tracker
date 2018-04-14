
module.exports = {
    "extends": "airbnb",
    "rules": {
      "no-alert": ["off"],
      "no-underscore-dangle": ["error", { "allow": ["_id"] }],
      "no-param-reassign": ["error", { "props": false }]
    },
    "env": {
        "browser": true,
    },
  }