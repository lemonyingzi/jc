import router from './router'
router.beforeEach((to, from, next) => {
	if(to.fullPath === "/"){
	    next({ path: '/Login' })
	}else{
	    next()
	}
})
