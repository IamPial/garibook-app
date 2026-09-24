import React from 'react';
import { ArrowRight, Calendar, ChevronDown, Info, MapPin, X } from 'lucide-react';

// ---------- shared styles ----------

const cell = 'relative min-w-0 border-slate-200 lg:px-6 lg:border-l lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0';

const fieldBase = 'w-full h-8 bg-transparent p-0 border-b border-transparent focus:border-gb-primary focus:outline-none focus:ring-0 placeholder:text-xs placeholder:font-medium placeholder:text-slate-400';
const fieldText = `${fieldBase} text-sm font-semibold text-slate-800`;

function FieldLabel({ icon, children }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-1.5">
      {typeof icon === 'string' ? <img src={icon} alt="" className="w-4 h-4 object-contain" /> : icon}
      <span>{children} <span className="text-red-500">*</span></span>
    </label>
  );
}

// ---------- location suggestions ----------
function LocationSuggestions({ title, accent = 'primary', locations, onSelect, onClose }) {
  const iconClass = accent === 'warning' ? 'text-gb-warning' : 'text-gb-primary';
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 py-2 max-h-56 overflow-y-auto">
      <div className="flex justify-between items-center px-4 py-1 text-[11px] font-bold text-slate-400 uppercase">
        <span>{title}</span>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label={`Close ${title}`}><X className="w-3.5 h-3.5" /></button>
      </div>
      {locations.map((location) => (
        <button key={`${location.city}-${location.area}`} type="button" onClick={() => onSelect(location)} className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer">
          <span className="flex items-center gap-2"><MapPin className={`w-3.5 h-3.5 ${iconClass} shrink-0`} /><span className="font-semibold text-slate-800">{location.city}</span><span className="text-slate-500 text-xs">({location.area})</span></span>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{location.type}</span>
        </button>
      ))}
    </div>
  );
}

// ---------- car select ----------
function CarSelect({ selectedCar, selectedVehicle, isOpen, onToggle, onSelect, cars }) {
  return (
    <div className={cell}>
      <FieldLabel icon="/assets/icon/fi_9610434.svg">Choose a Car</FieldLabel>

      <button type="button" onClick={onToggle} className="w-full h-8 flex items-center justify-between text-left cursor-pointer">
        {selectedVehicle ? (
          <span className="flex items-center gap-2 min-w-0">
            <img src={selectedVehicle.icon} alt="" className="w-7 h-7 object-contain shrink-0" />
            <span className="text-sm font-semibold text-slate-800 truncate">{selectedVehicle.name}</span>
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-400">Select Car Type</span>
        )}
        <ChevronDown className={`w-5 h-5 text-slate-800 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>


      {isOpen && (
        <div className="relative mt-3 md:absolute md:top-full md:left-0 md:right-0 md:mt-2 bg-white border border-slate-300 rounded-md md:rounded-sm shadow-lg z-50 max-h-[min(20rem,60vh)] overflow-y-auto p-3 flex flex-col gap-3">
          {cars.map((car) => {
            const active = selectedCar === car.id;
            return (
              <button
                key={car.id}
                type="button"
                onClick={() => onSelect(car.id)}
                className={`w-full h-12.5 shrink-0 px-3 flex items-center gap-4 text-left rounded cursor-pointer transition-colors ${active ? 'bg-[#dbe8ff] ring-1 ring-gb-primary/40' : 'bg-[#eef5ff] hover:bg-[#dfeafe]'}`}
              >
                <img src={car.icon} alt={car.name} className="w-12 h-9 object-contain shrink-0" />
                <span className="min-w-0">
                  <span className="block text-[13px] font-bold text-black leading-tight truncate">{car.name}</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">{car.capacity}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------- simple fields ----------
function DateTimeField({ label, value, onChange }) {
  return (
    <div className={cell}>
      <FieldLabel icon="/assets/icon/fi_12516022.svg">{label}</FieldLabel>
      <input type="datetime-local" value={value} onChange={onChange} className={`${fieldBase} text-xs font-medium text-slate-600`} />
    </div>
  );
}

function LocationField({ label, icon = '/assets/icon/Frame76.svg', value, placeholder, open, onFocus, onChange, suggestions }) {
  return (
    <div className={cell}>
      <FieldLabel icon={icon}>{label}</FieldLabel>
      <input type="text" value={value} onChange={onChange} onFocus={onFocus} placeholder={placeholder} className={fieldText} />
      {open && suggestions}
    </div>
  );
}

// ---------- rental tab ----------
function RentalFields({ form, actions, locations, cars, t, fare }) {
  const { selectedCar, selectedVehicle, tripType, pickupLocation, dropoffLocation, dateTime, returnDateTime, hourlyDuration, carDropdownOpen, pickupSuggestionsOpen, dropoffSuggestionsOpen } = form;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 lg:gap-x-0">
        <CarSelect selectedCar={selectedCar} selectedVehicle={selectedVehicle} isOpen={carDropdownOpen} onToggle={actions.toggleCar} onSelect={actions.selectCar} cars={cars} />

        <LocationField label={t.pickupLocation} value={pickupLocation} placeholder={t.pickupPlaceholder} onFocus={actions.openPickup} onChange={actions.changePickup} open={pickupSuggestionsOpen} suggestions={<LocationSuggestions title="Popular Hubs" locations={locations} onSelect={actions.selectPickup} onClose={actions.closePickup} />} />

        {tripType === 'hourly' ? (
          <div className={cell}>
            <FieldLabel icon="/assets/icon/fi_14910621.svg">{t.durationHours}</FieldLabel>
            <select value={hourlyDuration} onChange={actions.changeDuration} className={`${fieldText} cursor-pointer`}>
              <option value="4">4 Hours (Half Day City Tour)</option>
              <option value="8">8 Hours (Full Working Day)</option>
              <option value="12">12 Hours (Extended Trip)</option>
              <option value="24">24 Hours (Full 1-Day Rental)</option>
            </select>
          </div>
        ) : (
          <LocationField label={t.dropoffLocation} icon={<MapPin className="w-4 h-4 text-gb-primary" />} value={dropoffLocation} placeholder={t.dropoffPlaceholder} onFocus={actions.openDropoff} onChange={actions.changeDropoff} open={dropoffSuggestionsOpen} suggestions={<LocationSuggestions title="Popular Destinations" accent="warning" locations={locations} onSelect={actions.selectDropoff} onClose={actions.closeDropoff} />} />
        )}

        <DateTimeField label={t.dateTime} value={dateTime} onChange={actions.changeDateTime} />
      </div>

      {tripType === 'round-way' && (
        <div className="mt-5 p-4 bg-slate-50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-xs font-bold text-slate-700"><Calendar className="w-4 h-4 text-gb-primary" />{t.returnDateTime}:</span>
          <input type="datetime-local" value={returnDateTime} onChange={actions.changeReturnDateTime} className="w-full sm:w-auto h-10 px-4 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary outline-none" />
          <span className="text-xs text-emerald-600 font-semibold">Chauffeur stays dedicated throughout your trip</span>
        </div>
      )}

      <FormActions options={[['one-way', t.oneWay], ['round-way', t.roundTrip], ['hourly', t.hourly]]} selected={tripType} onChange={actions.changeTripType} fare={fare} submitLabel={t.continue} />
    </>
  );
}

// ---------- airport tab ----------
function AirportFields({ form, actions, airports, cars, t }) {
  const { selectedCar, selectedVehicle, pickupAirport, dropoffLocation, dateTime, airportTripType, carDropdownOpen, airportDropdownOpen } = form;
  const airport = airports.find((item) => item.code === pickupAirport);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 lg:gap-x-0">
        <CarSelect selectedCar={selectedCar} selectedVehicle={selectedVehicle} isOpen={carDropdownOpen} onToggle={actions.toggleCar} onSelect={actions.selectCar} cars={cars} />

        <div className={cell}>
          <FieldLabel icon="/assets/icon/Frame76.svg">{t.airportPlaceholder}</FieldLabel>
          <button type="button" onClick={actions.toggleAirport} className="w-full h-8 flex items-center justify-between text-left cursor-pointer">
            {airport
              ? <span className="text-sm font-semibold text-slate-800 truncate">{airport.name}</span>
              : <span className="text-xs font-medium text-slate-400">Select Airport</span>}
            <ChevronDown className={`w-5 h-5 text-slate-800 shrink-0 transition-transform duration-200 ${airportDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {airportDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 py-2 max-h-64 overflow-y-auto">
              {airports.map((item) => (
                <button key={item.code} type="button" onClick={() => actions.selectAirport(item.code)} className="w-full px-4 py-3 hover:bg-gb-primary-subtle text-left text-xs sm:text-sm text-slate-700 cursor-pointer">
                  <span className="block font-bold text-slate-900">{item.name}</span>
                  <span className="text-xs text-slate-500">{item.city} • Code: {item.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <LocationField label={airportTripType === 'from-airport' ? t.dropoffLocation : t.pickupLocation} icon={<MapPin className="w-4 h-4 text-gb-primary" />} value={dropoffLocation} placeholder="Enter City / Address" onChange={actions.changeDropoff} />
        <DateTimeField label={t.flightTime} value={dateTime} onChange={actions.changeDateTime} />
      </div>

      <FormActions options={[['from-airport', t.fromAirport], ['from-home', t.toAirport]]} selected={airportTripType} onChange={actions.changeAirportTripType} submitLabel={t.continue} />
    </>
  );
}

//continue button
function FormActions({ options, selected, onChange, fare, submitLabel }) {
  return (
    <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        {options.map(([value, label]) => {
          const on = selected === value;
          return (
            <label key={value} className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm font-semibold text-slate-800 transition-colors focus-within:ring-2 focus-within:ring-gb-primary/30 ${on ? 'bg-[#f1f3ff]' : 'hover:bg-slate-50'}`}>
              <input type="radio" checked={on} onChange={() => onChange(value)} className="sr-only" />
              <span className={`w-4.5 h-4.5 rounded-full shrink-0 ${on ? 'bg-white border-[5px] border-gb-primary' : 'bg-slate-200'}`} />
              <span>{label}</span>
            </label>
          );
        })}
      </div>

      <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end">
        <button type="submit" className="h-12 w-full md:w-52.5 px-5 rounded-xl bg-gb-primary text-white text-sm font-semibold flex items-center justify-between cursor-pointer hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gb-primary/40 focus-visible:ring-offset-2">
          <span>{submitLabel}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ---------- main export ----------
export default function BookingFields({ mode, form, actions, data, t, fare, error, submitted }) {
  return (
    <div className="p-5 sm:p-6">
      <form onSubmit={actions.submit}>
        {mode === 'car-rental'
          ? <RentalFields form={form} actions={actions} locations={data.locations} cars={data.cars} t={t} fare={fare} />
          : <AirportFields form={form} actions={actions} airports={data.airports} cars={data.cars} t={t} />}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-red-500" /><span>{error}</span>
          </div>
        )}
        {submitted && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs sm:text-sm">
            Your trip details are ready. Continue in the Garibook app to find available drivers.
          </div>
        )}
      </form>
    </div>
  );
}


export function BookingModeTabs({ activeTab, onChange, t }) {
  return (
    <div className="inline-flex gap-2 bg-white rounded-t-2xl p-3">
      {[['car-rental', t.carRental], ['airport-rental', t.airportRental]].map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`px-5 sm:px-8 py-2.5 rounded-md font-bold text-sm transition-colors duration-200 cursor-pointer ${activeTab === id ? 'bg-[#111] text-white' : 'text-slate-800 hover:bg-slate-100'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}