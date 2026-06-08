const profileForm = document.getElementById("profileForm");

// Explicitly cache form elements to ensure consistent DOM mapping across modern browsers
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const gender = document.getElementById("gender");
const dob = document.getElementById("dob");
const age = document.getElementById("age");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const country = document.getElementById("country");
const city = document.getElementById("city");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const complexion = document.getElementById("complexion");
const languages = document.getElementById("languages");
const religion = document.getElementById("religion");
const caste = document.getElementById("caste");
const college = document.getElementById("college");
const degree = document.getElementById("degree");
const profession = document.getElementById("profession");
const company = document.getElementById("company");
const designation = document.getElementById("designation");
const income = document.getElementById("income");
const siblings = document.getElementById("siblings");
const familyType = document.getElementById("familyType");
const father = document.getElementById("father");
const mother = document.getElementById("mother");
const kids = document.getElementById("kids");
const pets = document.getElementById("pets");
const marital = document.getElementById("marital");
const relocate = document.getElementById("relocate");
const about = document.getElementById("about");

let customers = JSON.parse(localStorage.getItem("customers")) || [];
let currentUser = JSON.parse(localStorage.getItem("customer"));

/* LOAD OLD DATA */
window.onload = function() {
  if (currentUser) {
    fillForm(currentUser);
  }
};

function fillForm(user) {
  for (let key in user) {
    const field = document.getElementById(key);
    if (field) {
      field.value = user[key];
    }
  }
}

/* AUTOMATIC AGE CALCULATION FROM DOB */
if (dob && age) {
  dob.addEventListener("change", function() {
    if (this.value) {
      const birthDate = new Date(this.value);
      const ageDifference = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifference);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      age.value = calculatedAge;
    }
  });
}

/* SAVE OR UPDATE */
if (profileForm) {
  profileForm.addEventListener("submit", function(e) {
    e.preventDefault();
    saveProfile();
  });
}

function saveProfile() {
  const customer = {
    fname: fname.value,
    lname: lname.value,
    gender: gender.value,
    dob: dob.value,
    age: age.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    country: country.value,
    city: city.value,
    height: height.value,
    weight: weight.value,
    complexion: complexion.value,
    languages: languages.value,
    religion: religion.value,
    caste: caste.value,
    college: college.value,
    degree: degree.value,
    profession: profession.value,
    company: company.value,
    designation: designation.value,
    income: income.value,
    siblings: siblings.value,
    familyType: familyType.value,
    father: father.value,
    mother: mother.value,
    kids: kids.value,
    pets: pets.value,
    marital: marital.value,
    relocate: relocate.value,
    about: about.value
  };

  /* UPDATE EXISTING USER */
  const existingIndex = customers.findIndex(c => c.email === customer.email);

  if (existingIndex !== -1) {
    customers[existingIndex] = customer;
  } else {
    customers.push(customer);
  }

  /* SAVE */
  localStorage.setItem("customers", JSON.stringify(customers));
  localStorage.setItem("customer", JSON.stringify(customer));

  alert("Profile Saved Successfully!");
  window.location = "dashboard.html";
}