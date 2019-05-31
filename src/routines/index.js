import { createRoutine } from "redux-saga-routines";

export const getSchedule = createRoutine("GET_SCHEDULE");
export const getShow = createRoutine("GET_SHOW");
export const getSeasons = createRoutine("GET_SEASONS");
export const getEpisodes = createRoutine("GET_EPISODES");
export const getCastCrew = createRoutine("GET_CAST_CREW");

export const searchShows = createRoutine("SEARCH_SHOWS");
export const searchNames = createRoutine("SEARCH_NAMES");
export const liveSearchShows = createRoutine("LIVE_SEARCH_SHOWS");
export const liveSearchNames = createRoutine("LIVE_SEARCH_NAMES");
export const liveSearch = createRoutine("LIVE_SEARCH");
export const clearSearch = createRoutine("CLEAR_SEARCH");

export const getPerson = createRoutine("GET_PERSON");
export const getCastCredits = createRoutine("GET_CAST_CREDITS");
export const getCrewCredits = createRoutine("GET_CREW_CREDITS");
