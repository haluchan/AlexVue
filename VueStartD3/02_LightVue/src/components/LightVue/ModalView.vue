<template>
  <div class="light-vue__model-view">
    <div class="insider">
      <div class="background" :style="styleObj"></div>
      <div class="foreground" :style="styleObj"></div>
      <div class="prev" @click="$root.$emit('prev')"></div>
      <div class="next" @click="$root.$emit('next')"></div>
    </div>
    <div class="close" @click="$root.$emit('close')"></div>
  </div>
</template>

<script>
export default {
  name: "ModalView",
  props: {
    view: {
      require: true,
      type: Object
    }
  },
  computed: {
    styleObj() {
      return {
        "background-image": `url("${this.view.src}")`
      };
    }
  }
};
</script>

<style lang="scss">
.light-vue {
  &__model-view {
    position: relative;
    width: 80%;
    height: 80%;
    background-color: #fff;
    border: 10px solid #fff;
    border-radius: 10px;
    > .insider {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      > .background,
      .foreground {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        outline: 0;
        background-repeat: no-repeat;
        background-position: center;
      }
      > .background {
        margin: -20px;
        width: calc(100% + 40px);
        height: calc(100% + 40px);
        background-size: cover;
        filter: blur(10px);
      }
      > .foreground {
        width: 100%;
        height: 100%;
        background-size: contain;
      }
      > .prev,
      .next {
        position: absolute;
        cursor: pointer;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        height: 60px;
        background-color: #fff;
        display: none;
        &:before,
        &:after {
          position: absolute;
          display: block;
          content: "";
          top: 50%;
          left: 50%;
          margin-top: -2.5px;
          margin-left: -30%;
          width: 50%;
          height: 5px;
          background-color: #34495e;
        }
        &:before {
          margin-top: 7px;
          transform: rotate(45deg);
        }
        &:after {
          margin-top: -12px;
          transform: rotate(-45deg);
        }
      }
      &:hover {
        > .prev,
        .next {
          display: block;
        }
      }
      > .prev {
        left: 0;
        transform: rotate(0deg) translateY(-50%);
      }
      > .next {
        right: 0;
        transform: rotate(180deg) translateY(50%);
      }
    }
    > .close {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      width: 60px;
      height: 60px;
      border: 5px solid #fff;
      border-radius: 50%;
      background-color: #34495e;
      &:before,
      &:after {
        position: absolute;
        display: block;
        content: "";
        top: 50%;
        left: 50%;
        margin-top: -2.5px;
        margin-left: -40%;
        width: 80%;
        height: 5px;
        background-color: #fff;
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>