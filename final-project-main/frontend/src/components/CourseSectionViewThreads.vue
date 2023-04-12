<template>
  <div>
    <h2 class="font-monospace h4 fw-bold mb-3 text-primary">Q&As</h2>
    <!--    <h2 class="font-monospace h4 fw-bold mb-3 text-primary">Ask A Question</h2>-->
    <button @click="onShowAddThread" class="btn btn-outline-secondary w-100 mb-4 btn-lg" type="button">
      <span class="me-2 small">Ask a question</span>
      <font-awesome-icon size="sm" :icon="{prefix: 'far', iconName: 'question-circle'}" />
    </button>
    <div class="gap-4 d-grid">
      <CourseSectionViewThreadsItem/>
      <CourseSectionViewThreadsItem/>
      <CourseSectionViewThreadsItem/>
      <CourseSectionViewThreadsItem/>
    </div>
  </div>
  <CourseSectionViewThreadAddThread :is-shown="showAddThread" @close="showAddThread = false"/>

</template>

<script>
import CourseSectionViewThreadsItem from './CourseSectionViewThreadsItem.vue'
import CourseSectionViewThreadAddThread from './CourseSectionViewThreadsAddThread.vue'

export default {
  name: 'CourseSectionViewThreads',
  components: { CourseSectionViewThreadAddThread, CourseSectionViewThreadsItem, },
  data() {
    return {
      showAddThread: false,
    }
  },
  methods: {
    onShowAddThread() {
      this.showAddThread = true
    }
  }
}
</script>

<style scoped>

</style>
