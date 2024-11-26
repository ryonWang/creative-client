<template>
  <div class="create-rentai">
    <!-- 左侧任务列表 -->
    <div class="task-sidebar">
      <div class="task-header">
        <h2><i class="el-icon-s-operation"></i> 人台图</h2>
        <p class="task-desc">只需要将服装穿到人台上，即可用符合品牌调性的各类型真人模特展示服装</p>
      </div>

      <el-button type="primary" class="create-btn" @click="createNewTask">
        <i class="el-icon-plus"></i>
        新建任务
      </el-button>

      <div class="task-list">
        <div v-for="task in taskList" 
             :key="task.id" 
             class="task-item"
             :class="{'is-active': currentTask?.id === task.id}"
             @click="selectTask(task)">
          <div class="task-icon">
            <i class="el-icon-document"></i>
          </div>
          <div class="task-info">
            <div class="task-name">{{ task.name }}</div>
            <div class="task-time">{{ task.createTime }}</div>
          </div>
          <el-dropdown trigger="click" @command="handleCommand($event, task)">
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="edit">
                <i class="el-icon-edit"></i> 编辑
              </el-dropdown-item>
              <el-dropdown-item command="delete">
                <i class="el-icon-delete"></i> 删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- 右侧内容区 -->
    <div class="main-content" v-loading="loading">
      <template v-if="currentTask">
        <!-- 上传区域 -->
        <div class="upload-section">
          <div class="text-20px color-#000 font-medium leading-28px">上传资产</div>
          
          <div class="flex mt-16px mb-32px">
            <!-- 左侧上传框 -->
            <div id="upload-img" class="w-386px h-309px p-2px bg-#F7F8FA rounded-8px border border-solid border-#303AF2 border-opacity-10 mr-16px overflow-hidden">
              <el-upload
                drag
                action=""
                :show-file-list="false"
                :before-upload="handleBeforeUpload"
                :on-success="handleUploadSuccess"
              >
                <div class="flex flex-col items-center">
                  <img src="@/assets/imgs/user_img_default1.png" class="w-80px h-160px mb-20px mt-26px" alt="">
                  <p class="color-#303AF2 text-14px leading-22px">点击上传</p>
                  <p class="color-#86909C text-12px leading-20px px-40px">
                    支持拖拽上传，大小不超过20MB<br>长宽不超过2000*2000，支持jpg、png格式
                  </p>
                </div>
              </el-upload>
            </div>

            <!-- 右侧固化区 -->
            <div id="matting" class="w-386px h-309px bg-#F7F8FA rounded-8px border border-solid border-#303AF2 border-opacity-10">
              <div class="h-full flex flex-col items-center justify-center">
                <img src="@/assets/imgs/user_img_default2.png" class="w-93px h-93px" alt="">
                <div class="color-#1D2129 text-16px leading-22px font-medium">固化区域</div>
                <div class="color-#86909C text-12px leading-20px mt-4px">左侧上传图片后进行模版选取</div>
              </div>
            </div>
          </div>

          <!-- 示例图片区域 -->
          <div class="text-20px font-medium leading-28px color-#000 mb-16px">试试这些</div>
          <div class="flex items-center mb-32px overflow-x-scroll">
            <div v-for="(example, index) in examples" 
                 :key="index"
                 class="border-1px border-solid border-color-#dfe2f7 mr-16px rounded-6px cursor-pointer"
                 @click="selectExample(example)"
            >
              <el-image 
                :src="example.url"
                class="w-80px h-80px rounded-6px object-cover"
                :preview-src-list="[example.url]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </div>
        </div>

        <!-- 配置区域 -->
        <div class="config-section">
          <el-tabs v-model="activeTab" type="border-card">
            <!-- 文字描述 tab -->
            <el-tab-pane name="text">
              <span slot="label">
                <i class="el-icon-edit"></i> 文字描述
              </span>
              <div class="text-editor">
                <el-input
                  type="textarea"
                  v-model="taskConfig.description"
                  :rows="6"
                  placeholder="描述你想要生成的图片内容，支持中英文">
                </el-input>
                <div class="editor-footer">
                  <el-button type="text" @click="showPromptExamples">
                    <i class="el-icon-info"></i> 查看示例
                  </el-button>
                  <el-button type="text" @click="clearDescription">
                    <i class="el-icon-delete"></i> 清空
                  </el-button>
                </div>
              </div>
            </el-tab-pane>

            <!-- 快捷模板 tab -->
            <el-tab-pane name="template">
              <span slot="label">
                <i class="el-icon-collection"></i> 快捷模板
              </span>
              
              <!-- 模特选择部分 -->
              <div class="section-block">
                <div class="text-16px color-#1D2129 font-medium mb-16px mt-32px">模特选择</div>
                <div class="model-con">
                  <!-- 模特类型选择 -->
                  <div class="tab-con">
                    <div 
                      class="tab-item" 
                      :class="{'tab-item-active': modelType === 'recommend'}"
                      @click="modelType = 'recommend'"
                    >
                      推荐模特
                    </div>
                    <div 
                      class="tab-item"
                      :class="{'tab-item-active': modelType === 'custom'}"
                      @click="modelType = 'custom'"
                    >
                      定制模特
                    </div>
                  </div>

                  <!-- 面具说明 -->
                  <div class="text-16px color-#000 font-medium mt-32px">
                    面具（实际模特生成效果将尽可能还原头像展示效果）
                  </div>

                  <!-- 模特列表 -->
                  <div class="model-grid">
                    <div v-for="model in modelList" :key="model.name" class="relative">
                      <img 
                        :src="model.image"
                        crossorigin="anonymous"
                        class="model-item w-130px h-130px rounded-4px mt-16px mr-16px"
                        :alt="model.name"
                        @click="selectModel(model)"
                      >
                      <div class="local-mask">{{model.name}}</div>
                    </div>
                  </div>

                  <!-- 标签选择区域 -->
                  <div class="tag-content">
                    <!-- 发型标签 -->
                    <div class="mt-32px">
                      <div class="text-16px color-#000 font-medium">发型</div>
                      <div class="w-full flex flex-wrap">
                        <div 
                          v-for="hair in hairStyles" 
                          :key="hair"
                          class="tag-item h-44px px-24px mt-16px mr-16px rounded-34px text-18px color-#4E5969 leading-44px text-center cursor-pointer"
                          :class="{'tag-active': selectedHair === hair}"
                          @click="selectedHair = hair"
                        >
                          {{hair}}
                        </div>
                      </div>
                    </div>

                    <!-- 年龄标签 -->
                    <div class="mt-32px">
                      <div class="text-16px color-#000 font-medium">年龄</div>
                      <div class="w-full flex flex-wrap">
                        <div 
                          v-for="age in ageGroups" 
                          :key="age"
                          class="tag-item h-44px px-24px mt-16px mr-16px rounded-34px text-18px color-#4E5969 leading-44px text-center cursor-pointer"
                          :class="{'tag-active': selectedAge === age}"
                          @click="selectedAge = age"
                        >
                          {{age}}
                        </div>
                      </div>
                    </div>

                    <!-- 表情标签 -->
                    <div class="mt-32px">
                      <div class="text-16px color-#000 font-medium">表情</div>
                      <div class="w-full flex flex-wrap">
                        <div 
                          v-for="expression in expressions" 
                          :key="expression"
                          class="tag-item h-44px px-24px mt-16px mr-16px rounded-34px text-18px color-#4E5969 leading-44px text-center cursor-pointer"
                          :class="{'tag-active': selectedExpression === expression}"
                          @click="selectedExpression = expression"
                        >
                          {{expression}}
                        </div>
                      </div>
                    </div>

                    <!-- 身型标签 -->
                    <div class="mt-32px">
                      <div class="text-16px color-#000 font-medium">身型</div>
                      <div class="w-full flex flex-wrap">
                        <div 
                          v-for="body in bodyTypes" 
                          :key="body"
                          class="tag-item h-44px px-24px mt-16px mr-16px rounded-34px text-18px color-#4E5969 leading-44px text-center cursor-pointer"
                          :class="{'tag-active': selectedBody === body}"
                          @click="selectedBody = body"
                        >
                          {{body}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 场景选择部分 -->
                <div class="text-16px color-#000 font-medium mb-16px mt-32px">场景选择</div>
                <div class="model-con">
                  <div class="tab-con">
                    <div 
                      v-for="scene in sceneTypes" 
                      :key="scene"
                      class="tab-item tab-item-local"
                      :class="{'tab-item-local-active': selectedSceneType === scene}"
                      @click="selectedSceneType = scene"
                    >
                      {{scene}}
                    </div>
                  </div>

                  <div class="scene-grid">
                    <div v-for="scene in sceneList" :key="scene.name" class="relative">
                      <img 
                        :src="scene.image"
                        crossorigin="anonymous"
                        class="locall-item w-130px h-130px rounded-4px mt-16px mr-16px"
                        :alt="scene.name"
                        @click="selectScene(scene)"
                      >
                      <div class="local-mask">{{scene.name}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <!-- 高级自定义 tab -->
            <el-tab-pane name="advanced">
              <span slot="label">
                <i class="el-icon-setting"></i> 高级自定义
              </span>
              
              <!-- 算法倾向设置 -->
              <div class="section-block">
                <div class="block-title">
                  算法倾向
                  <el-tooltip content="调整生成图片的风格倾向" placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </div>
                
                <div class="algorithm-slider">
                  <el-row :gutter="20">
                    <el-col :span="16">
                      <el-slider
                        v-model="algorithmValue"
                        :min="0"
                        :max="1"
                        :step="0.1"
                      ></el-slider>
                    </el-col>
                    <el-col :span="8">
                      <el-input-number
                        v-model="algorithmValue"
                        :min="0"
                        :max="1"
                        :step="0.1"
                        :precision="1"
                        size="small"
                        controls-position="right"
                      ></el-input-number>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- 咒语输入区域 -->
              <div class="section-block">
                <div class="block-title">咒语</div>
                <div class="prompts-container">
                  <div class="prompt-box">
                    <div class="prompt-label positive">正向咒语</div>
                    <el-input
                      type="textarea"
                      v-model="positivePrompt"
                      :rows="8"
                      placeholder="请输入正向咒语（必填）"
                    ></el-input>
                    <div class="prompt-footer">
                      <el-button type="text" size="small" @click="clearPrompt('positive')">
                        <i class="el-icon-delete"></i> 清空
                      </el-button>
                    </div>
                  </div>

                  <div class="prompt-box">
                    <div class="prompt-label negative">反向咒语</div>
                    <el-input
                      type="textarea"
                      v-model="negativePrompt"
                      :rows="8"
                      placeholder="请输入反向咒语"
                    ></el-input>
                    <div class="prompt-footer">
                      <el-button type="text" size="small" @click="clearPrompt('negative')">
                        <i class="el-icon-delete"></i> 清空
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <!-- 复刻其他任务 tab -->
            <el-tab-pane name="copy">
              <span slot="label">
                <i class="el-icon-copy-document"></i> 复刻其他任务
              </span>
              
              <div class="section-block">
                <div class="task-selection">
                  <div class="selection-item">
                    <span class="label">任务号</span>
                    <el-select 
                      v-model="copyTaskId"
                      filterable
                      placeholder="请选择任务号"
                      class="task-select"
                    >
                      <el-option
                        v-for="task in taskList"
                        :key="task.id"
                        :label="task.name"
                        :value="task.id"
                      >
                      </el-option>
                    </el-select>
                    <el-tooltip content="选择要复刻的任务" placement="top">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                  </div>

                  <div class="selection-item">
                    <span class="label">执行次数</span>
                    <el-select 
                      v-model="executionTimes"
                      placeholder="请选择执行次数"
                      class="times-select"
                    >
                      <el-option
                        v-for="num in [1,2,3,4,5]"
                        :key="num"
                        :label="`${num}次`"
                        :value="num"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="copy-instruction">
                  请选择其中一张作为本次执行的模特和场景：
                </div>

                <div class="copy-images">
                  <div 
                    v-for="(image, index) in selectedTaskImages"
                    :key="index"
                    :class="['copy-image-item', { active: selectedImageIndex === index }]"
                    @click="selectImage(index)"
                  >
                    <el-image 
                      :src="image.url"
                      fit="cover"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div class="select-mask" v-show="selectedImageIndex === index">
                      <i class="el-icon-check"></i>
                    </div>
                  </div>
                </div>

                <div class="copy-tips">
                  <div class="tips-title">【复刻任务】操作要点及操作教程：</div>
                  <ul class="tips-list">
                    <li>如需实现同商品套图。复刻任务上传的原图须与被复刻任务为同一个商品的图片（同款同色，不同展示角度的商品图）</li>
                    <li>被复刻的任务（即原任务），请选用模特正脸的照片，如果是侧脸图，效果则无法保证</li>
                    <li>复刻任务图中模特面部占比与被复刻任务中模特面部图片占比需保持一致。反之，则效果无法保证</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <i class="el-icon-picture-outline-round"></i>
        <p>选择左侧任务或新建任务开始创作</p>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar" v-if="currentTask">
      <div class="points-info">
        <el-tooltip content="消耗积分" placement="top">
          <i class="el-icon-coin"></i>
        </el-tooltip>
        <span class="points-text">
          消耗 <span class="highlight">{{ taskConfig.points }}</span> 点
          <span class="total-points">共 {{ userPoints }} 点</span>
        </span>
      </div>
      
      <div class="action-buttons">
        <el-button @click="saveAsDraft">
          <i class="el-icon-document-add"></i> 保存草稿
        </el-button>
        <el-button type="primary" @click="startGenerate" :loading="generating">
          <i class="el-icon-video-play"></i> 开始生成
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateRenTai',
  data() {
    return {
      loading: false,
      generating: false,
      taskList: [
        { 
          id: 1, 
          name: '任务-37737',
          createTime: '2024-03-18 10:00'
        }
      ],
      currentTask: null,
      activeTab: 'text',
      taskConfig: {
        description: '',
        points: 80
      },
      userPoints: 1000,
      examples: [
        { url: require('@/assets/imgs/user_img_default1.png') },
        { url: require('@/assets/imgs/user_img_default2.png') },
        { url: require('@/assets/imgs/user_img_default1.png') },
        { url: require('@/assets/imgs/user_img_default2.png') }
      ],
      modelType: 'recommend',
      modelList: [
        { name: '亚洲男人', image: 'https://s.photomagic.cn/pm/public/models/亚洲男人.png' },
        { name: '亚洲女人', image: 'https://s.photomagic.cn/pm/public/models/亚洲女人.png' },
        { name: '欧洲男人', image: 'https://s.photomagic.cn/pm/public/models/欧洲男人.png' },
        { name: '欧洲女人', image: 'https://s.photomagic.cn/pm/public/models/欧洲女人.png' },
        { name: '非洲男人', image: 'https://s.photomagic.cn/pm/public/models/非洲男人.png' },
        { name: '非洲女人', image: 'https://s.photomagic.cn/pm/public/models/非洲女人.png' }
      ],
      hairStyles: ['长发', '短发', '直发', '卷发', '波浪发', '马尾', '双马尾'],
      selectedHair: '',
      ageGroups: ['幼童', '儿童', '青少年', '青年', '中年', '老年'],
      selectedAge: '',
      expressions: ['微笑', '大笑', '高冷', '平静'],
      selectedExpression: '',
      bodyTypes: ['胖', '瘦', '丰满', '肌肉', '魔鬼身材', '娇小可爱', '高大', '怀孕'],
      selectedBody: '',
      sceneTypes: ['室外场景', '室内场景', '纯色场景'],
      selectedSceneType: '室外场景',
      sceneList: [
        { name: '城堡', image: 'https://s.photomagic.cn/pm/public/scenes/城堡.png' },
        { name: '摩天轮', image: 'https://s.photomagic.cn/pm/public/scenes/摩天轮.png' },
        // ... 其他场景
      ],
      algorithmValue: 0.7,
      positivePrompt: '',
      negativePrompt: '',
      advancedParams: {
        sampler: 'euler_a',
        steps: 30,
        cfg: 7,
        seed: ''
      },
      samplers: [
        { label: 'Euler a', value: 'euler_a' },
        { label: 'Euler', value: 'euler' },
        { label: 'DPM++ 2M Karras', value: 'dpm++_2m_karras' },
        { label: 'DPM++ SDE Karras', value: 'dpm++_sde_karras' },
        { label: 'UniPC', value: 'unipc' }
      ],
      copyTaskId: '',
      executionTimes: 1,
      selectedImageIndex: -1,
      selectedTaskImages: [
        { url: require('@/assets/imgs/user_img_default1.png') },
        { url: require('@/assets/imgs/user_img_default2.png') },
        { url: require('@/assets/imgs/user_img_default1.png') },
        { url: require('@/assets/imgs/user_img_default2.png') }
      ],
      taskIdCounter: 37738, // 用于生成新任务ID
    }
  },
  methods: {
    createNewTask() {
      // 清空当前任务
      this.currentTask = null
      
      // 创建新任务对象
      const newTask = {
        id: this.taskIdCounter,
        name: `任务-${this.taskIdCounter}`,
        createTime: this.formatDate(new Date()),
        status: 'new'
      }

      // 添加到任务列表
      this.taskList.unshift(newTask)
      
      // 选中新任务
      this.$nextTick(() => {
        this.selectTask(newTask)
      })

      // 更新计数器
      this.taskIdCounter++

      // 提示创建成功
      this.$message({
        type: 'success',
        message: '新建任务成功'
      })
    },

    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    },

    // 选择任务
    selectTask(task) {
      if (this.generating) {
        this.$message.warning('当前任务正在生成中，请稍后切换')
        return
      }
      
      this.currentTask = task
      
      // 重置任务配置
      this.taskConfig = {
        description: '',
        points: 80
      }
      
      // 重置上传区域
      this.uploadedImage = null
      this.mattingImage = null
      
      // 切换到第一个 tab
      this.activeTab = 'text'
      
      // 可以在这里加载任务详情
      // this.loadTaskDetail(task.id)
    },

    handleCommand(command, task) {
      switch (command) {
        case 'edit':
          this.selectTask(task)
          break
        case 'delete':
          this.deleteTask(task)
          break
      }
    },

    deleteTask(task) {
      this.$confirm('确认删除该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.taskList.findIndex(t => t.id === task.id)
        if (index > -1) {
          this.taskList.splice(index, 1)
          
          // 如果��除的是当前任务，清空当前任务
          if (this.currentTask && this.currentTask.id === task.id) {
            this.currentTask = null
          }
          
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      }).catch(() => {
        // 取消删除
      })
    },

    handleBeforeUpload(file) {
      // 处理上传前的验证
      return false
    },
    selectExample(example) {
      // 选择示例图片
    },
    clearDescription() {
      this.taskConfig.description = ''
    },
    async startGenerate() {
      if (!this.validateConfig()) return
      
      this.generating = true
      try {
        await this.generateImage()
        this.$message.success('生成成功')
      } catch (error) {
        this.$message.error('生成失败:' + error.message)
      } finally {
        this.generating = false
      }
    },
    validateConfig() {
      if (!this.taskConfig.description) {
        this.$message.warning('请输入图片描述')
        return false
      }
      // 其他验证...
      return true
    },
    selectImage(index) {
      this.selectedImageIndex = index
    },
    selectModel(model) {
      this.selectedModel = model.name
    },
    selectScene(scene) {
      this.selectedScene = scene.name
    }
  }
}
</script>

<style lang="scss" scoped>
.create-rentai {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
}

/* 左侧任务栏 */
.task-sidebar {
  width: 300px;
  background: #fff;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  
  .task-header {
    padding: 20px;
    border-bottom: 1px solid #e6e6e6;
    
    h2 {
      display: flex;
      align-items: center;
      font-size: 18px;
      margin-bottom: 8px;
      
      i {
        margin-right: 8px;
        color: #409EFF;
      }
    }
    
    .task-desc {
      font-size: 13px;
      color: #909399;
      line-height: 1.5;
    }
  }
  
  .create-btn {
    margin: 16px 20px;
    height: 40px;
    
    i {
      margin-right: 4px;
    }
  }
}

/* 任务列表 */
.task-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 12px;
  
  .task-item {
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 8px 0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background: #f5f7fa;
    }
    
    &.is-active {
      background: #ecf5ff;
      border-left: 3px solid #409EFF;
      
      .task-icon {
        background: rgba(64, 158, 255, 0.1);
        
        i {
          color: #409EFF;
        }
      }
      
      .task-name {
        color: #409EFF;
        font-weight: 500;
      }
    }
  }
  
  .task-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    
    i {
      font-size: 20px;
      color: #909399;
    }
  }
  
  .task-info {
    flex: 1;
    
    .task-name {
      font-size: 14px;
      margin-bottom: 4px;
    }
    
    .task-time {
      font-size: 12px;
      color: #909399;
      margin-top: 4px;
    }
  }
  
  .el-dropdown {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover {
    .el-dropdown {
      opacity: 1;
    }
  }
}

/* 主内容区 */
.main-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

/* 上传区域 */
.upload-section {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  .el-upload-dragger {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    
    &:hover {
      border: none;
      background: rgba(48, 58, 242, 0.02);
    }
  }
}

#upload-img, #matting {
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(48, 58, 242, 0.1);
    border-color: rgba(48, 58, 242, 0.2);
  }
}

.example-item {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

/* 自定义滚动条样式 */
.overflow-x-scroll {
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f5f7fa;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #dcdfe6;
    border-radius: 3px;
    
    &:hover {
      background: #c0c4cc;
    }
  }
}

/* 添加更多动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.upload-section {
  animation: fadeIn 0.3s ease-out;
}

/* 优化图片预览效果 */
.el-image {
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.03);
    opacity: 0;
    transition: all 0.3s;
  }
  
  &:hover::after {
    opacity: 1;
  }
}

/* 添加加载状态样式 */
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  
  i {
    font-size: 24px;
  }
}

/* 底部操作栏 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 300px;
  height: 60px;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  
  .points-info {
    display: flex;
    align-items: center;
    
    i {
      font-size: 20px;
      color: #f5ba4c;
      margin-right: 8px;
    }
    
    .highlight {
      color: #409EFF;
      font-weight: 500;
      font-size: 16px;
      margin: 0 4px;
    }
    
    .total-points {
      color: #909399;
      margin-left: 8px;
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 12px;
  }
}

/* 空状态 */
.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
  
  i {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 14px;
  }
}

/* 添加更多的交互动画 */
.create-btn {
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.3) 50%,
      rgba(255,255,255,0) 100%
    );
    transform: rotate(45deg);
    animation: buttonShine 2s infinite;
  }
}

@keyframes buttonShine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

/* 新增样式 */
.section-block {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 24px;

  .block-title {
    font-size: 16px;
    font-weight: 500;
    color: #1D2129;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.tab-header {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;

  .tab-item {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    color: #4E5969;
    transition: all 0.3s;

    &.active {
      background: #ECF5FF;
      color: #409EFF;
    }
  }
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 16px;
  margin: 16px 0;
}

.model-item {
  position: relative;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }

  &.active {
    .model-image {
      border: 2px solid #409EFF;
    }
  }
}

.model-image {
  width: 130px;
  height: 130px;
  border-radius: 4px;
  overflow: hidden;
}

.model-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 12px;
  text-align: center;
}

.tags-section {
  margin-top: 32px;
}

.tag-group {
  margin-bottom: 24px;

  .group-title {
    font-size: 16px;
    color: #000;
    font-weight: 500;
    margin-bottom: 16px;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-item {
  height: 44px;
  padding: 0 24px;
  border-radius: 22px;
  background: #F5F7FA;
  color: #4E5969;
  font-size: 18px;
  line-height: 44px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #ECF5FF;
    color: #409EFF;
  }

  &.active {
    background: #409EFF;
    color: #fff;
  }
}

.prompts-container {
  display: flex;
  gap: 24px;
}

.prompt-box {
  flex: 1;
  position: relative;
}

.prompt-label {
  width: 72px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;

  &.positive {
    background: #F0F3FF;
    color: #303AF2;
  }

  &.negative {
    background: #FFECE8;
    color: #F53F3F;
  }
}

.prompt-footer {
  position: absolute;
  right: 16px;
  bottom: 16px;
}

.copy-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin: 16px 0;
}

.copy-image-item {
  position: relative;
  cursor: pointer;

  .el-image {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
  }

  .select-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(64, 158, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    i {
      font-size: 32px;
      color: #fff;
    }
  }
}

.copy-tips {
  margin-top: 24px;
  padding: 16px;
  background: #F5F7FA;
  border-radius: 8px;

  .tips-title {
    font-size: 16px;
    font-weight: 500;
    color: #1D2129;
    margin-bottom: 12px;
  }

  .tips-list {
    margin: 0;
    padding-left: 20px;
    color: #86909C;

    li {
      margin-bottom: 8px;
      line-height: 1.6;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

/* 快捷模板相关样式 */
.model-con {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.tab-con {
  display: flex;
  gap: 16px;
}

.tab-item {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  color: #4E5969;
  transition: all 0.3s;
  
  &.tab-item-active {
    background: #ECF5FF;
    color: #409EFF;
  }
  
  &.tab-item-local {
    border-radius: 20px;
    
    &.tab-item-local-active {
      background: #409EFF;
      color: #fff;
    }
  }
}

.model-item {
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
}

.local-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 12px;
  text-align: center;
}

.tag-item {
  transition: all 0.3s;
  
  &:hover {
    background: #ECF5FF;
    color: #409EFF;
  }
  
  &.tag-active {
    background: #409EFF;
    color: #fff;
  }
}

.locall-item {
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
}

/* 修改模特和场景图片的样式 */
.model-item, .locall-item {
  width: 130px !important;
  height: 130px !important;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
}

/* 修改图片容器的样式 */
.w-full.flex.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 0;
}

.relative {
  position: relative;
  width: 130px;
  height: 130px;
  margin-right: 16px;
  margin-top: 16px;
}

/* 修改遮罩层样式 */
.local-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 24px;
  line-height: 24px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 12px;
  text-align: center;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

/* 选中状态样式 */
.model-item.active, .locall-item.active {
  border: 2px solid #409EFF;
}

/* 标签组样式优化 */
.tag-content {
  margin-top: 32px;
}

.tag-item {
  height: 44px;
  padding: 0 24px;
  margin: 16px 16px 0 0;
  border-radius: 34px;
  font-size: 18px;
  color: #4E5969;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  background: #F5F7FA;
  transition: all 0.3s;
  
  &:hover {
    background: #ECF5FF;
    color: #409EFF;
  }
  
  &.tag-active {
    background: #409EFF;
    color: #fff;
  }
}

/* 场景选择标签样式 */
.tab-item-local {
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  color: #4E5969;
  transition: all 0.3s;
  
  &.tab-item-local-active {
    background: #409EFF;
    color: #fff;
  }
}

/* 修复图片网格布局 */
.model-grid, .scene-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  gap: 16px;
  padding: 16px 0;
}
</style> 