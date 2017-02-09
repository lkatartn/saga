import React from 'react';

const User = ({ user, onClick, isSelected }) => (
	<div
		className={`user ${(isSelected? 'selected' : '')}`}
		onClick={() => onClick(user)}
		>
		{user.name}
	</div>
	);
export const UserData = ({ userName, age, loading }) => (
	<div className={`userdata ${loading ? 'loading' : ''}`}>
		<div className="name">Full Name: {userName}</div>
		<div className="age">Age: <b>{age}</b></div>
	</div>
);
export const Table = ({ users, onClickUser, selected }) => (
	<div className="users">
		{users.map((user) => 
			<User
				key={user.id}
				onClick={onClickUser}
				user={user}
				isSelected={selected.id === user.id}
				/>
		)}
	</div>);
