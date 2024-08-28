<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer ">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <form class="formControls">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" type="text" name="email" placeholder="請輸入 email" required v-model="username">
          <span v-if="!usernameIsNotEmpty">此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" placeholder="請輸入密碼" required v-model="password">
          <input class="formControls_btnSubmit" type="button" value="登入" @click="login">
          <router-link to="/register">
            <a class="formControls_btnLink">註冊帳號</a>
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import showAlert from '@/utils/showAlert';

  const router = useRouter()

  const username = ref('');
  const password = ref('');

  const usernameIsNotEmpty = computed(() => username.value !== '');

  const login = async () => {
    if (username.value === '' || password.value === '') {
      showAlert('error', 'Oops...', '請輸入帳號密碼', 'OK');
      return;
    }

    await fetch('https://todolist-api.hexschool.io/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value,
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