<template>
  <div class="image-uploader">
    <el-upload
      class="uploader"
      :action="uploadAction"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :multiple="true"
      :show-file-list="false"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过20MB
      </div>
    </el-upload>

    <!-- 预览区域 -->
    <div v-if="previewList.length" class="preview-list">
      <div v-for="(item, index) in previewList" 
           :key="index" 
           class="preview-item"
      >
        <img :src="item.url" :alt="item.name">
        <div class="preview-actions">
          <i class="el-icon-delete" @click="removeImage(index)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageUploader',
  data() {
    return {
      uploadAction: '', // 实际开发时替换为���实的上传地址
      previewList: [],
      maxSize: 20 * 1024 * 1024 // 20MB
    }
  },
  methods: {
    beforeUpload(file) {
      // 检查文件类型
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImage) {
        this.$message.error('只能上传JPG/PNG格式的图片！')
        return false
      }
      
      // 检查文件大小
      if (file.size > this.maxSize) {
        this.$message.error('图片大小不能超过20MB！')
        return false
      }

      // 添加到预览列表
      this.addToPreviewList(file)
      
      // 在开发阶段，我们不实际上传文件
      return false
    },
    
    addToPreviewList(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewList.push({
          name: file.name,
          url: e.target.result,
          file: file
        })
        // 通知父组件
        this.$emit('images-selected', this.previewList)
      }
      reader.readAsDataURL(file)
    },
    
    removeImage(index) {
      this.previewList.splice(index, 1)
      this.$emit('images-selected', this.previewList)
    },
    
    handleSuccess(res, file) {
      this.$message.success('上传成功')
    },
    
    handleError() {
      this.$message.error('上传失败，请重���')
    }
  }
}
</script>

<style scoped>
.image-uploader {
  width: 100%;
}

.uploader {
  width: 100%;
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.uploader:hover {
  border-color: #409EFF;
}

.preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.preview-item {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 4px;
  overflow: hidden;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-actions {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 4px;
}

.preview-actions i {
  color: #fff;
  cursor: pointer;
}

.preview-actions i:hover {
  color: #f56c6c;
}
</style> 