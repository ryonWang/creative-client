<template>
  <div class="aiVideoList">
    <!-- 搜索区域 -->
    <div class="aiVideoList-search">
      <el-form :model="searchForm" label-width="100px" class="form-box" inline>
        <el-form-item label="任务标题">
          <el-input 
            v-model="searchForm.title"
            placeholder="请输入任务标题"
            clearable
          />
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" size="mini" class="search-btn" @click="handleSearch">查询</el-button>
        <el-button size="mini" class="reset-btn" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="aiVideoList-operate">
      <span class="operate-btn" @click="handleCreate">素材混剪</span>
    </div>

    <!-- 表格区域 -->
    <div class="aiVideoList-content">
      <el-table
        :data="tableData"
        class="customTable"
        border
      >
        <el-table-column prop="title" label="任务标题" width="210" />
        <el-table-column prop="dubbing" label="配音" width="130" />
        <el-table-column prop="music" label="音乐" width="239" />
        <el-table-column prop="ratio" label="画面比例" width="87" />
        <el-table-column prop="count" label="生成数量" width="87" />
        <el-table-column prop="coins" label="消耗金币" width="87" />
        <el-table-column prop="createTime" label="创建时间" width="185" />
        <el-table-column prop="subtitle" label="字幕文案" width="220" />
        <el-table-column label="操作" fixed="right" width="141">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="aiVideoList-footer">
      <el-pagination
        :current-page="page.current"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="page.size"
        :total="page.total"
        background
        layout="total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AiMixing',
  data() {
    return {
      searchForm: {
        title: ''
      },
      tableData: [],
      page: {
        current: 1,
        size: 20,
        total: 0
      }
    }
  },
  methods: {
    handleSearch() {
      // 实现搜索逻辑
    },
    handleReset() {
      this.searchForm = {
        title: ''
      }
      this.getList()
    },
    handleCreate() {
      this.$router.push('/home/contentProduction/aiMixing/create')
    },
    handleEdit(row) {
      // 实现编辑逻辑
    },
    handleDelete(row) {
      // 实现删除逻辑
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
      // 获取列表数据
    }
  }
}
</script>

<style lang="scss" scoped>
.aiVideoList {
  padding: 20px;

  &-search {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    .form-box {
      flex: 1;
    }

    .btn-box {
      margin-left: 20px;
    }
  }

  &-operate {
    margin-bottom: 20px;

    .operate-btn {
      cursor: pointer;
      color: #2656F8;
      
      &:hover {
        opacity: 0.8;
      }
    }
  }

  &-content {
    margin-bottom: 20px;
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style> 