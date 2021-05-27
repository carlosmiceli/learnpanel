<template>
  <v-container> 
    <section>
      <v-col sm="12">
        <v-radio-group row defaultValue="all" >
          <v-radio :label="`Show All`" value='all' checked @click="filterView('all')" />
          <v-radio :label="`Youtube Videos Only`" @click="filterView('youtube')" />
          <v-radio :label="`Texts Only`" @click="filterView('texts')" />
        </v-radio-group>
        <div v-if="loadedPanel.length > 0">
          <div class="course-list" v-for="item in loadedPanel" :key="item.title">
            <LearnCard
              v-if="view === item.category || view === 'all'"
              :key="item.title"
              :id="item._id"
              :url="item.url"
              :image="item.image"
              :text="item.text"
              :videoId="item.videoId"
              :title="item.title"
              :category="item.category"
            ></LearnCard>
            <textarea
              v-if="view === item.category || view === 'all'"
              :id="`note-${item._id}`"
              class="notes-area" 
              v-model="item.notes"
              rows="10"
              placeholder="add multiple lines"
              @click="saveNote(item._id)" 
            />
          </div>
        </div>
        <div v-else>
          <p class="no-results">There is no content at the moment.</p>
        </div>
      </v-col>
    </section>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import LearnCard from "../Panel/LearnCard.vue";

export default {
  name: "Panel",
  components: {
    LearnCard
  },
  data() {
    return {
      view: "all",
      saving: -1
    };
  },
  computed: {
    ...mapState(["loadedPanel"])
  },
  mounted: function () {
    this.$store.dispatch("loadContent")
  },
  methods: {
    filterView(view) {
      if (view === "youtube") {
        this.view = view;
      } else if (view === "texts") {
        this.view = view;
      } else this.view = "all";
    },
    saveNote(id) {
      if (id !== this.saving) {

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
        
        this.saving = id
      } 
    }
  },
};
</script>

<style>

.course-list {
  width: 100%;
  display: flex;
  margin-bottom: 30px;
}

.notes-area {
  width: 100%;
  border: 1px solid gray;
  margin-right: 20px;
  margin-left: 20px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}

.v-input--radio-group__input {
  justify-content: center;
}
</style>