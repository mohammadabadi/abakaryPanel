<template>
    <div dir="rtl" class="flex flex-row min-h-screen">
        <SideBar v-if="state.isSideBar" />
        <MainContent />
    </div>
</template>

<script>
import SideBar from './sidebar.vue';
import MainContent from './content.vue';
import { useRoute } from "vue-router";
import { reactive , watch } from 'vue';
export default {
    name: "abakaryDashboard",
    components:{
        SideBar,MainContent
    },
    setup() {
        const route = useRoute();
        const state = reactive({
            isSideBar: false
        });
        watch(route, () => {
            state.isSideBar = route.meta.layout.config.sideBar;
        });
    return {
      state
    };
  }
}
</script>

<style>
div {

}
</style>