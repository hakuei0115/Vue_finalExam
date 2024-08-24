<template>
    <div id="signUpPage" class="bg-yellow">
        <div class="conatiner signUpPage vhContainer">
            <div class="side">
                <a href="#"><img class="logoImg"
                        src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
                        alt=""></a>
                <img class="d-m-n"
                    src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
                    alt="workImg">
            </div>
            <div>
                <form class="formControls" action="index.html">
                    <h2 class="formControls_txt">註冊帳號</h2>

                    <label class="formControls_label" for="email">Email</label>
                    <input class="formControls_input" type="text" name="email" placeholder="請輸入 email" v-model="email"
                        required>
                    
                    <label class="formControls_label" for="name">您的暱稱</label>
                    <input class="formControls_input" type="text" name="name" placeholder="請輸入您的暱稱" v-model="nickName">

                    <label class="formControls_label" for="pwd">密碼</label>
                    <input class="formControls_input" type="password" name="pwd" placeholder="請輸入密碼" v-model="password" required>

                    <label class="formControls_label" for="pwd">再次輸入密碼</label>
                    <input class="formControls_input" type="password" name="pwd" placeholder="請再次輸入密碼" v-model="confirmPassword" required>
                    <span v-if="!isPasswordMatch">密碼不一致</span>

                    <button class="formControls_btnSubmit" type="button" @click.prevent="registerUser">註冊帳號</button>
                    
                    <router-link to="/login">
                        <a class="formControls_btnLink">返回登入</a>
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import Swal from 'sweetalert2';

    const router = useRouter();

    const email = ref('');
    const nickName = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const isPasswordMatch = computed(() => password.value === confirmPassword.value);
    
    const registerUser = async () => {
        if (!isPasswordMatch.value) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match',
            });
            return;
        }

        await fetch('https://todolist-api.hexschool.io/users/sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                nickname: nickName.value
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                .then(() => {
                    router.push('/login')
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: res.message
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: error.message
            });
        });
    }
</script>