<template>
  <div class="projectMenu-wrap">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header>
        <el-page-header @back="$router.push({name: 'home'})">
          <div slot="content">
            <span v-text="'工程目录'"></span>
          </div>
        </el-page-header>
      </el-header>
      <el-container>
        <el-main>
          <!-- 搜索栏 -->
          <!-- 表格 -->
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="projectName"
              label="项目名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="author"
              label="项目作者"
              width="180">
            </el-table-column>
            <el-table-column
              prop="dateRange"
              label="项目日期">
            </el-table-column>
            <el-table-column
              prop="address"
              label="项目地址">
            </el-table-column>
            <el-table-column
              prop="detectMethod"
              label="探测方式">
            </el-table-column>
            <el-table-column
              prop="detectObjects"
              label="探测目标">
            </el-table-column>
            <!-- 操作 -->
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'projectMenu',
  data() {
    return {
      logData: [],
      tableData: []
    }
  },
  methods: {
    // * 获取项目log
    getLog() {
      const fs = require('fs')
      const logUrl = localStorage.getItem('logUrl')
      const _this = this

      return new Promise(function (resolve, reject) {
        fs.readFile(logUrl, (err, data) => {
          if (err) {
            reject(new Error(err))
            throw err
          }
          _this.logData = JSON.parse(data.toString())
          resolve(_this.logData)
        })
      })
    },
    parseTableData(logData) {
      console.log(logData)
      for (let i in logData) {
        this.tableData.push({
          id: logData[i].id,
          ...logData[i].basicInfo
        })
      }
    }
  },
  mounted() {
    this.getLog()
      .then(res => {
        this.parseTableData(res)
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
