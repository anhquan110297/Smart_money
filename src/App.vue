<script setup>
import {useRoute} from 'vue-router';
import {computed} from "vue";
import {PUBLIC_LAYOUT} from './constants/index';

const route = useRoute();
let layout = computed(() => (route.meta.layout || PUBLIC_LAYOUT) + '-layout');
</script>

<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>

<style scoped>

</style>
