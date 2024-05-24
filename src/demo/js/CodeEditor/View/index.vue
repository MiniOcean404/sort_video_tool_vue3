<template>
  <CodeEditor :code="code" @update-code="update"></CodeEditor>
  <CodeRender :code="code"></CodeRender>
</template>

<script setup lang="ts">
import CodeEditor from "@/demo/js/CodeEditor/Editor/index.vue"
import CodeRender from "@/demo/js/CodeEditor/Render/index.vue"

let code = $ref<string>(`
  // import ahooks from "ahooks"
  // import lodash from "lodash"
  // import dayjs from "dayjs"

  import React, { useState, useEffect } from 'react';
  // import styles from './app.css';
  // console.log(styles.num)


  function App() {
    const [num, setNum] = useState(() => {
      const num1 = 1 + 2;
      const num2 = 2 + 3;
      return num1 + num2;
    });

    return (
      <div>
        <div className="num" onClick={() => setNum(prevNum => prevNum + 1)}>{num}</div>
        <div style={{ fontSize: 30 }}> hello word </div>
      </div>
    );
  }

  export default App;

`)

onMounted(async () => {})

function update(e: string | undefined) {
  code = e || ""
}
</script>

<style lang="scss" scoped></style>
