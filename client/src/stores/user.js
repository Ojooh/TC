import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {},
    loggedIn: false,
    sidebar: {
      "ADMS" : ['dash', 'mbrs'],
    }
  }),
  getters: {
    
  },
  actions: {
    setLoggedInUser(setUser) {
      if (Object.keys(setUser).length === 0) {
        console.log("User Object is Empty")
      } else {
        localStorage.setItem('user', JSON.stringify(setUser));
        localStorage.setItem('user_auth', 'true');
        this.user = setUser;
        this.loggedIn = true;
      }
    },

    getLoggedInUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      return this.user;
    },

    isLoggedIn() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.loggedIn = (localStorage.getItem("user_auth") === 'true');

      if (this.user && this.loggedIn) return true
    
      return false
    },

    getViews() {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      return this.sidebar[this.user.user_id.split("-")[0]];
    },

    logOut() {
      localStorage.removeItem('user');
      localStorage.removeItem('user_auth');
    },
  }
})
