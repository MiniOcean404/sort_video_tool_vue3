type perfFunction<T> = {
  (this: T, args: any[]): void
  (this: T, ...args: any[]): void
}
interface PerfFunctionWithID<T> extends perfFunction<T> {
  id?: NodeJS.Timeout
}

// 防抖 几秒内只能执行一次,再次触发重新计时
export function debounce<T, Args extends any>(fun: PerfFunctionWithID<T>, delay: number) {
  return function (this: T, args: Args): any {
    let that = this
    let _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}

// 节流 单位时间内只执行一次
export function throttle<T, Args extends any>(fun: PerfFunctionWithID<T>, delay: number) {
  let last: number, deferTimer: NodeJS.Timeout
  return function (this: T, args: Args): any {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, Array.from(_args))
      }, delay)
    } else {
      last = now
      fun.apply(that, Array.from(_args))
    }
  }
}
