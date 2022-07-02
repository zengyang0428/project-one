<template>
  <div class="home">
    <Header/>
    <el-container class="content">
      <Menu/>
      <el-container>
      <el-main >
       <Bread/>
      <div class="cont">
      <router-view>

      </router-view>
      </div>
      </el-main>
      <el-footer><Footer/></el-footer>
    </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './commmon/Header.vue'
import Footer from './commmon/Footer.vue'
import Menu from './commmon/Menu.vue'
import Bread from './commmon/Breadcrumb.vue'
export default {
  components:{
    Header,
    Footer,
    Menu,
    Bread
  },
  data(){
    return {}
  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    .cont{
      margin: 20px;
    }
  }
}

</style>
