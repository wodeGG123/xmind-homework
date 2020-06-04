<template>
  <div class="bill-container">
    <x-table
      :resources="data"
    >
      <el-table-column
        prop="time"
        label="账单时间"
      />
      <el-table-column
        prop="type"
        label="账单类型"
      />
      <el-table-column
        prop="category"
        label="账单分类"
      />
      <el-table-column
        prop="amount"
        label="账单金额"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="()=>{scope}">修改</el-button>
          <el-button size="mini" @click="()=>{scope}">删除</el-button>
        </template>
      </el-table-column>
    </x-table>
  </div>
</template>

<script>
import { getBills } from '@/api/csv.js'
import XTable from '@/components/XTable/index'
export default {
  name: 'BillList',
  components: { XTable },
  data() {
    return {
      data: [{
        time: '2016-05-02',
        type: '王小虎',
        category: '上海市普陀区金沙江路 1518 弄',
        amount: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created() {
    getBills().then((data) => {
      this.data = data
    })
  }
}
</script>

<style lang="scss" scoped>
.bill-container{
  padding: 20px;
}
</style>
