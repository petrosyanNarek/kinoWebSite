import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    filmById: {},
    vidioFilm: '',
    similarFilms:[],
    comments:[]
}


export const getFilmById = createAsyncThunk(
    'filmById/getfilmById',

    async function (id, { rejectWithValue }) {
        const item = await axios.get(process.env.REACT_APP_GET_FILMS_BY_ID + id, {
            headers: {
                'X-API-KEY': process.env.REACT_APP_X_API_KEY,
                'Content-Type': 'application/json',
            },
        })
        const data = await item.data

        try {
            return data

        } catch (error) {
            return rejectWithValue(error)
        }


    }
)
export const getFilmVidio = createAsyncThunk(
    'filmById/getFilmVidio',

    async function (id, { rejectWithValue }) {
        const vidio = await axios.get( process.env.REACT_APP_GET_FILM_VIDIO + `${id}/videos`, {
            headers: {
                'X-API-KEY': process.env.REACT_APP_X_API_KEY,
                'Content-Type': 'application/json',
            },
        })
        const vidioData = await vidio.data
        try {
            return vidioData.items[0]

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

export const getSimilarFilms = createAsyncThunk(
    'filmById/getSimilarFilms',

    async function(id,{rejectWithValue}){
        const items = await axios.get( process.env.REACT_APP_GET_FILM_VIDIO + `${id}/similars`,{
            headers: {
                'X-API-KEY': process.env.REACT_APP_X_API_KEY,
                'Content-Type': 'application/json',
            },
        })

        const similarFilms = await items.data.items


        try {
            return similarFilms

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


export const getFilmComments = createAsyncThunk(
    'filmById/getFilmComments',

    async function(id,{rejectWithValue}){
        const items = await axios.get( process.env.REACT_APP_GET_FILM_VIDIO + `${id}/reviews`,{
            params:{
                order:'DATE_ASC'
            },
            headers: {
                'X-API-KEY': process.env.REACT_APP_X_API_KEY,
                'Content-Type': 'application/json',
            },
        })

        const comments = await items.data.items

        try {
            return comments

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

const filmByIdSlice = createSlice({
    name: 'filmById',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getFilmById.fulfilled, (state, action) => {
                state.filmById = action.payload
            })
            .addCase(getFilmVidio.fulfilled, (state, action) => {
                state.vidioFilm = action.payload
            })
            .addCase(getSimilarFilms.fulfilled, (state, action) => {
                state.similarFilms = action.payload
            })
            .addCase(getFilmComments.fulfilled,(state,action) => {
                state.comments = action.payload
            })
    }
})


export const selectFilmById = (state) => state.filmById.filmById;
export const selectFilmVideo = (state) => state.filmById.vidioFilm;
export const selectSimilarFilms = (state) => state.filmById.similarFilms;
export const selectComments = state => state.filmById.comments
export default filmByIdSlice.reducer;