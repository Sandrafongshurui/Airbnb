import Footer from "../../components/partials/footer/Footer";
import { loadImageFromFile } from "../createListings/utils";

import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, MenuItem, Paper, TextField } from "@mui/material";
import style from "../createListings/createListings.module.css";
import { toast } from "react-toastify";

function EditListing() {
  const navigate = useNavigate();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const {
    reset,
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      beds: 0,
      bedrooms: 0,
      bathrooms: 0,
      address_1: "",
      address_2: "",
      country: "",
      state: "",
      postal_code: 0,
      description: "",
    },
  });

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  useEffect(() => {
    const fetchApi = async () => {
        const res = await fetch(
          `https://ourairbnb.herokuapp.com/api/v1/listings/${params.listingID}`,
          { headers: headerOptions })
        //const res = await fetch(`http://localhost:8000/api/v1/listings/${params.listingID}`,{headers:headerOptions})
        const data = await res.json();
        console.log(data);
        setListing(data);
        reset({
          name: data.name,
          price: data.price,
          beds: data.beds,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          address_1: data.address_1,
          address_2: data.address_2,
          country: data.country,
          state: data.state,
          postal_code: data.postal_code,
          description: data.description,
        });
    };
    fetchApi();
  }, [params]);

  useEffect(() => {
    if (listing) {
      setSelectedImages(listing.images_url);
    }
  }, [listing]);

  const handleSelectImage = async (e) => {
    const images = e.target.files;
    let newImages = await Promise.all(
      [...images].map((image) => loadImageFromFile(image))
    );
    console.log(newImages);
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const handleDeleteImage = (image) => {
    setSelectedImages(
      selectedImages.filter((item) => {
        return item !== image;
      })
    );
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(
      `https://ourairbnb.herokuapp.com/api/v1/user/listing/${params.listingID}`,
      // fetch(`http://localhost:8000/api/v1/user/listing/${params.listingID}`,
      {
        method: "PATCH",
        body: JSON.stringify(getValues()),
        headers: headerOptions,
      }
    )
      .then((response) => {
        toast.success("Edit successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/users/my/listings");
      })

      .catch((err) => {
        toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
      });
  }

  const handleCancel = (e) => {
    navigate("/users/my/listings");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={"container-fluid p-0"}
    >
      {/* <SiteHeader /> */}

      {/* select photo and upload it */}

      <div className={"container-xxl mt-4 "}>
        <div className={"text-center"}>
          <h3>Edit photos is currently unavailable</h3>
        </div>
       

        

        {
          <Paper
            className={
              style.photoBox +
              " m-auto d-flex justify-content-center mt-4"
            }
          >            
            <div className="my-auto text-start filesInput">
              <h6>Select images to upload</h6>
              <div>
                <input
                  {...register("files")}
                  onChange={handleSelectImage}
                  name="files"
                  multiple
                  accept={"image/jpeg, image/png"}
                  type="file"
                  fullwidth
                  disabled
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
                <Button disabled
                  // onClick={() => handleDeleteImage(image)}
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
                  pattern: {
                    value: /^[0-9A-Za-z ]+$/i,
                    message: "Alphanumeric characters only",
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

export default EditListing;
