<template>
  <div class="about">
    <section id="aboutUs">
      <div class="w">
        <h2>关于我们</h2>
        <div>
          {{Myinformation}}
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { getMyinformation } from "@/api/Interface/about.js";
import { ref, reactive, toRefs, onMounted, onBeforeUpdate } from "vue";


let Myinformation=ref('')
onMounted(async () => {
  let data = await getMyinformation();
  Myinformation.value = data;
  console.log(Myinformation);
});
</script>
