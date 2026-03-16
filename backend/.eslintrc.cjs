module.exports = {
  root: true,
  env: {
    node: true,    // ✅ autorise 'process', 'require', etc.
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // ici tu peux ajouter des règles spécifiques
  },
};