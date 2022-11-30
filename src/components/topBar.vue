<script setup>
import { ref, onMounted } from "vue";

const isDark = ref(false);

onMounted(() => {
  // once mounted app check user default brouser settingsfor darkmode.
  // if darkmode is set as default on browser the app ploads in darkmode and save the setting in lcal storage for reference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    localStorage.setItem("Darktheme", true);
    isDark.value = true;
    darkToggle(true);
  }
  // if no user set schem. app checks local storage for setting on last visit
  if (localStorage.getItem("Darktheme") === "true") {
    isDark.value = true;
    darkToggle(true);
  } else {
    // if none app proceed on default light mode
    localStorage.setItem("Darktheme", isDark.value);
  }
});

// Toogles darkmode on and off.
// Darkmode settings are stored on local storage and fetched on subsequent visits
function darkToggle(val) {
  localStorage.setItem("Darktheme", val);
  isDark.value = val;
  document.documentElement.className = val === true ? "dark" : "";
}
</script>

<template>
  <!-- Tob bar component -->
  <div class="header d-flex justify-content-between w-100">
    <h1 class="py-2">TODO</h1>
    <button class="button m-0 p-0" @click.prevent="darkToggle(!isDark)">
      <img
        svg-inline
        v-if="!isDark"
        src="@/assets/images/icons/ICON-MOON.SVG"
        alt="my-logo"
      />
      <img
        svg-inline
        v-if="isDark"
        src="@/assets/images/icons/ICON-SUN.SVG"
        alt="my-logo"
      />
    </button>
  </div>
</template>
