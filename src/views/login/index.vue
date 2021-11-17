<template lang="">
    <div class="app-center w-3/3 h-3/3 md:w-8/30 md:h-1/3 border border-blue-gray-200 shadow-md rounded-xl px-8 py-2">
        <div class="logo-box h-16 w-full justify-center items-center h-24 flex border-b border-blue-gray-100">
            <img style="max-width:200px;max-height:66px" :src="logo" alt="آباکاری | abakary">
        </div>
        <div class="form-box flex flex-col">
            <form>
                <div class="w-3/3 my-2">
                    <label class="py-1" for="username">نام کاربری :</label>
                    <n-input id="username" v-model:value="state.loginData.username" type="text" placeholder="نام کاربری خود را وارد کنید" />
                </div>
                <div class="w-3/3 my-2">
                    <label class="py-1" for="password">رمز عبور :</label>   
                    <n-input id="password" type="password" show-password-on="mousedown" v-model:value="state.loginData.password" placeholder="رمز عبور خود را وارد کنید" :minlength="8"/>
                </div>
                <div class="w-3/3 my-2 h-16 flex justify-center items-center">
                    <button class="px-16 py-2 rounded-md bg-green-600 text-white" type="button" @click="signIn">ورود</button>
                </div>
            </form>
        </div>
    </div>
    <n-alert v-if="state.success" class="my-1 mx-auto w-3/3 md:w-8/30" title="ورود شما موفقیت آمیز بود" type="success">
      به داشبورد آباکاری خوش آمدید
    </n-alert>
    <n-alert v-if="state.error" class="my-1 mx-auto w-3/3 md:w-8/30" title="لطفا تمامی فیلد ها را با دقت پر کنید" type="error"> نام کاربری یا رمز عبور خود را اشتباه است، لطفا مجدد دوباره سعی کنید </n-alert>
</template>
<script>
import { reactive } from 'vue';
import logo from '../../assets/logo.png';
import { fetchLoginStartAsync } from '../../store/login/login.actions';
import { useStore } from "vuex";
export default {
    name: "loginAbakary",
    setup(){
        const store = useStore();
        const state = reactive({
            loginData : {
                username: '',
                password: '',
            },
            login: [],
            success : false,
            error: false
        });
        const signIn = () =>{
            const data = {};
            data.loginData = state.loginData;
            data.onSuccess = () => {
                console.log("[on-success] login");
                state.login = store.getters["login/loginData"];
                state.success = true
                setTimeout(function() {
                    window.location.href = "/";
                }, 3000);
            };
            data.onError = error => {
                console.log(error);
                state.error = true
            };
            fetchLoginStartAsync(store, data);
        }
        return{
            state,
            logo,
            signIn
        }
    }
}
</script>
<style lang="">
    
</style>