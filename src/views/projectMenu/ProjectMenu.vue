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
          <el-form :inline="true" :model="queryObj" class="demo-form-inline">
            <!-- TODO 请输入项目名 -->
            <el-form-item size="mini" label="项目名称">
              <el-input v-model="queryObj.projectName" prefix-icon="el-icon-takeaway-box"></el-input>
            </el-form-item>
            <!-- TODO 请输入项目作者 -->
            <el-form-item size="mini" label="项目作者">
              <el-input v-model="queryObj.author" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <!-- TODO 请输入项目日期 -->
            <el-form-item size="mini" label="项目日期">
              <el-date-picker
                v-model="queryObj.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <!-- TODO 请输入项目单位 -->
            <el-form-item size="mini" label="项目地址">
              <el-input v-model="queryObj.address" prefix-icon="el-icon-position"></el-input>
            </el-form-item>
            <!-- TODO 探测方式 单选 航空、地面 -->
            <el-form-item size="mini" label="探测方式">
              <el-select v-model="queryObj.detectMethod" placeholder="请选择">
                <el-option
                  :label="'全部'"
                  :value="''">
                </el-option>
                <el-option
                  :label="'地面'"
                  :value="'1'">
                  <i class="el-icon-truck"></i>地面
                </el-option>
                <el-option
                  :label="'航空'"
                  :value="'2'">
                  <i class="el-icon-s-promotion"></i>航空
                </el-option>
                <el-option
                  :label="'水面'"
                  :value="'3'">
                  <i class="el-icon-ship"></i>水面
                </el-option>
              </el-select>
            </el-form-item>
            <!-- TODO 探测目标 多选 地雷、炮弹、简易爆炸装置、集束炸弹 -->
            <el-form-item size="mini" label="探测目标">
              <el-select multiple v-model="queryObj.detectObjects" placeholder="请选择">
                <el-option
                  :label="'地雷'"
                  :value="'1'">
                </el-option>
                <el-option
                  :label="'炮弹'"
                  :value="'2'">
                </el-option>
                <el-option
                  :label="'简易爆炸装置'"
                  :value="'3'">
                </el-option>
                <el-option
                  :label="'集束炸弹'"
                  :value="'4'">
                </el-option>
                <el-option
                  :label="'其他'"
                  :value="'5'">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="mini">
              <el-button type="primary" @click="queryClick">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 表格 -->
          <el-table
            :data="showData"
            style="width: 100%">
            <el-table-column
              prop="projectName"
              label="项目名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="author"
              label="项目作者"
              width="100">
            </el-table-column>
            <el-table-column
              prop="dateRange"
              label="项目日期">
              <template slot-scope="scope">
                <div v-text="scope.row.dateRange[0].split('T')[0]"></div>
                <div>至</div>
                <div v-text="scope.row.dateRange[1].split('T')[0]"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="项目地址">
            </el-table-column>
            <el-table-column
              prop="detectMethod"
              label="探测方式">
              <template slot-scope="scope">
                <span v-html="showDetectMethod(scope.row.detectMethod)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="detectObjects"
              label="探测目标">
              <template slot-scope="scope">
                <el-tag
                  type="info"
                  v-for="item in scope.row.detectObjects"
                  :key="scope.row.id + item">{{ detectObjects[item] }}</el-tag>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row.path)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="totalInfo.page"
            @current-change="page = $event"
            @prev-click="page = $event"
            @next-click="page = $event">
          </el-pagination>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'projectMenu',
  data() {
    return {
      queryObj: {
        projectName: '',
        author: '',
        dateRange: '',
        address: '',
        detectMethod: '', // 探测方式 1-地面 2-航空
        detectObjects: []
      },
      logData: [],
      tableData: [],
      page: 1,
      pageSize: 10,
      detectMethodMap: {
        '1': {
          label: '地面',
          icon: 'el-icon-truck'
        },
        '2': {
          label: '航空',
          icon: 'el-icon-s-promotion'
        },
        '3': {
          label: '水面',
          icon: 'el-icon-ship'
        }
      },
      detectObjects: {
        '1': '地雷',
        '2': '炮弹',
        '3': '简易爆炸装置',
        '4': '地雷',
        '5': '集束炸弹'
      }
    }
  },
  computed: {
    totalInfo() {
      return {
        item: this.tableData.length,
        page: Math.ceil(this.tableData.length / this.pageSize)
      }
    },
    showData() {
      let min = this.pageSize * (this.page - 1)
      let max = this.pageSize * this.page
      return this.tableData.slice(min, this.totalInfo.item > max ? max : this.totalInfo.item)
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
      for (let i in logData) {
        this.tableData.push({
          id: logData[i].id,
          path: logData[i].path,
          ...logData[i].basicInfo
        })
      }
    },
    showDetectMethod(index) {
      return `<i class="${this.detectMethodMap[index].icon}"></i>${this.detectMethodMap[index].label}`
    },
    handleEdit(path) {
      this.$router.push({
        name: 'projectGlance',
        query: {
          path
        }
      })
    },
    handleDelete(id) {
      console.log(id)
    },
    queryClick() {
      console.log(this.queryObj)
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
.el-footer {
  padding-top: 10px;
}
.el-form--inline {
  text-align: left;
}
</style>
