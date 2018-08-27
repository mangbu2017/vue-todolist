<template>
    <div class="todolist">
        <div class="todo-header">
            <div class="header-content">
                <h1>VUE-todoList</h1>
            </div>
        </div>
        <div class="todo-main">
            <div class="main-input">
                <Input  class="todo-input" v-model="inputValue" placeholder="enter your todos" @keyup.native.enter="addItem"/>
                <!-- <input type="text" class="todo-input" v-model="inputValue"
                @keyup.enter="addItem"> -->
                <!-- <div class="todo-btn" @click="addItem">添加任务</div> -->
                <Button class="todo-btn" type="success" @click="addItem">添加任务</Button>
            </div>
            <ul class="main-type">
                <li class="untaskcount">当前还有 {{filterList}} 个任务未完成</li>
                <li class="tasktypes">
                    <!-- <a href="#unfinished">未完成任务</a>
                    <a href="#finished">完成任务</a>
                    <a href="#all">所有任务</a> -->
                    
                    <router-link :to="{name: 'unfinished'}" is="Button" type="primary">未完成任务</router-link>
                    <router-link :to="{name: 'finished'}" is="Button" type="primary">完成任务</router-link>
                    <router-link :to="{name: 'all'}" is="Button" type="primary">所有任务</router-link>
                </li>
            </ul>
            <h3 class="list-title">任务列表:</h3>
            <router-view>
                <div class="main-list">
                    <h1 class="notask" v-show="!list.length">当前无任务</h1>
                    <ul class="todo-list">
                        <li class="item" v-for="(item, index) in filterCheck" :key="index" :class="{completed:item.checked, editing:isEditing === item}">
                            <div class="content">
                                <Checkbox v-model="item.checked" @dblclick.native="editItem(item)">{{item.content}}</Checkbox>
                                <button class="delete" @click="deleteItem(item)">X</button>
                            </div>
                            <Input  class="edit" :class="{hide: isEditing !== item}" 
                            v-focus="isEditing === item" v-model="item.content" 
                            @keyup.native.enter="edited" @blur.native="edited" @keyup.native.esc="cancelEdit(item)"/>
                        </li>
                    </ul>
                </div>
            </router-view>  
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    import Vue from 'vue';
    import Component from 'vue-class-component';

    var myLocalStorage = {
        save(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get(key) {
            return JSON.parse(localStorage.getItem(key));
        }
    }

    @Component({
        watch: {
            list: {
                deep: true,
                handler: function() {
                    myLocalStorage.save('todolist', this.list);
                }
            },
            $route(to, from) {
                this.setView(to.name);
            }
        },
        methods: {
            ...mapMutations({
                setIsEditing: 'SET_ISEDITING', 
                setBeforeEditing: 'SET_BEFOREEDITING', 
                setView: 'SET_VIEW', 
                pushList: 'PUSH_LIST', 
                deleteList: 'DELETE_LIST'
            }),
            addItem() {
                this.pushList({
                    content: this.inputValue,
                    checked: false
                })
                this.inputValue = '';
            },
            deleteItem(item) {
                console.log(item);
                this.deleteList(item);
            },
            editItem(item) {
                this.setIsEditing(item);
                this.setBeforeEditing(item.content);
            },
            edited() {
                this.setIsEditing('');
            },
            cancelEdit(item) {
                item.content = this.beforeEditing;
                this.setBeforeEditing('');
                this.setIsEditing('');
            }
        },
        directives: {
            focus: {
                update(el, binding) {
                    if(binding.value == true) {
                        el.focus();
                    }
                }
            }
        },
        computed: {
            ...mapState({
                list: state => state.list,
                isEditing: state => state.isEditing,
                beforeEditing: state => state.beforeEditing,
                view: state => state.view
            }),
            filterList() {
                return this.list.filter(function(item){return !item.checked}).length;
            },
            filterCheck() {
                switch(this.view) {
                    case 'all': 
                        return this.list;
                    case 'finished': 
                        return this.list.filter(function(item) {
                            return item.checked;
                        });
                    case 'unfinished':
                        return this.list.filter(function(item) {
                            return !item.checked;
                        });
                }
            }
        }
    })

    export default class App extends Vue {
        inputValue = '';
    }
</script>
<style lang="less">
    * {
        padding: 0;
        margin: 0;
        list-style: none;
        text-decoration: none;
    }

    .btn() {
        width: 75px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 10px;
        color: white;
        background-color: #09c;
    }

    .clear() {
        &:after {
            display: block;
            content: '';
            clear: both;
        }
    }

    .todolist {
        width: 600px;
        height: 600px;
        margin: 100px auto 0 auto;
        border-radius: 50px 50px;
        background-color: #9cc;
        .todo-header {
            width: 100%;
            height: 100px;
            .header-content {
                height: 100px;
                line-height: 100px;
                text-align: center;
            }
        }
        .todo-main {
            width: 100%;
            height: 400px;
            .main-input {
                display: flex;
                justify-content: space-between;
                .todo-input {
                    width: 60%;
                    // height: 30px;
                    // padding: 0 15px;
                    margin-left: 30px;
                    // border-radius: 20px;
                    // border-width: 0px;
                    // outline: none;
                }
                .todo-btn {
                    // .btn;
                    margin-right: 100px;
                }
            }
            .main-type {
                .untaskcount {
                    height: 30px;
                    line-height: 30px;
                    margin-left: 40px;
                }
                .tasktypes {
                    .clear;
                    a {
                        // .btn;
                        float: right;
                        margin-right: 10px;
                    }
                }
            }
            .list-title {
                height: 30px;
                line-height: 30px;
                margin-left: 40px;
            }
            .main-list {
                .notask {
                    margin: 100px;
                    text-align: center;
                }
                .todo-list {
                    
                    .item {
                        height: 35px;
                        &.completed {
                            opacity: .3;
                            label {
                                text-decoration-line: line-through;
                            }
                        }

                        &.editing .content{
                            display: none;
                        }

                        .content {
                            height: 35px;
                            margin: 0 50px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            label {
                                width: 450px;
                            }
                            .delete {
                                width: 45px;
                            }
                        }
                        .edit {
                            height: 30px;
                            width: 300px;
                            margin-left: 60px;
                            padding: 0 10px;
                            outline: none;
                            border-width: 0px;
                            border-radius: 10px;

                            &.hide {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
    
