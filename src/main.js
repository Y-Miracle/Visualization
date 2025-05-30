import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import ECharts from 'vue-echarts';  // 这里是注册 vue-echarts 组件
import * as echarts from 'echarts'; // 引入 echarts 库
import 'echarts';

const app = createApp(App);

// 注册 ECharts 组件
app.component('e-charts', ECharts);  // 确保组件名称小写且与模板中的一致

app.use(router).use(ElementPlus).mount('#app');
