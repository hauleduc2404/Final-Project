<template>
    <article class="card highlight-border-on-hover">
        <div class="card-body p-3">
            <div class="d-flex flex-row justify-content-between align-items-start mb-3">
                <AppUserAvatar :title="review.title" :subtitle="review.username ?? ''"/>
                <div class="align-items-center d-flex gap-1 flex-row text-primary">
                    <font-awesome-icon
                        v-for="rate in [1,2,3,4,5]"
                        :key="rate"
                        :icon="{prefix: rate <= review.rating ? 'fa' : 'far', iconName: 'star'}"
                    />
                    <span class="ms-1 fs-4 fw-bold">{{ review.rating }}</span>
                </div>
            </div>

            <div class="card-text text-muted fs-6 mt-3 small">
                <p
                    data-id="review"
                    :class="{masked: !showMore}"
                >
                    <span>{{ review.review }}</span>
                </p>
            </div>
            <div class="d-flex">
                <button
                    class="ms-auto btn btn-link text-decoration-none pb-0"
                    @click="showMore = !showMore"
                >
                    {{ showMore ? 'Thu gọn' : 'Xem thêm' }}
                </button>
            </div>
        </div>
    </article>
</template>

<script>
import AppUserAvatar from './AppUserAvatar.vue'

export default {
    name: 'CourseReviewCard',
    components: { AppUserAvatar },
    props: {
        review: {
            type: Object,
            required: true,
            default: () => ({
                rating: 5,
                title: '',
                user: {
                    name: 'Anonymous User',
                },
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias deleniti eius error in provident ratione tempore voluptatum! Ad autem debitis deserunt eos, esse maiores quaerat rem sapiente soluta tempora vero.</span><span>Autem deleniti iste obcaecati quidem! Dicta, nisi, odit! Aliquid asperiores aut autem blanditiis ea eius fugit, hic ipsa molestias, nemo, quae quam recusandae repellat similique soluta suscipit tempora ullam velit. Accusantium alias architecto, asperiores aspernatur consequatur cupiditate dolor doloremque dolores dolorum enim hic, ipsa magnam maiores minus necessitatibus nemo nobis nostrum quaerat quas quasi qui quidem rem, sed suscipit voluptatum.</span><span>Dolorum eveniet iste molestiae nulla odit possimus quae quos recusandae repellat reprehenderit saepe, ullam voluptas voluptatem? Animi at atque corporis fugiat incidunt, ipsam iusto. Dolore molestiae molestias pariatur quis quisquam.</span><span>A ad adipisci alias, animi architecto aut cum doloribus enim eveniet facilis hic inventore maxime nobis obcaecati omnis rem rerum voluptates? Ab alias eaque, ex fugit id quidem repellat voluptatum!'
            })
        }
    },
    mounted () {
        console.log('review user=', this.review.user)
    },
    data () {
        return {
            showMore: false,
        }
    }
}
</script>

<style scoped>
.masked {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, #ffffff 5%, rgb(255, 255, 255, 0) 95%);
}
</style>
