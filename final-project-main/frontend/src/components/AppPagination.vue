<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex align-items-center justify-content-center">
      <li class="page-item" :class="{disabled: offset === 0}">
        <a :aria-disabled="offset === 0" @click.prevent="onPreviousPaginationPage" class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li :class="{active: offset === index}" v-for="(page, index) in pages" :key="`pagination-item-${index}`"  class="page-item"><a @click.prevent="onToPaginationPage(page)" class="page-link" href="#">{{ page + 1 }}</a></li>
      <li class="page-item" :class="{disabled: offset === pageCount - 1}">
        <a :aria-disabled="offset === pageCount - 1" @click.prevent="onNextPaginationPage" class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
     total: {
       type: Number,
       required: true,
       default: 0,
     },
    offset: {
      type: Number,
      required: true,
      default: 1,
    },
    limit: {
      type: Number,
      required: true,
      default: 10,
    }
  },
  name: 'AppPagination',
  data() {
    return {

    }
  },
  methods: {
    onToPaginationPage(page) {
      this.$emit('toPaginationPage', {limit: this.limit, offset: page});

    },
    onNextPaginationPage() {
      this.$emit('toPaginationPage', {limit: this.limit, offset: (this.offset + 1) % this.pageCount});
    },
    onPreviousPaginationPage() {
      this.$emit('toPaginationPage', {limit: this.limit, offset: (this.offset + 1) % this.pageCount});
    },
  },
  mounted() {

  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.limit)
    },
    pages() {
      return  Array.from(Array(this.pageCount).keys())
    }
  }
}
</script>

<style scoped>

</style>
