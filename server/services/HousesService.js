import { dbContext } from "../db/DbContext.js"


class HousesService {

  async getHouses(query) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }

  createHouse(houseData) {
    const newHouse = dbContext.Houses.create(houseData)
    return newHouse
  }

  async editHouse(editHouse, houseId) {
    const originalHouse = await dbContext.Houses.findById(houseId)
    originalHouse.bedrooms = editHouse.bedrooms || originalHouse.bedrooms
    originalHouse.bathrooms = editHouse.bathrooms || originalHouse.bathrooms
    originalHouse.year = editHouse.year || originalHouse.year
    originalHouse.price = editHouse.price || originalHouse.price
    originalHouse.imgUrl = editHouse.imgUrl || originalHouse.imgUrl
    originalHouse.description = editHouse.description || originalHouse.description
    const editedHouse = await originalHouse.save()
    return originalHouse
  }

  async deleteHouse(houseId) {
    const foundHouse = await dbContext.Houses.findById(houseId)
    await foundHouse.remove()
    return foundHouse
  }

}

export const housesService = new HousesService()