<template>
  <ul class="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li v-for="turbine in turbines" :key="turbine.id" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div class="flex-1 flex flex-col p-8">
        <TurbineIcon class=" mx-auto"/>
        <h3 class="mt-6 text-gray-900 text-lg font-medium">{{ turbine.name }}</h3>
        <div class="mt-3 flex-1 inline-flex items-center justify-center">
          <CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
          {{turbine.status}}
        </div>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="w-0 flex-1 flex">
            <a @click="gotoTurbine(turbine)" class="cursor-pointer relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
              <SearchIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span class="ml-3">View</span>
            </a>
          </div>
          <div class="-ml-px w-0 flex-1 flex">
            <a @click="showCreateDialog(turbine)" class="cursor-pointer relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
              <CalendarIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span class="ml-3">Order</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <create-order-modal @close-dialog="showCreateOrder = false" :open="showCreateOrder" :turbineId="turbineId"></create-order-modal>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { SearchIcon, CalendarIcon } from '@heroicons/vue/solid'
import TurbineIcon from '../icons/TurbineIcon.vue'
import CreateOrderModal from '../modals/CreateOrderModal.vue'
import {
  CheckCircleIcon
} from '@heroicons/vue/outline'
export default {
  components: {
    SearchIcon,
    CalendarIcon,
    CheckCircleIcon,
    CreateOrderModal,
    TurbineIcon
  },
  setup() {
    var store = useStore()
    const showCreateOrder = ref(false)
    const turbineId = ref()
    const turbines = computed(() => {
      return store.state.farm.turbines
    })

    return {
      showCreateOrder,
      turbines,
      turbineId
    }
  },
  methods: {
    gotoTurbine(item) {
        if (item) {
          this.$router.push({ path: `/turbine/${item.id}` })   
        }
    },
    showCreateDialog(item) {
      if (item) {
        this.turbineId = item.id;
        this.showCreateOrder = true;
        //this.$router.push({ path: `/turbine/${item.id}` })   

      }
    }
  }
}
</script>