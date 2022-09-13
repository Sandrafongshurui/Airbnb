import SiteHeader from "../../components/partials/siteHeaders/SiteHeaders";
import Footer from "../../components/partials/footer/Footer";
import { loadImageFromFile } from "../createListings/utils";

import { useForm, Controller } from "react-hook-form";
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Button,MenuItem,Paper,TextField} from "@mui/material";
import style from '../createListings/createListings.module.css';
import { toast } from 'react-toastify'

function EditListing() {
    const navigate = useNavigate()
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [selectedImages, setSelectedImages] = useState([]);

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            price: 0,
            beds: 0,
            bedrooms: 0,
            bathrooms: 0,
            address_1: '',
            address_2: '',
            country: '',
            postalCode: '',
            description: ''
        }
    });

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
        address_1: '',
        address_2: '',
        country: '',
        postalCode: '',
        description: ''
    })

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(`http://localhost:8000/api/v1/user/listing/${params.listingID}`)
            const data = await res.json()
            setListing(data)
            setFormData(data)
        }
        fetchApi()
    }, [params])

    useEffect(() => {
        if (listing) {
            setSelectedImages(listing.images_url);
        }
    }, [listing]);

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectImage = async (e) => {
            const images = e.target.files;
            let newImages = await Promise.all([...images].map(image => loadImageFromFile(image)));
            console.log(newImages)
            setSelectedImages(
                [...selectedImages, ...newImages]
            )
        }

    const handleDeleteImage = (image) => {
        setSelectedImages(selectedImages.filter(item => {
            return item !== image;
        }))
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:8000/api/v1/user/listing/${params.listingID}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json',
        },
        })

        .then(response => {
            return response.json()
        })

        .then(jsonResponse => {
            toast.success("Edit successfully",
            { position: toast.POSITION.TOP_CENTER })
            navigate('/user/listing')
        })

        .catch(err => {
            toast.error(err.message,
            {position: toast.POSITION.TOP_CENTER})
        })
    }

    return (

        <form onSubmit={handleFormSubmit} className={'container-fluid p-0'}>

            <SiteHeader />
            
            {/* select photo and upload it */}
            <div className={'container-xxl mt-4'}>
                <h4>Add photos to your listing</h4>
                
                {selectedImages?.map(image => {
                    return (
                    <div style={{width: '200px', marginRight: '20px', display: 'flex', flexDirection: 'column'}}>
                        <img  src={image} key={image} width={'200px'}/>
                        <Button onClick={() => handleDeleteImage(image)} color={'error'}>Delete</Button>
                    </div>
                    )
                })}

                <p className={'text-secondary'}>
                Tips: png/jpeg only
                </p>

                {
                    selectedImages?.length < 1 && (
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
                                Value={formData.name}
                                control={control}
                                render={({ field }) => 
                                    <TextField {...register("name", { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} 
                                    {...field} required className={'mb-2'} name={'name'} label={'Name:'} variant={'standard'} fullWidth/>
                                }
                            />
                            
                            <Controller
                                name="beds"
                                value={formData.beds}
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
                                value={formData.bedrooms}
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
                                value={formData.bathrooms}
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
                                value={formData.state}
                                control={control}
                                render={({ field }) => <TextField {...register("state", { required: true, maxLength: 20 })} {...field} required className={'mb-2'} name={'state'} label={'State'} variant={'standard'} fullWidth/>}
                            />

                        </div>

                        <div className={'col-1'}></div>
                        <div className={'col-5'}>
                            <Controller
                                name="price"
                                value={formData.price}
                                control={control}
                                render={({ field }) => <TextField {...register("price", { required: true, min:1, max: 100 })} {...field} required name={'price'} type={'number'} className={'mb-2'} label={'Price:'} variant={'standard'} fullWidth/>}
                            />
                            
                            <Controller
                                name="address_1"
                                value={formData.address_1}
                                control={control}
                                render={({ field }) => <TextField {...field} required name={'address_1'} label={'Address_1'} className={'mb-2'} variant={'standard'} fullWidth />}
                            />

                            <Controller
                                name="address_2"
                                value={formData.address_2}
                                control={control}
                                render={({ field }) => <TextField {...field} required name={'address_2'} label={'Address_2'} className={'mb-2'} variant={'standard'} fullWidth />}
                            />

                            <Controller
                                name="country"
                                value={formData.country}
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
                                name="postalCode"
                                value={formData.postalCode}
                                control={control}
                                render={({ field }) => <TextField {...field} required name={'postalCode'} label={'Post code'} className={'mb-2'} variant={'standard'} fullWidth />}
                            />
                        </div>

                        <div className={'col-12 mb-4'}>
                            <Controller
                                name="description"
                                value={formData.description}
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

export default EditListing