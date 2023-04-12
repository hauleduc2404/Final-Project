<template>
  <AppLayoutWrapper>
    <div class="container-lg my-5 py-5">
      <div class="fw-bolder fs-1 text-center mx-auto mb-4">D:<br>Chúng tôi không tìm thấy nội dung bạn yêu cầu.</div>
      <div class="d-flex justify-content-center">
        <a class="mx-auto btn btn-outline-primary flex-grow-0" :href="this.$router.resolve({name: 'Welcome'}).href">Quay về trang chủ</a>
      </div>
    </div>
  </AppLayoutWrapper>

</template>

<script>
import AppLayoutWrapper from '../components/AppLayoutWrapper.vue'

export default {
  name: 'NotFound',
  components: { AppLayoutWrapper }
}
</script>

<style scoped>

</style>
