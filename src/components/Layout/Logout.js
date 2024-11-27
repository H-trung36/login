import { clearAuth } from "../../utils/auth";
import { redirect } from "react-router-dom";

export function logoutAction() {
  clearAuth();
  return redirect("/");
}
