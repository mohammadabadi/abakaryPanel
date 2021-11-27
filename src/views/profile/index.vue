<template lang="">
<n-message-provider>
  <div>
        <breadcrumb :name="state.breadcrumb.name" :url="state.breadcrumb.url" :showModal="showModalBox" :btnText="'ویرایش پروفایل'"/>
        <n-modal v-model:show="state.showModal" preset="dialog" title="Dialog">
            <template #header>
                <div>ویرایش پروفایل</div>
            </template>
                <div class="flex flex-col">
                    <form>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="name">نام :</label>
                            <n-input id="name" v-model:value="state.profileData.name" type="text" placeholder="نام خود را وارد کنید" />
                        </div>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="family"> نام خانوادگی :</label>
                            <n-input id="family" v-model:value="state.profileData.description" type="textarea" placeholder="نام خانوادگی خود را وارد کنید ..." />
                        </div>
                        <div class="w-3/3 my-2">
                            <label class="py-1" for="userName"> نام کاربری :</label>
                            <n-input id="userName" v-model:value="state.profileData.description" type="textarea" placeholder="نام کاربری خود را وارد کنید ..." />
                        </div>
                         <div class="w-3/3 my-2">
                            <label class="py-1" for="nationalCode"> کد ملی :</label>
                            <n-input id="nationalCode" v-model:value="state.profileData.description" type="textarea" placeholder="کد ملی خود را وارد کنید ..." />
                        </div>
                    </form>
                </div>
            <template #action>
                <div>
                    <n-button type="success" v-if="state.newItem" @click="addProfile">افزودن</n-button>
                    <n-button type="success" v-if="!state.newItem" @click="editProfile">ویرایش</n-button>
                </div>
            </template>
        </n-modal>
        <div class="flex my-4">
        </div>
    </div>
</n-message-provider>
</template>
<script>
import {reactive,onMounted} from 'vue';
import breadcrumb from '../shared/breadcrumb.vue';
import { fetchProfileStartAsync } from '../../store/profile/profile.actions';
import { fetchEditProfileStartAsync } from '../../store/profile/edit/profile.actions';
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
                name : 'پروفایل کاربر',
                url: '/profile',
                showModal : false
            },
            loadingSkeleton : true,
            ProfileList : [],
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
            profileData: {
                id: 0,
                typeId: 1,
                typeName: "پروفایل کاربر",
                name: "",
                description: ""
            },
            newItem : true
        })
        const showModalBox = (show) => {
            state.showModal = show
        }
        const showEditModal = (item) => {
            state.showModal = true;
            state.profileData.id = item.id;
            state.profileData.typeId = item.typeId;
            state.profileData.typeName = item.typeName;
            state.profileData.name = item.name;
            state.profileData.description = item.description;
            state.newItem = false;
        }
        const editProfile = () => {
            const data = {};
            data.EditProfile = state.profileData;
            data.onSuccess = () => {
                console.log("[on-success] EditProfile");
                toast.success("ویرایش پروفایل موفقیت آمیز بود", {
                    position: POSITION.TOP_CENTER
                });
                getProfile(id)
            };
            data.onError = error => {
                console.log(error);
                state.loadingSkeleton = false;
                toast.error('خطایی در برنامه رخ داده است ، لطفا با پشتیبان تماس بگیرید', {
                    position: POSITION.TOP_CENTER
                });
            };
            fetchProfileStartAsync(store, data);
            state.showModal = false;
            state.newItem = true;
        }
        onMounted(() => {
            getProfile();
        });
        return{
            state,
            showModalBox,
            showEditModal,
            editProfile
            
        }
    }
}
</script>
<style lang="">
    
</style>