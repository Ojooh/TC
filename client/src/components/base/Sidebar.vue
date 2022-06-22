<script>
    import { RouterLink } from 'vue-router'
    import { useUserStore } from '../../stores/user';

    export default {
        props: {
            active: String,
            show: Boolean,
        },
        data() {
            return {
                views: [],
            };
        },
        methods: {
            toggleSidebar() {
                this.$parent.toggleSidebar();
            }
        },
        mounted: function() {
            const { getViews } = useUserStore();
            this.views = getViews();
        }
}

</script>

<template>
<div :class="show ? 'show' : 'left-0'" class="overflow-hidden bg-dark-sidebar text-white w-64 py-6 absolute inset-y-0 md:relative md:-translate-x-0 transform -translate-x-full transition duration-200 ease-in-out">
    <div @click="toggleSidebar" :class="show ? '' : ''" class="close text-white bg-dark-sidebar text-center">
        <strong>X</strong>
    </div>
    <div class="welcome-header mb-6 px-4">
        <a class="flex items-center space-x-2" href="">
            <img src="@/assets/img/base/lfc_logo.png">
            <div>
                <strong>
                    Living Faith Church<br>
                    FHA Lugbe 
                </strong><br>
                <span>Winner Chapel</span>
            </div>
        </a>
                      
    </div>
    <nav class="first-nav">
        <RouterLink to="/dashboard" v-if="Object.values(this.views).includes('dash')" :class="active === 'dash' ? 'nav-active' : '' " class="flex item-center space-x-2 nav-link py-3 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span class="fs-2">
                Dashboard
            </span>
        </RouterLink>
        <RouterLink to="/members" v-if="Object.values(this.views).includes('mbrs')" :class="active === 'mbrs' ? 'nav-active' : '' " class="flex item-center space-x-2 nav-link py-3 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="fs-2">
                Members
            </span>
        </RouterLink>
    </nav>
    <nav class="second-nav">
        <RouterLink to="/logout" class="flex item-center space-x-2 nav-link py-3 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="fs-2">
                Logout
            </span>
        </RouterLink>
    </nav>
</div>
   
</template>

<style scoped>
.h-9 {
    height: 1.9rem;
}

.w-9 {
    width: 1.9rem;
}

.show {
    left: 16rem;
    transition: 0.5s ease-in-out;
}

.fs-2 {
    font-size: 1.2rem;
}
.bg-dark-sidebar {
    background: #1d1c1cde;
}

.close {
    position: absolute;
    left: 16rem;
    padding: 25px;
    top: 0;
}

.close {
    font-size: 20px;
    font-weight: 800;
}

.welcome-header img {
    width: 70px;
    height: 80px;
}

.welcome-header strong {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  color: #FFFFFF;
}

.welcome-header span {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #FFFFFF;

}

.first-nav {
    height: 70%;
    overflow-y: auto;
}

.nav-active {
    border-left: 6px solid #FE0505 !important;
    color: #FE0505 !important;
    background: #1d1c1c7a;
}

.nav-link:hover {
    border-left: 6px solid #FE0505 !important;
    color: #FE0505 !important;
    background: #1d1c1c7a;
    transition: 0.5s;
}

</style>