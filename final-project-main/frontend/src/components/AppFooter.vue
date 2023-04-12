<template>
  <footer
    id="footer"
    class="border-top border-1"
  >
    <div class=" my-4 container-lg">
      <div
        id="primary-footer"
        class="gap-5"
      >
        <div>
          <AppLogo></AppLogo>
          <p class="my-4 fw-bold fs-4">Tận tâm đào tạo từ mất gốc<br>đến IELTS 7.0 trong một năm</p>
          <div
            id="channels"
            class="d-flex flex-nowrap flex-row gap-3 justify-content-start"
          >
            <AppFooterChannelIcon
              v-for="(icon,index) in [
              {href: '', name: 'facebook-f'},
              {href: '', name: 'instagram'},
              {href: '', name: 'tiktok'},
              {href: '', name: 'linkedin-in'},
              {href: '', name: 'youtube'},
              // {href: '', name: 'envelope', prefix: 'fas'},
              // {href: '', name: 'phone', prefix: 'fas'},
              ]"
              :key="`channel-icon-${index}`"
              :href="icon.href"
              :icon-name="icon.name"
            ></AppFooterChannelIcon>
          </div>
        </div>
        <nav id="footer-navigation">
          <ul class="list-unstyled d-flex flex-column flex-xl-row gap-4 justify-content-between mb-0">
            <li
              class="d-flex flex-column"
              v-for="(navigation, index) in navigations"
              :key="`footer-navigation-${index}`"
            >
              <span class="fw-bold fs-5 mb-xl-4 mb-2 d-block">{{ navigation.label }}</span>
              <ul class="list-unstyled d-flex flex-column gap-2 gap-xl-3">
                <li
                  class="d-block fw-light"
                  v-for="(item, index) in navigation.items"
                  :key="`footer-navigation-item-${index}`"
                >
                  <a style="cursor: pointer;" class="text-muted text-decoration-none">{{ item.label }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div
        class="mt-5"
        id="footer-addresses"
      >
        <address>
          <div class="fw-bold fs-5 mb-2 mb-lg-4">Danh sách cơ sở</div>
          <ul class="list-unstyled d-flex flex-column gap-3 fw-light">
            <li
              v-for="(address,index) in addresses"
              :key="`address-${index}`"
            >
              <font-awesome-icon
                preserveAspectRatio="xMinYMin meet"
                :icon="{ prefix: 'fa', iconName: 'location-dot' }"
              ></font-awesome-icon>
              <span class="ps-2">{{ address.name }}: </span>
              <a
                href="/"
                class="text-muted text-decoration-none"
              >{{ address.address }}</a>
            </li>
          </ul>
        </address>
      </div>
      <div class="mt-5">
        <small
          class="text-muted fw-light"
        >&#169; {{ new Date().getFullYear() }} LingoPWA. All rights reserved.
        </small>
      </div>

    </div>

  </footer>
</template>

<script>
import AppLogo from './AppLogo.vue'
import AppFooterChannelIcon from './AppFooterChannelIcon.vue'

export default {
  name: 'AppFooter',
  components: { AppFooterChannelIcon, AppLogo },
  data() {
    return {
      addresses: [
        {
          name: 'Trụ sở chính (Kiểm tra đầu vào và nhận tư vấn)',
          address: 'Số 4, ngõ 95, Hoàng Cầu, Đống Đa, Hà Nội',
          href: ''
        },
        {
          name: 'Cơ sở 2 (Giảng dạy)',
          address: 'Tầng 5, số 8 Phan Văn Trường, phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
          href: ''
        },
        {
          name: 'Cơ sở 3 (Giảng dạy)',
          address: 'Mầm non Skykids , Chung cư SkyLight, 125D Minh Khai, Ngõ Hòa Bình 6, Phường Minh Khai, Quận Hai Bà Trưng',
          href: ''
        },
        { name: 'Cơ sở 4 (Giảng dạy)', address: '176 Ngõ Xã Đàn 2, Nam Đồng, Hà Nội', href: '' },
        {
          name: 'Cơ sở 5 (Giảng dạy)',
          address: '108 Ngõ 100 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội',
          href: ''
        },
        {
          name: 'Cơ sở 6 (Giảng dạy)',
          address: 'Địa chỉ B7, ngách 22, Ngõ 61 Lạc Trung, Vĩnh Tuy, Hai Bà Trưng, Hà Nội',
          href: ''
        },
        { name: 'Cơ sở 7 (Giảng dạy)', address: 'Số 89, ngõ 35 Cát Linh, Hà Nội', href: '' },
        {
          name: 'Cơ sở 8 (Giảng dạy)',
          address: 'Số 9E, ngõ 4C Đặng Văn Ngữ, Đống Đa, Hà Nội',
          href: ''
        },
      ],
      navigations: [
        {
          label: 'Về chúng tôi',
          items: [
            { label: 'Về IZONE', route: '' },
            { label: 'Hoạt động hợp tác', route: '' },
            { label: 'Đội ngũ giảng viên', route: '' },
            { label: 'Chính sách bảo mật', route: '' },
          ],
        },
        {
          label: 'Đào tạo',
          items: [
            { label: 'Các khoá học', route: '' },
            { label: 'Lịch khai giảng', route: '' },
            { label: 'Kiểm tra trình độ', route: '' },
            { label: 'Luyện thi trực tuyến', route: '' },
            { label: 'Bài viết chia sẻ', route: '' },
          ],
        },
        {
          label: 'Liên hệ',
          items: [
            { label: 'Đăng ký học', route: '' },
            { label: 'Cơ hội nghề nghiệp', route: '' },
          ],
        },
      ],
    }
  }
}
</script>

<style scoped>

#primary-footer {
  display: grid;
  grid-template-columns: auto auto;
}

@media screen and (max-width: 576px) {
  #primary-footer {
    grid-template-columns: unset;
    grid-template-rows: auto auto;
  }
}

#channels svg {
  height: 1rem;
}

#footer-navigation ul {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
}
</style>
