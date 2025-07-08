import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { matchService } from '@/services/api/matchService'
import { enquiryService } from '@/services/api/enquiryService'
import { setMatches, setLoading, setError, removeMatch } from '@/store/propertiesSlice'
import { setEnquiries } from '@/store/userSlice'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const { matches, savedProperties, loading, error } = useSelector(state => state.properties)
  const { enquiries } = useSelector(state => state.user)
  const [activeTab, setActiveTab] = useState('matches')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))

      const [matchData, enquiryData] = await Promise.all([
        matchService.getAll(),
        enquiryService.getAll()
      ])

      dispatch(setMatches(matchData))
      dispatch(setEnquiries(enquiryData))
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDeleteMatch = async (matchId) => {
    try {
      await matchService.delete(matchId)
      dispatch(removeMatch(matchId))
      toast.success('Match deleted successfully')
    } catch (err) {
      toast.error('Failed to delete match')
    }
  }

  const tabs = [
    { id: 'matches', label: 'My Matches', icon: 'Layers', count: matches.length },
    { id: 'saved', label: 'Saved Properties', icon: 'Heart', count: savedProperties.length },
    { id: 'enquiries', label: 'Enquiries', icon: 'MessageSquare', count: enquiries.length }
  ]

  const renderMatches = () => {
    if (matches.length === 0) {
      return (
        <Empty
          title="No matches yet"
          message="Create your first match by combining land and house plans"
          actionLabel="Create Match"
          onAction={() => window.location.href = '/match-creator'}
          icon="Layers"
        />
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Card key={match.Id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="primary" size="sm">Match</Badge>
                <button
                  onClick={() => handleDeleteMatch(match.Id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">
                Land + House Plan Match
              </h3>
              
              <div className="text-sm text-gray-600 mb-4">
                Created {new Date(match.createdAt).toLocaleDateString()}
              </div>
              
              {match.notes && (
                <p className="text-sm text-gray-600 mb-4">
                  {match.notes}
                </p>
              )}
              
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm" className="flex-1">
                  <ApperIcon name="Eye" className="w-4 h-4" />
                  View Details
                </Button>
                <Button variant="accent" size="sm">
                  <ApperIcon name="MessageSquare" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  const renderSavedProperties = () => {
    if (savedProperties.length === 0) {
      return (
        <Empty
          title="No saved properties"
          message="Save properties you're interested in to view them here"
          actionLabel="Browse Properties"
          onAction={() => window.location.href = '/browse'}
          icon="Heart"
        />
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedProperties.map((property) => (
          <Card key={property.Id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" size="sm">Saved</Badge>
                <ApperIcon name="Heart" className="w-4 h-4 text-red-500 fill-current" />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">
                Property #{property.Id}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                Saved property details
              </p>
              
              <Button variant="primary" size="sm" className="w-full">
                <ApperIcon name="Eye" className="w-4 h-4" />
                View Property
              </Button>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  const renderEnquiries = () => {
    if (enquiries.length === 0) {
      return (
        <Empty
          title="No enquiries yet"
          message="Your property enquiries will appear here"
          actionLabel="Browse Properties"
          onAction={() => window.location.href = '/browse'}
          icon="MessageSquare"
        />
      )
    }

    return (
      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <Card key={enquiry.Id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge 
                  variant={enquiry.status === 'responded' ? 'success' : 'warning'} 
                  size="sm"
                >
                  {enquiry.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">
                {enquiry.type} Enquiry
              </h3>
              
              <p className="text-gray-600 mb-4">
                {enquiry.message}
              </p>
              
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm">
                  <ApperIcon name="Eye" className="w-4 h-4" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <ApperIcon name="MessageSquare" className="w-4 h-4" />
                  Follow Up
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error 
            title="Failed to load dashboard"
            message={error}
            onRetry={loadDashboardData}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your matches, saved properties, and enquiries
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                {tab.label}
                {tab.count > 0 && (
                  <span className={cn(
                    'px-2 py-1 rounded-full text-xs',
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-600'
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'matches' && renderMatches()}
          {activeTab === 'saved' && renderSavedProperties()}
          {activeTab === 'enquiries' && renderEnquiries()}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard