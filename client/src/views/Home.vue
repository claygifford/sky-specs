<template>
  <div class="py-12 bg-white overflow-y-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <div class="flex-shrink-0 flex items-center">
          <div class="bg-white text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium">
            <div style="height: 200px;width: 200px;display: flex;align-items: center;justify-content: center; position: relative">
              <div style="border-radius: 50% 50% 5% 5%; background-color: rgb(212, 224, 250); height: 200px; width: 200px; display: flex; align-items: center; justify-content: center; position: absolute;margin-bottom: 30px;"></div>
				      <WindFarmIcon/>
            </div>
          </div>
        </div>
        <!-- <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2> -->
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl" style="padding-top: 50px;">
          Hey there, thanks for reviewing my submission
        </p>
        <h2 class="text-base p-t-4 text-green-600 font-semibold tracking-wide uppercase" style="padding-top: 50px;">Problem Statement</h2>
        <p class="mt-4 max-w-3xl text-md text-gray-500 lg:mx-auto">
          <ul class="list-disc" style="text-align: left">
            An ideal code sample would include the following:
            <li>Consistently applied practices: approaches to things like naming and structuring should be the same across the entire body of work</li>
            <li>Schema that we can see!</li>
            <li>Non-trivial joins as critical parts of a larger feature</li>
            <li>An API (ideally GraphQL) that allows users to interact with large or complex datasets</li>
            <li>Modern development tools to build and deploy</li>
            <li>Clear consideration for developer ergonomics through organization, documentation, and API design</li>
          </ul>
        </p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div v-for="feature in features" :key="feature.name" class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <component :is="feature.icon" class="h-6 w-6" aria-hidden="true" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ feature.name }}</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import WindFarmIcon from '../icons/WindFarmIcon.vue'
import InventoryIcon from '../icons/InventoryIcon.vue'
import {
  ClockIcon,
  PlusCircleIcon,
  ViewGridIcon,
  SearchCircleIcon
} from '@heroicons/vue/outline'

const features = [
  {
    name: 'Create Order',
    description:
      `The ability to create orders for a Turbine.`,
    icon: PlusCircleIcon,
  },
  {
    name: 'Dashboard',
    description:
      'View all the Turbines in one place.',
    icon: ViewGridIcon,
  },
  {
    name: 'View Turbine',
    description:
      'Look at each individual Turbine all the properties and orders.',
    icon: SearchCircleIcon,
  },
  {
    name: 'View Maintenance',
    description:
      'One place to look at all the orders.',
    icon: ClockIcon,
  },
]

export default {
components: {
	WindFarmIcon
  },
  setup() {
    return {
      features,
    }
  },
  methods: {
    Rotate() {
      this.$router.push('Home')
    }
  }
}
</script>