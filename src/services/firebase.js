import { firebase } from '../lib/firebase';

export async function doesUsernameExist(username) {
    console.log('username', username)
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    console.log('result', result)

    return result.docs.map((user) => user.data().length > 0);
}