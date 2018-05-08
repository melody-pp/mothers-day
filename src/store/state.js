export default {
  user: {},
  pageIndex: 6,      // 当前显示页面index
  useAnimate: true,  // 翻页是否有动画效果
  isMoving: false,   // 页面翻页中标识，翻页中不再触发翻页
  motherPic: '',     // 母亲头像
  selfPic: '',       // 自己头像
  userGender: 0,     // 自己性别 男：0  女：1
  picResult: '',     // 最终生成图片dataURL
  personalInfo: '',  // 用户个人信息
  rankList: [
    {username: '测试用户名1', rank: 1, votenum: 123},
    {username: '测试用户名2', rank: 2, votenum: 23},
    {username: '测试用户名3', rank: 3, votenum: 3},
  ],      // 排行榜信息
}
