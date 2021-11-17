<template>
    <div>
        <breadcrumb :name="state.breadcrumb.name" :url="state.breadcrumb.url" :btnText="null"/>
        <div class="flex flex-row my-4">
            <div class="w-1/4 h-52 inline-flex relative" v-for="item in state.homeData" :key="item.name">
                <div :class="item.color" class="text-lg font-extrabold p-4 m-4 w-full rounded-xl border-2 border-blue-gray-100 shadow-sm relative">
                    <div class="px-4 py-2">
                        <i :class="item.icon" class='feather relative top-px text-2xl bg-blue-gray-100 p-4 h-16 w-16 rounded-full'></i>
                        <span class="inline-block pr-2">{{item.name}}</span>
                        <p class="app-center my-2 font-extrabold text-4xl">{{item.count}}</p>
                    </div>   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive} from 'vue';
import breadcrumb from '../shared/breadcrumb.vue';
export default {
    name: "homePage",
    components:{
        breadcrumb
    },
    setup(){
        const state = reactive({
            breadcrumb : {
                name : '',
                url: '/'
            },
            homeData:[
                {
                    name:"گروه ها",
                    count:"4 عدد",
                    icon: "feather-layers",
                    color: "bg-rose-400"
                },
                {
                    name:"دسته بندی ها",
                    count:"8 عدد",
                    icon: "feather-tag",
                    color: "bg-green-400"
                },
                {
                    name:"محصولات",
                    count:"114 عدد",
                    icon: "feather-package",
                    color: "bg-yellow-300"
                },
                {
                    name:"عوامل",
                    count:"2 عدد",
                    icon: "feather-activity",
                    color: "bg-cyan-500"
                }
            ]
        })
        return{
            state
        }
    }
}
</script>

<style>
div {

}
</style>