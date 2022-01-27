<template>
  <div>
    <nav class="panel">
      <p class="panel-heading">Simulation-Settings</p>
      <p class="panel-tabs">
        <a id="generalTab" v-on:click="changeTab($event)" class="is-active">General</a>
        <a id="diseaseTab" v-on:click="changeTab($event)">Disease</a>
        <a id="populationTab" v-on:click="changeTab($event)">Population</a>
        <a id="regulationsTab" v-on:click="changeTab($event)">Regulations</a>
        <a id="allTab" v-on:click="changeTab($event)">All</a>
      </p>


      <a class="panel-block" v-if="selectedTab==='populationTab' || selectedTab==='allTab'">
          <span id="avgFriends" class="panel-icon config-descriptor" style="position: relative; left: 0">
            <i class="fas fa-user-friends" aria-hidden="true"></i>
            Average friends
          </span>
        <b-popover target="avgFriends" triggers="hover" placement="right">
          <template #title>Average friends</template>
          <p>The <b>average number of friends and acquaintances an agent has</b> in the multi-agent system.
            The number of friends is normally distributed.
            An agent only has contact with his circle of friends and acquaintances, so in this simulation diseases can
            only be transmitted in this way.
          </p>
        </b-popover>
        <b-form-spinbutton class="config-selector" v-model="formData.avgFriends" number type="range"
                           min="2" max="15" step="1">
        </b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='populationTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor" style="position: relative; left: 0">
            <i class="fas fa-handshake" aria-hidden="true"></i>
            Contact probability
          </span>
        <b-form-spinbutton class="config-selector" id="range-1" v-model="formData.contactProb" number type="range"
                           min="0.05" max="1" step="0.05">
        </b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='generalTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor">
            <i class="far fa-calendar-alt" aria-hidden="true"></i>
            Days to simulate
          </span>
        <b-form-spinbutton class="config-selector" id="sb-inline" v-model="formData.simDuration"></b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='populationTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-procedures" aria-hidden="true"></i>
            ICU-beds
          </span>
        <b-form-spinbutton class="config-selector" id="sb-inline" v-model="formData.icuBeds"
                           max="150"></b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='diseaseTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-virus" aria-hidden="true"></i>
            Infection-risk
          </span>
        <b-form-spinbutton class="config-selector" id="sb-inline" v-model="formData.infectionRisk" step="0.01"
                           min="0.01" max="1"></b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='regulationsTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-head-side-mask" aria-hidden="true"></i>
            Mask mandate
          </span>
        <b-form-checkbox class="config-selector" v-model="formData.mMChecked" name="check-button" switch></b-form-checkbox>
      </a>


      <a class="panel-block" v-if="formData.mMChecked && (selectedTab==='regulationsTab' || selectedTab==='allTab')">
        <span id="maskMandateRate" class="panel-icon config-descriptor">
          <i class="fas fa-head-side-mask" aria-hidden="true" style="visibility: hidden"></i>
          Incidence limit
        </span>
        <b-popover target="maskMandateRate" triggers="hover" placement="right">
          <template #title>Incidence limit</template>
          <p>The 7-day incidence above which it is mandatory to wear a medical mouth and nose covering.</p>
        </b-popover>
        <b-form-spinbutton class="config-selector" v-model="formData.mmIncidenceLimit" number type="range"
                           min="5" max="150" step="5">
        </b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='diseaseTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor">
<!--            <i class="mdi mdi-crowd" aria-hidden="true"></i>-->
            <i class="fab fa-sourcetree"></i>
            Patients zero
          </span>
        <b-form-spinbutton class="config-selector" id="sb-inline" v-model="formData.patientsZero" min="1"
                           max="20" step="1"></b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='populationTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor" style="position: relative; left: 0">
            <i class="fas fa-users" aria-hidden="true"></i>
            Population-size: {{ parseInt(formData.popSize, 10) }}
          </span>
        <b-form-input class="config-selector" id="range-1" v-model="formData.popSize" number type="range" min="10"
                      max="300" step="10"></b-form-input>
      </a>


      <a class="panel-block" v-if="selectedTab==='diseaseTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-lungs-virus"></i>
            Severe course chance
          </span>
        <b-form-spinbutton class="config-selector" id="sb-inline" v-model="formData.severeCourseChance" min="0.01"
                           max="0.3" step="0.01"></b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='regulationsTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-people-arrows">  </i>
            Social distancing regulations
          </span>
        <b-form-checkbox class="config-selector" v-model="formData.sdrChecked" name="check-button" switch></b-form-checkbox>
      </a>


      <a class="panel-block" v-if="formData.sdrChecked && (selectedTab==='regulationsTab' || selectedTab==='allTab')">
        <span id="socialDistancingRate" class="panel-icon config-descriptor">
          <i class="fas fa-people-arrows" aria-hidden="true" style="visibility: hidden"></i>
          Incidence limit
        </span>
        <b-popover target="socialDistancingRate" triggers="hover" placement="right">
          <template #title>Incidence limit</template>
          <p>The 7-day incidence above which social distancing laws are enforced.</p>
        </b-popover>
        <b-form-spinbutton class="config-selector" v-model="formData.sdrIncidenceLimit" number type="range"
                           min="5" max="150" step="5">
        </b-form-spinbutton>
      </a>


      <a class="panel-block" v-if="selectedTab==='diseaseTab' || selectedTab==='allTab'">
          <span class="panel-icon config-descriptor">
            <i class="fas fa-head-side-cough"></i>
            Time symptomatic
          </span>
        <b-form-spinbutton class="config-selector" id="sb-inline" v-model="formData.timeSymptomatic" min="1"
                           max="14" step="1"></b-form-spinbutton>
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
      formData: {
        avgFriends: 6,
        contactProb: 0.2,
        icuBeds: 20,
        infectionRisk: 0.1,
        mMChecked: false,
        mmIncidenceLimit: 50,
        patientsZero: 1,
        popSize: 100,
        sdrChecked: false,
        sdrIncidenceLimit: 50,
        severeCourseChance: 0.1,
        simDuration: 30,
        timeSymptomatic: 10,
      },
      selectedTab: "generalTab",
      result: 0,
    }
  },
  methods: {
    async runSim() {
      const formData = new FormData();
      formData.append('agent_number', this.formData.popSize);
      formData.append('avg_friends', this.formData.avgFriends);
      formData.append('contact_prob', this.formData.contactProb);
      formData.append('icu_beds', this.formData.icuBeds);
      formData.append('infection_risk', this.formData.infectionRisk);
      formData.append('mm_checked', this.formData.mMChecked);
      formData.append('mm_incidence_limit', this.formData.mmIncidenceLimit)
      formData.append('patients_zero', this.formData.patientsZero);
      formData.append('sdr_checked', this.formData.sdrChecked);
      formData.append('sdr_incidence_limit', this.formData.sdrIncidenceLimit)
      formData.append('severe_course_chance', this.formData.severeCourseChance);
      formData.append('sim_duration', this.formData.simDuration);
      formData.append('time_symptomatic', this.formData.timeSymptomatic);
      parseInt(this.formData.popSize)
      await axios.post("http://localhost:8000/", formData)
          .then(res => {
            this.$store.commit("reset_stats");
            res.data.forEach(result =>
              this.$store.commit("push_round_result", result)
            ),
            this.$root.$refs.A.updateSeries();
          })
          .catch(err => {
            console.log(err)
          })
    },
    changeTab(event) {
      let targetID = event.currentTarget.id;
      this.selectedTab = targetID;
      var tabs = [...document.querySelectorAll(".panel-tabs a")];
      tabs.forEach((tab) => {
        if (tab && tab.classList.contains("is-active")) {
          tab.classList.remove("is-active");
        }
      });
      document.querySelector("#".concat(targetID)).classList.add("is-active");
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
  display: flex;
  margin-left: auto;
  height: fit-content;
  max-width: 150px;
  min-width: 150px;
  user-select: none;
}

.config-descriptor {
  display: flex;
  width: fit-content;
  margin-right: auto;
  padding-right: 50px;
  white-space: nowrap;
  user-select: none;
}

.config-descriptor > *:first-child {
  margin-right: 10px;
}

nav.panel {
  min-width: 450px;
}
</style>