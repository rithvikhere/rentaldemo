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

  // Filter available vehicles dynamically based on selected category
  const availableVehicles = useMemo(() => {
    if (!formData.category) return []
    return vehicles.filter((v) => v.category === formData.category)
  }, [formData.category])

  // Field change handlers
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value
    setFormData((prev) => {
      // Check if current vehicle is in new category
      const currentVehicle = vehicles.find((v) => String(v.id) === prev.vehicleId)
      const isVehicleStillValid = currentVehicle && currentVehicle.category === newCategory
      return {
        ...prev,
        category: newCategory,
        vehicleId: isVehicleStillValid ? prev.vehicleId : '',
      }
    })
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }))
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Validate entire form on submit
  const validate = () => {
    const errs = {}

    // Full name
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.'
    }

    // Phone
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required.'
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Please enter a valid phone number (min 8 digits).'
    }

    // Email
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required.'
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }

    // Category
    if (!formData.category) {
      errs.category = 'Please select a preferred vehicle category.'
    }

    // Vehicle
    if (!formData.vehicleId) {
      errs.vehicleId = 'Please select a preferred vehicle.'
    }

    // Pickup Date
    if (!formData.pickupDate) {
      errs.pickupDate = 'Pickup Date is required.'
    } else if (formData.pickupDate < minDate) {
      errs.pickupDate = 'Pickup Date cannot be in the past.'
    }

    // Duration
    const durationNum = parseInt(formData.duration, 10)
    if (!formData.duration || isNaN(durationNum) || durationNum <= 0) {
      errs.duration = 'Please specify a positive rental duration (at least 1 day).'
    }

    setErrors(errs)
    const errKeys = Object.keys(errs)
    if (errKeys.length > 0) {
      // Focus first error element
      const firstErrorKey = errKeys[0]
      const el = document.getElementById(`${formIdPrefix}-${firstErrorKey}`)
      if (el) el.focus()
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    // Find selected vehicle & category display names
    const selectedVeh = vehicles.find((v) => String(v.id) === formData.vehicleId)
    const selectedCat = vehicleCategories.find((c) => c.id === formData.category)

    const summary = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      category: selectedCat ? selectedCat.name : formData.category,
      vehicle: selectedVeh ? selectedVeh.fullName : formData.vehicleId,
      pickupDate: formData.pickupDate,
      duration: `${formData.duration} Day${parseInt(formData.duration, 10) > 1 ? 's' : ''}`,
      message: formData.message.trim() || 'No additional notes provided.',
      dailyRate: selectedVeh ? selectedVeh.pricePerDay : null,
    }

    setSubmittedData(summary)
    setIsSuccess(true)
  }

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

              {/* Row 3: Preferred Category & Preferred Vehicle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label
                    htmlFor={`${formIdPrefix}-category`}
                    className="form-label flex items-center gap-1.5"
                  >
                    <Car size={14} className="text-gold" aria-hidden="true" />
                    <span>Preferred Category</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <select
                    id={`${formIdPrefix}-category`}
                    value={formData.category}
                    onChange={handleCategoryChange}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? `${formIdPrefix}-category-error` : undefined}
                    className={`form-select ${errors.category ? 'form-input--error' : ''}`}
                    required
                  >
                    <option value="">Select a Category</option>
                    <option value="economy">Economy</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="sports">Premium / Sports</option>
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
                    <span>Preferred Vehicle</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <select
                    id={`${formIdPrefix}-vehicleId`}
                    value={formData.vehicleId}
                    onChange={(e) => handleChange('vehicleId', e.target.value)}
                    aria-invalid={Boolean(errors.vehicleId)}
                    aria-describedby={errors.vehicleId ? `${formIdPrefix}-vehicleId-error` : undefined}
                    className={`form-select ${errors.vehicleId ? 'form-input--error' : ''}`}
                    disabled={!formData.category}
                    required
                  >
                    <option value="">
                      {!formData.category
                        ? 'Select a category first'
                        : availableVehicles.length === 0
                        ? 'No vehicles available'
                        : 'Select a Vehicle'}
                    </option>
                    {availableVehicles.map((veh) => (
                      <option key={veh.id} value={String(veh.id)}>
                        {veh.fullName}
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

              {/* Row 4: Pickup Date & Rental Duration */}
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
                    <span>Rental Duration (Days)</span>
                    <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formIdPrefix}-duration`}
                    type="number"
                    min="1"
                    max="90"
                    placeholder="1"
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

              {/* Row 5: Additional Message (Optional) */}
              <div className="form-group">
                <label
                  htmlFor={`${formIdPrefix}-message`}
                  className="form-label flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-gold" aria-hidden="true" />
                    <span>Additional Notes or Requests</span>
                  </span>
                  <span className="text-meta text-text-muted">Optional</span>
                </label>
                <textarea
                  id={`${formIdPrefix}-message`}
                  rows={3}
                  placeholder="Specify airport terminal delivery, child safety seat requirements, or preferred delivery timing..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* Mandatory Frontend Demo Notice */}
              <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle flex items-start gap-2.5 text-xs text-text-muted">
                <AlertTriangle size={15} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong className="text-text-secondary font-medium">Demo Mode:</strong> Submitting this form validates input locally and displays an enquiry summary. No network calls or booking commitments are created.
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full md:w-auto !px-8 cursor-pointer shadow-lg shadow-gold/15 inline-flex items-center justify-center gap-2"
                >
                  <span>Submit Demo Enquiry</span>
                  <Send size={15} aria-hidden="true" />
                </button>
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
                  Your details have been validated in this demo. No enquiry has been sent and no booking has been created.
                </p>
              </div>
            </div>

            {/* Submitted Summary Grid */}
            <div className="bg-bg-secondary/70 border border-border rounded-lg p-6 mb-8">
              <h4 className="text-meta uppercase font-bold text-gold tracking-widest mb-4">
                Enquiry Summary Details
              </h4>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <dt className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Customer Name</dt>
                  <dd className="text-white font-medium">{submittedData.fullName}</dd>
                </div>

                <div>
                  <dt className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Contact Details</dt>
                  <dd className="text-white font-medium">{submittedData.phone} · {submittedData.email}</dd>
                </div>

                <div>
                  <dt className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Selected Category</dt>
                  <dd className="text-white font-medium">{submittedData.category}</dd>
                </div>

                <div>
                  <dt className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Preferred Vehicle</dt>
                  <dd className="text-white font-bold text-gold">{submittedData.vehicle}</dd>
                </div>

                <div>
                  <dt className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Pickup Date</dt>
                  <dd className="text-white font-medium">{submittedData.pickupDate}</dd>
                </div>

                <div>
                  <dt className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Rental Duration</dt>
                  <dd className="text-white font-medium">{submittedData.duration}</dd>
                </div>

                <div className="md:col-span-2 pt-2 border-t border-border-subtle">
                  <dt className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Additional Notes</dt>
                  <dd className="text-text-secondary text-sm italic">{submittedData.message}</dd>
                </div>
              </dl>
            </div>

            {/* Reset / Start New Enquiry Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary w-full sm:w-auto inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span>Start New Enquiry</span>
              </button>

              <span className="text-xs text-text-muted text-center sm:text-right">
                All mock form state held in memory only.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
