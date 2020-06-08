<template>
  <div class="bill-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm">
      <el-form-item label="账单金额" prop="amount">
        <el-input-number v-model="ruleForm.amount" :precision="2" :step="1" :max="999999" />
      </el-form-item>
      <el-form-item label="账单分类" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择账单分类">
          <el-option v-for="(item,index) in categories" :key="index" :label="item.label" :value="item.value" />
        </el-select>
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
      <el-form-item label="账单类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="0">收入</el-radio>
          <el-radio label="1">支出</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addBill } from '@/api/csv.js'
export default {
  data() {
    return {
      ruleForm: {
        amount: 0,
        category: '',
        date: null,
        resource: ''
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
      categories: [
        {
          value: '1bcddudhmh',
          label: '车贷'
        },
        {
          value: 'hc5g66kviq',
          label: '车辆保养'
        },
        {
          value: '8s0p77c323',
          label: '房贷'
        },
        {
          value: '0fnhbcle6hg',
          label: '房屋租赁'
        },
        {
          value: 'odrjk823mj8',
          label: '家庭用品'
        },
        {
          value: 'bsn20th0k2o',
          label: '交通'
        },
        {
          value: 'j1h1nohhmmo',
          label: '旅游'
        },
        {
          value: '3tqndrjqgrg',
          label: '日常饮食'
        },
        {
          value: 's73ijpispio',
          label: '工资'
        },
        {
          value: '1vjj47vpd28',
          label: '股票投资'
        },
        {
          value: '5il79e11628',
          label: '基金投资'
        }
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          const { type, date, category, amount } = this.ruleForm
          addBill({
            type,
            time: date.getTime(),
            category,
            amount
          })
        } else {
          console.log('error submit!!')
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
.bill-container{
  padding: 20px;
}
</style>
