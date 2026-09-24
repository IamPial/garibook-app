# Garibook App

Garibook is a responsive React landing page and booking experience for city-to-city car rentals, airport transfers, hourly rentals, and driver-led travel in Bangladesh.

The project is a frontend application built with Vite. Booking data, vehicle data, airports, locations, FAQs, and translations are currently maintained locally in the repository. There is no backend booking API connected to this app.

## Features

- Responsive Garibook homepage with hero, services, statistics, driver, FAQ, blog, app download, and footer sections.
- Car Rental booking flow with vehicle selection, location suggestions, trip modes, date and time selection, return date and time, and a local estimated fare range.
- Airport Rental booking flow with airport selection, airport direction, destination, and pickup time.

- English and Bangla language switching through a React context provider.
- Responsive absolute dropdowns for vehicles, airports, and location suggestions.
- Local form validation and booking confirmation state.

- Reusable UI primitives for buttons, accordions, and modals.
- Static images and icons served from `public/assets`.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- PostCSS and Autoprefixer
- Lucide React icons
- GSAP for animation support
- JavaScript and JSX

- Node.js 20.19+ or a compatible current Node.js release
- npm

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

To expose the development server on the local network:

```bash
npm run dev -- --host 0.0.0.0
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally for review. |

## Project Structure

```text
.
├── public/
│   └── assets/                 # Static icons, vehicle images, banners, and section media
├── src/
│   ├── components/
│   │   ├── booking/            # Booking fields and booking-specific controls
│   │   └── ui/                 # Shared Button, Accordion, and Modal components
│   ├── context/
│   │   └── LanguageContext.jsx # English/Bangla language state and translations
│   ├── data/
│   │   ├── carTypes.js         # Vehicle options and pricing data
│   │   ├── faqs.js             # FAQ content
│   │   ├── locations.js        # Airport, location, and mock driver data
│   │   └── translations.js     # English and Bangla copy
│   ├── App.jsx                 # Application shell and page section order
│   ├── App.css                 # Additional component styles
│   ├── index.css               # Tailwind setup, theme styles, and global styles
│   └── main.jsx                # React entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Application Flow

`src/App.jsx` provides the page shell and wraps the application in `LanguageProvider`. The page is composed from independent sections, with `BookingWidget` owning the booking form state.

The booking state is passed to `BookingFields`, which renders either the car-rental or airport-rental fields. `BookingWidget` also calculates the estimated fare locally and performs the current form validation before showing the confirmation message.

## Styling and Assets

- Tailwind utility classes are the primary styling approach.
- Garibook theme colors, shadows, and typography are defined in `tailwind.config.js`.
- Global styles and the Montserrat heading font are configured in `src/index.css`.
- Public asset paths should use root-relative URLs such as `/assets/images/select/sedan.png`.
- Vehicle dropdowns use the image paths in `src/data/carTypes.js` and the corresponding files in `public/assets/images/select/`.

## Data and Integration Notes

- Booking submission currently prevents the browser form submission and displays a local confirmation state.
- Fare estimates are calculated from local base prices and trip type multipliers in `BookingWidget.jsx`.
- Driver bids in `src/data/locations.js` are mock records for frontend content and are not fetched from a service.
- Some content uses external image URLs, such as Unsplash driver photos and YouTube thumbnails.
- No environment variables are required for the current frontend build.

## Production Build

Create a production bundle:

```bash
npm run build
```

Preview the generated bundle locally:

```bash
npm run preview
```

Deploy the generated `dist/` directory to a static hosting provider that supports single-page applications.
