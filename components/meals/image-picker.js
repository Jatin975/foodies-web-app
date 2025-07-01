"use client";
import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const imagePicker = useRef();
  const [pickedImage, setPickedImage] = useState(null);

  function handleImagePicker() {
    imagePicker.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    let fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={`${classes.picker}`}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked yet</p>}
          {pickedImage && <Image src={pickedImage} alt="Image preview" fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          accept="image/png, image/jpeg"
          name={name}
          id={name}
          ref={imagePicker}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          onClick={handleImagePicker}
          type="button"
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
