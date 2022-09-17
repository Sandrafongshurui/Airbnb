import ProfileImg from "../../assets/images/profile.svg"
import style from "./showProfile.module.css"

import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

function ShowProfile() {

    const navigate = useNavigate();
    const params = useParams()
    const [profile, setProfile] = useState([]);

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
        }
        fetchApi()
    }, [])

    return (
        <div className={style.mainContainer}>

            <>

                <div className={style.profileContainer}>
                    <div class="row justify-content-between">

                        <div class="col-md-2">
                            <div className={style.imageBox}>
                                    <div className="row">
                                        <img className={style.avatarImage} src={ ProfileImg } alt=""/>
                                    </div>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link disabled">Reset Password</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link disabled">Delete account</a>
                                        </li>
                                    
                                    </ul>
                            </div>
                        </div>

                        <div className="col-md-6 ms-2">

                            <div className={style.profileHead}>

                                <h4>Welcome Back, { profile.lastname }</h4>

                                    <div className="profileDetails mt-4">
                                        <div className="row justify-content-between">

                                        <div className="col-md-4">
                                            <h6>First Name</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>{profile.firstname}</p>
                                        </div>

                                        <div className="col-md-4">
                                            <h6>Last Name</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>{ profile.lastname }</p>
                                        </div>

                                        <div className="col-md-4">
                                            <h6>Gender</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>{ profile.gender }</p>
                                        </div>

                                        <div className="col-md-4">
                                            <h6>About me</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>{ profile.about_me ? "Nothing added yet":""}</p>
                                        </div>


                                        </div>


                                    </div>

                                </div>
                        </div>

                        <div className="col-md-2 me-2 ">
                                <input type="submit" className={style.profileEditBtn} value="Edit" />
                        </div>
                    </div>

                        
                </div>

            </>
            
        </div>
    )
}
export default ShowProfile;