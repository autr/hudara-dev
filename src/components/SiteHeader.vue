<template lang="pug">

.pageHeader( v-bind:class="{ 'is-active' : isActive }" )
  button.hamburger.hamburger--squeeze( v-bind:class="{ 'is-active' : isActive }" v-on:click='onClick')
    span.hamburger-box
      span.hamburger-inner
  .top.container
    router-link.logo(:to='"/"')
      prismic-rich-text.text(:field="document.title")
      prismic-image( :field="document.logo")
    .buttons
      .buttonWrapper(v-for='button in buttons')
        site-button(:field='button.link')

  nav: .container
    .group(v-for='group in linkGroups') 
      .text(v-if='group.primary.dropdown_title') 
        prismic-rich-text(:field="group.primary.dropdown_title")
      ul
        li(v-for='item in group.items'  v-on:click='isActive = false') 
          router-link(:to='`/${item.link.slug}`') {{getName(item.link.slug)}}
</template>

<script>
import SiteButton from '../components/Button'
export default {
  name: 'SiteHeader',
  data () {
    return {
      document: {},
      linkGroups: [],
      buttons: [],
      isActive: false,
      currentLanguage: 'en-gb'
    }
  },
  components: {
    SiteButton
  },
  methods: {
    onClick(e) {
      // console.log(e, 'click');
      // alert('hi');
      this.isActive = !this.isActive;
      console.log(this.isActive);
    },
    getName(slug) {
      while (slug.indexOf('-') !== -1) slug = slug.replace('-', ' ');
      return slug;
    },
    newLanguage(lang) {
      console.log('NEW LANGUAGE', lang);
      if (this.currentLanguage !== lang) {
        this.currentLanguage = lang;
        this.getNavigation();
      }
    },
    getNavigation(lang) {
      console.log('get Navigation');
    this.$prismic.client.query(
      this.$prismic.Predicates.at('document.type', 'header'),
      { lang:  this.currentLanguage }

    ).then((response) => {
      const document = response.results[0]
      // console.log('Header', document.data);
      if (document) {
        this.document = document.data;
        this.linkGroups = this.document.body;
        this.buttons = document.data.buttons;
      } else {
        console.log('Header', 'NO DOCUMENT');
      }
      // console.log('Header', document);
      // document contains the document content
    });

      // this.$prismic.client.getSingle('Navigation')
      //   .then((document) => {
      //     console.log('GET SINGLE', document);
      //     if (document) {
      //       console.log('woooo', document);
      //     } else {
      //       // this.$router.push({ name: 'not-found' })
      //     }
      //   }).catch( (err) => {
      //     console.log(err);
      //   });
    }
  },
  created () {  
    this.getNavigation();
    this.$eventHub.$on('new-language', this.newLanguage);
  },
  beforeRouteUpdate (to, from, next) {
    this.getNavigation()
    next()
  }
}
</script>

<style lang="scss">

@import "../assets/css/_variables";
@import "../assets/css/_hamburgers";
.pageHeader {
  background-color: $orange;
  position: relative;
  color: white;
  .top {
    padding: 2em 0em;
  }
  a {
    color: white;
  }
  .logo {
    h1 {
      position: absolute;
      left: -9999px;
      top: -9999px;
      opacity: 0;
    }
    img {
      width: 400px;
      padding-left: 0.8em;
    }
  }

    .buttons {
      position: absolute;
      right: 0em;
      top: 2em;
      .buttonWrapper {
        display: inline-block;
        .button {
          margin: 0;
          margin-left: 0.5em;
        }
      }
    }

  nav {
    background-color: $brown;
    padding: 1em 0em;
    color: white;
    .text, .text * {
      font-size: $font-size-base;
      font-weight: 400;
      padding: 0;
      margin: 0;
      display: inline-block;
    }
    .group, .text, ul {
      display: inline-block;
    }
    .text {
      padding-right: 2em;
    }
    a {
      margin-right: 2em;
      padding: 0.4em 0em;
      color: white;
      text-transform: capitalize;
      font-weight: 600;
      &.router-link-active {
        border-bottom: 2px solid white;
      }
    }
  }
  .hamburger {
    display: none;
  }
}

@media only screen and (max-width: 768px) {

  .pageFooter {
    height: inherit!important;
    position: relative!important;
  }

  .page {
    margin-top: 88px;
    padding-bottom: 0px!important;
  }
  .languages {
    display: none;
  }
  .pageHeader {

    // &:before {
    //   content: "";
    //   display: block;
    //   height: 2em;
    //   background: $brown;
    //   width: 100%;
    //   position: absolute;
    //   bottom: 0px;
    //   left: 0px;
    // }
    position: fixed; 
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 4;

    .hamburger {
      display: block;
      position: absolute;
      top: 1em;
      right: 1em;
      z-index: 12;
    }

    .top {
      padding: 1em 0em 1em 0em;
      .logo img {
        width: 70%;
      }
    }
    .buttons {
      position: fixed;
      bottom: 3em;
      height: auto;
      width: 100%;
      z-index: 11;
      text-align: center;
      top: inherit;
      .buttonWrapper {
        display: block;
        padding-bottom: 1em;
      }
    }
    nav {
      display: none;
      position: fixed;
      top: 88px;
      height: 100%;
      width: 100%;
      z-index: 10;
      text-align: center;
      li, .text {
        display: block;
        padding: 0.5em 0em;
        font-size: 1.4em;
      }
      a { 
        margin-right: 0px; 
      }
    }

    &.is-active nav {
      display: block;
    }

    .buttons {
      display: none;
    }

    .buttons, nav {
      // display: none;
    }
  }
}

</style>
