<template>
  <main>
    <div className="intro">
      <h1 className="intro__title">
        <span className="intro__title-pre">On-Scroll</span>
        <span className="intro__title-sub">Perspective Grid Animations</span>
      </h1>
      <span className="intro__info">Scroll moderately to fully experience the animations</span>
    </div>

    <section
      key="{index}"
      :class="'content ' + sectionClassName"
      v-for="{ sectionClassName, h3ClassName, title } in gridAnimates"
    >
      <div class="grid-box">
        <div className="grid-wrap">
          <div className="grid__item" :key="index" v-for="(item, index) in images">
            <img className="grid__item-inner" :src="item.src" />
          </div>
        </div>
      </div>
      <h3 :class="'content__title ' + h3ClassName">{{ title }}</h3>
    </section>
  </main>
</template>

<script setup lang="ts">
// 平滑滚动 Lenis
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { supportsCssVars } from "@/utils/check"
import { chooseAnimation } from "@/demo/js/LenisGsapScroll/animate"

gsap.registerPlugin(ScrollTrigger)

let images = $ref<HTMLImageElement[]>([])
const gridAnimates = [
  {
    animationType: "grid--1",
    sectionClassName: "",
    h3ClassName: "content__title--right content__title--top",
    title: "Fleeting moments, existence's dance.",
  },
  {
    animationType: "grid--2",
    sectionClassName: "",
    h3ClassName: "",
    title: "Impermanence guides life's river.",
  },
  {
    animationType: "grid--3",
    sectionClassName: "content--spacing",
    h3ClassName: "content__title--left content__title--bottom",
    title: "Embrace now, tomorrow may fade.",
  },
  {
    animationType: "grid--4",
    sectionClassName: "content--spacing",
    h3ClassName: "content__title--right",
    title: "Now unfolds eternity's grace.",
  },
  {
    animationType: "grid--5",
    sectionClassName: "content--spacing",
    h3ClassName: "",
    title: "An infinite universe of moments unfolding.",
  },
  {
    animationType: "grid--6",
    sectionClassName: "content--spacing",
    h3ClassName: "",
    title: "Seasons shift, moments flow.",
  },
]

function initLenis() {
  // 必须引入 css 文件
  const lenis = new Lenis({
    // 平滑滚动的速度 值越小平滑效果越明显lerp: 0.1
    lerp: 0.1,
    // 启用鼠标滚轮事件的平滑滚动
    smoothWheel: true,
  })

  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

async function loadImages() {
  const imageModules = import.meta.glob("./image/*.jpg", { eager: true })
  const imagePromises = Object.values(imageModules).map((module) => {
    const image = new Image()
    // @ts-ignore
    image.src = module.default
    return image
  })

  images = await Promise.all(imagePromises)
}

onMounted(async () => {
  supportsCssVars() || alert("请在支持CSS变量的现代浏览器中查看此演示")
  await loadImages()
  initLenis()
  const grids = document.querySelectorAll(".grid-box")
  Array.from(grids).map((grid, i) => chooseAnimation(`grid--${i + 1}`, grid as HTMLDivElement))
})
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

:global(:root) {
  --color-text: #fff;
  --color-bg: #000;
  --color-link: #fff;
  --color-link-hover: #907030;
  --color-title: #907030;
  --perspective: 1500px;
  --grid-item-ratio: 1.5;
  --grid-width: 100%;
  --grid-height: auto;
  --grid-gap: 2vw;
  --grid-columns: 4;
  --grid-inner-scale: 1;
}

:global(body) {
  color: var(--color-text);
  background-color: var(--color-bg);
  font-family: "Times New Roman", Times, serif;
  font-variation-settings:
    "ital" 0,
    "wght" 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.intro {
  height: calc(100vh - 3rem);
  text-align: center;
  place-items: center;
  display: grid;
  margin-bottom: 30vh;
  .intro__title {
    place-items: center;
    margin: 0;
    line-height: 0.9;
    display: grid;
    margin-top: 15vh;
    font-weight: 400;
    .intro__title-pre {
      font-size: clamp(2rem, 8vw, 5rem);
      color: var(--color-title);
      text-transform: uppercase;
    }
    .intro__title-sub {
      font-size: clamp(1.5rem, 20vw, 8rem); /* 分别是最小值、首选值和最大值 */
      max-width: 15ch;
      margin: 0 auto;
    }
  }
  .intro__info {
    max-width: 20ch;
    opacity: 0.6;
    margin-bottom: 4rem;
    padding-bottom: 1rem;
    line-height: 1.2;
    align-self: end;
  }
}

.content {
  position: relative;
  margin-bottom: 20vh;

  .grid-box {
    display: grid;
    place-items: center;
    padding: 2rem;
    width: 100%;
    perspective: var(--perspective);
  }

  .grid-wrap {
    height: var(--grid-height);
    width: var(--grid-width);
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--grid-gap);
    transform-style: preserve-3d;

    .grid__item {
      aspect-ratio: var(--grid-item-ratio);
      width: 100%;
      height: auto;
      overflow: hidden;
      position: relative;
      border-radius: 8px;
      display: grid;
      place-items: center;
      .grid__item-inner {
        position: relative;
        width: calc(1 / var(--grid-inner-scale) * 100%);
        height: calc(1 / var(--grid-inner-scale) * 100%);
        background-size: cover;
        background-position: 50% 50%;
      }
    }
  }

  .content__title {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 50%;
    left: 50%;
    margin: -50vh 0 0 -50vw;
    padding: 0 10vw;
    display: grid;
    place-items: center;
    text-align: center;
    font-weight: 300;
    font-size: clamp(1.5rem, 15vw, 6.5rem);
  }

  .content__title--top {
    align-items: start;
  }

  .content__title--bottom {
    align-items: end;
  }

  .content__title--left {
    justify-items: start;
    text-align: left;
  }

  .content__title--right {
    justify-items: end;
    text-align: right;
  }
}

.content--spacing {
  margin-bottom: 80vh;
}
</style>
