module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ],
  plugins: [
    ["@babel/plugin-proposal-object-rest-spread"],
    [
      "@babel/plugin-transform-runtime"
    ]
    // ["@babel/plugin-syntax-dynamic-import"]
  ]
}
