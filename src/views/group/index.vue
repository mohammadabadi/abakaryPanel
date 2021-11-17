<template lang="">
<n-message-provider>
  <div>
        <breadcrumb :name="state.breadcrumb.name" :url="state.breadcrumb.url" :showModal="showModalBox" :btnText="'ایجاد گروه'"/>
        <n-modal v-model:show="state.showModal" preset="dialog" title="Dialog">
            <template #header>
                <div>افزودن گروه جدید</div>
            </template>
                <div class="flex flex-col">
                    <form>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="name">نام گروه :</label>
                            <n-input id="name" type="text" placeholder="نام گروه را وارد کنید" />
                        </div>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="typeName"> نوع گروه :</label>
                            <n-input id="typeName" type="text" placeholder=" نوع گروه را وارد کنید" />
                        </div>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="description"> توضیحات گروه :</label>
                            <n-input id="description" v-model:value="value" type="textarea" placeholder="توضیحات مربوط به گروه ..." />
                        </div>
                    </form>
                </div>
            <template #action>
                <div>
                    <n-button type="success" @click="addGroup">افزودن</n-button>
                </div>
            </template>
        </n-modal>
        <div class="flex my-4">
            <n-table class="text-center" :single-line="false">
                <thead>
                <tr>
                    <th>ردیف</th>
                    <th>عنوان</th>
                    <th>نوع</th>
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
                    
                    <tr v-for="item in state.groupList" :key="item.id">
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.typeName}}</td>
                        <td>{{item.description}}</td>
                        <td>
                            <button type="button" class="rounded-md h-7 text-white bg-yellow-400 ml-2 hover:bg-yellow-500">
                                <i class='feather feather-edit-2 px-2 py-8'></i>
                            </button>
                            <n-popconfirm positive-text="بلی" negative-text="خیر" @positive-click="deleteItem(item.id)">
                                <template #trigger>
                                    <button type="button" class="rounded-md h-7 text-white bg-red-400 ml-2 hover:bg-red-500">
                                        <i class='feather feather-trash-2 px-2 py-8'></i>
                                    </button>
                                </template>
                                    آیا از حذف این گروه مطمئن هستید ؟
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
</n-message-provider>
</template>
<script>
import {reactive,onMounted} from 'vue';
import breadcrumb from '../shared/breadcrumb.vue';
import { fetchGroupStartAsync } from '../../store/group/group.actions';
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
                name : 'گروه ها',
                url: '/group',
                showModal : false
            },
            loadingSkeleton : true,
            groupList : [],
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
            }
        })
        const showModalBox = (show) => {
            state.showModal = show
        }
        const deleteItem = (id) => {
            console.log('حذف فرضی ایتم '+id);
            toast.success("حذف موفقیت آمیز بود", {
                position: POSITION.TOP_CENTER
            });
        }
        const addGroup = () => {
            toast.success("عملیات موفقیت آمیز بود", {
                position: POSITION.TOP_CENTER
            });
            state.showModal = false
        }
        const getGroups = () => {
            const data = {};
            data.searchField = state.searchField;
            data.onSuccess = () => {
                console.log("[on-success] group");
                state.groupList = store.getters["group/getGroups"];
                console.log(state.groupList);
                state.loadingSkeleton = false;
                
            };
            data.onError = error => {
                console.log(error);
                state.loadingSkeleton = false;
                toast.error('خطا در بارگزاری داده', {
                    position: POSITION.TOP_CENTER
                });
            };
            fetchGroupStartAsync(store, data);
        }
        onMounted(() => {
            getGroups();
        });
        return{
            state,
            deleteItem,
            showModalBox,
            addGroup
            
        }
    }
}
</script>
<style lang="">
    
</style>