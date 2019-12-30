import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '../pages/Students';
import AddStudent from '../pages/addStudent';
import EditStudent from '../pages/editStudent';

import Plans from '../pages/Plans';
import AddPlan from '../pages/addPlan';
import EditPlan from '../pages/editPlan';

import Registrations from '../pages/Registrations';
import NewRegistration from '../pages/newRegistration';
import EditRegistration from '../pages/editRegistration';

import Assistances from '../pages/Assistances';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/add" component={AddStudent} isPrivate />
      <Route path="/students/edit/:id" component={EditStudent} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/add" component={AddPlan} isPrivate />
      <Route path="/plans/edit/:id" component={EditPlan} isPrivate />
      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route path="/registrations/new" component={NewRegistration} isPrivate />
      <Route
        path="/registrations/edit/:id"
        component={EditRegistration}
        isPrivate
      />
      <Route path="/assistances" component={Assistances} isPrivate />
      <Route path="/" component={() => <h1>404 Page not Found</h1>} />
    </Switch>
  );
}
