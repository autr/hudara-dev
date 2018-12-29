<template lang="pug">

  .pageFooter: .container
    .row
      .col-sm-4.col-xs-12
        prismic-rich-text(:field="document.left")
      .col-sm-4.col-xs-12
        prismic-rich-text(:field="document.center")
      .col-sm-4.col-xs-12
        p: strong Newsletter
        .newsletter
          span.input-wrapper
            input( placeholder="Email address")
          .button
            a Submit
</template>


<script>
import SiteButton from '../components/Button'
export default {
  name: 'SiteFooter',
  data () {
    return {
      document: {}
    }
  },
  components: {
    SiteButton
  },
  methods: {
    getName(slug) {
      while (slug.indexOf('-') !== -1) slug = slug.replace('-', ' ');
      return slug;
    },
    getFooter() {

    this.$prismic.client.query(
      this.$prismic.Predicates.at('document.type', 'footer'),
      { lang:  '*' }

    ).then((response) => {
      const document = response.results[0]
      this.document = document.data;
      console.log('Footer', this.document);
      // document contains the document content
    });

    }
  },
  created () {  
    this.getFooter()
  },
  beforeRouteUpdate (to, from, next) {
    this.getFooter()
    next()
  }
}
</script>

<style lang="scss">

@import "../assets/css/_variables";

.pageFooter {
  background-color: $brown;
  padding: 0em 0em;
  color: white;
  height: $footer-height;
  position: absolute;
  bottom: 0px;
  width: 100%;
  font-size: 16px;
  .container {
    padding-top: 2em;
  }
  p {
    padding-bottom: 0em!important;
  }
  a {
    color: white;
  }

  .button a {
    color: white;
  }

  // .newsletter {
  //   .input-wrapper {
  //     width: 70%;
  //   }
  //   .button {
  //     width: 30%;
  //     font-size: 16px;
  //     display: inline-block;
  //     a {
  //       text-align: center;
  //       padding: 0em;
  //     }
  //   }
  // }

  .input-wrapper {
    display: inline-block;
    border-bottom: 2px solid white;
    width: 100%;
    box-sizing: border-box;
    input {
      margin: 0;
      display: block;
      -webkit-appearance: none;
      padding: 1em 0em;
      font-size: 16px;
      background: none;
      border: none;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      color: white;
      &::placeholder {
        color: $lightgrey;
        font-family: 'GT Pressura Mono', sans-serif;
      }

    }
  }
}
</style>
