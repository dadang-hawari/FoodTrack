import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const passwordMedium = (password) => {
  if (
    /[0-9]/.test(password) &&
    /[a-zA-Z]/.test(
      password && password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
    ) &&
    password.length >= 8
  )
    return true;
  else return false;
};

export const passwordStrong = (password) => {
  const strongRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.,~/<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-])/;
  if (
    strongRegex.test(password) && password.length >= 8 && /^[A-Z]|(\s[A-Z])/.test(password)
      ? password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
      : ""
  )
    return true;
  else return false;
};

export const letterStartWithUppercase = (type, password) => {
  if (type === "style") {
    return /^[A-Z]|(\s[A-Z])/.test(password)
      ? password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
        ? "text-green-500"
        : "text-gray-500"
      : "text-gray-500";
  } else {
    return /^[A-Z]|(\s[A-Z])/.test(password)
      ? password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
        ? faCheck
        : faXmark
      : faXmark;
  }
};

export const passWithNumAndLetter = (type, password) => {
  const passNumAndLetter = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
  if (type === "style") {
    return passNumAndLetter ? "text-green-500" : "text-gray-500";
  }
  return passNumAndLetter ? faCheck : faXmark;
};
