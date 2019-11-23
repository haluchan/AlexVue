<template>
  <div>
    <ValidationObserver v-slot="{ passes }">
      <h2>{{ currentStep.title }}</h2>
      <form @submit.prevent="passes(nextStep)">
        <component
          v-for="field in currentStep.fields"
          :is="field.type"
          :name="field.name"
          :text="field.text"
          v-model="field.value"
          :key="field.name"
          :rules="field.rules"
        ></component>
        <br />
        <div>
          <button v-if="step > 0" type="button" @click="step--">
            上一步
          </button>
          <button type="submit">
            {{ isLastStep ? "送出" : "下一步" }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import GenderInput from "@/components/GenderInput.vue";
export default {
  name: "VeeValidate",
  data() {
    return {
      step: 0,
      steps: [
        {
          title: "基本資料",
          fields: [
            {
              type: "TextInput",
              name: "username",
              text: "使用者名稱",
              rules: "required",
              value: ""
            },
            {
              type: "GenderInput",
              name: "gender",
              text: "性別",
              rules: "required",
              value: null
            }
          ]
        },
        {
          title: "聯絡資料",
          fields: [
            {
              type: "TextInput",
              name: "email",
              text: "電子郵件",
              rules: "required|email",
              value: ""
            },
            {
              type: "TextInput",
              name: "phone",
              text: "手機",
              rules: "required|mobile",
              value: ""
            }
          ]
        }
      ]
    };
  },
  computed: {
    currentStep() {
      return this.steps[this.step];
    },
    isLastStep() {
      return this.step === this.steps.length - 1;
    },
    formData() {
      return this.steps.reduce((prev, current) => {
        current.fields.forEach(field => {
          prev[field.name] = field.value;
        });
        return prev;
      }, {});
    }
  },
  methods: {
    submit() {
      console.log("送出", this.formData);
    },
    nextStep() {
      if (this.isLastStep) {
        return this.submit();
      }
      this.step++;
    }
  },
  components: {
    TextInput,
    GenderInput
  }
};
</script>

<style>
form > div {
  margin: 10px 0;
}
.error {
  color: red;
}
</style>
