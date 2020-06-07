<template>
  <div class="pagination">
    <el-pagination
      :current-page="page.current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="(v)=>{change(v,'size')}"
      @current-change="(v)=>{change(v,'current')}"
    />
  </div>
</template>

<script>
export default {
  name: 'XTablePagination',
  props: {
    page: {
      type: Object,
      default() {
        return {
          current: 1,
          size: 10,
          total: 0
        }
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    change(v, type) {
      const page = Object.assign({}, this.page)
      page[type] = v
      this.$emit('change', page)
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination{
  margin-top: 20px;
}
</style>
