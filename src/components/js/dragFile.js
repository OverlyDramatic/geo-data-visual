import { getSuffix } from './common.js'

export function dropFile(ref, config, callback) {
  // * drop
  ref.addEventListener(
    'drop',
    e => {
      e.stopPropagation()
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      const checkResult = checkFile(file, config)
      // 通过文件信息校验
      if (checkResult.flag) {
        callback.resolve(file)
      } else {
        callback.reject({
          message: checkResult.message
        })
      }
    },
    false
  )
  // * dragenter
  ref.addEventListener('dragenter', e => {
    e.stopPropagation()
    e.preventDefault()
  })
  // * dragover
  ref.addEventListener('dragover', e => {
    e.stopPropagation()
    e.preventDefault()
  })
  // * dragleave
  ref.addEventListener('dragleave', e => {
    e.stopPropagation()
    e.preventDefault()
  })
}

// 校验文件信息
function checkFile(file, config) {
  // ? 文件类型判断
  if (config.formatLimit) {
    return config.formatLimit.indexOf(getSuffix(file.name)) === -1 ? {
      flag: false,
      message: '打开文件格式不符合要求'
    } : {
      flag: true
    }
  }
}
