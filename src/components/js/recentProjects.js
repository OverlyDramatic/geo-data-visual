// * 最近打开工程相关操作

// ? 最近打开 - 文件格式
// [
//   {
//     name: '最近工程1',
//     path: '/abc/def/ghi'
//   },
//   {
//     name: '最近工程2',
//     path: '/abc/def/ghi'
//   },
//   {
//     name: '最近工程3',
//     path: '/abc/def/ghi'
//   },
// ]

// * 初始化最近打开的文件
export function initRecentProjectLog() {
  // 在当前软件目录下创建projects路径
  const baseUrl = require('process').cwd()
  const path = require('path')
  const fs = require('fs')

  // projects路径
  const dirUrl = path.join(baseUrl, 'data', 'projects', 'log')
  const fileUrl = path.join(dirUrl, 'fileLog.json')

  // 将log地址存放在localstroage
  localStorage.setItem('logUrl', fileUrl)

  return new Promise((resolve, reject) => {
    // 创建projects路径
    fs.mkdir(dirUrl, { recursive: true }, (err) => {
      if (err) {
        reject(new Error(reject))
        throw err
      }
      // log文件
      fs.stat(fileUrl, (err, stats) => {
        if (err) {
          // 创建log文件
          const logTemp = []
          fs.writeFile(fileUrl, JSON.stringify(logTemp), (err) => {
            if (err) {
              reject(new Error(reject))
              throw err
            }
            resolve(fileUrl)
          })
        } else {
          resolve(fileUrl)
        }
      })
    })
  })
}
