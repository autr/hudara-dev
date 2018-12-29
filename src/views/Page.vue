<!-- Create file src/views/Page.vue -->

<template lang="pug">
.page

  

  section(v-for='section, i in document')


    .banner.paddingBottom(
      v-bind:style='{ backgroundColor: section.primary.background }'
      v-if='section.slice_type === "banner"') 

      .container


        page-header( v-if='i === 0' :title='title' :languages='languages' :currentLang='currentLang')

        .row 
          .col-xs-12(

            v-for='col, ii in section.items' 
            v-bind:class="['col-sm-' + col.width, section.primary.iframe.url ? 'bg' : 'nobg']")
              prismic-rich-text.text(
                :field="col.column"
              )
              site-button(:field='col.button')
        .background
          img(
            v-if='section.primary.image.url'
            :src='section.primary.image.url'
            :alt='section.primary.image.alt')
      .iframe
        .overlay(
          v-on:click='openIframe(section.primary.iframe.url)')
        iframe(
          scrolling="no"
          v-if='section.primary.iframe.url'
          :src='section.primary.iframe.url')


    .content.container.paddingBottom(v-if='section.slice_type === "row"') 


      page-header( v-if='i === 0' :title='title' :languages='languages' :currentLang='currentLang')

      .row
        .col-xs-12(
          v-for='col, ii in section.items' 
          v-bind:class="['col-sm-' + col.width]")
            prismic-rich-text.text(:field="col.column")
            site-button(v-if='col.button.length > 0'  :field='col.button' buttonType='orange')

</template>

<script>
import Vue from 'vue'
import SiteButton from '../components/Button'
import PageHeader from '../components/PageHeader'
import GoCardless from 'gocardless-api'

const gocardless = new GoCardless('sandbox_SjzZ9W_UOZWHQUESIEZIw9GbkoGd9Jk_0Y3VBoKO')
const languagesDefault = {
        'en' : {},
        'de' : {},
        'ar' : {},
      };

export default {
  name: 'Page',
  data () {
    return {
      title: '',
      currentLang: '',
      document: {},
      languages: languagesDefault
    }
  },
  components: {
    SiteButton,
    PageHeader
  },
  methods: { 
    openIframe(url) {
      window.open(url);
    },
    setLang(lang) {

      if (lang.lang === 'de-de') this.languages.de = lang;
      else if (lang.lang === 'en-gb') this.languages.en = lang;
      else if (lang.lang === 'ar') this.languages.ar = lang;
    },

    getContent (uid) {
      this.$prismic.client.getByUID('page', uid)
        .then((document) => {
          if (document) {
            // console.log('ALTS', document);

            this.languages = languagesDefault;

            this.setLang(document);

            document.alternate_languages.forEach( (lang) => {

              this.setLang(lang);
              // const i = lang.lang.lastIndexOf('-');
              // lang.shorthand = (i !== -1) ? lang.lang.substring(0, i) : lang.lang;
            });
            this.currentLang = document.lang;
            this.document = document.data.body;
            this.title = document.data.title[0].text;
            // console.log('Page', document.data);
            // console.log('Languages', this.languages);

          } else {
            console.log('No Page');
          }
        })
    }
  },
  created () {  
    // gocardless.request({
    //     method: 'GET',
    //     resource: 'customers',
    //     query: {
    //         limit: 10
    //     }
    // }).then( customers => {
    //   console.log('customers', customers);
    // }).catch( err => {
    //   console.log('gocardless err', err)
    // }); 
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>

<style lang="scss">

@import "../assets/css/_variables";
.banner {
  .bg {
    background: white;
    // border: 4px solid $orange;
    padding-top: 2em;
    padding-bottom: 0px;
    box-sizing: border-box;
    z-index: 10;
    position: relative;
    // box-shadow: 0px 0px 20px $lightgrey;
    p {
      padding-bottom: 0px;
    }
    .button {
      border-color: $orange;
      a {
        color: $orange;
      }
    }
  }
  .iframe {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    min-height: 600px;
    .overlay {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 1;
      cursor: pointer;
    }
    iframe {
      outline: 0;
      border: none;
      // pointer-events: none;
      // z-index: 6;
      width: 100%;
      min-height: 600px;
    }
  }
}
</style>