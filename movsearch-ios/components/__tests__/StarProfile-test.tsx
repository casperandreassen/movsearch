// __tests__

import React, { startTransition } from 'react';
import StarProfile from '../StarProfile';
import renderer from 'react-test-renderer';

const starMockData = {
	adult: false,
	gender: 2,
	id: 880,
	known_for_department: 'Acting',
	name: 'Ben Affleck',
	original_name: 'Ben Affleck',
	popularity: 30.916,
	profile_path: '/aTcqu8cI4wMohU17xTdqmXKTGrw.jpg',
	cast_id: 18,
	character: 'Bruce Wayne / Batman',
	credit_id: '52fe4d5bc3a368484e1e4c65',
	order: 0
};

const starInvalidMockData = {
	adult: false,
	gender: 2,
	id: 880,
	known_for_department: 'Acting',
	name: 'Ben Affleck',
	original_name: 'Ben Affleck',
	popularity: 30.916,
	profile_path: '/aTcqu8cI4wMohU17xTdXKTGrw.jpg',
	cast_id: 18,
	character: 'Bruce Wayne / Batman',
	credit_id: '52fe4d5bc3a368484e1e4c65',
	order: 0
};

it('renders correct star image', async () => {
	const tree = renderer.create(<StarProfile star={starMockData} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('renderes fallback image when star image path is broken', () => {
	const tree = renderer.create(<StarProfile star={starInvalidMockData} />);
	expect(tree).toMatchSnapshot();
});
