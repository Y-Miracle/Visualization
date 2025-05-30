<template>
  <div ref="timelineChartRef" style="width: 100%; height: 700px;"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const timelineChartRef = ref(null)
let timelineChart = null
let resizeHandler = null

const timelineData = [
  {
    name: '甄嬛屠龙记',
    color: '#9E2B25',
    data: [
      { year: 1723.50, event: '选秀入宫封莞常在' },
      { year: 1723.92, event: '倚梅园许愿被余莺儿冒领' },
      { year: 1724.25, event: '御花园与皇帝以"果郡王"身份相识' },
      { year: 1725.25, event: '怀孕晋封莞嫔' },
      { year: 1725.50, event: '被华妃罚跪导致小产' },
      { year: 1725.92, event: '惊鸿舞复宠与果郡王合奏' },
      { year: 1727.25, event: '发现纯元替身真相被贬' },
      { year: 1729.50, event: '凌云峰与果郡王定情' },
      { year: 1731.50, event: '设计蝴蝶局风光回宫' },
      { year: 1731.92, event: '诞下双胞胎晋熹贵妃' },
      { year: 1732.25, event: '滴血验亲眉庄身亡' },
      { year: 1734.50, event: '用纯元旧事扳倒皇后' },
      { year: 1735.25, event: '揭发三阿哥与瑛贵人私通' },
      { year: 1736.75, event: '发现夏刈调查双生子' },
      { year: 1737.50, event: '被迫毒杀果郡王' },
      { year: 1738.75, event: '用先帝遗诏终结皇后' }
    ]
  },
  {
    name: '宜修权谋录',
    color: '#5E4B9E',
    data: [
      { year: 1723.75, event: '指使安陵容埋麝香' },
      { year: 1724.50, event: '策划眉庄假孕事件' },
      { year: 1725.25, event: '利用香粉害富察贵人小产' },
      { year: 1726.75, event: '安排祺贵人入宫分宠' },
      { year: 1727.25, event: '故衣局陷害甄嬛' },
      { year: 1728.50, event: '指使静白虐待甄嬛' },
      { year: 1732.25, event: '主导滴血验亲局' },
      { year: 1733.50, event: '安排青樱接近三阿哥' },
      { year: 1733.75, event: '逼齐妃写认罪书自尽' },
      { year: 1734.50, event: '残害皇嗣罪行败露' },
      { year: 1735.00, event: '剪秋投毒反害自己' }
    ]
  },
  {
    name: '华妃欢宜殇',
    color: '#C23B22',
    data: [
      { year: 1723.77, event: '赏夏冬春一丈红立威' },
      { year: 1724.00, event: '指使余莺儿下毒' },
      { year: 1724.58, event: '推眉庄入千鲤池' },
      { year: 1725.25, event: '火烧碎玉轩示威' },
      { year: 1725.50, event: '罚跪甄嬛致小产' },
      { year: 1726.75, event: '年羹尧被贬家族倒台' },
      { year: 1726.92, event: '得知欢宜香真相自尽' }
    ]
  },
  {
    name: '眉庄风骨颂',
    color: '#5CB88B',
    data: [
      { year: 1723.50, event: '入宫即封惠贵人' },
      { year: 1724.50, event: '首获协理六宫之权' },
      { year: 1724.58, event: '被华妃推入千鲤池' },
      { year: 1725.00, event: '假孕事件被禁足' },
      { year: 1725.25, event: '染时疫被甄嬛救' },
      { year: 1727.60, event: '拒绝复宠侍奉太后' },
      { year: 1730.75, event: '与温实初酒后定情' },
      { year: 1731.75, event: '怀孕设计复宠' },
      { year: 1732.25, event: '为护温实初血崩亡' }
    ]
  },
  {
    name: '陵容浮沉史',
    color: '#8A6BBE',
    data: [
      { year: 1723.50, event: '入宫因家世受欺' },
      { year: 1724.50, event: '用舒痕胶害眉庄' },
      { year: 1725.25, event: '香粉引猫害富察' },
      { year: 1726.25, event: '为救父卷入贪污案' },
      { year: 1727.60, event: '唱《菩萨蛮》复宠' },
      { year: 1728.25, event: '制梦甜香晋安嫔' },
      { year: 1730.50, event: '苦练冰嬉致不孕' },
      { year: 1731.50, event: '用迷情香再复宠' },
      { year: 1732.00, event: '假孕封鹂妃' },
      { year: 1733.25, event: '死前暗示皇后罪行' }
    ]
  }
]

onMounted(() => {
  timelineChart = echarts.init(timelineChartRef.value)

  const series = timelineData.map((line, lineIndex) => ({
    name: line.name,
    type: 'line',
    symbolSize: 10,
    lineStyle: {
      width: 3,
      color: line.color
    },
    itemStyle: {
      color: line.color
    },
    emphasis: {
      itemStyle: {
        borderWidth: 2,
        borderColor: '#fff'
      }
    },
    data: line.data.map(item => ({
      name: item.event,
      value: [item.year, lineIndex],
      symbol: 'pin',
      symbolSize: 30
    }))
  }))

  const option = {
    title: {
      text: '雍正元年至十六年大事记',
      left: 'center',
      textStyle: {
        fontSize: 20,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: params => {
        const year = params.data.value[0]
        const month = Math.round((year - Math.floor(year)) * 12) + 1
        return `
          <strong>${params.seriesName}</strong><br/>
          <span style="color:${params.color}">●</span> 
          雍正${Math.floor(year)-1722}年${month}月<br/>
          ${params.data.name}
        `
      }
    },
    legend: {
      data: timelineData.map(item => item.name),
      top: 60,
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      type: 'value',
      name: '纪年',
      min: 1722,
      max: 1739,
      axisLabel: { 
        formatter: value => Number.isInteger(value) ? `雍正${value-1722}年` : ''
      },
      nameTextStyle: {
        padding: [0, 0, 0, 40]
      }
    },
    yAxis: {
      type: 'category',
      name: '人物线',
      data: timelineData.map(item => item.name),
      axisLine: { show: false },
      axisTick: { show: false },
      nameTextStyle: {
        padding: [0, 40, 0, 0]
      }
    },
    series
  }

  timelineChart.setOption(option)

  resizeHandler = () => {
    timelineChart.resize()
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  if (timelineChart) {
    timelineChart.dispose()
    timelineChart = null
  }
})
</script>