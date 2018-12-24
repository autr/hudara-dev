<!-- Create file src/views/Page.vue -->

<template lang="pug">
.wrapper
  h1.title
    | {{ $prismic.richTextAsPlain(fields.title) }}
  ul
    li(v-for='lang in alternate_languages')
      router-link(:to='`/${lang.shorthand}/${lang.uid}`') {{lang.shorthand}}
  prismic-rich-text(:field="fields.description" class="description")
  .cta-wrapper
    prismic-link.cta(:field='fields.ctaLink')
      | {{ $prismic.richTextAsPlain(fields.ctaText) }}
  .icon-wrapper: prismic-image( :field="fields.icon" class="icon")
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Page',
  data () {
    return {
      documentId: '',
      alternate_languages: '',
      fields: {
        title: null
      }
    }
  },
  methods: {
    getContent (uid) {

      this.$prismic.client.getByUID('page', uid)
        .then((document) => {
          // console.log(document.lang, document.alternate_languages);
          if (document) {
            this.alternate_languages = document.alternate_languages;
            this.alternate_languages.forEach( (lang) => {
              const i = lang.lang.lastIndexOf('-');
              lang.shorthand = (i !== -1) ? lang.lang.substring(0, i) : lang.lang;
            });
            this.documentId = document.id;
            this.fields.title = document.data.title;
          } else {
            // this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
  created () {  
    console.log('CREATED');
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>

<style>
.wrapper {
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 10px;
  font-family: Avenir, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.title {
  font-size: 32px;
}

.description {
  margin-top: 40px;
}

.description h2 {
  font-size: 24px;
}

.description h2:not(:first-child) {
  margin-top: 20px;
}

.description p {
  line-height: 1.5;
}

.description p:not(:first-child) {
  margin-top: 10px;
}

.description a {
  color: #404e9f;
}

.description a:hover {
  text-decoration: underline;
}

.cta-wrapper {
  margin-top: 40px;
}

.cta {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  background-color: #404e9f;
  color: white;
}

.icon-wrapper {
  margin-top: 40px;
}

.icon {
  max-width: 100%;
}
</style>