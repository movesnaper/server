
export default function({variant = 'danger', message, title }) {
  this.$bvToast.toast(message, {
    title,
    variant: variant,
    solid: true
  }),
  variant === 'danger' && console.error(message)  
}