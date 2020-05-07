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
    }
  },
  mounted() {
    this.readTheFile(this.$route.query.path)
      .then(res => {
        this.fileData = res
      }, rej => {
        console.error(rej)
      })
  }
}
</script>
<style>

</style>
