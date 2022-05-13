<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="height: 100%">
      <transition
        :enter-active-class="
          this.$route.fullPath.includes('/starting')
            ? 'animated slideInLeft'
            : 'animated slideInDown'
        "
        :leave-active-class="
          this.$route.name === 'Détail'
            ? 'animated slideOutLeft'
            : 'animated slideOutDown'
        "
        appear
        :duration="2000"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>
