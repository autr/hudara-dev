<template lang="pug">

header.contentHeader()
  h1(v-if='title') {{title}}
  ul.languages
    li(v-for='language, code in languages' v-bind:class="[code, (currentLang === language.lang) ? 'active' : 'inactive']" v-if='language.uid')
      router-link(:to='`/${language.uid}`') {{code}}
</template>

<script>
import SiteButton from '../components/Button'
export default {
  name: 'PageHeader',
  data () {
    return {
    }
  },
  props: ['title', 'languages', 'currentLang'],
  components: {
    SiteButton
  },
  methods: {
  },
  created () {  
    // console.log('KADJHKJHSADFKJH');
  },
  beforeRouteUpdate (to, from, next) {
  }
}
</script>

<style lang="scss">


</style>
