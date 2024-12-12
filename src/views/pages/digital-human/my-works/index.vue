<template>
  <div class="my-works">
    <!-- 顶部操作栏 -->
    <div class="operation-bar">
      <div class="left">
        <el-radio-group v-model="workType" size="medium">
          <el-radio-button label="all">全部作品</el-radio-button>
          <el-radio-button label="video">视频作品</el-radio-button>
          <el-radio-button label="live">直播回放</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索作品"
          prefix-icon="el-icon-search"
          clearable
          style="width: 200px"
        ></el-input>
        <el-button type="primary" icon="el-icon-plus">新建作品</el-button>
      </div>
    </div>

    <!-- 作品列表 -->
    <div class="works-list">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in worksList" :key="item.id">
          <el-card class="work-card" shadow="hover">
            <div class="work-preview">
              <img :src="item.cover" :alt="item.title">
              <div class="work-duration">{{ item.duration }}</div>
              <div class="work-type-tag" :class="item.type">
                {{ item.type === 'video' ? '视频' : '直播回放' }}
              </div>
            </div>
            <div class="work-info">
              <h3 class="work-title">{{ item.title }}</h3>
              <div class="work-stats">
                <span><i class="el-icon-view"></i> {{ item.views }}</span>
                <span><i class="el-icon-star-off"></i> {{ item.likes }}</span>
              </div>
              <div class="work-time">{{ item.createTime }}</div>
            </div>
            <div class="work-actions">
              <el-button type="text" @click="handleEdit(item)">
                <i class="el-icon-edit"></i> 编辑
              </el-button>
              <el-button type="text" @click="handleShare(item)">
                <i class="el-icon-share"></i> 分享
              </el-button>
              <el-button type="text" @click="handleDelete(item)">
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[12, 24, 36, 48]"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <!-- 分享弹窗 -->
    <el-dialog
      title="分享作品"
      :visible.sync="shareDialogVisible"
      width="400px"
    >
      <div class="share-content">
        <div class="qrcode-container">
          <img src="path/to/qrcode.png" alt="二维码">
        </div>
        <div class="share-links">
          <el-input v-model="shareUrl" readonly>
            <el-button slot="append" @click="copyShareUrl">复制</el-button>
          </el-input>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyWorks',
  data() {
    return {
      workType: 'all',
      searchKeyword: '',
      pageSize: 12,
      total: 0,
      shareDialogVisible: false,
      shareUrl: 'https://example.com/share/123',
      worksList: [
        {
          id: 1,
          title: '产品介绍视频',
          cover: 'path/to/cover1.jpg',
          duration: '03:45',
          type: 'video',
          views: 1234,
          likes: 88,
          createTime: '2024-01-20 15:30'
        }
        // 更多作品数据...
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    handleEdit(item) {
      console.log('编辑作品:', item);
    },
    handleShare(item) {
      this.shareDialogVisible = true;
      this.shareUrl = `https://example.com/share/${item.id}`;
    },
    handleDelete(item) {
      this.$confirm('确认删除该作品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除作品:', item);
        this.$message.success('删除成功');
      }).catch(() => {});
    },
    copyShareUrl() {
      navigator.clipboard.writeText(this.shareUrl).then(() => {
        this.$message.success('复制成功');
      });
    },
    fetchData() {
      // 获取作品列表数据
      console.log('获取数据:', this.currentPage, this.pageSize);
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.my-works {
  padding: 20px;

  .operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .right {
      display: flex;
      gap: 10px;
    }
  }

  .works-list {
    margin-bottom: 20px;

    .work-card {
      margin-bottom: 20px;

      .work-preview {
        position: relative;
        height: 160px;
        overflow: hidden;
        border-radius: 4px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .work-duration {
          position: absolute;
          right: 8px;
          bottom: 8px;
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
        }

        .work-type-tag {
          position: absolute;
          left: 8px;
          top: 8px;
          padding: 2px 6px;
          border-radius: 2px;
          font-size: 12px;
          color: #fff;

          &.video {
            background: #409EFF;
          }

          &.live {
            background: #67C23A;
          }
        }
      }

      .work-info {
        padding: 12px 0;

        .work-title {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .work-stats {
          display: flex;
          gap: 15px;
          color: #666;
          font-size: 12px;

          i {
            margin-right: 4px;
          }
        }

        .work-time {
          margin-top: 8px;
          color: #999;
          font-size: 12px;
        }
      }

      .work-actions {
        display: flex;
        justify-content: space-around;
        padding-top: 10px;
        border-top: 1px solid #eee;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
  }

  .share-content {
    text-align: center;

    .qrcode-container {
      margin-bottom: 20px;
      
      img {
        width: 200px;
        height: 200px;
      }
    }
  }
}
</style> 