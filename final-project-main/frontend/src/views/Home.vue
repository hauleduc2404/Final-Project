<template>
  <AppLayoutWrapper>
    <AppLayoutContainer>
          <div>
            Hi
          </div>
    </AppLayoutContainer>
  </AppLayoutWrapper>
</template>

<script>
// @ is an alias to /src
import AppLayoutWrapper from '../components/AppLayoutWrapper.vue'
import AppLayoutContainer from '../components/AppLayoutContainer.vue'

export default {
  name: 'Home',
  components: {
    AppLayoutContainer,
    AppLayoutWrapper,
  },
};
</script>
