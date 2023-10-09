const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@services": path.resolve(__dirname, "src/services"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
};
