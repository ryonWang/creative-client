<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <div class="search-wrapper">
      <div class="search">
        <el-form :model="searchForm" label-width="100px" class="form-box" inline>
          <el-form-item label="任务标题">
            <el-input 
              v-model="searchForm.taskName"
              placeholder="请输入任务标题"
              style="width: 200px"
            />
          </el-form-item>

          <el-form-item label="分发平台">
            <el-select v-model="searchForm.platformType" placeholder="请选择" style="width: 200px">
              <el-option label="抖音" value="douyin" />
              <el-option label="快手" value="kuaishou" />
            </el-select>
          </el-form-item>

          <el-form-item label="分发方式">
            <el-select v-model="searchForm.taskType" placeholder="请选择" style="width: 200px">
              <el-option label="矩阵" value="matrix" />
              <el-option label="扫码" value="scan" />
            </el-select>
          </el-form-item>
        </el-form>

        <div class="btn-box">
          <el-button type="primary" size="mini" class="search-btn" @click="handleSearch">
            <i class="el-icon-search"></i>
            查询
          </el-button>
          <el-button size="mini" class="reset-btn" @click="handleReset">
            <i class="el-icon-refresh"></i>
            重置
          </el-button>
          <el-button size="mini" class="reset-btn" @click="handleDownload">
            <i class="el-icon-download"></i>
            下载
          </el-button>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="operate">
      <span class="operate-btn" @click="handleCreateMatrix">新建矩阵分发</span>
      <span class="operate-btn" @click="handleCreateScan">新建扫码分发</span>
    </div>

    <!-- 表格区域 -->
    <div class="content-wrapper">
      <div class="content">
        <el-table
          :data="tableData"
          class="customTable"
          border
          style="width: 100%"
        >
          <el-table-column prop="taskName" label="任务名称" width="190" />
          <el-table-column prop="platform" label="分发渠道" width="80" />
          <el-table-column prop="type" label="分发方式" width="80" />
          <el-table-column prop="accountCount" label="分发账号数" width="100" />
          <el-table-column prop="videoCount" label="分发视频数" width="100" />
          <el-table-column prop="progress" label="分发进度" width="80" />
          <el-table-column prop="startTime" label="分发开始时间" width="170" />
          <el-table-column prop="scanCount" label="已扫码人数" width="100" />
          <el-table-column prop="location" label="定位" width="200" />
          <el-table-column prop="playCount" label="总播放量" width="80" />
          <el-table-column prop="commentCount" label="总评论数" width="80" />
          <el-table-column prop="likeCount" label="总点赞数" width="80" />
          <el-table-column prop="shareCount" label="总转发数" width="80" />
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDetail(scope.row)">查看</el-button>
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 分页 -->
    <div class="footer">
      <el-pagination
        :current-page="page.current"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="page.size"
        :total="page.total"
        layout="total, prev, pager, next, sizes, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 抽屉组件 -->
    <el-drawer
      title="已分发账号明细"
      :visible.sync="drawer.detail"
      direction="rtl"
      size="996px"
      class="detail-drawer"
    >
      <!-- 明细内容 -->
    </el-drawer>

    <el-drawer
      :title="drawer.create.title"
      :visible.sync="drawer.create.visible"
      direction="rtl"
      size="853px"
      class="create-drawer"
    >
      <!-- 创建表单 -->
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'MatrixTask',
  
  data() {
    return {
      searchForm: {
        taskName: '',
        platformType: '',
        taskType: ''
      },
      
      tableData: [],
      
      page: {
        current: 1,
        size: 20,
        total: 0
      },

      drawer: {
        detail: false,
        create: {
          visible: false,
          title: '新建矩阵分发'
        }
      }
    }
  },

  methods: {
    handleSearch() {
      // 查询处理
    },

    handleReset() {
      this.searchForm = {
        taskName: '',
        platformType: '',
        taskType: ''
      }
    },

    handleDownload() {
      // 下载处理
    },

    handleCreateMatrix() {
      this.drawer.create.title = '新建矩阵分发'
      this.drawer.create.visible = true
    },

    handleCreateScan() {
      this.drawer.create.title = '新建扫码分发'
      this.drawer.create.visible = true
    },

    handleDetail(row) {
      this.drawer.detail = true
    },

    handleEdit(row) {
      // 编辑处理
    },

    handleDelete(row) {
      this.$confirm('确认删除该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除处理
      })
    },

    handleSizeChange(val) {
      this.page.size = val
      this.getList()
    },

    handleCurrentChange(val) {
      this.page.current = val
      this.getList()
    },

    getList() {
      // 获取表格数据
    }
  }
}
</script>

<style lang="scss" scoped>
// 复用 account/index.vue 的样式
.app-container {
  padding: 20px;

  .search-wrapper {
    margin-bottom: 20px;
    
    .search {
      background: #fff;
      padding: 24px 20px;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
      }

      .form-box {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 20px;

        .el-form-item {
          margin-bottom: 0;
          margin-right: 0;

          .el-form-item__label {
            font-weight: 500;
            color: #606266;
          }

          .el-select, .el-input {
            .el-input__inner {
              border-radius: 4px;
              
              &:hover {
                border-color: #c0c4cc;
              }
              
              &:focus {
                border-color: #409EFF;
              }
            }
          }
        }
      }

      .btn-box {
        display: flex;
        justify-content: center;
        gap: 12px;
        padding-top: 4px;
        border-top: 1px solid #f0f0f0;

        .el-button {
          padding: 9px 20px;
          font-size: 13px;
          border-radius: 4px;
          transition: all 0.3s;

          i {
            margin-right: 4px;
          }

          &.search-btn {
            background: #2656F8;
            border-color: #2656F8;

            &:hover {
              background: #4070ff;
              border-color: #4070ff;
            }
          }

          &.reset-btn {
            border-color: #dcdfe6;
            color: #606266;

            &:hover {
              color: #409EFF;
              border-color: #c6e2ff;
              background-color: #ecf5ff;
            }
          }
        }
      }
    }
  }

  .operate {
    margin-bottom: 20px;

    .operate-btn {
      display: inline-block;
      padding: 8px 15px;
      background: #2656F8;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 15px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .content-wrapper {
    margin-bottom: 20px;
    
    .content {
      background: #fff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
      }

      ::v-deep .el-table {
        th {
          background-color: #f5f7fa;
          color: #606266;
          font-weight: 500;
          height: 50px;
          padding: 8px 0;

          &.is-leaf {
            border-bottom: 1px solid #EBEEF5;
          }

          .cell {
            line-height: 34px;
          }
        }

        td {
          padding: 12px 0;
          height: 60px;
        }

        tr:hover > td {
          background-color: #f5f7fa;
        }

        &::before {
          display: none;
        }

        .el-button--text {
          padding: 0 8px;
          font-size: 13px;
          color: #2656F8;

          &:hover {
            color: #4070ff;
          }
        }

        .el-table__fixed-right::before {
          background-color: #EBEEF5;
        }
      }
    }
  }

  .footer {
    margin-top: 20px;
    padding: 16px 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    ::v-deep .el-pagination {
      .btn-prev,
      .btn-next,
      .el-pager li {
        background: transparent;
        border: 1px solid #DCDFE6;
        
        &:hover {
          color: #2656F8;
          border-color: #2656F8;
        }
      }

      .el-pager li.active {
        background-color: #2656F8;
        border-color: #2656F8;
        color: #fff;
      }

      .el-pagination__sizes {
        .el-input__inner {
          border-radius: 4px;
        }
      }
    }
  }
}
</style> 