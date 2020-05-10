<template>
  <div class="glance-wrap">
    <el-card class="box-card">
      <div slot="header" class="glance-basic-title">
        <span>基本信息</span>
      </div>
      <!-- 项目名称 -->
      <ul class="glance-list" v-if="glanceData.basicInfo">
        <div class="clearfix">
          <li class="glance-item">
            <span class="glance-ite-label">
              <i class="el-icon-takeaway-box"></i>
              项目名称
            </span>
            <span class="glance-ite-content" v-text="glanceData.basicInfo.projectName"></span>
          </li>
          <li class="glance-item">
            <span class="glance-ite-label">
              <i class="el-icon-user-solid"></i>
              项目作者
            </span>
            <span class="glance-ite-content" v-text="glanceData.basicInfo.author"></span>
          </li>
          <li class="glance-item">
            <span class="glance-ite-label">
              <i class="el-icon-date"></i>
              项目日期
            </span>
            <span class="glance-ite-content" v-text="dateShow(glanceData.basicInfo.dateRange)"></span>
          </li>
          <li class="glance-item">
            <span class="glance-ite-label">
              <i class="el-icon-s-home"></i>
              项目单位
            </span>
            <span class="glance-ite-content" v-text="glanceData.basicInfo.organization"></span>
          </li>
          <li class="glance-item">
            <span class="glance-ite-label">
              <i class="el-icon-position"></i>
              项目地址
            </span>
            <span class="glance-ite-content" v-text="glanceData.basicInfo.address"></span>
          </li>
          <li class="glance-item">
            <span class="glance-ite-label">
              <i class="el-icon-c-scale-to-original"></i>
              探测方式
            </span>
            <span class="glance-ite-content" v-text="methodMap[glanceData.basicInfo.detectMethod]"></span>
          </li>
        </div>
        <li class="glance-item nolimit">
          <span class="glance-ite-label">
            <i class="el-icon-aim"></i>
            探测目标
          </span>
          <el-tag class="glance-ite-tag" v-for="item in glanceData.basicInfo.detectObjects" :key="glanceData.id + item" v-text="objectMap[item] "></el-tag>
        </li>
        <li class="glance-item nolimit">
          <span class="glance-ite-label">
            <i class="el-icon-document"></i>
            项目简介
          </span>
          <span class="glance-ite-content" v-text="glanceData.basicInfo.description"></span>
        </li>
        <li class="glance-item nolimit">
          <span class="glance-ite-label">
            <i class="el-icon-picture-outline"></i>
            项目照片
          </span>
          <span class="glance-ite-content">
            <el-image
              style="width: 100px; height: 100px; margin-right: 10px;"
              v-for="item in imgData"
              :key="item"
              :src="item"></el-image>
            <el-button class="glance-ite-content-btn" size="mini" type="success" plain>
              <i class="el-icon-plus"></i>
              添加
            </el-button>
          </span>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="glance-basic-title">
        <span>反演信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('changeIndex', '2')">详情</el-button>
      </div>
      <ul class="glance-list clearfix">
        <li class="glance-item">
          <span class="glance-ite-label">
            <i class="el-icon-s-data"></i>
            反演结果集
          </span>
          <span class="glance-ite-content">
            <span style="color: #E6A23C;">3个</span>
          </span>
          <el-button class="glance-ite-content-btn" size="mini" type="success" plain>
            <i class="el-icon-plus"></i>
            添加数据
          </el-button>
        </li>
        <li class="glance-item">
          <span class="glance-ite-label">
            <i class="el-icon-place"></i>
            反演结果总点数
          </span>
          <span class="glance-ite-content">
            <span style="color: #E6A23C;">215个</span>
          </span>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="glance-basic-title">
        <span>地图信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('changeIndex', '3')">详情</el-button>
      </div>
      <ul class="glance-list">
        <li class="glance-item">
          <span class="glance-ite-label">
            <i class="el-icon-s-help"></i>
            测量区域
          </span>
          <span class="glance-ite-content">
            <span style="color: #E6A23C;">3个</span>
          </span>
          <el-button class="glance-ite-content-btn" size="mini" type="success" plain>
            <i class="el-icon-plus"></i>
            添加数据
          </el-button>
        </li>
        <li class="glance-item">
          <span class="glance-ite-label">
            <i class="el-icon-s-grid"></i>
            测量区域总面积
          </span>
          <span class="glance-ite-content">
            <span style="color: #E6A23C;">2316 m <sup>2</sup></span>
          </span>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'glance',
  props: {
    glanceData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      imgUrl: [
        'D:/Code/geo-data-visual/data/image/木板车.jpg',
        'D:/Code/geo-data-visual/data/image/SQUID.jpg'
      ],
      imgData: [],
      methodMap: {
        '1': '地面',
        '2': '航空',
        '3': '水面'
      },
      objectMap: {
        '1': '地雷',
        '2': '炮弹',
        '3': '简易爆炸装置',
        '4': '集束炸弹',
        '5': '其他'
      }
    }
  },
  methods: {
    dateShow(dateArray) {
      return `${dateArray[0].split('T')[0]} 至 ${dateArray[1].split('T')[0]}`
    },
    // 读取图片转base64
    parseBase64(url) {
      const fs = require('fs')

      return new Promise((resolve, reject) => {
        fs.readFile(url, (err, data) => {
          if (err) {
            reject(new Error(err))
            throw err
          }
          resolve(`data:image/jpg;base64,${data.toString('base64')}`)
        })
      })
    }
  },
  mounted() {
    for (let i in this.imgUrl) {
      this.parseBase64(this.imgUrl[i])
        .then(res => {
          this.imgData.push(res)
        })
    }
  }
}
</script>
<style>
.glance-basic-title {
  text-align: left;
}
.box-card {
  margin-bottom: 20px;
}
.glance-list {
  list-style: none;
  user-select: none;
}
.glance-item {
  text-align: left;
  float: left;
  width: 300px;
  margin-bottom: 20px;
}
.glance-item.nolimit {
  width: 100%;
  position: static;
}
.glance-ite-label {
  color: #409EFF;
}
.glance-ite-label::after {
  content: '：';
}
.glance-item-content {
  color: #606266;
}
.glance-ite-tag {
  margin-right: 10px;
}
.glance-ite-content-btn {
  margin-left: 20px;
}
</style>
