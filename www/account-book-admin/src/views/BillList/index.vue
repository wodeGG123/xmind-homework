<template>
  <div v-loading="loading" class="bill-container">
    <x-table
      :resources="data"
    >
      <template slot="top">
        <el-button @click="$router.push({name:'BillAdd'})">+添加账单</el-button>
      </template>
      <el-table-column
        label="账单时间"
        prop="time"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.time|formateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账单金额"
        sortable="custom"
        prop="money"
      >
        <template slot-scope="scope">
          <span :class="scope.row.money>=0?'income':'payout'">{{ scope.row.money>0?'+':'' }}{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账单分类"
        prop="category"
      >
        <template slot-scope="scope">
          <span>{{ formateCategory(scope.row.category) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="账单类型"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.type|formateType }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="()=>{scope}">修改</el-button>
          <el-button size="mini" @click="()=>{scope}">删除</el-button>
        </template>
      </el-table-column> -->
    </x-table>
  </div>
</template>

<script>
import { getBills, getCategories } from '@/api/csv.js'
import XTable from './components/XTable/index'
import moment from 'moment'
export default {
  name: 'BillList',
  components: { XTable },
  filters: {
    formateDate(v) {
      return moment(new Date(Number(v))).format('YYYY-MM-DD')
    },
    formateType(v) {
      const type = {
        0: '支出',
        1: '收入'
      }
      return type[Number(v)]
    }
  },
  data() {
    return {
      loading: false,
      data: [],
      categories: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.loading = true
      await this.initCategory()
      this.getBills()
    },
    getBills() {
      this.loading = true
      getBills().then((data) => {
        this.data = data
      }).finally(() => {
        this.loading = false
      })
    },
    initCategory() {
      return getCategories().then((data) => {
        this.categories = data
        return data
      })
    },
    //
    formateCategory(v) {
      let rs = ''
      // const type = {
      //   0: '支出',
      //   1: '收入'
      // }
      for (let index = 0; index < this.categories.length; index++) {
        const element = this.categories[index]
        if (element.id === v) {
          rs = element.name
        }
      }
      return rs
    }
  }
}
</script>

<style lang="scss" scoped>
.bill-container{
  padding: 20px;
  .income{
    color: #f56c6c;
  }
  .payout{
    color: #67c23a;
  }
}
</style>
