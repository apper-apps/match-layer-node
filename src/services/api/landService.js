import landData from '@/services/mockData/landListings.json'

class LandService {
  async getAll() {
    await this.delay(300)
    return [...landData]
  }

  async getById(Id) {
    await this.delay(200)
    const land = landData.find(item => item.Id === Id)
    if (!land) {
      throw new Error('Land listing not found')
    }
    return { ...land }
  }

  async create(landListing) {
    await this.delay(400)
    const newId = Math.max(...landData.map(item => item.Id)) + 1
    const newListing = {
      ...landListing,
      Id: newId,
      createdAt: new Date().toISOString()
    }
    landData.push(newListing)
    return { ...newListing }
  }

  async update(Id, updates) {
    await this.delay(300)
    const index = landData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Land listing not found')
    }
    landData[index] = { ...landData[index], ...updates }
    return { ...landData[index] }
  }

  async delete(Id) {
    await this.delay(250)
    const index = landData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Land listing not found')
    }
    landData.splice(index, 1)
    return { success: true }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const landService = new LandService()