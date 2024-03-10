<template>
  <!-- 第四部分 -->
  <div class="phone-params">
    <div class="text-view">
      <div class="title">10 亿色臻彩屏，</div>
      <div class="title">震撼色彩，流畅奔涌</div>

      <div class="spots">
        <div class="item">
          <div class="name">10.7 亿色</div>
          <div class="info">色彩显示</div>
        </div>
        <div class="item">
          <div class="name">120Hz</div>
          <div class="info">
            智能动态帧率
            <sup>4</sup>
          </div>
        </div>
        <div class="item">
          <div class="name">O1</div>
          <div class="info">
            超感画质引擎
            <sup>5</sup>
          </div>
        </div>
        <div class="item">
          <div class="name">O-Sync</div>
          <div class="info">
            超频响应
            <sup>6</sup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
// 第四
.phone-params {
  margin-top: -220vh;
  height: 100vh;
  overflow: hidden;

  transform: scale(1.15);
  clip-path: inset(100% 0 0);
  z-index: 2;

  background-image: url("../assets/section6-3-2-hvga.png");
  background-size: 100% 100%;

  display: flex;
  justify-content: space-between;

  .text-view {
    right: 900px;
    top: 220px;

    .title {
      font-size: 35px;
      line-height: 54px;
      text-align: left;
    }

    .name {
      font-size: 25px;
      line-height: 36px;
    }

    .info {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
    }

    & > div {
      clip-path: inset(0 50% 0 50%);
      transition: clip-path 0.7s;
    }

    &.active > div {
      clip-path: inset(0 0 0 0);
    }
  }
}
</style>
