<template>
  <div class="digital-avatar-container">
    <!-- 顶部锚点导航 -->
    <div class="anchor-nav">
      <div class="nav-content">
        <div class="nav-tabs">
          <div 
            v-for="tab in tabs" 
            :key="tab.key"
            :class="['nav-tab', { active: currentAnchor === tab.key }]"
            @click="currentAnchor = tab.key"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 我的数字人 -->
      <div v-show="currentAnchor === 'my'" class="section-content">
        <div class="section-header">
          <div class="header-left">
            <div class="filter-group">
              <div 
                v-for="filter in filters" 
                :key="filter.value"
                :class="['filter-item', { active: activeTab === filter.value }]"
                @click="activeTab = filter.value"
              >
                {{ filter.label }}
                <span class="count" v-if="filter.count">({{ filter.count }})</span>
              </div>
            </div>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="handleCreate">
              <i class="el-icon-plus"></i>创建数字人
            </el-button>
          </div>
        </div>

        <div class="avatar-grid">
          <!-- 创建卡片 -->
          <div class="avatar-card create-card" @click="handleCreate">
            <div class="card-content">
              <i class="el-icon-plus"></i>
              <p>创建数字人</p>
              <span class="hint">支持2D、3D、照片数字人</span>
            </div>
          </div>

          <!-- 数字人卡片 -->
          <div 
            v-for="item in filteredAvatars" 
            :key="item.id"
            class="avatar-card"
          >
            <div class="card-cover">
              <img :src="item.preview" :alt="item.name">
              <div class="card-type">{{ item.type }}</div>
              <div class="card-actions">
                <el-tooltip content="编辑" placement="top">
                  <i class="el-icon-edit" @click.stop="handleEdit(item)"></i>
                </el-tooltip>
                <el-tooltip content="预览" placement="top">
                  <i class="el-icon-video-play" @click.stop="handlePreview(item)"></i>
                </el-tooltip>
                <el-tooltip content="更多" placement="top">
                  <i class="el-icon-more" @click.stop="handleMore(item)"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="card-info">
              <div class="info-header">
                <h3>{{ item.name }}</h3>
                <el-tag 
                  :type="item.status === 'active' ? 'success' : 'info'"
                  size="mini"
                >
                  {{ item.status === 'active' ? '已启用' : '未启用' }}
                </el-tag>
              </div>
              <p class="desc">{{ item.description }}</p>
              <div class="info-footer">
                <span class="time">更新于 {{ item.updateTime }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
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

      <!-- 我的收藏 -->
      <div v-show="currentAnchor === 'favorite'" class="section-content">
        <el-empty 
          v-if="favorites.length === 0" 
          description="暂无收藏的数字人"
          :image-size="200"
        >
          <el-button type="primary" @click="currentAnchor = 'public'">去收藏</el-button>
        </el-empty>
        <div v-else class="avatar-grid">
          <!-- 收藏的数字人卡片，使用相同的卡片样式 -->
        </div>
      </div>

      <!-- 公共形象 -->
      <div v-show="currentAnchor === 'public'" class="section-content">
        <div class="section-header">
          <div class="header-left">
            <div class="filter-group">
              <div 
                v-for="type in publicTypes" 
                :key="type.value"
                :class="['filter-item', { active: publicTab === type.value }]"
                @click="publicTab = type.value"
              >
                {{ type.label }}
              </div>
            </div>
          </div>
          <div class="header-right">
            <el-input
              v-model="searchKey"
              placeholder="搜索公共形象"
              prefix-icon="el-icon-search"
              clearable
            >
            </el-input>
          </div>
        </div>

        <div class="avatar-grid">
          <!-- 公共形象卡片，使用相同的卡片样式 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigitalAvatar',
  data() {
    return {
      currentAnchor: 'my',
      activeTab: 'all',
      publicTab: 'all',
      searchKey: '',
      pageSize: 12,
      total: 100,
      tabs: [
        { key: 'my', label: '我的数字人' },
        { key: 'favorite', label: '我的收藏' },
        { key: 'public', label: '公共形象' }
      ],
      filters: [
        { value: 'all', label: '全部数字人', count: 6 },
        { value: '2d', label: '2D数字人', count: 2 },
        { value: 'photo', label: '照片数字人', count: 3 },
        { value: '3d', label: '3D数字人', count: 1 }
      ],
      publicTypes: [
        { value: 'all', label: '全部' },
        { value: 'host', label: '主持人' },
        { value: 'customer', label: '客服' },
        { value: 'teacher', label: '讲师' },
        { value: 'other', label: '其他' }
      ],
      avatars: [
        {
          id: 1,
          name: '客服小美',
          type: '2D数字人',
          description: '专业客服数字人形象',
          status: 'active',
          updateTime: '2024-03-20',
          preview: 'https://via.placeholder.com/300x400?text=Digital+Human+1'
        },
        {
          id: 2,
          name: '主播小王',
          type: '照片数字人',
          description: '直播带货数字人形象',
          status: 'active',
          updateTime: '2024-03-19',
          preview: 'https://via.placeholder.com/300x400?text=Digital+Human+2'
        },
        {
          id: 3,
          name: '讲师小李',
          type: '3D数字人',
          description: '教育培训数字人形象',
          status: 'inactive',
          updateTime: '2024-03-18',
          preview: 'https://via.placeholder.com/300x400?text=Digital+Human+3'
        }
      ],
      favorites: [], // 收藏的数字人
      publicAvatars: [
        {
          id: 1,
          name: '专业主持人',
          type: '主持人',
          description: '适合各类活动主持',
          status: 'public',
          updateTime: '2024-03-20',
          preview: 'https://via.placeholder.com/300x400?text=Host'
        },
        // 更多公共形象数据...
      ]
    }
  },
  computed: {
    filteredAvatars() {
      if (this.activeTab === 'all') return this.avatars;
      const typeMap = {
        '2d': '2D数字人',
        'photo': '照片数字人',
        '3d': '3D数字人'
      };
      return this.avatars.filter(avatar => avatar.type === typeMap[this.activeTab]);
    }
  },
  methods: {
    handleCreate() {
      // 跳转到创建数字人页面
      this.$router.push('/digitalHuman/digital-avatar/create');
    },
    handleEdit(item) {
      console.log('编辑数字人', item);
    },
    handlePreview(item) {
      console.log('预览数字人', item);
    },
    handleMore(item) {
      console.log('更多操作', item);
    },
    handlePageChange(page) {
      console.log('页码改变', page);
    }
  }
}
</script>

<style lang="scss" scoped>
.digital-avatar-container {
  height: 100%;
  background: #f5f7fa;

  .anchor-nav {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
    border-bottom: 1px solid #ebeef5;

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;

      .nav-tabs {
        display: flex;
        gap: 40px;

        .nav-tab {
          padding: 16px 0;
          font-size: 16px;
          color: #606266;
          cursor: pointer;
          position: relative;

          &:hover {
            color: #409EFF;
          }

          &.active {
            color: #409EFF;
            font-weight: 500;

            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background: #409EFF;
            }
          }
        }
      }
    }
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      .filter-group {
        display: flex;
        gap: 32px;

        .filter-item {
          font-size: 14px;
          color: #606266;
          cursor: pointer;
          padding: 6px 0;

          &:hover {
            color: #409EFF;
          }

          &.active {
            color: #409EFF;
            font-weight: 500;
          }

          .count {
            color: #909399;
            margin-left: 4px;
          }
        }
      }
    }

    .avatar-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 40px;

      .avatar-card {
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s;
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

          .card-actions {
            opacity: 1;
          }
        }

        &.create-card {
          border: 2px dashed #dcdfe6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          min-height: 360px;

          .card-content {
            text-align: center;
            color: #909399;

            i {
              font-size: 32px;
              margin-bottom: 16px;
            }

            p {
              font-size: 16px;
              margin-bottom: 8px;
            }

            .hint {
              font-size: 12px;
              opacity: 0.7;
            }
          }

          &:hover {
            border-color: #409EFF;
            color: #409EFF;

            .card-content {
              color: #409EFF;
            }
          }
        }

        .card-cover {
          position: relative;
          height: 200px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .card-type {
            position: absolute;
            top: 12px;
            right: 12px;
            padding: 4px 8px;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
          }

          .card-actions {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 12px;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
            display: flex;
            justify-content: flex-end;
            gap: 16px;
            opacity: 0;
            transition: opacity 0.3s;

            i {
              color: #fff;
              font-size: 20px;
              cursor: pointer;

              &:hover {
                transform: scale(1.1);
              }
            }
          }
        }

        .card-info {
          padding: 16px;

          .info-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;

            h3 {
              margin: 0;
              font-size: 16px;
              color: #303133;
            }
          }

          .desc {
            color: #606266;
            font-size: 14px;
            margin-bottom: 12px;
            line-height: 1.4;
          }

          .info-footer {
            color: #909399;
            font-size: 12px;
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