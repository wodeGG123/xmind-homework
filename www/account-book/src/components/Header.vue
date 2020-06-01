<template>
  <header>
      <p>非常精美的顶部</p>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
header{
    width: 100%;
    height: 44px;
    position: absolute;
    top: 0px;
    left: 0px;
    border-bottom: 1px solid #eee;
    p{
        line-height: 44px;
        font-size: 16px;
        text-align: center;
    }
}
</style>>
