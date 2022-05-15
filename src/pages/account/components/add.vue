<template>
    <div>
      <a-space>
        <a-button type="primary" @click="showModal">
          新增
        </a-button>

        <a-button type="primary">
          批量新增
        </a-button>
      </a-space>

        <a-modal
                title="新增"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form-model :model="form"  >
                <a-form-model-item label="用户名">
                    <a-input v-model="form.username" />
                </a-form-model-item>
              <a-form-model-item label="邮箱">
                <a-input v-model="form.email" />
              </a-form-model-item>
                <a-form-model-item name="password" label="密码" :rules="[{ required: true, message: 'Please input your password!' }]">
                        <a-input-password v-model="form.password" />
                </a-form-model-item>
              <a-form-model-item name="password" label="确认密码" :rules="[{ required: true, message: 'Please input your password!' }]">
                  <a-input-password v-model="form.password1" />
              </a-form-model-item>
              <a-form-model-item label="角色">
                <a-select mode="tags" style="width: 100%" :token-separators="[',']" :options="roles" v-model="form.roles">

                </a-select>
              </a-form-model-item>

            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
  export default {
    name: "add",
    data() {
      return {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        roles:[{value:"1",label:"测试角色1"},{value:"2",label:"测试角色2"}],
        form: {
          username: '',
          email:'',
          password:'',
          password1:''
        },
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk() {
        console.log(this.form)
        this.axios({
          method:'post',
          url:'/api/',
          headers:{
            'Content-type': 'application/json'
          },
          data:JSON.stringify(this.form)
        }).then(res=>
        {
          console.log(res.data);
        })

        // setTimeout(() => {
        //   this.visible = false;
        //   this.confirmLoading = false;
        // }, 2000);
      },
      handleCancel() {
        console.log('Clicked cancel button');
        this.visible = false;
      },
    },
  }
</script>

<style scoped>

</style>
