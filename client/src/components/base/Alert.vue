<script>
export default {
  props: {
    state: Boolean,
    msg : String,
    status : String,
  },
  methods: {
        close() {
          this.$parent.closeAlert()
        }
  },
}
</script>

<template>
    <div v-if="state" class="overlay fixed h-screen w-screen">
      <div class="container h-full w-full">
        <div class="grid grid-cols-1">
          <!-- SUCCESS ALERT -->
          <div v-if="state && status == 'success'" class="alert-box slide bg-gradient-success border-radius-lg absolute top-6 p-6 mx-auto flex items-center space-x-4">
                <span @click="close" class="cancel bg-gradient-success">X</span>
                <div class="shrink-0 h-90">
                    <img class="h-full w-full" src="@/assets/img/base/success_face.png" alt="success face">
                </div>
                <div>
                    <h3 class="text-xl font-black text-white-900">{{ status.toUpperCase() }}!</h3>
                    <p class="text-slate-200">{{ msg }}</p>
                </div>
          </div>

          <!-- ERROR ALERT -->
          <div v-if="state && status == 'error'" class="alert-box slide bg-gradient-danger border-radius-lg absolute top-6 p-6 mx-auto flex items-center space-x-4">
                <span @click="close"  class="cancel bg-gradient-danger">X</span>
                <div class="shrink-0 h-90">
                    <img class="h-full w-full" src="@/assets/img/base/error_face.png" alt="error face">
                </div>
                <div>
                    <h3 class="text-xl font-black text-white-900">{{ status.toUpperCase() }}!</h3>
                    <p class="text-slate-200">{{ msg }}</p>
                </div>
          </div>
           
         
        </div>

      </div>
    </div>
</template>

<style scoped>
.overlay {
  /* display: none; */
  z-index: 20;
  left: 0;
  top: 0;
  overflow: hidden;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              linear-gradient(0deg, rgba(209, 47, 62, 0.7), rgba(209, 47, 62, 0.7))
}

.overlay .loader {
  margin: 19% auto;
  padding: 29px;
  /* border: 1px solid #888; */
  width: 17%;
  height: 17%;
}

.h-120 {
  height: 120px;
}

.ls-8 {
  letter-spacing: 8px;
}

.bg-gradient-success {
    background-image: linear-gradient(195deg,#66bb6a,#43a047) !important;
}

.bg-gradient-danger {
  background-image: linear-gradient(195deg,#ec407a,#d81b60) !important;
}

.border-radius-lg {
    border-radius: 0.5rem;
}

.alert-box {
    width: 40%;
    font-size: inherit;
    color: #ffffff;
    right: -50%;
    transition: 1s;
}

.slide {
    right: 0.5rem;
    transition: 1s;
}

.h-90 {
    height: 90px;
}

@media (max-width: 992px) {
    .alert-box {
        width: 80%;
    }
    
}

.cancel {
    top: -20px;
    left: -10px;
    position: absolute;
    border-radius: 50%;
    background: green;
    padding: 8px 15px;
    color: white;
    cursor: pointer;
}
</style>