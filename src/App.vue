<template>
    <div id="app" class="p-8 space-y-8 h-screen">
        <div class="space-y-3">
            <h1 class="text-xl">
                Buttons
            </h1>
            <div class="flex space-x-2">
                <div>
                    <demo-button color="white">
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
    </div>
</template>

<script>
    import DemoButton from './demo/DemoButton.vue';

    export default {
        components: {
            DemoButton,
        },
    };
</script>
