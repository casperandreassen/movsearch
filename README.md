Dette kodelageret inneholder kildekode for movsearch som er en app utviklet i emnet IT2810. Ract-Native klienten er laget av meg, mens backend var et samarbeid i en gruppe på 4. 

# DEMO

Klikk på bildet, så åpnes videoen på YouTube.

[![movsearch demo](https://img.youtube.com/vi/2unZmy3-2N4/0.jpg)](https://www.youtube.com/watch?v=2unZmy3-2N4)


## Kjøring

Installer avhengigheter med

```bash
yarn install eller npm install
```

Start applikasjonen med

```bash
npx expo start
```

Du kan da velge om du vil kjøre appen på mobiltelefon gjennom expo-go applikasjonen eller teste med iOS (kun mac) eller Andriod simulator.

## Movsearch med React Native

I prosjekt 4 er det bygget videre på backend fra prosjekt 3 og laget en React Native klient. Backend fra prosjekt 3 er endret noe for å rette opp i feil og mangler.

- Måten filmer hentes på endret. Der det i tidligere utgave "gikk" ann å søke etter film, skuespiller og år er dette forenklet i denne utgaven. Etter vurdering fant en ut at denne løsningnen ikke fungerte på noen god måte, da en ofte fikk dårlige resultater på søk, samt søkeresultater som ikke gav så mye mening ut i fra søket. Søkefunksjonen er derfor endret til å kun omfatte titler.
- Sortering og filtrerting er også gjort litt om på slik at nå kan man sortere mest populære / mest stemt på filmer og filtrere disse resultatene på en eller flere kategorier.
- En bruker-id nå er lagt til en anmeldelse slik at klienten kan hente ut alle anmeldelsene til en bruker og vise disse i brukersiden.

## Utvikling av klient

### React Native

Under utviklingen av RN klienten er det brukt verktøyet [expo](https://expo.dev/). Expo lar deg kjøre react native applikasjonen på simulator lokalt på maskinen (iOS og Android) samt teste den live på en fysisk mobiltelefon. Under utvikling av klienten er det testet at applikasjonen fungerer på både iOS og Android, mens hovedfokus har vært på iOS klienten. For testing er det brukt Pixel 6 PRO og iPhone 14 simulatorer. Klienten skal skalere til ulike størrelser, og alt av kall til enhets-spesifikke APIer følger standarden som nevnt i RN [dokumentasjonen](https://reactnative.dev/docs/getting-started).

### Git

Selv om prosjektet er gjort individuelt er Git brukt for organisering av utviklingsoppgaver og alle commits er knyttet opp til issues, med unntak av små feilrettinger og oppsett av prosjektet.

### Kodekvalitet

For kodekvalitet er det brukt eslint og prettier i både backend og movsearch-ios for å sørge for en viss standard på formattering. Under utviklingen av RN klienten er det tenkt på videre utvidelse og gjenbruk av komponenter. Da klienten er i en MVP tilstand er det begrenset med hvor mange komponenter som er gjenbrukt, men blant annet er reviews logikken gjenbrukt for å produsere to ulike versjoner av review visning.

### Tilgjengelighet

Fra prosjekt 3 er det tatt selvkritikk på flere områder som omhandler tilgjenglighet. Blant annet er det nå lagt til tekst på nesten alle elementer som vil gjøre det enklere for brukere med skjermlesere. Det er blitt brukt farger som har bedre kontrast mot hverandre.

### Testing

Da prosjektet er gjort individuelt har det ikke blitt prioritert å bruke tid på testing. Fokuset har vært å få appen fuksjonabel.
