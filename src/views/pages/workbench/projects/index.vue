<template>
  <section
    class="ant-layout"
    style="margin-left: 20px; padding-top: 20px; height: 100vh"
  >
    <main
      class="ant-layout-content site-layout-background"
    >
      <section
        class="ant-layout ant-layout-has-sider manage-layout container-layout__wrapper"
      >
        <aside
          class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out"
          style="
            flex: 0 0 200px;
            max-width: 200px;
            min-width: 200px;
            width: 200px;
            border-radius: 8px;
            overflow: hidden;
          "
        >
          <div class="left-menu">
            <div class="menu-main-title__container" style="border-radius: 8px 8px 0 0;">
              <span>项目库</span>
            </div>
            <div class="tree-menu__container">
              <el-tree
                :data="treeData"
                :current-node-key="selectedKeys"
                @node-click="onSelect"
                :props="defaultProps"
              >
                <template #default="{ node, data }">
                  <div class="tree-menu__node" :class="{ root: data.key === 'my-projects' || data.key === 'shared-projects' }">
                    <span class="menu-title text-overflow-hidden">{{ node.label }}</span>
                    <span class="suffix-icon" v-if="data.key === 'my-projects'">
                      <i class="el-icon-plus" style="font-size: 18px" @click.stop="showCreateModal"></i>
                    </span>
                  </div>
                </template>
              </el-tree>
            </div>
          </div>
        </aside>
        <main
          class="ant-layout-content site-layout-background ease-in-out" style="border-radius: 8px"
        >
          <div class="manage-projects-box">
            <div class="projects-box">
              <div style="padding: 0px 24px 0px 12px">
                <div class="projects-title-box">
                  <div class="projects-title">{{ currentTitle }}</div>
                </div>
                <el-divider></el-divider>
              </div>
              <div class="manage-projects-content">
                <div
                  class="projects-item-create-card marginb20"
                  style="width: 311px; height: 311px"
                  v-if="showCreateCard"
                  @click="showCreateModal"
                >
                  <div class="projects-item-create">
                    <i class="el-icon-plus upload-icon"></i>
                    <p class="create-text">创建项目</p>
                  </div>
                </div>
                <project-card
                  v-for="project in projectList"
                  :key="project.id"
                  :project="project"
                  @click="goToProject(project)"
                />
              </div>
            </div>
          </div>
        </main>
      </section>
    </main>

    <el-dialog
      title="创建项目"
      :visible.sync="createModalVisible"
      @close="createModalVisible = false"
    >
      <el-form :model="formState" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="formState.projectName" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        
        <el-form-item label="项目描述" prop="description">
          <el-input type="textarea" v-model="formState.projectDescription" placeholder="请输入项目描述"></el-input>
        </el-form-item>

        <el-form-item label="项目分类" prop="category">
          <el-select v-model="formState.category" placeholder="请选择项目分类">
            <el-option label="默认分类" :value="0"></el-option>
            <el-option label="工作" :value="1"></el-option>
            <el-option label="个人" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateProject">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'ProjectIndex',
  components: {
    ProjectCard: () => import('./components/ProjectCard.vue')
  },

  data() {
    return {
      createModalVisible: false,
      formState: {
        projectName: '',
        projectDescription: '',
        category: 0
      },
      rules: {
        projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        projectDescription: [{ required: true, message: '请输入项目描', trigger: 'blur' }],
        category: [{ required: true, message: '请选择项目分类', trigger: 'change' }]
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      treeData: [
        {
          title: '我的项目',
          key: 'my-projects',
          children: [
            { title: '默认分类', key: '0' },
            { title: '工作', key: '1' },
            { title: '个人', key: '2' }
          ]
        },
        {
          title: '参与项目',
          key: 'shared-projects'
        }
      ],
      selectedKeys: 'my-projects',
      currentTitle: '我的项目',
      showCreateCard: true,
      projectList: [
        {
          id: 1,
          projectName: '示例项目',
          projectDescription: '这是一个示例项目描述',
          category: '默认分类',
          createTime: '2024-03-21'
        }
      ]
    }
  },
  created() {
      this.handleLoadingProject();
    },

  methods: {
    handleCreateProject() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          try {
            // 创建新项目
            const addRes = await this.$api.post('/module/projectInfo/add', this.formState)
            
            if (addRes.data) {
              // 提示创建成功
              this.$message.success('项目创建成功')
              // 获取最新项目列表
              this.handleLoadingProject()
              // 关闭创建弹窗
              this.createModalVisible = false
            } else {
              this.$message.error('项目创建失败')
            }
            
          } catch(err) {
            this.$message.error('创建项目失败:' + err.message)
          }
        }
      })
    },

    showCreateModal() {
      this.createModalVisible = true
    },

    onSelect(data) {
      this.selectedKeys = data.key
      this.currentTitle = data.title
      this.showCreateCard = data.key === 'my-projects'
    },

    goToProject(project) {
      this.$router.push({
        path: `/workbench/projects/subProject/${project.id}`,
        query: { 
          name: project.projectName,
          description: project.projectDescription,
          category: project.category
        }
      })
    },
    handleLoadingProject() {
      this.$api.get("/module/projectInfo/list").then(res => {
        this.projectList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu {
  height: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  
  .menu-main-title__container {
    padding: 16px;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    color: #1f2937;
  }
}

.projects-item-create-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    border-color: #1890ff;
  }

  .projects-item-create {
    text-align: center;
    
    .upload-icon {
      font-size: 48px;
      color: #999;
    }

    .create-text {
      margin-top: 16px;
      color: #666;
    }
  }
}

.manage-projects-content {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.tree-menu__node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
  
  &.root {
    font-weight: 500;
  }

  .menu-title {
    flex: 1;
    color: #4b5563;
  }

  .suffix-icon {
    opacity: 0;
    transition: opacity 0.3s;
    
    &:hover {
      color: #409EFF;
    }
  }

  &:hover {
    .suffix-icon {
      opacity: 1;
    }
    .menu-title {
      color: #409EFF;
    }
  }
}

:deep(.el-tree-node__content) {
  height: 40px;
  
  &:hover {
    background-color: transparent;
  }
}

.text-overflow-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.divider-line {
  margin: 12px 0;
}

.ant-layout-content.site-layout-background {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  min-height: calc(100vh - 64px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  
  .projects-title-box {
    padding: 16px 0;
    
    .projects-title {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      position: relative;
      padding-left: 12px;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 20px;
        background: #409EFF;
        border-radius: 2px;
      }
    }
  }
}

.manage-projects-content {
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  align-items: start;
  background: #fafafa;
  border-radius: 8px;
  
  .projects-item-create-card {
    height: 320px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 24px;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border-color: #e6e6e6;
      
      .upload-icon {
        color: #409EFF;
        transform: scale(1.1);
      }
      
      .create-text {
        color: #409EFF;
      }
    }

    .projects-item-create {
      text-align: center;
      
      .upload-icon {
        font-size: 56px;
        color: #a3a3a3;
        transition: all 0.3s ease;
      }

      .create-text {
        margin-top: 16px;
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
        transition: color 0.3s ease;
      }
    }
  }
}

:deep(.project-card) {
  height: 320px;
  margin: 0 !important;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

:deep(.el-divider) {
  background-color: #f0f0f0;
}
</style>
