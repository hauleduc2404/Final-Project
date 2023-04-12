import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Welcome from '../views/Welcome.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CourseList from '../views/CourseList.vue'
import CategoryList from '../views/CategoryList.vue'
import CategoryView from '../views/CategoryView.vue'
import CourseSectionView from '../views/CourseSectionView.vue'
import CourseView from '../views/CourseView.vue'
import store from '../store'
import Profile from '@/views/Profile.vue'
// import CommonFn from '@/common/commonFunction.js'
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        children: [
            {
                path: '/courses',
                name: 'UserCourse',
                component: Profile,
            }
        ]
    },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/courses',
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '',
        name: 'CourseList',
        component: CourseList,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: ':courseId',
        name: 'CourseView',
        component: CourseView,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: ':courseId/course-sections/:courseSectionId',
        name: 'CourseSectionView',
        component: CourseSectionView,
      },
    ],
  },
  {
    path: '/categories',
    name: 'CategoryList',
    component: CategoryList,
  },
  {
    path: '/categories/:categoryId',
    name: 'CategoryView',
    component: CategoryView,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: {
      async beforeRouteEnter(to, from, next) {
        const destination = {
          path: "/login",
        };
        if (from) {
          console.log("running before hook");
          try {
            await store.dispatch("auth/logout");
            next(destination)
          } catch (e) {
            next(false)
          }
        }
      }
    }
  },
  {
    path: '/:pathMath(.*)*',
    name: 'NotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue'),
  },
];

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      } else {
          return { top: 0, behavior: 'smooth' }
      }

  },
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/about'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = CommonFn.getLocalStorage('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   console.log(to.path);
//   if (authRequired && !loggedIn) {
//     console.log('he');
//     next('/login');
//   } else {
//     next();
//   }
// });


export default router;
