import showcaseData from '@/services/mockData/showcaseProjects.json'

class ShowcaseService {
  async getAll() {
    await this.delay(300)
    return [...showcaseData]
  }

  async getById(Id) {
    await this.delay(200)
    const project = showcaseData.find(item => item.Id === Id)
    if (!project) {
      throw new Error('Showcase project not found')
    }
    return { ...project }
  }

  async create(showcaseProject) {
    await this.delay(400)
    const newId = Math.max(...showcaseData.map(item => item.Id)) + 1
    const newProject = {
      ...showcaseProject,
      Id: newId,
      createdAt: new Date().toISOString()
    }
    showcaseData.push(newProject)
    return { ...newProject }
  }

  async update(Id, updates) {
    await this.delay(300)
    const index = showcaseData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Showcase project not found')
    }
    showcaseData[index] = { ...showcaseData[index], ...updates }
    return { ...showcaseData[index] }
  }

  async delete(Id) {
    await this.delay(250)
    const index = showcaseData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Showcase project not found')
    }
    showcaseData.splice(index, 1)
    return { success: true }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const showcaseService = new ShowcaseService()