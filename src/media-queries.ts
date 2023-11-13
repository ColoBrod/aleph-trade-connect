import { useMediaQuery } from "react-responsive";

export const MEDIA_XS_MAX = 575;
export const MEDIA_SM_MIN = 576;
export const MEDIA_SM_MAX = 1023;
export const MEDIA_MD_MIN = 1024;
export const MEDIA_MD_MAX = 1365;
export const MEDIA_LG_MIN = 1366;
export const MEDIA_LG_MAX = 1739;
export const MEDIA_XL_MIN = 1740;

export const use_SM_MIN = () => useMediaQuery({
  query: `(min-width: ${MEDIA_SM_MIN}px)`
});
export const use_MD_MIN = () => useMediaQuery({
  query: `(min-width: ${MEDIA_MD_MIN}px)`
});
export const use_LG_MIN = () => useMediaQuery({ 
  query: `(min-width: ${MEDIA_LG_MIN}px)`
});
export const use_XL_MIN = () => useMediaQuery({ 
  query: `(min-width: ${MEDIA_XL_MIN}px)`
});

export const use_XS_MAX = () => useMediaQuery({
  query: `(max-width: ${MEDIA_XS_MAX}px)`
});
export const use_SM_MAX = () => useMediaQuery({
  query: `(max-width: ${MEDIA_SM_MAX}px)`
});
export const use_MD_MAX = () => useMediaQuery({
  query: `(max-width: ${MEDIA_MD_MAX}px)`
});
export const use_LG_MAX = () => useMediaQuery({
  query: `(max-width: ${MEDIA_LG_MAX}px)`
});

export const use_XS = () => useMediaQuery({
  query: `(max-width: ${MEDIA_XS_MAX}px)`
});
export const use_SM = () => useMediaQuery({
  query: `(min-width: ${MEDIA_SM_MIN}px) and (max-width: ${MEDIA_SM_MAX}px)`
});
export const use_MD = () => useMediaQuery({
  query: `(min-width: ${MEDIA_MD_MIN}px) and (max-width: ${MEDIA_MD_MAX}px)`
});
export const use_LG = () => useMediaQuery({
  query: `(min-width: ${MEDIA_LG_MIN}px) and (max-width: ${MEDIA_LG_MAX}px)`
});
export const use_XL = () => useMediaQuery({
  query: `(min-width: ${MEDIA_XL_MIN}px)`
});