import ProfileImg from "../../assets/images/profile.svg"
import style from "./showProfile.module.css"

import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

function ShowProfile() {

    const navigate = useNavigate();
    const params = useParams()
    const [profile, setProfile] = useState([]);
    
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
                            </div>
                        </div>

                        <div className="col-md-6 ms-2">

                            <div className={style.profileHead}>

                                <h4>Welcome Back, XXX</h4>

                                    <div className="profileDetails mt-4">
                                        <div className="row justify-content-between">

                                        <div className="col-md-4">
                                            <h6>First Name</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>Test</p>
                                        </div>

                                        <div className="col-md-4">
                                            <h6>Last Name</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>Test</p>
                                        </div>

                                        <div className="col-md-4">
                                            <h6>Gender</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>Test</p>
                                        </div>

                                        <div className="col-md-4">
                                            <h6>About me</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>Test</p>
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