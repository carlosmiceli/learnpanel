<template>
    <v-alert error dismissible @input="onClose" :value="true">
        {{message}}
    </v-alert>
</template>

<script>
export default {
    name: "AlertMessage",
    props: ["message"],
    methods: {
        onClose() {
            this.$emit("dismissed")
        }
    }
}
</script>
