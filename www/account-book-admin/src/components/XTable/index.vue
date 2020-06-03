<template>
  <div class="x-table-wrap">
    <div class="filter">
      <dl>
        <dt>月：</dt>
        <dd>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </dd>

      </dl>

    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <slot />
    </el-table>
    <el-pagination
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'XTable',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
