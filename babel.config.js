module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Plugin obrigatório para o WatermelonDB funcionar
      // Ele precisa vir ANTES de 'transform-class-properties'
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  };
};
