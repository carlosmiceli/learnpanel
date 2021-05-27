<template>
  <v-container>
    <section>
      <v-col sm="4">
      <div v-if="loadedPanel.length > 0">
        <div class="changeCard">
          <p @click="previousCard()">Previous</p>
          <p @click="nextCard()">Next</p>
        </div>
        <LearnCard
          :key="loadedPanel[0].title"
          :id="loadedPanel[0]._id"
          :url="loadedPanel[0].url"
          :title="loadedPanel[0].title"
          :image="loadedPanel[0].image"
          :text="loadedPanel[0].text"
          :videoId="loadedPanel[0].videoId"
          :category="loadedPanel[0].category"
        ></LearnCard>
      </div>
      <div v-else>
        <p class="no-results">There is no content at the moment.</p>
      </div>
      </v-col>
      <v-col sm="4">
        <Timer></Timer>
        <textarea 
          v-if="loadedPanel.length > 0" 
          v-model="loadedPanel[0].notes" 
          rows="10" 
          placeholder="add multiple lines"
          :id="`note-${loadedPanel[0]._id}`"
          @click="saveNote(loadedPanel[0]._id)" 
        />
      </v-col>
      <v-col class="abs-cont" sm="4">
        <NewContent class="abs"></NewContent>
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
  mounted: function () {
    this.$store.dispatch("loadContent")
  },
  computed: {
    ...mapState(["loadedPanel"])
  },
  methods: {
    saveNote(id) {
      let refreshValue = setInterval(() => {
        this.$store.dispatch("updateNote", {
          id,
          note: document.getElementById(`note-${id}`).value
        })
      }, 10000)
      
      window.addEventListener('click', function(e) {
        if (!document.getElementById(`note-${id}`).contains(e.target)) {
          clearInterval(refreshValue)
        }
      }) 
    },
    previousCard() {
      this.$store.dispatch("previousCard")
    },
    nextCard() {
      this.$store.dispatch("nextCard")
    },
  },
};
</script>

<style>

.changeCard {
  display: flex;
  justify-content: space-evenly;
}

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
</style>
