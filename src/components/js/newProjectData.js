import { mkdir } from 'fs'

export function newProjectData() {
  // 创建data文件夹路径
  mkdir('./data', err => {
    if (err) {
      throw err
    }
  })
  // 填写项目基本信息
}

// project构造函数
export function GeoProject(info) {
  this.projectName = info.projectName
  this.id = Date.now().toString()
}
