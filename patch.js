const fs = require('fs');
const file = 'artifacts/gory-resort/src/pages/Properties.tsx';
let data = fs.readFileSync(file, 'utf8');

const replacements = [
  { img: 'mapDubaiPalm', pinPos: '{ x: 52, y: 42 }', accentColor: "'hsl(38,90%,58%)'" },
  { img: 'mapDubaiMarina', pinPos: '{ x: 47, y: 50 }', accentColor: "'hsl(197,88%,52%)'" },
  { img: 'mapDubaiDowntown', pinPos: '{ x: 52, y: 38 }', accentColor: "'hsl(45,95%,58%)'" },
  { img: 'mapDubaiRanches', pinPos: '{ x: 50, y: 48 }', accentColor: "'hsl(32,70%,52%)'" },
  { img: 'mapDubaiBizBay', pinPos: '{ x: 50, y: 44 }', accentColor: "'hsl(210,78%,52%)'" },
  { img: 'mapIstanbul', pinPos: '{ x: 50, y: 46 }', accentColor: "'hsl(18,72%,52%)'" },
  { img: 'mapAntalya', pinPos: '{ x: 50, y: 44 }', accentColor: "'hsl(178,68%,46%)'" },
  { img: 'mapLimassol', pinPos: '{ x: 50, y: 46 }', accentColor: "'hsl(208,78%,52%)'" },
  { img: 'mapPaphos', pinPos: '{ x: 50, y: 46 }', accentColor: "'hsl(28,62%,52%)'" },
  { img: 'mapBatumi', pinPos: '{ x: 50, y: 44 }', accentColor: "'hsl(152,68%,42%)'" },
  { img: 'mapTbilisi', pinPos: '{ x: 50, y: 46 }', accentColor: "'hsl(32,78%,52%)'" },
  { img: 'mapPhuket', pinPos: '{ x: 50, y: 44 }', accentColor: "'hsl(168,72%,42%)'" },
  { img: 'mapSamui', pinPos: '{ x: 50, y: 46 }', accentColor: "'hsl(187,72%,48%)'" },
  { img: 'mapLisbon', pinPos: '{ x: 50, y: 46 }', accentColor: "'hsl(38,72%,52%)'" },
  { img: 'mapAlgarve', pinPos: '{ x: 50, y: 44 }', accentColor: "'hsl(15,68%,54%)'" },
  { img: 'mapBelgrade', pinPos: '{ x: 50, y: 46 }', accentColor: "'hsl(222,58%,52%)'" },
];

for (const r of replacements) {
  data = data.replace(
    `image: ${r.img},\n      distances:`,
    `image: ${r.img},\n      pinPos: ${r.pinPos},\n      accentColor: ${r.accentColor},\n      distances:`
  );
}

const oldOnPinClick = `                    <PropertyLocationMap
                      {...item.locationMap}
                      onPinClick={(origin) =>
                        setImmersive({
                          origin,
                          listing: {
                            image: item.image,
                            mapImage: item.locationMap.image,
                            city: item.city,
                            district: item.district,
                            type: item.type,
                            price: item.price,
                            beds: item.beds,
                            baths: item.baths,
                            area: item.area,
                          },
                        })
                      }
                    />`;

const newOnPinClick = `                    <PropertyLocationMap
                      {...item.locationMap}
                      onPinClick={(origin) =>
                        setImmersive({
                          origin,
                          listing: {
                            image: item.image,
                            mapImage: item.locationMap.image,
                            city: item.city,
                            district: item.district,
                            type: item.type,
                            price: item.price,
                            beds: item.beds,
                            baths: item.baths,
                            area: item.area,
                            pinPos: item.locationMap.pinPos,
                            accentColor: item.locationMap.accentColor,
                          },
                        })
                      }
                    />`;

data = data.replace(oldOnPinClick, newOnPinClick);
fs.writeFileSync(file, data);
console.log('done');
