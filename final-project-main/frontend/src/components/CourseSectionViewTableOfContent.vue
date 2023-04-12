<template>
    <section
             id="table-of-content" class="border-start p-4 pb-0 h-100 d-flex flex-column">
        <h2 class="fw-medium text-uppercase text-muted small">In this section</h2>
        <ul class="fs-6 list-unstyled fw-light d-grid gap-2 text-muted overflow-scroll mb-0">
            <template v-for="(heading, index) in headings" :key="`heading-${index}`">
                <li>
                    <a @click.prevent="onClick(heading.slug)"
                       class="d-block text-reset text-decoration-none">
                        <span class="highlight-on-hover"
                              :class="{'ms-3': heading.type == 'h3'}">{{ heading.title }}
                        </span>
                    </a>
                </li>
            </template>

        </ul>
    </section>
</template>

<script>
export default {
    name: 'CourseSectionViewTableOfContent',
    props: {
        headings: {
            type: Array,
        }
    },
    data() {
        return {
            defaultData: []
        }
    },
    methods: {
        onClick(id) {
            const element = document.getElementById(id);
            element.scrollIntoView();
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
</style>
