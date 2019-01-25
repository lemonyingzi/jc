import router from './router'
import store from './store/store'
router.beforeEach((to, from, next) => {
	if(to.fullPath === "/"){
	    next({ path: '/Login' })
	}else{
		var arr = to.fullPath.split('/')
		// store.commit('changepage','/'+arr[1])
	    next()
	}
})
