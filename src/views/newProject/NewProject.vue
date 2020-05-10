<template>
  <div class="new_project_wrap">
    <h1><i class="el-icon-edit"></i>新建工程</h1>
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
        <el-input v-model="formData.address" prefix-icon="el-icon-position"></el-input>
      </el-form-item>
      <!-- TODO 探测方式 单选 航空、地面 -->
      <el-form-item label="探测方式">
        <el-radio v-model="formData.detectMethod" label="1"><i class="el-icon-truck"></i>地面</el-radio>
        <el-radio v-model="formData.detectMethod" label="2"><i class="el-icon-s-promotion"></i>航空</el-radio>
        <el-radio v-model="formData.detectMethod" label="3"><i class="el-icon-ship"></i>水面</el-radio>
      </el-form-item>
      <!-- TODO 探测目标 多选 地雷、炮弹、简易爆炸装置、集束炸弹 -->
      <el-form-item label="探测目标">
        <el-checkbox-group v-model="formData.detectObjects">
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
          v-model="formData.description">
        </el-input>
      </el-form-item>
      <!-- TODO 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'newProject',
  data() {
    return {
      // * 表单数据
      formData: {
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
  },
  methods: {
    // getDistrict(param) {
    //   const { getDistrict } = require('../../api/district.js')
    //   getDistrict(param)
    // },
    onSubmit() {
      if (!this.formData.projectName) {
        this.$message.error('请输入项目名称')
        return
      }
      if (!this.formData.author) {
        this.$message.error('请输入项目作者')
        return
      }
      if (this.formData.dateRange.length !== 2) {
        this.$message.error('请输入项目日期')
        return
      }
      if (!this.formData.organization) {
        this.$message.error('请输入项目单位')
        return
      }
      if (!this.formData.address) {
        this.$message.error('请输入项目地址')
        return
      }
      if (!this.formData.detectMethod) {
        this.$message.error('请选择探测方式')
        return
      }
      if (!this.formData.detectObjects) {
        this.$message.error('请选择探测目标')
        return
      }
      if (!this.formData.description) {
        this.$message.error('请输入项目简介')
        return
      }
      // * 校验成功后创建工程文件，并跳转至工程概览页面
      // 创建工程文件
      const projectId = new Date().getTime()
      const newProject = {
        id: projectId.toString(),
        info: {
          basicInfo: this.formData
        }
      }
      this.createNewP(newProject)
        .then(res => {
          // 跳转目录
          this.$router.push({
            name: 'projectGlance',
            query: {
              path: res.projectName
            }
          })
        }, rej => {
          console.error(rej)
        })
    },
    onCancel() {
      this.$confirm('确认取消新增当前项目？', '取消', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({
            name: 'home'
          })
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    // * 新建工程
    createNewP(newProject) {
      const fs = require('fs')
      const pathJoin = require('path').join
      const baseUrl = require('process').cwd()

      const projectPath = pathJoin(baseUrl, 'data', 'projects', `${newProject.info.basicInfo.projectName}_${newProject.id}`)

      return new Promise(function(resolve, reject) {
        fs.mkdir(projectPath, { recursive: true }, (err) => {
          if (err) {
            reject(new Error('创建工程失败！'))
            throw err
          }
          // * 创建文件
          const projectText = JSON.stringify(newProject)
          const projectName = pathJoin(projectPath, `${newProject.info.basicInfo.projectName}.pjt`)
          fs.writeFile(projectName, projectText, (err) => {
            if (err) {
              reject(new Error('创建工程失败！'))
              throw err
            } else {
              resolve({
                projectName
              })
            }
          })
        })
      })
    }
  }
  // mounted() {
  //   this.getDistrict()
  // }
}
</script>
<style>
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
