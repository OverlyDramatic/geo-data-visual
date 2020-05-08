<template>
  <div class="project-glance-wrap">
    projectGlance.vue
    {{ $route.query.path }}
    <button @click="$router.back()">返回</button>
  </div>
</template>
<script>
export default {
  name: 'ProjectGlance',
  data() {
    return {
      fileData: {}
    }
  },
  methods: {
    readTheFile(path) {
      const fs = require('fs')
      return new Promise(function(resolve, reject) {
        fs.readFile(path, (err, data) => {
          if (err) {
            reject(new Error('打开工程失败！'))
            throw err
          }
          resolve(JSON.parse(data.toString()))
        })
      })
    },
    // 更新打开日志
    updateRecentLog(fileData) {
      const fs = require('fs')
      const logUrl = localStorage.getItem('logUrl')
      fs.readFile(logUrl, (err, data) => {
        if (err) throw err
        let log = JSON.parse(data.toString())
        const recentId = fileData.id
        // 检测log中是否存在当前文件
        for (let i in log) {
          if (log[i].id === recentId) {
            log.splice(i, 1)
          }
        }
        log.unshift({
          name: fileData.info.basicInfo.projectName,
          path: this.$route.query.path,
          id: fileData.id
        })
        fs.writeFile(logUrl, JSON.stringify(log), (err) => {
          if (err) throw err
        })
      })
    }
  },
  mounted() {
    this.readTheFile(this.$route.query.path)
      .then(res => {
        this.fileData = res
        this.updateRecentLog(res)
      }, rej => {
        console.error(rej)
      })
  }
}
</script>
<style>

</style>
