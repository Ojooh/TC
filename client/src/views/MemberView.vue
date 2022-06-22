<script>
import Loader from '../components/base/Loader.vue';
import Alert from '../components/base/Alert.vue';
import Sidebar from '../components/base/Sidebar.vue';
import Topbar from '../components/base/Topbar.vue';
import DataView from '../components/views/DataView.vue';

import { useUserStore } from '../stores/user';


export default {
    data() {
        return {
            user : {},
            showSidebar: false,
            views : {
                'Member'    : { photo: 'photo', fname : 'fname', lname : 'lname'},
                'Email'     : 'email',
                'Phone'     : 'phone',
                'Status'    : 'is_active',
                'Relationship Status' : 'rel_status',
                'Last Seen' : 'last_login'
            },
            table : true,
            grid : false,
            url : '/user/users/all',
            loading: false,
            state: false,
            msg: '',
            status : '',
        };
    },
    methods: {
        toggleSidebar() {
            this.showSidebar = !this.showSidebar;
        },
        closeAlert () {
            this.state = false;
            this.msg = '';
            this.status = '';
            // this.$router.push('/dashboard'); 
        }
    },
    mounted: function() {
        const { getLoggedInUser } = useUserStore();
        this.user = getLoggedInUser();
    },
    components: { Loader, Alert , Sidebar, Topbar, DataView }
}
</script>

<template>
<Loader :state="loading"></Loader>
<Alert :state="state" :msg="msg" :status="status"></Alert>
<div class="relative flex min-h-screen">
    <Sidebar active="mbrs" :show="showSidebar"></Sidebar>

    <div class="flex-1">
        <Topbar></Topbar>
        <div class="container text-white px-6 py-2">
            <div class="grid grid-rows-1">
                <div class="justify-start w-full ">
                    <button class="w-auto py-2 px-6 rounded-full bg-dark-sidebar">
                        + Add New Members
                    </button>
                </div>
            </div>

            <div class="grid grid-flow-row auto-rows-max my-4">
                <div class="flex md:flex-row flex-col item-center w-full justify-between menu-bar py-2 px-4">
                   <div class="flex md:flex-row flex-col md:justify-start place-content-center menu-title item-center my-4 space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>
                            All Members
                        </span>
                   </div>

                    <!-- Menu Tools -->
                    <div class="menu-tools flex md:flex-row flex-col item-center">
                        <div class="flex md:flex-row flex-col items-center space-x-4 spac-ey-4">
                            <div class="search-field relative flex justify-start item-center">
                                <button  class="text-white rounded-full px-4 py-3 absolute search-btn bg-menu-bar ">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <input type="search" class=" search-input bg-menu-bar" placeholder="Search Member..." />
                            </div>
                            <div :class="table ? 'text-red-800' : 'text-white'" class="bg-menu-bar rounded-full p-2 md:m-auto my-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </div>
                            <div :class="grid ? 'text-red-800' : 'text-white'" class="text-white bg-menu-bar rounded-full p-2 md:m-auto my-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            
                        </div>
                    </div>
                    <!-- Menu Tools End -->
                </div>
            </div>

            <DataView :views="views" :table="table" :grid="grid" :url="url"></DataView>


        </div>
    </div>

</div>

</template>

<style>
body {
    background-color: #363636;
}

.bg-dark-sidebar {
    background: #1d1c1cde;
}

@media (max-width: 992px) {
    .menu-title {
        display: none !important;
    }
    
}

.menu-bar {
    cursor: pointer;
    background: linear-gradient(2deg, rgba(35, 34, 34, 0.27) 16.38%, rgba(35, 34, 34, 0.47) 38.26%, rgba(35, 34, 34, 0.18) 71.67%, rgba(35, 34, 34, 0) 94.93%, rgba(35, 34, 34, 0) 121.26%);
}

.search-btn {
    border-radius: 200px !important;
    color: #fff;
    top: 0px;
    left: -19px;
}

.search-input {
    border-radius: 40px;
    height: 42px;
    width: 310px;
    outline: none;
    padding: 20px;
    padding-left: 30px;
}

.bg-menu-bar {
    background: #4E4D4D;
}
</style>