import React from 'react';

const User = ({ user, onClick, isSelected }) => (
	<div
		classname={`user ${(isSelected? 'selected' : 'null')}`}
		onClick={() => onClick(user)}
		>
		{user.name}
	</div>
	);

export const Table = ({ users, onClickUser }) => (<div classname="users">
	{users.map((user) => <div classname="user" onClick={onClickUser}></div>)}
	</div>);
