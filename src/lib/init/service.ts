import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

//get all data
export async function retriveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

//get data by ID
export async function retriveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

//registrasi users
export async function signUp(
  DataUser: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", DataUser.email)
  );
  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (data.length > 0) {
    // console.log("email sudah terdaftar");
    callback(false);
    // return;
  } else {
    //cek role jika role y tidak ada maka default nya menjadi member
    if (!DataUser.role) {
      DataUser.role = DataUser.role || "member";
    }

    //hash password
    DataUser.password = await bcrypt.hash(DataUser.password, 10);

    // console.log(DataUser);
    await addDoc(collection(firestore, "users"), DataUser)
      .then(() => {
        callback(true);
      })
      .catch((error) => {
        callback(false);
        console.log(error);
      });
  }
}
