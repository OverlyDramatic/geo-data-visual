// 获取文件名后缀
export function getSuffix(fileName) {
  const lastIndex = fileName.lastIndexOf('.')
  return fileName.slice(lastIndex + 1).toLowerCase()
}
