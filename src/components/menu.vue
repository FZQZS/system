<template>
    <div>
        <el-submenu v-if="menu.children" :index="menu.url">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span>{{menu.name}}</span>
            </template>
            <nav-menu v-for="(item,index) in menu.children" :menu="item" :key="index"></nav-menu>
        </el-submenu>
        <el-menu-item v-else :index="menu.url">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
        </el-menu-item>
        <!-- menu组件是导航的内容 -->
        <!-- navLeft的子组件 -->
    </div>
</template>

<script>
    export default {
        // props接收父组件数据
        //传过来的对象名需与父组件所绑定的自定义方法一致
        props:{
            menu:{
                type:Object,
                //传的是一个对象类型
                required: true
            }
        },
        name:"NavMenu"
    }
</script>

<style lang="scss" scoped>

</style>