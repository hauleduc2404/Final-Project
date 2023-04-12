<template>
  <div class="list-group list-group-flush">
    <div v-for="(option, index)  in options" :key="index" class="list-group-item ">
      <div class="form-check ">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate-1">
        <label class="form-check-label" for="flexCheckIndeterminate">
          {{ option.description}}
        </label>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseSectionViewQuizMultipleChoice',
  props: {
    options: {
      type: Array,
      default: () => [
        { description:  'Indeterminate checkbox 1', value: '1' },
        { description:  'Indeterminate checkbox 2', value: '2' },
        { description:  'Indeterminate checkbox 3', value: '3' },
        { description:  'Indeterminate checkbox 4', value: '4' },
      ],
    }
  }
}
</script>

<style scoped>

</style>
