<template>
  <div class="app-container">
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

        <el-form-item class="btn">
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

    <div class="table-box">
      <el-table :data="tableData" border class="customTable customTable50">
        <el-table-column prop="name" label="账号名称" width="138" />
        <el-table-column prop="publishCount" label="新增内容发布数" width="188" sortable />
        <el-table-column prop="playCount" label="新增播放" width="121" sortable />
        <el-table-column prop="fansCount" label="新增粉丝" width="121" sortable />
        <el-table-column prop="likeCount" label="新增点赞" width="121" sortable />
        <el-table-column prop="commentCount" label="新增评论" width="107" />
        <el-table-column prop="shareCount" label="新增转发" width="107" />
        <el-table-column prop="favoriteCount" label="新增收藏" width="107" />
        <el-table-column prop="totalPublish" label="视频总发布数" width="134" />
        <el-table-column prop="totalFans" label="总粉丝数" width="121" />
        <el-table-column prop="totalPlay" label="总播放量" width="121" />
      </el-table>
    </div>

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
  name: 'AccountAnalysis',
  
  data() {
    return {
      searchForm: {
        platformType: 'douyin',
        groupId: '',
        account: ''
      },
      currentTime: '30days',
      timeOptions: [
        { label: '昨日', value: 'yesterday' },
        { label: '最近7天', value: '7days' },
        { label: '最近30天', value: '30days' },
        { label: '最近60天', value: '60days' }
      ],
      tableData: [
        {
          name: '官方账号1',
          publishCount: 15,
          playCount: 45678,
          fansCount: 234,
          likeCount: 1234,
          commentCount: 89,
          shareCount: 45,
          favoriteCount: 123,
          totalPublish: 156,
          totalFans: 12345,
          totalPlay: 234567
        },
        {
          name: '官方账号2',
          publishCount: 12,
          playCount: 34567,
          fansCount: 178,
          likeCount: 890,
          commentCount: 67,
          shareCount: 34,
          favoriteCount: 98,
          totalPublish: 134,
          totalFans: 9876,
          totalPlay: 198765
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
    querySearch(queryString, cb) {
      // 账号搜索建议
      const suggestions = []
      cb(suggestions)
    },

    handleTimeChange(time) {
      this.currentTime = time
      // 更新数据
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

      &.btn {
        margin-left: 16px;

        .el-button {
          padding: 9px 20px;

          i {
            margin-right: 4px;
          }
        }
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