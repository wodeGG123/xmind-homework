<template>
  <div class="x-table-wrap">
    <div class="filter">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>筛选</span>
        </div>
        <div class="filter-inner">
          <dl>
            <dt>月份：</dt>
            <dd>
              <el-date-picker
                v-model="filters.month"
                type="month"
                placeholder="选择月"
              />
            </dd>
          </dl>
        </div>
      </el-card>
    </div>
    <el-table
      v-bind="$attrs"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <slot />
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="page.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'XTable',
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
      filters: {
        month: ''
      },
      page: {
        current: 1,
        size: 10,
        total: 100
      },
      filtedData: [],
      tableData: []
    }
  },
  watch: {
    resources: {
      handler(v) {
        console.log(v)
        this.setFiltedData()
      }
    },
    filtedData: {
      handler(v) {
        this.setTableData()
      }
    }
  },
  methods: {
    setTableData() {
      let tableData = this.resources
      // 筛选数据
      tableData = this.getFiltedData(tableData)
      this.tableData = tableData
    },
    setFiltedData() {
      const filtedData = this.resources

      this.filtedData = filtedData
    },
    getFiltedData(data) {
      const rs = []

      return rs
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="scss" scoped>
.filter{
  .filter-inner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    dl{
      display: flex;
      justify-content: center;
      align-items: center;
  }
  }
}
.pagination{
  margin-top: 20px;
}
</style>
