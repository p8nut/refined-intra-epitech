<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar app color="indigo" dark>
        <v-toolbar-title>Options</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-card
          ><v-card-text>
            <v-autocomplete
              label="locations"
              v-model="options.locations"
              :items="locations"
              item-text="title"
              :loading="promises.locations"
              :error="promises.locations"
              multiple
              return-object
              clearable
            ></v-autocomplete>
            <v-autocomplete
              label="courses"
              v-model="options.courses"
              :items="courses"
              item-text="title"
              :loading="promises.courses"
              :error="promises.courses"
              multiple
              return-object
              clearable
              :disabled="options.locations.length === 0"
            ></v-autocomplete>
            <v-checkbox
              v-model="options.nolimit"
              label="Unlimit trombi profil loading"
            ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="saveOptions">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-main>
      <v-footer color="indigo" app>
        <span class="white--text">&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "App",
  components: {},
  data: () => ({
    promises: {},
    datas: { locations: [], courses: [] },
    options: { locations: [], courses: [], nolimit: false },
  }),
  methods: {
    saveOptions() {
      console.log("saveOptions");
      localStorage.setItem("options", JSON.stringify(this.options));
    },
    loadOptions() {
      console.log("loadOptions");
      const options = JSON.parse(localStorage.getItem("options")) || {};
      this.options = {
        locations: options.locations || [],
        courses: options.courses || [],
        nolimit: options.nolimit || false,
      };
      return this.options;
    },
    saveData() {
      console.log("saveData");
      localStorage.setItem("datas", JSON.stringify(this.datas));
    },
    loadData() {
      console.log("loadData");
      const datas = JSON.parse(localStorage.getItem("datas")) || {};
      this.datas = {
        locations: datas.locations || [],
        courses: datas.courses || [],
      };
      return this.datas;
    },
    async updateLocations() {
      this.promises.locations = true;
      const data = (
        await Axios.get("https://intra.epitech.eu/user/filter/location", {
          params: { format: "json" },
        })
      ).data.map((l) => ({ code: l.code, title: l.title }));
      this.datas.locations = data;
      this.promises.locations = false;
      return data;
    },
    async updateCourses() {
      if (this.options.locations.length === 0) return [];
      this.promises.courses = true;
      const data = (
        await Axios.get("https://intra.epitech.eu/user/filter/course", {
          params: {
            format: "json",
            location: this.options.locations.map((l) => l.code).join("|"),
            year: 2020,
          },
        })
      ).data.map((l) => ({ code: l.code, title: l.title }));
      this.datas.courses = data;
      this.promises.courses = false;
      return data;
    },
  },
  computed: {
    locations() {
      return [...this.datas.locations, ...this.options.locations]
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();
    },
    courses() {
      return [...this.datas.courses, ...this.options.courses]
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();
    },
  },
  async created() {
    this.loadData();
    this.loadOptions();
    try {
      await this.updateLocations();
      await this.updateCourses();
    } catch (e) {
      console.error(e);
    }
    this.saveData();
  },
};
</script>

<style>
html {
  width: 400px;
}
</style>
