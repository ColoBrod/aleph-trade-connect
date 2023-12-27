import React, { ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';
import './style.css';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import defaultSrc from '../Common/user-default-image.jpg';
// const defaultSrc =
//   "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

import { useAppSelector, useAppDispatch } from '~/hooks';
import { uploadImageToggled } from '~/store/ui/profile';

const UploadImage = () => {
  const dispatch = useAppDispatch();
  const { display } = useAppSelector(state => state.ui.profile.uploadImage);

  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {
    console.log("%cDISPLAY:", "color: blue; font-size: 30px;");
    console.log(display);
    if (display === 'none') return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      dispatch(uploadImageToggled(false));
      console.log("Escape pressed");
    }
    const handleClickOutside = (e: MouseEvent) => {
      // @ts-ignore
      if (e.target.closest('.avatar')) return;
      // @ts-ignore
      if (e.target.closest('.modal-box-upload-image__inner')) return;
      dispatch(uploadImageToggled(false))
      console.log("Click outside");
    }
    // @ts-ignore
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    console.log("%cListeners added", "color: green; font-size: 16px;");
    return () => {
      // @ts-ignore
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      console.log("%cListeners removed", "color: red; font-size: 16px;");
    }
  }, [display])

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="modal-box-upload-image" style={{display}}>
      <div className="modal-box-upload-image__inner">
        <h1>Загрузить изображение</h1>
        <div style={{ width: "100%" }}>
          <input type="file" onChange={onChange}  />
          <button>Сбросить</button>
          <br />
          <br />
          <Cropper
            style={{ height: 300, width: "100%" }}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            ref={cropperRef}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          />
        </div>
        <div>
          <div className="box" style={{ width: "50%", float: "right" }}>
            <h1>Preview</h1>
            <div
              className="img-preview"
              style={{ width: "100%", float: "left", height: "300px" }}
            />
          </div>
          <div
            className="box"
            style={{ width: "50%", float: "right", height: "300px" }}
          >
            <h1>
              <span>Crop</span>
              <button style={{ float: "right" }} onClick={getCropData}>
                Crop Image
              </button>
            </h1>
            <img style={{ width: "100%" }} src={cropData} alt="cropped" />
          </div>
        </div>
        <br style={{ clear: "both" }} />
      </div>
    </div>
  )
}

export default UploadImage;