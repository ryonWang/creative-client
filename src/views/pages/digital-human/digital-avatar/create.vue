<template>
  <div class="create-avatar">
    <div class="content-wrapper">
      <div class="left-section">
        <h2 class="section-title">形象克隆内容</h2>
        
        <!-- 克隆方式 -->
        <div class="clone-method">
          <h3 class="sub-title">克隆方式</h3>
          <div class="method-cards">
            <div class="method-card" :class="{ active: cloneMethod === 'quick' }" @click="cloneMethod = 'quick'">
              <div class="card-left">
                <img src="path-to-quick-clone-image" alt="快速克隆">
              </div>
              <div class="card-right">
                <h4>快速克隆</h4>
                <p>30分钟即可完成训练，基本还原口型特征，需上传保持闭嘴视频，可在视频、外语、直播中使用</p>
                <div class="price">
                  <span class="label">剩余克隆次数：</span>
                  <span class="count">0次</span>
                  <el-button type="text" class="buy-btn">购买 ></el-button>
                </div>
              </div>
            </div>

            <div class="method-card" :class="{ active: cloneMethod === 'premium' }" @click="cloneMethod = 'premium'">
              <div class="card-left">
                <img src="path-to-premium-clone-image" alt="精品克隆">
              </div>
              <div class="card-right">
                <h4>精品克隆</h4>
                <p>训练时间4小时，完全还原口型特征，需上传保持说话视频，可在视频、直播中使用</p>
                <div class="price">
                  <span class="label">剩余克隆次数：</span>
                  <span class="count">0次</span>
                  <el-button type="text" class="buy-btn">购买 ></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 形象名称 -->
        <div class="avatar-name">
          <h3 class="sub-title">形象名称</h3>
          <el-input v-model="avatarName" placeholder="请输入形象名称" maxlength="15" show-word-limit></el-input>
        </div>

        <!-- 底板视频 -->
        <div class="base-video">
          <h3 class="sub-title">底板视频</h3>
          <div class="upload-area">
            <div class="upload-box" @click="handleUpload">
              <i class="el-icon-plus"></i>
              <p>将文件拖到此处或点击上传</p>
            </div>
            <div class="video-requirements">
              <div class="requirement">
                <span class="label">尺寸：</span>
                <span>竖屏9:16</span>
              </div>
              <div class="requirement">
                <span class="label">清晰度：</span>
                <span>1080P</span>
              </div>
              <div class="requirement">
                <span class="label">帧率：</span>
                <span>25FPS</span>
              </div>
              <div class="requirement">
                <span class="label">格式：</span>
                <span>MP4</span>
              </div>
              <div class="requirement">
                <span class="label">时长：</span>
                <span>3-8分钟</span>
              </div>
              <div class="requirement">
                <span class="label">文件大小：</span>
                <span>不超过1G</span>
              </div>
              <div class="requirement">
                <span class="label">其他：</span>
                <span>柔和说话环境，保证音频清晰无杂音；人脸在画面占比1/4；</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 自动抠图 -->
        <div class="auto-matting">
          <el-checkbox v-model="autoMatting">自动抠图，去除绿幕背景</el-checkbox>
          <p class="matting-tip">人像训练完成后，可通过抠图设置对其进行调整</p>
        </div>

        <!-- 底部按钮 -->
        <div class="bottom-actions">
          <el-checkbox v-model="agreeLicense">我确认我拥有上传视频的所有必要权利，我保证不会克隆形象创作违法内容，并且会严格遵守</el-checkbox>
          <el-link type="primary">《创意宝隐私克隆协议》</el-link>
          <div class="buttons">
            <el-button>取消</el-button>
            <el-button type="primary" @click="startClone">开始克隆</el-button>
          </div>
        </div>
      </div>

      <!-- 右侧示例区域 -->
      <div class="right-section">
        <h2 class="section-title">示例视频</h2>
        <div class="example-video">
          <video-player ref="videoPlayer" class="video-preview"></video-player>
        </div>
        <div class="requirements-list">
          <div class="correct-list">
            <div class="requirement-item" v-for="item in correctRequirements" :key="item">
              <i class="el-icon-check"></i>
              <span>{{ item }}</span>
            </div>
          </div>
          <div class="wrong-list">
            <div class="requirement-item" v-for="item in wrongRequirements" :key="item">
              <i class="el-icon-close"></i>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAvatar',
  data() {
    return {
      cloneMethod: 'quick',
      avatarName: '',
      autoMatting: false,
      agreeLicense: false,
      correctRequirements: [
        '提交3-8分钟的原始视频素材',
        '人脸占比不超过画面1/4',
        '使用高分率率相机',
        '在光线充足、安静的环境中录制',
        '确保眼睛直视镜头',
        '恰当的手势，并不过度摆动',
        '给出的手势，并不过度摆动'
      ],
      wrongRequirements: [
        '提交拼接或剪辑的素材',
        '人脸占比过大',
        '录制时改变姿位',
        '画面上有明暗和噪光过度',
        '转移视线没有停留',
        '手势超过胸部以上',
        '平均过渡胸部以上'
      ]
    }
  },
  methods: {
    handleUpload() {
      // 处理视频上传
    },
    startClone() {
      if (!this.agreeLicense) {
        this.$message.warning('请先同意协议')
        return
      }
      // 开始克隆处理
    }
  }
}
</script>

<style lang="scss" scoped>
.create-avatar {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 24px;

    .left-section {
      flex: 1;
      background: #fff;
      padding: 24px;
      border-radius: 8px;

      .section-title {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 24px;
      }

      .sub-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
      }

      .method-cards {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;

        .method-card {
          display: flex;
          padding: 16px;
          border: 1px solid #dcdfe6;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover, &.active {
            border-color: #409EFF;
          }

          .card-left {
            width: 120px;
            height: 120px;
            margin-right: 16px;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 4px;
            }
          }

          .card-right {
            flex: 1;

            h4 {
              font-size: 16px;
              margin-bottom: 8px;
            }

            p {
              color: #606266;
              margin-bottom: 16px;
              line-height: 1.5;
            }

            .price {
              display: flex;
              align-items: center;
              color: #f56c6c;

              .label {
                color: #606266;
                margin-right: 4px;
              }
            }
          }
        }
      }

      .avatar-name {
        margin-bottom: 24px;
      }

      .upload-area {
        .upload-box {
          border: 2px dashed #dcdfe6;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 16px;

          &:hover {
            border-color: #409EFF;
            color: #409EFF;
          }

          i {
            font-size: 32px;
            margin-bottom: 8px;
          }
        }

        .video-requirements {
          .requirement {
            margin-bottom: 8px;
            color: #606266;

            .label {
              color: #303133;
              margin-right: 4px;
            }
          }
        }
      }

      .auto-matting {
        margin: 24px 0;

        .matting-tip {
          margin-top: 8px;
          color: #909399;
          font-size: 12px;
        }
      }

      .bottom-actions {
        margin-top: 40px;
        
        .buttons {
          margin-top: 16px;
          display: flex;
          justify-content: center;
          gap: 16px;
        }
      }
    }

    .right-section {
      width: 360px;
      background: #fff;
      padding: 24px;
      border-radius: 8px;

      .section-title {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 24px;
      }

      .example-video {
        margin-bottom: 24px;
        border-radius: 8px;
        overflow: hidden;
        background: #000;
        aspect-ratio: 9/16;
      }

      .requirements-list {
        .requirement-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          i {
            margin-right: 8px;
          }

          .el-icon-check {
            color: #67c23a;
          }

          .el-icon-close {
            color: #f56c6c;
          }
        }

        .correct-list {
          margin-bottom: 24px;
        }
      }
    }
  }
}
</style> 