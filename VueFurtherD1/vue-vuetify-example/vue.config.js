module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugin("VuetifyLoaderPlugin").tap(args => [
      {
        match(originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith("base-") || camelTag.startsWith("Base")) {
            return [camelTag, `import ${camelTag} from '@/components/Base/${camelTag.substring(4)}.vue'`];
          }
        }
      }
    ]);
  }
};
