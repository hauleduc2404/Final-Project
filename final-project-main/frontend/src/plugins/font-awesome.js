import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faEnvelope,
  faPhone,
  faLocationDot,
  faArrowUpRightFromSquare,
  faChevronLeft,
  faXmark,
  faBarsStaggered,
  faListUl,
  faLayerGroup,
  faBook,
  faQuestion, faStar, faAward, faBookOpenReader, faUser, faArrowRightFromBracket, faBars
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
  faInstagramSquare,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons'
import { faBell, faQuestionCircle, faStar as faEmptyStar, faPenToSquare } from '@fortawesome/free-regular-svg-icons'

library.add(faFacebookF, faYoutube, faTiktok, faInstagram, faInstagramSquare, faLinkedinIn)
library.add(faPenToSquare, faBars, faAward, faUser, faBookOpenReader, faBook, faStar, faEmptyStar, faHome, faEnvelope, faPhone, faLocationDot, faArrowUpRightFromSquare, faChevronLeft, faBell, faXmark, faBarsStaggered, faListUl, faChevronLeft, faLayerGroup, faQuestion, faBook, faQuestionCircle, faArrowRightFromBracket)

export { FontAwesomeIcon }
