<template>
  <div class="wrap">
    <el-button @click="dialogFormVisible = true">+添加账单</el-button>
    <el-dialog
      title="添加账单"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :show-close="false"
      width="400px"
      @closed="resetForm('ruleForm')"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm">
        <el-form-item label="账单金额" prop="amount">
          <el-input-number v-model="ruleForm.amount" :precision="2" :step="1" :max="999999" />
        </el-form-item>
        <el-form-item label="账单类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="0">支出</el-radio>
            <el-radio label="1">收入</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账单时间" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="账单分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择账单分类">
            <el-option v-for="(item,index) in categories" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="submitForm('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { addBill } from '@/api/csv.js'
import { mapState } from 'vuex'
export default {
  name: 'AddBill',
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      ruleForm: {
        amount: 0,
        category: '',
        date: null,
        type: ''
      },
      rules: {
        amount: [
          { required: true, message: '请输入账单金额', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择账单分类', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择账单日期', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择账单类型', trigger: 'change' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }]
      },
      categories: []
    }
  },
  computed: {
    ...mapState({
      xCategories: state => state.categories.data
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
      const categories = this.xCategories.map((obj) => {
        return {
          value: obj.id,
          label: obj.name
        }
      })
      this.categories = categories
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { type, date, category, amount } = this.ruleForm
          this.loading = true
          addBill({
            type,
            time: date.getTime(),
            category,
            amount
          }).then(() => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }).catch(() => {
            this.$message.error('添加失败')
          }).finally(() => {
            this.dialogFormVisible = false
            this.loading = false
            this.$emit('refresh')
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  display: inline-block;
}
.bill-container{
  padding: 20px;
}
</style>
