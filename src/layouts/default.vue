<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const categoryList = [
    {
        name: 'Dashboard',
        icon: 'bi bi-ui-checks-grid',
    },
    {
        name: 'Balances',
        icon: 'bi bi-wallet',
    },
    {
        name: 'Transaction',
        icon: 'bi bi-arrow-left-right',
    },
    {
        name: 'Bills',
        icon: 'bi bi-receipt-cutoff',
    },
    {
        name: 'Expenses',
        icon: 'bi bi-cash-stack',
    },
    {
        name: 'Goals',
        icon: 'bi bi-bullseye',
    },
    {
        name: 'Settings',
        icon: 'bi bi-gear',
    },
];
const router = useRouter();
let selectedItem = ref(null);

const onSelected = index => {
    selectedItem.value = index;
}
const onLogout = () => {
    document.cookie = "Token=";
    router.push('/login');
}
</script>
<template>
    <div class="grid grid-cols-7 ">
        <div class="sidebar grid grid-rows-12">
            <div class="row-span-1">
                <div class="flex items-center justify-start">
                    <img src="../assets/images/logo.png" alt="" class="rounded-full w-14 h-14">
                    <span class="ml-2 sidebar-header-text">Smart Money</span>
                </div>
            </div>
            <div class="flex flex-col justify-between row-span-11 py-4">
                <ul class="py-4">
                    <li class="sidebar-item flex items-center"
                        v-for="(category,index) in categoryList"
                        @click="onSelected(index)"
                        :class="{'active': selectedItem === index}"
                    >
                        <div class="sidebar-item-content flex px-3">
                            <i :class="category.icon"></i>
                            <span class="ml-4">{{category.name}}</span>
                        </div>
                    </li>
                </ul>
                <div class="sidebar-item-content flex px-3 cursor-pointer" @click="onLogout">
                    <i class="bi bi-box-arrow-right"></i>
                    <span class="ml-4">Logout</span>
                </div>
            </div>
        </div>
        <div class="box grid col-span-6 grid-rows-12">
            <div class="row-span-1 test"></div>
            <slot/>
        </div>
    </div>

</template>
<style scoped>
.sidebar {
    background-color: var(--black-color);
    padding: 12px 16px;
    color: var(--dark-light);
    height: 100vh;
    font-size: 20px;
}

.sidebar-item {
    cursor: pointer;
    height: 52px;
}

.sidebar-item.active {
    background-color: var(--primary-color);
    color: white;
    border-radius: 4px;
}

.sidebar-item ~ .sidebar-item {
    margin-top: 20px;
}
.sidebar-header-text {
    font-family: 'Oswald', sans-serif;
    font-size: 32px;
}
</style>
