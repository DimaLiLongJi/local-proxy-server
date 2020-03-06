<template>
  <div>
    <div class="disk toast" v-if="istoastShow">
      <div class="toastBox">
        <p>温馨提示</p>
        <div class="msg">{{msg}}</div>
        <div class="sure" @click="closetoast()">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
const Toast = {
  name: 'toast',
  data() {
    return {
      istoastShow: false,
      msg: ''
    };
  },
  methods: {
    showtoast(e) {
      this.istoastShow = true;
      this.msg = e;
    },
    closetoast() {
      this.istoastShow = false;
    }
  }
};

Toast.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const toastConstructor = Vue.extend(Toast);
    // 生成一个该子类的实例
    const instance = new toastConstructor();
    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 
    // 全局方法`$Showtoast`
    Object.defineProperty(Vue.prototype, '$showtoast', {
        get() {
            return instance.showtoast;
        }
    });
};

export default Toast;
</script>

<style scoped lang="less">
@keyframes bottomIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    bottom: 0;
  }
}
.disk {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  bottom: -50%;
  animation-name: bottomIn; /*动画名称*/
  animation-duration: 0.3s; /*动画持续时间*/
  animation-iteration-count: 1; /*动画次数*/
  animation-delay: 0s; /*延迟时间*/
  animation-fill-mode: forwards;
}
.toastBox {
  width: 550px;
  background: #fff;
  text-align: center;
  border-radius: 10px;
  p {
    font-size: 35px;
    padding: 20px 0;
    margin: 0;
  }
  .msg {
    font-size: 30px;
    color: #888888;
    padding: 10px 35px;
  }
  .sure {
    font-size: 30px;
    margin-top: 20px;
    border-top: 1px solid #e7e7e9;
    padding: 20px 0;
    color: #3cc51f;
  }
}
</style>
