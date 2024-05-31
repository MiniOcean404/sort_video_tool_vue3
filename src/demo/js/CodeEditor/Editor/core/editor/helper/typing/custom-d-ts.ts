const apiType = `const context = {
    /**
     * @param {*} code
     * @returns {Instance} 返回Instance实例
     */
    getInstance() {
    }
  }

  const Instance = {
    /** 实例 ID*/
    id,
    /** 实例打印次数 */
    logTime,
    /** 输出实例 ID */
    logId(),
    /** 获取打印次数 */
    getLogTime()
  }`

// 添加 .d.ts 文件声明
// monaco.Languages.typescript.javascriptDefaults.addExtralib(apiType, "myapi.js")
