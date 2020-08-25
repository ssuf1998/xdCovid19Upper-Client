<template>
    <div class="my-2">
        <span class="font-weight-bold">
            始终是
            <b-badge variant="warning" class="mr-1">
                暂未填报
            </b-badge>
            <b-badge variant="secondary" class="ml-1">
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
                后端程序多久跑一次？感觉数据刷新很慢？
        </span>
        <br>
        <span class="font-size-small">
            每天早上8点到晚上10点，
            整点过5分后端程序便会定时启动，
            自动填报然后更新数据库，
            故一般要等一会儿才能看到最新数据情况。
        </span>

        <br>
        <br>

        <span class="font-weight-bold">
            密码会有泄露的风险么？
        </span>
        <br>
        <span class="font-size-small">
            有！目前我不知道怎么在密码加密的情况下实现这个系统，
            如果有人介意，可以不用。
        </span>

        <br>
        <br>

        <span class="font-weight-bold">
            为什么要搞邀请码……
        </span>
        <br>
        <span class="font-size-small">
            服务器耐不住。
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