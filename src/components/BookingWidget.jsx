import React, { useState } from 'react';
import { carOptions } from '../data/carTypes';
import { airports, popularLocations } from '../data/locations';
import { useLanguage } from '../context/LanguageContext';
import BookingFields, { BookingModeTabs } from './booking/BookingFields';

const initialState = {
  selectedCar: 'sedan',
  pickupLocation: 'Dhaka (Gulshan)',
  dropoffLocation: 'Chattogram (GEC Circle)',
  pickupAirport: 'DAC',
  dateTime: '',
  returnDateTime: '',
  hourlyDuration: '4',
  tripType: 'one-way',
  airportTripType: 'from-airport',
};

export default function BookingWidget() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('car-rental');
  const [form, setForm] = useState(initialState);
  const [openMenu, setOpenMenu] = useState(null);
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedVehicle = carOptions.find((car) => car.id === form.selectedCar) || carOptions[0];
  const fare = getFare(selectedVehicle.basePrice, form.tripType, form.hourlyDuration);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggleMenu = (name) => setOpenMenu((current) => (current === name ? null : name));
  const closeMenu = () => setOpenMenu(null);

  const submit = (event) => {
    event.preventDefault();
    const error = validateBooking(activeTab, form);
    setFormError(error);
    setSubmitted(!error);
  };

  const selectLocation = (field, location) => {
    update(field, `${location.city} (${location.area})`);
    closeMenu();
  };

  const actions = {
    submit,
    toggleCar: () => toggleMenu('car'),
    selectCar: (value) => { update('selectedCar', value); closeMenu(); },
    toggleAirport: () => toggleMenu('airport'),
    selectAirport: (value) => { update('pickupAirport', value); closeMenu(); },
    openPickup: () => setOpenMenu('pickup'),
    closePickup: closeMenu,
    selectPickup: (location) => selectLocation('pickupLocation', location),
    changePickup: (event) => { update('pickupLocation', event.target.value); setOpenMenu('pickup'); },
    openDropoff: () => setOpenMenu('dropoff'),
    closeDropoff: closeMenu,
    selectDropoff: (location) => selectLocation('dropoffLocation', location),
    changeDropoff: (event) => update('dropoffLocation', event.target.value),
    changeDateTime: (event) => update('dateTime', event.target.value),
    changeReturnDateTime: (event) => update('returnDateTime', event.target.value),
    changeDuration: (event) => update('hourlyDuration', event.target.value),
    changeTripType: (value) => update('tripType', value),
    changeAirportTripType: (value) => update('airportTripType', value),
  };

  const fieldState = {
    ...form,
    selectedVehicle,
    carDropdownOpen: openMenu === 'car',
    airportDropdownOpen: openMenu === 'airport',
    pickupSuggestionsOpen: openMenu === 'pickup',
    dropoffSuggestionsOpen: openMenu === 'dropoff',
  };

  const changeMode = (mode) => {
    setActiveTab(mode);
    setFormError('');
    setSubmitted(false);
    closeMenu();
  };

  return (
    <section id="booking" className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-gb-float border border-slate-200/90 overflow-hidden">
        <BookingModeTabs activeTab={activeTab} onChange={changeMode} t={t.booking} />
        <BookingFields
          mode={activeTab}
          form={fieldState}
          actions={actions}
          data={{ cars: carOptions, airports, locations: popularLocations }}
          t={t.booking}
          fare={fare}
          error={formError}
          submitted={submitted}
        />
      </div>
    </section>
  );
}

function getFare(basePrice, tripType, duration) {
  const multiplier = tripType === 'round-way' ? 1.85 : tripType === 'hourly' ? (parseInt(duration, 10) || 4) * 0.35 : 1;
  const min = Math.round(basePrice * multiplier);
  return { min, max: Math.round(min * 1.25) };
}

function validateBooking(activeTab, form) {
  if (!form.selectedCar) return 'Please select a car type';
  if (activeTab === 'car-rental') {
    if (!form.pickupLocation.trim()) return 'Please enter a pickup location';
    if (form.tripType !== 'hourly' && !form.dropoffLocation.trim()) return 'Please enter a drop-off location';
    return '';
  }
  if (!form.pickupAirport) return 'Please select an airport';
  if (!form.dropoffLocation.trim()) return form.airportTripType === 'from-airport' ? 'Please enter your destination' : 'Please enter your pickup address';
  return '';
}
