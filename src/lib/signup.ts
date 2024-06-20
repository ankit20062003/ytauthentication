import { connectToDatabase } from '@/lib/utils';
import { User } from '@/models/userModel';

export const signupfunction = async (formdata: FormData) => {
  const name = formdata.get("name") as string | undefined;
  const email = formdata.get("email") as string | undefined;
  const password = formdata.get("password") as string | undefined;

  if (!name || !email || !password) {
    console.log("something missing");
    throw new Error("please provide all fields");
  }

  // Connect with database here
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (user) throw new Error("already existing user");

  await User.create({
    name, email, password
  });
}
