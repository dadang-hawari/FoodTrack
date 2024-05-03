import { toast } from "react-toastify";

export default function ValidateEmail(mail) {
  if (mail.length === 0) return toast.info("Email is required");
  else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return toast.info("email address is not valid!", {
      toastId: "toastInfo",
    });
  }
}
