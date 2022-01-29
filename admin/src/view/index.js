const getPath = (name, id) => {
  try {
    require.resolve('@/view/' + `${name}/${id}`);
    return `/${id}`
  } catch (e) {
    return `/_id`
  }
}

export default {
	computed: {
		component() {
      const { name, params } = this.$route
      const path = params.id && getPath(name, params.id)
			return this.importComponent(name + (path || ''))
		}
	},
  render(h) {
    return h(this.component)
  },
  methods: {
    importComponent(name) {
      return () => import('@/view/' + name)
    }
  }
}