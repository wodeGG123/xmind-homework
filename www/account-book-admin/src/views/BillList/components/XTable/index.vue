<template>
  <div class="x-table-wrap">
    <x-table-filter v-show="filterShow" @close="closeCard" @change="filterChange" />
    <x-table-count v-show="countShow" :data="filtedData" @close="closeCard" />
    <div class="buttons">
      <x-table-add @refresh="$listeners.refresh" />
      <el-button v-show="!filterShow" class="pull-right" @click="filterShow = true">筛选</el-button>
      <el-button v-show="!countShow" class="pull-right" @click="countShow = true">统计</el-button>
    </div>
    <el-table
      ref="table"
      v-bind="$attrs"
      :data="tableData"
      stripe
      style="width: 100%"
      :row-key="(row)=>row._id"
      v-on="$listeners"
      @sort-change="sortChange"
    >
      <slot />
    </el-table>
    <x-table-pagination v-if="page.total > 0" :page="page" @change="pageChange" />
  </div>
</template>

<script>
import XTableFilter from './components/Filter'
import XTablePagination from './components/Pagination'
import XTableCount from './components/Count'
import XTableAdd from './components/Add'
import _ from 'lodash'
export default {
  name: 'XTable',
  components: {
    XTableFilter,
    XTablePagination,
    XTableCount,
    XTableAdd
  },
  props: {
    resources: {
      type: Array,
      default() {
        return []
      }
    }

  },
  data() {
    return {
      filterShow: false,
      countShow: false,
      filters: {
        time: null, // 月份组件默认空值为null
        categories: [],
        type: ''
      },
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      filtedData: [], // 筛选后的数据
      tableData: [] // 最终展示的数据（分页后）
    }
  },
  watch: {
    // 得到数据源后筛选数据
    resources: {
      handler(v) {
        this.$refs.table.clearSort()
        this.setFiltedData()
      }
    },
    // 数据筛选完成后，更新分页数据（总数会变）
    filtedData: {
      handler(v) {
        this.setPage({
          current: 1,
          total: v.length
        })
      }
    }
  },
  methods: {
    setPage(v) {
      this.page = Object.assign({}, this.page, v)
      this.setTableData()
    },
    // 分页信息改变触发
    pageChange(v) {
      this.setPage(v)
    },
    // 筛选信息改变触发
    filterChange(v) {
      this.filters = Object.assign({}, v)
      this.setFiltedData()
    },
    setTableData() {
      let tableData = []
      // 设置当前页数据
      tableData = this.filtedData.slice((this.page.current - 1) * this.page.size, this.page.current * this.page.size)
      this.tableData = tableData
    },
    setFiltedData() {
      const filtedData = []

      // 筛选月份
      this.resources.forEach(item => {
        // 把收入支出进行数据转换，增强可读性，提升用户体验
        item = parseData.call(this, item)
        // 设置标记，是否添加到数据源
        let tag = true
        // 对账单月份筛选
        if (!filterMonth.call(this, item)) {
          tag = false
        }
        // 对账单分类进行筛选
        if (!filterCategory.call(this, item)) {
          tag = false
        }
        if (tag) filtedData.push(item)
      })
      this.filtedData = filtedData

      function parseData(data) {
        const rs = data
        const tag = data.type === '0' ? -1 : 1
        rs.money = data.amount * tag
        return rs
      }
      function filterMonth(item) {
        const filterYear = new Date(Number(this.filters.time)).getFullYear()
        const filterMonth = new Date(Number(this.filters.time)).getMonth() + 1
        const _time = new Date(Number(item.time))
        const _itemYear = _time.getFullYear()
        const _itemMonth = _time.getMonth() + 1
        // 如果筛选项为空，代表不筛选，数据全部通过
        if (this.filters.time === null) {
          return true
        } else {
          // 年月匹配才通过筛选
          if (_itemYear === filterYear && _itemMonth === filterMonth) {
            return true
          } else {
            return false
          }
        }
      }
      function filterCategory(item) {
        let rs = false
        if (this.filters.categories.length > 0) {
          for (let index = 0; index < this.filters.categories.length; index++) {
            const element = this.filters.categories[index]
            if (item.category === element) {
              rs = true
              break
            }
          }
        } else {
          rs = true
        }
        return rs
      }
    },
    // 对数据进行排序
    sortChange(data) {
      if (data.prop === 'money') {
        let rs = _.cloneDeep(this.filtedData)
        if (data.order === 'ascending') {
          rs = rs.sort((a, b) => {
            return a.money - b.money
          })
          this.filtedData = rs
        } else if (data.order === 'descending') {
          rs = rs.sort((a, b) => {
            return b.money - a.money
          })
          this.filtedData = rs
        } else {
          // 不排序的情况下重置数据
          this.setFiltedData()
        }
      }
    },
    // 关闭卡片
    closeCard(v) {
      this[v] = false
    }

  }
}
</script>

<style lang="scss" scoped>
  .buttons{
     margin-top: 16px;
     .pull-right{
      float: right;
      margin-left: 10px;
     }
  }
</style>
