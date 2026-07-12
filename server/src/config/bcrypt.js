import bcrypt from "bcrypt";

const hashedPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export { hashedPassword, comparePassword };
