<template>
    <div class="position-relative">
        <button
            title="Open notifications"
            type="button"
            class="rounded-circle d-flex justify-content-center align-items-center"
            style="all: unset; height: 2.75rem; width:2.75rem"
        >
            <img
                style="height: 2.75rem; width:2.75rem; border-radius: 50%;"
                :src="`https://ui-avatars.com/api/?name=${username}&amp;color=FFFFFF&amp;background=111827`"
            />
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'AppUserAvatarCircle',
    // data( ){
    //   return {
    //     username: this.$store.state.auth.username?.replace(' ', '+')
    //   }
    // },
    computed: {
        ...mapGetters({
            username: 'auth/getUsername'
        })
    }

}

</script>

<style scoped>

</style>
