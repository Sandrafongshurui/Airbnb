import SiteHeader from "../../components/partials/siteHeaders/SiteHeaders";
import Footer from "../../components/partials/footer/Footer";
import { loadImageFromFile } from "./utils";

import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import style from './createListings.module.css';
import { toast } from 'react-toastify'
import axios from "axios"

function CreateListings() {
    const navigate = useNavigate();
    // const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        breed: '',
        beds:'',
        bedrooms:'',
        bathrooms:'',
        address_1:'',
        postal_code:'',
        description:''
    })

    
    // const handleSelectImage = async (e) => {
    //     const images = e.target.files;
    //     setSelectedImages(
    //         await Promise.all([...images].map(image => loadImageFromFile(image)))
    //     )
    // }

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const name = e.target.elements['name'].value;
        // const price = e.target.elements['price'].value;
        // const beds = e.target.elements['beds'].value;
        // const bedrooms = e.target.elements['bedrooms'].value;
        // const bathrooms = e.target.elements['bathrooms'].value;
        // const address_1 = e.target.elements['address_1'].value;
        // const postal_code = e.target.elements['postal_code'].value;
        // const description = e.target.elements['description'].value;

        axios({
            method: 'post',
            url: 'http://localhost:8000/api/v1/user/listing',
            body: JSON.stringify(formData),
            // JSON.stringify({
            //     name,
            //     price,
            //     beds,
            //     bedrooms,
            //     bathrooms,
            //     address_1,
            //     postal_code,
            //     description,
            //     images_url: selectedImages
            // })

        })
        .then(jsonResponse => {
            // displaying success message
            toast.success("Edit animal successful",
            {position: toast.POSITION.TOP_CENTER})

            // redirect to users hosting listing page
            navigate("/user/listing")
        })
        .catch(err => {
            toast.error(err.message,
            {position: toast.POSITION.TOP_CENTER})
        })
    }

    return (

        <form onSubmit={handleSubmit} className={'container-fluid p-0'}>

            <SiteHeader />
            
            {/* select photo and upload it
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

                <Paper className={style.photoBox + ' d-flex align-items-center justify-content-center'}>
                    <Button component={'label'}>
                        Upload Photo
                        <input onChange={handleSelectImage} name={'file'} multiple accept={'image/jpeg, image/png'} type={'file'} hidden/>
                    </Button>
                </Paper>
            </div> */}

            <div className={'container-xxl mt-4'}>
                <h4>Basic info</h4>

                <Paper className={style.photoBox + ' d-flex align-items-center justify-content-center'}>
                    <div className={'row w-100 mt-2'}>
                        <div className={'col-5'}>
                            <TextField required className={'mb-2'} name={'name'} label={'Name:'} variant={'standard'} value={formData.name} onChange={handleInputChange}fullWidth/>

                            <TextField required name={'beds'} label={'How many beds can guest use?'} className={'mb-2'} select variant={'standard'} value={formData.beds} onChange={handleInputChange} fullWidth>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </TextField>

                            <TextField required name={'bedrooms'} label={'How many bedrooms can guests use?'} className={'mt-2'} select variant={'standard'} value={formData.bedrooms} onChange={handleInputChange} fullWidth>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </TextField>

                            <TextField required name={'bathrooms'} label={'No of bathrooms'} className={'mb-2'} select variant={'standard'} value={formData.bathrooms} onChange={handleInputChange} fullWidth>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </TextField>
                        </div>

                        <div className={'col-1'}></div>
                        <div className={'col-5'}>
                            <TextField required name={'price'} type={'number'} className={'mb-2'} label={'Price:'} variant={'standard'} value={formData.price} onChange={handleInputChange} fullWidth/>
                            <TextField required name={'address_1'} label={'Address'} className={'mb-2'} variant={'standard'} value={formData.address_1} onChange={handleInputChange} fullWidth />
                            <TextField required name={'postal_code'} label={'Post code'} className={'mb-2'} variant={'standard'} value={formData.postal_code} onChange={handleInputChange} fullWidth />
                        </div>

                        <div className={'col-12 mb-4'}>
                            <TextField name={'description'} required label={'Descriptions:'} fullWidth variant={'standard'} value={formData.description} onChange={handleInputChange}/>
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