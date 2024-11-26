<template>
  <div class="project-card" @click="$emit('click')">
    <div class="project-info">
      <div class="project-header">
        <h3 class="project-name">{{ project.projectName }}</h3>
        <el-tag size="small" class="project-status">进行中</el-tag>
      </div>
      
      <div class="project-content">
        <div class="project-icon">
          <i class="el-icon-folder"></i>
        </div>
        <div class="project-stats">
          <div class="stat-item">
            <i class="el-icon-document"></i>
            <span>文件: 0</span>
          </div>
          <div class="stat-item">
            <i class="el-icon-time"></i>
            <span>更新: {{ project.createTime }}</span>
          </div>
        </div>
        <p class="project-description">{{ project.projectDescription }}</p>
      </div>

      <div class="project-footer">
        <div class="project-tags">
          <el-tag size="small" type="info">{{ getCategoryText(project.category) }}</el-tag>
          <el-tag size="small" type="success">可编辑</el-tag>
        </div>
        <div class="project-members">
          <el-tooltip content="项目创建者" placement="top">
            <i class="el-icon-user-solid">{{ project.userId }}</i>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCategoryText(category) {
      const categoryMap = {
        0: '默认分类',
        1: '工作',
        2: '个人'
      }
      return categoryMap[Number(category)] || '默认分类'
    }
  }
}
</script>

<style lang="scss" scoped>
.project-card {
  width: 100%;
  height: 320px;
  padding: 24px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .project-icon {
      i {
        color: #409EFF;
        transform: scale(1.1);
      }
    }
  }

  .project-info {
    height: 100%;
    display: flex;
    flex-direction: column;

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .project-name {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
        margin: 0;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .project-status {
        margin-left: 12px;
        background-color: #e1f3d8;
        border-color: #e1f3d8;
        color: #67c23a;
      }
    }

    .project-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;

      .project-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #f5f7fa;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        transition: all 0.3s ease;

        i {
          font-size: 40px;
          color: #909399;
          transition: all 0.3s ease;
        }
      }

      .project-stats {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 16px;

        .stat-item {
          display: flex;
          align-items: center;
          color: #606266;
          font-size: 13px;

          i {
            margin-right: 4px;
            font-size: 14px;
            color: #909399;
          }
        }
      }

      .project-description {
        color: #606266;
        font-size: 14px;
        line-height: 1.6;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 0;
        padding: 0 10px;
      }
    }

    .project-footer {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #ebeef5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .project-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        .el-tag {
          &:first-child {
            background-color: #ecf5ff;
            border-color: #d9ecff;
            color: #409EFF;
          }
        }
      }

      .project-members {
        display: flex;
        align-items: center;
        
        i {
          font-size: 16px;
          color: #409EFF;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style> 