import SiteHeader from "../../components/partials/siteHeaders/SiteHeaders";
import Footer from "../../components/partials/footer/Footer";
import { loadImageFromFile } from "./utils";

import { useForm, Controller } from "react-hook-form";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import style from './createListings.module.css';
import { toast } from 'react-toastify'
import axios from "axios"

function CreateListings() {
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState([]);

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            price: 0,
            beds: 0,
            bedrooms: 0,
            bathrooms: 0,
            address_1: '',
            postalCode: '',
            description: ''
        }
    });
    
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const handleSelectImage = async (e) => {
        const images = e.target.files;
        setSelectedImages(
            await Promise.all([...images].map(image => loadImageFromFile(image)))
        )
    }
    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     const name = e.target.elements['name'].value;
    //     const price = e.target.elements['price'].value;
    //     const beds = e.target.elements['beds'].value;
    //     const bedrooms = e.target.elements['bedrooms'].value;
    //     const bathrooms = e.target.elements['bathrooms'].value;
    //     const address_1 = e.target.elements['address_1'].value;
    //     const postal_code = e.target.elements['postal_code'].value;
    //     const description = e.target.elements['description'].value;

    //     // try {
    //     //     const response = await axios.post('http://localhost:8000/api/v1/user/listing', defaultValues)
    //     //     console.log(response)
    //     //     toast.success(
    //     //         "Edit animal successful",
    //     //         {
    //     //             position: toast.POSITION.TOP_CENTER
    //     //         }
    //     //     )
    //     // } catch(error) {
    //     //     toast.error(
    //     //         error.message,
    //     //         {
    //     //             position: toast.POSITION.TOP_CENTER
    //     //         }
    //     //     )
    //     // }

    // axios.post({
    //         url: 'http://localhost:8000/api/v1/user/listing',
    //         data: JSON.stringify({
    //             name,
    //             price,
    //             beds,
    //             bedrooms,
    //             bathrooms,
    //             address_1,
    //             postal_code,
    //             description,
    //             images_url: selectedImages
    //         })

    //     })
    //     .then(jsonResponse => {
    //         // displaying success message
    //         toast.success("Create listing successful",
    //         {position: toast.POSITION.TOP_CENTER})

    //         // redirect to users hosting listing page
    //         // navigate("/user/listing")
    //     })
    //     .catch(err => {
    //         toast.error(err.message,
    //         {position: toast.POSITION.TOP_CENTER})
    //     })
    // }

    const test = async(data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/listing', data)
            console.log(response)
            toast.success(
                "Edit animal successful",
                {
                    position: toast.POSITION.TOP_CENTER
                }
            )
            navigate("/user/listing")
            
        } catch(error) {
            toast.error(
                error.message,
                {
                    position: toast.POSITION.TOP_CENTER
                }
            )
        }
    }

    return (

        <form onSubmit={handleSubmit(test)} className={'container-fluid p-0'}>

            <SiteHeader />
            
            {/* select photo and upload it */}
            <div className={'container-xxl mt-4'}>
                <h4>Add photos to your listing</h4>
                {selectedImages.map(image => {
                    return (
                        <img style={{marginRight: '20px'}} src={image} key={image} width={'200px'}/>
                    )
                })}
                <p className={'text-secondary'}>
                Tips: png/jpeg only
                </p>

                {
                    selectedImages.length < 1 && (
                        <Paper className={style.photoBox + ' d-flex align-items-center justify-content-center'}>
                            <Button component={'label'}>
                                Upload Photo
                                <input onChange={handleSelectImage} name={'file'} multiple accept={'image/jpeg, image/png'} type={'file'} hidden/>
                            </Button>
                        </Paper>
                    )
                }
            </div>

            <div className={'container-xxl mt-4'}>
                <h4>Basic info</h4>

                <Paper className={style.photoBox + ' d-flex align-items-center justify-content-center'}>
                    <div className={'row w-100 mt-2'}>
                        <div className={'col-5'}>

                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => <TextField {...register("name", { required: true, maxLength: 20 })} {...field} required className={'mb-2'} name={'name'} label={'Name:'} variant={'standard'} fullWidth/>}
                            />
                            
                            <Controller
                                name="beds"
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
                                name="postalCode"
                                control={control}
                                render={({ field }) => <TextField {...field} required name={'postalCode'} label={'Post code'} className={'mb-2'} variant={'standard'} fullWidth />}
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
                    <Button variant={'contained'} className={'me-2'} color={'inherit'}>Cancel</Button>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Confirm</Button>
                </div>
            </div>

            <Footer />
    
        </form>
    )

}

export default CreateListings