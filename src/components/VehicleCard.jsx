import { useState } from 'react'
import { Users, Fuel, Sliders, ArrowUpRight } from 'lucide-react'
import { formatINR } from '../data/cars'

export default function VehicleCard({ vehicle, onEnquire }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      className="card-vehicle flex flex-col h-full group"
      aria-labelledby={`vehicle-${vehicle.id}-title`}
    >
      {/* ── Vehicle Image Container ──────────────────────────── */}
      <div className="card-vehicle__image relative w-full aspect-[16/10] overflow-hidden bg-bg-secondary">
        {!imgError ? (
          <img
            src={vehicle.image}
            alt={vehicle.imageAlt || `${vehicle.fullName} luxury rental`}
            loading="lazy"
            width="900"
            height="562"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
            style={{ backgroundColor: vehicle.imageFallback || 'var(--v-bg-card)' }}
          >
            <span className="text-meta text-text-muted mb-1">Image Preview</span>
            <span className="text-subtitle font-heading text-white">{vehicle.fullName}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="badge badge-gold shadow-sm backdrop-blur-md">
            {vehicle.categoryLabel}
          </span>
        </div>

        {/* Bottom subtle gradient on image */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* ── Vehicle Details Body ─────────────────────────────── */}
      <div className="card-vehicle__body flex flex-col flex-1 justify-between p-7 sm:p-8 lg:p-9">
        <div>
          {/* Manufacturer & Model */}
          <div className="mb-2">
            <span className="text-xs text-text-muted uppercase tracking-widest block mb-1.5 font-medium">
              {vehicle.manufacturer}
            </span>
            <h3
              id={`vehicle-${vehicle.id}-title`}
              className="text-title font-heading font-bold text-white group-hover:text-gold transition-colors duration-200 tracking-tight"
            >
              {vehicle.name}
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-body text-text-secondary line-clamp-1 mb-5">
            {vehicle.tagline}
          </p>

          {/* Specifications Row */}
          <div
            className="flex items-center gap-3 text-sm text-text-muted mb-6 pb-2"
            aria-label="Vehicle specifications"
          >
            <div className="flex items-center gap-1.5" title={`${vehicle.seats} Seats`}>
              <Users size={14} className="text-gold/80" aria-hidden="true" />
              <span>{vehicle.seats} Seats</span>
            </div>
            <span className="text-border" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5" title={`${vehicle.transmission} Transmission`}>
              <Sliders size={14} className="text-gold/80" aria-hidden="true" />
              <span>{vehicle.transmission}</span>
            </div>
            <span className="text-border" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5" title={`${vehicle.fuel} Fuel`}>
              <Fuel size={14} className="text-gold/80" aria-hidden="true" />
              <span>{vehicle.fuel}</span>
            </div>
          </div>
        </div>

        {/* ── Footer: Price & Enquire CTA ──────────────────────── */}
        <div className="pt-5 border-t border-border-subtle flex items-end justify-between gap-4 mt-auto">
          <div>
            <span className="text-xs uppercase tracking-widest text-text-muted block mb-1 font-medium">
              Demo rate
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-xl sm:text-2xl text-white">
                {formatINR(vehicle.pricePerDay)}
              </span>
              <span className="text-xs text-text-muted font-normal">/ day</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEnquire && onEnquire(vehicle)}
            className="btn btn-secondary !h-11 !px-5 !text-xs font-semibold group/btn"
            aria-label={`Enquire about ${vehicle.fullName}`}
          >
            <span>Enquire</span>
            <ArrowUpRight
              size={14}
              className="text-gold transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  )
}

