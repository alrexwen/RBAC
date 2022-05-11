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
                    <a-input v-model="form.desc" />
                </a-form-model-item>
              <a-form-model-item label="邮箱">
                <a-input v-model="form.desc" />
              </a-form-model-item>
                <a-form-model-item label="密码">
                    <a-input v-model="form.desc" />
                </a-form-model-item>
              <a-form-model-item label="确认密码">
                <a-input v-model="form.desc" />
              </a-form-model-item>
              <a-form-model-item label="权限">
                <a-select mode="tags" style="width: 100%" :token-separators="[',']">

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
        form: {
          name: '',
        },
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk() {
        this.ModalText = 'The modal will be closed after two seconds';
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
  }
</script>

<style scoped>

</style>
