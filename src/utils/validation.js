const validate = require("validator");

const validationSingupData = (req) => {
  console.log("validate");
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname) {
    throw new Error("First name and last name are required");
  } else if (!validate.isEmail(email)) {
    throw new Error("Invalid email format");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateLoginData = (email) => {
  if (!validate.isEmail(email)) {
    throw new Error("Invalid email format");
  }
};

const isValidateEditProfileData = (req) => {
const isAllowedFields = [
  "firstname",
  "lastname",
  "gender",
  "age",
  "skills",
  "about",
  "photoUrl",  // ADD THIS
];

  const isValid = Object.keys(req.body).every((fiedlds) =>
    isAllowedFields.includes(fiedlds),
  );

  return isValid;
};

module.exports = {
  validationSingupData,
  validateLoginData,
  isValidateEditProfileData,
};
