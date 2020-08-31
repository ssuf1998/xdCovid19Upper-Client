<template>
    <div class="my-2">
        <span class="font-weight-bold">
            始终是
            <b-badge variant="warning" class="mx-1">
                暂未填报
            </b-badge>
            <b-badge variant="secondary" class="mx-1">
                状态未知
            </b-badge>
            状态？
        </span>
        <br>
        <span class="font-size-small">
            可能是后端程序翻车了，点击
            <b-link href="https://xxcapp.xidian.edu.cn/site/ncov/xidiandailyup"
                    target="_blank">
                这里
            </b-link>
            进入官方系统手动填报，或
            <b-link href="mailto:ssuf1998@126.com">
                联系作者
            </b-link>
            。
        </span>

        <br>
        <br>

        <span class="font-weight-bold">
            <b-badge variant="danger" class="mx-1">
                账户异常
            </b-badge>
            咋办？
        </span>
        <br>
        <span class="font-size-small">
            改密码！提供给填报器的密码无法登录上官方系统，
            故提示账户异常。
        </span>

        <br>
        <br>

        <span class="font-weight-bold">
            后端程序多久跑一次？
        </span>
        <br>
        <span class="font-size-small">
            每天早上7点到晚上10点，
            每到第5、25、45分钟，后端程序都会定时启动，
            自动填报然后更新数据库，
            故一般要等一会儿才能看到最新数据情况。
        </span>

        <br>
        <br>

        <span class="font-weight-bold">
            会被识别出来是用程序自动填报的吗？
        </span>
        <br>
        <span class="font-size-small">
            也许……目前使用了假
            <b-link href="https://baike.baidu.com/item/%E7%94%A8%E6%88%B7%E4%BB%A3%E7%90%86/1471005"
                    target="_blank"
            >
                UA
            </b-link>
            和假地理位置注入，
            但是ip伪造起来比较麻烦，所以说还是有可能被发现的。
        </span>

    </div>
</template>

<script>
export default {
    name: "Question"
}
</script>

<style lang="scss">

</style>