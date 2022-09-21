import Footer from "../../components/partials/footer/Footer";
import { loadImageFromFile } from "./utils";
// import CountrySelect from "../../components/mulCountrySelection/MulCountrySelection";

import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, MenuItem, Paper, TextField } from "@mui/material";
import style from "./createListings.module.css";
import { toast } from "react-toastify";
import axios from "axios";

function CreateListingsCopy() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      beds: "",
      files: [], //sandra added
      bedrooms: "",
      bathrooms: "",
      address_1: "",
      address_2: "",
      country: "",
      state: "",
      postal_code: "",
      description: "",
    },
  });

  const handleSelectImage = async (e) => {
    const images = e.target.files;
    //only can set wadever was chosen first time
    let newImages = await Promise.all(
      [...images].map((image) => loadImageFromFile(image))
    );
    // setSelectedImages([...selectedImages, ...newImages]);
    setSelectedImages(newImages);
  };

  const handleDeleteImage = (image) => {
    setSelectedImages(
      selectedImages.filter((item) => {
        return item !== image;
      })
    );
  };

  const headerOptions = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  const handleFormSubmit = async (data) => {
    // console.log(data);
    try {
      // console.log(data.files);
      const formData = new FormData();
      Object.keys(data).forEach((element) => {
        formData.append(element, data[element]);
      });
      Object.keys(data.files).forEach((element) => {
        formData.append(element, data.files[element]);
      });
      const res = await axios.post(
        "https://ourairbnb.herokuapp.com/api/v1/user/listing",
        // "http://localhost:8000/api/v1/user/listing",
        formData,
        { headers: headerOptions }
      );
      // console.log(res);
      if (res.status === 200 || res.status === 201) {
        toast.success("Create listing successful", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/users/my/listings");
    } catch (error) {
      // console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleCancel = (e) => {
    navigate("/users/my/listings");
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={"container-fluid p-0"}
    >

      <div className={"container-xxl mt-4 "}>
        <div className={"text-center"}>
          <h3 >Add photos to your listing</h3>
        </div>
       

        

        {
          <Paper
            className={
              style.photoBox +
              " m-auto d-flex justify-content-center mt-4"
            }
          >            
            <div className="my-auto text-start filesInput">
              <h4>Select images to upload</h4>
              <div>
                <input
                  {...register("files")}
                  onChange={handleSelectImage}
                  name="files"
                  multiple
                  accept={"image/jpeg, image/png"}
                  type="file"
                  fullwidth
                  //hidden
                />
              </div>
              <p className={"text-secondary"}> Tips: png/jpeg only </p>
              {/* Upload */}
            </div>
            {/* <div className={style.imagesDiv}> */}
          {selectedImages.map((image) => {
            return (
              <div className="my-auto text-center">
                <div
                style={{
                  width: "200px",
                  marginRight: "20px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "25px",
                }}
              >
                <img src={image} key={image} width={"200px"} alt={"listing"} object-fit={"cover"}/>
                <Button
                  onClick={() => handleDeleteImage(image)}
                  color={"error"}
                >
                  Delete
                </Button>
              </div>
             
              </div>
              
            );
          })}
             {/* </div> */}
          </Paper>
        }
      </div>

      <div className={"container-xxl mt-4 "}>
        <div className={"text-center"}>
        <h3>Listing Information</h3>
        </div>
        <Paper
          className={
            style.photoBox + " d-flex align-items-center justify-content-center m-auto"
          }
        >
          <div className={"row w-100 mt-2"}>
            <div className={"col-5"}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Max length exceeded",
                  },
                  pattern: {
                    value: /^[0-9A-Za-z ]+$/i,
                    message: "Alphanumeric characters only",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    className={"mb-2"}
                    required
                    label={"Listing Name"}
                    variant={"standard"}
                    fullWidth
                    error={errors.name ? true : false}
                    {...field}
                    helperText={errors.name && <p>{errors.name.message}</p>}
                  />
                )}
              />

              <Controller
                name="beds"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  pattern: {
                    value: /^0|[1-9]\d*$/,
                    message: "Numbers only",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"beds"}
                    label={"Number of beds"}
                    className={"mb-2"}
                    // select
                    variant={"standard"}
                    fullWidth
                    type={Number}
                    error={errors.beds ? true : false}
                    {...field}
                    helperText={errors.beds && <p>{errors.beds.message}</p>}
                  >
                    {/* <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem> */}
                  </TextField>
                )}
              />

              <Controller
                name="bedrooms"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  pattern: {
                    value: /^0|[1-9]\d*$/,
                    message: "Numbers only",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"bedrooms"}
                    label={"Number of bedrooms"}
                    className={"mt-2"}
                    //select
                    variant={"standard"}
                    fullWidth
                    type={Number}
                    error={errors.bedrooms ? true : false}
                    {...field}
                    helperText={errors.bedrooms && <p>{errors.bedrooms.message}</p>}
                  >
                    {/* <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem> */}
                  </TextField>
                )}
              />

              <Controller
                name="bathrooms"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  pattern: {
                    value: /^0|[1-9]\d*$/,
                    message: "Numbers only",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"bathrooms"}
                    label={"Number of bathrooms"}
                    className={"mb-2"}
                    //select
                    variant={"standard"}
                    fullWidth
                    type={Number}
                    error={errors.bathrooms ? true : false}
                    {...field}
                    helperText={errors.bathrooms && <p>{errors.bathrooms.message}</p>}
                  >
                    {/* <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem> */}
                  </TextField>
                )}
              />

              <Controller
                name="state"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Alphabetical characters only",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    required
                    className={"mb-2"}
                    label={"State"}
                    variant={"standard"}
                    fullWidth
                    type={String}
                    error={errors.state ? true : false}
                    {...field}
                    helperText={errors.state && <p>{errors.state.message}</p>}
                  />
                )}
              />
            </div>

            <div className={"col-1"}></div>
            <div className={"col-5"}>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  pattern: {
                    value: /^0|[1-9]\d*$/,
                    message: "Numbers only",
                  },
                  min:{ value: 1,
                  message: "Min $50",},
                  max:{ value: 1000,
                    message: "Max $1000",},
                }}
                render={({ field }) => (
                  <TextField
                    // {...register("price", {
                    //   required: true,
                    //   min: 1,
                    //   max: 1000,
                    // })}
                    {...field}
                    required
                    name={"price"}
                    type={Number}
                    className={"mb-2"}
                    label={"Price:"}
                    variant={"standard"}
                    fullWidth
                    error={errors.price ? true : false}
                    {...field}
                    helperText={errors.price && <p>{errors.price.message}</p>}
                  />
                )}
              />

              <Controller
                name="address_1"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  maxLength: {
                    value: 200,
                    message: "Max length exceeded",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"address_1"}
                    label={"Address 1 - Street Name (Available to public)"}
                    className={"mb-2"}
                    variant={"standard"}
                    fullWidth
                    error={errors.address_1 ? true : false}
                    {...field}
                    helperText={errors.address_1 && <p>{errors.address_1.message}</p>}
                  />
                )}
              />

              <Controller
                name="address_2"
                control={control}
                rules={{
                  maxLength: {
                    value: 200,
                    message: "Max length exceeded",
                  },
                  pattern: {
                    value: /^[0-9A-Za-z ]+$/i,
                    message: "Alphanumeric characters only",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    // required
                    name={"address_2"}
                    label={"Address 2 - Apartment, Unit No. (optional)"}
                    className={"mb-2"}
                    variant={"standard"}
                    fullWidth
                    error={errors.address_2 ? true : false}
                    {...field}
                    helperText={errors.address_2 && <p>{errors.address_2.message}</p>}
                  />
                )}
              />

              <Controller
                name="country"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"country"}
                    label={"Country"}
                    className={"mb-2"}
                    select
                    variant={"standard"}
                    fullWidth
                    error={errors.country ? true : false}
                    {...field}
                    helperText={errors.country && <p>{errors.country.message}</p>}
                  >
                    <MenuItem value={"Singapore"}>Singapore</MenuItem>
                    <MenuItem value={"Canada"}>Canada</MenuItem>
                    <MenuItem value={"Brazail"}>Brazail</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="postal_code"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  pattern: {
                    value: /^0|[1-9]\d*$/,
                    message: "Numbers only",
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"postal_code"}
                    label={"Postal code"}
                    type={"number"}
                    className={"mb-2"}
                    variant={"standard"}
                    fullWidth
                    error={errors.postal_code ? true : false}
                    {...field}
                    helperText={errors.postal_code && <p>{errors.postal_code.message}</p>}
                  />
                )}
              />
            </div>

            <div className={"col-12 mb-4"}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Max length exceeded",
                  },
                  pattern: {
                    value: /^[0-9A-Za-z ]+$/i,
                    message: "Alphanumeric characters only",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    name={"description"}
                    required
                    label={"Descriptions:"}
                    fullWidth
                    variant={"standard"}
                    error={errors.description ? true : false}
                    {...field}
                    helperText={errors.description && <p>{errors.description.message}</p>}
                  />
                )}
              />
            </div>
          </div>
        </Paper>

        <div className={"mt-2 d-flex justify-content-evenly"}>
          <Button className={style.confirmButton} style={{margin:"30px"}}
            onClick={handleCancel}
            variant={"contained"}
            // className={"me-2"}
            color={"inherit"}
          >
            Cancel
          </Button>
          <Button type={"submit"} variant={"contained"} color={"primary"} className={style.confirmButton} style={{margin:"30px"}}> 
            Confirm
          </Button>
        </div>
      </div>

      <Footer />
    </form>
  );
}

export default CreateListingsCopy;
