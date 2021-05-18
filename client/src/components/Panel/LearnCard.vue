<template>
  <v-card class="LearnCard" v-show="view === 'all' || view === category">
    <h5>{{ title }}</h5>
    <div>
      <div v-if="category === 'videos'">
        <iframe
          width="100%"
          :src="url"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </div>
      <div v-if="category === 'texts'">
        <img
          :id="id"
          @click="popupWindow()"
          src="https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg"
        />
      </div>
      <v-dialog
        v-model="dialog"
        width="300"
      >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Remove
        </v-btn>
      </template>
          <p>Are you sure you want to remove this course?</p>
          <v-btn @click="removeContent(), dialog = false">Yes, remove</v-btn>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>

export default {
  name: "LearnCard",
  props: ["id", "title", "url", "category", "view"],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
  //imagePreview() {

  // },
    popupWindow() {
      const y = window.top.outerHeight / 2 + window.top.screenY - 800 / 2;
      const x = window.top.outerWidth / 2 - window.top.screenX - 800;
      return window.open(
        this.url,
        this.title,
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${800}, height=${550}, top=${y +
          80}, left=${x}`
      );
    },
    removeContent() {
      this.$store.dispatch("removeContent", this.id);
    }
  },
  // created() {
  //   this.imagePreview();
  // }
};
</script>

<style>
.LearnCard {
  width: 100%;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: hsla(0, 0%, 52.67%, 1);
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: hsla(0, 0%, 52.67%, 1);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: hsla(0, 0%, 52.67%, 1);
  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: hsla(0, 0%, 52.67%, 1);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: hsla(208, 100%, 94.42%, 1);
  display: flex;
  flex-direction: column;
}

.LearnCard img {
  max-width: 100%;
  max-height: 100%;
}

</style>
