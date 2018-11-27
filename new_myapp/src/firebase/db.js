import { db } from './firebase';

// User API

// to change back to english, make korean = ""
var korean = "korean/"

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
db.ref(`users`).once('value');

export const getUser = (uid) =>
db.ref(`users/${uid}`);

export const updatePoints = (id, points) =>
db.ref(`users/${id}`).update({ points });

export const getPoints = (id) =>
db.ref(`users/${id}/points`);

export const getIntroduction = (semester) =>
db.ref(`${korean}pages/${semester}/Document/Introduction`);

export const getExtracurricular = (semester) =>
db.ref(`${korean}pages/${semester}/Document/Extracurricular`);

export const getProgramming = (semester) =>
db.ref(`${korean}pages/${semester}/Interview/Programming`);

export const getWaiting = (semester) =>
db.ref(`${korean}pages/${semester}/Interview/Waiting`);

export const getRoom1 = (semester) =>
db.ref(`${korean}pages/${semester}/Interview/Room1`);

export const getRoom2 = (semester) =>
db.ref(`${korean}pages/${semester}/Interview/Room2`);

export const getRoom3 = (semester) =>
db.ref(`${korean}pages/${semester}/Interview/Room3`);

export const getComments = (semester, qid) =>
db.ref(`${korean}comments/${semester}/${qid}/comments`);

export const getQuestion = (qid_path) =>
db.ref(`${korean}pages/${qid_path}`);

export const removeQuestion = (qid_path) =>
db.ref(`${korean}pages/${qid_path}`).remove();

export const doVote = (path, vote, votefor, voteagainst, visibility) =>
db.ref(`${korean}pages/${path}`).update({
	vote, votefor, voteagainst, visibility
});

export const addQuestion = (path, text, uid) =>
db.ref(`${korean}pages/${path}`).set({
	text,
	uid,
	visibility : false,
	vote : '0-0',
	votefor : '',
	voteagainst : '',
});

export const getQid = (semester) =>
db.ref(`${korean}base_values/${semester}`);

export const incQid = (semester, v) =>
db.ref(`${korean}base_values/${semester}`).update({ qid: v });

export const addComment = (path, text, uid, gpa, kaist, major) =>
db.ref(`${korean}comments/${path}`).set({
	text,
	uid,
	gpa,
	kaist,
	major,
	base_rid : 1,
});

export const getCid = (semester, qid) =>
db.ref(`${korean}comments/${semester}/${qid}`);

export const incCid = (semester, qid, v) =>
db.ref(`${korean}comments/${semester}/${qid}`).update({ base_cid: v });

export const addReply = (path, text, uid, type) =>
db.ref(`${korean}comments/${path}`).set({ text, type, uid });

export const getRid = (semester, qid, cid) =>
db.ref(`${korean}comments/${semester}/${qid}/comments/${cid}`);

export const incRid = (semester, qid, cid, v) =>
db.ref(`${korean}comments/${semester}/${qid}/comments/${cid}`).update({ base_rid: v });

export const reportComment = (semester, qid, cid) =>
db.ref(`${korean}comments/${semester}/${qid}/comments/${cid}`).update({ reported: true });

export const getRankers = () =>
db.ref(`users`).orderByChild("points").limitToLast(5);