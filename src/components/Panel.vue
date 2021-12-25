<template>
  <div>
    <nav class="panel">
      <p class="panel-heading">
        Simulation-Settings
      </p>
      <p class="panel-tabs" ref="DUMBO">
        <a class="is-active">General</a>
        <a>Disease</a>
        <a>Population</a>
        <a>Regulations</a>
        <a>All</a>
      </p>
      <a class="panel-block">
          <span class="panel-icon config-descriptor">
            <i class="far fa-calendar-alt" aria-hidden="true"></i>
            Days to simulate:
          </span>
        <b-form-spinbutton class="config-selector" id="sb-inline" v-model="simDuration" inline></b-form-spinbutton>
      </a>
      <a class="panel-block">
          <span class="panel-icon config-descriptor" style="position: relative; left: 0">
            <i class="fas fa-users" aria-hidden="true"></i>
                      Population-size: {{ popSize }}
          </span>
        <!--          <label for="range-1">Population-size:</label>-->
        <b-form-input class="config-selector" id="range-1" v-model="popSize" type="range" min="100" max="100000"
                      step="100"></b-form-input>
      </a>
      <a class="panel-block">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-procedures" aria-hidden="true"></i>
            ICU-beds
          </span>
        <b-form-spinbutton class="config-selector" id="sb-inline" v-model="icuBeds" inline></b-form-spinbutton>
      </a>
      <a class="panel-block">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-head-side-mask" aria-hidden="true"></i>
          Mask mandate
          </span>
        <!--          <input type="checkbox" v-model="sdrChecked" style="position: fixed; right: 0"/>-->
        <b-form-checkbox class="config-selector" v-model="mdChecked" name="check-button" switch></b-form-checkbox>
      </a>
      <a class="panel-block" v-if="mdChecked">
          <span class="panel-icon config-descriptor">
            Mask mandate rate:
          </span>
      </a>
      <a class="panel-block">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-people-arrows">  </i>
            Social distancing regulations
          </span>
        <b-form-checkbox class="config-selector" v-model="sdrChecked" name="check-button" switch></b-form-checkbox>
      </a>


      <a class="panel-block">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-lungs-virus"></i>
            Severe course chance:
          </span>
      </a>

      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth" @click="runSim">
          Run simulation
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Panel",
  data() {
    return {
      icuBeds: 20,
      simDuration: 30,
      popSize: '25000',
      mdChecked: false,
      sdrChecked: false,
    }
  },
  methods: {
    async runSim() {
      await axios.get("http://localhost:8000/")
      .then(res => {
        console.log(res);
        return res})
      .catch(err => {console.log(err)})
    }
  }
}
</script>

<style scoped>

nav.panel {
  top: 0;
  right: 0;
  position: fixed;
  width: fit-content;
}

a.panel-block {
  position: relative;
  height: fit-content;
  width: auto;
}


.config-selector {
  position: relative;
  /*margin-left: 50px;*/
  height: fit-content;
  width: 150px;
  max-width: 150px;
  min-width: 150px;
  right: 5px;
}

.config-descriptor {
  position: relative;
  margin-right: 50px;
  width: fit-content;
  /*padding-right: 50px;*/
}
</style>