import { collection, doc, getDocs } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { auth, db } from "./firebase";

export const fetchUserOrders = async () => {
  try {
    const userId = auth.currentUser?.uid;
    const userOrdersRef = collection(doc(db, "users", userId), "orders");
    const querySnapshot = await getDocs(userOrdersRef);
    const orderList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orderList;
  } catch (error) {
    showMessage({
      type: "danger",
      message: "massage_error_fetching_orders",
    });
  }
};
