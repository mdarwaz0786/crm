// /* eslint-disable no-extra-semi */
// import { useState, useEffect } from "react";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useAuth } from "../src/context/authContext.jsx";
// import Preloader from "../src/Preloader.jsx";

// const formFields = [
//   { name: 'name', type: 'text', label: 'Project Name' },
//   { name: 'projectId', type: 'text', label: 'Project ID' },
//   { name: 'price', type: 'text', label: 'Price' },
//   { name: 'priority', type: 'select', label: 'Priority', options: ['High', 'Medium', 'Low'] },
//   { name: 'start', type: 'date', label: 'Start Date' },
//   { name: 'due', type: 'date', label: 'Due Date' },
//   { name: 'description', type: 'textarea', label: 'Description' },
//   { name: 'type', type: 'select', label: 'Project Type', options: [] },
//   { name: 'customer', type: 'select', label: 'Customer', options: [] },
//   { name: 'category', type: 'select', label: 'Project Category', options: [] },
//   { name: 'timing', type: 'select', label: 'Project Timing', options: [] },
//   { name: 'status', type: 'select', label: 'Project Status', options: [] },
// ];

// const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

// const AddProject = () => {
//   const [formData, setFormData] = useState(formFields.reduce((accumulator, { name }) => ({ ...accumulator, [name]: "" }), {}));
//   const [dropdownData, setDropdownData] = useState({ customer: [], projectCategory: [], projectTiming: [], teamMember: [], projectStatus: [], projectType: [] });
//   const [selectedOptions, setSelectedOptions] = useState({ responsible: [], leader: [] });
//   const navigate = useNavigate();
//   const { validToken, team, isLoading } = useAuth();
//   const permissions = team?.role?.permissions?.project;

//   useEffect(() => {
//     if (isLoading || !permissions?.create) {
//       return;
//     }

//     const fetchDropdownData = async () => {
//       try {
//         const endpoints = [
//           "/api/v1/customer/all-customer",
//           "/api/v1/projectCategory/all-projectCategory",
//           "/api/v1/projectTiming/all-projectTiming",
//           "/api/v1/team/all-team",
//           "/api/v1/projectStatus/all-projectStatus",
//           "/api/v1/projectType/all-projectType",
//         ];

//         const responses = await Promise.all(endpoints.map((url) => axios.get(url, { headers: { Authorization: validToken } })));
//         const [customer, projectCategory, projectTiming, team, projectStatus, projectType] = responses.map((response) => response.data);

//         setDropdownData({
//           customer: customer.customer || [],
//           projectCategory: projectCategory.projectCategory || [],
//           projectTiming: projectTiming.projectTiming || [],
//           teamMember: team.team || [],
//           projectStatus: projectStatus.projectStatus || [],
//           projectType: projectType.projectType || [],
//         });

//         // Initialize formData options
//         setFormData(prev => ({
//           ...prev,
//           type: projectType.projectType?.[0]?._id || "",
//           customer: customer.customer?.[0]?._id || "",
//           category: projectCategory.projectCategory?.[0]?._id || "",
//           timing: projectTiming.projectTiming?.[0]?._id || "",
//           status: projectStatus.projectStatus?.[0]?._id || "",
//         }));
//       } catch (error) {
//         console.error("Error while fetching dropdown data:", error.message);
//       }
//     };

//     fetchDropdownData();
//   }, [isLoading, permissions?.create, validToken]);

//   const handleChange = ({ target: { name, value } }) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMultiSelectChange = (field) => ({ target: { value } }) => {
//     if (value && !selectedOptions[field].includes(value)) {
//       setSelectedOptions((prev) => ({ ...prev, [field]: [...prev[field], value] }));
//     }
//   };

//   const handleRemoveOption = (field, id) => () => {
//     setSelectedOptions((prev) => ({ ...prev, [field]: prev[field].filter(optionId => optionId !== id) }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     const allFieldsValid = formFields.every(({ name }) => formData[name]) && selectedOptions.responsible.length && selectedOptions.leader.length;

//     if (!allFieldsValid) {
//       return toast.error("All fields are required.");
//     }

//     try {
//       const response = await axios.post("/api/v1/project/create-project",
//         {
//           ...formData,
//           responsible: selectedOptions.responsible,
//           leader: selectedOptions.leader,
//         },
//         {
//           headers: {
//             Authorization: validToken,
//           },
//         },
//       );

//       if (response?.data?.success) {
//         setFormData(formFields.reduce((acc, { name }) => ({ ...acc, [name]: "" }), {}));
//         setSelectedOptions({ responsible: [], leader: [] });
//         toast.success("Project created successfully");
//         // navigate(-1);
//       }
//     } catch (error) {
//       console.error("Error while creating project:", error.message);
//       toast.error("Error while creating project");
//     }
//   };

//   if (isLoading) {
//     return <Preloader />;
//   }

//   if (!permissions?.create) {
//     return <Navigate to="/" />;
//   }

//   console.log(formData);

//   return (
//     <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
//       <div className="content">
//         <div className="d-flex justify-content-between">
//           <h4>Add Project</h4>
//           <Link to="#" onClick={() => navigate(-1)}>
//             <button className="btn btn-primary">Back</button>
//           </Link>
//         </div>
//         <form onSubmit={handleCreate}>
//           <div className="row">
//             {
//               formFields.map(({ name, type, label, options }) => (
//                 <div className={type === "textarea" ? "col-md-12" : "col-md-6"} key={name}>
//                   <div className="form-wrap">
//                     <label className="col-form-label" htmlFor={name}>
//                       {capitalizeFirstLetter(label)} <span className="text-danger">*</span>
//                     </label>
//                     {
//                       type === "textarea" ? (
//                         <ReactQuill
//                           value={formData[name]}
//                           onChange={(value) => handleChange({ target: { name, value } })}
//                         />
//                       ) : options ? (
//                         <select className="form-select" id={name} name={name} value={formData[name]} onChange={handleChange}>
//                           <option value="">Select</option>
//                           {options.map((option) => (
//                             <option key={option} value={option}>{option}</option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input type={type} className="form-control" name={name} id={name} value={formData[name]} onChange={handleChange} />
//                       )
//                     }
//                   </div>
//                 </div>
//               ))
//             }
//             {
//               ['type', 'customer', 'category', 'timing', 'status'].map((field) => (
//                 <div className="col-md-6" key={field}>
//                   <div className="form-wrap">
//                     <label className="col-form-label" htmlFor={field}>
//                       {capitalizeFirstLetter(field.replace(/([A-Z])/g, ' $1'))} <span className="text-danger">*</span>
//                     </label>
//                     <select className="form-select" id={field} name={field} value={formData[field]} onChange={handleChange}>
//                       <option value="">Select</option>
//                       {
//                         (dropdownData[field] || []).map((item) => (
//                           <option key={item._id} value={item._id}>{item.name || item.status}</option>
//                         ))
//                       }
//                     </select>
//                   </div>
//                 </div>
//               ))
//             }
//             {
//               ['responsible', 'leader'].map((field) => (
//                 <div className="col-md-6" key={field}>
//                   <div className="form-wrap">
//                     <label className="col-form-label" htmlFor={field}>
//                       {capitalizeFirstLetter(field)} <span className="text-danger">*</span>
//                     </label>
//                     <select className="form-select" id={field} onChange={handleMultiSelectChange(field)}>
//                       <option value="">Select</option>
//                       {
//                         (dropdownData.teamMember || []).map((member) => (
//                           <option key={member._id} value={member._id}>{member.name}</option>
//                         ))
//                       }
//                     </select>
//                     <div className="selected-container">
//                       {
//                         selectedOptions[field].map((id) => (
//                           <span key={id} className="selected-item">
//                             {dropdownData.teamMember.find((member) => member._id === id)?.name}
//                             <button type="button" className="remove-btn" onClick={handleRemoveOption(field, id)}>{"x"}</button>
//                           </span>
//                         ))
//                       }
//                     </div>
//                   </div>
//                 </div>
//               ))
//             }
//           </div>
//           <div className="text-end">
//             <Link to="#" onClick={() => navigate(-1)} className="btn btn-light">Cancel</Link>
//             <button type="submit" className="btn btn-primary">Create</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProject;
