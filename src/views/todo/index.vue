<template>
  <div>
    <el-card>
      <el-button type="primary" >
        <i class="el-icon-plus"></i> 新建事项
      </el-button>
    </el-card>
    <el-calendar>
      <template slot="dateCell" slot-scope="{date, data}">
        <p
          :class="data.isSelected ? 'is-selected' : ''"
        >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.is-selected {
  color: #1989fa;
}
</style>