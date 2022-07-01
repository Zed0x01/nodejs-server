const Employee = require('../model/Employee');

const getAllEmployees =async (req, res) => {
  const employees =await Employee.find();
  if(!employees) return res.status(204).json({"Message":"No Employess found."});
  res.json(employees)
};

const createEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({ message: "firstname and lastname are required" });
  }
  try{
    const newEmployee =await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
    console.log(newEmployee);
    res.json({
      "Success": `New Employee Created ${req.body.firstname}${req.body.lastname}`
    });
  }catch(err){
    console.log(err.message);
  }
};

const updateEmployee =async (req, res) => {
  if(!req?.body?.id) {
    return res.status(400).json({"Message":"id is required"});
  }
  const id = req.body.id;
  const EmployeeUpdate = await Employee.findOne({_id:id}).exec();
  if (!EmployeeUpdate) {
    return res.json({ Message: `This id ${id} isn't found.` });
  }
  if (req.body?.firstname) EmployeeUpdate.firstname = req.body.firstname;
  if (req.body?.lastname) EmployeeUpdate.lastname = req.body.lastname;
  await EmployeeUpdate.save();
  res.json(EmployeeUpdate);
};

const deleteEmployee =async (req, res) => {
  if(!req?.body?.id) return res.status(400).json({"Message":"id is required"});
  const id = req.body.id;
  const foundEmployee = await Employee.findOne({_id : id});
  if (!foundEmployee) {
    return res.json({ Message: `This id ${id} isn't found.` });
  }
  const deletedEmployee = await Employee.deleteOne({_id :id});
  res.json(deletedEmployee);
};

const getEmployee = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message":"id is required"})
  const foundEmployee = await Employee.findOne({_id : req.params.id});
  if (!foundEmployee) {
    return res.json({ Message: `This id ${req.params.id} isn't found.` });
  }
  res.json(foundEmployee);
};

module.exports = {
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee,
};
