import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import NotFoundView from './views/errors/NotFoundView';
import RegisterView from './views/auth/RegisterView';
import StakeholdersView from './views/stakeholders/StakeHoldersView';
import EnergyAuditorsView from './views/energyAuditors/EnergyAuditorsView';
import CarbonAuditorsView from './views/carbonAuditors/CarbonAuditorsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'stakeholders', element: <StakeholdersView /> },
      { path: 'energyAuditors', element: <EnergyAuditorsView/> },
      { path: 'carbonAuditors', element: <CarbonAuditorsView/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/stakeholders" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
