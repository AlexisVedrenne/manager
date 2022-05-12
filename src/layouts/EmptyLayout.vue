<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="height: 100%">
      <transition
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
        appear
        :duration="2000"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>
