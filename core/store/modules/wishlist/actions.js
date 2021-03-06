import * as types from '../../mutation-types'
import EventBus from 'core/plugins/event-bus'
import i18n from 'core/lib/i18n'
import { htmlDecode } from 'core/filters'

export default {
  clear (context) {
    context.commit(types.WISH_LOAD_WISH, [])
  },
  load (context) {
    const commit = context.commit
    global.db.wishlistCollection.getItem('current-wishlist', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.WISH_LOAD_WISH, storedItems)
    })
  },
  addItem ({ commit }, product) {
    commit(types.WISH_ADD_ITEM, { product })
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
      action1: { label: 'OK', action: 'close' }
    })
  },
  removeItem ({ commit }, product) {
    commit(types.WISH_DEL_ITEM, { product })
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.name) }),
      action1: { label: 'OK', action: 'close' }
    })
  }
}
