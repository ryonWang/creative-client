<template>
  <div class="ai-draw">
    <!-- 热门分类 -->
    <div class="category-section">
      <h3 class="section-title">热门</h3>
      <div class="category-list">
        <div class="category-item" v-for="(item, index) in categories" :key="index" @click="handleCategoryClick(item.path)">
          <div class="category-image">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="category-info">
            <div class="category-title">
              <i :class="item.icon"></i>
              {{item.title}}
            </div>
            <div class="category-desc">{{item.description}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="tools-section">
      <h3 class="section-title">工具</h3>
      <div class="tools-list">
        <div class="tool-item" v-for="(tool, index) in tools" :key="index" @click="handleToolClick(tool)">
          <i :class="tool.icon"></i>
          <div class="tool-info">
            <div class="tool-name">{{tool.name}}</div>
            <div class="tool-desc">{{tool.desc}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优秀案例展示 -->
    <div class="showcase-section">
      <h3 class="section-title">优秀案例</h3>
      <div class="showcase-filter">
        <span 
          v-for="(filter, index) in filters" 
          :key="index"
          :class="['filter-item', { active: currentFilter === filter.value }]"
          @click="currentFilter = filter.value"
        >
          {{filter.label}}
        </span>
      </div>
      <div class="showcase-list">
        <div class="showcase-item" v-for="(item, index) in filteredShowcaseList" :key="index">
          <img :src="item.image" :alt="item.title">
          <div class="showcase-info">
            <span class="showcase-title">{{item.title}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AiDrawHome',
  data() {
    return {
      categories: [
        {
          title: '人台图',
          description: '快速制作人台展示图',
          image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
          icon: 'el-icon-user',
          path: 'mannequin'
        },
        {
          title: '真人图',
          description: '真人模特展示效果',
          image: 'https://images.pexels.com/photos/975006/pexels-photo-975006.jpeg',
          icon: 'el-icon-user-solid',
          path: 'human'
        },
        {
          title: '鞋靴图',
          description: '专业鞋靴展示制作',
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
          icon: 'el-icon-shopping-bag-1',
          path: 'shoes'
        },
        {
          title: '箱包图',
          description: '箱包展示图制作',
          image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
          icon: 'el-icon-suitcase',
          path: 'bags'
        }
      ],
      tools: [
        { name: '移除背景', icon: 'el-icon-scissors', desc: '一键抠图，快速去除背景' },
        { name: '一键放大', icon: 'el-icon-zoom-in', desc: '提升图片分辨率' },
        { name: '清晰度提升', icon: 'el-icon-picture', desc: '优化图片清晰度' },
        { name: '智能修图', icon: 'el-icon-magic-stick', desc: '自动优化图片效果' }
      ],
      filters: [
        { label: '全部', value: 'all' },
        { label: '人台图', value: 'mannequin' },
        { label: '真人图', value: 'human' },
        { label: '鞋靴图', value: 'shoes' },
        { label: '箱包图', value: 'bags' }
      ],
      currentFilter: 'all',
      showcaseList: [
        { 
          image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg',
          title: '时尚箱包展示',
          type: 'bags'
        },
        { 
          image: 'https://images.pexels.com/photos/4495705/pexels-photo-4495705.jpeg',
          title: '高端人台展示',
          type: 'mannequin'
        },
        {
          image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
          title: '真人模特展示',
          type: 'human'
        },
        {
          image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
          title: '鞋靴产品展示',
          type: 'shoes'
        }
      ]
    }
  },
  computed: {
    filteredShowcaseList() {
      if (this.currentFilter === 'all') {
        return this.showcaseList;
      }
      return this.showcaseList.filter(item => item.type === this.currentFilter);
    }
  },
  methods: {
    handleCategoryClick(path) {
      this.$router.push(`/aiDraw/${path}`);
    },
    handleToolClick(tool) {
      this.$message.info(`即将推出${tool.name}功能`);
    }
  }
}
</script>

<style scoped lang="scss">
.ai-draw {
  padding: 30px;
  background: #f8fafc;
  min-height: 100vh;

  .section-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    
    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: #409EFF;
      margin-right: 12px;
      border-radius: 2px;
    }
  }

  .category-section {
    margin-bottom: 50px;

    .category-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;

      .category-item {
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);

          .category-image::after {
            opacity: 0.7;
          }

          .category-info {
            transform: translateY(-5px);
          }
        }

        .category-image {
          height: 200px;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5));
            opacity: 0;
            transition: opacity 0.3s;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .category-info {
          padding: 20px;
          transition: transform 0.3s;

          .category-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
            display: flex;
            align-items: center;

            i {
              margin-right: 8px;
              font-size: 20px;
              color: #409EFF;
            }
          }

          .category-desc {
            font-size: 14px;
            color: #666;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .tools-section {
    margin-bottom: 50px;
    background: #fff;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);

    .tools-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;

      .tool-item {
        padding: 20px;
        background: #f8fafc;
        border-radius: 12px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #ecf5ff;
          transform: translateY(-3px);

          i {
            transform: scale(1.1);
          }
        }

        i {
          font-size: 24px;
          color: #409EFF;
          margin-right: 15px;
          transition: transform 0.3s;
        }

        .tool-info {
          flex: 1;
          
          .tool-name {
            font-weight: 500;
            margin-bottom: 4px;
          }

          .tool-desc {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }

  .showcase-section {
    .showcase-filter {
      margin-bottom: 30px;
      display: flex;
      justify-content: center;

      .filter-item {
        padding: 8px 20px;
        margin: 0 8px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 500;
        
        &:hover {
          color: #409EFF;
        }

        &.active {
          background: #409EFF;
          color: #fff;
          box-shadow: 0 4px 12px rgba(64,158,255,0.3);
        }
      }
    }

    .showcase-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;

      .showcase-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        
        img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          transition: all 0.5s;
        }

        .showcase-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          color: #fff;

          .showcase-title {
            font-size: 16px;
            font-weight: 500;
          }
        }

        &:hover {
          img {
            transform: scale(1.05);
          }
        }
      }
    }
  }
}
</style> 