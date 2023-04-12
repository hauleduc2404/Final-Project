<template>
    <article

        v-html="content"
        class="min-vh-100"
    >
    </article>
</template>

<script>

export default {
    name: 'CourseSectionViewLecture',
    props: {
        content: {
            type: String
        }
    },
    data() {
        return {
            activeId: '',
            headings: [],
        }
    },
    // methods: {
    //     handleScroll() {
    //         for(let i = 0; i < this.headings.length; i++) {
    //             let el = this.headings[i]
    //             const elTop = el.heading.getBoundingClientRect().top
    //             const elBottom = el.heading.getBoundingClientRect().bottom
    //             if (elTop <= 0 && elBottom <= 0 && elBottom + el.length * 3/4 > 0) {
    //                 this.activeId = this.headings[i+1].id;
    //                 console.log(this.activeId)
    //                 break;
    //             }
    //         }
    //     },
    // },
    mounted() {
        // document.getElementById('main-content').addEventListener('scroll', this.handleScroll);
        // let array = []
        // document.querySelectorAll(".scroll-heading").forEach(heading => {
        //     array.push({
        //         id: heading.id,
        //         heading: heading,
        //         length: 0,
        //     })
        // });
        //
        // this.headings = array
        //
        // this.headings.forEach((heading, index, headings) => {
        //     if (index === 0) return
        //     headings[index - 1].length = heading.heading.getBoundingClientRect().top - headings[index - 1].heading.getBoundingClientRect().bottom
        // })
        //
        // console.log(this.headings)
    }
}
</script>

<style>
h2, h3 {
    scroll-margin: 8rem;
}
</style>
