<template>
    <div id="app" class="p-8 space-y-8 h-screen">
        <div class="space-y-3">
            <h1 class="text-xl">
                Buttons
            </h1>
            <div class="flex space-x-2">
                <div>
                    <demo-button class="w-full" color="white">
                        Normal
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Normal
                    </div>
                </div>
                <div>
                    <demo-button color="white" :disabled="true">
                        Disabled
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Disabled
                    </div>
                </div>
                <div>
                    <demo-button color="white" :loading="true">
                        Loading
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Loading
                    </div>
                </div>
            </div>
            <div class="flex space-x-2">
                <div>
                    <demo-button color="gray">
                        Normal
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Normal
                    </div>
                </div>
                <div>
                    <demo-button color="gray" :disabled="true">
                        Disabled
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Disabled
                    </div>
                </div>
                <div>
                    <demo-button color="gray" :loading="true">
                        Loading
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Loading
                    </div>
                </div>
            </div>
            <div class="flex space-x-2">
                <div>
                    <demo-button color="blue">
                        Normal
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Normal
                    </div>
                </div>
                <div>
                    <demo-button color="blue" :disabled="true">
                        Disabled
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Disabled
                    </div>
                </div>
                <div>
                    <demo-button color="blue" :loading="true">
                        Loading
                    </demo-button>
                    <div class="text-xs text-gray-600 mt-1">
                        Loading
                    </div>
                </div>
            </div>
        </div>
        <div class="space-y-3">
            <h1 class="text-xl">
                Inputs
            </h1>
            <div class="flex space-x-2">
                <div>
                    <demo-input value="" />
                    <div class="text-xs text-gray-600 mt-1">
                        Base
                    </div>
                </div>
                <div>
                    <demo-input disabled value="" />
                    <div class="text-xs text-gray-600 mt-1">
                        Disabled
                    </div>
                </div>
                <div>
                    <demo-input value="">
                        <template #before>
                            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" /></svg>
                        </template>
                    </demo-input>
                    <div class="text-xs text-gray-600 mt-1">
                        With icon before
                    </div>
                </div>
                <div>
                    <demo-input value="">
                        <template #after>
                            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" /></svg>
                        </template>
                    </demo-input>
                    <div class="text-xs text-gray-600 mt-1">
                        With icon after
                    </div>
                </div>
            </div>
        </div>
        <div class="space-y-3">
            <h1 class="text-xl">
                Date and time pickers
            </h1>
            <div class="flex space-x-2">
                <div>
                    <demo-datepicker />
                    <div class="text-xs text-gray-600 mt-1">
                        Date only
                    </div>
                </div>
                <div>
                    <demo-timepicker />
                    <div class="text-xs text-gray-600 mt-1">
                        Time only
                    </div>
                </div>
                <div>
                    <demo-datetimepicker />
                    <div class="text-xs text-gray-600 mt-1">
                        Date and time
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'flatpickr/dist/flatpickr.css';

    import DemoButton from './demo/DemoButton.vue';
    import DemoInput from './demo/DemoInput.vue';
    import DemoDatepicker from './demo/DemoDatepicker.vue';
    import DemoDatetimepicker from './demo/DemoDatetimepicker.vue';
    import DemoTimepicker from './demo/DemoTimepicker.vue';

    export default {
        components: {
            DemoButton,
            DemoInput,
            DemoDatepicker,
            DemoDatetimepicker,
            DemoTimepicker,
        },
    };
</script>
