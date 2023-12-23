// index.js
import gulp from "gulp"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import * as dartSass from "sass"
import gulpSass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import shell from "shelljs"

const componentPath = resolve(dirname(fileURLToPath(import.meta.url)), "../")
const distPath = resolve(dirname(fileURLToPath(import.meta.url)), "../dist")

const { src, dest } = gulp
const sass = gulpSass(dartSass)

// 删除打包产物
export const removeDist = async () => {
  shell.rm("-rf", `${distPath}/lib`)
  shell.rm("-rf", `${distPath}/es`)
  shell.rm("-rf", `${distPath}/types`)
}

// 构建css
export const buildRootStyle = () => {
  return src(`${componentPath}/src/style.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(`${distPath}/es`))
    .pipe(dest(`${distPath}/lib`))
}

// 构建每个组件下单独的css
export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(`${distPath}/es`))
    .pipe(dest(`${distPath}/lib`))
}

// 打包组件
export const buildComponent = async () => {
  shell.cd(componentPath)
  shell.exec("vite build")
}
