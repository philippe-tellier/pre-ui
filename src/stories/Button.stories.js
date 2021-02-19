import PreButton from './Button.vue';

export default {
    title: 'Example/Button',
    component: PreButton,
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    //     size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    // },
};

export const Normal = () => ({
    components: { PreButton },
    template: '<pre-button class="w-full" color="white">Normal</pre-button>',
});
