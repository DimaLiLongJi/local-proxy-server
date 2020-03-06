<template>
  <div>
    <div class="disk loading" v-if="isLoadingShow">
      <div class="ball-spin-fade-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
const Loading = {
  name: 'loading',
  data() {
    return {
      isFollowShow: false,
      isLoadingShow: false
    };
  },
  methods: {
    showLoading() {
      this.isLoadingShow = true;
    },
    closeLoading() {
      this.isLoadingShow = false;
    }
  }
};

Loading.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const LoadingConstructor = Vue.extend(Loading);
    // 生成一个该子类的实例
    const instance = new LoadingConstructor();
    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 
    // 全局方法`$showLoading`
    Object.defineProperty(Vue.prototype, '$showLoading', {
        get() {
            return instance.showLoading;
        }
    });
    // 全局方法`$closeLoading`
    Object.defineProperty(Vue.prototype, '$closeLoading', {
        get() {
            return instance.closeLoading;
        }
    });
};
export default Loading;
</script>

<style lang='less'>
@import url("./index");
</style>