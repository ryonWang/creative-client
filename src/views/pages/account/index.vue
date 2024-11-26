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

          <el-form-item label="账号分组">
            <el-select v-model="searchForm.groupId" placeholder="请选择" style="width: 200px">
              <el-option label="全部" value="" />
            </el-select>
          </el-form-item>

          <el-form-item label="账号名称">
            <el-input 
              v-model="searchForm.nickname"
              placeholder="请输入账号名称"
              style="width: 200px"
            />
          </el-form-item>

          <el-form-item label="授权状态">
            <el-checkbox-group v-model="searchForm.accreditStatus">
              <el-checkbox label="1">已授权</el-checkbox>
              <el-checkbox label="2">已失效</el-checkbox>
              <el-checkbox label="3">已取消</el-checkbox>
            </el-checkbox-group>
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
      <span class="operate-btn" @click="handleBatchAuth">批量授权</span>
      <span class="operate-btn" @click="handleSingleAuth">单个授权</span>
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
          <el-table-column label="序号" width="80" />
          <el-table-column label="所属平台" width="80" />
          <el-table-column label="账号名称" width="200" />
          <el-table-column label="授权状态" width="100" />
          <el-table-column label="所属分组" width="220" />
          <el-table-column label="默认POI地址" width="260" />
          <el-table-column label="授权时间" width="160" sortable />
          <el-table-column label="授权到期时间" width="160" />
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
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

    <!-- 弹窗组件 -->
    <edit-group-dialog 
      :visible.sync="dialogVisible.editGroup"
      @confirm="handleEditGroupConfirm"
    />

    <single-invite-dialog
      :visible.sync="dialogVisible.singleInvite"
      @confirm="handleSingleInviteConfirm"
    />
  </div>
</template>

<script>
import SingleInviteDialog from './components/SingleInviteDialog.vue'
import EditGroupDialog from './components/EditGroupDialog.vue'

export default {
  name: 'AccountAuth',
  
  components: {
    SingleInviteDialog,
    EditGroupDialog
  },

  data() {
    return {
      searchForm: {
        platformType: '',
        groupId: '',
        nickname: '',
        accreditStatus: []
      },
      
      tableData: [],
      
      page: {
        current: 1,
        size: 20,
        total: 0
      },

      dialogVisible: {
        editGroup: false,
        singleInvite: false
      }
    }
  },

  methods: {
    handleSearch() {
      // 查询处理
    },

    handleReset() {
      this.searchForm = {
        platformType: '',
        groupId: '',
        nickname: '',
        accreditStatus: []
      }
    },

    handleBatchAuth() {
      // 批量授权处理
    },

    handleSingleAuth() {
      this.dialogVisible.singleInvite = true
    },

    handleEdit(row) {
      this.dialogVisible.editGroup = true
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
    },

    handleSingleInviteConfirm(platform) {
      console.log('选择的平台:', platform)
      // 处理平台选择后的逻辑
    },

    handleEditGroupConfirm(formData) {
      console.log('编辑分组表单数据:', formData)
      // 处理编辑分组后的逻辑
    }
  }
}
</script>

<style lang="scss" scoped>
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

          .el-checkbox-group {
            display: flex;
            gap: 16px;

            .el-checkbox {
              margin-right: 0;
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

      // 自定义表格样式
      ::v-deep .el-table {
        // 表头样式
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

        // 表格内容
        td {
          padding: 12px 0;
          height: 60px;
        }

        // 鼠标悬浮行
        tr:hover > td {
          background-color: #f5f7fa;
        }

        // 表格边框
        &::before {
          display: none;
        }

        // 操作按钮
        .el-button--text {
          padding: 0 8px;
          font-size: 13px;
          color: #2656F8;

          &:hover {
            color: #4070ff;
          }
        }

        // 分割线
        .el-table__fixed-right::before {
          background-color: #EBEEF5;
        }
      }
    }
  }

  // 分页区域样式优化
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
    