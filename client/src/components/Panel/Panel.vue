<template>
  <v-container>
      <v-row>
        <v-col sm="9"></v-col>
        <v-col class="abs-cont" sm="3">
          <NewContent class="abs"></NewContent>
        </v-col>
      </v-row>
    <section>
      <v-col sm="4">
        <v-radio-group row defaultValue="all" >
            <v-radio :label="`Show All`" value='all' checked @click="filterView('all')" />
            <v-radio :label="`Videos Only`" @click="filterView('videos')" />
            <v-radio :label="`Texts Only`" @click="filterView('texts')" />
          </v-radio-group>
      <div class="course-list" v-if="loadedPanel.length > 0">
          <LearnCard
            v-for="item in loadedPanel"
            :key="item.title"
            :id="item.id"
            :url="item.url"
            :title="item.title"
            :category="item.category"
            :view="view"
          ></LearnCard>
      </div>
      <div v-else>
        <p class="no-results">There is no content at the moment.</p>
      </div>
      </v-col>
      <v-col sm="4">
        <textarea rows="5" placeholder="add multiple lines"></textarea>
      </v-col>
      <v-col sm="4">
          <Timer></Timer>
      </v-col>
    </section>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import LearnCard from "./LearnCard.vue";
import NewContent from "./NewContent.vue";
import Timer from "./Timer.vue";

export default {
  name: "Panel",
  components: {
    LearnCard,
    NewContent,
    Timer
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
    filterView(view) {
      if (view === "videos") {
        this.view = "videos";
      } else if (view === "texts") {
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

textarea {
  width: 75%;
  border: 1px solid gray;
}

.course-list {
  display: flex;
  flex-direction: column;
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
