package.json 修改：

main指定cjs入口
module指定esm入口
type字段的值设置为"module"时，表示该项目是一个ES模块项目
types表示类型声明文件位置
files表示发包时哪些文件将上传
scripts添加build打包命令
