<template>
    <div id="todoListPage" class="bg-half">
        <nav>
            <h1>ONLINE TODO LIST</h1>
            <ul>
                <li class="todo_sm"><span>{{ nickName }} 的代辦</span></li>
                <li @click="logout">登出</li>
            </ul>
        </nav>
        <div class="conatiner todoListPage vhContainer">
            <div class="todoList_Content">
                <div class="inputBox">
                    <input type="text" placeholder="請輸入待辦事項">
                    <span class="material-symbols-outlined">add</span>
                </div>
                <div class="todoList_list">
                    <ul class="todoList_tab">
                        <li><a href="#" class="active">全部</a></li>
                        <li><a href="#">待完成</a></li>
                        <li><a href="#">已完成</a></li>  <!-- 這可以用filter來做 -->
                    </ul>
                    <div class="todoList_items">
                        <ul class="todoList_item">
                            <li>
                                <label class="todoList_label">
                                    <input class="todoList_input" type="checkbox" value="true">
                                    <span>把冰箱發霉的檸檬拿去丟</span>
                                </label>
                                <a href="#">
                                    <i class="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label class="todoList_label">
                                    <input class="todoList_input" type="checkbox" value="true">
                                    <span>打電話叫媽媽匯款給我</span>
                                </label>
                                <a href="#">
                                    <i class="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label class="todoList_label">
                                    <input class="todoList_input" type="checkbox" value="true">
                                    <span>整理電腦資料夾</span>
                                </label>
                                <a href="#">
                                    <i class="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label class="todoList_label">
                                    <input class="todoList_input" type="checkbox" value="true">
                                    <span>繳電費水費瓦斯費</span>
                                </label>
                                <a href="#">
                                    <i class="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label class="todoList_label">
                                    <input class="todoList_input" type="checkbox" value="true">
                                    <span>約vicky禮拜三泡溫泉</span>
                                </label>
                                <a href="#">
                                    <i class="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label class="todoList_label">
                                    <input class="todoList_input" type="checkbox" value="true">
                                    <span>約ada禮拜四吃晚餐</span>
                                </label>
                                <a href="#">
                                    <i class="fa fa-times"></i>
                                </a>
                            </li>
                        </ul>
                        <div class="todoList_statistics">
                            <p> 5 個已完成項目</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2';

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
                    Swal.fire({
                        icon: 'success',
                        title: '登出成功',
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then(() => {
                            sessionStorage.removeItem('token');
                            sessionStorage.removeItem('nickname');

                            router.push('/login');
                        });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '登出失敗',
                        showCloseButton: true,
                        text: res.message
                    });
                }
            });
    }
</script>