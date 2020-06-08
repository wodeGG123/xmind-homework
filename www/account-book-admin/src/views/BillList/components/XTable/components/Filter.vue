<template>
  <div class="filter">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('close','filterShow')">收起</el-button>
      </div>
      <div class="filter-inner">
        <dl>
          <dt>月份：</dt>
          <dd>
            <el-date-picker
              v-model="filters.time"
              type="month"
              placeholder="选择月"
            />
          </dd>
        </dl>
        <dl>
          <dt>账单分类：</dt>
          <dd>
            <el-select
              v-model="filters.categories"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择"
              :clearable="true"
            >
              <el-option
                v-for="item in categoriesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </dd>
        </dl>
        <!-- <dl>
          <dt>账单类型：</dt>
          <dd>
            <el-select
              v-model="filters.type"
              placeholder="请选择"
              :clearable="true"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </dd>
        </dl> -->
        <!-- <dl>
          <dt>账单金额：</dt>
          <dd>
            <el-date-picker
              v-model="filters.time"
              type="month"
              placeholder="选择月"
              @change="(v)=>{change(v,'time')}"
            />
          </dd>
        </dl> -->
      </div>
      <el-divider />
      <div>
        <el-button type="primary" @click="handleSubmit">筛选</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'XTableFilter',
  data() {
    return {
      filters: {
        time: null,
        categories: []
        // type: ''
      },
      typeOptions: [
        {
          value: '0',
          label: '支出'
        },
        {
          value: '1',
          label: '收入'
        }
      ],
      categoriesOptions: []
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
    }
  },
  methods: {
    initCategories() {
      const categoriesOptions = this.xCategories.map((obj) => {
        return {
          value: obj.id,
          label: obj.name
        }
      })
      this.categoriesOptions = categoriesOptions
    },
    handleSubmit() {
      this.$emit('change', this.filters)
    },
    handleReset() {
      this.filters = {
        time: null,
        categories: []
        // type: ''
      }
      this.$emit('change', this.filters)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter{
  .filter-inner{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    dl{
      margin-right: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  }
}
</style>
