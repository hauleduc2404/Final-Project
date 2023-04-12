<template>
  <a
    class="rounded-1"
    :href="href"
  >
    <font-awesome-icon
      preserveAspectRatio="xMinYMin meet"
      :icon="{ prefix, iconName }"
      size="sm"
    />
  </a>
</template>

<script>
export default {
  name: 'AppFooterChannelIcon',
  props: {
    prefix: {
      type: String,
      default: 'fab',
    },
    iconName: {
      required: true,
      type: String,
    },
    href: {
      required: true,
      type: String,
    }
  }
}
</script>

<style scoped>
a {
  padding: 1rem;
  background-color: rgb(var(--bs-primary-rgb));
  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  color:white;
  //height: 1.5rem;
  //width: 1.5rem;
}

a:hover svg {
  opacity: 0.7;
}

</style>
