import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import imgDefaultAvatar from '~/components/pages/Profile/UploadImage/user-default-image.jpg';
import config from "~/config";
import axios, { AxiosError, AxiosResponse } from "axios";
const BASE_URL = config.api.url + "/profile";

interface Profile {
  fullName: string;
  email: string;
  phone: string;
  org: string;
  avatar: string;
  displayPopup: boolean;
  uploadImage: {
    display: 'flex' | 'none';
  };
}

const initialState: Profile = {
  fullName: "",
  email: "",
  phone: "",
  org: "",
  avatar: "",
  displayPopup: false,
  uploadImage: {
    display: 'none',
  },
};

export const fetchUser = createAsyncThunk("profile", async () => {
  const config = {
    url: BASE_URL,
    method: "get",
  }
  try {
    const response = await axios(config);
    return {
      status: response.status,
      data: response.data,
    }
  }
  catch (e) {
    const error = e as AxiosError;
    const response = error.response as AxiosResponse;
    return {
      status: response.status,
      data: response.data,
    }
  }
})

// export const updateUser = createAsyncThunk("profile", async (data: {
//   fullName?: string;
//   email?: string;
//   phone?: string;
//   avatar?: string;
// }) => {
//   if (Object.keys(data).length === 0) return;
//   const config = {
//     url: BASE_URL,
//     method: "put",
//     data,
//   }
//   try {
//     const response = await axios(config);
//     return {
//       status: response.status,
//       data: response.data,
//     }
//   }
//   catch (e) {
//     const error = e as AxiosError;
//     const response = error.response as AxiosResponse;
//     return {
//       status: response.status,
//       data: response.data,
//     }
//   }
// })

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    popupToggled: (profile, action) => {
      const displayPopup = action.payload.display 
        ? action.payload.display
        : !profile.displayPopup
      profile.displayPopup = displayPopup;
    },
    uploadImageToggled: (state, action: {
      type: string;
      payload: boolean;
    }) => {
      const display = action.payload === true ? 'flex' : 'none';
      state.uploadImage.display = display;
    },
    avatarSet: (state, action: { 
      type: string; 
      payload: string; 
    }) => {
      console.log("WORKS?");
      console.log(action.payload);
      state.avatar = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { fullName, phone, email, avatar } = action.payload.data;
        Object.assign(state, {
          fullName, phone, email, avatar
        });
      })
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   // const { fullName, phone, email, avatar } = action.payload.data;
      //   if (!action.payload?.data) return;
      //   Object.assign(state, action.payload.data);
      // })
  }
  
});

export const { 
  popupToggled, 
  uploadImageToggled,
  avatarSet
} = slice.actions;
export default slice.reducer;
