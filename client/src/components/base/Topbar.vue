<script>
    import { useUserStore } from '../../stores/user';

    export default {
        props: {
            
        },
        data() {
            return {
                
            };
        },
        methods: {
            toggleSidebar() {
                this.$parent.toggleSidebar();
            },
            getPP() {
                const user = this.$parent.user;

                if (user && user.photo) {
                    return user.photo;
                } else {
                    return '/src/assets/img/base/user_pp.jpeg';
                }
            },
            getDisplayName() {
                const user = this.$parent.user;

                if (user && user.fname && user.lname) {
                    return user.fname + " " + user.lname;
                } else {
                    return '';
                }
            }

        },
        
}

</script>

<template>
<div class="flex justify-between md:justify-end text-white px-6 py-2">
    <button @click="toggleSidebar" class="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
    </button>
    <div class="flex justify-end item-center">
        <div class="flex items-center gap-4 p-4">
            <span class="rounded-full px-2 py-2 text-white bg-light">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </span>
            <div class="flex flex-col">
                <strong class="text-white text3xl text-sm font-medium dark:text-slate-200">
                    {{ getDisplayName() }}
                </strong>
            </div>
            <img class="w-14 h-14 rounded-full" :src="getPP()">
        </div>
    </div>
</div>
   
</template>

<style scoped>
.h-9 {
    height: 1.9rem;
}

.w-9 {
    width: 1.9rem;
}

.bg-light {
    background: #4E4D4D;
}
</style>