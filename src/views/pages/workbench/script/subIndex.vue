<template>
  <el-container class="script-container">
    <el-aside width="200px" class="script-aside">
      <div class="aside-header">
        <span>名称：{{scriptInfo?.scriptName || ''}}</span>
      </div>
      <el-menu class="script-menu">
        <el-menu-item index="1">
          <span>我的脚本</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>默认脚本</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-main class="script-main">
      <div class="advanced-search-section">
        <!-- 搜索和基础筛选 -->
        <div class="search-header">
          <el-form :model="filterForm" label-width="100px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="关键词搜索：">
                  <el-input
                    v-model="searchQuery"
                    placeholder="搜索分镜头/拍摄描述/提示词"
                    clearable
                  >
                    <el-button slot="append" icon="el-icon-search">搜索</el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="画面比例：">
                  <el-select v-model="filterForm.ratio" placeholder="请选择画面比例">
                    <el-option label="竖版 9:16" value="9:16"></el-option>
                    <el-option label="横版 16:9" value="16:9"></el-option>
                    <el-option label="方形 1:1" value="1:1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="视频尺寸：">
                  <el-select v-model="filterForm.resolution" placeholder="请选择视频尺寸">
                    <el-option label="1080x1920" value="1080x1920"></el-option>
                    <el-option label="720x1280" value="720x1280"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="内容标签：">
                  <div class="tag-group">
                    <el-tag
                      v-for="tag in scriptTags"
                      :key="tag.value"
                      :type="tag.active ? 'primary' : 'info'"
                      class="tag-item"
                      @click="toggleScriptTag(tag)"
                      :effect="tag.active ? 'dark' : 'plain'"
                    >
                      <i :class="tag.icon" v-if="tag.icon"></i>
                      {{ tag.label }}
                    </el-tag>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <div class="operation-btns">
                  <el-button type="primary" size="small" @click="handleSearch">
                    <i class="el-icon-search"></i> 搜索
                  </el-button>
                  <el-button size="small" @click="handleReset">
                    <i class="el-icon-refresh"></i> 重置
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      
      <div class="table-wrapper">
        <div class="table-actions mb-4">
          <el-button-group>
            <el-button 
              type="primary" 
              icon="el-icon-plus" 
              class="action-btn add-btn"
            >
              添加剪辑
            </el-button>
            <el-button 
              type="success" 
              icon="el-icon-video-camera" 
              class="action-btn compose-btn"
            >
              合成该脚本视频
            </el-button>
            <el-button 
              type="warning" 
              icon="el-icon-s-promotion" 
              class="action-btn workflow-btn"
            >
              提交到工作流
            </el-button>
          </el-button-group>
        </div>

        <el-table 
          :data="filteredScripts" 
          style="width: 100%"
          :row-style="{height: '180px'}"
          :cell-style="{padding: '15px'}"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>
          
          <el-table-column label="分镜头" width="120">
            <template slot-scope="scope">
              <div class="story-board-text">
                {{ scope.row.storyBoard }}
              </div>
            </template>
          </el-table-column>
          
          <el-table-column label="拍摄描述" min-width="400">
            <template slot-scope="scope">
              <div class="feature-text-container">
                <el-input
                  v-model="scope.row.description"
                  type="textarea"
                  :rows="6"
                  resize="none"
                  class="feature-textarea"
                >
                </el-input>
                <div class="feature-footer">
                  <el-button 
                    class="ai-enhance-btn"
                  >
                    <span class="btn-text">
                      <i class="el-icon-magic-stick"></i>
                      AI智能优化
                    </span>
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column label="提示词" min-width="400">
            <template slot-scope="scope">
              <div class="feature-text-container">
                <el-input
                  v-model="scope.row.prompt"
                  type="textarea"
                  :rows="6"
                  resize="none"
                  class="feature-textarea"
                >
                </el-input>
                <div class="feature-footer">
                  <el-button 
                    class="ai-enhance-btn"
                  >
                    <span class="btn-text">
                      <i class="el-icon-magic-stick"></i>
                      AI智能优化
                    </span>
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间" width="160" align="center">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          
          <el-table-column prop="updateTime" label="更新时间" width="160" align="center">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="220" fixed="right">
            <template slot-scope="scope">
              <div class="operation-buttons">
                <el-button 
                  class="operation-btn template-btn"
                  @click="showPreview('template')"
                >
                  <span class="btn-text">
                    <i class="el-icon-files"></i>
                    <span class="btn-label">选择模板</span>
                  </span>
                </el-button>
                <el-button 
                  class="operation-btn video-btn"
                  @click="showPreview('video')"
                >
                  <span class="btn-text">
                    <i class="el-icon-video-camera"></i>
                    <span class="btn-label">选择视频</span>
                  </span>
                </el-button>
                <el-button 
                  class="operation-btn voice-btn"
                  @click="showPreview('voice')"
                >
                  <span class="btn-text">
                    <i class="el-icon-microphone"></i>
                    <span class="btn-label">生成语音</span>
                  </span>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-drawer
          title="预览"
          :visible.sync="previewDrawer.visible"
          direction="rtl"
          size="30%"
        >
          <div class="preview-content p-4">
            <div class="preview-title mb-4">{{ previewDrawer.title }}</div>
            <div class="preview-image">
              <img 
                :src="previewDrawer.image" 
                class="w-full h-64 object-cover rounded-lg"
                alt="预览图"
              />
            </div>
          </div>
        </el-drawer>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { Message } from 'element-ui';

export default {
  name: "subIndex",
  data() {
    return {
      searchQuery: '',
      scriptInfo: null,
      scriptId: null,
      subScriptList: [],
      filterType: 'all',
      selectedRows: [],
      filterTags: [
        { label: '时长', value: 'duration', type: 'info' },
        { label: '场景', value: 'scene', type: 'info' },
        { label: '运镜', value: 'camera', type: 'info' },
        { label: '道具', value: 'props', type: 'info' }
      ],
      activeFilters: [],
      filterForm: {
        ratio: '9:16',
        resolution: '1080x1920'
      },
      scriptTags: [
        { label: '模特', value: 'model', active: false },
        { label: '景别', value: 'scene', active: false },
        { label: '运镜', value: 'camera', active: false },
        { label: '时长', value: 'duration', active: false },
        { label: '自定义', value: 'custom', active: false },
        { label: '拍摄场地', value: 'location', active: false },
        { label: '拍摄道具', value: 'props', active: false },
        { label: '场记', value: 'record', active: false },
        { label: '备注', value: 'remarks', active: false }
      ],
      previewDrawer: {
        visible: false,
        title: '',
        image: ''
      }
    };
  },
  created() {
    // 优先从路由参数获取
    if (this.$route.params.scriptInfo) {
      this.scriptId = this.$route.params.scriptInfo.id;
      this.scriptInfo = this.$route.params.scriptInfo;
    } else {
      // 如果路由参数没有，从localStorage获取完整的scriptInfo对象
      const savedScriptInfo = localStorage.getItem('currentScriptInfo');
      if (savedScriptInfo) {
        this.scriptInfo = JSON.parse(savedScriptInfo);
        this.scriptId = this.scriptInfo.id;
      } else {
        this.scriptId = localStorage.getItem('currentScriptId');
        // 如果只有ID，则需要重取scriptInfo
        if (this.scriptId) {
          this.getScriptInfo(this.scriptId);
        }
      }
    }
    
    if (this.scriptId) {
      this.loadSubScripts(this.scriptId);
    } else {
      this.$message.error("系统错误，请重新进入脚本库")
      this.$router.push('/workbench/script');
    }
  },
  methods: {
    // 新增获取脚本信息的方法
    getScriptInfo(scriptId) {
      this.$api.get(`/module/jiaoben/${scriptId}`).then(res => {
        if (res.data) {
          this.scriptInfo = res.data;
          // 保存完整的scriptInfo到localStorage
          localStorage.setItem('currentScriptInfo', JSON.stringify(this.scriptInfo));
        }
      }).catch(err => {
        this.$message.error('获取脚本信息失败');
        console.error(err);
      });
    },
    loadSubScripts(scriptId) {
      if (!scriptId) return;
      
      // 保存ID到localStorage
      localStorage.setItem('currentScriptId', scriptId);
      
      // 获取子脚本列表
      this.$api.get(`/module/sub_jiaoben/${scriptId}`).then(res => {
        if (res.data) {
          this.subScriptList = res.data;
        }
      }).catch(err => {
        this.$message.error('获取子脚本列表失败');
        console.error(err);
      });
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    handleTagFilter(tag) {
      const index = this.activeFilters.indexOf(tag.value);
      if (index > -1) {
        this.activeFilters.splice(index, 1);
        tag.type = 'info';
      } else {
        this.activeFilters.push(tag.value);
        tag.type = 'primary';
      }
      // 触发筛选
      this.applyFilters();
    },
    applyFilters() {
      // 实现筛选逻辑
    },
    toggleScriptTag(tag) {
      tag.active = !tag.active;
      this.applyFilters();
    },
    showPreview(type) {
      this.previewDrawer.visible = true;
      switch(type) {
        case 'template':
          this.previewDrawer.title = '模板预览';
          this.previewDrawer.image = 'path/to/template-placeholder.jpg';
          break;
        case 'video':
          this.previewDrawer.title = '视频预览';
          this.previewDrawer.image = 'path/to/video-placeholder.jpg';
          break;
        case 'voice':
          this.previewDrawer.title = '语音预览';
          this.previewDrawer.image = 'path/to/voice-placeholder.jpg';
          break;
      }
    },
    handleSearch() {
      // 实现搜索逻辑
      this.applyFilters();
    },
    
    handleReset() {
      this.searchQuery = '';
      this.filterForm = {
        ratio: '',
        resolution: ''
      };
      this.scriptTags.forEach(tag => tag.active = false);
      this.applyFilters();
    }
  },
  computed: {
    filteredScripts() {
      return this.subScriptList.filter(script => {
        return script.storyBoard?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               script.description?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               script.prompt?.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  // 监听路由参数变化
  watch: {
    '$route.params.scriptInfo': {
      handler(newVal) {
        if (newVal && newVal.id) {
          this.scriptId = newVal.id;
          this.scriptInfo = newVal;
          this.loadSubScripts(this.scriptId);
        }
      },
      immediate: true
    }
  },
  // 组件销毁前清除localStorage中的数据
  beforeDestroy() {
    localStorage.removeItem('currentScriptId');
    localStorage.removeItem('currentScriptInfo');
  }
};
</script>

<style lang="scss" scoped>
.script-container {
  height: 100vh;
  width: 100%;
  
  .script-aside {
    background-color: #fff;
    border-right: 1px solid #e6e6e6;
    
    .aside-header {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #e6e6e6;
    }
    
    .script-menu {
      border-right: none;
    }
  }
  
  .script-main {
    padding: 20px;
    background-color: #f5f7fa;
    
    .advanced-search-section {
      background: #fff;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

      .search-header {
        .el-form {
          .el-row {
            margin-bottom: 16px;
            
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .tag-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .tag-item {
          cursor: pointer;
          user-select: none;
          margin: 0;
          
          &.el-tag--info {
            background-color: #f4f4f5;
            border-color: #e9e9eb;
            color: #909399;
          }
          
          &:hover {
            opacity: 0.85;
          }

          i {
            margin-right: 4px;
          }
        }
      }

      .operation-btns {
        display: flex;
        justify-content: center;
        gap: 12px;
        padding-top: 8px;
        border-top: 1px solid #ebeef5;
        margin-top: 16px;

        .el-button {
          padding: 9px 20px;
          
          i {
            margin-right: 4px;
          }
        }
      }
    }
    
    .table-actions {
      margin-bottom: 20px;
      
      .action-btn {
        padding: 10px 20px;
        border: none;
        font-weight: 500;
        
        i {
          margin-right: 6px;
          font-size: 16px;
        }
        
        &.add-btn {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          
          &:hover {
            background: linear-gradient(135deg, #4f46e5, #4338ca);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
          }
        }
        
        &.compose-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          
          &:hover {
            background: linear-gradient(135deg, #059669, #047857);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
          }
        }
        
        &.workflow-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          
          &:hover {
            background: linear-gradient(135deg, #d97706, #b45309);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
          }
        }
      }
    }
    
    .table-wrapper {
      background-color: #fff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

      .el-table {
        background: #fff;
        
        ::v-deep {
          .el-table__header-wrapper {
            th {
              background-color: #f8fafd;
              color: #1a1a1a;
              font-weight: 600;
              height: 56px;
              font-size: 15px;
            }
          }

          .el-table__row {
            td {
              border-bottom: 1px solid #ebeef5;
            }
          }
        }
      }
    }
  }
}

.rich-text-container {
  position: relative;
  width: 100%;
  
  .custom-textarea {
    ::v-deep .el-textarea__inner {
      padding: 12px;
      font-size: 14px;
      line-height: 1.6;
      background: #fafafa;
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      transition: all 0.3s;
      
      &:focus {
        background: #fff;
        border-color: #409EFF;
        box-shadow: 0 0 0 2px rgba(64,158,255,0.2);
      }
    }
  }

  .ai-edit-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 8px 15px;
    font-size: 13px;
    border-radius: 4px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    color: white;
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
    
    i {
      margin-right: 4px;
    }
  }
}

.operation-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  
  .operation-btn {
    position: relative;
    width: 100%;
    height: 44px;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.95;
      transition: all 0.3s;
      z-index: 1;
    }
    
    &:hover::before {
      opacity: 1;
      transform: scale(1.02);
    }
    
    .btn-text {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 10px;
      padding: 0 16px;
      
      i {
        font-size: 20px;
        background: linear-gradient(to right, #fff, #f0f0f0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .btn-label {
        font-size: 14px;
        font-weight: 500;
        background: linear-gradient(to right, #fff, #f0f0f0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      }
    }
    
    // 模板按钮渐变
    &.template-btn::before {
      background: linear-gradient(135deg, #4f46e5 0%, #3730a3 50%, #312e81 100%);
    }
    
    // 视频按钮渐变
    &.video-btn::before {
      background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
    }
    
    // 配音按钮渐变
    &.voice-btn::before {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
    }
    
    // 悬浮效果
    &:hover {
      &.template-btn {
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
      }
      
      &.video-btn {
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
      }
      
      &.voice-btn {
        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
      }
    }
  }
}

// 调整表格单元格内边距和对齐
::v-deep {
  .el-table {
    .el-table__row {
      .el-table__cell {
        &:last-child {
          .cell {
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}

// 时间列样式
.el-table {
  ::v-deep {
    .el-table__cell {
      &.is-center {
        .cell {
          color: #666;
          font-size: 13px;
        }
      }
    }
  }
}

// 优化滚动条样式
::v-deep {
  .el-table__body-wrapper::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 4px;
  }
  
  .el-table__body-wrapper::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 4px;
  }
}

.story-board-text {
  font-size: 14px;
  line-height: 1.6;
  color: #606266;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
}

.feature-text-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .feature-textarea {
    flex: 1;
    
    ::v-deep .el-textarea__inner {
      height: calc(100% - 40px) !important; // 减去底部按钮的高度
      padding: 15px;
      font-size: 14px;
      line-height: 1.8;
      background: #fcfcfc;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      transition: all 0.3s;
      color: #2c3e50;
      
      &:focus {
        background: #fff;
        border-color: #8b5cf6;
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
      }
    }
  }

  .feature-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 8px;
    
    .ai-enhance-btn {
      position: relative;
      overflow: hidden;
      padding: 8px 20px;
      border: none;
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef);
        opacity: 0.9;
        transition: all 0.3s;
        z-index: 1;
      }
      
      &:hover::before {
        opacity: 1;
        transform: scale(1.05);
      }
      
      .btn-text {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 6px;
        color: white;
        font-weight: 500;
        background: linear-gradient(to right, #fff, #f0f0f0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        
        i {
          font-size: 16px;
          background: inherit;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
}

// 表格样式优化
.el-table {
  ::v-deep {
    .el-table__header-wrapper {
      th {
        background: linear-gradient(to right, #f8fafc, #f1f5f9);
        color: #1e293b;
        font-weight: 600;
        height: 56px;
        font-size: 15px;
      }
    }
    
    .el-table__row {
      td {
        background: #fff;
        transition: all 0.3s;
      }
      
      &:hover td {
        background: #f8fafc;
      }
    }
  }
}

// 自定义滚动条
::v-deep {
  .el-textarea__inner::-webkit-scrollbar {
    width: 6px;
  }
  
  .el-textarea__inner::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
    
    &:hover {
      background: #94a3b8;
    }
  }
  
  .el-textarea__inner::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
}

// 优化表格选择框样式
::v-deep {
  .el-table__header {
    .el-checkbox__inner {
      border-color: #6366f1;
      
      &:hover {
        border-color: #4f46e5;
      }
    }
  }
  
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    border-color: #4f46e5;
  }
}

// Select 样式优化
::v-deep {
  .el-select {
    .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
  }
  
  .el-select-dropdown__item {
    height: 40px;
    line-height: 40px;
    
    &.selected {
      color: #409EFF;
      font-weight: 600;
    }
  }
}

.preview-content {
  .preview-title {
    font-size: 18px;
    font-weight: 500;
    color: #1a1a1a;
  }
  
  .preview-image {
    img {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}

// 优化表单控件样式
::v-deep {
  .el-input__inner,
  .el-select .el-input__inner {
    height: 32px;
    line-height: 32px;
  }

  .el-input-group__append {
    padding: 0;
    
    .el-button {
      margin: 0;
      border: none;
      height: 32px;
      padding: 0 15px;
    }
  }

  .el-form-item__label {
    font-weight: normal;
    color: #606266;
  }
}
</style>
