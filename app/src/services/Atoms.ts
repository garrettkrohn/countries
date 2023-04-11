import { atom } from "jotai";
import {countryResource} from "./countriesApi";
import {userResource} from "./userApi";

const defaultUser = {
    userId: 0,
    username: 'default',
    backgroundColor: 'FF0000'
}

//@ts-ignore
export const selectedCountry = atom<countryResource>();
// @ts-ignore
export const selectedUser = atom<userResource>(defaultUser);