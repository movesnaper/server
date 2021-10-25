
export default function(props) {
  const {variant = 'danger', err, message, title, toaster} = props
  this.$bvToast.toast(message || err.message, {
    title,
    variant: variant,
    solid: true,
    toaster: toaster || 'b-toaster-bottom-right'
  }),
  variant === 'danger' && console.error(err || message)  
}