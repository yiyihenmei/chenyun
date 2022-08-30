<template>
    <div>
        <p class="navTitle">
            {{this.$route.name}}
        </p>
    </div>
</template>

<script>
export default {

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.navTitle{
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    font-size: 18px;
}
</style>