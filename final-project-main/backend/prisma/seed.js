const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const { LoremIpsum } = require('lorem-ipsum')
const { addCourseToCategory } = require('../handlers/category')
const prisma = new PrismaClient()

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 12,
            min: 6
        },
        wordsPerSentence: {
            max: 16,
            min: 8
        }
    }
)

const slugify = str =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

async function main () {
    const admin = await prisma.user.create({
        data: {
            name: 'Vu-Quang Le',
            email: 'quanglv.341@gmail.com',
            password: await bcrypt.hash('admin123', 10),
            phone: '0383425888'
        },
    })

    // Generate users
    for (let i = 0; i < 5; i++) {
        const generalUser = await prisma.user.create({
            data: {
                name: 'New Account 0' + i,
                email: 'account0' + i + '@gmail.com',
                password: await bcrypt.hash('admin@123', 10),
                phone: '012345678'
            },
        })
    }

    // Generate Category
    let categories = []
    for (let i = 0; i < 5; i++) {
        const generatedCategory = await prisma.category.create({
            data: {
                title: lorem.generateWords(5).capitalize(),
                description: lorem.generateSentences(1),
                slug: slugify(lorem.generateWords(3)),
            }
        })
        categories.push(generatedCategory)
    }

    // Generate Courses
    let courses = []
    for (const category of categories) {
        for (let i = 0; i < 5; i++) {
            const generatedCourse = await prisma.course.create({
                data: {
                    title: lorem.generateWords(5).capitalize(),
                    description: lorem.generateSentences(10),
                    slug: slugify(lorem.generateWords(5)),
                }
            })

            courses.push(generatedCourse)

            // Generate Lectures
            for (let i = 0; i < 5; i++) {
                const section = await prisma.courseSection.create({
                    data: {
                        courseId: generatedCourse.id,
                        title: lorem.generateWords(5).capitalize(),
                        summarization: lorem.generateSentences(2),
                        type: i%2 == 1 ? 0 : 1,
                    }
                })

                if(i%2 == 1) {
                    let content = ''

                    for (let i = 0; i < 5; i++) {
                        content += `<h2>${lorem.generateWords(5).capitalize()}</h2>`
                        content += `<h3>${lorem.generateWords(5).capitalize()}</h3>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                        content += `<h3>${lorem.generateWords(5).capitalize()}</h3>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                        content += `<h3>${lorem.generateWords(5).capitalize()}</h3>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                        content += `<p>${lorem.generateParagraphs(1).capitalize()}</p>`
                    }

                    const lecture = await prisma.lecture.create({
                        data: {
                            courseSectionId: section.id,
                            content: content
                        }
                    })
                } else {
                    let prompt =  lorem.generateSentences(3)
                    let type = Math.round(Math.random());
                    let keys = type === 1 ? [1,2] : [3]
                    let options = [ lorem.generateSentences(1),lorem.generateSentences(1),lorem.generateSentences(1),lorem.generateSentences(1), ]
                    let keysExplanation = lorem.generateSentences(2)

                    const question = await prisma.question.create({
                        data: {
                            courseSectionId: section.id,
                            options: options.toString(),
                            prompt,
                            type,
                            keys: keys.toString(),
                            keysExplanation,
                        }
                    })
                }


            }

            const courseCategory = await prisma.courseCategory.create({
                data: {
                    categoryId: category.id,
                    courseId: generatedCourse.id,
                }
            })
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
