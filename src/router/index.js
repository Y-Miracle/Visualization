import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RelationshipView from '../views/RelationshipView.vue';
import TimelineView from '../views/TimelineView.vue';
import InfluenceView from '../views/InfluenceView.vue'

const routes = [
  { path: '/', component: HomeView },  // 首页
  { path: '/relationship', component: RelationshipView },  // 人物关系页
  { path: '/timeline', component: TimelineView },  // 时间轴页
  { path: '/influence', component: InfluenceView },  // 影响力分析页
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // 使用 history 模式
  routes,
});

export default router;
