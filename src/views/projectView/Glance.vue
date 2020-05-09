<template>
  <div class="glance-wrap">
    <el-card class="box-card">
      <div slot="header" class="glance-basic-title">
        <span>基本信息</span>
      </div>
      <!-- 项目名称 -->
      <ul class="glance-list clearfix" v-if="glanceData.basicInfo">
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
      </ul>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="glance-basic-title">
        <span>反演信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="glance-basic-title">
        <span>地图信息</span>
      </div>
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
  width: 305px;
  margin-bottom: 20px;
}
.glance-item.nolimit {
  width: auto;
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
</style>
