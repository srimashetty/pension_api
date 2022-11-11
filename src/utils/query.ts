const existingUser = 'SELECT * FROM adminusers WHERE employee_number = $1 or phone_no = $2';
const newUser = 'INSERT INTO adminusers (name, employee_number, password, phone_no, zone, role) VALUES ($1, $2, $3, $4, $5, $6)';
const loginUser = 'SELECT * FROM adminusers WHERE employee_number = $1';

const queries = {
    existingUser,
    newUser,
    loginUser
}

export default queries;