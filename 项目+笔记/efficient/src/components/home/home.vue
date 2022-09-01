<template>
	<div>
		<Aside></Aside>
	  <Main></Main>
	</div>
</template>


<script>
	import Aside from './aside.vue';
import Main from './main.vue';
export default{
	components:{
    Aside,
    Main
},
	data(){
		return{

		}
	}
}
</script>



<style lang="scss" scoped>

</style>
