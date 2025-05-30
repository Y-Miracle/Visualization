<template>
  <div>
    <h2>豆瓣评分分布</h2>
    <div class="chart-container">
      <e-charts
        v-for="(star, index) in starRatings"
        :key="index"
        class="liquid-chart"
        :option="getOption(star)"
      />
    </div>
    <h2>分平台数据表现</h2>
    <e-charts class="chart" :option="mixedChartOption" />
    <h2>甄嬛传豆瓣长评词云图</h2>
    <div class="image-container">
      <img :src="ciyunPng" alt="甄嬛传词云图" class="wordcloud-image" />
    </div>
  </div>
</template>

<script setup>
import ciyunPng from '../assets/ciyun.png'
import { ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill' // 引入水波图插件

const starRatings = ref([
  { label: '5星', value: 0.76, color: ['#3ba272', '#5CB88B'] },
  { label: '4星', value: 0.202, color: ['#5470c6', '#5E4B9E'] },
  { label: '3星', value: 0.03, color: ['#fac858', '#C23B22'] },
  { label: '2星', value: 0.003, color: ['#ee6666', '#9E2B25'] },
  { label: '1星', value: 0.005, color: ['#9a60b4', '#8A6BBE'] }
])

// 返回每一个图表的配置项
const getOption = (star) => {
  return {
    series: [
      {
        type: 'liquidFill',
        radius: '80%',
        data: [star.value, star.value * 0.9],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: star.color[0] },
              { offset: 1, color: star.color[1] }
            ]
          }
        },
        label: {
          fontSize: 18,
          color: '#333',
          formatter: `${(star.value * 100).toFixed(1)}%`
        },
        backgroundStyle: {
          color: '#f0f0f0'
        },
        outline: {
          borderDistance: 4,
          itemStyle: {
            borderColor: star.color[1],
            borderWidth: 2
          }
        }
      }
    ],
    title: {
      text: star.label,
      left: 'center',
      top: '85%',
      textStyle: {
        fontSize: 16,
        color: '#555'
      }
    }
  }
}

const mixedChartOption = ref({
  title: {
    text: '各平台内容创作与互动对比',
    left: 'center',
    textStyle: {
      fontSize: 18
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    top: 'bottom'
  },
  xAxis: {
    type: 'category',
    data: ['小红书', '微信', '微博', '抖音', '哔哩哔哩']
  },
  yAxis: [
    {
      type: 'value',
      name: '数量（万）',
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: { color: '#333333' } // 设置为蓝色
      }
    },
    {
      type: 'value',
      name: '总互动量（万）',
      position: 'right',
      axisLine: {
        show: true,
        lineStyle: { color: '#8A6BBE' } // 设置为黄色
      }
    }
  ],
  series: [
    {
      name: '达人数量',
      type: 'bar',
      data: [2.1, 2.7, 1.9, 1.6, 0.1914],
      itemStyle: {
        color: '#9E2B25' // 设置为蓝色
      }
    },
    {
      name: '作品总数',
      type: 'bar',
      data: [6.2, 8.2, 18.4, 4.5, 0.866],
      itemStyle: {
        color: '#5CB88B' // 设置为绿色
      }
    },
    {
      name: '总互动量',
      type: 'line',
      yAxisIndex: 1,
      data: [4652.3, 157.0, 3951.7, 49000, 3158.7],
      itemStyle: {
        color: '#8A6BBE' // 设置为橙色
      },
      lineStyle: {
        width: 3
      },
      symbol: 'circle',
      symbolSize: 10
    }
  ]
});

</script>

<style>
.chart-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
.liquid-chart {
  width: 160px;
  height: 200px;
}
.chart {
  width: 100%;
  height: 500px;
}
.image-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.wordcloud-image {
  width: 700px; /* 或者你可以用 300px、350px 等更小的值 */
  height: auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
