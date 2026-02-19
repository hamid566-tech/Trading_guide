export const handleSearchById = (searchId, navigate) => {

  if (!searchId.trim()) return;

  const id = searchId.toUpperCase();

  const routes = {
    "S_A_1": "/home/rent/rent_form",
    "S_A_2": "/home/mortgage/mortgage_form",
    "S_A_3": "/home/saleable/saleable_form",
    "S_A_4": "/home/applicant/applicant_form",
    "S_A_5": "/home/user/reset_password",
    "S_A_6": "/home/user/user_create_form",

  };

  if (routes[id]) {
    navigate(routes[id]);
  } else {
    alert("ID not found ❌");
  }
};
