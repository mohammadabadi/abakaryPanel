<template lang="">
    <div>
        <breadcrumb :name="state.breadcrumb.name" :url="state.breadcrumb.url" :btnText="'ایجاد محصول'"/>
        <n-table>
            <thead>
            <tr>
                <th>Abandon</th>
                <th>Abormal</th>
                <th>Abolish</th>
                <th>...</th>
                <th>It's hard to learn words</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>放弃</td>
                <td>反常的</td>
                <td>彻底废除</td>
                <td>...</td>
                <td>Damn it! I can't remember those words.</td>
            </tr>
            <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
            </tr>
            </tbody>
        </n-table>
    </div>
</template>
<script>
import {reactive} from 'vue';
import breadcrumb from '../shared/breadcrumb.vue';
export default {
    components:{
        breadcrumb
    },
    setup(){
        const state = reactive({
            breadcrumb : {
                name : 'محصولات',
                url: '/product'
            }
        })
        return{
            state
        }
    }
}
</script>
<style lang="">
    
</style>