import BaseController from "../utils/BaseController.js";
import { housesService } from "../services/HousesService.js";


export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .post('', this.createHouse)
      .put('/:houseId', this.editHouse)
      .delete('/:houseId', this.deleteHouse)
  }

  async getHouses(req, res, next) {
    try {
      const query = req.query
      const houses = await housesService.getHouses(query)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      const houseData = req.body
      const newHouse = await housesService.createHouse(houseData)
      res.send(newHouse)
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const editHouse = req.body
      const houseId = req.params.houseId
      const editedHouse = await housesService.editHouse(editHouse, houseId)
      res.send(editedHouse)
    } catch (error) {
      next(error)
    }
  }

  async deleteHouse(req, res, next) {
    try {
      const houseId = req.params.houseId
      await housesService.deleteHouse(houseId)
      res.send(`House with id: ${houseId} was deleted`)
    } catch (error) {
      next(error)
    }
  }

}