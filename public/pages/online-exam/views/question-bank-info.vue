<template>
  <div class="questionBankInfo">
    <div class="title">{{this.datas.questionList.courseName}}</div>
    <div class="subject" :key="index" v-for="(questionLists,index) in datas.questionList.questionList">
      <div class="subjectTitle">
        <span>
            {{questionLists.questionType == 1?'[多选]':'[单选]'}}{{questionLists.itemContent}}
        </span>
      </div>
      <div class="subjectCheck" @click="subjectCheckClick($event,questionLists,'A')">
        <label>
          <input type="radio" :name="questionLists.questionType == 0?questionLists.id:questionLists.createId+questionLists.optionA" />
          <span></span>
        </label>
        <span>
            {{questionLists.optionA}}
        </span>
      </div>
      <div class="subjectCheck" @click="subjectCheckClick($event,questionLists,'B')">
        <label>
          <input type="radio" :name="questionLists.questionType == 0?questionLists.id:questionLists.createId+questionLists.optionB" />
          <span></span>
        </label>
        <span>
            {{questionLists.optionB}}
        </span>
      </div>
      <div class="subjectCheck" @click="subjectCheckClick($event,questionLists,'C')">
        <label>
          <input type="radio" :name="questionLists.questionType == 0?questionLists.id:questionLists.createId+questionLists.optionC"  />
          <span></span>
        </label>
        <span>
            {{questionLists.optionC}}
        </span>
      </div>
    </div>
    <img class="questionBankInfoSub" src="../images/questionBankInfoSub.png" @click="sub">
    <!-- 查看成绩 -->
    <Achievement :prop='datas.fraction' v-show="this.datas.achievementState" @close="closeAnswer(1)"  />
    <!--提示-->
    <Tips :tips-shows='1' @close="closeAnswer(0)"  v-show="this.datas.tipsShowsState" />
    <!--遮罩-->
    <div class="cover" v-if="this.datas.coverState" ></div>
  </div>
</template>

<script>
  import  Tips from '../components/tips';
  import  Achievement from '../components/achievement';
  import { arrSortMaxToMin, arrSortMinToMax } from '@/utils/sorts';
  import { postMethod } from '../../../utils/http';
  export default {
    name: 'question-bank-info',
    data () {
      return {
        datas:{
          fraction:{
            examScore:'', // 考试分数
            correctNum: '', // 正确题数
            wrongNum: '', // 错误题数
            courseName: '', // 课程名称
          }, // 分数对象
          id:'',
          achievementState:false, // 查看成绩 窗 状态
          tipsShowsState:0, // 温馨提示 窗 状态 0 继续答题
          coverState:false, // 遮罩 状态
          questionList:{}, // 考题集合
        },
      };
    },
    methods: {
      /**
       * 选项change事件
       **/
      radioChange(questionLists,selection,e){
          if(questionLists.questionType == 1){ // 多选
              if(e.currentTarget.firstElementChild.firstElementChild.checked){
                  if(questionLists.selection){
                      Object.assign(questionLists,{selection:questionLists.selection+','+selection});
                  }else{
                      Object.assign(questionLists,{selection:selection});
                  }
              }else{
                  if(questionLists.selection.indexOf(`${selection},`) != -1){
                      questionLists.selection = questionLists.selection.replace(`${selection},`, '');
                  }else if(questionLists.selection.indexOf(`,${selection}`) != -1){
                      questionLists.selection = questionLists.selection.replace(`,${selection}`, '');
                  }if(questionLists.selection.indexOf(`${selection}`) != -1){
                      questionLists.selection = questionLists.selection.replace(`${selection}`, '');
                  }
              }
          }else{
              if(e.currentTarget.firstElementChild.firstElementChild.checked){
                  Object.assign(questionLists,{selection:selection});
              }else{
                  Object.assign(questionLists,{selection:''});
              }
          }
      },
      /**
       * 查看成绩&温馨提示
       * @param state
       */
      answer(state){
        if(state == 0){ // 暂定 0查看成绩 1 温馨提示
          this.datas.achievementState = !this.datas.achievementState;
          this.datas.coverState = !this.datas.coverState;
        }else{
          this.datas.tipsShowsState = !this.datas.tipsShowsState;
          this.datas.coverState = !this.datas.coverState;
        }
      },
      /**
       * 关闭 查看成绩&温馨提示
       */
      closeAnswer(state) {
        if(state){
          this.datas.achievementState = false;
          this.datas.coverState = false;
          this.$router.push({
            path: '/',
          });
        }else{
          this.datas.tipsShowsState = false;
          this.datas.coverState = false;
        }
      },
      /**
       * 提交
       * @param state
       */
      async sub() {
          // this.answer(0);
          let member = JSON.parse(sessionStorage.getItem('member'));
          let answerList = "";
          console.log('this.datas.questionList',this.datas.questionList)
        for (let i = 0; i < this.datas.questionList.questionList.length; i++) {
          let questionLists = this.datas.questionList.questionList[i];
          if (!questionLists.selection) {
            this.answer(1);
            return;
          }
            // answers格式: 试题id,试题分数,正确答案,输入答案|
            let selection = "";
            if(questionLists.selection.length > 1){
               selection = arrSortMinToMax(questionLists.selection.split(',')).join('');
            }else{
                selection = questionLists.selection;
            }
            answerList += `${questionLists.id},${questionLists.tiemScore},${questionLists.rightAnswers},${selection}|`;
        }
        this.$showLoading();
        console.log({
            examPersonId: member.examPersonId,
            examPersonName: member.examPersonName,
            examNumber: member.examNumber,
            prefectureName: member.prefectureName,
            courseId: this.datas.questionList.courseId,
            courseName: this.datas.questionList.courseName,
            answers: answerList
        })
        const commitExam = await postMethod('/api/exam/commitExam', {
          params: {
              examPersonId: member.examPersonId,
              examPersonName: member.examPersonName,
              examNumber: member.examNumber,
              prefectureName: member.prefectureName,
            courseId: this.datas.questionList.courseId,
            courseName: this.datas.questionList.courseName,
            answers:  answerList
          }
        });
        if(commitExam.code == '0000'){
          Object.assign(this.datas.fraction,commitExam.data);
          // console.log(commitExam)
          // this.datas.fraction = {...commitExam.data}
          console.log(this.datas.fraction)
          this.answer(0);
          this.$closeLoading();
        }else{
          this.$showtoast(commitExam.msg);
          this.$closeLoading();
        }
      },
      /**
       * 初始化查询题目
       * @param state
       */
      async init() {
          this.$showLoading();
        this.datas.id = this.$route.params.id; // 题目id
        const createExam = await postMethod('/api/exam/createExam', {
          params: {
              courseId: this.datas.id
          }
        });
        this.$closeLoading();
        if (createExam && createExam.code == '0000') {
          this.datas.questionList = {...createExam.data}
        }else{
          this.$showtoast(createExam.msg);
            this.$router.push({
                path: '/',
            });
        }
      },
      /**
       * 改变选中状态 radio
       * @param event
       */
      subjectCheckClick(e,questionLists,selection) {
        e.currentTarget.firstElementChild.firstElementChild.checked = !e.currentTarget.firstElementChild.firstElementChild.checked
          this.radioChange(questionLists,selection,e)
      },
    },
    components: {
      Tips,Achievement
    },
    mounted() {
      this.init();
      //   this.datas.questionList = Object.assign({},
      //           {
      //             'courseId': '1001',//课程id
      //             'courseName': '当前主要产品体系培训',//课程名称
      //             'questionList': [
      //               {
      //                 'id': '1111',//题库id
      //                 'courseName': '当前主要产品体系培训',//课程名称
      //                 'itemContent': '测试测试当前主要产品体系培训当前主要产品体系培训当前主要产品体系培训当前主要产品体系培训',//题目内容
      //                 'optionA': '测试当前主要产品体系培训当前主要产品体系培训当前主要产品体系培训当前主要产品体系培训a',//选项A
      //                 'optionB': '测试b',//选项B
      //                 'optionC': '测试c',//选项C
      //                 'rightAnswers': 'A',//正确答案
      //                 'createTime': '2020-03-03 09:00:00',//创建时间
      //                 'createId': 'test1',//创建id
      //                 'courseId': '1001',//课程id
      //                 'tiemScore': '20',//题目分数
      //                   'questionType': '1'//题目类型:0单选,1多选
      //               },
      //               {
      //                 'id': '2',//题库id
      //                 'courseName': '当前主要产品体系培训',//课程名称
      //                 'itemContent': '测试测试',//题目内容
      //                 'optionA': '测试a',//选项A
      //                 'optionB': '测试b',//选项B
      //                 'optionC': '测试c',//选项C
      //                 'rightAnswers': 'A',//正确答案
      //                 'createTime': '2020-03-03 09:00:00',//创建时间
      //                 'createId': 'test2',//创建id
      //                 'courseId': '1001',//课程id
      //                 'tiemScore': '20',//题目分数
      //                   'questionType': '0'//题目类型:0单选,1多选
      //               },
      //               {
      //                 'id': '3',//题库id
      //                 'courseName': '当前主要产品体系培训',//课程名称
      //                 'itemContent': '测试测试',//题目内容
      //                 'optionA': '测试a',//选项A
      //                 'optionB': '测试b',//选项B
      //                 'optionC': '测试c',//选项C
      //                 'rightAnswers': 'A',//正确答案
      //                 'createTime': '2020-03-03 09:00:00',//创建时间
      //                 'createId': 'test3',//创建id
      //                 'courseId': '1001',//课程id
      //                 'tiemScore': '20',//题目分数
      //                   'questionType': '0'//题目类型:0单选,1多选
      //               },
      //               {
      //                 'id': '4',//题库id
      //                 'courseName': '当前主要产品体系培训',//课程名称
      //                 'itemContent': '测试测试',//题目内容
      //                 'optionA': '测试a',//选项A
      //                 'optionB': '测试b',//选项B
      //                 'optionC': '测试c',//选项C
      //                 'rightAnswers': 'A',//正确答案
      //                 'createTime': '2020-03-03 09:00:00',//创建时间
      //                 'createId': 'test4',//创建id
      //                 'courseId': '1001',//课程id
      //                 'tiemScore': '20',//题目分数
      //                   'questionType': '1'//题目类型:0单选,1多选
      //               },
      //               {
      //                 'id': '5',//题库id
      //                 'courseName': '当前主要产品体系培训',//课程名称
      //                 'itemContent': '测试测试',//题目内容
      //                 'optionA': '测试a',//选项A
      //                 'optionB': '测试b',//选项B
      //                 'optionC': '测试c',//选项C
      //                 'rightAnswers': 'A',//正确答案
      //                 'createTime': '2020-03-03 09:00:00',//创建时间
      //                 'createId': 'test5',//创建id
      //                 'courseId': '1001',//课程id
      //                 'tiemScore': '20',//题目分数
      //                   'questionType': '0'//题目类型:0单选,1多选
      //               },
      //             ]
      //           },
      //   );//题目分数;
    },
  };
</script>
<style lang="less" scoped>
  @import '../style/reset.css';
  .questionBankInfo {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: url("../images/questionBankInfoBackground.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding-top: 114px;
    .title{
      display: block;
      font-size:40px;
      color:rgba(255,255,255,1);
      line-height:42px;
      margin-bottom: 38px;
    }
    .subject{
      margin: 0 30px 30px;

      .subjectTitle{
        margin-bottom: 31px;
        text-align: left;
        width:692px;
        line-height:107px;
        background:rgba(255,255,255,1);
        span{
          text-align: left;
          display: inline-block;
          font-size:30px;
          font-weight:400;
          color:rgba(0,90,255,1);
          line-height:46px;
          margin: 16px 24px;
        }
      }
      .subjectCheck{
        /*padding: 31px 0 19px 20px;*/
        text-align: left;
        display: inline-block;
        width: 100%;
        padding-bottom: 19px;
        label input{
          display: none;
        }
        label span{
            display: inline-block;
            width:26px;
            height:26px;
            background: url("../images/redioImg.png");
            background-size: 100% 100%;
            overflow: hidden;
            background-repeat: no-repeat;
            /*border-radius:50%;*/
        }
        label input:checked + span{
          background: url("../images/redioChackedImg.png");
          background-size: 100% 100%;
          overflow: hidden;
          background-repeat: no-repeat;
        }
        span{
          display: inline-block;
          width: 89%;
          vertical-align: middle;
          font-size:28px;
          margin-left: 16px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:30px;
        }
      }
    }
    .questionBankInfoSub{
      width: 303px;
      height: 97px;
      padding: 43px 0 72px;
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
