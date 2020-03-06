import Vue from 'vue';

const windowHeight = window.innerHeight;

Vue.directive('fixedinput', function (el) {
  el.addEventListener('blur', function () {
    let windowFocusHeight = window.innerHeight;
    if (windowHeight == windowFocusHeight) {
      return;
    }
    console.log(windowHeight + '--' + windowFocusHeight);
    console.log('修复');
    let currentPosition;
    let speed = 1; //页面滚动距离
    currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    window.scrollTo(0, currentPosition); //页面向上滚动
    currentPosition += speed; //speed变量
    window.scrollTo(0, currentPosition); //页面向下滚动
  });
});
