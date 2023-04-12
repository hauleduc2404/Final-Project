<template>
  <Transition name="fade">
    <div
      v-if="isShown"
      id="overlay"
      class="position-fixed start-0 top-0 vh-100 w-100 d-flex"
      :class="[
        slideDirection === 'left' ? 'justify-content-start' : '',
        slideDirection === 'right' ? 'justify-content-end' : '',
       ]"
      style="z-index: 9000"
      :style="{'max-width': maxWidth}"
    >
      <div
        ref="sidebar"
        id="overlay-content"
        class="bg-white h-100"
        :class="[slideDirection]"
        style="z-index: 9001"
      >
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

export default {
  name: 'AppLayoutSidebarOverlay',
  setup(props, {emit}) {
    const sidebar = ref(null)
    onClickOutside(sidebar, () => {
      //console.log('closed', sidebar, event)
      emit('close')
    })
    return {sidebar}
  },
  props: {
    maxWidth: {
      type: String,
      default: '100vw',
    },
    isShown: {
      type: Boolean,
      default: false,
    },
    slideDirection: {
      type: String,
      default: 'left',
      validator(value) {
        // The value must match one of these strings
        return ['right', 'left'].includes(value)
      }
    }
  }
}
</script>

<style scoped>
#overlay {
  max-width: 85vw;
  height: 100vh;
}

#overlay {
  background-color: rgba(0, 0, 0, .5);
}

/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active #overlay-content,
.fade-leave-active #overlay-content {
  transition: all 0.2s ease-in-out;

}

.fade-enter-from #overlay-content.right,
.fade-leave-to #overlay-content.right {
  transform: translateX(100%);
}

.fade-enter-from #overlay-content.left,
.fade-leave-to #overlay-content.left {
  transform: translateX(-100%);
}

.fade-enter-active #notification-list {
  transition-delay: 0.05s;
}
</style>
