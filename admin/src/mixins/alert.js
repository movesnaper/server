
export default function (err) {
  const { variant, message, title, toaster } = err
  console.error(err)
  this.$bvToast.toast(message, {
    title,
    variant: variant || 'danger',
    solid: true,
    toaster: toaster || 'b-toaster-bottom-right'
  })
}
