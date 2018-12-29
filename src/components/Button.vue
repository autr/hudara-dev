<template lang="pug">

  .button( v-bind:class='buttonType')
    span {{type}}
    router-link(:to='`/${path}`') {{ $prismic.richTextAsPlain(field) }}
</template>

<script>
export default {
  name: 'Button',
  data() {
	return {
		path: '',
		type: ''
	}
  },
  props: ['field', 'buttonType'],
  methods: {

  },
	created () {  
    // console.log(this.buttonType, "TYPEEE");
		// console.log('fiiield', this.field[0].text, this.field[0].spans[0].data.slug);

    try {
		  this.path = this.field[0].spans[0].data.slug;
    } catch(err) {

    }
	},
	  beforeRouteUpdate (to, from, next) {
		// console.log('fsdfdsf'); 
	  }
}
</script>

<style lang="scss">

@import "../assets/css/_variables";

.button {
	cursor: pointer;
	border: 2px solid white;
	display: inline-block;
	margin: 1em 0em;
	color: white;
	border-radius: 2px;
	font-size: 1.4em;
  position: relative;
      box-sizing: border-box;

  &:active {
    a {
      // top: -1px;
    }
    top: 1px;
  }

  &.orange {
    border-color: $orange;
    a {
      color: $orange;
    }
  }

	p, * {
		padding: 0;
	}

  a {
    padding: 0.8em 1.8em!important;
    text-decoration: none; 
    color: white;
    position: relative;
    display: block;
    box-sizing: border-box;
  }
	&.orange {
		border-color: $orange;
		a {
			color: $orange;
		}
	}
}


@media only screen and (max-width: 768px) {
  .button {
    width: 100%;
    text-align: center;
  }
}
</style>