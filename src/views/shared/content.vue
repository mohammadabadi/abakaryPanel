<template lang="">
    <div ref="root" class="relative flex flex-col w-30/30 bg-white min-h-screen text-blue-gray-800 main-content lg:w-24/30 2xl:w-25/30">
       <router-view></router-view>
    </div>
</template>
<script>
import { useRoute } from "vue-router";
import { reactive , watch, ref } from 'vue';
export default {
    name: "abakaryContent",
    setup() {
        const root = ref(null);
        const route = useRoute();
        const state = reactive({
            isSideBar: false
        });
        watch(route, () => {
            state.isSideBar = route.meta.layout.config.sideBar;
            if (!state.isSideBar){
                root.value.classList.remove("main-content");
                root.value.classList.remove("2xl:w-25/30");
                root.value.classList.remove("lg:w-23/30");
            }
        });
    return {
        root,
        state
    };
  }
}
</script>
<style>
    .main-content{
        border-radius: 0 50px 0 0;
        padding-left: 2.5rem;
        padding-right: 3rem;
        padding-bottom: 1rem;
    }
    .main-content:after {
        content: "";
        z-index: -1;
        border-radius: 0 45px 0 0;
        margin-top: 0.8rem;
        margin-right: -1.1rem;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        background-color: #ffffff7d;
        opacity: 0.6;
    }
</style>