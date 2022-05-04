<template>
    <div>
        <a-button @click="showModal">
            编辑
        </a-button>
        <a-modal
                title="编辑"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form-model :model="form"  >

                <a-form-model-item label="名称">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="内容">
                    <a-input v-model="form.desc" type="textarea" />
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
  };
</script>
