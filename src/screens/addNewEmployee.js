import { useState, useEffect, useRef } from "react";
import ConfirmationModal from "../components/confirmationModal";
import DropDown from "../components/dropDown";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNewEmployee, loadEmployees } from "../reducers/employeeReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-day-picker/dist/style.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/addNewEmployee.scss";
import states from "../data/states.json";
const stateNames = states.map((elt) => elt.name);
const departments = [
  "Sales",
  "Marketing",
  "Engineering",
  "Human Resources",
  "Legal",
];

const EMPLOYEE_REGEX = /^[A-z]{3,23}(?!\s*$).+$/;
const EMPLOYEE_NON_EMPTY_STRING_REGEX = /^(?!\s*$).+/;
const NON_EMPY_STRING = /^(?!\s*$).+/;

export default function AddNewEmployee() {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [birthDate, setBirthDate] = useState("");
  const [validDob, setValidDob] = useState(false);
  // const [dobfocus, setDobFocus] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [validDate, setValidDate] = useState(false);
  // const [dateFocus, setDateFocus] = useState(false);

  const [street, setStreet] = useState("");
  const [validStreet, setValidStreet] = useState(false);
  const [streetFocus, setStreetFocus] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  // const [cityFocus, setCityFocus] = useState(false);

  const [zipCode, setZipCode] = useState("");
  const [validZipCode, setValidZipCode] = useState(false);
  // const [zipCodeFocus, setZipCodeFocus] = useState(false);

  const [state, setState] = useState("");
  const [validState, setValidState] = useState(false);
  // const [stateFocus, setStateFocus] = useState(false);

  const [department, setDepartment] = useState("");
  const [validDepartment, setValidDepartment] = useState(false);
  // const [departmentFocus, setDepartmentFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(true);

  const [modalTriggered, setModalTriggered] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(EMPLOYEE_REGEX.test(firstName));
    setValidLastName(EMPLOYEE_REGEX.test(lastName));
    setValidCity(EMPLOYEE_REGEX.test(city));
    setValidStreet(NON_EMPY_STRING.test(street));
    setValidDob(EMPLOYEE_NON_EMPTY_STRING_REGEX.test(birthDate));
    setValidDate(EMPLOYEE_NON_EMPTY_STRING_REGEX.test(startDate));
    setValidZipCode(NON_EMPY_STRING.test(zipCode));
    setValidState(EMPLOYEE_NON_EMPTY_STRING_REGEX.test(state));
    setValidDepartment(EMPLOYEE_NON_EMPTY_STRING_REGEX.test(department));
  }, [
    firstName,
    validFirstName,
    validLastName,
    lastName,
    city,
    validCity,
    street,
    validStreet,
    birthDate,
    validDob,
    startDate,
    validDate,
    zipCode,
    validZipCode,
    state,
    validState,
    department,
    validDepartment,
  ]);

  useEffect(() => {
    setErrMsg("");
  }, [
    firstName,
    lastName,
    birthDate,
    startDate,
    street,
    city,
    zipCode,
    state,
    department,
  ]);

  const handleAddNewEmployee = (e) => {
    e.preventDefault();

    if (
      validFirstName &&
      validLastName &&
      validDob &&
      validDate &&
      validStreet &&
      validCity &&
      validState &&
      validDepartment &&
      validZipCode
    ) {
      let data = {
        id: employees.length + 1,
        firstName,
        lastName,
        birthDate: new Date(birthDate).toISOString(),
        startDate: new Date(startDate).toISOString(),
        street,
        city,
        state,
        department,
        zipCode,
      };

      dispatch(addNewEmployee(data));
      dispatch(loadEmployees());
      setModalTriggered(true);
      setSuccess(true);

      setFirstName("");
      setLastName("");
      setBirthDate("");
      setStartDate("");
      setStreet("");
      setCity("");
      setState("");
      setDepartment("");
      setZipCode("");
    } else {
      setErrMsg("Some fields are not properly completed");
      setSuccess(false);
    }
  };

  return (
    <main className="main-wrapper">
      {modalTriggered && (
        <ConfirmationModal
          employees={employees}
          modalTriggered={modalTriggered}
          setModalTriggered={setModalTriggered}
        />
      )}

      <section className="container">
        <h2>Create a new employee</h2>

        {employees && (
          <Link
            className="view-employees"
            style={
              employees.length ? { display: "inline" } : { display: "none" }
            }
            to="employee-list"
          >
            <span>
              {employees.length === 1
                ? "Say Hello to your first employee"
                : `View your ${employees.length} employees`}
            </span>
          </Link>
        )}

        <p style={{ color: "red" }} ref={errRef}>
          {errMsg}
        </p>
        <form onSubmit={handleAddNewEmployee}>
          <div className="first-section">
            <div className="input-container">
              <div className="label-box">
                <label htmlFor="first-name">First Name</label>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validFirstName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validFirstName || !firstName ? "hide" : "invalid"}
                />
              </div>

              <input
                ref={userRef}
                type="text"
                id="first-name"
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />

              <p
                className={
                  firstNameFocus && firstName && !validFirstName
                    ? "instructions"
                    : "offscreen"
                }
              >
                4 to 24 characters. <br />
                Must only contain letters
              </p>
            </div>

            <div className="input-container">
              <div className="label-box">
                <label htmlFor="last-name">Last Name</label>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validLastName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validLastName || !lastName ? "hide" : "invalid"}
                />
              </div>

              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />

              <p
                id="uidnote"
                className={
                  lastNameFocus && lastName && !validLastName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br />
                Must only contain letters
              </p>
            </div>

            <div className="input-container">
              <div className="label-box">
                <label htmlFor="date-of-birth">Date of Birth</label>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validDob ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validDob || !birthDate ? "hide" : "invalid"}
                />
              </div>

              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={15}
                scrollableYearDropdown
              />
            </div>

            <p
              id="uidnote"
              className={birthDate && !validDob ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Add your birth date
            </p>

            <div className="input-container">
              <div className="label-box">
                {" "}
                <label htmlFor="start-date">Start Date</label>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validDate ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validDate || !startDate ? "hide" : "invalid"}
                />
              </div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="MM/dd/yyyy"
              />
            </div>
          </div>

          <div className="address-section">
            <legend>Address</legend>
            <div className="item-section">
              <div className="input-container">
                <div className="label-box">
                  {" "}
                  <label htmlFor="street">Street</label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validStreet ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validStreet || !street ? "hide" : "invalid"}
                  />
                </div>

                <input
                  id="street"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  onFocus={() => setStreetFocus(true)}
                  onBlur={() => setStreetFocus(false)}
                />

                <p
                  id="uidnote"
                  className={
                    streetFocus && street && !validStreet
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Field cannot be empty
                </p>
              </div>
              <div className="input-container">
                <div className="label-box">
                  {" "}
                  <label htmlFor="city">City</label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validCity ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validCity || !city ? "hide" : "invalid"}
                  />
                </div>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="input-container">
                <div className="label-box">
                  {" "}
                  <label htmlFor="state">State</label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validState ? "valid" : "hide"}
                  />
                </div>

                <DropDown value={state} setValue={setState} arr={stateNames} />

                {/* <select
                  name="state"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {states.map((state, key) => {
                    return <option key={key}>{state.name}</option>;
                  })}
                </select> */}
              </div>
              <div className="input-container">
                <div className="label-box">
                  {" "}
                  <label htmlFor="zip-code">Zip Code</label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validZipCode ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validZipCode || !zipCode ? "hide" : "invalid"}
                  />
                </div>

                <input
                  id="zip-code"
                  type="number"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              <div className="input-container">
                <div className="label-box">
                  {" "}
                  <label htmlFor="department">Department</label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validDepartment ? "valid" : "hide"}
                  />
                </div>

                <DropDown
                  value={department}
                  setValue={setDepartment}
                  arr={departments}
                />
              </div>
            </div>
          </div>
          <button className="btn-submit">Save</button>
        </form>
      </section>
    </main>
  );
}
