<template>
  <div>
    <div>
      <apexchart ref="chart-s" title="Agents susceptible" width="750" type="line" :options="options" :series="susceptible_series"></apexchart>
    </div>
    <div>
      <apexchart ref="chart-i" width="750" type="line" :options="options" :series="infected_series"></apexchart>
    </div>
    <div>
      <apexchart ref="chart-r" width="750" type="line" :options="options" :series="removed_series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$root.$refs.A = this;
  },
  data: function () {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
          zoom: {
            enabled: false,
          }
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: Array.from({length: this.$store.getters.get_agents_susceptible.length}, (_, i) => i + 1)
        },
        yaxis: {
          max: this.$store.getters.get_agents_susceptible[0] + this.$store.getters.get_agents_infected[0] + this.$store.getters.get_agents_removed[0],
          min: 0,
        }
      },
      susceptible_series: [{
        name: 'series-susceptible',
        data: this.$store.getters.get_agents_susceptible
      }],
      infected_series: [{
        name: 'series-infected',
        data: this.$store.getters.get_agents_infected
      }],
      removed_series: [{
        name: 'series-removed',
        data: this.$store.getters.get_agents_removed
      }]
    }
  },
  name: "Plot",
  methods: {
    updateSeries() {
      this.options = {
        xaxis: {
          categories: Array.from({length: this.$store.getters.get_agents_susceptible.length}, (_, i) => i + 1)
        },
        yaxis: {
          max: this.$store.getters.get_agents_susceptible[0] + this.$store.getters.get_agents_infected[0] + this.$store.getters.get_agents_removed[0],
          min: 0,
        }
      }
      this.susceptible_series = [{
        name: 'series-susceptible',
        data: this.$store.getters.get_agents_susceptible
      }],
      this.infected_series = [{
        name: 'series-infected',
        data: this.$store.getters.get_agents_infected
      }],
      this.removed_series = [{
        name: 'series-removed',
        data: this.$store.getters.get_agents_removed
      }]
    },
  },
}
</script>

<style scoped>

</style>