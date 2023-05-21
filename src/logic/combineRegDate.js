const combineRegDate = (reg_date) => {
  let return_date = "";
  let date_list = reg_date.slice(0, 3);

  return_date = date_list.join(". ") + ` ${reg_date[3]} :  ${reg_date[4]}`;
  return return_date;
};

export default combineRegDate;
