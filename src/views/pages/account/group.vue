<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <div class="search-wrapper">
      <div class="search">
        <el-form :model="searchForm" label-width="100px" class="form-box" inline>
          <el-form-item label="所属平台">
            <el-select v-model="searchForm.platformType" placeholder="请选择" style="width: 200px">
              <el-option label="抖音" value="douyin" />
              <el-option label="快手" value="kuaishou" />
            </el-select>
          </el-form-item>

          <el-form-item label="分组名称">
            <el-input 
              v-model="searchForm.name"
              placeholder="请输入分组名称"
              style="width: 200px"
            />
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
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="operate">
      <span class="operate-btn" @click="handleCreateGroup">新建分组</span>
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
          <el-table-column prop="platform" label="所属平台" width="228" />
          <el-table-column prop="name" label="分组名称" width="227" />
          <el-table-column prop="accountCount" label="账号数" width="227" />
          <el-table-column prop="createTime" label="创建时间" width="227" />
          <el-table-column prop="updateTime" label="修改时间" width="227" />
          <el-table-column label="操作" width="250" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEditName(scope.row)">修改分组名</el-button>
              <el-button type="text" @click="handleTransfer(scope.row)">转移分组</el-button>
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

    <!-- 修改分组名弹窗 -->
    <el-dialog
      title="修改分组名"
      :visible.sync="dialogVisible.editName"
      width="560px"
    >
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="分组名称">
          <el-input v-model="editForm.name" placeholder="请输入分组名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="confirmEditName">确定</el-button>
        <el-button @click="dialogVisible.editName = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 转移分组弹窗 -->
    <el-dialog
      title="转移分组"
      :visible.sync="dialogVisible.transfer"
      width="560px"
    >
      <el-form :model="transferForm" label-width="100px">
        <el-form-item label="目标分组">
          <el-select v-model="transferForm.targetGroup" placeholder="请选择目标分组">
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="confirmTransfer">确定</el-button>
        <el-button @click="dialogVisible.transfer = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountGroup',
  
  data() {
    return {
      searchForm: {
        platformType: '',
        name: ''
      },
      
      tableData: [
        {
          platform: '抖音',
          name: '默认分组',
          accountCount: 0,
          createTime: '2024-11-16 20:59:13',
          updateTime: '2024-11-16 20:59:13'
        },
        {
          platform: '快手',
          name: '默认分组',
          accountCount: 0,
          createTime: '2024-11-16 20:59:13',
          updateTime: '2024-11-16 20:59:13'
        }
      ],
      
      page: {
        current: 1,
        size: 20,
        total: 2
      },

      dialogVisible: {
        editName: false,
        transfer: false
      },

      editForm: {
        name: ''
      },

      transferForm: {
        targetGroup: ''
      },

      groupOptions: [
        { value: '1', label: '分组1' },
        { value: '2', label: '分组2' }
      ]
    }
  },

  methods: {
    handleSearch() {
      // 查询处理
    },

    handleReset() {
      this.searchForm = {
        platformType: '',
        name: ''
      }
    },

    handleCreateGroup() {
      // 新建分组处理
    },

    handleEditName(row) {
      this.editForm.name = row.name
      this.dialogVisible.editName = true
    },

    handleTransfer(row) {
      this.dialogVisible.transfer = true
    },

    handleDelete(row) {
      this.$confirm('确认删除该分组?', '提示', {
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

    confirmEditName() {
      // 确认修改分组名
      this.dialogVisible.editName = false
    },

    confirmTransfer() {
      // 确认转移分组
      this.dialogVisible.transfer = false
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