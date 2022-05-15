<template>
    <div>
        <a type="primary" @click="showModal">
            <a-icon type="edit" />编辑
        </a>
        <a-modal
                title="编辑"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form-model :model="form"  >
                <a-form-model-item label="账号ID">
                    10000
                </a-form-model-item>
                <a-form-model-item label="用户名">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="邮箱">
                    <a-input v-model="form.email" />
                </a-form-model-item>
                <a-form-model-item label="角色">
                  <a-select mode="tags" style="width: 100%" :token-separators="[',']" :options="form.roles">

                  </a-select>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
  export default {
    name:'edit',
    data() {
      return {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        form: {
          name: '',
          roles:[{value:"1",label:"测试角色1"},{value:"2",label:"测试角色2"}],
        },
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(from) {
       console.log(from,1)
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      },
      handleCancel() {
        console.log('Clicked cancel button');
        this.visible = false;
      },
    },
  };
</script>
