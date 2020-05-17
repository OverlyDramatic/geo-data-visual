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
          <span class="inversion-content">
            2316 m
            <sup>2</sup>
          </span>
        </div>
      </div>
      <el-divider></el-divider>
      <ul class="mapList">
        <li
          v-for="(item, index) in area"
          :key="index + item.name">
          <div class="map-title">{{(index+1) + ' ' + item.name}}</div>
          <span class="map-label">
            <i class="el-icon-menu"></i>
            测量区域面积
          </span>
          <span class="map-content">
            {{ item.area }}m
            <sup>2</sup>
          </span>
          <div
            v-for="(point, index) in item.mainPoint"
            :key="`single_point${index}`">
            <span class="map-label">
              <i class="el-icon-full-screen"></i>
              主要反演结果坐标
            </span>
            <span
              class="map-content"
              v-text="`N: ${point[1]}, E: ${point[0]}`">
            </span>
          </div>
        </li>
      </ul>
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
          :key="index + '_' + index"
          :vid="index"
          :ref="`polygon_${index}`"
          :path="polygon.path"
          :draggable="polygon.draggable"
          :events="polygon.events"
          :fillOpacity="1"
        ></el-amap-polygon>
        <el-amap-text
          v-for="(text, index) in data.texts"
          :key="text + '=' + index"
          :text="text.text"
          :offset="text.offset"
          :position="text.position"
          :events="text.events"
        ></el-amap-text>
        <el-amap-circle
          v-for="(circle, index) in data.circles"
          :key="`circle_${index}`"
          :center="circle.center"
          :radius="circle.radius"
          :strokeColor="'#f00'"
          :fill-opacity="circle.fillOpacity"></el-amap-circle>
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
          center: [104.154128, 30.685465],
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
                  console.log(this.$refs.map.$$getCenter())
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
                  console.log(this.$refs.map.$$getCenter())
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
                  console.log(this.$refs.map.$$getCenter())
                }
              }
            }
          ],
          texts: [
            {
              position: [104.154256, 30.685681],
              text: '1',
              offset: [0, 0],
              events: {
                click: () => {
                  alert('click text')
                }
              }
            },
            {
              position: [104.154278, 30.685312],
              text: '2',
              offset: [0, 0],
              events: {
                click: () => {
                  alert('click text')
                }
              }
            },
            {
              position: [104.154283, 30.685087],
              text: '3',
              offset: [0, 0],
              events: {
                click: () => {
                  alert('click text')
                }
              }
            }
          ],
          circles: [
            {
              center: [104.1540205, 30.685776],
              radius: 1,
              fillOpacity: 0.5
            },
            {
              center: [104.1540315, 30.68579],
              radius: 1,
              fillOpacity: 0.5
            },
            {
              center: [104.15406, 30.68579],
              radius: 2,
              fillOpacity: 0.5
            },
            {
              center: [104.15408, 30.68579],
              radius: 2,
              fillOpacity: 0.5
            },
            // ---
            {
              center: [104.1540205, 30.685359],
              radius: 2,
              fillOpacity: 0.5
            },
            {
              center: [104.1540211, 30.685379],
              radius: 2,
              fillOpacity: 0.5
            },
            {
              center: [104.154131, 30.685379],
              radius: 2,
              fillOpacity: 0.5
            },
            {
              center: [104.154151, 30.685379],
              radius: 2,
              fillOpacity: 0.5
            },
            // ---
            {
              center: [104.154139, 30.68515],
              radius: 2,
              fillOpacity: 0.5
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
      ],
      area: [
        {
          name: '空地1地图数据',
          area: '1351',
          mainPoint: [
            [104.15406, 30.68579]
          ]
        },
        {
          name: '空地2地图数据',
          area: '576',
          mainPoint: [
            [104.1540205, 30.685359],
            [104.154181, 30.685379]
          ]
        },
        {
          name: '空地3地图数据',
          area: '389',
          mainPoint: [
            [104.154139, 30.68515]
          ]
        }
      ]
    }
  }
}
</script>
<style>
.mapView-wrap {
  user-select: none;
}
.amap-mapView.el-vue-amap-container {
  height: 400px;
}
.mapList {
  list-style: none;
  text-align: left;
}
.map-title {
  color: #409eff;
  padding-top: 10px;
  padding-bottom: 10px;
}
.map-label{
  padding-left: 20px;
}
.map-label::after {
  content: '：';
}
.map-content {
  color: #e6a23c;
}
</style>
