interface Snippet {
  [key: string]: string
}

const snippet: Snippet = {
  log: `console.log()`,
  for: `for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }`,
}

export default snippet
