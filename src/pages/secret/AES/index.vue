<template>
    <a-card>
        <div>
            <a-space class="operator">
                <a-button @click="addNew" type="primary">导入</a-button>
<!--                <a-button @click="addNew" type="primary">新增</a-button>-->
                <add/>
            </a-space>
            <standard-table
                    :columns="columns"
                    :dataSource="List"
                    :selectedRows.sync="selectedRows"
            >
                <div slot="description" slot-scope="{text}">
                    {{text}}
                </div>
                <div slot="action" slot-scope="{text, record}">
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
  import add from "../AES/components/add";
  import edit from "./components/edit";
  const columns = [
    {
      title: '密钥ID',
      dataIndex:"keyId"
    },

    {
      title: '生成日期',
      dataIndex:"createTime",
      sorter: true
    },
    {
      title: '过期日期',
      dataIndex: "deprecateTime",
      sorter: true
    },
    {
      title: '作废日期',
      dataIndex: "abandonTime",
      sorter: true
    },
    {
      title: '备注',
      dataIndex: 'callNo',
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }
  ]

  const dataSource = [
    {
      "keyId": 1,
      "key": "2Q2OPuV33pTdRg0GUvnpgg==",
      "deprecateTime": "2023-03-14 13:54:08",
      "abandonTime": "2024-03-14 13:54:11",
      "createTime": "2022-03-14 13:54:14"
    }

  ]

  export default {
    name: 'QueryList',
    components: {StandardTable,add,edit},
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: dataSource,
        selectedRows: [],
        List:[]
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
      addNew(){
        console.log(1)
      },
      getdata(){
        this.axios({
          method:'get',
          dataType:'JSONP',
          url:'/rsaKey'
        }).then(res =>{
          this.List=res.data.data
          for(let i=0;i<this.List.length;i++) {
            this.List[i].key = i
          }
          console.log(this.List)
        })
      },
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
