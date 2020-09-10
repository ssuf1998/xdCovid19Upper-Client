<template>
    <div class="my-2">
        <div v-for="(d, i) in qa_data"
             :key="`qa-${i}`"
        >
            <span class="font-weight-bold"
                  v-html="d['title']"
            >

            </span>
            <br>
            <span class="font-size-small"
                  v-html="d['content']"
            >

            </span>

            <br v-if="i!==qa_data.length-1">
            <br v-if="i!==qa_data.length-1">
        </div>

    </div>
</template>

<script>
export default {
    name: "Question",
    props: {
        "qa_data": {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss">

</style>