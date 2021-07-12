import { Col, Container, Row } from 'react-bootstrap';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { history } from './history';
import './App.css';
import './components/sideNavBar/Sidebar.css'
import BugStatus from './components/admin/BugStatus';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import NavigateLogin from './components/NavigateLogin';
import StaffLoginComponent from './components/staff/StaffLoginComponent';
import AdminBug from './components/admin/ViewBugDetailsComponent';
import AdminAssign from './components/admin/AssignBugToStaff';
import ListStaff from './components/admin/ListStaffComponent';
import AddStaff from './components/admin/AddStaffComponent';
import AddProject from './components/admin/AddProjectComponent';
import UpdateProject from './components/admin/UpdateProjectComponent';
import ListProject from './components/admin/ListProjectComponent';
import ViewProjectById from './components/admin/ViewProjectComponent';
import UpdateStaff from './components/admin/UpdateStaffComponent';
import ViewStaffById from './components/admin/ViewStaffComponent';
import StaffBug from './components/staff/ViewBugDetailsComponent';
import CustomerBug from './components/customer/CustomerBug';
import SolutionComponent from './components/staff/SolutionComponent';
import AssignBugComponent from './components/staff/AssignBug';
import CustomerLoginComponent from './components/customer/CustomerLoginComponent';
import ViewCustomerDetailsComponent from './components/customer/ViewCustomerDetailsComponent';
import RaiseTicketComponent from './components/customer/RaiseTicketComponent';
import AdminLoginComponent from './components/admin/login/Login';
import ScrollToTop from './components/ScrollToTop';
import HomePageComponent from './components/HomePageComponent';
import CustomerSignUpComponent from './components/customer/CustomerSignUpComponent';



function App() {
  const marginTop = {
    marginTop: "20px"
  };
  return (
    
    <div className="page-container">
      <div className="content-wrap">
        <Router history={history}>
          <div className="bg_image">
            <ScrollToTop />
            <NavigationBar />

            <Container>
              <Row>
                <Col lg={12} style={marginTop}>
                  <Switch>
                    <Route path="/welcome" exact component={Welcome} />
                    <Route path="/" exact component={HomePageComponent}/>
          
                    <Route path="/login" exact component={NavigateLogin} />
                    <Route path="/status" exact component={BugStatus} />
                    <Route exact path="/admin" component={AdminLoginComponent} />
                    <Route path="/adminBug" exact component={AdminBug} />
                    <Route path="/viewStaff" component={ListStaff}></Route>
                    <Route path="/add-staff/:staffId" component={AddStaff}></Route>
                    <Route path="/update-staff/:staffId" component={UpdateStaff}></Route>
                    <Route path="/view-staff/:staffId" component={ViewStaffById}></Route>
                    <Route path="/adminAssign/:staffId/:bugId" exact component={AdminAssign} />

                    <Route path="/viewProject" component={ListProject}></Route>
                    <Route path="/add-project/:proId" component={AddProject}></Route>
                    <Route path="/update-project/:proId" component={UpdateProject}></Route>
                    <Route path="/view-project/:proId" component={ViewProjectById}></Route>
                    
                    


                    
                    <Route exact path="/staff" component={StaffLoginComponent} />
                    <Route path="/staffBug" exact component={StaffBug} />
                    <Route path="/customerBug" exact component={CustomerBug} />
                    <Route path="/edit/:bugId" exact component={SolutionComponent} />
                    <Route path="/assign/:staffId/:bugId" exact component={AssignBugComponent} />
                    <Route exact path="/customer" component={CustomerLoginComponent} />
                    <Route path="/signup" exact component={CustomerSignUpComponent} />
                    <Route path="/viewCustomer" exact component={ViewCustomerDetailsComponent} />
                    <Route path="/raise/:customerTicketId" exact component={RaiseTicketComponent} />

                  </Switch>
                </Col>
              </Row>
            </Container>

          </div>
          
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App;