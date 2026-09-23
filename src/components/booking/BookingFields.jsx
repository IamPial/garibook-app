import React from 'react';
import { ArrowRight, Calendar, ChevronDown, Clock, Info, MapPin, Plane, X, Car } from 'lucide-react';
import Button from '../ui/Button';

const inputClass = 'w-full h-12 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary transition-all font-medium';
const labelClass = 'flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2';


function FieldLabel({ icon, children }) {
  return <label className={labelClass}><img src={icon} alt="" className="w-4 h-4 object-contain" /><span>{children} <span className="text-red-500">*</span></span></label>;
}

// creating this function for suggesting the locations
function LocationSuggestions({ title, accent = 'primary', locations, onSelect, onClose }) {
  const iconClass = accent === 'warning' ? 'text-gb-warning' : 'text-gb-primary';
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 max-h-56 overflow-y-auto">
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


// Creating this function for selecting car
function CarSelect({ selectedCar, selectedVehicle, isOpen, onToggle, onSelect, cars }) {
  return (
    <div className="relative">
      <FieldLabel icon="/assets/icon/fi_9610434.svg">Choose a Car</FieldLabel>
      <button type="button" onClick={onToggle} className={`${inputClass} px-4 flex items-center justify-between text-left`}>
        <span className="text-slate-900 font-semibold truncate flex items-center gap-2"><span>{selectedVehicle.icon}</span><span className="truncate">{selectedVehicle.name}</span></span><ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
      </button>
      {isOpen && <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 max-h-72 overflow-y-auto">
        {cars.map((car) => <button key={car.id} type="button" onClick={() => onSelect(car.id)} className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gb-primary-subtle text-left transition-colors text-sm cursor-pointer ${selectedCar === car.id ? 'bg-gb-primary-subtle font-bold text-gb-primary' : 'text-slate-700'}`}>
          <span><span className="flex items-center gap-2"><span>{car.icon}</span><span className="font-semibold text-slate-900">{car.name}</span></span><span className="block text-[11px] text-slate-400 ml-6">{car.popularFor}</span></span><span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">{car.capacity}</span>
        </button>)}
      </div>}
    </div>
  );
}

function DateTimeField({ label, value, onChange }) {
  return <div><FieldLabel icon="/assets/icon/fi_12516022.svg">{label}</FieldLabel><div className="relative"><Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-4" /><input type="datetime-local" value={value} onChange={onChange} className={`${inputClass} pl-10 pr-4`} /></div></div>;
}

function LocationField({ label, value, placeholder, iconColor = 'primary', open, onFocus, onChange, suggestions }) {
  return <div className="relative"><FieldLabel icon="/assets/icon/Frame76.svg">{label}</FieldLabel><div className="relative"><MapPin className={`w-4 h-4 absolute left-3 top-4 ${iconColor === 'warning' ? 'text-gb-warning' : 'text-gb-primary'}`} /><input type="text" value={value} onChange={onChange} onFocus={onFocus} placeholder={placeholder} className={`${inputClass} pl-10 pr-4`} /></div>{open && suggestions}</div>;
}

function RentalFields({ form, actions, locations, cars, t, fare }) {
  const { selectedCar, selectedVehicle, tripType, pickupLocation, dropoffLocation, dateTime, returnDateTime, hourlyDuration, carDropdownOpen, pickupSuggestionsOpen, dropoffSuggestionsOpen } = form;
  return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

      {/* Select Car  */}
      <CarSelect selectedCar={selectedCar} selectedVehicle={selectedVehicle} isOpen={carDropdownOpen} onToggle={actions.toggleCar} onSelect={actions.selectCar} cars={cars} />

      {/*Select Locations*/}
      <LocationField label={t.pickupLocation} value={pickupLocation} placeholder={t.pickupPlaceholder} onFocus={actions.openPickup} onChange={actions.changePickup} open={pickupSuggestionsOpen} suggestions={<LocationSuggestions title="Popular Hubs" locations={locations} onSelect={actions.selectPickup} onClose={actions.closePickup} />} />
      {tripType === 'hourly' ? <div><FieldLabel icon="/assets/icon/fi_14910621.svg">{t.durationHours}</FieldLabel><div className="relative"><Clock className="w-4 h-4 text-gb-warning absolute left-3 top-4" /><select value={hourlyDuration} onChange={actions.changeDuration} className={`${inputClass} pl-10 pr-4 cursor-pointer`}><option value="4">4 Hours (Half Day City Tour)</option><option value="8">8 Hours (Full Working Day)</option><option value="12">12 Hours (Extended Trip)</option><option value="24">24 Hours (Full 1-Day Rental)</option></select></div></div> : <LocationField label={t.dropoffLocation} value={dropoffLocation} placeholder={t.dropoffPlaceholder} iconColor="warning" onFocus={actions.openDropoff} onChange={actions.changeDropoff} open={dropoffSuggestionsOpen} suggestions={<LocationSuggestions title="Popular Destinations" accent="warning" locations={locations} onSelect={actions.selectDropoff} onClose={actions.closeDropoff} />} />}
      <DateTimeField label={t.dateTime} value={dateTime} onChange={actions.changeDateTime} />
    </div>
    {tripType === 'round-way' && <div className="mt-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"><span className="flex items-center gap-2 text-xs font-bold text-slate-700"><Calendar className="w-4 h-4 text-gb-primary" />{t.returnDateTime}:</span><input type="datetime-local" value={returnDateTime} onChange={actions.changeReturnDateTime} className="w-full sm:w-auto h-10 px-4 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary outline-none" /><span className="text-xs text-emerald-600 font-semibold">Chauffeur stays dedicated throughout your trip</span></div>}
    <FormActions options={[['one-way', t.oneWay], ['round-way', t.roundTrip], ['hourly', t.hourly]]} selected={tripType} onChange={actions.changeTripType} fare={fare} submitLabel={t.continue} />
  </>;
}

function AirportFields({ form, actions, airports, cars, t }) {
  const { selectedCar, selectedVehicle, pickupAirport, dropoffLocation, dateTime, airportTripType, carDropdownOpen, airportDropdownOpen } = form;
  const airport = airports.find((item) => item.code === pickupAirport);
  return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <CarSelect selectedCar={selectedCar} selectedVehicle={selectedVehicle} isOpen={carDropdownOpen} onToggle={actions.toggleCar} onSelect={actions.selectCar} cars={cars} />
      <div className="relative"><FieldLabel icon="/assets/icon/Frame76.svg">{t.airportPlaceholder}</FieldLabel><button type="button" onClick={actions.toggleAirport} className={`${inputClass} px-4 flex items-center justify-between text-left`}><span className="text-slate-900 font-semibold truncate">{airport?.name}</span><ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /></button>{airportDropdownOpen && <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 max-h-64 overflow-y-auto">{airports.map((item) => <button key={item.code} type="button" onClick={() => actions.selectAirport(item.code)} className="w-full px-4 py-3 hover:bg-gb-primary-subtle text-left text-xs sm:text-sm text-slate-700 cursor-pointer"><span className="block font-bold text-slate-900">{item.name}</span><span className="text-xs text-slate-500">{item.city} • Code: {item.code}</span></button>)}</div>}</div>
      <LocationField label={airportTripType === 'from-airport' ? t.dropoffLocation : t.pickupLocation} value={dropoffLocation} placeholder="Enter City / Address" onChange={actions.changeDropoff} />
      <DateTimeField label={t.flightTime} value={dateTime} onChange={actions.changeDateTime} />
    </div>
    <FormActions options={[["from-airport", t.fromAirport], ["from-home", t.toAirport]]} selected={airportTripType} onChange={actions.changeAirportTripType} submitLabel={t.continue} />
  </>;
}

function FormActions({ options, selected, onChange, fare, submitLabel }) {
  return <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div className="flex flex-wrap items-center gap-4 sm:gap-6">{options.map(([value, label]) => <label key={value} className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700"><input type="radio" checked={selected === value} onChange={() => onChange(value)} className="w-4 h-4 text-gb-primary focus:ring-gb-primary border-slate-300" /><span>{label}</span></label>)}</div><div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">{fare && <div className="text-right hidden sm:block"><span className="text-[11px] text-slate-400 block font-semibold">ESTIMATED FARE</span><span className="text-lg font-black text-gb-primary">৳{fare.min.toLocaleString()} - ৳{fare.max.toLocaleString()}</span></div>}<Button type="submit" variant="primary" size="lg" icon={ArrowRight} className="w-full md:w-auto">{submitLabel}</Button></div></div>;
}

export default function BookingFields({ mode, form, actions, data, t, fare, error, submitted }) {
  return <div className="p-5 sm:p-8"><form onSubmit={actions.submit}>{mode === 'car-rental' ? <RentalFields form={form} actions={actions} locations={data.locations} cars={data.cars} t={t} fare={fare} /> : <AirportFields form={form} actions={actions} airports={data.airports} cars={data.cars} t={t} />}{error && <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-center gap-2"><Info className="w-4 h-4 shrink-0 text-red-500" /><span>{error}</span></div>}{submitted && <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs sm:text-sm">Your trip details are ready. Continue in the Garibook app to find available drivers.</div>}</form></div>;
}

export function BookingModeTabs({ activeTab, onChange, t }) {
  return <div className="flex border-b border-slate-200 bg-slate-50/80 p-2 sm:p-3 gap-2">{[['car-rental', Car, t.carRental], ['airport-rental', Plane, t.airportRental]].map(([id, Icon, label]) => <button key={id} type="button" onClick={() => onChange(id)} className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${activeTab === id ? 'bg-white text-gb-primary shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}><Icon className={`w-5 h-5 ${activeTab === id ? 'text-gb-primary' : 'text-slate-400'}`} /><span>{label}</span></button>)}</div>;
}
