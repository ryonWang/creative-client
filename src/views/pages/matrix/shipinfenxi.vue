<template>
  <div class="app-container">
    <!-- 返回按钮 -->
    <div class="back-header">
      <div class="back-btn" @click="handleBack">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>

    <!-- 搜索表单 -->
    <div class="table-search">
      <el-form :inline="true">
        <el-form-item label="所属平台">
          <el-select v-model="searchForm.platformType" placeholder="请选择">
            <el-option label="抖音" value="douyin" />
            <el-option label="快手" value="kuaishou" />
          </el-select>
        </el-form-item>

        <el-form-item label="账号分组">
          <el-select v-model="searchForm.groupId" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="默认分组" value="default" />
          </el-select>
        </el-form-item>

        <el-form-item label="账号">
          <el-autocomplete
            v-model="searchForm.account"
            :fetch-suggestions="querySearch"
            placeholder="请输入账号"
            style="width: 260px; margin: 0 24px 0 10px"
          />
        </el-form-item>

        <el-form-item class="time">
          <span 
            v-for="(item, index) in timeOptions" 
            :key="index"
            :class="['time-item', { active: currentTime === item.value }]"
            @click="handleTimeChange(item.value)"
          >
            {{ item.label }}
          </span>
        </el-form-item>

        <el-form-item label="选择时间段">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <i class="el-icon-search"></i>
            搜索
          </el-button>
          <el-button @click="handleDownload">
            <i class="el-icon-download"></i>
            下载报表
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="table-box">
      <el-table :data="tableData" border class="customTable customTable50">
        <el-table-column prop="account" label="所属账号" width="109" />
        <el-table-column prop="videoLink" label="视频链接" width="200" />
        <el-table-column prop="location" label="定位" width="124" />
        <el-table-column prop="publishTime" label="发布时间" width="187" />
        <el-table-column prop="newPlay" label="新增播放" width="124" sortable />
        <el-table-column prop="newLike" label="新增点赞" width="124" sortable />
        <el-table-column prop="newComment" label="新增评论" width="83" />
        <el-table-column prop="newShare" label="新增转发" width="83" />
        <el-table-column prop="newFavorite" label="新增收藏" width="83" />
        <el-table-column prop="totalPlay" label="总播放量" width="124" sortable />
        <el-table-column 
          prop="avgPlayDuration" 
          label="近30天平均播放时长" 
          width="145" 
          fixed="right"
        />
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="table-footer">
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
  </div>
</template>

<script>
export default {
  name: 'ShiPinFenXi',
  
  data() {
    return {
      searchForm: {
        platformType: 'douyin',
        groupId: '',
        account: ''
      },
      currentTime: '30days',
      dateRange: '',
      timeOptions: [
        { label: '昨日', value: 'yesterday' },
        { label: '最近7天', value: '7days' },
        { label: '最近30天', value: '30days' }
      ],
      tableData: [
        {
          account: '官方账号1',
          videoLink: 'https://v.douyin.com/xxx1',
          location: '西安市',
          publishTime: '2024-01-20 10:00:00',
          newPlay: 12345,
          newLike: 678,
          newComment: 89,
          newShare: 45,
          newFavorite: 123,
          totalPlay: 98765,
          avgPlayDuration: '00:02:30'
        },
        {
          account: '官方账号2',
          videoLink: 'https://v.douyin.com/xxx2',
          location: '北京市',
          publishTime: '2024-01-19 15:30:00',
          newPlay: 23456,
          newLike: 789,
          newComment: 67,
          newShare: 34,
          newFavorite: 234,
          totalPlay: 87654,
          avgPlayDuration: '00:01:45'
        }
      ],
      page: {
        current: 1,
        size: 20,
        total: 2
      }
    }
  },

  methods: {
    handleBack() {
      this.$router.push({
        path: '/home/matrix/analysis',
        query: { 
          from: 'shipinfenxi'
        }
      })
    },

    querySearch(queryString, cb) {
      const suggestions = []
      cb(suggestions)
    },

    handleTimeChange(time) {
      this.currentTime = time
    },

    handleSearch() {
      // 搜索处理
    },

    handleDownload() {
      // 下载处理
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
.app-container {
  padding: 20px;

  .back-header {
    margin-bottom: 20px;

    .back-btn {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      color: #606266;
      font-size: 14px;
      transition: all 0.3s;

      i {
        margin-right: 6px;
        font-size: 16px;
      }

      &:hover {
        color: #2656F8;
      }
    }
  }

  .table-search {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;

    .el-form-item {
      margin-bottom: 0;

      &.time {
        margin-right: 0;
        
        .time-item {
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          margin-right: 8px;

          &:hover {
            color: #2656F8;
          }

          &.active {
            background: #2656F8;
            color: #fff;
          }
        }
      }
    }

    .el-button {
      margin-left: 8px;

      [class^="el-icon-"] {
        margin-right: 5px;
      }
    }
  }

  .table-box {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    ::v-deep .el-table {
      th {
        background-color: #f5f7fa;
        color: #606266;
        font-weight: 500;
        height: 50px;
      }

      td {
        padding: 12px 0;
      }

      .cell {
        padding: 0 12px;
      }
    }
  }

  .table-footer {
    margin-top: 20px;
    padding: 16px 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    text-align: right;

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
    }
  }
}
</style> 