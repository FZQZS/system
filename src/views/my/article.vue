<template>
    <div>
        <div class="article" v-for="(item,index) in art.list" :key="index" >
            <h3>{{item.title}}</h3>
            <p class="content">{{item.txt}}</p>
            <p>{{item.name}}</p>
            <div class="sanlian">
                <i class="el-icon-star-off"></i> {{item.collection}} <i class="el-icon-thumb"></i> {{item.fabulous}} <i class="el-icon-chat-dot-round"></i> {{item.comment}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            art:{
                type:Object,
                required: true
            }
        }
    }
</script>

<style  scoped>
.article{padding: 15px 0;border-bottom: 1px dashed gray;}
.content{font-size: 14px;text-indent: 2em;margin: 15px 0px;}
.sanlian{margin-top: 15px;}
</style>