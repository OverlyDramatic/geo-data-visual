<template>
  <div class="project-glance-wrap">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header>
        <el-page-header @back="$router.push({name: 'projectMenu'})" >
          <div slot="content">
            <span v-text="fileData.info ? fileData.info.basicInfo.projectName + ' - ' + pageTitle: pageTitle"></span>
            &nbsp;
            <i class="el-icon-view"></i>
          </div>
        </el-page-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac" style="height: 100%">
            <el-col
              style="height: 100%">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @select="menuClick($event)">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">项目概览</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-document"></i>
                  <span slot="title">反演数据</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-s-marketing"></i>
                  <span slot="title">地图展示</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">项目设置</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <glance
            v-if="currentIndex === '1'"/>
          <inversion
            v-if="currentIndex === '2'"/>
          <mapView
            v-if="currentIndex === '3'"/>
          <setting
          :basicData="fileData.info.basicInfo"
            v-if="currentIndex === '4'"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import glance from './Glance'
import inversion from './Inversion'
import mapView from './MapView'
import setting from './Setting'

export default {
  name: 'ProjectGlance',
  components: {
    glance,
    inversion,
    mapView,
    setting
  },
  data() {
    return {
      fileData: {},
      currentIndex: '1'
    }
  },
  computed: {
    pageTitle() {
      switch (this.currentIndex) {
        case '1':
          return '项目概览'
        case '2':
          return '反演数据'
        case '3':
          return '地图展示'
        case '4':
          return '项目设置'
        default:
          return '项目概览'
      }
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
          id: fileData.id,
          basicInfo: fileData.info.basicInfo
        })
        fs.writeFile(logUrl, JSON.stringify(log), (err) => {
          if (err) throw err
        })
      })
    },
    // 点击菜单
    menuClick(event) {
      this.currentIndex = event
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
.el-header, .el-footer {
    color: #409EFF;
    border: 1px solid #eee;
    text-align: center;
    line-height: 60px;
    user-select: none;
  }

.el-aside {
  text-align: center;
  line-height: 200px;
}

.el-main {
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-page-header {
  height: 60px;
  line-height: 60px;
}
</style>
