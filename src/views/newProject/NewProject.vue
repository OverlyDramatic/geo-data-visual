<template>
  <div class="new_project_wrap">
    <h1>新建工程</h1>
    <form class="new_project_form" action>
      <!-- TODO 请输入项目名 -->
      <!-- TODO 请输入项目作者 -->
      <!-- TODO 请输入项目单位 -->
      <!-- TODO 请输入项目地址 -->
      <!-- TODO 请输入项目时间 -->
      <!-- TODO 请输入项目简介 -->
    </form>
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
    ></el-amap>
  </div>
</template>
<script>
import { amapManager } from 'vue-amap'

export default {
  name: 'newProject',
  data() {
    return {
      // * 表单数据
      formData: {
        projectName: ''
      },
      // 高德地图组件
      amapManager,
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
  }
}
</script>
<style>
.amap-demo.el-vue-amap-container {
  height: 600px;
}
</style>
