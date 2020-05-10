<template>
  <div class="mapView-wrap">
    <el-card class="box-card">
      <div slot="header" class="glance-basic-title">
        <span>测试区域</span>
      </div>
      <div class="clearfix">
        <div class="inversion-card-content-box">
          <span class="inversion-label">
            <i class="el-icon-s-help"></i>测量区域
          </span>
          <span class="inversion-content" v-text="`${3}个`"></span>
        </div>
        <div class="inversion-card-content-box">
          <span class="inversion-label">
            <i class="el-icon-s-grid"></i>测量区域总面积
          </span>
          <span class="inversion-content">2316 m <sup>2</sup></span>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 地图组件 -->
      <el-amap
        ref="map"
        vid="amapDemo"
        :amap-manager="AmapManager"
        :center="center"
        :zoom="zoom"
        :plugin="plugin"
        :events="events"
        class="amap-mapView"
      >
        <el-amap-polygon
          v-for="(polygon, index) in data.polygons"
          :key="index"
          :vid="index"
          :ref="`polygon_${index}`"
          :path="polygon.path"
          :draggable="polygon.draggable"
          :events="polygon.events"
          :fillOpacity="1"
        ></el-amap-polygon>
      </el-amap>
    </el-card>
  </div>
</template>
<script>
import Amap from 'vue-amap'
// import { AmapManager, GeometryUtil } from 'vue-amap'

export default {
  name: 'mapView',
  props: {
    data: {
      type: Object,
      default() {
        return {
          center: [104.1542, 30.685031],
          polygons: [
            {
              draggable: false,
              path: [
                [104.153865, 30.685963],
                [104.154176, 30.685935],
                [104.154256, 30.685681],
                [104.153892, 30.685635]
              ],
              events: {
                click: () => {
                  console.log(this.$refs.map)
                }
              }
            },
            {
              draggable: false,
              path: [
                [104.153892, 30.685419],
                [104.154246, 30.685432],
                [104.154278, 30.685312],
                [104.153897, 30.685294]
              ],
              events: {
                click: () => {
                  console.log(this.$refs.map.$$getInstance())
                }
              }
            },
            {
              draggable: false,
              path: [
                [104.154079, 30.685225],
                [104.154294, 30.685206],
                [104.154283, 30.685087],
                [104.154058, 30.685049]
              ],
              events: {
                click: () => {
                  console.log(this.$refs.map.$$getInstance())
                }
              }
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      // 高德地图组件
      AmapManager: Amap.AmapManager,
      zoom: 100,
      center: this.data.center,
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
          console.log(e)
        }
      },
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          defaultType: 1,
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
.amap-mapView.el-vue-amap-container {
  height: 600px;
}
</style>
