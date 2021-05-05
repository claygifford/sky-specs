<template>
  <div class="h-screen flex overflow-hidden bg-white">
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">

      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
          <!-- Start main area-->
        <div class="p-4">
          
            <div class="xl:col-span-2">
              <div>
                <div>
                  <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                    <div style="display: flex; flex-direction: column; align-items: flex-start;">
                      <h1 class="text-2xl font-bold text-gray-900">
                        {{selectedOrder?.name}}
                      </h1>
                      <h1>
                        <span class="text-gray-500">{{selectedOrder?.type}}</span>
                      </h1>                      
                    </div>
                  </div>
                  <div class="py-3 xl:pt-6 xl:pb-0">
                    <h2 class="sr-only">Description</h2>
                    <div class="prose max-w-none">
                      {{selectedOrder?.description}}
                    </div>
                  </div>
                </div>
              </div>
              <section aria-labelledby="activity-title" class="mt-8 xl:mt-10">
                <div>
                  <div class="divide-y divide-gray-200">
                    <div class="pt-6">
                      <div class="mt-6">
                        <div class="mt-6 flex items-center justify-end space-x-4">
                          <button @click="deleteOrder()" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Delete Order
                          </button>
                          <button v-if="selectedOrder?.status != 'Completed'" @click="completeOrder()" type="submit" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                            <CheckCircleIcon class="-ml-1 mr-2 h-5 w-5 text-green-500" aria-hidden="true" />
                            Complete Order
                          </button>
                          <div style="display: flex;" class=" px-4 py-2" v-else><CheckCircleIcon class="-ml-1 mr-2 h-5 w-5 text-green-500" aria-hidden="true" /> Order Complete</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
        </div>
      
          <!-- End main area -->
        </main>
        <aside class="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
          <!-- Start secondary column (hidden on smaller screens) -->
          <div class="bg-white lg:min-w-0 lg:flex-1" style="overflow-y: auto">
          <div class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
            <div class="flex items-center">
              <h1 class="flex-1 text-lg font-medium">Work Orders</h1>
            </div>
          </div>
          <ul class="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
            <li @click="selectOrder(order)" v-for="order in orders" :key="order.id" 
               :class="[isCurrent(order) ? 'bg-gray-200' : ' hover:bg-gray-50', 'relative pl-4 pr-6 py-5 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6']">
              <div class="flex items-center justify-between space-x-4">
                <!-- Repo name and link -->
                <div class="min-w-0 space-y-3">
                  <div class="flex items-center space-x-3">
                    <span :class="[order.active ? 'bg-green-100' : 'bg-gray-100', 'h-4 w-4 rounded-full flex items-center justify-center']" aria-hidden="true">
                      <span :class="[order.active ? 'bg-green-400' : 'bg-gray-400', 'h-2 w-2 rounded-full']" />
                    </span>

                    <span class="block">
                      <h2 class="text-sm font-medium">
                        <a :href="order.href">
                          <span class="absolute inset-0" aria-hidden="true" />
                          {{ order.name }} <span class="sr-only">{{ order.active ? 'Running' : 'Not running' }}</span>
                        </a>
                      </h2>
                      <div class="text-sm font-medium">
                        {{order.type}}
                      </div>  
                    </span>
                  </div>
                </div>
                <div class="sm:hidden">
                  <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <!-- Repo meta info -->
                <div class="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                  <p class="flex items-center space-x-4">
                    <button @click.stop="toggleFavorite(order)" class="relative bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="button">
                      <span class="sr-only">{{ order.favorite ? 'Add to favorites' : 'Remove from favorites' }}</span>
                      <StarIcon :class="[order.favorite ? 'text-yellow-300 hover:text-yellow-400' : 'text-gray-300 hover:text-gray-400', 'h-5 w-5']" aria-hidden="true" />
                    </button>
                  </p>
                  <p class="flex text-gray-500 text-sm space-x-2">
                    <span>{{ order.date }}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
          <!-- End secondary column -->
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, reactive } from 'vue'
import Order from '../store/modules/order'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  BellIcon,
  ChatAltIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  PencilIcon,
  MenuIcon,
  TagIcon,
  XIcon,
} from '@heroicons/vue/outline'

import {
  UserCircleIcon,
  StarIcon
} from '@heroicons/vue/solid'
  
export default {
  components: {
    BellIcon,
    ChatAltIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    Dialog,
    DialogOverlay,
    PencilIcon,
    StarIcon,
    TagIcon,
    TransitionChild,
    TransitionRoot,
    MenuIcon,
    UserCircleIcon,
    XIcon,
  },
  setup() {
    var store = useStore()

    const orders = computed(() => {
      return store.state.maintenance.orders
    })

    const selectedOrder = ref(new Order('', '', '', '', 0, '', false, '', false))

    return {
      orders,
      selectedOrder
    }
  },
  async created() {
    await this.$store.dispatch('maintenance/loadOrders');
    if (this.$store.state.maintenance.orders && this.$store.state.maintenance.orders.length > 0) {
      //const [first] = this.$store.state.maintenance.orders;
      this.selectedOrder = this.$store.state.maintenance.orders[0];
    }
  },
  methods: {
    selectOrder(order) {
      this.selectedOrder = order;
    },
    isCurrent(order) {
      return this.selectedOrder == order;
    },
    toggleFavorite(order) {
      order.favorite = !order.favorite;
    },
    completeOrder() {
      if (this.selectedOrder) {
        this.selectedOrder.status = 'Completed';
        this.selectedOrder.active = false;
      }
    },
    async deleteOrder() {
      if (this.selectedOrder) {
        await this.$store.dispatch('maintenance/deleteOrder', this.selectedOrder.id);
        await this.$store.dispatch('maintenance/loadOrders');
        if (this.$store.state.maintenance.orders) {
          const [first] = this.$store.state.maintenance.orders;
          this.selectedOrder = first;
        }
      }
    }
  }
}
</script>