<template>
  <v-container>
      <v-row>
        <v-col class="abs-cont" sm="3">
          <NewContent class="abs"></NewContent>
        </v-col>
        <v-col sm="6">
          <v-radio-group row defaultValue="all" >
            <v-radio :label="`Show All`" value="all" checked @click="filterView" />
            <v-radio :label="`Videos Only`" value="videos" @click="filterView" />
            <v-radio :label="`Texts Only`" value="texts" @click="filterView" />
          </v-radio-group>
        </v-col>
        <v-col sm="3"></v-col>
      </v-row>
    <section>
      <div class="course-list" v-if="loadedPanel.length > 0">
        <v-row>
          <LearnCard
            v-for="item in loadedPanel"
            :key="item.id"
            :id="item.id"
            :url="item.url"
            :title="item.title"
            :category="item.category"
            :view="item.view"
          ></LearnCard>
        </v-row>
      </div>
      <div v-else>
        <p class="no-results">There is no content at the moment.</p>
      </div>
    </section>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import LearnCard from "./LearnCard.vue";
import NewContent from "./NewContent.vue";

export default {
  name: "Panel",
  components: {
    LearnCard,
    NewContent
  },
  data() {
    return {
      view: "all",
    };
  },
  beforeCreate: function () {
    this.$store.dispatch("loadContent")
  },
  computed: {
        ...mapState(["loadedPanel"])
  },
  methods: {
    filterView(e) {
      if (e.target.value == "videos") {
        this.view = "videos";
      } else if (e.target.value == "texts") {
        this.view = "texts";
      } else this.view = "all";
    }
  }
};
</script>

<style>

.abs-cont {
  position: relative;
}

.abs {
  position: absolute;
}

.course-list {
  display: flex;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  justify-items: center;
  align-items: start;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.v-input--radio-group__input {
  justify-content: center;
}
</style>
