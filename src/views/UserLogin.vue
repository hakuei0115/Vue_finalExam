<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer ">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <VForm class="formControls" v-slot="{ meta }" @submit="login">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>

          <label class="formControls_label" for="email">Email</label>
          <VField class="formControls_input" type="text" name="email" placeholder="請輸入 email" rules="required|email"></VField>
          <ErrorMessage name="email"/>

          <label class="formControls_label" for="pwd">密碼</label>
          <VField class="formControls_input" type="password" name="password" placeholder="請輸入密碼" rules="required|min:8"></VField>
          <ErrorMessage name="password"/>

          <button class="formControls_btnSubmit" type="submit" :disabled="!meta.valid">登入</button>
          
          <router-link to="/register">
            <a class="formControls_btnLink">註冊帳號</a>
          </router-link>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import showAlert from '@/utils/showAlert';

  const router = useRouter()

  const login = async (value) => {
    await fetch('https://todolist-api.hexschool.io/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('nickname', data.nickname);

          showAlert('success', '登入成功', '登入成功', '確定', {
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            router.push('/dashboard');
          });
        } else {
          showAlert('error', 'Oops...', data.message, 'OK');
        }
    })
  }
</script>