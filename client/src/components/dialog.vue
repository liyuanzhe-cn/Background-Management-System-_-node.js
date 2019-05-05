<template>
  <div class="dialog">

    <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-model="true" :close-on-press-esape="false">

      <el-form :model="formData" ref="form" :rules="rules" label-width="100px" style="margin:10px; width:auto">

        <el-form-item prop="describe" label="收支类型" :label-width="formLabelWidth">
          <el-select v-model="formData.describe" placeholder="收支类型">
            <el-option v-for="(type, index) in formdataList" :key="index" :label="type" :value="type"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="income" label="收入" :label-width="formLabelWidth">
          <el-input v-model="formData.income" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="expend" label="支出" :label-width="formLabelWidth">
          <el-input v-model="formData.expend" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="cash" label="交易方式" :label-width="formLabelWidth">
          <el-select v-model="formData.cash" placeholder="收支类型">
            <el-option v-for="(type, index) in transactions" :key="index" :label="type" :value="type"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="remark" label="收支描述" :label-width="formLabelWidth">
          <el-input v-model="formData.remark" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialoginput",
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      formLabelWidth: "20%",
      formdataList: [
        "优惠券", "打折", "减免", "无"
      ],
      transactions: [
        '现金', '转账', '微信支付', '支付宝'
      ],
      rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    }

  },
  updated() {
    console.log(this.dialog)
  },
  methods: {
    //表单提交
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.formData)
          const url = this.dialog.option == 'edit' ? `edit/${this.formData._id}` : 'add';


          this.$axios.post(`/api/profiles/${url}`, this.formData)
            .then(res => {
              console.log(res);
              this.$message({
                message: '已经提交',
                type: "success"
              });
              
            }).catch(err => {
              this.$message({
                message: '提交失败',
                type: "error"
              })
            })
          this.dialog.show = false;
          this.$emit('update');
          
        } else {
          this.$message({
            message: '输入内容不合法',
            type: "error"
          })
        }
      })

    }
  }


}

</script>

<style scoped>
.el-select,
.el-option,
.el-input {
  width: 80%;
}
</style>