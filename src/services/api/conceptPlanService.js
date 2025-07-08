import conceptPlanData from '@/services/mockData/conceptPlans.json'

class ConceptPlanService {
  async getAll() {
    await this.delay(300)
    return [...conceptPlanData]
  }

  async getById(Id) {
    await this.delay(200)
    const plan = conceptPlanData.find(item => item.Id === Id)
    if (!plan) {
      throw new Error('Concept plan not found')
    }
    return { ...plan }
  }

  async create(conceptPlan) {
    await this.delay(400)
    const newId = Math.max(...conceptPlanData.map(item => item.Id)) + 1
    const newPlan = {
      ...conceptPlan,
      Id: newId,
      createdAt: new Date().toISOString()
    }
    conceptPlanData.push(newPlan)
    return { ...newPlan }
  }

  async update(Id, updates) {
    await this.delay(300)
    const index = conceptPlanData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Concept plan not found')
    }
    conceptPlanData[index] = { ...conceptPlanData[index], ...updates }
    return { ...conceptPlanData[index] }
  }

  async delete(Id) {
    await this.delay(250)
    const index = conceptPlanData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Concept plan not found')
    }
    conceptPlanData.splice(index, 1)
    return { success: true }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const conceptPlanService = new ConceptPlanService()