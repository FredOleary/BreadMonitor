import React from 'react';
import Toolbar from './Toolbar';
import Co2Chart from './Co2Chart';
import Recipe from './Recipe';

export const HomeViewContainer = ({ component: Component, ...rest }) => (
	<div className="HomeView">
        <div className="HomeViewToolbar">
            <Toolbar/>
        </div>
        <div className="HomeViewContent">
            <div className="HomeViewRecipe">
                <Recipe/>
            </div>
            <div className="HomeViewChart">
                <Co2Chart/>
            </div>
         </div>
    </div>
);

