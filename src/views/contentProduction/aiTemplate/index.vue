<template>
  <div class="video-list">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="全部" name="all">
        <div class="videoPage">
          <!-- 行业筛选 -->
          <div class="videoPage-form">
            <el-form inline>
              <el-form-item label="行业：">
                <div class="industry-filter">
                  <div 
                    v-for="item in industryOptions" 
                    :key="item.value"
                    :class="['industry-item', filterForm.industry === item.value ? 'active' : '']"
                    @click="handleIndustrySelect(item.value)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>

          <!-- 筛选条件 -->
          <div class="videoPage-form-filter">
            <div class="videoPage-form-filter-select">
              <!-- 版式选择 -->
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAVpJREFUWEftmN1NwzAUhc81A8AIjBLejJQWsDoATAAbNGwAEwDvEKq2En4jq7BBJvCFRAQ1bULstKlcyXmNfe/n6+OfY4JnH3nGg8MAkpeTCMZEg1ZPiEzPXrP1HBsVkrGa/tQtGRSmCk5I9Dy9X81VA5LxJAKZTyLkMPzCgnIrMMa0bEeoBW/ty3xKRBfMOMGROFutVB1orBKUwelZL95urGAAyJHioq1epNaaPB9fPTDTbTEIPU//ZqQZaK1RF1gfIFkNPgC1lDdUqFN3QUMdJdqLhrqmqfH/kMveOyCXnXovUxaA2jQy/FnWS51up72bhrwDCtePcEHbFKWbqIOGDk1DxPz4sXy/s92Oeu3UI/UE4Pp/G1QZRSBn0AzEX1ZQjkaRGMcFDKPDKBbJZawS0K8TtaLZolHD4ml0mqWlFgM/NhiR6aXFY8MW491JV2svvpNsFkG8A/oGmXenNJhZ25QAAAAASUVORK5CYII=">
                <el-select v-model="filterForm.format" placeholder="版式">
                  <el-option label="竖版(9:16)" value="9:16" />
                  <el-option label="横版(16:9)" value="16:9" />
                </el-select>
              </div>

              <!-- 素材段数 -->
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAVlJREFUWEftmM1Nw0AQhd9bCoAS6ABKCLdFCiGxciepADqI0wFUEHOHkD+JvZESoAQ6SAV+YCRHtvOHRBwSafe6o5nnb0fefUPs2eKe6cFhCLL1ZgVxXCmVnjFTN3iaFmssELLVoPPNLSxVTJqcCN2o383Wygmy1WYFjN9IzBDrUYazXLB4JqhO8V1Gw3WiCV5LOic4EPWRi5VOyWQfJzgyF1lSeUG1IITQARi58XO7WNBeBS0APRhGbri4n423tUYE8QZA2437UTHXZa1xL/EWRNeN+vMTWS6oEJQm26Ygm368F7TiyDyhTU3tCXlCf/0x+h7yPeR7KPsk8Lf9nMCKN4on5AkB8FfHVq8OSg+vk5e7Mm2QvQp6AFrrbVBqFIGZwAGozzKMIoXjRIywwSgmxW01CMHELO5gLfF/S6cfP5balDxsiM3UTX4xbNgBl7UlDmM+9J+UvgDhRn1DqJpNbQAAAABJRU5ErkJggg==">
                <el-select v-model="filterForm.clipCount" placeholder="素材段数">
                  <el-option 
                    v-for="n in 6" 
                    :key="n" 
                    :label="n" 
                    :value="n"
                  />
                </el-select>
              </div>

              <!-- 时长 -->
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA4lJREFUWEfNmE1W2lAYht/vXn8Y6g5wBYUVFGfQIxSwHasrUFegXYG4AnHWc1owNj2SmXYFsgOzAx1qa/L13OQGk5CQhFKPTLk/z32//xDe2I/eGA8KA7Xb7bVHR7Qh6D05qIC4zMCaehgBD2CymTAG+FdJuoZhGA9FHp0bqN5ul8kR+wB2A4B8F1EfcvmLZXy186zPBFKKPLniiBkHLwfSDYEvScqbFfyxAxU89Z6XKkRuhUEfAa4FewjojczhYRbUTCClChxxDaDsH1Tstf5+OgZoR4PYkCubs9RKBfrQ/lxxHefCgyHYQsjOlfFtnPXCpP89MFdcg72H2cKRnaur5LMSgaLK8HlJ8kFR54yDeaZ35BmD2woqTalkoGb3TilDIGNkDjpZqtT99bDM4Ub22k5fm9AuSbcaf+gUUKPVPfEcmGCXxPSGRJM0u6yBcgXJoytulfmSHD1ygDaV91rIlY28oVovAKSO1v55m3RPFKjZPVN5RkWTZQ72suQP/i8KpPbVm77piPl09PNiklImQDoD3xdVxz88v8kmj/BTyp3K7qvS3Qh8aQJUb3Z3AZwBdGOZg8286swL5O/bvtbJc88yh31dfvyr69pcBByOzGHvNYAaze4BAycQ1LcufReZKNRobd8ycwVSbFrG95vXAAqcm4jGox+Dagyoe8+MtZJ014smwXl8SF0e+K3yo5E5XI+bLHcuiasXABVJFWkRGnbq+YFa3bugTmUVz7THWObQYwn50D+YLFY880LNNFng1EK61SvDKFzV4xU9D1R961MN5F4nOnW91emDaWeesI8ku1CbkQU1CftQZVhIYgz7RRGlZiZG3areqdCfJ1pmQSW1GeFCHk41keLaaHV6zLRftLgmtiQhRydQZ2QOjAh0SiFPbT+EI6tpbWbeLO5PKrIyBaMLa2b7oRY0tjo9JqUSEju6vDBp63Soq16oHG89InkoOMDboDu6RZguDtZobl94fTXBtn5Mt7zpTb4OX9VXr0pnr2h9i4NoZU68BpBgQySPQ7PHINe5mLckhIGKjFTZg+JLoptzUBRHflvsFapUZYIH5JoSnp7pWDu63ueP0izFuITncXiU/o3lMjtObWqUZj5dXeLjLNNnAkXKQnQszgw4IjzA5XNeWu3lnWByA0WiUH2OAdeIxDuAy152VxZRANCfY9z//DkmU44FLSis0ILuTT3mLyw+QUMJGQnhAAAAAElFTkSuQmCC">
                <el-select v-model="filterForm.duration" placeholder="时长">
                  <el-option label="1-10秒" value="1-10" />
                  <el-option label="11-15秒" value="11-15" />
                  <el-option label="16-20秒" value="16-20" />
                  <el-option label="21-30秒" value="21-30" />
                  <el-option label=">=31秒" value="31+" />
                </el-select>
              </div>
            </div>

            <!-- 时间排序 -->
            <div>
              <div class="caret-wrapper">
                <span>时间排序</span>
                <div>
                  <i 
                    class="el-icon-caret-top"
                    :class="{ active: filterForm.sort === 'asc' }"
                    @click="handleSort('asc')"
                  ></i>
                  <i 
                    class="el-icon-caret-bottom"
                    :class="{ active: filterForm.sort === 'desc' }"
                    @click="handleSort('desc')"
                  ></i>
                </div>
              </div>
            </div>
          </div>

          <!-- 视频列表 -->
          <div class="video">
            <div class="video-list">
              <div 
                v-for="item in mockVideoList" 
                :key="item.id" 
                class="video-item"
              >
                <div class="video-item-wrap">
                  <div class="video-item-image" @click="handlePlay(item)">
                    <video 
                      :src="item.videoUrl" 
                      class="preview-video"
                      preload="metadata"
                    ></video>
                    <div class="video-item-overlay">
                      <span class="video-item-play">
                        <i class="el-icon-video-play"></i>
                      </span>
                    </div>
                    <div class="video-item-copy" @click.stop="handleCopy(item)">
                      剪同款
                    </div>
                    <span class="video-item-duration">{{ item.duration }}</span>
                  </div>
                  <div class="video-item-text">{{ item.title }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="videoPage-footer">
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
      </el-tab-pane>
      <el-tab-pane label="系统模板" name="system">
        <div class="videoPage" v-if="systemTemplates.length">
          <div class="video-list">
            <div v-for="item in systemTemplates" :key="item.id" class="video-item">
              <div class="video-item-wrap">
                <div class="video-item-image" @click="handlePlay(item)">
                  <video 
                    :src="item.videoUrl" 
                    class="preview-video"
                    preload="metadata"
                  ></video>
                  <div class="video-item-overlay">
                    <span class="video-item-play"></span>
                  </div>
                  <span class="video-item-duration">{{ item.duration }}</span>
                  <span class="video-item-copy" @click.stop="handleCopy(item)">剪同款</span>
                </div>
                <div class="video-item-text">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <el-empty v-else description="暂无系统模板"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="我的模板" name="my">
        <div class="videoPage">
          <!-- 上传按钮 -->
          <div class="upload-section">
            <el-button type="primary" @click="handleUpload">
              <i class="el-icon-upload"></i> 上传模板
            </el-button>
          </div>

          <!-- 视频列表 -->
          <div class="video-list" v-if="myTemplates.length">
            <div v-for="item in myTemplates" :key="item.id" class="video-item">
              <div class="video-item-wrap">
                <div class="video-item-image" @click="handlePlay(item)">
                  <video 
                    :src="item.videoUrl" 
                    class="preview-video"
                    preload="metadata"
                  ></video>
                  <div class="video-item-overlay">
                    <span class="video-item-play"></span>
                  </div>
                  <span class="video-item-duration">{{ item.duration }}</span>
                  <span class="video-item-copy" @click.stop="handleCopy(item)">剪同款</span>
                </div>
                <div class="video-item-text">{{ item.title }}</div>
              </div>
            </div>
          </div>
          <el-empty v-else description="暂无我的模板"></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 视频播放弹窗 -->
    <el-dialog
      title="播放视频"
      :visible.sync="dialogVisible"
      width="760px"
      @close="handleDialogClose"
      class="video-dialog"
    >
      <div class="video-player" v-if="currentVideo">
        <video 
          :src="currentVideo.videoUrl" 
          controls
          autoplay
          class="preview-video"
          ref="videoPlayer"
        ></video>
      </div>
    </el-dialog>

    <!-- 上传模板弹窗 -->
    <el-dialog
      title="上传模板"
      :visible.sync="uploadDialogVisible"
      width="500px"
    >
      <el-upload
        class="upload-video"
        action="/api/upload"
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        accept="video/*"
      >
        <i class="el-icon-plus"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AiTemplate',
  data() {
    return {
      activeTab: 'all',
      filterForm: {
        industry: '',
        format: '',
        clipCount: '',
        duration: '',
        sort: 'desc'
      },
      industryOptions: [
        { label: '丽人美发', value: '1' },
        { label: '餐饮美食', value: '2' },
        { label: '休闲娱乐', value: '3' },
        { label: '亲子', value: '4' },
        { label: '游玩', value: '5' },
        { label: '住宿', value: '6' },
        { label: '商场购物', value: '7' },
        { label: '生产制造', value: '8' },
        { label: '电商', value: '9' },
        { label: '传统服务', value: '10' }
      ],
      videoList: [],
      page: {
        current: 1,
        size: 20,
        total: 0
      },
      dialogVisible: false,
      currentVideo: null,
      mockVideoList: [
        {
          id: 1,
          title: '示例视频1',
          videoUrl: require('@/assets/videos/temp1.mp4'),
          duration: '00:15',
          cover: 'video-cover-1.jpg'
        },
        {
          id: 2,
          title: '示例视频2',
          videoUrl: require('@/assets/videos/temp1.mp4'),
          duration: '00:15',
          cover: 'video-cover-2.jpg'
        },
        {
          id: 3,
          title: '示例视频3',
          videoUrl: require('@/assets/videos/temp1.mp4'),
          duration: '00:15',
          cover: 'video-cover-3.jpg'
        },
        {
          id: 4,
          title: '示例视频4',
          videoUrl: require('@/assets/videos/temp1.mp4'),
          duration: '00:15',
          cover: 'video-cover-4.jpg'
        }
      ],
      systemTemplates: [], // 系统模板列表
      myTemplates: [], // 我的模板列表
      uploadDialogVisible: false
    }
  },
  methods: {
    handleSort(type) {
      this.filterForm.sort = type
      this.getList()
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
      // 获取视频列表数据
    },
    handleIndustrySelect(value) {
      this.filterForm.industry = value
      this.getList()
    },
    handlePlay(item) {
      this.currentVideo = item
      this.dialogVisible = true
    },
    handleDialogClose() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.pause()
      }
      this.currentVideo = null
    },
    handleCopy(item) {
      // 跳转到创建页面
      this.$router.push({
        path: '/home/contentProduction/aiMixing/create',
        query: { templateId: item.id }
      })
    },
    handleUpload() {
      this.uploadDialogVisible = true
    },
    beforeUpload(file) {
      // 文件上传前的验证
      const isVideo = file.type.startsWith('video/')
      const isLt100M = file.size / 1024 / 1024 < 100

      if (!isVideo) {
        this.$message.error('请上传视频文件!')
        return false
      }
      if (!isLt100M) {
        this.$message.error('视频大小不能超过 100MB!')
        return false
      }
      return true
    },
    handleUploadSuccess(res) {
      this.$message.success('上传成功')
      this.uploadDialogVisible = false
      this.getMyTemplates() // 刷新我的模板列表
    },
    handleUploadError() {
      this.$message.error('上传失败')
    }
  }
}
</script>

<style lang="scss" scoped>
.video-list {
  padding: 20px;

  .videoPage {
    &-form {
      margin-bottom: 20px;
      
      .industry-filter {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        
        .industry-item {
          padding: 8px 16px;
          border: 1px solid #DCDFE6;
          border-radius: 20px;
          font-size: 14px;
          color: #606266;
          cursor: pointer;
          transition: all 0.3s;
          
          &:hover {
            color: #409EFF;
            border-color: #409EFF;
          }
          
          &.active {
            color: #409EFF;
            border-color: #409EFF;
            background-color: #ecf5ff;
          }
        }
      }
    }

    &-form-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      &-select {
        display: flex;
        gap: 20px;

        > div {
          display: flex;
          align-items: center;
          gap: 10px;

          img {
            width: 24px;
            height: 24px;
          }
        }
      }

      .caret-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;

        i {
          &.active {
            color: #409EFF;
          }
        }
      }
    }
  }

  .video-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .video-item {
    &-wrap {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    &-image {
      position: relative;
      padding-top: 56.25%;
      background: #f5f7fa;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        .video-item-overlay {
          opacity: 1;
        }
      }

      .preview-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s;

      .video-item-play {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 24px;
          color: #fff;
        }
      }
    }

    &-copy {
      position: absolute;
      left: 10px;
      top: 10px;
      padding: 4px 12px;
      background: rgba(64, 158, 255, 0.9);
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      z-index: 2;
      transition: all 0.3s;

      &:hover {
        background: #409EFF;
        transform: scale(1.05);
      }
    }

    &-duration {
      position: absolute;
      right: 10px;
      bottom: 10px;
      padding: 2px 6px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
      z-index: 2;
    }

    &-text {
      padding: 12px;
      flex: 1;
    }
  }
}

.video-player {
  width: 100%;
  height: 400px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.video-item {
  &-image {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 4px;

    &:hover {
      .video-item-overlay {
        opacity: 1;
      }
    }
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &-duration {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
  }

  &-copy {
    position: absolute;
    left: 10px;
    top: 10px;
    padding: 4px 8px;
    background: rgba(64, 158, 255, 0.9);
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(64, 158, 255, 1);
    }
  }
}

.upload-section {
  margin-bottom: 20px;
  text-align: right;
}

.upload-video {
  text-align: center;
  
  .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
    margin-bottom: 10px;
  }

  .el-upload__text {
    color: #606266;
    
    em {
      color: #409EFF;
      font-style: normal;
    }
  }
}

.el-empty {
  padding: 40px 0;
}

.video-dialog {
  .video-player {
    width: 100%;
    background: #000;
    border-radius: 4px;
    overflow: hidden;
    
    video {
      width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }
  }
}
</style>
