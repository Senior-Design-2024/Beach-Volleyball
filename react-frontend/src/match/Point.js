export class Point {
  constructor() {
    this.match_set_id = null
    this.e_index =  null
    this.destination =  []
    this.origin =  []
    this.quality =  []
    this.type =  []
    this.action =  []
    this.player =  []
    this.win =  null
  }

  newPoint(group_id, e_index) {
    this.match_set_id = group_id
    this.e_index = e_index
    this.destination =  []
    this.origin =  []
    this.quality =  []
    this.type =  []
    this.action =  []
    this.player =  []
    this.win =  null

    console.log('point reset to:', this)
  }

  addEventParams(dest, org, qual, type, action, player) {
    this.destination.push(dest)
    this.origin.push(org)
    this.quality.push(qual)
    this.type.push(type)
    this.action.push(action)
    this.player.push(player)

    console.log('event added to point')
    console.log('point updated to:', this)
  }

  addEventObj(obj) {
    this.destination.push(obj.destination)
    this.origin.push(obj.origin)
    this.quality.push(obj.quality)
    this.type.push(obj.type)
    this.action.push(obj.action)
    this.player.push(obj.player)

    console.log('event added to point')
    console.log('point updated to:', this)
  }
}