<template>
    <div>
        <a-button type="primary" @click="showModal">
            新增
        </a-button>
        <a-modal
                title="新增"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form-model :model="form"  >

                <a-form-model-item label="公钥">
                    <a-textarea placeholder="PKCS8 格式-----BEGIN PUBLIC KEY-----" :rows="4" />
                </a-form-model-item>
                <a-form-model-item label="私钥">
                    <a-textarea placeholder="PKCS8 格式-----BEGIN PRIVATE KEY-----" :rows="4" />
                </a-form-model-item>
                <a-form-model-item label="过期时间">
                    <a-date-picker style="width: 100%" />
                </a-form-model-item>
                <a-form-model-item label="作废时间">
                    <a-date-picker style="width: 100%" />
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
