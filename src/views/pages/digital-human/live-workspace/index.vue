<template>
  <div class="live-workspace">
    <!-- 左侧直播预览区 -->
    <div class="preview-section">
      <div class="preview-window">
        <div class="preview-placeholder">
          <i class="el-icon-video-camera"></i>
          <p>直播预览</p>
        </div>
      </div>
      <div class="control-panel">
        <el-button type="primary" size="medium">
          <i class="el-icon-video-play"></i>
          开始直播
        </el-button>
        <el-button size="medium">
          <i class="el-icon-setting"></i>
          直播设置
        </el-button>
      </div>
    </div>

    <!-- 右侧控制区 -->
    <div class="control-section">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="数字人设置" name="avatar">
          <div class="avatar-settings">
            <el-form label-width="80px">
              <el-form-item label="选择形象">
                <el-select v-model="selectedAvatar" placeholder="请选择数字人形象">
                  <el-option label="主播小美" value="avatar1"></el-option>
                  <el-option label="主播小帅" value="avatar2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="背景设置">
                <el-radio-group v-model="bgType">
                  <el-radio label="color">纯色背景</el-radio>
                  <el-radio label="image">图片背景</el-radio>
                  <el-radio label="video">视频背景</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="互动设置" name="interaction">
          <div class="interaction-settings">
            <el-form label-width="80px">
              <el-form-item label="互动模式">
                <el-switch v-model="interactionEnabled"></el-switch>
              </el-form-item>
              <el-form-item label="问答设置" v-if="interactionEnabled">
                <el-checkbox-group v-model="qaSettings">
                  <el-checkbox label="autoReply">自动回复</el-checkbox>
                  <el-checkbox label="voiceInteraction">语音互动</el-checkbox>
                  <el-checkbox label="gestureResponse">手势响应</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="直播数据" name="stats">
          <div class="live-stats">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="stat-card">
                  <div class="stat-title">观看人数</div>
                  <div class="stat-value">0</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="stat-card">
                  <div class="stat-title">互动次数</div>
                  <div class="stat-value">0</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveWorkspace',
  data() {
    return {
      activeTab: 'avatar',
      selectedAvatar: '',
      bgType: 'color',
      interactionEnabled: false,
      qaSettings: []
    }
  }
}
</script>

<style lang="scss" scoped>
.live-workspace {
  display: flex;
  height: calc(100vh - 84px);
  padding: 20px;
  gap: 20px;

  .preview-section {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .preview-window {
      flex: 1;
      background: #000;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      .preview-placeholder {
        text-align: center;
        color: #666;

        i {
          font-size: 48px;
          margin-bottom: 10px;
        }
      }
    }

    .control-panel {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
  }

  .control-section {
    flex: 1;
    background: #fff;
    border-radius: 8px;
    padding: 20px;

    .stat-card {
      background: #f5f7fa;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 15px;

      .stat-title {
        color: #666;
        font-size: 14px;
      }

      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #409EFF;
        margin-top: 10px;
      }
    }
  }
}
</style> 