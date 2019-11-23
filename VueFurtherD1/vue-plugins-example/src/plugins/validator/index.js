import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

export default {
  install(Vue, options) {
    Vue.component("ValidationObserver", ValidationObserver);
    Vue.component("ValidationProvider", ValidationProvider);

    extend("required", {
      ...required,
      message: "必填"
    });
    extend("email", {
      ...email,
      message: "請填寫正確格式"
    });
    extend("mobile", {
      message: "請填寫正確格式",
      validate: value => value.length === 10 && /^09\d{8}$/.test(value)
    });
  }
};
