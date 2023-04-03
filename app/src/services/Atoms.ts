import { atom } from "jotai";
import {countryResource} from "./countriesApi";

//@ts-ignore
export const selectedCountry = atom<countryResource>();