import { defineAsyncComponent } from 'vue';

export function registerGlobalFunction (app) {
    app.component('auth-layout', defineAsyncComponent(() =>
        import('@/layouts/auth.vue')
    ));
    app.component('default-layout', defineAsyncComponent(() =>
        import("@/layouts/default.vue")
    ));
}