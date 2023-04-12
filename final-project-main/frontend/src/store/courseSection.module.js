import { findById, upsert } from '@/common/store'
import courseSectionService from '@/services/courseSection.service'

export const courseSection = {
    namespaced: true,
    state: {
        items: [],
    },
    getter: {
      courseSections: (state) => {
          return (id) => {
              const courseSection = findById(state.items, id)
              if (!courseSection) return {}
              return courseSection
          }
      }
    },
    actions: {
        fetchCourseSection({commit}, id) {
          courseSectionService.getSection(id).then(response => {
              commit('addCourseSection', response.data.data)
          })
        }
    },
    mutations:{
        addCourseSection({items}, item) {
           upsert(items,  item)
        }
    }
}
