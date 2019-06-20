import React from 'react';
import Toolbar from './Toolbar';

export const HomeViewContainer = ({ component: Component, ...rest }) => (
	<div className="HomeView">
        <div className="HomeViewToolbar">
            <Toolbar/>
        </div>
        <div className="HomeViewContent">
            <p>Hello content</p>
        </div>
    </div>
);

