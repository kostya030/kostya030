<template>
  <div id="app">
    <input type="text" name="search" v-model="search" /><br />
    <table class="table table-dark">
      <tr v-for="(item, i) in students" v-bind:key="item._id">
        <template v-if="item._id == editId">
          <td><input type="text" v-model="item.name" /></td>
          <td><input type="checkbox" v-model="item.isDonePr" value="item.isDonePr" /></td>
          <td>{{ item.group }}</td>
          <td><input type="button" v-on:click="update2(editId)" value="Змінити" /></td>
        </template>
        <template v-else>
          <td>
            <router-link v-bind:to="'/student-info/' + item._id">
              {{ item.name }}
            </router-link>
          </td>
          <td><input type="checkbox" v-model="item.isDonePr" /></td>
          <td>{{ item.group }}</td>
          <td><a href="#" @click="deleteStudent(item._id, i)">Видалити</a></td>
          <td class="class1234">
            <a href="#" v-on:click.prevent="rplForm(item._id)">Змінити</a>
          </td>
        </template>
      </tr>
    </table>

    <input v-model="student.name" />
    <input type="checkbox" v-model="student.isDonePr" />
    <select v-model="student.group">
      <option value="RPZ 19 1/9">RPZ 19 1/9</option>
      <option value="RPZ 19 2/9">RPZ 19 2/9</option>
    </select>
    <button @click="addStudent()">Add student</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      students: [],
      editId: 0,
      search: "",
      student: { name: "", isDonePr: false, group: "" },
    };
  },
  mounted: function () {
    axios.get("http://34.82.81.113:3000/students").then((response) => {
      console.log(response.data);
      this.students = response.data;
    });
  },
  methods: {
    rplForm: function (id) {
      this.editId = id;
    },

    update2: function (id) {
      console.log("123");
      let foundStudent = this.students.find((element) => {
        return element._id == id;
      });
      axios
        .put("http://34.82.81.113:3000/students/" + id, {
          name: foundStudent.name,
          group: foundStudent.group,
          isDonePr: false,
        })
        .then((response) => {
          console.log(response.data);
        });
      this.editId = 0;
    },

    deleteStudent(studId, i) {
      axios.delete(`http://34.82.81.113:3000/students/${studId}`).then((data) => {
        console.log(studId);
        this.students.splice(i, 1);
      });
    },
    addStudent() {
      axios.post("http://34.82.81.113:3000/students", this.student).then((data) => {
        console.log(data);
        this.students.push(data.data);
      });
    },
  },
};
</script>

<style scoped></style>
