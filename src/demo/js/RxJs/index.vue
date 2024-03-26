<template>
  <div></div>
</template>

<script setup lang="ts">
import { from, map, toArray, of, reduce, fromEventPattern } from "rxjs"

onMounted(() => {
  const source = from([{ id: 1 }, { id: 2 }, { id: 3 }])

  source
    .pipe(
      map((e) => e.id * 2),
      toArray(),
    )
    .subscribe((e) => {
      console.log(e)
    })

  const source2 = of({ id: 1 }, { name: 2 }, { age: 3 })

  source2
    .pipe(
      reduce((acc, cur) => {
        return Object.assign(acc, cur)
      }, {}),
    )
    .subscribe({
      next: (e) => {
        console.log(e)
      },
    })
})
</script>

<style lang="scss" scoped></style>
