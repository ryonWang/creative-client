<template>
    <div class="sub-project">
      <div class="project-header">
        <h1>{{ projectName }}</h1>
        <p>{{ projectDescription }}</p>
        <el-tag>{{ getCategoryText(projectCategory) }}</el-tag>
      </div>
      
      <div class="project-content">
        <!-- 项目内容区域 -->
        <div class="empty-content" v-if="!hasContent">
          <el-empty description="暂无内容">
            <template #default>
              <el-button type="primary" @click="addContent">
                添加内容
              </el-button>
            </template>
          </el-empty>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SubProject',
    data() {
      return {
        projectName: '',
        projectDescription: '',
        projectCategory: 0,
        hasContent: false
      }
    },
    
    created() {
      // 从 query 中获取数据
      const { name, description, category } = this.$route.query
      this.projectName = name || '新项目'
      this.projectDescription = description || ''
      this.projectCategory = Number(category || 0)
    },

    methods: {
      getCategoryText(category) {
        const categoryMap = {
          0: '默认分类',
          1: '工作',
          2: '个人'
        }
        return categoryMap[Number(category)] || '默认分类'
      },
      addContent() {
        // 处理添加内容的逻辑
        this.hasContent = true
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .sub-project {
    padding: 24px;
  
    .project-header {
      margin-bottom: 24px;
      
      h1 {
        margin-bottom: 8px;
      }
      
      p {
        color: #666;
        margin-bottom: 8px;
      }
    }
  
    .project-content {
      background: #fff;
      min-height: 400px;
      padding: 24px;
      border-radius: 4px;
  
      .empty-content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 300px;
      }
    }
  }
  </style>