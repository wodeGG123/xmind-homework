<template>
  <div class="app-layout">
  <Header />
  <div class="content">
      内容
  </div>
  <Footer />
  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';

export default {
  name: 'Layout',
  components: { Header, Footer },
};
</script>

<style lang="scss" scoped>
.app-layout{
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    padding-top: 44px;
    padding-bottom: 44px;
}
</style>>
