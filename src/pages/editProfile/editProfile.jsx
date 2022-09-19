import Footer from "../../components/partials/footer/Footer";
import style from "./editProfile.module.css"

import { useForm, Controller } from "react-hook-form";
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Button,MenuItem,Paper,TextField} from "@mui/material";
import { toast } from 'react-toastify'

function EditProfile() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)

    const { reset, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            firstname: '',
            lastname:'',
            gender: '',
            about_me: '',
        }
    });

    const headerOptions = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('user_token')}`
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(`https://ourairbnb.herokuapp.com/api/v1/user/profile`, {headers:headerOptions})
            // const res = await fetch(`http://localhost:8000/api/v1/user/profile`, {headers:headerOptions})
            const data = await res.json()
            console.log(data)
            setProfile(data)
            reset({
                firstname: data.firstname,
                lastname: data.lastname,
                // gender: data.gender,
                about_me: data.about_me,
            })
        }
        fetchApi()
    }, [])

    function handleFormSubmit(e) {
        e.preventDefault()
        // console.log(JSON.stringify(getValues()))

            fetch(`https://ourairbnb.herokuapp.com/api/v1/user/profile`, 
            // fetch(`http://localhost:8000/api/v1/user/profile`,
            {
            method: 'PATCH',
            body: JSON.stringify(getValues()),
            headers: headerOptions,
            })

        .then(response => {
            toast.success("Edit successfully",
            { position: toast.POSITION.TOP_CENTER })
            navigate('/users/my/profile')
        })

        .catch(err => {
            toast.error(err.message, {position: toast.POSITION.TOP_CENTER})
        })
    }

    const handleCancel = (e) => {
        navigate("/users/my/profile")
    }

    return (

        <form onSubmit={handleFormSubmit} className={style.formBox + 'container-fluid p-0'}>

            <div className={'container-xxl sty-4 '}>
                <div className={style.title}>
                    <h4>Edit my profile</h4>
                </div>

                <Paper className={style.profileBox}>

                    <div className={"col-5"}>
                        <Controller
                            name="firstname"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Name is required",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Max length exceeded",
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message:
                                        "Alphabetical characters only",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    className={"mb-2"}
                                    label={"First name"}
                                    variant={"standard"}
                                    fullWidth
                                    error={errors.firstname ? true : false}
                                    {...field}
                                    helperText={
                                        errors.name && (
                                            <p>{errors.firstname.message}</p>
                                        )
                                    }
                                />
                            )}
                        />

                        <Controller
                            name="lastname"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Name is required",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Max length exceeded",
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message:
                                        "Alphabetical characters only",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    className={"mb-2"}
                                    label={"Last name"}
                                    variant={"standard"}
                                    fullWidth
                                    error={errors.lastname ? true : false}
                                    {...field}
                                    helperText={
                                        errors.name && (
                                            <p>{errors.lastname.message}</p>
                                        )
                                    }
                                />
                            )}
                        />

                        {/* <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    name={"gender"}
                                    label={"Gender"}
                                    className={"mb-2"}
                                    select
                                    variant={"standard"}
                                    fullWidth
                                >
                                    <MenuItem value={"female"}>Female</MenuItem>
                                    <MenuItem value={"male"}>Male</MenuItem>
                                </TextField>
                            )}
                        /> */}

                        <Controller
                            name="about_me"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className={"mb-2"}
                                    name={"about_me"}
                                    label={"About me:"}
                                    fullWidth
                                    variant={"standard"}
                                />
                            )}
                        />
                    </div>
                </Paper>

                <div className={'mt-4 mb-4 d-flex justify-content-end'}>
                        <Button onClick={ handleCancel } variant={'contained'} className={'me-2'} color={'inherit'}>Cancel</Button>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Confirm</Button>
                </div>

  
            </div>

            <Footer />
    
        </form>
    )


}

export default EditProfile