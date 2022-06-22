<script>
import Loader from '../components/base/Loader.vue';
import Alert from '../components/base/Alert.vue';
import Sidebar from '../components/base/Sidebar.vue';
import Topbar from '../components/base/Topbar.vue';

import { useUserStore } from '../stores/user';


export default {
    data() {
        return {
            user : {},
            showSidebar: false
        };
    },
    methods: {
        toggleSidebar() {
            this.showSidebar = !this.showSidebar;
        }
    },
    mounted: function() {
        const { getLoggedInUser } = useUserStore();
        this.user = getLoggedInUser();
    },
    components: { Loader, Alert , Sidebar, Topbar }
}
</script>

<template>
<div class="relative flex min-h-screen">
    <Sidebar active="dash" :show="showSidebar"></Sidebar>

    <div class="flex-1">
        <Topbar></Topbar>
    </div>

</div>

</template>

<style>
body {
    background-color: #363636;
}
</style>