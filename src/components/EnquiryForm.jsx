import { useState, useMemo, useId } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { CheckCircle2, RotateCcw, AlertTriangle, Send, Calendar, Clock, Car, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { vehicles, vehicleCategories } from '../data/cars'
import { luxuryEase } from '../animations/variants'

function getLocalTodayDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function isValidPhone(phone) {
  const trimmed = phone.trim()
  if (!/^[\d\s+\-()]{8,20}$/.test(trimmed)) return false
  const digitsOnly = trimmed.replace(/\D/g, '')
  return digitsOnly.length >= 8 && digitsOnly.length <= 15
}

function isValidEmail(email) {
  const trimmed = email.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
}

export default function EnquiryForm({ preselectedVehicle, onResetVehicle }) {
  const formIdPrefix = useId()
  const shouldReduceMotion = useReducedMotion()
  const minDate = useMemo(() => getLocalTodayDateString(), [])

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    category: '',
    vehicleId: '',
    pickupDate: '',
    duration: '1',
    message: '',
  })

  // Validation Errors & Submission State
  const [errors, setErrors] = useState({})
  const [submittedData, setSubmittedData] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  // Synchronize when preselectedVehicle arrives from Fleet "Enquire" action
  const [prevPreselected, setPrevPreselected] = useState(preselectedVehicle)
  if (preselectedVehicle !== prevPreselected) {
    setPrevPreselected(preselectedVehicle)
    if (preselectedVehicle) {
      setFormData((prev) => ({
        ...prev,
        category: preselectedVehicle.category || '',
        vehicleId: String(preselectedVehicle.id) || '',
      }))
      setErrors((prev) => ({
        ...prev,
        category: undefined,
        vehicleId: undefined,
      }))
    }
  }

  // Filter vehicles available for the currently chosen category
  const selectableVehicles = useMemo(() => {
    if (!formData.category) return vehicles
    return vehicles.filter((v) => v.category === formData.category)
  }, [formData.category])

  // Field change handler with validation clearance
  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'category') {
        const vehicleStillValid = vehicles.some(
          (v) => String(v.id) === String(prev.vehicleId) && v.category === value
        )
        if (!vehicleStillValid) {
          next.vehicleId = ''
        }
      }
      return next
    })

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Client-side validation function
  const validate = () => {
    const errs = {}

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.'
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters.'
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required.'
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Please provide a valid 10-digit mobile number.'
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please provide a valid email format (name@example.com).'
    }

    if (!formData.category) {
      errs.category = 'Please choose a vehicle category.'
    }

    if (!formData.vehicleId) {
      errs.vehicleId = 'Please select a preferred vehicle model.'
    }

    if (!formData.pickupDate) {
      errs.pickupDate = 'Pickup date is required.'
    } else if (formData.pickupDate < minDate) {
      errs.pickupDate = 'Pickup date cannot be in the past.'
    }

    const durationNum = parseInt(formData.duration, 10)
    if (!formData.duration || isNaN(durationNum) || durationNum < 1) {
      errs.duration = 'Rental duration must be at least 1 day.'
    } else if (durationNum > 90) {
      errs.duration = 'Maximum demo booking duration is 90 days.'
    }

    return errs
  }

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstErrorKey = Object.keys(validationErrors)[0]
      const el = document.getElementById(`${formIdPrefix}-${firstErrorKey}`)
      if (el) el.focus()
      return
    }

    const chosenVehicle = vehicles.find((v) => String(v.id) === String(formData.vehicleId))
    const chosenCategory = vehicleCategories.find((c) => c.id === formData.category)

    setSubmittedData({
      ...formData,
      vehicleObj: chosenVehicle,
      categoryObj: chosenCategory,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    })
    setIsSuccess(true)
  }

  // Reset Form Handler
  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      category: '',
      vehicleId: '',
      pickupDate: '',
      duration: '1',
      message: '',
    })
    setErrors({})
    setSubmittedData(null)
    setIsSuccess(false)
    if (onResetVehicle) {
      onResetVehicle()
    }
  }

  return (
    <div className="bg-bg-card border border-border rounded-lg p-6 md:p-8 lg:p-10 shadow-2xl relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          /* ── 1. Active Enquiry Form ───────────────────────── */
          <motion.div
            key="form"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1 }}
            exit={shouldReduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-8">
              <span className="eyebrow block mb-1">Interactive Reservation</span>
              <h3 className="text-headline font-heading font-extrabold text-white">
                Find Your Perfect Ride.
              </h3>
              <p className="text-body text-text-secondary mt-2">
                Tell us what you&apos;re looking for and our team can help you with your rental enquiry.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Row 1: Full Name */}
              <div className="form-group">
                <label
                  htmlFor={`${formIdPrefix}-fullName`}
                  className="form-label flex items-center gap-1.5"
                >
                  <User size={14} className="text-gold" aria-hidden="true" />
                  <span>Full Name</span>
                  <span className="text-gold" aria-hidden="true">*</span>
                </label>
                <input
                  id={`${formIdPrefix}-fullName`}
                  type="text"
                  placeholder="e.g. Vikram Malhotra"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? `${formIdPrefix}-fullName-error` : undefined}
                  className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                  required
                />
                {errors.fullName && (
                  <span id={`${formIdPrefix}-fullName-error`} className="form-error">
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label
                    htmlFor={`${formIdPrefix}-phone`}
                    className="form-label flex items-center gap-1.5"
                  >
                    <Phone size={14} className="text-gold" aria-hidden="true" />
                    <span>Phone Number</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formIdPrefix}-phone`}
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? `${formIdPrefix}-phone-error` : undefined}
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    required
                  />
                  {errors.phone && (
                    <span id={`${formIdPrefix}-phone-error`} className="form-error">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${formIdPrefix}-email`}
                    className="form-label flex items-center gap-1.5"
                  >
                    <Mail size={14} className="text-gold" aria-hidden="true" />
                    <span>Email Address</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formIdPrefix}-email`}
                    type="email"
                    placeholder="e.g. vikram@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${formIdPrefix}-email-error` : undefined}
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    required
                  />
                  {errors.email && (
                    <span id={`${formIdPrefix}-email-error`} className="form-error">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 3: Category & Preferred Vehicle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label
                    htmlFor={`${formIdPrefix}-category`}
                    className="form-label flex items-center gap-1.5"
                  >
                    <Car size={14} className="text-gold" aria-hidden="true" />
                    <span>Vehicle Class</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <select
                    id={`${formIdPrefix}-category`}
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? `${formIdPrefix}-category-error` : undefined}
                    className={`form-select ${errors.category ? 'form-input--error' : ''}`}
                    required
                  >
                    <option value="">Select Category...</option>
                    {vehicleCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count} models)
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span id={`${formIdPrefix}-category-error`} className="form-error">
                      {errors.category}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${formIdPrefix}-vehicleId`}
                    className="form-label flex items-center gap-1.5"
                  >
                    <Car size={14} className="text-gold" aria-hidden="true" />
                    <span>Preferred Model</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <select
                    id={`${formIdPrefix}-vehicleId`}
                    value={formData.vehicleId}
                    onChange={(e) => handleChange('vehicleId', e.target.value)}
                    aria-invalid={Boolean(errors.vehicleId)}
                    aria-describedby={errors.vehicleId ? `${formIdPrefix}-vehicleId-error` : undefined}
                    className={`form-select ${errors.vehicleId ? 'form-input--error' : ''}`}
                    required
                  >
                    <option value="">Select Vehicle...</option>
                    {selectableVehicles.map((v) => (
                      <option key={v.id} value={String(v.id)}>
                        {v.fullName} ({v.categoryLabel})
                      </option>
                    ))}
                  </select>
                  {errors.vehicleId && (
                    <span id={`${formIdPrefix}-vehicleId-error`} className="form-error">
                      {errors.vehicleId}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 4: Pickup Date & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label
                    htmlFor={`${formIdPrefix}-pickupDate`}
                    className="form-label flex items-center gap-1.5"
                  >
                    <Calendar size={14} className="text-gold" aria-hidden="true" />
                    <span>Pickup Date</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formIdPrefix}-pickupDate`}
                    type="date"
                    min={minDate}
                    value={formData.pickupDate}
                    onChange={(e) => handleChange('pickupDate', e.target.value)}
                    aria-invalid={Boolean(errors.pickupDate)}
                    aria-describedby={errors.pickupDate ? `${formIdPrefix}-pickupDate-error` : undefined}
                    className={`form-input ${errors.pickupDate ? 'form-input--error' : ''}`}
                    required
                  />
                  {errors.pickupDate && (
                    <span id={`${formIdPrefix}-pickupDate-error`} className="form-error">
                      {errors.pickupDate}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${formIdPrefix}-duration`}
                    className="form-label flex items-center gap-1.5"
                  >
                    <Clock size={14} className="text-gold" aria-hidden="true" />
                    <span>Duration (Days)</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formIdPrefix}-duration`}
                    type="number"
                    min="1"
                    max="90"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    aria-invalid={Boolean(errors.duration)}
                    aria-describedby={errors.duration ? `${formIdPrefix}-duration-error` : undefined}
                    className={`form-input ${errors.duration ? 'form-input--error' : ''}`}
                    required
                  />
                  {errors.duration && (
                    <span id={`${formIdPrefix}-duration-error`} className="form-error">
                      {errors.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 5: Notes / Special Requests (Optional) */}
              <div className="form-group">
                <label
                  htmlFor={`${formIdPrefix}-message`}
                  className="form-label flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-gold" aria-hidden="true" />
                    <span>Itinerary Notes &amp; Special Requests</span>
                  </span>
                  <span className="text-meta text-text-muted font-normal">Optional</span>
                </label>
                <textarea
                  id={`${formIdPrefix}-message`}
                  rows={3}
                  placeholder="Specify airport terminal delivery, outstation route plans, additional driver requirements, or custom rental timing..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* Submission Notice & Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full py-4 text-base font-bold shadow-lg shadow-gold/20 flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <span>Submit Rental Enquiry</span>
                  <Send size={16} className="text-charcoal-950 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                </button>
                <p className="text-center text-xs text-text-muted mt-3">
                  This form is an illustrative frontend demo. No live payment or external booking transmission is executed.
                </p>
              </div>
            </form>
          </motion.div>
        ) : (
          /* ── 2. Success Summary State ──────────────────────── */
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98, y: 10 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
            className="py-4"
          >
            {/* Success Header */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-gold/15 text-gold border border-gold/40 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} aria-hidden="true" />
              </div>
              <div>
                <span className="badge badge-gold mb-2">Frontend Demo Validated</span>
                <h3 className="text-title font-heading font-extrabold text-white">
                  Your Enquiry Is Ready.
                </h3>
                <p className="text-body text-text-secondary mt-1">
                  Thank you, <strong className="text-white">{submittedData?.fullName}</strong>.
                  Your reservation request parameters have been recorded in this demo session.
                </p>
              </div>
            </div>

            {/* Structured Summary Card */}
            <div className="bg-bg-secondary p-5 rounded-lg border border-border space-y-4 mb-6">
              <span className="text-meta font-mono uppercase text-gold tracking-widest block">
                Session Enquiry Summary
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-meta text-text-muted block">Selected Vehicle</span>
                  <span className="text-white font-semibold">
                    {submittedData?.vehicleObj?.fullName || 'N/A'}
                  </span>
                </div>

                <div>
                  <span className="text-meta text-text-muted block">Vehicle Class</span>
                  <span className="text-white font-semibold">
                    {submittedData?.categoryObj?.name || 'N/A'}
                  </span>
                </div>

                <div>
                  <span className="text-meta text-text-muted block">Pickup Date</span>
                  <span className="text-white font-semibold font-mono">
                    {submittedData?.pickupDate}
                  </span>
                </div>

                <div>
                  <span className="text-meta text-text-muted block">Duration</span>
                  <span className="text-white font-semibold">
                    {submittedData?.duration} Day{parseInt(submittedData?.duration, 10) > 1 ? 's' : ''}
                  </span>
                </div>

                <div>
                  <span className="text-meta text-text-muted block">Contact Phone</span>
                  <span className="text-white font-semibold font-mono">
                    {submittedData?.phone}
                  </span>
                </div>

                <div>
                  <span className="text-meta text-text-muted block">Contact Email</span>
                  <span className="text-white font-semibold truncate block">
                    {submittedData?.email}
                  </span>
                </div>
              </div>

              {submittedData?.message && (
                <div className="pt-3 border-t border-border-subtle">
                  <span className="text-meta text-text-muted block mb-1">Itinerary Notes</span>
                  <p className="text-xs text-text-secondary italic">
                    &ldquo;{submittedData.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Explanatory Notice */}
            <div className="p-4 rounded bg-bg-card border border-border-subtle text-xs text-text-muted flex items-start gap-3 mb-6">
              <AlertTriangle size={16} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Demonstration Mode:</strong> No actual backend booking transmission was executed. In production, this trigger connects to VELOX reservation dispatch and automated SMS/email confirmation.
              </span>
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={15} aria-hidden="true" />
              <span>Start Another Enquiry</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
