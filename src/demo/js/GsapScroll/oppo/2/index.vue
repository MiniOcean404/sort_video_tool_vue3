<template>
  <section class="linear-phone">
    <div class="comp-inner">
      <div class="title">全面了解色彩影像旗舰</div>

      <div class="detail">
        从捕捉、储存到显示全程 10 亿色²，隔着屏幕都能感受照片里的喜怒哀乐。
        <br />
        色彩唤醒感动，满满创新，等你慢慢揭开。
      </div>
    </div>

    <div class="buttons" style="margin: 50px auto 0">
      <div class="comp-angle-block small">
        <div class="comp-inner">探索更多 Find X3 系列</div>
      </div>
    </div>

    <img class="phone loaded" src="../assets/section-6-phone.png" />
  </section>
</template>

<script setup lang="ts">
onMounted(() => {})
</script>

<style lang="scss" scoped>
.linear-phone {
  opacity: 1;

  padding: 170px 90px 90px;
  text-align: center;

  .phone {
    margin: 80px auto 0;
    width: 380px;
    height: 380px;
  }

  .comp-inner {
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
