<template>
  <AppLayoutPopupOverlay @close="$emit('close')" :is-shown="isShown">
    <template v-slot:heading>
      <span class="fs-4 fw-bold">Ask a question</span>
    </template>
    <template v-slot:default>
      <form class="card border-0 mb-3">
        <div class="card-title fw-bold"></div>
        <label
          for="course-section-comment"
          class="form-label fw-bold"
        >Title</label>
        <input
          class="form-control mb-3"
          type="text"
          maxlength="255"
          placeholder="Summarize everything..."
        >
        <label
          for="course-section-comment"
          class="form-label fw-bold"
        >Question</label>
        <textarea
          placeholder="Ask something..."
          style="resize: none; overflow: scroll;"
          class="form-control"
          id="course-section-comment"
          rows="5"
          maxlength="255"
        ></textarea>
      </form>
    </template>
    <template v-slot:footer>
      <div class="d-flex flex-row gap-2 justify-content-end">
        <button class="btn btn-primary" type="submit">Ask</button>
        <button class="btn btn-outline-primary" type="button" @click="$emit('close')">Cancel</button>
      </div>
    </template>
  </AppLayoutPopupOverlay>
</template>

<script>

import AppLayoutPopupOverlay from './AppLayoutPopupOverlay.vue'

export default {
  name: 'CourseSectionViewThreadAddThread',
  components: { AppLayoutPopupOverlay },
  props: {
    isShown: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style scoped>

</style>
