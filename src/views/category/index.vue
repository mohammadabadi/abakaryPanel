<template lang="">
    <div>
        <breadcrumb :name="state.breadcrumb.name" :url="state.breadcrumb.url" :showModal="showModalBox" :btnText="'ایجاد دسته'"/>
        <n-modal v-model:show="state.showModal" preset="dialog" title="Dialog">
            <template #header>
                <div>افزودن دسته جدید</div>
            </template>
                <div class="flex flex-col">
                    <form>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="name">نام دسته :</label>
                            <n-input id="name" v-model:value="state.groupData.name" type="text" placeholder="نام دسته را وارد کنید" />
                        </div>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="description"> توضیحات دسته :</label>
                            <n-input id="description" v-model:value="state.groupData.description" type="textarea" placeholder="توضیحات مربوط به دسته ..." />
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
                    <th>عنوان</th>
                    <th>گروه</th>
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
                    </tr>
                    
                    <tr v-for="(item,index) in state.categoryList" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.groupName}}</td>
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
                                    آیا از حذف این دسته مطمئن هستید ؟
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
import { fetchCategoryStartAsync } from '../../store/category/category.actions';
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
                name : 'دسته ها',
                url: '/group',
                showModal : false
            },
            loadingSkeleton : true,
            categoryList : [],
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
                id: 0,
                typeId: 1,
                typeName: "دسته محصولات",
                name: "",
                description: ""
            },
            newItem : true
        })
        const showModalBox = (show) => {
            state.showModal = show
        }
        const getCategory = () => {
            const data = {};
            data.searchField = state.searchField;
            data.onSuccess = () => {
                console.log("[on-success] category");
                state.categoryList = store.getters["category/getCategories"];
                state.loadingSkeleton = false;
                
            };
            data.onError = error => {
                console.log(error);
                state.loadingSkeleton = false;
                toast.error('خطا در بارگزاری داده', {
                    position: POSITION.TOP_CENTER
                });
            };
            fetchCategoryStartAsync(store, data);
        }
        onMounted(() => {
            getCategory();
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