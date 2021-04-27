<template>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
            <v-row>Add content</v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <form id="newContentForm" @submit.prevent="addContent">
            <div class="submit-content">
              <input
                type="text"
                placeholder="Name your content"
                id="title"
                required
                v-model="title"
              />
              <input
                type="text"
                placeholder="Paste URL"
                id="add"
                required
                v-model="url"
              />
              <select placeholder="Choose category" required v-model="category">
                <option disabled selected value="">
                  Choose category
                </option>
                <option value="videos">
                  Video
                </option>
                <option value="texts">
                  Text
                </option>
              </select>
              <v-btn type="submit" :disabled="!formIsValid">
                Add content
              </v-btn>
            </div>
          </form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
  name: "NewContent",
  data() {
    return {
      title: "",
      url: "",
      category: ""
    }
  },
  computed: {
    formIsValid() {
      return this.title !== "" &&
      this.url !== "" &&
      this.category !== ""
    }
  },
  methods: {
    addContent() {
      if (!this.formIsValid) {
        return
      }
      this.$store.dispatch("addContent", {
        title: this.title,
        url: this.url,
        category: this.category
      });
      document.getElementById("newContentForm").reset();
    }
  }
}
</script>


<style>
form {
  border-style: none;
  border-width: 1px;
  border-color: gray;
  border-radius: 10px;
  background-color: rgb(240, 240, 240);
  padding: 15px 20px;
}

form h3 {
  padding: auto 5px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(196, 196, 196);
}

.submit-content {
  display: flex;
  flex-direction: column;
}

</style>