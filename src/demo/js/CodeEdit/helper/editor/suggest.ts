// /* utils/RegisterCompletion.js */

// import { languages as MonacoLanguages } from "monaco-editor"
// import { language } from "monaco-editor/esm/vs/basic-languages/javascript/javascript"
// import _ from "lodash-es"

// const { keywords } = language

// /**
//  * @description monaco-editor 自定义代码补全建议
//  */
// export default class RegisterCompletion {
//   constructor(language, hintData) {
//     this._language = language
//     this._hintData = hintData
//     this._disposable = null
//     this.registerCompletion()
//   }

//   /**
//    * @description 销毁
//    */
//   dispose() {
//     this._disposable.dispose?.()
//   }

//   /**
//    * @description 注册
//    * @returns dispose
//    */
//   registerCompletion() {
//     this._disposable = MonacoLanguages.registerCompletionItemProvider(this._language, {
//       triggerCharacters: [".", ...keywords],

//       provideCompletionItems: (model, position) => {
//         let suggestions = []
//         const { lineNumber, column } = position

//         /* 获取当前光标所在行的文本 */
//         const beforeEditingText = model.getValueInRange({
//           startLineNumber: lineNumber,
//           startColumn: 0,
//           endLineNumber: lineNumber,
//           endColumn: column,
//         })

//         /* 正在编辑的单词 */
//         const editingWord = _.last(beforeEditingText.trim().split(/\s+/))

//         /* .结尾 */
//         if (editingWord.endsWith(".")) {
//           const wordNoDot = editingWord.slice(0, editingWord.length - 1)
//           if (Object.keys(this._hintData).includes(wordNoDot)) {
//             suggestions = [...this.getTableSuggest(wordNoDot)]
//           }
//         } else if (editingWord === ".") {
//           /* .开头 */
//           suggestions = []
//         } else {
//           suggestions = [...this.getDBSuggest(), ...this.getSQLSuggest()]
//         }

//         return {
//           suggestions,
//         }
//       },
//     })
//   }

//   // 获取 SQL 语法提示
//   getSQLSuggest() {
//     return keywords.map((key) => ({
//       label: key,
//       kind: MonacoLanguages.CompletionItemKind.Enum,
//       insertText: key,
//     }))
//   }

//   // 数据库名（hintData 的 key 值）
//   getDBSuggest() {
//     return Object.keys(this._hintData).map((key) => ({
//       label: key,
//       kind: MonacoLanguages.CompletionItemKind.Constant,
//       insertText: key,
//     }))
//   }

//   // 表名（hintData 的 value 值）
//   getTableSuggest(dbName) {
//     const tableNames = this._hintData[dbName]

//     if (!tableNames) {
//       return []
//     }

//     return tableNames.map((name) => ({
//       label: name,
//       kind: MonacoLanguages.CompletionItemKind.Constant,
//       insertText: name,
//     }))
//   }
// }

/* 使用 */
// import RegisterCompletion from '@/utils/RegisterCompletion.js';

// const hintData = {
//     // 数据库 adbs 下有两张表，分别是 dim_realtime_recharge_paycfg_range、dim_realtime_recharge_range
//     adbs: ['dim_realtime_recharge_paycfg_range', 'dim_realtime_recharge_range'],
//     dimi: ['ads_adid', 'ads_spec_adid_category'],
// };

// // 注册
// const registerCompletionInstance = new RegisterCompletion('sql', hintData);

// // 销毁
// registerCompletionInstance.dispose();
