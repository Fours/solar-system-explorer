import type { OverviewData, PlanetData, SunData } from "../types/types";

export const overviewData: OverviewData = {
    designation: "Sol System · Local Stellar Neighborhood",
    lede: "A planetary system formed 4.6 billion years ago from the gravitational collapse of a molecular cloud fragment — comprising one star, eight planets, five recognized dwarf planets, and over a million catalogued minor bodies.",
    sections: [
        {
            label: "Formation",
            body: "The system condensed from a rotating disk of gas and dust. Heavy elements settled inward, forming the four rocky terrestrial planets; volatiles accreted beyond the frost line, producing the gas and ice giants. Leftover debris populates the asteroid belt, the Kuiper Belt, and the distant Oort Cloud."
        },
        {
            label: "Architecture",
            body: "Eight major planets orbit roughly in the ecliptic plane. The terrestrial planets — Mercury, Venus, Earth, Mars — occupy the inner system. Beyond the asteroid belt lie the gas giants Jupiter and Saturn, and the ice giants Uranus and Neptune."
        },
        {
            label: "Boundaries",
            body: "The heliopause — where the solar wind meets the interstellar medium — marks the edge of the heliosphere at roughly 120 AU. The hypothesized Oort Cloud may extend to 100,000 AU, halfway to Proxima Centauri."
        }
    ],
    stats: [
        { key: "Age", value: "4.603", unit: "Gyr" },
        { key: "Planets", value: "8", unit: "" },
        { key: "Dwarf Planets", value: "5", unit: "recognized" },
        { key: "Known Moons", value: "300+", unit: "" },
        { key: "Heliopause", value: "≈120", unit: "AU" },
        { key: "Local Group", value: "Orion Arm", unit: "Milky Way" }
    ]
}

export const sunData: SunData = {
    id: "sun",
    name: "Sol",
    designation: "G2V Yellow Dwarf",
    color: "#f0b86c",
    displayRadius: 28,
    classification: "Star · Main Sequence",
    lede: "The gravitational anchor of the system. A 4.6-billion-year-old G-type main-sequence star fusing roughly 600 million tons of hydrogen into helium every second.",
    body: [
        "Sol contains 99.86% of the mass of the entire solar system. Its core reaches 15.7 million Kelvin, where pressure and temperature sustain proton-proton chain fusion.",
        "Light from the photosphere takes 8 minutes 20 seconds to reach Earth. The Sun is currently in its hydrogen-burning phase, with an estimated 5 billion years remaining before red-giant expansion."
    ],
    stats: [
        { key: "Radius", value: "695,700", unit: "km" },
        { key: "Mass", value: "1.989×10³⁰", unit: "kg" },
        { key: "Surface Temp", value: "5,778", unit: "K" },
        { key: "Core Temp", value: "15.7", unit: "MK" },
        { key: "Luminosity", value: "3.828×10²⁶", unit: "W" },
        { key: "Age", value: "4.603", unit: "Gyr" }
    ]
}

export const planetsData: PlanetData[] = [
    {
        id: "mercury",
        name: "Mercury",
        symbol: "☿",
        designation: "Planet I · Terrestrial",
        color: "#9c9088",
        displayRadius: 4,
        orbitRadius: 80,
        period: 12,
        startAngle: 30,
        auDistance: 0.39,
        diameterKm: 4879,
        diameterEarth: 0.38,
        massEarth: 0.055,
        gravityEarth: 0.38,
        yearDays: 87.97,
        dayHours: 4222.6,
        moons: [],
        lede: "The smallest planet and closest to the Sun. A scorched, cratered world with an iron core that occupies 60% of its mass.",
        body: [
            "Mercury has virtually no atmosphere, only a tenuous exosphere of atoms blasted off the surface by solar wind. Surface temperatures swing from −173°C at night to 427°C at noon.",
            "It orbits in a 3:2 spin-orbit resonance — three rotations for every two orbits — so a solar day on Mercury lasts 176 Earth days."
        ],
        composition: "Iron core, silicate mantle"
    },
    {
        id: "venus",
        name: "Venus",
        symbol: "♀",
        designation: "Planet II · Terrestrial",
        color: "#d9a86c",
        displayRadius: 7,
        orbitRadius: 120,
        period: 22,
        startAngle: 200,
        auDistance: 0.72,
        diameterKm: 12104,
        diameterEarth: 0.95,
        massEarth: 0.815,
        gravityEarth: 0.91,
        yearDays: 224.7,
        dayHours: -5832.5, // retrograde
        moons: [],
        lede: "Earth's so-called twin — similar in size and density, but transformed by a runaway greenhouse effect into the hottest planet in the system.",
        body: [
            "A dense CO₂ atmosphere with sulfuric-acid clouds traps heat at a uniform 462°C, hot enough to melt lead. Surface pressure is 92× Earth's — equivalent to ~900m underwater.",
            "Venus rotates retrograde, slowly: a single day exceeds its year. Recent observations have detected possible signs of active volcanism on Maat Mons."
        ],
        composition: "Iron core, silicate mantle, CO₂ atmosphere"
    },
    {
        id: "earth",
        name: "Earth",
        symbol: "♁",
        designation: "Planet III · Terrestrial",
        color: "#5b8fb0",
        displayRadius: 7.5,
        orbitRadius: 165,
        period: 30,
        startAngle: 110,
        auDistance: 1.00,
        diameterKm: 12742,
        diameterEarth: 1.0,
        massEarth: 1.0,
        gravityEarth: 1.0,
        yearDays: 365.25,
        dayHours: 23.93,
        moons: ["Luna"],
        lede: "The only world known to harbor life. A liquid-water surface, a magnetic shield, and a stabilizing moon — a rare confluence of planetary conditions.",
        body: [
            "71% of Earth's surface is ocean. Plate tectonics recycles the crust on a ~200 million year cycle, regulating long-term climate through the carbon-silicate cycle.",
            "Earth's axial tilt of 23.4° produces seasons; the Moon stabilizes that tilt against chaotic precession over geological timescales."
        ],
        composition: "Iron-nickel core, silicate mantle, N₂/O₂ atmosphere, hydrosphere"
    },
    {
        id: "mars",
        name: "Mars",
        symbol: "♂",
        designation: "Planet IV · Terrestrial",
        color: "#c1593a",
        displayRadius: 5.5,
        orbitRadius: 215,
        period: 42,
        startAngle: 320,
        auDistance: 1.52,
        diameterKm: 6779,
        diameterEarth: 0.53,
        massEarth: 0.107,
        gravityEarth: 0.38,
        yearDays: 686.97,
        dayHours: 24.62,
        moons: ["Phobos", "Deimos"],
        lede: "The red planet. Iron-oxide dust, polar ice caps, the largest volcano in the system, and ancient riverbeds carved by long-vanished water.",
        body: [
            "Olympus Mons rises 22 km above the surrounding plain — nearly three times the height of Everest. Valles Marineris stretches over 4,000 km, a tectonic gash visible from orbit.",
            "Mars lost most of its atmosphere when its magnetic dynamo shut down ~4 billion years ago. Today, surface pressure is less than 1% of Earth's; transient liquid brine may still flow."
        ],
        composition: "Iron-sulfur core, basaltic mantle, thin CO₂ atmosphere"
    },
    {
        id: "jupiter",
        name: "Jupiter",
        symbol: "♃",
        designation: "Planet V · Gas Giant",
        color: "#c8a273",
        displayRadius: 18,
        orbitRadius: 280,
        period: 70,
        startAngle: 60,
        auDistance: 5.20,
        diameterKm: 139820,
        diameterEarth: 11.0,
        massEarth: 317.8,
        gravityEarth: 2.53,
        yearDays: 4332.6,
        dayHours: 9.93,
        moons: ["Io", "Europa", "Ganymede", "Callisto", "Amalthea", "Himalia"],
        moonCount: 95,
        lede: "The system's largest planet. A hydrogen-helium gas giant with a mass 2.5× all other planets combined, orbited by 95 confirmed moons.",
        body: [
            "Jupiter's Great Red Spot is an anticyclonic storm wider than Earth that has persisted for at least 350 years. Its banded cloud tops are driven by 600 km/h jet streams.",
            "Below the visible cloud deck, hydrogen transitions to a metallic liquid form, generating a magnetic field 20,000× stronger than Earth's — the most powerful planetary field in the system."
        ],
        composition: "H₂/He envelope, metallic hydrogen mantle, rocky core"
    },
    {
        id: "saturn",
        name: "Saturn",
        symbol: "♄",
        designation: "Planet VI · Gas Giant",
        color: "#d4b574",
        displayRadius: 15,
        orbitRadius: 345,
        period: 92,
        startAngle: 240,
        auDistance: 9.54,
        diameterKm: 116460,
        diameterEarth: 9.14,
        massEarth: 95.2,
        gravityEarth: 1.07,
        yearDays: 10759,
        dayHours: 10.66,
        hasRings: true,
        moons: ["Titan", "Rhea", "Iapetus", "Dione", "Tethys", "Enceladus", "Mimas"],
        moonCount: 146,
        lede: "Adorned by the most spectacular ring system in the solar system — a 280,000 km wide disk of ice and rock only tens of meters thick.",
        body: [
            "Saturn is the least dense planet — lower than water. Its rings are likely young: 100–400 million years old, possibly the shattered remains of an icy moon.",
            "Titan, its largest moon, has a thick nitrogen atmosphere and methane lakes. Enceladus vents water plumes from a subsurface ocean — both are key targets in the search for life."
        ],
        composition: "H₂/He envelope, metallic hydrogen layer, rock-ice core, ring system"
    },
    {
        id: "uranus",
        name: "Uranus",
        symbol: "♅",
        designation: "Planet VII · Ice Giant",
        color: "#9ec9d6",
        displayRadius: 11,
        orbitRadius: 405,
        period: 120,
        startAngle: 150,
        auDistance: 19.18,
        diameterKm: 50724,
        diameterEarth: 3.98,
        massEarth: 14.5,
        gravityEarth: 0.89,
        yearDays: 30687,
        dayHours: -17.24,
        moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Oberon"],
        moonCount: 28,
        lede: "An ice giant tipped on its side — rotating at a 97.8° axial tilt, likely the result of an ancient collision with an Earth-sized body.",
        body: [
            "Uranus is composed largely of water, methane, and ammonia ices over a small rocky core. Methane in the upper atmosphere absorbs red light, giving it a pale cyan hue.",
            "Each pole experiences 42 years of continuous sunlight followed by 42 years of darkness. Wind speeds reach 900 km/h despite the planet's low internal heat."
        ],
        composition: "H₂/He/CH₄ atmosphere, water-ammonia mantle, rocky core"
    },
    {
        id: "neptune",
        name: "Neptune",
        symbol: "♆",
        designation: "Planet VIII · Ice Giant",
        color: "#3f6cc4",
        displayRadius: 11,
        orbitRadius: 460,
        period: 150,
        startAngle: 20,
        auDistance: 30.07,
        diameterKm: 49244,
        diameterEarth: 3.86,
        massEarth: 17.1,
        gravityEarth: 1.14,
        yearDays: 60190,
        dayHours: 16.11,
        moons: ["Triton", "Nereid", "Naiad", "Proteus"],
        moonCount: 16,
        lede: "The outermost planet — and the windiest. Discovered by mathematics before observation, predicted from anomalies in Uranus's orbit.",
        body: [
            "Neptune's atmosphere hosts the fastest winds in the solar system, reaching 2,100 km/h, despite receiving only 0.1% of Earth's sunlight.",
            "Triton, its largest moon, orbits backwards — almost certainly a captured Kuiper Belt object. It has active nitrogen geysers and a tenuous atmosphere."
        ],
        composition: "H₂/He/CH₄ atmosphere, water-ammonia ocean, rocky core"
    }
]
