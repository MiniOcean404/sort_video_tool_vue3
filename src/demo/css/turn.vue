<script setup lang="ts"></script>

<template>
  <div class="card">
    <img class="face" src="@/assets/image/bg.jpg" alt="" />
    <img class="back" src="@/assets/image/time-icon.png" alt="" />
  </div>
</template>

<style scoped lang="scss">
.card {
  transform-style: preserve-3d;
  perspective: 300px;
  position: relative;
  width: 300px;
  height: 300px;

  img {
    position: absolute;
    inset: 0;
    transition: 0.3s ease;
    backface-visibility: hidden;
  }

  .face {
    background-color: red;
  }

  .back {
    background-color: blue;
    transform: rotateY(180deg);
  }
}

.card:hover .face {
  transform: rotateY(-180deg);
}

.card:hover .back {
  transform: rotateY(0);
}
</style>
