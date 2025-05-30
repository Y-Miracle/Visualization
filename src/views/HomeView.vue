<template>
  <div class="home-container">
    <h1>《甄嬛传》文化价值解码</h1>

    <div class="content-box">
      <div class="text-content">
        <h2>封建宫廷中的权力镜像</h2>
        <p>《甄嬛传》作为现象级文化作品，其价值远超宫斗剧情本身。剧中构建的后宫生态，实则是中国传统社会权力结构的微观缩影。通过反复品鉴，我们可以透视封建制度对女性价值的异化评价。</p>
        
        <!-- 保留原有的雷达图 -->
        <div class="chart-embed">
          <e-charts class="radar-chart" :option="radarOption" />
        </div>

        <h3>▍文化符号的现代转译</h3>
        <p>剧中角色特质（如图所示）已成为当代社会讨论人际关系的隐喻符号："甄嬛式智慧"被用于职场生存，"华妃式张扬"成为个性表达的代名词，"皇后式隐忍"则引发对权力伪装的思考。</p>
        
        <h3>▍封建礼教的当代反思</h3>
        <p>上述评价体系，揭示了封建社会将女性物化的价值标准。这种标准与现代社会价值观形成的强烈反差，正是引发观众深度思考的关键。</p>

        <h3>▍女性叙事的突破</h3>
        <p>然而尽管设定在这样的封建背景下，剧中出现的女性角色所展现的生存智慧和主体意识，也为传统历史叙事提供了新的解读视角。这种复杂性的呈现，使作品超越了普通宫斗剧的格局。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';

const radarOption = ref({
  tooltip: { trigger: 'item' },
  legend: { 
    data: ['甄嬛', '皇后', '华妃'],
    bottom: 10,
    textStyle: { fontSize: 13 }
  },
  radar: {
    indicator: [
      { name: '颜值', max: 100 },
      { name: '才艺', max: 100 },
      { name: '家世', max: 100 },
      { name: '心计', max: 100 },
      { name: '感情', max: 100 }
    ],
    shape: 'circle',
    splitNumber: 4,
    axisName: { 
      color: '#666',
      fontSize: 12,
      fontWeight: 'bold'
    },
    radius: '70%',
    axisLine: { lineStyle: { color: 'rgba(150, 150, 150, 0.3)' } }
  },
  series: [ {
    type: 'radar',
    data: [
      { 
        value: [90, 95, 80, 98, 90], 
        name: '甄嬛',
        symbolSize: 8,
        lineStyle: { width: 3 },
        itemStyle: { color: '#9E2B25' },
        areaStyle: { 
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(158, 43, 37, 0.5)' },
            { offset: 1, color: 'rgba(158, 43, 37, 0.1)' }
          ])
        }
      },
      { 
        value: [85, 80, 95, 95, 60], 
        name: '皇后',
        symbolSize: 8,
        lineStyle: { width: 3 },
        itemStyle: { color: '#5E4B9E' },
        areaStyle: { 
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(94, 75, 158, 0.5)' },
            { offset: 1, color: 'rgba(94, 75, 158, 0.1)' }
          ])
        }
      },
      { 
        value: [98, 75, 90, 70, 40], 
        name: '华妃',
        symbolSize: 8,
        lineStyle: { width: 3 },
        itemStyle: { color: '#C23B22' },
        areaStyle: { 
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(194, 59, 34, 0.5)' },
            { offset: 1, color: 'rgba(194, 59, 34, 0.1)' }
          ])
        }
      }
    ]
  }],
  color: ['#9E2B25', '#5E4B9E', '#C23B22']
});
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Noto Serif SC", serif;
}

.content-box {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin: 40px 0;
  line-height: 1.8;
}

h1 {
  color: #9E2B25;
  text-align: center;
  font-weight: 600;
  margin: 30px 0;
  font-size: 2.2em;
}

h2 {
  color: #333;
  font-size: 1.6em;
  margin: 30px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

h3 {
  color: #5E4B9E;
  font-size: 1.2em;
  margin: 25px 0 15px;
  font-weight: 500;
}

.text-content p {
  margin-bottom: 20px;
  color: #444;
  text-align: justify;
  font-size: 1.05em;
}

.chart-embed {
  margin: 40px 0;
  background: transparent;
  border-radius: 8px;
}

.radar-chart {
  width: 100%;
  height: 400px;
}

@media (max-width: 768px) {
  .content-box {
    padding: 25px;
  }
  
  h1 {
    font-size: 1.8em;
  }
}
</style>