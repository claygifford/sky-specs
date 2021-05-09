<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">


    <div class="flex-1 overflow-auto focus:outline-none">
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
        <!-- Page header -->
        <div class="bg-white shadow">
          <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div class="flex-1 min-w-0">
                <!-- Profile -->
                <div class="flex items-center">
                  <TurbineIcon/>
                  <div>
                    <div class="flex items-center">
                      <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        {{turbine.name}}
                      </h1>
                    </div>
                    <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt class="sr-only">Company</dt>
                      <dd class="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <OfficeBuildingIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {{turbine.location}}
                      </dd>
                      <dt class="sr-only">Account status</dt>
                      <dd class="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                        {{turbine.status}}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <button @click="showCreateDialog()" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2>
            <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Card -->
              <div v-for="card in cards" :key="card.name" class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0" style="padding-top: 20px;">
                      <component :is="card.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          {{ card.name }}
                        </dt>
                        <dd class="py-2">
                          <div :class="[getStatusStyles(card.status), 'text-lg font-medium text-gray-900 rounded-full py-2 px-1']">
                            {{ card.amount }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <div class="text-sm">
                    <a class="font-medium text-cyan-700 hover:text-cyan-900">
                      &nbsp;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Maintenance
          </h2>

          <div class="hidden sm:block">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col mt-2">
                <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                          Status
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="item in maintenance" :key="item.id" class="bg-white">
                        <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div class="flex">
                            <a class="group inline-flex space-x-2 truncate text-sm">
                              <DuplicateIcon class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                              <p class="text-gray-500 truncate group-hover:text-gray-900">
                                {{ item.name }}
                              </p>
                            </a>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span :class="[getStatusStyles(item.status), 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize']">
                            {{ item.status }}
                          </span>
                        </td>
                        <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <!-- <time :datetime="item.datetime">{{ item.date }}</time> -->
                          {{ item.date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                    <div class="hidden sm:block">
                      <p class="text-sm text-gray-700">
                        Showing
                        {{ ' ' }}
                        <span class="font-medium">1</span>
                        {{ ' ' }}
                        to
                        {{ ' ' }}
                        <span class="font-medium">10</span>
                        {{ ' ' }}
                        of
                        {{ ' ' }}
                        <span class="font-medium">20</span>
                        {{ ' ' }}
                        results
                      </p>
                    </div>
                    <div class="flex-1 flex justify-between sm:justify-end">
                      <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                      </a>
                      <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <create-order-modal @close-dialog="closeCreateDialog" :open="showCreateOrder" :turbineId="turbineId"></create-order-modal>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import TurbineIcon from '../icons/TurbineIcon.vue'
import CreateOrderModal from '../modals/CreateOrderModal.vue'
import Order from '../store/modules/order'
import Turbine from '../store/modules/turbine'

import {
  CogIcon,
  SupportIcon,
} from '@heroicons/vue/outline'
import {
  DuplicateIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
  ChartBarIcon
} from '@heroicons/vue/solid'

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}

export default {
  components: {
    DuplicateIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    CogIcon,
    CreateOrderModal,
    OfficeBuildingIcon,
    TurbineIcon,
    SearchIcon,
    SupportIcon,
  },
  setup() {
    const sidebarOpen = ref(false)
    const showCreateOrder = ref(false)
    const loading = ref(false)
    const turbine = ref<Turbine>({})
    const maintenance = reactive<Array<Order>>([])
    const cards = ref()
    const turbineId = ref()
    return {
      showCreateOrder,
      turbine,
      loading,
      cards,
      maintenance,
      statusStyles,
      sidebarOpen,
      turbineId
    }
  },
  watch: {
    '$route.params.id': function (id) {
      if (id && this) {
        this.load(id);
      }
    }
  },
  created: function () {
    const route = useRoute()    
    this.load(route.params.id)
  },
  methods: {
    load(id) {
      if (id && this.id != id) {
        this.loadTurbine(id);
        this.loadMaintenance(id);
      }
    },
    async loadTurbine(id) {
      if (id && this.id != id) {
        this.id = id;
        try {
          this.loading = true;
          this.turbine = await this.$store.dispatch('farm/getTurbine', id);
          this.cards = [
              { name: 'Capacity', icon: ChartBarIcon, amount: `${this.turbine.capacity}%`, status: 'failed' },
              { name: 'Health', icon: SupportIcon, amount: `${this.turbine.health}`, status: 'processing' },
              { name: 'Energy', icon: CogIcon, amount: `${this.turbine.energy} watts`, status: 'success' }
            ];
        } finally {
          this.loading = false;
        }
      }      
    },
    async loadMaintenance(id) {      
      this.maintenance.length = 0;
      var items = await this.$store.dispatch('maintenance/getOrdersForTurbine', id);
      this.maintenance.splice(0, 0, ...items);
    },
    showCreateDialog() {
      this.turbineId = this.id;
      this.showCreateOrder = true;
    },
    closeCreateDialog(item) {
      if (item) {
        this.maintenance.push(item);
      }
      
      this.showCreateOrder = false;
    },
    getStatusStyles(status) {
      return this.statusStyles[status];
    }
  }
}
</script>