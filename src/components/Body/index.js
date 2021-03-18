import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../routes';
import './Body.scss';

const Body = () => {


  return (
    <div id="body" className= 'body-container'>
      <Switch>
        <Suspense fallback={<span />}>
          {routes.map(({ path, component, exact }, i) => {
            return (
              <Route path={path} exact={exact} key={i}>
                {component}
              </Route>
            );
          })}
        </Suspense>
      </Switch>
    </div>
  );
};

export default Body;
