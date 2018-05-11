export default {
  urlParams: {},     // 进入页面时url中带的参数，包括：succflag、photoflag、openid、shareOpenId

  pageIndex: 0,      // 当前显示页面index
  isMoving: false,   // 页面翻页中标识，翻页中不再触发翻页
  useAnimate: true,  // 翻页是否有动画效果

  selfPic: '',       // 自己头像
  motherPic: '',     // 母亲头像
  picResult: '',     // 最终生成图片dataURL
  processing: false,  // 是否正在生成合照

  person: {},        // 个人主页展示信息
  votedInfo: {},     // 当前用户的点赞信息
  personalInfo: '',  // 用户个人信息

  rankList: [],      // 排行榜信息
  isLoading: false,  // 正在获取排行榜数据，

  winWidth: window.innerWidth,
  winHeight: window.innerHeight
}
