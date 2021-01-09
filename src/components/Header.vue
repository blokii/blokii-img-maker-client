<template>
  <div>
    <q-header class="bg-black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          class="lt-md visible"
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          <q-btn
            to="/"
            flat
            size="large"
            class="visible text-medium text-capitalize comfortaa"
            :ripple="false"
          >
            <q-avatar square size="64">
              <q-img src="dossifi_logo_sq.png" />
            </q-avatar>
            <span class="q-ml-sm q-mt-sm text-h5">
              Blokii Image Maker
            </span>
          </q-btn>
        </q-toolbar-title>
        <div class="gt-md visible comfortaa">
          <q-btn stretch flat label="Home" icon="fad fa-home" to="/" />
          <q-btn stretch flat label="About" icon="fad fa-info" to="/about" />
          <q-btn stretch flat label="Help" icon="fad fa-question" to="/help" />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      :breakpoint="500"
      bordered
      dark
      content-class="bg-black"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item :active="checkActive('/home')" clickable v-ripple to="/home">
            <q-item-section avatar>
              <q-icon name="fad fa-home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-item
            :active="checkActive('/about')"
            clickable
            v-ripple
            to="/about"
          >
            <q-item-section avatar>
              <q-icon name="fad fa-info-circle" />
            </q-item-section>

            <q-item-section>
              About
            </q-item-section>
          </q-item>
          <q-item :active="checkActive('/help')" clickable v-ripple to="/help">
            <q-item-section avatar>
              <q-icon name="fad fa-question-circle" />
            </q-item-section>

            <q-item-section>
              Help
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    checkActive(currentLink) {
      return this.$route.path === currentLink;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Comfortaa&display=swap");

.arvo {
  font-family: "Arvo";
}
.comfortaa {
  font-family: "Comfortaa";
}
</style>
