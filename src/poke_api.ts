import { error } from "node:console";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = `${PokeAPI.baseURL}/location-area`;
        const resp = await fetch(url);
        if (!resp) {
            throw new Error("Invalid")
        }
        return await resp.json();
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const res = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
        if (!res) {
            throw new Error("Invalid")
        }
        return await res.json();
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
};

export type Location = {
    id: number;
    name: string;
};