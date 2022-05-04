<template>
    <div>
        <a-card :bordered="false">
            <a-list itemLayout="vertical">
                <a-list-item :key="n" v-for="n in 10">
                    <a-list-item-meta title="Alipay">
                    </a-list-item-meta>
                    <div style="float: right">
                        <a-button style="margin-right: 5px">编辑</a-button>
                        <a-button>删除</a-button>
                    </div>
                    <div class="content">
                        <div class="detail">
                            段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                            ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。
                        </div>

                    </div>
                </a-list-item>
            </a-list>
        </a-card>
    </div>
</template>

<script>
  export default {
    name: 'ArticleList',
  }
</script>

<style lang="less" scoped>
    .extra{
        width: 272px;
        height: 1px;
    }
    .content {
        .detail {
            line-height: 22px;
            max-width: 720px;
        }
        .author {
            color: @text-color-second;
            margin-top: 16px;
            line-height: 22px;

            & > :global(.ant-avatar) {
                vertical-align: top;
                margin-right: 8px;
                width: 20px;
                height: 20px;
                position: relative;
                top: 1px;
            }
            & > em {
                color: @disabled-color;
                font-style: normal;
                margin-left: 16px;
            }
        }
    }
</style>
