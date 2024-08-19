import Index from "views/Index.js";
import Event from "views/examples/Event_Management.js";
import Login from "views/examples/Login";
import Courses from "views/examples/Courses.js";
import Professors from "views/examples/Professor";
import Students from "views/examples/Students";
import UserProfile from "views/examples/User-profile";
import Update from "views/examples/Form_Update";
import AddStudent from "views/examples/Add_Student";
import AddTeacher from "views/examples/Add_Teacher";
import AddCours from "views/examples/Add_Cours";
import EditStudent from "views/examples/Edit_Student";
import EditProfessor from "views/examples/Edit_Professor";

var routes = [
  {
    path: "/index",
    name: "Main Menu",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    name: "Students",
    icon: "fas fa-users text-red",
    layout: "/admin",
    subRoutes: [
      {
        path: "/students",
        name: "View Students",
        component: <Students />,
        layout: "/admin",
      },
      {
        path: "/add_student",
        name: "Add Student",
        component: <AddStudent />,
        layout: "/admin",
      },
    
      
    ],
  },
  {
    name: "Professors",
    icon: "fas fa-users text-grey",
    layout: "/admin",
    subRoutes: [
      {
        path: "/professors",
        name: "View Professors",
        component: <Professors />,
        layout: "/admin",
      },
      {
        path: "/add_teacher",
        name: "Add Teacher",
        component: <AddTeacher />,
        layout: "/admin",
      }, 
     
    ],
  },

  {
    
    name: "Courses",
    icon: "ni ni-ruler-pencil text-yellow",
    layout: "/admin",
    subRoutes:[
      {
        path: "/courses",
        name: "View Courses",
        component: <Courses />,
        layout: "/admin",
      },
      {
        path: "/add_cours",
        name: "Add Course",
        component: <AddCours />,
        layout: "/admin",
      },
    ]
  },
  {
    path: "/event",
    name: "Event Management",
    icon: "ni ni-calendar-grid-58 text-orange",
    component: <Event />,
    layout: "/admin",
  },
  {
    name: "User Profile",
    icon: "fa fa-user text-blue",
    layout: "/admin",
    subRoutes:[
      {
        path: "/user-profile",
        name: "User Profile",
        icon: "fa fa-user text-blue",
        component: <UserProfile />,
        layout: "/admin",
      },
      {
        path: "/update",
        name: "Update Profile",
        icon: "fa fa-user text-blue",
        component: <Update />,
        layout: "/admin",
      },
    ]
  },
  
  {
    path: "/login",
    name: "Log out",
    icon: "fa fa-power-off",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/modify_student/:matricule",
    component:  <EditStudent />,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/modify_teacher/:matricule",
    component:  <EditProfessor />,
    layout: "/admin",
    invisible: true,
  },
  
];

export default routes;
