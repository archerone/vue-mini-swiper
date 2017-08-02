# vue-mini-swiper
vue mini swiper component,only Horizontal.


## Usage

```js
//===home.vue===
import swiper from '@/components/swiper/swiper.vue'
export default {
  data () {
    return {
      listData:[...]
    }
  },
  components:{
      swiper
  }
}
//--or--
import swiper from '@/components/swiper'
Vue.use(swiper);
export default {
  data () {
    return {
      listData:[...]
    }
  }
}
```

```html
<swiper
  wrap="wrap1" 
  :imgdata="listData" 
  :clickDot="true"
  :times="4000">
</swiper>
<swiper
  wrap="wrap2" 
  :imgdata="listData" 
  :isAuto="true" 
  :clickDot="true"
  :times="3000">
</swiper>
```

## Api
| Name                 | Type      | Default      | Description                                                        |
|----------------------|-----------|--------------|--------------------------------------------------------------------|
| wrap                 | `String`  | `wrap`       | Swiper wrap id.Cannot repeat                                       |
| imgdata              | `Array`   | []           | [linkurl:'',imgurl:'',alt:''] Three keys(change in swiper.vue)     |
| isAuto               | `Boolean` | `false`      | Auto play                                                          |
| clickDot             | `Boolean` | `false`      | Click dot                                                          |
| times                | `Number`  | 4000         | Animation waiting time                                             |