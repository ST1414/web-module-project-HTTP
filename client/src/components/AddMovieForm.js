import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovieState = {
    title:"",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
}

const AddMovieForm = (props) => {

    const [ movie, setMovie ] = useState(initialMovieState)
    const { push } = useHistory();
    
    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies/`, movie)
        .then( response => {
            props.setMovies(response.data);
            push(`/movies/`);
        })
        .catch( error => {
            console.log(error);
        })

    }

    return (
        <div className='add-movie-form'>
            <h1>Add Movie Form</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='title' value={movie.title} onChange={handleChange} placeholder='Enter Movie Title...' /><br/>
                <input type='text' name='director' value={movie.director} onChange={handleChange} placeholder='Enter Director...' /><br/>
                <input type='text' name='genre' value={movie.genre} onChange={handleChange} placeholder='Enter Genre...' /><br/>
                <input type='text' name='metascore' value={movie.metascore} onChange={handleChange} placeholder='Enter Metascore...'  /><br/>
                <input type='text' name='description' value={movie.description} onChange={handleChange} placeholder='Enter Description...'  /><br/>
                <button>Add Movie!</button>
            </form>
        </div>
    )

}

export default AddMovieForm;