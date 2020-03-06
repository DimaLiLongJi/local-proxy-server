<template>
    <div class="questionBank">
        <div class="titleDiv">
            <span class="title">培训列表</span>
            <img class="titleImg" src="../images/questionBankImg2.png">
        </div>
        <div class="subject" :key="index" v-for="(courseLists, index) in datas.courseList">
            <div>
                <span>
                    {{courseLists.courseName}}
              </span>
            </div>
            <img :src="courseLists.courseStatus == 1?require('../images/questionBankQuery.png'):require('../images/questionBankGroup2.png')" @click="answer(courseLists.courseStatus,courseLists.id)">
        </div>
        <!-- 查看成绩 -->
        <Achievement :prop='datas.fraction' v-show="datas.achievementState" @close="closeAnswer(1)"  />
        <!--提示-->
        <Tips :tips-shows='0' v-if="datas.tipsShowsState" @close="closeAnswer(0)" />
        <!--遮罩-->
        <div class="cover" v-if="datas.coverState" />
        <!-- 登录 -->
        <Login v-if="!datas.loginState" @close="loginAfter" />
    </div>
</template>

<script>
import  Tips from '../components/Tips';
import  Achievement from '../components/Achievement';
import  Login from '../components/login';
import { postMethod } from '../../../utils/http';
export default {
    name: 'question-bank',
    data () {
        return {
            datas:{
                fraction:{
                    examScore:'', // 考试分数
                    correctNum: '', // 正确题数
                    wrongNum: '', // 错误题数
                    courseName: '', // 课程名称
                }, // 分数对象
                member: null, // 用户对象
                achievementState:false, // 查看成绩 窗 状态
                tipsShowsState:false, // 提示 窗 状态
                coverState:false, // 遮罩 状态
                loginState: !!sessionStorage.getItem('member'), // 登录 状态
                courseList:[],
            },
        };
    },
    methods: {
        /**
         * 培训考试列表
         * @param examNumber
         */
        async courseList(examNumber) {
            this.$showLoading();
            // 培训考试列表
            const courseList = await postMethod('/api/exam/courseList', {
                params: {
                    examNumber: examNumber
                }
            });
            this.$closeLoading();
            console.log('courseList:', courseList);
            if (courseList.code == '0000') {
                this.datas.courseList = [...courseList.data];
                // this.datas.courseList = Object.assign([],courseList.data);
            } else {
                this.$showtoast(courseList.msg);
            }
        },
        /**
         * 关闭 查看成绩&温馨提示
         */
        closeAnswer(state) {
            if(state){
                this.datas.achievementState = false;
                this.datas.coverState = false;
            }else{
                this.datas.tipsShowsState = false;
                this.datas.coverState = false;
            }
        },
        /**
         * 查看成绩&答题跳转方法
         * @param state
         * @param courseId 课程id
         */
        async answer(state, courseId) {
            if (state == 1) { // 暂定 1查看成绩 0答题
                this.$showLoading();
                // 查询成绩
                const qryExamScore = await postMethod('/api/exam/qryExamScore', {
                    params: {
                        courseId: courseId,
                        examNumber: this.datas.member.examNumber,
                    }
                });
                if(qryExamScore.code == '0000'){
                    // this.datas.fraction = {...qryExamScore.data}
                    Object.assign(this.datas.fraction,qryExamScore.data);
                    this.datas.achievementState = !this.datas.achievementState;
                    this.datas.coverState = !this.datas.coverState;
                }else{
                    this.$showtoast(qryExamScore.msg);
                }
                this.$closeLoading();
            } else {
                this.$router.push({
                    path: `/question-bank-info/${courseId}`,
                });
            }
        },
        /**
         * 登录后方法
         */
        async loginAfter() {
            console.log('loginAfter')
            this.datas.member = JSON.parse(sessionStorage.getItem('member'));
            this.datas.loginState = !!this.datas.member;
            if (!this.datas.loginState) return;
            // 获取培训考试列表
            this.courseList(this.datas.member.examNumber);
        },
    },
    components: {
        Tips,
        Achievement,
        Login,
    },
    async mounted() {

        // const checkUserRes = await postMethod('/api/exam/checkUser', {
        //     params: {examNumber: 15244673366}
        // });
        // this.$closeLoading();
        // console.log('checkUserRes:', checkUserRes);
        // const data = checkUserRes.data;
        // // 如果成功并且当前号码和用户都为当前的人则存储
        // if (checkUserRes.code === '0000') {
        //         sessionStorage.setItem('member', JSON.stringify({
        //             examPersonId: data.id,
        //             examNumber: data.examNumber,
        //             examPersonName: data.examPersonName,
        //             prefectureName: data.prefectureName,
        //         }));
        // }


        if (!sessionStorage.getItem('member')) {
            this.datas.loginState = false;
            return;
        }
        this.loginAfter();
    }
};
</script>
<style lang="less" scoped>
  @import '../style/reset.css';
  .questionBank {
    width: 100%;
    position: relative;
    height: 100%;
    min-height: 100vh;
    background: url("../images/questionBankBackgroud.png") no-repeat;
    background-size: 100% 100%;
    text-align: left;
    .titleDiv{
      padding-top: 80px;
      margin-bottom: 10px;
      .title{
        padding-left: 135px;
        font-size:96px;
        color:rgba(255,255,255,1);
        line-height:143px;
        vertical-align: top;
        display: inline-block;
        padding-top: 32px;
    }
    .titleImg{
        width:139px;
        height:186px;
        padding-left: 28px;
        vertical-align: top;
    }
    }
    .subject{
      padding: 0 0 0 29px;
      margin-bottom: 25px;
      div{
        margin-top: 6px;
        width:560px;
        line-height: 80px;
        min-height: 80px;
        background:rgba(255,255,255,1);
        border-radius:8px;
        display: inline-block;
        position: relative;
        vertical-align: top;
        text-align:justify;
        text-justify:newspaper;
        word-break:break-all;
        span{
          font-weight: bold;
          padding: 20px 15px;
          position: absolute;
          width: 100%;
          font-size:28px;
          color:rgba(0,90,255,1);
          line-height:38px;
        }
      }
      img{
        width: 133px;
        height: 91px;
    }
    }
    /*遮罩层*/
    .cover{
        position:fixed;left:0px;top:0px;
        background-color: #000000;
        width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
        height:100%;
        filter:alpha(opacity=60);  /*设置透明度为60%*/
        opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
        display: block;
        z-Index:100;
    }
    }
</style>
