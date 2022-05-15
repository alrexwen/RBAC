<template>
    <a-card>
        <div :class="advanced ? 'search' : null">
            <a-form layout="horizontal">
                <div :class="advanced ? null: 'fold'">
                    <a-row >

                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="账号ID"

                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input-number  v-model="form.id" style="width: 100%" placeholder="请输入" />
                            </a-form-item>
                        </a-col>

<!--                        <a-col :md="8" :sm="24" >-->
<!--                            <a-form-item-->
<!--                                    label="用户名"-->

<!--                                    :labelCol="{span: 5}"-->
<!--                                    :wrapperCol="{span: 18, offset: 1}"-->
<!--                            >-->
<!--                                <a-input placeholder="请输入" v-model="form.name"/>-->
<!--                            </a-form-item>-->
<!--                        </a-col>-->
                    </a-row>
                </div>
                <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="getSreach">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>

        </span>
            </a-form>
        </div>
        <div>
            <a-space class="operator">
                <!--                <a-button @click="addNew" type="primary">新建</a-button>-->
                <add/>
                <a-dropdown>
                    <a-menu @click="handleMenuClick" slot="overlay">
                        <a-menu-item key="delete">删除</a-menu-item>
                        <a-menu-item key="audit">重置密码</a-menu-item>
                    </a-menu>
                    <a-button>
                        更多操作 <a-icon type="down" />
                    </a-button>
                </a-dropdown>
            </a-space>
            <standard-table
                    :columns="columns"
                    :dataSource="List"
                    :selectedRows.sync="selectedRows"
            >
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
  import add from "./components/add";
  import edit from "./components/edit";
  const columns = [
    {
      title: '账号id',
      dataIndex: 'uid',
      sorter: true,
      //needTotal: true,
    },
    {
      title:'用户名',
      dataIndex: "username",
    },
    {
      title: '邮箱',
      dataIndex: "email"
    },
    {
      title: '创建时间',
      dataIndex: "createTime"
    },
    {
      title: '角色',
      dataIndex:'roleName'
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }
  ]

  const dataSource = [
    {
      "uid": 10000,
      "username": "zhaoshuai",
      "password": "123",
      "email": "123@test.com",
      "roleIdentifier":'测试角色1',
      "createTime": "2022-04-20 23:04:36"
    },
    {
      "uid": 10001,
      "username": "jerry",
      "password": "123",
      "email": "123@test.com",
      "roleIdentifier":'测试角色2',
      "createTime": "2022-04-20 23:07:29"
    },
    {
      "uid": 10002,
      "username": "tom",
      "password": "123",
      "email": "123@test.com",
      "roleIdentifier":'测试角色1 测试角色2',
      "createTime": "2022-04-20 23:07:29"
    }

  ]

  export default {
    name: 'QueryList',
    components: {StandardTable, add, edit},
    data() {
      return {
        advanced: true,
        columns: columns,
        dataSource: dataSource,
        selectedRows: [],
        List: [],
        roles: [],
        form: {
          // name: '',
          id: '',
        },
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
        console.log(key)
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      remove() {
        this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
        this.selectedRows = []
      },

      handleMenuClick(e) {
        if (e.key === 'delete') {
          this.remove()
        }
      },
      getdata() {
        this.axios({
          method: 'get',
          dataType: 'JSONP',
          url: '/api/account'
        }).then(res => {
          this.List = res.data.data
          console.log(this.List)
          for (let i = 0; i < this.List.length; i++) {
            this.List[i].key = i
            this.List[i].roleName = ""
            this.axios({
              method: 'get',
              dataType: 'JSONP',
              url: '/api/userRoleRelation/?userID=' + this.List[i].uid
            }).then(res => {
              this.roles = res.data.data
              // console.log(this.roles)
              for (let j = 0; j < this.roles.length; j++) {
                console.log(this.roles[j].roleName)
                this.List[i].roleName += this.roles[j].roleName
              }
            })
          }

        })
      },
      getSreach() {
        this.axios({
          method: 'get',
          url: '/api/account/' + this.form.id,

        }).then(res => {
          this.List = [res.data.data]
          console.log(this.List)
          for (let i = 0; i < this.List.length; i++) {
            this.List[i].key = i
            this.List[i].roleName = ""
            this.axios({
              method: 'get',
              dataType: 'JSONP',
              url: '/api/userRoleRelation/?userID=' + this.List[i].uid
            }).then(res => {
              this.roles = res.data.data
              // console.log(this.roles)
              for (let j = 0; j < this.roles.length; j++) {
                console.log(this.roles[j].roleName)
                this.List[i].roleName += this.roles[j].roleName
              }
            })
          }

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
