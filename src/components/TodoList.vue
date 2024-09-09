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
                    <li><span :class="{ active: activeTab === 'incompleted' }"
                            @click="setActiveTab('incompleted')">待完成</span></li>
                    <li><span :class="{ active: activeTab === 'completed' }"
                            @click="setActiveTab('completed')">已完成</span></li>
                </ul>
                <p class="p_showMessage" v-if="todoList.length === 0">目前尚無待辦事項</p>
                <div class="todoList_items" v-else>
                    <ul class="todoList_item">
                        <li v-for="todo in filteredTodoList" :key="todo.createTime">
                            <label class="todoList_label">
                                <input class="todoList_input" type="checkbox" :checked="todo.status"
                                    @change="toggleTodo(todo.id)">
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
import showAlert from '@/utils/showAlert';
import myFetch from '@/utils/fetchTool';

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
            showAlert('error', 'Error', err.message, 'OK');
        });
    }


const addTodo = async () => {
    if (inputValue.value === '') {
        showAlert('error', 'Empty input', 'Please enter a new todo', 'OK');
        return;
    }

    try {
        const data = await myFetch(api, 'POST', sessionStorage.getItem('token'), {
            'content': inputValue.value
        });

        if (data.status) {
            getTodo();
            inputValue.value = '';
            showAlert('success', 'Success', 'Add new todo success', 'OK');
        } else {
            showAlert('error', 'Error', data.message, 'OK');
        }
    } catch (error) {
        showAlert('error', 'Error', error.message, 'OK');
    }
}

const toggleTodo = async (id) => {
    try {
        const data = await myFetch(`${api}/${id}/toggle`, 'PATCH', sessionStorage.getItem('token'));

        if (data.status) {
            getTodo();
            showAlert('success', 'Success', 'Todo status updated', 'OK');
        } else {
            showAlert('error', 'Error', data.message, 'OK');
        }
    } catch (error) {
        showAlert('error', 'Error', error.message, 'OK');
    }
}

const deleteTodo = async (id) => {
    try {
        const data = await myFetch(`${api}/${id}`, 'DELETE', sessionStorage.getItem('token'));

        if (data.status) {
            getTodo();
            showAlert('success', 'Success', 'Todo deleted', 'OK');
        } else {
            showAlert('error', 'Error', data.message, 'OK');
        }
    } catch (error) {
        showAlert('error', 'Error', error.message, 'OK');
    }
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