import React, { useState, useId } from 'react';
import {
  Car,
  Plane,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
  Check,
  X,
  Sparkles,
  Info,
  User,
  Phone,
  ShieldCheck,
  Luggage,
  Wind,
  CheckCircle2,
  Timer
} from 'lucide-react';
import { carOptions } from '../data/carTypes';
import { airports, popularLocations, mockDriverBids } from '../data/locations';
import { useLanguage } from '../context/LanguageContext';
import Modal from './ui/Modal';
import Button from './ui/Button';

export default function BookingWidget() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('car-rental'); // 'car-rental' | 'airport-rental'
  const [tripType, setTripType] = useState('one-way'); // 'one-way' | 'round-way' | 'hourly'
  const [airportTripType, setAirportTripType] = useState('from-airport'); // 'from-airport' | 'from-home'

  // Form states
  const [selectedCar, setSelectedCar] = useState('sedan');
  const [pickupLocation, setPickupLocation] = useState('Dhaka (Gulshan)');
  const [dropoffLocation, setDropoffLocation] = useState('Chattogram (GEC Circle)');
  const [pickupAirport, setPickupAirport] = useState('DAC');
  const [dateTime, setDateTime] = useState('');
  const [returnDateTime, setReturnDateTime] = useState('');
  const [hourlyDuration, setHourlyDuration] = useState('4');

  // Dropdown toggles
  const [carDropdownOpen, setCarDropdownOpen] = useState(false);
  const [airportDropdownOpen, setAirportDropdownOpen] = useState(false);
  const [pickupSuggestionsOpen, setPickupSuggestionsOpen] = useState(false);
  const [dropoffSuggestionsOpen, setDropoffSuggestionsOpen] = useState(false);

  // Modal and Booking Flow states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1: Summary, 2: Passenger Details, 3: Live Driver Bids, 4: Confirmed
  const [formError, setFormError] = useState('');

  // Passenger form
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerNote, setPassengerNote] = useState('');
  const [acceptedBid, setAcceptedBid] = useState(null);

  const selectedVehicleObj = carOptions.find((c) => c.id === selectedCar) || carOptions[0];

  // Dynamic Fare Calculation
  const calculateEstimatedFare = () => {
    let multiplier = 1;
    if (tripType === 'round-way') multiplier = 1.85;
    if (tripType === 'hourly') multiplier = (parseInt(hourlyDuration, 10) || 4) * 0.35;

    const base = selectedVehicleObj.basePrice * multiplier;
    const minFare = Math.round(base);
    const maxFare = Math.round(base * 1.25);
    return { minFare, maxFare };
  };

  const { minFare, maxFare } = calculateEstimatedFare();

  const handleContinue = (e) => {
    e.preventDefault();
    setFormError('');

    if (!selectedCar) {
      setFormError('Please select a car type');
      return;
    }

    if (activeTab === 'car-rental') {
      if (!pickupLocation.trim()) {
        setFormError('Please enter a pickup location');
        return;
      }
      if (tripType !== 'hourly' && !dropoffLocation.trim()) {
        setFormError('Please enter a drop-off location');
        return;
      }
    } else {
      if (!pickupAirport) {
        setFormError('Please select an airport');
        return;
      }
      if (!dropoffLocation.trim()) {
        setFormError(
          airportTripType === 'from-airport'
            ? 'Please enter your destination'
            : 'Please enter your pickup address'
        );
        return;
      }
    }

    setModalStep(1);
    setModalOpen(true);
  };

  const handleAcceptBid = (bid) => {
    setAcceptedBid(bid);
    setModalStep(4);
  };

  return (
    <section id="booking" className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-gb-float border border-slate-200/90 overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 p-2 sm:p-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('car-rental');
              setFormError('');
            }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
              activeTab === 'car-rental'
                ? 'bg-white text-gb-primary shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Car className={`w-5 h-5 ${activeTab === 'car-rental' ? 'text-gb-primary' : 'text-slate-400'}`} />
            <span>{t.booking.carRental}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('airport-rental');
              setFormError('');
            }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
              activeTab === 'airport-rental'
                ? 'bg-white text-gb-primary shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Plane className={`w-5 h-5 ${activeTab === 'airport-rental' ? 'text-gb-primary' : 'text-slate-400'}`} />
            <span>{t.booking.airportRental}</span>
          </button>
        </div>

        {/* Tab Form Content */}
        <div className="p-5 sm:p-8">
          <form onSubmit={handleContinue}>
            {/* CAR RENTAL TAB */}
            {activeTab === 'car-rental' && (
              <div>
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* 1. Choose a Car Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.booking.chooseCar} <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCarDropdownOpen(!carDropdownOpen)}
                      className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-left hover:border-gb-primary focus:outline-none focus:ring-2 focus:ring-gb-primary/20 transition-all text-sm cursor-pointer"
                    >
                      <span className="text-slate-900 font-semibold truncate flex items-center gap-2">
                        <span>{selectedVehicleObj.icon}</span>
                        <span className="truncate">{selectedVehicleObj.name}</span>
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>

                    {/* Car Dropdown Menu */}
                    {carDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 max-h-72 overflow-y-auto">
                        {carOptions.map((car) => (
                          <button
                            key={car.id}
                            type="button"
                            onClick={() => {
                              setSelectedCar(car.id);
                              setCarDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gb-primary-subtle text-left transition-colors text-sm cursor-pointer ${
                              selectedCar === car.id ? 'bg-gb-primary-subtle font-bold text-gb-primary' : 'text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span>{car.icon}</span>
                                <span className="font-semibold text-slate-900">{car.name}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 ml-6">{car.popularFor}</p>
                            </div>
                            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
                              {car.capacity}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Pickup Location */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.booking.pickupLocation} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4 text-gb-primary" />
                      </div>
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => {
                          setPickupLocation(e.target.value);
                          setPickupSuggestionsOpen(true);
                        }}
                        onFocus={() => setPickupSuggestionsOpen(true)}
                        placeholder={t.booking.pickupPlaceholder}
                        className="w-full h-12 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary transition-all font-medium"
                      />
                    </div>

                    {/* Suggestions dropdown */}
                    {pickupSuggestionsOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 max-h-56 overflow-y-auto">
                        <div className="flex justify-between items-center px-4 py-1 text-[11px] font-bold text-slate-400 uppercase">
                          <span>Popular Hubs</span>
                          <button
                            type="button"
                            onClick={() => setPickupSuggestionsOpen(false)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {popularLocations.map((loc, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setPickupLocation(`${loc.city} (${loc.area})`);
                              setPickupSuggestionsOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-gb-primary shrink-0" />
                              <span className="font-semibold text-slate-800">{loc.city}</span>
                              <span className="text-slate-500 text-xs">({loc.area})</span>
                            </div>
                            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                              {loc.type}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Drop-off Location / Duration for hourly */}
                  {tripType === 'hourly' ? (
                    <div className="relative">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t.booking.durationHours} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Clock className="w-4 h-4 text-gb-warning" />
                        </div>
                        <select
                          value={hourlyDuration}
                          onChange={(e) => setHourlyDuration(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary transition-all font-medium cursor-pointer"
                        >
                          <option value="4">4 Hours (Half Day City Tour)</option>
                          <option value="8">8 Hours (Full Working Day)</option>
                          <option value="12">12 Hours (Extended Trip)</option>
                          <option value="24">24 Hours (Full 1-Day Rental)</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t.booking.dropoffLocation} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <MapPin className="w-4 h-4 text-gb-warning" />
                        </div>
                        <input
                          type="text"
                          value={dropoffLocation}
                          onChange={(e) => {
                            setDropoffLocation(e.target.value);
                            setDropoffSuggestionsOpen(true);
                          }}
                          onFocus={() => setDropoffSuggestionsOpen(true)}
                          placeholder={t.booking.dropoffPlaceholder}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary transition-all font-medium"
                        />
                      </div>

                      {/* Suggestions dropdown */}
                      {dropoffSuggestionsOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 max-h-56 overflow-y-auto">
                          <div className="flex justify-between items-center px-4 py-1 text-[11px] font-bold text-slate-400 uppercase">
                            <span>Popular Destinations</span>
                            <button
                              type="button"
                              onClick={() => setDropoffSuggestionsOpen(false)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {popularLocations.map((loc, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setDropoffLocation(`${loc.city} (${loc.area})`);
                                setDropoffSuggestionsOpen(false);
                              }}
                              className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-gb-warning shrink-0" />
                                <span className="font-semibold text-slate-800">{loc.city}</span>
                                <span className="text-slate-500 text-xs">({loc.area})</span>
                              </div>
                              <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                {loc.type}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. Pickup Date & Time */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.booking.dateTime} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Optional Return Date if Round Trip */}
                {tripType === 'round-way' && (
                  <div className="mt-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Calendar className="w-4 h-4 text-gb-primary" />
                      <span>{t.booking.returnDateTime}:</span>
                    </div>
                    <input
                      type="datetime-local"
                      value={returnDateTime}
                      onChange={(e) => setReturnDateTime(e.target.value)}
                      className="w-full sm:w-auto h-10 px-4 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary outline-none"
                    />
                    <span className="text-xs text-emerald-600 font-semibold">
                      Chauffeur stays dedicated throughout your trip
                    </span>
                  </div>
                )}

                {/* Sub Options & Action Row */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Trip Type Radios */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === 'one-way'}
                        onChange={() => setTripType('one-way')}
                        className="w-4 h-4 text-gb-primary focus:ring-gb-primary border-slate-300"
                      />
                      <span>{t.booking.oneWay}</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === 'round-way'}
                        onChange={() => setTripType('round-way')}
                        className="w-4 h-4 text-gb-primary focus:ring-gb-primary border-slate-300"
                      />
                      <span>{t.booking.roundTrip}</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === 'hourly'}
                        onChange={() => setTripType('hourly')}
                        className="w-4 h-4 text-gb-primary focus:ring-gb-primary border-slate-300"
                      />
                      <span>{t.booking.hourly}</span>
                    </label>
                  </div>

                  {/* Estimated Price Snippet & Continue Button */}
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right hidden sm:block">
                      <span className="text-[11px] text-slate-400 block font-semibold">ESTIMATED FARE</span>
                      <span className="text-lg font-black text-gb-primary">
                        ৳{minFare.toLocaleString()} - ৳{maxFare.toLocaleString()}
                      </span>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={ArrowRight}
                      className="w-full md:w-auto"
                    >
                      {t.booking.continue}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* AIRPORT RENTAL TAB */}
            {activeTab === 'airport-rental' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* 1. Choose a Car Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.booking.chooseCar} <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCarDropdownOpen(!carDropdownOpen)}
                      className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-left hover:border-gb-primary focus:outline-none focus:ring-2 focus:ring-gb-primary/20 transition-all text-sm cursor-pointer"
                    >
                      <span className="text-slate-900 font-semibold truncate flex items-center gap-2">
                        <span>{selectedVehicleObj.icon}</span>
                        <span className="truncate">{selectedVehicleObj.name}</span>
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>

                    {carDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 max-h-72 overflow-y-auto">
                        {carOptions.map((car) => (
                          <button
                            key={car.id}
                            type="button"
                            onClick={() => {
                              setSelectedCar(car.id);
                              setCarDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gb-primary-subtle text-left text-sm cursor-pointer"
                          >
                            <span className="flex items-center gap-2 font-semibold">
                              <span>{car.icon}</span>
                              <span>{car.name}</span>
                            </span>
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                              {car.capacity}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Pickup Airport Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.booking.airportPlaceholder} <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setAirportDropdownOpen(!airportDropdownOpen)}
                      className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-left hover:border-gb-primary focus:outline-none focus:ring-2 focus:ring-gb-primary/20 transition-all text-sm cursor-pointer"
                    >
                      <span className="text-slate-900 font-semibold truncate">
                        {airports.find((a) => a.code === pickupAirport)?.name}
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>

                    {airportDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 max-h-64 overflow-y-auto">
                        {airports.map((airport) => (
                          <button
                            key={airport.code}
                            type="button"
                            onClick={() => {
                              setPickupAirport(airport.code);
                              setAirportDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 hover:bg-gb-primary-subtle text-left text-xs sm:text-sm text-slate-700 cursor-pointer"
                          >
                            <div className="font-bold text-slate-900">{airport.name}</div>
                            <div className="text-xs text-slate-500">
                              {airport.city} • Code: {airport.code}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Destination / Home Location */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {airportTripType === 'from-airport' ? t.booking.dropoffLocation : t.booking.pickupLocation}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4 text-gb-primary" />
                      </div>
                      <input
                        type="text"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        placeholder="Enter City / Address"
                        className="w-full h-12 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* 4. Pickup Date & Time */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.booking.flightTime} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Sub Options & Action Row */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Airport Direction Radios */}
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="airportTripType"
                        checked={airportTripType === 'from-airport'}
                        onChange={() => setAirportTripType('from-airport')}
                        className="w-4 h-4 text-gb-primary focus:ring-gb-primary border-slate-300"
                      />
                      <span>{t.booking.fromAirport}</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="airportTripType"
                        checked={airportTripType === 'from-home'}
                        onChange={() => setAirportTripType('from-home')}
                        className="w-4 h-4 text-gb-primary focus:ring-gb-primary border-slate-300"
                      />
                      <span>{t.booking.toAirport}</span>
                    </label>
                  </div>

                  {/* Continue Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    className="w-full md:w-auto"
                  >
                    {t.booking.continue}
                  </Button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {formError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-center gap-2 animate-shake">
                <Info className="w-4 h-4 shrink-0 text-red-500" />
                <span>{formError}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* MULTI-STEP INTERACTIVE BOOKING / DRIVER BIDDING MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="max-w-xl"
      >
        {/* STEP 1: Trip Summary & Estimation */}
        {modalStep === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-emerald-100 text-gb-primary rounded-2xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Trip Estimation Ready!</h3>
                <p className="text-xs text-slate-500">Live competitive driver bidding available</p>
              </div>
            </div>

            {/* Vehicle Specs Pill */}
            <div className="bg-gb-primary-subtle/50 rounded-2xl p-4 border border-gb-primary/20 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gb-primary uppercase tracking-wider">
                  {selectedVehicleObj.tag}
                </span>
                <h4 className="text-base font-bold text-slate-900">{selectedVehicleObj.name}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                  <span>{selectedVehicleObj.capacity}</span>
                  <span>•</span>
                  <span>{selectedVehicleObj.luggage}</span>
                  <span>•</span>
                  <span>{selectedVehicleObj.ac}</span>
                </div>
              </div>
              <span className="text-2xl">{selectedVehicleObj.icon}</span>
            </div>

            {/* Trip Details Grid */}
            <div className="bg-slate-50 rounded-2xl p-4 space-y-3 mb-5 border border-slate-200/70 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Pickup:</span>
                <span className="font-bold text-slate-900 truncate max-w-[240px]">
                  {activeTab === 'car-rental'
                    ? pickupLocation
                    : airports.find((a) => a.code === pickupAirport)?.name}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Drop-off:</span>
                <span className="font-bold text-slate-900 truncate max-w-[240px]">
                  {tripType === 'hourly' ? `${hourlyDuration} Hours Reserved` : dropoffLocation}
                </span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Estimated Driver Bids:</p>
                  <p className="text-xs text-emerald-600 font-bold">0% Middleman Commission</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-gb-primary">
                    ৳{minFare.toLocaleString()} - ৳{maxFare.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="w-full"
                onClick={() => setModalStep(2)}
              >
                Proceed to Driver Bidding
              </Button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Modify Trip Parameters
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Passenger Contact Information */}
        {modalStep === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Passenger Contact</h3>
                <p className="text-xs text-slate-500">Drivers will send live SMS/App bids to your phone</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Mobile Number (bKash / SMS) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Special Notes for Driver (Optional)
                </label>
                <textarea
                  rows="2"
                  value={passengerNote}
                  onChange={(e) => setPassengerNote(e.target.value)}
                  placeholder="Need infant baby seat, flight baggage assistance, or specific highway route..."
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gb-primary/20 focus:border-gb-primary outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                className="w-1/3"
                onClick={() => setModalStep(1)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={Sparkles}
                className="w-2/3"
                onClick={() => setModalStep(3)}
              >
                View Driver Bids
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Live Driver Bids Simulation */}
        {modalStep === 3 && (
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-lg font-black text-slate-900">Live Driver Bids Received</h3>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" /> 3 Bids Available
              </span>
            </div>

            <div className="space-y-3 mb-6">
              {mockDriverBids.map((bid) => (
                <div
                  key={bid.id}
                  className="p-4 bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl transition-all duration-200 hover:shadow-md hover:border-gb-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={bid.photo}
                      alt={bid.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-sm">{bid.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-gb-primary" />
                      </div>
                      <p className="text-xs text-slate-500">{bid.carModel}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-amber-500 font-bold">★ {bid.rating}</span>
                        <span>•</span>
                        <span>{bid.trips} Trips</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold">{bid.eta}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <span className="text-xl font-black text-gb-primary">
                      ৳{bid.bidAmount.toLocaleString()}
                    </span>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleAcceptBid(bid)}
                    >
                      Accept Bid
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-100 rounded-xl text-center text-xs text-slate-500">
              All bids are legally bound with zero hidden charges. Drivers do not take extra toll fees without receipt.
            </div>
          </div>
        )}

        {/* STEP 4: Trip Confirmed */}
        {modalStep === 4 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-gb-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">Trip Confirmed!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">
              Your chauffeur <span className="font-bold text-slate-900">{acceptedBid?.name}</span> ({acceptedBid?.carModel}) has been assigned and notified.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-2 mb-6 border border-slate-200 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Driver Contact:</span>
                <span className="font-bold text-slate-900">+88 017 1100 2233</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle Registration:</span>
                <span className="font-bold text-slate-900">{acceptedBid?.regNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Final Agreed Fare:</span>
                <span className="font-black text-gb-primary text-sm">৳{acceptedBid?.bidAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://onelink.to/gbweb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-gb-primary hover:bg-gb-primary-dark shadow transition-all"
              >
                <span>Track Driver on App</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Button
                variant="outline"
                size="md"
                onClick={() => setModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
