<template>
    <div class="conatiner todoListPage vhContainer">
        <div class="todoList_Content">
            <div class="inputBox">
                <input type="text" placeholder="請輸入待辦事項" v-model="inputValue">
                <span class="material-symbols-outlined" @click="addTodo">add</span>
            </div>
            <div class="todoList_list">
                <ul class="todoList_tab">
                        <li><span :class="{ active: activeTab === 'all' }" @click="setActiveTab('all')">全部</span></li>
                        <li><span :class="{ active: activeTab === 'incompleted' }" @click="setActiveTab('incompleted')">待完成</span></li>
                        <li><span :class="{ active: activeTab === 'completed' }" @click="setActiveTab('completed')">已完成</span></li>
                </ul>
                <p class="p_showMessage" v-if="todoList.length === 0">目前尚無待辦事項</p>
                <div class="todoList_items" v-else>
                    <ul class="todoList_item">
                        <li v-for="todo in filteredTodoList" :key="todo.createTime">
                            <label class="todoList_label">
                                <input class="todoList_input" type="checkbox" :checked="todo.status" @change="toggleTodo(todo.id)">
                                <span>{{ todo.content }}</span>
                            </label>
                            <span class="material-symbols-outlined" @click="deleteTodo(todo.id)">close</span>
                        </li>
                    </ul>
                    <div class="todoList_statistics">
                        <p> {{ toBeFinishTodo }} 個待完成項目</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import Swal from 'sweetalert2';

    const inputValue = ref('');
    const activeTab = ref('all');
    const api = 'https://todolist-api.hexschool.io/todos';

    const todoList = ref([]);

    const getTodo = async () => {
        await fetch(api, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            todoList.value = res.data;
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
    }

    const addTodo = async () => {
        if (inputValue.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Empty input',
                text: 'Please enter a new todo'
            });
            return;
        }

        await fetch(api, {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'content': inputValue.value
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status) {
                getTodo();
                inputValue.value = '';
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Add new todo success'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.message
                });
            }
        })
    }

    const toggleTodo = async (id) => {
        await fetch(`${api}/${id}/toggle`, {
            method: 'PATCH',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status) {
                getTodo();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Todo status updated'
                });
            }
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
    }

    const deleteTodo = (id) => {
        fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then(() => {
            getTodo();
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
    }

    const setActiveTab = (tab) => {
        activeTab.value = tab;
    }

    const filteredTodoList = computed(() => {
        if (activeTab.value === 'incompleted') {
            return todoList.value.filter((todo) => todo.status === false);
        } else if (activeTab.value === 'completed') {
            return todoList.value.filter((todo) => todo.status === true);
        } else {
            return todoList.value;
        }
    });

    const toBeFinishTodo = computed(() => {
        return filteredTodoList.value.filter((todo) => todo.status === false).length;
    });

    onMounted(() => {
        getTodo();
    });
</script>