import React from 'react';


export const HomeViewContainer = ({ component: Component, ...rest }) => (
	<div className="HomeView">
        <div className="HomeViewToolbar">
            <p>Hello toolbar</p>
        </div>
        <div className="HomeViewContent">
            <p>Hello content</p>
        </div>
    </div>
);

