import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const doCreateEditor = (id, username, email) =>
  db.ref('editors/${id}').set({
  	username,
  	email,
  });

export const doCreateVisitor = (id, username, email) =>
  db.ref('visitors/${id}').set({
  	username,
  	email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

