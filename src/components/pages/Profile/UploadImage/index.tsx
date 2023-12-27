import React, { ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';
import './style.css';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
// import defaultSrc from './user-default-image.jpg';
import Button from '~/components/ui/Button';
// const defaultSrc =
//   "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

import { useAppSelector, useAppDispatch } from '~/hooks';
import { uploadImageToggled, avatarSet } from '~/store/ui/profile';
import imgClose from './close-btn.svg';

const UploadImage = () => {
  const dispatch = useAppDispatch();
  const { display } = useAppSelector(state => state.ui.profile.uploadImage);

  const { fullName, email, phone, avatar } = useAppSelector(state => state.ui.profile);
  const [image, setImage] = useState("");
  // const [cropData, setCropData] = useState("#");
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

  useEffect(() => {
    setImage(avatar);
    console.log("Crop Data:", avatar);
  }, [avatar])

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) files = e.dataTransfer.files;
    else if (e.target) files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const newAvatar = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      // console.log(newAvatar);
      dispatch(avatarSet(newAvatar));
      
      dispatch(uploadImageToggled(false));
    }
  };

  const handleClose = () => {
    dispatch(uploadImageToggled(false));
  }

  return (
    <div className="modal-box-upload-image" style={{display}}>
      <div className="modal-box-upload-image__inner">
        <img 
          className='modal-box-upload-image__close-btn' 
          onClick={handleClose} 
          src={imgClose} 
          alt="Закрыть окно" 
          />
        <h1>Загрузить изображение</h1>
        <div>
          <section className="top-panel">
            <input className='choose-files' type="file" onChange={onChange}  />
            <button className='reset'>Сбросить</button>
          </section>
          <Cropper
            // className='cropper'
            style={{ height: 400, width: 400 }}
            aspectRatio={1}
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

        <section className="bottom-panel">

          <div className="box">
            <div
              className="img-preview"
            />
          </div>

          <div className="box">
            <Button onClick={getCropData}>Сохранить</Button>
            <Button onClick={handleClose}>Отмена</Button>
          </div>

        </section>

      </div>
    </div>
  )
}

export default UploadImage;