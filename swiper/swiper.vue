<template>
   <div id="swiper">
     <section v-bind:id="wrap" class="swpr">
	     <ul class="list">
	        <li v-if="imgdata.length > 0" v-for="item in imgdata">
	          <a :href="item.linkurl" target="_blank"><img :src="item.imgurl" :alt="item.alt"></a>
	        </li>
	     </ul>
	 </section>
   </div>
</template>
<script type="text/javascript">
	export default {
	  name: 'Swiper',

	  data() {
	    return {

	    }
	  },

	  props: {
	  	wrap:{
	  	  type:String,
          default:'wrap'
	  	},
	    isAuto: {
	      type: Boolean,
	      default: false
	    },
	    clickDot: {
	      type: Boolean,
	      default: false
	    },
	    times:{
	      type: Number,
	      default: 4000
	    },
	    imgdata: {
	      type: Array,
	      default: () => {
	        return [
			    {
			        "id": "1",
			        "fpage": "home",
			        "linkurl": "http://www.jd.com",
			        "imgurl": "http://ogwa9ffhc.bkt.clouddn.com/banner_home1.jpg",
			        "alt": "美的电器美时美刻"
			    },
			    {
			        "id": "2",
			        "fpage": "home",
			        "linkurl": "http://www.jd.com",
			        "imgurl": "http://ogwa9ffhc.bkt.clouddn.com/banner_home2.jpg",
			        "alt": "戴尔移动工作站"
			    },
			    {
			        "id": "3",
			        "fpage": "home",
			        "linkurl": "http://www.jd.com",
			        "imgurl": "http://ogwa9ffhc.bkt.clouddn.com/banner_home3.jpg",
			        "alt": "奥克斯空调"
			    }
			]
	      }
	    }
	  },
	  watch: {
	    'imgdata'(items) {
	      if (items.length == 0) {
	        this.show = false
	      }
	      if (items.length > 1) {
	        this.reInitPages()
	      }
	    }
	  },
	  created() {
	    if (this.imgdata.length > 0) {
	       this.$nextTick(() => {
	          this.reInitPages();
	       });
	    }
	  },
	  methods: {
	    reInitPages() {
	      var _this =this;
	      	System.import('./swp.js').then(data => {
	      	 var owrap = "#"+_this.wrap;
	         var sp1 = new data.default.hSwiper({wrap:owrap,list:".list",isAuto:this.isAuto,clickDot:this.clickDot,times:this.times});
             sp1.init();
	      	})
	    }
	  }
	} 
</script>
<style>
	.swpr{
	     width:100%;
	     overflow: hidden;
	     position: relative;
	}
	.swpr .list{
	     padding: 0;
	     margin: 0;
	     list-style: none;
	}
	.swpr .list li{
	     float:left;
	     
	}
	.swpr .list img{
	     width: 100%;
	     display: block;
	}
	.swpr .po{
	     width: 100%;
	     height: 15px;
	     position: absolute;
	     bottom: 5px;
	     z-index: 1;
	     text-align: center;
	}
	.swpr .po a{
	     width: 12px;
	     height:12px;
	     display: inline-block;
	     border:1px solid #fff;
	     border-radius: 50%;
	     vertical-align: top;
	     margin: 0 4px;
	}
	.swpr .po a.active{
	     background:#fff;
	}
</style>