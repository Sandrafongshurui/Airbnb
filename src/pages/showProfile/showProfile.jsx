import ProfileImg from "../../assets/images/profile.svg";
import style from "./showProfile.module.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShowProfile() {
    const [profile, setProfile] = useState([]);

    const headerOptions = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    };

    useEffect(() => {
        const fetchApi = async () => {
            // const res = await fetch(`http://localhost:8000/api/v1/user/profile`,{headers:headerOptions})
            const res = await fetch(
                `https://ourairbnb.herokuapp.com/api/v1/user/profile`,
                { headers: headerOptions }
            );
            const data = await res.json();
            setProfile(data);
        };
        fetchApi();
    }, []);

    return (
        <div className={style.mainContainer}>
            <>
                <div className={style.profileContainer}>
                    <div class="row p-2 ">
                        <div class="col-md-3">
                            <div className={style.imageBox}>
                                <div className="row p-4">
                                    <img
                                        className={style.avatarImage}
                                        src={ProfileImg}
                                        alt=""
                                    />
                                </div>
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link disabled">
                                            Reset Password
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled">
                                            Delete account
                                        </a>
                                    </li>
                                    <li class="nav-item ms-3">
                                        <Link
                                            to={`/users/my/profile/edit`}
                                            className="card-link"
                                        >
                                            EDIT
                                        </Link>
                                    </li>
                                </ul>
                                <div className="col-md-1 ms-2 mt-2"></div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className={style.profileHead}>
                                <h4>Welcome back {profile.firstname}</h4>

                                <div className="profileDetails ms-4 mt-4">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h6>First Name</h6>
                                        </div>

                                        <div className="col-md-6">
                                            <p>{profile.firstname}</p>
                                        </div>

                                        <div className="col-md-6">
                                            <h6>Last Name</h6>
                                        </div>

                                        <div className="col-md-6">
                                            <p>{profile.lastname}</p>
                                        </div>

                                        {/* <div className="col-md-4">
                                            <h6>Gender</h6>                                     
                                        </div>

                                        <div className="col-md-6">
                                            <p>{ profile.gender }</p>
                                        </div> */}
                                        <div className="col-md-4">
                                            <h6>Email</h6>
                                        </div>

                                        <div className="col-md-6">
                                            <p>{profile.email}</p>
                                        </div>

                                        <div className="col-md-6">
                                            <h6>About me</h6>
                                        </div>

                                        <div className="col-md-6">
                                            <p>{profile.about_me}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}
export default ShowProfile;
