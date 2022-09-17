import Footer from "../../components/partials/footer/Footer";
import { loadImageFromFile } from "../createListings/utils";

import { useForm, Controller } from "react-hook-form";
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Button,MenuItem,Paper,TextField} from "@mui/material";
import style from '../createListings/createListings.module.css';
import { toast } from 'react-toastify'

function EditProfile() {
    const navigate = useNavigate()
    const params = useParams()
    const [profile, setProfile] = useState(null)

    const { reset,register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            price: 0,
            beds: 0,
            bedrooms: 0,
            bathrooms: 0,
            address_1: '',
            address_2: '',
            country: '',
            state:'',
            postal_code: '',
            description: ''
        }
    });

    const headerOptions = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('user_token')}`
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(`http://localhost:8000/api/v1/user/profile`, {headers:headerOptions})
            const data = await res.json()
            console.log(data)
            setProfile(data)
            reset({
                firstname: data.firstname,
                lastname: data.lastname,
                gender: data.gender,
                about_me: data.about_me,
            })
        }
        fetchApi()
    }, [])

    function handleFormSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:8000/api/v1/user/profile`, {
            method: 'PATCH',
            body: JSON.stringify(getValues()),
            headers: headerOptions,
        })

        .then(response => {
            toast.success("Edit successfully",
            { position: toast.POSITION.BOTTOM_CENTER })
            navigate('/users/my/profile')
        })

        .catch(err => {
            toast.error(err.message, {position: toast.POSITION.BOTTOM_CENTER})
        })
    }

    const handleCancel = (e) => {
        navigate("/users/my/profile")
    }

    return (

        <form onSubmit={handleFormSubmit} className={'container-fluid p-0'}>

            <div className={'container-xxl mt-4'}>
                <h4>Edit my profile</h4>

                <Paper className={style.photoBox + ' d-flex align-items-center justify-content-center'}>
                    <div className={'row w-100 mt-2'}>
                        <div className={'col-5'}>
                            <Controller
                                name="name"
                                // Value={formData.name}
                                control={control}
                                render={({field}) => 
                                    (
                                        <TextField
                                            className={'mb-2'}
                                            label={'Name'}
                                            variant={'standard'}
                                            fullWidth
                                            error={errors.name ? true : false} 
                                            {...field}
                                            helperText={errors.name && <p>{errors.name.message}</p>}
                                        />
                                    )}
                            />
                            
                            <Controller
                                name="beds"
                                // value={formData.beds}
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} required name={'beds'} label={'How many beds can guest use?'} className={'mb-2'} select variant={'standard'} fullWidth>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                    </TextField>
                                )}
                            />

                            <Controller
                                name="bedrooms"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} required name={'bedrooms'} label={'How many bedrooms can guests use?'} className={'mt-2'} select variant={'standard'} fullWidth>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                    </TextField>
                                )}
                            />

                            <Controller
                                name="bathrooms"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} required name={'bathrooms'} label={'No of bathrooms'} className={'mb-2'} select variant={'standard'} fullWidth>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                    </TextField>
                                )}
                            />

                            <Controller
                                name="state"
                                control={control}
                                rules={{
                                    pattern: {value: /^[A-Za-z]+$/i, message:"Alphabetical characters only"}
                                }}
                                render={({field}) => 
                                    (
                                        <TextField
                                            className={'mb-2'}
                                            label={'State'}
                                            variant={'standard'}
                                            fullWidth
                                            error={errors.state ? true : false} 
                                            {...field}
                                            helperText={errors.state && <p>{errors.state.message}</p>}
                                        />
                                    )}
                            />

                        </div>

                        <div className={'col-1'}></div>
                        <div className={'col-5'}>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => <TextField {...register("price", { required: true, min:1, max: 100 })} {...field} required name={'price'} type={'number'} className={'mb-2'} label={'Price:'} variant={'standard'} fullWidth/>}
                            />
                            
                            <Controller
                                name="address_1"
                                control={control}
                                render={({ field }) => <TextField {...field} required name={'address_1'} label={'Address_1'} className={'mb-2'} variant={'standard'} fullWidth />}
                            />

                            <Controller
                                name="address_2"
                                control={control}
                                render={({ field }) => <TextField {...field} required name={'address_2'} label={'Address_2'} className={'mb-2'} variant={'standard'} fullWidth />}
                            />

                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} required name={'country'} label={'Country'} className={'mb-2'} select variant={'standard'} fullWidth>
                                        <MenuItem value={1}>Singapore</MenuItem>
                                        <MenuItem value={2}>China</MenuItem>
                                        <MenuItem value={3}>India</MenuItem>
                                    </TextField>
                                )}
                            />
                            
                            <Controller
                                name="postal_code"
                                control={control}
                                render={({ field }) => <TextField {...field} required name={'postal_code'} label={'Post code'} className={'mb-2'} variant={'standard'} fullWidth />}
                            />
                        </div>

                        <div className={'col-12 mb-4'}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => <TextField {...field} name={'description'} required label={'Descriptions:'} fullWidth variant={'standard'}/>}
                            />
                        </div>
                    </div>
                </Paper>

                <div className={'mt-2 d-flex justify-content-end'}>
                    <Button onClick={ handleCancel } variant={'contained'} className={'me-2'} color={'inherit'}>Cancel</Button>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Confirm</Button>
                </div>
            </div>

            <Footer />
    
        </form>
    )


}

export default EditProfile