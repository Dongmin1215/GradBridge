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
	points: 0,
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

export const getUser = (uid) =>
db.ref(`users/${uid}`);

export const updatePoints = (id, points) =>
db.ref(`users/${id}`).update({ points });

export const getPoints = (id) =>
db.ref(`users/${id}/points`);

export const getIntroduction = (semester) =>
db.ref(`pages/${semester}/Document/Introduction`);

export const getExtracurricular = (semester) =>
db.ref(`pages/${semester}/Document/Extracurricular`);

export const getProgramming = (semester) =>
db.ref(`pages/${semester}/Interview/Programming`);

export const getWaiting = (semester) =>
db.ref(`pages/${semester}/Interview/Waiting`);

export const getRoom1 = (semester) =>
db.ref(`pages/${semester}/Interview/Room1`);

export const getRoom2 = (semester) =>
db.ref(`pages/${semester}/Interview/Room2`);

export const getRoom3 = (semester) =>
db.ref(`pages/${semester}/Interview/Room3`);

export const getComments = (semester, qid) =>
db.ref(`comments/${semester}/${qid}/comments`);

export const getQuestion = (qid_path) =>
db.ref(`pages/${qid_path}`);

export const removeQuestion = (qid_path) =>
db.ref(`pages/${qid_path}`).remove();

export const doVote = (path, vote, votefor, voteagainst, visibility) =>
db.ref(`pages/${path}`).update({
	vote, votefor, voteagainst, visibility
});

export const addQuestion = (path, text, uid) =>
db.ref(`pages/${path}`).set({
	text,
	uid,
	visibility : false,
	vote : '0-0',
	votefor : '',
	voteagainst : '',
});

export const getQid = (semester) =>
db.ref(`base_values/${semester}`);

export const incQid = (semester, v) =>
db.ref(`base_values/${semester}`).update({ qid: v });

export const addComment = (path, text, uid, gpa, kaist, major) =>
db.ref(`comments/${path}`).set({
	text,
	uid,
	gpa,
	kaist,
	major,
	base_rid : 1,
});

export const getCid = (semester, qid) =>
db.ref(`comments/${semester}/${qid}`);

export const incCid = (semester, qid, v) =>
db.ref(`comments/${semester}/${qid}`).update({ base_cid: v });

export const addReply = (path, text) =>
db.ref(`comments/${path}`).set({ text });

export const getRid = (semester, qid, cid) =>
db.ref(`comments/${semester}/${qid}/comments/${cid}`);

export const incRid = (semester, qid, cid, v) =>
db.ref(`comments/${semester}/${qid}/comments/${cid}`).update({ base_rid: v });

export const reportComment = (semester, qid, cid) =>
db.ref(`comments/${semester}/${qid}/comments/${cid}`).update({ reported: true });