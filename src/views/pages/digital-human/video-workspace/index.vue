<template>
  <div class="video-workspace">
    <!-- 顶部筛选区 -->
    <div class="filter-section">
      <div class="filter-group">
        <el-radio-group v-model="filterType" size="medium">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="hot">热门推荐</el-radio-button>
          <el-radio-button label="new">最新发布</el-radio-button>
        </el-radio-group>
      </div>
      <div class="search-group">
        <el-input
          v-model="searchKey"
          placeholder="搜索视频模板"
          prefix-icon="el-icon-search"
          clearable
        />
        <el-button type="primary">
          <i class="el-icon-plus"></i>新建视频
        </el-button>
      </div>
    </div>

    <!-- 分类标签 -->
    <div class="category-tags">
      <div class="tag-group">
        <span class="label">场景：</span>
        <el-radio-group v-model="sceneType" size="small">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="product">商品介绍</el-radio-button>
          <el-radio-button label="education">教育培训</el-radio-button>
          <el-radio-button label="news">新闻资讯</el-radio-button>
          <el-radio-button label="entertainment">娱乐休闲</el-radio-button>
        </el-radio-group>
      </div>
      <div class="tag-group">
        <span class="label">风格：</span>
        <el-radio-group v-model="styleType" size="small">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="business">商务</el-radio-button>
          <el-radio-button label="casual">休闲</el-radio-button>
          <el-radio-button label="fashion">时尚</el-radio-button>
          <el-radio-button label="tech">科技</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <!-- 视频模板网格 -->
    <div class="template-grid">
      <div v-for="item in videoTemplates" :key="item.id" class="template-card">
        <div class="template-preview">
          <img :src="item.thumbnail" :alt="item.title">
          <div class="hover-mask">
            <el-button type="primary" size="small" @click="handleUseTemplate(item)">
              使用模板
            </el-button>
          </div>
          <span class="duration">{{item.duration}}</span>
        </div>
        <div class="template-info">
          <h3 class="title">{{item.title}}</h3>
          <div class="tags">
            <el-tag size="mini" type="info">{{item.scene}}</el-tag>
            <el-tag size="mini" type="info">{{item.style}}</el-tag>
          </div>
          <div class="stats">
            <span class="views">
              <i class="el-icon-view"></i>
              {{item.views}}
            </span>
            <span class="uses">
              <i class="el-icon-data-analysis"></i>
              {{item.uses}}次使用
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页器 -->
    <div class="pagination-wrapper">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoWorkspace',
  data() {
    return {
      filterType: 'all',
      searchKey: '',
      sceneType: 'all',
      styleType: 'all',
      pageSize: 12,
      total: 100,
      videoTemplates: [
        {
          id: 1,
          title: '商务简约产品介绍',
          thumbnail: 'https://via.placeholder.com/300x200?text=Business+Template',
          duration: '00:30',
          scene: '商品介绍',
          style: '商务',
          views: '2.3k',
          uses: 156
        },
        {
          id: 2,
          title: '时尚动感宣传片',
          thumbnail: 'https://via.placeholder.com/300x200?text=Fashion+Template',
          duration: '00:45',
          scene: '娱乐休闲',
          style: '时尚',
          views: '1.8k',
          uses: 89
        },
        // 更多模板数据...
      ]
    }
  },
  methods: {
    handleUseTemplate(template) {
      console.log('使用模板', template);
    },
    handlePageChange(page) {
      console.log('切换页面', page);
    }
  }
}
</script>

<style lang="scss" scoped>
.video-workspace {
  padding: 24px;
  background: #f5f7fa;

  .filter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .search-group {
      display: flex;
      gap: 16px;

      .el-input {
        width: 240px;
      }
    }
  }

  .category-tags {
    background: #fff;
    padding: 16px 24px;
    border-radius: 8px;
    margin-bottom: 24px;

    .tag-group {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        color: #606266;
        margin-right: 16px;
        font-size: 14px;
      }

      .el-radio-group {
        flex: 1;
      }
    }
  }

  .template-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 40px;

    .template-card {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

        .hover-mask {
          opacity: 1;
        }
      }

      .template-preview {
        position: relative;
        height: 180px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hover-mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .duration {
          position: absolute;
          bottom: 8px;
          right: 8px;
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
        }
      }

      .template-info {
        padding: 16px;

        .title {
          margin: 0 0 12px;
          font-size: 16px;
          color: #303133;
          line-height: 1.4;
        }

        .tags {
          margin-bottom: 12px;
          
          .el-tag {
            margin-right: 8px;
          }
        }

        .stats {
          display: flex;
          gap: 16px;
          color: #909399;
          font-size: 12px;

          i {
            margin-right: 4px;
          }
        }
      }
    }
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    padding: 24px 0;
  }
}
</style> 