

module.exports = {
      
      save (body) {
        const { _id } = body
        return _id ? this.update(_id, body) : new this(body).save()
      },

      async update (id, body) {
        return Object.assign(await this.findById(id), body).save()
      },

      async remove(id) {
        const res = await this.findById(id)
        return res.remove()
      }
}