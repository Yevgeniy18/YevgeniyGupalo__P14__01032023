import { createSlice } from "@reduxjs/toolkit";
import { mockedEmployees } from "../mockedData/employees";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    // employees: localStorage.getItem('employees') ? JSON.parse(localStorage.getItem('employees')) :[],
    employees: mockedEmployees,
    currentEmployees: [],
    filteredEmployees: [],
    appliedFilters: [],
    entries: 10,
    currentPage: 1,
    filterMode: false,
    paginatedEmployees: [],
  },
  reducers: {
    loadEmployees: (state) => {
      state.currentPage = 1;
      state.filterMode = false;
      state.appliedFilters = [];
      state.filteredEmployees = state.employees;
      let entries = state.entries;
      state.currentCount = entries;
      let totalPages = Math.ceil(state.filteredEmployees.length / entries);
      state.totalPages = totalPages;
      let currentEmployees = state.filteredEmployees.slice(0, entries);
      state.filteredEmployees = currentEmployees;
    },

    addNewEmployee: (state, action) => {
      const newEmployee = action.payload;

      state.employees = [...state.employees, newEmployee];
      // state.employees = [...state.employees, newEmployee]

      // localStorage.setItem('employees', JSON.stringify(state.employees))

      // localStorage.setItem("employees", JSON.stringify(state.employees));
    },

    filterEmployee: (state, action) => {
      const value = action.payload.value;

      let appliedFilters = state.appliedFilters;
      let filteredValues = state.employees.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(value.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(value.toLowerCase()) ||
          employee.department.toLowerCase().includes(value.toLowerCase()) ||
          employee.city.toLowerCase().includes(value.toLowerCase()) ||
          employee.state.toLowerCase().includes(value.toLowerCase()) ||
          employee.street.toLowerCase().includes(value.toLowerCase())
      );

      const actionType = action.type;

      if (value) {
        state.filterMode = true;
        let index = appliedFilters.indexOf(actionType);

        if (index === -1) appliedFilters.push(actionType);
        state.filteredEmployees = filteredValues;
        state.filteredListTotal = state.filteredEmployees;

        let employees = state.filteredEmployees;
        let entries = state.entries;
        let totalPages = Math.ceil(employees.length / entries);
        let currentEmployees = state.filteredListTotal.slice(0, entries);
        state.filteredEmployees = currentEmployees;
        state.totalPages = totalPages;
        state.currentPage = 1;
      } else {
        state.filterMode = false;
        let index = appliedFilters.indexOf(actionType);
        appliedFilters.splice(index, 1);
        if (appliedFilters.length === 0) {
          state.filteredEmployees = state.employees;
          let employees = state.filteredEmployees;
          let entries = state.entries;
          let totalPages = Math.ceil(employees.length / entries);
          state.totalPages = totalPages;
          let currentEmployees = employees.slice(0, entries);
          state.filteredEmployees = currentEmployees;
        }
      }
    },

    loadNewPage: (state, action) => {
      const page = action.payload.page;
      let entries = state.entries;
      state.currentPage += page;
      let nextEmployees;

      if (state.filterMode && state.filteredListTotal) {
        if (page === 1) {
          let upperCount = state.currentCount + entries;
          let lowerCount = state.currentCount;
          state.currentCount += entries;
          state.filteredEmployees = state.filteredListTotal;
          nextEmployees = state.filteredEmployees.slice(lowerCount, upperCount);
          state.filteredEmployees = nextEmployees;
        }

        if (page === -1) {
          let upperCount = state.currentCount;
          let lowerCount = state.currentCount - entries;
          state.currentCount = lowerCount;

          state.filteredEmployees = state.filteredListTotal;

          nextEmployees = state.filteredEmployees.slice(
            lowerCount - entries,
            upperCount - entries
          );

          state.filteredEmployees = nextEmployees;
        }
      } else {
        if (page === 1) {
          let upperCount = state.currentCount + entries;
          let lowerCount = state.currentCount;

          state.currentCount += entries;

          state.filteredEmployees = state.employees;

          nextEmployees = state.filteredEmployees.slice(lowerCount, upperCount);

          state.filteredEmployees = nextEmployees;
        }

        if (page === -1) {
          let upperCount = state.currentCount;
          let lowerCount = state.currentCount - entries;
          state.currentCount = lowerCount;

          state.filteredEmployees = state.employees;

          nextEmployees = state.filteredEmployees.slice(
            lowerCount - entries,
            upperCount - entries
          );

          state.filteredEmployees = nextEmployees;
        }
      }
    },

    loadExactPage: (state, action) => {
      const exactPage = action.payload;
      let entries = state.entries;

      if (state.filterMode && state.filteredListTotal.length) {
        let upperCountExact = entries * exactPage;
        let lowerCountExact = upperCountExact - entries;

        state.filteredEmployees = state.filteredListTotal;

        let exactEmployeeSet = state.filteredEmployees.slice(
          lowerCountExact,
          upperCountExact
        );
        state.currentPage = exactPage;
        state.currentCount = upperCountExact;
        state.filteredEmployees = exactEmployeeSet;
      } else {
        let upperCountExact = entries * exactPage;
        let lowerCountExact = upperCountExact - entries;

        state.filteredEmployees = state.employees;

        let exactEmployeeSet = state.filteredEmployees.slice(
          lowerCountExact,
          upperCountExact
        );
        state.currentPage = exactPage;
        state.currentCount = upperCountExact;

        state.filteredEmployees = exactEmployeeSet;
      }
    },

    changeEntry: (state, action) => {
      const entryValue = action.payload.value;

      if (state.filterMode && state.filteredListTotal.length) {
        state.filteredEmployees = state.filteredListTotal;
        state.entries = entryValue;
        let entries = state.entries;
        state.currentCount = entries;
        let totalPages = Math.ceil(state.filteredEmployees.length / entries);
        state.totalPages = totalPages;
        let currentEmployees = state.filteredEmployees.slice(0, entries);
        state.filteredEmployees = currentEmployees;
      } else {
        state.filteredEmployees = state.employees;
        state.entries = entryValue;
        let entries = state.entries;
        state.currentCount = entries;
        let totalPages = Math.ceil(state.filteredEmployees.length / entries);
        state.totalPages = totalPages;
        let currentEmployees = state.filteredEmployees.slice(0, entries);
        state.filteredEmployees = currentEmployees;
        state.currentPage = 1;
      }
    },

    sortByFirstName: (state, action) => {
      const sortByFirstNameArr = action.payload.direction
      console.log(sortByFirstNameArr)
    },
    sortByLastName: (state, action) => {},
    sortByStartDate: (state, action) => {},
    sortByBirthDate: (state, action) => {},
    sortByStreet: (state, action) => {},
    sortByCity: (state, action) => {},
    sortByDepartment: (state, action) => {},
    sortByState: (state, action) => {},
    sortByZipCode: (state, action) => {},
  },
});

export const employeeReducer = employeeSlice.reducer;

export const {
  loadEmployees,
  addNewEmployee,
  filterEmployee,
  loadNewPage,
  loadExactPage,
  changeEntry,
  getLocalStorage,
  sortByFirstName,
  sortByLastName,
  sortByBirthDate,
  sortByStartDate,
  sortByCity,
  sortByState,
  sortByZipCode,
  sortByStreet,
} = employeeSlice.actions;

function sortAsc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) return 1;

    if (b[field] > a[field]) return -1;

    return 0;
  });
}

function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) return -1;

    if (b[field] > a[field]) return 1;

    return 0;
  });
}
