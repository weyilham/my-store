import { addData, retriveDataByField } from "@/lib/init/service";
import bcrypt from "bcrypt";

//registrasi users
export async function signUp(
  DataUser: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: Function
) {
  const data = await retriveDataByField("users", "email", DataUser.email);

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
    DataUser.created_at = new Date();
    DataUser.updated_at = new Date();

    await addData("users", DataUser, (result: boolean) => {
      if (result) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
}

//login users
export async function signIn(email: string) {
  const data = await retriveDataByField("users", "email", email);

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

//login withGoogle
export async function loginWithGoogle(
  data: { email: string; role?: string },
  callback: Function
) {
  const user = await retriveDataByField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    // console.log(data);
    // console.log(user);
    // return;

    await addData("users", data, (result: boolean) => {
      if (result) {
        callback(data);
      } else {
        callback(null);
      }
    });
  }
}
