<template lang="">
    <div>
        <breadcrumb :name="state.breadcrumb.name" :url="state.breadcrumb.url" :showModal="showModalBox" :btnText="'ایجاد محصول'"/>
        <n-modal v-model:show="state.showModal" preset="dialog" title="Dialog">
            <template #header>
                <div>افزودن محصول جدید</div>
            </template>
                <div class="flex flex-col">
                    <form>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="name">نام محصول :</label>
                            <n-input id="name" v-model:value="state.groupData.name" type="text" placeholder="نام محصول را وارد کنید" />
                        </div>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="description"> توضیحات محصول :</label>
                            <n-input id="description" v-model:value="state.groupData.description" type="textarea" placeholder="توضیحات مربوط به محصول ..." />
                        </div>
                    </form>
                </div>
            <template #action>
                <div>
                    <n-button type="success" v-if="state.newItem" @click="addGroup">افزودن</n-button>
                    <n-button type="success" v-if="!state.newItem" @click="editGroup">ویرایش</n-button>
                </div>
            </template>
        </n-modal>
        <div class="flex my-4">
            <n-table class="text-center" :single-line="false">
                <thead>
                <tr>
                    <th>ردیف</th>            
                    <th>محصول</th>
                    <th>دسته</th>
                    <th>شناسه</th>
                    <th>وزن</th>
                    <th>سئو</th>
                    <th>توضیحات</th>
                    <th>عملیات</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-if="state.loadingSkeleton">
                        <td><n-skeleton v-if="state.loadingSkeleton" :sharp="false" size="medium" /></td>
                        <td><n-skeleton v-if="state.loadingSkeleton" :sharp="false" size="medium" /></td>
                        <td><n-skeleton v-if="state.loadingSkeleton" :sharp="false" size="medium" /></td>
                        <td><n-skeleton v-if="state.loadingSkeleton" :sharp="false" size="medium" /></td>
                        <td><n-skeleton v-if="state.loadingSkeleton" :sharp="false" size="medium" /></td>
                        <td><n-skeleton v-if="state.loadingSkeleton" :sharp="false" size="medium" /></td>
                        <td><n-skeleton v-if="state.loadingSkeleton" :sharp="false" size="medium" /></td>
                        <td><n-skeleton v-if="state.loadingSkeleton" :sharp="false" size="medium" /></td>
                    </tr>
                    
                    <tr v-for="(item,index) in state.productList" :key="item.id">
                        <td>{{index+1}}</td>
                        <td><img class="rounded-md ml-2" :src="item.imageLinks" alt="">{{item.productName}}</td>
                        <td>{{item.categoryName}}</td>
                        <td>{{item.productCode}}</td>
                        <td>{{item.weight}}</td>
                        <td>{{item.seoKeywords}}</td>
                        <td>{{item.description}}</td>
                        <td>
                            <button type="button" @click="showEditModal(item)" class="rounded-md h-7 text-white bg-yellow-400 ml-2 hover:bg-yellow-500">
                                <i class='feather feather-edit-2 px-2 py-8'></i>
                            </button>
                            <n-popconfirm positive-text="بلی" negative-text="خیر" @positive-click="deleteItem(item.id)">
                                <template #trigger>
                                    <button type="button" class="rounded-md h-7 text-white bg-red-400 ml-2 hover:bg-red-500">
                                        <i class='feather feather-trash-2 px-2 py-8'></i>
                                    </button>
                                </template>
                                    آیا از حذف این محصول مطمئن هستید ؟
                                <template #icon>
                                    <i class='feather feather-trash-2 text-red-500'></i>
                                </template>
                            </n-popconfirm>
                        </td>
                    </tr>
                </tbody>
            </n-table>
        </div>
    </div>
</template>
<script>
import {reactive,onMounted} from 'vue';
import breadcrumb from '../shared/breadcrumb.vue';
import { fetchProductStartAsync } from '../../store/product/product.actions';
import { useStore } from "vuex";
import { useToast, POSITION } from "vue-toastification";
export default {
    components:{
        breadcrumb
    },
    setup(){
        const store = useStore();
        const toast = useToast();
        const state = reactive({
            breadcrumb : {
                name : 'محصولات',
                url: '/product'
            },
            loadingSkeleton : true,
            productList : [],
            searchField : {
                page: {
                    currentPage: 1,
                    pageLength: 1000
                },
                searches: {
                    searchAll: "",
                    searches: []
                },
                orders: []
            },
            groupData: {
                current :{
                    id: 0,
                    categoryId: 0,
                    shopId: 0,
                    productName: "",
                    productType: "",
                    productCode : "",
                    productName: "",
                    description: "",
                    seoKeywords: "",
                    link: "",
                    weight: 0
                },
                images : [
                    {
                        id: 0,
                        imageLink: ""
                    }
                ]
            },
            newItem : true
        })
        const showModalBox = (show) => {
            state.showModal = show
        }
        const getProduct = () => {
            const data = {};
            data.searchField = state.searchField;
            data.onSuccess = () => {
                console.log("[on-success] product");
                state.productList = store.getters["product/getproducts"];
                state.loadingSkeleton = false;
                
            };
            data.onError = error => {
                console.log(error);
                state.loadingSkeleton = false;
                toast.error('خطا در بارگزاری داده', {
                    position: POSITION.TOP_CENTER
                });
            };
            fetchProductStartAsync(store, data);
        }
        onMounted(() => {
            getProduct();
        });
        return{
            state,
            showModalBox
            
        }
    }
}
</script>
<style lang="">
    
</style>