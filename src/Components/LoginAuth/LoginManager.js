import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../LoginAuth/PrivateRoute/firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser
        })
        .catch(error => {
            const errorInfo = {};
            errorInfo.error = error.message;
            errorInfo.success = false;
            return errorInfo;
        })
}

export const handleFbSingIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser
        })
        .catch(error => {
            const errorInfo = {};
            errorInfo.error = error.message;
            errorInfo.success = false;
            return errorInfo;
        });
}



export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const { email, photoURL } = res.user;
            const signedInUser = {
                name: updateUserName(name),
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;

        })
        .catch(error => {
            const errorInfo = {};
            errorInfo.error = error.message;
            errorInfo.success = false;
            return errorInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            console.log(res.user);
            return signedInUser;
        })
        .catch(error => {
            const errorInfo = {};
            errorInfo.error = error.message;
            errorInfo.success = false;
            return errorInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    })
    return name;
}

export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            localStorage.removeItem('token');
            const signedOutUser = {
                isSignedIn: false,
                userName: '',
                email: '',
                userPhoto: ''
            }
            return signedOutUser;
        })
        .catch(error => console.log(error.message))
}