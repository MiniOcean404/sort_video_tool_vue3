interface Snippet {
  [key: string]: {
    insert: string
    detail: string
    documentation?: string
  }
}

const snippet: Snippet = {
  log: {
    insert: `console.log()`,
    detail: `log 代码片段`,
    documentation: "console.log(xxx)",
  },
  for: {
    insert: `for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }`,
    detail: `For 循环代码片段`,
    documentation: `for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }`,
  },
}

export default snippet
