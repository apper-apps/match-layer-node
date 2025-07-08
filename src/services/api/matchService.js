import matchData from '@/services/mockData/matches.json'

class MatchService {
  async getAll() {
    await this.delay(300)
    return [...matchData]
  }

  async getById(Id) {
    await this.delay(200)
    const match = matchData.find(item => item.Id === Id)
    if (!match) {
      throw new Error('Match not found')
    }
    return { ...match }
  }

  async create(match) {
    await this.delay(400)
    const newId = Math.max(...matchData.map(item => item.Id)) + 1
    const newMatch = {
      ...match,
      Id: newId,
      createdAt: new Date().toISOString()
    }
    matchData.push(newMatch)
    return { ...newMatch }
  }

  async update(Id, updates) {
    await this.delay(300)
    const index = matchData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Match not found')
    }
    matchData[index] = { ...matchData[index], ...updates }
    return { ...matchData[index] }
  }

  async delete(Id) {
    await this.delay(250)
    const index = matchData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Match not found')
    }
    matchData.splice(index, 1)
    return { success: true }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const matchService = new MatchService()