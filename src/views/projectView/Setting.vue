<template>
  <div class="setting-wrap">
    <el-tabs v-model="pageState">
      <el-tab-pane label="修改项目信息" name="1">
        <el-form class="new_project_form" ref="newPForm" :model="basicData" label-width="150px">
          <!-- TODO 请输入项目名 -->
          <el-form-item label="项目名称">
            <el-input v-model="basicData.projectName" prefix-icon="el-icon-takeaway-box"></el-input>
          </el-form-item>
          <!-- TODO 请输入项目作者 -->
          <el-form-item label="项目作者">
            <el-input v-model="basicData.author" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <!-- TODO 请输入项目日期 -->
          <el-form-item label="项目日期">
            <el-date-picker
              v-model="basicData.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <!-- TODO 请输入项目单位 -->
          <el-form-item label="项目单位">
            <el-input v-model="basicData.organization" prefix-icon="el-icon-s-home"></el-input>
          </el-form-item>
          <!-- TODO 请输入项目地址 -->
          <el-form-item label="项目地址">
            <el-input v-model="basicData.address" prefix-icon="el-icon-position"></el-input>
          </el-form-item>
          <!-- TODO 探测方式 单选 航空、地面 -->
          <el-form-item label="探测方式">
            <el-radio v-model="basicData.detectMethod" label="1"><i class="el-icon-truck"></i>地面</el-radio>
            <el-radio v-model="basicData.detectMethod" label="2"><i class="el-icon-s-promotion"></i>航空</el-radio>
            <el-radio v-model="basicData.detectMethod" label="3"><i class="el-icon-ship"></i>水面</el-radio>
          </el-form-item>
          <!-- TODO 探测目标 多选 地雷、炮弹、简易爆炸装置、集束炸弹 -->
          <el-form-item label="探测目标">
            <el-checkbox-group v-model="basicData.detectObjects">
              <el-checkbox label="1">地雷</el-checkbox>
              <el-checkbox label="2">炮弹</el-checkbox>
              <el-checkbox label="3">简易爆炸装置</el-checkbox>
              <el-checkbox label="4">集束炸弹</el-checkbox>
              <el-checkbox label="5">其他</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- TODO 请输入项目简介 -->
          <el-form-item label="项目简介">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="basicData.description">
            </el-input>
          </el-form-item>
          <!-- TODO 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改数据" name="2">修改数据</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'setting',
  props: {
    basicData: {
      type: Object,
      default () {
        return {
          projectName: '',
          author: '',
          dateRange: '',
          organization: '',
          address: '',
          detectMethod: '', // 探测方式 1-地面 2-航空
          detectObjects: [],
          description: '' // 项目描述
        }
      }
    }
  },
  data() {
    return {
      pageState: '1'
    }
  },
  methods: {
    onSubmit() {
      this.$message.success('修改成功！')
    }
  }
}
</script>
<style>
.setting-header {
  text-align: left;
}
</style>
