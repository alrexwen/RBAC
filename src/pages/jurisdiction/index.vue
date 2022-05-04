<template>
    <a-card>
        <div>
            <a-space class="operator">
<!--                <a-button @click="addNew" type="primary">新建</a-button>-->
                <add/>
            </a-space>
            <standard-table
                    :columns="columns"
                    :dataSource="dataSource"
                    :selectedRows.sync="selectedRows"
            >
                <div slot="description" slot-scope="{text}">
                    {{text}}
                </div>
                <div slot="action" slot-scope="{text, record}">
<!--                    <a style="margin-right: 8px">-->
<!--                        <a-icon type="edit"/>编辑-->
<!--                    </a>-->
                    <edit/>
                    <a @click="deleteRecord(record.key)">
                        <a-icon type="delete" />删除
                    </a>
                </div>
            </standard-table>
        </div>
    </a-card>
</template>

<script>
  import StandardTable from '@/components/table/StandardTable'
  import add from "./components/add";
  import edit from "./components/edit";
  const columns = [
    {
      title: '权限ID',
      dataIndex: 'no'
    },

    {
      title:'权限名',
      dataIndex: 'name',
    },
    {
      title: '权限标识符',
      dataIndex: "privilegeIdentifier",
    },
    {
      title: '说明',
      dataIndex: "comment",
    },
    {
      title: '创建时间',
      dataIndex: "createTime"
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }
  ]

  const dataSource = []

  export default {
    name: 'QueryList',
    components: {StandardTable,add,edit},
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: dataSource,
        selectedRows: []
      }
    },
    authorize: {
      deleteRecord: 'delete'
    },
    mounted() {
      this.getdata();
    },
    methods: {
      deleteRecord(key) {
        this.dataSource = this.dataSource.filter(item => item.key !== key)
        this.selectedRows = this.selectedRows.filter(item => item.key !== key)
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      remove () {
        this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
        this.selectedRows = []
      },


      handleMenuClick (e) {
        if (e.key === 'delete') {
          this.remove()
        }
      },
      getdata(){
        this.axios({
          method:'get',
          dataType:'JSONP',
          url:'/api/privilege'
        }).then(res =>{
          this.List=res.data.data
          console.log(this.List)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    .search{
        margin-bottom: 54px;
    }
    .fold{
        width: calc(100% - 216px);
        display: inline-block
    }
    .operator{
        margin-bottom: 18px;
    }
    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
</style>
