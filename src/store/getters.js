const getters = {
  userId: state => state.user.userId,
  token: state => state.user.token,
  username: state => state.user.username,
  imgHeader: state => state.user.imgHeader,
  socketId: state => state.userSocket.socketId,
  userSocket: state => state.userSocket.socket,
  ifTourist: state => state.user.ifTourist,
  sex: state => state.user.sex,
  authDialog: state => state.status.authDialog,
  loginDialog: state => state.status.loginDialog,
  registerDialog: state => state.status.registerDialog,
  loadingStateConfig: state => state.status.loadingStateConfig,
  loadingStateUserInfo: state => state.status.loadingStateUserInfo,
  accountDialog: state => state.status.accountDialog,
  settingDialog: state => state.status.settingDialog,
  resourceMain: state => state.webConfig.resourceMain,
  resourcePromotionConfig: state => state.webConfig.resourcePromotionConfig,
  resourceAccountConfig: state => state.webConfig.resourceAccountConfig,
  streamResponseType: state => state.webConfig.resourceMain.streamResponseType,
}
export default getters
