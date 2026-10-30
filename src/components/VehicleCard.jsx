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
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="badge badge-gold shadow-sm backdrop-blur-md">
            {vehicle.categoryLabel}
          </span>
          {vehicle.badge && (
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-bg-primary/85 text-text-secondary border border-border/80 backdrop-blur-md">
              {vehicle.badge}
            </span>
          )}
        </div>

        {/* Bottom subtle gradient on image */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* ── Vehicle Details Body ─────────────────────────────── */}
      <div className="card-vehicle__body flex flex-col flex-1 p-6 justify-between">
        <div>
          {/* Manufacturer & Model */}
          <div className="mb-2">
            <span className="text-meta text-text-muted uppercase tracking-widest block mb-1">
              {vehicle.manufacturer}
            </span>
            <h3
              id={`vehicle-${vehicle.id}-title`}
              className="text-title font-heading font-bold text-white group-hover:text-gold transition-colors duration-200"
            >
              {vehicle.name}
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-body-sm text-text-secondary line-clamp-1 mb-4">
            {vehicle.tagline}
          </p>

          {/* Specifications Row */}
          <div
            className="grid grid-cols-3 gap-2 py-3 px-3 rounded-md bg-bg-secondary/70 border border-border-subtle mb-5"
            aria-label="Vehicle specifications"
          >
            <div className="flex items-center gap-1.5 min-w-0" title={`${vehicle.seats} Passenger Seats`}>
              <Users size={14} className="text-gold shrink-0" aria-hidden="true" />
              <span className="text-[12px] text-text-secondary font-medium truncate">
                {vehicle.seats} Seats
              </span>
            </div>

            <div className="flex items-center gap-1.5 min-w-0" title={`${vehicle.transmission} Transmission`}>
              <Sliders size={14} className="text-gold shrink-0" aria-hidden="true" />
              <span className="text-[12px] text-text-secondary font-medium truncate">
                {vehicle.transmission}
              </span>
            </div>

            <div className="flex items-center gap-1.5 min-w-0" title={`${vehicle.fuel} Fuel Type`}>
              <Fuel size={14} className="text-gold shrink-0" aria-hidden="true" />
              <span className="text-[12px] text-text-secondary font-medium truncate">
                {vehicle.fuel}
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer: Price & Enquire CTA ──────────────────────── */}
        <div className="pt-4 border-t border-border flex items-end justify-between gap-4 mt-auto">
          <div>
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest block leading-none mb-1.5">
              Illustrative Demo Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                {formatINR(vehicle.pricePerDay)}
              </span>
              <span className="text-xs text-text-muted font-normal">/ day</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEnquire && onEnquire(vehicle)}
            className="btn btn-secondary !h-10 !px-4 !text-xs font-semibold group/btn"
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
