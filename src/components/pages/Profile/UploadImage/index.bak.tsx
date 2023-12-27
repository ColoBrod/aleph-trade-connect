import React, { ChangeEvent, MouseEvent, useRef } from 'react';
import './style.css';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

import { useAppSelector, useAppDispatch } from '~/hooks';

// // vars
// let result = document.querySelector('.result'),
// img_result = document.querySelector('.img-result'),
// img_w = document.querySelector('.img-w'),
// img_h = document.querySelector('.img-h'),
// options = document.querySelector('.options'),
// cropped = document.querySelector('.cropped'),
// dwn = document.querySelector('.download'),
// cropper = '';

// // on change show image with crop options
// upload.addEventListener('change', (e) => {
//   if (e.target.files.length) {
// 		// start file reader
//     const reader = new FileReader();
//     reader.onload = (e)=> {
//       if(e.target.result){
// 				// create new image
// 				let img = document.createElement('img');
// 				img.id = 'image';
// 				img.src = e.target.result
// 				// clean result before
// 				result.innerHTML = '';
// 				// append new image
//         result.appendChild(img);
// 				// show save btn and options
// 				save.classList.remove('hide');
// 				options.classList.remove('hide');
// 				// init cropper
// 				cropper = new Cropper(img);
//       }
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   }
// });

// // save on click
// save.addEventListener('click',(e)=>{
//   e.preventDefault();
//   // get result to data uri
//   let imgSrc = cropper.getCroppedCanvas({
// 		width: img_w.value // input value
// 	}).toDataURL();
//   // remove hide class of img
//   cropped.classList.remove('hide');
// 	img_result.classList.remove('hide');
// 	// show image cropped
//   cropped.src = imgSrc;
//   dwn.classList.remove('hide');
//   dwn.download = 'imagename.png';
//   dwn.setAttribute('href',imgSrc);
// });



const UploadImage = () => {
  const dispatch = useAppDispatch();
  const { display } = useAppSelector(state => state.ui.profile.uploadImage);

  const resultRef = useRef(0); // document.querySelector('.result'),
  // img_result = document.querySelector('.img-result'),
  // img_w = document.querySelector('.img-w'),
  // img_h = document.querySelector('.img-h'),
  const optionsRef = useRef(0); // options = document.querySelector('.options'),
  const saveRef = useRef(0); // save = document.querySelector('.save'),
  // cropped = document.querySelector('.cropped'),
  // dwn = document.querySelector('.download'),
  // upload = document.querySelector('#file-input'),
  let cropper: Cropper;

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) return;
    // start file reader
    const reader = new FileReader();
    reader.onload = (e)=> {
      if (!e.target?.result) return;
      // create new image
      const img = document.createElement('img');
      img.id = 'image';
      img.src = e.target.result as string;
      // clean result before
      const result = resultRef.current;
      const save = saveRef.current;
      const options = optionsRef.current;
      if (!result || !save || !options) {
        console.log("Ouuups, something went wrong");
        return;
      }
      // result.innerHTML = '';
      // // append new image
      // result.appendChild(img);
      // // show save btn and options
      // save.classList.remove('hide');
      // options.classList.remove('hide');
      // // init cropper
      // cropper = new Cropper(img);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  
  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
  
  }

  return (
    <div className="modal-box-upload-image" style={{display}}>
      <div className="modal-box-upload-image__inner">

        <h2>Upload ,Crop and save.</h2>
        {/* input file */}
        <div className="box">
          <input onChange={handleUpload} type="file" id="file-input" />
        </div>
        {/* leftbox */}
        <div className="box-2">
          <div ref={resultRef} className="result"></div>
        </div>
        {/* ightbox*/}
        <div className="box-2 img-result hide">
          {/* result of crop */}
          <img className="cropped" src="" alt="" />
        </div>
        {/* input file */}
        <div className="box">
          <div ref={optionsRef} className="options hide">
            <label> Width</label>
            <input type="number" className="img-w" value="300" min="100" max="1200" />
          </div>
          {/* save btn */}
          <button ref={saveRef} onClick={handleSave} className="button save hide">Save</button>
          {/* download btn */}
          <a href="" className="button download hide">Download</a>
        </div>

      </div>
    </div>
  )
}

export default UploadImage;