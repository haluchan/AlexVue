<template>
  <div class="i18b">
    <h1>{{ $t("hello") }}</h1>
    <button
      v-for="locale in locales"
      v-show="$i18n.locale !== locale"
      :key="locale"
      @click="setLang(locale)"
    >
      {{ $t(`lang-${locale}`) }}
    </button>
  </div>
</template>

<script>
export default {
  name: "I18n",
  data() {
    return {
      locales: ["tw", "en", "jp"]
    };
  },
  methods: {
    setLang: function(lang) {
      this.$store.dispatch("SET_LANG", lang);
    }
  }
};
</script>
