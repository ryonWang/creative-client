<template>
  <div class="chat-workspace">
    <!-- 左侧对话列表 -->
    <div class="chat-list">
      <div class="list-header">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索对话"
          prefix-icon="el-icon-search"
          clearable
        ></el-input>
      </div>
      <div class="list-content">
        <div 
          v-for="chat in chatList" 
          :key="chat.id"
          class="chat-item"
          :class="{ active: currentChat?.id === chat.id }"
          @click="selectChat(chat)"
        >
          <el-avatar :src="chat.avatar" :size="40"></el-avatar>
          <div class="chat-info">
            <div class="chat-title">{{ chat.title }}</div>
            <div class="chat-preview">{{ chat.lastMessage }}</div>
          </div>
          <div class="chat-time">{{ chat.updateTime }}</div>
        </div>
      </div>
    </div>

    <!-- 右侧对话区域 -->
    <div class="chat-area">
      <template v-if="currentChat">
        <!-- 对话头部 -->
        <div class="chat-header">
          <div class="chat-title">
            <span>{{ currentChat.title }}</span>
            <el-tag size="small" type="success">在线</el-tag>
          </div>
          <div class="header-actions">
            <el-button type="text" icon="el-icon-video-camera">开启视频</el-button>
            <el-button type="text" icon="el-icon-more">更多</el-button>
          </div>
        </div>

        <!-- 消息列表 -->
        <div class="message-list" ref="messageList">
          <div 
            v-for="msg in messageList" 
            :key="msg.id"
            class="message-item"
            :class="{ 'message-right': msg.isSelf }"
          >
            <el-avatar 
              :src="msg.isSelf ? userAvatar : currentChat.avatar" 
              :size="36"
            ></el-avatar>
            <div class="message-content">
              <div class="message-bubble">{{ msg.content }}</div>
              <div class="message-time">{{ msg.time }}</div>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="input-area">
          <div class="toolbar">
            <i class="el-icon-mic" title="语音输入"></i>
            <i class="el-icon-picture" title="发送图片"></i>
            <i class="el-icon-folder" title="发送文件"></i>
          </div>
          <div class="input-box">
            <el-input
              v-model="messageInput"
              type="textarea"
              :rows="3"
              placeholder="输入消息..."
              @keyup.enter.native="sendMessage"
            ></el-input>
          </div>
          <div class="send-btn">
            <el-button type="primary" @click="sendMessage">发送</el-button>
          </div>
        </div>
      </template>

      <!-- 未选择对话时的提示 -->
      <div v-else class="no-chat">
        <i class="el-icon-chat-dot-round"></i>
        <p>选择一个对话开始交谈</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWorkspace',
  data() {
    return {
      searchKeyword: '',
      currentChat: null,
      messageInput: '',
      userAvatar: 'path/to/user-avatar.jpg',
      chatList: [
        {
          id: 1,
          title: '数字人助手',
          avatar: 'path/to/avatar1.jpg',
          lastMessage: '好的,我明白了',
          updateTime: '10:30'
        }
        // 更多对话...
      ],
      messageList: [
        {
          id: 1,
          content: '你好,我是数字人助手',
          time: '10:28',
          isSelf: false
        },
        {
          id: 2,
          content: '你好,请问有什么可以帮助你的?',
          time: '10:29',
          isSelf: true
        }
        // 更多消息...
      ]
    }
  },
  methods: {
    selectChat(chat) {
      this.currentChat = chat;
      this.loadMessages(chat.id);
    },
    sendMessage() {
      if (!this.messageInput.trim()) return;
      
      // 添加新消息
      this.messageList.push({
        id: Date.now(),
        content: this.messageInput,
        time: new Date().toLocaleTimeString(),
        isSelf: true
      });
      
      this.messageInput = '';
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    loadMessages(chatId) {
      // 加载对话消息
      console.log('加载消息:', chatId);
    },
    scrollToBottom() {
      const messageList = this.$refs.messageList;
      messageList.scrollTop = messageList.scrollHeight;
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-workspace {
  display: flex;
  height: calc(100vh - 84px);
  background: #fff;

  .chat-list {
    width: 280px;
    border-right: 1px solid #e6e6e6;
    display: flex;
    flex-direction: column;

    .list-header {
      padding: 15px;
      border-bottom: 1px solid #e6e6e6;
    }

    .list-content {
      flex: 1;
      overflow-y: auto;

      .chat-item {
        display: flex;
        align-items: center;
        padding: 15px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #f5f7fa;
        }

        &.active {
          background: #ecf5ff;
        }

        .chat-info {
          flex: 1;
          margin: 0 10px;
          overflow: hidden;

          .chat-title {
            font-size: 14px;
            margin-bottom: 4px;
          }

          .chat-preview {
            font-size: 12px;
            color: #999;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .chat-time {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  .chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;

    .chat-header {
      padding: 15px 20px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .chat-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    .message-list {
      flex: 1;
      padding: 20px;
      overflow-y: auto;

      .message-item {
        display: flex;
        margin-bottom: 20px;

        &.message-right {
          flex-direction: row-reverse;

          .message-content {
            margin: 0 10px 0 60px;
            align-items: flex-end;

            .message-bubble {
              background: #409EFF;
              color: #fff;
            }
          }
        }

        .message-content {
          margin: 0 60px 0 10px;
          display: flex;
          flex-direction: column;

          .message-bubble {
            max-width: 70%;
            padding: 10px 15px;
            background: #f4f4f4;
            border-radius: 4px;
            word-break: break-word;
          }

          .message-time {
            margin-top: 4px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }

    .input-area {
      border-top: 1px solid #e6e6e6;
      padding: 15px;

      .toolbar {
        padding: 0 0 10px;
        display: flex;
        gap: 15px;

        i {
          font-size: 20px;
          color: #666;
          cursor: pointer;

          &:hover {
            color: #409EFF;
          }
        }
      }

      .input-box {
        margin-bottom: 10px;
      }

      .send-btn {
        text-align: right;
      }
    }

    .no-chat {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #909399;

      i {
        font-size: 48px;
        margin-bottom: 10px;
      }
    }
  }
}
</style> 