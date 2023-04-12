import { axiosInstance } from '../common/api'

class NotificationService {
  viewNotification() {
    //return axiosInstance.get().then(res => res.data)
    return
  }
  listNotifications() {
    return axiosInstance.get().then(res => res.data)
  }
}

export default new NotificationService()
