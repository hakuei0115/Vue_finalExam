<template>
    <div id="todoListPage" class="bg-half">
        <nav>
            <h1>ONLINE TODO LIST</h1>
            <ul>
                <li class="todo_sm"><span>{{ nickName }} 的代辦</span></li>
                <li @click="logout">登出</li>
            </ul>
        </nav>
        <TodoList />
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import TodoList from '@/components/TodoList.vue';
    import showAlert from '@/utils/showAlert';

    const router = useRouter();
    const nickName = sessionStorage.getItem('nickname');

    const logout = async () => {
        await fetch('https://todolist-api.hexschool.io/users/sign_out', {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status) {
                    showAlert('success', '登出成功', '你已成功登出', '確定', {
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('nickname');
                        router.push('/login');
                    });
                } else {
                    showAlert('error', '登出失敗', res.message, 'OK');
                }
            });
    }
</script>