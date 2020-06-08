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
import { mapState } from 'vuex'
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
    return {
      income: 0,
      payout: 0,
      categories: []
    }
  },
  computed: {
    ...mapState({
      xCategories: store => store.categories.data
    })
  },
  watch: {
    xCategories: {
      deep: true,
      immediate: true,
      handler(v) {
        this.initCategories()
      }
    },
    data: {
      handler(v) {
        this.init()
        this.getCounts()
      }
    }
  },
  methods: {
    init() {
      this.income = 0
      this.payout = 0
      this.initCategories()
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
      this.categories.sort((a, b) => {
        return b.count - a.count
      })
    },
    initCategories() {
      const categories = this.xCategories.map((obj) => {
        return {
          value: obj.id,
          count: 0,
          label: obj.name
        }
      })
      this.categories = categories
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  margin-top: 16px;
  .tag{
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .income{
    color: #f56c6c;
  }
  .payout{
    color: #67c23a;
  }
}
</style>
