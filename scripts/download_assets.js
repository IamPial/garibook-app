import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  { url: 'https://garibook.com/assets/images/gaibook-logo.svg', out: 'public/assets/images/gaibook-logo.svg' },
  { url: 'https://garibook.com/assets/images/cars/intercity_car_rental.svg', out: 'public/assets/images/cars/intercity_car_rental.svg' },
  { url: 'https://garibook.com/assets/images/cars/rideshare.svg', out: 'public/assets/images/cars/rideshare.svg' },
  { url: 'https://garibook.com/assets/images/cars/airport_rental.svg', out: 'public/assets/images/cars/airport_rental.svg' },
  { url: 'https://garibook.com/assets/images/cars/hourly_rental.svg', out: 'public/assets/images/cars/hourly_rental.svg' },
  { url: 'https://garibook.com/assets/images/banner/garibook_freedom.webp', out: 'public/assets/images/banner/garibook_freedom.webp' },
  { url: 'https://garibook.com/assets/images/services/busines.jpeg', out: 'public/assets/images/services/busines.jpeg' },
  { url: 'https://garibook.com/assets/images/services/garibook_club.jpg', out: 'public/assets/images/services/garibook_club.jpg' },
  { url: 'https://garibook.com/assets/images/services/Airport%20Rental_Webp.webp', out: 'public/assets/images/services/Airport_Rental_Webp.webp' },
  { url: 'https://garibook.com/assets/images/services/family_trips.webp', out: 'public/assets/images/services/family_trips.webp' },
  { url: 'https://garibook.com/assets/images/services/Group%20Tour_Webp.webp', out: 'public/assets/images/services/Group_Tour_Webp.webp' },
  { url: 'https://garibook.com/assets/images/services/explore.jpeg', out: 'public/assets/images/services/explore.jpeg' },
  { url: 'https://garibook.com/assets/images/services/freedom.jpg', out: 'public/assets/images/services/freedom.jpg' },
  { url: 'https://garibook.com/assets/images/services/safe_travel.svg', out: 'public/assets/images/services/safe_travel.svg' },
  { url: 'https://garibook.com/assets/images/services/prefarred_car.jpg', out: 'public/assets/images/services/prefarred_car.jpg' },
  { url: 'https://garibook.com/assets/images/services/smooth.jpg', out: 'public/assets/images/services/smooth.jpg' },
  { url: 'https://garibook.com/assets/images/app-screen/no_commission_app_screen.png', out: 'public/assets/images/app-screen/no_commission_app_screen.png' },
  { url: 'https://garibook.com/assets/images/nrb/nrb_no_background.svg', out: 'public/assets/images/nrb/nrb_no_background.svg' },
  { url: 'https://garibook.com/assets/images/clients/link3-two.png', out: 'public/assets/images/clients/link3-two.png' },
  { url: 'https://garibook.com/assets/images/clients/ssl.png', out: 'public/assets/images/clients/ssl.png' },
  { url: 'https://garibook.com/assets/icon/car.svg', out: 'public/assets/icon/car.svg' },
  { url: 'https://garibook.com/assets/icon/drive.svg', out: 'public/assets/icon/drive.svg' },
  { url: 'https://garibook.com/assets/icon/price.svg', out: 'public/assets/icon/price.svg' },
  { url: 'https://garibook.com/assets/icon/fi_9610434.svg', out: 'public/assets/icon/fi_9610434.svg' },
  { url: 'https://garibook.com/assets/icon/Frame76.svg', out: 'public/assets/icon/Frame76.svg' },
  { url: 'https://garibook.com/assets/icon/fi_14910621.svg', out: 'public/assets/icon/fi_14910621.svg' },
  { url: 'https://garibook.com/assets/icon/fi_12516022.svg', out: 'public/assets/icon/fi_12516022.svg' }
];

function download(url, dest) {
  return new Promise((resolve) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`[OK] ${dest} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      } else {
        console.log(`[ERR ${res.statusCode}] ${url}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`[FAIL] ${url}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of assets) {
    await download(item.url, item.out);
  }
  console.log('All downloads completed!');
}

run();
