<template>
  <div class="student">
    <div class="student1"><img :src="student.photo" alt="" /></div>
    <div class="student2">
      <div>Ім'я: {{ student.name }}</div>
      <div>Группа: {{ student.group }}</div>
      <div>
        {{ isDonePrOfStudent }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    id: "",
  },
  data() {
    return {
      student: {},
    };
  },
  mounted: function () {
    axios.get("http://34.82.81.113:3000/students/" + this.id).then((response) => {
      this.student = response.data;
    });
  },
  computed: {
    // a computed getter
    isDonePrOfStudent() {
      return this.student.isDonePr ? "здана" : "не здана";
    },
  },
};
</script>
<style scoped></style>
