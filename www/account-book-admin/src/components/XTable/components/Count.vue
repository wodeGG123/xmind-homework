<template>
  <div class="wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>统计</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('close','countShow')">收起</el-button>
      </div>
      <div>
        <p>
          总计：
          <el-tag class="tag" type="danger">收入：{{ income }}</el-tag><el-tag type="success">支出：{{ payout*-1 }}</el-tag>
        </p>
        <el-divider />
        <p>
          分类：
          <el-tag v-for="(item, index) in categories" :key="index" :class="['tag',item.count>=0?'income':'payout']">
            {{ `${item.label}：${item.count>0?'+':''}${item.count}` }}
          </el-tag>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
const initData = {
  income: 0,
  payout: 0,
  categories: [
    {
      value: '1bcddudhmh',
      count: 0,
      label: '车贷'
    },
    {
      value: 'hc5g66kviq',
      count: 0,
      label: '车辆保养'
    },
    {
      value: '8s0p77c323',
      count: 0,
      label: '房贷'
    },
    {
      value: '0fnhbcle6hg',
      count: 0,
      label: '房屋租赁'
    },
    {
      value: 'odrjk823mj8',
      count: 0,
      label: '家庭用品'
    },
    {
      value: 'bsn20th0k2o',
      count: 0,
      label: '交通'
    },
    {
      value: 'j1h1nohhmmo',
      count: 0,
      label: '旅游'
    },
    {
      value: '3tqndrjqgrg',
      count: 0,
      label: '日常饮食'
    },
    {
      value: 's73ijpispio',
      count: 0,
      label: '工资'
    },
    {
      value: '1vjj47vpd28',
      count: 0,
      label: '股票投资'
    },
    {
      value: '5il79e11628',
      count: 0,
      label: '基金投资'
    }
  ]
}
export default {
  name: 'XTableCount',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    const data = _.cloneDeep(initData)
    return {
      ...data
    }
  },
  watch: {
    data: {
      handler(v) {
        this.init()
        this.getCounts()
      }
    }
  },
  methods: {
    init() {
      const data = _.cloneDeep(initData)
      Object.assign(this, data)
    },
    getCounts() {
      this.data.forEach(element => {
        // 总计计算
        if (element.money >= 0) {
          this.income += element.money
        } else {
          this.payout += element.money
        }
        // 分类计算
        this.categories.forEach(category => {
          if (category.value === element.category) {
            category.count += element.money
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  margin-top: 16px;
  .tag{
    margin-right: 10px;
  }
  .income{
    color: #f56c6c;
  }
  .payout{
    color: #67c23a;
  }
}
</style>
