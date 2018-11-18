import { db } from './firebase';

// User API

export const doCreateEditor = (id, email, admission_year, applied_dept, under_uni, under_major, gpa) =>
  db.ref(`users/${id}`).set({
  	    email,
		admission_year,
		applied_dept,
		under_uni,
		under_major,
		gpa,
  });

export const doCreateVisitor = (id, email, admission_year, under_uni, under_major, expected_grad) =>
  db.ref(`users/${id}`).set({
		email,
		admission_year,
		under_uni,
		under_major,
		expected_grad,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');


export const getIntroduction = (semester) =>
  db.ref(`pages/${semester}/Document/Introduction`);
