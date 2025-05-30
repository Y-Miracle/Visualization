<template>
  <div>
    <!-- 阵营按钮 -->
    <div class="camp-button-group">
      <el-button
        class="btn-purple"
        round
        plain
        @click="selectCamp('皇后阵营')"
      >
        皇后阵营
      </el-button>
      <el-button
        class="btn-green"
        round
        plain
        @click="selectCamp('华妃阵营')"
      >
        华妃阵营
      </el-button>
      <el-button
        class="btn-red"
        round
        plain
        @click="selectCamp('甄嬛阵营')"
      >
        甄嬛阵营
      </el-button>
    </div>

    <div ref="lineChartRef" style="width: 100%; height: 400px; margin-top: 20px;"></div>
    <div ref="chartRef" style="width: 100%; height: 800px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
const lineChartRef = ref(null)
let relationChart = null
let lineChart = null
let positionData = null

const ranks = ['太后', '皇后', '皇贵妃', '贵妃', '妃', '嫔', '贵人', '常在', '答应', '官女子', '庶民', '下线']

function wrapText(text, lineLength = 20) {
  return text.replace(new RegExp(`(.{${lineLength}})`, 'g'), '$1<br>')
}

// 渲染折线图
const selectCamp = (camp) => {
  const campData = positionData[camp]
  if (!campData) return

  const xAxisLabels = campData.xAxis
  const series = campData.series.map(s => {
    const name = s.name
    const data = s.data.map(v => ranks[v - 1] || '未知')

    return {
      name,
      type: 'line',
      data,
      label: {
        show: true,
        position: 'right',
        formatter: (params) => {
          const index = params.dataIndex
          if (index === 0 || index === data.length - 1) {
            return name
          }
          return ''
        }
      },
      labelLayout: {
        hideOverlap: true
      }
    }
  })

  const option = {
    color: ['#8A6BBE', '#5CB88B', '#C23B22', '#5E4B9E', '#9E2B25'],
    title: {
      text: `${camp}位份变化`,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let tooltip = `${params[0].axisValue}<br/>`
        params.forEach(p => {
          tooltip += `${p.seriesName}: ${p.data}<br/>`
        })
        return tooltip
      }
    },
    legend: {
      data: campData.series.map(s => s.name),
      top: '30px'
    },
    xAxis: {
      type: 'category',
      data: xAxisLabels,
      name: '时期'
    },
    yAxis: {
      type: 'category',
      name: '位份',
      inverse: true,
      data: ranks
    },
    series
  }

  lineChart.setOption(option, true)
}

onMounted(async () => {
  relationChart = echarts.init(chartRef.value)
  lineChart = echarts.init(lineChartRef.value)

  const [relationResponse, positionResponse] = await Promise.all([
    fetch('/relation.json'),
    fetch('/position.json')
  ])

  const relationData = await relationResponse.json()
  positionData = await positionResponse.json()

  // 初始化默认阵营折线图
  selectCamp('甄嬛阵营')

  // 初始化人物关系图
  const nodes = relationData.nodes.map(n => ({
    id: n.ID.toString(),
    name: n.Label,
    title: n.Title,
    category: n.Alliance,
    symbolSize: 35,
    draggable: true,
    tooltip: {
      formatter: `<b>${n.Title}</b><br>${wrapText(n['角色描述'])}`
    }
  }))

  const categories = Array.from(new Set(relationData.nodes.map(n => n.Alliance))).map(name => ({ name }))

  const baseEdges = relationData.edges.map(e => ({
    source: e.source.toString(),
    target: e.target.toString(),
    relationship: e.Relationship,
    label: { show: false, formatter: e.Relationship },
    lineStyle: { opacity: 0.2 }
  }))

  const getInitialOption = () => ({
    color: ['#8A6BBE', '#5CB88B', '#C23B22', '#5E4B9E', '#9E2B25'],
    title: {
      text: '甄嬛传人物关系图',
      left: 'center',
      top: '40px'
    },
    tooltip: {
      confine: true,
      formatter: function (params) {
        return params.dataType === 'node'
          ? `<b>${params.data.title}</b><br>${wrapText(params.data['角色描述'])}`
          : ''
      }
    },
    legend: {
      data: categories.map(c => c.name),
      top: '60px'
    },
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      categories,
      data: nodes,
      links: baseEdges,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}'
      },
      force: {
        repulsion: 300,
        edgeLength: 120
      },
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: 10
    }]
  })

  relationChart.setOption(getInitialOption())

  window.addEventListener('resize', () => {
    relationChart.resize()
    lineChart.resize()
  })

  relationChart.on('click', function (params) {
    if (params.dataType === 'node') {
      const clickedId = params.data.id
      const newEdges = baseEdges.map(edge => {
        const isRelated = edge.source === clickedId || edge.target === clickedId
        return {
          ...edge,
          label: {
            show: isRelated,
            formatter: edge.relationship
          },
          lineStyle: {
            opacity: isRelated ? 1 : 0.1,
            color: isRelated ? '#f00' : '#999'
          }
        }
      })
      relationChart.setOption({ series: [{ links: newEdges }] })
    } else {
      relationChart.setOption(getInitialOption())
    }
  })
})
</script>

<style scoped>
.camp-button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.el-button {
  font-size: 16px;
  padding: 10px 24px;
}

/* 自定义配色按钮 */
.btn-purple {
  background-color: #8A6BBE;
  color: #fff;
  border: none;
}
.btn-green {
  background-color: #5CB88B;
  color: #fff;
  border: none;
}
.btn-red {
  background-color: #C23B22;
  color: #fff;
  border: none;
}

.btn-purple:hover,
.btn-green:hover,
.btn-red:hover {
  opacity: 0.85;
}
</style>
