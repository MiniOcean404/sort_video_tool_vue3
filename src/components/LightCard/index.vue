<template>
  <div class="container">
    <div class="cards" @mousemove="onMove" @touchmove="onTouchMove">
      <div class="card">
        <div class="card-content"></div>
      </div>

      <div class="card">
        <div class="card-content"></div>
      </div>

      <div class="card">
        <div class="card-content"></div>
      </div>

      <div class="card">
        <div class="card-content"></div>
      </div>

      <div class="card">
        <div class="card-content"></div>
      </div>

      <div class="card">
        <div class="card-content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function onMove(e: MouseEvent) {
  move(e)
}
function onTouchMove(e: TouchEvent) {
  move(e.touches[0])
}

function move(e: MouseEvent | Touch) {
  const cards = document.querySelectorAll<HTMLDivElement>(".card")!

  cards.forEach((card) => {
    const x = e.clientX - card.getBoundingClientRect().left
    const y = e.clientY - card.getBoundingClientRect().top

    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  })
}
</script>

<style scoped lang="scss">
$cardsWidth: 500px;
$cardsHeight: 500px;

$cardsGap: 10px;

$spotlightColor: rgb(255, 255, 255);
// $spotlightColor: rgb(255, 0, 0, 1);
// $spotlightColor: rgb(0, 255, 0, 1);
// $spotlightColor: rgb(0, 255, 238, 1);
// $spotlightColor: rgb(255, 255, 0, 1);

@mixin spotlight($size, $alpha) {
  content: "";

  width: 100%;
  height: 100%;
  border-radius: inherit;

  opacity: 0;
  transition: opacity 0.5s;

  position: absolute;

  // $size 指的是渐变的大小
  background: radial-gradient(
    $size circle at var(--mouse-x) var(--mouse-y),
    rgba(red($spotlightColor), green($spotlightColor), blue($spotlightColor), $alpha),
    transparent
  );
}

.container {
  display: flex;
  justify-content: center;
  align-content: center;
  overflow: hidden;

  min-height: 100vh;
  background-color: rgba(16, 16, 16, 1);

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: $cardsGap;

    width: $cardsWidth;
    height: $cardsHeight;

    &:hover .card::before {
      opacity: 1;
    }

    .card {
      width: calc(50% - $cardsGap/2);
      height: calc(50% - $cardsGap / 2);
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.1);

      cursor: pointer;
      position: relative;

      // 下面边框发光，
      &::before {
        // @include spotlight(15vmin, 0.4);
        @include spotlight(15vmin, 0.4);
      }

      &:hover .card-content::before {
        opacity: 1;
      }

      .card-content {
        position: absolute;
        // 1px 的内边距，让内容不贴边，可以展示边框发光
        inset: 1px;
        border-radius: inherit;
        background-color: rgba(21, 21, 21, 1);

        // 上层内容发光
        &::before {
          @include spotlight(25vmin, 0.1);
        }
      }
    }
  }
}
</style>
