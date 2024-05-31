<template>
  <CodeEditor :files="files" theme="github-dark-theme" @update-code="update"></CodeEditor>
</template>

<script setup lang="ts">
import CodeEditor from "@/demo/js/CodeEditor/Editor/index.vue"

let files = $ref({
  "/pages/app.tsx": `
    // import ahooks from "ahooks"
    // import lodash from "lodash"
    // import dayjs from "dayjs"

    import React, { useState, useEffect } from 'react';

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
  `,
  "/pages/app.css": `
    .num {
      color: red;
    }
  `,
})

onMounted(async () => {})

function update(e: string | undefined) {}
</script>

<style lang="scss" scoped></style>
