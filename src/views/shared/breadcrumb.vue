<template lang="">
    <div class="flex flex-row w-full border-b-2 border-blue-gray-200 justify-between px-8 items-center h-20 mb-4">
        <div>
            <router-link class="font-bold text-xl pl-1" to="/">داشبورد</router-link><router-link v-if="name !== ''" class="text-md font-medium pr-1" :to="url"><i class='feather feather-chevron-left ml-1'></i> {{name}}</router-link>
        </div>
        <div>
            <button v-show="btnText !== null " @click="showModalFunc"  class="py-2 px-5 text-blue-gray-200 bg-sky-700 rounded-md" type="button"><i class='feather feather-plus relative top-px ml-2'></i>{{btnText}}</button>
        </div>
    </div>
</template>
<script>
import {reactive} from 'vue';
export default {
    props : {
        name : {
            type : String
        },
        url : {
            type : String
        },
        btnText : {
            type : String
        },
        showModal : {
            type : Function
        }
    },
    setup(props){
        const state = reactive({
            showModal : false
        });
        const showModalFunc = () => {
            state.showModal = true;
            props.showModal(state.showModal);
        }
        return{
            state,
            showModalFunc
        }
    }
}
</script>
<style lang="">
    
</style>