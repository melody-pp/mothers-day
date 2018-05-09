export default {
  urlParams: {},     // 进入页面时url中带的参数，包括：subscribe、succflag、photoflag、self、openid
  pageIndex: 6,      // 当前显示页面index
  useAnimate: true,  // 翻页是否有动画效果
  isMoving: false,   // 页面翻页中标识，翻页中不再触发翻页
  motherPic: '',     // 母亲头像
  selfPic: '',       // 自己头像
  picResult: '',     // 最终生成图片dataURL
  personalInfo: '',  // 用户个人信息
  rankList: [],      // 排行榜信息
  votedInfo: {},     // 当前用户的点赞信息
  person: {},        //个人主页展示信息
}
