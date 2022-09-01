<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="flag" :modal-append-to-body="false" :before-close="beforeClose" class="big">
      <el-form :model="changeForm" ref="changeFormRef">
        <el-form-item label="用户名" prop="account" :label-width="formLabelWidth">
          <el-input v-model="changeForm.account"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="changeForm.password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" prop="password2" :label-width="formLabelWidth">
          <el-input v-model="changeForm.password2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ok">确认</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    // 用户名校验
    const checkAccount = (rule, value, callback) => {
      const re = /^[a-z0-9_-]{3,16}$/
      if (re.test(value)) {
        callback()
      } else {
        callback(new Error('用户格式不正确'))
      }
    }
    // 密码校验
    const checkPassword = (rule, value, callback) => {
      const re = /^[a-z0-9_-]{6,18}$/
      if (re.test(value)) {
        callback()
      } else {
        callback(new Error('密码格式不正确'))
      }
    }
    const checkPassword2 = (rule, value, callback) => {
      const re = /^[a-z0-9_-]{6,18}$/
      if (re.test(value)) {
        callback()
      } else {
        callback(new Error('确认密码格式不正确'))
      }
    }
    return {
      changeForm: {
        account: '',
        password: '',
        password2: ''
      },
			formLabelWidth:"80px",
      flag: false,
      rules: {
        account: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPassword2, trigger: 'blur' }
        ]
      }
    }
  },
  props: ['dialogFormVisible'],
  methods: {
    ok() {
      this.$refs.changeFormRef.validate((valid) => {
        if (!valid) {
          return
        }
      })
      this.$emit('dialogForm')
    },
    beforeClose() {
      this.$emit('dialogForm')
    },
    cancel() {
      this.$emit('dialogForm')
    }
  },

  // 监听
  watch: {
    dialogFormVisible: function (newVal) {
      this.flag = newVal
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
