<template>
    <div>
        <a type="primary" @click="showModal">
            编辑
        </a>
        <a-modal
                title="编辑"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form-model :model="form"  >
                <a-form-model-item label="角色ID">
                    001
                </a-form-model-item>
                <a-form-model-item label="角色名">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="权限">
                    <a-select mode="tags" style="width: 100%" :token-separators="[',']" >
                        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                            {{ (i + 9).toString(36) + i }}
                        </a-select-option>
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
