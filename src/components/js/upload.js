import { getSuffix } from './common.js'

const suffixRef = {
  'image/jpg': ['jpg'],
  'image/jpeg': ['jpeg'],
  'image/png': ['png'],
  'application/pdf': ['pdf'],
  'application/vnd.ms-excel': ['xls', 'xlsx'],
  'application/vnd.ms-powerpoint': ['ppt', 'pptx'],
  'application/msword': ['doc', 'docx'],
  'application/json': ['json']
}

function initAndOpen(config, res) {
  const inputFile = document.createElement('input')
  // 创建上传图片DOM
  inputFile.type = 'file'
  inputFile.name = 'file_upload'
  if (config.formatLimit) {
    inputFile.accept = config.formatLimit
  }
  inputFile.onchange = onFileChange.bind(this, config, inputFile, res)
  // 打开上传
  inputFile.click()
}

function onFileChange(config, inputFile, res) {
  // 判断文件类型
  const mimeList = config.formatLimit.split(', ')
  const sufList = []
  for (let i in mimeList) {
    if (suffixRef[mimeList[i]]) {
      for (let j in suffixRef[mimeList[i]]) {
        sufList.push(suffixRef[mimeList[i]][j])
      }
    }
  }
  if (sufList.indexOf(getSuffix(inputFile.files[0].name)) === -1) {
    res.reject({
      type: 'formatError',
      data: `上传文件格式不符合要求`
    })
  }
  res.resolve(inputFile.files[0])
}

export function fileUpload(config) {
  return new Promise((resolve, reject) => {
    const res = {
      resolve,
      reject
    }
    initAndOpen(config, res)
  })
}
