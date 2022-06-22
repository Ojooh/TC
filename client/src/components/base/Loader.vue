<script setup lang="ts">
defineProps<{
  state: boolean
}>()
</script>

<template>
    <div v-if="state" class="overlay fixed h-screen w-screen">
      <div class="container mx-auto h-full w-full">
        <div class="grid grid-cols-1">
          
          <div class="loader block">
              <img src="@/assets/img/base/lfc_logo.png" class="h-120 animate-spin" />
              <br>
              <h4 class="text-white ls-8 w-full">
                Loading...
              </h4>
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
</style>