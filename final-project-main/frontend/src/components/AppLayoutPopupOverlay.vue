<template>
  <Transition name="fade">
    <div
      v-if="isShown"
      id="popup-overlay"
      class="bg-dark bg-opacity-50 d-flex position-fixed top-0 vw-100 position-fixed bottom-0 start-0 "
      :class="[isMobileScreen ? '' : 'justify-content-center align-items-center container-fluid']"
      style="z-index: 9000"
    >
      <div
        ref="popupOverlayModal"
        id="popup-overlay-content"
        class="d-flex flex-column bg-white transition-content bottom"
        style="z-index: 1"
        :style="{width: modalWidth, 'max-height': isMobileScreen ? '60vh' : '' }"
        :class="[isMobileScreen ? 'mt-auto rounded-top w-100' : 'rounded']"
      >
        <div
          v-show="this.$slots.heading"
          class="border-bottom py-3 px-4 d-flex justify-content-between"
        >
          <slot name="heading"></slot>
          <button @click="$emit('close')" class="btn btn-close btn-sm"/>
        </div>
        <div class="py-3 px-4 overflow-scroll flex-grow-1">
          <slot></slot>
        </div>

        <div
          v-show="this.$slots.footer"
          class="border-top py-3 px-4"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { onClickOutside, useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'

export default {
  emits: ['close'],
  name: 'AppLayoutPopupOverlay',
  props: {
    modalWidth: {
      type: String,
      default: '48rem',
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  components: {},

  setup(props, {emit}) {
    const isMobileScreen = useMediaQuery('(max-width: 576px)')
    const popupOverlayModal = ref(null)
    onClickOutside(popupOverlayModal,() => {
      console.log(popupOverlayModal)
      emit('close')
    })
    return { isMobileScreen, popupOverlayModal }
  }
}
</script>

<style scoped>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .transition-content,
.fade-leave-active .transition-content {
  transition: all 0.2s ease-in-out;

}

.fade-enter-from .transition-content.bottom,
.fade-leave-to .transition-content.bottom {
  transform: translateY(1rem);
}

@media  screen and (max-width: 576px) {
  .fade-enter-from .transition-content.bottom,
  .fade-leave-to .transition-content.bottom {
    transform: translateY(100%);
  }

}

.fade-enter-active .transition-content {
  transition-delay: 0.05s;
}
</style>
