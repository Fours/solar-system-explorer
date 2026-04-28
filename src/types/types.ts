
export interface Stat {
    k: string
    v: string
    u: string
}

export interface SunData {
    id: string
    name: string,
    designation: string,
    color: string,
    displayRadius: number,
    classification: string,
    lede: string
    body: string[],
    stats: Stat[]
}

export interface OverviewDataSection {
    label: string
    body: string
}

export interface OverviewData {
    designation: string
    lede: string
    sections: OverviewDataSection[]
    stats: Stat[]    
}

export interface PlanetData {
    id: string
    name: string
    symbol: string
    designation: string
    color: string
    displayRadius: number
    orbitRadius: number
    period: number
    startAngle: number
    auDistance: number
    diameterKm: number
    diameterEarth: number
    massEarth: number
    gravityEarth: number
    yearDays: number
    dayHours: number
    hasRings?: boolean,
    moons: string[]
    moonCount?: number,
    lede: string
    body: string[]
    composition: string
}
