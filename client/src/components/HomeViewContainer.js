import React from 'react';
import Toolbar from './Toolbar';
import Co2Chart from './Co2Chart';

export const HomeViewContainer = ({ component: Component, ...rest }) => (
	<div className="HomeView">
        <div className="HomeViewToolbar">
            <Toolbar/>
        </div>
        <div className="HomeViewContent">
            <Co2Chart/>
        </div>
    </div>
);

