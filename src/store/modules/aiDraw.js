const state = {
  currentTool: '', // 当前选中的工具
  currentImages: [], // 当前处理的图片列表
  processingStatus: 'idle', // 处理状态：idle, processing, completed, failed
  history: [], // 历史记录
  previewImage: null, // 预览图片
  editHistory: [], // 编辑历史，用于撤销/重做
}

const mutations = {
  SET_CURRENT_TOOL(state, tool) {
    state.currentTool = tool
  },
  SET_CURRENT_IMAGES(state, images) {
    state.currentImages = images
  },
  SET_PROCESSING_STATUS(state, status) {
    state.processingStatus = status
  },
  SET_HISTORY(state, history) {
    state.history = history
  },
  SET_PREVIEW_IMAGE(state, image) {
    state.previewImage = image
  },
  ADD_EDIT_HISTORY(state, edit) {
    state.editHistory.push(edit)
  },
  CLEAR_EDIT_HISTORY(state) {
    state.editHistory = []
  }
}

const actions = {
  // 设置当前工具
  setCurrentTool({ commit }, tool) {
    commit('SET_CURRENT_TOOL', tool)
  },
  
  // 添加图片到处理列表
  addImages({ commit, state }, newImages) {
    const images = [...state.currentImages, ...newImages]
    commit('SET_CURRENT_IMAGES', images)
  },
  
  // 清空当前图片列表
  clearImages({ commit }) {
    commit('SET_CURRENT_IMAGES', [])
  },
  
  // 处理图片
  async processImages({ commit, state }, params) {
    try {
      commit('SET_PROCESSING_STATUS', 'processing')
      // TODO: 调用实际的处理API
      // const result = await api.processImages(params)
      commit('SET_PROCESSING_STATUS', 'completed')
    } catch (error) {
      commit('SET_PROCESSING_STATUS', 'failed')
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 