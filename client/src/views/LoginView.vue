<script>
import { RouterLink } from 'vue-router'
import axios from '@/helpers/api';
import Validator from '@/validators/auth';
import Loader from '../components/base/Loader.vue';
import Alert from '../components/base/Alert.vue';
import { useUserStore } from '../stores/user';



export default {
    data() {
        return {
            email: "",
            password: "",
            error_msg: "no error",
            error: false,
            login_url: "/auth/login",
            loading: false,
            state: false,
            msg: '',
            status : '',
        };
    },
    methods: {
        logIn() {
            const vd = new Validator();
            const data = {
                username: this.email,
                password: this.password
            };
            let { state, msg } = vd.logInValidator(this.email, this.password);
            if (!state) {
                this.error = true;
                this.error_msg = msg;
            }
            else {
                this.error = false;
                this.error_msg = "";
                this.loading = true;
                axios
                    .post(this.login_url, data)
                    .then((response) => {
                      this.loading = false;
                      // console.log(response);
                      // console.log(response.status);
                      response = response.data;
                      
                    if (response.status == "error") {
                        this.error = true;
                        this.error_msg = response.msg;
                    } else {
                      const { setLoggedInUser } = useUserStore();
                      setLoggedInUser(response.data.user);
                      this.status = response.status;
                      this.msg = response.msg;
                      this.state = true;
                      
                      setTimeout(() => {  this.$router.push('/dashboard'); }, 4000);
                    }
                })
                    .catch((err) => {
                    let msg;
                    this.loading = false;
                    console.log(err)
                    if (err && err.response && err.response.data && err.response.data.msg) {
                        msg = err.response.data.msg;
                    }
                    else {
                        msg = `${err.message}`;
                    }
                    this.error = true;
                    this.error_msg = msg;
                });
            }
        },
        closeAlert () {
          this.state = false;
          this.msg = '';
          this.status = '';
          this.$router.push('/dashboard'); 
        }
    },
    mounted: function() {
      const { logOut } = useUserStore();
      logOut();
    },
    components: { Loader, Alert }
}

</script>

<template>
  <main>
    <Loader :state="loading"></Loader>
    <Alert :state="state" :msg="msg" :status="status"></Alert>
    <div id="loginBackground" class="w-screen lg:h-screen md:h-screen h-full bg-no-repeat bg-cover relative">

      <div class="container mx-auto py-mid px-10 z-10">
            <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <div class="flex justify-start">
                <div class="welcome p-4">
                    <div class="welcome-header flex items-center">
                      <img src="@/assets/img/base/lfc_logo.png">
                      <div>
                        <strong>
                          Living Faith Church<br>
                          FHA Lugbe 
                        </strong><br>
                        <span>Winner Chapel</span>
                      </div>
                    </div>
                    <div class="welcome-body text-left">
                      <p class="text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Ac fringilla arcu senectus mi aliquam consectetur. 
                        Malesuada amet leo amet ornare eget. 
                        Velit enim cras nibh nec blandit ante aliquet placerat. 
                        Sit ultrices eget libero, diam augue lorem sapien.
                      </p>
                      <p class="text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Ac fringilla arcu senectus mi aliquam consectetur. 
                        Malesuada amet leo amet ornare eget. 
                        Velit enim cras nibh nec blandit ante aliquet placerat. 
                        Sit ultrices eget libero, diam augue lorem sapien.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Ac fringilla arcu senectus mi aliquam consectetur. 
                        Malesuada amet leo amet ornare eget. 
                        Velit enim cras nibh nec blandit ante aliquet placerat. 
                        Sit ultrices eget libero, diam augue lorem sapien.
                      </p>
                    </div>
                </div>
              </div>
              <div class="flex justify-center lg:justify-end pb-2">
                <div class="login-card px-6 py-4">
                    <h2 class="text-white text-left">Login</h2>
                    <form class="block">
                      <div v-if="error" class="w-full bg-red-200 text-center text-red-900 text-xl ounded-lg h-auto px-4">
                          {{ error_msg }}
                      </div>
                      <input type="email" v-model="email" placeholder="Email/Username" class="login-input my-4" />
                      <input type="password" v-model="password" placeholder="Password" class="login-input my-4" />
                      <button @click="logIn" type="button" class="login-btn text-center my-4">
                        Login
                      </button>
                    </form>

                    <div class="login-or">
                      <span class="or-line">or</span>
                    </div>

                    <div class="text-center text-white w-full mt-4">
                        Want to join our unit? 
                        <RouterLink to="/register" class="text-blue-900">Register</RouterLink>
                    </div>
                </div>
              </div>
            </div>
      </div>

    </div>


  </main>
</template>

<style>


.py-mid {
  padding-top: 8%;
}


#loginBackground {
    z-index: 1;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              linear-gradient(0deg, rgba(209, 47, 62, 0.7), rgba(209, 47, 62, 0.7)), url('@/assets/img/base/bg-1.jpeg');
}

.welcome-header strong {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  color: #FFFFFF;
}

.welcome-header span {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 17pxs;
  color: #FFFFFF;

}

.login-card {
  width: 392px;
  height: auto;
  background: #856464e2;
  /* opacity: 0.6; */
  backdrop-filter: blur(126.243px);
  border-radius: 6.58659px;
}

.login-card h2 {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #FFFFFF;
}

.login-input {
  border: 1.09777px solid #FFFFFF;
  border-radius: 16.4665px;
  background: transparent;
  outline: none;
  width: 100%;
  height: 42px;
  font-size: 18px;
  color: #FFFFFF;
  padding-left: 5px;
}

.login-btn {
  background: #A9222E !important;
  border: 1.09777px solid #FFFFFF;
  border-radius: 16.4665px;
  width: 100%;
  height: 45px;
  color: #FFFFFF;
}

.login-or {
    display: block;
    margin-bottom: 10px;
    margin-top: 27px;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    width: 100%;
}

.or-line {
  color: #FFFFFF;
  display: inline-block;
  position: relative;
}

.or-line::before {
  background: #d7dade;
  margin-right: 15px;
  right: 100%;
  content: '';
  height: 1px;
  position: absolute;
  top: 50%;
  width: 9999px;
}

.or-line::after{
  background: #d7dade;
  left: 100%;
  margin-left: 15px;
  content: '';
  height: 1px;
  position: absolute;
  top: 50%;
  width: 9999px;
}

</style>
