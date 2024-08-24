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
          <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required v-model="username">
          <!-- <span>此欄位不可留空</span>  這裡用watch監聽-->
          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required v-model="password">
          <input class="formControls_btnSubmit" type="button" value="登入" @click="login">
          <router-link to="/UserRegister">
            <a class="formControls_btnLink">註冊帳號</a>
          </router-link>
          {{ test }}
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Swal from 'sweetalert2'

  const router = useRouter()

  const username = ref('');
  const password = ref('');
  const test = ref('')

  const login = () => {
    if (username.value === '' || password.value === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '請輸入帳號密碼',
      })
    }

    fetch('https://todolist-api.hexschool.io/users/sign_in', {
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
          Swal.fire({
            icon: 'success',
            title: '登入成功',
            showConfirmButton: false,
            timer: 1500,
          })
          .then(() => {
            router.push('/main');
          })
        }
    })
  }
</script>