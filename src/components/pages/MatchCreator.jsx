import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { landService } from '@/services/api/landService'
import { conceptPlanService } from '@/services/api/conceptPlanService'
import { matchService } from '@/services/api/matchService'
import { setLandListings, setConceptPlans, setLoading, setError, addMatch } from '@/store/propertiesSlice'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const MatchCreator = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { landListings, conceptPlans, loading, error } = useSelector(state => state.properties)
  const [selectedLand, setSelectedLand] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [matchNotes, setMatchNotes] = useState('')

  useEffect(() => {
    loadData()
    
    // Pre-select land if provided in URL
    const landId = searchParams.get('land')
    if (landId) {
      const land = landListings.find(l => l.Id === parseInt(landId))
      if (land) {
        setSelectedLand(land)
      }
    }
  }, [searchParams, landListings])

  const loadData = async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))

      const [landData, planData] = await Promise.all([
        landService.getAll(),
        conceptPlanService.getAll()
      ])

      dispatch(setLandListings(landData))
      dispatch(setConceptPlans(planData))
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleCreateMatch = async () => {
    if (!selectedLand || !selectedPlan) {
      toast.error('Please select both land and a house plan')
      return
    }

    try {
      const matchData = {
        landId: selectedLand.Id,
        planId: selectedPlan.Id,
        notes: matchNotes,
        userId: 1, // Mock user ID
        createdAt: new Date().toISOString()
      }

      const newMatch = await matchService.create(matchData)
      dispatch(addMatch(newMatch))
      
      toast.success('Match created successfully!')
      
      // Reset form
      setMatchNotes('')
      setSelectedLand(null)
      setSelectedPlan(null)
    } catch (err) {
      toast.error('Failed to create match')
    }
  }

const formatPrice = (price) => {
    if (!price) return 'POA'
    if (price >= 1000000) {
      return `₹${(price / 1000000).toFixed(1)}M`
    }
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(0)}K`
    }
    return `₹${price}`
  }

  const getTotalEstimate = () => {
    const landPrice = selectedLand?.price || 0
    const planPrice = selectedPlan?.estimatedPrice || 0
    return landPrice + planPrice
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
            title="Failed to load data"
            message={error}
            onRetry={loadData}
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
            Create Your Perfect Match
          </h1>
          <p className="text-xl text-gray-600">
            Combine land and house plans to visualize your dream property
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Land Selection */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Land</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {landListings.map((land) => (
                <Card
                  key={land.Id}
                  className={cn(
                    'cursor-pointer transition-all duration-200 hover:shadow-lg',
                    selectedLand?.Id === land.Id && 'ring-2 ring-primary-500 shadow-xl'
                  )}
                  onClick={() => setSelectedLand(land)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="primary" size="sm">Land</Badge>
                      <span className="font-bold text-primary-600">
                        {formatPrice(land.price)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{land.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{land.location}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ApperIcon name="MapPin" className="w-4 h-4" />
                      <span>{land.area} sqm</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Plan Selection */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select House Plan</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {conceptPlans.map((plan) => (
                <Card
                  key={plan.Id}
                  className={cn(
                    'cursor-pointer transition-all duration-200 hover:shadow-lg',
                    selectedPlan?.Id === plan.Id && 'ring-2 ring-secondary-500 shadow-xl'
                  )}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" size="sm">House Plan</Badge>
                      <span className="font-bold text-secondary-600">
                        {formatPrice(plan.estimatedPrice)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{plan.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Home" className="w-4 h-4" />
                        <span>{plan.floorArea} sqm</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Bed" className="w-4 h-4" />
                        <span>{plan.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Bath" className="w-4 h-4" />
                        <span>{plan.bathrooms}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Match Summary */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Match Summary</h2>
            
            <Card className="mb-6">
              <div className="p-6">
                {selectedLand && selectedPlan ? (
                  <>
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {formatPrice(getTotalEstimate())}
                      </div>
                      <p className="text-gray-600">Total Estimated Cost</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Land Cost</span>
                        <span className="font-semibold">{formatPrice(selectedLand.price)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Build Cost</span>
                        <span className="font-semibold">{formatPrice(selectedPlan.estimatedPrice)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Notes (Optional)
                      </label>
                      <textarea
                        value={matchNotes}
                        onChange={(e) => setMatchNotes(e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        placeholder="Add any notes about this match..."
                      />
                    </div>
                    
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full mt-6"
                      onClick={handleCreateMatch}
                    >
                      <ApperIcon name="Plus" className="w-5 h-5" />
                      Create Match
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <ApperIcon name="Layers" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Select both land and a house plan to see your match summary
                    </p>
                  </div>
                )}
              </div>
            </Card>
            
            {selectedLand && selectedPlan && (
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Details</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Land</h4>
                      <p className="text-sm text-gray-600">{selectedLand.title}</p>
                      <p className="text-sm text-gray-600">{selectedLand.location}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">House Plan</h4>
                      <p className="text-sm text-gray-600">{selectedPlan.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedPlan.bedrooms} bed, {selectedPlan.bathrooms} bath
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchCreator