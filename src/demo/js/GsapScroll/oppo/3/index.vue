<template>
  <!-- 第三个场景 -->
  <section class="new_word">
    <div class="desc-box">
      <div class="title">10 亿色，</div>
      <div class="title">打开手机色彩新世界</div>
      <div class="detail">
        搭载全链路 10bit 色彩引擎，重写手机与色彩的定义。
        <br class="g--pt-hidden" />
        影像可捕捉前所未有的丰富细节、存储忠实无损，屏幕呈现细腻惊艳。10 亿色彩在每个环节澎湃奔涌，如此绚丽利器，静候你解锁。
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
onMounted(() => {})
</script>

<style lang="scss" scoped>
.new_word {
  margin-top: -50vh;
  opacity: 0;

  background-image: url(../assets/section-6-2.jpg);
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .desc-box {
    text-align: center;
    opacity: 1;

    .title {
      font-size: 35px;
      line-height: 46px;
    }

    .detail {
      margin: 25px auto 0;
      font-size: 15px;
      line-height: 23px;
    }
  }
}
</style>
