<template>
  <div class="home" ref="home_screen">
    <div>
      <img draggable="false" src="../../assets/logo.png" />
    </div>
    <h1 class="home_title">未爆炸物探测数据可视化系统</h1>
    <div class="welcome_container">
      <section class="welcome_page start">
        <div>
          <!-- TODO 新建工程 -->
          <el-button class="home_btn" type="text">
            <i class="el-icon-plus"></i>
            新建工程
          </el-button>
        </div>
        <div>
          <!-- TODO 打开工程 -->
          <el-button class="home_btn" type="text" @click="openFile">
            <i class="el-icon-s-order"></i>
            打开工程
          </el-button>
          <div v-if="testRecentData.length">
            <!-- TODO 最近打开 -->
            <el-divider>最近打开</el-divider>
            <ul class="recent_list">
              <li
                class="recent_list_item"
                v-for="item in testRecentData.filter((item, index) => {
                  return index < 3
                })"
                :key="item.id"
              >
                <span class="recent_open_name" v-text="item.name"></span>
                <span class="recent_open_path" v-text="item.path"></span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <el-divider></el-divider>
      <section class="welcome_page close">
        <div>
          <!-- TODO 关闭软件 -->
          <el-button class="home_btn" type="text" style="color: #F56C6C;" @click="colseWindow">
            <i class="el-icon-close"></i>
            关闭软件
          </el-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      testRecentData: [
        {
          name: '工程1',
          path: 'D:/Code/geo-data-visual',
          id: '121'
        },
        {
          name: '工程2',
          path: 'D:/Code/geo-data-visual',
          id: '122'
        },
        {
          name: '工程3',
          path: 'D:/Code/geo-data-visual/src/components',
          id: '123'
        }
      ]
    }
  },
  methods: {
    // 点击关闭按钮
    colseWindow() {
      const { app } = require('electron').remote
      app.quit()
    },
    // 打开文件
    openFile() {
      const { fileUpload } = require('../../components/js/upload.js')
      fileUpload({
        formatLimit: 'application/json'
      }).then(
        res => {
          // 读取成功
          this.$message.success(`打开 ${res.name}工程`)
          let reader = new FileReader()
          reader.onload = e => {
            console.log(e.target.result)
          }
          reader.readAsText(res)
        },
        // 失败报错
        rej => {
          this.$message.error(rej.data)
        }
      )
    }
  },
  mounted() {
    const { dropFile } = require('../../components/js/dragFile.js')
    const homeScreen = this.$refs.home_screen
    // 在home_screen添加文件拖拽监听事件
    dropFile(homeScreen, {
      formatLimit: ['json']
    }).then(
      res => {
        // 读取成功
        this.$message.success(`打开 ${res.name}工程`)
        let reader = new FileReader()
        reader.onload = e => {
          console.log(e.target.result)
        }
        reader.readAsText(res)
      },
      rej => {
        this.$message.error(rej.message)
      }
    )
  }
}
</script>
<style>
.home_title {
  user-select: none;
  font-size: 36px;
  margin: 0;
}
.welcome_page {
  margin-top: 20px;
  font-size: 20px;
}
.home_btn.el-button {
  font-size: 16px;
}
.welcome_container {
  width: 200px;
  margin: 0 auto;
}
.welcome_box_recent {
  font-size: 14px;
}
.recent_list {
  font-size: 12px;
  list-style: none;
}
.recent_list .recent_list_item {
  margin-bottom: 10px;
}
.recent_open_name,
.recent_open_path {
  display: block;
  text-align: left;
  margin-bottom: 4px;
  width: 150px;
  height: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}
.recent_list_item:hover .recent_open_name,
.recent_list_item:hover .recent_open_path {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
