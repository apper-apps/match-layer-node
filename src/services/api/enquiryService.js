import enquiryData from '@/services/mockData/enquiries.json'

class EnquiryService {
  async getAll() {
    await this.delay(300)
    return [...enquiryData]
  }

  async getById(Id) {
    await this.delay(200)
    const enquiry = enquiryData.find(item => item.Id === Id)
    if (!enquiry) {
      throw new Error('Enquiry not found')
    }
    return { ...enquiry }
  }

  async create(enquiry) {
    await this.delay(400)
    const newId = Math.max(...enquiryData.map(item => item.Id)) + 1
    const newEnquiry = {
      ...enquiry,
      Id: newId,
      createdAt: new Date().toISOString()
    }
    enquiryData.push(newEnquiry)
    return { ...newEnquiry }
  }

  async update(Id, updates) {
    await this.delay(300)
    const index = enquiryData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Enquiry not found')
    }
    enquiryData[index] = { ...enquiryData[index], ...updates }
    return { ...enquiryData[index] }
  }

  async delete(Id) {
    await this.delay(250)
    const index = enquiryData.findIndex(item => item.Id === Id)
    if (index === -1) {
      throw new Error('Enquiry not found')
    }
    enquiryData.splice(index, 1)
    return { success: true }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const enquiryService = new EnquiryService()