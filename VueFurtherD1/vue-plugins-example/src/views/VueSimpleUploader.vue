<template>
  <uploader :options="options" class="uploader-example">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>拖曳檔案上傳或</p>
      <uploader-btn>選擇檔案</uploader-btn>
      <uploader-btn :attrs="attrs">選擇圖片</uploader-btn>
      <uploader-btn :directory="true">選擇資料夾</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
export default {
  name: "VueSimpleUploader",
  data() {
    return {
      options: {
        target: "//localhost:3000/upload",
        testChunks: false
      },
      attrs: {
        accept: "image/*"
      }
    };
  }
};
</script>

<style>
.uploader-example {
  width: 100%;
  max-width: 800px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
