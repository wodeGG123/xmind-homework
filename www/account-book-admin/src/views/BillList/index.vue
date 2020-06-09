<template>
  <div v-loading="loading" class="bill-container">
    <x-table
      :resources="data"
      @refresh="getBills"
    >
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
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <x-table-edit :data="scope.row" @refresh="getBills" />
          <el-button size="mini" @click="()=>{handleDelete(scope.row)}">删除</el-button>
        </template>
      </el-table-column>
    </x-table>
  </div>
</template>

<script>
import { getBills, getCategories, deleteBill } from '@/api/csv.js'
import XTable from './components/XTable/index'
import moment from 'moment'
import XTableEdit from './components/XTable/components/Edit'
export default {
  name: 'BillList',
  components: { XTable, XTableEdit },
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
    formateCategory(v) {
      let rs = ''
      for (let index = 0; index < this.categories.length; index++) {
        const element = this.categories[index]
        if (element.id === v) {
          rs = element.name
        }
      }
      return rs
    },
    handleDelete(obj) {
      this.$confirm('此操作将永久删除此账单信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除请求
        deleteBill({
          _id: obj._id
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((e) => {
          this.$message.error('删除失败')
        }).finally(() => {
          this.getBills()
        })
      }).catch(() => {
      })
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
