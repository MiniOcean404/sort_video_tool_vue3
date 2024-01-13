interface FileTreeStruct {
  handle: FileSystemDirectoryHandle | FileSystemFileHandle
  path?: string
  dir?: string
  children?: FileTreeStruct[]
}

// 获取目录结构
export async function pickDirs(): Promise<{ tree: FileTreeStruct | undefined; files: FileTreeStruct[] }> {
  const dir = await showDirectoryPicker({ mode: "read" })
  const files: FileTreeStruct[] = []

  const processHandle = async (handle: FileSystemDirectoryHandle | FileSystemFileHandle, parentPath: string = ".") => {
    if (handle.kind === "directory") {
      const handle_tree: FileTreeStruct = {
        handle,
        dir: parentPath + "/" + handle.name,
        children: [],
      }

      const iter = handle.entries()

      for await (const entry of iter) {
        const [name, sub_handle] = entry
        const handle_sub_tree: FileTreeStruct = { handle: sub_handle }

        if (sub_handle.kind === "file") {
          handle_sub_tree.path = handle_tree.dir + "/" + name
          handle_tree.children && handle_tree.children.push(handle_sub_tree)

          files.push(handle_sub_tree)
        }

        if (sub_handle.kind === "directory") {
          const children = await processHandle(sub_handle, handle_tree.dir)
          children && handle_tree.children?.push(children)
        }
      }

      return handle_tree
    }
  }

  const tree = await processHandle(dir)

  return {
    tree,
    files,
  }
}

export const downloadUrl = (url: string, filename: string) => {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
}
