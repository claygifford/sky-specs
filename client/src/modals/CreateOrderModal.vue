<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" @close="open = false" :open="open">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-green-500">
                  Create Order
                </DialogTitle>
              <form class="space-y-2 divide-y divide-gray-200">
                <div class="space-y-2 divide-y divide-gray-200 sm:space-y-5">
                  <div class="pt-3 space-y-6 sm:pt-3 sm:space-y-5">
                    <div style="text-align: left;">
                      <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        Create a maintenance work order for a turbine.
                        {{turbineId}} {{open}}
                      </p>
                    </div>
                    <div class="space-y-6 sm:space-y-5">
                      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Name
                        </label>

                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <input type="text" name="name" id="name" v-model="name" class="max-w-lg block w-full shadow-sm focus:ring-gray-800 focus:border-gray-800 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                        </div>
                      </div>

                      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="reservation_date" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Type
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <select v-model="type" id="reservation_date" name="reservation_date" autocomplete="date" class="max-w-lg block focus:ring-gray-800 focus:border-gray-800 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                            <option :value="type.name" :key="type.id" v-for="type in types">{{type.name}}</option>
                          </select>
                        </div>
                      </div>

                      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="description" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Description
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea id="description" name="description" v-model="description" :rows="3" class="max-w-lg shadow-sm block w-full focus:ring-gray-800 focus:border-gray-800 sm:text-sm border-gray-300 rounded-md" />                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
              <button type="button" style="margin-left: auto;" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:w-auto sm:text-sm" @click="OnSubmit()">
                Submit
              </button>
              <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="OnCancel()" ref="cancelButtonRef">
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { useStore } from 'vuex'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
  },
  setup() {
    var store = useStore()    
    // const reservations = computed(() => {
    //       return store.state.reservation.reservations
    // })
    return { }
  },
  props: {
    open: Boolean,
    turbineId: [Number, String]
  },
  data() {
    return {
      name: '',
      description: '',
      type: {},
      types: [
        {id: 1, name: 'Corrective maintenance'},
        {id: 2, name: 'Preventive maintenance'},
        {id: 3, name: 'Analysis maintenance'}
      ],
    }
  },
  methods: {
      async OnSubmit() {        
        var order = await this.$store.dispatch('maintenance/createOrder', { name: this.$data.name, description: this.$data.description, type: this.$data.type, turbineId: this.$props.turbineId })
        this.$emit('close-dialog', order)
      },
      OnCancel() {
        this.$emit('close-dialog', false)
      }
  }
}
</script>