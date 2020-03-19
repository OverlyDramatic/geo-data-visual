<template>
  <div class="new_project_wrap">
    <h1>新建工程</h1>
    <el-form class="new_project_form" ref="newPForm" :model="formData" label-width="150px">
      <!-- TODO 请输入项目名 -->
      <el-form-item label="项目名称">
        <el-input v-model="formData.projectName" prefix-icon="el-icon-takeaway-box"></el-input>
      </el-form-item>
      <!-- TODO 请输入项目作者 -->
      <el-form-item label="项目作者">
        <el-input v-model="formData.author" prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <!-- TODO 请输入项目日期 -->
      <el-form-item label="项目日期">
        <el-date-picker
          v-model="formData.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- TODO 请输入项目单位 -->
      <el-form-item label="项目单位">
        <el-input v-model="formData.organization" prefix-icon="el-icon-s-home"></el-input>
      </el-form-item>
      <!-- TODO 请输入项目地址 -->
      <el-form-item label="项目地址">
        <el-input v-model="formData.organization" prefix-icon="el-icon-s-home"></el-input>
      </el-form-item>
      <!-- TODO 探测方式 -->
      <!-- TODO 探测目标 -->
      <!-- TODO 请输入项目简介 -->
    </el-form>
    <!-- 地图组件 -->
    <el-amap
      v-if="false"
      ref="map"
      vid="amapDemo"
      :amap-manager="AmapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
    ></el-amap>
  </div>
</template>
<script>
import { AmapManager } from 'vue-amap'

export default {
  name: 'newProject',
  data() {
    return {
      // * 表单数据
      formData: {
        projectName: '',
        author: '',
        dateRange: '',
        organization: ''
      },
      // 高德地图组件
      AmapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        init: o => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          alert('map clicked')
        }
      },
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
              console.log(o)
            }
          }
        }
      ]
    }
  },
  methods: {
    getDistrict(param) {
      const { getDistrict } = require('../../api/district.js')
      getDistrict(param)
    }
  },
  mounted() {
    this.getDistrict()
  }
}
</script>
<style>
.amap-demo.el-vue-amap-container {
  height: 600px;
}
.el-form-item__content {
  width: 350px;
}
.new_project_form {
  width: 600px;
  margin: 0 auto;
  border: 1px solid #dcdfe6;
  padding: 40px 20px 20px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
