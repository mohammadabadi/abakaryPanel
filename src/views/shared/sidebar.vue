<template lang="">
    <div class="flex flex-col w-30/30 lg:w-6/30 2xl:w-5/30 min-h-screen py-4 pl-10 pr-6 text-right">
        <div class="profile-menu w-full py-3 px-4 text-center flex flex-col border-b border-blue-gray-700">
            <div class="w-30/30">
                <div class="img-box inline-flex h-16 w-16 rounded-full text-blue-gray-700 bg-blue-gray-100 flex items-center justify-center text-2xl">
                    <i class='feather feather-user'></i>
                </div>
            </div>
            <div class="w-30/30 py-2">
                <p class="text-blue-gray-400 pb-4">علی محمدآبادی</p>
                <select @change="handleUpdateValue($event)" v-model="state.shopId" class="text-xs bg-blue-gray-800 text-bg-blue-gray-500 inline-block py-3 px-2 rounded-md border border-blue-gray-700 w-full">
                    <option class="text-xs" v-for="item in state.shopItem" :domain="item.domain" :value="item.id">{{item.name}} - {{item.domain}}</option>
                </select>
                <button type="button" @click="showSite" class="inline-block py-2 py-2 px-4 m-4 rounded-md bg-blue-gray-700 text-blue-gray-200 hover:text-blue-gray-300 focus:text-blue-gray-300 hover:bg-blue-gray-600">نمایش سایت</button>
            </div>
        </div>
        <div class="side-menu w-full py-3 text-right flex flex-col text-lg border-b border-blue-gray-700">
            <router-link to="/">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-grid relative top-px ml-2'></i>
                    داشبورد
                </div>
            </router-link>
            <router-link to="/group">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-layers relative top-px ml-2'></i>
                    گروه ها
                </div>
            </router-link>
             <router-link to="/category">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-tag relative top-px ml-2'></i>
                    دسته بندی ها
                </div>
            </router-link>
             <router-link to="/product">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-package relative top-px ml-2'></i>
                    محصولات
                </div>
            </router-link>
            <router-link to="/agent">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-activity relative top-px ml-2'></i>
                    عوامل 
                </div>
            </router-link>
            <router-link to="/report">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-pie-chart relative top-px ml-2'></i>
                    گزارشات
                </div>
            </router-link>
        </div>
        <div class="side-menu w-full py-3 text-right flex flex-col text-lg">
            <router-link to="/profile">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-user relative top-px ml-2'></i>
                    حساب کاربری
                </div>
            </router-link>
            <router-link to="/setting">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-settings relative top-px ml-2'></i>
                    تنظیمات فروشگاه
                </div>
            </router-link>
            <router-link to="/login" @click="signOut">
                <div class="my-1.5 text-blue-gray-400 hover:text-blue-gray-200 focus:text-blue-gray-200 hover:bg-blue-gray-900 py-2 px-4 rounded-md">
                    <i class='feather feather-log-out relative top-px ml-2'></i>
                    خروج
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import {reactive,onMounted} from 'vue';
import { CookieUtilsInstance,CookieUtils } from "../../utils";
import { fetchShopStartAsync } from '../../store/shop/shop.actions';
import { useToast, POSITION } from "vue-toastification";
import { useStore } from "vuex";
export default {
    setup(){
        const store = useStore();
        const toast = useToast();
        const state = reactive({
            shopItem : [],
            shopDomain : '',
            shopId : '',
            options : [],
            lastOption : {
                label : '',
                value : ''
            }
        })
        const setShop = () => {
            if (store.getters["shop/getShops"] !== null) {
                state.shopId = CookieUtilsInstance.getCookieFromBrowser("shopId");
                state.shopDomain = CookieUtilsInstance.getCookieFromBrowser("shopDomain");
                state.shopItem = store.getters["shop/getShops"];
            }
            else {
                const data = {};
                data.userId = CookieUtilsInstance.getCookieFromBrowser("userId");
                data.onSuccess = (shop) => {
                    state.shopItem = shop;
                    CookieUtils.setCookie("shopId",state.shopItem[0].id);
                    CookieUtils.setCookie("shopDomain",state.shopItem[0].domain);
                    state.shopId = state.shopItem[0].id.toString();
                    state.shopDomain = state.shopItem[0].domain;
                } 
                data.onError = error => {
                    toast.error('خطایی در برنامه رخ داده است ، لطفا با پشتیبان تماس بگیرید', {
                        position: POSITION.TOP_CENTER
                    });
                }
                fetchShopStartAsync(store, data);
            }
        }
        const handleUpdateValue = (event) => {
            state.shopId = event.target.value.toString();
            var index = state.shopItem.findIndex(checkDomain);
            state.shopDomain = state.shopItem[index].domain;
            CookieUtils.setCookie("shopId",state.shopId);
            CookieUtils.setCookie("shopDomain",state.shopDomain);
        }
        const checkDomain = (item) => {
            return item.id == state.shopId
        }
        const showSite = () => {
            window.location.href= state.shopDomain;
        }
        const signOut = () => {
            CookieUtils.removeCookie("userId");
            CookieUtils.removeCookie("shopDomain");
            CookieUtils.removeCookie("jwt_access_token");
            CookieUtils.removeCookie("shopId");
        }
        onMounted(() => {
            setShop()
        });
        return{
            state,
            handleUpdateValue,
            checkDomain,
            showSite,
            signOut
        }
    } 
}
</script>
<style lang="">
    
</style>