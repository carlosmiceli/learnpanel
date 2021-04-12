<template>
  <v-card class="LearnCard" v-show="view">
    <h5>{{ title }}</h5>
    <div>
      <img
        :id="id"
        style="max-width:100%; max-height:100%;"
      />
      <!-- <a-popconfirm
        placement="bottom"
        ok-text="Yes"
        cancel-text="No"
        @confirm="removeCourse(id)"
      > -->
        <template slot="title">
          <p>Are you sure you want to remove this course?</p>
        </template>
        <v-btn>Remove</v-btn>
      <!-- </a-popconfirm> -->
    </div>
  </v-card>
</template>

<script>
// const metascraper = require("metascraper");

// const axios = require("axios");

export default {
  name: "LearnCard",
  props: ["id", "title", "url", "category", "view"],
  methods: {
    //https://blog.kevinchisholm.com/javascript/node-js/scrape-web-page-return-metadata-json/ -> learn this if request error 429 becomes too common.
    imagePreview() {
      console.log(this);
      // fetch(
      //   "http://api.linkpreview.net/?key=4c72a57851b45f9257408c2f33c7e688&q=" +
      //     this.url
      // )
      //   .then(response => {
      //     console.log("2", response);
      //     if (response.status == 200) {
      //       response.json().then(data => {
      //         document.querySelector("#" + this.id).src = data.image;
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

      // (
      // axios(this.url)
      //   .then(response => {
      //     console.log(response);
      //     metascraper(response);
      //   })
      //   .then(metadata => {
      //     console.log(metadata);
      //     document.querySelector("#" + this.id).src = metadata.image;
      //   })
      //   .catch(err => console.log(err));
    },
    // popupWindow() {
    //   const y = window.top.outerHeight / 2 + window.top.screenY - 800 / 2;
    //   const x = window.top.outerWidth / 2 + window.top.screenX - 800 / 2;
    //   return window.open(
    //     this.url,
    //     this.title,
    //     `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${800}, height=${550}, top=${y +
    //       80}, left=${x}`
    //   );
    // },
    // removeCourse(courseId) {
    //   this.$store.dispatch("removeCourse", courseId);
    // }
  },
  // mounted() {
  //   this.imagePreview();
  // }
};
</script>

<style>
.LearnCard {
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
}
</style>
