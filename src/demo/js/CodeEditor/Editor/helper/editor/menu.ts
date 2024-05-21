// @ts-ignore
import * as actions from "monaco-editor/esm/vs/platform/actions/common/actions"

export function hideMenu() {
  // 获取 Monaco Editor 的菜单项注册表
  let menus = actions.MenuRegistry._menuItems

  // 查找编辑器上下文菜单的注册条目
  let contextMenuEntry = [...menus].find((entry) => {
    return entry[0].id == "EditorContext"
  })

  // 从上下文菜单的注册条目中提取菜单项
  let contextMenuLinks = contextMenuEntry[1]

  // 要移除的菜单项的命令ID列表
  let removableIds = ["editor.action.clipboardCopyAction", "editor.action.clipboardPasteAction"]

  // 移除菜单项的函数
  let removeById = (list: any, ids: string[]) => {
    let node = list._first
    do {
      // 检查当前菜单项是否应该移除
      let shouldRemove = ids.includes(node.element?.command?.id)

      if (shouldRemove) {
        // 如果应该移除，则从链表中移除当前节点
        list._remove(node)
      }
    } while ((node = node.next)) // 遍历链表
  }

  // 通过调用 removeById 函数移除特定的菜单项
  removeById(contextMenuLinks, removableIds)
}
