<template>
    <a-card>
        <div>
            <a-space class="operator">
<!--                <a-button @click="addNew" type="primary">新建</a-button>-->
            <add/>
            </a-space>
            <standard-table
                    :columns="columns"
                    :dataSource="List"
                    :selectedRows.sync="selectedRows"
                    ref="tableList"

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
  import edit from "./components/edit";
  import add from "./components/add";
  const columns = [
    {
      title: '角色ID',
      dataIndex: "roleID"
    },

    {
      title:'角色名',
      dataIndex: "roleName",
    },
    {
      title: '角色标识符',
      dataIndex: "roleIdentifier"
    },
    {
      title: '权限',
      dataIndex: "privilegeName",
    },
    {
      title: '备注',
      dataIndex: "comment"
    },
    {
      title: '创建时间',
      dataIndex:"createTime"
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }
  ]

  const dataSource = [
    {
      "roleID": 1,
      "roleName": "测试角色1",
      "roleIdentifier": "test_role_1",
      "privilegeIdentifier":'测试权限1 测试权限3',
      "comment": "注释1",
      "createTime": "2022-04-20 23:08:09"
    },
    {
      "roleID": 2,
      "roleName": "测试角色2",
      "roleIdentifier": "test_role_2",
      "privilegeIdentifier":'测试权限2 测试权限3',
      "comment": "注释2",
      "createTime": "2022-04-20 23:08:32"
    }

  ]


  export default {
    name: 'QueryList',
    components: {StandardTable,edit,add},
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: dataSource,
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        selectedRows: [],
        List:[],
        privilegeID:[],
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

      addNew () {
        this.dataSource.unshift({
          key: this.dataSource.length,
          no: 'NO ' + this.dataSource.length,
          description: '这是一段描述',
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 4,
          updatedAt: '2018-07-26'
        })
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
          url:'/api/role'
        }).then(res =>{

          this.List=res.data.data
          // //console.log(this.List)
          // for(let i=0;i<this.List.length;i++) {
          //   this.axios({
          //     method:'get',
          //     dataType:'JSONP',
          //     url:'/api/rolePrivilegeRelation?roleID='+this.List[i].roleID
          //   }).then(res =>{
          //     this.List[i].privilegeName = "";
          //     for(let j=0;j<res.data.data.length;j++) {
          //       this.List[i].privilegeName += res.data.data[i].privilegeName+' '
          //     }
          //
          //   })
          // }
          // this.List.push(this.List.clone())
          // this.$forceUpdate()
          // //this.$refs.tableList.refresh()
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
