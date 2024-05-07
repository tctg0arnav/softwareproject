import { getAuth } from "firebase/auth";
import { app } from "/firebase";

export async function handlesignout() {
  const auth = getAuth(app);

  try {
    await auth.signOut();
  } catch (error) {
    alert(error);
  }
}
